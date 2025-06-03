import { g as getBasePath, d as domReady } from "./modules/utils-BNm1gLxD.js";
import { m as modalManager } from "./modules/modal-manager-BXwv0V3q.js";
import { L as LoginManager } from "./modules/login-MQpmDG8h.js";
import { i as initMap, s as selectOfficeCard, a as selectOfficeCardNoFocus, u as updateInfoPanel, g as getZoomForDevice, b as getCenterForDevice, c as getMarkerSizeForZoom, d as createColoredMarkerIcon, m as mapConfig } from "./modules/map-CARIFrPc.js";
import { l as loadSwiper, i as initSwiperSlider } from "./modules/slider-RQj1bYBM.js";
import { i as initMobileMenu, a as initTitleAnimations, b as initForms, c as initFaqAccordion, d as initPaymentTabs, e as initMobileMenuToggles } from "./modules/ui-IvxluLAz.js";
console.log("--- Debug: Start of main.js ---");
console.log("main.js: Начало загрузки");
const BASE_PATH = getBasePath();
console.log("Определен базовый путь:", BASE_PATH);
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
let isInitialized = false;
let isInitializing = false;
function initializePage() {
  console.log("--- Debug: Start of initializePage in main.js ---");
  console.log("=== Начало инициализации страницы ===");
  initMobileMenu();
  initForms();
  new LoginManager();
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    console.log("Найден контейнер карты, начинаем инициализацию...");
    setTimeout(() => {
      let offices = [];
      const officeCards = document.querySelectorAll(".office-card");
      let dataFound = false;
      if (officeCards && officeCards.length > 0) {
        console.log("Найдены карточки офисов на странице:", officeCards.length);
        officeCards.forEach((card) => {
          if (card.dataset.coordinates) {
            const coordinates = card.dataset.coordinates.split(",").map((coord) => parseFloat(coord.trim()));
            if (coordinates.length === 2) {
              const city = card.dataset.city || "";
              const addressElem = card.querySelector("h3 + div.text-brand-gray");
              const address = addressElem ? addressElem.textContent.trim() : "";
              const divElements = card.querySelectorAll("div.text-brand-gray");
              const typeElem = divElements.length > 1 ? divElements[1] : null;
              const phoneElem = divElements.length > 2 ? divElements[2] : null;
              const emailElem = divElements.length > 3 ? divElements[3] : null;
              offices.push({
                city,
                address,
                type: typeElem ? typeElem.textContent.trim() : "",
                phone: phoneElem ? phoneElem.textContent.trim() : "",
                email: emailElem ? emailElem.textContent.trim() : "",
                coordinates
              });
            }
          }
        });
        if (offices.length > 0) {
          console.log("Собраны данные офисов из карточек:", offices.length);
          initMap(offices);
          dataFound = true;
        }
      }
      if (!dataFound && window.officesData && window.officesData.length > 0) {
        console.log("Использую предварительно загруженные данные офисов:", window.officesData.length);
        initMap(window.officesData);
        dataFound = true;
      }
      if (!dataFound) {
        const defaultOfficeCity = document.querySelector(".map-info-panel .font-bold.text-2xl.text-brand-gray");
        if (defaultOfficeCity) {
          console.log("Найдены данные для дефолтного офиса в DOM");
          const defaultOfficeAddress = document.querySelector(".map-info-panel div:nth-of-type(2)");
          const defaultOfficeType = document.querySelector(".map-info-panel div:nth-of-type(3)");
          const defaultOfficePhone = document.querySelector(".map-info-panel div:nth-of-type(4)");
          const defaultOfficeEmail = document.querySelector(".map-info-panel div:nth-of-type(5)");
          let defaultCoordinates = [56.010563, 92.852572];
          const mapInfoPanel = document.querySelector(".map-info-panel");
          if (mapInfoPanel && mapInfoPanel.dataset.coordinates) {
            const coordStr = mapInfoPanel.dataset.coordinates;
            const coords = coordStr.split(",").map((coord) => parseFloat(coord.trim()));
            if (coords.length === 2) {
              defaultCoordinates = coords;
            }
          }
          const defaultOffice = {
            city: defaultOfficeCity.textContent,
            address: defaultOfficeAddress ? defaultOfficeAddress.textContent : "",
            type: defaultOfficeType ? defaultOfficeType.textContent : "",
            phone: defaultOfficePhone ? defaultOfficePhone.textContent : "",
            email: defaultOfficeEmail ? defaultOfficeEmail.textContent : "",
            coordinates: defaultCoordinates
          };
          initMap([defaultOffice]);
        } else {
          console.log("Данные не найдены на странице, инициализируем карту без маркеров");
          initMap([]);
        }
      }
    }, 100);
  }
  const pathname = window.location.pathname;
  const currentPage = pathname.split("/").pop();
  console.log(`Текущий путь: ${pathname}, определена страница: ${currentPage || "главная (индекс)"}`);
  initTitleAnimations();
  initMobileMenuToggles();
  console.log("=== Инициализация страницы завершена ===");
  console.log("--- Debug: End of initializePage in main.js ---");
}
function safeInitialize() {
  if (isInitialized || isInitializing) {
    console.log("Инициализация уже выполнена или в процессе, пропускаем повторный вызов");
    return;
  }
  console.log("Начинаем безопасную инициализацию страницы");
  isInitializing = true;
  try {
    initializePage();
    isInitialized = true;
  } catch (error) {
    console.error("Ошибка при инициализации страницы:", error);
  } finally {
    isInitializing = false;
  }
}
domReady(safeInitialize);
if (document.readyState === "interactive" || document.readyState === "complete") {
  console.log("DOM уже загружен, вызываем инициализацию напрямую");
  safeInitialize();
}
