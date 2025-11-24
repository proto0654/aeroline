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
                <!-- Форма запроса улицы (если нет ни доступных улиц, ни записи для всего города) -->
                <div v-if="!hasAvailableStreets && !hasCityWideCoverage" class="md:col-span-2 mb-4">
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p class="text-sm text-yellow-800 mb-4">
                            Для выбранного города нет доступных улиц в системе. Заполните форму ниже, и наш менеджер свяжется с вами для уточнения деталей.
                        </p>
                        <ManagerRequestForm
                            :compact="true"
                            :show-street-field="true"
                            :prefill-region="currentRegion"
                            :prefill-locality="currentCityName"
                            :prefill-street="state.address.street"
                            :regions="availableRegions"
                            :localities="availableCities"
                            @submit="handleStreetRequestSubmit" />
                    </div>
                </div>

                <!-- Поле ввода улицы (показывается если есть доступные улицы ИЛИ есть запись для всего города) -->
                <div v-if="hasAvailableStreets || hasCityWideCoverage" class="md:col-span-2">
                    <!-- Автокомплит с выпадающим списком (если есть доступные улицы) -->
                    <AutocompleteInput 
                        v-if="hasAvailableStreets"
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
                    
                    <!-- Обычное текстовое поле (если нет доступных улиц, но есть запись для всего города) -->
                    <TextInput 
                        v-else-if="hasCityWideCoverage"
                        :name="`${namePrefix}_street`" 
                        label="Улица" 
                        placeholder="Укажите улицу"
                        :disabled="!city" 
                        v-model="state.address.street" 
                        @update:modelValue="onStreetInputChange" />
                    
                    <!-- Форма запроса улицы (показывается динамически, если введенная улица не найдена и нет записи для всего города) -->
                    <div v-if="streetNotFound && state.address.street && state.address.street.trim() && !hasCityWideCoverage" class="mt-4">
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p class="text-sm text-yellow-800 mb-4">
                                Введенная улица не найдена в системе. Заполните форму ниже, и наш менеджер свяжется с вами для уточнения деталей.
                            </p>
                            <ManagerRequestForm
                                :compact="true"
                                :show-street-field="true"
                                :prefill-region="currentRegion"
                                :prefill-locality="currentCityName"
                                :prefill-street="state.address.street"
                                :regions="availableRegions"
                                :localities="availableCities"
                                @submit="handleStreetRequestSubmit" />
                        </div>
                    </div>
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
import { formatSelectedLocalityName } from '../../../utils/localityFormatter.js';
import apiService from '../../../services/apiService.js';
import ManagerRequestForm from './ManagerRequestForm.vue';

const props = defineProps({
    title: { type: String, required: true },
    terminalLabel: { type: String, required: true },
    addressLabel: { type: String, required: true },
    city: { type: String, required: true },
    locality: { type: Object, default: null }, // Объект locality для точного сравнения
    localities: { type: Array, default: () => [] }, // Массив всех localities для поиска по ID
    billingAddresses: { type: Array, required: true },
    terminals: { type: Array, default: () => [] },
    takeDelivers: { type: Array, default: () => [] },
    transportTypes: { type: Array, default: () => [] },
    modelValue: { type: Object, required: true },
    namePrefix: { type: String, required: true } // e.g., 'departure' or 'destination'
});

const emit = defineEmits(['update:modelValue', 'addressNotFound', 'addressFound']);

// Флаг для предотвращения циклических обновлений
let isUpdatingFromParent = false;

// Таймер для отложенной валидации при вводе улицы
let streetValidationTimer = null;

