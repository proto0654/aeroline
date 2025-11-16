<template>
    <section class="card bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-h4 font-bold mb-4">{{ title }}</h2>

        <!-- Предупреждение для пункта назначения при отсутствии терминалов -->
        <div v-if="!hasTerminals && namePrefix === 'destination'" class="mb-4 text-sm text-gray-600">
            ЕСЛИ ПОЛУЧИТЬ НА ТЕРМИНАЛЕ - НЕДОСТУПНО
        </div>

        <!-- Переключатель режима -->
        <div class="flex border border-gray-200 rounded-lg p-1 mb-4">
            <button v-if="hasTerminals" @click.prevent="deliveryMode = 'terminal'"
                :class="['flex-1 py-2 px-4 rounded-md text-sm', deliveryMode === 'terminal' ? 'bg-brand-blue text-white shadow' : 'text-gray-600']">
                {{ terminalLabel }}
            </button>
            <button @click.prevent="deliveryMode = 'address'"
                :class="['flex-1 py-2 px-4 rounded-md text-sm', deliveryMode === 'address' ? 'bg-brand-blue text-white shadow' : 'text-gray-600']">
                {{ addressLabel }}
            </button>
        </div>

        <!-- Поля ввода -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Режим терминала -->
            <template v-if="deliveryMode === 'terminal' && hasTerminals">
                <div class="md:col-span-2">
                    <AutocompleteInput ref="terminalInputRef" :name="`${namePrefix}_terminal_address`" label="Адрес терминала"
                        :items="terminalOptions" :disabled="!city"
                        :placeholder="city ? 'Выберите терминал' : 'Сначала выберите город'" v-model="location"
                        :emitFullItem="true" @itemSelected="onTerminalSelected" :showResetButton="true"
                        @reset="onTerminalReset" 
                        :itemFormatter="formatPVZName" 
                        :selectedValueFormatter="formatPVZName" />
                </div>
                <!-- Дата сдачи груза для пункта отправки в режиме терминала -->
                <div v-if="namePrefix === 'departure'" class="md:col-span-2">
                    <label class="block text-brand-gray font-medium mb-2">
                        Дата сдачи груза
                    </label>
                    <DatePickerVue :name="`${namePrefix}_date`" :initial-date="date" :disabled="!city"
                        placeholder="Выберите дату" @update:date="onDateChange" />
                </div>
            </template>

            <!-- Режим адреса -->
            <template v-if="deliveryMode === 'address'">
                <!-- Улица -->
                <div class="md:col-span-2">
                    <AutocompleteInput 
                        ref="streetInputRef"
                        :name="`${namePrefix}_street`" 
                        label="Улица" 
                        placeholder="Укажите улицу"
                        :disabled="!city" 
                        v-model="state.address.street" 
                        :items="streetOptions"
                        :useApiSearch="true"
                        :apiSearchFunction="searchStreetsFunction"
                        :emitFullItem="true"
                        :itemFormatter="formatStreetName"
                        :selectedValueFormatter="formatStreetSelected"
                        @itemSelected="onStreetSelected"
                        @update:modelValue="onStreetInputChange"
                        :showResetButton="true"
                        @reset="onStreetReset" />
                </div>

                <!-- Дом, Строение, Офис/кв. -->
                <div class="md:col-span-2 grid grid-cols-3 gap-4">
                    <div>
                        <AutocompleteInput 
                            ref="houseInputRef"
                            :name="`${namePrefix}_house`" 
                            label="Дом" 
                            placeholder="Дом"
                            :disabled="!city || !state.address.street" 
                            v-model="state.address.house" 
                            :items="houseOptions"
                            :useApiSearch="true"
                            :apiSearchFunction="searchHousesFunction"
                            :emitFullItem="true"
                            :itemFormatter="formatHouseName"
                            :selectedValueFormatter="formatHouseSelected"
                            @itemSelected="onHouseSelected"
                            @update:modelValue="onHouseInputChange"
                            :showResetButton="true"
                            @reset="onHouseReset" />
                    </div>
                    <div>
                        <TextInput :name="`${namePrefix}_building`" label="Строение" placeholder="Строение"
                            :disabled="!city || !state.address.house" v-model="state.address.building" @update:modelValue="onAddressFieldChange" />
                    </div>
                    <div>
                        <TextInput :name="`${namePrefix}_office`" label="Офис/кв." placeholder="Офис/кв."
                            :disabled="!city || !state.address.house" v-model="state.address.office" @update:modelValue="onAddressFieldChange" />
                    </div>
                </div>

                <!-- Примечания к адресу -->
                <div class="md:col-span-2">
                    <TextareaInput :name="`${namePrefix}_notes`" label="Примечания к адресу" placeholder="Укажите примечания"
                        :disabled="!city" v-model="state.address.notes" @update:modelValue="onAddressFieldChange" />
                </div>

                <!-- Дата сдачи груза -->
                <div class="md:col-span-2">
                    <label class="block text-brand-gray font-medium mb-2">
                        Дата сдачи груза
                    </label>
                    <DatePickerVue :name="`${namePrefix}_date`" :initial-date="date" :disabled="!city"
                        placeholder="Выберите дату" @update:date="onDateChange" />
                </div>

                <!-- Интервал (скрывается при фиксированной дате и времени) -->
                <div v-if="!state.address.fixedDateTime" class="md:col-span-2">
                    <SelectInput :name="`${namePrefix}_interval`" label="Интервал" 
                        :options="intervalOptions" :disabled="!city"
                        v-model="state.address.interval" @update:modelValue="onAddressFieldChange" />
                </div>

                <!-- Фиксированная дата и время (для забора и доставки) -->
                <div class="md:col-span-2 flex items-center gap-2">
                    <CheckboxInput :name="`${namePrefix}_fixed_datetime`" label="Фиксированная дата и время"
                        v-model="state.address.fixedDateTime" @update:modelValue="onAddressFieldChange" />
                    <span class="tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center" 
                          data-tip="При выборе этой опции доставка будет выполнена строго в указанную дату и время. Дополнительная плата может быть применена за фиксированное время доставки.">
                        <span class="inline-flex items-center justify-center w-5 h-5 
                                     text-sm border border-gray-400 rounded-full 
                                     text-gray-600 hover:bg-gray-100">?</span>
                    </span>
                </div>

                <!-- Поле выбора времени при фиксированной дате и времени -->
                <div v-if="state.address.fixedDateTime" class="md:col-span-2">
                    <SelectInput :name="`${namePrefix}_fixed_time`" 
                        :label="namePrefix === 'departure' ? 'Время забора' : 'Время доставки'"
                        :options="timeOptions" :disabled="!city"
                        v-model="state.address.fixedTime" @update:modelValue="onAddressFieldChange" />
                </div>

                <!-- Чекбоксы для пункта назначения -->
                <template v-if="namePrefix === 'destination'">
                    <div class="md:col-span-2">
                        <CheckboxInput :name="`${namePrefix}_retail_chains`" label="Доставка в торговые сети"
                            v-model="state.address.retailChains" @update:modelValue="onAddressFieldChange" />
                    </div>
                </template>

                <!-- Погрузо-разгрузочные работы -->
                <div class="md:col-span-2 border border-gray-200 rounded-lg p-4 space-y-3">
                    <CheckboxInput :name="`${namePrefix}_loading_unloading`" label="Погрузо-разгрузочные работы"
                        v-model="state.address.loadingUnloading" @update:modelValue="onAddressFieldChange" />

                    <!-- Поля погрузо-разгрузочных работ (отображаются при включенном чекбоксе) -->
                    <template v-if="state.address.loadingUnloading">
                        <TextInput :name="`${namePrefix}_floor`" label="Этаж" placeholder="Укажите этаж"
                            :disabled="!city" v-model="state.address.floor" @update:modelValue="onAddressFieldChange" />
                        <CheckboxInput :name="`${namePrefix}_no_elevator`" label="Нет лифта"
                            v-model="state.address.noElevator" @update:modelValue="onAddressFieldChange" />
                        <CheckboxInput v-if="namePrefix === 'destination'" :name="`${namePrefix}_unpacking`" label="Разбор упаковки"
                            v-model="state.address.unpacking" @update:modelValue="onAddressFieldChange" />
                    </template>
                </div>
            </template>
        </div>

    </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import TextInput from '../../forms/TextInput.vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';
