// Определяем базовый путь для ресурсов, используя атрибуты скрипта
function getBasePath() {
  // Получаем текущий скрипт
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1]; // Последний загруженный скрипт (наш файл)

  try {
    // Получаем путь к скрипту и извлекаем базовый путь
    const scriptSrc = currentScript.src;
    
    // Проверяем, содержит ли путь http:// или https://
    if (scriptSrc.includes('://')) {
      // Если это полный URL, извлекаем путь относительно корня сайта
      const url = new URL(scriptSrc);
      const pathParts = url.pathname.split('/');
      pathParts.pop(); // Удаляем имя файла (main.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      // Если скрипт находится в папке assets, удаляем последнюю часть пути
      else if (pathParts[pathParts.length - 1] === 'assets') {
        pathParts.pop(); // Удаляем assets
      }
      
      return pathParts.join('/') + '/';
    } else {
      // Если это относительный путь
      const pathParts = scriptSrc.split('/');
      pathParts.pop(); // Удаляем имя файла (main.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts.length >= 2 && pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      // Если скрипт находится в папке assets, удаляем последнюю часть пути
      else if (pathParts.length >= 1 && pathParts[pathParts.length - 1] === 'assets') {
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

// Базовый путь для использования в скрипте
const BASE_PATH = getBasePath();
console.log('Определен базовый путь:', BASE_PATH);

// Конфигурация карты для разных размеров экрана
const mapConfig = {
  // Начальные координаты и масштаб
  initialView: {
    center: [55.7558, 37.6173], // Москва
    zoom: {
      desktop: 14,
      tablet: 11,
      mobile: 4      // Уменьшаю с 17 до 15 (средний вариант)
    }
  },
  // Масштаб при выборе офиса
  officeZoom: {
    desktop: 14,
    tablet: 12,
    mobile: 15      // Уменьшаю с 18 до 15 (более сбалансированно)
  },
  // Максимальный масштаб при автоматической подгонке (fitBounds)
  maxBoundsZoom: {
    desktop: 14,  
    tablet: 11,   
    mobile: 9    
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

// Инициализация карты при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, есть ли элемент карты на странице
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  // Добавляем небольшую задержку для гарантии корректной инициализации на больших экранах
  setTimeout(() => {
    // Сначала проверяем, есть ли данные офисов на странице в виде data-атрибутов в карточках офисов
    let offices = [];
    const officeCards = document.querySelectorAll('.office-card');
    let dataFound = false;
    
    if (officeCards && officeCards.length > 0) {
      console.log('Найдены карточки офисов на странице:', officeCards.length);
      
      // Собираем данные офисов из карточек
      officeCards.forEach(card => {
        if (card.dataset.coordinates) {
          const coordinates = card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim()));
          if (coordinates.length === 2) {
            const city = card.dataset.city || '';
            const address = card.querySelector('h3')?.textContent?.replace(city + ',', '').trim() || '';
            const typeElem = card.querySelector('div:nth-of-type(1)');
            const phoneElem = card.querySelector('div:nth-of-type(2)');
            const emailElem = card.querySelector('div:nth-of-type(3)');
            
            offices.push({
              city: city,
              address: address,
              type: typeElem ? typeElem.textContent : '',
              phone: phoneElem ? phoneElem.textContent : '',
              email: emailElem ? emailElem.textContent : '',
              coordinates: coordinates
            });
          }
        }
      });
      
      if (offices.length > 0) {
        console.log('Собраны данные офисов из карточек:', offices.length);
        initMap(offices);
        dataFound = true;
      }
    }
    
    // Если не нашли данные в карточках, проверяем наличие скрытых данных офисов
    if (!dataFound && window.officesData && window.officesData.length > 0) {
      console.log('Использую предварительно загруженные данные офисов из переменной window.officesData:', window.officesData.length);
      initMap(window.officesData);
      dataFound = true;
    }
    
    // Если данные не найдены ни в DOM, ни в глобальной переменной, показываем карту без маркеров или с дефолтным офисом
    if (!dataFound) {
      // Проверяем, есть ли дефолтный офис в DOM
      const defaultOfficeCity = document.querySelector('.map-info-panel .font-bold.text-2xl.text-brand-gray');
      if (defaultOfficeCity) {
        console.log('Найдены данные для дефолтного офиса в DOM');
        const defaultOfficeAddress = document.querySelector('.map-info-panel div:nth-of-type(3)');
        const defaultOfficeType = document.querySelector('.map-info-panel div:nth-of-type(4)');
        const defaultOfficePhone = document.querySelector('.map-info-panel div:nth-of-type(5)');
        const defaultOfficeEmail = document.querySelector('.map-info-panel div:nth-of-type(6)');
        
        // Координаты для Красноярска (или может быть в другом месте, если указано)
        let defaultCoordinates = [56.010563, 92.852572]; // Красноярск 
        
        // Пробуем найти координаты в ближайших атрибутах (если есть)
        const mapInfoPanel = document.querySelector('.map-info-panel');
        if (mapInfoPanel && mapInfoPanel.dataset.coordinates) {
          const coordStr = mapInfoPanel.dataset.coordinates;
          const coords = coordStr.split(',').map(coord => parseFloat(coord.trim()));
          if (coords.length === 2) {
            defaultCoordinates = coords;
          }
        }
        
        const defaultOffice = {
          city: defaultOfficeCity.textContent,
          address: defaultOfficeAddress ? defaultOfficeAddress.textContent : '',
          type: defaultOfficeType ? defaultOfficeType.textContent : '',
          phone: defaultOfficePhone ? defaultOfficePhone.textContent : '',
          email: defaultOfficeEmail ? defaultOfficeEmail.textContent : '',
          coordinates: defaultCoordinates
        };
        
        initMap([defaultOffice]);
      } else {
        console.log('Данные не найдены на странице, инициализируем карту без маркеров');
        initMap([]);
      }
    }
  }, 100);
});

/**
 * Инициализация карты с маркерами офисов
 * @param {Array} offices - массив офисов из JSON
 */
function initMap(offices) {
  try {
    // Ждем загрузки API Яндекс.Карт
    ymaps.ready(function() {
      // Центрируем карту с учетом типа устройства
      const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);
      
      // Создаем карту
      const map = new ymaps.Map('map', {
        center: mapConfig.initialView.center,
        zoom: initialZoom,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors: ['drag', 'multiTouch']
      });

      // Создаем коллекцию маркеров
      const markers = new ymaps.GeoObjectCollection();
      const officeMarkers = {};
      
      // Создаем иконки для маркеров
      const defaultIcon = {
        iconLayout: 'default#image',
        iconImageHref: `${BASE_PATH}assets/img/map-marker.svg`,
        iconImageSize: [36, 42],
        iconImageOffset: [-18, -42]
      };

      const activeIcon = {
        iconLayout: 'default#image',
        iconImageHref: `${BASE_PATH}assets/img/map-marker-active.svg`,
        iconImageSize: [36, 42],
        iconImageOffset: [-18, -42]
      };
      
      // Функция для сброса иконок всех маркеров на дефолтные
      window.resetAllMarkers = function() {
        Object.values(officeMarkers).forEach(m => m.options.set(defaultIcon));
      };
      
      // Добавляем маркеры для каждого офиса
      offices.forEach((office, index) => {
        if (!office.coordinates || office.coordinates.length !== 2) return;
        
        const marker = new ymaps.Placemark(office.coordinates, {
          hintContent: office.city
        }, defaultIcon);
        
        // Сохраняем маркер с индексом офиса для последующего доступа
        officeMarkers[index] = marker;
        markers.add(marker);
        
        // Обработчик клика по маркеру
        marker.events.add('click', () => {
          // Сбрасываем иконки всех маркеров на дефолтные
          Object.values(officeMarkers).forEach(m => m.options.set(defaultIcon));
          
          // Устанавливаем активную иконку для выбранного маркера
          marker.options.set(activeIcon);
          
          // Центрируем карту на выбранном маркере
          const officeZoom = getZoomForDevice(mapConfig.officeZoom);
          map.setCenter(marker.geometry.getCoordinates(), officeZoom);
          
          // Обновляем информационную панель
          updateInfoPanel(office);
        });
      });
      
      // Добавляем коллекцию маркеров на карту
      map.geoObjects.add(markers);
      
      // Если есть маркеры, масштабируем карту
      if (markers.getLength() > 0) {
        // По умолчанию всегда показываем все маркеры на карте
        map.setBounds(markers.getBounds(), {
          checkZoomRange: true,
          zoomMargin: getDeviceType() === 'mobile' ? 40 : 100 // Увеличиваю отступ с 20 до 40 для мобильных
        });
        
        // Если мобильное устройство, устанавливаем более сбалансированный зум 
        // после автоматической подгонки границ, но без экстремальных значений
        if (getDeviceType() === 'mobile' && markers.getLength() > 3) {
          // Устанавливаем задержку для отображения всех маркеров перед зумом
          setTimeout(() => {
            const mobileZoom = getZoomForDevice(mapConfig.initialView.zoom);
            if (map.getZoom() < mobileZoom - 1) { // Только если текущий зум значительно меньше желаемого
              map.setZoom(mobileZoom);
            }
          }, 150);
        }
        
        // Убираем кнопку "Показать все офисы", т.к. это теперь поведение по умолчанию
      }
      
      // Проверяем, есть ли уже выбранный офис в HTML
      const infoPanel = document.querySelector('.map-info-panel');
      if (infoPanel) {
        const isDefaultOfficeVisible = !infoPanel.classList.contains('hidden');
        const selectedOfficeElement = infoPanel.querySelector('.font-bold.text-2xl.text-brand-gray');
        
        // Если панель видима и есть элемент с названием города, значит у нас уже есть выбранный или дефолтный офис
        if (isDefaultOfficeVisible && selectedOfficeElement) {
          const selectedCity = selectedOfficeElement.textContent.trim();
          
          // Ищем соответствующий офис в массиве
          const selectedOfficeIndex = offices.findIndex(office => office.city === selectedCity);
          
          if (selectedOfficeIndex !== -1) {
            // У нас есть совпадение - выбираем этот офис на карте (только маркер, без фокуса на нем)
            const selectedOffice = offices[selectedOfficeIndex];
            const marker = officeMarkers[selectedOfficeIndex];
            
            if (marker) {
              // Сбрасываем все иконки и активируем нужную
              resetAllMarkers();
              marker.options.set(activeIcon);
              
              // НЕ центрируем карту на выбранном маркере, оставляем общий вид
              
              // Обновляем панель с информацией
              updateInfoPanel(selectedOffice);
              
              // Также находим карточку офиса и выделяем ее, если она есть на странице
              const officeCards = document.querySelectorAll('.office-card');
              officeCards.forEach((card, index) => {
                if (index === selectedOfficeIndex || 
                    (card.dataset.city && card.dataset.city === selectedCity)) {
                  card.classList.add('ring', 'ring-brand-blue');
                }
              });
            }
          } else {
            // Если не нашли совпадение по имени, но панель видима - заполняем данными первого офиса
            if (offices.length > 0) {
              updateInfoPanel(offices[0]);
            }
          }
        } else if (!isDefaultOfficeVisible && offices.length > 0) {
          // Если нет выбранного офиса, мы не устанавливаем офис по умолчанию,
          // просто показываем общую карту со всеми маркерами
        }
      }
      
      // Обработчик клика по карточкам офисов на странице (если они есть)
      document.querySelectorAll('.office-card').forEach((card, cardIndex) => {
        card.addEventListener('click', function() {
          // Удаляем выделение со всех карточек
          document.querySelectorAll('.office-card').forEach(c => {
            c.classList.remove('ring', 'ring-brand-blue');
          });
          
          // Добавляем выделение на текущую карточку
          this.classList.add('ring', 'ring-brand-blue');
          
          // Получаем индекс офиса из атрибута или из порядкового номера
          const index = this.dataset.index ? parseInt(this.dataset.index, 10) : cardIndex;
          const marker = officeMarkers[index];
          
          if (marker) {
            // Сбрасываем иконки всех маркеров
            resetAllMarkers();
            
            // Активируем выбранный маркер
            marker.options.set(activeIcon);
            
            // Центрируем карту на выбранном маркере с масштабом в зависимости от устройства
            const officeZoom = getZoomForDevice(mapConfig.officeZoom);
            map.setCenter(marker.geometry.getCoordinates(), officeZoom);
            
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
            
            // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
            if (typeof resetAllMarkers === 'function') {
              resetAllMarkers();
            }
            
            // Удаляем выделение со всех карточек офисов
            document.querySelectorAll('.office-card').forEach(card => {
              card.classList.remove('ring', 'ring-brand-blue');
            });
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
          
          // Устанавливаем новый масштаб в зависимости от устройства
          const newZoom = getZoomForDevice(mapConfig.initialView.zoom);
          map.setCenter(center, newZoom, { duration: 0 });
          
          // Отключаем автоматическую подгонку карты под маркеры при ресайзе
          // чтобы сохранить выбранный пользователем масштаб
        }, 200);
      });
    });
  } catch (error) {
    console.error('Ошибка при инициализации карты:', error);
  }
}

/**
 * Обновляет информационную панель с данными выбранного офиса
 * @param {Object} office - объект с данными офиса
 */
function updateInfoPanel(office) {
  const infoPanel = document.querySelector('.map-info-panel');
  if (!infoPanel) return;
  
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
    <div class="text-brand-gray">${office.address || ''}</div>
    <div class="hidden md:block text-brand-gray">${office.type || ''}</div>
    ${office.phone ? `<div class="hidden md:block text-brand-gray">${office.phone}</div>` : ''}
    ${office.email ? `<div class="hidden md:block text-brand-gray">${office.email}</div>` : ''}
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
      if (typeof resetAllMarkers === 'function') {
        resetAllMarkers();
      }
      
      // Удаляем выделение со всех карточек офисов
      document.querySelectorAll('.office-card').forEach(card => {
        card.classList.remove('ring', 'ring-brand-blue');
      });
    });
  }
}

