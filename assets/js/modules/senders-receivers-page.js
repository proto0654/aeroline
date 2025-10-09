/**
 * senders-receivers-page.js
 * Модуль для страницы карточек отправителей и получателей
 */

import { TableManager } from './table-manager.js';
import { modalManager } from './modal-manager.js';

export class SendersReceiversPage {
  constructor(data = []) {
    this.tableManager = null;
    this.data = data;
    this.currentType = 'all';
    this.init();
  }

  init() {
    console.log('Инициализация страницы отправителей и получателей');
    
    // Проверяем, что мы на правильной странице
    const contactsTable = document.getElementById('contacts-table');
    if (!contactsTable) {
      console.log('Таблица отправителей/получателей не найдена, пропускаем инициализацию');
      return;
    }

    this.initTable();
    this.initTypeTabs();
  }

  initTypeTabs() {
    const tabs = document.querySelectorAll('.type-tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Обновляем активный таб
        tabs.forEach(t => {
          t.dataset.active = 'false';
        });
        tab.dataset.active = 'true';
        
        // Обновляем текущий тип
        this.currentType = tab.dataset.type;
        
        // Фильтруем таблицу через List.js
        this.filterTable();
      });
    });
  }

  filterTable() {
    if (!this.tableManager || !this.tableManager.list) return;

    const list = this.tableManager.list;
    
    // Очищаем текущие фильтры
    list.filter();
    
    // Применяем фильтр по типу
    if (this.currentType !== 'all') {
      list.filter((item) => {
        return item.values().type === this.currentType;
      });
    }
    
    // Обновляем счетчики
    this.updateCounters();
  }

  updateCounters() {
    if (!this.tableManager || !this.tableManager.list) return;

    const list = this.tableManager.list;
    const visibleItems = list.visibleItems.length;
    const totalItems = list.items.length;
    
    document.getElementById('items-count').textContent = visibleItems;
    document.getElementById('total-count').textContent = totalItems;
  }

  initTable() {
    // Инициализируем TableManager с поиском
    this.tableManager = new TableManager({
      containerId: 'contacts-table',
      valueNames: ['type', 'name', 'phone', 'location', 'address'],
      page: 10,
      searchEnabled: true,
      searchInputId: 'search-input'
    });

    // Добавляем обработчик поиска для обновления счетчиков
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.updateCounters();
      });
    }

    // Обновляем счетчики после инициализации таблицы
    this.updateCounters();
  }
}

export function initSendersReceiversPage(data = []) {
  return new SendersReceiversPage(data);
} 