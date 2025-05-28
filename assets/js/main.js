/**
 * main.js
 * Основная точка входа в приложение
 */

console.log('main.js: Начало загрузки');

import { getBasePath, domReady } from './modules/utils.js';
import { modalManager } from './modules/modal-manager.js';
import { LoginManager } from './modules/login.js';
import { DateRangePicker } from './modules/date-range-picker.js';
import { 
  selectOfficeCard, 
  selectOfficeCardNoFocus, 
  initMap,
  updateInfoPanel,
  getZoomForDevice,
  getCenterForDevice,
  getMarkerSizeForZoom,
  createColoredMarkerIcon,
  mapConfig
} from './modules/map.js';
import { loadSwiper, initSwiperSlider } from './modules/slider.js';
import { 
  initMobileMenu, 
  initTitleAnimations, 
  initForms, 
  initFaqAccordion, 
  initPaymentTabs,
  initMobileMenuToggles
} from './modules/ui.js';
import { initHomePage } from './modules/home-page.js';
import { initContactsPage } from './modules/contacts-page.js';
import { initVacanciesPage } from './modules/vacancies-page.js';
import { initPaymentsPage } from './modules/payments-page.js';
import { NewsPage } from './modules/news-page.js';
import { Pagination } from './modules/pagination.js';
import { initServiceActsPage } from './modules/service-acts-page.js';
import { initSendersReceiversPage } from './modules/senders-receivers-page.js';
import './pages/profile.js';
import '../css/main.css';

// Базовый путь для использования в скрипте
const BASE_PATH = getBasePath();
console.log('Определен базовый путь:', BASE_PATH);

// Экспортируем все функции в глобальный контекст для совместимости с устаревшим кодом
window.BASE_PATH = BASE_PATH;
window.modalManager = modalManager;
window.DateRangePicker = DateRangePicker;
window.initMap = initMap;
window.selectOfficeCard = selectOfficeCard;
window.selectOfficeCardNoFocus = selectOfficeCardNoFocus;
window.updateInfoPanel = updateInfoPanel;
window.getZoomForDevice = getZoomForDevice;
window.getCenterForDevice = getCenterForDevice;
window.getMarkerSizeForZoom = getMarkerSizeForZoom;
window.createColoredMarkerIcon = createColoredMarkerIcon;
window.mapConfig = mapConfig;
window.loadSwiper = loadSwiper;
window.initSwiperSlider = initSwiperSlider;
window.initMobileMenu = initMobileMenu;
window.initTitleAnimations = initTitleAnimations;
window.initForms = initForms;
window.initFaqAccordion = initFaqAccordion;
window.initPaymentTabs = initPaymentTabs;
window.initHomePage = initHomePage;
window.initContactsPage = initContactsPage;
window.initVacanciesPage = initVacanciesPage;
window.initPaymentsPage = initPaymentsPage;
window.Pagination = Pagination;
window.initServiceActsPage = initServiceActsPage;
window.initSendersReceiversPage = initSendersReceiversPage;

// Создаем флаг для отслеживания, была ли уже вызвана инициализация
let isInitialized = false;
let isInitializing = false;

/**
 * Общая функция инициализации страницы
 */
function initializePage() {
  console.log('=== Начало инициализации страницы ===');

  // Инициализация мобильного меню
  initMobileMenu();

  // Инициализация форм
  initForms();

  // Инициализация модуля входа
  new LoginManager();

  // Проверяем, есть ли элемент карты на странице
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    console.log('Найден контейнер карты, начинаем инициализацию...');
    // Добавляем небольшую задержку для гарантии корректной инициализации
    setTimeout(() => {
      // Сначала проверяем, есть ли данные офисов на странице в виде data-атрибутов
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
              const addressElem = card.querySelector('h3 + div.text-brand-gray');
              const address = addressElem ? addressElem.textContent.trim() : '';
              
              const divElements = card.querySelectorAll('div.text-brand-gray');
              const typeElem = divElements.length > 1 ? divElements[1] : null;
              const phoneElem = divElements.length > 2 ? divElements[2] : null;
              const emailElem = divElements.length > 3 ? divElements[3] : null;
              
              offices.push({
                city: city,
                address: address,
                type: typeElem ? typeElem.textContent.trim() : '',
                phone: phoneElem ? phoneElem.textContent.trim() : '',
                email: emailElem ? emailElem.textContent.trim() : '',
                coordinates: coordinates
              });
            }
          }
        });
        
        if (offices.length > 0) {
          console.log('Собраны данные офисов из карточек:', offices.length);
          initMap(offices, BASE_PATH);
          dataFound = true;
        }
      }
      
      // Если не нашли данные в карточках, проверяем наличие скрытых данных офисов
      if (!dataFound && window.officesData && window.officesData.length > 0) {
        console.log('Использую предварительно загруженные данные офисов:', window.officesData.length);
        initMap(window.officesData, BASE_PATH);
        dataFound = true;
      }
      
      // Если данные не найдены ни в DOM, ни в глобальной переменной, показываем карту без маркеров
      if (!dataFound) {
        // Проверяем, есть ли дефолтный офис в DOM
        const defaultOfficeCity = document.querySelector('.map-info-panel .font-bold.text-2xl.text-brand-gray');
        if (defaultOfficeCity) {
          console.log('Найдены данные для дефолтного офиса в DOM');
          
          const defaultOfficeAddress = document.querySelector('.map-info-panel div:nth-of-type(2)');
          const defaultOfficeType = document.querySelector('.map-info-panel div:nth-of-type(3)');
          const defaultOfficePhone = document.querySelector('.map-info-panel div:nth-of-type(4)');
          const defaultOfficeEmail = document.querySelector('.map-info-panel div:nth-of-type(5)');
          
          // Координаты для Красноярска (или может быть в другом месте, если указано)
          let defaultCoordinates = [56.010563, 92.852572]; // Красноярск 
          
          // Пробуем найти координаты в ближайших атрибутах
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
          
          initMap([defaultOffice], BASE_PATH);
        } else {
          console.log('Данные не найдены на странице, инициализируем карту без маркеров');
          initMap([], BASE_PATH);
        }
      }
    }, 100);
  }

  // Определяем текущую страницу и инициализируем соответствующий функционал
  const pathname = window.location.pathname;
  const currentPage = pathname.split('/').pop();
  
  console.log(`Текущий путь: ${pathname}, определена страница: ${currentPage || 'главная (индекс)'}`);

  if (currentPage === '' || currentPage === 'index.html') {
    console.log('Инициализация главной страницы...');
    initHomePage();
  } else if (currentPage === 'vacancies.html') {
    console.log('Инициализация страницы вакансий...');
    initVacanciesPage();
  } else if (currentPage === 'contacts.html') {
    console.log('Инициализация страницы контактов...');
    initContactsPage();
  } else if (currentPage === 'payments.html') {
    console.log('Инициализация страницы платежей...');
    initPaymentsPage();
  } else if (currentPage === 'news.html') {
    console.log('Инициализация страницы новостей...');
    new NewsPage();
  } else if (currentPage === 'service-acts.html') {
    console.log('Инициализация страницы актов оказания услуг...');
    initServiceActsPage();
  } else if (currentPage === 'senders-receivers.html') {
    console.log('Инициализация страницы карточек отправителей и получателей...');
    initSendersReceiversPage();
  }

  // Анимация заголовков (для всех страниц)
  initTitleAnimations();

  // Инициализация тогглов мобильного меню
  initMobileMenuToggles();

  console.log('=== Инициализация страницы завершена ===');
}

/**
 * Функция-обертка для предотвращения множественных инициализаций
 */
function safeInitialize() {
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