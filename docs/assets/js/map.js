// Конфигурация карты для разных размеров экрана
const mapConfig = {
  // Начальные координаты и масштаб
  initialView: {
    center: [55.7558, 37.6173], // Москва
    zoom: {
      desktop: 12,     // Масштаб для десктопа
      tablet: 9,      // Масштаб для планшетов
      mobile: 7       // Масштаб для мобильных
    }
  },
  // Масштаб при выборе офиса
  officeZoom: {
    desktop: 14,
    tablet: 12,
    mobile: 10
  },
  // Максимальный масштаб при автоматической подгонке (fitBounds)
  maxBoundsZoom: {
    desktop: 10,
    tablet: 8,
    mobile: 7
  },
  // Отступы при автоматической подгонке
  boundsPadding: [50, 50]
};

// Определение текущего типа устройства
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Получение масштаба в зависимости от типа устройства
function getZoomForDevice(zoomConfig) {
  const deviceType = getDeviceType();
  return zoomConfig[deviceType];
}

// Функция для получения базового пути
function getBasePath() {
  // Получаем текущий скрипт
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1]; // Последний загруженный скрипт

  try {
    // Получаем путь к скрипту и извлекаем базовый путь
    const scriptSrc = currentScript.src;
    
    // Проверяем, содержит ли путь http:// или https://
    if (scriptSrc.includes('://')) {
      // Если это полный URL, извлекаем путь относительно корня сайта
      const url = new URL(scriptSrc);
      const pathParts = url.pathname.split('/');
      pathParts.pop(); // Удаляем имя файла (map.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      
      return pathParts.join('/') + '/';
    } else {
      // Если это относительный путь
      const pathParts = scriptSrc.split('/');
      pathParts.pop(); // Удаляем имя файла (map.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts.length >= 2 && pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      
      return pathParts.join('/') + '/';
    }
  } catch (error) {
    console.error('Ошибка при определении базового пути:', error);
    // Возвращаем относительный путь от корня в случае ошибки
    return './';
  }
}

