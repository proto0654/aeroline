<template>
  <!-- Удалена внешняя структура модального окна, она теперь управляется GlobalModalHost -->
  <div class="modal-content">
    <h3 class="text-h4 font-bold text-brand-gray mb-4">Отправить по email</h3>
    <p class="text-body-secondary text-brand-gray mb-6">Введите email для отправки акта выполненных работ</p>
    
    <EmailSendForm
      :initial-data="initialData"
      @submit="handleSubmit"
      @cancel="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { modalManager } from '../../../js/modules/modal-manager.js'; // Удаляем импорт modalManager
import EmailSendForm from '../forms/EmailSendForm.vue';

const props = defineProps({
  // modalId: { // Удаляем prop modalId
  //   type: String,
  //   default: 'email-send-modal'
  // },
  initialData: {
    type: Object,
    default: () => ({})
  },
  actId: {
    type: [String, Number],
    default: null
  }
});

const emit = defineEmits(['submit', 'close', 'cancel']); // Добавляем 'cancel' для явного эмита

// Обработчик отправки формы
const handleSubmit = (values) => {
  // Добавляем id акта к данным
  const submitData = {
    ...values,
    actId: props.actId
  };
  
  emit('submit', submitData);
  
  // Не закрываем модальное окно сразу, чтобы пользователь увидел сообщение об успехе
  // setTimeout(() => {
  //   closeModal();
  // }, 3000); // Удаляем setTimeout и вызов closeModal
};

// Закрытие модального окна - теперь просто эмит события
const closeModal = () => {
  // modalManager.close(document.getElementById(props.modalId)); // Удаляем вызов modalManager
  emit('cancel'); // Эмитируем событие cancel
};

// Инициализация модального окна - теперь не нужна, так как управляется GlobalModalHost
// onMounted(() => {
//   const modalElement = document.getElementById(props.modalId);
  
//   if (modalElement) {
//     if (!modalElement.dataset.initialized) {
//       modalElement.dataset.initialized = 'true';
//     }
//   }
// });
</script> 