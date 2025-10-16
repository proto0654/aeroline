<template>
    <div class="">
        <h3 v-if="showTitle" class="text-lg font-bold text-gray-800 mb-4">Откуда и куда</h3>

        <div class="flex xl:flex-row flex-col items-start gap-2 mb-4 items-center xl:items-start">
            <!-- Поле "Откуда" -->
            <div class="w-full">
                <AutocompleteInput name="direction.from" placeholder="Откуда" 
                    :items="localities" 
                    v-model="from"
                    @itemSelected="onFromItemSelected" :emitFullItem="true" :showResetButton="true"
                    :useApiSearch="true" :apiSearchFunction="searchLocalitiesApi"
                    ref="fromAutocompleteRef" />

                <!-- Популярные города для "Откуда" -->
                <div
                    class="mb-0 md:mb-0 mt-2 md:mt-4 flex flex-row flex-wrap gap-2 text-caption-form text-brand-gray gap-x-2 gap-y-0">
                    <button v-for="city in quickSelectCities" :key="'from-' + city" @click="setFromCity(city)"
                        class="cursor-pointer underline leading-1.5" type="button">{{ city }}</button>
                </div>
            </div>

            <!-- Кнопка смены направления -->
            <button type="button" @click="swapDirections"
                class="w-12 mx-auto md:mx-2 my-4 md:mb-0 md:my-4 flex items-center justify-center">
                <img src="/assets/img/double-arrow.svg" alt="Поменять местами" class="w-6 h-6" />
            </button>

            <!-- Поле "Куда" -->
            <div class="w-full">
                <AutocompleteInput name="direction.to" placeholder="Куда" 
                    :items="localities" 
                    v-model="to"
                    @itemSelected="onToItemSelected" :emitFullItem="true" :showResetButton="true"
                    :useApiSearch="true" :apiSearchFunction="searchLocalitiesApi"
                    ref="toAutocompleteRef" />

                <!-- Популярные города для "Куда" -->
                <div
                    class="mb-4 md:mb-0 mt-2 md:mt-4 flex flex-row flex-wrap gap-2 text-caption-form text-brand-gray gap-x-2 gap-y-0">
                    <button v-for="city in quickSelectCities" :key="'to-' + city" @click="setToCity(city)"
                        class="cursor-pointer underline leading-1.5" type="button">{{ city }}</button>
                </div>
            </div>
            <button v-if="showCalculateButton"
                class="w-full lg:max-w-[7em] leading-[2.1em] w-full btn-gray px-3 py-2 rounded-lg text-white flex flex-rows items-center justify-center gap-1 min-w-[6em] text-buttons"
                @click="handleCalculate">
                Рассчитать
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';
import apiService from '../../../services/apiService.js';
import { formatLocalityName, formatSelectedLocalityName } from '../../../utils/localityFormatter.js';

const props = defineProps({
    billingAddresses: {
        type: Array,
        required: true
    },
    localities: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: Object,
        required: true
    },
    showCalculateButton: {
        type: Boolean,
        default: false
    },
    showTitle: {
        type: Boolean,
        default: true
    },
});

const emit = defineEmits(['update:modelValue', 'calculate']);

const from = ref(props.modelValue.from || '');
const to = ref(props.modelValue.to || '');

// Добавляем рефы для хранения выбранных объектов офисов
const fromOffice = ref(null);
const toOffice = ref(null);

// Refs для доступа к методам AutocompleteInput
const fromAutocompleteRef = ref(null);
const toAutocompleteRef = ref(null);

// Популярные города для быстрого выбора - берем первые 7 уникальных городов из localities
const quickSelectCities = computed(() => {
    if (!props.localities || !Array.isArray(props.localities)) {
        return [];
    }
    
    return props.localities
        .map(locality => locality.name)
        .filter(city => city && city.trim() !== '')
        .slice(0, 7);
});

// Методы для установки городов
const setFromCity = (city) => {
    try {
        const locality = props.localities.find(l => l.name === city);
        if (locality) {
            from.value = formatSelectedLocalityName(locality);
            fromOffice.value = locality;
            // Эмитим обновленные данные
            emit('update:modelValue', { 
                from: from.value, 
                to: to.value,
                fromAddress: locality,
                toAddress: toOffice.value,
                fromLocalityId: locality.id,
                toLocalityId: toOffice.value?.id
            });
        }
    } catch (error) {
        console.error('Ошибка в setFromCity:', error);
    }
};

const setToCity = (city) => {
    try {
        const locality = props.localities.find(l => l.name === city);
        if (locality) {
            to.value = formatSelectedLocalityName(locality);
            toOffice.value = locality;
            // Эмитим обновленные данные
            emit('update:modelValue', { 
                from: from.value, 
                to: to.value,
                fromAddress: fromOffice.value,
                toAddress: toOffice.value,
                fromLocalityId: fromOffice.value?.id,
                toLocalityId: locality.id
            });
        }
    } catch (error) {
        console.error('Ошибка в setToCity:', error);
    }
};

