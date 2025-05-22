/**
 * vacancies-page.js
 * Модуль для функциональности страницы вакансий
 */
import { Pagination } from './pagination.js';

// Экземпляр пагинации
let vacanciesPagination = null;

/**
 * Инициализация функционала для страницы вакансий
 */
export function initVacanciesPage() {
  console.log('VacanciesPage: Начало инициализации');
  
  // Аккордеон для вакансий
  const vacancyToggleButtons = document.querySelectorAll('.vacancy-toggle');
  console.log('VacanciesPage: Найдено кнопок для вакансий:', vacancyToggleButtons.length);
  
  if (vacancyToggleButtons.length > 0) {
    vacancyToggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const content = this.parentElement.querySelector('.vacancy-content');
        const icon = this.querySelector('svg');

        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden');
          icon.classList.add('rotate-180');
        } else {
          content.classList.add('hidden');
          icon.classList.remove('rotate-180');
        }
      });
    });

    // Вносим небольшую задержку перед инициализацией пагинации,
    // чтобы убедиться, что DOM полностью загружен
    console.log('VacanciesPage: Инициализация пагинации с задержкой...');
    setTimeout(() => {
      initVacanciesPagination();
    }, 100);
  } else {
    console.warn('VacanciesPage: Не найдены кнопки для вакансий');
  }
  
  console.log('VacanciesPage: Инициализация завершена');
}

/**
 * Инициализация пагинации для вакансий
 */
function initVacanciesPagination() {
  console.log('VacanciesPage: Проверка контейнеров для пагинации...');
  
  // Проверяем наличие необходимых контейнеров
  const containerElement = document.querySelector('.vacancies-container');
  const itemElements = document.querySelectorAll('.vacancy-item');
  const paginationElement = document.querySelector('.pagination-container');
  
  console.log('VacanciesPage: Найден контейнер для вакансий:', containerElement !== null);
  console.log('VacanciesPage: Найдено элементов вакансий:', itemElements.length);
  console.log('VacanciesPage: Найден контейнер для пагинации:', paginationElement !== null);
  
  // Создаем пагинацию только если есть достаточное количество элементов
  if (containerElement && itemElements.length > 0 && paginationElement) {
    // Проверяем, нужна ли пагинация
    if (itemElements.length <= 5) {
      console.log('VacanciesPage: Пагинация не требуется, количество элементов не превышает лимит на странице');
      return;
    }
    
    // Создаем экземпляр пагинации с настройками для вакансий
    vacanciesPagination = new Pagination({
      containerSelector: '.vacancies-container',
      itemSelector: '.vacancy-item',
      paginationSelector: '.pagination-container',
      itemsPerPage: 5, // Количество вакансий на странице
      filterSelector: '#cityFilter',
      filterAttribute: 'data-location',
      useDisplayNone: true // Используем display: none вместо класса hidden для вакансий
    });
    
    console.log('VacanciesPage: Пагинация успешно инициализирована');
  } else {
    console.error('VacanciesPage: Невозможно инициализировать пагинацию - отсутствуют необходимые элементы');
  }
} 