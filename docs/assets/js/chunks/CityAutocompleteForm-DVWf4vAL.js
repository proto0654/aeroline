import { A as AutocompleteInput } from "./AutocompleteInput-CeMoVy9i.js";
import { r as ref, c as computed, w as watch, a as createElementBlock, o as openBlock, b as createBaseVNode, t as toDisplayString, d as createVNode } from "./runtime-dom.esm-bundler-D4Ustj8G.js";
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
    const props = __props;
    const emit = __emit;
    const selectedCity = ref("");
    const availableCities = computed(() => {
      if (!props.offices || !Array.isArray(props.offices)) {
        return [];
      }
      const citiesMap = /* @__PURE__ */ new Map();
      props.offices.forEach((office) => {
        const city = office.city || "";
        if (city && city.trim() !== "") {
          if (!citiesMap.has(city)) {
            citiesMap.set(city, {
              name: city,
              region: ""
              // Терминалы не содержат информацию о регионе напрямую
            });
          }
        }
      });
      return Array.from(citiesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    });
    const availableCitiesForSelect = computed(() => {
      return availableCities.value.map((city) => {
        const displayName = city.region ? `${city.name}, ${city.region}` : city.name;
        return {
          name: city.name,
          region: city.region || "",
          id: `city-${city.name}`,
          displayName,
          // Для совместимости с AutocompleteInput
          toString: () => displayName
        };
      });
    });
    function formatCityName(city) {
      if (!city) return "";
      if (typeof city === "string") return city;
      if (city.displayName) return city.displayName;
      if (city.name && city.region) {
        return `${city.name}, ${city.region}`;
      }
      if (city.name) return city.name;
      return String(city);
    }
    const searchCitiesApi = async (query) => {
      try {
        if (!query || query.trim() === "") {
          return availableCitiesForSelect.value;
        }
        const queryLower = query.toLowerCase().trim();
        return availableCitiesForSelect.value.filter((city) => {
          const cityName = city.name.toLowerCase();
          const regionName = (city.region || "").toLowerCase();
          return cityName.includes(queryLower) || regionName.includes(queryLower);
        });
      } catch (error) {
        console.error("Ошибка при поиске городов:", error);
        return [];
      }
    };
    const onCityItemSelected = (item) => {
      const cityName = item.name || item.city || "";
      selectedCity.value = formatCityName(item);
      emit("citySelected", cityName);
    };
    const onReset = () => {
      selectedCity.value = "";
      emit("filterReset");
    };
    watch(selectedCity, (newValue) => {
      if (!newValue || newValue.trim() === "") {
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
            items: availableCitiesForSelect.value,
            modelValue: selectedCity.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedCity.value = $event),
            onItemSelected: onCityItemSelected,
            onReset,
            showResetButton: true,
            useApiSearch: true,
            apiSearchFunction: searchCitiesApi,
            itemFormatter: formatCityName,
            selectedValueFormatter: formatCityName,
            emitFullItem: true
          }, null, 8, ["items", "modelValue"])
        ]))
      ]);
    };
  }
};
export {
  _sfc_main as _
};