// Функция инициализации Swiper
function initSwiperSlider() {
  if (typeof Swiper === 'undefined') {
    console.error('Swiper не загружен!');
    return;
  }

  const swiper = new Swiper('.swiper-container', {
    // Базовые настройки
    slidesPerView: 1,
    spaceBetween: 0,

    // Цикличный режим
    loop: true,
    speed: 800,

    // Эффект fade
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    // Автопрокрутка
    autoplay: {
      delay: 70000,
      disableOnInteraction: false
    },

    // Пагинация - стандартная
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // Навигационные кнопки
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Базовые колбеки
    on: {
      init: function () {
        console.log('Swiper инициализирован');
      }
    }
  });

  // Инициализируем свайпер для новостей, если он есть на странице
  if (document.querySelector('.news-swiper-container')) {
    console.log('Инициализация Swiper для новостей с уже существующими слайдами...');
    
    // Проверяем, есть ли уже слайды в контейнере
    const newsContainer = document.querySelector('.news-swiper-container .swiper-wrapper');
    const existingSlides = newsContainer ? newsContainer.querySelectorAll('.swiper-slide') : [];
    
    console.log(`Найдено ${existingSlides.length} существующих слайдов новостей от шаблонизатора`);
    
    // Инициализируем Swiper для новостей
    const newsSwiper = new Swiper('.news-swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: existingSlides.length > 1, // Включаем loop только если есть больше 1 слайда
      speed: 1100,
      // Эффект fade
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      // Автопрокрутка
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.news-swiper-pagination',
        clickable: true
      },

      navigation: {
        nextEl: '.news-swiper-button-next',
        prevEl: '.news-swiper-button-prev',
      },

      breakpoints: {
        // На мобильных устройствах
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // На планшетах
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      },

      on: {
        init: function () {
          console.log('Swiper новостей инициализирован');
        }
      }
    });
  }
}

