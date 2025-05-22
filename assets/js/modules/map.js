/**
 * map.js
 * Модуль для работы с картой и маркерами
 */

import { getDeviceType } from './utils.js';

// Цвета маркеров для карты
const ACTIVE_MARKER_COLOR = '#008DD2'; // Голубой бренд-цвет для активного маркера
const DEFAULT_MARKER_COLOR = '#666666'; // Серый цвет по умолчанию

// Конфигурация карты для разных размеров экрана
export const mapConfig = {
  // Начальные координаты и масштаб
  initialView: {
    // Разные центральные точки для разных типов устройств
    center: {
      desktop: [54.962902, 73.38475], // Центр России (для обзора всей страны на десктопе)
      mobile: [53.224854, 50.199879]  // Москва (для мобильных устройств)
    },
    zoom: {
      desktop: 4, // Масштаб для десктопов
      mobile: 3  // Масштаб для мобильных устройств
    }
  },
  // Масштаб при выборе офиса
  officeZoom: {
    desktop: 15, // Масштаб для десктопов при выборе офиса
    mobile: 13  // Масштаб для мобильных при выборе офиса
  },
  // Максимальный масштаб при автоматической подгонке (fitBounds)
  maxBoundsZoom: {
    desktop: 18, // Максимальный масштаб для десктопов
    mobile: 7  // Максимальный масштаб для мобильных
  },
  // Отступы при автоматической подгонке
  boundsPadding: [50, 50],
  // Настройки масштабирования иконок маркеров
  markerSizing: {
    minZoom: 2,        // Минимальный зум, при котором начинаем масштабировать
    maxZoom: 18,       // Максимальный зум для масштабирования иконок
    minSize: [16, 18], // Минимальный размер иконки [ширина, высота]
    maxSize: [36, 42], // Максимальный размер иконки [ширина, высота]
    minOffset: [-8, -18], // Минимальное смещение иконки
    maxOffset: [-18, -42]  // Максимальное смещение иконки
  }
};

/**
 * Функция для динамического создания маркера с указанным цветом
 * @param {string} color - Цвет маркера в формате HEX (#RRGGBB)
 * @returns {string} - URL инлайнового SVG с указанным цветом
 */
