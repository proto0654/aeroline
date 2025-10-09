<template>
    <div>
        <label v-if="label" :for="inputId" class="">
            {{ label }}
        </label>

        <div class="relative text-input-vue">
            <input ref="inputRef"
                class="vue-form-field w-full bg-white focus-visible:outline-gray-200 focus-visible:outline-[1px]"
                :id="inputId" :value="displayValue" @input="handleInput" @focus="handleFocus" @blur="handleBlur"
                :type="inputType" :placeholder="placeholder" :disabled="disabled" :required="required" v-bind="$attrs"
                :class="[
                    disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                ]" />
            <span v-if="required"
                class="text-brand-red absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none">*</span>
        </div>

        <p v-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
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
        type: [String, Number],
        default: ''
    },
    id: {
        type: String,
        default: null
    },
    // Новые props для форматирования
    displayPrefix: {
        type: String,
        default: ''
    },
    displaySuffix: {
        type: String,
        default: ''
    },
    showFormattedWhenBlurred: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const inputRef = ref(null);
const isFocused = ref(false);

// Используем уникальный id для input, если не предоставлен
const inputId = computed(() => props.id || `calc-input-${props.name}-${Math.random().toString(36).substr(2, 9)}`);

// Определяем тип инпута (при фокусе может быть number, при блюре - text для форматирования)
const inputType = computed(() => {
    if (props.showFormattedWhenBlurred && !isFocused.value && props.modelValue) {
        return 'text'; // Для отображения форматированного значения
    }
    return props.type;
});

// Вычисляем отображаемое значение
const displayValue = computed(() => {
    const value = props.modelValue;

    // Если поле в фокусе или нет значения, показываем чистое значение
    if (isFocused.value || !value || !props.showFormattedWhenBlurred) {
        return value;
    }

    // Если поле не в фокусе и есть значение, показываем форматированное
    let formatted = String(value);

    if (props.displayPrefix) {
        formatted = props.displayPrefix + ' ' + formatted;
    }

    if (props.displaySuffix) {
        formatted = formatted + ' ' + props.displaySuffix;
    }

    return formatted;
});

function handleInput(event) {
    let value = event.target.value;

    // Если это число, пытаемся преобразовать в number
    if (props.type === 'number' && value !== '') {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            value = numValue;
        }
    }

    emit('update:modelValue', value);
}

function handleFocus() {
    isFocused.value = true;

    // Дожидаемся обновления значения и устанавливаем курсор в конец
    nextTick(() => {
        if (inputRef.value) {
            inputRef.value.select(); // Выделяем весь текст для удобства редактирования
        }
    });
}

function handleBlur() {
    isFocused.value = false;
}
</script>

<style scoped>
.vue-form-field {
    padding: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
}

.vue-form-field:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>