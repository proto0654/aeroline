/**
 * map.js
 * Модуль для работы с картой и маркерами
 */

import { getDeviceType } from "./utils.js";

// Цвета маркеров для карты
const ACTIVE_MARKER_COLOR = "#008DD2"; // Голубой бренд-цвет для активного маркера
const DEFAULT_MARKER_COLOR = "#666666"; // Серый цвет по умолчанию

// Конфигурация карты для разных размеров экрана
export const mapConfig = {
  // Начальные координаты и масштаб
  initialView: {
    // Разные центральные точки для разных типов устройств
    center: {
      desktop: [54.962902, 73.38475], // Центр России (для обзора всей страны на десктопе)
      mobile: [53.224854, 50.199879], // Москва (для мобильных устройств)
    },
    zoom: {
      desktop: 4, // Масштаб для десктопов
      mobile: 3, // Масштаб для мобильных устройств
    },
  },
  // Масштаб при выборе офиса
  officeZoom: {
    desktop: 12, // Уменьшено с 15 до 12 для десктопов при выборе офиса
    mobile: 10, // Уменьшено с 13 до 10 для мобильных при выборе офиса
  },
  // Максимальный масштаб при автоматической подгонке (fitBounds)
  maxBoundsZoom: {
    desktop: 18, // Максимальный масштаб для десктопов
    mobile: 7, // Максимальный масштаб для мобильных
  },
  // Отступы при автоматической подгонке
  boundsPadding: [50, 50],
  // Настройки масштабирования иконок маркеров
  markerSizing: {
    minZoom: 2, // Минимальный зум, при котором начинаем масштабировать
    maxZoom: 18, // Максимальный зум для масштабирования иконок
    minSize: [16, 18], // Минимальный размер иконки [ширина, высота]
    maxSize: [36, 42], // Максимальный размер иконки [ширина, высота]
    minOffset: [-8, -18], // Минимальное смещение иконки
    maxOffset: [-18, -42], // Максимальное смещение иконки
  },
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
  const { minZoom, maxZoom, minSize, maxSize, minOffset, maxOffset } =
    mapConfig.markerSizing;

  // Если зум меньше минимального, возвращаем минимальный размер
  if (currentZoom <= minZoom) {
    return {
      size: minSize,
      offset: minOffset,
    };
  }

  // Если зум больше максимального, возвращаем максимальный размер
  if (currentZoom >= maxZoom) {
    return {
      size: maxSize,
      offset: maxOffset,
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
  const offsetX = Math.round(
    minOffset[0] + (maxOffset[0] - minOffset[0]) * heightRatio
  );
  const offsetY = Math.round(
    minOffset[1] + (maxOffset[1] - minOffset[1]) * heightRatio
  );

  return {
    size: [width, height],
    offset: [offsetX, offsetY],
  };
}

/**
 * Обновляет информационную панель с данными выбранного офиса
 * @param {Object} office - объект с данными офиса
 */
export function updateInfoPanel(office) {
  const infoPanel = document.querySelector(".map-info-panel");
  if (!infoPanel) return;

  // Проверяем и очищаем адрес от повторения города, если он уже содержит город в начале
  let displayAddress = office.address || "";
  if (office.city && displayAddress.trim().startsWith(office.city + ",")) {
    displayAddress = displayAddress.replace(office.city + ",", "").trim();
  }

  // Очищаем содержимое панели, чтобы заполнить его динамически
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
    ${
      office.phone
        ? `<div class="hidden lg:block text-brand-gray">${office.phone}</div>`
        : ""
    }
    ${
      office.email
        ? `<div class="hidden lg:block text-brand-gray">${office.email}</div>`
        : ""
    }
    <button class="bg-brand-blue mt-2 md:mt-5 text-white rounded-lg py-3 text-buttons text-regular btn">Подробнее</button>
  `;

  // Показываем панель
  infoPanel.classList.remove("hidden");

  // Добавляем обработчик для кнопки закрытия
  const closeButton = infoPanel.querySelector(".close-info-panel");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      infoPanel.classList.add("hidden");

      // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
      if (typeof window.resetAllMarkers === "function") {
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
export function selectOfficeCardNoFocus(
  selectedCard,
  officeData = null,
  marker = null,
  map = null
) {
  // Удаляем выделение со всех карточек
  document.querySelectorAll(".office-card").forEach((card) => {
    card.classList.remove("ring", "ring-brand-blue");
  });

  // Если передана карточка, выделяем её
  if (selectedCard) {
    selectedCard.classList.add("ring", "ring-brand-blue");
  }

  // Если переданы данные офиса, обновляем информационную панель
  if (officeData) {
    updateInfoPanel(officeData);
  }

  // Если переданы маркер и карта, только выделяем маркер, но НЕ центрируем карту
  if (marker && map) {
    // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
    if (typeof window.resetAllMarkers === "function") {
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
        iconImageOffset: markerProps.offset,
      });
    }

    // Важно: в этой версии функции мы НЕ центрируем карту и НЕ изменяем масштаб
  }
}

// Добавляем функцию в глобальную область видимости для использования в Vue-компонентах
window.selectOfficeCardNoFocus = selectOfficeCardNoFocus;

/**
 * Централизованная функция для выбора карточки офиса С центрированием и масштабированием карты
 * Используется при клике на маркер или карточку офиса
 * @param {HTMLElement|null} selectedCard - карточка офиса для выделения или null чтобы снять выделение со всех
 * @param {Object|null} officeData - данные офиса для обновления информационной панели
 * @param {Object|null} marker - маркер на карте для выделения
 * @param {Object|null} map - объект карты
 * @param {Array|null} coordinates - координаты для центрирования карты [долгота, широта]
 */
export function selectOfficeCard(
  selectedCard,
  officeData = null,
  marker = null,
  map = null,
  coordinates = null
) {
  // Сначала делаем все те же действия, что и в версии без фокуса
  // Удаляем выделение со всех карточек
  document.querySelectorAll(".office-card").forEach((card) => {
    card.classList.remove("ring", "ring-brand-blue");
  });

  // Если передана карточка, выделяем её
  if (selectedCard) {
    selectedCard.classList.add("ring", "ring-brand-blue");
  }

  // Если переданы данные офиса, обновляем информационную панель
  if (officeData) {
    updateInfoPanel(officeData);
  }

  // Если переданы маркер и карта, выделяем маркер и центрируем карту
  if (marker && map) {
    // Сбрасываем иконки всех маркеров на дефолтные, если доступна функция
    if (typeof window.resetAllMarkers === "function") {
      window.resetAllMarkers();
    }

    // Устанавливаем маркер как активный
    if (typeof window.setActiveMarker === "function") {
      window.setActiveMarker(marker);
    }

    // Создаем маркер активного офиса с голубым цветом
    if (marker.options) {
      // Определяем оптимальный масштаб в зависимости от устройства для приближения
      const newZoom = getZoomForDevice(mapConfig.officeZoom);
      const markerProps = getMarkerSizeForZoom(newZoom);

      // Создаем URL для синего маркера
      const activeMarkerUrl = createColoredMarkerIcon(ACTIVE_MARKER_COLOR);

      // Устанавливаем активную иконку
      marker.options.set({
        iconImageHref: activeMarkerUrl,
        iconImageSize: markerProps.size,
        iconImageOffset: markerProps.offset,
      });
    }

    // Дополнительно: центрируем карту на выбранном маркере или координатах с приближением
    if (coordinates) {
      // Определяем оптимальный масштаб в зависимости от устройства
      const newZoom = getZoomForDevice(mapConfig.officeZoom);

      // Центрируем карту на выбранном маркере с анимацией и приближением
      map.setCenter(coordinates, newZoom, { duration: 300 });
    }
  }
}

// Добавляем функцию в глобальную область видимости для использования в Vue-компонентах
window.selectOfficeCard = selectOfficeCard;

/**
 * Инициализация карты с маркерами офисов
 * @param {string} basePath - базовый путь для загрузки ресурсов (массив офисов теперь читается из data-атрибута элемента #map)
 */
export function initMap(basePath) {
  try {
    // Ждем загрузки API Яндекс.Карт
    ymaps.ready(function () {
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
          console.log(
            "Данные офисов загружены из data-атрибута:",
            offices.length
          );
        } catch (error) {
          console.error(
            "Ошибка при парсинге данных офисов из data-атрибута:",
            error
          );
          // offices останется пустым массивом
        }
      } else {
        // Удален лог о ненахождении данных, теперь это не ошибка, если атрибут пустой
        console.log(
          "Атрибут data-offices не найден или пуст. Инициализация карты без маркеров."
        );
      }

      // Если офисов нет, можно остановить инициализацию или показать пустую карту
      if (!offices || offices.length === 0) {
        console.log("Нет данных офисов для отображения на карте.");
        // Продолжаем инициализацию пустой карты, если нет офисов
      }

      // Центрируем карту с учетом типа устройства
      const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);
      const initialCenter = getCenterForDevice(mapConfig.initialView.center);

      // Создаем карту
      const map = new ymaps.Map("map", {
        center: initialCenter,
        zoom: initialZoom,
        controls: ["zoomControl", "fullscreenControl"],
        behaviors: ["drag", "multiTouch", "scrollZoom"],
      });

      // Делаем карту доступной глобально
      window.currentMap = map;
      window.mapInstance = map;

      // Создаем коллекцию маркеров
      const markers = new ymaps.GeoObjectCollection();
      const officeMarkers = {};

      // Делаем маркеры доступными глобально
      window.officeMarkers = officeMarkers;

      // Отслеживаем активный маркер для определения повторного клика
      let activeMarker = null;

      // Делаем функцию установки активного маркера доступной глобально
      window.setActiveMarker = function (marker) {
        activeMarker = marker;
      };

      // Делаем функцию получения активного маркера доступной глобально
      window.getActiveMarker = function () {
        return activeMarker;
      };

      // Получаем начальные размеры маркеров
      const initialMarkerProps = getMarkerSizeForZoom(initialZoom);

      // Создаем иконки для маркеров с учетом начального масштаба
      const defaultIcon = {
        iconLayout: "default#image",
        iconImageHref: createColoredMarkerIcon(DEFAULT_MARKER_COLOR),
        iconImageSize: initialMarkerProps.size,
        iconImageOffset: initialMarkerProps.offset,
      };

      // Функция для обновления размеров всех маркеров
      function updateAllMarkersSize(currentZoom) {
        const markerProps = getMarkerSizeForZoom(currentZoom);

        // Обновляем размеры для всех маркеров
        Object.values(officeMarkers).forEach((marker) => {
          // Сохраняем текущий статус (активный или нет)
          const isActive = marker.options
            .get("iconImageHref")
            .includes(encodeURIComponent(ACTIVE_MARKER_COLOR));

          // Обновляем размеры
          marker.options.set({
            iconImageSize: markerProps.size,
            iconImageOffset: markerProps.offset,
          });
        });
      }

      // Функция для сброса иконок всех маркеров на дефолтные
      window.resetAllMarkers = function () {
        const currentZoom = map.getZoom();
        const markerProps = getMarkerSizeForZoom(currentZoom);

        Object.values(officeMarkers).forEach((m) => {
          // Устанавливаем цвет по умолчанию (серый)
          const defaultMarkerUrl =
            createColoredMarkerIcon(DEFAULT_MARKER_COLOR);

          m.options.set({
            iconImageHref: defaultMarkerUrl,
            iconImageSize: markerProps.size,
            iconImageOffset: markerProps.offset,
          });
        });
      };

      // Функция для отображения всех офисов на карте
      window.showAllOfficesOnMap = function (coordinates) {
        if (!coordinates || coordinates.length === 0) return;

        // Создаем границы для всех координат
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, new ymaps.geometry.LineString(coordinates).getBounds());

        // Устанавливаем границы с отступами
        map.setBounds(bounds, {
          checkZoomRange: true,
          zoomMargin: mapConfig.boundsPadding,
        });
      };

      // Добавляем маркеры для каждого офиса
      offices.forEach((office, index) => {
        if (!office.coordinates || office.coordinates.length !== 2) return;

        // Создаем маркер с серым цветом по умолчанию
        const defaultMarkerUrl = createColoredMarkerIcon(DEFAULT_MARKER_COLOR);

        const marker = new ymaps.Placemark(
          office.coordinates,
          {
            hintContent: office.city,
          },
          {
            iconLayout: "default#image",
            iconImageHref: defaultMarkerUrl,
            iconImageSize: initialMarkerProps.size,
            iconImageOffset: initialMarkerProps.offset,
          }
        );

        // Сохраняем маркер с индексом офиса для последующего доступа
        officeMarkers[index] = marker;
        markers.add(marker);

        // Обработчик клика по маркеру
        marker.events.add("click", () => {
          // Получаем текущий масштаб карты
          const currentZoom = map.getZoom();
          const officeZoom = getZoomForDevice(mapConfig.officeZoom);
          const initialZoom = getZoomForDevice(mapConfig.initialView.zoom);

          // Определяем, приближен ли сейчас маркер по ТЕКУЩЕМУ масштабу карты
          const isCurrentlyZoomed = Math.abs(currentZoom - officeZoom) < 3;

          // Проверяем, является ли текущий маркер уже активным
          const isCurrentMarker = activeMarker === marker;

          if (!isCurrentMarker) {
            // Если это новый маркер - выделяем его без фокусировки
            selectOfficeCardNoFocus(
              null, // карточка не известна
              office,
              marker,
              map
            );

            // Запоминаем текущий активный маркер
            activeMarker = marker;
          } else {
            // Это клик по уже активному маркеру
            if (!isCurrentlyZoomed) {
              // Если маркер НЕ приближен - приближаем его
              selectOfficeCard(
                null, // карточка не известна
                office,
                marker,
                map,
                marker.geometry.getCoordinates()
              );
            } else {
              // Если маркер уже приближен - возвращаем к обзорному масштабу БЕЗ смещения центра
              // Получаем начальный масштаб для текущего устройства
              // Получаем текущий центр карты
              const currentCenter = map.getCenter();

              // Явно указываем, что маркер должен остаться активным
              // Получаем текущий зум для корректного размера
              const markerProps = getMarkerSizeForZoom(initialZoom);

              // Создаем URL для синего маркера
              const activeMarkerUrl =
                createColoredMarkerIcon(ACTIVE_MARKER_COLOR);

              // Сначала меняем ТОЛЬКО масштаб с анимацией, но сохраняем текущий центр
              map.setZoom(initialZoom, { duration: 300 });

              // Обеспечиваем, чтобы маркер остался активным после изменения масштаба
              setTimeout(() => {
                // Проверяем, что marker все еще существует
                if (marker && marker.options) {
                  marker.options.set({
                    iconImageHref: activeMarkerUrl,
                    iconImageSize: markerProps.size,
                    iconImageOffset: markerProps.offset,
                  });
                }
              }, 350);
            }
          }
        });
      });

      // Добавляем коллекцию маркеров на карту
      map.geoObjects.add(markers);

      // Добавляем обработчик события изменения масштаба карты
      map.events.add("boundschange", function (e) {
        if (e.get("oldZoom") !== e.get("newZoom")) {
          updateAllMarkersSize(e.get("newZoom"));
        }
      });

      // Если есть маркеры, настраиваем отображение карты
      if (markers.getLength() > 0) {
        // Используем заданный в конфигурации масштаб и центр для текущего устройства
        map.setCenter(initialCenter, initialZoom);
      } else {
        // Если маркеров нет, просто центрируем на начальной точке
        map.setCenter(initialCenter, initialZoom);
      }
    });
  } catch (error) {
    console.error("Ошибка при инициализации карты:", error);
  }
}