// Состояние для отслеживания, что введенная улица не найдена
const streetNotFound = ref(false);

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
            // Если есть выбранный терминал, возвращаем его отформатированное имя
            if (state.value.terminal.selectedPVZ) {
                return state.value.terminal.displayText || formatPVZName(state.value.terminal.selectedPVZ);
            }
            // Иначе возвращаем текст поиска
            return state.value.terminal.searchText || '';
        }
        return '';
    },
    set(newValue) {
        if (isUpdatingFromParent) return;
        
        // Используется только для режима терминала
        if (deliveryMode.value === 'terminal') {
            // Если новое значение - это объект терминала (из AutocompleteInput при выборе)
            if (newValue && typeof newValue === 'object' && (newValue.uidBillingAddress || newValue.uid)) {
                console.log('DeliveryPointForm: location set получил объект терминала', newValue);
                state.value.terminal.selectedPVZ = newValue;
                state.value.terminal.displayText = formatPVZName(newValue);
                state.value.terminal.searchText = '';
                emitCurrentState();
                return;
            }
            
            // Если новое значение - это строка (пользователь вводит текст или выбрал из списка)
            if (typeof newValue === 'string') {
                // Пытаемся найти терминал по строке в списке доступных терминалов
                // Проверяем по representation (основное поле терминала) и по отформатированному имени
                const foundTerminal = terminalOptions.value.find(term => {
                    const termRepresentation = term.representation || '';
                    const termFormatted = formatPVZName(term);
                    // Сравниваем нормализованные значения (без учета регистра и пробелов)
                    const normalizedNewValue = newValue.trim().toLowerCase();
                    const normalizedRepresentation = termRepresentation.trim().toLowerCase();
                    const normalizedFormatted = termFormatted.trim().toLowerCase();
                    return normalizedRepresentation === normalizedNewValue || 
                           normalizedFormatted === normalizedNewValue ||
                           termRepresentation === newValue ||
                           termFormatted === newValue;
                });
                
                if (foundTerminal) {
                    console.log('DeliveryPointForm: Найден терминал по строке', {
                        searchValue: newValue,
                        foundTerminal,
                        representation: foundTerminal.representation,
                        uidBillingAddress: foundTerminal.uidBillingAddress
                    });
                    state.value.terminal.selectedPVZ = foundTerminal;
                    state.value.terminal.displayText = foundTerminal.representation || formatPVZName(foundTerminal);
                    state.value.terminal.searchText = '';
                    emitCurrentState();
                    return;
                }
                
                // Если терминал не найден, это текст поиска пользователя
                const isFormattedTerminal = state.value.terminal.selectedPVZ && 
                    (state.value.terminal.selectedPVZ.representation === newValue || 
                     formatPVZName(state.value.terminal.selectedPVZ) === newValue);
                
                if (!isFormattedTerminal) {
                    // Это новый текст поиска, а не форматированное значение
                    state.value.terminal.searchText = newValue;
                    state.value.terminal.selectedPVZ = null;
                    state.value.terminal.displayText = '';
                }
            }
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
        // Проверяем, это терминал или объект адреса
        // Терминал имеет uidBillingAddress или uid, но не имеет house
        if ((modelValue.location.uidBillingAddress || modelValue.location.uid) && !modelValue.location.house) {
            // Это терминал - инициализируем терминал
            state.value.terminal.selectedPVZ = modelValue.location;
            state.value.terminal.displayText = formatPVZName(modelValue.location);
            state.value.terminal.searchText = '';
            console.log('DeliveryPointForm: Инициализирован терминал', {
                terminal: state.value.terminal,
                location: modelValue.location,
                hasUidBillingAddress: !!modelValue.location.uidBillingAddress
            });
        } else if (modelValue.location.street && modelValue.location.phone && !modelValue.location.house) {
            // Это старый формат ПВЗ - инициализируем терминал
            state.value.terminal.selectedPVZ = modelValue.location;
            state.value.terminal.displayText = formatPVZName(modelValue.location);
            state.value.terminal.searchText = '';
            console.log('DeliveryPointForm: Инициализирован ПВЗ (старый формат)', state.value.terminal);
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
    if (!props.city || !props.terminals || props.terminals.length === 0) return [];
    
    // Используем объект locality если он передан, иначе извлекаем название из строки
    let cityName = null;
    let localityObj = props.locality;
    
    // Если locality не передан, но есть localities массив, пробуем найти по city строке
    if (!localityObj && props.localities && props.localities.length > 0) {
        // Пробуем найти locality по отформатированному имени
        const cityNameFromString = extractCityNameFromFormattedString(props.city);
        localityObj = props.localities.find(loc => {
            const formattedName = formatSelectedLocalityName(loc);
            const extractedFromFormatted = extractCityNameFromFormattedString(formattedName);
            return extractedFromFormatted === cityNameFromString || loc.name === cityNameFromString;
        });
    }
    
    if (localityObj && localityObj.name) {
        // Используем точное имя из объекта locality
        cityName = localityObj.name;
    } else {
        // Извлекаем название города из отформатированной строки
        cityName = extractCityNameFromFormattedString(props.city);
    }
    
    // Фильтруем терминалы по городу (поле locality содержит только название города)
    // Используем нормализацию для сравнения (без учета регистра и пробелов)
    const normalizedCityName = cityName ? cityName.toLowerCase().trim() : '';
    
    const filtered = props.terminals.filter(terminal => {
        if (!terminal.locality) return false;
        const normalizedTerminalLocality = terminal.locality.toLowerCase().trim();
        return normalizedTerminalLocality === normalizedCityName;
    });
    
    // Дополнительная проверка: если не нашли точное совпадение, пробуем частичное
    let filteredWithPartial = filtered;
    if (filtered.length === 0 && normalizedCityName) {
        filteredWithPartial = props.terminals.filter(terminal => {
            if (!terminal.locality) return false;
            const normalizedTerminalLocality = terminal.locality.toLowerCase().trim();
            // Проверяем, начинается ли название терминала с названия города или наоборот
            return normalizedTerminalLocality.includes(normalizedCityName) || 
                   normalizedCityName.includes(normalizedTerminalLocality);
        });
    }
    
    console.log('Фильтрация терминалов:', {
        city: props.city,
        locality: localityObj,
        localityName: localityObj?.name,
        cityName: cityName,
        normalizedCityName: normalizedCityName,
        terminalsCount: props.terminals.length,
        filteredCount: filtered.length,
        filteredWithPartialCount: filteredWithPartial.length,
        allTerminalLocalities: [...new Set(props.terminals.map(t => t.locality).filter(Boolean))].slice(0, 10),
        sampleTerminals: props.terminals.slice(0, 5).map(t => ({ 
            locality: t.locality, 
            normalizedLocality: t.locality?.toLowerCase().trim(),
            representation: t.representation 
        })),
        filteredTerminals: filteredWithPartial.slice(0, 3).map(t => ({ 
            locality: t.locality, 
            representation: t.representation 
        }))
    });
    
    return filteredWithPartial;
});

// Проверка доступности улиц для выбранного города
const hasAvailableStreets = computed(() => {
    if (!props.city || !props.billingAddresses || props.billingAddresses.length === 0) {
        return false;
    }
    
    const cityName = props.locality?.name || extractCityNameFromFormattedString(props.city);
    if (!cityName) return false;
    
    return props.billingAddresses.some(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        return addrCity === cityName && addr.street && addr.street.trim() !== '';
    });
});

