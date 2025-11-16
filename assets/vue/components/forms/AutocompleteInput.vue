<template>
    <div>
        <label v-if="label" :for="inputId" class="block text-brand-gray font-medium mb-2">
            {{ label }}
        </label>

        <div class="relative w-full">
            <input :id="inputId" ref="inputRef" type="text"
                class="vue-form-field w-full"
                :class="[
                    errorMessage ? 'border-red-500' : '',
                    disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                ]" :placeholder="placeholder" autocomplete="off" :required="required" :disabled="disabled"
                v-model="inputValue" @input="onInput" @focus="onFocus" @keydown="onKeydown" @blur="handleBlur" />

            <button type="button" class="absolute right-0 top-0 h-full w-12 text-gray-400 focus:outline-none z-10"
                @click="onToggleClick" :disabled="disabled"></button>

            <img v-if="!isSpecificOfficeSelected" src="/assets/img/select-arrow.svg" alt=""
                class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10" />

            <button v-if="showResetButton && inputValue && inputValue.trim() && isSpecificOfficeSelected" type="button" @click="resetInput" :class="[
                'absolute top-1/2 -translate-y-1/2 text-brand-blue hover:text-red-500 z-20 bg-white p-2 right-1'
            ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <ul ref="listRef"
                class="absolute w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-20"
                :class="{ 'hidden': !isDropdownVisible }"
                style="max-height: 200px; overflow-y: auto; overscroll-behavior: contain;">
                <li v-for="(item, index) in filteredItems" :key="getItemKey(item, index)"
                    class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    :class="{ 'bg-blue-100': currentIndex === index }" :data-office-id="item.id"
                    @click="selectItem(item)" v-html="formatItemHTML(item)"></li>
            </ul>

            <span v-if="required"
                class="text-brand-red absolute right-8 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none">*</span>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
        <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { formatLocalityName, formatSelectedLocalityName } from '../../utils/localityFormatter.js';
import { useField } from 'vee-validate';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    hint: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: null
    },
    items: {
        type: Array,
        required: true,
        default: () => []
    },
    showResetButton: {
        type: Boolean,
        default: false
    },
    emitFullItem: {
        type: Boolean,
        default: false
    },
    useApiSearch: {
        type: Boolean,
        default: false
    },
    apiSearchFunction: {
        type: Function,
        default: null
    },
    itemFormatter: {
        type: Function,
        default: null
    },
    selectedValueFormatter: {
        type: Function,
        default: null
    }
});

const emit = defineEmits(['update:modelValue', 'itemSelected', 'reset']);

// Уникальный id для input
const inputId = computed(() => props.id || `autocomplete-${props.name}-${Math.random().toString(36).substr(2, 9)}`);

// Refs
const inputRef = ref(null);
const listRef = ref(null);

// State
const isDropdownVisible = ref(false);
const currentIndex = ref(-1);
const selectedItem = ref(null); // Хранит выбранный объект (офис или город)
const apiSearchResults = ref([]);
const isApiSearching = ref(false);

// VeeValidate интеграция
const {
    value: inputValue,
    errorMessage,
    handleBlur
} = useField(props.name);

// Computed для проверки, выбран ли конкретный ПВЗ (офис с ID)
const isSpecificOfficeSelected = computed(() => {
    // Достаточно наличия selectedItem с id в любом режиме
    return selectedItem.value && selectedItem.value.id;
});

// Watchers
watch(() => props.modelValue, (newValue) => {
    if (newValue !== inputValue.value) {
        inputValue.value = newValue;
    }
});

watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);

    // Ищем соответствующий элемент в items для установки selectedItem
    if (newValue && newValue.trim()) {
        const foundItem = props.items.find(item => {
            // Для ПВЗ ищем по отформатированному имени
            if (props.itemFormatter) {
                const formattedName = props.itemFormatter(item);
                return formattedName === newValue.trim();
            }
            
            // Для городов ищем по точному совпадению города
            const cityName = item.name || item.locality || item.city;
            return cityName === newValue.trim();
        });

        if (foundItem) {
            selectedItem.value = foundItem;
        } else {
            selectedItem.value = null;
        }
    } else {
        selectedItem.value = null;
    }
});

