/**
 * contacts-page.js
 * Модуль для функциональности страницы контактов
 */

import { selectOfficeCardNoFocus, selectOfficeCard } from './map.js';
import { Pagination } from './pagination.js';
import { createAutocompleteInput } from './autocomplete.js';

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
    officeCards.forEach((card, index) => {
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

      // Добавляем обработчик клика по карточке
      card.addEventListener('click', function(e) {
        // Если клик был по ссылке "Посмотреть на карте", обрабатываем его отдельно
        if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#map') {
          console.log('Клик по ссылке "Посмотреть на карте", индекс:', index);
          
          // Получаем данные офиса из карточки
          const officeData = {
            city: card.dataset.city || card.querySelector('h3')?.textContent.trim(),
            address: card.querySelector('.text-brand-gray')?.textContent.trim(),
            type: card.querySelectorAll('.text-brand-gray')[1]?.textContent.trim(),
            phone: card.querySelectorAll('.text-brand-gray')[2]?.textContent.trim(),
            email: card.querySelectorAll('.text-brand-gray')[3]?.textContent.trim()
          };
          
          // Получаем координаты
          const coordinates = card.dataset.coordinates ? 
            card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim())) : null;
          
          if (coordinates && coordinates.length === 2) {
            // Ждем инициализации карты
            if (typeof ymaps !== 'undefined') {
              ymaps.ready(() => {
                let mapInstance = document.querySelector('#map')?.__yamap;
                
                if (!mapInstance && window.mapInstance) {
                  mapInstance = window.mapInstance;
                }
                
                if (!mapInstance && window.currentMap) {
                  mapInstance = window.currentMap;
                }
                
                if (mapInstance && window.officeMarkers && window.officeMarkers[index]) {
                  // Используем функцию выбора офиса с центрированием карты и приближением
                  selectOfficeCard(
                    card,
                    officeData,
                    window.officeMarkers[index],
                    mapInstance,
                    coordinates
                  );
                  
                  // Устанавливаем маркер как активный
                  const marker = window.officeMarkers[index];
                  if (marker && marker.events && typeof window.setActiveMarker === 'function') {
                    window.setActiveMarker(marker);
                  }
                } else if (window.officeMarkers && window.officeMarkers[index]) {
                  const marker = window.officeMarkers[index];
                  if (marker && marker.events) {
                    marker.events.fire('click');
                  }
                  selectOfficeCardNoFocus(card, officeData);
                } else {
                  selectOfficeCardNoFocus(card, officeData);
                }
              });
            } else {
              selectOfficeCardNoFocus(card, officeData);
            }
          }
          return;
        }
        
        e.preventDefault();
        console.log('Клик по карточке офиса, индекс:', index);
        
        // Получаем данные офиса из карточки
        const officeData = {
          city: card.dataset.city || card.querySelector('h3')?.textContent.trim(),
          address: card.querySelector('.text-brand-gray')?.textContent.trim(),
          type: card.querySelectorAll('.text-brand-gray')[1]?.textContent.trim(),
          phone: card.querySelectorAll('.text-brand-gray')[2]?.textContent.trim(),
          email: card.querySelectorAll('.text-brand-gray')[3]?.textContent.trim()
        };
        
        console.log('Данные офиса:', officeData);
        
        // Получаем координаты
        const coordinates = card.dataset.coordinates ? 
          card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim())) : null;
        
        console.log('Координаты:', coordinates);
        console.log('Доступны ли Яндекс.Карты:', typeof ymaps !== 'undefined');
        console.log('Доступны ли маркеры:', !!window.officeMarkers);
        
        if (coordinates && coordinates.length === 2) {
          // Ждем инициализации карты
          if (typeof ymaps !== 'undefined') {
            ymaps.ready(() => {
              // Пробуем разные способы получения экземпляра карты
              let mapInstance = document.querySelector('#map')?.__yamap;
              
              // Альтернативный способ получения карты
              if (!mapInstance && window.mapInstance) {
                mapInstance = window.mapInstance;
              }
              
              // Еще один способ - через глобальную переменную
              if (!mapInstance && window.currentMap) {
                mapInstance = window.currentMap;
              }
              
              console.log('Экземпляр карты:', !!mapInstance);
              console.log('Маркер для индекса', index, ':', !!window.officeMarkers?.[index]);
              
              if (mapInstance && window.officeMarkers && window.officeMarkers[index]) {
                console.log('Вызываем selectOfficeCard с приближением');
                // Используем функцию выбора офиса с центрированием карты и приближением
                selectOfficeCard(
                  card,
                  officeData,
                  window.officeMarkers[index],
                  mapInstance,
                  coordinates
                );
                
                // Дополнительно: имитируем клик по маркеру для активации логики приближения
                const marker = window.officeMarkers[index];
                if (marker && marker.events) {
                  console.log('Устанавливаем маркер как активный');
                  // Устанавливаем маркер как активный
                  if (typeof window.setActiveMarker === 'function') {
                    window.setActiveMarker(marker);
                  }
                }
              } else if (window.officeMarkers && window.officeMarkers[index]) {
                console.log('Карта не найдена, но маркер есть - пробуем прямой вызов функции маркера');
                // Если карта не найдена, но маркер есть, попробуем симулировать клик по маркеру
                const marker = window.officeMarkers[index];
                if (marker && marker.events) {
                  // Симулируем клик по маркеру
                  marker.events.fire('click');
                }
                // И все равно выделяем карточку
                selectOfficeCardNoFocus(card, officeData);
              } else {
                console.log('Карта не готова, используем selectOfficeCardNoFocus');
                // Если карта не готова, просто выделяем карточку и показываем информацию
                selectOfficeCardNoFocus(card, officeData);
              }
            });
          } else {
            console.log('Яндекс.Карты не загружены');
            // Если Яндекс.Карты не загружены, просто выделяем карточку
            selectOfficeCardNoFocus(card, officeData);
          }
        } else {
          console.log('Некорректные координаты');
        }
      });
    });
    
    // Скрываем информационную панель при инициализации
    const infoPanel = document.querySelector('.map-info-panel');
    if (infoPanel) {
      infoPanel.classList.add('hidden');
    }
    
    // Отложенная инициализация для показа офиса по умолчанию
    setTimeout(() => {
      // Показываем офис по умолчанию
      const defaultOffice = window.initialData?.defaultOffice;
      if (defaultOffice) {
        console.log('Показываем офис по умолчанию');
        selectOfficeCardNoFocus(null, defaultOffice);
      }
    }, 1000);
  }

  // Инициализация пагинации с callback-функциями
  initOfficesPagination();
}