// Динамическая загрузка Swiper
function loadSwiper() {
  return new Promise((resolve, reject) => {
    try {
      // Загрузка стилей Swiper
      const swiperCSS = document.createElement('link');
      swiperCSS.rel = 'stylesheet';
      swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
      document.head.appendChild(swiperCSS);

      // Загрузка скрипта Swiper
      const swiperScript = document.createElement('script');
      swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
      swiperScript.onload = () => {
        console.log('Swiper успешно загружен');

        // Вместо загрузки внешнего файла, инициализируем Swiper прямо здесь
        if (typeof Swiper !== 'undefined') {
          console.log('Инициализация Swiper...');
          setTimeout(() => {
            initSwiperSlider();
            resolve();
          }, 100);
        } else {
          reject(new Error('Swiper не определен после загрузки'));
        }
      };

      swiperScript.onerror = (error) => {
        console.error('Не удалось загрузить библиотеку Swiper:', error);
        reject(error);
      };

      document.head.appendChild(swiperScript);
    } catch (error) {
      console.error('Ошибка при загрузке Swiper:', error);
      reject(error);
    }
  });
}

// Функция загрузки данных из JSON
function loadJsonData(url, callback) {
  console.log('Загрузка JSON данных из:', url);
  
  // Проверка наличия URL
  if (!url) {
    console.error('Ошибка: не указан URL для загрузки JSON');
    if (callback) callback(new Error('Не указан URL'), null);
    return;
  }
  
  // Если путь не начинается с http или ./, добавляем BASE_PATH
  let fullUrl = url;
  if (!url.startsWith('http') && !url.startsWith('./') && !url.startsWith('../')) {
    // Предотвращаем дублирование 'assets' в пути
    if (url.startsWith('assets/')) {
      fullUrl = `${BASE_PATH}${url}`;
    } else {
      fullUrl = `${BASE_PATH}${url}`;
    }
    console.log('Модифицированный URL для загрузки:', fullUrl);
  }
  
  fetch(fullUrl)
    .then(response => {
      if (!response.ok) {
        console.log(`Не удалось загрузить данные из ${fullUrl}, пробуем альтернативный путь...`);
        // Пробуем альтернативный путь
        return fetch(`./${url}`);
      }
      return response;
    })
    .then(response => {
      if (!response.ok) {
        console.log(`Не удалось загрузить данные из ./${url}, пробуем последний вариант...`);
        // Пробуем ещё один альтернативный путь
        return fetch(`../${url}`);
      }
      return response;
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('JSON данные успешно загружены');
      if (callback) callback(null, data);
    })
    .catch(error => {
      console.error('Ошибка при загрузке JSON:', error);
      if (callback) callback(error, null);
    });
}

