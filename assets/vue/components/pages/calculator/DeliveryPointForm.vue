<template>
    <section class="card bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-h4 font-bold mb-4">{{ title }}</h2>

        <!-- Переключатель режима -->
        <div class="flex border border-gray-200 rounded-lg p-1 mb-4">
            <button @click.prevent="deliveryMode = 'terminal'"
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
            <div :style="{ display: deliveryMode === 'terminal' ? 'block' : 'none' }">
                <AutocompleteInput ref="terminalInputRef" :name="`${namePrefix}_terminal_address`" label="Адрес терминала"
                    :items="terminalOptions" :disabled="!city"
                    :placeholder="city ? 'Выберите терминал' : 'Сначала выберите город'" v-model="location"
                    :emitFullItem="true" @itemSelected="onTerminalSelected" :showResetButton="true"
                    @reset="onTerminalReset" 
                    :itemFormatter="formatPVZName" 
                    :selectedValueFormatter="formatPVZName" />
            </div>
            <div :style="{ display: deliveryMode === 'address' ? 'block' : 'none' }">
                <TextInput ref="addressInputRef" :name="`${namePrefix}_pickup_address`" label="Адрес" placeholder="Укажите адрес"
                    :disabled="!city" v-model="location" />
            </div>

            <div class="w-full">
                <label class="block text-brand-gray font-medium mb-2">
                    Дата
                </label>
                <DatePickerVue :name="`${namePrefix}_date`" :initial-date="date" :disabled="!city"
                    placeholder="Выберите дату" @update:date="onDateChange" />
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import TextInput from '../../forms/TextInput.vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';
import DatePickerVue from '../../DatePickerVue.vue';
import { formatPVZName, formatPVZHTML, getPVZKey } from '../../../utils/pvzFormatter.js';

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
        text: ''             // Введенный адрес
    }
});

// Computed property to handle the location field for AutocompleteInput
const location = computed({
    get() {
        let value;
        if (deliveryMode.value === 'terminal') {
            // Для режима терминала возвращаем отображаемый текст или текст поиска
            value = state.value.terminal.displayText || state.value.terminal.searchText || '';
        } else {
            // Для режима адреса возвращаем введенный адрес
            value = state.value.address.text || '';
        }
        
        console.log('DeliveryPointForm: location getter', {
            deliveryMode: deliveryMode.value,
            value,
            state: state.value,
            terminalDisplayText: state.value.terminal.displayText,
            terminalSearchText: state.value.terminal.searchText,
            addressText: state.value.address.text
        });
        
        return value;
    },
    set(newValue) {
        if (isUpdatingFromParent) return;
        
        console.log('DeliveryPointForm: location setter', {
            newValue,
            deliveryMode: deliveryMode.value,
            state: state.value
        });
        
        if (deliveryMode.value === 'terminal') {
            state.value.terminal.searchText = newValue;
            // Если пользователь вводит текст, сбрасываем выбранный ПВЗ
            if (newValue && !state.value.terminal.selectedPVZ) {
                state.value.terminal.selectedPVZ = null;
                state.value.terminal.displayText = '';
            }
        } else {
            state.value.address.text = newValue;
        }
        
        // Emit the current state to parent
        emitCurrentState();
    }
});

// Функция для отправки текущего состояния родительскому компоненту
function emitCurrentState() {
    let currentLocation;
    
    if (deliveryMode.value === 'terminal') {
        // Для терминала возвращаем выбранный ПВЗ объект или строку поиска
        currentLocation = state.value.terminal.selectedPVZ || state.value.terminal.searchText;
    } else {
        // Для адреса возвращаем введенный адрес
        currentLocation = state.value.address.text;
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
    deliveryMode.value = modelValue.deliveryMode || 'terminal';
    date.value = modelValue.date || '';
    
    // Инициализируем состояние в зависимости от типа location
    if (modelValue.location && typeof modelValue.location === 'object' && modelValue.location.street && modelValue.location.phone) {
        // Это ПВЗ объект - инициализируем терминал
        state.value.terminal.selectedPVZ = modelValue.location;
        state.value.terminal.displayText = formatPVZName(modelValue.location);
        state.value.terminal.searchText = '';
        console.log('DeliveryPointForm: Инициализирован ПВЗ', state.value.terminal);
    } else if (typeof modelValue.location === 'string' && modelValue.location.trim()) {
        // Это строка - инициализируем соответствующий режим
        if (deliveryMode.value === 'terminal') {
            state.value.terminal.searchText = modelValue.location;
            state.value.terminal.displayText = '';
            state.value.terminal.selectedPVZ = null;
            console.log('DeliveryPointForm: Инициализирован терминал (строка)', state.value.terminal);
        } else {
            state.value.address.text = modelValue.location;
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
    
    // Если режим не "терминал" или нет доступных ПВЗ, сбрасываем состояние
    if (deliveryMode.value === 'terminal') {
        state.value.terminal.selectedPVZ = null;
        state.value.terminal.displayText = '';
        state.value.terminal.searchText = '';
    } else {
        state.value.address.text = '';
    }
    
    emitCurrentState();
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
        state: state.value
    });
    
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
        // Принудительно обновляем отображение поля адреса
        if (state.value.address.text) {
            console.log('DeliveryPointForm: Восстанавливаем сохраненный адрес:', state.value.address.text);
        }
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
        } else if (newMode === 'address' && addressInputRef.value) {
            const addressValue = state.value.address.text || '';
            console.log('DeliveryPointForm: Принудительно устанавливаем значение адреса:', addressValue);
            // Для TextInput просто обновляем v-model через location
            if (addressValue !== location.value) {
                location.value = addressValue;
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
            state.value.address.text = newValue.location;
            console.log('DeliveryPointForm: Обновлен адрес (строка)', state.value.address);
        }
    } else if (!newValue.location) {
        // Очищаем состояние только если location полностью пустое
        if (newDeliveryMode === 'terminal') {
            state.value.terminal.selectedPVZ = null;
            state.value.terminal.displayText = '';
            state.value.terminal.searchText = '';
        } else {
            state.value.address.text = '';
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