<template>
    <div class="form flex items-center gap-2">
        <!-- Индикатор загрузки -->
        <div v-if="loading" class="flex items-center gap-2 text-gray-600">
            <div class="loading loading-spinner loading-sm"></div>
            <span>Загрузка...</span>
        </div>

        <!-- Сообщение об ошибке -->
        <div v-else-if="error" class="text-red-600 text-sm">
            {{ error }}
        </div>

        <!-- Основная форма -->
        <div v-else class="relative w-full md:max-w-xs">
            <AutocompleteInput name="cityFilter" placeholder="Выберите город" :items="offices" :only-cities="true"
                v-model="selectedCity" @itemSelected="onCityItemSelected" :show-reset-button="true" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AutocompleteInput from './AutocompleteInput.vue';

const props = defineProps({
    offices: {
        type: Array,
        required: true
    },
    cities: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['citySelected', 'filterReset']);

const selectedCity = ref('');

const onCityItemSelected = (item) => {
    emit('citySelected', item.city);
};

const resetFilter = () => {
    selectedCity.value = '';
    emit('filterReset');
};

// Watch для изменений в selectedCity
watch(selectedCity, (newValue) => {
    if (!newValue) {
        emit('filterReset');
    }
});
</script>