// Функция для инициализации главной страницы
function initHomePage() {
  console.log('Инициализация главной страницы начата');
  
  // Загрузка Swiper, если на странице есть слайдер
  if (document.querySelector('.swiper-container') || document.querySelector('.news-swiper-container')) {
    console.log('Обнаружен контейнер Swiper, начинаю загрузку...');
    loadSwiper().catch(error => {
      console.error('Не удалось загрузить Swiper:', error);
    });
  } else {
    console.log('Контейнеры Swiper не обнаружены на странице');
  }

  // Новости уже были загружены через шаблонизатор в HTML
  console.log('Используем новости, уже загруженные через шаблонизатор');
  
  // Инициализация карусели новостей
  const newsCarousel = document.querySelector('.news-carousel');
  const newsPrevButton = document.querySelector('.news-carousel button.absolute.left-0');
  const newsNextButton = document.querySelector('.news-carousel button.absolute.right-0');

  if (newsCarousel && newsPrevButton && newsNextButton) {
    const newsItems = newsCarousel.querySelectorAll('.bg-brand-light');
    let currentNewsIndex = 0;

    // Функция для переключения новостей
    const showNews = (index) => {
      // Скрываем все новости
      newsItems.forEach(item => {
        item.style.display = 'none';
      });

      // Показываем текущую новость
      newsItems[index].style.display = 'block';
    };

    // Обработчики для кнопок
    newsPrevButton.addEventListener('click', () => {
      currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
      showNews(currentNewsIndex);
    });

    newsNextButton.addEventListener('click', () => {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      showNews(currentNewsIndex);
    });

    // Показываем первую новость при загрузке
    showNews(currentNewsIndex);
  }

  // Инициализация карусели на главной странице
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-container .absolute.left-4');
  const nextButton = document.querySelector('.carousel-container .absolute.right-4');

  if (carouselSlides.length > 0 && prevButton && nextButton) {
    let currentSlide = 0;

    // Функция для переключения слайдов
    const showSlide = (index) => {
      // Скрываем все слайды
      carouselSlides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
      });

      // Показываем текущий слайд
      carouselSlides[index].classList.add('active');
      carouselSlides[index].style.display = 'block';
    };

    // Обработчики для кнопок
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
      showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      showSlide(currentSlide);
    });

    // Показываем первый слайд при загрузке
    showSlide(currentSlide);

    // Автоматическое переключение слайдов каждые 5 секунд
    setInterval(() => {
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // Инициализация формы отслеживания
  const trackForm = document.querySelector('.track-form');
  if (trackForm) {
    trackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const trackInput = this.querySelector('input[type="text"]').value;
      if (trackInput.trim() !== '') {
        alert(`Отслеживание заказа: ${trackInput}`);
      } else {
        alert('Пожалуйста, введите номер заказа');
      }
    });
  }

  // Инициализация формы расчета
  const priceForm = document.querySelector('.price-form');
  if (priceForm) {
    priceForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const fromSelect = this.querySelector('select:nth-of-type(1)').value;
      const toSelect = this.querySelector('select:nth-of-type(2)').value;

      if (fromSelect && toSelect) {
        alert(`Расчет стоимости доставки: ${fromSelect} -> ${toSelect}`);
      } else {
        alert('Пожалуйста, выберите город отправления и прибытия');
      }
    });
  }

  // Быстрый выбор городов
  const cityLinks = document.querySelectorAll('.mt-4 .cursor-pointer');
  if (cityLinks.length > 0) {
    cityLinks.forEach(link => {
      link.addEventListener('click', function () {
        const citySelect = document.querySelector('select:nth-of-type(1)');
        const cityName = this.textContent.trim();

        // Находим соответствующую опцию в селекте
        Array.from(citySelect.options).forEach(option => {
          if (option.text === cityName) {
            citySelect.value = option.value;
          }
        });
      });
    });
  }

  // Инициализация карты (если есть на странице)
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    // Здесь обычно будет инициализация карты через API (Leaflet/Google Maps)
    // Для примера просто меняем фон контейнера
    mapContainer.style.background = '#f1f1f1';
  }

  // Инициализация кнопки "Стать клиентом"
  const clientButton = document.querySelector('.relative.bg-brand-light button');
  if (clientButton) {
    clientButton.addEventListener('click', function () {
      alert('Форма для отправки заявки будет открыта');
    });
  }

  // Инициализация формы обратной связи
  const contactForm = document.querySelector('form.space-y-4');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.querySelector('input[type="text"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const consent = this.querySelector('input[type="checkbox"]').checked;

      if (name && phone && consent) {
        alert(`Спасибо за заявку, ${name}! Мы свяжемся с вами по номеру ${phone}`);
        this.reset();
      } else {
        alert('Пожалуйста, заполните все поля и дайте согласие на обработку данных');
      }
    });
  }

  console.log('Инициализация главной страницы завершена');
}