// Watch для очистки результатов API поиска при изменении функции поиска
// Важно: computed ref сам по себе не изменяется, но его значение (функция) может измениться
// Поэтому мы сравниваем функции по ссылке, но также очищаем результаты при изменении
watch(() => props.apiSearchFunction, (newFunction, oldFunction) => {
    // Если функция поиска изменилась (новая ссылка), очищаем результаты и выбранный элемент
    if (newFunction !== oldFunction && oldFunction !== null && newFunction !== null) {
        apiSearchResults.value = [];
        selectedItem.value = null;
        isDropdownVisible.value = false;
        
        // Также очищаем значение ввода, если оно было установлено из результатов поиска
        // Это помогает при смене города - поле улицы/дома очищается
        if (inputValue.value && !props.items.find(item => {
            if (props.itemFormatter) {
                return props.itemFormatter(item) === inputValue.value;
            }
            const cityName = item.name || item.locality || item.city;
            return cityName === inputValue.value;
        })) {
            // Значение не найдено в текущих items - возможно, это результат старого поиска
            // Оставляем значение, так как оно может быть введено пользователем
        }
    }
}, { flush: 'post' });

// Computed
const filteredItems = computed(() => {
    const query = inputValue.value?.toLowerCase().trim() || '';

    if (!query) {
        return getUniqueItems();
    }

    // Если используется API поиск, возвращаем результаты API
    if (props.useApiSearch && props.apiSearchFunction) {
        return apiSearchResults.value;
    }

    // Локальный поиск по загруженным данным
    const byCityExact = [];
    const byCityStart = [];
    const byCityInclude = [];
    const byRegion = [];

    props.items.forEach(item => {
        // Handle different item structures (localities vs PVZ)
        const cityName = item.name || item.locality || item.city;
        const regionName = item.region?.name || '';
        const federalDistrict = item.region?.federalDistrict || '';
        
        // For PVZ items, use different search fields
        const pvzType = item.type || '';
        const pvzStreet = item.street || '';
        const pvzHouseNumber = item.houseNumber || '';
        const pvzPhone = item.phone || '';
        
        // Check if this is a PVZ item (has type field)
        if (pvzType) {
            const typeLower = pvzType.toLowerCase();
            const streetLower = pvzStreet.toLowerCase();
            const houseLower = pvzHouseNumber.toLowerCase();
            const phoneLower = pvzPhone.toLowerCase();
            
            // Create combined search string for PVZ
            const combinedString = `${typeLower} ${streetLower} ${houseLower} ${phoneLower}`.trim();
            
            // Check for matches in PVZ fields
            const typeExact = typeLower === query;
            const typeStart = typeLower.startsWith(query);
            const typeInclude = typeLower.includes(query);
            const streetMatch = streetLower.includes(query);
            const houseMatch = houseLower.includes(query);
            const phoneMatch = phoneLower.includes(query);
            const combinedMatch = combinedString.includes(query);
            
            // PVZ search priority: type exact > type start > type include > other fields
            if (typeExact) {
                byCityExact.push(item);
            } else if (typeStart) {
                byCityStart.push(item);
            } else if (typeInclude || streetMatch || houseMatch || phoneMatch || combinedMatch) {
                byCityInclude.push(item);
            }
            return;
        }
        
        // Original locality search logic
        if (!cityName) return;

        const cityLower = cityName.toLowerCase();
        const regionLower = regionName.toLowerCase();
        const federalLower = federalDistrict.toLowerCase();

        // Создаем комбинированную строку для поиска
        const combinedString = `${cityLower} ${regionLower} ${federalLower}`.trim();

        // Проверяем все поля одновременно для более гибкого поиска
        const cityExact = cityLower === query;
        const cityStart = cityLower.startsWith(query);
        const cityInclude = cityLower.includes(query);
        const regionMatch = regionLower.includes(query);
        const federalMatch = federalLower.includes(query);
        const combinedMatch = combinedString.includes(query);

        // Точное совпадение города - приоритет 1
        if (cityExact) {
            byCityExact.push(item);
        }
        // Город начинается с запроса - приоритет 2
        else if (cityStart) {
            byCityStart.push(item);
        }
        // Город содержит запрос - приоритет 3
        else if (cityInclude) {
            byCityInclude.push(item);
        }
        // Регион, федеральный округ или комбинированная строка содержит запрос - приоритет 4
        else if (regionMatch || federalMatch || combinedMatch) {
            byRegion.push(item);
        }
    });

    return [...byCityExact, ...byCityStart, ...byCityInclude, ...byRegion];
});

