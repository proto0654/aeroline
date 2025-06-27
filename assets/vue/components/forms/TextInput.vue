<template>
  <div>
    <label 
      v-if="label" 
      :for="inputId" 
      class=""
    >
      {{ label }}
    </label>
    
    <div class="relative">
      <input
        class="vue-form-field"
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        v-bind="$attrs"
        @blur="handleBlur"
        :class="[
          errorMessage ? 'border-red-500' : '',
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        ]"
      />
      <span 
        v-if="required" 
        class="text-brand-red absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
      >*</span>
    </div>
    
    <p v-if="errorMessage" class="base-form-error">{{ errorMessage }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch, toRef } from 'vue';
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
  }
});

const emit = defineEmits(['update:modelValue']);

// Используем уникальный id для input, если не предоставлен
const inputId = computed(() => props.id || `input-${props.name}-${Math.random().toString(36).substr(2, 9)}`);

// Используем VeeValidate для валидации
const {
  value: inputValue,
  errorMessage,
  handleBlur
} = useField(props.name);

const modelValue = toRef(props, 'modelValue');

// Синхронизация с внешним v-model
watch(modelValue, (newValue) => {
  if (newValue !== inputValue.value) {
    inputValue.value = newValue;
  }
});

watch(inputValue, (newValue) => {
  if (newValue !== modelValue.value) {
    emit('update:modelValue', newValue);
  }
});

// Определяем, показана ли метка (для отображения звездочки)
// const labelShown = computed(() => !!props.label);
</script>

<style scoped>
.vue-form-field {
  padding-right: 2.5rem;
}
</style> 