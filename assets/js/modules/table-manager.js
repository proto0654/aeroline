/**
 * table-manager.js
 * Универсальный модуль для управления таблицами с List.js
 */

import List from 'list.js';

export class TableManager {
  constructor(options = {}) {
    // Настройки по умолчанию
    this.config = {
      containerId: options.containerId || 'table-container',
      valueNames: options.valueNames || [],
      listClass: 'listjs-container',
      page: options.page || 10,
      searchEnabled: options.searchEnabled || false,
      searchInputId: options.searchInputId || null,
      sortEnabled: options.sortEnabled !== false, // по умолчанию включена
      paginationEnabled: options.paginationEnabled !== false, // по умолчанию включена
      itemsCountEnabled: options.itemsCountEnabled !== false, // по умолчанию включен
      ...options
    };
    
    this.list = null;
    this.searchInput = null;
    this.init();
  }

  init() {
    console.log(`Инициализация TableManager для контейнера: ${this.config.containerId}`);
    
    // Проверяем, что контейнер существует
    const container = document.getElementById(this.config.containerId);
    if (!container) {
      console.log(`Контейнер ${this.config.containerId} не найден, пропускаем инициализацию`);
      return;
    }

    this.initTable();
    
    if (this.config.searchEnabled) {
      this.initSearch();
    }
    
    if (this.config.sortEnabled) {
      this.initSorting();
    }
    
    if (this.config.paginationEnabled) {
        this.initPaginationArrows();
    }
    
    if (this.config.itemsCountEnabled) {
      this.updateItemsCount();
    }
  }

  initTable() {
    // Проверяем наличие данных в таблице
    this.ensureTableHasData();

    // Настройки для List.js
    const listOptions = {
      valueNames: this.config.valueNames,
      listClass: this.config.listClass,
      page: this.config.page
    };

    // Добавляем поиск если включен
    if (this.config.searchEnabled && this.config.searchInputId) {
      listOptions.searchClass = 'search';
    }

    // Добавляем пагинацию если включена
    if (this.config.paginationEnabled) {
      listOptions.pagination = {
        innerWindow: 1,
        outerWindow: 1,
        left: 1,
        right: 1,
        item: '<li><a class="page join-item btn btn-sm"></a></li>',
        paginationClass: 'pagination join'
      };
    }
    
    this.list = new List(this.config.containerId, listOptions);
    
    // Проверяем нужно ли показывать пагинацию сразу после инициализации
    if (this.config.paginationEnabled) {
      setTimeout(() => {
        this.togglePaginationVisibility();
      }, 50);
    }
    
    // Обработка событий
    this.list.on('updated', () => {
      if (this.config.itemsCountEnabled) {
        this.updateItemsCount();
      }
      if (this.config.paginationEnabled) {
        // Проверяем нужно ли показывать пагинацию
        this.togglePaginationVisibility();
        
        setTimeout(() => {
          this.updatePaginationArrows();
          this.setupStandardPaginationArrows();
        }, 10);
      }
    });

    // Настраиваем стрелки для пагинации после инициализации
    if (this.config.paginationEnabled) {
      setTimeout(() => this.setupStandardPaginationArrows(), 100);
    }
  }

  ensureTableHasData() {
    // Если нет данных, добавляем скрытую строку для инициализации List.js
    const tbody = document.querySelector(`#${this.config.containerId} tbody.${this.config.listClass}`);
    if (tbody && tbody.children.length === 0) {
      console.log('Нет данных в таблице, добавляем пустой элемент для инициализации');
      
      // Создаем скрытую строку с нужным количеством колонок
      const headerCells = document.querySelectorAll(`#${this.config.containerId} thead th`);
      const cellsCount = headerCells.length;
      
      let emptyCells = '';
      for (let i = 0; i < cellsCount; i++) {
        emptyCells += '<td class="px-4 py-3 text-brand-gray">-</td>';
      }
      
      tbody.innerHTML = `
        <tr class="hidden" data-type="template" data-id="0">
          ${emptyCells}
        </tr>
      `;
    }
  }

