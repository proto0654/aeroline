<template>
    <div>
        <label v-if="label" :for="inputId" class="">
            {{ label }}
        </label>

        <div class="relative w-full">
            <input :id="inputId" ref="inputRef" type="text"
                class="rounded-lg border border-gray-200 px-4 py-3 w-full focus:outline-none text-body-secondary focus:border-gray!"
                :class="[
                    errorMessage ? 'border-red-500' : '',
                    disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                ]" :placeholder="placeholder" autocomplete="off" :required="required" :disabled="disabled"
                v-model="inputValue" @input="onInput" @focus="onFocus" @keydown="onKeydown" @blur="handleBlur" />

            <button type="button" class="absolute right-0 top-0 h-full w-12 text-gray-400 focus:outline-none z-10"
                @click="onToggleClick" :disabled="disabled"></button>

            <img v-if="!isSpecificOfficeSelected" src="/assets/img/select-arrow.svg" alt=""
                class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10" />

            <button v-if="showResetButton && inputValue" type="button" @click="resetInput" :class="[
                'absolute top-1/2 -translate-y-1/2 text-brand-blue hover:text-red-500 z-20 bg-white p-2',
                isSpecificOfficeSelected ? 'right-1' : 'right-8'
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
                    :class="{ 'bg-blue-100': currentIndex === index }" @click="selectItem(item)"
                    v-html="formatItemHTML(item)"></li>
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
    onlyCities: {
        type: Boolean,
        default: false
    },
    showResetButton: {
        type: Boolean,
        default: false
    },
    emitFullItem: {
        type: Boolean,
        default: false
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

// VeeValidate интеграция
const {
    value: inputValue,
    errorMessage,
    handleBlur
} = useField(props.name);

// Computed для проверки, выбран ли конкретный ПВЗ (офис с ID)
const isSpecificOfficeSelected = computed(() => {
    return selectedItem.value && selectedItem.value.id && selectedItem.value.address;
});

// Watchers
watch(() => props.modelValue, (newValue) => {
    if (newValue !== inputValue.value) {
        inputValue.value = newValue;
    }
});

watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
});

// Computed
const filteredItems = computed(() => {
    const query = inputValue.value?.toLowerCase().trim() || '';

    if (!query) {
        return getUniqueItems();
    }

    if (props.onlyCities) {
        // В режиме только городов фильтруем только по названию города
        const byCityStart = new Map();
        const byCityInclude = new Map();

        // Сначала собираем все уникальные города
        const uniqueCities = new Map();
        props.items.forEach(item => {
            if (item.city) {
                const cityName = item.city.trim();
                const cityLower = cityName.toLowerCase();
                if (!uniqueCities.has(cityLower)) {
                    uniqueCities.set(cityLower, item);
                }
            }
        });

        // Теперь фильтруем уникальные города
        uniqueCities.forEach((item, cityLower) => {
            if (cityLower.startsWith(query)) {
                byCityStart.set(cityLower, item);
            } else if (cityLower.includes(query)) {
                byCityInclude.set(cityLower, item);
            }
        });

        return [...byCityStart.values(), ...byCityInclude.values()];
    }

    const byCityStart = [];
    const byCityInclude = [];
    const byOther = [];

    props.items.forEach(item => {
        if (item.city && item.city.toLowerCase().startsWith(query)) {
            byCityStart.push(item);
        } else if (item.city && item.city.toLowerCase().includes(query)) {
            byCityInclude.push(item);
        } else if (
            (item.address && item.address.toLowerCase().includes(query)) ||
            (item.type && item.type.toLowerCase().includes(query)) ||
            (item.phone && item.phone.toLowerCase().includes(query))
        ) {
            byOther.push(item);
        }
    });

    return [...byCityStart, ...byCityInclude, ...byOther];
});

// Helper functions
const getUniqueItems = () => {
    if (props.onlyCities) {
        const uniqueCities = new Map();
        props.items.forEach(item => {
            if (item.city) {
                const cityName = item.city.trim();
                const cityLower = cityName.toLowerCase();
                if (!uniqueCities.has(cityLower)) {
                    uniqueCities.set(cityLower, item);
                }
            }
        });
        return [...uniqueCities.values()];
    }
    return props.items; // По умолчанию показываем все офисы
};

const formatItemToString = (item) => {
    if (props.onlyCities) {
        return item.city || '';
    }
    return `${item.city || ''}${item.address ? ', ' + item.address : ''}${item.phone ? ', ' + item.phone : ''}`;
};

const formatItemHTML = (item) => {
    if (props.onlyCities) {
        return `
            <div style="line-height:1.3; padding:2px 0;">
                <div style="font-weight:bold;">${item.city || ''}</div>
            </div>
        `;
    }
    return `
        <div style="line-height:1.3; padding:2px 0;">
            <div style="font-weight:bold;">${item.city || ''}</div>
            <div>${item.address || ''}</div>
            <div style="color:#888; font-size:0.95em;">${item.type || ''}</div>
            <div style="color:#008DD2; font-size:0.98em;">${item.phone || ''}</div>
        </div>
    `;
};

const getItemKey = (item, index) => {
    return `${item.city || ''}-${item.address || ''}-${index}`;
};

// Event handlers
const onInput = () => {
    const value = inputValue.value?.trim() || '';
    currentIndex.value = -1;

    // При ручном вводе сбрасываем выбранный объект
    selectedItem.value = null;

    if (!value) {
        isDropdownVisible.value = false;
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
    if (!value) return;

    if (filteredItems.value.length > 0) {
        isDropdownVisible.value = true;
    }
};

const onToggleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.disabled) return;

    if (isDropdownVisible.value) {
        isDropdownVisible.value = false;
    } else {
        showAllSuggestions();
    }
};

const showAllSuggestions = () => {
    currentIndex.value = -1;
    isDropdownVisible.value = true;
};

const selectItem = (item) => {
    inputValue.value = formatItemToString(item);
    selectedItem.value = item; // Сохраняем выбранный объект
    isDropdownVisible.value = false;

    // Всегда диспатчим событие выбора элемента асинхронно через Promise
    Promise.resolve().then(() => {
        if (props.emitFullItem) {
            emit('itemSelected', item);
        } else {
            emit('itemSelected', { city: item.city });
        }
    });
};

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
    padding-right: 2.5rem;
    width: 100%;
    border-width: 1px;
    border-radius: 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
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