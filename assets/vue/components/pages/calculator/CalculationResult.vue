<template>
    <aside class="h-fit card">
        <h2 class="text-h4 font-bold mb-4">Стоимость перевозки</h2>

        <div v-if="!result || !result.isValid" class="text-gray-500">
            <p>Заполните все обязательные поля, чтобы увидеть стоимость перевозки.</p>
            <div class="mt-3 text-sm text-gray-400">
                <p>Необходимо указать:</p>
                <ul class="list-disc list-inside mt-1 space-y-1">
                    <li>Города отправления и назначения</li>
                    <li>Параметры груза (размеры и вес)</li>
                    <li>Пункты отправки и получения</li>
                    <li>Дату отправки</li>
                </ul>
            </div>
        </div>

        <div v-else>
            <!-- Параметры расчёта -->
            <div class="border-b pb-4 mb-4">
                <h3 class="text-lg font-semibold mb-3 text-gray-700">Параметры расчёта</h3>

                <!-- Маршрут -->
                <div class="flex items-center justify-between mb-4">
                    <div class="text-left">
                        <div class="font-semibold text-base">{{ routeInfo.from }}</div>
                        <div class="text-sm text-gray-500">{{ routeInfo.fromDetails }}</div>
                    </div>
                    <div class="mx-4 flex-1 flex items-center justify-center">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </div>
                    <div class="text-right">
                        <div class="font-semibold text-base">{{ routeInfo.to }}</div>
                        <div class="text-sm text-gray-500">{{ routeInfo.toDetails }}</div>
                    </div>
                </div>

                <!-- Характеристики груза -->
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div class="text-2xl font-bold text-gray-800">{{ cargoInfo.count }}</div>
                        <div class="text-sm text-gray-600">{{ cargoInfo.countLabel }}</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-gray-800">{{ cargoInfo.weight }}</div>
                        <div class="text-sm text-gray-600">кг</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-gray-800">{{ cargoInfo.volume }}</div>
                        <div class="text-sm text-gray-600">куб.м</div>
                    </div>
                </div>
                <!-- Километраж -->
                <div v-if="result.distanceKm" class="mt-2 text-center">
                    <span class="text-base text-gray-700 font-medium">Расстояние: </span>
                    <span class="text-lg font-bold text-gray-900">{{ Math.round(result.distanceKm) }} км</span>
                </div>
            </div>

            <!-- Сообщения о параметрах по умолчанию -->
            <div v-if="displayMessages.length > 0" class="mt-4">
                <button @click="toggleMessagesSpoiler"
                    class="w-full flex items-center justify-between text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    <span class="font-bold text-blue-800 text-sm">Не все поля заполнены, использованы значения по
                        умолчанию</span>
                    <svg :class="['w-4 h-4 text-blue-600 transition-transform', isMessagesSpoilerExpanded ? 'rotate-180' : '']"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                <div v-if="isMessagesSpoilerExpanded"
                    class="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mt-2 rounded-b-md text-sm animate-fade-in"
                    role="alert">
                    <ul class="list-disc list-inside space-y-1">
                        <li v-for="(message, index) in displayMessages" :key="index">{{ message }}</li>
                    </ul>
                </div>
            </div>

            <!-- Основной тариф -->
            <div v-if="result.selectedTariff" class="border-b pb-4 mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-lg">{{ result.selectedTariff.name }}</span>
                    <span class="font-bold text-lg">{{ formatCurrency(result.selectedTariff.totalCost) }}</span>
                </div>
                <div class="text-sm text-gray-500 mb-3">{{ result.selectedTariff.description }}</div>

                <!-- Время доставки -->
                <div v-if="result.selectedTariff.deliveryInfo" class="text-sm text-blue-600 mb-2">
                    <span class="font-medium">Время доставки:</span> {{ result.selectedTariff.deliveryInfo.description
                    }}
                    <span v-if="result.selectedTariff.deliveryInfo.days"> ({{ result.selectedTariff.deliveryInfo.days }}
                        дн.)</span>
                </div>
                <div v-if="result.selectedTariff.minDeliveryDate" class="text-sm text-green-600 mb-3">
                    <span class="font-medium">Минимальная дата доставки:</span>
                    {{ formatDate(result.selectedTariff.minDeliveryDate.date) }}
                </div>
            </div>

            <!-- Список всех тарифов -->
            <div v-if="result.allTariffs && result.allTariffs.length > 0" class="space-y-4 mb-6">
                <h3 class="text-lg font-semibold text-gray-800">Все тарифы:</h3>
                <div v-for="tariff in result.allTariffs" :key="tariff.id" :class="[
                    'border rounded-lg p-4 transition-all duration-200',
                    tariff.isAvailable ? 'cursor-pointer hover:border-blue-300' : 'opacity-60 cursor-not-allowed bg-gray-100',
                    tariff.id === result.selectedTariff?.id && tariff.isAvailable ? 'border-brand-blue bg-blue-50' : 'border-gray-200'
                ]" @click="tariff.isAvailable && $emit('selectTariff', tariff.id)">

                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800 flex items-center gap-2">
                                {{ tariff.name }}
                                <span v-if="tariff.isAvailable && tariff.recommended"
                                    class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    Рекомендуем
                                </span>
                            </h4>
                            <p class="text-sm text-gray-600 mb-1">{{ tariff.description }}</p>

                            <!-- Условия тарифа -->
                            <ul class="text-xs text-gray-500 mb-1">
                                <li v-if="tariff.availability.minWeight">Мин. вес: {{ tariff.availability.minWeight }}
                                    кг</li>
                                <li v-if="tariff.availability.maxWeight">Макс. вес: {{ tariff.availability.maxWeight }}
                                    кг</li>
                                <li v-if="tariff.availability.minVolume">Мин. объем: {{ tariff.availability.minVolume }}
                                    м³</li>
                                <li v-if="tariff.availability.maxVolume">Макс. объем: {{ tariff.availability.maxVolume
                                    }} м³</li>
                                <li v-if="tariff.availability.minDeclaredValue">Мин. оценочная стоимость: {{
                                    tariff.availability.minDeclaredValue }} ₽</li>
                                <li v-if="tariff.availability.maxDeclaredValue">Макс. оценочная стоимость: {{
                                    tariff.availability.maxDeclaredValue }} ₽</li>
                                <li v-if="tariff.availability.maxDistance">Макс. расстояние: {{
                                    tariff.availability.maxDistance }} км</li>
                                <li
                                    v-if="tariff.availability.allowedRegions && tariff.availability.allowedRegions.length">
                                    Только для: {{ tariff.availability.allowedRegions.join(', ') }}</li>
                            </ul>

                            <!-- Причина недоступности -->
                            <div v-if="!tariff.isAvailable" class="text-xs text-red-500 mb-1 font-medium">
                                Недоступно: {{ tariff.reason }}
                            </div>

                            <!-- Время доставки -->
                            <div v-if="tariff.deliveryInfo" class="mt-1 text-sm text-blue-600">
                                <span class="font-medium">Время доставки:</span> {{ tariff.deliveryInfo.description }}
                                <span v-if="tariff.deliveryInfo.days"> ({{ tariff.deliveryInfo.days }} дн.)</span>
                            </div>
                            <div v-if="tariff.minDeliveryDate" class="text-sm text-green-600">
                                <span class="font-medium">Минимальная дата доставки:</span>
                                {{ formatDate(tariff.minDeliveryDate.date) }}
                            </div>
                        </div>
                        <div class="text-right">
                            <div v-if="tariff.isAvailable" class="text-xl font-bold text-gray-800">{{
                                Math.round(tariff.totalCost) }} ₽</div>
                            <div v-else class="text-xl font-bold text-gray-400">—</div>
                            <div v-if="tariff.savings > 0 && tariff.isAvailable" class="text-sm text-green-600">
                                Экономия {{ Math.round(tariff.savings) }} ₽
                            </div>
                        </div>
                    </div>

                    <!-- Кнопка раскрытия детализации -->
                    <div v-if="tariff.isAvailable" class="mt-3 pt-3 border-t border-gray-200">
                        <button @click.stop="toggleTariffDetails(tariff.id)"
                            class="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <span>{{ expandedTariffs.includes(tariff.id) ? 'Скрыть' : 'Показать' }} детализацию</span>
                            <svg :class="['w-4 h-4 transition-transform', expandedTariffs.includes(tariff.id) ? 'rotate-180' : '']"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        <!-- Раскрывающаяся детализация -->
                        <div v-if="expandedTariffs.includes(tariff.id) && tariff.details"
                            class="mt-3 space-y-1 text-sm animate-fade-in">
                            <h5 class="font-medium text-gray-700 mb-2">Детализация расчета:</h5>
                            <div v-for="detail in tariff.details" :key="detail.name" :class="['flex justify-between',
                                detail.isHeader ? 'font-semibold text-gray-800 mt-3 mb-1' : '',
                                detail.isSubHeader ? 'font-medium text-gray-700 mt-2' : '',
                                detail.isDetail ? 'text-gray-500 text-xs pl-4' : '',
                                detail.isDetailCost ? 'text-gray-600 text-xs pl-4' : '',
                                detail.cost < 0 ? 'text-green-600' : '']">
                                <span>{{ detail.name }}</span>
                                <span v-if="!detail.isHeader && !detail.isSubHeader && !detail.isDetail">
                                    {{ detail.cost < 0 ? '' : '+' }}{{ formatCurrency(detail.cost) }} </span>
                            </div>
                            <!-- Добавляем детали времени доставки -->
                            <div v-if="tariff.deliveryInfo" class="border-t pt-2 mt-2">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Время доставки:</span>
                                    <span class="font-medium">{{ tariff.deliveryInfo.days }} дн.</span>
                                </div>
                                <div v-if="result.distanceKm" class="flex justify-between">
                                    <span class="text-gray-600">Расстояние:</span>
                                    <span class="font-medium">{{ Math.round(result.distanceKm) }} км</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Итоговая стоимость -->
            <div v-if="result.selectedTariff" class="border-t pt-4">
                <div v-if="result.selectedTariff.summary" class="text-sm space-y-1 mb-3">
                    <div class="flex justify-between text-gray-600">
                        <span>Тарифная стоимость:</span>
                        <span>{{ formatCurrency(result.selectedTariff.summary.baseCost) }}</span>
                    </div>
                    <div v-if="result.selectedTariff.summary.additionalServices !== 0"
                        class="flex justify-between text-gray-600">
                        <span>Дополнительные услуги:</span>
                        <span>{{ formatCurrency(result.selectedTariff.summary.additionalServices) }}</span>
                    </div>
                    <div v-if="result.selectedTariff.summary.distance > 0" class="flex justify-between text-gray-600">
                        <span>Стоимость расстояния:</span>
                        <span>{{ formatCurrency(result.selectedTariff.summary.distance) }}</span>
                    </div>
                </div>

                <div class="flex justify-between items-center font-bold text-lg border-t pt-3">
                    <span>Общая стоимость</span>
                    <span class="text-xl">{{ formatCurrency(result.selectedTariff.totalCost) }}</span>
                </div>

                <div class="text-xs text-gray-400 mt-1">
                    С учетом НДС
                </div>
            </div>

            <button @click="$emit('print')" class="btn btn-secondary w-full mt-4">Распечатать</button>
        </div>
    </aside>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    result: {
        type: Object,
        default: null
    },
    formData: {
        type: Object,
        default: () => ({})
    },
    calculatorConfig: {
        type: Object,
        default: () => ({})
    }
});

