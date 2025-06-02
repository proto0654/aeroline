/**
 * service-acts-page.js
 * Модуль для страницы актов оказания услуг
 */

import { TableManager } from './table-manager.js';
import { DateRangePicker } from './date-range-picker.js';
import { modalManager } from './modal-manager.js';

export class ServiceActsPage {
  constructor() {
    this.tableManager = null;
    this.emailModal = null;
    this.periodPicker = null;
    this.init();
  }

  init() {
    console.log('Инициализация страницы актов оказания услуг');
    
    // Проверяем, что мы на правильной странице
    const actsTable = document.getElementById('acts-table');
    if (!actsTable) {
      console.log('Таблица актов не найдена, пропускаем инициализацию');
      return;
    }

    this.initTable();
    this.initModal();
    this.initRequestForm();
    this.initDateFilters();
  }

  initTable() {
    // Инициализируем TableManager с поиском
    this.tableManager = new TableManager({
      containerId: 'acts-table',
      valueNames: ['date', 'actNumber', 'amount', 'organizationName'],
      page: 10,
      searchEnabled: true,
      searchInputId: 'search-input',
      customPagination: false // Используем стандартную пагинацию List.js
    });
  }

  initDateFilters() {
    // Получаем контейнер для календаря
    const container = document.getElementById('period-picker-container');
    if (!container) return;
    
    // Очищаем контейнер, если там уже есть содержимое (для предотвращения дублирования)
    container.innerHTML = '';
    
    // Получаем сегодняшнюю дату
    const today = new Date();
    
    // Создаем дату для начала периода (первый день текущего месяца)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Создаем дату для конца периода (сегодняшний день)
    const endOfMonth = new Date(today);
    
    // Форматируем даты в ISO строки YYYY-MM-DD
    const formatDateToISO = (date) => {
      return date.toISOString().split('T')[0];
    };

    // Форматируем даты для отображения в поле ввода DD.MM.YYYY
    const formatDateForDisplay = (date) => {
      const d = new Date(date); // Убедимся, что работаем с объектом Date
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    };

    // const initialDisplayValue = `${formatDateForDisplay(startOfMonth)} - ${formatDateForDisplay(endOfMonth)}`; // Больше не формируем здесь начальное значение для поля

    // Инициализируем выбор периода для запроса акта сверки с настроенными опциями
    this.periodPicker = new DateRangePicker({
      selector: '#period-picker-container',
      placeholder: 'Выберите период для акта сверки', // Это будет отображаться, если поле пустое
      autoApply: true,
      minDate: formatDateToISO(new Date(today.getFullYear() - 1, 0, 1)), 
      maxDate: formatDateToISO(today),
      // initialTextInputValue: initialDisplayValue, // Убираем передачу начального значения
      onRangeSelect: (range) => {
        console.log('Выбран период для акта сверки:', range);
        // DateRangePicker сам обновит поле ввода через _updateInputValue
      }
    });
    
    // Календарь будет инициализирован без выбранных дат и поле ввода будет пустым (или с placeholder)
  }

  updateItemCounts() {
    if (!this.tableManager || !this.tableManager.list) return;

    const visibleItems = this.tableManager.list.visibleItems.length;
    const totalItems = this.tableManager.list.items.length;

    const itemsCountElement = document.getElementById('items-count');
    const totalCountElement = document.getElementById('total-count');

    if (itemsCountElement) itemsCountElement.textContent = visibleItems;
    if (totalCountElement) totalCountElement.textContent = totalItems;
  }

  initModal() {
    // Получаем модальное окно
    this.emailModal = document.getElementById('email_modal');
    if (!this.emailModal) return;

    const modalActNumber = document.getElementById('modal-act-number');
    const emailForm = document.getElementById('email-form');
    
    // Открытие модального окна
    document.addEventListener('click', (e) => {
      const sendEmailBtn = e.target.closest('.send-email-btn');
      if (sendEmailBtn) {
        const actNumber = sendEmailBtn.dataset.actNumber;
        const organization = sendEmailBtn.dataset.organization;
        
        modalActNumber.textContent = actNumber;
        
        // Открываем модальное окно через ModalManager
        modalManager.open(this.emailModal);
      }
    });
    
    // Обработка формы отправки email
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('modal-email').value;
      const actNumber = modalActNumber.textContent;
      
      // Здесь будет отправка данных на сервер
      console.log('Отправка акта', actNumber, 'на email:', email);
      
      // Показываем уведомление об успешной отправке
      alert('Акт успешно отправлен на ' + email);
      
      // Закрываем модальное окно через ModalManager
      modalManager.close(this.emailModal);
      emailForm.reset();
    });
  }

  initRequestForm() {
    const requestForm = document.getElementById('request-form');
    if (!requestForm) return;

    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email-input').value;
      const periodData = this.periodPicker ? this.periodPicker.getValue() : null;
      
      if (!periodData || periodData.isEmpty) {
        alert('Пожалуйста, выберите период для акта сверки');
        return;
      }
      
      // Здесь будет отправка данных на сервер
      console.log('Запрос акта сверки на email:', email, 'за период:', periodData);
      
      // Показываем уведомление об успешной отправке
      alert(`Запрос на акт сверки за период ${periodData.formattedRange} отправлен на ${email}`);
      
      requestForm.reset();
      if (this.periodPicker) {
        this.periodPicker.clearSelection();
      }
    });
  }
}

export function initServiceActsPage() {
  new ServiceActsPage();
} 