export function createColoredMarkerIcon(color) {
  // Создаем SVG с указанным цветом
  const svgTemplate = `
  <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.114 14.1578C33.014 4.91781 24.954 0.757812 17.874 0.757812C17.874 0.757812 17.874 0.757812 17.854 0.757812C10.794 0.757812 2.71397 4.89781 0.61397 14.1378C-1.72603 24.4578 4.59397 33.1978 10.314 38.6978C12.434 40.7378 15.154 41.7578 17.874 41.7578C20.594 41.7578 23.314 40.7378 25.414 38.6978C31.134 33.1978 37.454 24.4778 35.114 14.1578ZM17.874 24.1778C14.394 24.1778 11.574 21.3578 11.574 17.8778C11.574 14.3978 14.394 11.5778 17.874 11.5778C21.354 11.5778 24.174 14.3978 24.174 17.8778C24.174 21.3578 21.354 24.1778 17.874 24.1778Z" fill="${color}" />
  </svg>`;
  
  // Кодируем SVG для использования в URL
  const encodedSvg = encodeURIComponent(svgTemplate);
  
  // Формируем данные для инлайн-SVG
  return `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
}

// Получение масштаба в зависимости от типа устройства
export function getZoomForDevice(zoomConfig) {
  const deviceType = getDeviceType();
  return zoomConfig[deviceType];
}

// Получение центральной точки в зависимости от типа устройства
export function getCenterForDevice(centerConfig) {
  const deviceType = getDeviceType();
  return centerConfig[deviceType];
}

/**
 * Функция для вычисления размера иконки в зависимости от текущего зума
 * @param {number} currentZoom - Текущий масштаб карты
 * @returns {Object} - Объект с размерами иконки и смещением
 */
export function getMarkerSizeForZoom(currentZoom) {
  const { minZoom, maxZoom, minSize, maxSize, minOffset, maxOffset } = mapConfig.markerSizing;
  
  // Если зум меньше минимального, возвращаем минимальный размер
  if (currentZoom <= minZoom) {
    return {
      size: minSize,
      offset: minOffset
    };
  }
  
  // Если зум больше максимального, возвращаем максимальный размер
  if (currentZoom >= maxZoom) {
    return {
      size: maxSize,
      offset: maxOffset
    };
  }
  
  // Вычисляем коэффициент масштабирования (от 0 до 1)
  const zoomRatio = (currentZoom - minZoom) / (maxZoom - minZoom);
  
  // Вычисляем размеры иконки с учетом коэффициента масштабирования
  const width = Math.round(minSize[0] + (maxSize[0] - minSize[0]) * zoomRatio);
  const height = Math.round(minSize[1] + (maxSize[1] - minSize[1]) * zoomRatio);
  
  // Вычисляем смещение иконки с учетом пропорции размера
  // Используем отношение текущей высоты к максимальной для более точного позиционирования
  const heightRatio = height / maxSize[1];
  const offsetX = Math.round(minOffset[0] + (maxOffset[0] - minOffset[0]) * heightRatio);
  const offsetY = Math.round(minOffset[1] + (maxOffset[1] - minOffset[1]) * heightRatio);
  
  return {
    size: [width, height],
    offset: [offsetX, offsetY]
  };
}

/**
 * Обновляет информационную панель с данными выбранного офиса
 * @param {Object} office - объект с данными офиса
 */
export function updateInfoPanel(office) {
  const infoPanel = document.querySelector('.map-info-panel');
  if (!infoPanel) return;
  
  // Проверяем и очищаем адрес от повторения города, если он уже содержит город в начале
  let displayAddress = office.address || '';
  if (office.city && displayAddress.trim().startsWith(office.city + ',')) {
    displayAddress = displayAddress.replace(office.city + ',', '').trim();
  }
  
  // Очищаем содержимое панели, чтобы заполнить его динамически
  infoPanel.innerHTML = `
    <div class="flex justify-between items-center mb-2">
      <div class="font-bold text-2xl text-brand-gray">${office.city || ''}</div>
      <button class="text-brand-gray hover:text-brand-blue transition-colors close-info-panel">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="text-brand-gray">${displayAddress}</div>
    <div class="hidden lg:block text-brand-gray">${office.type || ''}</div>
    ${office.phone ? `<div class="hidden lg:block text-brand-gray">${office.phone}</div>` : ''}
    ${office.email ? `<div class="hidden lg:block text-brand-gray">${office.email}</div>` : ''}
    <button class="bg-brand-blue mt-2 md:mt-5 text-white rounded-lg py-3 text-buttons text-regular hover:bg-blue-700 transition-colors">Подробнее</button>
  `;
  
  // Показываем панель
  infoPanel.classList.remove('hidden');
  
  // Добавляем обработчик для кнопки закрытия
  const closeButton = infoPanel.querySelector('.close-info-panel');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      infoPanel.classList.add('hidden');
      
      // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
      if (typeof window.resetAllMarkers === 'function') {
        window.resetAllMarkers();
      }
      
      // Используем централизованную функцию для сброса выделения без центрирования карты
      selectOfficeCardNoFocus(null);
    });
  }
}

/**
 * Централизованная функция для выбора карточки офиса БЕЗ центрирования и масштабирования карты
 * Используется только при инициализации, чтобы не приближать карту при загрузке страницы
 * @param {HTMLElement|null} selectedCard - карточка офиса для выделения или null чтобы снять выделение со всех
 * @param {Object|null} officeData - данные офиса для обновления информационной панели
 * @param {Object|null} marker - маркер на карте для выделения
 * @param {Object|null} map - объект карты
 */
export function selectOfficeCardNoFocus(selectedCard, officeData = null, marker = null, map = null) {
  // Удаляем выделение со всех карточек
  document.querySelectorAll('.office-card').forEach(card => {
    card.classList.remove('ring', 'ring-brand-blue');
  });
  
  // Если передана карточка, выделяем её
  if (selectedCard) {
    selectedCard.classList.add('ring', 'ring-brand-blue');
  }
  
  // Если переданы данные офиса, обновляем информационную панель
  if (officeData) {
    updateInfoPanel(officeData);
  }
  
  // Если переданы маркер и карта, только выделяем маркер, но НЕ центрируем карту
  if (marker && map) {
    // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
    if (typeof window.resetAllMarkers === 'function') {
      window.resetAllMarkers();
    }
    
    // Создаем маркер активного офиса с голубым цветом
    if (marker.options) {
      // Получаем текущий зум для корректного размера
      const currentZoom = map.getZoom();
      const markerProps = getMarkerSizeForZoom(currentZoom);
      
      // Создаем URL для синего маркера
      const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);
      
      // Устанавливаем активную иконку
      marker.options.set({
        iconImageHref: activeMarkerUrl,
        iconImageSize: markerProps.size,
        iconImageOffset: markerProps.offset
      });
    }
    
    // Важно: в этой версии функции мы НЕ центрируем карту и НЕ изменяем масштаб
  }
}

/**
 * Централизованная функция для выбора карточки офиса С центрированием и масштабированием карты
 * Используется при клике на маркер или карточку офиса
 * @param {HTMLElement|null} selectedCard - карточка офиса для выделения или null чтобы снять выделение со всех
 * @param {Object|null} officeData - данные офиса для обновления информационной панели
 * @param {Object|null} marker - маркер на карте для выделения
 * @param {Object|null} map - объект карты
 * @param {Array|null} coordinates - координаты для центрирования карты [долгота, широта]
 */
export function selectOfficeCard(selectedCard, officeData = null, marker = null, map = null, coordinates = null) {
  // Сначала делаем все те же действия, что и в версии без фокуса
  // Удаляем выделение со всех карточек
  document.querySelectorAll('.office-card').forEach(card => {
    card.classList.remove('ring', 'ring-brand-blue');
  });
  
  // Если передана карточка, выделяем её
  if (selectedCard) {
    selectedCard.classList.add('ring', 'ring-brand-blue');
  }
  
  // Если переданы данные офиса, обновляем информационную панель
  if (officeData) {
    updateInfoPanel(officeData);
  }
  
  // Если переданы маркер и карта, выделяем маркер и центрируем карту
  if (marker && map) {
    // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
    if (typeof window.resetAllMarkers === 'function') {
      window.resetAllMarkers();
    }
    
    // Создаем маркер активного офиса с голубым цветом
    if (marker.options) {
      // Получаем текущий зум для корректного размера
      const currentZoom = map.getZoom();
      const markerProps = getMarkerSizeForZoom(currentZoom);
      
      // Создаем URL для синего маркера
      const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);
      
      // Устанавливаем активную иконку
      marker.options.set({
        iconImageHref: activeMarkerUrl,
        iconImageSize: markerProps.size,
        iconImageOffset: markerProps.offset
      });
    }
    
    // Дополнительно: центрируем карту на выбранном маркере или координатах
    if (coordinates) {
      // Определяем оптимальный масштаб в зависимости от устройства
      const newZoom = getZoomForDevice(mapConfig.officeZoom);
      
      // Центрируем карту на выбранном маркере с анимацией и оптимальным масштабом
      map.setCenter(coordinates, newZoom, { duration: 300 });
    }
  }
}

/**
 * Инициализация карты с маркерами офисов
 * @param {Array} offices - массив офисов из JSON
 * @param {string} basePath - базовый путь для загрузки ресурсов
 */
export function initMap(offices, basePath) {
  try {
    // Ждем загрузки API Яндекс.Карт
    ymaps.ready(function() {
      // Центрируем карту с учетом типа устройства
      const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);
      const initialCenter = getCenterForDevice(mapConfig.initialView.center);
      
      // Создаем карту
      const map = new ymaps.Map('map', {
        center: initialCenter,
        zoom: initialZoom,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors: ['drag', 'multiTouch']
      });

      // Создаем коллекцию маркеров
      const markers = new ymaps.GeoObjectCollection();
      const officeMarkers = {};
      
      // Отслеживаем активный маркер для определения повторного клика
      let activeMarker = null;
      
      // Получаем начальные размеры маркеров
      const initialMarkerProps = getMarkerSizeForZoom(initialZoom);
      
      // Создаем иконки для маркеров с учетом начального масштаба
      const defaultIcon = {
        iconLayout: 'default#image',
        iconImageHref: createColoredMarkerIcon(DEFAULT_MARKER_COLOR),
        iconImageSize: initialMarkerProps.size,
        iconImageOffset: initialMarkerProps.offset
      };

      // Функция для обновления размеров всех маркеров
      function updateAllMarkersSize(currentZoom) {
        const markerProps = getMarkerSizeForZoom(currentZoom);
        
        // Обновляем размеры для всех маркеров
        Object.values(officeMarkers).forEach(marker => {
          // Сохраняем текущий статус (активный или нет)
          const isActive = marker.options.get('iconImageHref').includes(encodeURIComponent(ACTIVE_MARKER_COLOR));
          
          // Обновляем размеры
          marker.options.set({
            iconImageSize: markerProps.size,
            iconImageOffset: markerProps.offset
          });
        });
      }
      
      // Функция для сброса иконок всех маркеров на дефолтные
      window.resetAllMarkers = function() {
        const currentZoom = map.getZoom();
        const markerProps = getMarkerSizeForZoom(currentZoom);
        
        Object.values(officeMarkers).forEach(m => {
          // Устанавливаем цвет по умолчанию (серый)
          const defaultMarkerUrl = createColoredMarkerIcon(DEFAULT_MARKER_COLOR);
          
          m.options.set({
            iconImageHref: defaultMarkerUrl,
            iconImageSize: markerProps.size,
            iconImageOffset: markerProps.offset
          });
        });
        
        // НЕ сбрасываем активный маркер здесь
        // activeMarker = null;
      };
    
      // Добавляем маркеры для каждого офиса
      offices.forEach((office, index) => {
        if (!office.coordinates || office.coordinates.length !== 2) return;
        
        // Создаем маркер с серым цветом по умолчанию
        const defaultMarkerUrl = createColoredMarkerIcon(DEFAULT_MARKER_COLOR);
        
        const marker = new ymaps.Placemark(office.coordinates, {
          hintContent: office.city
        }, {
          iconLayout: 'default#image',
          iconImageHref: defaultMarkerUrl,
          iconImageSize: initialMarkerProps.size,
          iconImageOffset: initialMarkerProps.offset
        });
      
        // Сохраняем маркер с индексом офиса для последующего доступа
        officeMarkers[index] = marker;
        markers.add(marker);
      
        // Обработчик клика по маркеру
        marker.events.add('click', () => {
          // Добавляем отладочную информацию для диагностики
          console.log('Клик по маркеру');
          
          // Получаем текущий масштаб карты
          const currentZoom = map.getZoom();
          const officeZoom = getZoomForDevice(mapConfig.officeZoom);
          const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);
          
          // Определяем, приближен ли сейчас маркер по ТЕКУЩЕМУ масштабу карты
          // Используем строгое сравнение с officeZoom с погрешностью
          const isCurrentlyZoomed = Math.abs(currentZoom - officeZoom) < 3;
          
          console.log('Текущий масштаб:', currentZoom);
          console.log('Масштаб офиса:', officeZoom);
          console.log('Начальный масштаб:', initialZoom);
          console.log('Маркер сейчас приближен:', isCurrentlyZoomed);
          console.log('Активный маркер:', activeMarker === marker ? 'Текущий' : (activeMarker ? 'Другой' : 'Нет'));
          
          // Проверяем, является ли текущий маркер уже активным
          const isCurrentMarker = activeMarker === marker;
          
          if (!isCurrentMarker) {
            console.log('Действие: Выделяем новый маркер без фокусировки');
            // Если это новый маркер - выделяем его без фокусировки
            selectOfficeCardNoFocus(
              null, // карточка не известна
              office, 
              marker, 
              map
            );
            
            // Запоминаем текущий активный маркер
            activeMarker = marker;
          } 
          else {
            // Это клик по уже активному маркеру
            if (!isCurrentlyZoomed) {
              // Если маркер НЕ приближен (по фактическому масштабу) - приближаем его
              console.log('Действие: Приближаем маркер');
              selectOfficeCard(
                null, // карточка не известна
                office, 
                marker, 
                map, 
                marker.geometry.getCoordinates()
              );
            }
            else {
              // Если маркер уже приближен - возвращаем к обзорному масштабу БЕЗ смещения центра
              console.log('Действие: Отдаляем маркер, сохраняем позицию и меняем только масштаб');
              
              // Получаем начальный масштаб для текущего устройства
              console.log('Целевой масштаб:', initialZoom);
              
              // Получаем текущий центр карты
              const currentCenter = map.getCenter();
              console.log('Сохраняем текущий центр карты:', currentCenter);
              
              // Явно указываем, что маркер должен остаться активным
              // Получаем текущий зум для корректного размера  
              const markerProps = getMarkerSizeForZoom(initialZoom);
              
              // Создаем URL для синего маркера
              const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);
              
              // Сначала меняем ТОЛЬКО масштаб с анимацией, но сохраняем текущий центр
              map.setZoom(initialZoom, { duration: 300 });
              
              // Обеспечиваем, чтобы маркер остался активным после изменения масштаба
              setTimeout(() => {
                // Проверяем, что marker все еще существует
                if (marker && marker.options) {
                  marker.options.set({
                    iconImageHref: activeMarkerUrl,
                    iconImageSize: markerProps.size,
                    iconImageOffset: markerProps.offset
                  });
                }
              }, 350); // Небольшая задержка после анимации
            }
          }
        });
      });
    
      // Добавляем коллекцию маркеров на карту
      map.geoObjects.add(markers);
      
      // Добавляем обработчик события изменения масштаба карты
      map.events.add('boundschange', function(e) {
        if (e.get('oldZoom') !== e.get('newZoom')) {
          updateAllMarkersSize(e.get('newZoom'));
          
          // Добавляем логирование при изменении масштаба
          const newZoom = e.get('newZoom');
          console.log('Масштаб изменился на:', newZoom);
        }
      });
      
      // Если есть маркеры, настраиваем отображение карты
      if (markers.getLength() > 0) {
        // Используем заданный в конфигурации масштаб и центр для текущего устройства без автоподгонки
        console.log(`${getDeviceType()}: используем заданный масштаб и центр`, initialZoom);
        map.setCenter(initialCenter, initialZoom);
      }
    
      // Проверяем, есть ли уже выбранный офис в HTML
      const infoPanel = document.querySelector('.map-info-panel');
      
      // Загружаем данные дефолтного офиса из JSON
      fetch(`${basePath}assets/data/default-office.json`)
        .then(response => response.json())
        .then(defaultOfficeData => {
          // Добавляем дефолтный офис в список, если его там еще нет
          const defaultOfficeExists = offices.some(office => 
            office.city === defaultOfficeData.city && 
            office.address === defaultOfficeData.address
          );
          
          if (!defaultOfficeExists && defaultOfficeData.coordinates) {
            // Добавляем дефолтный офис в массив офисов
            offices.push(defaultOfficeData);
            
            // Создаем маркер для дефолтного офиса
            const defaultMarkerIndex = offices.length - 1;
            
            // Получаем текущий размер маркеров
            const currentZoom = map.getZoom();
            const markerProps = getMarkerSizeForZoom(currentZoom);
            
            // Создаем маркер с серым цветом по умолчанию
            const defaultMarkerUrl = createColoredMarkerIcon(DEFAULT_MARKER_COLOR);
            
            const defaultMarker = new ymaps.Placemark(defaultOfficeData.coordinates, {
              hintContent: defaultOfficeData.city
            }, {
              iconLayout: 'default#image',
              iconImageHref: defaultMarkerUrl,
              iconImageSize: markerProps.size,
              iconImageOffset: markerProps.offset
            });
            
            // Добавляем обработчик клика
            defaultMarker.events.add('click', () => {
              // Добавляем отладочную информацию для диагностики
              console.log('Клик по дефолтному маркеру');
              
              // Получаем текущий масштаб карты
              const currentZoom = map.getZoom();
              const officeZoom = getZoomForDevice(mapConfig.officeZoom);
              const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);
              
              // Определяем, приближен ли сейчас маркер по ТЕКУЩЕМУ масштабу карты
              // Используем строгое сравнение с officeZoom с погрешностью
              const isCurrentlyZoomed = Math.abs(currentZoom - officeZoom) < 3;
              
              console.log('Текущий масштаб:', currentZoom);
              console.log('Масштаб офиса:', officeZoom);
              console.log('Начальный масштаб:', initialZoom);
              console.log('Дефолтный маркер сейчас приближен:', isCurrentlyZoomed);
              console.log('Активный маркер:', activeMarker === defaultMarker ? 'Текущий дефолтный' : (activeMarker ? 'Другой' : 'Нет'));
              
              // Проверяем, является ли текущий маркер уже активным
              const isCurrentMarker = activeMarker === defaultMarker;
              
              if (!isCurrentMarker) {
                console.log('Действие: Выделяем новый дефолтный маркер без фокусировки');
                // Если это новый маркер - выделяем его без фокусировки
                selectOfficeCardNoFocus(
                  null, // карточка не известна
                  defaultOfficeData, 
                  defaultMarker, 
                  map
                );
                
                // Запоминаем текущий активный маркер
                activeMarker = defaultMarker;
              } 
              else {
                // Это клик по уже активному маркеру
                if (!isCurrentlyZoomed) {
                  // Если маркер НЕ приближен (по фактическому масштабу) - приближаем его
                  console.log('Действие: Приближаем дефолтный маркер');
                  selectOfficeCard(
                    null, // карточка не известна
                    defaultOfficeData, 
                    defaultMarker, 
                    map, 
                    defaultOfficeData.coordinates
                  );
                }
                else {
                  // Если маркер уже приближен - возвращаем к обзорному масштабу БЕЗ смещения центра
                  console.log('Действие: Отдаляем дефолтный маркер, сохраняем позицию и меняем только масштаб');
                  
                  // Получаем начальный масштаб для текущего устройства
                  console.log('Целевой масштаб:', initialZoom);
                  
                  // Получаем текущий центр карты
                  const currentCenter = map.getCenter();
                  console.log('Сохраняем текущий центр карты:', currentCenter);
                  
                  // Явно указываем, что маркер должен остаться активным
                  // Получаем текущий зум для корректного размера  
                  const markerProps = getMarkerSizeForZoom(initialZoom);
                  
                  // Создаем URL для синего маркера
                  const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);
                  
                  // Сначала меняем ТОЛЬКО масштаб с анимацией, но сохраняем текущий центр
                  map.setZoom(initialZoom, { duration: 300 });
                  
                  // Обеспечиваем, чтобы маркер остался активным после изменения масштаба
                  setTimeout(() => {
                    // Проверяем, что defaultMarker все еще существует
                    if (defaultMarker && defaultMarker.options) {
                      defaultMarker.options.set({
                        iconImageHref: activeMarkerUrl,
                        iconImageSize: markerProps.size,
                        iconImageOffset: markerProps.offset
                      });
                    }
                  }, 350); // Небольшая задержка после анимации
                }
              }
            });
            
            // Сохраняем маркер и добавляем на карту
            officeMarkers[defaultMarkerIndex] = defaultMarker;
            markers.add(defaultMarker);
            map.geoObjects.add(defaultMarker);
          }
          
          // Выделяем дефолтный офис и его маркер (если он не скрыт)
          const defaultOfficeIndex = offices.findIndex(office => 
            office.city === defaultOfficeData.city && 
            office.address === defaultOfficeData.address
          );
          
          if (defaultOfficeIndex !== -1) {
            const defaultMarker = officeMarkers[defaultOfficeIndex];
            if (defaultMarker) {
              // Находим карточку офиса, соответствующую дефолтному офису
              const officeCards = document.querySelectorAll('.office-card');
              let defaultCard = null;
              
              officeCards.forEach(card => {
                const cardCity = card.dataset.city;
                const addressDiv = card.querySelector('h3 + div.text-brand-gray');
                const cardAddress = addressDiv ? addressDiv.textContent.trim() : '';
                
                if (cardCity === defaultOfficeData.city && 
                   (cardAddress.includes(defaultOfficeData.address))) {
                  defaultCard = card;
                }
              });
              
              // Используем централизованную функцию для выделения дефолтного офиса
              // НО специальную версию без фокусировки карты, чтобы не приближать при инициализации
              selectOfficeCardNoFocus(
                defaultCard, // может быть null, если карточка не найдена
                offices[defaultOfficeIndex],
                defaultMarker,
                map
              );
              
              // Устанавливаем дефолтный маркер как активный
              activeMarker = defaultMarker;
            }
          }
        })
        .catch(error => {
          console.error('Ошибка при загрузке дефолтного офиса:', error);
        });
    
      // Обработчик клика по карточкам офисов на странице (если они есть)
      document.querySelectorAll('.office-card').forEach((card, cardIndex) => {
        card.addEventListener('click', function() {
          // Получаем индекс офиса из атрибута или из порядкового номера
          const index = this.dataset.index ? parseInt(this.dataset.index, 10) : cardIndex;
          const marker = officeMarkers[index];
          
          if (marker) {
            // Здесь всегда фокусируем карту при клике на карточку офиса
            // (поскольку пользователь явно сделал выбор через интерфейс)
            selectOfficeCard(
              this, 
              offices[index], 
              marker, 
              map, 
              marker.geometry.getCoordinates()
            );
            
            // Устанавливаем текущий маркер как активный с приближением
            activeMarker = marker;
          }
        });
      });
    
      // Добавляем обработчик для кнопки закрытия информационной панели
      const closeButtons = document.querySelectorAll('.close-info-panel');
      closeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const infoPanel = this.closest('.map-info-panel');
          if (infoPanel) {
            infoPanel.classList.add('hidden');
            
            // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
            if (typeof window.resetAllMarkers === 'function') {
              window.resetAllMarkers();
            }
            
            // Используем централизованную функцию для сброса выделения без центрирования карты
            selectOfficeCardNoFocus(null);
            
            // Явно сбрасываем активный маркер только при закрытии панели
            activeMarker = null;
          }
        });
      });
    
      // Обработчик изменения размера окна для адаптации карты
      window.addEventListener('resize', () => {
        // Получаем текущий центр карты
        const center = map.getCenter();
        
        // Обновляем размер карты с небольшой задержкой для корректной перерисовки
        setTimeout(() => {
          map.container.fitToViewport();
          
          // Получаем новый тип устройства после изменения размера окна
          const newDeviceType = getDeviceType();
          
          // Устанавливаем новый масштаб и центр в зависимости от устройства
          const newZoom = getZoomForDevice(mapConfig.initialView.zoom);
          const newCenter = getCenterForDevice(mapConfig.initialView.center);
          
          // Применяем новые настройки
          map.setCenter(newCenter, newZoom, { duration: 0 });
          
          // Отключаем автоматическую подгонку карты под маркеры при ресайзе
          // чтобы сохранить выбранный пользователем масштаб
        }, 200);
      });
      
      // Обработчик клика по карте для сброса активного маркера при клике в пустую область
      map.events.add('click', (e) => {
        // Проверяем, не кликнули ли мы по маркеру
        if (!e.get('target').options) {
          // НЕ сбрасываем активный маркер при клике в пустую область карты
          // Закомментировано, чтобы избежать сброса activeMarker
          // activeMarker = null;
        }
      });
    });
  } catch (error) {
    console.error('Ошибка при инициализации карты:', error);
  }
} 