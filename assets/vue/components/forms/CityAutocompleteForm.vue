<template>
    <div class="form flex items-center gap-2">
        <div class="relative w-full md:max-w-xs">
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