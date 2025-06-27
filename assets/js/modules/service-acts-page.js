/**
 * service-acts-page.js
 * Модуль для страницы актов оказания услуг
 */

console.log('--- Debug: Attempting to import TableManager in service-acts-page.js ---');
import { TableManager } from './table-manager.js';
console.log('--- Debug: TableManager imported successfully in service-acts-page.js ---');
// import { modalManager } from './modal-manager.js'; // Удаляем, так как не используется с глобальными модалками
// console.log('--- Debug: modalManager imported successfully in service-acts-page.js ---');
// import { mountDateRangePicker } from '../../vue/entrypoints/lk-datepicker.js';
// console.log('--- Debug: mountDateRangePicker imported successfully in service-acts-page.js ---');
console.log('--- Debug: Defining ServiceActsPage class ---');
class ServiceActsPage {
  constructor() {
    console.log('Инициализация класса');
    this.tableManager = null;
    // this.emailModal = null;
    // this.selectedDateRange = null; // Добавляем свойство для хранения выбранного диапазона
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
    // this.initModal();
    // this.initRequestForm();
    // this.initDateRangePicker(); // Добавляем вызов нового метода инициализации
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

  updateItemCounts() {
    if (!this.tableManager || !this.tableManager.list) return;

    const visibleItems = this.tableManager.list.visibleItems.length;
    const totalItems = this.tableManager.list.items.length;

    const itemsCountElement = document.getElementById('items-count');
    const totalCountElement = document.getElementById('total-count');

    if (itemsCountElement) itemsCountElement.textContent = visibleItems;
    if (totalCountElement) totalCountElement.textContent = totalItems;
  }

}

// Экспортируем пустую функцию для совместимости, если она используется в HTML как import
export function initServiceActsPage() {
  console.log('initServiceActsPage called - Initializing ServiceActsPage module');
  new ServiceActsPage(); // Создаем экземпляр класса и запускаем его инициализацию
} 