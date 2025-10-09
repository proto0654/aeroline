import { A as AutocompleteInput } from "./AutocompleteInput-C1PGjSeS.js";
import { r as ref, q as watch, v as onMounted, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, I as createVNode, F as Fragment, C as renderList, t as toDisplayString, p as computed, Q as toRef, y as withDirectives, U as vModelCheckbox, A as unref, E as mergeProps, i as isRef, V as renderSlot, b as createTextVNode } from "./runtime-dom.esm-bundler-DZCqFWTW.js";
import { u as useField } from "./TextInput-DRKSnHb_.js";
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
    offices: {
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
    },
    onlyCities: {
      type: Boolean,
      default: false
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
    const quickSelectCities = [
      "Новосибирск",
      "Красноярск",
      "Иркутск",
      "Абакан",
      "Томск"
    ];
    const setFromCity = (city) => {
      from.value = city;
      fromOffice.value = props.offices.find((o) => o.city === city) || null;
    };
    const setToCity = (city) => {
      to.value = city;
      toOffice.value = props.offices.find((o) => o.city === city) || null;
    };
    const onFromItemSelected = (item) => {
      from.value = props.onlyCities ? item.city : item.city + (item.address ? ", " + item.address : "");
      fromOffice.value = item;
    };
    const onToItemSelected = (item) => {
      to.value = props.onlyCities ? item.city : item.city + (item.address ? ", " + item.address : "");
      toOffice.value = item;
    };
    const swapDirections = () => {
      const tempFrom = from.value;
      const tempTo = to.value;
      from.value = tempTo;
      to.value = tempFrom;
      const tempFromOffice = fromOffice.value;
      const tempToOffice = toOffice.value;
      fromOffice.value = tempToOffice;
      toOffice.value = tempFromOffice;
    };
    const handleCalculate = () => {
      if (fromOffice.value && toOffice.value) {
        window.location.href = `./calculator.html?from=${encodeURIComponent(fromOffice.value.id)}&to=${encodeURIComponent(toOffice.value.id)}`;
      } else {
        alert("Пожалуйста, выберите корректные пункты отправки и назначения");
        emit("calculate", { from: from.value, to: to.value });
      }
    };
    const findOfficeByValue = (value) => {
      if (!value) return null;
      let foundOffice = props.offices.find((o) => o.city + (o.address ? ", " + o.address : "") === value);
      if (foundOffice) return foundOffice;
      foundOffice = props.offices.find((o) => o.city === value);
      return foundOffice || null;
    };
    watch([from, to], ([newFrom, newTo]) => {
      emit("update:modelValue", { from: newFrom, to: newTo });
    });
    watch(() => props.modelValue, (newValue) => {
      if (props.onlyCities) {
        const fromOfficeFound = findOfficeByValue(newValue.from);
        const toOfficeFound = findOfficeByValue(newValue.to);
        from.value = fromOfficeFound ? fromOfficeFound.city : newValue.from || "";
        to.value = toOfficeFound ? toOfficeFound.city : newValue.to || "";
        fromOffice.value = fromOfficeFound;
        toOffice.value = toOfficeFound;
      } else {
        from.value = newValue.from || "";
        to.value = newValue.to || "";
        fromOffice.value = findOfficeByValue(newValue.from);
        toOffice.value = findOfficeByValue(newValue.to);
      }
    }, { deep: true });
    onMounted(() => {
      if (props.modelValue.to) {
        toOffice.value = findOfficeByValue(props.modelValue.to);
      }
      const urlParams = new URLSearchParams(window.location.search);
      const fromId = urlParams.get("from");
      const toId = urlParams.get("to");
      if (fromId && fromAutocompleteRef.value) {
        fromAutocompleteRef.value.selectItemById(fromId);
      }
      if (toId && toAutocompleteRef.value) {
        toAutocompleteRef.value.selectItemById(toId);
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
              items: __props.offices,
              modelValue: from.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => from.value = $event),
              onItemSelected: onFromItemSelected,
              emitFullItem: true,
              showResetButton: true,
              onlyCities: __props.onlyCities,
              ref_key: "fromAutocompleteRef",
              ref: fromAutocompleteRef
            }, null, 8, ["items", "modelValue", "onlyCities"]),
            createBaseVNode("div", _hoisted_5$1, [
              (openBlock(), createElementBlock(Fragment, null, renderList(quickSelectCities, (city) => {
                return createBaseVNode("button", {
                  key: "from-" + city,
                  onClick: ($event) => setFromCity(city),
                  class: "cursor-pointer underline leading-1.5",
                  type: "button"
                }, toDisplayString(city), 9, _hoisted_6);
              }), 64))
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
              items: __props.offices,
              modelValue: to.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => to.value = $event),
              onItemSelected: onToItemSelected,
              emitFullItem: true,
              showResetButton: true,
              onlyCities: __props.onlyCities,
              ref_key: "toAutocompleteRef",
              ref: toAutocompleteRef
            }, null, 8, ["items", "modelValue", "onlyCities"]),
            createBaseVNode("div", _hoisted_8, [
              (openBlock(), createElementBlock(Fragment, null, renderList(quickSelectCities, (city) => {
                return createBaseVNode("button", {
                  key: "to-" + city,
                  onClick: ($event) => setToCity(city),
                  class: "cursor-pointer underline leading-1.5",
                  type: "button"
                }, toDisplayString(city), 9, _hoisted_9);
              }), 64))
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
