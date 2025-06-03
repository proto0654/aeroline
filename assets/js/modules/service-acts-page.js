/**
 * service-acts-page.js
 * Модуль для страницы актов оказания услуг
 */

console.log('--- Debug: Attempting to import TableManager in service-acts-page.js ---');
import { TableManager } from './table-manager.js';
console.log('--- Debug: TableManager imported successfully in service-acts-page.js ---');
console.log('--- Debug: Attempting to import modalManager in service-acts-page.js ---');
import { modalManager } from './modal-manager.js';
console.log('--- Debug: modalManager imported successfully in service-acts-page.js ---');
console.log('--- Debug: Attempting to import mountDateRangePicker in service-acts-page.js ---');
import { mountDateRangePicker } from '../../vue/entrypoints/lk-datepicker.js';
console.log('--- Debug: mountDateRangePicker imported successfully in service-acts-page.js ---');
console.log('--- Debug: Defining ServiceActsPage class ---');
class ServiceActsPage {
  constructor() {
    console.log('Инициализация класса');
    this.tableManager = null;
    this.emailModal = null;
    this.selectedDateRange = null; // Добавляем свойство для хранения выбранного диапазона
    this.init();
  }

  init() {
    console.log('--- Debug: Start of init in service-acts-page.js ---');
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
    this.initDateRangePicker(); // Добавляем вызов нового метода инициализации
    console.log('--- Debug: End of init in service-acts-page.js ---');
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

  initDateRangePicker() {
    // Инициализируем Vue компонент DateRangePicker
    console.log('ServiceActsPage: Инициализация Vue DateRangePicker');
    const datePickerContainer = document.querySelector('#service-acts-datepicker-app');
    if (datePickerContainer) {
      this.datePickerApp = mountDateRangePicker(
        '#service-acts-datepicker-app',
        { placeholder: 'Выберите период для акта сверки' },
        (range) => {
          console.log('ServiceActsPage: Выбран период для акта сверки (Vue):', range);
          this.selectedDateRange = range;
          console.log('ServiceActsPage: Обновлен selectedDateRange:', this.selectedDateRange);
        },
        () => {
          console.log('ServiceActsPage: Выбор периода для акта сверки сброшен (Vue)');
          this.selectedDateRange = null;
          console.log('ServiceActsPage: Сброшен selectedDateRange.');
        }
      );
       console.log('ServiceActsPage: Vue DateRangePicker смонтирован.');
    } else {
      console.warn('ServiceActsPage: Контейнер #service-acts-datepicker-app не найден, Vue DateRangePicker не будет смонтирован.');
    }
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
      // Используем выбранный диапазон, сохраненный из коллбэка Vue компонента
      const periodData = this.selectedDateRange;
      
      if (!periodData || !periodData.start || !periodData.end) {
        alert('Пожалуйста, выберите период для акта сверки');
        return;
      }
      
      // Здесь будет отправка данных на сервер
      console.log('Запрос акта сверки на email:', email, 'за период:', periodData);
      
      // Показываем уведомление об успешной отправке
      alert(`Запрос на акт сверки за период ${periodData.formattedRange} отправлен на ${email}`);
      
      requestForm.reset();
      // Логика сброса выбранного диапазона должна быть реализована
      // либо через передачу коллбэка сброса в mountDateRangePicker,
      // либо путем получения ссылки на компонент через ref и вызова его метода.
      // Пока оставляем без автоматического сброса после отправки формы.
      console.warn('ServiceActsPage: Сброс выбранного диапазона после отправки формы не реализован.');

      // Добавляем вызов метода сброса из Vue компонента
      if (this.datePickerApp && this.datePickerApp._container?.__vue_app__?._instance?.proxy?.clearSelection) {
        this.datePickerApp._container.__vue_app__._instance.proxy.clearSelection();
        console.log('ServiceActsPage: Диапазон дат сброшен после отправки формы.');
      } else {
        console.warn('ServiceActsPage: Не удалось сбросить диапазон дат Vue компонента после отправки формы.');
      }
    });
  }
}

// Экспортируем пустую функцию для совместимости, если она используется в HTML как import
export function initServiceActsPage() {
  console.log('initServiceActsPage called - Initializing ServiceActsPage module');
  new ServiceActsPage(); // Создаем экземпляр класса и запускаем его инициализацию
} 