/**
 * Инициализация фильтра по городам
 */
function initCityFilter() {
  const cityFilterContainer = document.querySelector('.form .relative.w-full');
  if (!cityFilterContainer) return;

  // Получаем список уникальных городов из офисов
  const offices = window.initialData?.offices || [];
  const uniqueCities = Array.from(new Set(offices.map(office => office.city && office.city.trim()))).filter(Boolean);

  // Создаем поле автокомплита для фильтра по городам
  createAutocompleteInput(cityFilterContainer, offices, 'city-filter', 'Все города', { onlyCities: true });

  // Получаем ссылку на созданное поле ввода
  const cityInput = document.getElementById('city-filter-input');
  if (!cityInput) return;

  // Получаем кнопку сброса
  const resetButton = document.getElementById('city-filter-reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      // Очищаем поле ввода
      cityInput.value = '';
      // Сбрасываем фильтр
      if (officesPagination) {
        officesPagination.resetFilter();
      } else {
        document.querySelectorAll('.office-card').forEach(card => {
          card.classList.remove('hidden');
        });
      }
      // Обновляем карту и показываем офис по умолчанию
      updateMapForFilteredOffices('Все города');
      const defaultOffice = window.initialData?.defaultOffice;
      if (defaultOffice) {
        selectOfficeCardNoFocus(null, defaultOffice);
      }
    });
  }

  // Общая функция фильтрации карточек
  function filterOfficeCardsByCity(selectedCity) {
    console.log('Фильтрация по городу:', selectedCity);
    
    // Если выбраны все города, сбрасываем фильтр
    if (selectedCity === 'Все города') {
      if (officesPagination) {
        officesPagination.resetFilter();
      } else {
        document.querySelectorAll('.office-card').forEach(card => {
          card.classList.remove('hidden');
        });
      }
    } else {
      // Фильтруем по выбранному городу
      if (officesPagination) {
        // Используем метод пагинации для фильтрации
        officesPagination.applyFilter(selectedCity);
      } else {
        // Ручная фильтрация, если пагинация ещё не инициализирована
        document.querySelectorAll('.office-card').forEach(card => {
          const cardCity = card.dataset.city ? card.dataset.city.trim() : '';
          if (cardCity === selectedCity.trim()) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      }
    }
    
    updateMapForFilteredOffices(selectedCity);
    const defaultOffice = window.initialData?.defaultOffice;
    if (defaultOffice) {
      selectOfficeCardNoFocus(null, defaultOffice);
    }
  }

  // Добавляем обработчик выбора города из автокомплита
  cityInput.addEventListener('citySelected', function(e) {
    filterOfficeCardsByCity(e.detail.city);
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
    if (selectedCity === 'Все города') {
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
      document.querySelectorAll('.office-card').forEach(card => {
        const cardCity = card.dataset.city;
        if (cardCity === selectedCity && card.dataset.coordinates) {
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
    filterSelector: '#city-filter-input',
    filterAttribute: 'data-city',
    
    // Callback перед сменой страницы
    beforePageChange: (page) => {
      // Перед сменой страницы снимаем выделение со всех карточек
      selectOfficeCardNoFocus(null);
    },
    
    // Callback после отрисовки страницы
    afterPageRender: (page) => {
      // После смены страницы показываем офис по умолчанию
      setTimeout(() => {
        const defaultOffice = window.initialData?.defaultOffice;
        if (defaultOffice) {
          selectOfficeCardNoFocus(null, defaultOffice);
        }
      }, 100);
    }
  });
} 