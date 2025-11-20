<template>
    <div class="title-wrapper mb-6">
        <h1 class="text-h3 mb-2 px-3 xl:px-0">Калькулятор стоимости перевозки</h1>
    </div>

    <!-- Форма направлений - всегда видна -->
    <div class="bg-brand-light p-5 rounded-lg mb-6">
        <DirectionForm 
            :billingAddresses="billingAddresses" 
            v-model="formData.direction"
            @cityNotFound="handleCityNotFound"
            @cityFound="handleCityFound" />
    </div>

    <!-- Калькулятор (показывается только если выбраны оба доступных города) -->
    <div v-if="showCalculator" class="flex flex-col flex-1 lg:flex-row gap-8 min-w-0">
        <!-- Левая колонка: Формы ввода -->
        <div
            class="flex flex-col gap-6 lg:flex-1 [&_.text-input-vue]:focus-visible:outline-blue-400 [&_.text-input-vue>input]:p-4 [&_.text-input-vue>input::placeholder]:text-gray-600 min-w-0">
            <!-- Пункты доставки -->
            <div class="bg-brand-light p-5 rounded-lg">
                <h2 class="text-h4 font-bold mb-4">Пункты доставки</h2>
                <div class="flex flex-col gap-6">
                    <DeliveryPointForm v-if="formData.direction.from" title="Пункт отправки" terminal-label="Сдать на терминале"
                        address-label="Забрать по адресу" name-prefix="departure" :city="formData.direction.from"
                        :locality="formData.direction.fromAddress" 
                        :localities="[]" :billingAddresses="billingAddresses" :terminals="terminals" 
                        :takeDelivers="takeDelivers" :transportTypes="transportTypes"
                        v-model="formData.departure" 
                        @update:modelValue="(value) => { console.log('CalculatorPage: Обновление departure', value); formData.departure = value; }"
                        @addressNotFound="handleAddressNotFound"
                        @addressFound="handleAddressFound" />
                    <DeliveryPointForm v-if="formData.direction.to" title="Пункт назначения" terminal-label="Получить на терминале"
                        address-label="Доставить по адресу" name-prefix="destination" :city="formData.direction.to"
                        :locality="formData.direction.toAddress" 
                        :localities="[]" :billingAddresses="billingAddresses" :terminals="terminals" 
                        :takeDelivers="takeDelivers" :transportTypes="transportTypes"
                        v-model="formData.destination" 
                        @update:modelValue="(value) => { console.log('CalculatorPage: Обновление destination', value); formData.destination = value; }"
                        @addressNotFound="handleAddressNotFound"
                        @addressFound="handleAddressFound" />
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

    <!-- Сообщение и форма запроса (показывается если города не выбраны или недоступны) -->
    <div v-else class="bg-brand-light p-5 rounded-lg">
        <p class="text-gray-600 mb-4">Выберите направление выше.</p>
        <p class="text-gray-600 mb-6">Если вашего направления нет в списке, заполните форму ниже, и наш менеджер свяжется с вами для уточнения деталей.</p>
        <ManagerRequestForm
            :prefill-region="managerRequestData.region"
            :prefill-locality="managerRequestData.locality"
            :prefill-street="managerRequestData.street"
            :regions="availableRegions"
            :localities="availableCities"
            @cancel="handleManagerRequestCancel"
            @submit="handleManagerRequestSubmit" />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import DirectionForm from './DirectionForm.vue';
import CargoParamsForm from './CargoParamsForm.vue';
import DeliveryPointForm from './DeliveryPointForm.vue';
import ExtraOptionsForm from './ExtraOptionsForm.vue';
import CalculationResult from './CalculationResult.vue';
import ManagerRequestForm from './ManagerRequestForm.vue';
import apiService from '../../../services/apiService.js';
import { formatSelectedLocalityName } from '../../../utils/localityFormatter.js';

// Новые данные из API
const billingAddresses = ref([]);
const terminals = ref([]);
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

// Состояние для отслеживания недоступных направлений
const invalidFromCity = ref(null);
const invalidToCity = ref(null);
const invalidFromAddress = ref(null);
const invalidToAddress = ref(null);

// Данные для формы запроса к менеджеру
const managerRequestData = computed(() => {
    // Используем данные из выбранных городов или invalid состояний
    const fromCity = formData.direction.fromAddress || invalidFromCity.value;
    const toCity = formData.direction.toAddress || invalidToCity.value;
    
    // Приоритет: адрес > город отправки > город назначения
    if (invalidFromAddress.value) {
        return {
            region: invalidFromAddress.value.region || '',
            locality: invalidFromAddress.value.city || '',
            street: invalidFromAddress.value.street || ''
        };
    }
    if (invalidToAddress.value) {
        return {
            region: invalidToAddress.value.region || '',
            locality: invalidToAddress.value.city || '',
            street: invalidToAddress.value.street || ''
        };
    }
    if (fromCity) {
        return {
            region: fromCity.region || '',
            locality: fromCity.name || fromCity.city || '',
            street: ''
        };
    }
    if (toCity) {
        return {
            region: toCity.region || '',
            locality: toCity.name || toCity.city || '',
            street: ''
        };
    }
    return {
        region: '',
        locality: '',
        street: ''
    };
});

