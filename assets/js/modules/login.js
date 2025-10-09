/**
 * login.js
 * Модуль для обработки входа в систему
 */

import { getBasePath } from './utils.js';

export class LoginManager {
  constructor() {
    this.loginModal = document.getElementById('login-modal');
    this.loginForm = document.getElementById('login-form');
    this.basePath = getBasePath();
    this.init();
  }

  init() {
    if (!this.loginModal || !this.loginForm) return;

    // Обработчик открытия модального окна
    document.addEventListener('click', (e) => {
      const loginBtn = e.target.closest('#mobile-menu-login, a[href*="profile.html"]');
      if (loginBtn) {
        e.preventDefault();
        modalManager.open(this.loginModal);
      }
    });

    // Обработчик отправки формы
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      // Эмулируем проверку учетных данных
      if (email === 'test@aeroline.su' && password === 'password123') {
        // Успешный вход
        modalManager.close(this.loginModal);
        window.location.href = `${this.basePath}profile.html`;
      } else {
        alert('Неверный email или пароль');
      }
    });
  }
}

// Создаем экземпляр при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new LoginManager();
}); 