defineEmits(['print', 'selectTariff']);

// Состояние для раскрытия детализации по тарифам
const expandedTariffs = ref([]);

function toggleTariffDetails(tariffId) {
    if (expandedTariffs.value.includes(tariffId)) {
        expandedTariffs.value = expandedTariffs.value.filter(id => id !== tariffId);
    } else {
        expandedTariffs.value.push(tariffId);
    }
}

// Вычисляем информацию о маршруте
const routeInfo = computed(() => {
    if (!props.formData.direction) {
        return { from: '', to: '', fromDetails: '', toDetails: '' };
    }

    return {
        from: props.formData.direction.from || '',
        to: props.formData.direction.to || '',
        fromDetails: props.formData.departure?.deliveryMode === 'terminal' ? 'От терминала' : 'От адреса',
        toDetails: props.formData.destination?.deliveryMode === 'terminal' ? 'До терминала' : 'До адреса'
    };
});

// Вычисляем информацию о грузе
const cargoInfo = computed(() => {
    // console.log('DEBUG: CalculationResult - cargoInfo computed');
    // console.log('DEBUG: result.selectedTariff:', props.result?.selectedTariff);
    // console.log('DEBUG: result.selectedTariff.packageDetails:', props.result?.selectedTariff?.packageDetails);

    const defaultPackage = props.calculatorConfig.defaultValues?.cargo?.package || {
        length: '30', width: '20', height: '10', weight: '1', description: 'Посылка', declaredValue: 1000, packaging: 'box-s', selfMarking: false, dangerousGoods: false, tempControl: false, quantity: 1
    };

    // Если есть packageDetails в выбранном тарифе — используем их (они всегда соответствуют расчету)
    if (props.result && props.result.selectedTariff && props.result.selectedTariff.packageDetails && props.result.selectedTariff.packageDetails.length > 0) {
        const details = props.result.selectedTariff.packageDetails;
        const totalCount = details.reduce((sum, pkg) => sum + (pkg.quantity || 1), 0);
        const totalWeight = details.reduce((sum, pkg) => sum + (pkg.totalWeight || 0), 0);
        const totalVolume = details.reduce((sum, pkg) => sum + (pkg.totalVolume || 0), 0);
        const countLabel = totalCount === 1 ? 'место' : 'мест';

        // console.log('DEBUG: Using packageDetails from selected tariff.', { totalCount, totalWeight, totalVolume });

        return {
            count: formatNumber(totalCount),
            countLabel,
            weight: formatWeight(totalWeight),
            volume: formatVolume(totalVolume)
        };
    }

    // Иначе — используем данные из формы, применяя значения по умолчанию для отсутствующих полей
    if (!props.formData.cargo || !props.formData.cargo.packages || props.formData.cargo.packages.length === 0) {
        // console.log('DEBUG: Using default cargoInfo (form data is empty or no packages).');
        const quantity = parseInt(defaultPackage.quantity) || 1;
        return {
            count: formatNumber(quantity),
            countLabel: quantity === 1 ? 'место' : 'мест',
            weight: formatWeight(parseFloat(defaultPackage.weight) * quantity),
            volume: formatVolume((parseFloat(defaultPackage.length) * parseFloat(defaultPackage.width) * parseFloat(defaultPackage.height)) / 1000000 * quantity)
        };
    }

    const { cargo } = props.formData;
    let totalWeight = 0;
    let totalVolume = 0;
    let totalCount = 0;
    let countLabel = 'мест';

    // Process each package from formData, applying defaults if values are missing
    const processedPackages = cargo.packages.map(pkg => {
        const useDefaultDimensions = !(parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0);
        return {
            ...pkg,
            weight: (parseFloat(pkg.weight) > 0) ? parseFloat(pkg.weight) : parseFloat(defaultPackage.weight),
            length: useDefaultDimensions ? parseFloat(defaultPackage.length) : parseFloat(pkg.length),
            width: useDefaultDimensions ? parseFloat(defaultPackage.width) : parseFloat(pkg.width),
            height: useDefaultDimensions ? parseFloat(defaultPackage.height) : parseFloat(pkg.height),
            quantity: parseInt(pkg.quantity) > 0 ? parseInt(pkg.quantity) : 1
        };
    });

    if (cargo.mode === 'individual') {
        totalCount = processedPackages.reduce((sum, pkg) => sum + (pkg.quantity || 1), 0);
        countLabel = totalCount === 1 ? 'место' : 'мест';

        totalWeight = processedPackages.reduce((sum, pkg) => sum + (pkg.weight * pkg.quantity), 0);
        totalVolume = processedPackages.reduce((sum, pkg) => sum + (((pkg.length * pkg.width * pkg.height) / 1000000) * pkg.quantity), 0);
    } else { // 'total' mode, should only have one package
        const totalPackage = processedPackages[0];
        if (totalPackage) {
            totalCount = totalPackage.quantity;
            countLabel = totalPackage.quantity === 1 ? 'место' : 'мест';

            totalWeight = totalPackage.weight * totalPackage.quantity;
            totalVolume = ((totalPackage.length * totalPackage.width * totalPackage.height) / 1000000) * totalPackage.quantity;
        }
    }

    // console.log('DEBUG: Using form data with defaults.', { totalCount, totalWeight, totalVolume });

    return {
        count: formatNumber(totalCount),
        countLabel,
        weight: formatWeight(totalWeight),
        volume: formatVolume(totalVolume)
    };
});