  initSearch() {
    if (!this.config.searchInputId) return;
    
    this.searchInput = document.getElementById(this.config.searchInputId);
    if (!this.searchInput) {
      console.log(`Поле поиска ${this.config.searchInputId} не найдено`);
      return;
    }

    // Добавляем стили для поля поиска
    this.searchInput.classList.add('w-full', 'bg-brand-light', 'rounded-xl', 'p-3');

    // Обработчик поиска с задержкой
    let searchTimeout;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
          this.list.search();
        } else {
          this.list.search(searchTerm);
        }
      }, 300);
    });

    // Очистка поиска
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.searchInput.value = '';
        this.list.search();
      }
    });
  }

  initSorting() {
    const sortButtons = document.querySelectorAll(`#${this.config.containerId} .sort[data-sort]`);
    
    sortButtons.forEach(button => {
      button.addEventListener('click', () => {
        setTimeout(() => {
          this.updateSortIndicators();
        }, 10);
      });
    });
  }

  updateSortIndicators() {
    const sortButtons = document.querySelectorAll(`#${this.config.containerId} .sort[data-sort]`);
    
    sortButtons.forEach(button => {
      const arrow = button.querySelector('svg');
      if (!arrow) return;
      
      if (button.classList.contains('asc')) {
        arrow.style.transform = 'rotate(0deg)';
      } else if (button.classList.contains('desc')) {
        arrow.style.transform = 'rotate(180deg)';
      } else {
        arrow.style.transform = 'rotate(0deg)';
      }
    });
  }

  initPaginationArrows() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const currentPage = this.getCurrentPage();
        if (currentPage > 1) {
          this.list.show((currentPage - 2) * this.list.page + 1, this.list.page);
        }
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const currentPage = this.getCurrentPage();
        const totalPages = Math.ceil(this.list.size() / this.list.page);
        if (currentPage < totalPages) {
          this.list.show(currentPage * this.list.page + 1, this.list.page);
        }
      });
    }
    
    // Инициализируем состояние стрелок
    setTimeout(() => this.updatePaginationArrows(), 100);
  }

  updatePaginationArrows() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) return;
    
    const prevButton = paginationContainer.querySelector('.pagination-prev');
    const nextButton = paginationContainer.querySelector('.pagination-next');
    
    if (!prevButton || !nextButton) return;
    
    const currentPage = this.getCurrentPage();
    const totalPages = Math.ceil(this.list.size() / this.list.page);
    
    // Обновляем состояние кнопки "Назад"
    if (currentPage <= 1) {
      prevButton.disabled = true;
      prevButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      prevButton.disabled = false;
      prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Обновляем состояние кнопки "Вперед"
    if (currentPage >= totalPages) {
      nextButton.disabled = true;
      nextButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      nextButton.disabled = false;
      nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Обновляем дополнительные стрелки навигации
    this.updateNavigationArrows();
  }

  getCurrentPage() {
    // Пытаемся найти активную страницу в пагинации List.js
    const activePage = document.querySelector(`#${this.config.containerId} .pagination .active .page`);
    if (activePage) {
      return parseInt(activePage.textContent) || 1;
    }
    
    // Альтернативный способ - ищем активную кнопку
    const activeButton = document.querySelector(`#${this.config.containerId} .pagination .active`);
    if (activeButton) {
      const pageText = activeButton.textContent || activeButton.innerText;
      const pageNumber = parseInt(pageText);
      if (!isNaN(pageNumber)) {
        return pageNumber;
      }
    }
    
    return 1;
  }

  updateItemsCount() {
    const itemsCount = document.getElementById('items-count');
    const totalCount = document.getElementById('total-count');
    
    if (itemsCount && totalCount && this.list) {
      itemsCount.textContent = this.list.visibleItems.length;
      totalCount.textContent = this.list.items.length;
    }
  }

  // Методы для фильтрации
  filter(filterFunction) {
    if (this.list) {
      this.list.filter(filterFunction);
    }
  }

  clearFilter() {
    if (this.list) {
      this.list.filter();
    }
  }

  // Методы для добавления/удаления элементов
  addItem(item) {
    if (this.list) {
      this.list.add(item);
    }
  }

  removeItem(id) {
    if (this.list) {
      this.list.remove('id', id);
    }
  }

  // Метод для получения экземпляра List.js
  getList() {
    return this.list;
  }

  // Метод для поиска
  search(searchTerm = '') {
    if (this.list) {
      this.list.search(searchTerm);
    }
  }

  // Метод для очистки поиска
  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.search('');
  }

  setupStandardPaginationArrows() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) return;

    const paginationItems = paginationContainer.querySelectorAll('.page');
    if (paginationItems.length === 0) return;

    // Находим первую и последнюю кнопки (стрелки)
    const firstButton = paginationItems[0];
    const lastButton = paginationItems[paginationItems.length - 1];

    // Проверяем, что это действительно стрелки (не содержат цифры)
    if (firstButton && isNaN(parseInt(firstButton.textContent))) {
      firstButton.innerHTML = '‹';
      firstButton.classList.add('pagination-arrow', 'pagination-prev');
    }

    if (lastButton && isNaN(parseInt(lastButton.textContent))) {
      lastButton.innerHTML = '›';
      lastButton.classList.add('pagination-arrow', 'pagination-next');
    }

    // Добавляем стрелки "в начало" и "в конец"
    this.addNavigationArrows(paginationContainer, firstButton, lastButton);
  }

  addNavigationArrows(paginationContainer, firstButton, lastButton) {
    // Проверяем, не добавлены ли уже дополнительные стрелки
    if (paginationContainer.querySelector('.pagination-first') || 
        paginationContainer.querySelector('.pagination-last')) {
      return;
    }

    // Создаем кнопку "В начало"
    const firstPageButton = document.createElement('li');
    firstPageButton.innerHTML = '<a class="page join-item btn btn-sm pagination-first pagination-arrow">«</a>';
    
    // Создаем кнопку "В конец"
    const lastPageButton = document.createElement('li');
    lastPageButton.innerHTML = '<a class="page join-item btn btn-sm pagination-last pagination-arrow">»</a>';

    // Вставляем кнопки
    if (firstButton && firstButton.parentElement) {
      paginationContainer.insertBefore(firstPageButton, firstButton.parentElement);
    }
    
    if (lastButton && lastButton.parentElement) {
      paginationContainer.insertBefore(lastPageButton, lastButton.parentElement.nextSibling);
    }

    // Добавляем обработчики событий
    const firstPageLink = firstPageButton.querySelector('.pagination-first');
    const lastPageLink = lastPageButton.querySelector('.pagination-last');

    if (firstPageLink) {
      firstPageLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.list.show(1, this.list.page);
      });
    }

    if (lastPageLink) {
      lastPageLink.addEventListener('click', (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(this.list.size() / this.list.page);
        this.list.show((totalPages - 1) * this.list.page + 1, this.list.page);
      });
    }

    // Обновляем состояние стрелок
    this.updateNavigationArrows();
  }

  updateNavigationArrows() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) return;

    const firstPageButton = paginationContainer.querySelector('.pagination-first');
    const lastPageButton = paginationContainer.querySelector('.pagination-last');
    const prevButton = paginationContainer.querySelector('.pagination-prev');
    const nextButton = paginationContainer.querySelector('.pagination-next');

    if (!firstPageButton || !lastPageButton) return;

    const currentPage = this.getCurrentPage();
    const totalPages = Math.ceil(this.list.size() / this.list.page);

    // Обновляем состояние кнопки "В начало"
    if (currentPage <= 1) {
      firstPageButton.disabled = true;
      firstPageButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      firstPageButton.disabled = false;
      firstPageButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Обновляем состояние кнопки "В конец"
    if (currentPage >= totalPages) {
      lastPageButton.disabled = true;
      lastPageButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
      lastPageButton.disabled = false;
      lastPageButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Также обновляем состояние обычных стрелок
    if (prevButton) {
      if (currentPage <= 1) {
        prevButton.disabled = true;
        prevButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        prevButton.disabled = false;
        prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }

    if (nextButton) {
      if (currentPage >= totalPages) {
        nextButton.disabled = true;
        nextButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        nextButton.disabled = false;
        nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  }

  togglePaginationVisibility() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) {
      console.log('Контейнер пагинации не найден');
      return;
    }

    // Ждем немного чтобы List.js успел обновить пагинацию
    setTimeout(() => {
      // Ищем кнопки с номерами страниц (исключаем стрелки)
      const pageButtons = paginationContainer.querySelectorAll('.page');
      const numberButtons = Array.from(pageButtons).filter(btn => {
        const text = btn.textContent.trim();
        return !isNaN(parseInt(text)) && text !== '';
      });

      console.log(`Проверка пагинации: найдено ${numberButtons.length} кнопок с номерами страниц`);
      
      // Если кнопка с номером страницы только одна или их нет вообще, скрываем пагинацию
      if (numberButtons.length <= 1) {
        paginationContainer.style.display = 'none';
        console.log('Пагинация скрыта: одна страница или меньше');
      } else {
        paginationContainer.style.display = 'flex';
        console.log(`Пагинация показана: ${numberButtons.length} страниц`);
      }
    }, 20);
  }
} 