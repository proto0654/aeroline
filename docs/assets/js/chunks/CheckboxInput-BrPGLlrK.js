import { A as AutocompleteInput, f as formatLocalityName, a as formatSelectedLocalityName } from "./AutocompleteInput-Be-2lfM1.js";
import { a as apiService } from "./apiService-WO6BkSV4.js";
import { r as ref, p as computed, q as watch, v as onMounted, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, E as createVNode, H as Fragment, I as renderList, t as toDisplayString, Q as toRef, F as withDirectives, U as vModelCheckbox, A as unref, z as mergeProps, i as isRef, V as renderSlot, b as createTextVNode } from "./runtime-dom.esm-bundler-cJ5wxxpw.js";
import { u as useField } from "./TextInput-okLtxo6B.js";
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
    localities: {
      type: Array,
      default: () => []
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
  emits: ["update:modelValue", "calculate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const from = ref(props.modelValue.from || "");
    const to = ref(props.modelValue.to || "");
    const fromOffice = ref(null);
    const toOffice = ref(null);
    const fromAutocompleteRef = ref(null);
    const toAutocompleteRef = ref(null);
    const quickSelectCities = computed(() => {
      if (!props.localities || !Array.isArray(props.localities)) {
        return [];
      }
      return props.localities.map((locality) => locality.name).filter((city) => city && city.trim() !== "").slice(0, 7);
    });
    const setFromCity = (city) => {
      var _a;
      try {
        const locality = props.localities.find((l) => l.name === city);
        if (locality) {
          from.value = formatSelectedLocalityName(locality);
          fromOffice.value = locality;
          emit("update:modelValue", {
            from: from.value,
            to: to.value,
            fromAddress: locality,
            toAddress: toOffice.value,
            fromLocalityId: locality.id,
            toLocalityId: (_a = toOffice.value) == null ? void 0 : _a.id
          });
        }
      } catch (error) {
        console.error("Ошибка в setFromCity:", error);
      }
    };
    const setToCity = (city) => {
      var _a;
      try {
        const locality = props.localities.find((l) => l.name === city);
        if (locality) {
          to.value = formatSelectedLocalityName(locality);
          toOffice.value = locality;
          emit("update:modelValue", {
            from: from.value,
            to: to.value,
            fromAddress: fromOffice.value,
            toAddress: toOffice.value,
            fromLocalityId: (_a = fromOffice.value) == null ? void 0 : _a.id,
            toLocalityId: locality.id
          });
        }
      } catch (error) {
        console.error("Ошибка в setToCity:", error);
      }
    };
    const searchLocalitiesApi = async (query) => {
      try {
        return await apiService.searchLocalities(query);
      } catch (error) {
        console.error("Ошибка при поиске населенных пунктов:", error);
        return [];
      }
    };
    const onFromItemSelected = (item) => {
      var _a;
      from.value = formatSelectedLocalityName(item);
      fromOffice.value = item;
      emit("update:modelValue", {
        from: from.value,
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: item.id,
        toLocalityId: (_a = toOffice.value) == null ? void 0 : _a.id
      });
    };
    const onToItemSelected = (item) => {
      var _a;
      to.value = formatSelectedLocalityName(item);
      toOffice.value = item;
      emit("update:modelValue", {
        from: from.value,
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: (_a = fromOffice.value) == null ? void 0 : _a.id,
        toLocalityId: item.id
      });
    };
    const swapDirections = () => {
      var _a, _b;
      const tempFrom = from.value;
      const tempTo = to.value;
      const tempFromOffice = fromOffice.value;
      const tempToOffice = toOffice.value;
      from.value = tempTo;
      to.value = tempFrom;
      fromOffice.value = tempToOffice;
      toOffice.value = tempFromOffice;
      if (fromAutocompleteRef.value) fromAutocompleteRef.value.setInputValue(from.value);
      if (toAutocompleteRef.value) toAutocompleteRef.value.setInputValue(to.value);
      emit("update:modelValue", {
        from: from.value,
        to: to.value,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: (_a = fromOffice.value) == null ? void 0 : _a.id,
        toLocalityId: (_b = toOffice.value) == null ? void 0 : _b.id
      });
    };
    const handleCalculate = () => {
      if (fromOffice.value && toOffice.value) {
        const params = new URLSearchParams();
        params.set("from", fromOffice.value.id);
        params.set("to", toOffice.value.id);
        window.location.href = `./calculator.html?${params.toString()}`;
      } else {
        alert("Пожалуйста, выберите корректные пункты отправки и назначения");
        emit("calculate", { from: from.value, to: to.value });
      }
    };
    const findAddressByValue = (value) => {
      if (!value || !props.localities || !Array.isArray(props.localities)) return null;
      let foundLocality = props.localities.find((locality) => {
        const formattedName = formatLocalityName(locality);
        return formattedName === value;
      });
      if (foundLocality) return foundLocality;
      foundLocality = props.localities.find((locality) => (locality.name || locality.locality || locality.city) === value);
      return foundLocality || null;
    };
    watch([from, to], ([newFrom, newTo]) => {
      var _a, _b;
      emit("update:modelValue", {
        from: newFrom,
        to: newTo,
        fromAddress: fromOffice.value,
        toAddress: toOffice.value,
        fromLocalityId: (_a = fromOffice.value) == null ? void 0 : _a.id,
        toLocalityId: (_b = toOffice.value) == null ? void 0 : _b.id
      });
    });
    watch(() => props.modelValue, (newValue) => {
      const fromChanged = newValue.from !== from.value;
      const toChanged = newValue.to !== to.value;
      if (!fromChanged && !toChanged) {
        return;
      }
      from.value = newValue.from || "";
      to.value = newValue.to || "";
      fromOffice.value = newValue.fromAddress || findAddressByValue(newValue.from);
      toOffice.value = newValue.toAddress || findAddressByValue(newValue.to);
      if (newValue.fromLocalityId) {
        fromOffice.value = props.localities.find((loc) => loc.id === newValue.fromLocalityId) || fromOffice.value;
      }
      if (newValue.toLocalityId) {
        toOffice.value = props.localities.find((loc) => loc.id === newValue.toLocalityId) || toOffice.value;
      }
    }, { deep: true });
    onMounted(() => {
      if (props.modelValue.from) {
        fromOffice.value = findAddressByValue(props.modelValue.from);
      }
      if (props.modelValue.to) {
        toOffice.value = findAddressByValue(props.modelValue.to);
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
              items: __props.localities,
              modelValue: from.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => from.value = $event),
              onItemSelected: onFromItemSelected,
              emitFullItem: true,
              showResetButton: true,
              useApiSearch: true,
              apiSearchFunction: searchLocalitiesApi,
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
              items: __props.localities,
              modelValue: to.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => to.value = $event),
              onItemSelected: onToItemSelected,
              emitFullItem: true,
              showResetButton: true,
              useApiSearch: true,
              apiSearchFunction: searchLocalitiesApi,
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
const _hoisted_1 = { class: "flex items-start relative" };
const _hoisted_2 = { class: "flex items-center h-6 mt-1" };
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
const CheckboxInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48610b87"]]);
export {
  CheckboxInput as C,
  _sfc_main$1 as _
};