// Инициализация карты при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, есть ли элемент карты на странице
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  // Добавляем небольшую задержку для гарантии корректной инициализации на больших экранах
  setTimeout(() => {
    // Получаем базовый путь
    const basePath = getBasePath();
    
    // Выводим информацию о текущем пути для отладки
    console.log('Базовый путь для карты:', basePath);
    
    // Проверяем, есть ли предварительно загруженные данные офисов в HTML
    if (window.officesData && window.officesData.offices) {
      console.log('Используем предварительно загруженные данные офисов из window.officesData');
      initMap(window.officesData.offices);
      return;
    }
    
    // Если данные не встроены через window.officesData, пробуем извлечь их из HTML-разметки
    const officeCards = document.querySelectorAll('.office-card');
    if (officeCards.length > 0) {
      console.log('Извлекаем данные офисов из HTML-разметки');
      
      // Собираем данные из HTML-элементов
      const offices = Array.from(officeCards).map((card, index) => {
        // Извлекаем данные из карточки офиса
        const cityText = card.querySelector('h3')?.textContent || '';
        const cityMatch = cityText.match(/^([^,]+),/);
        const city = cityMatch ? cityMatch[1].trim() : `Офис ${index + 1}`;
        
        // Извлекаем адрес (текст после запятой в заголовке)
        const address = cityText.replace(`${city}, `, '').trim();
        
        // Извлекаем остальные данные из div-элементов
        const divs = card.querySelectorAll('div.text-brand-gray');
        const type = divs[0]?.textContent || '';
        const phone = divs[1]?.textContent || '';
        const email = divs[2]?.textContent || '';
        
        // Получаем координаты из data-атрибута
        const coordinates = card.dataset.coordinates ? 
          card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim())) : 
          null;
        
        return {
          city,
          address,
          type,
          phone,
          email,
          coordinates
        };
      });
      
      // Инициализируем карту с данными из HTML
      if (offices.length > 0) {
        console.log('Найдено', offices.length, 'офисов в HTML-разметке');
        initMap(offices);
        return;
      }
    }
    
    // Если не удалось получить данные из HTML, пробуем загрузить их через fetch
    console.log('Пытаемся загрузить данные офисов через fetch:', `${basePath}assets/data/contacts.json`);
    fetch(`${basePath}assets/data/contacts.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Данные офисов успешно загружены через fetch');
        initMap(data.offices);
      })
      .catch(error => {
        console.error('Ошибка загрузки данных офисов через fetch:', error);
        
        // Если все способы не сработали, инициализируем карту без маркеров
        console.warn('Не удалось получить данные офисов, инициализируем карту без маркеров');
        initMap([]);
      });
  }, 100);
});

/**
 * Инициализация карты с маркерами офисов
 * @param {Array} offices - массив офисов из JSON
 */
function initMap(offices) {
  try {
    // Центрируем карту с учетом типа устройства
    const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);
    const map = L.map('map', {
      center: mapConfig.initialView.center,
      zoom: initialZoom,
      zoomControl: true,
      attributionControl: true,
      minZoom: 4, // Минимальный масштаб (не позволяет слишком сильно отдалиться)
      maxZoom: 18 // Максимальный масштаб (позволяет сильно приблизиться)
    });

    // Добавляем тайловый слой OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Принудительно обновляем размер карты после инициализации
    setTimeout(() => {
      map.invalidateSize();
      
      // Если нет маркеров, устанавливаем начальный масштаб принудительно
      if (!offices || offices.length === 0) {
        map.setView(mapConfig.initialView.center, initialZoom);
      }
    }, 100);

    // Получаем базовый путь для изображений
    const basePath = getBasePath();
    
    // Выводим информацию о путях к изображениям для отладки
    console.log('Путь к маркеру:', `${basePath}assets/img/map-marker.svg`);

    // Создаем иконки для маркеров с использованием внешних SVG файлов
    const defaultIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-9 h-[42px] text-brand-gray">
              <img src="${basePath}assets/img/map-marker.svg" alt="Маркер" class="w-full h-full" />
             </div>`,
      className: '',
      iconSize: [36, 42],
      iconAnchor: [18, 42]
    });

    const activeIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-9 h-[42px] text-brand-blue">
              <img src="${basePath}assets/img/map-marker-active.svg" alt="Активный маркер" class="w-full h-full" />
             </div>`,
      className: '',
      iconSize: [36, 42],
      iconAnchor: [18, 42]
    });

    // Создаем группу маркеров для удобного управления
    const markers = L.featureGroup();
    const officeMarkers = {};
    
    // Добавляем маркеры для каждого офиса
    offices.forEach((office, index) => {
      if (!office.coordinates || office.coordinates.length !== 2) return;
      
      const marker = L.marker(office.coordinates, { icon: defaultIcon })
        .bindTooltip(office.city)
        .addTo(map);
      
      // Сохраняем маркер с индексом офиса для последующего доступа
      officeMarkers[index] = marker;
      markers.addLayer(marker);
      
      // Обработчик клика по маркеру
      marker.on('click', () => {
        // Сбрасываем иконки всех маркеров на дефолтные
        Object.values(officeMarkers).forEach(m => m.setIcon(defaultIcon));
        
        // Устанавливаем активную иконку для выбранного маркера
        marker.setIcon(activeIcon);
        
        // Обновляем информационную панель
        updateInfoPanel(office);
      });
    });
    
    // Добавляем группу маркеров на карту и масштабируем карту
    markers.addTo(map);
    if (markers.getLayers().length > 0) {
      // Используем maxZoom из конфигурации в зависимости от устройства
      const maxZoom = getZoomForDevice(mapConfig.maxBoundsZoom);
      
      // Если маркер только один, сразу центрируем на нем с большим масштабом
      if (markers.getLayers().length === 1) {
        const marker = markers.getLayers()[0];
        const officeZoom = getZoomForDevice(mapConfig.officeZoom);
        map.setView(marker.getLatLng(), officeZoom);
      } else {
        // Если маркеров несколько, подгоняем карту под все маркеры
        map.fitBounds(markers.getBounds(), { 
          padding: mapConfig.boundsPadding, 
          maxZoom: maxZoom,
          animate: false
        });
      }
    }
    
    // Проверяем, есть ли уже выбранный офис в HTML
    const infoPanel = document.querySelector('.map-info-panel');
    if (infoPanel) {
      const isDefaultOfficeVisible = !infoPanel.classList.contains('hidden');
      
      // Если нет выбранного офиса, устанавливаем офис по умолчанию (первый в списке или Москва)
      if (!isDefaultOfficeVisible && offices.length > 0) {
        // Ищем офис в Москве или берем первый офис
        const defaultOfficeIndex = offices.findIndex(office => office.city === 'Москва') !== -1 ? 
          offices.findIndex(office => office.city === 'Москва') : 0;
        
        if (defaultOfficeIndex !== -1 && officeMarkers[defaultOfficeIndex]) {
          // Активируем маркер по умолчанию
          officeMarkers[defaultOfficeIndex].setIcon(activeIcon);
          
          // Центрируем карту на выбранном маркере с масштабом в зависимости от устройства
          const officeZoom = getZoomForDevice(mapConfig.officeZoom);
          map.setView(officeMarkers[defaultOfficeIndex].getLatLng(), officeZoom);
          
          // Обновляем информационную панель
          updateInfoPanel(offices[defaultOfficeIndex]);
        }
      }
    }
    
    // Обработчик клика по карточкам офисов на странице (если они есть)
    document.querySelectorAll('.office-card').forEach(card => {
      card.addEventListener('click', function() {
        const index = parseInt(this.dataset.index, 10);
        const marker = officeMarkers[index];
        
        if (marker) {
          // Сбрасываем иконки всех маркеров
          Object.values(officeMarkers).forEach(m => m.setIcon(defaultIcon));
          
          // Активируем выбранный маркер
          marker.setIcon(activeIcon);
          
          // Центрируем карту на выбранном маркере с масштабом в зависимости от устройства
          const officeZoom = getZoomForDevice(mapConfig.officeZoom);
          map.setView(marker.getLatLng(), officeZoom);
          
          // Обновляем информационную панель
          updateInfoPanel(offices[index]);
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
          
          // Сбрасываем иконки всех маркеров на дефолтные
          Object.values(officeMarkers).forEach(m => m.setIcon(defaultIcon));
        }
      });
    });
    
    // Обработчик изменения размера окна для адаптации карты
    window.addEventListener('resize', () => {
      // Получаем текущий центр карты
      const center = map.getCenter();
      
      // Обновляем размер карты с небольшой задержкой для корректной перерисовки
      setTimeout(() => {
        map.invalidateSize({
          animate: false,
          pan: false
        });
        
        // Устанавливаем новый масштаб в зависимости от устройства
        const newZoom = getZoomForDevice(mapConfig.initialView.zoom);
        map.setView(center, newZoom, { animate: false });
        
        // Если есть маркеры, обновляем границы карты
        if (markers.getLayers().length > 0) {
          const maxZoom = getZoomForDevice(mapConfig.maxBoundsZoom);
          map.fitBounds(markers.getBounds(), { 
            padding: mapConfig.boundsPadding, 
            maxZoom: maxZoom,
            animate: false
          });
        }
      }, 100);
    });
    
    // Дополнительное обновление размера карты при полной загрузке страницы
    window.addEventListener('load', () => {
      // Обновляем размер карты с небольшой задержкой для корректной перерисовки
      setTimeout(() => {
        map.invalidateSize({
          animate: false,
          pan: false
        });
        
        // Если есть маркеры, обновляем границы карты
        if (markers.getLayers().length > 0) {
          const maxZoom = getZoomForDevice(mapConfig.maxBoundsZoom);
          map.fitBounds(markers.getBounds(), { 
            padding: mapConfig.boundsPadding, 
            maxZoom: maxZoom,
            animate: false
          });
        }
      }, 200);
    });
  } catch (error) {
    console.error('Ошибка инициализации карты:', error);
    // Отображаем сообщение об ошибке в контейнере карты
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div class="flex items-center justify-center w-full h-full bg-gray-100 rounded-2xl">
          <div class="text-center p-4">
            <p class="text-brand-gray mb-2">Не удалось загрузить карту</p>
            <button class="bg-brand-blue text-white px-4 py-2 rounded-lg" onclick="location.reload()">
              Попробовать снова
            </button>
          </div>
        </div>
      `;
    }
  }
}

