import { g as getBasePath, a as getDeviceType, d as domReady, P as PhoneValidator, l as loadSwiper, i as initSwiperSlider } from "./chunks/slider-q_NEEFv1.js";
import { m as modalManager$1 } from "./chunks/modal-manager-BXwv0V3q.js";
class LoginManager {
  constructor() {
    this.loginModal = document.getElementById("login-modal");
    this.loginForm = document.getElementById("login-form");
    this.basePath = getBasePath();
    this.init();
  }
  init() {
    if (!this.loginModal || !this.loginForm) return;
    document.addEventListener("click", (e) => {
      const loginBtn = e.target.closest('#mobile-menu-login, a[href*="profile.html"]');
      if (loginBtn) {
        e.preventDefault();
        modalManager.open(this.loginModal);
      }
    });
    this.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      if (email === "test@aeroline.su" && password === "password123") {
        modalManager.close(this.loginModal);
        window.location.href = `${this.basePath}profile.html`;
      } else {
        alert("Неверный email или пароль");
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new LoginManager();
});
const ACTIVE_MARKER_COLOR = "#008DD2";
const DEFAULT_MARKER_COLOR = "#666666";
const mapConfig = {
  // Начальные координаты и масштаб
  initialView: {
    // Разные центральные точки для разных типов устройств
    center: {
      desktop: [54.962902, 73.38475],
      // Центр России (для обзора всей страны на десктопе)
      mobile: [53.224854, 50.199879]
      // Москва (для мобильных устройств)
    },
    zoom: {
      desktop: 4,
      // Масштаб для десктопов
      mobile: 3
      // Масштаб для мобильных устройств
    }
  },
  // Масштаб при выборе офиса
  officeZoom: {
    desktop: 12,
    // Уменьшено с 15 до 12 для десктопов при выборе офиса
    mobile: 10
    // Уменьшено с 13 до 10 для мобильных при выборе офиса
  },
  // Максимальный масштаб при автоматической подгонке (fitBounds)
  maxBoundsZoom: {
    desktop: 18,
    // Максимальный масштаб для десктопов
    mobile: 7
    // Максимальный масштаб для мобильных
  },
  // Отступы при автоматической подгонке
  boundsPadding: [50, 50],
  // Настройки масштабирования иконок маркеров
  markerSizing: {
    minZoom: 2,
    // Минимальный зум, при котором начинаем масштабировать
    maxZoom: 18,
    // Максимальный зум для масштабирования иконок
    minSize: [16, 18],
    // Минимальный размер иконки [ширина, высота]
    maxSize: [36, 42],
    // Максимальный размер иконки [ширина, высота]
    minOffset: [-8, -18],
    // Минимальное смещение иконки
    maxOffset: [-18, -42]
    // Максимальное смещение иконки
  }
};
function createColoredMarkerIcon(color) {
  const svgTemplate = `
  <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.114 14.1578C33.014 4.91781 24.954 0.757812 17.874 0.757812C17.874 0.757812 17.874 0.757812 17.854 0.757812C10.794 0.757812 2.71397 4.89781 0.61397 14.1378C-1.72603 24.4578 4.59397 33.1978 10.314 38.6978C12.434 40.7378 15.154 41.7578 17.874 41.7578C20.594 41.7578 23.314 40.7378 25.414 38.6978C31.134 33.1978 37.454 24.4778 35.114 14.1578ZM17.874 24.1778C14.394 24.1778 11.574 21.3578 11.574 17.8778C11.574 14.3978 14.394 11.5778 17.874 11.5778C21.354 11.5778 24.174 14.3978 24.174 17.8778C24.174 21.3578 21.354 24.1778 17.874 24.1778Z" fill="${color}" />
  </svg>`;
  const encodedSvg = encodeURIComponent(svgTemplate);
  return `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
}
function getZoomForDevice(zoomConfig) {
  const deviceType = getDeviceType();
  return zoomConfig[deviceType];
}
function getCenterForDevice(centerConfig) {
  const deviceType = getDeviceType();
  return centerConfig[deviceType];
}
function getMarkerSizeForZoom(currentZoom) {
  const { minZoom, maxZoom, minSize, maxSize, minOffset, maxOffset } = mapConfig.markerSizing;
  if (currentZoom <= minZoom) {
    return {
      size: minSize,
      offset: minOffset
    };
  }
  if (currentZoom >= maxZoom) {
    return {
      size: maxSize,
      offset: maxOffset
    };
  }
  const zoomRatio = (currentZoom - minZoom) / (maxZoom - minZoom);
  const width = Math.round(minSize[0] + (maxSize[0] - minSize[0]) * zoomRatio);
  const height = Math.round(minSize[1] + (maxSize[1] - minSize[1]) * zoomRatio);
  const heightRatio = height / maxSize[1];
  const offsetX = Math.round(minOffset[0] + (maxOffset[0] - minOffset[0]) * heightRatio);
  const offsetY = Math.round(minOffset[1] + (maxOffset[1] - minOffset[1]) * heightRatio);
  return {
    size: [width, height],
    offset: [offsetX, offsetY]
  };
}
function updateInfoPanel(office) {
  const infoPanel = document.querySelector(".map-info-panel");
  if (!infoPanel) return;
  let displayAddress = office.address || "";
  if (office.city && displayAddress.trim().startsWith(office.city + ",")) {
    displayAddress = displayAddress.replace(office.city + ",", "").trim();
  }
  infoPanel.innerHTML = `
    <div class="flex justify-between items-center mb-2">
      <div class="font-bold text-2xl text-brand-gray">${office.city || ""}</div>
      <button class="text-brand-gray hover:text-brand-blue transition-colors close-info-panel">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="text-brand-gray">${displayAddress}</div>
    <div class="hidden lg:block text-brand-gray">${office.type || ""}</div>
    ${office.phone ? `<div class="hidden lg:block text-brand-gray">${office.phone}</div>` : ""}
    ${office.email ? `<div class="hidden lg:block text-brand-gray">${office.email}</div>` : ""}
    <button class="bg-brand-blue mt-2 md:mt-5 text-white rounded-lg py-3 text-buttons text-regular btn">Подробнее</button>
  `;
  infoPanel.classList.remove("hidden");
  const closeButton = infoPanel.querySelector(".close-info-panel");
  if (closeButton) {
    closeButton.addEventListener("click", function() {
      infoPanel.classList.add("hidden");
      if (typeof window.resetAllMarkers === "function") {
        window.resetAllMarkers();
      }
      selectOfficeCardNoFocus(null);
    });
  }
}
function selectOfficeCardNoFocus(selectedCard, officeData = null, marker = null, map = null) {
  document.querySelectorAll(".office-card").forEach((card) => {
    card.classList.remove("ring", "ring-brand-blue");
  });
  if (selectedCard) {
    selectedCard.classList.add("ring", "ring-brand-blue");
  }
  if (officeData) {
    updateInfoPanel(officeData);
  }
  if (marker && map) {
    if (typeof window.resetAllMarkers === "function") {
      window.resetAllMarkers();
    }
    if (marker.options) {
      const currentZoom = map.getZoom();
      const markerProps = getMarkerSizeForZoom(currentZoom);
      const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);
      marker.options.set({
        iconImageHref: activeMarkerUrl,
        iconImageSize: markerProps.size,
        iconImageOffset: markerProps.offset
      });
    }
  }
}
function selectOfficeCard(selectedCard, officeData = null, marker = null, map = null, coordinates = null) {
  document.querySelectorAll(".office-card").forEach((card) => {
    card.classList.remove("ring", "ring-brand-blue");
  });
  if (selectedCard) {
    selectedCard.classList.add("ring", "ring-brand-blue");
  }
  if (officeData) {
    updateInfoPanel(officeData);
  }
  if (marker && map) {
    if (typeof window.resetAllMarkers === "function") {
      window.resetAllMarkers();
    }
    if (typeof window.setActiveMarker === "function") {
      window.setActiveMarker(marker);
    }
    if (marker.options) {
      const newZoom = getZoomForDevice(mapConfig.officeZoom);
      const markerProps = getMarkerSizeForZoom(newZoom);
      const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);
      marker.options.set({
        iconImageHref: activeMarkerUrl,
        iconImageSize: markerProps.size,
        iconImageOffset: markerProps.offset
      });
    }
    if (coordinates) {
      const newZoom = getZoomForDevice(mapConfig.officeZoom);
      map.setCenter(coordinates, newZoom, { duration: 300 });
    }
  }
}
function initMap(basePath) {
  try {
    ymaps.ready(function() {
      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.error("Элемент карты #map не найден!");
        return;
      }
      const officesDataAttr = mapElement.getAttribute("data-offices");
      let offices = [];
      if (officesDataAttr) {
        try {
          offices = JSON.parse(officesDataAttr);
          console.log("Данные офисов загружены из data-атрибута:", offices.length);
        } catch (error) {
          console.error("Ошибка при парсинге данных офисов из data-атрибута:", error);
        }
      } else {
        console.log("Атрибут data-offices не найден или пуст. Инициализация карты без маркеров.");
      }
      if (!offices || offices.length === 0) {
        console.log("Нет данных офисов для отображения на карте.");
      }
      const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);
      const initialCenter = getCenterForDevice(mapConfig.initialView.center);
      const map = new ymaps.Map("map", {
        center: initialCenter,
        zoom: initialZoom,
        controls: ["zoomControl", "fullscreenControl"],
        behaviors: ["drag", "multiTouch", "scrollZoom"]
      });
      window.currentMap = map;
      window.mapInstance = map;
      const markers = new ymaps.GeoObjectCollection();
      const officeMarkers = {};
      window.officeMarkers = officeMarkers;
      let activeMarker = null;
      window.setActiveMarker = function(marker) {
        activeMarker = marker;
      };
      window.getActiveMarker = function() {
        return activeMarker;
      };
      const initialMarkerProps = getMarkerSizeForZoom(initialZoom);
      const defaultIcon = {
        iconLayout: "default#image",
        iconImageHref: createColoredMarkerIcon(DEFAULT_MARKER_COLOR),
        iconImageSize: initialMarkerProps.size,
        iconImageOffset: initialMarkerProps.offset
      };
      function updateAllMarkersSize(currentZoom) {
        const markerProps = getMarkerSizeForZoom(currentZoom);
        Object.values(officeMarkers).forEach((marker) => {
          const isActive = marker.options.get("iconImageHref").includes(encodeURIComponent(ACTIVE_MARKER_COLOR));
          marker.options.set({
            iconImageSize: markerProps.size,
            iconImageOffset: markerProps.offset
          });
        });
      }
      window.resetAllMarkers = function() {
        const currentZoom = map.getZoom();
        const markerProps = getMarkerSizeForZoom(currentZoom);
        Object.values(officeMarkers).forEach((m) => {
          const defaultMarkerUrl = createColoredMarkerIcon(DEFAULT_MARKER_COLOR);
          m.options.set({
            iconImageHref: defaultMarkerUrl,
            iconImageSize: markerProps.size,
            iconImageOffset: markerProps.offset
          });
        });
      };
      window.showAllOfficesOnMap = function(coordinates) {
        if (!coordinates || coordinates.length === 0) return;
        const bounds = coordinates.reduce((bounds2, coord) => {
          return bounds2.extend(coord);
        }, new ymaps.geometry.LineString(coordinates).getBounds());
        map.setBounds(bounds, {
          checkZoomRange: true,
          zoomMargin: mapConfig.boundsPadding
        });
      };
      offices.forEach((office, index) => {
        if (!office.coordinates || office.coordinates.length !== 2) return;
        const defaultMarkerUrl = createColoredMarkerIcon(DEFAULT_MARKER_COLOR);
        const marker = new ymaps.Placemark(office.coordinates, {
          hintContent: office.city
        }, {
          iconLayout: "default#image",
          iconImageHref: defaultMarkerUrl,
          iconImageSize: initialMarkerProps.size,
          iconImageOffset: initialMarkerProps.offset
        });
        officeMarkers[index] = marker;
        markers.add(marker);
        marker.events.add("click", () => {
          const currentZoom = map.getZoom();
          const officeZoom = getZoomForDevice(mapConfig.officeZoom);
          const initialZoom2 = getZoomForDevice(mapConfig.initialView.zoom);
          const isCurrentlyZoomed = Math.abs(currentZoom - officeZoom) < 3;
          const isCurrentMarker = activeMarker === marker;
          if (!isCurrentMarker) {
            selectOfficeCardNoFocus(
              null,
              // карточка не известна
              office,
              marker,
              map
            );
            activeMarker = marker;
          } else {
            if (!isCurrentlyZoomed) {
              selectOfficeCard(
                null,
                // карточка не известна
                office,
                marker,
                map,
                marker.geometry.getCoordinates()
              );
            } else {
              const currentCenter = map.getCenter();
              const markerProps = getMarkerSizeForZoom(initialZoom2);
              const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);
              map.setZoom(initialZoom2, { duration: 300 });
              setTimeout(() => {
                if (marker && marker.options) {
                  marker.options.set({
                    iconImageHref: activeMarkerUrl,
                    iconImageSize: markerProps.size,
                    iconImageOffset: markerProps.offset
                  });
                }
              }, 350);
            }
          }
        });
      });
      map.geoObjects.add(markers);
      map.events.add("boundschange", function(e) {
        if (e.get("oldZoom") !== e.get("newZoom")) {
          updateAllMarkersSize(e.get("newZoom"));
        }
      });
      if (markers.getLength() > 0) {
        map.setCenter(initialCenter, initialZoom);
      } else {
        map.setCenter(initialCenter, initialZoom);
      }
    });
  } catch (error) {
    console.error("Ошибка при инициализации карты:", error);
  }
}
function initMobileMenu() {
  const burgerMenuBtn = document.getElementById("burger-menu-btn");
  const mobileCloseBtn = document.getElementById("mobile-close-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerLines = document.querySelectorAll(".burger-line");
  if (!mobileMenu) return;
  const openMobileMenu = () => {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    burgerLines[0].classList.add("rotate-45", "translate-y-2");
    burgerLines[1].classList.add("opacity-0");
    burgerLines[2].classList.add("-rotate-45", "-translate-y-2");
    document.body.classList.add("overflow-hidden");
  };
  const closeMobileMenu = () => {
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");
    burgerLines[0].classList.remove("rotate-45", "translate-y-2");
    burgerLines[1].classList.remove("opacity-0");
    burgerLines[2].classList.remove("-rotate-45", "-translate-y-2");
    document.body.classList.remove("overflow-hidden");
  };
  if (burgerMenuBtn) {
    burgerMenuBtn.addEventListener("click", openMobileMenu);
  }
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMobileMenu);
  }
}
function initTitleAnimations() {
  const animatedTitles = document.querySelectorAll(".animated-title");
  const animatedSubtitles = document.querySelectorAll(".animated-subtitle");
  if (animatedTitles.length === 0 && animatedSubtitles.length === 0) {
    return;
  }
  setTimeout(() => {
    animatedTitles.forEach((title) => {
      title.classList.add("show");
    });
    setTimeout(() => {
      animatedSubtitles.forEach((subtitle) => {
        subtitle.classList.add("show");
      });
    }, 300);
  }, 200);
}
function initFaqAccordion() {
  const faqToggleButtons = document.querySelectorAll(".faq-toggle");
  if (faqToggleButtons.length > 0) {
    faqToggleButtons.forEach((btn) => {
      btn.addEventListener("click", function() {
        const content = this.parentElement.querySelector(".faq-content");
        const icon = this.querySelector("svg");
        if (content.classList.contains("hidden")) {
          content.classList.remove("hidden");
          icon.classList.add("rotate-180");
        } else {
          content.classList.add("hidden");
          icon.classList.remove("rotate-180");
        }
      });
    });
  }
}
function initForms() {
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Форма отправлена!");
    });
  }
}
function initPaymentTabs() {
  console.log("Инициализация табов на странице платежей...");
  const paymentTabs = document.querySelectorAll(".payment-tab");
  const paymentContents = document.querySelectorAll(".payment-tab-content");
  if (paymentTabs.length > 0) {
    paymentTabs.forEach((tab) => {
      tab.addEventListener("click", function() {
        const tabId = this.getAttribute("data-tab");
        const contentId = `tab-${tabId}`;
        paymentTabs.forEach((t) => {
          t.classList.remove("bg-white");
          t.classList.add("bg-brand-light", "border-transparent", "text-brand-gray");
        });
        this.classList.remove("bg-brand-light");
        this.classList.add("bg-white", "border-transparent", "text-brand-gray");
        paymentContents.forEach((content) => {
          content.classList.add("hidden");
        });
        document.getElementById(contentId).classList.remove("hidden");
      });
    });
  }
  const deliveryTabs = document.querySelectorAll(".delivery-tab");
  const deliveryContents = document.querySelectorAll(".delivery-tab-content");
  if (deliveryTabs.length > 0) {
    deliveryTabs.forEach((tab) => {
      tab.addEventListener("click", function() {
        const tabId = this.getAttribute("data-tab");
        const contentId = `tab-${tabId}`;
        deliveryTabs.forEach((t) => {
          t.classList.remove("bg-white");
          t.classList.add("bg-brand-light", "border-transparent", "text-brand-gray");
        });
        this.classList.remove("bg-brand-light");
        this.classList.add("bg-white", "border-transparent", "text-brand-gray");
        deliveryContents.forEach((content) => {
          content.classList.add("hidden");
        });
        document.getElementById(contentId).classList.remove("hidden");
      });
    });
  }
}
function initMobileMenuToggles() {
  const toggles = document.querySelectorAll(".mobile-menu-toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function() {
      const submenu = this.parentElement.querySelector(".mobile-menu-submenu");
      const icon = this.querySelector("svg");
      if (!submenu) return;
      if (submenu.classList.contains("hidden")) {
        submenu.classList.remove("hidden");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        icon.classList.add("rotate-180");
      } else {
        submenu.classList.add("hidden");
        submenu.style.maxHeight = null;
        icon.classList.remove("rotate-180");
      }
    });
  });
}
function initPhoneInputs() {
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    new PhoneValidator(input);
  });
}
domReady(() => {
  initPhoneInputs();
});
console.log("--- Debug: Start of main.js ---");
console.log("main.js: Начало загрузки");
const BASE_PATH = getBasePath();
console.log("Определен базовый путь:", BASE_PATH);
window.BASE_PATH = BASE_PATH;
window.modalManager = modalManager$1;
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
          initMap();
          dataFound = true;
        }
      }
      if (!dataFound && window.officesData && window.officesData.length > 0) {
        console.log("Использую предварительно загруженные данные офисов:", window.officesData.length);
        initMap();
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
          const mapInfoPanel = document.querySelector(".map-info-panel");
          if (mapInfoPanel && mapInfoPanel.dataset.coordinates) {
            const coordStr = mapInfoPanel.dataset.coordinates;
            const coords = coordStr.split(",").map((coord) => parseFloat(coord.trim()));
            if (coords.length === 2) ;
          }
          ({
            city: defaultOfficeCity.textContent,
            address: defaultOfficeAddress ? defaultOfficeAddress.textContent : "",
            type: defaultOfficeType ? defaultOfficeType.textContent : "",
            phone: defaultOfficePhone ? defaultOfficePhone.textContent : "",
            email: defaultOfficeEmail ? defaultOfficeEmail.textContent : ""
          });
          initMap();
        } else {
          console.log("Данные не найдены на странице, инициализируем карту без маркеров");
          initMap();
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
export {
  initPaymentTabs as a,
  selectOfficeCard as b,
  initFaqAccordion as i,
  selectOfficeCardNoFocus as s
};
