/**
 * payments-page.js
 * Модуль для функциональности страницы платежей
 */

import { initFaqAccordion, initPaymentTabs } from './ui.js';

/**
 * Инициализация функционала для страницы платежей
 */
export function initPaymentsPage() {
  console.log('Инициализация страницы платежей...');
  
  // Initialize FAQ accordion
  initFaqAccordion();
  
  // Initialize payment tabs
  initPaymentTabs();
  
  // Обработка чекбокса для отправки чека на email
  const sendCheckEmailCheckbox = document.getElementById('send-check-email');
  const emailField = document.getElementById('email-field');
  const emailInput = document.getElementById('email-input');
  
  if (sendCheckEmailCheckbox && emailField && emailInput) {
    console.log('Инициализация функционала отображения поля email...');
    
    // Проверяем начальное состояние чекбокса
    if (sendCheckEmailCheckbox.checked) {
      emailField.classList.remove('hidden');
      emailInput.setAttribute('required', '');
    }
    
    // Добавляем обработчик события изменения состояния чекбокса
    sendCheckEmailCheckbox.addEventListener('change', function() {
      if (this.checked) {
        emailField.classList.remove('hidden');
        emailInput.setAttribute('required', '');
      } else {
        emailField.classList.add('hidden');
        emailInput.removeAttribute('required');
      }
    });
  }
  
  // Обработка отправки формы оплаты
  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    console.log('Инициализация обработчика формы оплаты...');
    
    paymentForm.addEventListener('submit', function(event) {
      // Предотвращаем стандартное поведение формы (перезагрузку страницы)
      event.preventDefault();
      
      // Получаем значения полей
      const orderNumber = document.getElementById('order-number').value;
      const sendCheckEmail = document.getElementById('send-check-email').checked;
      let email = null;
      
      // Проверяем заполнение обязательных полей
      if (!orderNumber) {
        alert('Пожалуйста, введите номер заказа');
        return;
      }
      
      if (sendCheckEmail) {
        email = document.getElementById('email-input').value;
        if (!email) {
          alert('Пожалуйста, введите email для отправки чека');
          return;
        }
        
        // Простая проверка формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Пожалуйста, введите корректный email');
          return;
        }
      }
      
      // Выводим данные в консоль
      console.log('Отправка платежа:');
      console.log('Номер заказа:', orderNumber);
      console.log('Отправить чек на email:', sendCheckEmail);
      
      if (sendCheckEmail) {
        console.log('Email для чека:', email);
      }
      
      // Здесь можно добавить код для отправки данных на сервер
      // Например, с использованием fetch API
      
      // Для демонстрации показываем сообщение пользователю
      alert('Платеж отправлен! Проверьте консоль для деталей.');
    });
  }

  // DaisyUI tooltip: показывать по клику на мобильных и по наведению на десктопе
  const orderHintTrigger = document.getElementById('order-hint-trigger');
  if (orderHintTrigger) {
    let tooltipVisible = false;

    // Для мобильных: показывать/скрывать по клику
    orderHintTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      tooltipVisible = !tooltipVisible;
      if (tooltipVisible) {
        this.setAttribute('data-tip-show', 'true');
      } else {
        this.removeAttribute('data-tip-show');
      }
    });

    // Скрывать при клике вне подсказки
    document.addEventListener('click', function (e) {
      if (tooltipVisible && !orderHintTrigger.contains(e.target)) {
        orderHintTrigger.removeAttribute('data-tip-show');
        tooltipVisible = false;
      }
    });

    // Для десктопа: скрывать при уходе мыши
    orderHintTrigger.addEventListener('mouseleave', function () {
      this.removeAttribute('data-tip-show');
      tooltipVisible = false;
    });
  }
} 