// Функция для инициализации анимаций заголовков
function initTitleAnimations() {
  // Находим все элементы с классами для анимации
  const animatedTitles = document.querySelectorAll('.animated-title');
  const animatedSubtitles = document.querySelectorAll('.animated-subtitle');

  // Проверяем наличие элементов для анимации
  if (animatedTitles.length === 0 && animatedSubtitles.length === 0) {
    return; // Если элементов нет, выходим из функции
  }

  // Запускаем анимацию с небольшой задержкой после загрузки страницы
  setTimeout(() => {
    // Анимируем заголовки
    animatedTitles.forEach(title => {
      title.classList.add('show');
    });

    // Анимируем подзаголовки с дополнительной задержкой
    setTimeout(() => {
      animatedSubtitles.forEach(subtitle => {
        subtitle.classList.add('show');
      });
    }, 300);
  }, 200);
}

// Инициализация функционала для страницы вакансий
function initVacanciesPage() {
  // Аккордеон для вакансий
  const vacancyToggleButtons = document.querySelectorAll('.vacancy-toggle');
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

    // Фильтрация вакансий по городам
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
      cityFilter.addEventListener('change', function () {
        const selectedCity = this.value;
        const vacancyItems = document.querySelectorAll('.vacancy-item');

        vacancyItems.forEach(item => {
          const location = item.getAttribute('data-location');

          if (selectedCity === 'all' || location.includes(selectedCity)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }
}

// Инициализация функционала для страницы контактов
function initContactsPage() {
  const officeCards = document.querySelectorAll('.office-card');
  const selectedOfficeCard = document.querySelector('.office-card.ring');
  const officeInfoCard = document.querySelector('.selected-office-card');
  const closeSelectedOfficeBtn = document.getElementById('close-selected-office');

  // Обработчик закрытия выбранного офиса
  if (closeSelectedOfficeBtn && officeInfoCard) {
    closeSelectedOfficeBtn.addEventListener('click', function () {
      officeInfoCard.style.display = 'none';

      // Снимаем выделение с карточки
      if (selectedOfficeCard) {
        selectedOfficeCard.classList.remove('ring', 'ring-brand-blue');
      }
    });
  }

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

      // При клике на карточку показываем офис на карте
      card.addEventListener('click', function () {
        // Снимаем выделение с предыдущей карточки
        const currentSelected = document.querySelector('.office-card.ring');
        if (currentSelected) {
          currentSelected.classList.remove('ring', 'ring-brand-blue');
        }

        // Выделяем текущую карточку
        this.classList.add('ring', 'ring-brand-blue');

        // Получаем данные офиса
        const city = this.getAttribute('data-city');
        const address = this.querySelector('h3').textContent.replace(city + ', ', '');
        const type = this.querySelectorAll('.text-sm')[0].textContent;
        const phone = this.querySelectorAll('.text-sm')[1].textContent;
        const email = this.querySelectorAll('.text-sm')[2].textContent;

        // Обновляем содержимое карточки офиса на карте
        if (officeInfoCard) {
          const cityElement = officeInfoCard.querySelector('.font-bold.text-2xl');
          const addressElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(1)');
          const typeElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(2)');
          const phoneElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(3)');
          const emailElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(4)');

          if (cityElement) cityElement.textContent = city;
          if (addressElement) addressElement.textContent = address;
          if (typeElement) typeElement.textContent = type;
          if (phoneElement) phoneElement.textContent = phone;
          if (emailElement) emailElement.textContent = email;

          // Показываем карточку если она была скрыта
          officeInfoCard.style.display = 'flex';
        }

        // Логирование для отладки (можно использовать для центрирования карты в реальном проекте)
        const coordinates = this.getAttribute('data-coordinates').split(',');
        console.log(`Показываем на карте: ${city}, координаты: ${coordinates[0]}, ${coordinates[1]}`);
      });
    });
  }

  // Обработчик пагинации
  const paginationButtons = document.querySelectorAll('.pagination-button');
  const officesGrid = document.querySelector('.offices-grid');
  const itemsPerPage = 9; // Количество офисов на странице
  let currentPage = 1;
  let allOffices = [];

  // Инициализация страницы с офисами
  if (officesGrid) {
    // Получаем все офисы
    allOffices = Array.from(document.querySelectorAll('.office-card'));

    // Получаем текущую страницу из активной кнопки пагинации
    const activePageButton = document.querySelector('.pagination-number.bg-brand-blue');
    if (activePageButton) {
      currentPage = parseInt(activePageButton.textContent);
    }

    // Общее количество страниц
    const totalPages = Math.ceil(allOffices.length / itemsPerPage);

    // Функция для отображения офисов на определенной странице
    function showOfficesPage(page) {
      // Скрываем все офисы
      allOffices.forEach(office => {
        office.classList.add('hidden');
      });

      // Показываем только офисы для выбранной страницы
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      allOffices.slice(startIndex, endIndex).forEach(office => {
        office.classList.remove('hidden');
      });

      // Обновляем активную кнопку в пагинации
      document.querySelectorAll('.pagination-number').forEach(btn => {
        if (parseInt(btn.textContent) === page) {
          btn.classList.remove('bg-brand-light', 'text-brand-gray', 'hover:bg-brand-blue', 'hover:text-white');
          btn.classList.add('bg-brand-blue', 'text-white', 'font-bold');
        } else {
          btn.classList.remove('bg-brand-blue', 'text-white', 'font-bold');
          btn.classList.add('bg-brand-light', 'text-brand-gray', 'hover:bg-brand-blue', 'hover:text-white');
        }
      });

      // Обновляем состояние кнопок "Вперед" и "Назад"
      const prevButton = document.querySelector('.pagination-prev');
      const nextButton = document.querySelector('.pagination-next');

      if (prevButton) {
        if (page === 1) {
          prevButton.setAttribute('disabled', 'disabled');
          prevButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          prevButton.removeAttribute('disabled');
          prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }

      if (nextButton) {
        if (page === totalPages) {
          nextButton.setAttribute('disabled', 'disabled');
          nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          nextButton.removeAttribute('disabled');
          nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }

      // Сохраняем текущую страницу
      currentPage = page;
    }

    // Инициализация пагинации
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
      // Добавляем классы к кнопкам пагинации для идентификации
      const allButtons = paginationContainer.querySelectorAll('button');

      if (allButtons.length > 0) {
        // Первая кнопка - "Предыдущая"
        allButtons[0].classList.add('pagination-prev', 'pagination-button');

        // Последняя кнопка - "Следующая"
        allButtons[allButtons.length - 1].classList.add('pagination-next', 'pagination-button');

        // Кнопки с номерами страниц
        for (let i = 1; i < allButtons.length - 1; i++) {
          if (allButtons[i].textContent !== '...') {
            allButtons[i].classList.add('pagination-number', 'pagination-button');
          }
        }

        // Обработчики событий для кнопок пагинации
        document.querySelectorAll('.pagination-button').forEach(button => {
          button.addEventListener('click', function () {
            // Определяем, какая кнопка была нажата
            if (this.classList.contains('pagination-prev')) {
              if (currentPage > 1) {
                showOfficesPage(currentPage - 1);
              }
            } else if (this.classList.contains('pagination-next')) {
              if (currentPage < totalPages) {
                showOfficesPage(currentPage + 1);
              }
            } else if (this.classList.contains('pagination-number')) {
              // Переход на конкретную страницу
              const pageNumber = parseInt(this.textContent);
              showOfficesPage(pageNumber);
            }
          });
        });

        // Скрываем офисы, которые не должны отображаться на текущей странице
        showOfficesPage(currentPage);
      }
    }

    // Фильтрация офисов по городу
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
      cityFilter.addEventListener('change', function () {
        const selectedCity = this.value;

        if (selectedCity === 'all') {
          // Если выбраны все города, показываем первую страницу без фильтрации
          allOffices = Array.from(document.querySelectorAll('.office-card'));
        } else {
          // Фильтруем офисы по выбранному городу
          allOffices = Array.from(document.querySelectorAll('.office-card')).filter(office => {
            const city = office.getAttribute('data-city');
            return city === selectedCity;
          });
        }

        // Обновляем количество страниц
        const newTotalPages = Math.ceil(allOffices.length / itemsPerPage);

        // Показываем первую страницу с отфильтрованными результатами
        showOfficesPage(1);
      });
    }
  }
}

// Функция инициализации бургер-меню
function initMobileMenu() {
  const burgerMenuBtn = document.getElementById('burger-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerLines = document.querySelectorAll('.burger-line');

  // Если на странице нет мобильного меню, выходим
  if (!mobileMenu) return;

  // Функция для открытия мобильного меню
  const openMobileMenu = () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');

    // Анимация бургер-иконки в крестик
    burgerLines[0].classList.add('rotate-45', 'translate-y-2');
    burgerLines[1].classList.add('opacity-0');
    burgerLines[2].classList.add('-rotate-45', '-translate-y-2');

    // Блокировка прокрутки страницы
    document.body.classList.add('overflow-hidden');
  };

  // Функция для закрытия мобильного меню
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');

    // Возврат бургер-иконки в исходное состояние
    burgerLines[0].classList.remove('rotate-45', 'translate-y-2');
    burgerLines[1].classList.remove('opacity-0');
    burgerLines[2].classList.remove('-rotate-45', '-translate-y-2');

    // Разблокировка прокрутки страницы
    document.body.classList.remove('overflow-hidden');
  };

  // Обработчики событий для открытия и закрытия меню
  if (burgerMenuBtn) {
    burgerMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }
}

