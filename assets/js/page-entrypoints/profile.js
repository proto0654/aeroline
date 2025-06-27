import { initProfilePage } from '../modules/profile-page.js';
// import { useGlobalModalStore } from '../../vue/stores/globalModal.js'; // Удаляем импорт для глобального стора модальных окон
import EditEmailForm from '../../vue/components/forms/EditEmailForm.vue';
import ChangePasswordForm from '../../vue/components/forms/ChangePasswordForm.vue';
 
document.addEventListener('DOMContentLoaded', () => {
  initProfilePage();
  
  const globalModal = window.globalModalStore; // Используем глобальный экземпляр

  const editEmailButton = document.querySelector('.open-edit-email-modal-btn');
  if (editEmailButton) {
    editEmailButton.addEventListener('click', async () => {
      console.log('Клик по кнопке "Изменить email" зарегистрирован.');
      try {
        const result = await globalModal.openModal(EditEmailForm);
        console.log('Модалка "Изменить Email" закрыта с результатом:', result);
        if (result && result.success) {
          alert(result.message);
        }
      } catch (error) {
        console.error('Модалка "Изменить Email" была отменена или произошла ошибка:', error.message);
      }
    });
  } else {
    console.warn('Кнопка с классом .open-edit-email-modal-btn не найдена на странице.');
  }

  const changePasswordButton = document.querySelector('.open-change-password-modal-btn');
  if (changePasswordButton) {
    changePasswordButton.addEventListener('click', async () => {
      console.log('Клик по кнопке "Изменить пароль" зарегистрирован.');
      try {
        const result = await globalModal.openModal(ChangePasswordForm);
        console.log('Модалка "Изменить Пароль" закрыта с результатом:', result);
        if (result && result.success) {
          alert(result.message);
        }
      } catch (error) {
        console.error('Модалка "Изменить Пароль" была отменена или произошла ошибка:', error.message);
      }
    });
  } else {
    console.warn('Кнопка с классом .open-change-password-modal-btn не найдена на странице.');
  }
}); 