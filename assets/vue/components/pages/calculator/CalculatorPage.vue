<template>
    <div class="title-wrapper mb-6">
        <h1 class="animated-title text-center text-h2 mb-2">Калькулятор стоимости пересылки</h1>
    </div>

    <div class="flex flex-col flex-1 lg:flex-row gap-8 min-w-0">
        <!-- Левая колонка: Формы ввода -->
        <div
            class="flex flex-col gap-6 lg:flex-1 [&_.text-input-vue]:focus-visible:outline-blue-400 [&_.text-input-vue>input]:p-4 [&_.text-input-vue>input::placeholder]:text-gray-600 min-w-0">
            <div class="bg-brand-light p-5 rounded-lg">
                <DirectionForm :offices="offices" v-model="formData.direction" :onlyCities="true" />
            </div>

            <div class="bg-brand-light p-5 rounded-lg">
                <CargoParamsForm v-if="calculatorConfig.packaging" :calculator-config="calculatorConfig"
                    v-model="formData.cargo" />
                <DeliveryPointForm title="Пункт отправки" terminal-label="Сдать на терминале"
                    address-label="Забрать по адресу" name-prefix="departure" :city="formData.direction.from"
                    :offices="offices" v-model="formData.departure" />
                <DeliveryPointForm title="Пункт назначения" terminal-label="Получить на терминале"
                    address-label="Доставить по адресу" name-prefix="destination" :city="formData.direction.to"
                    :offices="offices" v-model="formData.destination" />
                <ExtraOptionsForm v-model="formData.extraOptions" />


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
import { ref, onMounted, reactive, computed } from 'vue';
import DirectionForm from './DirectionForm.vue';
import CargoParamsForm from './CargoParamsForm.vue';
import DeliveryPointForm from './DeliveryPointForm.vue';
import ExtraOptionsForm from './ExtraOptionsForm.vue';
import CalculationResult from './CalculationResult.vue';

const offices = ref([]);
const calculatorConfig = ref({});