// Функция инициализации формы
function initForms() {
  // Обработчик формы на странице контактов
  const contactForm = document.querySelector('form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Форма отправлена!');
    });
  }
}

// Функция инициализации аккордеона FAQ
function initFaqAccordion() {
  // Аккордеон для FAQ
  const faqToggleButtons = document.querySelectorAll('.faq-toggle');
  if (faqToggleButtons.length > 0) {
    faqToggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const content = this.parentElement.querySelector('.faq-content');
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
  }
}

// Функция инициализации табов для страницы платежей
function initPaymentTabs() {
  console.log('Инициализация табов на странице платежей...');
  
  // Табы "Рассчитайте стоимость"
  const paymentTabs = document.querySelectorAll('.payment-tab');
  const paymentContents = document.querySelectorAll('.payment-tab-content');
  
  if (paymentTabs.length > 0) {
    paymentTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        const contentId = `tab-${tabId}`;
        
        // Удаляем активные классы со всех табов
        paymentTabs.forEach(t => {
          t.classList.remove('bg-white');
          t.classList.add('bg-brand-light', 'border-transparent', 'text-brand-gray');
        });
        
        // Добавляем активные классы текущему табу
        this.classList.remove('bg-brand-light');
        this.classList.add('bg-white', 'border-transparent', 'text-brand-gray');
        
        // Скрываем все контенты
        paymentContents.forEach(content => {
          content.classList.add('hidden');
        });
        
        // Показываем нужный контент
        document.getElementById(contentId).classList.remove('hidden');
      });
    });
  }
  
  // Табы "Когда можно оплатить"
  const deliveryTabs = document.querySelectorAll('.delivery-tab');
  const deliveryContents = document.querySelectorAll('.delivery-tab-content');
  
  if (deliveryTabs.length > 0) {
    deliveryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        const contentId = `tab-${tabId}`;
        
        // Удаляем активные классы со всех табов
        deliveryTabs.forEach(t => {
          t.classList.remove('bg-white');
          t.classList.add('bg-brand-light', 'border-transparent', 'text-brand-gray');
        });
        
        // Добавляем активные классы текущему табу
        this.classList.remove('bg-brand-light');
        this.classList.add('bg-white', 'border-transparent', 'text-brand-gray');
        
        // Скрываем все контенты
        deliveryContents.forEach(content => {
          content.classList.add('hidden');
        });
        
        // Показываем нужный контент
        document.getElementById(contentId).classList.remove('hidden');
      });
    });
  }
}

