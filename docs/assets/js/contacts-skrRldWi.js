import "./chunks/global-modal-JqaLCeH7.js";
import "./mainJs-CjKlFZUB.js";
import "./globalUiJs-D9SlClYo.js";
import { r as ref, p as computed, c as createElementBlock, o as openBlock, a as createBaseVNode, t as toDisplayString, d as createCommentVNode, F as Fragment, C as renderList, I as normalizeClass, q as watch, K as createVNode, J as createApp, D as onMounted, S as h } from "./chunks/runtime-dom.esm-bundler-BeftXQEh.js";
import { A as AutocompleteInput } from "./chunks/AutocompleteInput-r3_ME10q.js";
import { a as apiService } from "./chunks/apiService-CYpZpNN-.js";
import "./chunks/globalModal-CXKQxX77.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/TextInput-BUdG7Qkf.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/select-arrow-He2ejS2L.js";
const _hoisted_1$1 = {
  key: 0,
  class: "text-center p-8"
};
const _hoisted_2$1 = {
  key: 1,
  class: "alert alert-error mb-4"
};
const _hoisted_3$1 = { key: 2 };
const _hoisted_4$1 = { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 offices-grid" };
const _hoisted_5 = ["data-city", "data-coordinates", "onClick"];
const _hoisted_6 = { class: "font-bold text-brand-gray body-secondary leading-1.2 my-2 text-h5" };
const _hoisted_7 = { class: "text-brand-gray mb-2" };
const _hoisted_8 = { class: "text-brand-gray" };
const _hoisted_9 = { class: "text-brand-gray" };
const _hoisted_10 = { class: "text-brand-gray" };
const _hoisted_11 = {
  key: 0,
  class: "flex justify-start mt-8 pagination-container"
};
const _hoisted_12 = { class: "inline-flex items-center space-x-1" };
const _hoisted_13 = ["disabled"];
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["disabled"];
const itemsPerPage = 9;
const _sfc_main$1 = {
  __name: "ContactsGrid",
  props: {
    offices: {
      type: Array,
      required: true
    },
    cities: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
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
        __props.loading ? (openBlock(), createElementBlock("div", _hoisted_1$1, _cache[2] || (_cache[2] = [
          createBaseVNode("div", { class: "loading loading-spinner loading-lg text-primary" }, null, -1),
          createBaseVNode("p", { class: "mt-4 text-gray-600" }, "Загрузка контактов...", -1)
        ]))) : __props.error ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          _cache[3] || (_cache[3] = createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "stroke-current shrink-0 h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24"
          }, [
            createBaseVNode("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            })
          ], -1)),
          createBaseVNode("span", null, toDisplayString(__props.error), 1)
        ])) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(paginatedOffices.value, (office, index) => {
              return openBlock(), createElementBlock("div", {
                key: office.id,
                class: "bg-brand-light h-96 rounded-xl p-8 md:p-12 flex flex-col gap-2 justify-between shadow office-card",
                "data-city": office.city,
                "data-coordinates": `${office.coordinates[0]},${office.coordinates[1]}`,
                onClick: ($event) => onCardClick(office, index, $event)
              }, [
                createBaseVNode("div", null, [
                  _cache[4] || (_cache[4] = createBaseVNode("svg", {
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
                  createBaseVNode("h3", _hoisted_6, toDisplayString(office.city), 1),
                  createBaseVNode("div", _hoisted_7, toDisplayString(office.address), 1),
                  createBaseVNode("div", _hoisted_8, toDisplayString(office.type), 1),
                  createBaseVNode("div", _hoisted_9, toDisplayString(office.phone), 1),
                  createBaseVNode("div", _hoisted_10, toDisplayString(office.email), 1)
                ]),
                _cache[5] || (_cache[5] = createBaseVNode("a", {
                  href: "#map",
                  class: "text-brand-blue text-xl font-medium hover:underline mt-2"
                }, "Посмотреть на карте", -1))
              ], 8, _hoisted_5);
            }), 128))
          ]),
          totalPages.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createBaseVNode("nav", _hoisted_12, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => changePage(currentPage.value - 1)),
                disabled: currentPage.value === 1,
                class: "w-8 h-8 flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50"
              }, "<", 8, _hoisted_13),
              (openBlock(true), createElementBlock(Fragment, null, renderList(pages.value, (page) => {
                return openBlock(), createElementBlock("button", {
                  key: page,
                  onClick: ($event) => changePage(page),
                  class: normalizeClass(["w-8 h-8 flex items-center justify-center rounded transition-colors", page === currentPage.value ? "bg-brand-blue text-white font-bold" : "bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white"])
                }, toDisplayString(page), 11, _hoisted_14);
              }), 128)),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => changePage(currentPage.value + 1)),
                disabled: currentPage.value === totalPages.value,
                class: "w-8 h-8 flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50"
              }, ">", 8, _hoisted_15)
            ])
          ])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
};
const _hoisted_1 = { class: "form flex items-center gap-2" };
const _hoisted_2 = {
  key: 0,
  class: "flex items-center gap-2 text-gray-600"
};
const _hoisted_3 = {
  key: 1,
  class: "text-red-600 text-sm"
};
const _hoisted_4 = {
  key: 2,
  class: "relative w-full md:max-w-xs"
};
const _sfc_main = {
  __name: "CityAutocompleteForm",
  props: {
    offices: {
      type: Array,
      required: true
    },
    cities: {
      type: Array,
      default: () => []
    },
    localities: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  emits: ["citySelected", "filterReset"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const selectedCity2 = ref("");
    const onCityItemSelected = (item) => {
      const cityName = item.name || item.city;
      emit("citySelected", cityName);
    };
    watch(selectedCity2, (newValue) => {
      if (!newValue) {
        emit("filterReset");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.loading ? (openBlock(), createElementBlock("div", _hoisted_2, _cache[1] || (_cache[1] = [
          createBaseVNode("div", { class: "loading loading-spinner loading-sm" }, null, -1),
          createBaseVNode("span", null, "Загрузка...", -1)
        ]))) : __props.error ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(__props.error), 1)) : (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(AutocompleteInput, {
            name: "cityFilter",
            placeholder: "Выберите город",
            items: __props.localities.length > 0 ? __props.localities : __props.offices,
            modelValue: selectedCity2.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedCity2.value = $event),
            onItemSelected: onCityItemSelected,
            "show-reset-button": true
          }, null, 8, ["items", "modelValue"])
        ]))
      ]);
    };
  }
};
const selectedCity = ref("Все города");
const offices = ref([]);
const cities = ref([]);
const localities = ref([]);
const loading = ref(true);
const error = ref(null);
const loadContactsData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const officesData = await apiService.getBillingAddressesWithRelations();
    const localitiesData = await apiService.getLocalitiesWithRelations();
    offices.value = officesData;
    localities.value = localitiesData;
    cities.value = localitiesData.map((locality) => locality.name);
  } catch (err) {
    console.error("Ошибка загрузки контактов:", err);
    error.value = "Ошибка загрузки данных";
    if (window.initialData) {
      offices.value = window.initialData.offices || [];
      cities.value = window.initialData.cities || [];
    }
  } finally {
    loading.value = false;
  }
};
const cityFilterApp = createApp({
  setup() {
    onMounted(() => {
      loadContactsData();
    });
    function onCitySelected(city) {
      console.log("Фильтр обновил город:", city);
      selectedCity.value = city;
    }
    function onFilterReset() {
      console.log("Фильтр сброшен");
      selectedCity.value = "Все города";
    }
    return () => h(_sfc_main, {
      offices: offices.value,
      cities: cities.value,
      localities: localities.value,
      loading: loading.value,
      error: error.value,
      onCitySelected,
      onFilterReset
    });
  }
});
cityFilterApp.mount("#city-filter-app");
const contactsGridApp = createApp({
  setup() {
    const gridRef = ref(null);
    watch(selectedCity, (newCity) => {
      if (gridRef.value) {
        gridRef.value.setFilter(newCity);
      }
    });
    return () => h(_sfc_main$1, {
      offices: offices.value,
      cities: cities.value,
      loading: loading.value,
      error: error.value,
      initialFilter: selectedCity.value,
      ref: gridRef,
      onCardClick: ({ office, event }) => {
        console.log("Клик по карточке в Vue:", office.city);
      }
    });
  }
});
contactsGridApp.mount("#contacts-grid-app");
