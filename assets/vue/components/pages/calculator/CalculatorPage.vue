<template>
    <div class="title-wrapper mb-6">
        <h1 class="animated-title text-center text-h2 mb-2">Калькулятор стоимости пересылки</h1>
    </div>

    <div class="flex flex-col flex-1 lg:flex-row gap-8 min-w-0">
        <!-- Левая колонка: Формы ввода -->
        <div
            class="flex flex-col gap-6 lg:flex-1 [&_.text-input-vue]:focus-visible:outline-blue-400 [&_.text-input-vue>input]:p-4 [&_.text-input-vue>input::placeholder]:text-gray-600 min-w-0">
            <div class="bg-brand-light p-5 rounded-lg">
                <DirectionForm :billingAddresses="billingAddresses" :localities="localities" v-model="formData.direction" />
            </div>

            <!-- Пункты доставки -->
            <div v-if="formData.direction.from || formData.direction.to" class="bg-brand-light p-5 rounded-lg">
                <h2 class="text-h4 font-bold mb-4">Пункты доставки</h2>
                <div class="flex flex-col gap-6">
                    <DeliveryPointForm v-if="formData.direction.from" title="Пункт отправки" terminal-label="Сдать на терминале"
                        address-label="Забрать по адресу" name-prefix="departure" :city="formData.direction.from"
                        :billingAddresses="billingAddresses" v-model="formData.departure" 
                        @update:modelValue="(value) => { console.log('CalculatorPage: Обновление departure', value); formData.departure = value; }" />
                    <DeliveryPointForm v-if="formData.direction.to" title="Пункт назначения" terminal-label="Получить на терминале"
                        address-label="Доставить по адресу" name-prefix="destination" :city="formData.direction.to"
                        :billingAddresses="billingAddresses" v-model="formData.destination" 
                        @update:modelValue="(value) => { console.log('CalculatorPage: Обновление destination', value); formData.destination = value; }" />
                    <ExtraOptionsForm v-model="formData.extraOptions" />
                </div>
            </div>

            <div class="bg-brand-light p-5 rounded-lg">
                <CargoParamsForm :calculator-config="calculatorConfig"
                    v-model="formData.cargo" />
            </div>
        </div>

        <!-- Правая колонка: Результаты расчета -->
        <div class="h-fit bg-brand-light p-5 rounded-lg w-full lg:w-80 flex-none">
            <CalculationResult :result="calculationResult" :form-data="formData" :calculator-config="calculatorConfig"
                @print="printResult" @selectTariff="selectTariff" />
            <!-- Кнопка "Рассчитать" удалена - расчет происходит автоматически -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import DirectionForm from './DirectionForm.vue';
import CargoParamsForm from './CargoParamsForm.vue';
import DeliveryPointForm from './DeliveryPointForm.vue';
import ExtraOptionsForm from './ExtraOptionsForm.vue';
import CalculationResult from './CalculationResult.vue';
import apiService from '../../../services/apiService.js';
import { formatSelectedLocalityName } from '../../../utils/localityFormatter.js';

// Новые данные из API
const billingAddresses = ref([]);
const localities = ref([]);
const transportTypes = ref([]);
const tariffGrids = ref([]);
const tariffZones = ref([]);
const takeDelivers = ref([]);
const boxings = ref([]);
const units = ref([]);
const regions = ref([]);
const cargoOptions = ref([]);

// Конфигурация калькулятора (оставляем для совместимости)
const calculatorConfig = ref({});

const formData = reactive({
    direction: {
        from: '',
        to: '',
        fromAddress: null, // Полный объект адреса отправки
        toAddress: null,   // Полный объект адреса назначения
        fromLocalityId: null, // ID населенного пункта отправки
        toLocalityId: null    // ID населенного пункта назначения
    },
    cargo: {
        mode: 'total',
        packages: [{
            id: Date.now(),
            length: '',
            width: '',
            height: '',
            weight: '',
            description: '',
            declaredValue: '',
            packagingItems: [],
            selfMarking: false,
            dangerousGoods: false,
            tempControl: false,
            quantity: 1
        }]
    },
    departure: {
        deliveryMode: 'terminal',
        location: '',
        date: (() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toISOString().split('T')[0];
        })()
    },
    destination: {
        deliveryMode: 'terminal',
        location: '',
        date: ''
    },
    extraOptions: {
        requiresAccompanyingDocs: false,
        returnDocsToSender: false
    },
    selectedTariff: null
});

// Функция расчета времени доставки
function calculateDeliveryTime(tariff, distanceKm) {
    if (!tariff.deliveryTime) return null;

    const { baseDays, additionalDaysPerKm, maxDays } = tariff.deliveryTime;
    const calculatedDays = baseDays + (distanceKm * additionalDaysPerKm);
    const deliveryDays = Math.min(Math.ceil(calculatedDays), maxDays);

    return {
        days: deliveryDays,
        description: tariff.deliveryTime.description
    };
}

// Функция расчета минимальной даты доставки
function calculateMinDeliveryDate(tariff, distanceKm, departureDate) {
    const deliveryTime = calculateDeliveryTime(tariff, distanceKm);
    if (!deliveryTime || !departureDate) return null;

    const depDate = new Date(departureDate);
    const minDeliveryDate = new Date(depDate);
    minDeliveryDate.setDate(depDate.getDate() + deliveryTime.days);

    return {
        date: minDeliveryDate,
        days: deliveryTime.days,
        description: deliveryTime.description
    };
}