// Function for payments page
function initPaymentsPage() {
  console.log('Инициализация страницы платежей...');
  
  // Initialize FAQ accordion
  initFaqAccordion();
  
  // Initialize payment tabs
  initPaymentTabs();
  
  // Обработка чекбокса для отправки чека на email
  const sendCheckEmailCheckbox = document.getElementById('send-check-email');
  const emailField = document.getElementById('email-field');
  const emailInput = document.getElementById('email-input');
  
  if (sendCheckEmailCheckbox && emailField && emailInput) {
    console.log('Инициализация функционала отображения поля email...');
    
    // Проверяем начальное состояние чекбокса
    if (sendCheckEmailCheckbox.checked) {
      emailField.classList.remove('hidden');
      emailInput.setAttribute('required', '');
    }
    
    // Добавляем обработчик события изменения состояния чекбокса
    sendCheckEmailCheckbox.addEventListener('change', function() {
      if (this.checked) {
        emailField.classList.remove('hidden');
        emailInput.setAttribute('required', '');
      } else {
        emailField.classList.add('hidden');
        emailInput.removeAttribute('required');
      }
    });
  }
  
  // Обработка отправки формы оплаты
  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    console.log('Инициализация обработчика формы оплаты...');
    
    paymentForm.addEventListener('submit', function(event) {
      // Предотвращаем стандартное поведение формы (перезагрузку страницы)
      event.preventDefault();
      
      // Получаем значения полей
      const orderNumber = document.getElementById('order-number').value;
      const sendCheckEmail = document.getElementById('send-check-email').checked;
      let email = null;
      
      // Проверяем заполнение обязательных полей
      if (!orderNumber) {
        alert('Пожалуйста, введите номер заказа');
        return;
      }
      
      if (sendCheckEmail) {
        email = document.getElementById('email-input').value;
        if (!email) {
          alert('Пожалуйста, введите email для отправки чека');
          return;
        }
        
        // Простая проверка формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Пожалуйста, введите корректный email');
          return;
        }
      }
      
      // Выводим данные в консоль
      console.log('Отправка платежа:');
      console.log('Номер заказа:', orderNumber);
      console.log('Отправить чек на email:', sendCheckEmail);
      
      if (sendCheckEmail) {
        console.log('Email для чека:', email);
      }
      
      // Здесь можно добавить код для отправки данных на сервер
      // Например, с использованием fetch API
      
      // Для демонстрации показываем сообщение пользователю
      alert('Платеж отправлен! Проверьте консоль для деталей.');
    });
  }
}

