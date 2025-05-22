/**
 * contacts-page.js
 * Модуль для функциональности страницы контактов
 */

import { selectOfficeCardNoFocus } from './map.js';
import { Pagination } from './pagination.js';

// Экземпляр пагинации
let officesPagination = null;

/**
 * Инициализация функционала для страницы контактов
 */
export function initContactsPage() {
  const officeCards = document.querySelectorAll('.office-card');
  const officeInfoCard = document.querySelector('.selected-office-card');
  const closeSelectedOfficeBtn = document.getElementById('close-selected-office');
  
  // Гарантированно снимаем выделение со всех карточек при инициализации
  selectOfficeCardNoFocus(null);

  // Обработчик закрытия выбранного офиса
  if (closeSelectedOfficeBtn && officeInfoCard) {
    closeSelectedOfficeBtn.addEventListener('click', function () {
      officeInfoCard.style.display = 'none';
      // Снимаем выделение с карточек
      selectOfficeCardNoFocus(null);
    });
  }

  // Инициализация фильтра по городам
  initCityFilter();

  // Интерактивность с карточками офисов
  if (officeCards.length > 0) {
    officeCards.forEach(card => {
      // При наведении подсвечиваем карточку
      card.addEventListener('mouseenter', function () {
        this.classList.add('shadow-md');
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      });

      card.addEventListener('mouseleave', function () {
        this.classList.remove('shadow-md');
        this.style.transform = 'translateY(0)';
      });

      // При клике на карточку показываем офис на карте - нет необходимости дублировать обработчики,
      // они уже добавлены в initMap. Мы только обрабатываем событие для карты, если она инициализирована.
    });
    
    // Скрываем информационную панель при инициализации
    const infoPanel = document.querySelector('.map-info-panel');
    if (infoPanel) {
      infoPanel.classList.add('hidden');
    }
    
    // Отложенная инициализация карты для показа всех офисов, как на главной
    setTimeout(() => {
      // Сначала снимаем все выделения с карточек
      selectOfficeCardNoFocus(null);
      
      // Собираем координаты всех офисов для инициализации карты
      const allOfficeCoordinates = [];
      officeCards.forEach(card => {
        if (card.dataset.coordinates) {
          const coordinates = card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim()));
          if (coordinates.length === 2) {
            allOfficeCoordinates.push(coordinates);
          }
        }
      });
      
      // Если есть координаты офисов и карта доступна, устанавливаем карту в отдаленный вид
      if (allOfficeCoordinates.length > 0 && typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
          const mapInstance = document.querySelector('#map')?.__yamap;
          if (mapInstance) {
            // Сбрасываем активные маркеры
            if (typeof window.resetAllMarkers === 'function') {
              window.resetAllMarkers();
            }
          }
        });
      }
    }, 300);
  }

  // Инициализация пагинации с callback-функциями
  initOfficesPagination();
}

/**
 * Инициализация фильтра по городам
 */
function initCityFilter() {
  const cityFilter = document.getElementById('cityFilter');
  if (!cityFilter) return;

  // Добавляем обработчик изменения выбранного города
  cityFilter.addEventListener('change', function() {
    const selectedCity = this.value;
    
    // Если выбраны все города, сбрасываем фильтр
    if (selectedCity === 'all') {
      // Если есть экземпляр пагинации, используем его метод для сброса фильтра
      if (officesPagination) {
        officesPagination.resetFilter();
      } else {
        // Ручной сброс фильтра, если пагинация ещё не инициализирована
        document.querySelectorAll('.office-card').forEach(card => {
          card.classList.remove('hidden');
        });
      }
    } else {
      // Фильтруем карточки по выбранному городу, если пагинация ещё не инициализирована
      if (!officesPagination) {
        document.querySelectorAll('.office-card').forEach(card => {
          if (card.dataset.city === selectedCity) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      }
    }
    
    // Обновляем карту, чтобы отображать только выбранные города
    updateMapForFilteredOffices(selectedCity);
  });
}

/**
 * Обновление карты для отображения только отфильтрованных офисов
 */
function updateMapForFilteredOffices(selectedCity) {
  if (typeof ymaps === 'undefined') return;
  
  ymaps.ready(function() {
    const mapInstance = document.querySelector('#map')?.__yamap;
    if (!mapInstance) return;
    
    // Сбрасываем все маркеры
    if (typeof window.resetAllMarkers === 'function') {
      window.resetAllMarkers();
    }
    
    // Если выбраны все города, показываем все офисы на карте
    if (selectedCity === 'all') {
      // Показываем все офисы
      const allOfficeCoordinates = [];
      document.querySelectorAll('.office-card').forEach(card => {
        if (card.dataset.coordinates) {
          const coordinates = card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim()));
          if (coordinates.length === 2) {
            allOfficeCoordinates.push(coordinates);
          }
        }
      });
      
      // Устанавливаем оптимальный масштаб для всех офисов
      if (typeof window.showAllOfficesOnMap === 'function' && allOfficeCoordinates.length > 0) {
        window.showAllOfficesOnMap(allOfficeCoordinates);
      }
    } else {
      // Показываем только офисы выбранного города
      const filteredOfficeCoordinates = [];
      document.querySelectorAll(`.office-card[data-city="${selectedCity}"]`).forEach(card => {
        if (card.dataset.coordinates) {
          const coordinates = card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim()));
          if (coordinates.length === 2) {
            filteredOfficeCoordinates.push(coordinates);
          }
        }
      });
      
      // Устанавливаем оптимальный масштаб для выбранных офисов
      if (typeof window.showAllOfficesOnMap === 'function' && filteredOfficeCoordinates.length > 0) {
        window.showAllOfficesOnMap(filteredOfficeCoordinates);
      }
    }
  });
}

/**
 * Инициализация пагинации для офисов
 */
function initOfficesPagination() {
  const paginationContainer = document.querySelector('.pagination-container');
  if (!paginationContainer) return;
  
  // Инициализация пагинации с callback-функциями
  officesPagination = new Pagination({
    containerSelector: '.offices-grid',
    itemSelector: '.office-card',
    paginationSelector: '.pagination-container',
    itemsPerPage: 9, // Количество офисов на странице
    filterSelector: '#cityFilter',
    filterAttribute: 'data-city',
    
    // Callback перед сменой страницы
    beforePageChange: (page) => {
      // Перед сменой страницы снимаем выделение со всех карточек
      selectOfficeCardNoFocus(null);
    },
    
    // Callback после отрисовки страницы
    afterPageRender: (page) => {
      // После смены страницы загружаем дефолтный офис для новой страницы
      setTimeout(() => {
        // Проверяем текущие выделения
        const currentSelectedCards = document.querySelectorAll('.office-card.ring.ring-brand-blue:not(.hidden)');
        
        // Если нет выделенных карточек на текущей странице, выделяем дефолтную или первую
        if (currentSelectedCards.length === 0) {
          const visibleCards = Array.from(document.querySelectorAll('.office-card:not(.hidden)'));
          if (visibleCards.length > 0) {
            // Выделяем первую видимую карточку
            visibleCards[0].click();
          }
        }
      }, 50);
    }
  });
} 