import DatePickerVue from '../../DatePickerVue.vue';
import SelectInput from '../../forms/SelectInput.vue';
import CheckboxInput from '../../forms/CheckboxInput.vue';
import TextareaInput from '../../forms/TextareaInput.vue';
import { formatPVZName, formatPVZHTML, getPVZKey } from '../../../utils/pvzFormatter.js';
import apiService from '../../../services/apiService.js';

const props = defineProps({
    title: { type: String, required: true },
    terminalLabel: { type: String, required: true },
    addressLabel: { type: String, required: true },
    city: { type: String, required: true },
    billingAddresses: { type: Array, required: true },
    modelValue: { type: Object, required: true },
    namePrefix: { type: String, required: true } // e.g., 'departure' or 'destination'
});

const emit = defineEmits(['update:modelValue']);

// Флаг для предотвращения циклических обновлений
let isUpdatingFromParent = false;

// Refs для полей ввода
const terminalInputRef = ref(null);
const addressInputRef = ref(null);
const streetInputRef = ref(null);
const houseInputRef = ref(null);

// Local state for non-location fields
const deliveryMode = ref(props.modelValue.deliveryMode || 'terminal');
const date = ref(props.modelValue.date || '');

// Единое состояние для обоих режимов
const state = ref({
    // Данные для режима терминала
    terminal: {
        searchText: '',      // Текст поиска в поле ввода
        selectedPVZ: null,   // Выбранный ПВЗ объект
        displayText: ''      // Отображаемый текст (отформатированное имя ПВЗ)
    },
    // Данные для режима адреса
    address: {
        street: '',          // Улица
        house: '',           // Дом
        building: '',         // Строение
        office: '',          // Офис/кв.
        notes: '',           // Примечания к адресу
        interval: '08:00-12:00', // Интервал
        loadingUnloading: false, // Погрузо-разгрузочные работы
        floor: '',           // Этаж
        noElevator: false,   // Нет лифта
        unpacking: false,    // Разбор упаковки (только для пункта назначения)
        retailChains: false, // Доставка в торговые сети (только для пункта назначения)
        fixedDateTime: false, // Фиксированная дата и время (для забора и доставки)
        fixedTime: ''        // Время при фиксированной дате (шаг в полчаса)
    }
});

