<template>
  <div>
    <label v-if="label" :for="inputId" class="">
      {{ label }}
    </label>
    <div class="relative w-full">
      <select class="vue-form-field appearance-none w-full" :id="inputId" v-model="inputValue" :disabled="disabled"
        :required="required" v-bind="$attrs" @blur="handleBlur" :class="[
          errorMessage ? 'border-red-500' : '',
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
    <p v-if="errorMessage" class="base-form-error">{{ errorMessage }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed, toRef, watch } from 'vue';
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

const emit = defineEmits(['update:modelValue']);

// Используем уникальный id для select, если не предоставлен
const inputId = computed(() => props.id || `select-${props.name}-${Math.random().toString(36).substr(2, 9)}`);

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

.vue-form-field.appearance-none {
  padding-right: 4.5rem;
}
</style>