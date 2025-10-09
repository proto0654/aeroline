<template>
  <div class="flex items-start relative">
    <div class="flex items-center h-6 mt-1">
      <input :id="inputId" type="checkbox" v-model="inputValue" :disabled="disabled" :required="required"
        v-bind="$attrs" @blur="handleBlur" />
    </div>
    <label :for="inputId" class="ml-2 select-none">
      <slot>{{ label }}</slot>
    </label>
    <span v-if="errorMessage" class="base-form-error ml-2">{{ errorMessage }}</span>
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

const emit = defineEmits(['update:modelValue']);

const inputId = computed(() => props.id || `checkbox-${props.name}-${Math.random().toString(36).substr(2, 9)}`);

const {
  value: inputValue,
  errorMessage,
  handleBlur
} = useField(props.name);

const modelValue = toRef(props, 'modelValue');

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

const id = inputId;
</script>

<style scoped>
/* Можно добавить стили для кастомного чекбокса */
</style>