// Computed property to handle the location field for AutocompleteInput (только для терминала)
const location = computed({
    get() {
        // Используется только для режима терминала
        if (deliveryMode.value === 'terminal') {
            return state.value.terminal.displayText || state.value.terminal.searchText || '';
        }
        return '';
    },
    set(newValue) {
        if (isUpdatingFromParent) return;
        
        // Используется только для режима терминала
        if (deliveryMode.value === 'terminal') {
            state.value.terminal.searchText = newValue;
            // Если пользователь вводит текст, сбрасываем выбранный ПВЗ
            if (newValue && !state.value.terminal.selectedPVZ) {
                state.value.terminal.selectedPVZ = null;
                state.value.terminal.displayText = '';
            }
            emitCurrentState();
        }
    }
});

// Функция для отправки текущего состояния родительскому компоненту
function emitCurrentState() {
    let currentLocation;
    
    if (deliveryMode.value === 'terminal') {
        // Для терминала возвращаем выбранный ПВЗ объект или строку поиска
        currentLocation = state.value.terminal.selectedPVZ || state.value.terminal.searchText;
    } else {
        // Для адреса возвращаем объект с полями адреса
        currentLocation = {
            street: state.value.address.street,
            house: state.value.address.house,
            building: state.value.address.building,
            office: state.value.address.office,
            notes: state.value.address.notes,
            interval: state.value.address.interval,
            loadingUnloading: state.value.address.loadingUnloading,
            floor: state.value.address.floor,
            noElevator: state.value.address.noElevator,
            unpacking: state.value.address.unpacking,
            retailChains: state.value.address.retailChains,
            fixedDateTime: state.value.address.fixedDateTime,
            fixedTime: state.value.address.fixedTime
        };
    }
    
    console.log('DeliveryPointForm: Отправка состояния', {
        deliveryMode: deliveryMode.value,
        currentLocation,
        state: state.value
    });
    
    emit('update:modelValue', {
        ...props.modelValue,
        deliveryMode: deliveryMode.value,
        location: currentLocation,
        date: date.value
    });
}

