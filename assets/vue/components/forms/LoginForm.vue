<script setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import TextInput from './TextInput.vue';
import BaseForm from './BaseForm.vue';
import { useAuthStore } from '../../stores/auth.js';

const emit = defineEmits(['close', 'success']);

// Получаем auth store (используем глобальную Pinia через window.pinia)
let authStore;
if (window.pinia) {
  authStore = useAuthStore();
} else {
  console.warn('Pinia не инициализирована. Auth store недоступен.');
}

// Схема валидации
const schema = yup.object({
  email: yup.string().required('Email обязателен').email('Неверный формат email'),
  password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен быть не менее 6 символов'),
});

// Инициализация формы с VeeValidate
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const errorMessage = ref('');

// Обработчик отправки формы
const onSubmit = handleSubmit(async (values) => {
  if (!authStore) {
    errorMessage.value = 'Ошибка инициализации. Перезагрузите страницу.';
    return;
  }

  errorMessage.value = '';
  
  try {
    await authStore.login(values.email, values.password);
    emit('success', { 
      success: true, 
      message: 'Вход выполнен успешно!',
      user: authStore.user
    });
    emit('close');
    resetForm();
  } catch (error) {
    errorMessage.value = error.message || 'Ошибка при входе в систему';
  }
});

const onCancel = () => {
  emit('close');
};
</script>

<template>
  <div class="modal-content p-6">
    <h3 class="text-h4 font-bold text-brand-gray mb-4">Вход в систему</h3>
    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
      {{ errorMessage }}
    </div>
    <BaseForm
      :validation-schema="schema"
      :on-submit="onSubmit"
      submit-button-text="Войти"
      @cancel="onCancel"
    >
      <TextInput
        name="email"
        label="Email"
        placeholder="example@email.com"
        type="email"
        :required="true"
        autocomplete="username"
      />
      <TextInput
        name="password"
        label="Пароль"
        placeholder="••••••••"
        type="password"
        :required="true"
        autocomplete="current-password"
      />
      <template #actions="{ isSubmitting, isValid, reset }">
        <div class="flex justify-end gap-3">
          <button type="button" @click="onCancel" class="px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors">
            Отмена
          </button>
          <button 
            type="submit" 
            :disabled="isSubmitting || !isValid" 
            class="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Войти
            <span v-if="isSubmitting" class="ml-2 inline-block animate-spin">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </button>
        </div>
      </template>
    </BaseForm>
  </div>
</template> 