// Helper functions
const getUniqueItems = () => {
    // Возвращаем все элементы без фильтрации по уникальности
    // Потому что города с одинаковыми названиями могут быть из разных регионов
    return props.items.filter(item => {
        // Handle different item structures (localities vs PVZ)
        const cityName = item.name || item.locality || item.city;
        const pvzType = item.type; // For PVZ items
        
        // For PVZ items, check if they have a type (office type)
        if (pvzType) {
            return pvzType && pvzType.trim() !== '';
        }
        
        // For locality items, check city name
        return cityName && cityName.trim() !== '';
    });
};

const formatItemToString = (item) => {
    if (props.itemFormatter) {
        return props.itemFormatter(item);
    }
    return formatLocalityName(item);
};

const formatSelectedValue = (item) => {
    if (props.selectedValueFormatter) {
        return props.selectedValueFormatter(item);
    }
    return formatSelectedLocalityName(item);
};

const formatItemHTML = (item) => {
    const formattedText = formatItemToString(item);
    return `
        <div style="line-height:1.3; padding:2px 0;">
            <div>${formattedText}</div>
        </div>
    `;
};

const getItemKey = (item, index) => {
    return `${item.locality || item.city || ''}-${item.street || item.address || ''}-${index}`;
};

// API поиск
const performApiSearch = async (query) => {
    if (!props.apiSearchFunction) {
        apiSearchResults.value = [];
        return;
    }

    // Пустой запрос разрешен - это означает показать все опции
    const searchQuery = query || '';

    isApiSearching.value = true;
    try {
        const results = await props.apiSearchFunction(searchQuery);
        apiSearchResults.value = results || [];
    } catch (error) {
        console.error('Ошибка API поиска:', error);
        apiSearchResults.value = [];
    } finally {
        isApiSearching.value = false;
    }
};

// Debounced API поиск
let searchTimeout = null;
const debouncedApiSearch = (query) => {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
        performApiSearch(query);
    }, 300); // 300ms задержка
};

// Event handlers
const onInput = () => {
    const value = inputValue.value?.trim() || '';
    currentIndex.value = -1;

    // При ручном вводе сбрасываем выбранный объект
    selectedItem.value = null;

    // Если используется API поиск, выполняем поиск через API
    if (props.useApiSearch && props.apiSearchFunction) {
        if (value) {
            // Есть текст - выполняем поиск с задержкой
            debouncedApiSearch(value);
        } else {
            // Пустое поле - показываем все опции (поиск с пустым запросом)
            performApiSearch('');
        }
        isDropdownVisible.value = true;
        return;
    }

    // Локальный поиск
    if (!value) {
        // Пустое поле - показываем все опции
        isDropdownVisible.value = true;
        return;
    }

    if (filteredItems.value.length === 0) {
        isDropdownVisible.value = false;
        return;
    }

    isDropdownVisible.value = true;
};

const onFocus = () => {
    const value = inputValue.value?.trim() || '';
    
    // Если используется API поиск, показываем все опции при фокусе
    if (props.useApiSearch && props.apiSearchFunction) {
        if (!value) {
            // Пустое поле - загружаем все опции
            performApiSearch('');
        } else {
            // Есть значение - показываем результаты поиска если они есть
            if (apiSearchResults.value.length > 0) {
                isDropdownVisible.value = true;
                return;
            }
            // Если результатов нет, выполняем поиск
            performApiSearch(value);
        }
        isDropdownVisible.value = true;
        return;
    }

    // Локальный поиск - показываем все опции при фокусе на пустое поле
    if (!value) {
        isDropdownVisible.value = true;
        return;
    }

    // Есть значение - показываем отфильтрованные результаты
    if (filteredItems.value.length > 0) {
        isDropdownVisible.value = true;
    }
};

const onToggleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.disabled) return;

    // Если элемент уже выбран, не показываем выпадающий список
    if (isSpecificOfficeSelected.value) return;

    if (isDropdownVisible.value) {
        isDropdownVisible.value = false;
    } else {
        showAllSuggestions();
    }
};