// Функция для инициализации состояния из props
function initializeState() {
    const modelValue = props.modelValue;
    
    console.log('DeliveryPointForm: Инициализация состояния', {
        modelValue,
        deliveryMode: modelValue.deliveryMode,
        location: modelValue.location,
        locationType: typeof modelValue.location
    });
    
    // Инициализируем режим доставки
    // Если терминалов нет, принудительно устанавливаем режим адреса
    if (!hasTerminals.value) {
        deliveryMode.value = 'address';
    } else {
        deliveryMode.value = modelValue.deliveryMode || 'terminal';
    }
    date.value = modelValue.date || '';
    
    // Инициализируем состояние в зависимости от типа location
    if (modelValue.location && typeof modelValue.location === 'object') {
        // Проверяем, это ПВЗ объект или объект адреса
        if (modelValue.location.street && modelValue.location.phone && !modelValue.location.house) {
            // Это ПВЗ объект - инициализируем терминал
            state.value.terminal.selectedPVZ = modelValue.location;
            state.value.terminal.displayText = formatPVZName(modelValue.location);
            state.value.terminal.searchText = '';
            console.log('DeliveryPointForm: Инициализирован ПВЗ', state.value.terminal);
        } else if (modelValue.location.street !== undefined || modelValue.location.house !== undefined) {
            // Это объект адреса - инициализируем поля адреса
            state.value.address.street = modelValue.location.street || '';
            state.value.address.house = modelValue.location.house || '';
            state.value.address.building = modelValue.location.building || '';
            state.value.address.office = modelValue.location.office || '';
            state.value.address.notes = modelValue.location.notes || '';
            state.value.address.interval = modelValue.location.interval || '08:00-12:00';
            state.value.address.loadingUnloading = modelValue.location.loadingUnloading || false;
            state.value.address.floor = modelValue.location.floor || '';
            state.value.address.noElevator = modelValue.location.noElevator || false;
            state.value.address.unpacking = modelValue.location.unpacking || false;
            state.value.address.retailChains = modelValue.location.retailChains || false;
            state.value.address.fixedDateTime = modelValue.location.fixedDateTime || false;
            state.value.address.fixedTime = modelValue.location.fixedTime || '';
            console.log('DeliveryPointForm: Инициализирован адрес (объект)', state.value.address);
        }
    } else if (typeof modelValue.location === 'string' && modelValue.location.trim()) {
        // Это строка - инициализируем соответствующий режим
        if (deliveryMode.value === 'terminal') {
            state.value.terminal.searchText = modelValue.location;
            state.value.terminal.displayText = '';
            state.value.terminal.selectedPVZ = null;
            console.log('DeliveryPointForm: Инициализирован терминал (строка)', state.value.terminal);
        } else {
            // Для обратной совместимости: если пришла строка в режиме адреса, сохраняем в поле street
            state.value.address.street = modelValue.location;
            console.log('DeliveryPointForm: Инициализирован адрес (строка)', state.value.address);
        }
    }
}

// Filter terminals based on the selected city
const terminalOptions = computed(() => {
    if (!props.city) return [];
    
    const filtered = props.billingAddresses.filter(addr => {
        // Check if locality object exists and name matches
        if (addr.locality && typeof addr.locality === 'object') {
            return addr.locality.name === props.city;
        }
        // Fallback for old structure
        return addr.locality === props.city;
    });
    
    
    return filtered;
});

// Проверка наличия терминалов в городе
const hasTerminals = computed(() => {
    return terminalOptions.value.length > 0;
});


// Опции для интервалов (по несколько часов в рабочие часы 8:00-22:00)
const intervalOptions = [
    { value: '08:00-12:00', label: '08:00-12:00' },
    { value: '12:00-16:00', label: '12:00-16:00' },
    { value: '16:00-20:00', label: '16:00-20:00' },
    { value: '20:00-22:00', label: '20:00-22:00' }
];

// Опции для выбора времени с шагом в полчаса (8:00-22:00)
const timeOptions = [];
for (let hour = 8; hour <= 22; hour++) {
    timeOptions.push({ value: `${hour.toString().padStart(2, '0')}:00`, label: `${hour.toString().padStart(2, '0')}:00` });
    if (hour < 22) {
        timeOptions.push({ value: `${hour.toString().padStart(2, '0')}:30`, label: `${hour.toString().padStart(2, '0')}:30` });
    }
}