// Обновленная функция проверки доступности тарифа с учетом дат
function checkTariffAvailability(tariff, cargoData, direction, distanceKm, departureDate = null, destinationDate = null) {
    const { availability } = tariff;

    // Расчет общего веса и объема с учетом количества
    let totalWeight = 0, totalVolume = 0, maxDeclaredValue = 0;
    let hasAnyDangerousGoods = false, hasAnyTempControl = false;
    let totalPackagesCount = 0;

    cargoData.packages.forEach(pkg => {
        const weight = parseFloat(pkg.weight) || 0;
        const volume = (parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height)) / 1000000 || 0;
        const declaredValue = parseFloat(pkg.declaredValue) || 0;
        const quantity = parseInt(pkg.quantity) || 1;

        totalWeight += weight * quantity;
        totalVolume += volume * quantity;
        totalPackagesCount += quantity;
        maxDeclaredValue = Math.max(maxDeclaredValue, declaredValue);

        if (pkg.dangerousGoods) hasAnyDangerousGoods = true;
        if (pkg.tempControl) hasAnyTempControl = true;
    });

    // Проверка ограничений по весу
    if (availability.minWeight && totalWeight < availability.minWeight) {
        return false;
    }
    if (availability.maxWeight && totalWeight > availability.maxWeight) {
        return false;
    }

    // Проверка ограничений по объему
    if (availability.minVolume && totalVolume < availability.minVolume) {
        return false;
    }
    if (availability.maxVolume && totalVolume > availability.maxVolume) {
        return false;
    }

    // Проверка ограничений по оценочной стоимости
    if (availability.minDeclaredValue && maxDeclaredValue < availability.minDeclaredValue) {
        return false;
    }
    if (availability.maxDeclaredValue && maxDeclaredValue > availability.maxDeclaredValue) {
        return false;
    }

    // Проверка ограничений по расстоянию
    if (distanceKm !== null) {
        if (availability.minDistance && distanceKm < availability.minDistance) {
            return false;
        }
        if (availability.maxDistance && distanceKm > availability.maxDistance) {
            return false;
        }
    }

    // Проверка ограничений по регионам
    if (availability.allowedRegions.length > 0) {
        const fromAllowed = availability.allowedRegions.some(region => direction.from.includes(region));
        const toAllowed = availability.allowedRegions.some(region => direction.to.includes(region));
        if (!fromAllowed || !toAllowed) {
            return false;
        }
    }

    if (availability.excludedRegions.length > 0) {
        const fromExcluded = availability.excludedRegions.some(region => direction.from.includes(region));
        const toExcluded = availability.excludedRegions.some(region => direction.to.includes(region));
        if (fromExcluded || toExcluded) {
            return false;
        }
    }

    // Проверка ограничений по датам
    if (departureDate && availability.minAdvanceBookingDays !== undefined) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const depDate = new Date(departureDate);
        depDate.setHours(0, 0, 0, 0);

        const daysDifference = Math.floor((depDate - today) / (1000 * 60 * 60 * 24));

        if (daysDifference < availability.minAdvanceBookingDays) {
            return false;
        }
        if (availability.maxAdvanceBookingDays && daysDifference > availability.maxAdvanceBookingDays) {
            return false;
        }
    }

    // Проверка минимального времени доставки
    if (departureDate && destinationDate && distanceKm !== null) {
        const minDelivery = calculateMinDeliveryDate(tariff, distanceKm, departureDate);
        if (minDelivery) {
            const requestedDeliveryDate = new Date(destinationDate);
            if (requestedDeliveryDate < minDelivery.date) {
                return false;
            }
        }
    }

    return true;
}

// Обновленная функция получения всех тарифов с флагом доступности и причиной
function getAllTariffsWithStatus() {
    if (!transportTypes.value || !isFormDataValid()) {
        return [];
    }
    const { direction, cargo, departure, destination } = formData;
    
    // Используем реальные значения из формы без применения минимальных значений
    const processedPackages = cargo.packages.map(pkg => ({
        ...pkg,
        weight: parseFloat(pkg.weight) || 0,
        length: parseFloat(pkg.length) || 0,
        width: parseFloat(pkg.width) || 0,
        height: parseFloat(pkg.height) || 0,
        quantity: parseInt(pkg.quantity) || 1
    }));

    const cargoData = { packages: processedPackages };
    const defaultDeliveryMode = calculatorConfig.value.defaultValues?.delivery?.mode || 'terminal';
    const departureData = {
        deliveryMode: departure.deliveryMode || defaultDeliveryMode,
        location: departure.location || '',
        date: departure.date || (() => { const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); return tomorrow.toISOString().split('T')[0]; })()
    };
    const destinationData = {
        deliveryMode: destination.deliveryMode || defaultDeliveryMode,
        location: destination.location || '',
        date: destination.date || ''
    };
    let distanceKm = null;
    if (billingAddresses.value && direction.fromLocalityId && direction.toLocalityId) {
        let fromCoords = null;
        let toCoords = null;
        
        // Ищем адреса по locality_id
        const fromAddress = billingAddresses.value.find(addr => addr.locality_id === direction.fromLocalityId);
        const toAddress = billingAddresses.value.find(addr => addr.locality_id === direction.toLocalityId);
        
        if (fromAddress && fromAddress.coordinates) {
            fromCoords = fromAddress.coordinates;
        }
        if (toAddress && toAddress.coordinates) {
            toCoords = toAddress.coordinates;
        }
        
        if (fromCoords && toCoords) {
            distanceKm = getDistanceKm(
                parseFloat(fromCoords[0]),
                parseFloat(fromCoords[1]),
                parseFloat(toCoords[0]),
                parseFloat(toCoords[1])
            );
        }
    }
    // Для каждого вида перевозки определяем доступность и причину
    const result = transportTypes.value.map(transportType => {
        // Сначала проверяем ограничения тарифа из конфигурации
        const constraintCheck = checkTariffConstraints(transportType, cargoData, direction, distanceKm);
        if (!constraintCheck.isAvailable) {
            return {
                ...transportType,
                isAvailable: false,
                cost: null,
                reason: constraintCheck.reason
            };
        }
        
        const calculationResult = calculateTariffCost(transportType);
        
        // Если расчет успешен, тариф доступен
        if (calculationResult !== null) {
            return {
                ...transportType,
                fullName: transportType.name,
                isAvailable: true,
                cost: calculationResult.totalCost,
                reason: null
            };
        }
        
        // Определяем причину недоступности
        let reason = 'Нет данных для расчета';
        
        // Проверяем наличие адресов
        if (!direction.fromLocalityId || !direction.toLocalityId) {
            reason = 'Не выбраны города отправления и назначения';
        } else {
            // Проверяем наличие тарифной зоны
            const tariffZone = tariffZones.value.find(tz => 
                tz.takeLocality_id === direction.fromLocalityId && 
                tz.deliverLocality_id === direction.toLocalityId &&
                tz.transportType_id === transportType.id
            );
            
            if (!tariffZone) {
                reason = 'Нет тарифной зоны для данного направления';
            } else {
                // Проверяем вес груза
                const totalWeight = processedPackages.reduce((sum, pkg) => {
                    const weight = parseFloat(pkg.weight) || 0;
                    const quantity = parseInt(pkg.quantity) || 1;
                    return sum + (weight * quantity);
                }, 0);
                
                // Находим максимальный вес в тарифной сетке для данного типа перевозки
                const relevantTariffGrid = tariffGrids.value.filter(tg => 
                    tg.transportType_id === transportType.id && 
                    tg.numberZone === tariffZone.tariffZone.toString()
                );
                
                if (relevantTariffGrid.length > 0) {
                    const maxWeight = Math.max(...relevantTariffGrid.map(tg => tg.unitTo));
                    if (totalWeight > maxWeight) {
                        reason = `Превышен максимальный вес для данного тарифа (${maxWeight} кг)`;
                    } else {
                        reason = 'Нет данных для расчета';
                    }
                } else {
                    reason = 'Нет тарифной сетки для данного направления';
                }
            }
        }
        
        return {
            ...transportType,
            fullName: transportType.name,
            isAvailable: false,
            cost: null,
            reason: reason
        };
    });
    
    
    return result;
}


