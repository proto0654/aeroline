/**
 * main.js
 * Основная точка входа в приложение
 */

console.log('--- Debug: Start of main.js ---');

import { getBasePath, domReady } from './modules/utils.js';
import { modalManager } from './modules/modal-manager.js';
import { LoginManager } from './modules/login.js';
// import { DateRangePicker } from './modules/date-range-picker.js'; // Больше не используется после замены на Vue
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
import './../css/main.css';
// Импортируем специфичные для страниц модули, чтобы Vite их включил
// import './modules/service-acts-page.js'; // Добавляем импорт для страницы актов
// import './modules/news-page.js'; // Добавляем импорт для страницы новостей
// Импорт функций монтирования Vue островов
// import { mountServiceActsDatePicker } from 'assets/vue/islands/service-acts/date-picker.js'; // Удаляем статический импорт
// import { mountNewsDatePicker } from 'assets/vue/islands/news/date-picker.js'; // Удаляем статический импорт

console.log('main.js: Начало загрузки');

// Базовый путь для использования в скрипте
const BASE_PATH = getBasePath();
console.log('Определен базовый путь:', BASE_PATH);

// Экспортируем все функции в глобальный контекст для совместимости с устаревшим кодом
window.BASE_PATH = BASE_PATH;
window.modalManager = modalManager;
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
window.initMobileMenuToggles = initMobileMenuToggles;

// Создаем флаг для отслеживания, была ли уже вызвана инициализация
let isInitialized = false;
let isInitializing = false;

/**
 * Общая функция инициализации страницы
 */
function initializePage() {
  console.log('--- Debug: Start of initializePage in main.js ---');
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
    
    // Функция для ожидания загрузки API Яндекс.Карт
    function waitForYandexMaps() {
      return new Promise((resolve) => {
        if (typeof ymaps !== 'undefined') {
          resolve();
          return;
        }
        
        const checkInterval = setInterval(() => {
          if (typeof ymaps !== 'undefined') {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        
        // Таймаут через 10 секунд
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve();
        }, 10000);
      });
    }
    
    // Ждем загрузки API и инициализируем карту
    waitForYandexMaps().then(async () => {
      console.log('Инициализируем карту с API');
      await initMap(BASE_PATH);
    });
  }

  // Определяем текущую страницу и инициализируем соответствующий функционал
  const pathname = window.location.pathname;
  const currentPage = pathname.split('/').pop();
  
  console.log(`Текущий путь: ${pathname}, определена страница: ${currentPage || 'главная (индекс)'}`);

  // Анимация заголовков (для всех страниц)
  initTitleAnimations();

  // Инициализация тогглов мобильного меню
  initMobileMenuToggles();

  console.log('=== Инициализация страницы завершена ===');
  console.log('--- Debug: End of initializePage in main.js ---');
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

// После загрузки DOM вызываем инициализацию
domReady(safeInitialize);

// На случай, если DOMContentLoaded уже произошел
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  console.log('DOM уже загружен, вызываем инициализацию напрямую');
  safeInitialize();
} 