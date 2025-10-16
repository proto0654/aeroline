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
    
    // Минимальные учитываемые значения для расчета
    const minimalValues = calculatorConfig.value.minimalValues?.cargo?.package || {
        length: 10, width: 10, height: 5, weight: 0.1, quantity: 1
    };

    // Process each package, applying minimal values for missing fields
    const processedPackages = (cargo.packages && cargo.packages.length > 0)
        ? cargo.packages.map(pkg => {
            const hasWeight = parseFloat(pkg.weight) > 0;
            const hasDimensions = parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0;
            const hasQuantity = parseInt(pkg.quantity) > 0;
            
            return {
                ...pkg,
                weight: hasWeight ? parseFloat(pkg.weight) : minimalValues.weight,
                length: hasDimensions ? parseFloat(pkg.length) : minimalValues.length,
                width: hasDimensions ? parseFloat(pkg.width) : minimalValues.width,
                height: hasDimensions ? parseFloat(pkg.height) : minimalValues.height,
                quantity: hasQuantity ? parseInt(pkg.quantity) : minimalValues.quantity,
                // Флаги для отображения в UI
                usesMinimalWeight: !hasWeight,
                usesMinimalDimensions: !hasDimensions,
                usesMinimalQuantity: !hasQuantity
            };
        })
        : [{
            weight: minimalValues.weight,
            length: minimalValues.length,
            width: minimalValues.width,
            height: minimalValues.height,
            quantity: minimalValues.quantity,
            description: 'Посылка',
            declaredValue: '',
            packagingItems: [],
            selfMarking: false,
            dangerousGoods: false,
            tempControl: false,
            id: Date.now(),
            usesMinimalWeight: true,
            usesMinimalDimensions: true,
            usesMinimalQuantity: true
        }];

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
    
    // Всегда добавляем общий тариф как альтернативу
    const defaultTariff = getDefaultTariff();
    const defaultTariffCost = calculateDefaultTariffCost(defaultTariff, cargoData, distanceKm);
    
    if (defaultTariffCost) {
        defaultTariff.cost = defaultTariffCost.totalCost;
        defaultTariff.deliveryInfo = {
            days: defaultTariffCost.deliveryDays,
            description: `${defaultTariffCost.deliveryDays} дней`
        };
        defaultTariff.isAvailable = true;
    }
    // Добавляем общий тариф в начало списка
    result.unshift(defaultTariff);
    
    return result;
}

