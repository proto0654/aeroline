import "./chunks/global-modal-dZf6PbYv.js";
import "./mainJs-C_mRkBSU.js";
import "./globalUiJs-Bq6ceTVX.js";
import { r as ref, p as computed, c as createElementBlock, o as openBlock, a as createBaseVNode, d as createCommentVNode, F as Fragment, C as renderList, t as toDisplayString, B as normalizeClass, q as watch, I as createVNode, H as createApp, R as h } from "./chunks/runtime-dom.esm-bundler-DZCqFWTW.js";
import { A as AutocompleteInput } from "./chunks/AutocompleteInput-C1PGjSeS.js";
import "./chunks/globalModal-WavfrdGt.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/TextInput-DRKSnHb_.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/select-arrow-He2ejS2L.js";
const _hoisted_1$1 = { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 offices-grid" };
const _hoisted_2$1 = ["data-city", "data-coordinates", "onClick"];
const _hoisted_3 = { class: "font-bold text-brand-gray body-secondary leading-1.2 my-2 text-h5" };
const _hoisted_4 = { class: "text-brand-gray mb-2" };
const _hoisted_5 = { class: "text-brand-gray" };
const _hoisted_6 = { class: "text-brand-gray" };
const _hoisted_7 = { class: "text-brand-gray" };
const _hoisted_8 = {
  key: 0,
  class: "flex justify-start mt-8 pagination-container"
};
const _hoisted_9 = { class: "inline-flex items-center space-x-1" };
const _hoisted_10 = ["disabled"];
const _hoisted_11 = ["onClick"];
const _hoisted_12 = ["disabled"];
const itemsPerPage = 9;
const _sfc_main$1 = {
  __name: "ContactsGrid",
  props: {
    offices: {
      type: Array,
      required: true
    },
    initialFilter: {
      type: String,
      default: ""
    }
  },
  emits: ["card-click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentPage = ref(1);
    const selectedCity2 = ref(props.initialFilter);
    const filteredOffices = computed(() => {
      if (!selectedCity2.value || selectedCity2.value === "Все города") {
        return props.offices;
      }
      return props.offices.filter((office) => office.city === selectedCity2.value);
    });
    const totalPages = computed(() => {
      return Math.ceil(filteredOffices.value.length / itemsPerPage);
    });
    const paginatedOffices = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredOffices.value.slice(start, end);
    });
    const pages = computed(() => {
      const pagesArray = [];
      for (let i = 1; i <= totalPages.value; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    });
    function changePage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    }
    function setFilter(city) {
      selectedCity2.value = city;
      currentPage.value = 1;
    }
    function onCardClick(office, index, event) {
      if (event.target.tagName === "A" && event.target.getAttribute("href") === "#map") {
        console.log('Клик по ссылке "Посмотреть на карте", индекс:', index);
        const coordinates = office.coordinates;
        if (coordinates && coordinates.length === 2) {
          if (typeof ymaps !== "undefined") {
            ymaps.ready(() => {
              var _a;
              let mapInstance = (_a = document.querySelector("#map")) == null ? void 0 : _a.__yamap;
              if (!mapInstance && window.mapInstance) {
                mapInstance = window.mapInstance;
              }
              if (!mapInstance && window.currentMap) {
                mapInstance = window.currentMap;
              }
              if (mapInstance && window.officeMarkers && window.officeMarkers[index]) {
                if (typeof window.selectOfficeCard === "function") {
                  window.selectOfficeCard(
                    event.target.closest(".office-card"),
                    office,
                    window.officeMarkers[index],
                    mapInstance,
                    coordinates
                  );
                }
                const marker = window.officeMarkers[index];
                if (marker && marker.events && typeof window.setActiveMarker === "function") {
                  window.setActiveMarker(marker);
                }
              } else if (window.officeMarkers && window.officeMarkers[index]) {
                const marker = window.officeMarkers[index];
                if (marker && marker.events) {
                  marker.events.fire("click");
                }
                if (typeof window.selectOfficeCardNoFocus === "function") {
                  window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
                }
              } else {
                if (typeof window.selectOfficeCardNoFocus === "function") {
                  window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
                }
              }
            });
          } else {
            if (typeof window.selectOfficeCardNoFocus === "function") {
              window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
            }
          }
        } else {
          if (typeof window.selectOfficeCardNoFocus === "function") {
            window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
          }
        }
      } else {
        console.log("Клик по карточке офиса:", office.city);
        const coordinates = office.coordinates;
        if (coordinates && coordinates.length === 2) {
          if (typeof ymaps !== "undefined") {
            ymaps.ready(() => {
              var _a;
              let mapInstance = (_a = document.querySelector("#map")) == null ? void 0 : _a.__yamap;
              if (!mapInstance && window.mapInstance) {
                mapInstance = window.mapInstance;
              }
              if (!mapInstance && window.currentMap) {
                mapInstance = window.currentMap;
              }
              if (mapInstance && window.officeMarkers && window.officeMarkers[index]) {
                if (typeof window.selectOfficeCard === "function") {
                  window.selectOfficeCard(
                    event.target.closest(".office-card"),
                    office,
                    window.officeMarkers[index],
                    mapInstance,
                    coordinates
                  );
                }
                const marker = window.officeMarkers[index];
                if (marker && marker.events && typeof window.setActiveMarker === "function") {
                  window.setActiveMarker(marker);
                }
              } else if (window.officeMarkers && window.officeMarkers[index]) {
                const marker = window.officeMarkers[index];
                if (marker && marker.events) {
                  marker.events.fire("click");
                }
                if (typeof window.selectOfficeCardNoFocus === "function") {
                  window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
                }
              } else {
                if (typeof window.selectOfficeCardNoFocus === "function") {
                  window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
                }
              }
            });
          } else {
            if (typeof window.selectOfficeCardNoFocus === "function") {
              window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
            }
          }
        } else {
          if (typeof window.selectOfficeCardNoFocus === "function") {
            window.selectOfficeCardNoFocus(event.target.closest(".office-card"), office);
          }
        }
      }
      emit("card-click", { office, event });
    }
    __expose({
      setFilter
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(paginatedOffices.value, (office, index) => {
            return openBlock(), createElementBlock("div", {
              key: office.id,
              class: "bg-brand-light h-96 rounded-xl p-8 md:p-12 flex flex-col gap-2 justify-between shadow office-card",
              "data-city": office.city,
              "data-coordinates": `${office.coordinates[0]},${office.coordinates[1]}`,
              onClick: ($event) => onCardClick(office, index, $event)
            }, [
              createBaseVNode("div", null, [
                _cache[2] || (_cache[2] = createBaseVNode("svg", {
                  width: "36",
                  height: "42",
                  viewBox: "0 0 36 42",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createBaseVNode("path", {
                    d: "M35.2402 13.9C33.1402 4.66 25.0802 0.5 18.0002 0.5C18.0002 0.5 18.0002 0.5 17.9802 0.5C10.9202 0.5 2.84019 4.64 0.740191 13.88C-1.59981 24.2 4.72019 32.94 10.4402 38.44C12.5602 40.48 15.2802 41.5 18.0002 41.5C20.7202 41.5 23.4402 40.48 25.5402 38.44C31.2602 32.94 37.5802 24.22 35.2402 13.9ZM18.0002 23.92C14.5202 23.92 11.7002 21.1 11.7002 17.62C11.7002 14.14 14.5202 11.32 18.0002 11.32C21.4802 11.32 24.3002 14.14 24.3002 17.62C24.3002 21.1 21.4802 23.92 18.0002 23.92Z",
                    fill: "#008DD2"
                  })
                ], -1)),
                createBaseVNode("h3", _hoisted_3, toDisplayString(office.city), 1),
                createBaseVNode("div", _hoisted_4, toDisplayString(office.address), 1),
                createBaseVNode("div", _hoisted_5, toDisplayString(office.type), 1),
                createBaseVNode("div", _hoisted_6, toDisplayString(office.phone), 1),
                createBaseVNode("div", _hoisted_7, toDisplayString(office.email), 1)
              ]),
              _cache[3] || (_cache[3] = createBaseVNode("a", {
                href: "#map",
                class: "text-brand-blue text-xl font-medium hover:underline mt-2"
              }, "Посмотреть на карте", -1))
            ], 8, _hoisted_2$1);
          }), 128))
        ]),
        totalPages.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("nav", _hoisted_9, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => changePage(currentPage.value - 1)),
              disabled: currentPage.value === 1,
              class: "w-8 h-8 flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50"
            }, "<", 8, _hoisted_10),
            (openBlock(true), createElementBlock(Fragment, null, renderList(pages.value, (page) => {
              return openBlock(), createElementBlock("button", {
                key: page,
                onClick: ($event) => changePage(page),
                class: normalizeClass(["w-8 h-8 flex items-center justify-center rounded transition-colors", page === currentPage.value ? "bg-brand-blue text-white font-bold" : "bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white"])
              }, toDisplayString(page), 11, _hoisted_11);
            }), 128)),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => changePage(currentPage.value + 1)),
              disabled: currentPage.value === totalPages.value,
              class: "w-8 h-8 flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50"
            }, ">", 8, _hoisted_12)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1 = { class: "form flex items-center gap-2" };
