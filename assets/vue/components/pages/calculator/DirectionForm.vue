<template>
    <div class="">
        <h3 v-if="showTitle" class="text-lg font-bold text-gray-800 mb-4">Откуда и куда</h3>

        <div class="flex xl:flex-row flex-col items-start gap-2 mb-4 items-center xl:items-start">
            <!-- Поле "Откуда" -->
            <div class="w-full">
                <AutocompleteInput name="direction.from" placeholder="Откуда" 
                    :items="availableCitiesForSelect" 
                    v-model="from"
                    @itemSelected="onFromItemSelected" 
                    @reset="onFromReset"
                    @update:modelValue="onFromInputChange"
                    :emitFullItem="true" :showResetButton="true"
                    :useApiSearch="true" :apiSearchFunction="searchCitiesApi"
                    :itemFormatter="formatCityName"
                    :selectedValueFormatter="formatCityName"
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
                    :items="availableCitiesForSelect" 
                    v-model="to"
                    @itemSelected="onToItemSelected" 
                    @reset="onToReset"
                    @update:modelValue="onToInputChange"
                    :emitFullItem="true" :showResetButton="true"
                    :useApiSearch="true" :apiSearchFunction="searchCitiesApi"
                    :itemFormatter="formatCityName"
                    :selectedValueFormatter="formatCityName"
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
import { ref, watch, computed, nextTick } from 'vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';
import apiService from '../../../services/apiService.js';
// Убрали зависимость от localities - работаем только с billingAddresses

