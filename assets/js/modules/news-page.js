import { Modal } from './modal.js';
import { Pagination } from './pagination.js';

console.log('NewsPage: Модуль загружается...');

export class NewsPage {
  constructor() {
    console.log('NewsPage: Инициализация класса');
    this.modal = new Modal();
    this.pagination = null; // Будет инициализирован позже
    this.init();
  }

  init() {
    console.log('NewsPage: Начало инициализации');
    this.bindNewsDetailsButtons();
    this.initMonthFilter();
    console.log('NewsPage: Инициализация пагинации...');
    this.initPagination();
    console.log('NewsPage: Инициализация завершена');
  }

  initPagination() {
    // Проверяем наличие необходимых элементов
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
    
    // Инициализация пагинации для новостей
    this.pagination = new Pagination({
      containerSelector: '.news-grid',
      itemSelector: '.news-card',
      paginationSelector: '.pagination-container',
      itemsPerPage: 5, // Количество новостей на странице (изменено с 6 на 5)
      filterSelector: '.month-filter', // Фильтр по месяцам
      filterAttribute: 'data-month', // Атрибут для фильтрации
      useDisplayNone: false // Используем класс hidden для скрытия элементов
    });
    
    console.log('NewsPage: Пагинация инициализирована');
  }

  bindNewsDetailsButtons() {
    const newsButtons = document.querySelectorAll('.news-details-btn');
    console.log('NewsPage: Найдено кнопок для новостей:', newsButtons.length);
    
    newsButtons.forEach((button, index) => {
      console.log(`NewsPage: Добавление обработчика для кнопки ${index + 1}`);
      
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
    console.log('NewsPage: Открытие модального окна с контентом:', newsContent);
    
    let imageHtml = '';
    if (newsContent.image && !newsContent.isPlaceholder) {
      imageHtml = `
        <div class="rounded-2xl overflow-hidden">
          <img src="${newsContent.image}" 
               alt="${newsContent.title}" 
               class="w-full object-cover aspect-[1.85/1]">
        </div>
      `;
    }
    
    const modalContent = `
      <div class="space-y-6">
        <h2 class="text-h4 md:text-h3 font-bold text-brand-gray">${newsContent.title}</h2>
        ${imageHtml}
        <div class="text-brand-gray">${newsContent.content}</div>
        <div class="text-caption-form text-brand-gray">${newsContent.date}</div>
      </div>
    `;
    
    this.modal.open(modalContent);
  }

  initMonthFilter() {
    const monthSelect = document.querySelector('.month-filter');
    if (monthSelect) {
      console.log('NewsPage: Найден фильтр по месяцам');
      // Обработчик события change теперь будет в классе Pagination
    } else {
      console.warn('NewsPage: Фильтр по месяцам не найден');
    }
  }
} 