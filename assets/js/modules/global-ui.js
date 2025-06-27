import LoginForm from '../../vue/components/forms/LoginForm.vue';
// import { ModalCancelledError } from '../../vue/stores/globalModal.js'; // Больше не нужен

function initGlobalUI() {
  document.addEventListener('DOMContentLoaded', () => {
    // Убедитесь, что globalModalStore доступен. Он должен быть инициализирован global-modal.js
    if (!window.globalModalStore) {
      console.error('globalModalStore не инициализирован. Убедитесь, что assets/vue/entrypoints/global-modal.js загружен.');
      return;
    }
    const globalModal = window.globalModalStore;

    // Обработчик нажатия на кнопку "Войти" (логин)
    const loginButtons = document.querySelectorAll('.open-login-modal-btn');
    if (loginButtons.length > 0) {
      console.log('Кнопка(и) "Войти" найдена(ы).', loginButtons);
      loginButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation(); // Останавливаем распространение события, чтобы избежать закрытия модалки
          console.log('Клик по кнопке "Войти" зарегистрирован.');
          const result = await globalModal.openModal(LoginForm, {
            initialData: { /* Если нужны начальные данные для формы логина */ }
          });
          
          if (result.type === 'success') {
            console.log('Модалка "Вход" закрыта с успешным результатом:', result.data);
            alert(result.data.message);
          } else if (result.type === 'cancelled') {
            console.log('Модалка "Вход" была отменена.');
          } else {
            console.error('Модалка "Вход" закрыта с неизвестным результатом:', result);
          }
        });
      });
    } else {
      console.warn('Кнопки с классом .open-login-modal-btn не найдены на странице.');
    }
  });
}

// Вызываем функцию инициализации сразу после загрузки скрипта
initGlobalUI(); 