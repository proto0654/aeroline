import { createApp } from 'vue';
import EmailSendModal from '../components/modals/EmailSendModal.vue';
import { modalManager } from '../../js/modules/modal-manager.js';

// Инициализация Vue приложения для модального окна отправки email
const emailSendContainer = document.getElementById('vue-email-send-modal');
if (emailSendContainer) {
  const app = createApp(EmailSendModal, {
    modalId: 'vue-email-send-modal'
  });
  
  // Монтируем приложение
  const vm = app.mount(emailSendContainer);
  
  // Экспортируем методы для взаимодействия с модальным окном из JS
  window.emailSendModalVue = {
    // Открытие модального окна для отправки email
    openModal: (actId, initialData = {}) => {
      vm.actId = actId;
      vm.initialData = initialData;
      modalManager.open(document.getElementById('vue-email-send-modal'));
    }
  };
} 