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
                    :placeholder="city ? 'Выберите терминал' : 'Сначала выберите город'" v-model="location" />
            </div>
            <div v-if="deliveryMode === 'address'">
                <TextInput :name="`${namePrefix}_pickup_address`" label="Адрес" placeholder="Укажите адрес"
                    :disabled="!city" v-model="location" />
            </div>

            <TextInput :name="`${namePrefix}_date`" label="Дата" type="date" :disabled="!city" v-model="date" />
        </div>

    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TextInput from '../../forms/TextInput.vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';

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

// Local state based on v-model
const deliveryMode = ref(props.modelValue.deliveryMode || 'terminal');
const location = ref(props.modelValue.location || '');
const date = ref(props.modelValue.date || '');

// Filter terminals based on the selected city
const terminalOptions = computed(() => {
    if (!props.city) return [];
    return props.offices.filter(office => office.city === props.city);
});

// When city changes, reset location
watch(() => props.city, () => {
    location.value = '';
});

// Watch for local changes and emit update to parent
watch([deliveryMode, location, date], () => {
    emit('update:modelValue', {
        deliveryMode: deliveryMode.value,
        location: location.value,
        date: date.value,
    });
});

// Watch for parent changes and update local state
watch(() => props.modelValue, (newValue) => {
    deliveryMode.value = newValue.deliveryMode;
    location.value = newValue.location;
    date.value = newValue.date;
}, { deep: true });

</script>