const showAllSuggestions = () => {
    currentIndex.value = -1;
    
    // Если используется API поиск, загружаем все опции
    if (props.useApiSearch && props.apiSearchFunction) {
        const value = inputValue.value?.trim() || '';
        if (value) {
            // Есть текст - выполняем поиск с этим текстом
            performApiSearch(value);
        } else {
            // Пустое поле - загружаем все опции
            performApiSearch('');
        }
    }
    
    isDropdownVisible.value = true;
};

const selectItem = (item) => {
    inputValue.value = formatSelectedValue(item);
    selectedItem.value = item; // Сохраняем выбранный объект
    isDropdownVisible.value = false;

    // Всегда диспатчим событие выбора элемента асинхронно через Promise
    Promise.resolve().then(() => {
        if (props.emitFullItem) {
            emit('itemSelected', item);
        } else {
            emit('itemSelected', { city: item.locality || item.city });
        }
    });
};

// Добавляем метод для выбора элемента по ID (для GET-параметров)
const selectItemById = (id) => {
    const item = props.items.find(office => office.id === parseInt(id));
    if (item) {
        selectItem(item);
        return true;
    }
    return false;
};

// Метод для установки значения ввода извне
const setInputValue = (value) => {
    inputValue.value = value;
    isDropdownVisible.value = false;
    currentIndex.value = -1;
};

// Expose методы для использования из родительского компонента
defineExpose({
    selectItemById,
    setInputValue
});

const onKeydown = (e) => {
    const items = listRef.value?.querySelectorAll('li') || [];

    if (!isDropdownVisible.value || items.length === 0) {
        if (e.key === 'ArrowDown' && inputValue.value?.trim() === '') {
            e.preventDefault();
            showAllSuggestions();
            return;
        }
        return;
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex.value = (currentIndex.value + 1) % items.length;
        highlightItem(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex.value = (currentIndex.value - 1 + items.length) % items.length;
        highlightItem(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentIndex.value >= 0 && currentIndex.value < filteredItems.value.length) {
            const item = filteredItems.value[currentIndex.value];
            if (item) selectItem(item);
        }
    } else if (e.key === 'Escape') {
        e.preventDefault();
        isDropdownVisible.value = false;
    }
};

const highlightItem = (items) => {
    // Прокрутка до выделенного элемента, если он не виден
    if (currentIndex.value >= 0 && listRef.value) {
        const selectedItem = items[currentIndex.value];
        const listRect = listRef.value.getBoundingClientRect();
        const itemRect = selectedItem.getBoundingClientRect();

        if (itemRect.bottom > listRect.bottom) {
            // Если элемент ниже видимой области - прокручиваем вниз
            selectedItem.scrollIntoView(false);
        } else if (itemRect.top < listRect.top) {
            // Если элемент выше видимой области - прокручиваем вверх
            selectedItem.scrollIntoView(true);
        }
    }
};

// Global click handler
const handleGlobalClick = (e) => {
    if (!listRef.value || !inputRef.value) return;

    if (!listRef.value.contains(e.target) &&
        e.target !== inputRef.value &&
        !e.target.closest('.absolute.right-0.top-0')) {
        isDropdownVisible.value = false;
    }
};

const resetInput = () => {
    inputValue.value = '';
    selectedItem.value = null; // Сбрасываем выбранный объект
    emit('update:modelValue', '');
    emit('reset');
};

onMounted(() => {
    document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleGlobalClick);
});
</script>

<style scoped>
.vue-form-field {
  border: 1px solid #e5e7eb; /* border-gray-200 */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 0.75rem 1rem; /* px-4 py-3 */
  font-size: inherit;
  background-color: white;
  color: #6b7280; /* text-body-secondary */
  font-family: inherit;
  height: 3rem;
  width: 100%;
  transition: border-color 0.2s ease-in-out;
}

.vue-form-field:focus {
  outline: none;
  border-color: #008dd2; /* brand-blue */
  box-shadow: 0 0 0 2px rgba(0, 141, 210, 0.1);
}

.vue-form-field::placeholder {
  color: #9ca3af; /* gray-400 */
}

.vue-form-field:disabled {
  background-color: #f3f4f6; /* gray-100 */
  cursor: not-allowed;
  color: #9ca3af; /* gray-400 */
}

.base-form-error {
    color: #ef4444;
    /* red-500 */
    font-size: 0.875rem;
    /* text-sm */
    margin-top: 0.25rem;
    /* mt-1 */
}
</style>