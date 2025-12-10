import { A as AutocompleteInput } from "./AutocompleteInput-BlakmFHS.js";
import { r as ref, c as computed, w as watch, u as onMounted, a as createElementBlock, o as openBlock, $ as createCommentVNode, b as createBaseVNode, d as createVNode, F as Fragment, a4 as renderList, C as nextTick, t as toDisplayString, a0 as toRef, a1 as withDirectives, a2 as unref, a3 as mergeProps, R as isRef, af as renderSlot, _ as createTextVNode } from "./runtime-core.esm-bundler-xz8C70T0.js";
import { d as vModelCheckbox } from "./runtime-dom.esm-bundler-DT6Q_ZxL.js";
import { u as useField } from "./TextInput-r96FTHSo.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _imports_0 = "" + new URL("../../img/double-arrow-DkQhunId.svg", import.meta.url).href;
const _hoisted_1$1 = { class: "" };
const _hoisted_2$1 = {
  key: 0,
  class: "text-lg font-bold text-gray-800 mb-4"
};
const _hoisted_3$1 = { class: "flex xl:flex-row flex-col items-start gap-2 mb-4 items-center xl:items-start" };
const _hoisted_4$1 = { class: "w-full" };
const _hoisted_5$1 = { class: "mb-0 md:mb-0 mt-2 md:mt-4 flex flex-row flex-wrap gap-2 text-caption-form text-brand-gray gap-x-2 gap-y-0" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "w-full" };
const _hoisted_8 = { class: "mb-4 md:mb-0 mt-2 md:mt-4 flex flex-row flex-wrap gap-2 text-caption-form text-brand-gray gap-x-2 gap-y-0" };
const _hoisted_9 = ["onClick"];
const _sfc_main$1 = {
  __name: "DirectionForm",
  props: {
    billingAddresses: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object,
      required: true
    },
    showCalculateButton: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "calculate", "cityNotFound", "cityFound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const from = ref(props.modelValue.from || "");
    const to = ref(props.modelValue.to || "");
    const fromOffice = ref(null);
    const toOffice = ref(null);
    const fromAutocompleteRef = ref(null);
    const toAutocompleteRef = ref(null);
    let fromValidationTimer = null;
    let toValidationTimer = null;
    const availableCities = computed(() => {
      if (!props.billingAddresses || !Array.isArray(props.billingAddresses)) {
        return [];
      }
      const citiesMap = /* @__PURE__ */ new Map();
      props.billingAddresses.forEach((addr) => {
        var _a, _b;
        const city = typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "";
        const region = typeof addr.region === "string" ? addr.region : ((_b = addr.region) == null ? void 0 : _b.name) || "";
        if (city && city.trim() !== "") {
          if (!citiesMap.has(city)) {
            citiesMap.set(city, {
              name: city,
              region: region || ""
            });
          }
        }
      });
      return Array.from(citiesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    });
    const availableCitiesForSelect = computed(() => {
      return availableCities.value.map((city) => {
        var _a;
        const regionStr = typeof city.region === "string" ? city.region : ((_a = city.region) == null ? void 0 : _a.name) || "";
        const displayName = regionStr ? `${city.name}, ${regionStr}` : city.name;
        return {
          name: city.name,
          region: regionStr,
          id: `city-${city.name}`,
          displayName,
          // Для совместимости с AutocompleteInput
          toString: () => displayName
        };
      });
    });
    const quickSelectCities = computed(() => {
      return availableCities.value.map((city) => city.name).slice(0, 7);
    });
    computed(() => {
      if (!props.billingAddresses || !Array.isArray(props.billingAddresses)) {
        return [];
      }
      const regions = /* @__PURE__ */ new Set();
      props.billingAddresses.forEach((addr) => {
        if (addr.region && addr.region.trim() !== "") {
          regions.add(addr.region);
        }
      });
      return Array.from(regions).sort();
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
    const setFromCity = (cityName) => {
      try {
        const city = availableCities.value.find((c) => c.name === cityName);
        if (city) {
          from.value = formatCityName(city);
          fromOffice.value = city;
          emit("update:modelValue", {
            from: from.value,
            to: to.value,
            fromAddress: city,
            toAddress: toOffice.value,
            fromLocalityId: null,
            // Не используем ID из localities
            toLocalityId: null
          });
          emit("cityFound", { type: "from" });
        }
      } catch (error) {
        console.error("Ошибка в setFromCity:", error);
      }
    };
    const setToCity = (cityName) => {
      try {
        const city = availableCities.value.find((c) => c.name === cityName);
        if (city) {
          to.value = formatCityName(city);
          toOffice.value = city;
          emit("update:modelValue", {
            from: from.value,
            to: to.value,
            fromAddress: fromOffice.value,
            toAddress: city,
            fromLocalityId: null,
            // Не используем ID из localities
            toLocalityId: null
          });
          emit("cityFound", { type: "to" });
        }
      } catch (error) {
        console.error("Ошибка в setToCity:", error);
      }
    };
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
    function checkCityInBillingAddresses(cityName) {
      if (!cityName || !props.billingAddresses || props.billingAddresses.length === 0) {
        return false;
      }
      const normalizedCityName = extractCityNameFromString(cityName);
      return props.billingAddresses.some((addr) => {
        var _a;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "";
        return addrCity.toLowerCase().trim() === normalizedCityName.toLowerCase().trim() || addrCity === normalizedCityName;
      });
    }
    function extractCityNameFromString(formattedCity) {
      if (!formattedCity) return "";
      let cityName = formattedCity.trim();
      if (cityName.includes(",")) {
        cityName = cityName.split(",")[0].trim();
      }
      return cityName;
    }
    const onFromItemSelected = (item) => {
      from.value = formatCityName(item);
      fromOffice.value = item;
      emit("update:modelValue", {
        from: from.value,
        to: to.value,
        fromAddress: item,
        toAddress: toOffice.value,
        fromLocalityId: null,
        toLocalityId: null
      });
      emit("cityFound", { type: "from" });
    };
    const onToItemSelected = (item) => {
      to.value = formatCityName(item);
      toOffice.value = item;
      emit("update:modelValue", {
        from: from.value,
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: item,
        fromLocalityId: null,
        toLocalityId: null
      });
      emit("cityFound", { type: "to" });
    };
    let isUserTypingFrom = false;
    let isUserTypingTo = false;
    const onFromInputChange = (value) => {
      isUserTypingFrom = true;
      from.value = value || "";
      if (!value || !value.trim()) {
        fromOffice.value = null;
        if (fromValidationTimer) {
          clearTimeout(fromValidationTimer);
          fromValidationTimer = null;
        }
        emit("cityFound", { type: "from" });
        isUserTypingFrom = false;
        return;
      }
      if (fromOffice.value) {
        const formattedName = formatCityName(fromOffice.value);
        if (formattedName === value) {
          isUserTypingFrom = false;
          return;
        }
      }
      if (fromValidationTimer) {
        clearTimeout(fromValidationTimer);
      }
      fromValidationTimer = setTimeout(() => {
        const cityName = extractCityNameFromString(value);
        const isValid = checkCityInBillingAddresses(cityName);
        if (!isValid && cityName.trim()) {
          const cityObj = availableCities.value.find(
            (c) => c.name.toLowerCase() === cityName.toLowerCase()
          );
          emit("cityNotFound", {
            type: "from",
            city: cityName,
            locality: cityObj || null,
            region: (cityObj == null ? void 0 : cityObj.region) || ""
          });
        } else if (isValid) {
          emit("cityFound", { type: "from" });
        }
        fromValidationTimer = null;
        isUserTypingFrom = false;
      }, 1e3);
    };
    const onToInputChange = (value) => {
      isUserTypingTo = true;
      to.value = value || "";
      if (!value || !value.trim()) {
        toOffice.value = null;
        if (toValidationTimer) {
          clearTimeout(toValidationTimer);
          toValidationTimer = null;
        }
        emit("cityFound", { type: "to" });
        isUserTypingTo = false;
        return;
      }
      if (toOffice.value) {
        const formattedName = formatCityName(toOffice.value);
        if (formattedName === value) {
          isUserTypingTo = false;
          return;
        }
      }
      if (toValidationTimer) {
        clearTimeout(toValidationTimer);
      }
      toValidationTimer = setTimeout(() => {
        const cityName = extractCityNameFromString(value);
        const isValid = checkCityInBillingAddresses(cityName);
        if (!isValid && cityName.trim()) {
          const cityObj = availableCities.value.find(
            (c) => c.name.toLowerCase() === cityName.toLowerCase()
          );
          emit("cityNotFound", {
            type: "to",
            city: cityName,
            locality: cityObj || null,
            region: (cityObj == null ? void 0 : cityObj.region) || ""
          });
        } else if (isValid) {
          emit("cityFound", { type: "to" });
        }
        toValidationTimer = null;
        isUserTypingTo = false;
      }, 1e3);
    };
    const onFromReset = () => {
      from.value = "";
      fromOffice.value = null;
      if (fromValidationTimer) {
        clearTimeout(fromValidationTimer);
        fromValidationTimer = null;
      }
      emit("update:modelValue", {
        from: "",
        to: to.value,
        fromAddress: null,
        toAddress: toOffice.value,
        fromLocalityId: null,
        toLocalityId: null
      });
      emit("cityFound", { type: "from" });
    };
    const onToReset = () => {
      to.value = "";
      toOffice.value = null;
      if (toValidationTimer) {
        clearTimeout(toValidationTimer);
        toValidationTimer = null;
      }
      emit("update:modelValue", {
        from: from.value,
        to: "",
        fromAddress: fromOffice.value,
        toAddress: null,
        fromLocalityId: null,
        toLocalityId: null
      });
      emit("cityFound", { type: "to" });
    };
    const swapDirections = () => {
      const tempFrom = from.value;
      const tempTo = to.value;
      const tempFromOffice = fromOffice.value;
      const tempToOffice = toOffice.value;
      const newFrom = tempTo || "";
      const newTo = tempFrom || "";
      const newFromOffice = tempToOffice;
      const newToOffice = tempFromOffice;
      from.value = newFrom;
      to.value = newTo;
      fromOffice.value = newFromOffice;
      toOffice.value = newToOffice;
      emit("update:modelValue", {
        from: newFrom,
        to: newTo,
        fromAddress: newFromOffice,
        toAddress: newToOffice,
        fromLocalityId: null,
        toLocalityId: null
      });
      nextTick(() => {
        if (fromAutocompleteRef.value && newFrom) {
          fromAutocompleteRef.value.setInputValue(newFrom);
        }
        if (toAutocompleteRef.value && newTo) {
          toAutocompleteRef.value.setInputValue(newTo);
        }
      });
    };
    const handleCalculate = () => {
      if (fromOffice.value && toOffice.value) {
        const params = new URLSearchParams();
        params.set("from", fromOffice.value.name);
        params.set("to", toOffice.value.name);
        window.location.href = `./calculator.html?${params.toString()}`;
      } else {
        alert("Пожалуйста, выберите корректные пункты отправки и назначения");
        emit("calculate", { from: from.value, to: to.value });
      }
    };
    const findCityByValue = (value) => {
      if (!value || !availableCities.value || availableCities.value.length === 0) return null;
      let foundCity = availableCities.value.find((city) => {
        const formattedName = formatCityName(city);
        return formattedName === value;
      });
      if (foundCity) return foundCity;
      foundCity = availableCities.value.find((city) => city.name === value);
      return foundCity || null;
    };
    watch([from, to], ([newFrom, newTo]) => {
      if (!newFrom || newFrom.trim() === "") {
        fromOffice.value = null;
      }
      if (!newTo || newTo.trim() === "") {
        toOffice.value = null;
      }
      emit("update:modelValue", {
        from: newFrom || "",
        to: newTo || "",
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: null,
        toLocalityId: null
      });
    });
    watch(() => props.modelValue, (newValue) => {
      if (isUserTypingFrom || isUserTypingTo) {
        return;
      }
      const fromChanged = newValue.from !== from.value;
      const toChanged = newValue.to !== to.value;
      if (!fromChanged && !toChanged) {
        return;
      }
      if (fromChanged) {
        from.value = newValue.from || "";
        nextTick(() => {
        });
      }
      if (toChanged) {
        to.value = newValue.to || "";
        nextTick(() => {
        });
      }
      fromOffice.value = newValue.fromAddress || findCityByValue(newValue.from);
      toOffice.value = newValue.toAddress || findCityByValue(newValue.to);
    }, { deep: true });
    onMounted(() => {
      if (props.modelValue.from) {
        fromOffice.value = findCityByValue(props.modelValue.from);
      }
      if (props.modelValue.to) {
        toOffice.value = findCityByValue(props.modelValue.to);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        __props.showTitle ? (openBlock(), createElementBlock("h3", _hoisted_2$1, "Откуда и куда")) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            createVNode(AutocompleteInput, {
              name: "direction.from",
              placeholder: "Откуда",
              items: availableCitiesForSelect.value,
              modelValue: from.value,
              "onUpdate:modelValue": [
                _cache[0] || (_cache[0] = ($event) => from.value = $event),
                onFromInputChange
              ],
              onItemSelected: onFromItemSelected,
              onReset: onFromReset,
              emitFullItem: true,
              showResetButton: true,
              useApiSearch: true,
              apiSearchFunction: searchCitiesApi,
              itemFormatter: formatCityName,
              selectedValueFormatter: formatCityName,
              ref_key: "fromAutocompleteRef",
              ref: fromAutocompleteRef
            }, null, 8, ["items", "modelValue"]),
            createBaseVNode("div", _hoisted_5$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(quickSelectCities.value, (city) => {
                return openBlock(), createElementBlock("button", {
                  key: "from-" + city,
                  onClick: ($event) => setFromCity(city),
                  class: "cursor-pointer underline leading-1.5",
                  type: "button"
                }, toDisplayString(city), 9, _hoisted_6);
              }), 128))
            ])
          ]),
          createBaseVNode("button", {
            type: "button",
            onClick: swapDirections,
            class: "w-12 mx-auto md:mx-2 my-4 md:mb-0 md:my-4 flex items-center justify-center"
          }, _cache[2] || (_cache[2] = [
            createBaseVNode("img", {
              src: _imports_0,
              alt: "Поменять местами",
              class: "w-6 h-6"
            }, null, -1)
          ])),
          createBaseVNode("div", _hoisted_7, [
            createVNode(AutocompleteInput, {
              name: "direction.to",
              placeholder: "Куда",
              items: availableCitiesForSelect.value,
              modelValue: to.value,
              "onUpdate:modelValue": [
                _cache[1] || (_cache[1] = ($event) => to.value = $event),
                onToInputChange
              ],
              onItemSelected: onToItemSelected,
              onReset: onToReset,
              emitFullItem: true,
              showResetButton: true,
              useApiSearch: true,
              apiSearchFunction: searchCitiesApi,
              itemFormatter: formatCityName,
              selectedValueFormatter: formatCityName,
              ref_key: "toAutocompleteRef",
              ref: toAutocompleteRef
            }, null, 8, ["items", "modelValue"]),
            createBaseVNode("div", _hoisted_8, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(quickSelectCities.value, (city) => {
                return openBlock(), createElementBlock("button", {
                  key: "to-" + city,
                  onClick: ($event) => setToCity(city),
                  class: "cursor-pointer underline leading-1.5",
                  type: "button"
                }, toDisplayString(city), 9, _hoisted_9);
              }), 128))
            ])
          ]),
          __props.showCalculateButton ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "w-full lg:max-w-[7em] leading-[2.1em] w-full btn-gray px-3 py-2 rounded-lg text-white flex flex-rows items-center justify-center gap-1 min-w-[6em] text-buttons",
            onClick: handleCalculate
          }, " Рассчитать ")) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const _hoisted_1 = { class: "flex items-center relative" };
