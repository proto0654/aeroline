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
            <AutocompleteInput name="cityFilter" placeholder="Выберите город" 
                :items="availableCitiesForSelect" 
                v-model="selectedCity" 
                @itemSelected="onCityItemSelected" 
                @reset="onReset"
                :showResetButton="true"
                :useApiSearch="true"
                :apiSearchFunction="searchCitiesApi"
                :itemFormatter="formatCityName"
                :selectedValueFormatter="formatCityName"
                :emitFullItem="true" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
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
    localities: {
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

// Извлекаем уникальные города из терминалов (offices)
const availableCities = computed(() => {
    if (!props.offices || !Array.isArray(props.offices)) {
        return [];
    }
    
    const citiesMap = new Map();
    props.offices.forEach(office => {
        const city = office.city || '';
        if (city && city.trim() !== '') {
            // Сохраняем информацию о городе
            if (!citiesMap.has(city)) {
                citiesMap.set(city, {
                    name: city,
                    region: '' // Терминалы не содержат информацию о регионе напрямую
                });
            }
        }
    });
    
    return Array.from(citiesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
});

// Форматируем города для AutocompleteInput (объекты с name и region)
const availableCitiesForSelect = computed(() => {
    return availableCities.value.map(city => {
        const displayName = city.region ? `${city.name}, ${city.region}` : city.name;
        return {
            name: city.name,
            region: city.region || '',
            id: `city-${city.name}`,
            displayName: displayName,
            // Для совместимости с AutocompleteInput
            toString: () => displayName
        };
    });
});

// Форматирование названия города для отображения
function formatCityName(city) {
    if (!city) return '';
    if (typeof city === 'string') return city;
    // Если это объект с displayName, используем его
    if (city.displayName) return city.displayName;
    // Если есть name и region, форматируем
    if (city.name && city.region) {
        return `${city.name}, ${city.region}`;
    }
    // Если есть только name
    if (city.name) return city.name;
    // Fallback на строковое представление
    return String(city);
}

// Функция для поиска городов
const searchCitiesApi = async (query) => {
    try {
        if (!query || query.trim() === '') {
            return availableCitiesForSelect.value;
        }
        
        const queryLower = query.toLowerCase().trim();
        return availableCitiesForSelect.value.filter(city => {
            const cityName = city.name.toLowerCase();
            const regionName = (city.region || '').toLowerCase();
            return cityName.includes(queryLower) || regionName.includes(queryLower);
        });
    } catch (error) {
        console.error('Ошибка при поиске городов:', error);
        return [];
    }
};

const onCityItemSelected = (item) => {
    // Извлекаем название города из объекта
    const cityName = item.name || item.city || '';
    selectedCity.value = formatCityName(item);
    emit('citySelected', cityName);
};

const onReset = () => {
    selectedCity.value = '';
    emit('filterReset');
};

// Watch для изменений в selectedCity
watch(selectedCity, (newValue) => {
    if (!newValue || newValue.trim() === '') {
        emit('filterReset');
    }
});
</script>