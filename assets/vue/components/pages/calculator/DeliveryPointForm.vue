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
            <div v-if="deliveryMode === 'terminal'">
                <AutocompleteInput :name="`${namePrefix}_terminal_address`" label="Адрес терминала"
                    :items="terminalOptions" :disabled="!city"
                    :placeholder="city ? 'Выберите терминал' : 'Сначала выберите город'" v-model="location"
                    :emitFullItem="true" @itemSelected="onTerminalSelected" :showResetButton="true"
                    @reset="onTerminalReset" />
            </div>
            <div v-if="deliveryMode === 'address'">
                <TextInput :name="`${namePrefix}_pickup_address`" label="Адрес" placeholder="Укажите адрес"
                    :disabled="!city" v-model="location" />
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text text-brand-gray font-medium">Дата</span>
                </label>
                <DatePickerVue :name="`${namePrefix}_date`" :initial-date="date" :disabled="!city"
                    placeholder="Выберите дату" @update:date="onDateChange" />
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TextInput from '../../forms/TextInput.vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';
import DatePickerVue from '../../DatePickerVue.vue';

const props = defineProps({
    title: { type: String, required: true },
    terminalLabel: { type: String, required: true },
    addressLabel: { type: String, required: true },
    city: { type: String, required: true },
    offices: { type: Array, required: true },
    modelValue: { type: Object, required: true },
    namePrefix: { type: String, required: true } // e.g., 'departure' or 'destination'
});

const emit = defineEmits(['update:modelValue']);

// Флаг для предотвращения циклических обновлений
let isUpdatingFromParent = false;

// Local state for non-location fields
const deliveryMode = ref(props.modelValue.deliveryMode || 'terminal');
const date = ref(props.modelValue.date || '');

// Computed property to handle the location field for AutocompleteInput
const location = computed({
    get() {
        const loc = props.modelValue.location;
        if (typeof loc === 'object' && loc !== null && loc.city) {
            // Format object to string for display
            return `${loc.city}${loc.address ? ', ' + loc.address : ''}`;
        }
        return loc || ''; // Return string as is
    },
    set(newValue) {
        if (isUpdatingFromParent) return;
        // This is called when user types in the input.
        // We emit the string value up. The selection of an object is handled by onTerminalSelected.
        emit('update:modelValue', {
            ...props.modelValue,
            location: newValue,
        });
    }
});

// Filter terminals based on the selected city
const terminalOptions = computed(() => {
    if (!props.city) return [];
    return props.offices.filter(office => office.city === props.city);
});

// Handler for when a user selects an office from Autocomplete
function onTerminalSelected(office) {
    if (isUpdatingFromParent) return;
    // When a specific item is selected, we emit the full object.
    emit('update:modelValue', {
        ...props.modelValue,
        location: office, // emit the object
    });
}

// Handler for reset button in AutocompleteInput
function onTerminalReset() {
    if (isUpdatingFromParent) return;
    emit('update:modelValue', {
        ...props.modelValue,
        location: '',
    });
}

// Handler for date change from DatePickerVue
function onDateChange(newDate) {
    if (isUpdatingFromParent) return;
    emit('update:modelValue', {
        ...props.modelValue,
        date: newDate,
    });
}

// When city changes, reset location
watch(() => props.city, () => {
    if (isUpdatingFromParent) return;
    emit('update:modelValue', {
        ...props.modelValue,
        location: '', // Reset location when city changes
    });
});

// Watch for local changes (mode and date) and emit update to parent
watch([deliveryMode, date], () => {
    if (isUpdatingFromParent) return;
    emit('update:modelValue', {
        ...props.modelValue,
        deliveryMode: deliveryMode.value,
        date: date.value,
    });
});

// Watch for parent changes and update local state
watch(() => props.modelValue, (newValue) => {
    if (isUpdatingFromParent) return;

    isUpdatingFromParent = true;

    deliveryMode.value = newValue.deliveryMode || 'terminal';
    date.value = newValue.date || '';

    // Используем setTimeout, чтобы убедиться, что все обновления завершены
    setTimeout(() => {
        isUpdatingFromParent = false;
    }, 0);
}, { deep: true });
</script>