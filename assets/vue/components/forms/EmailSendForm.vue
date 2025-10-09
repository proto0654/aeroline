<template>
  <BaseForm
    class="vue-form"
    :validation-schema="emailSendSchema"
    :initial-values="initialValues"
    :on-submit="handleSubmit"
    :submit-button-text="'Отправить'"
    @cancel="$emit('cancel')"
  >
    <template v-slot="{ errors, values }">
      <TextInput
        class="vue-form-field"
        name="email"
        label="Email"
        placeholder="Введите email для отправки"
        required
        type="email"
      />
      
      <TextareaInput
        class="vue-form-field"
        name="message"
        label="Комментарий"
        placeholder="Введите комментарий к письму"
        rows="4"
      />
    </template>
  </BaseForm>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as yup from 'yup';
import BaseForm from './BaseForm.vue';
import TextInput from './TextInput.vue';
import TextareaInput from './TextareaInput.vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['submit', 'cancel']);

// Схема валидации для формы отправки email
const emailSendSchema = yup.object({
  email: yup.string().required('Введите email').email('Введите корректный email'),
  message: yup.string()
});

// Значения по умолчанию
const defaultValues = {
  email: '',
  message: ''
};

// Начальные значения формы
const initialValues = computed(() => {
  return { ...defaultValues, ...props.initialData };
});

// Обработчик отправки формы
const handleSubmit = async (values) => {
  try {
    // Эмитируем событие submit с данными формы
    emit('submit', values);
    
    // Имитируем успешный ответ от сервера
    return {
      success: true,
      message: 'Письмо успешно отправлено!',
      data: values,
      resetAfterSubmit: true // Сбрасываем форму после отправки
    };
  } catch (error) {
    // Перебрасываем ошибку для обработки в BaseForm
    throw new Error(error?.message || 'Произошла ошибка при отправке письма');
  }
};
</script> 