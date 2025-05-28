import { Pagination } from './pagination.js';
import { DateRangePicker } from './date-range-picker.js';
import { modalManager } from './modal-manager.js';

console.log('NewsPage: Модуль загружается...');

export class NewsPage {
  constructor() {
    console.log('NewsPage: Инициализация класса');
    this.modal = document.getElementById('news-modal');
    this.pagination = null;
    this.dateFilterPicker = null;
    this.currentFilters = {
      dateRange: null
    };
    this.init();
  }

  init() {
    console.log('NewsPage: Начало инициализации');
    this.sortNewsByDate();
    this.bindNewsDetailsButtons();
    this.initDateFilter();
    this.initClearFiltersButton();
    console.log('NewsPage: Инициализация пагинации...');
    this.initPagination();
    console.log('NewsPage: Инициализация завершена');
  }

  initPagination() {
    const newsGrid = document.querySelector('.news-grid');
    const newsCards = document.querySelectorAll('.news-card');
    const paginationContainer = document.querySelector('.pagination-container');
    
    console.log('NewsPage: Контейнер для новостей найден:', !!newsGrid);
    console.log('NewsPage: Найдено новостей:', newsCards.length);
    console.log('NewsPage: Контейнер для пагинации найден:', !!paginationContainer);
    
    if (!newsGrid || newsCards.length === 0 || !paginationContainer) {
      console.error('NewsPage: Не удалось найти необходимые элементы для пагинации');
      return;
    }
    
    this.pagination = new Pagination({
      containerSelector: '.news-grid',
      itemSelector: '.news-card',
      paginationSelector: '.pagination-container',
      itemsPerPage: 5,
      useDisplayNone: false
    });
    
    console.log('NewsPage: Пагинация инициализирована');
  }

  initDateFilter() {
    // Инициализируем фильтр по диапазону дат
    console.log('NewsPage: Инициализация фильтра дат');
    this.dateFilterPicker = new DateRangePicker({
      containerId: 'news-date-filter-container',
      inputId: 'news-date-filter',
      placeholder: 'Выберите период для фильтрации',
      autoApply: false, // теперь требуется подтверждение
      defaultRange: true, // дефолтный диапазон (месяц назад - сегодня)
      onRangeSelect: (range) => {
        console.log('NewsPage: Получен диапазон дат:', range);
        this.currentFilters.dateRange = range;
        this.applyFilters();
      }
    });
  }