// Общая функция инициализации страницы
function initializePage() {
  console.log('=== Начало инициализации страницы ===');
  console.log('Base path for resources:', BASE_PATH);

  // Инициализация мобильного меню
  initMobileMenu();

  // Инициализация форм
  initForms();

  // Определяем текущую страницу и инициализируем соответствующий функционал
  const pathname = window.location.pathname;
  const currentPage = pathname.split('/').pop();
  
  console.log(`Текущий путь: ${pathname}, определена страница: ${currentPage || 'главная (индекс)'}`);

  if (currentPage === '' || currentPage === 'index.html') {
    // Главная страница
    console.log('Инициализация главной страницы...');
    initHomePage();
  } else if (currentPage === 'vacancies.html') {
    // Страница вакансий
    console.log('Инициализация страницы вакансий...');
    initVacanciesPage();
  } else if (currentPage === 'contacts.html') {
    // Страница контактов
    console.log('Инициализация страницы контактов...');
    initContactsPage();
  } else if (currentPage === 'payments.html') {
    // Страница платежей
    console.log('Инициализация страницы платежей...');
    initPaymentsPage();
  } else {
    console.log(`Не найдено специфической инициализации для страницы: ${currentPage}`);
  }

  // Анимация заголовков (для всех страниц)
  initTitleAnimations();

  console.log('=== Инициализация страницы завершена ===');
}

// Функция для проверки загрузки DOM
function domReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Создаем флаг для отслеживания, была ли уже вызвана инициализация
let isInitialized = false;
let isInitializing = false;

// Функция-обертка для предотвращения множественных инициализаций
function safeInitialize() {
  // Если инициализация уже выполнена или в процессе, не запускаем ее повторно
  if (isInitialized || isInitializing) {
    console.log('Инициализация уже выполнена или в процессе, пропускаем повторный вызов');
    return;
  }
  
  console.log('Начинаем безопасную инициализацию страницы');
  isInitializing = true;
  
  try {
    initializePage();
    isInitialized = true;
  } catch (error) {
    console.error('Ошибка при инициализации страницы:', error);
  } finally {
    isInitializing = false;
  }
}

// Запуск инициализации после загрузки DOM
domReady(safeInitialize);

// Повторный вызов для страниц, где может быть проблема с загрузкой DOM
window.addEventListener('load', safeInitialize);

// Не запускаем инициализацию сразу, так как это создает дублирование
// Инициализация происходит через domReady или событие load 