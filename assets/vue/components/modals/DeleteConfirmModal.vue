<template>
  <!-- Удалена внешняя структура модального окна, она теперь управляется GlobalModalHost -->
  <div class="modal-content">
    <div class="mb-4 text-center">
      <svg class="w-12 h-12 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
    </div>
    
    <h3 class="text-h5 font-bold text-brand-gray mb-2 text-center">{{ title }}</h3>
    <p class="text-body-secondary text-brand-gray mb-4 text-center">
      {{ message }}
    </p>
    
    <form class="form space-y-4" @submit.prevent="handleSubmit">
      <div class="flex gap-3">
        <button 
          type="button" 
          class="flex-1 px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors"
          @click="emit('cancel')"
        >
          Отмена
        </button>
        <button 
          type="submit" 
          class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          :disabled="isSubmitting"
        >
          {{ submitButtonText }}
          <span v-if="isSubmitting" class="ml-2 inline-block animate-spin">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Удаление'
  },
  message: {
    type: String,
    default: 'Вы уверены, что хотите удалить этот элемент?'
  },
  submitButtonText: {
    type: String,
    default: 'Удалить'
  },
  item: {
    type: [Object, Array],
    required: true,
    default: () => ({})
  }
});

const emit = defineEmits(['submit', 'cancel']);
const isSubmitting = ref(false);

// Обработчик подтверждения удаления
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    // Имитация успешного удаления. В реальном приложении здесь будет API запрос.
    // Результат передается обратно через emit('submit', ...)
    const result = { success: true, data: props.item }; // Передаем item(s) обратно для обработки в родителе
    emit('submit', result);

    // Небольшая задержка для имитации запроса на сервер
    await new Promise(resolve => setTimeout(resolve, 500));

  } catch (error) {
    console.error('Ошибка при удалении:', error);
    // Возможно, emit('submit', { success: false, error: error }); при реальной ошибке
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Add any specific styles for this modal if necessary */
</style> 