// Функция для проверки ограничений тарифа
function checkTariffConstraints(transportType, cargoData, direction, distanceKm) {
    const tariffConfig = calculatorConfig.value.tariffs?.find(t => 
        t.name === transportType.name || t.id === `cargo-${transportType.name.toLowerCase()}`
    );
    
    if (!tariffConfig) {
        return { isAvailable: true, reason: null };
    }
    
    const constraints = tariffConfig.availability;
    const totalWeight = cargoData.packages.reduce((sum, pkg) => sum + (pkg.weight * pkg.quantity), 0);
    const totalVolume = cargoData.packages.reduce((sum, pkg) => {
        const volume = (pkg.length * pkg.width * pkg.height) / 1000000; // см³ в м³
        return sum + (volume * pkg.quantity);
    }, 0);
    
    // Проверка веса
    if (constraints.minWeight && totalWeight < constraints.minWeight) {
        return { isAvailable: false, reason: `Минимальный вес для данного тарифа: ${constraints.minWeight} кг` };
    }
    if (constraints.maxWeight && totalWeight > constraints.maxWeight) {
        return { isAvailable: false, reason: `Максимальный вес для данного тарифа: ${constraints.maxWeight} кг` };
    }
    
    // Проверка объема
    if (constraints.minVolume && totalVolume < constraints.minVolume) {
        return { isAvailable: false, reason: `Минимальный объем для данного тарифа: ${constraints.minVolume} м³` };
    }
    if (constraints.maxVolume && totalVolume > constraints.maxVolume) {
        return { isAvailable: false, reason: `Максимальный объем для данного тарифа: ${constraints.maxVolume} м³` };
    }
    
    // Проверка расстояния
    if (constraints.minDistance && distanceKm && distanceKm < constraints.minDistance) {
        return { isAvailable: false, reason: `Минимальное расстояние для данного тарифа: ${constraints.minDistance} км` };
    }
    if (constraints.maxDistance && distanceKm && distanceKm > constraints.maxDistance) {
        return { isAvailable: false, reason: `Максимальное расстояние для данного тарифа: ${constraints.maxDistance} км` };
    }
    
    // Проверка регионов (если есть ограничения)
    if (constraints.allowedRegions && constraints.allowedRegions.length > 0) {
        const fromRegion = direction.fromAddress?.region_id;
        const toRegion = direction.toAddress?.region_id;
        const isFromAllowed = !fromRegion || constraints.allowedRegions.some(region => 
            fromRegion.includes(region) || region.includes(fromRegion)
        );
        const isToAllowed = !toRegion || constraints.allowedRegions.some(region => 
            toRegion.includes(region) || region.includes(toRegion)
        );
        
        if (!isFromAllowed || !isToAllowed) {
            return { isAvailable: false, reason: `Тариф доступен только для регионов: ${constraints.allowedRegions.join(', ')}` };
        }
    }
    
    return { isAvailable: true, reason: null };
}