// Извлекаем уникальные города из billingAddresses для формы запроса
const availableCities = computed(() => {
    const citiesMap = new Map();
    billingAddresses.value.forEach(addr => {
        const city = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        const region = typeof addr.region === 'string' ? addr.region : (addr.region?.name || '');
        if (city && city.trim() !== '') {
            if (!citiesMap.has(city)) {
                citiesMap.set(city, {
                    name: city,
                    region: region || ''
                });
            }
        }
    });
    return Array.from(citiesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
});

// Извлекаем уникальные регионы из billingAddresses для формы запроса
const availableRegions = computed(() => {
    const regionsSet = new Set();
    billingAddresses.value.forEach(addr => {
        const region = typeof addr.region === 'string' ? addr.region : (addr.region?.name || '');
        if (region && region.trim() !== '') {
            regionsSet.add(region);
        }
    });
    return Array.from(regionsSet).sort();
});

// Показывать ли калькулятор (только если выбраны оба доступных города)
const showCalculator = computed(() => {
    // Извлекаем названия городов из fromAddress и toAddress
    const fromCityName = formData.direction.fromAddress 
        ? (typeof formData.direction.fromAddress === 'string' 
            ? formData.direction.fromAddress 
            : (formData.direction.fromAddress.name || ''))
        : formData.direction.from;
    
    const toCityName = formData.direction.toAddress 
        ? (typeof formData.direction.toAddress === 'string' 
            ? formData.direction.toAddress 
            : (formData.direction.toAddress.name || ''))
        : formData.direction.to;
    
    // Проверяем что оба города выбраны и есть в billingAddresses
    if (!fromCityName || !toCityName) {
        return false;
    }
    
    const fromExists = billingAddresses.value.some(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        return addrCity === fromCityName;
    });
    
    const toExists = billingAddresses.value.some(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        return addrCity === toCityName;
    });
    
    return fromExists && toExists;
});

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
    if (billingAddresses.value && direction.fromAddress && direction.toAddress) {
        let fromCoords = null;
        let toCoords = null;
        
        // Извлекаем названия городов из fromAddress и toAddress
        const fromCityName = typeof direction.fromAddress === 'string' 
            ? direction.fromAddress 
            : (direction.fromAddress.name || '');
        const toCityName = typeof direction.toAddress === 'string' 
            ? direction.toAddress 
            : (direction.toAddress.name || '');
        
        // Ищем адреса по названию города
        const fromAddressForCoords = billingAddresses.value.find(addr => {
            const addrLocalityName = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
            return addrLocalityName === fromCityName;
        });
        const toAddressForCoords = billingAddresses.value.find(addr => {
            const addrLocalityName = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
            return addrLocalityName === toCityName;
        });
        
        if (fromAddressForCoords && fromAddressForCoords.coordinates) {
            fromCoords = fromAddressForCoords.coordinates;
        }
        if (toAddressForCoords && toAddressForCoords.coordinates) {
            toCoords = toAddressForCoords.coordinates;
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
        
        // Проверяем наличие адресов (используем fromAddress/toAddress вместо fromLocalityId/toLocalityId)
        if (!direction.fromAddress || !direction.toAddress) {
            reason = 'Не выбраны города отправления и назначения';
        } else {
            // calculateTariffCost уже проверил все необходимые данные
            // Если он вернул null, значит проблема в поиске takeDeliver или tariffZone
            // Детальная причина будет в логах calculateTariffCost
            reason = 'Нет данных для расчета. Проверьте консоль браузера для деталей.';
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

    // Определяем режим доставки
    const isPickupAtTerminal = departure.deliveryMode === 'terminal';
    const isDeliveryAtTerminal = destination.deliveryMode === 'terminal';
    
    console.log('calculateTariffCost: Начало расчета', {
        typeTransportation: typeTransportation.name,
        isPickupAtTerminal,
        isDeliveryAtTerminal,
        departure: {
            deliveryMode: departure.deliveryMode,
            location: departure.location,
            locationType: typeof departure.location,
            locationKeys: departure.location && typeof departure.location === 'object' ? Object.keys(departure.location) : null,
            uidBillingAddress: departure.location?.uidBillingAddress
        },
        destination: {
            deliveryMode: destination.deliveryMode,
            location: destination.location,
            locationType: typeof destination.location,
            locationKeys: destination.location && typeof destination.location === 'object' ? Object.keys(destination.location) : null,
            uidBillingAddress: destination.location?.uidBillingAddress
        }
    });
    
    const transportTypeUid = typeTransportation.uid;
    
    // 1. Найти takeDeliver записи для забора и доставки
    let takeDeliverFrom = null;
    let takeDeliverTo = null;
    let fromAddress = null;
    let toAddress = null;
    
    // Для забора
    if (isPickupAtTerminal) {
        // Терминал: используем direction.fromAddress для определения города, затем находим billingAddress
        const terminalFrom = departure.location && typeof departure.location === 'object' ? departure.location : null;
        
        console.log('Поиск takeDeliverFrom для терминала:', {
            isPickupAtTerminal,
            terminalFrom,
            terminalFromKeys: terminalFrom ? Object.keys(terminalFrom) : null,
            uidBillingAddress: terminalFrom?.uidBillingAddress,
            directionFromAddress: direction.fromAddress
        });
        
        // Сначала пытаемся использовать uidBillingAddress из терминала напрямую
        if (terminalFrom && terminalFrom.uidBillingAddress) {
            // Находим billingAddress по uidBillingAddress из терминала
            fromAddress = billingAddresses.value.find(addr => 
                String(addr.uid) === String(terminalFrom.uidBillingAddress)
            );
            
            if (fromAddress) {
                takeDeliverFrom = takeDelivers.value.find(td => 
                    String(td.uidBillingAddress) === String(terminalFrom.uidBillingAddress) && 
                    String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                console.log('takeDeliverFrom найден через uidBillingAddress:', takeDeliverFrom ? {
                    uid: takeDeliverFrom.uid,
                    uidBillingAddress: takeDeliverFrom.uidBillingAddress,
                    tariffZone: takeDeliverFrom.tariffZone
                } : 'не найден');
            }
        }
        
        // Если не нашли через uidBillingAddress, используем direction.fromAddress
        if (!takeDeliverFrom && direction.fromAddress) {
            const fromCityName = typeof direction.fromAddress === 'string' 
                ? direction.fromAddress 
                : (direction.fromAddress.name || '');
            
            console.log('Поиск fromAddress для терминала через direction.fromAddress:', {
                fromCityName,
                directionFromAddress: direction.fromAddress
            });
            
            // Находим billingAddress по названию города
            fromAddress = billingAddresses.value.find(addr => {
                const addrLocalityName = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
                return addrLocalityName === fromCityName;
            });
            
            if (fromAddress) {
                const fromAddressUid = fromAddress.uid;
                takeDeliverFrom = takeDelivers.value.find(td => 
                    String(td.uidBillingAddress) === String(fromAddressUid) && 
                    String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                console.log('takeDeliverFrom найден через direction.fromAddress:', takeDeliverFrom ? {
                    uid: takeDeliverFrom.uid,
                    uidBillingAddress: takeDeliverFrom.uidBillingAddress,
                    tariffZone: takeDeliverFrom.tariffZone
                } : 'не найден');
            }
        }
        
        if (!takeDeliverFrom) {
            console.warn('takeDeliverFrom не найден для терминала:', {
                terminalFrom,
                hasUidBillingAddress: terminalFrom?.uidBillingAddress,
                directionFromAddress: direction.fromAddress,
                fromAddress: fromAddress ? 'found' : 'not found'
            });
        }
    } else {
        // Адрес: терминалы находятся в той же таблице billingAddresses, просто у них не заполнена улица
        // Используем тот же billingAddress, что и для терминала в этом городе (через uidBillingAddress из terminals)
        if (direction.fromAddress) {
            const fromCityName = typeof direction.fromAddress === 'string' 
                ? direction.fromAddress 
                : (direction.fromAddress.name || '');
            
            console.log('Поиск fromAddress для адреса:', {
                fromCityName,
                directionFromAddress: direction.fromAddress,
                billingAddressesCount: billingAddresses.value.length
            });
            
            // Находим billingAddress через терминал для этого города (терминалы в той же таблице billingAddresses)
            const terminalsInCity = terminals.value.filter(t => {
                const termCityName = typeof t.locality === 'string' ? t.locality : (t.locality?.name || '');
                return termCityName === fromCityName;
            });
            
            if (terminalsInCity.length > 0 && terminalsInCity[0].uidBillingAddress) {
                // Используем billingAddress из терминала (терминалы в той же таблице billingAddresses)
                fromAddress = billingAddresses.value.find(addr => 
                    String(addr.uid) === String(terminalsInCity[0].uidBillingAddress)
                );
                
                console.log('fromAddress найден через терминал:', fromAddress ? {
                    uid: fromAddress.uid,
                    locality: fromAddress.locality,
                    terminalUidBillingAddress: terminalsInCity[0].uidBillingAddress
                } : 'не найден');
            }
            
            // Если не нашли через терминал, используем стандартный поиск по названию города
            if (!fromAddress) {
                fromAddress = billingAddresses.value.find(addr => {
                    const addrLocalityName = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
                    return addrLocalityName === fromCityName;
                });
                
                console.log('fromAddress найден по названию города:', fromAddress ? {
                    uid: fromAddress.uid,
                    locality: fromAddress.locality
                } : 'не найден');
            }
            
            if (fromAddress) {
                const fromAddressUid = fromAddress.uid;
                takeDeliverFrom = takeDelivers.value.find(td => 
                    String(td.uidBillingAddress) === String(fromAddressUid) && 
                    String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                console.log('takeDeliverFrom найден:', takeDeliverFrom ? {
                    uid: takeDeliverFrom.uid,
                    uidBillingAddress: takeDeliverFrom.uidBillingAddress,
                    tariffZone: takeDeliverFrom.tariffZone
                } : 'не найден');
            }
        } else {
            console.warn('direction.fromAddress отсутствует');
        }
    }
    
    // Для доставки
    if (isDeliveryAtTerminal) {
        // Терминал: используем direction.toAddress для определения города, затем находим billingAddress
        const terminalTo = destination.location && typeof destination.location === 'object' ? destination.location : null;
        
        console.log('Поиск takeDeliverTo для терминала:', {
            isDeliveryAtTerminal,
            terminalTo,
            terminalToKeys: terminalTo ? Object.keys(terminalTo) : null,
            uidBillingAddress: terminalTo?.uidBillingAddress,
            directionToAddress: direction.toAddress
        });
        
        // Сначала пытаемся использовать uidBillingAddress из терминала напрямую
        if (terminalTo && terminalTo.uidBillingAddress) {
            // Находим billingAddress по uidBillingAddress из терминала
            toAddress = billingAddresses.value.find(addr => 
                String(addr.uid) === String(terminalTo.uidBillingAddress)
            );
            
            if (toAddress) {
                takeDeliverTo = takeDelivers.value.find(td => 
                    String(td.uidBillingAddress) === String(terminalTo.uidBillingAddress) && 
                    String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                console.log('takeDeliverTo найден через uidBillingAddress:', takeDeliverTo ? {
                    uid: takeDeliverTo.uid,
                    uidBillingAddress: takeDeliverTo.uidBillingAddress,
                    tariffZone: takeDeliverTo.tariffZone
                } : 'не найден');
            }
        }
        
        // Если не нашли через uidBillingAddress, используем direction.toAddress
        if (!takeDeliverTo && direction.toAddress) {
            const toCityName = typeof direction.toAddress === 'string' 
                ? direction.toAddress 
                : (direction.toAddress.name || '');
            
            console.log('Поиск toAddress для терминала через direction.toAddress:', {
                toCityName,
                directionToAddress: direction.toAddress
            });
            
            // Находим billingAddress по названию города
            toAddress = billingAddresses.value.find(addr => {
                const addrLocalityName = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
                return addrLocalityName === toCityName;
            });
            
            if (toAddress) {
                const toAddressUid = toAddress.uid;
                takeDeliverTo = takeDelivers.value.find(td => 
                    String(td.uidBillingAddress) === String(toAddressUid) && 
                    String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                console.log('takeDeliverTo найден через direction.toAddress:', takeDeliverTo ? {
                    uid: takeDeliverTo.uid,
                    uidBillingAddress: takeDeliverTo.uidBillingAddress,
                    tariffZone: takeDeliverTo.tariffZone
                } : 'не найден');
            }
        }
        
        if (!takeDeliverTo) {
            console.warn('takeDeliverTo не найден для терминала:', {
                terminalTo,
                hasUidBillingAddress: terminalTo?.uidBillingAddress,
                directionToAddress: direction.toAddress,
                toAddress: toAddress ? 'found' : 'not found'
            });
        }
    } else {
        // Адрес: терминалы находятся в той же таблице billingAddresses, просто у них не заполнена улица
        // Используем тот же billingAddress, что и для терминала в этом городе (через uidBillingAddress из terminals)
        if (direction.toAddress) {
            const toCityName = typeof direction.toAddress === 'string' 
                ? direction.toAddress 
                : (direction.toAddress.name || '');
            
            console.log('Поиск toAddress для адреса:', {
                toCityName,
                directionToAddress: direction.toAddress,
                billingAddressesCount: billingAddresses.value.length
            });
            
            // Находим billingAddress через терминал для этого города (терминалы в той же таблице billingAddresses)
            const terminalsInCity = terminals.value.filter(t => {
                const termCityName = typeof t.locality === 'string' ? t.locality : (t.locality?.name || '');
                return termCityName === toCityName;
            });
            
            if (terminalsInCity.length > 0 && terminalsInCity[0].uidBillingAddress) {
                // Используем billingAddress из терминала (терминалы в той же таблице billingAddresses)
                toAddress = billingAddresses.value.find(addr => 
                    String(addr.uid) === String(terminalsInCity[0].uidBillingAddress)
                );
                
                console.log('toAddress найден через терминал:', toAddress ? {
                    uid: toAddress.uid,
                    locality: toAddress.locality,
                    terminalUidBillingAddress: terminalsInCity[0].uidBillingAddress
                } : 'не найден');
            }
            
            // Если не нашли через терминал, используем стандартный поиск по названию города
            if (!toAddress) {
                toAddress = billingAddresses.value.find(addr => {
                    const addrLocalityName = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
                    return addrLocalityName === toCityName;
                });
                
                console.log('toAddress найден по названию города:', toAddress ? {
                    uid: toAddress.uid,
                    locality: toAddress.locality
                } : 'не найден');
            }
            
            if (toAddress) {
                const toAddressUid = toAddress.uid;
                takeDeliverTo = takeDelivers.value.find(td => 
                    String(td.uidBillingAddress) === String(toAddressUid) && 
                    String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                console.log('takeDeliverTo найден:', takeDeliverTo ? {
                    uid: takeDeliverTo.uid,
                    uidBillingAddress: takeDeliverTo.uidBillingAddress,
                    tariffZone: takeDeliverTo.tariffZone
                } : 'не найден');
            }
        } else {
            console.warn('direction.toAddress отсутствует');
        }
    }
    
    // Проверяем, что найдены необходимые данные
    if (!takeDeliverFrom || !takeDeliverTo) {
        console.warn('takeDeliver записи не найдены:', {
            isPickupAtTerminal,
            isDeliveryAtTerminal,
            takeDeliverFrom: takeDeliverFrom ? 'found' : 'not found',
            takeDeliverTo: takeDeliverTo ? 'found' : 'not found',
            fromAddress: fromAddress ? 'found' : 'not found',
            toAddress: toAddress ? 'found' : 'not found'
        });
        return null;
    }

    // 2. Найти тарифную зону для данного направления
    // В tariffZones поля uidTakeLocality и uidDeliverLocality содержат uid из takeDelivers
    let takeDeliverFromUid = takeDeliverFrom.uid;
    let takeDeliverToUid = takeDeliverTo.uid;
    
    if (!takeDeliverFromUid || !takeDeliverToUid || !transportTypeUid) {
        console.warn('UID не найдены:', {
            takeDeliverFromUid,
            takeDeliverToUid,
            transportTypeUid,
            takeDeliverFrom: takeDeliverFrom,
            takeDeliverTo: takeDeliverTo,
            typeTransportation: typeTransportation
        });
        return null;
    }
    
    console.log('Поиск тарифной зоны:', {
        takeDeliverFromUid,
        takeDeliverToUid,
        transportTypeUid,
        totalTariffZones: tariffZones.value.length,
        sampleZones: tariffZones.value.slice(0, 3).map(tz => ({
            uidTakeLocality: tz.uidTakeLocality,
            uidDeliverLocality: tz.uidDeliverLocality,
            uidTypeTransportation: tz.uidTypeTransportation
        }))
    });
    
    let tariffZone = tariffZones.value.find(tz => 
        String(tz.uidTakeLocality) === String(takeDeliverFromUid) && 
        String(tz.uidDeliverLocality) === String(takeDeliverToUid) &&
        String(tz.uidTypeTransportation) === String(transportTypeUid)
    );

    if (!tariffZone) {
        const allZonesForTransportType = tariffZones.value.filter(tz => String(tz.uidTypeTransportation) === String(transportTypeUid));
        console.warn('Тарифная зона не найдена:', {
            transportType: typeTransportation.name,
            transportTypeId: typeTransportation.id,
            transportTypeUid: transportTypeUid,
            takeDeliverFromUid: takeDeliverFromUid,
            takeDeliverToUid: takeDeliverToUid,
            totalTariffZones: tariffZones.value.length,
            zonesForTransportType: allZonesForTransportType.length,
            availableZones: allZonesForTransportType.map(tz => ({
                uidTakeLocality: tz.uidTakeLocality,
                uidDeliverLocality: tz.uidDeliverLocality,
                uidTypeTransportation: tz.uidTypeTransportation,
                matchesTake: String(tz.uidTakeLocality) === String(takeDeliverFromUid),
                matchesDeliver: String(tz.uidDeliverLocality) === String(takeDeliverToUid),
                matchesTransport: String(tz.uidTypeTransportation) === String(transportTypeUid)
            }))
        });
        return null;
    }

    console.log('Тарифная зона найдена:', {
        uid: tariffZone.uid,
        tariffZone: tariffZone.tariffZone,
        uidTakeLocality: tariffZone.uidTakeLocality,
        uidDeliverLocality: tariffZone.uidDeliverLocality,
        coefficient: tariffZone.coefficient
    });
    
    // Логирование для отладки (будет использовано позже в расчете забора/доставки)

    // 4. Найти тарифную сетку для данного вида перевозки и зоны
    // Гибкое сравнение: numberZone может быть как числом, так и строкой в базе
    const tariffZoneValue = tariffZone.tariffZone;
    
    // Проверяем, что tariffGrids загружены
    if (!tariffGrids.value || tariffGrids.value.length === 0) {
        console.warn('Тарифные сетки не загружены');
        return null;
    }
    
    const relevantTarifGrid = tariffGrids.value.filter(tg => {
        const transportTypeUid = typeTransportation.uid;
        if (String(tg.transportType_uid) !== String(transportTypeUid)) return false;
        
        // Гибкое сравнение NumberZone: может быть числом или строкой
        const tgNumberZone = tg.NumberZone;
        const expectedZone = tariffZoneValue;
        
        // Прямое сравнение (для одинаковых типов)
        if (tgNumberZone === expectedZone) return true;
        
        // Сравнение как строки
        if (String(tgNumberZone) === String(expectedZone)) return true;
        
        // Сравнение как числа (если оба валидные числа)
        const tgZoneNum = Number(tgNumberZone);
        const expectedZoneNum = Number(expectedZone);
        if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
            return true;
        }
        
        return false;
    });

    if (relevantTarifGrid.length === 0) {
        // Детальная диагностика
        const transportTypeUid = typeTransportation.uid;
        const expectedZoneNum = Number(tariffZoneValue);
        
        const allGridsForTransportType = tariffGrids.value.filter(tg => {
            return String(tg.transportType_uid) === String(transportTypeUid);
        });
        const matchingZones = allGridsForTransportType.filter(tg => {
            const tgNumberZone = tg.NumberZone;
            const expectedZone = tariffZoneValue;
            
            // Прямое сравнение
            if (tgNumberZone === expectedZone) return true;
            
            // Сравнение как строки
            if (String(tgNumberZone) === String(expectedZone)) return true;
            
            // Сравнение как числа
            const tgZoneNum = Number(tgNumberZone);
            const expectedZoneNum = Number(expectedZone);
            if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
                return true;
            }
            
            return false;
        });
        
        console.warn('Тарифная сетка не найдена:', {
            transportType: typeTransportation.name,
            transportTypeId: typeTransportation.id,
            transportTypeUid: transportTypeUid,
            tariffZone: tariffZone.tariffZone,
            tariffZoneValue: tariffZoneValue,
            expectedZoneNum: expectedZoneNum,
            tariffZoneType: typeof tariffZone.tariffZone,
            totalTariffGrids: tariffGrids.value.length,
            totalGridsForTransportType: allGridsForTransportType.length,
            matchingZonesCount: matchingZones.length,
            sampleGrids: allGridsForTransportType.slice(0, 10).map(tg => {
                const tgZoneNum = Number(tg.NumberZone);
                const isZoneMatch = !isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum;
                return {
                    transportType_uid: tg.transportType_uid,
                    transportType_uidType: typeof tg.transportType_uid,
                    NumberZone: tg.NumberZone,
                    NumberZoneType: typeof tg.NumberZone,
                    NumberZoneNum: tgZoneNum,
                    expectedZoneNum: expectedZoneNum,
                    isNaN_tgZone: isNaN(tgZoneNum),
                    isNaN_expected: isNaN(expectedZoneNum),
                    matchesTransportType: String(tg.transportType_uid) === String(transportTypeUid),
                    matchesZone: isZoneMatch
                };
            }),
            uniqueZones: [...new Set(allGridsForTransportType.map(tg => String(tg.NumberZone)))].slice(0, 10)
        });
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

        // Сортируем тарифную сетку по unitFrom для правильного поиска
        const sortedTariffGrid = [...tariffGridArray].sort((a, b) => {
            const aFrom = parseFloat(a.unitFrom) || 0;
            const bFrom = parseFloat(b.unitFrom) || 0;
            return aFrom - bFrom;
        });

        // Найти подходящий диапазон в тарифной сетке
        // Условие из ТЗ: unitFrom <= ПВ <= unitTo (включая границы)
        // Ищем строку, где ПВ попадает в диапазон [unitFrom, unitTo]
        const applicableTariff = sortedTariffGrid.find(tg => {
            const unitFrom = parseFloat(tg.unitFrom) || 0;
            const unitTo = parseFloat(tg.unitTo) || Infinity;
            // Включаем обе границы: unitFrom <= ПВ <= unitTo
            return payableWeight >= unitFrom && payableWeight <= unitTo;
        });

        if (applicableTariff) {
            // Формула из ТЗ: ((ПВ - unitFrom) / step) × stepPrice + startingPrice
            const unitFrom = parseFloat(applicableTariff.unitFrom) || 0;
            const step = parseFloat(applicableTariff.step) || 1;
            const stepPrice = parseFloat(applicableTariff.stepPrice) || 0;
            const startingPrice = parseFloat(applicableTariff.startingPrice) || 0;
            
            // Расчет шагов: если ПВ < unitFrom, шаги = 0 (используем только startingPrice)
            const steps = payableWeight > unitFrom 
                ? Math.ceil((payableWeight - unitFrom) / step)
                : 0;
            
            return startingPrice + (steps * stepPrice);
        } else {
            // Если не найден подходящий диапазон
            const firstTariff = sortedTariffGrid[0];
            const lastTariff = sortedTariffGrid[sortedTariffGrid.length - 1];
            
            if (!firstTariff) {
                return 0;
            }
            
            const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
            const lastUnitTo = parseFloat(lastTariff.unitTo) || Infinity;
            
            // Если ПВ меньше минимального unitFrom - используем минимальную стоимость (startingPrice первой строки)
            if (payableWeight < firstUnitFrom) {
                console.warn('Платный вес меньше минимального unitFrom, используем минимальную стоимость:', {
                    payableWeight,
                    firstUnitFrom,
                    startingPrice: firstTariff.startingPrice
                });
                return parseFloat(firstTariff.startingPrice) || 0;
            }
            
            // Если ПВ больше максимального unitTo - используем расчет по последней строке
            if (payableWeight > lastUnitTo) {
                const unitFrom = parseFloat(lastTariff.unitFrom) || 0;
                const step = parseFloat(lastTariff.step) || 1;
                const stepPrice = parseFloat(lastTariff.stepPrice) || 0;
                const startingPrice = parseFloat(lastTariff.startingPrice) || 0;
                
                const steps = Math.ceil((payableWeight - unitFrom) / step);
                return startingPrice + (steps * stepPrice);
            }
            
            // Если попали сюда, значит что-то не так с данными
            console.warn('Не удалось найти подходящий тариф, используем минимальную стоимость:', {
                payableWeight,
                firstUnitFrom,
                lastUnitTo,
                startingPrice: firstTariff.startingPrice
            });
            return parseFloat(firstTariff.startingPrice) || 0;
        }
    }

    // 7.1. Расчет стоимости перевозки
    // По ТЗ: для перевозки используется зона из tariffZones.tariffZone (зона перевозки между городами)
    const transportationBaseCost = calculateCostByTariffGrid(relevantTarifGrid, totalPayableWeight);
    let transportationCost = transportationBaseCost;
    
    // Детальное логирование для отладки
    console.log('Расчет стоимости перевозки:', {
        fromLocalityId: direction.fromLocalityId,
        toLocalityId: direction.toLocalityId,
        transportTypeId: typeTransportation.id,
        transportationZone: tariffZone.tariffZone,
        transportationZoneSource: 'tariffZones.tariffZone',
        tariffZone: {
            uid: tariffZone.uid || null,
            uidTakeLocality: tariffZone.uidTakeLocality,
            uidDeliverLocality: tariffZone.uidDeliverLocality,
            tariffZone: tariffZone.tariffZone,
            coefficient: tariffZone.coefficient,
            minTermDays: tariffZone.minTermDays,
            maxTermDays: tariffZone.maxTermDays
        },
        relevantTariffGrid: relevantTarifGrid.map(tg => ({
            NumberZone: tg.NumberZone,
            unitFrom: tg.unitFrom,
            unitTo: tg.unitTo,
            startingPrice: tg.startingPrice,
            step: tg.step,
            stepPrice: tg.stepPrice
        })),
        totalPayableWeight: totalPayableWeight,
        transportationBaseCost: transportationBaseCost
    });
    
    // Применяем коэффициент зоны к перевозке
    if (tariffZone.coefficient && tariffZone.coefficient !== 1) {
        transportationCost *= tariffZone.coefficient;
        console.log('Применен коэффициент зоны перевозки:', {
            baseCost: transportationBaseCost,
            coefficient: tariffZone.coefficient,
            costAfterCoefficient: transportationCost
        });
    } else {
        console.log('Коэффициент зоны перевозки не применяется (coefficient =', tariffZone.coefficient || 1, ')');
    }
    
    console.log('Итоговая стоимость перевозки (до применения коэффициентов опасного груза/температурного режима):', {
        baseCost: transportationBaseCost,
        coefficient: tariffZone.coefficient || 1,
        costAfterCoefficient: transportationCost
    });

    // 7.2. Расчет стоимости забора (если не терминал)
    // По ТЗ: для забора используется зона из takeDeliver.tariffZone (например, "D")
    // Зона перевозки (tariffZone.tariffZone) используется ТОЛЬКО для перевозки между городами
    // Если выбран терминал - забор не считается
    let pickupCost = 0;
    
    if (!isPickupAtTerminal && takeDeliverFrom) {
        // ВАЖНО: Используем зону из takeDeliver, НЕ зону перевозки
        // Если tariffZone отсутствует в takeDeliver, используем значение по умолчанию "D"
        const pickupZone = takeDeliverFrom.tariffZone || 'D';
        
        // Ищем тарифную сетку по зоне из takeDeliver
        // ВАЖНО: используем поле NumberZone из тарифной сетки и сравниваем с tariffZone из takeDeliver
        const pickupTariffGrid = tariffGrids.value.filter(tg => {
            const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid);
            if (!transportTypeMatch) return false;
            
            // Гибкое сравнение NumberZone - должно соответствовать зоне из takeDeliver
            const tgNumberZone = tg.NumberZone; // Поле NumberZone из тарифной сетки
            const expectedZone = pickupZone; // Зона из takeDeliver.tariffZone
            
            // Прямое сравнение (для одинаковых типов)
            if (tgNumberZone === expectedZone) return true;
            
            // Сравнение как строки (для буквенных зон A, B, C, D, H и числовых "1", "2" и т.д.)
            if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
            
            // Сравнение как числа (только если оба валидные числа)
            const tgZoneNum = Number(tgNumberZone);
            const expectedZoneNum = Number(expectedZone);
            if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
                return true;
            }
            
            return false;
        });
        
        if (pickupTariffGrid.length > 0) {
            const pickupBaseCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
            pickupCost = pickupBaseCost;
            
            // Детальное логирование для отладки
            console.log('Расчет стоимости забора:', {
                fromAddressUid: fromAddress?.uid || 'N/A',
                fromAddressUid: fromAddress?.uid || 'N/A',
                isPickupAtTerminal,
                transportTypeId: typeTransportation.id,
                pickupZone: pickupZone,
                pickupZoneSource: 'takeDeliver.tariffZone',
                takeDeliverFrom: {
                    id: takeDeliverFrom.id,
                    uidBillingAddress: takeDeliverFrom.uidBillingAddress,
                    tariffZone: takeDeliverFrom.tariffZone,
                    surcharge: takeDeliverFrom.surcharge,
                    coefficientSurcharge: takeDeliverFrom.coefficientSurcharge
                },
                pickupTariffGrid: pickupTariffGrid.map(tg => ({
                    NumberZone: tg.NumberZone,
                    unitFrom: tg.unitFrom,
                    unitTo: tg.unitTo,
                    startingPrice: tg.startingPrice,
                    step: tg.step,
                    stepPrice: tg.stepPrice
                })),
                totalPayableWeight: totalPayableWeight,
                pickupBaseCost: pickupBaseCost
            });
            
            // Добавляем surcharge из takeDeliver
            if (takeDeliverFrom.surcharge) {
                pickupCost += takeDeliverFrom.surcharge;
                console.log('Применена надбавка surcharge:', {
                    baseCost: pickupBaseCost,
                    surcharge: takeDeliverFrom.surcharge,
                    costAfterSurcharge: pickupCost
                });
            }
            
            // Применяем коэффициент забора из takeDeliver
            if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
                const costBeforeCoefficient = pickupCost;
                pickupCost *= takeDeliverFrom.coefficientSurcharge;
                console.log('Применен коэффициент coefficientSurcharge:', {
                    costBeforeCoefficient: costBeforeCoefficient,
                    coefficientSurcharge: takeDeliverFrom.coefficientSurcharge,
                    costAfterCoefficient: pickupCost
                });
            }
            
            console.log('Итоговая стоимость забора:', {
                baseCost: pickupBaseCost,
                surcharge: takeDeliverFrom.surcharge || 0,
                coefficientSurcharge: takeDeliverFrom.coefficientSurcharge || 1,
                finalPickupCost: pickupCost
            });
        } else {
            // ВАЛИДАЦИЯ: зона из takeDeliver не найдена в тарифной сетке
            const availableZones = [...new Set(tariffGrids.value
                .filter(tg => String(tg.transportType_uid) === String(transportTypeUid))
                .map(tg => String(tg.NumberZone)))];
            
            console.error('❌ ОШИБКА: Тарифная сетка для забора не найдена!', {
                transportType: typeTransportation.name,
                transportTypeId: typeTransportation.id,
                pickupZone: pickupZone,
                pickupZoneSource: 'takeDeliver.tariffZone',
                fromAddressUid: fromAddress?.uid || 'N/A',
                isPickupAtTerminal,
                takeDeliverFrom: takeDeliverFrom,
                availableZones: availableZones,
                message: `Зона "${pickupZone}" из takeDeliver не найдена в тарифной сетке. Доступные зоны: ${availableZones.join(', ')}`
            });
            
            // Добавляем предупреждение в детализацию
            details.push({
                name: `⚠️ ВНИМАНИЕ: Тарифная сетка для зоны забора "${pickupZone}" не найдена. Доступные зоны: ${availableZones.join(', ')}`,
                cost: 0,
                isDetail: true
            });
        }
    } else if (!isPickupAtTerminal && !takeDeliverFrom) {
        console.warn('Данные takeDeliver для забора не найдены:', {
            fromAddressUid: fromAddress?.uid || 'N/A',
            isPickupAtTerminal,
            transportTypeId: typeTransportation.id,
            availableTakeDelivers: takeDelivers.value.filter(td => String(td.uidTypeTransportation) === String(typeTransportation.uid)).map(td => ({
                uidBillingAddress: td.uidBillingAddress,
                uidTypeTransportation: td.uidTypeTransportation,
                tariffZone: td.tariffZone
            }))
        });
    }

    // 7.3. Расчет стоимости доставки (если не терминал)
    // По ТЗ: для доставки используется зона из takeDeliver.tariffZone (например, "H")
    // Зона перевозки (tariffZone.tariffZone) используется ТОЛЬКО для перевозки между городами
    // Если выбран терминал - доставка не считается
    let deliveryCost = 0;
    
    if (!isDeliveryAtTerminal && takeDeliverTo) {
        // ВАЖНО: Используем зону из takeDeliver, НЕ зону перевозки
        // Если tariffZone отсутствует в takeDeliver, используем значение по умолчанию "H"
        const deliveryZone = takeDeliverTo.tariffZone || 'H';
        
        // Ищем тарифную сетку по зоне из takeDeliver
        // ВАЖНО: используем поле NumberZone из тарифной сетки и сравниваем с tariffZone из takeDeliver
        const deliveryTariffGrid = tariffGrids.value.filter(tg => {
            const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid);
            if (!transportTypeMatch) return false;
            
            // Гибкое сравнение NumberZone - должно соответствовать зоне из takeDeliver
            const tgNumberZone = tg.NumberZone; // Поле NumberZone из тарифной сетки
            const expectedZone = deliveryZone; // Зона из takeDeliver.tariffZone
            
            // Прямое сравнение (для одинаковых типов)
            if (tgNumberZone === expectedZone) return true;
            
            // Сравнение как строки (для буквенных зон A, B, C, D, H и числовых "1", "2" и т.д.)
            if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
            
            // Сравнение как числа (только если оба валидные числа)
            const tgZoneNum = Number(tgNumberZone);
            const expectedZoneNum = Number(expectedZone);
            if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
                return true;
            }
            
            return false;
        });
        
        if (deliveryTariffGrid.length > 0) {
            const deliveryBaseCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
            deliveryCost = deliveryBaseCost;
            
            // Детальное логирование для отладки
            console.log('Расчет стоимости доставки:', {
                toAddressUid: toAddress?.uid || 'N/A',
                toAddressUid: toAddress?.uid || 'N/A',
                isDeliveryAtTerminal,
                transportTypeId: typeTransportation.id,
                deliveryZone: deliveryZone,
                deliveryZoneSource: 'takeDeliver.tariffZone',
                takeDeliverTo: {
                    id: takeDeliverTo.id,
                    uidBillingAddress: takeDeliverTo.uidBillingAddress,
                    tariffZone: takeDeliverTo.tariffZone,
                    surcharge: takeDeliverTo.surcharge,
                    coefficientSurcharge: takeDeliverTo.coefficientSurcharge
                },
                deliveryTariffGrid: deliveryTariffGrid.map(tg => ({
                    NumberZone: tg.NumberZone,
                    unitFrom: tg.unitFrom,
                    unitTo: tg.unitTo,
                    startingPrice: tg.startingPrice,
                    step: tg.step,
                    stepPrice: tg.stepPrice
                })),
                totalPayableWeight: totalPayableWeight,
                deliveryBaseCost: deliveryBaseCost
            });
            
            // Добавляем surcharge из takeDeliver
            if (takeDeliverTo.surcharge) {
                deliveryCost += takeDeliverTo.surcharge;
                console.log('Применена надбавка surcharge:', {
                    baseCost: deliveryBaseCost,
                    surcharge: takeDeliverTo.surcharge,
                    costAfterSurcharge: deliveryCost
                });
            }
            
            // Применяем коэффициент доставки из takeDeliver
            if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
                const costBeforeCoefficient = deliveryCost;
                deliveryCost *= takeDeliverTo.coefficientSurcharge;
                console.log('Применен коэффициент coefficientSurcharge:', {
                    costBeforeCoefficient: costBeforeCoefficient,
                    coefficientSurcharge: takeDeliverTo.coefficientSurcharge,
                    costAfterCoefficient: deliveryCost
                });
            }
            
            console.log('Итоговая стоимость доставки:', {
                baseCost: deliveryBaseCost,
                surcharge: takeDeliverTo.surcharge || 0,
                coefficientSurcharge: takeDeliverTo.coefficientSurcharge || 1,
                finalDeliveryCost: deliveryCost
            });
        } else {
            // ВАЛИДАЦИЯ: зона из takeDeliver не найдена в тарифной сетке
            const availableZones = [...new Set(tariffGrids.value
                .filter(tg => String(tg.transportType_uid) === String(transportTypeUid))
                .map(tg => String(tg.NumberZone)))];
            
            console.error('❌ ОШИБКА: Тарифная сетка для доставки не найдена!', {
                transportType: typeTransportation.name,
                transportTypeId: typeTransportation.id,
                deliveryZone: deliveryZone,
                deliveryZoneSource: 'takeDeliver.tariffZone',
                toAddressUid: toAddress?.uid || 'N/A',
                isDeliveryAtTerminal,
                takeDeliverTo: takeDeliverTo,
                availableZones: availableZones,
                message: `Зона "${deliveryZone}" из takeDeliver не найдена в тарифной сетке. Доступные зоны: ${availableZones.join(', ')}`
            });
            
            // Добавляем предупреждение в детализацию
            details.push({
                name: `⚠️ ВНИМАНИЕ: Тарифная сетка для зоны доставки "${deliveryZone}" не найдена. Доступные зоны: ${availableZones.join(', ')}`,
                cost: 0,
                isDetail: true
            });
        }
    } else if (!isDeliveryAtTerminal && !takeDeliverTo) {
        console.warn('Данные takeDeliver для доставки не найдены:', {
            toAddressUid: toAddress?.uid || 'N/A',
            isDeliveryAtTerminal,
            transportTypeId: typeTransportation.id,
            availableTakeDelivers: takeDelivers.value.filter(td => String(td.uidTypeTransportation) === String(typeTransportation.uid)).map(td => ({
                uidBillingAddress: td.uidBillingAddress,
                uidTypeTransportation: td.uidTypeTransportation,
                tariffZone: td.tariffZone
            }))
        });
    }

    // 7.4. Расчет стоимости погрузо-разгрузочных работ
    function calculateLoadingUnloadingCost(localityId, locationData, payableWeight, volume) {
        if (!locationData || typeof locationData !== 'object' || !locationData.loadingUnloading) {
            return 0;
        }

        // Найти локацию по ID
        // Приводим ID к строкам для надежного сравнения
        const locality = localities.value.find(loc => String(loc.id) === String(localityId));
        if (!locality || !locality.loadingUnloadingRates) {
            return 0;
        }

        const rates = locality.loadingUnloadingRates;
        const floor = parseInt(locationData.floor) || 0;
        const noElevator = locationData.noElevator || false;
        
        let cost = 0;

        // 1. Стоимость за этаж (если указан этаж)
        if (floor > 0) {
            const ratePerFloor = noElevator 
                ? (rates.perFloorWithoutElevator || 0)
                : (rates.perFloorWithElevator || 0);
            cost += floor * ratePerFloor;
        }

        // 2. Стоимость за вес (если указан коэффициент веса)
        if (rates.weightCoefficient && payableWeight > 0) {
            cost += payableWeight * rates.weightCoefficient;
        }

        // 3. Стоимость за объем (если указан коэффициент объема)
        if (rates.volumeCoefficient && volume > 0) {
            cost += volume * rates.volumeCoefficient;
        }
        
        return cost;
    }

    // Расчет стоимости погрузки для пункта отправки
    let loadingUnloadingCostPickup = 0;
    if (!isPickupAtTerminal && departure.location && typeof departure.location === 'object') {
        loadingUnloadingCostPickup = calculateLoadingUnloadingCost(
            direction.fromLocalityId,
            departure.location,
            totalPayableWeight,
            totalVolume
        );
    }

    // Расчет стоимости погрузки для пункта назначения
    let loadingUnloadingCostDelivery = 0;
    if (!isDeliveryAtTerminal && destination.location && typeof destination.location === 'object') {
        loadingUnloadingCostDelivery = calculateLoadingUnloadingCost(
            direction.toLocalityId,
            destination.location,
            totalPayableWeight,
            totalVolume
        );
        
        // Учет стоимости разбора упаковки (если указано)
        // TODO: Добавить расценку для разбора упаковки в структуру локалей или использовать фиксированную стоимость
        if (destination.location.unpacking) {
            // Пока используем фиксированную стоимость или можно добавить в расценки локалей
            // loadingUnloadingCostDelivery += unpackingCost;
        }
    }

    const totalLoadingUnloadingCost = loadingUnloadingCostPickup + loadingUnloadingCostDelivery;

    // 7.5. Валидация зон - проверка на одинаковые зоны
    // По ТЗ: зоны для перевозки, забора и доставки должны быть разными
    const transportationZoneValue = tariffZone.tariffZone;
    const pickupZoneValue = takeDeliverFrom?.tariffZone || null;
    const deliveryZoneValue = takeDeliverTo?.tariffZone || null;
    
    // Проверяем совпадение зон
    const zoneWarnings = [];
    if (pickupZoneValue && String(pickupZoneValue) === String(transportationZoneValue)) {
        zoneWarnings.push({
            type: 'pickup',
            message: `⚠️ ВНИМАНИЕ: Зона забора "${pickupZoneValue}" совпадает с зоной перевозки "${transportationZoneValue}". По ТЗ зона забора должна быть буквенной (например, "D"), а не числовой.`
        });
        console.warn('⚠️ ВНИМАНИЕ: Зона забора совпадает с зоной перевозки:', {
            pickupZone: pickupZoneValue,
            transportationZone: transportationZoneValue,
            message: 'По ТЗ зона забора должна быть буквенной (например, "D"), а не числовой'
        });
    }
    
    if (deliveryZoneValue && String(deliveryZoneValue) === String(transportationZoneValue)) {
        zoneWarnings.push({
            type: 'delivery',
            message: `⚠️ ВНИМАНИЕ: Зона доставки "${deliveryZoneValue}" совпадает с зоной перевозки "${transportationZoneValue}". По ТЗ зона доставки должна быть буквенной (например, "H"), а не числовой.`
        });
        console.warn('⚠️ ВНИМАНИЕ: Зона доставки совпадает с зоной перевозки:', {
            deliveryZone: deliveryZoneValue,
            transportationZone: transportationZoneValue,
            message: 'По ТЗ зона доставки должна быть буквенной (например, "H"), а не числовой'
        });
    }
    
    if (pickupZoneValue && deliveryZoneValue && String(pickupZoneValue) === String(deliveryZoneValue)) {
        zoneWarnings.push({
            type: 'pickup_delivery',
            message: `⚠️ ВНИМАНИЕ: Зона забора "${pickupZoneValue}" совпадает с зоной доставки "${deliveryZoneValue}". По ТЗ зоны забора и доставки должны быть разными.`
        });
        console.warn('⚠️ ВНИМАНИЕ: Зона забора совпадает с зоной доставки:', {
            pickupZone: pickupZoneValue,
            deliveryZone: deliveryZoneValue,
            message: 'По ТЗ зоны забора и доставки должны быть разными'
        });
    }
    
    // Проверяем, используются ли одинаковые тарифы
    if (pickupCost > 0 && deliveryCost > 0 && transportationCost > 0) {
        const pickupBaseCost = pickupCost / (takeDeliverFrom?.coefficientSurcharge || 1) - (takeDeliverFrom?.surcharge || 0);
        const deliveryBaseCost = deliveryCost / (takeDeliverTo?.coefficientSurcharge || 1) - (takeDeliverTo?.surcharge || 0);
        const transportationBaseCostValue = transportationBaseCost;
        
        // Проверяем, если базовые стоимости одинаковые (с небольшой погрешностью)
        const costDifference = Math.abs(pickupBaseCost - transportationBaseCostValue);
        if (costDifference < 0.01 && String(pickupZoneValue) === String(transportationZoneValue)) {
            zoneWarnings.push({
                type: 'tariff',
                message: `⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для забора и перевозки (зона "${pickupZoneValue}"). По ТЗ должны быть разные зоны и разные тарифы.`
            });
            console.warn('⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для забора и перевозки:', {
                pickupZone: pickupZoneValue,
                transportationZone: transportationZoneValue,
                pickupBaseCost: pickupBaseCost,
                transportationBaseCost: transportationBaseCostValue,
                message: 'По ТЗ должны быть разные зоны и разные тарифы'
            });
        }
        
        const deliveryCostDifference = Math.abs(deliveryBaseCost - transportationBaseCostValue);
        if (deliveryCostDifference < 0.01 && String(deliveryZoneValue) === String(transportationZoneValue)) {
            zoneWarnings.push({
                type: 'tariff',
                message: `⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для доставки и перевозки (зона "${deliveryZoneValue}"). По ТЗ должны быть разные зоны и разные тарифы.`
            });
            console.warn('⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для доставки и перевозки:', {
                deliveryZone: deliveryZoneValue,
                transportationZone: transportationZoneValue,
                deliveryBaseCost: deliveryBaseCost,
                transportationBaseCost: transportationBaseCostValue,
                message: 'По ТЗ должны быть разные зоны и разные тарифы'
            });
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
    
    // Логирование перед применением коэффициентов опасного груза/температурного режима
    console.log('Применение коэффициентов опасного груза/температурного режима:', {
        hasAnyDangerousGoods: hasAnyDangerousGoods,
        dangerousGoodsMultiplier: dangerousGoodsMultiplier,
        hasAnyTempControl: hasAnyTempControl,
        tempControlMultiplier: tempControlMultiplier,
        totalMultiplier: totalMultiplier,
        costsBeforeMultiplier: {
            transportationCost: transportationCost,
            pickupCost: pickupCost,
            deliveryCost: deliveryCost
        }
    });
    
    // Применяем коэффициенты ко всем компонентам
    const transportationCostBeforeMultiplier = transportationCost;
    const pickupCostBeforeMultiplier = pickupCost;
    const deliveryCostBeforeMultiplier = deliveryCost;
    
    transportationCost *= totalMultiplier;
    pickupCost *= totalMultiplier;
    deliveryCost *= totalMultiplier;
    
    if (totalMultiplier !== 1) {
        console.log('Применены коэффициенты опасного груза/температурного режима:', {
            transportationCost: `${transportationCostBeforeMultiplier} × ${totalMultiplier} = ${transportationCost}`,
            pickupCost: `${pickupCostBeforeMultiplier} × ${totalMultiplier} = ${pickupCost}`,
            deliveryCost: `${deliveryCostBeforeMultiplier} × ${totalMultiplier} = ${deliveryCost}`
        });
    } else {
        console.log('Коэффициенты опасного груза/температурного режима не применяются (оба равны 1)');
    }

    // 9. Расчет итоговой стоимости согласно ТЗ
    // По ТЗ: Общая стоимость = (Перевозка + Забор + Доставка + Погрузо-разгрузочные работы) × (1 + Процент НДС)
    const totalWithoutVAT = transportationCost + pickupCost + deliveryCost + additionalCosts + totalLoadingUnloadingCost;
    
    // Детальное логирование итоговой стоимости
    console.log('Итоговая стоимость без НДС:', {
        transportationCost: transportationCost,
        pickupCost: pickupCost,
        deliveryCost: deliveryCost,
        additionalCosts: additionalCosts,
        totalLoadingUnloadingCost: totalLoadingUnloadingCost,
        totalWithoutVAT: totalWithoutVAT,
        breakdown: {
            'Перевозка': transportationCost,
            'Забор': pickupCost,
            'Доставка': deliveryCost,
            'Дополнительные услуги': additionalCosts,
            'Погрузо-разгрузочные работы': totalLoadingUnloadingCost
        }
    });
    
    // Применение НДС (по умолчанию 5% согласно примеру в ТЗ)
    const vatRate = 0.05; // 5% НДС
    const vatAmount = totalWithoutVAT * vatRate;
    const finalCost = totalWithoutVAT + vatAmount;
    
    console.log('Расчет НДС и итоговой стоимости:', {
        totalWithoutVAT: totalWithoutVAT,
        vatRate: vatRate,
        vatAmount: vatAmount,
        finalCost: finalCost
    });

    // 10. Формирование детализации согласно ТЗ
    details.push({ name: 'РАСЧЕТ ПО ТЗ', cost: 0, isHeader: true });
    
    // Добавляем предупреждения о зонах в детализацию (если есть)
    if (zoneWarnings && zoneWarnings.length > 0) {
        details.push({ name: '⚠️ ПРЕДУПРЕЖДЕНИЯ О ЗОНАХ', cost: 0, isSubHeader: true });
        zoneWarnings.forEach(warning => {
            details.push({
                name: warning.message,
                cost: 0,
                isDetail: true
            });
        });
    }
    
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
            name: `Место ${index + 1}${quantity > 1 ? ` (×${quantity})` : ''}:`,
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
    // Используем уже рассчитанную transportationBaseCost из секции расчета
    const sortedRelevantTariffGrid = [...relevantTarifGrid].sort((a, b) => {
        const aFrom = parseFloat(a.unitFrom) || 0;
        const bFrom = parseFloat(b.unitFrom) || 0;
        return aFrom - bFrom;
    });
    
        // Найти подходящий тариф: unitFrom <= ПВ <= unitTo (включая границы)
        let applicableTransportationTariff = sortedRelevantTariffGrid.find(tg => {
            const unitFrom = parseFloat(tg.unitFrom) || 0;
            const unitTo = parseFloat(tg.unitTo) || Infinity;
            return totalPayableWeight >= unitFrom && totalPayableWeight <= unitTo;
        });
        
        // Если не найден подходящий тариф и ПВ меньше минимального unitFrom
        if (!applicableTransportationTariff && sortedRelevantTariffGrid.length > 0) {
            const firstTariff = sortedRelevantTariffGrid[0];
            const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
            if (totalPayableWeight < firstUnitFrom) {
                applicableTransportationTariff = firstTariff;
            } else {
                // Используем последний тариф для расчета сверх максимального веса
                applicableTransportationTariff = sortedRelevantTariffGrid[sortedRelevantTariffGrid.length - 1];
            }
        }
        
        if (applicableTransportationTariff) {
            const unitFrom = parseFloat(applicableTransportationTariff.unitFrom) || 0;
            const step = parseFloat(applicableTransportationTariff.step) || 1;
            
            // Если ПВ = unitFrom или step = 0, шаги = 0 (используем только startingPrice)
            let steps = 0;
            if (step > 0 && totalPayableWeight > unitFrom) {
                steps = Math.ceil((totalPayableWeight - unitFrom) / step);
            }
        
        details.push({
            name: 'ФОРМУЛА СТОИМОСТИ ПЕРЕВОЗКИ',
            cost: 0,
            isSubHeader: true
        });
        
        if (step > 0 && totalPayableWeight > unitFrom) {
            // Показываем расчет шагов только если ПВ > unitFrom и step > 0
            const transportationStepsCalculation = (totalPayableWeight - unitFrom) / step;
            details.push({
                name: `Расчет шагов: (${totalPayableWeight.toFixed(2)} (ПВ, кг) - ${unitFrom} (unitFrom из тарифной сетки зоны ${tariffZone.tariffZone})) / ${step} (step из тарифной сетки) = ${transportationStepsCalculation.toFixed(2)}`,
                cost: 0,
                isDetail: true
            });
            details.push({
                name: `Количество шагов = округление вверх до целого числа = ${steps}`,
                cost: 0,
                isDetail: true
            });
            details.push({
                name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки) + ${steps} (шаги) × ${applicableTransportationTariff.stepPrice} (stepPrice из тарифной сетки) = ${transportationBaseCost.toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
        } else if (step === 0) {
            // Если step = 0, это фиксированная цена
            details.push({
                name: `Тарифная сетка имеет фиксированную цену (step = 0) для зоны ${tariffZone.tariffZone}.`,
                cost: 0,
                isDetail: true
            });
            details.push({
                name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки, фиксированная цена) = ${transportationBaseCost.toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
        } else {
            // Если ПВ = unitFrom, используем минимальную стоимость
            details.push({
                name: `Платный вес (${totalPayableWeight.toFixed(2)} кг) равен минимальному весу (${unitFrom} кг) для зоны ${tariffZone.tariffZone}. Используется минимальная стоимость (startingPrice).`,
                cost: 0,
                isDetail: true
            });
            details.push({
                name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки, шаги не применяются, так как ПВ = unitFrom) = ${transportationBaseCost.toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
        }
        
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
        const pickupTariffGrid = tariffGrids.value.filter(tg => {
            const transportTypeUid = typeTransportation.uid;
            const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid);
            if (!transportTypeMatch) return false;
            // Гибкое сравнение NumberZone - должно соответствовать зоне из takeDeliver
            const tgNumberZone = tg.NumberZone; // Поле NumberZone из тарифной сетки
            const expectedZone = pickupZone; // Зона из takeDeliver.tariffZone
            
            // Прямое сравнение (для одинаковых типов)
            if (tgNumberZone === expectedZone) return true;
            
            // Сравнение как строки (для буквенных зон A, B, C, D, H и числовых "1", "2" и т.д.)
            if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
            
            // Сравнение как числа (только если оба валидные числа)
            const tgZoneNum = Number(tgNumberZone);
            const expectedZoneNum = Number(expectedZone);
            if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
                return true;
            }
            
            return false;
        });
        const pickupBaseCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
        
        // Сортируем тарифную сетку по unitFrom для правильного поиска
        const sortedPickupTariffGrid = [...pickupTariffGrid].sort((a, b) => {
            const aFrom = parseFloat(a.unitFrom) || 0;
            const bFrom = parseFloat(b.unitFrom) || 0;
            return aFrom - bFrom;
        });
        
        // Найти подходящий тариф: unitFrom <= ПВ <= unitTo (включая границы)
        let applicablePickupTariff = sortedPickupTariffGrid.find(tg => {
            const unitFrom = parseFloat(tg.unitFrom) || 0;
            const unitTo = parseFloat(tg.unitTo) || Infinity;
            return totalPayableWeight >= unitFrom && totalPayableWeight <= unitTo;
        });
        
        // Если не найден подходящий тариф и ПВ меньше минимального unitFrom
        if (!applicablePickupTariff && sortedPickupTariffGrid.length > 0) {
            const firstTariff = sortedPickupTariffGrid[0];
            const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
            if (totalPayableWeight < firstUnitFrom) {
                applicablePickupTariff = firstTariff;
            } else {
                // Используем последний тариф для расчета сверх максимального веса
                applicablePickupTariff = sortedPickupTariffGrid[sortedPickupTariffGrid.length - 1];
            }
        }
        
        if (applicablePickupTariff) {
            const unitFrom = parseFloat(applicablePickupTariff.unitFrom) || 0;
            const step = parseFloat(applicablePickupTariff.step) || 1;
            
            // Если ПВ <= unitFrom, шаги = 0 (используем только startingPrice)
            const pickupSteps = totalPayableWeight > unitFrom 
                ? Math.ceil((totalPayableWeight - unitFrom) / step)
                : 0;
            
            details.push({
                name: 'ФОРМУЛА СТОИМОСТИ ЗАБОРА',
                cost: 0,
                isSubHeader: true
            });
            
            if (step > 0 && totalPayableWeight > unitFrom) {
                // Показываем расчет шагов только если ПВ > unitFrom и step > 0
                const pickupStepsCalculation = (totalPayableWeight - unitFrom) / step;
                details.push({
                    name: `Расчет шагов: (${totalPayableWeight.toFixed(2)} (ПВ) - ${unitFrom} (unitFrom из тарифной сетки зоны ${pickupZone} из takeDeliver для адреса отправки)) / ${step} (step) = ${pickupStepsCalculation.toFixed(2)}`,
                    cost: 0,
                    isDetail: true
                });
                details.push({
                    name: `Количество шагов = округление вверх до целого числа = ${pickupSteps}`,
                    cost: 0,
                    isDetail: true
                });
            } else if (step === 0) {
                // Если step = 0, это фиксированная цена
                details.push({
                    name: `Тарифная сетка имеет фиксированную цену (step = 0) для зоны ${pickupZone}.`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Если ПВ = unitFrom, используем минимальную стоимость
                details.push({
                    name: `Платный вес (${totalPayableWeight.toFixed(2)} кг) равен минимальному весу (${unitFrom} кг) для зоны ${pickupZone}. Используется минимальная стоимость (startingPrice).`,
                    cost: 0,
                    isDetail: true
                });
            }
            if (pickupSteps > 0) {
                details.push({
                    name: `Базовая стоимость забора = ${applicablePickupTariff.startingPrice} (startingPrice из тарифной сетки зоны ${pickupZone} из takeDeliver для адреса отправки) + ${pickupSteps} (шаги) × ${applicablePickupTariff.stepPrice} (stepPrice) = ${pickupBaseCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                details.push({
                    name: `Базовая стоимость забора = ${applicablePickupTariff.startingPrice} (startingPrice из тарифной сетки зоны ${pickupZone} из takeDeliver для адреса отправки, шаги не применяются, так как ПВ ≤ unitFrom) = ${pickupBaseCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            // Показываем применение surcharge, если он есть
            let pickupCostAfterSurcharge = pickupBaseCost;
            if (takeDeliverFrom.surcharge) {
                pickupCostAfterSurcharge = pickupBaseCost + takeDeliverFrom.surcharge;
                details.push({
                    name: `Стоимость с надбавкой = ${pickupBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverFrom.surcharge} (surcharge из takeDeliver для адреса отправки) = ${pickupCostAfterSurcharge.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Показываем, что надбавка не применялась
                details.push({
                    name: `Надбавка surcharge не применяется (surcharge = 0 или отсутствует в takeDeliver для адреса отправки)`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            // Показываем применение coefficientSurcharge, если он есть и не равен 1
            let pickupCostAfterCoefficient = pickupCostAfterSurcharge;
            if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
                pickupCostAfterCoefficient = pickupCostAfterSurcharge * takeDeliverFrom.coefficientSurcharge;
                details.push({
                    name: `Стоимость с коэффициентом = ${pickupCostAfterSurcharge.toFixed(2)} (стоимость ${takeDeliverFrom.surcharge ? 'с надбавкой' : 'базовая'}) × ${takeDeliverFrom.coefficientSurcharge} (coefficientSurcharge из takeDeliver для адреса отправки) = ${pickupCostAfterCoefficient.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Показываем, что коэффициент не применялся или равен 1
                details.push({
                    name: `Коэффициент coefficientSurcharge не применяется (coefficientSurcharge = ${takeDeliverFrom.coefficientSurcharge || 1} в takeDeliver для адреса отправки)`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            // Показываем применение коэффициентов опасного груза/температурного режима
            if (totalMultiplier !== 1) {
                details.push({
                    name: `Итоговая стоимость забора = ${pickupCostAfterCoefficient.toFixed(2)} (стоимость забора) × ${totalMultiplier.toFixed(2)} (коэффициенты ${hasAnyDangerousGoods ? 'опасного груза 1.4' : '1'} × ${hasAnyTempControl ? 'температурного режима 1.25' : '1'}) = ${pickupCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Показываем итоговую стоимость без дополнительных коэффициентов
                details.push({
                    name: `Итоговая стоимость забора = ${pickupCostAfterCoefficient.toFixed(2)} ₽ (коэффициенты опасного груза/температурного режима не применяются)`,
                    cost: 0,
                    isDetail: true
                });
            }
        }
    }
    
    // Формула расчета стоимости доставки
    if (deliveryCost > 0 && !isDeliveryAtTerminal && takeDeliverTo) {
        const deliveryZone = takeDeliverTo.tariffZone || 'H';
        const deliveryTariffGrid = tariffGrids.value.filter(tg => {
            const transportTypeUid = typeTransportation.uid;
            const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid);
            if (!transportTypeMatch) return false;
            // Гибкое сравнение NumberZone - должно соответствовать зоне из takeDeliver
            const tgNumberZone = tg.NumberZone; // Поле NumberZone из тарифной сетки
            const expectedZone = deliveryZone; // Зона из takeDeliver.tariffZone
            
            // Прямое сравнение (для одинаковых типов)
            if (tgNumberZone === expectedZone) return true;
            
            // Сравнение как строки (для буквенных зон A, B, C, D, H и числовых "1", "2" и т.д.)
            if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
            
            // Сравнение как числа (только если оба валидные числа)
            const tgZoneNum = Number(tgNumberZone);
            const expectedZoneNum = Number(expectedZone);
            if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
                return true;
            }
            
            return false;
        });
        const deliveryBaseCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
        
        // Сортируем тарифную сетку по unitFrom для правильного поиска
        const sortedDeliveryTariffGrid = [...deliveryTariffGrid].sort((a, b) => {
            const aFrom = parseFloat(a.unitFrom) || 0;
            const bFrom = parseFloat(b.unitFrom) || 0;
            return aFrom - bFrom;
        });
        
        // Найти подходящий тариф: unitFrom <= ПВ <= unitTo (включая границы)
        let applicableDeliveryTariff = sortedDeliveryTariffGrid.find(tg => {
            const unitFrom = parseFloat(tg.unitFrom) || 0;
            const unitTo = parseFloat(tg.unitTo) || Infinity;
            return totalPayableWeight >= unitFrom && totalPayableWeight <= unitTo;
        });
        
        // Если не найден подходящий тариф и ПВ меньше минимального unitFrom
        if (!applicableDeliveryTariff && sortedDeliveryTariffGrid.length > 0) {
            const firstTariff = sortedDeliveryTariffGrid[0];
            const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
            if (totalPayableWeight < firstUnitFrom) {
                applicableDeliveryTariff = firstTariff;
            } else {
                // Используем последний тариф для расчета сверх максимального веса
                applicableDeliveryTariff = sortedDeliveryTariffGrid[sortedDeliveryTariffGrid.length - 1];
            }
        }
        
        if (applicableDeliveryTariff) {
            const unitFrom = parseFloat(applicableDeliveryTariff.unitFrom) || 0;
            const step = parseFloat(applicableDeliveryTariff.step) || 1;
            
            // Если ПВ <= unitFrom, шаги = 0 (используем только startingPrice)
            const deliverySteps = totalPayableWeight > unitFrom 
                ? Math.ceil((totalPayableWeight - unitFrom) / step)
                : 0;
            
            details.push({
                name: 'ФОРМУЛА СТОИМОСТИ ДОСТАВКИ',
                cost: 0,
                isSubHeader: true
            });
            
            if (step > 0 && totalPayableWeight > unitFrom) {
                // Показываем расчет шагов только если ПВ > unitFrom и step > 0
                const deliveryStepsCalculation = (totalPayableWeight - unitFrom) / step;
                details.push({
                    name: `Расчет шагов: (${totalPayableWeight.toFixed(2)} (ПВ) - ${unitFrom} (unitFrom из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения)) / ${step} (step) = ${deliveryStepsCalculation.toFixed(2)}`,
                    cost: 0,
                    isDetail: true
                });
                details.push({
                    name: `Количество шагов = округление вверх до целого числа = ${deliverySteps}`,
                    cost: 0,
                    isDetail: true
                });
                details.push({
                    name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения) + ${deliverySteps} (шаги) × ${applicableDeliveryTariff.stepPrice} (stepPrice) = ${deliveryBaseCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else if (step === 0) {
                // Если step = 0, это фиксированная цена
                details.push({
                    name: `Тарифная сетка имеет фиксированную цену (step = 0) для зоны ${deliveryZone}.`,
                    cost: 0,
                    isDetail: true
                });
                details.push({
                    name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения, фиксированная цена) = ${deliveryBaseCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Если ПВ = unitFrom, используем минимальную стоимость
                details.push({
                    name: `Платный вес (${totalPayableWeight.toFixed(2)} кг) равен минимальному весу (${unitFrom} кг) для зоны ${deliveryZone}. Используется минимальная стоимость (startingPrice).`,
                    cost: 0,
                    isDetail: true
                });
                details.push({
                    name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения, шаги не применяются, так как ПВ = unitFrom) = ${deliveryBaseCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            // Показываем применение surcharge, если он есть
            let deliveryCostAfterSurcharge = deliveryBaseCost;
            if (takeDeliverTo.surcharge) {
                deliveryCostAfterSurcharge = deliveryBaseCost + takeDeliverTo.surcharge;
                details.push({
                    name: `Стоимость с надбавкой = ${deliveryBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverTo.surcharge} (surcharge из takeDeliver для адреса назначения) = ${deliveryCostAfterSurcharge.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Показываем, что надбавка не применялась
                details.push({
                    name: `Надбавка surcharge не применяется (surcharge = 0 или отсутствует в takeDeliver для адреса назначения)`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            // Показываем применение coefficientSurcharge, если он есть и не равен 1
            let deliveryCostAfterCoefficient = deliveryCostAfterSurcharge;
            if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
                deliveryCostAfterCoefficient = deliveryCostAfterSurcharge * takeDeliverTo.coefficientSurcharge;
                details.push({
                    name: `Стоимость с коэффициентом = ${deliveryCostAfterSurcharge.toFixed(2)} (стоимость ${takeDeliverTo.surcharge ? 'с надбавкой' : 'базовая'}) × ${takeDeliverTo.coefficientSurcharge} (coefficientSurcharge из takeDeliver для адреса назначения) = ${deliveryCostAfterCoefficient.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Показываем, что коэффициент не применялся или равен 1
                details.push({
                    name: `Коэффициент coefficientSurcharge не применяется (coefficientSurcharge = ${takeDeliverTo.coefficientSurcharge || 1} в takeDeliver для адреса назначения)`,
                    cost: 0,
                    isDetail: true
                });
            }
            
            // Показываем применение коэффициентов опасного груза/температурного режима
            if (totalMultiplier !== 1) {
                details.push({
                    name: `Итоговая стоимость доставки = ${deliveryCostAfterCoefficient.toFixed(2)} (стоимость доставки) × ${totalMultiplier.toFixed(2)} (коэффициенты ${hasAnyDangerousGoods ? 'опасного груза 1.4' : '1'} × ${hasAnyTempControl ? 'температурного режима 1.25' : '1'}) = ${deliveryCost.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                // Показываем итоговую стоимость без дополнительных коэффициентов
                details.push({
                    name: `Итоговая стоимость доставки = ${deliveryCostAfterCoefficient.toFixed(2)} ₽ (коэффициенты опасного груза/температурного режима не применяются)`,
                    cost: 0,
                    isDetail: true
                });
            }
        }
    }
    
    // Формула расчета стоимости погрузо-разгрузочных работ
    if (totalLoadingUnloadingCost > 0) {
        details.push({
            name: 'ФОРМУЛА СТОИМОСТИ ПОГРУЗО-РАЗГРУЗОЧНЫХ РАБОТ',
            cost: 0,
            isSubHeader: true
        });

        // Детализация для пункта отправки
        if (loadingUnloadingCostPickup > 0 && departure.location && typeof departure.location === 'object') {
            const fromLocality = localities.value.find(loc => String(loc.id) === String(direction.fromLocalityId));
            const floor = parseInt(departure.location.floor) || 0;
            const noElevator = departure.location.noElevator || false;
            const rates = fromLocality?.loadingUnloadingRates;
            
            const formulaParts = [];
            let calculatedCost = 0;

            // Этаж
            if (floor > 0) {
                const ratePerFloor = noElevator 
                    ? (rates?.perFloorWithoutElevator || 0)
                    : (rates?.perFloorWithElevator || 0);
                if (ratePerFloor > 0) {
                    const floorCost = floor * ratePerFloor;
                    calculatedCost += floorCost;
                    formulaParts.push(`${floor} (этаж) × ${ratePerFloor.toFixed(2)} (цена за этаж ${noElevator ? 'без лифта' : 'с лифтом'}) = ${floorCost.toFixed(2)}`);
                }
            }

            // Вес
            if (rates?.weightCoefficient && totalPayableWeight > 0) {
                const weightCost = totalPayableWeight * rates.weightCoefficient;
                calculatedCost += weightCost;
                formulaParts.push(`${totalPayableWeight.toFixed(2)} (платный вес, кг) × ${rates.weightCoefficient.toFixed(2)} (коэффициент веса) = ${weightCost.toFixed(2)}`);
            }

            // Объем
            if (rates?.volumeCoefficient && totalVolume > 0) {
                const volumeCost = totalVolume * rates.volumeCoefficient;
                calculatedCost += volumeCost;
                formulaParts.push(`${totalVolume.toFixed(3)} (объем, м³) × ${rates.volumeCoefficient.toFixed(2)} (коэффициент объема) = ${volumeCost.toFixed(2)}`);
            }

            if (formulaParts.length > 0) {
                details.push({
                    name: `Стоимость погрузки (пункт отправки, "${fromLocality?.name || ''}") = ${formulaParts.join(' + ')} = ${loadingUnloadingCostPickup.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
        }

        // Детализация для пункта назначения
        if (loadingUnloadingCostDelivery > 0 && destination.location && typeof destination.location === 'object') {
            const toLocality = localities.value.find(loc => String(loc.id) === String(direction.toLocalityId));
            const floor = parseInt(destination.location.floor) || 0;
            const noElevator = destination.location.noElevator || false;
            const rates = toLocality?.loadingUnloadingRates;
            
            const formulaParts = [];
            let calculatedCost = 0;

            // Этаж
            if (floor > 0) {
                const ratePerFloor = noElevator 
                    ? (rates?.perFloorWithoutElevator || 0)
                    : (rates?.perFloorWithElevator || 0);
                if (ratePerFloor > 0) {
                    const floorCost = floor * ratePerFloor;
                    calculatedCost += floorCost;
                    formulaParts.push(`${floor} (этаж) × ${ratePerFloor.toFixed(2)} (цена за этаж ${noElevator ? 'без лифта' : 'с лифтом'}) = ${floorCost.toFixed(2)}`);
                }
            }

            // Вес
            if (rates?.weightCoefficient && totalPayableWeight > 0) {
                const weightCost = totalPayableWeight * rates.weightCoefficient;
                calculatedCost += weightCost;
                formulaParts.push(`${totalPayableWeight.toFixed(2)} (платный вес, кг) × ${rates.weightCoefficient.toFixed(2)} (коэффициент веса) = ${weightCost.toFixed(2)}`);
            }

            // Объем
            if (rates?.volumeCoefficient && totalVolume > 0) {
                const volumeCost = totalVolume * rates.volumeCoefficient;
                calculatedCost += volumeCost;
                formulaParts.push(`${totalVolume.toFixed(3)} (объем, м³) × ${rates.volumeCoefficient.toFixed(2)} (коэффициент объема) = ${volumeCost.toFixed(2)}`);
            }

            if (formulaParts.length > 0) {
                details.push({
                    name: `Стоимость разгрузки (пункт назначения, "${toLocality?.name || ''}") = ${formulaParts.join(' + ')} = ${loadingUnloadingCostDelivery.toFixed(2)} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }

            // TODO: Добавить расчет стоимости разбора упаковки, если указано
            if (destination.location.unpacking) {
                // details.push({...});
            }
        }

        if (loadingUnloadingCostPickup > 0 && loadingUnloadingCostDelivery > 0) {
            details.push({
                name: `Итого погрузо-разгрузочные работы = ${loadingUnloadingCostPickup.toFixed(2)} (погрузка) + ${loadingUnloadingCostDelivery.toFixed(2)} (разгрузка) = ${totalLoadingUnloadingCost.toFixed(2)} ₽`,
                cost: 0,
                isDetail: true
            });
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
    if (totalLoadingUnloadingCost > 0) {
        formulaParts.push(`${totalLoadingUnloadingCost.toFixed(2)} (погрузо-разгрузочные работы)`);
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
        name: `Стоимость перевозки: ${transportationCost.toFixed(2)} ₽ (зона ${tariffZone.tariffZone} из tariffZones)`,
        cost: transportationCost
    });
    
    if (pickupCost > 0) {
        const pickupZone = takeDeliverFrom?.tariffZone || 'D';
        const pickupInfo = [`Стоимость забора: ${pickupCost.toFixed(2)} ₽ (зона ${pickupZone} из takeDeliver)`];
        if (takeDeliverFrom) {
            if (takeDeliverFrom.surcharge) {
                pickupInfo.push(`(включая surcharge ${takeDeliverFrom.surcharge} ₽)`);
            }
            if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
                pickupInfo.push(`(коэффициент ${takeDeliverFrom.coefficientSurcharge})`);
            }
        }
        details.push({
            name: pickupInfo.join(', '),
            cost: pickupCost
        });
    }
    
    if (deliveryCost > 0) {
        const deliveryZone = takeDeliverTo?.tariffZone || 'H';
        const deliveryInfo = [`Стоимость доставки: ${deliveryCost.toFixed(2)} ₽ (зона ${deliveryZone} из takeDeliver)`];
        if (takeDeliverTo) {
            if (takeDeliverTo.surcharge) {
                deliveryInfo.push(`(включая surcharge ${takeDeliverTo.surcharge} ₽)`);
            }
            if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
                deliveryInfo.push(`(коэффициент ${takeDeliverTo.coefficientSurcharge})`);
            }
        }
        details.push({
            name: deliveryInfo.join(', '),
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

    if (totalLoadingUnloadingCost > 0) {
        details.push({
            name: `Погрузо-разгрузочные работы: ${totalLoadingUnloadingCost.toFixed(2)} ₽`,
            cost: totalLoadingUnloadingCost
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
            loadingUnloadingCost: totalLoadingUnloadingCost,
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
        
        const terminalsData = await apiService.getTerminals();
        console.log('terminals загружены:', terminalsData?.length || 0);

        // Сохраняем данные
        billingAddresses.value = billingAddressesData || [];
        terminals.value = terminalsData || [];
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
    
    // Проверяем наличие адресов для корректного расчета (используем fromAddress/toAddress вместо fromLocalityId/toLocalityId)
    if (!direction.fromAddress || !direction.toAddress) return false;

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
    console.log('calculationResult: Начало вычисления', {
        hasTransportTypes: !!transportTypes.value,
        from: formData.direction.from,
        to: formData.direction.to,
        fromAddress: formData.direction.fromAddress,
        toAddress: formData.direction.toAddress,
        showCalculator: showCalculator.value
    });
    
    if (!transportTypes.value || !formData.direction.from || !formData.direction.to) {
        console.log('calculationResult: Не заполнены города или нет типов транспорта');
        return {
            isValid: false,
            message: 'Заполните города отправления и назначения',
            allTariffs: [],
            selectedTariff: null,
            calculation: null
        };
    }
    
    // Проверяем обязательные поля груза
    const isValid = isFormDataValid();
    console.log('calculationResult: Проверка валидности формы', {
        isValid,
        cargoPackages: formData.cargo?.packages?.length || 0
    });
    
    if (!isValid) {
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
    
    console.log('calculationResult: Вызов getAllTariffsWithStatus');
    const allTariffs = getAllTariffsWithStatus();
    console.log('calculationResult: Получено тарифов', {
        total: allTariffs.length,
        available: allTariffs.filter(t => t.isAvailable).length,
        unavailable: allTariffs.filter(t => !t.isAvailable).length
    });
    
    // Считаем стоимость только для доступных тарифов
    const tariffCalculations = allTariffs.map(tariff => {
        if (tariff.isAvailable) {
            console.log('calculationResult: Расчет стоимости для тарифа', tariff.name);
            const calculation = calculateTariffCost(tariff);
            console.log('calculationResult: Результат расчета', {
                tariff: tariff.name,
                hasCalculation: !!calculation,
                totalCost: calculation?.totalCost || null
            });
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

// Обработчики событий валидации направлений
function handleCityNotFound(data) {
    console.log('City not found:', data);
    if (data.type === 'from') {
        invalidFromCity.value = {
            city: data.city,
            locality: data.locality,
            region: data.region
        };
        // Очищаем валидные данные направления
        formData.direction.from = '';
        formData.direction.fromAddress = null;
        formData.direction.fromLocalityId = null;
    } else if (data.type === 'to') {
        invalidToCity.value = {
            city: data.city,
            locality: data.locality,
            region: data.region
        };
        // Очищаем валидные данные направления
        formData.direction.to = '';
        formData.direction.toAddress = null;
        formData.direction.toLocalityId = null;
    }
}

function handleCityFound(data) {
    console.log('City found:', data);
    // Очищаем invalid состояние для найденного города
    if (data.type === 'from') {
        invalidFromCity.value = null;
    } else if (data.type === 'to') {
        invalidToCity.value = null;
    }
}

function handleAddressNotFound(data) {
    console.log('Address not found:', data);
    if (data.type === 'departure') {
        invalidFromAddress.value = {
            city: data.city,
            street: data.street,
            locality: data.locality,
            region: data.region
        };
    } else if (data.type === 'destination') {
        invalidToAddress.value = {
            city: data.city,
            street: data.street,
            locality: data.locality,
            region: data.region
        };
    }
}

function handleAddressFound(data) {
    console.log('Address found:', data);
    // Очищаем invalid состояние для найденного адреса
    if (data.type === 'departure') {
        invalidFromAddress.value = null;
    } else if (data.type === 'destination') {
        invalidToAddress.value = null;
    }
}

// Обработчики формы запроса к менеджеру
function handleManagerRequestCancel() {
    // Очищаем все недоступные направления
    invalidFromCity.value = null;
    invalidToCity.value = null;
    invalidFromAddress.value = null;
    invalidToAddress.value = null;
}

function handleManagerRequestSubmit(formData) {
    console.log('Manager request submitted:', formData);
    // TODO: Отправить данные на сервер
    // Пока просто логируем
    alert('Запрос отправлен! Наш менеджер свяжется с вами в ближайшее время.');
    // Очищаем форму после отправки
    handleManagerRequestCancel();
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
        const locality = localities.value.find(loc => String(loc.id) === String(toId));
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