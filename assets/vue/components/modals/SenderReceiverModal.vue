<template>
  <div :id="modalId" class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-box max-w-md bg-brand-light min-h-[300px] overflow-y-auto">
      <button class="modal-close absolute right-4 top-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow" 
        aria-label="Закрыть" @click="closeModal">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 6l8 8M6 14L14 6" stroke-linecap="round"/>
        </svg>
      </button>
      
      <div class="modal-content">
        <h3 class="text-h5 font-bold text-brand-gray mb-4">
          {{ isEdit ? 'Редактировать карточку' : 'Создать новую карточку' }}
        </h3>
        
        <CreateSenderReceiverForm
          :initial-data="initialData"
          :is-edit="isEdit"
          @submit="handleSubmit"
          @cancel="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CreateSenderReceiverForm from '../forms/CreateSenderReceiverForm.vue';

const props = defineProps({
  modalId: {
    type: String,
    default: 'sender-receiver-modal'
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['submit', 'close']);

// Обработчик отправки формы
const handleSubmit = (values) => {
  emit('submit', values);
  closeModal();
};

// Закрытие модального окна
const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Add any specific styles for this page if necessary */
</style> 