// Функция для расчета стоимости конкретного тарифа по новым формулам ТЗ
function calculateTariffCost(typeTransportation) {
    const { cargo, departure, destination, extraOptions, direction } = formData;

    // 1. Найти адреса отправления и назначения
    const fromAddress = billingAddresses.value.find(addr => addr.locality_id === direction.fromLocalityId);
    const toAddress = billingAddresses.value.find(addr => addr.locality_id === direction.toLocalityId);
    
    if (!fromAddress || !toAddress) {
        return null;
    }

    // 2. Найти тарифную зону для данного направления
    const tariffZone = tariffZones.value.find(tz => 
        tz.takeLocality_id === direction.fromLocalityId && 
        tz.deliverLocality_id === direction.toLocalityId &&
        tz.transportType_id === typeTransportation.id
    );

    if (!tariffZone) {
        return null;
    }

    // 3. Найти параметры забора/доставки
    const takeDeliverFrom = takeDelivers.value.find(td => 
        td.billingAddress_id === fromAddress.id && 
        td.transportType_id === typeTransportation.id
    );
    
    const takeDeliverTo = takeDelivers.value.find(td => 
        td.billingAddress_id === toAddress.id && 
        td.transportType_id === typeTransportation.id
    );

    // 4. Найти тарифную сетку для данного вида перевозки и зоны
    const relevantTarifGrid = tariffGrids.value.filter(tg => 
        tg.transportType_id === typeTransportation.id && 
        tg.numberZone === tariffZone.tariffZone.toString()
    );

    if (relevantTarifGrid.length === 0) {
        return null;
    }

    // 5. Обработка груза согласно ТЗ
    const packages = (cargo.packages && cargo.packages.length > 0) ? cargo.packages : [{
        id: Date.now(),
        length: '30',
        width: '20',
        height: '10',
        weight: '5',
        description: 'Посылка',
        declaredValue: 5000,
        packagingItems: [],
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
    }];

    // Миграция старых данных для обратной совместимости
    packages.forEach(pkg => {
        if (pkg.packaging && !pkg.packagingItems) {
            pkg.packagingItems = [{ uid: pkg.packaging, quantity: 1 }];
        }
    });

    const details = [];
    const packageDetails = [];

    let totalWeight = 0;
    let totalVolume = 0;
    let totalPackagesCount = 0;
    let maxDeclaredValue = 0;
    let hasAnyDangerousGoods = false;
    let hasAnyTempControl = false;
    let additionalCosts = 0;

    // 6. Расчет платного веса по формулам ТЗ для каждого места
    packages.forEach((pkg, index) => {
        const length = parseFloat(pkg.length) || 0;
        const width = parseFloat(pkg.width) || 0;
        const height = parseFloat(pkg.height) || 0;
        const weight = parseFloat(pkg.weight) || 0;
        const quantity = parseInt(pkg.quantity) || 1;
        const declaredValue = parseFloat(pkg.declaredValue) || 0;

        // Формулы из ТЗ:
        // V = L * W * H (в см³)
        const volumeCm3 = length * width * height;
        const volume = volumeCm3 / 1000000; // переводим в м³
        
        // Объемный вес одного места = Объем / transportationCoefficient
        const volumetricWeightPerPlace = volumeCm3 / typeTransportation.transportationCoefficient;
        
        // Объемный вес всего = Количество × Объемный вес одного места
        const volumetricWeightTotal = volumetricWeightPerPlace * quantity;
        
        // Фактический вес всего = Количество × Вес одного места
        const actualWeightTotal = weight * quantity;
        
        // Платный вес места = MAX(Объемный вес всего, Фактический вес всего)
        const payableWeight = Math.max(volumetricWeightTotal, actualWeightTotal);

        totalWeight += payableWeight;
        totalVolume += volume * quantity;
        totalPackagesCount += quantity;
        maxDeclaredValue = Math.max(maxDeclaredValue, declaredValue);

        if (pkg.dangerousGoods) hasAnyDangerousGoods = true;
        if (pkg.tempControl) hasAnyTempControl = true;

        // Расчет стоимости упаковки для данного места
        let packagingCost = 0;
        if (pkg.packagingItems && pkg.packagingItems.length > 0) {
            pkg.packagingItems.forEach(item => {
                const boxing = boxings.value.find(b => b.id === item.uid);
                if (boxing) {
                    packagingCost += boxing.price * item.quantity;
                }
            });
        }
        
        // Добавляем стоимость упаковки к дополнительным расходам
        additionalCosts += packagingCost * quantity;

        // Детализация места
        const packageInfo = {
            index: index + 1,
            description: pkg.description || `Место ${index + 1}`,
            dimensions: `${length}×${width}×${height} см`,
            singleWeight: weight,
            singleVolume: volume,
            volumetricWeightPerPlace: volumetricWeightPerPlace,
            volumetricWeightTotal: volumetricWeightTotal,
            actualWeightTotal: actualWeightTotal,
            payableWeight: payableWeight,
            quantity: quantity,
            totalWeight: payableWeight,
            totalVolume: volume * quantity,
            dangerousGoods: pkg.dangerousGoods,
            tempControl: pkg.tempControl,
            declaredValue: declaredValue
        };
        packageDetails.push(packageInfo);
    });

    // 7. Расчет стоимости по трем компонентам согласно ТЗ
    const totalPayableWeight = totalWeight; // Общий платный вес (ПВ)
    
    // Вспомогательная функция для расчета стоимости по тарифной сетке
    function calculateCostByTariffGrid(tariffGridArray, payableWeight) {
        if (!tariffGridArray || tariffGridArray.length === 0) {
            return 0;
        }

        // Найти подходящий диапазон в тарифной сетке
        const applicableTariff = tariffGridArray.find(tg => 
            payableWeight >= tg.unitFrom && payableWeight <= tg.unitTo
        );

        if (applicableTariff) {
            // Формула из ТЗ: ((ПВ - unitFrom) / step) × stepPrice + startingPrice
            const steps = Math.ceil((payableWeight - applicableTariff.unitFrom) / applicableTariff.step);
            return applicableTariff.startingPrice + (steps * applicableTariff.stepPrice);
        } else {
            // Если не найден подходящий диапазон, используем последний доступный
            const lastTariff = tariffGridArray[tariffGridArray.length - 1];
            if (lastTariff) {
                const steps = Math.ceil((payableWeight - lastTariff.unitFrom) / lastTariff.step);
                return lastTariff.startingPrice + (steps * lastTariff.stepPrice);
            }
        }
        return 0;
    }

    // 7.1. Расчет стоимости перевозки
    let transportationCost = calculateCostByTariffGrid(relevantTarifGrid, totalPayableWeight);
    
    // Применяем коэффициент зоны к перевозке
    if (tariffZone.coefficient) {
        transportationCost *= tariffZone.coefficient;
    }

    // 7.2. Расчет стоимости забора (если не терминал)
    let pickupCost = 0;
    const isPickupAtTerminal = departure.deliveryMode === 'terminal';
    
    if (!isPickupAtTerminal && takeDeliverFrom) {
        // По ТЗ: для забора используется numberZone "D" или tariffZone из takeDeliver
        const pickupZone = takeDeliverFrom.tariffZone || 'D';
        const pickupTariffGrid = tariffGrids.value.filter(tg => 
            tg.transportType_id === typeTransportation.id && 
            tg.numberZone === pickupZone.toString()
        );
        
        if (pickupTariffGrid.length > 0) {
            pickupCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
            // Добавляем surcharge из takeDeliver
            if (takeDeliverFrom.surcharge) {
                pickupCost += takeDeliverFrom.surcharge;
            }
            // Применяем коэффициент забора
            if (takeDeliverFrom.coefficientSurcharge) {
                pickupCost *= takeDeliverFrom.coefficientSurcharge;
            }
        }
    }

    // 7.3. Расчет стоимости доставки (если не терминал)
    let deliveryCost = 0;
    const isDeliveryAtTerminal = destination.deliveryMode === 'terminal';
    
    if (!isDeliveryAtTerminal && takeDeliverTo) {
        // По ТЗ: для доставки используется numberZone "H" или tariffZone из takeDeliver
        const deliveryZone = takeDeliverTo.tariffZone || 'H';
        const deliveryTariffGrid = tariffGrids.value.filter(tg => 
            tg.transportType_id === typeTransportation.id && 
            tg.numberZone === deliveryZone.toString()
        );
        
        if (deliveryTariffGrid.length > 0) {
            deliveryCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
            // Добавляем surcharge из takeDeliver
            if (takeDeliverTo.surcharge) {
                deliveryCost += takeDeliverTo.surcharge;
            }
            // Применяем коэффициент доставки
            if (takeDeliverTo.coefficientSurcharge) {
                deliveryCost *= takeDeliverTo.coefficientSurcharge;
            }
        }
    }

    // 8. Коэффициенты за опасный груз и температурный режим (применяются ко всем компонентам)
    let dangerousGoodsMultiplier = 1;
    let tempControlMultiplier = 1;
    
    if (hasAnyDangerousGoods) {
        dangerousGoodsMultiplier = 1.4; // Примерный коэффициент
    }
    if (hasAnyTempControl) {
        tempControlMultiplier = 1.25; // Примерный коэффициент
    }
    
    const totalMultiplier = dangerousGoodsMultiplier * tempControlMultiplier;
    
    // Применяем коэффициенты ко всем компонентам
    transportationCost *= totalMultiplier;
    pickupCost *= totalMultiplier;
    deliveryCost *= totalMultiplier;

    // 9. Расчет итоговой стоимости согласно ТЗ
    // По ТЗ: Общая стоимость = (Перевозка + Забор + Доставка) × (1 + Процент НДС)
    const totalWithoutVAT = transportationCost + pickupCost + deliveryCost + additionalCosts;
    
    // Применение НДС (по умолчанию 5% согласно примеру в ТЗ)
    const vatRate = 0.05; // 5% НДС
    const vatAmount = totalWithoutVAT * vatRate;
    const finalCost = totalWithoutVAT + vatAmount;

    // 10. Формирование детализации согласно ТЗ
    details.push({ name: 'РАСЧЕТ ПО ТЗ', cost: 0, isHeader: true });
    details.push({
        name: `Объем: ${totalVolume.toFixed(3)} м³`,
        cost: 0
    });
    details.push({
        name: `Платный вес (ПВ): ${totalPayableWeight.toFixed(2)} кг`,
        cost: 0
    });
    details.push({
        name: `Тарифная зона перевозки: ${tariffZone.tariffZone}`,
        cost: 0
    });
    
    // Формулы расчета для каждого места
    details.push({ name: 'ФОРМУЛЫ РАСЧЕТА', cost: 0, isHeader: true });
    
    packages.forEach((pkg, index) => {
        const length = parseFloat(pkg.length) || 0;
        const width = parseFloat(pkg.width) || 0;
        const height = parseFloat(pkg.height) || 0;
        const weight = parseFloat(pkg.weight) || 0;
        const quantity = parseInt(pkg.quantity) || 1;
        const volumeCm3 = length * width * height;
        const volumetricWeightPerPlace = volumeCm3 / typeTransportation.transportationCoefficient;
        const volumetricWeightTotal = volumetricWeightPerPlace * quantity;
        const actualWeightTotal = weight * quantity;
        const payableWeight = Math.max(volumetricWeightTotal, actualWeightTotal);
        
        details.push({
            name: `Место ${index + 1}:`,
            cost: 0,
            isSubHeader: true
        });
        
        // Формула объема
        details.push({
            name: `V = ${length.toFixed(2)} (длина, см) × ${width.toFixed(2)} (ширина, см) × ${height.toFixed(2)} (высота, см) = ${volumeCm3.toFixed(2)} см³`,
            cost: 0,
            isDetail: true
        });
        
        // Формула объемного веса одного места
        details.push({
            name: `Объемный вес 1 места = ${volumeCm3.toFixed(2)} (объем, см³) / ${typeTransportation.transportationCoefficient} (коэффициент перевозки из тарифа "${typeTransportation.name}") = ${volumetricWeightPerPlace.toFixed(2)} кг`,
            cost: 0,
            isDetail: true
        });
        
        // Формула объемного веса всего
        details.push({
            name: `Объемный вес всего = ${volumetricWeightPerPlace.toFixed(2)} (объемный вес 1 места) × ${quantity} (количество мест из формы) = ${volumetricWeightTotal.toFixed(2)} кг`,
            cost: 0,
            isDetail: true
        });
        
        // Формула фактического веса
        details.push({
            name: `Фактический вес всего = ${weight.toFixed(2)} (вес 1 места, кг из формы) × ${quantity} (количество мест из формы) = ${actualWeightTotal.toFixed(2)} кг`,
            cost: 0,
            isDetail: true
        });
        
        // Формула платного веса
        details.push({
            name: `Платный вес места ${index + 1} = MAX(${volumetricWeightTotal.toFixed(2)} (объемный вес всего), ${actualWeightTotal.toFixed(2)} (фактический вес всего)) = ${payableWeight.toFixed(2)} кг`,
            cost: 0,
            isDetail: true
        });
    });
    
    // Формула расчета стоимости перевозки
    const transportationBaseCost = calculateCostByTariffGrid(relevantTarifGrid, totalPayableWeight);
    const applicableTransportationTariff = relevantTarifGrid.find(tg => 
        totalPayableWeight >= tg.unitFrom && totalPayableWeight <= tg.unitTo
    ) || relevantTarifGrid[relevantTarifGrid.length - 1];
    
    if (applicableTransportationTariff) {
        const steps = Math.ceil((totalPayableWeight - applicableTransportationTariff.unitFrom) / applicableTransportationTariff.step);
        details.push({
            name: 'ФОРМУЛА СТОИМОСТИ ПЕРЕВОЗКИ',
            cost: 0,
            isSubHeader: true
        });
        details.push({
            name: `Шаги = CEIL((${totalPayableWeight.toFixed(2)} (ПВ, кг) - ${applicableTransportationTariff.unitFrom} (unitFrom из тарифной сетки зоны ${tariffZone.tariffZone})) / ${applicableTransportationTariff.step} (step из тарифной сетки)) = ${steps}`,
            cost: 0,
            isDetail: true
        });
        details.push({
            name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки) + ${steps} (шаги) × ${applicableTransportationTariff.stepPrice} (stepPrice из тарифной сетки) = ${transportationBaseCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
        });
        
        if (tariffZone.coefficient && tariffZone.coefficient !== 1) {
            details.push({
                name: `Стоимость с коэффициентом зоны = ${transportationBaseCost.toFixed(2)} (базовая стоимость) × ${tariffZone.coefficient} (коэффициент зоны ${tariffZone.tariffZone} из tariffZones) = ${(transportationBaseCost * tariffZone.coefficient).toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
        }
        
        if (totalMultiplier !== 1) {
            details.push({
                name: `Стоимость с коэффициентами = ${(transportationBaseCost * (tariffZone.coefficient || 1)).toFixed(2)} (стоимость перевозки) × ${totalMultiplier.toFixed(2)} (коэффициент ${hasAnyDangerousGoods ? 'опасного груза 1.4' : '1'} × ${hasAnyTempControl ? 'температурного режима 1.25' : '1'}) = ${transportationCost.toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
        }
    }
    
    // Формула расчета стоимости забора
    if (pickupCost > 0 && !isPickupAtTerminal && takeDeliverFrom) {
        const pickupZone = takeDeliverFrom.tariffZone || 'D';
        const pickupTariffGrid = tariffGrids.value.filter(tg => 
            tg.transportType_id === typeTransportation.id && 
            tg.numberZone === pickupZone.toString()
        );
        const pickupBaseCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
        const applicablePickupTariff = pickupTariffGrid.find(tg => 
            totalPayableWeight >= tg.unitFrom && totalPayableWeight <= tg.unitTo
        ) || pickupTariffGrid[pickupTariffGrid.length - 1];
        
        if (applicablePickupTariff) {
            const pickupSteps = Math.ceil((totalPayableWeight - applicablePickupTariff.unitFrom) / applicablePickupTariff.step);
            details.push({
                name: 'ФОРМУЛА СТОИМОСТИ ЗАБОРА',
                cost: 0,
                isSubHeader: true
            });
            details.push({
                name: `Базовая стоимость забора = ${applicablePickupTariff.startingPrice} (startingPrice из тарифной сетки зоны ${pickupZone}) + CEIL((${totalPayableWeight.toFixed(2)} (ПВ) - ${applicablePickupTariff.unitFrom} (unitFrom)) / ${applicablePickupTariff.step} (step)) × ${applicablePickupTariff.stepPrice} (stepPrice) = ${pickupBaseCost.toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
            
            if (takeDeliverFrom.surcharge) {
                details.push({
                    name: `Стоимость с надбавкой = ${pickupBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverFrom.surcharge} (surcharge из takeDeliver для адреса отправки) = ${(pickupBaseCost + takeDeliverFrom.surcharge).toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
                details.push({
                    name: `Стоимость с коэффициентом = ${(pickupBaseCost + (takeDeliverFrom.surcharge || 0)).toFixed(2)} (стоимость с надбавкой) × ${takeDeliverFrom.coefficientSurcharge} (coefficientSurcharge из takeDeliver) = ${((pickupBaseCost + (takeDeliverFrom.surcharge || 0)) * takeDeliverFrom.coefficientSurcharge).toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            if (totalMultiplier !== 1) {
                details.push({
                    name: `Итоговая стоимость забора = ${((pickupBaseCost + (takeDeliverFrom.surcharge || 0)) * (takeDeliverFrom.coefficientSurcharge || 1)).toFixed(2)} (стоимость забора) × ${totalMultiplier.toFixed(2)} (коэффициенты опасного груза/температурного режима) = ${pickupCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
        }
    }
    
    // Формула расчета стоимости доставки
    if (deliveryCost > 0 && !isDeliveryAtTerminal && takeDeliverTo) {
        const deliveryZone = takeDeliverTo.tariffZone || 'H';
        const deliveryTariffGrid = tariffGrids.value.filter(tg => 
            tg.transportType_id === typeTransportation.id && 
            tg.numberZone === deliveryZone.toString()
        );
        const deliveryBaseCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
        const applicableDeliveryTariff = deliveryTariffGrid.find(tg => 
            totalPayableWeight >= tg.unitFrom && totalPayableWeight <= tg.unitTo
        ) || deliveryTariffGrid[deliveryTariffGrid.length - 1];
        
        if (applicableDeliveryTariff) {
            const deliverySteps = Math.ceil((totalPayableWeight - applicableDeliveryTariff.unitFrom) / applicableDeliveryTariff.step);
            details.push({
                name: 'ФОРМУЛА СТОИМОСТИ ДОСТАВКИ',
                cost: 0,
                isSubHeader: true
            });
            details.push({
                name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone}) + CEIL((${totalPayableWeight.toFixed(2)} (ПВ) - ${applicableDeliveryTariff.unitFrom} (unitFrom)) / ${applicableDeliveryTariff.step} (step)) × ${applicableDeliveryTariff.stepPrice} (stepPrice) = ${deliveryBaseCost.toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
            
            if (takeDeliverTo.surcharge) {
                details.push({
                    name: `Стоимость с надбавкой = ${deliveryBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverTo.surcharge} (surcharge из takeDeliver для адреса назначения) = ${(deliveryBaseCost + takeDeliverTo.surcharge).toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
                details.push({
                    name: `Стоимость с коэффициентом = ${(deliveryBaseCost + (takeDeliverTo.surcharge || 0)).toFixed(2)} (стоимость с надбавкой) × ${takeDeliverTo.coefficientSurcharge} (coefficientSurcharge из takeDeliver) = ${((deliveryBaseCost + (takeDeliverTo.surcharge || 0)) * takeDeliverTo.coefficientSurcharge).toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            if (totalMultiplier !== 1) {
                details.push({
                    name: `Итоговая стоимость доставки = ${((deliveryBaseCost + (takeDeliverTo.surcharge || 0)) * (takeDeliverTo.coefficientSurcharge || 1)).toFixed(2)} (стоимость доставки) × ${totalMultiplier.toFixed(2)} (коэффициенты опасного груза/температурного режима) = ${deliveryCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
        }
    }
    
    // Итоговая формула
    details.push({
        name: 'ИТОГОВАЯ ФОРМУЛА',
        cost: 0,
        isSubHeader: true
    });
    
    const formulaParts = [];
    formulaParts.push(`${transportationCost.toFixed(2)} (стоимость перевозки)`);
    if (pickupCost > 0) {
        formulaParts.push(`${pickupCost.toFixed(2)} (стоимость забора)`);
    }
    if (deliveryCost > 0) {
        formulaParts.push(`${deliveryCost.toFixed(2)} (стоимость доставки)`);
    }
    if (additionalCosts > 0) {
        formulaParts.push(`${additionalCosts.toFixed(2)} (дополнительные услуги - упаковка)`);
    }
    
    details.push({
        name: `Стоимость без НДС = ${formulaParts.join(' + ')} = ${totalWithoutVAT.toFixed(2)} ₽`,
        cost: 0,
        isDetail: true
    });
    
    details.push({
        name: `НДС = ${totalWithoutVAT.toFixed(2)} (стоимость без НДС) × ${vatRate} (ставка НДС 5%) = ${vatAmount.toFixed(2)} ₽`,
        cost: 0,
        isDetail: true
    });
    
    details.push({
        name: `ИТОГО = ${totalWithoutVAT.toFixed(2)} (стоимость без НДС) + ${vatAmount.toFixed(2)} (НДС) = ${finalCost.toFixed(2)} ₽`,
        cost: 0,
        isDetail: true
    });
    
    // Краткая сводка для быстрого просмотра
    details.push({ name: 'КРАТКАЯ СВОДКА', cost: 0, isHeader: true });
    details.push({
        name: `Стоимость перевозки: ${transportationCost.toFixed(2)} ₽`,
        cost: transportationCost
    });
    
    if (pickupCost > 0) {
        details.push({
            name: `Стоимость забора: ${pickupCost.toFixed(2)} ₽`,
            cost: pickupCost
        });
    }
    
    if (deliveryCost > 0) {
        details.push({
            name: `Стоимость доставки: ${deliveryCost.toFixed(2)} ₽`,
            cost: deliveryCost
        });
    }

    if (totalMultiplier !== 1) {
        details.push({
            name: `Коэффициенты (опасный груз/температурный режим): ${totalMultiplier.toFixed(2)}`,
            cost: 0
        });
    }
    
    if (additionalCosts > 0) {
        details.push({
            name: `Дополнительные услуги (упаковка): ${additionalCosts.toFixed(2)} ₽`,
            cost: additionalCosts
        });
    }
    
    details.push({
        name: `Стоимость без НДС: ${totalWithoutVAT.toFixed(2)} ₽`,
        cost: totalWithoutVAT
    });
    
    details.push({
        name: `НДС (5%): ${vatAmount.toFixed(2)} ₽`,
        cost: vatAmount
    });

    // 11. Информация о доставке
    const deliveryInfo = {
        days: tariffZone.minTermDays + Math.ceil((tariffZone.maxTermDays - tariffZone.minTermDays) / 2),
        description: `${tariffZone.minTermDays}-${tariffZone.maxTermDays} дней`
    };

    return {
        tariff: typeTransportation,
        totalCost: finalCost,
        details: details,
        packageDetails: packageDetails,
        summary: {
            transportationCost: transportationCost,
            pickupCost: pickupCost,
            deliveryCost: deliveryCost,
            additionalServices: additionalCosts,
            totalWithoutVAT: totalWithoutVAT,
            vatAmount: vatAmount,
            distance: 0,
            multiplier: totalMultiplier
        },
        deliveryInfo: deliveryInfo,
        minDeliveryDate: null,
        distanceKm: null
    };
}

async function fetchData() {
    try {
        // Загружаем данные по очереди для отладки
        console.log('Начинаем загрузку данных...');
        
        const billingAddressesData = await apiService.getBillingAddressesWithRelations();
        console.log('billingAddresses загружены:', billingAddressesData?.length || 0);
        
        const localitiesData = await apiService.getLocalitiesWithRelations();
        console.log('localities загружены:', localitiesData?.length || 0);
        
        const transportTypesData = await apiService.getTransportTypes();
        console.log('transportTypes загружены:', transportTypesData?.length || 0);
        
        const tariffGridsData = await apiService.getTariffGrids();
        console.log('tariffGrids загружены:', tariffGridsData?.length || 0);
        
        const tariffZonesData = await apiService.getTariffZones();
        console.log('tariffZones загружены:', tariffZonesData?.length || 0);
        
        const takeDeliversData = await apiService.getTakeDelivers();
        console.log('takeDelivers загружены:', takeDeliversData?.length || 0);
        
        const boxingsData = await apiService.getBoxings();
        console.log('boxings загружены:', boxingsData?.length || 0);
        
        const unitsData = await apiService.getUnits();
        console.log('units загружены:', unitsData?.length || 0);
        
        const regionsData = await apiService.getRegions();
        console.log('regions загружены:', regionsData?.length || 0);
        
        const cargoOptionsData = await apiService.getCargoOptions();
        console.log('cargoOptions загружены:', cargoOptionsData?.length || 0);

        // Сохраняем данные
        billingAddresses.value = billingAddressesData || [];
        localities.value = localitiesData || [];
        transportTypes.value = transportTypesData || [];
        tariffGrids.value = tariffGridsData || [];
        tariffZones.value = tariffZonesData || [];
        takeDelivers.value = takeDeliversData || [];
        boxings.value = boxingsData || [];
        units.value = unitsData || [];
        regions.value = regionsData || [];
        cargoOptions.value = cargoOptionsData || [];

        console.log('Данные загружены:', {
            billingAddresses: billingAddresses.value.length,
            transportTypes: transportTypes.value.length,
            tariffGrids: tariffGrids.value.length,
            tariffZones: tariffZones.value.length,
            takeDelivers: takeDelivers.value.length,
            boxings: boxings.value.length,
            units: units.value.length,
            regions: regions.value.length,
            cargoOptions: cargoOptions.value.length
        });


        // Создаем конфигурацию калькулятора для совместимости
        calculatorConfig.value = {
            packaging: boxings.value.map(box => ({
                uid: box.id,
                typeBoxing: box.typeBoxing,
                uidUnit: box.uidUnit,
                price: box.price
            })),
            cargoOptions: cargoOptions.value.map(option => ({
                id: option.id,
                name: option.name,
                description: option.description,
                type: option.type,
                defaultValue: option.defaultValue,
                costImpact: option.costImpact,
                costValue: option.costValue,
                multiplier: option.multiplier,
                enabled: option.enabled
            })),
            defaultValues: {
                cargo: {
                    package: {
                        length: '30',
                        width: '20',
                        height: '10',
                        weight: '5',
                        description: 'Посылка',
                        declaredValue: '',
                        packagingItems: [],
                        selfMarking: false,
                        dangerousGoods: false,
                        tempControl: false,
                        quantity: 1
                    }
                },
                delivery: {
                    mode: 'terminal',
                    advanceBookingDays: 0
                }
            }
        };

        // Проверка GET-параметров после загрузки данных
        const urlParams = new URLSearchParams(window.location.search);
        const fromId = urlParams.get('from');
        const toId = urlParams.get('to');

        // Сохраняем параметры для последующей установки
        window.pendingAddresses = { fromId, toId };
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        // Показываем ошибку пользователю, но не блокируем интерфейс
        alert('Ошибка загрузки данных. Проверьте подключение к интернету.');
    }
}

function deg2rad(num) {
    return num * Math.PI / 180;
}

function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function isFormDataValid() {
    const { direction, cargo } = formData;

    // Проверяем основные поля - города отправления и назначения
    if (!direction.from || !direction.to) return false;
    
    // Проверяем наличие locality_id для корректного расчета
    if (!direction.fromLocalityId || !direction.toLocalityId) return false;

    // Проверяем обязательные поля груза согласно ТЗ
    if (!cargo.packages || cargo.packages.length === 0) return false;
    
    // Проверяем каждое место на наличие обязательных полей
    for (const pkg of cargo.packages) {
        const length = parseFloat(pkg.length);
        const width = parseFloat(pkg.width);
        const height = parseFloat(pkg.height);
        const weight = parseFloat(pkg.weight);
        const quantity = parseInt(pkg.quantity);
        
        // Проверяем обязательные поля согласно ТЗ
        if (!length || length <= 0) return false;
        if (!width || width <= 0) return false;
        if (!height || height <= 0) return false;
        if (!weight || weight <= 0) return false;
        if (!quantity || quantity <= 0) return false;
    }

    return true;
}

function calculateCost() {
    // Проверяем загружены ли данные
    if (!transportTypes.value || transportTypes.value.length === 0) {
        return null;
    }

    // Проверяем валидность данных формы
    if (!isFormDataValid()) {
        return null;
    }

    // Получаем доступные тарифы
    const availableTariffs = transportTypes.value || [];
    if (availableTariffs.length === 0) {
        return null;
    }

    // Автоматически выбираем первый доступный тариф, если ничего не выбрано
    if (!formData.selectedTariff && availableTariffs.length > 0) {
        formData.selectedTariff = availableTariffs[0].id;
    }

    // Рассчитываем стоимость для всех доступных тарифов
    const tariffCalculations = availableTariffs.map(tariff => {
        const calculation = calculateTariffCost(tariff);
        return {
            ...tariff,
            cost: calculation ? calculation.totalCost : null,
            details: calculation ? calculation.details : [],
            summary: calculation ? calculation.summary : null,
            isAvailable: calculation !== null
        };
    });

    // Сортируем тарифы по стоимости (от самого выгодного к самому дорогому)
    tariffCalculations.sort((a, b) => (a.cost || 0) - (b.cost || 0));

    // Рассчитываем экономию относительно самого дорогого тарифа
    const mostExpensive = tariffCalculations[tariffCalculations.length - 1];
    const tariffsWithSavings = tariffCalculations.map((calc, index) => ({
        ...calc,
        savings: (mostExpensive.cost || 0) - (calc.cost || 0),
        isRecommended: index === 0 && tariffCalculations.length > 1 // Самый выгодный
    }));

    // Выбираем тариф: пользовательский выбор или самый выгодный
    let selectedTariff = null;
    if (formData.selectedTariff) {
        // Проверяем, что выбранный тариф доступен
        selectedTariff = availableTariffs.find(t => t.id === formData.selectedTariff);
    }

    // Если выбранный тариф недоступен или не выбран, берем самый выгодный
    if (!selectedTariff && tariffsWithSavings.length > 0) {
        selectedTariff = tariffsWithSavings[0];
        formData.selectedTariff = selectedTariff.id;
    }

    // Находим результат для выбранного тарифа
    const selectedCalculation = tariffsWithSavings.find(calc => calc.id === selectedTariff.id);

    return {
        totalCost: selectedCalculation ? selectedCalculation.cost : null,
        details: selectedCalculation ? selectedCalculation.details : [],
        tariff: selectedTariff,
        availableTariffs: tariffsWithSavings,
        summary: selectedCalculation ? selectedCalculation.summary : null
    };
}

// Reactive calculation result
const calculationResult = computed(() => {
    if (!transportTypes.value || !formData.direction.from || !formData.direction.to) {
        return {
            isValid: false,
            message: 'Заполните города отправления и назначения',
            allTariffs: [],
            selectedTariff: null,
            calculation: null
        };
    }
    
    // Проверяем обязательные поля груза
    if (!isFormDataValid()) {
        const missingFields = [];
        const { cargo } = formData;
        
        if (!cargo.packages || cargo.packages.length === 0) {
            missingFields.push('параметры груза (места)');
        } else {
            cargo.packages.forEach((pkg, index) => {
                const placeNum = index + 1;
                if (!parseFloat(pkg.length) || parseFloat(pkg.length) <= 0) {
                    missingFields.push(`длина места ${placeNum}`);
                }
                if (!parseFloat(pkg.width) || parseFloat(pkg.width) <= 0) {
                    missingFields.push(`ширина места ${placeNum}`);
                }
                if (!parseFloat(pkg.height) || parseFloat(pkg.height) <= 0) {
                    missingFields.push(`высота места ${placeNum}`);
                }
                if (!parseFloat(pkg.weight) || parseFloat(pkg.weight) <= 0) {
                    missingFields.push(`вес места ${placeNum}`);
                }
                if (!parseInt(pkg.quantity) || parseInt(pkg.quantity) <= 0) {
                    missingFields.push(`количество места ${placeNum}`);
                }
            });
        }
        
        return {
            isValid: false,
            message: missingFields.length > 0 
                ? `Для расчета необходимо заполнить обязательные поля: ${missingFields.join(', ')}`
                : 'Для расчета необходимо заполнить все обязательные поля груза',
            allTariffs: [],
            selectedTariff: null,
            calculation: null
        };
    }
    
    const allTariffs = getAllTariffsWithStatus();
    // Считаем стоимость только для доступных тарифов
    const tariffCalculations = allTariffs.map(tariff => {
        if (tariff.isAvailable) {
            const calculation = calculateTariffCost(tariff);
            return {
                ...tariff,
                cost: calculation ? calculation.totalCost : null,
                details: calculation ? calculation.details : [],
                packageDetails: calculation ? calculation.packageDetails : [],
                summary: calculation ? calculation.summary : null,
                deliveryInfo: calculation ? calculation.deliveryInfo : null,
                minDeliveryDate: calculation ? calculation.minDeliveryDate : null,
                distanceKm: calculation ? calculation.distanceKm : null
            };
        } else {
            return {
                ...tariff,
                cost: null,
                details: [],
                summary: null,
                deliveryInfo: null,
                minDeliveryDate: null,
                distanceKm: null
            };
        }
    });

    // Находим доступные тарифы и сортируем по цене
    const available = tariffCalculations.filter(t => t.isAvailable).sort((a, b) => (a.cost || 0) - (b.cost || 0));
    const unavailable = tariffCalculations.filter(t => !t.isAvailable);

    // Рассчитываем экономию относительно базового тарифа (cargo-basic)
    const basicTariff = available.find(t => t.id === 1);
    const basicCost = basicTariff ? basicTariff.cost : null;

    // Добавляем информацию об экономии и рекомендации
    const availableWithSavings = available.map((tariff, index) => {
        let savingsAmount = 0;
        let isRecommended = false;

        if (basicCost && tariff.cost < basicCost) {
            savingsAmount = basicCost - tariff.cost;
            // Рекомендуем самый выгодный тариф при наличии экономии и нескольких доступных тарифов
            isRecommended = index === 0 && available.length > 1 && savingsAmount > 0;
        }

        return {
            ...tariff,
            savings: savingsAmount,
            isRecommended
        };
    });

    const allSorted = [...availableWithSavings, ...unavailable];

    // Выбранный тариф — пользовательский или первый доступный
    let selectedTariff = null;
    if (formData.selectedTariff) {
        selectedTariff = availableWithSavings.find(t => t.id === formData.selectedTariff);
    }
    if (!selectedTariff && availableWithSavings.length > 0) {
        selectedTariff = availableWithSavings[0];
        formData.selectedTariff = selectedTariff.id;
    }


    return {
        isValid: allSorted.length > 0, // Показываем интерфейс если есть любые тарифы (доступные или недоступные)
        message: availableWithSavings.length === 0 ? 'Нет доступных тарифов для указанных параметров' : '',
        allTariffs: allSorted,
        selectedTariff,
        calculation: selectedTariff,
        distanceKm: selectedTariff?.distanceKm || null
    };
});

function printResult() {
    window.print();
}

function selectTariff(tariffUid) {
    formData.selectedTariff = tariffUid;
}

// Функция для установки адресов из GET-параметров
function setAddressesFromParams() {
    if (!window.pendingAddresses) return;
    
    const { fromId, toId } = window.pendingAddresses;
    
    if (fromId) {
        const locality = localities.value.find(loc => loc.id == fromId);
        if (locality) {
            formData.direction.fromAddress = locality;
            formData.direction.from = formatSelectedLocalityName(locality);
            formData.direction.fromLocalityId = locality.id;
        }
    }
    
    if (toId) {
        const locality = localities.value.find(loc => loc.id == toId);
        if (locality) {
            formData.direction.toAddress = locality;
            formData.direction.to = formatSelectedLocalityName(locality);
            formData.direction.toLocalityId = locality.id;
        }
    }
    
    // Очищаем сохраненные параметры
    delete window.pendingAddresses;
}


onMounted(async () => {
    await fetchData();
    // Устанавливаем адреса после загрузки данных и инициализации компонентов
    setTimeout(() => {
        setAddressesFromParams();
    }, 100);
});
</script>