  initClearFiltersButton() {
    const clearBtn = document.getElementById('clear-filters-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearAllFilters();
      });
    }
  }

  clearAllFilters() {
    // Сбрасываем фильтр по диапазону дат
    if (this.dateFilterPicker) {
      this.dateFilterPicker.clearSelection();
    }

    // Очищаем текущие фильтры
    this.currentFilters = {
      dateRange: null
    };

    // Применяем пустые фильтры (показываем все новости)
    this.applyFilters();
  }

  applyFilters() {
    const newsCards = document.querySelectorAll('.news-card');
    
    console.log('NewsPage: Применение фильтров:', this.currentFilters);
    console.log('NewsPage: Найдено карточек новостей:', newsCards.length);
    
    let visibleCount = 0;
    newsCards.forEach((card, index) => {
      let isVisible = true;

      // Фильтр по диапазону дат
      if (this.currentFilters.dateRange && !this.currentFilters.dateRange.isEmpty) {
        const cardTimestamp = parseInt(card.dataset.timestamp);
        console.log(`NewsPage: Карточка ${index + 1} - timestamp:`, cardTimestamp);
        
        if (cardTimestamp) {
          // Создаем даты без учета времени, используя UTC для избежания проблем с часовыми поясами
          const cardDate = new Date(cardTimestamp * 1000);
          const startDate = this.currentFilters.dateRange.startDate;
          const endDate = this.currentFilters.dateRange.endDate || this.currentFilters.dateRange.startDate;

          // Нормализуем даты - приводим к началу дня в UTC
          const cardDateNormalized = new Date(Date.UTC(cardDate.getFullYear(), cardDate.getMonth(), cardDate.getDate()));
          const startDateNormalized = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
          const endDateNormalized = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

          console.log(`NewsPage: Карточка ${index + 1} - сравнение дат:`, {
            cardDate: cardDateNormalized.toISOString().split('T')[0],
            startDate: startDateNormalized.toISOString().split('T')[0],
            endDate: endDateNormalized.toISOString().split('T')[0],
            cardTime: cardDateNormalized.getTime(),
            startTime: startDateNormalized.getTime(),
            endTime: endDateNormalized.getTime()
          });

          // Сравниваем через getTime() для точности
          const cardTime = cardDateNormalized.getTime();
          const startTime = startDateNormalized.getTime();
          const endTime = endDateNormalized.getTime();

          if (cardTime < startTime || cardTime > endTime) {
            isVisible = false;
            console.log(`NewsPage: Карточка ${index + 1} скрыта - не попадает в диапазон`);
          } else {
            console.log(`NewsPage: Карточка ${index + 1} видима - попадает в диапазон`);
          }
        } else {
          console.log(`NewsPage: Карточка ${index + 1} - нет timestamp, скрываем`);
          isVisible = false;
        }
      } else {
        console.log(`NewsPage: Карточка ${index + 1} - фильтр не активен, показываем`);
      }

      // Показываем или скрываем карточку
      if (isVisible) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    
    console.log('NewsPage: Видимых карточек:', visibleCount);
    
    // Обновляем пагинацию после фильтрации
    if (this.pagination) {
      this.pagination.updateVisibleItems();
    }
  }

  bindNewsDetailsButtons() {
    const newsButtons = document.querySelectorAll('.news-details-btn');
    console.log('NewsPage: Найдено кнопок для новостей:', newsButtons.length);
    
    newsButtons.forEach(button => {
      console.log('NewsPage: Добавление обработчика для кнопки');
      
      button.addEventListener('click', (e) => {
        console.log('NewsPage: Клик по кнопке "Подробнее"');
        e.preventDefault();
        
        const newsCard = button.closest('.news-card');
        console.log('NewsPage: Найдена карточка новости:', newsCard !== null);
        
        if (!newsCard) {
          console.error('NewsPage: Не удалось найти карточку новости');
          return;
        }

        const newsContent = {
          title: newsCard.querySelector('.news-title')?.textContent,
          image: newsCard.querySelector('img')?.src,
          isPlaceholder: newsCard.querySelector('img')?.classList.contains('placeholder'),
          content: newsCard.querySelector('.news-content')?.textContent,
          date: newsCard.querySelector('.news-date')?.textContent
        };
        
        console.log('NewsPage: Собраны данные для модального окна:', newsContent);
        
        if (!newsContent.title || !newsContent.content) {
          console.error('NewsPage: Не удалось собрать все необходимые данные');
          return;
        }
        
        this.openNewsModal(newsContent);
      });
    });
  }

  openNewsModal(newsContent) {
    const modal = this.modal;
    const modalContent = modal.querySelector('.modal-content');
    
    // Заполняем контент модального окна
    modalContent.querySelector('h2').textContent = newsContent.title;
    modalContent.querySelector('.news-text').textContent = newsContent.content;
    modalContent.querySelector('.text-caption-form').textContent = newsContent.date;
    
    // Обрабатываем изображение
    const imageContainer = modalContent.querySelector('.news-image');
    if (newsContent.image && !newsContent.isPlaceholder) {
      imageContainer.innerHTML = `
        <div class="rounded-2xl overflow-hidden">
          <img src="${newsContent.image}" 
               alt="${newsContent.title}" 
               class="w-full object-cover aspect-[1.85/1]">
        </div>
      `;
    } else {
      imageContainer.innerHTML = '';
    }
    
    // Открываем модальное окно через ModalManager
    modalManager.open(modal);
  }

  sortNewsByDate() {
    console.log('NewsPage: Сортировка новостей по дате...');
    const newsGrid = document.querySelector('.news-grid');
    const newsCards = Array.from(document.querySelectorAll('.news-card'));
    
    if (!newsGrid || newsCards.length === 0) {
      console.log('NewsPage: Нет новостей для сортировки');
      return;
    }

    // Сортируем новости по timestamp (от новых к старым)
    newsCards.sort((a, b) => {
      const timestampA = parseInt(a.dataset.timestamp) || 0;
      const timestampB = parseInt(b.dataset.timestamp) || 0;
      return timestampB - timestampA; // Убывающий порядок (новые сверху)
    });

    // Перестраиваем DOM в отсортированном порядке
    newsCards.forEach(card => {
      newsGrid.appendChild(card);
    });

    console.log('NewsPage: Новости отсортированы по дате (от новых к старым)');
  }
} 