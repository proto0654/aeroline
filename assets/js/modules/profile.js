import { modalManager } from '../modules/modal-manager.js';

// Открытие попапа смены пароля
const changePasswordBtn = document.getElementById('change-password-btn');
if (changePasswordBtn) {
  changePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalManager.create({
      id: 'change-password-modal',
      title: 'Изменить пароль',
      content: `
        <form class='space-y-4' id='change-password-form'>
          <input type='password' name='current' placeholder='Текущий пароль' class='px-4 py-3 rounded-lg border border-gray-200 w-full focus:outline-none focus:border-brand-blue text-body-secondary' required />
          <input type='password' name='new' placeholder='Новый пароль' class='px-4 py-3 rounded-lg border border-gray-200 w-full focus:outline-none focus:border-brand-blue text-body-secondary' required />
          <input type='password' name='repeat' placeholder='Повторите новый пароль' class='px-4 py-3 rounded-lg border border-gray-200 w-full focus:outline-none focus:border-brand-blue text-body-secondary' required />
          <button type='submit' class='bg-brand-blue text-white px-6 py-3 rounded-lg text-buttons w-full'>Изменить</button>
        </form>
      `,
      size: 'small',
      onOpen: (modal) => {
        // Добавляем обработчик формы после открытия модального окна
        const form = modal.querySelector('#change-password-form');
        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Здесь будет логика смены пароля
            console.log('Смена пароля');
            modalManager.close(modal);
          });
        }
      }
    });
  });
}

// Открытие попапа редактирования почты
const editEmailBtn = document.getElementById('edit-email-btn');
if (editEmailBtn) {
  editEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalManager.create({
      id: 'change-email-modal',
      title: 'Изменить почту для восстановления',
      content: `
        <form class='space-y-4' id='change-email-form'>
          <input type='email' name='email' placeholder='Новая почта' class='px-4 py-3 rounded-lg border border-gray-200 w-full focus:outline-none focus:border-brand-blue text-body-secondary' required />
          <button type='submit' class='bg-brand-blue text-white px-6 py-3 rounded-lg text-buttons w-full'>Сохранить</button>
        </form>
      `,
      size: 'small',
      onOpen: (modal) => {
        // Добавляем обработчик формы после открытия модального окна
        const form = modal.querySelector('#change-email-form');
        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Здесь будет логика смены email
            console.log('Смена email');
            modalManager.close(modal);
          });
        }
      }
    });
  });
} 