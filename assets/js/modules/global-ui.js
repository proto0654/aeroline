import LoginForm from '../../vue/components/forms/LoginForm.vue';
// import { ModalCancelledError } from '../../vue/stores/globalModal.js'; // Больше не нужен

function initGlobalUI() {
  // Функция для ожидания инициализации globalModalStore
  function waitForGlobalModalStore() {
    return new Promise((resolve) => {
      if (window.globalModalStore) {
        resolve(window.globalModalStore);
        return;
      }
      
      // Проверяем каждые 50ms
      const checkInterval = setInterval(() => {
        if (window.globalModalStore) {
          clearInterval(checkInterval);
          resolve(window.globalModalStore);
        }
      }, 50);
      
      // Таймаут через 5 секунд
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.globalModalStore) {
          console.error('globalModalStore не инициализирован в течение 5 секунд. Убедитесь, что assets/vue/entrypoints/global-modal.js загружен.');
        }
        resolve(window.globalModalStore);
      }, 5000);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    // Ждем инициализации globalModalStore
    const globalModal = await waitForGlobalModalStore();
    
    if (!globalModal) {
      console.error('globalModalStore не доступен. Кнопка "Войти" не будет работать.');
      return;
    }

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
            
            // Обновляем UI после успешного входа
            if (window.authStore && window.authStore.isLoggedIn) {
              // Можно обновить кнопку "Войти" на имя пользователя или "Выйти"
              const loginButtons = document.querySelectorAll('.open-login-modal-btn');
              loginButtons.forEach(btn => {
                btn.textContent = window.authStore.userName || 'Профиль';
                btn.classList.remove('open-login-modal-btn');
                btn.classList.add('user-profile-btn');
                // Можно добавить обработчик для перехода в профиль
                btn.onclick = () => {
                  window.location.href = '/profile/';
                };
              });
            }
            
            // Показываем сообщение об успехе (можно заменить на toast уведомление)
            if (result.data && result.data.message) {
              alert(result.data.message);
            }
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