const formData = reactive({
    direction: {
        from: '',
        to: ''
    },
    cargo: {
        mode: 'individual',
        packages: [{
            id: Date.now(),
            length: '',
            width: '',
            height: '',
            weight: '',
            description: '',
            declaredValue: 1000,
            packaging: 'box-s',
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
    if (!calculatorConfig.value.tariffs || !isFormDataValid()) {
        return [];
    }
    const { direction, cargo, departure, destination } = formData;
    const defaultPackage = calculatorConfig.value.defaultValues?.cargo?.package || {
        length: '30', width: '20', height: '10', weight: '1', description: 'Посылка', declaredValue: 1000, packaging: 'box-s', selfMarking: false, dangerousGoods: false, tempControl: false, quantity: 1
    };

    // Process each package, applying defaults for missing weight or dimensions
    const processedPackages = (cargo.packages && cargo.packages.length > 0)
        ? cargo.packages.map(pkg => {
            const useDefaultDimensions = !(parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0);
            return {
                ...pkg,
                weight: (parseFloat(pkg.weight) > 0) ? parseFloat(pkg.weight) : parseFloat(defaultPackage.weight),
                length: useDefaultDimensions ? parseFloat(defaultPackage.length) : parseFloat(pkg.length),
                width: useDefaultDimensions ? parseFloat(defaultPackage.width) : parseFloat(pkg.width),
                height: useDefaultDimensions ? parseFloat(defaultPackage.height) : parseFloat(pkg.height),
                quantity: parseInt(pkg.quantity) > 0 ? parseInt(pkg.quantity) : 1
            };
        })
        : [{
            ...defaultPackage,
            id: Date.now()
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
    if (offices.value && direction.from && direction.to) {
        let fromCoords = null;
        let toCoords = null;
        if (typeof departureData.location === 'object' && departureData.location !== null && departureData.location.coordinates) {
            fromCoords = departureData.location.coordinates;
        } else if (typeof departureData.location === 'string' && departureData.location.includes(',')) {
            const foundOffice = offices.value.find(o => {
                const officeString = `${o.city}, ${o.address}`;
                return departureData.location.includes(officeString) || departureData.location.includes(o.address);
            });
            if (foundOffice && foundOffice.coordinates) {
                fromCoords = foundOffice.coordinates;
            }
        } else if (direction.from) {
            const office = offices.value.find(o => o.city === direction.from);
            if (office && office.coordinates) {
                fromCoords = office.coordinates;
            }
        }
        if (typeof destinationData.location === 'object' && destinationData.location !== null && destinationData.location.coordinates) {
            toCoords = destinationData.location.coordinates;
        } else if (typeof destinationData.location === 'string' && destinationData.location.includes(',')) {
            const foundOffice = offices.value.find(o => {
                const officeString = `${o.city}, ${o.address}`;
                return destinationData.location.includes(officeString) || destinationData.location.includes(o.address);
            });
            if (foundOffice && foundOffice.coordinates) {
                toCoords = foundOffice.coordinates;
            }
        } else if (direction.to) {
            const office = offices.value.find(o => o.city === direction.to);
            if (office && office.coordinates) {
                toCoords = office.coordinates;
            }
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
    // Для каждого тарифа определяем доступность и причину
    return calculatorConfig.value.tariffs.map(tariff => {
        let reason = '';
        let isAvailable = true;
        // Проверяем ограничения вручную, чтобы получить причину
        const { availability } = tariff;
        let totalWeight = 0, totalVolume = 0, maxDeclaredValue = 0;
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
        });
        if (availability.minWeight && totalWeight < availability.minWeight) {
            isAvailable = false;
            reason = `Минимальный вес: ${availability.minWeight} кг`;
        } else if (availability.maxWeight && totalWeight > availability.maxWeight) {
            isAvailable = false;
            reason = `Максимальный вес: ${availability.maxWeight} кг`;
        } else if (availability.minVolume && totalVolume < availability.minVolume) {
            isAvailable = false;
            reason = `Минимальный объем: ${availability.minVolume} м³`;
        } else if (availability.maxVolume && totalVolume > availability.maxVolume) {
            isAvailable = false;
            reason = `Максимальный объем: ${availability.maxVolume} м³`;
        } else if (availability.minDeclaredValue && maxDeclaredValue < availability.minDeclaredValue) {
            isAvailable = false;
            reason = `Минимальная оценочная стоимость: ${availability.minDeclaredValue} ₽`;
        } else if (availability.maxDeclaredValue && maxDeclaredValue > availability.maxDeclaredValue) {
            isAvailable = false;
            reason = `Максимальная оценочная стоимость: ${availability.maxDeclaredValue} ₽`;
        } else if (distanceKm !== null && availability.minDistance && distanceKm < availability.minDistance) {
            isAvailable = false;
            reason = `Минимальное расстояние: ${availability.minDistance} км`;
        } else if (distanceKm !== null && availability.maxDistance && distanceKm > availability.maxDistance) {
            isAvailable = false;
            reason = `Максимальное расстояние: ${availability.maxDistance} км`;
        } else if (availability.allowedRegions.length > 0) {
            const fromAllowed = availability.allowedRegions.some(region => direction.from.includes(region));
            const toAllowed = availability.allowedRegions.some(region => direction.to.includes(region));
            if (!fromAllowed || !toAllowed) {
                isAvailable = false;
                reason = `Доступно только для: ${availability.allowedRegions.join(', ')}`;
            }
        } else if (availability.excludedRegions.length > 0) {
            const fromExcluded = availability.excludedRegions.some(region => direction.from.includes(region));
            const toExcluded = availability.excludedRegions.some(region => direction.to.includes(region));
            if (fromExcluded || toExcluded) {
                isAvailable = false;
                reason = `Недоступно для выбранных регионов`;
            }
        }
        // Проверка дат (только если тариф еще доступен)
        if (isAvailable && departureData.date && availability.minAdvanceBookingDays !== undefined) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const depDate = new Date(departureData.date);
            depDate.setHours(0, 0, 0, 0);
            const daysDifference = Math.floor((depDate - today) / (1000 * 60 * 60 * 24));
            if (daysDifference < availability.minAdvanceBookingDays) {
                isAvailable = false;
                reason = `Минимальный срок предварительного заказа: ${availability.minAdvanceBookingDays} дней`;
            } else if (availability.maxAdvanceBookingDays && daysDifference > availability.maxAdvanceBookingDays) {
                isAvailable = false;
                reason = `Максимальный срок предварительного заказа: ${availability.maxAdvanceBookingDays} дней`;
            }
        }
        // Проверка минимальной даты доставки (если указана дата назначения)
        if (isAvailable && departureData.date && destinationData.date && distanceKm !== null) {
            const minDelivery = calculateMinDeliveryDate(tariff, distanceKm, departureData.date);
            if (minDelivery) {
                const requestedDeliveryDate = new Date(destinationData.date);
                if (requestedDeliveryDate < minDelivery.date) {
                    isAvailable = false;
                    reason = `Минимальная дата доставки: ${minDelivery.date.toLocaleDateString('ru-RU')}`;
                }
            }
        }
        return {
            ...tariff,
            isAvailable,
            reason
        };
    });
}

// Функция для расчета стоимости конкретного тарифа
function calculateTariffCost(tariff) {
    const { calculationRules, packaging, defaultServices } = calculatorConfig.value;
    const { cargo, departure, destination, extraOptions, direction } = formData;

    // Значения по умолчанию из конфига
    const defaultPackage = calculatorConfig.value.defaultValues?.cargo?.package || {
        length: '30',
        width: '20',
        height: '10',
        weight: '1',
        description: 'Посылка',
        declaredValue: 1000,
        packaging: 'box-s',
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
    };

    // Используем существующие данные или значения по умолчанию
    // Process each package, applying defaults for missing weight or dimensions
    const packages = (cargo.packages && cargo.packages.length > 0)
        ? cargo.packages.map(pkg => {
            const useDefaultDimensions = !(parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0);
            return {
                ...pkg,
                weight: (parseFloat(pkg.weight) > 0) ? parseFloat(pkg.weight) : parseFloat(defaultPackage.weight),
                length: useDefaultDimensions ? parseFloat(defaultPackage.length) : parseFloat(pkg.length),
                width: useDefaultDimensions ? parseFloat(defaultPackage.width) : parseFloat(pkg.width),
                height: useDefaultDimensions ? parseFloat(defaultPackage.height) : parseFloat(pkg.height),
                quantity: parseInt(pkg.quantity) > 0 ? parseInt(pkg.quantity) : 1
            };
        })
        : [{
            ...defaultPackage,
            id: Date.now()
        }];

    // Значения по умолчанию для точек отправления и назначения
    const defaultDeliveryMode = calculatorConfig.value.defaultValues?.delivery?.mode || 'terminal';

    const departureData = {
        deliveryMode: departure.deliveryMode || defaultDeliveryMode,
        location: departure.location || '',
        date: departure.date || (() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toISOString().split('T')[0];
        })()
    };

    const destinationData = {
        deliveryMode: destination.deliveryMode || defaultDeliveryMode,
        location: destination.location || '',
        date: destination.date || ''
    };

    const extraOptionsData = {
        requiresAccompanyingDocs: extraOptions.requiresAccompanyingDocs || false,
        returnDocsToSender: extraOptions.returnDocsToSender || false
    };

    const details = [];
    const packageDetails = []; // Детализация по местам

    // 1. Расчет веса и объема с учетом количества
    let totalWeight = 0, totalVolume = 0, maxDeclaredValue = 0;
    let hasAnyDangerousGoods = false, hasAnyTempControl = false;
    let totalPackagesCount = 0;
    let totalPackagingCost = 0, totalMarkingDiscount = 0;

    // Расчет расстояния для времени доставки
    let distanceKm = null;
    if (offices.value && direction.from && direction.to) {
        let fromCoords = null;
        let toCoords = null;

        // Отладочная информация
        // console.log('DEBUG: departure.location =', departureData.location);
        // console.log('DEBUG: destination.location =', destinationData.location);
        // console.log('DEBUG: direction.from =', direction.from);
        // console.log('DEBUG: direction.to =', direction.to);

        // Улучшенная логика получения координат отправления
        if (typeof departureData.location === 'object' && departureData.location !== null && departureData.location.coordinates) {
            fromCoords = departureData.location.coordinates;
            // console.log('DEBUG: Using departure terminal coordinates:', fromCoords);
        } else if (typeof departureData.location === 'string' && departureData.location.includes(',')) {
            // Если location - строка с адресом, пытаемся найти соответствующий офис
            const foundOffice = offices.value.find(o => {
                const officeString = `${o.city}, ${o.address}`;
                return departureData.location.includes(officeString) || departureData.location.includes(o.address);
            });
            if (foundOffice && foundOffice.coordinates) {
                fromCoords = foundOffice.coordinates;
                // console.log('DEBUG: Using departure terminal coordinates from string match:', fromCoords, 'from office:', foundOffice.address);
            }
        } else if (direction.from) {
            // Если адрес, или не выбран терминал - берем первый офис в городе отправления
            const office = offices.value.find(o => o.city === direction.from);
            if (office && office.coordinates) {
                fromCoords = office.coordinates;
                // console.log('DEBUG: Using departure city coordinates:', fromCoords, 'from office:', office.address);
            }
        }

        // Улучшенная логика получения координат назначения  
        if (typeof destinationData.location === 'object' && destinationData.location !== null && destinationData.location.coordinates) {
            toCoords = destinationData.location.coordinates;
            // console.log('DEBUG: Using destination terminal coordinates:', toCoords);
        } else if (typeof destinationData.location === 'string' && destinationData.location.includes(',')) {
            // Если location - строка с адресом, пытаемся найти соответствующий офис
            const foundOffice = offices.value.find(o => {
                const officeString = `${o.city}, ${o.address}`;
                return destinationData.location.includes(officeString) || destinationData.location.includes(o.address);
            });
            if (foundOffice && foundOffice.coordinates) {
                toCoords = foundOffice.coordinates;
                // console.log('DEBUG: Using destination terminal coordinates from string match:', toCoords, 'from office:', foundOffice.address);
            }
        } else if (direction.to) {
            // Если адрес, или не выбран терминал - берем первый офис в городе назначения
            const office = offices.value.find(o => o.city === direction.to);
            if (office && office.coordinates) {
                toCoords = office.coordinates;
                // console.log('DEBUG: Using destination city coordinates:', toCoords, 'from office:', office.address);
            }
        }

        // Если обе координаты найдены, рассчитываем расстояние
        if (fromCoords && toCoords) {
            distanceKm = getDistanceKm(
                parseFloat(fromCoords[0]),
                parseFloat(fromCoords[1]),
                parseFloat(toCoords[0]),
                parseFloat(toCoords[1])
            );
            // console.log('DEBUG: Calculated distance:', distanceKm, 'km');
        }
    }

    // Расчет времени доставки
    const deliveryTimeInfo = calculateDeliveryTime(tariff, distanceKm || 0);
    const minDeliveryInfo = calculateMinDeliveryDate(tariff, distanceKm || 0, departureData.date);

    // Детальный расчет для каждого места
    packages.forEach((pkg, index) => {
        const weight = parseFloat(pkg.weight) || 0;
        const volume = (parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height)) / 1000000 || 0;
        const declaredValue = parseFloat(pkg.declaredValue) || 0;
        const quantity = parseInt(pkg.quantity) || 1;

        const packageWeight = weight * quantity;
        const packageVolume = volume * quantity;

        totalWeight += packageWeight;
        totalVolume += packageVolume;
        totalPackagesCount += quantity;
        maxDeclaredValue = Math.max(maxDeclaredValue, declaredValue);

        if (pkg.dangerousGoods) hasAnyDangerousGoods = true;
        if (pkg.tempControl) hasAnyTempControl = true;

        // Расчет стоимости для одного места
        const singleWeightCost = weight * tariff.baseRatePerKg;
        const singleVolumeCost = volume * tariff.baseRatePerM3;
        const singleBaseCost = Math.max(singleWeightCost, singleVolumeCost, tariff.minCost / quantity);

        // Упаковка для этого места
        let packagePackagingCost = 0;
        if (pkg.packaging && packaging) {
            const packagingOption = packaging.find(p => p.id === pkg.packaging);
            if (packagingOption && packagingOption.cost > 0) {
                packagePackagingCost = packagingOption.cost;
                totalPackagingCost += packagingOption.cost * quantity;
            }
        }

        // Самостоятельная маркировка для этого места
        let packageMarkingDiscount = 0;
        if (pkg.selfMarking && tariff.services?.selfMarking?.enabled) {
            packageMarkingDiscount = Math.abs(tariff.services.selfMarking.cost);
            totalMarkingDiscount += packageMarkingDiscount * quantity;
        }

        // Детализация для этого места
        const packageInfo = {
            index: index + 1,
            description: pkg.description || `Место ${index + 1}`,
            dimensions: `${pkg.length || 0}×${pkg.width || 0}×${pkg.height || 0} см`,
            singleWeight: weight,
            singleVolume: volume,
            quantity: quantity,
            totalWeight: packageWeight,
            totalVolume: packageVolume,
            singleWeightCost,
            singleVolumeCost,
            singleBaseCost,
            totalBaseCost: singleBaseCost * quantity,
            packaging: pkg.packaging,
            packagingCost: packagePackagingCost,
            totalPackagingCost: packagePackagingCost * quantity,
            selfMarking: pkg.selfMarking,
            markingDiscount: packageMarkingDiscount,
            totalMarkingDiscount: packageMarkingDiscount * quantity,
            dangerousGoods: pkg.dangerousGoods,
            tempControl: pkg.tempControl,
            declaredValue: declaredValue
        };
        packageDetails.push(packageInfo);
    });

    // 2. Расчет расстояния между пунктами
    let distanceCost = 0;
    const distanceCoefficient = calculationRules?.distanceCoefficient || 10;
    if (offices.value && direction.from && direction.to) {
        let fromCoordsDistance = null;
        let toCoordsDistance = null;

        // Улучшенная логика получения координат отправления (для distanceCost)
        if (typeof departureData.location === 'object' && departureData.location !== null && departureData.location.coordinates) {
            fromCoordsDistance = departureData.location.coordinates;
        } else if (typeof departureData.location === 'string' && departureData.location.includes(',')) {
            // Если location - строка с адресом, пытаемся найти соответствующий офис
            const foundOffice = offices.value.find(o => {
                const officeString = `${o.city}, ${o.address}`;
                return departureData.location.includes(officeString) || departureData.location.includes(o.address);
            });
            if (foundOffice && foundOffice.coordinates) {
                fromCoordsDistance = foundOffice.coordinates;
            }
        } else if (direction.from) {
            // Если адрес, или не выбран терминал - берем первый офис в городе отправления
            const office = offices.value.find(o => o.city === direction.from);
            if (office && office.coordinates) {
                fromCoordsDistance = office.coordinates;
            }
        }

        // Улучшенная логика получения координат назначения (для distanceCost)
        if (typeof destinationData.location === 'object' && destinationData.location !== null && destinationData.location.coordinates) {
            toCoordsDistance = destinationData.location.coordinates;
        } else if (typeof destinationData.location === 'string' && destinationData.location.includes(',')) {
            // Если location - строка с адресом, пытаемся найти соответствующий офис
            const foundOffice = offices.value.find(o => {
                const officeString = `${o.city}, ${o.address}`;
                return destinationData.location.includes(officeString) || destinationData.location.includes(o.address);
            });
            if (foundOffice && foundOffice.coordinates) {
                toCoordsDistance = foundOffice.coordinates;
            }
        } else if (direction.to) {
            // Если адрес, или не выбран терминал - берем первый офис в городе назначения
            const office = offices.value.find(o => o.city === direction.to);
            if (office && office.coordinates) {
                toCoordsDistance = office.coordinates;
            }
        }

        // Если обе координаты найдены, рассчитываем расстояние
        if (fromCoordsDistance && toCoordsDistance) {
            distanceKm = getDistanceKm(
                parseFloat(fromCoordsDistance[0]),
                parseFloat(fromCoordsDistance[1]),
                parseFloat(toCoordsDistance[0]),
                parseFloat(toCoordsDistance[1])
            );
            distanceCost = distanceKm * distanceCoefficient;
        }
    }

    // 3. Расчет базовой стоимости по тарифу
    const weightCost = totalWeight * tariff.baseRatePerKg;
    const volumeCost = totalVolume * tariff.baseRatePerM3;
    let baseCost = Math.max(weightCost, volumeCost, tariff.minCost);

    // Добавляем детализацию по местам
    if (packageDetails.length > 0) {
        details.push({ name: 'ДЕТАЛИЗАЦИЯ ПО МЕСТАМ', cost: 0, isHeader: true });

        packageDetails.forEach(pkgDetail => {
            // Заголовок места
            const placeTitle = pkgDetail.quantity > 1
                ? `${pkgDetail.description} (×${pkgDetail.quantity})`
                : pkgDetail.description;
            details.push({ name: placeTitle, cost: 0, isSubHeader: true });

            // Характеристики места
            details.push({
                name: `  Размеры: ${pkgDetail.dimensions}, объем: ${pkgDetail.singleVolume.toFixed(3)} м³`,
                cost: 0,
                isDetail: true
            });

            if (pkgDetail.quantity > 1) {
                details.push({
                    name: `  Вес одного места: ${pkgDetail.singleWeight.toFixed(1)} кг`,
                    cost: 0,
                    isDetail: true
                });
                details.push({
                    name: `  Общий вес: ${pkgDetail.totalWeight.toFixed(1)} кг (${pkgDetail.singleWeight.toFixed(1)} × ${pkgDetail.quantity})`,
                    cost: 0,
                    isDetail: true
                });
            } else {
                details.push({
                    name: `  Вес: ${pkgDetail.singleWeight.toFixed(1)} кг`,
                    cost: 0,
                    isDetail: true
                });
            }

            // Стоимость места
            if (pkgDetail.quantity > 1) {
                details.push({
                    name: `  Базовая стоимость одного места:`,
                    cost: pkgDetail.singleBaseCost,
                    isDetailCost: true
                });
                details.push({
                    name: `  Стоимость всех мест (×${pkgDetail.quantity}):`,
                    cost: pkgDetail.totalBaseCost,
                    isDetailCost: true
                });
            } else {
                details.push({
                    name: `  Базовая стоимость места:`,
                    cost: pkgDetail.singleBaseCost,
                    isDetailCost: true
                });
            }

            // Упаковка для места
            if (pkgDetail.totalPackagingCost > 0) {
                if (pkgDetail.quantity > 1) {
                    details.push({
                        name: `  Упаковка (×${pkgDetail.quantity}):`,
                        cost: pkgDetail.totalPackagingCost,
                        isDetailCost: true
                    });
                } else {
                    details.push({
                        name: `  Упаковка:`,
                        cost: pkgDetail.totalPackagingCost,
                        isDetailCost: true
                    });
                }
            }

            // Маркировка для места
            if (pkgDetail.totalMarkingDiscount > 0) {
                if (pkgDetail.quantity > 1) {
                    details.push({
                        name: `  Самостоятельная маркировка (×${pkgDetail.quantity}):`,
                        cost: -pkgDetail.totalMarkingDiscount,
                        isDetailCost: true
                    });
                } else {
                    details.push({
                        name: `  Самостоятельная маркировка:`,
                        cost: -pkgDetail.totalMarkingDiscount,
                        isDetailCost: true
                    });
                }
            }

            // Специальные отметки
            if (pkgDetail.dangerousGoods) {
                details.push({
                    name: `  ⚠️ Опасный груз`,
                    cost: 0,
                    isDetail: true
                });
            }
            if (pkgDetail.tempControl) {
                details.push({
                    name: `  🌡️ Температурный режим`,
                    cost: 0,
                    isDetail: true
                });
            }
            if (pkgDetail.declaredValue > 0) {
                details.push({
                    name: `  💎 Оценочная стоимость: ${pkgDetail.declaredValue.toLocaleString('ru-RU')} ₽`,
                    cost: 0,
                    isDetail: true
                });
            }
        });

        details.push({ name: 'ИТОГО ПО МЕСТАМ', cost: 0, isHeader: true });
        details.push({
            name: `Общее количество мест: ${totalPackagesCount}`,
            cost: 0,
            isDetail: true
        });
        details.push({
            name: `Общий вес: ${totalWeight.toFixed(1)} кг`,
            cost: 0,
            isDetail: true
        });
        details.push({
            name: `Общий объем: ${totalVolume.toFixed(3)} м³`,
            cost: 0,
            isDetail: true
        });
        details.push({ name: 'РАСЧЕТ ТАРИФА', cost: 0, isHeader: true });
    }

    details.push({
        name: `По весу: ${totalWeight.toFixed(1)} кг × ${tariff.baseRatePerKg} ₽/кг`,
        cost: weightCost
    });
    details.push({
        name: `По объему: ${totalVolume.toFixed(3)} м³ × ${tariff.baseRatePerM3} ₽/м³`,
        cost: volumeCost
    });

    // 4. Применяем коэффициенты тарифа
    let totalMultiplier = 1;
    const tariffCoefficients = tariff.coefficients || {};

    if (hasAnyDangerousGoods && tariffCoefficients.dangerousGoodsMultiplier) {
        const multiplier = tariffCoefficients.dangerousGoodsMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: 'Наценка за опасный груз', cost: markup });
    }

    if (hasAnyTempControl && tariffCoefficients.temperatureControlMultiplier) {
        const multiplier = tariffCoefficients.temperatureControlMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: 'Наценка за температурный режим', cost: markup });
    }

    if (departureData.deliveryMode === 'address' && tariffCoefficients.fromAddressMultiplier) {
        const multiplier = tariffCoefficients.fromAddressMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: 'Забор от адреса', cost: markup });
    }

    if (destinationData.deliveryMode === 'address' && tariffCoefficients.toAddressMultiplier) {
        const multiplier = tariffCoefficients.toAddressMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: 'Доставка до адреса', cost: markup });
    }

    // Скидка за множественные места (теперь учитываем общее количество)
    if (totalPackagesCount >= (tariffCoefficients.multiplePackagesDiscount?.threshold || 5) &&
        tariffCoefficients.multiplePackagesDiscount) {
        const multiplier = tariffCoefficients.multiplePackagesDiscount.value;
        totalMultiplier *= multiplier;
        const discount = baseCost * (1 - multiplier);
        details.push({ name: `Скидка за множественные места (${totalPackagesCount} шт.)`, cost: -discount });
    }

    const adjustedBaseCost = baseCost * totalMultiplier;

    // 5. Дополнительные услуги
    let additionalServicesCost = 0;
    const tariffServices = tariff.services || {};

    // Упаковка (уже посчитана выше)
    if (totalPackagingCost > 0) {
        additionalServicesCost += totalPackagingCost;
        // Не добавляем в details, так как уже показано по местам
    }

    // Самостоятельная маркировка (уже посчитана выше)
    if (totalMarkingDiscount > 0) {
        additionalServicesCost -= totalMarkingDiscount;
        // Не добавляем в details, так как уже показано по местам
    }

    // Расстояние
    if (distanceCost > 0) {
        additionalServicesCost += distanceCost;
        details.push({ name: `Расстояние: ${distanceKm.toFixed(2)} км (${distanceCoefficient} ₽/км)`, cost: distanceCost });
    }

    if (tariffServices.logisticProcessing?.enabled && tariffServices.logisticProcessing.cost > 0) {
        additionalServicesCost += tariffServices.logisticProcessing.cost;
        details.push({ name: defaultServices.logisticProcessing.name, cost: tariffServices.logisticProcessing.cost });
    }

    if (extraOptionsData.returnDocsToSender && tariffServices.documentReturn?.enabled) {
        additionalServicesCost += tariffServices.documentReturn.cost;
        details.push({ name: defaultServices.documentReturn.name, cost: tariffServices.documentReturn.cost });
    }

    if (extraOptionsData.requiresAccompanyingDocs && tariffServices.statusInfo?.enabled) {
        additionalServicesCost += tariffServices.statusInfo.cost;
        details.push({ name: defaultServices.statusInfo.name, cost: tariffServices.statusInfo.cost });
    }

    // Страхование (считаем от максимальной оценочной стоимости)
    if (tariffServices.insurance?.enabled && maxDeclaredValue && maxDeclaredValue > 0) {
        const insuranceCost = Math.max(
            maxDeclaredValue * tariffServices.insurance.rate,
            tariffServices.insurance.min
        );
        additionalServicesCost += insuranceCost;
        details.push({
            name: `${defaultServices.insurance.name} (${(tariffServices.insurance.rate * 100).toFixed(1)}% от ${maxDeclaredValue.toLocaleString('ru-RU')} ₽)`,
            cost: insuranceCost
        });
    }

    const finalCost = adjustedBaseCost + additionalServicesCost;

    // Create summary object for the UI
    const summary = {
        baseCost: adjustedBaseCost,
        additionalServices: additionalServicesCost - distanceCost, // Services without distance
        distance: distanceCost,
        multiplier: totalMultiplier
    };

    // 12. Возвращаем результат
    return {
        tariff: tariff,
        totalCost: finalCost,
        details: details,
        packageDetails: packageDetails,
        summary: summary,
        // Добавляем информацию о времени доставки
        deliveryInfo: deliveryTimeInfo,
        minDeliveryDate: minDeliveryInfo,
        distanceKm: distanceKm
    };
}