// Проверка наличия записи для всего города (адрес без улицы с takeDeliver)
const hasCityWideCoverage = computed(() => {
    if (!props.city || !props.billingAddresses || props.billingAddresses.length === 0) {
        return false;
    }
    
    const cityName = props.locality?.name || extractCityNameFromFormattedString(props.city);
    if (!cityName) return false;
    
    // Ищем адрес без улицы для выбранного города
    const cityWideAddress = props.billingAddresses.find(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        const addrStreet = addr.street || '';
        return addrCity === cityName && (!addrStreet || addrStreet.trim() === '');
    });
    
    if (!cityWideAddress) {
        return false;
    }
    
    // Проверяем наличие записи в takeDelivers для найденного адреса
    if (!props.takeDelivers || props.takeDelivers.length === 0) {
        return false;
    }
    
    return props.takeDelivers.some(td => {
        return String(td.uidBillingAddress) === String(cityWideAddress.uid);
    });
});

// Извлекаем уникальные города из billingAddresses для формы запроса
const availableCities = computed(() => {
    const citiesMap = new Map();
    props.billingAddresses.forEach(addr => {
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
    if (!props.billingAddresses || !Array.isArray(props.billingAddresses)) {
        return [];
    }
    props.billingAddresses.forEach(addr => {
        if (!addr) return;
        const region = typeof addr.region === 'string' ? addr.region : (addr.region?.name || '');
        if (region && typeof region === 'string' && region.trim() !== '') {
            regionsSet.add(region);
        }
    });
    return Array.from(regionsSet).sort();
});

// Текущий регион и город для предзаполнения формы
const currentCityName = computed(() => {
    return props.locality?.name || extractCityNameFromFormattedString(props.city);
});

const currentRegion = computed(() => {
    if (props.locality?.region) {
        return typeof props.locality.region === 'string' ? props.locality.region : (props.locality.region?.name || '');
    }
    
    // Ищем регион в billingAddresses для текущего города
    const cityName = currentCityName.value;
    if (!cityName) return '';
    
    const address = props.billingAddresses.find(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        return addrCity === cityName;
    });
    
    if (!address) return '';
    return typeof address.region === 'string' ? address.region : (address.region?.name || '');
});

// Обработчик отправки формы запроса улицы
function handleStreetRequestSubmit(formData) {
    console.log('Street request submitted:', formData);
    // TODO: Отправить данные на сервер
    alert('Запрос на добавление улицы отправлен! Наш менеджер свяжется с вами в ближайшее время.');
}

// Вспомогательная функция для извлечения названия города из отформатированной строки
function extractCityNameFromFormattedString(formattedCity) {
    if (!formattedCity) return '';
    
    let cityName = formattedCity.trim();
    
    // Убираем информацию в скобках (регион и федеральный округ)
    if (cityName.includes('(')) {
        cityName = cityName.split('(')[0].trim();
    }
    
    // Убираем информацию после запятой (если есть)
    if (cityName.includes(',')) {
        cityName = cityName.split(',')[0].trim();
    }
    
    // Убираем префиксы типа "г. ", "пос. " и т.д.
    cityName = cityName.replace(/^(г\.|пос\.|ст\.|с\.|д\.|х\.|аул|кишл\.)\s*/i, '').trim();
    
    return cityName;
}

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

// Проверка наличия адреса в billingAddresses и takeDelivers
function validateAddress(cityName, streetName) {
    if (!cityName || !streetName || !props.billingAddresses || props.billingAddresses.length === 0) {
        return { valid: false, billingAddress: null, isCityWide: false };
    }
    
    // Ищем улицу в billingAddresses (сравниваем только street, игнорируем houseNumber)
    const normalizedStreetName = streetName.toLowerCase().trim();
    const billingAddress = props.billingAddresses.find(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        const addrStreet = (addr.street || '').toLowerCase().trim();
        return addrCity === cityName && addrStreet === normalizedStreetName;
    });
    
    // Если конкретная улица найдена, проверяем наличие takeDeliver
    if (billingAddress) {
        // Проверяем наличие записи в takeDelivers для найденного billingAddress
        if (!props.takeDelivers || props.takeDelivers.length === 0) {
            return { valid: false, billingAddress, isCityWide: false };
        }
        
        const hasTakeDeliver = props.takeDelivers.some(td => {
            return String(td.uidBillingAddress) === String(billingAddress.uid);
        });
        
        if (!hasTakeDeliver) {
            return { valid: false, billingAddress, isCityWide: false };
        }
        
        return { valid: true, billingAddress, isCityWide: false };
    }
    
    // Если конкретная улица не найдена, проверяем наличие записи для всего города
    const cityWideAddress = props.billingAddresses.find(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        const addrStreet = addr.street || '';
        return addrCity === cityName && (!addrStreet || addrStreet.trim() === '');
    });
    
    if (cityWideAddress) {
        // Проверяем наличие записи в takeDelivers для адреса всего города
        if (!props.takeDelivers || props.takeDelivers.length === 0) {
            return { valid: false, billingAddress: null, isCityWide: false };
        }
        
        const hasTakeDeliver = props.takeDelivers.some(td => {
            return String(td.uidBillingAddress) === String(cityWideAddress.uid);
        });
        
        if (hasTakeDeliver) {
            // Есть запись для всего города - можно использовать её коэффициенты
            return { valid: true, billingAddress: cityWideAddress, isCityWide: true };
        }
    }
    
    return { valid: false, billingAddress: null, isCityWide: false };
}

