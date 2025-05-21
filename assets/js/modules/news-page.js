import { Modal } from './modal.js';

console.log('NewsPage: Модуль загружается...');

export class NewsPage {
  constructor() {
    console.log('NewsPage: Инициализация класса');
    this.modal = new Modal();
    this.init();
  }

  init() {
    console.log('NewsPage: Начало инициализации');
    this.bindNewsDetailsButtons();
    this.initMonthFilter();
    console.log('NewsPage: Инициализация завершена');
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
      monthSelect.addEventListener('change', (e) => {
        const selectedMonth = e.target.value;
        console.log('NewsPage: Выбран месяц:', selectedMonth);
      });
    } else {
      console.warn('NewsPage: Фильтр по месяцам не найден');
    }
  }
} 