// Функция для получения общего тарифа по умолчанию
function getDefaultTariff() {
    // Выбираем самый универсальный тариф из API (Cargo-Базовый или Cargo-Стандарт)
    const defaultTariffConfig = calculatorConfig.value.tariffs?.find(t => t.id === 'cargo-basic') || 
                               calculatorConfig.value.tariffs?.find(t => t.id === 'cargo-region') ||
                               calculatorConfig.value.tariffs?.[0];
    
    if (defaultTariffConfig) {
        return {
            id: 'default',
            name: defaultTariffConfig.name,
            fullName: defaultTariffConfig.name,
            description: defaultTariffConfig.description || 'Тариф для данного направления',
            transportationCoefficient: defaultTariffConfig.baseRatePerKg || 5000,
            isAvailable: true, // Общий тариф всегда доступен
            cost: null, // Будет рассчитан отдельно
            reason: null,
            deliveryInfo: {
                days: defaultTariffConfig.deliveryTime?.baseDays || 5,
                description: defaultTariffConfig.deliveryTime?.description || '5-7 дней'
            },
            minCost: defaultTariffConfig.minCost || 500
        };
    }
    
    // Fallback если нет конфигурации
    return {
        id: 'default',
        name: 'Общий тариф',
        fullName: 'Общий тариф',
        description: 'Тариф для данного направления',
        transportationCoefficient: 5000,
        isAvailable: true, // Общий тариф всегда доступен
        cost: null,
        reason: null,
        deliveryInfo: {
            days: 5,
            description: '5-7 дней'
        }
    };
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

// Функция для расчета стоимости общего тарифа
function calculateDefaultTariffCost(defaultTariff, cargoData, distanceKm) {
    if (!cargoData.packages || cargoData.packages.length === 0) {
        return null;
    }

    const totalWeight = cargoData.packages.reduce((sum, pkg) => sum + (pkg.weight * pkg.quantity), 0);
    const totalVolume = cargoData.packages.reduce((sum, pkg) => {
        const volume = (pkg.length * pkg.width * pkg.height) / 1000000; // см³ в м³
        return sum + (volume * pkg.quantity);
    }, 0);

    // Проверяем, что у нас есть валидные данные
    if (totalWeight <= 0 && totalVolume <= 0) {
        return null;
    }

    // Базовая стоимость по весу и объему
    const coefficient = defaultTariff.transportationCoefficient || 5000;
    const weightCost = totalWeight * coefficient;
    const volumeCost = totalVolume * (coefficient * 100);
    const minCost = defaultTariff.minCost || 500;
    
    const baseCost = Math.max(weightCost, volumeCost, minCost);

    // Коэффициент расстояния (более консервативный)
    const distanceCoefficient = distanceKm ? Math.max(1, Math.min(distanceKm / 200, 3)) : 1;
    const totalCost = baseCost * distanceCoefficient;

    // Время доставки
    const deliveryDays = Math.max(1, Math.ceil((distanceKm || 100) / 500) + 2);

    return {
        totalCost: Math.round(totalCost),
        deliveryDays: deliveryDays,
        baseCost: Math.round(baseCost),
        distanceCoefficient: distanceCoefficient
    };
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

    // 6. Расчет по формулам ТЗ для каждого места
    packages.forEach((pkg, index) => {
        const length = parseFloat(pkg.length) || 0;
        const width = parseFloat(pkg.width) || 0;
        const height = parseFloat(pkg.height) || 0;
        const weight = parseFloat(pkg.weight) || 0;
        const quantity = parseInt(pkg.quantity) || 1;
        const declaredValue = parseFloat(pkg.declaredValue) || 0;

        // Формулы из ТЗ:
        // V = L * W * H (в см³)
        const volume = (length * width * height) / 1000000; // переводим в м³
        
        // Wv = V / transportationCoefficient
        const volumetricWeight = volume / typeTransportation.transportationCoefficient;
        
        // Wf = count * weight
        const actualWeight = weight * quantity;
        
        // W = max(Wv, Wf)
        const calculatedWeight = Math.max(volumetricWeight, actualWeight);

        totalWeight += calculatedWeight;
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
            volumetricWeight: volumetricWeight,
            calculatedWeight: calculatedWeight,
            quantity: quantity,
            totalWeight: calculatedWeight,
            totalVolume: volume * quantity,
            dangerousGoods: pkg.dangerousGoods,
            tempControl: pkg.tempControl,
            declaredValue: declaredValue
        };
        packageDetails.push(packageInfo);
    });

    // 7. Расчет стоимости по тарифной сетке
    let baseCost = 0;
    const totalCalculatedWeight = totalWeight;

    // Найти подходящий диапазон в тарифной сетке
    const applicableTariff = relevantTarifGrid.find(tg => 
        totalCalculatedWeight >= tg.unitFrom && totalCalculatedWeight <= tg.unitTo
    );

    if (applicableTariff) {
        // Формула: startingPrice + ((W - unitFrom) / step) * stepPrice
        const steps = Math.ceil((totalCalculatedWeight - applicableTariff.unitFrom) / applicableTariff.step);
        baseCost = applicableTariff.startingPrice + (steps * applicableTariff.stepPrice);
    } else {
        // Если не найден подходящий диапазон, используем последний доступный
        const lastTariff = relevantTarifGrid[relevantTarifGrid.length - 1];
        if (lastTariff) {
            const steps = Math.ceil((totalCalculatedWeight - lastTariff.unitFrom) / lastTariff.step);
            baseCost = lastTariff.startingPrice + (steps * lastTariff.stepPrice);
        }
    }

    // 8. Применение коэффициентов
    let totalMultiplier = 1;

    // Коэффициент зоны
    if (tariffZone.coefficient) {
        totalMultiplier *= tariffZone.coefficient;
    }

    // Коэффициенты забора/доставки
    if (takeDeliverFrom?.coefficientSurcharge) {
        totalMultiplier *= takeDeliverFrom.coefficientSurcharge;
    }
    if (takeDeliverTo?.coefficientSurcharge) {
        totalMultiplier *= takeDeliverTo.coefficientSurcharge;
    }

    // Надбавки
    if (takeDeliverFrom?.surcharge) {
        additionalCosts += takeDeliverFrom.surcharge;
    }
    if (takeDeliverTo?.surcharge) {
        additionalCosts += takeDeliverTo.surcharge;
    }

    // Коэффициенты за опасный груз и температурный режим
    if (hasAnyDangerousGoods) {
        totalMultiplier *= 1.4; // Примерный коэффициент
    }
    if (hasAnyTempControl) {
        totalMultiplier *= 1.25; // Примерный коэффициент
    }

    // 9. Расчет итоговой стоимости
    const adjustedBaseCost = baseCost * totalMultiplier;
    const finalCost = adjustedBaseCost + additionalCosts;

    // 10. Формирование детализации
    details.push({ name: 'РАСЧЕТ ПО ТЗ', cost: 0, isHeader: true });
            details.push({
        name: `Объем: ${totalVolume.toFixed(3)} м³`,
        cost: 0
            });
                details.push({
        name: `Объемный вес: ${(totalVolume / typeTransportation.transportationCoefficient).toFixed(2)} кг`,
        cost: 0
                });
                details.push({
        name: `Фактический вес: ${(totalWeight / totalPackagesCount).toFixed(2)} кг`,
        cost: 0
                });
                details.push({
        name: `Расчетный вес: ${totalCalculatedWeight.toFixed(2)} кг`,
        cost: 0
                });
                details.push({
        name: `Тарифная зона: ${tariffZone.tariffZone}`,
        cost: 0
                });
                details.push({
        name: `Базовая стоимость: ${baseCost.toFixed(2)} ₽`,
        cost: baseCost
        });

    if (totalMultiplier !== 1) {
                    details.push({
            name: `Коэффициенты: ${totalMultiplier.toFixed(2)}`,
            cost: adjustedBaseCost - baseCost
        });
    }
    
    if (additionalCosts > 0) {
                    details.push({
            name: `Дополнительные надбавки: ${additionalCosts.toFixed(2)} ₽`,
            cost: additionalCosts
        });
    }

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
            baseCost: adjustedBaseCost,
            additionalServices: additionalCosts,
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
    const { direction } = formData;

    // Проверяем основные поля - города отправления и назначения
    if (!direction.from || !direction.to) return false;
    
    // Проверяем наличие locality_id для корректного расчета
    if (!direction.fromLocalityId || !direction.toLocalityId) return false;

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