// Обработчики выбора улицы
function onStreetSelected(item) {
    if (isUpdatingFromParent) return;
    
    // Сохраняем выбранную улицу
    const streetName = item.name || item.street || '';
    state.value.address.street = streetName;
    
    // При выборе из списка улица всегда найдена
    streetNotFound.value = false;
    
    // Очищаем зависимые поля
    state.value.address.house = '';
    state.value.address.building = '';
    state.value.address.office = '';
    
    // Очищаем поле дома в автокомплите
    if (houseInputRef.value && houseInputRef.value.setInputValue) {
        houseInputRef.value.setInputValue('');
    }
    
    // Валидация адреса
    if (deliveryMode.value === 'address' && props.city && streetName) {
        // Получаем название города
        const cityName = props.locality?.name || extractCityNameFromFormattedString(props.city);
        const validation = validateAddress(cityName, streetName);
        
        if (!validation.valid) {
            // Адрес не найден - проверяем, есть ли запись для всего города
            if (validation.isCityWide || hasCityWideCoverage.value) {
                // Есть запись для всего города - используем её коэффициенты, не показываем форму запроса
                emit('addressFound', { type: props.namePrefix });
            } else {
                // Нет записи для всего города - эмитим событие для показа формы запроса
                const localityObj = props.locality || props.localities.find(loc => loc.name === cityName);
                emit('addressNotFound', {
                    type: props.namePrefix, // 'departure' or 'destination'
                    city: cityName,
                    street: streetName,
                    locality: localityObj,
                    region: localityObj?.region || ''
                });
                return; // Не продолжаем обработку
            }
        } else {
            // Адрес найден - эмитим событие для очистки invalid состояния
            emit('addressFound', { type: props.namePrefix });
        }
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
        
        // Очищаем таймер валидации и invalid состояние
        if (streetValidationTimer) {
            clearTimeout(streetValidationTimer);
            streetValidationTimer = null;
        }
        streetNotFound.value = false; // Сбрасываем флаг "улица не найдена"
        emit('addressFound', { type: props.namePrefix }); // Очищаем invalid при очистке поля
        
        emitCurrentState();
        return;
    }
    
    // Отложенная валидация при вводе (через 1 секунду после последнего изменения)
    if (streetValidationTimer) {
        clearTimeout(streetValidationTimer);
    }
    
    streetValidationTimer = setTimeout(() => {
        // Валидация адреса при вводе
        if (deliveryMode.value === 'address' && props.city && value && value.trim()) {
            const cityName = props.locality?.name || extractCityNameFromFormattedString(props.city);
            const validation = validateAddress(cityName, value.trim());
            
            if (!validation.valid) {
                // Адрес не найден - проверяем, есть ли запись для всего города
                if (validation.isCityWide || hasCityWideCoverage.value) {
                    // Есть запись для всего города - используем её коэффициенты, не показываем форму запроса
                    streetNotFound.value = false;
                    emit('addressFound', { type: props.namePrefix });
                } else {
                    // Нет записи для всего города - устанавливаем флаг и эмитим событие для показа формы запроса
                    streetNotFound.value = true;
                    const localityObj = props.locality || props.localities.find(loc => loc.name === cityName);
                    emit('addressNotFound', {
                        type: props.namePrefix,
                        city: cityName,
                        street: value.trim(),
                        locality: localityObj,
                        region: localityObj?.region || ''
                    });
                }
            } else {
                // Адрес найден - сбрасываем флаг и эмитим событие для очистки invalid состояния
                streetNotFound.value = false;
                emit('addressFound', { type: props.namePrefix });
            }
        }
        streetValidationTimer = null;
    }, 1000); // Задержка 1 секунда
    
    emitCurrentState();
}

