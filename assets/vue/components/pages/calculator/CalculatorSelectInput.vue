<template>
    <div>
        <label v-if="label" :for="inputId" class="">
            {{ label }}
        </label>
        <div class="relative">
            <select class="vue-form-field appearance-none w-full bg-white" :id="inputId" :value="modelValue"
                @change="$emit('update:modelValue', $event.target.value)" :disabled="disabled" :required="required"
                v-bind="$attrs" :class="[
                    disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                ]">
                <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <span v-if="required"
                class="text-brand-red absolute right-8 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none">*</span>
            <img src="/assets/img/select-arrow.svg" alt=""
                class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        </div>
        <p v-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        required: true,
        default: () => []
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
    }
});

defineEmits(['update:modelValue']);

// Используем уникальный id для select, если не предоставлен
const inputId = computed(() => props.id || `calc-select-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
</script>

<style scoped>
.vue-form-field {
    padding: 1rem;
    padding-right: 4.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
}

.vue-form-field:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>