// Опции для автокомплита адресов
const streetOptions = ref([]);
const houseOptions = ref([]);

// Функции поиска для автокомплита (реактивные через computed)
// Используем computed для создания функций, которые всегда используют актуальные значения
const searchStreetsFunction = computed(() => {
    return async (query) => {
        // Всегда используем текущий город из props (реактивно)
        const currentCity = props.city;
        if (!currentCity) {
            streetOptions.value = [];
            return [];
        }
        try {
            const results = await apiService.searchStreets(currentCity, query);
            // Проверяем, что город не изменился во время запроса
            if (props.city === currentCity) {
                streetOptions.value = results;
                return results;
            } else {
                // Город изменился, возвращаем пустой массив
                streetOptions.value = [];
                return [];
            }
        } catch (error) {
            console.error('Ошибка при поиске улиц:', error);
            streetOptions.value = [];
            return [];
        }
    };
});

const searchHousesFunction = computed(() => {
    return async (query) => {
        // Всегда используем текущие значения из props и state (реактивно)
        const currentCity = props.city;
        const currentStreet = state.value.address.street;
        
        if (!currentCity || !currentStreet) {
            houseOptions.value = [];
            return [];
        }
        try {
            const results = await apiService.searchHouses(currentCity, currentStreet, query);
            // Проверяем, что город и улица не изменились во время запроса
            if (props.city === currentCity && state.value.address.street === currentStreet) {
                houseOptions.value = results;
                return results;
            } else {
                // Город или улица изменились, возвращаем пустой массив
                houseOptions.value = [];
                return [];
            }
        } catch (error) {
            console.error('Ошибка при поиске домов:', error);
            houseOptions.value = [];
            return [];
        }
    };
});

// Обработчики выбора улицы
function onStreetSelected(item) {
    if (isUpdatingFromParent) return;
    
    // Сохраняем выбранную улицу
    const streetName = item.name || item.street || '';
    state.value.address.street = streetName;
    
    // Очищаем зависимые поля
    state.value.address.house = '';
    state.value.address.building = '';
    state.value.address.office = '';
    
    // Очищаем поле дома в автокомплите
    if (houseInputRef.value && houseInputRef.value.setInputValue) {
        houseInputRef.value.setInputValue('');
    }
    
    emitCurrentState();
}

function onStreetInputChange(value) {
    if (isUpdatingFromParent) return;
    
    // Обновляем значение улицы
    state.value.address.street = value || '';
    
    // Если пользователь очистил поле улицы, очищаем зависимые поля
    if (!value || !value.trim()) {
        state.value.address.house = '';
        state.value.address.building = '';
        state.value.address.office = '';
        
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
            houseInputRef.value.setInputValue('');
        }
    }
    
    emitCurrentState();
}

function onStreetReset() {
    if (isUpdatingFromParent) return;
    
    state.value.address.street = '';
    state.value.address.house = '';
    state.value.address.building = '';
    state.value.address.office = '';
    
    if (houseInputRef.value && houseInputRef.value.setInputValue) {
        houseInputRef.value.setInputValue('');
    }
    
    emitCurrentState();
}

// Обработчики выбора дома
function onHouseSelected(item) {
    if (isUpdatingFromParent) return;
    
    // Сохраняем выбранный дом
    const houseName = item.name || item.houseNumber || '';
    state.value.address.house = houseName;
    
    // Очищаем зависимые поля
    state.value.address.building = '';
    state.value.address.office = '';
    
    emitCurrentState();
}

function onHouseInputChange(value) {
    if (isUpdatingFromParent) return;
    
    // Обновляем значение дома
    state.value.address.house = value || '';
    
    // Если пользователь очистил поле дома, очищаем зависимые поля
    if (!value || !value.trim()) {
        state.value.address.building = '';
        state.value.address.office = '';
    }
    
    emitCurrentState();
}

function onHouseReset() {
    if (isUpdatingFromParent) return;
    
    state.value.address.house = '';
    state.value.address.building = '';
    state.value.address.office = '';
    
    emitCurrentState();
}