/**
 * Обновляет информационную панель с данными выбранного офиса
 * @param {Object} office - данные офиса
 */
function updateInfoPanel(office) {
  const infoPanel = document.querySelector('.map-info-panel');
  if (!infoPanel) return;
  
  // Если панель уже содержит данные из шаблона, не обновляем её через JavaScript
  if (infoPanel.querySelector('.font-bold.text-2xl') && 
      !infoPanel.classList.contains('hidden') && 
      infoPanel.querySelector('.font-bold.text-2xl').textContent === office.city) {
    return;
  }
  
  // Сохраняем классы Tailwind для позиционирования и стилей
  const tailwindClasses = infoPanel.className.split(' ').filter(cls => 
    !cls.includes('hidden') && 
    cls !== 'map-info-panel'
  ).join(' ');
  
  // Обновляем содержимое, сохраняя все классы Tailwind
  infoPanel.className = `map-info-panel ${tailwindClasses}`;
  
  infoPanel.innerHTML = `
    <div class="flex justify-end items-center mb-2">
      <button class="text-brand-gray hover:text-brand-blue transition-colors close-info-panel">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="font-bold text-2xl text-brand-gray">${office.city}</div>
    <div class="text-brand-gray">${office.address}</div>
    <div class="text-brand-gray">${office.type}</div>
    <div class="text-brand-gray">${office.phone}</div>
    <div class="text-brand-gray">${office.email}</div>
    <button class="bg-brand-blue mt-5 text-white rounded-lg py-3 px-4 text-sm hover:bg-blue-700 transition-colors">Подробнее</button>
  `;
  
  // Показываем панель
  infoPanel.classList.remove('hidden');
  
  // Добавляем обработчик для кнопки закрытия
  const closeButton = infoPanel.querySelector('.close-info-panel');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      infoPanel.classList.add('hidden');
    });
  }
} 