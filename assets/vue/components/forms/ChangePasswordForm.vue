<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import TextInput from './TextInput.vue';

const emit = defineEmits(['close', 'success']);

// Схема валидации для пароля
const schema = yup.object({
  currentPassword: yup.string().required('Текущий пароль обязателен'),
  newPassword: yup.string().required('Новый пароль обязателен').min(6, 'Пароль должен быть не менее 6 символов'),
  confirmPassword: yup.string()
    .required('Подтверждение пароля обязательно')
    .oneOf([yup.ref('newPassword'), null], 'Пароли не совпадают'),
});

// Инициализация формы с VeeValidate
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

// Обработчик отправки формы
const onSubmit = handleSubmit(values => {
  console.log('Форма изменения пароля отправлена:', values);
  // Здесь будет логика отправки данных на сервер
  // После успешной отправки, можно закрыть модалку и передать результат
  emit('success', { success: true, message: 'Пароль успешно изменен!' });
  emit('close'); // Закрыть модалку после успешного изменения
  resetForm();
});

// Обработчик кнопки отмены
const onCancel = () => {
  emit('close');
};
</script>

<template>
  <div class="modal-content p-6">
    <h3 class="text-h4 font-bold text-brand-gray mb-4">Изменить Пароль</h3>
    
    <form @submit.prevent="onSubmit" class="space-y-4">
      <TextInput
        name="currentPassword"
        label="Текущий пароль"
        placeholder="••••••••"
        type="password"
        :required="true"
        autocomplete="current-password"
      />
      <TextInput
        name="newPassword"
        label="Новый пароль"
        placeholder="••••••••"
        type="password"
        :required="true"
        autocomplete="new-password"
      />
      <TextInput
        name="confirmPassword"
        label="Подтвердите новый пароль"
        placeholder="••••••••"
        type="password"
        :required="true"
        autocomplete="new-password"
      />
      <div class="flex justify-end gap-3">
        <button type="button" @click="onCancel" class="px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors">
          Отмена
        </button>
        <button type="submit" class="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template> 