const _hoisted_2 = { class: "relative w-full md:max-w-xs" };
const _sfc_main = {
  __name: "CityAutocompleteForm",
  props: {
    offices: {
      type: Array,
      required: true
    }
  },
  emits: ["citySelected", "filterReset"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const selectedCity2 = ref("");
    const onCityItemSelected = (item) => {
      emit("citySelected", item.city);
    };
    watch(selectedCity2, (newValue) => {
      if (!newValue) {
        emit("filterReset");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(AutocompleteInput, {
            name: "cityFilter",
            placeholder: "Выберите город",
            items: __props.offices,
            "only-cities": true,
            modelValue: selectedCity2.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedCity2.value = $event),
            onItemSelected: onCityItemSelected,
            "show-reset-button": true
          }, null, 8, ["items", "modelValue"])
        ])
      ]);
    };
  }
};
const selectedCity = ref("Все города");
const cityFilterApp = createApp({
  setup() {
    var _a;
    const offices = ((_a = window.initialData) == null ? void 0 : _a.offices) || [];
    function onCitySelected(city) {
      console.log("Фильтр обновил город:", city);
      selectedCity.value = city;
    }
    function onFilterReset() {
      console.log("Фильтр сброшен");
      selectedCity.value = "Все города";
    }
    return () => h(_sfc_main, {
      offices,
      onCitySelected,
      onFilterReset
    });
  }
});
cityFilterApp.mount("#city-filter-app");
const contactsGridApp = createApp({
  setup() {
    var _a;
    const offices = ((_a = window.initialData) == null ? void 0 : _a.offices) || [];
    const gridRef = ref(null);
    watch(selectedCity, (newCity) => {
      if (gridRef.value) {
        gridRef.value.setFilter(newCity);
      }
    });
    return () => h(_sfc_main$1, {
      offices,
      initialFilter: selectedCity.value,
      ref: gridRef,
      onCardClick: ({ office, event }) => {
        console.log("Клик по карточке в Vue:", office.city);
      }
    });
  }
});
contactsGridApp.mount("#contacts-grid-app");
