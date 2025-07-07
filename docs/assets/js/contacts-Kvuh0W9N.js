import "./chunks/global-modal-CtLjFuPd.js";
import { s as selectOfficeCardNoFocus, b as selectOfficeCard } from "./mainJs-B6nrBSwm.js";
import "./globalUiJs-CIMhq8JL.js";
import { P as Pagination } from "./chunks/pagination-5ZDBlBwd.js";
import { c as createAutocompleteInput } from "./chunks/autocomplete-CjR2TxGO.js";
import "./chunks/runtime-dom.esm-bundler-BbrWZI0-.js";
import "./chunks/globalModal-BF5JWlWX.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
let officesPagination = null;
function initContactsPage() {
  const officeCards = document.querySelectorAll(".office-card");
  const officeInfoCard = document.querySelector(".selected-office-card");
  const closeSelectedOfficeBtn = document.getElementById("close-selected-office");
  selectOfficeCardNoFocus(null);
  if (closeSelectedOfficeBtn && officeInfoCard) {
    closeSelectedOfficeBtn.addEventListener("click", function() {
      officeInfoCard.style.display = "none";
      selectOfficeCardNoFocus(null);
    });
  }
  initCityFilter();
  if (officeCards.length > 0) {
    officeCards.forEach((card, index) => {
      card.addEventListener("mouseenter", function() {
        this.classList.add("shadow-md");
        this.style.transform = "translateY(-2px)";
        this.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
      });
      card.addEventListener("mouseleave", function() {
        this.classList.remove("shadow-md");
        this.style.transform = "translateY(0)";
      });
      card.addEventListener("click", function(e) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        if (e.target.tagName === "A" && e.target.getAttribute("href") === "#map") {
          console.log('Клик по ссылке "Посмотреть на карте", индекс:', index);
          const officeData2 = {
            city: card.dataset.city || ((_a = card.querySelector("h3")) == null ? void 0 : _a.textContent.trim()),
            address: (_b = card.querySelector(".text-brand-gray")) == null ? void 0 : _b.textContent.trim(),
            type: (_c = card.querySelectorAll(".text-brand-gray")[1]) == null ? void 0 : _c.textContent.trim(),
            phone: (_d = card.querySelectorAll(".text-brand-gray")[2]) == null ? void 0 : _d.textContent.trim(),
            email: (_e = card.querySelectorAll(".text-brand-gray")[3]) == null ? void 0 : _e.textContent.trim()
          };
          const coordinates2 = card.dataset.coordinates ? card.dataset.coordinates.split(",").map((coord) => parseFloat(coord.trim())) : null;
          if (coordinates2 && coordinates2.length === 2) {
            if (typeof ymaps !== "undefined") {
              ymaps.ready(() => {
                var _a2;
                let mapInstance = (_a2 = document.querySelector("#map")) == null ? void 0 : _a2.__yamap;
                if (!mapInstance && window.mapInstance) {
                  mapInstance = window.mapInstance;
                }
                if (!mapInstance && window.currentMap) {
                  mapInstance = window.currentMap;
                }
                if (mapInstance && window.officeMarkers && window.officeMarkers[index]) {
                  selectOfficeCard(
                    card,
                    officeData2,
                    window.officeMarkers[index],
                    mapInstance,
                    coordinates2
                  );
                  const marker = window.officeMarkers[index];
                  if (marker && marker.events && typeof window.setActiveMarker === "function") {
                    window.setActiveMarker(marker);
                  }
                } else if (window.officeMarkers && window.officeMarkers[index]) {
                  const marker = window.officeMarkers[index];
                  if (marker && marker.events) {
                    marker.events.fire("click");
                  }
                  selectOfficeCardNoFocus(card, officeData2);
                } else {
                  selectOfficeCardNoFocus(card, officeData2);
                }
              });
            } else {
              selectOfficeCardNoFocus(card, officeData2);
            }
          }
          return;
        }
        e.preventDefault();
        console.log("Клик по карточке офиса, индекс:", index);
        const officeData = {
          city: card.dataset.city || ((_f = card.querySelector("h3")) == null ? void 0 : _f.textContent.trim()),
          address: (_g = card.querySelector(".text-brand-gray")) == null ? void 0 : _g.textContent.trim(),
          type: (_h = card.querySelectorAll(".text-brand-gray")[1]) == null ? void 0 : _h.textContent.trim(),
          phone: (_i = card.querySelectorAll(".text-brand-gray")[2]) == null ? void 0 : _i.textContent.trim(),
          email: (_j = card.querySelectorAll(".text-brand-gray")[3]) == null ? void 0 : _j.textContent.trim()
        };
        console.log("Данные офиса:", officeData);
        const coordinates = card.dataset.coordinates ? card.dataset.coordinates.split(",").map((coord) => parseFloat(coord.trim())) : null;
        console.log("Координаты:", coordinates);
        console.log("Доступны ли Яндекс.Карты:", typeof ymaps !== "undefined");
        console.log("Доступны ли маркеры:", !!window.officeMarkers);
        if (coordinates && coordinates.length === 2) {
          if (typeof ymaps !== "undefined") {
            ymaps.ready(() => {
              var _a2, _b2;
              let mapInstance = (_a2 = document.querySelector("#map")) == null ? void 0 : _a2.__yamap;
              if (!mapInstance && window.mapInstance) {
                mapInstance = window.mapInstance;
              }
              if (!mapInstance && window.currentMap) {
                mapInstance = window.currentMap;
              }
              console.log("Экземпляр карты:", !!mapInstance);
              console.log("Маркер для индекса", index, ":", !!((_b2 = window.officeMarkers) == null ? void 0 : _b2[index]));
              if (mapInstance && window.officeMarkers && window.officeMarkers[index]) {
                console.log("Вызываем selectOfficeCard с приближением");
                selectOfficeCard(
                  card,
                  officeData,
                  window.officeMarkers[index],
                  mapInstance,
                  coordinates
                );
                const marker = window.officeMarkers[index];
                if (marker && marker.events) {
                  console.log("Устанавливаем маркер как активный");
                  if (typeof window.setActiveMarker === "function") {
                    window.setActiveMarker(marker);
                  }
                }
              } else if (window.officeMarkers && window.officeMarkers[index]) {
                console.log("Карта не найдена, но маркер есть - пробуем прямой вызов функции маркера");
                const marker = window.officeMarkers[index];
                if (marker && marker.events) {
                  marker.events.fire("click");
                }
                selectOfficeCardNoFocus(card, officeData);
              } else {
                console.log("Карта не готова, используем selectOfficeCardNoFocus");
                selectOfficeCardNoFocus(card, officeData);
              }
            });
          } else {
            console.log("Яндекс.Карты не загружены");
            selectOfficeCardNoFocus(card, officeData);
          }
        } else {
          console.log("Некорректные координаты");
        }
      });
    });
    const infoPanel = document.querySelector(".map-info-panel");
    if (infoPanel) {
      infoPanel.classList.add("hidden");
    }
    setTimeout(() => {
      var _a;
      const defaultOffice = (_a = window.initialData) == null ? void 0 : _a.defaultOffice;
      if (defaultOffice) {
        console.log("Показываем офис по умолчанию");
        selectOfficeCardNoFocus(null, defaultOffice);
      }
    }, 1e3);
  }
  initOfficesPagination();
}
function initCityFilter() {
  var _a;
  const cityFilterContainer = document.querySelector(".form .relative.w-full");
  if (!cityFilterContainer) return;
  const offices = ((_a = window.initialData) == null ? void 0 : _a.offices) || [];
  Array.from(new Set(offices.map((office) => office.city && office.city.trim()))).filter(Boolean);
  createAutocompleteInput(cityFilterContainer, offices, "city-filter", "Все города", { onlyCities: true });
  const cityInput = document.getElementById("city-filter-input");
  if (!cityInput) return;
  const resetButton = document.getElementById("city-filter-reset");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      var _a2;
      cityInput.value = "";
      if (officesPagination) {
        officesPagination.resetFilter();
      } else {
        document.querySelectorAll(".office-card").forEach((card) => {
          card.classList.remove("hidden");
        });
      }
      updateMapForFilteredOffices("Все города");
      const defaultOffice = (_a2 = window.initialData) == null ? void 0 : _a2.defaultOffice;
      if (defaultOffice) {
        selectOfficeCardNoFocus(null, defaultOffice);
      }
    });
  }
  function filterOfficeCardsByCity(selectedCity) {
    var _a2;
    console.log("Фильтрация по городу:", selectedCity);
    if (selectedCity === "Все города") {
      if (officesPagination) {
        officesPagination.resetFilter();
      } else {
        document.querySelectorAll(".office-card").forEach((card) => {
          card.classList.remove("hidden");
        });
      }
    } else {
      if (officesPagination) {
        officesPagination.applyFilter(selectedCity);
      } else {
        document.querySelectorAll(".office-card").forEach((card) => {
          const cardCity = card.dataset.city ? card.dataset.city.trim() : "";
          if (cardCity === selectedCity.trim()) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      }
    }
    updateMapForFilteredOffices(selectedCity);
    const defaultOffice = (_a2 = window.initialData) == null ? void 0 : _a2.defaultOffice;
    if (defaultOffice) {
      selectOfficeCardNoFocus(null, defaultOffice);
    }
  }
  cityInput.addEventListener("citySelected", function(e) {
    filterOfficeCardsByCity(e.detail.city);
  });
}
function updateMapForFilteredOffices(selectedCity) {
  if (typeof ymaps === "undefined") return;
  ymaps.ready(function() {
    var _a;
    const mapInstance = (_a = document.querySelector("#map")) == null ? void 0 : _a.__yamap;
    if (!mapInstance) return;
    if (typeof window.resetAllMarkers === "function") {
      window.resetAllMarkers();
    }
    if (selectedCity === "Все города") {
      const allOfficeCoordinates = [];
      document.querySelectorAll(".office-card").forEach((card) => {
        if (card.dataset.coordinates) {
          const coordinates = card.dataset.coordinates.split(",").map((coord) => parseFloat(coord.trim()));
          if (coordinates.length === 2) {
            allOfficeCoordinates.push(coordinates);
          }
        }
      });
      if (typeof window.showAllOfficesOnMap === "function" && allOfficeCoordinates.length > 0) {
        window.showAllOfficesOnMap(allOfficeCoordinates);
      }
    } else {
      const filteredOfficeCoordinates = [];
      document.querySelectorAll(".office-card").forEach((card) => {
        const cardCity = card.dataset.city;
        if (cardCity === selectedCity && card.dataset.coordinates) {
          const coordinates = card.dataset.coordinates.split(",").map((coord) => parseFloat(coord.trim()));
          if (coordinates.length === 2) {
            filteredOfficeCoordinates.push(coordinates);
          }
        }
      });
      if (typeof window.showAllOfficesOnMap === "function" && filteredOfficeCoordinates.length > 0) {
        window.showAllOfficesOnMap(filteredOfficeCoordinates);
      }
    }
  });
}
function initOfficesPagination() {
  const paginationContainer = document.querySelector(".pagination-container");
  if (!paginationContainer) return;
  officesPagination = new Pagination({
    containerSelector: ".offices-grid",
    itemSelector: ".office-card",
    paginationSelector: ".pagination-container",
    itemsPerPage: 9,
    // Количество офисов на странице
    filterSelector: "#city-filter-input",
    filterAttribute: "data-city",
    // Callback перед сменой страницы
    beforePageChange: (page) => {
      selectOfficeCardNoFocus(null);
    },
    // Callback после отрисовки страницы
    afterPageRender: (page) => {
      setTimeout(() => {
        var _a;
        const defaultOffice = (_a = window.initialData) == null ? void 0 : _a.defaultOffice;
        if (defaultOffice) {
          selectOfficeCardNoFocus(null, defaultOffice);
        }
      }, 100);
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initContactsPage();
});
