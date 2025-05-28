/**
 * pagination.js
 * Универсальный класс для работы с пагинацией на страницах с листингами
 */

export class Pagination {
  /**
   * Создает экземпляр класса пагинации
   * @param {Object} options - Настройки пагинации
   * @param {string} options.containerSelector - CSS селектор контейнера с элементами
   * @param {string} options.itemSelector - CSS селектор элементов для пагинации
   * @param {string} options.paginationSelector - CSS селектор контейнера пагинации
   * @param {number} options.itemsPerPage - Количество элементов на странице
   * @param {Function} options.onPageChange - Callback-функция при смене страницы (необязательно)
   * @param {Function} options.afterPageRender - Callback-функция после отрисовки страницы (необязательно)
   * @param {Function} options.beforePageChange - Callback-функция перед сменой страницы (необязательно)
   * @param {string} options.filterSelector - CSS селектор для фильтра (необязательно)
   * @param {string} options.filterAttribute - Атрибут для фильтрации (необязательно)
   * @param {boolean} options.useDisplayNone - Использовать display: none вместо класса hidden (необязательно)
   */
  constructor(options) {
    console.log('Pagination: Создание экземпляра пагинации');
    
    this.containerSelector = options.containerSelector;
    this.itemSelector = options.itemSelector;
    this.paginationSelector = options.paginationSelector;
    this.itemsPerPage = options.itemsPerPage || 9;
    this.onPageChange = options.onPageChange || null;
    this.afterPageRender = options.afterPageRender || null;
    this.beforePageChange = options.beforePageChange || null;
    this.filterSelector = options.filterSelector || null;
    this.filterAttribute = options.filterAttribute || 'data-filter';
    this.useDisplayNone = options.useDisplayNone || false;
    
    this.container = document.querySelector(this.containerSelector);
    this.paginationContainer = document.querySelector(this.paginationSelector);
    
    console.log('Pagination: Найден контейнер:', this.container !== null);
    console.log('Pagination: Найден контейнер пагинации:', this.paginationContainer !== null);
    
    this.currentPage = 1;
    this.allItems = [];
    this.filteredItems = [];
    this.totalPages = 0;
    
    if (this.container && this.paginationContainer) {
      this.init();
    } else {
      console.error('Pagination: Не удалось найти контейнер или контейнер пагинации');
      console.error(`Pagination: Контейнер "${this.containerSelector}" найден: ${this.container !== null}`);
      console.error(`Pagination: Контейнер пагинации "${this.paginationSelector}" найден: ${this.paginationContainer !== null}`);
    }
  }
  
  /**
   * Инициализация пагинации
   */
  init() {
    try {
      console.log('Pagination: Начало инициализации');
      
      // Получаем все элементы
      this.allItems = Array.from(document.querySelectorAll(this.itemSelector));
      console.log('Pagination: Найдено элементов:', this.allItems.length);
      
      this.filteredItems = [...this.allItems];
      
      // Рассчитываем общее количество страниц
      this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
      console.log('Pagination: Общее количество страниц:', this.totalPages);
      
      // Создаем элементы пагинации
      this.createPaginationElements();
      
      // Показываем первую страницу
      this.showPage(1);
      
      // Инициализируем фильтр, если он указан
      if (this.filterSelector) {
        this.initFilter();
      }
      
      console.log('Pagination: Инициализация завершена успешно');
    } catch (error) {
      console.error('Pagination: Ошибка при инициализации:', error);
    }
  }
  