function onStreetReset() {
    if (isUpdatingFromParent) return;
    
    state.value.address.street = '';
    state.value.address.house = '';
    state.value.address.building = '';
    state.value.address.office = '';
    streetNotFound.value = false; // Сбрасываем флаг при очистке поля
    
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
    
    console.log('DeliveryPointForm: onTerminalSelected вызван', {
        address,
        addressType: typeof address,
        addressKeys: address && typeof address === 'object' ? Object.keys(address) : null,
        hasUidBillingAddress: address?.uidBillingAddress,
        uidBillingAddress: address?.uidBillingAddress,
        fullAddress: address
    });
    
    // Проверяем, что это действительно объект терминала
    if (!address || typeof address !== 'object') {
        console.warn('DeliveryPointForm: onTerminalSelected получил не объект:', address);
        return;
    }
    
    // Сохраняем выбранный терминал в состоянии терминала
    state.value.terminal.selectedPVZ = address;
    state.value.terminal.displayText = formatPVZName(address);
    state.value.terminal.searchText = '';
    
    console.log('DeliveryPointForm: Выбран терминал', {
        terminal: state.value.terminal,
        selectedPVZ: state.value.terminal.selectedPVZ,
        hasUidBillingAddress: !!state.value.terminal.selectedPVZ?.uidBillingAddress,
        uidBillingAddress: state.value.terminal.selectedPVZ?.uidBillingAddress,
        fullSelectedPVZ: state.value.terminal.selectedPVZ
    });
    
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
    
    // Сбрасываем флаг "улица не найдена" при смене города
    streetNotFound.value = false;
    
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

    // Если передан полный объект location (терминал), обновляем состояние терминала
    // Проверяем наличие uidBillingAddress или uid - это признаки терминала из API
    if (newValue.location && typeof newValue.location === 'object' && 
        (newValue.location.uidBillingAddress || newValue.location.uid || 
         (newValue.location.street && newValue.location.phone))) {
        state.value.terminal.selectedPVZ = newValue.location;
        state.value.terminal.displayText = formatPVZName(newValue.location);
        state.value.terminal.searchText = '';
        console.log('DeliveryPointForm: Обновлен терминал', {
            terminal: state.value.terminal,
            location: newValue.location,
            hasUidBillingAddress: !!newValue.location.uidBillingAddress
        });
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