const props = defineProps({
    billingAddresses: {
        type: Array,
        required: true
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

const emit = defineEmits(['update:modelValue', 'calculate', 'cityNotFound', 'cityFound']);

const from = ref(props.modelValue.from || '');
const to = ref(props.modelValue.to || '');

// Добавляем рефы для хранения выбранных объектов офисов
const fromOffice = ref(null);
const toOffice = ref(null);

// Refs для доступа к методам AutocompleteInput
const fromAutocompleteRef = ref(null);
const toAutocompleteRef = ref(null);

// Таймеры для отложенной валидации при вводе городов
let fromValidationTimer = null;
let toValidationTimer = null;

// Извлекаем уникальные города из billingAddresses
const availableCities = computed(() => {
    if (!props.billingAddresses || !Array.isArray(props.billingAddresses)) {
        return [];
    }
    
    const citiesMap = new Map();
    props.billingAddresses.forEach(addr => {
        const city = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        const region = typeof addr.region === 'string' ? addr.region : (addr.region?.name || '');
        if (city && city.trim() !== '') {
            // Сохраняем информацию о городе с регионом для удобства
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

// Форматируем города для AutocompleteInput (объекты с name и region)
const availableCitiesForSelect = computed(() => {
    return availableCities.value.map(city => {
        // Убеждаемся, что region - это строка
        const regionStr = typeof city.region === 'string' ? city.region : (city.region?.name || '');
        const displayName = regionStr ? `${city.name}, ${regionStr}` : city.name;
        return {
            name: city.name,
            region: regionStr,
            id: `city-${city.name}`,
            displayName: displayName,
            // Для совместимости с AutocompleteInput
            toString: () => displayName
        };
    });
});

// Популярные города для быстрого выбора - берем первые 7 уникальных городов из billingAddresses
const quickSelectCities = computed(() => {
    return availableCities.value
        .map(city => city.name)
        .slice(0, 7);
});

// Извлекаем уникальные регионы из billingAddresses
const availableRegions = computed(() => {
    if (!props.billingAddresses || !Array.isArray(props.billingAddresses)) {
        return [];
    }
    
    const regions = new Set();
    props.billingAddresses.forEach(addr => {
        if (addr.region && addr.region.trim() !== '') {
            regions.add(addr.region);
        }
    });
    
    return Array.from(regions).sort();
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

// Методы для установки городов
const setFromCity = (cityName) => {
    try {
        const city = availableCities.value.find(c => c.name === cityName);
        if (city) {
            from.value = formatCityName(city);
            fromOffice.value = city;
            
            // Город всегда доступен, так как мы берем его из billingAddresses
            emit('update:modelValue', { 
                from: from.value, 
                to: to.value,
                fromAddress: city,
                toAddress: toOffice.value,
                fromLocalityId: null, // Не используем ID из localities
                toLocalityId: null
            });
            emit('cityFound', { type: 'from' });
        }
    } catch (error) {
        console.error('Ошибка в setFromCity:', error);
    }
};

const setToCity = (cityName) => {
    try {
        const city = availableCities.value.find(c => c.name === cityName);
        if (city) {
            to.value = formatCityName(city);
            toOffice.value = city;
            
            // Город всегда доступен, так как мы берем его из billingAddresses
            emit('update:modelValue', { 
                from: from.value, 
                to: to.value,
                fromAddress: fromOffice.value,
                toAddress: city,
                fromLocalityId: null, // Не используем ID из localities
                toLocalityId: null
            });
            emit('cityFound', { type: 'to' });
        }
    } catch (error) {
        console.error('Ошибка в setToCity:', error);
    }
};

// Функция для поиска городов из billingAddresses
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

// Проверка наличия города в billingAddresses
function checkCityInBillingAddresses(cityName) {
    if (!cityName || !props.billingAddresses || props.billingAddresses.length === 0) {
        return false;
    }
    
    // Извлекаем название города из отформатированной строки (если есть регион)
    const normalizedCityName = extractCityNameFromString(cityName);
    
    return props.billingAddresses.some(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : (addr.locality?.name || '');
        // Сравниваем нормализованные значения (без учета регистра)
        return addrCity.toLowerCase().trim() === normalizedCityName.toLowerCase().trim() ||
               addrCity === normalizedCityName;
    });
}

// Вспомогательная функция для извлечения названия города из строки
function extractCityNameFromString(formattedCity) {
    if (!formattedCity) return '';
    
    let cityName = formattedCity.trim();
    
    // Убираем информацию после запятой (регион)
    if (cityName.includes(',')) {
        cityName = cityName.split(',')[0].trim();
    }
    
    return cityName;
}

// Обработчики событий выбора элемента (теперь получаем объект города из billingAddresses)
const onFromItemSelected = (item) => {
    from.value = formatCityName(item);
    fromOffice.value = item;
    
    // Город всегда доступен, так как мы берем его из billingAddresses
    emit('update:modelValue', { 
        from: from.value, 
        to: to.value,
        fromAddress: item,
        toAddress: toOffice.value,
        fromLocalityId: null,
        toLocalityId: null
    });
    emit('cityFound', { type: 'from' });
};

const onToItemSelected = (item) => {
    to.value = formatCityName(item);
    toOffice.value = item;
    
    // Город всегда доступен, так как мы берем его из billingAddresses
    emit('update:modelValue', { 
        from: from.value, 
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: item,
        fromLocalityId: null,
        toLocalityId: null
    });
    emit('cityFound', { type: 'to' });
};

// Флаг для предотвращения циклических обновлений при валидации
let isUpdatingFromInput = false;
let isUpdatingToInput = false;
let isUserTypingFrom = false;
let isUserTypingTo = false;

// Обработчики изменения ввода городов (для валидации)
const onFromInputChange = (value) => {
    // Помечаем, что пользователь вводит значение
    isUserTypingFrom = true;
    
    // Обновляем локальное значение
    from.value = value || '';
    
    // Если пользователь очистил поле, очищаем состояние
    if (!value || !value.trim()) {
        fromOffice.value = null;
        if (fromValidationTimer) {
            clearTimeout(fromValidationTimer);
            fromValidationTimer = null;
        }
        emit('cityFound', { type: 'from' }); // Очищаем invalid состояние
        isUserTypingFrom = false;
        return;
    }
    
    // Если значение совпадает с выбранным городом, не валидируем
    if (fromOffice.value) {
        const formattedName = formatCityName(fromOffice.value);
        if (formattedName === value) {
            isUserTypingFrom = false;
            return; // Это выбранный город, не нужно валидировать
        }
    }
    
    // Отложенная валидация при вводе (через 1 секунду после последнего изменения)
    if (fromValidationTimer) {
        clearTimeout(fromValidationTimer);
    }
    
    fromValidationTimer = setTimeout(() => {
        const cityName = extractCityNameFromString(value);
        const isValid = checkCityInBillingAddresses(cityName);
        
        if (!isValid && cityName.trim()) {
            // Город не найден - эмитим событие
            const cityObj = availableCities.value.find(c => 
                c.name.toLowerCase() === cityName.toLowerCase()
            );
            emit('cityNotFound', {
                type: 'from',
                city: cityName,
                locality: cityObj || null,
                region: cityObj?.region || ''
            });
        } else if (isValid) {
            // Город найден - эмитим событие для очистки invalid состояния
            emit('cityFound', { type: 'from' });
        }
        fromValidationTimer = null;
        isUserTypingFrom = false;
    }, 1000); // Задержка 1 секунда
};

const onToInputChange = (value) => {
    // Помечаем, что пользователь вводит значение
    isUserTypingTo = true;
    
    // Обновляем локальное значение
    to.value = value || '';
    
    // Если пользователь очистил поле, очищаем состояние
    if (!value || !value.trim()) {
        toOffice.value = null;
        if (toValidationTimer) {
            clearTimeout(toValidationTimer);
            toValidationTimer = null;
        }
        emit('cityFound', { type: 'to' }); // Очищаем invalid состояние
        isUserTypingTo = false;
        return;
    }
    
    // Если значение совпадает с выбранным городом, не валидируем
    if (toOffice.value) {
        const formattedName = formatCityName(toOffice.value);
        if (formattedName === value) {
            isUserTypingTo = false;
            return; // Это выбранный город, не нужно валидировать
        }
    }
    
    // Отложенная валидация при вводе (через 1 секунду после последнего изменения)
    if (toValidationTimer) {
        clearTimeout(toValidationTimer);
    }
    
    toValidationTimer = setTimeout(() => {
        const cityName = extractCityNameFromString(value);
        const isValid = checkCityInBillingAddresses(cityName);
        
        if (!isValid && cityName.trim()) {
            // Город не найден - эмитим событие
            const cityObj = availableCities.value.find(c => 
                c.name.toLowerCase() === cityName.toLowerCase()
            );
            emit('cityNotFound', {
                type: 'to',
                city: cityName,
                locality: cityObj || null,
                region: cityObj?.region || ''
            });
        } else if (isValid) {
            // Город найден - эмитим событие для очистки invalid состояния
            emit('cityFound', { type: 'to' });
        }
        toValidationTimer = null;
        isUserTypingTo = false;
    }, 1000); // Задержка 1 секунда
};

// Обработчики сброса городов
const onFromReset = () => {
    from.value = '';
    fromOffice.value = null;
    if (fromValidationTimer) {
        clearTimeout(fromValidationTimer);
        fromValidationTimer = null;
    }
    emit('update:modelValue', { 
        from: '', 
        to: to.value,
        fromAddress: null,
        toAddress: toOffice.value,
        fromLocalityId: null,
        toLocalityId: null
    });
    emit('cityFound', { type: 'from' }); // Очищаем invalid состояние
};

const onToReset = () => {
    to.value = '';
    toOffice.value = null;
    if (toValidationTimer) {
        clearTimeout(toValidationTimer);
        toValidationTimer = null;
    }
    emit('update:modelValue', { 
        from: from.value, 
        to: '',
        fromAddress: fromOffice.value,
        toAddress: null,
        fromLocalityId: null,
        toLocalityId: null
    });
    emit('cityFound', { type: 'to' }); // Очищаем invalid состояние
};

// Метод для смены направлений местами
const swapDirections = () => {
    const tempFrom = from.value;
    const tempTo = to.value;
    const tempFromOffice = fromOffice.value;
    const tempToOffice = toOffice.value;

    // Сохраняем значения в переменные
    const newFrom = tempTo || '';
    const newTo = tempFrom || '';
    const newFromOffice = tempToOffice;
    const newToOffice = tempFromOffice;

    // Обновляем значения
    from.value = newFrom;
    to.value = newTo;
    fromOffice.value = newFromOffice;
    toOffice.value = newToOffice;

    // Эмитим обновленные данные
    emit('update:modelValue', { 
        from: newFrom, 
        to: newTo,
        fromAddress: newFromOffice,
        toAddress: newToOffice,
        fromLocalityId: null,
        toLocalityId: null
    });

    // Обновляем значения в AutocompleteInput после эмита через nextTick
    nextTick(() => {
        if (fromAutocompleteRef.value && newFrom) {
            fromAutocompleteRef.value.setInputValue(newFrom);
        }
        if (toAutocompleteRef.value && newTo) {
            toAutocompleteRef.value.setInputValue(newTo);
        }
    });
};

// Метод для обработки кнопки "Рассчитать"
const handleCalculate = () => {
    if (fromOffice.value && toOffice.value) {
        // Создаем параметры URL
        const params = new URLSearchParams();
        
        // Передаем названия городов
        params.set('from', fromOffice.value.name);
        params.set('to', toOffice.value.name);
        
        window.location.href = `./calculator.html?${params.toString()}`;
    } else {
        alert('Пожалуйста, выберите корректные пункты отправки и назначения');
        emit('calculate', { from: from.value, to: to.value });
    }
};

// Helper to find city by string value (city with region info)
const findCityByValue = (value) => {
    if (!value || !availableCities.value || availableCities.value.length === 0) return null;
    
    // Try to find by exact match of formatted string
    let foundCity = availableCities.value.find(city => {
        const formattedName = formatCityName(city);
        return formattedName === value;
    });
    if (foundCity) return foundCity;

    // If not found by full string, try to find by city name only
    foundCity = availableCities.value.find(city => city.name === value);
    return foundCity || null;
};

// Watch for local changes and emit to parent
watch([from, to], ([newFrom, newTo]) => {
    // Если поле очищено, очищаем соответствующий объект города
    if (!newFrom || newFrom.trim() === '') {
        fromOffice.value = null;
    }
    if (!newTo || newTo.trim() === '') {
        toOffice.value = null;
    }
    
    emit('update:modelValue', { 
        from: newFrom || '', 
        to: newTo || '',
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: null,
        toLocalityId: null
    });
});

// Watch for parent changes and update local state
watch(() => props.modelValue, (newValue) => {
    // Не обновляем значение, если пользователь сейчас вводит текст
    if (isUserTypingFrom || isUserTypingTo) {
        return;
    }
    
    // Проверяем, есть ли изменения в from/to, чтобы не перезаписывать данные без необходимости
    const fromChanged = newValue.from !== from.value;
    const toChanged = newValue.to !== to.value;
    
    if (!fromChanged && !toChanged) {
        return;
    }
    
    // Устанавливаем флаги, чтобы предотвратить циклические обновления
    if (fromChanged) {
        isUpdatingFromInput = true;
        from.value = newValue.from || '';
        nextTick(() => {
            isUpdatingFromInput = false;
        });
    }
    
    if (toChanged) {
        isUpdatingToInput = true;
        to.value = newValue.to || '';
        nextTick(() => {
            isUpdatingToInput = false;
        });
    }
    
    // Ищем соответствующие города из billingAddresses
    fromOffice.value = newValue.fromAddress || findCityByValue(newValue.from);
    toOffice.value = newValue.toAddress || findCityByValue(newValue.to);
}, { deep: true });

// Инициализация fromOffice и toOffice при монтировании, если modelValue уже имеет значения
import { onMounted } from 'vue';
onMounted(() => {
    if (props.modelValue.from) {
        fromOffice.value = findCityByValue(props.modelValue.from);
    }
    if (props.modelValue.to) {
        toOffice.value = findCityByValue(props.modelValue.to);
    }

    // GET-параметры обрабатываются в родительском компоненте (CalculatorPage.vue)
    // Здесь мы только инициализируем fromOffice и toOffice если они уже есть в modelValue
});
</script>