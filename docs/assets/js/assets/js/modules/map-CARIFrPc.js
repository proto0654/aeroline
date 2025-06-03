import { a as getDeviceType } from "./utils-BNm1gLxD.js";
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
function initMap(offices, basePath) {
  try {
    ymaps.ready(function() {
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
      }
    });
  } catch (error) {
    console.error("Ошибка при инициализации карты:", error);
  }
}
export {
  selectOfficeCardNoFocus as a,
  getCenterForDevice as b,
  getMarkerSizeForZoom as c,
  createColoredMarkerIcon as d,
  getZoomForDevice as g,
  initMap as i,
  mapConfig as m,
  selectOfficeCard as s,
  updateInfoPanel as u
};