function formatCurrency(value) {
    if (typeof value !== 'number') {
        return '0,00 ₽';
    }
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 2 }).format(value);
}

function formatNumber(value) {
    if (typeof value !== 'number') {
        return '0';
    }
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value);
}

// Новая функция для форматирования веса
function formatWeight(value) {
    if (typeof value !== 'number') {
        return '0';
    }
    return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

// Новая функция для форматирования объема
function formatVolume(value) {
    if (typeof value !== 'number') {
        return '0';
    }
    return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(value);
}

// Вычисляем сообщения о параметрах по умолчанию
const displayMessages = computed(() => {
    const messages = [];
    const { formData, calculatorConfig } = props;

    // console.log('DEBUG: displayMessages - formData.cargo:', formData.cargo);

    const defaultPackage = calculatorConfig.defaultValues?.cargo?.package || {
        length: '30', width: '20', height: '10', weight: '1', description: 'Посылка', declaredValue: 1000, packaging: 'box-s', selfMarking: false, dangerousGoods: false, tempControl: false, quantity: 1
    };

    // console.log('DEBUG: displayMessages - defaultPackage:', defaultPackage);

    // 1. Проверка параметров груза по умолчанию (раздельно для веса и габаритов)
    let cargoWeightProvided = false;
    let cargoDimensionsProvided = false;

    if (formData.cargo && formData.cargo.packages && formData.cargo.packages.length > 0) {
        const firstPackage = formData.cargo.packages[0];
        // console.log('DEBUG: displayMessages - firstPackage:', firstPackage);

        cargoWeightProvided = (firstPackage.weight && parseFloat(firstPackage.weight) > 0);
        cargoDimensionsProvided = (firstPackage.length && parseFloat(firstPackage.length) > 0 &&
            firstPackage.width && parseFloat(firstPackage.width) > 0 &&
            firstPackage.height && parseFloat(firstPackage.height) > 0);
    } else {
        // If no cargo or packages are provided in formData, then neither weight nor dimensions are provided by user
        cargoWeightProvided = false;
        cargoDimensionsProvided = false;
    }

    // console.log('DEBUG: displayMessages - cargoWeightProvided:', cargoWeightProvided);
    // console.log('DEBUG: displayMessages - cargoDimensionsProvided:', cargoDimensionsProvided);

    if (!cargoWeightProvided) {
        const defaultWeight = parseFloat(defaultPackage.weight) * (parseInt(defaultPackage.quantity) || 1);
        messages.push(`Вес груза не указан. Используется значение по умолчанию: ${formatWeight(defaultWeight)} кг.`);
    }

    if (!cargoDimensionsProvided) {
        const defaultVolume = (parseFloat(defaultPackage.length) * parseFloat(defaultPackage.width) * parseFloat(defaultPackage.height)) / 1000000 * (parseInt(defaultPackage.quantity) || 1);
        messages.push(`Габариты груза не указаны. Используются значения по умолчанию: ${defaultPackage.length}x${defaultPackage.width}x${defaultPackage.height} см, Объем ${formatVolume(defaultVolume)} м³.`);
    }

    // 2. Проверка даты отправки по умолчанию
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDepartureDate = tomorrow.toISOString().split('T')[0];
    if (!formData.departure.date || new Date(formData.departure.date).toISOString().split('T')[0] === defaultDepartureDate) {
        messages.push(`Дата отправки не указана. Используется завтрашняя дата: ${formatDate(defaultDepartureDate)}.`);
    }

    // 3. Проверка пункта отправления по умолчанию
    // Убедимся, что formData.departure.location является пустой строкой, а не объектом, который может быть по умолчанию.
    // Поле location может быть объектом { id: ..., name: ..., coordinates: ... } если выбран терминал.
    // Если это просто город, то location будет пустой строкой, и тогда мы считаем, что терминал по умолчанию.
    const isDepartureLocationProvided = formData.departure.location &&
        (typeof formData.departure.location === 'object' ? !!formData.departure.location.id : formData.departure.location.trim() !== '');
    if (!isDepartureLocationProvided) {
        messages.push(`Пункт отправления не указан. Используется терминал по умолчанию в городе ${formData.direction.from || 'отправления'}.`);
    }

    // 4. Проверка пункта назначения по умолчанию
    const isDestinationLocationProvided = formData.destination.location &&
        (typeof formData.destination.location === 'object' ? !!formData.destination.location.id : formData.destination.location.trim() !== '');
    if (!isDestinationLocationProvided) {
        messages.push(`Пункт назначения не указан. Используется терминал по умолчанию в городе ${formData.direction.to || 'назначения'}.`);
    }

    // console.log('DEBUG: displayMessages - final messages:', messages);
    return messages;
});

// Функция для получения базовой стоимости до применения коэффициентов
function getBaseCostBeforeMultipliers() {
    if (!props.result || !props.result.selectedTariff || !props.result.selectedTariff.summary) {
        return 0;
    }
    const { baseCost, multiplier } = props.result.selectedTariff.summary;
    return baseCost / (multiplier || 1);
}

// Функция для категоризации деталей расчета
const categorizedDetails = computed(() => {
    if (!props.result || !props.result.selectedTariff || !props.result.selectedTariff.details) {
        return [];
    }

    const details = props.result.selectedTariff.details;
    const categories = {
        'Базовый': { category: 'Базовый тариф', items: [] },
        'Расстояние': { category: 'Расстояние', items: [] },
        'Наценка': { category: 'Наценки и коэффициенты', items: [] },
        'Скидка': { category: 'Скидки', items: [] },
        'Услуги': { category: 'Дополнительные услуги', items: [] },
        'Упаковка': { category: 'Упаковка', items: [] }
    };

    details.forEach(item => {
        if (item.name.includes('По весу') || item.name.includes('По объему')) {
            categories['Базовый'].items.push(item);
        } else if (item.name.includes('Расстояние')) {
            categories['Расстояние'].items.push(item);
        } else if (item.name.includes('Наценка') || item.name.includes('опасный') || item.name.includes('температур') || item.name.includes('адрес')) {
            categories['Наценка'].items.push(item);
        } else if (item.cost < 0) {
            categories['Скидка'].items.push(item);
        } else if (item.name.includes('Коробка') || item.name.includes('Паллет') || item.name.includes('упаков')) {
            categories['Упаковка'].items.push(item);
        } else {
            categories['Услуги'].items.push(item);
        }
    });

    return Object.values(categories).filter(cat => cat.items.length > 0);
});

// Добавляем вспомогательную функцию для форматирования даты
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

// Состояние для раскрытия спойлера сообщений о параметрах по умолчанию
const isMessagesSpoilerExpanded = ref(false);

function toggleMessagesSpoiler() {
    isMessagesSpoilerExpanded.value = !isMessagesSpoilerExpanded.value;
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>