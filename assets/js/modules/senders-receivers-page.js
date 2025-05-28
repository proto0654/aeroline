/**
 * senders-receivers-page.js
 * Модуль для страницы карточек отправителей и получателей
 */

import { TableManager } from './table-manager.js';
import { modalManager } from './modal-manager.js';

export class SendersReceiversPage {
  constructor() {
    this.tableManager = null;
    this.editModal = null;
    this.deleteModal = null;
    this.createModal = null;
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
    this.initModals();
    this.initCreateButton();
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

  initModals() {
    this.initEditModal();
    this.initDeleteModal();
    this.initCreateModal();
  }

  initEditModal() {
    this.editModal = document.getElementById('edit-modal');
    if (!this.editModal) return;

    const editForm = document.getElementById('edit-form');
   
    // Открытие модального окна
    document.addEventListener('click', (e) => {
      if (e.target.closest('.edit-btn')) {
        const btn = e.target.closest('.edit-btn');
        const id = btn.dataset.id;
        const row = btn.closest('tr');
        
        // Заполняем форму данными контакта
        document.getElementById('edit-type').value = row.dataset.type;
        document.getElementById('edit-name').value = row.querySelector('.name').textContent;
        document.getElementById('edit-phone').value = row.querySelector('.phone').textContent;
        document.getElementById('edit-location').value = row.querySelector('.location').textContent;
        document.getElementById('edit-address').value = row.querySelector('.address').textContent;
        document.getElementById('edit-id').value = id;
        
        modalManager.open(this.editModal);
      }
    });
    
    // Обработка формы редактирования
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const id = document.getElementById('edit-id').value;
      const type = document.getElementById('edit-type').value;
      const name = document.getElementById('edit-name').value;
      const phone = document.getElementById('edit-phone').value;
      const location = document.getElementById('edit-location').value;
      const address = document.getElementById('edit-address').value;
      
      // Здесь будет отправка данных на сервер
      console.log('Редактирование контакта', id, type, name, phone, location, address);
      
      // Показываем уведомление об успешном редактировании
      alert('Контакт успешно отредактирован');
      
      modalManager.close(this.editModal);
      editForm.reset();
    });
  }

  initDeleteModal() {
    this.deleteModal = document.getElementById('delete-modal');
    if (!this.deleteModal) return;

    const deleteForm = document.getElementById('delete-form');
    const modalContactName = document.getElementById('modal-contact-name');
    
    // Открытие модального окна удаления
    document.addEventListener('click', (e) => {
      if (e.target.closest('.delete-btn')) {
        const btn = e.target.closest('.delete-btn');
        const id = btn.dataset.id;
        const row = btn.closest('tr');
        const name = row.querySelector('.name').textContent;
        
        document.getElementById('delete-id').value = id;
        modalContactName.textContent = name;
        
        modalManager.open(this.deleteModal);
      }
    });
    
    // Обработка формы удаления
    deleteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const id = document.getElementById('delete-id').value;
      
      // Здесь будет отправка данных на сервер
      console.log('Удаление контакта', id);
      
      // Показываем уведомление об успешном удалении
      alert('Контакт успешно удален');
      
      modalManager.close(this.deleteModal);
      deleteForm.reset();
    });
  }

  initCreateModal() {
    this.createModal = document.getElementById('create-modal');
    if (!this.createModal) return;

    const createForm = document.getElementById('create-form');
    
    // Обработка формы создания
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const type = document.getElementById('create-type').value;
      const name = document.getElementById('create-name').value;
      const phone = document.getElementById('create-phone').value;
      const location = document.getElementById('create-location').value;
      const address = document.getElementById('create-address').value;
      const comment = document.getElementById('create-comment').value;
      
      // Здесь будет отправка данных на сервер
      console.log('Создание нового контакта', type, name, phone, location, address, comment);
      
      // Показываем уведомление об успешном создании
      alert('Контакт успешно создан');
      
      modalManager.close(this.createModal);
      createForm.reset();
    });
  }

  initCreateButton() {
    const createBtn = document.getElementById('create-btn');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        modalManager.open(this.createModal);
      });
    }
  }
}

export function initSendersReceiversPage() {
  new SendersReceiversPage();
} 