async function fetchData() {
    try {
        const [officesRes, configRes] = await Promise.all([
            fetch('./assets/data/contacts.json'),
            fetch('./assets/data/calculator-data.json')
        ]);
        const officesData = await officesRes.json();
        offices.value = officesData.offices || [];
        calculatorConfig.value = await configRes.json();

        // Проверка GET-параметров после загрузки данных офисов
        const urlParams = new URLSearchParams(window.location.search);
        const fromId = urlParams.get('from');
        const toId = urlParams.get('to');

        if (fromId) {
            const office = offices.value.find(o => o.id === parseInt(fromId));
            if (office) {
                // В калькуляторе используется onlyCities, поэтому сохраняем только город
                formData.direction.from = office.city;
                formData.departure.location = office;
            }
        }

        if (toId) {
            const office = offices.value.find(o => o.id === parseInt(toId));
            if (office) {
                // В калькуляторе используется onlyCities, поэтому сохраняем только город
                formData.direction.to = office.city;
                formData.destination.location = office;
            }
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
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

    // Проверяем только основные поля - города отправления и назначения
    if (!direction.from || !direction.to) return false;

    return true;
}

function calculateCost() {
    // Проверяем загружен ли конфиг
    if (!calculatorConfig.value.tariffs) {
        return null;
    }

    // Проверяем валидность данных формы
    if (!isFormDataValid()) {
        return null;
    }

    // Получаем доступные тарифы
    const availableTariffs = getAvailableTariffs();
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
            tariff,
            totalCost: calculation.totalCost,
            details: calculation.details,
            summary: calculation.summary
        };
    });

    // Сортируем тарифы по стоимости (от самого выгодного к самому дорогому)
    tariffCalculations.sort((a, b) => a.totalCost - b.totalCost);

    // Рассчитываем экономию относительно самого дорогого тарифа
    const mostExpensive = tariffCalculations[tariffCalculations.length - 1];
    const tariffsWithSavings = tariffCalculations.map((calc, index) => ({
        ...calc,
        savings: mostExpensive.totalCost - calc.totalCost,
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
        selectedTariff = tariffsWithSavings[0].tariff;
        formData.selectedTariff = selectedTariff.id;
    }

    // Находим результат для выбранного тарифа
    const selectedCalculation = tariffsWithSavings.find(calc => calc.tariff.id === selectedTariff.id);

    return {
        totalCost: selectedCalculation.totalCost,
        details: selectedCalculation.details,
        tariff: selectedTariff,
        availableTariffs: tariffsWithSavings,
        summary: selectedCalculation.summary
    };
}

// Reactive calculation result
const calculationResult = computed(() => {
    if (!calculatorConfig.value.tariffs || !formData.direction.from || !formData.direction.to) {
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
                totalCost: calculation.totalCost,
                details: calculation.details,
                packageDetails: calculation.packageDetails,
                summary: calculation.summary,
                deliveryInfo: calculation.deliveryInfo,
                minDeliveryDate: calculation.minDeliveryInfo,
                distanceKm: calculation.distanceKm
            };
        } else {
            return {
                ...tariff,
                totalCost: null,
                details: [],
                summary: null,
                deliveryInfo: null,
                minDeliveryDate: null,
                distanceKm: null
            };
        }
    });

    // Находим доступные тарифы и сортируем по цене
    const available = tariffCalculations.filter(t => t.isAvailable).sort((a, b) => a.totalCost - b.totalCost);
    const unavailable = tariffCalculations.filter(t => !t.isAvailable).sort((a, b) => a.priority - b.priority);

    // Рассчитываем экономию относительно базового тарифа (cargo-basic)
    const basicTariff = available.find(t => t.id === 'cargo-basic');
    const basicCost = basicTariff ? basicTariff.totalCost : null;

    // Добавляем информацию об экономии и рекомендации
    const availableWithSavings = available.map((tariff, index) => {
        let savingsAmount = 0;
        let isRecommended = false;

        if (basicCost && tariff.totalCost < basicCost) {
            savingsAmount = basicCost - tariff.totalCost;
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
        isValid: availableWithSavings.length > 0,
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

function selectTariff(tariffId) {
    formData.selectedTariff = tariffId;
}

onMounted(fetchData);
</script>