// Функция для API поиска населенных пунктов
const searchLocalitiesApi = async (query) => {
    try {
        return await apiService.searchLocalities(query);
    } catch (error) {
        console.error('Ошибка при поиске населенных пунктов:', error);
        return [];
    }
};

// Обработчики событий выбора элемента (теперь получаем полный объект)
const onFromItemSelected = (item) => {
    from.value = formatSelectedLocalityName(item);
    fromOffice.value = item;
    emit('update:modelValue', { 
        from: from.value, 
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: item.id,
        toLocalityId: toOffice.value?.id
    });
};

const onToItemSelected = (item) => {
    to.value = formatSelectedLocalityName(item);
    toOffice.value = item;
    emit('update:modelValue', { 
        from: from.value, 
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: fromOffice.value?.id,
        toLocalityId: item.id
    });
};

// Метод для смены направлений местами
const swapDirections = () => {
    const tempFrom = from.value;
    const tempTo = to.value;
    const tempFromOffice = fromOffice.value;
    const tempToOffice = toOffice.value;

    from.value = tempTo;
    to.value = tempFrom;
    fromOffice.value = tempToOffice;
    toOffice.value = tempFromOffice;

    // Обновляем значения в AutocompleteInput
    if (fromAutocompleteRef.value) fromAutocompleteRef.value.setInputValue(from.value);
    if (toAutocompleteRef.value) toAutocompleteRef.value.setInputValue(to.value);

    // Эмитим обновленные данные с locality_id
    emit('update:modelValue', { 
        from: from.value, 
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: fromOffice.value?.id,
        toLocalityId: toOffice.value?.id
    });
};

// Метод для обработки кнопки "Рассчитать"
const handleCalculate = () => {
    if (fromOffice.value && toOffice.value) {
        // Создаем параметры URL
        const params = new URLSearchParams();
        
        // Передаем ID населенных пунктов
        params.set('from', fromOffice.value.id);
        params.set('to', toOffice.value.id);
        
        window.location.href = `./calculator.html?${params.toString()}`;
    } else {
        alert('Пожалуйста, выберите корректные пункты отправки и назначения');
        emit('calculate', { from: from.value, to: to.value });
    }
};

// Helper to find locality by string value (city with region info)
const findAddressByValue = (value) => {
    if (!value || !props.localities || !Array.isArray(props.localities)) return null;
    
    // Try to find by exact match of formatted string
    let foundLocality = props.localities.find(locality => {
        const formattedName = formatLocalityName(locality);
        return formattedName === value;
    });
    if (foundLocality) return foundLocality;

    // If not found by full string, try to find by city name only
    foundLocality = props.localities.find(locality => (locality.name || locality.locality || locality.city) === value);
    return foundLocality || null;
};

// Watch for local changes and emit to parent
watch([from, to], ([newFrom, newTo]) => {
    emit('update:modelValue', { 
        from: newFrom, 
        to: newTo,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: fromOffice.value?.id,
        toLocalityId: toOffice.value?.id
    });
});

// Watch for parent changes and update local state
watch(() => props.modelValue, (newValue) => {
    // Проверяем, есть ли изменения в from/to, чтобы не перезаписывать данные без необходимости
    const fromChanged = newValue.from !== from.value;
    const toChanged = newValue.to !== to.value;
    
    if (!fromChanged && !toChanged) {
        return;
    }
    
    // Показываем полную строку с городом и регионом
    from.value = newValue.from || '';
    to.value = newValue.to || '';
    
    // Ищем соответствующие localities
    fromOffice.value = newValue.fromAddress || findAddressByValue(newValue.from);
    toOffice.value = newValue.toAddress || findAddressByValue(newValue.to);
    
    // Обновляем locality_id если они есть в newValue
    if (newValue.fromLocalityId) {
        fromOffice.value = props.localities.find(loc => loc.id === newValue.fromLocalityId) || fromOffice.value;
    }
    if (newValue.toLocalityId) {
        toOffice.value = props.localities.find(loc => loc.id === newValue.toLocalityId) || toOffice.value;
    }
}, { deep: true });

// Инициализация fromOffice и toOffice при монтировании, если modelValue уже имеет значения
import { onMounted } from 'vue';
onMounted(() => {
    if (props.modelValue.from) {
        fromOffice.value = findAddressByValue(props.modelValue.from);
    }
    if (props.modelValue.to) {
        toOffice.value = findAddressByValue(props.modelValue.to);
    }

    // GET-параметры обрабатываются в родительском компоненте (CalculatorPage.vue)
    // Здесь мы только инициализируем fromOffice и toOffice если они уже есть в modelValue
});
</script>