// Форматирование для отображения улиц
function formatStreetName(item) {
    return item.name || item.street || '';
}

function formatStreetSelected(item) {
    return item.name || item.street || '';
}

// Форматирование для отображения домов
function formatHouseName(item) {
    return item.name || item.houseNumber || '';
}

function formatHouseSelected(item) {
    return item.name || item.houseNumber || '';
}

// Обработчик изменения полей адреса
function onAddressFieldChange() {
    if (isUpdatingFromParent) return;
    emitCurrentState();
}

// Watch для фиксированной даты и времени - сбрасываем время при снятии чекбокса
watch(() => state.value.address.fixedDateTime, (newValue) => {
    if (isUpdatingFromParent) return;
    if (!newValue) {
        state.value.address.fixedTime = '';
    }
    emitCurrentState();
});

// Watch для погрузо-разгрузочных работ - очищаем поля при снятии чекбокса
watch(() => state.value.address.loadingUnloading, (newValue) => {
    if (isUpdatingFromParent) return;
    if (!newValue) {
        state.value.address.floor = '';
        state.value.address.noElevator = false;
        state.value.address.unpacking = false;
    }
    emitCurrentState();
});


// Handler for when a user selects an address from Autocomplete
function onTerminalSelected(address) {
    if (isUpdatingFromParent) return;
    
    // Сохраняем выбранный ПВЗ в состоянии терминала
    state.value.terminal.selectedPVZ = address;
    state.value.terminal.displayText = formatPVZName(address);
    state.value.terminal.searchText = '';
    
    console.log('DeliveryPointForm: Выбран ПВЗ', state.value.terminal);
    
    // Отправляем обновленное состояние
    emitCurrentState();
}

// Handler for reset button in AutocompleteInput
function onTerminalReset() {
    if (isUpdatingFromParent) return;
    
    // Очищаем состояние терминала
    state.value.terminal.selectedPVZ = null;
    state.value.terminal.displayText = '';
    state.value.terminal.searchText = '';
    
    console.log('DeliveryPointForm: Сброшен ПВЗ', state.value.terminal);
    
    // Отправляем обновленное состояние
    emitCurrentState();
}

// Handler for date change from DatePickerVue
function onDateChange(newDate) {
    if (isUpdatingFromParent) return;
    date.value = newDate;
    emitCurrentState();
}

// When city changes, handle PVZ selection based on new city
watch(() => props.city, (newCity, oldCity) => {
    if (isUpdatingFromParent) return;
    
    // Если город не изменился, ничего не делаем
    if (newCity === oldCity) return;
    
    console.log('DeliveryPointForm: Изменение города', { newCity, oldCity, deliveryMode: deliveryMode.value });
    
    // Очищаем данные автокомплита при смене города
    streetOptions.value = [];
    houseOptions.value = [];
    
    // Очищаем поля адреса при смене города (всегда, независимо от режима)
    state.value.address.street = '';
    state.value.address.house = '';
    state.value.address.building = '';
    state.value.address.office = '';
    
    // Очищаем поля автокомплита через методы компонентов
    nextTick(() => {
        if (streetInputRef.value && streetInputRef.value.setInputValue) {
            streetInputRef.value.setInputValue('');
        }
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
            houseInputRef.value.setInputValue('');
        }
    });
    
    // Если терминалов нет в новом городе, переключаем на режим адреса
    if (newCity && !hasTerminals.value && deliveryMode.value === 'terminal') {
        deliveryMode.value = 'address';
        state.value.terminal.selectedPVZ = null;
        state.value.terminal.displayText = '';
        state.value.terminal.searchText = '';
        emitCurrentState();
        return;
    }
    
    // Если выбран город и режим "терминал"
    if (newCity && deliveryMode.value === 'terminal' && terminalOptions.value.length > 0) {
        // Проверяем, принадлежит ли текущий выбранный ПВЗ новому городу
        const currentPVZ = state.value.terminal.selectedPVZ;
        let shouldKeepCurrentPVZ = false;
        
        if (currentPVZ && typeof currentPVZ === 'object' && currentPVZ.type) {
            // Проверяем, есть ли текущий ПВЗ в списке доступных для нового города
            shouldKeepCurrentPVZ = terminalOptions.value.some(pvz => pvz.id === currentPVZ.id);
        }
        
        if (shouldKeepCurrentPVZ) {
            // Текущий ПВЗ принадлежит новому городу - оставляем его
            return;
        } else {
            // Текущий ПВЗ не принадлежит новому городу - очищаем выбор
            state.value.terminal.selectedPVZ = null;
            state.value.terminal.displayText = '';
            state.value.terminal.searchText = '';
            emitCurrentState();
            return;
        }
    }
    
    // Если режим "терминал" и нет доступных ПВЗ, очищаем состояние терминала
    if (deliveryMode.value === 'terminal') {
        state.value.terminal.selectedPVZ = null;
        state.value.terminal.displayText = '';
        state.value.terminal.searchText = '';
    }
    
    emitCurrentState();
});

