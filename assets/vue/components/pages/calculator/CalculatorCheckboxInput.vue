<template>
    <div class="flex items-start relative">
        <div class="flex items-center h-6 mt-1">
            <input :id="inputId" type="checkbox" :checked="modelValue"
                @change="$emit('update:modelValue', $event.target.checked)" :disabled="disabled" :required="required"
                v-bind="$attrs"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        </div>
        <label :for="inputId" class="ml-2 select-none cursor-pointer">
            <slot>{{ label }}</slot>
        </label>
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
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: null
    }
});

defineEmits(['update:modelValue']);

const inputId = computed(() => props.id || `calc-checkbox-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
</script>

<style scoped>
/* Стили для чекбокса уже в классах Tailwind */
</style>