  /**
   * Создание элементов пагинации
   */
  createPaginationElements() {
    try {
      console.log('Pagination: Создание элементов пагинации');
      
      // Очищаем контейнер пагинации
      this.paginationContainer.innerHTML = '';
      
      // Если всего одна страница, не показываем пагинацию
      if (this.totalPages <= 1) {
        console.log('Pagination: Всего одна страница, пагинация не требуется');
        return;
      }
      
      // Создаем навигацию
      const nav = document.createElement('nav');
      nav.className = 'inline-flex items-center justify-center space-x-2';
      nav.setAttribute('aria-label', 'Pagination');
      
      // Кнопка "Предыдущая"
      const prevButton = document.createElement('button');
      prevButton.className = 'pagination-prev pagination-button flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-8 h-8';
      prevButton.innerHTML = '&lt;';
      prevButton.disabled = true;
      prevButton.setAttribute('aria-label', 'Предыдущая страница');
      
      // Добавляем обработчик для кнопки "Предыдущая"
      prevButton.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.showPage(this.currentPage - 1);
        }
      });
      
      nav.appendChild(prevButton);
      
      // Создаем кнопки с номерами страниц
      this.updatePaginationButtons(1, this.totalPages, nav, prevButton);
      
      // Кнопка "Следующая"
      const nextButton = document.createElement('button');
      nextButton.className = 'pagination-next pagination-button flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-8 h-8';
      nextButton.innerHTML = '&gt;';
      nextButton.setAttribute('aria-label', 'Следующая страница');
      
      if (this.totalPages <= 1) {
        nextButton.disabled = true;
      }
      
      // Добавляем обработчик для кнопки "Следующая"
      nextButton.addEventListener('click', () => {
        if (this.currentPage < this.totalPages) {
          this.showPage(this.currentPage + 1);
        }
      });
      
      nav.appendChild(nextButton);
      
      // Добавляем обертку для выравнивания пагинации
      const paginationWrapper = document.createElement('div');
      paginationWrapper.className = 'flex justify-center items-center w-full';
      paginationWrapper.appendChild(nav);
      
      this.paginationContainer.appendChild(paginationWrapper);
      console.log('Pagination: Элементы пагинации созданы успешно');
    } catch (error) {
      console.error('Pagination: Ошибка при создании элементов пагинации:', error);
    }
  }
  
  /**
   * Обновление кнопок пагинации
   * @param {number} currentPage - Текущая страница
   * @param {number} totalPages - Общее количество страниц
   * @param {HTMLElement} nav - Элемент навигации
   * @param {HTMLElement} prevButton - Кнопка "Предыдущая"
   */
  updatePaginationButtons(currentPage, totalPages, nav, prevButton) {
    try {
      // Удаляем все кнопки с номерами страниц и многоточия
      const pageButtons = nav.querySelectorAll('.pagination-number, .pagination-ellipsis');
      pageButtons.forEach(button => button.remove());
      
      const nextButton = nav.querySelector('.pagination-next');
      
      // Для малого количества страниц показываем все кнопки
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          this.addPageButton(i, currentPage, nav, nextButton);
        }
      } else {
        // Всегда показываем первую страницу
        this.addPageButton(1, currentPage, nav, nextButton);
        
        // Определяем диапазон для отображения
        let startPage, endPage;
        
        if (currentPage <= 4) {
          // Близко к началу: 1 2 3 4 5 ... N
          startPage = 2;
          endPage = 5;
          
          // Добавляем страницы от 2 до 5
          for (let i = startPage; i <= endPage; i++) {
            this.addPageButton(i, currentPage, nav, nextButton);
          }
          
          // Добавляем многоточие и последнюю страницу
          this.addEllipsis(nav, nextButton);
          this.addPageButton(totalPages, currentPage, nav, nextButton);
        } else if (currentPage >= totalPages - 3) {
          // Близко к концу: 1 ... N-4 N-3 N-2 N-1 N
          startPage = totalPages - 4;
          endPage = totalPages - 1;
          
          // Добавляем многоточие после первой страницы
          this.addEllipsis(nav, nextButton);
          
          // Добавляем страницы от N-4 до N-1
          for (let i = startPage; i <= endPage; i++) {
            this.addPageButton(i, currentPage, nav, nextButton);
          }
          
          // Добавляем последнюю страницу
          this.addPageButton(totalPages, currentPage, nav, nextButton);
        } else {
          // В середине: 1 ... currentPage-1 currentPage currentPage+1 ... N
          this.addEllipsis(nav, nextButton);
          
          // Добавляем страницы вокруг текущей (currentPage-1, currentPage, currentPage+1)
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            this.addPageButton(i, currentPage, nav, nextButton);
          }
          
          // Добавляем многоточие и последнюю страницу
          this.addEllipsis(nav, nextButton);
          this.addPageButton(totalPages, currentPage, nav, nextButton);
        }
      }
      
      // Обновляем состояние кнопок "Вперед" и "Назад"
      if (prevButton) {
        if (currentPage === 1) {
          prevButton.setAttribute('disabled', 'disabled');
          prevButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          prevButton.removeAttribute('disabled');
          prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }
      
      if (nextButton) {
        if (currentPage === totalPages || totalPages === 0) {
          nextButton.setAttribute('disabled', 'disabled');
          nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          nextButton.removeAttribute('disabled');
          nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }
    } catch (error) {
      console.error('Pagination: Ошибка при обновлении кнопок пагинации:', error);
    }
  }
  
  /**
   * Добавляет кнопку страницы в навигацию
   * @param {number} page - Номер страницы
   * @param {number} currentPage - Текущая активная страница
   * @param {HTMLElement} nav - Элемент навигации
   * @param {HTMLElement} nextButton - Кнопка "Следующая"
   */
  addPageButton(page, currentPage, nav, nextButton) {
    const pageButton = document.createElement('button');
    if (page === currentPage) {
      pageButton.className = 'pagination-number pagination-button flex items-center justify-center rounded bg-brand-blue text-white font-bold w-8 h-8';
    } else {
      pageButton.className = 'pagination-number pagination-button flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors w-8 h-8';
    }
    pageButton.textContent = page;
    
    // Добавляем обработчик клика
    pageButton.addEventListener('click', () => {
      const pageNumber = parseInt(pageButton.textContent);
      this.showPage(pageNumber);
    });
    
    nav.insertBefore(pageButton, nextButton);
  }
  
  /**
   * Добавляет многоточие в навигацию
   * @param {HTMLElement} nav - Элемент навигации
   * @param {HTMLElement} nextButton - Кнопка "Следующая"
   */
  addEllipsis(nav, nextButton) {
    const ellipsis = document.createElement('span');
    ellipsis.className = 'pagination-ellipsis flex items-center justify-center w-8 h-8 text-brand-gray';
    ellipsis.textContent = '...';
    nav.insertBefore(ellipsis, nextButton);
  }
  
  /**
   * Показать определенную страницу
   * @param {number} page - Номер страницы
   */
  showPage(page) {
    try {
      console.log('Pagination: Показ страницы', page);
      
      // Вызываем callback перед сменой страницы, если он определен
      if (this.beforePageChange) {
        this.beforePageChange(page);
      }
      
      // Скрываем все элементы
      this.allItems.forEach(item => {
        if (this.useDisplayNone) {
          item.style.display = 'none';
        } else {
          item.classList.add('hidden');
        }
      });
      
      // Показываем только элементы для выбранной страницы
      const startIndex = (page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      
      this.filteredItems.slice(startIndex, endIndex).forEach(item => {
        if (this.useDisplayNone) {
          item.style.display = '';
        } else {
          item.classList.remove('hidden');
        }
      });
      
      // Обновляем пагинацию
      const nav = this.paginationContainer.querySelector('nav');
      if (nav) {
        const prevButton = nav.querySelector('.pagination-prev');
        this.updatePaginationButtons(page, this.totalPages, nav, prevButton);
      }
      
      // Сохраняем текущую страницу
      this.currentPage = page;
      
      // Вызываем callback при смене страницы, если он определен
      if (this.onPageChange) {
        this.onPageChange(page);
      }
      
      // Вызываем callback после отрисовки страницы, если он определен
      if (this.afterPageRender) {
        this.afterPageRender(page);
      }
      
      console.log('Pagination: Страница', page, 'показана успешно');
    } catch (error) {
      console.error('Pagination: Ошибка при показе страницы:', error);
    }
  }
  
  /**
   * Инициализация фильтра
   */
  initFilter() {
    try {
      console.log('Pagination: Инициализация фильтра');
      
      const filterElement = document.querySelector(this.filterSelector);
      
      if (filterElement) {
        console.log('Pagination: Фильтр найден:', this.filterSelector);
        
        filterElement.addEventListener('change', () => {
          const selectedValue = filterElement.value;
          console.log('Pagination: Выбрано значение фильтра:', selectedValue);
          
          if (selectedValue === 'all') {
            // Если выбраны все, показываем все элементы без фильтрации
            this.filteredItems = [...this.allItems];
          } else {
            // Фильтруем элементы по выбранному значению
            this.filteredItems = this.allItems.filter(item => {
              const filterValue = item.getAttribute(this.filterAttribute);
              return filterValue === selectedValue || filterValue?.includes(selectedValue);
            });
          }
          
          console.log('Pagination: Отфильтровано элементов:', this.filteredItems.length);
          
          // Обновляем количество страниц
          this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
          
          // Создаем элементы пагинации заново
          this.createPaginationElements();
          
          // Показываем первую страницу с отфильтрованными результатами
          this.showPage(1);
        });
      } else {
        console.warn('Pagination: Фильтр не найден:', this.filterSelector);
      }
    } catch (error) {
      console.error('Pagination: Ошибка при инициализации фильтра:', error);
    }
  }
  
  /**
   * Обновление элементов (например, после динамической загрузки)
   */
  updateItems() {
    try {
      console.log('Pagination: Обновление элементов');
      
      // Получаем все элементы заново
      this.allItems = Array.from(document.querySelectorAll(this.itemSelector));
      this.filteredItems = [...this.allItems];
      
      console.log('Pagination: Обновлено элементов:', this.allItems.length);
      
      // Рассчитываем общее количество страниц
      this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
      
      // Создаем элементы пагинации заново
      this.createPaginationElements();
      
      // Показываем первую страницу
      this.showPage(1);
    } catch (error) {
      console.error('Pagination: Ошибка при обновлении элементов:', error);
    }
  }
  
  /**
   * Обновление пагинации на основе видимых элементов (для фильтрации)
   */
  updateVisibleItems() {
    try {
      console.log('Pagination: Обновление видимых элементов');
      
      // Получаем только видимые элементы
      this.filteredItems = this.allItems.filter(item => {
        if (this.useDisplayNone) {
          return item.style.display !== 'none';
        } else {
          return !item.classList.contains('hidden');
        }
      });
      
      console.log('Pagination: Видимых элементов:', this.filteredItems.length);
      
      // Рассчитываем общее количество страниц на основе видимых элементов
      this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
      
      // Создаем элементы пагинации заново
      this.createPaginationElements();
      
      // Показываем первую страницу с видимыми элементами
      this.showPage(1);
    } catch (error) {
      console.error('Pagination: Ошибка при обновлении видимых элементов:', error);
    }
  }
  
  /**
   * Применение фильтра программно
   * @param {string} filterValue - Значение фильтра
   */
  applyFilter(filterValue) {
    try {
      console.log('Pagination: Программное применение фильтра:', filterValue);
      
      const filterElement = document.querySelector(this.filterSelector);
      
      if (filterElement) {
        filterElement.value = filterValue;
        
        // Вызываем событие change для активации фильтра
        const event = new Event('change');
        filterElement.dispatchEvent(event);
      } else {
        console.warn('Pagination: Не удалось применить фильтр - элемент не найден:', this.filterSelector);
      }
    } catch (error) {
      console.error('Pagination: Ошибка при программном применении фильтра:', error);
    }
  }
  
  /**
   * Сброс фильтра и отображение всех элементов
   */
  resetFilter() {
    try {
      console.log('Pagination: Сброс фильтра');
      
      const filterElement = document.querySelector(this.filterSelector);
      
      if (filterElement) {
        // Сбрасываем фильтрацию
        this.filteredItems = [...this.allItems];
        
        // Рассчитываем общее количество страниц
        this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
        
        // Создаем элементы пагинации заново
        this.createPaginationElements();
        
        // Показываем первую страницу
        this.showPage(1);
        
        console.log('Pagination: Фильтр сброшен успешно');
      } else {
        console.warn('Pagination: Не удалось сбросить фильтр - элемент не найден:', this.filterSelector);
      }
    } catch (error) {
      console.error('Pagination: Ошибка при сбросе фильтра:', error);
    }
  }
} 