// Watch для очистки поля дома при изменении улицы
watch(() => state.value.address.street, (newStreet, oldStreet) => {
    if (isUpdatingFromParent) return;
    
    // Если улица изменилась (не просто очистилась), очищаем поле дома
    if (oldStreet !== undefined && newStreet !== oldStreet && newStreet !== '') {
        // Улица изменилась на новую - очищаем дом
        state.value.address.house = '';
        state.value.address.building = '';
        state.value.address.office = '';
        
        // Очищаем поле дома в автокомплите
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
            houseInputRef.value.setInputValue('');
        }
        
        // Очищаем результаты поиска домов
        houseOptions.value = [];
    } else if (newStreet === '' || !newStreet) {
        // Улица очищена - очищаем все зависимые поля
        state.value.address.house = '';
        state.value.address.building = '';
        state.value.address.office = '';
        
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
            houseInputRef.value.setInputValue('');
        }
        
        houseOptions.value = [];
    }
});

// Watch for local changes (mode and date) and emit update to parent
watch([deliveryMode, date], () => {
    if (isUpdatingFromParent) return;
    emitCurrentState();
});

// Watch for delivery mode changes to handle PVZ auto-selection
watch(deliveryMode, (newMode, oldMode) => {
    if (isUpdatingFromParent) return;
    
    console.log('DeliveryPointForm: Переключение режима', {
        newMode,
        oldMode,
        state: state.value,
        hasTerminals: hasTerminals.value
    });
    
    // Запрещаем переключение на режим терминала, если терминалов нет
    if (newMode === 'terminal' && !hasTerminals.value) {
        console.log('DeliveryPointForm: Переключение на терминал запрещено - терминалов нет');
        deliveryMode.value = 'address';
        return;
    }
    
    // Если переключились на режим "терминал"
    if (newMode === 'terminal' && props.city && terminalOptions.value.length > 0) {
        // Проверяем, есть ли уже выбранный ПВЗ в состоянии терминала
        if (state.value.terminal.selectedPVZ) {
            // Восстанавливаем сохраненный ПВЗ
            console.log('DeliveryPointForm: Восстанавливаем сохраненный ПВЗ', state.value.terminal.selectedPVZ);
            return;
        } else if (state.value.terminal.searchText) {
            // Есть сохраненная строка поиска
            console.log('DeliveryPointForm: Восстанавливаем сохраненную строку поиска', state.value.terminal.searchText);
            return;
        } else {
            // Нет сохраненного ПВЗ - оставляем поле пустым для выбора пользователем
            console.log('DeliveryPointForm: Нет сохраненного ПВЗ, оставляем поле пустым');
        }
    }
    
    // Если переключились на режим "адрес"
    if (newMode === 'address') {
        console.log('DeliveryPointForm: Переключились на адрес, текущее состояние адреса:', state.value.address);
    }
    
    // Принудительно обновляем отображение после переключения режима
    nextTick(() => {
        console.log('DeliveryPointForm: Принудительное обновление отображения после переключения режима', {
            deliveryMode: deliveryMode.value,
            locationValue: location.value,
            state: state.value
        });
        
        // Принудительно обновляем значение в поле
        if (newMode === 'terminal' && terminalInputRef.value) {
            const terminalValue = state.value.terminal.displayText || state.value.terminal.searchText || '';
            console.log('DeliveryPointForm: Принудительно устанавливаем значение терминала:', terminalValue);
            // Принудительно обновляем значение в AutocompleteInput
            if (terminalInputRef.value.setInputValue) {
                terminalInputRef.value.setInputValue(terminalValue);
            }
        }
    });
    
    // При переключении режимов состояние уже разделено, просто отправляем текущее состояние
    emitCurrentState();
});

