<template>
  <div>
    <label v-if="label" :for="inputId" class="">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        v-model="inputValue"
        type="tel"
        :placeholder="placeholder || '+7 (___) ___-__-__'"
        :disabled="disabled"
        :required="required"
        class="vue-form-field"
        v-bind="$attrs"
        @input="onInput"
        @blur="handleBlur"
        :class="[
          errorMessage ? 'border-red-500' : '',
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        ]"
      />
      <span v-if="required" class="text-brand-red absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none">*</span>
    </div>
    <p v-if="errorMessage" class="base-form-error">{{ errorMessage }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed, toRef, watch } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  id: { type: String, default: null }
});

const emit = defineEmits(['update:modelValue']);
const inputId = computed(() => props.id || `phone-${props.name}-${Math.random().toString(36).substr(2, 9)}`);

const { value: inputValue, errorMessage, handleBlur } = useField(props.name);
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

function onInput(e) {
  // Простая маска для телефона: +7 (___) ___-__-__
  let v = e.target.value.replace(/\D/g, '');
  if (v.startsWith('8')) v = '7' + v.slice(1);
  if (v.length > 1) v = '+' + v;
  if (v.length > 2) v = v.slice(0, 2) + ' (' + v.slice(2);
  if (v.length > 7) v = v.slice(0, 7) + ') ' + v.slice(7);
  if (v.length > 12) v = v.slice(0, 12) + '-' + v.slice(12);
  if (v.length > 15) v = v.slice(0, 15) + '-' + v.slice(15, 17);
  v = v.slice(0, 17);
  inputValue.value = v;
}
</script>

<style scoped>
.vue-form-field {
  padding-right: 2.5rem;
}
</style> 