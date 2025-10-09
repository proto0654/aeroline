import { createApp } from 'vue';
import SenderReceiverModal from '../components/modals/SenderReceiverModal.vue';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal.vue';
import { modalManager } from '../../js/modules/modal-manager.js';

// Инициализация Vue приложений для модальных окон

// Создание/редактирование карточки
const createEditContainer = document.getElementById('vue-sender-receiver-modal');
if (createEditContainer) {
  const app = createApp(SenderReceiverModal, {
    modalId: 'vue-create-edit-modal'
  });
  
  // Глобальная настройка, если необходима
  
  // Монтируем приложение
  const vm = app.mount(createEditContainer);
  
  // Экспортируем методы для взаимодействия с модальным окном из JS
  window.senderReceiverModalVue = {
    // Открытие модального окна для создания
    openCreateModal: () => {
      vm.isEdit = false;
      vm.initialData = {};
      modalManager.open(document.getElementById('vue-create-edit-modal'));
    },
    
    // Открытие модального окна для редактирования
    openEditModal: (data) => {
      vm.isEdit = true;
      vm.initialData = data;
      modalManager.open(document.getElementById('vue-create-edit-modal'));
    }
  };
}

// Модальное окно подтверждения удаления
const deleteContainer = document.getElementById('vue-delete-confirm-modal');
if (deleteContainer) {
  const app = createApp(DeleteConfirmModal, {
    modalId: 'vue-delete-confirm-modal'
  });
  
  // Монтируем приложение
  const vm = app.mount(deleteContainer);
  
  // Экспортируем методы для взаимодействия с модальным окном из JS
  window.deleteConfirmModalVue = {
    // Открытие модального окна для подтверждения удаления
    openDeleteModal: (item) => {
      vm.title = 'Удаление карточки';
      vm.message = `Вы уверены, что хотите удалить карточку ${item.name}?`;
      vm.itemId = item.id;
      modalManager.open(document.getElementById('vue-delete-confirm-modal'));
    }
  };
} 