// Watch for parent changes and update local state
watch(() => props.modelValue, (newValue) => {
    if (isUpdatingFromParent) return;

    isUpdatingFromParent = true;

    console.log('DeliveryPointForm: Получено обновление от родителя', {
        newValue,
        currentDeliveryMode: deliveryMode.value,
        newDeliveryMode: newValue.deliveryMode
    });

    // Обновляем режим доставки
    const newDeliveryMode = newValue.deliveryMode || 'terminal';
    deliveryMode.value = newDeliveryMode;
    date.value = newValue.date || '';

    // Если передан полный объект location (ПВЗ), обновляем состояние терминала
    if (newValue.location && typeof newValue.location === 'object' && newValue.location.street && newValue.location.phone) {
        state.value.terminal.selectedPVZ = newValue.location;
        state.value.terminal.displayText = formatPVZName(newValue.location);
        state.value.terminal.searchText = '';
        console.log('DeliveryPointForm: Обновлен ПВЗ', state.value.terminal);
    } else if (typeof newValue.location === 'object' && newValue.location !== null) {
        // Если это объект адреса (новая структура)
        if (newValue.location.street !== undefined || newValue.location.house !== undefined) {
            state.value.address.street = newValue.location.street || '';
            state.value.address.house = newValue.location.house || '';
            state.value.address.building = newValue.location.building || '';
            state.value.address.office = newValue.location.office || '';
            state.value.address.notes = newValue.location.notes || '';
            state.value.address.interval = newValue.location.interval || '08:00-12:00';
            state.value.address.loadingUnloading = newValue.location.loadingUnloading || false;
            state.value.address.floor = newValue.location.floor || '';
            state.value.address.noElevator = newValue.location.noElevator || false;
            state.value.address.unpacking = newValue.location.unpacking || false;
            state.value.address.retailChains = newValue.location.retailChains || false;
            state.value.address.fixedDateTime = newValue.location.fixedDateTime || false;
            state.value.address.fixedTime = newValue.location.fixedTime || '';
            console.log('DeliveryPointForm: Обновлен адрес (объект)', state.value.address);
        }
    } else if (typeof newValue.location === 'string') {
        // Если это строка, обновляем соответствующее состояние в зависимости от режима
        if (newDeliveryMode === 'terminal') {
            state.value.terminal.searchText = newValue.location;
            state.value.terminal.displayText = '';
            if (!newValue.location.trim()) {
                state.value.terminal.selectedPVZ = null;
            }
            console.log('DeliveryPointForm: Обновлен терминал (строка)', state.value.terminal);
        } else {
            // Для обратной совместимости: сохраняем строку в поле street
            state.value.address.street = newValue.location;
            console.log('DeliveryPointForm: Обновлен адрес (строка)', state.value.address);
        }
    } else if (!newValue.location) {
        // Очищаем состояние только если location полностью пустое
        if (newDeliveryMode === 'terminal') {
            state.value.terminal.selectedPVZ = null;
            state.value.terminal.displayText = '';
            state.value.terminal.searchText = '';
        } else {
            // Очищаем все поля адреса
            state.value.address.street = '';
            state.value.address.house = '';
            state.value.address.building = '';
            state.value.address.office = '';
            state.value.address.notes = '';
            state.value.address.loadingUnloading = false;
            state.value.address.floor = '';
            state.value.address.noElevator = false;
            state.value.address.unpacking = false;
            state.value.address.retailChains = false;
            state.value.address.fixedDateTime = false;
            state.value.address.fixedTime = '';
        }
        console.log('DeliveryPointForm: Очищено состояние для режима', newDeliveryMode);
    }

    // Используем setTimeout, чтобы убедиться, что все обновления завершены
    setTimeout(() => {
        isUpdatingFromParent = false;
    }, 0);
}, { deep: true });

// Инициализируем состояние при монтировании компонента
onMounted(() => {
    initializeState();
});
</script>