const _hoisted_2 = { class: "flex items-center h-6" };
const _hoisted_3 = ["id", "disabled", "required"];
const _hoisted_4 = ["for"];
const _hoisted_5 = {
  key: 0,
  class: "base-form-error ml-2"
};
const _sfc_main = {
  __name: "CheckboxInput",
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputId = computed(() => props.id || `checkbox-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
    const {
      value: inputValue,
      errorMessage,
      handleBlur
    } = useField(props.name);
    const modelValue = toRef(props, "modelValue");
    watch(modelValue, (newValue) => {
      if (newValue !== inputValue.value) {
        inputValue.value = newValue;
      }
    });
    watch(inputValue, (newValue) => {
      if (newValue !== modelValue.value) {
        emit("update:modelValue", newValue);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          withDirectives(createBaseVNode("input", mergeProps({
            id: inputId.value,
            type: "checkbox",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => unref(handleBlur) && unref(handleBlur)(...args))
          }), null, 16, _hoisted_3), [
            [vModelCheckbox, unref(inputValue)]
          ])
        ]),
        createBaseVNode("label", {
          for: inputId.value,
          class: "ml-2 select-none"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ], 8, _hoisted_4),
        unref(errorMessage) ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const CheckboxInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-151d7bcb"]]);
export {
  CheckboxInput as C,
  _sfc_main$1 as _
};
