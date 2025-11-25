import { r as ref, p as computed, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, t as toDisplayString, A as mergeProps, n as nextTick, W as renderSlot, b as createTextVNode, F as Fragment, C as renderList, q as watch, K as createVNode, I as normalizeClass, G as createBlock, w as withModifiers, D as onMounted, z as unref, Q as getCurrentInstance, j as getCurrentScope, k as onScopeDispose, u as hasInjectionContext, s as inject, i as isRef, L as toValue, O as shallowRef, f as reactive, N as watchEffect, E as onUnmounted, Z as normalizeStyle, J as createApp } from "./chunks/runtime-dom.esm-bundler-BeftXQEh.js";
import { C as CheckboxInput, _ as _sfc_main$c } from "./chunks/CheckboxInput-3ItHIB6A.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { T as TextInput, F as Form, b as Field, E as ErrorMessage } from "./chunks/TextInput-BUdG7Qkf.js";
import { A as AutocompleteInput, f as formatSelectedLocalityName } from "./chunks/AutocompleteInput-r3_ME10q.js";
import { l as lang, i as index } from "./chunks/ru.es-DrgQ5Xct.js";
import { S as SelectInput } from "./chunks/SelectInput-C2Yd_hDG.js";
import { T as TextareaInput } from "./chunks/TextareaInput-VS3H1kvm.js";
import { a as apiService } from "./chunks/apiService-CYpZpNN-.js";
import "./chunks/select-arrow-He2ejS2L.js";
const _hoisted_1$b = ["for"];
const _hoisted_2$a = { class: "relative text-input-vue" };
const _hoisted_3$9 = ["id", "value", "type", "placeholder", "disabled", "required"];
const _hoisted_4$9 = {
  key: 0,
  class: "text-brand-red absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
};
const _hoisted_5$7 = {
  key: 1,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main$b = {
  __name: "CalculatorTextInput",
  props: {
    name: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
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
    hint: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    // Новые props для форматирования
    displayPrefix: {
      type: String,
      default: ""
    },
    displaySuffix: {
      type: String,
      default: ""
    },
    showFormattedWhenBlurred: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputRef = ref(null);
    const isFocused = ref(false);
    const inputId = computed(() => props.id || `calc-input-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
    const inputType = computed(() => {
      if (props.showFormattedWhenBlurred && !isFocused.value && props.modelValue) {
        return "text";
      }
      return props.type;
    });
    const displayValue = computed(() => {
      const value = props.modelValue;
      if (isFocused.value || !value || !props.showFormattedWhenBlurred) {
        return value;
      }
      let formatted = String(value);
      if (props.displayPrefix) {
        formatted = props.displayPrefix + " " + formatted;
      }
      if (props.displaySuffix) {
        formatted = formatted + " " + props.displaySuffix;
      }
      return formatted;
    });
    function handleInput(event) {
      let value = event.target.value;
      if (props.type === "number" && value !== "") {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          value = numValue;
        }
      }
      emit("update:modelValue", value);
    }
    function handleFocus() {
      isFocused.value = true;
      nextTick(() => {
        if (inputRef.value) {
          inputRef.value.select();
        }
      });
    }
    function handleBlur() {
      isFocused.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: inputId.value,
          class: ""
        }, toDisplayString(__props.label), 9, _hoisted_1$b)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$a, [
          createBaseVNode("input", mergeProps({
            ref_key: "inputRef",
            ref: inputRef,
            class: "vue-form-field w-full bg-white focus-visible:outline-gray-200 focus-visible:outline-[1px]",
            id: inputId.value,
            value: displayValue.value,
            onInput: handleInput,
            onFocus: handleFocus,
            onBlur: handleBlur,
            type: inputType.value,
            placeholder: __props.placeholder,
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, {
            class: [
              __props.disabled ? "bg-gray-100 cursor-not-allowed" : ""
            ]
          }), null, 16, _hoisted_3$9),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_4$9, "*")) : createCommentVNode("", true)
        ]),
        __props.hint ? (openBlock(), createElementBlock("p", _hoisted_5$7, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const CalculatorTextInput = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-f5165da5"]]);
const _hoisted_1$a = { class: "flex items-start relative" };
const _hoisted_2$9 = { class: "flex items-center h-6 mt-1" };
const _hoisted_3$8 = ["id", "checked", "disabled", "required"];
const _hoisted_4$8 = ["for"];
const _sfc_main$a = {
  __name: "CalculatorCheckboxInput",
  props: {
    name: {
      type: String,
      default: ""
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
  setup(__props) {
    const props = __props;
    const inputId = computed(() => props.id || `calc-checkbox-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("div", _hoisted_2$9, [
          createBaseVNode("input", mergeProps({
            id: inputId.value,
            type: "checkbox",
            checked: __props.modelValue,
            onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.checked)),
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, { class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" }), null, 16, _hoisted_3$8)
        ]),
        createBaseVNode("label", {
          for: inputId.value,
          class: "ml-2 select-none cursor-pointer"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ], 8, _hoisted_4$8)
      ]);
    };
  }
};
const CalculatorCheckboxInput = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-bcdd8af1"]]);
const _hoisted_1$9 = { class: "flex items-center gap-2 mb-4" };
const _hoisted_2$8 = { class: "text-sm font-medium text-gray-700" };
const _hoisted_3$7 = { class: "space-y-3" };
const _hoisted_4$7 = { class: "flex items-center gap-3" };
const _hoisted_5$6 = ["id", "checked", "onChange"];
const _hoisted_6$6 = ["for"];
const _hoisted_7$6 = {
  key: 0,
  class: "flex items-center gap-2"
};
const _hoisted_8$5 = { class: "text-sm text-gray-500" };
const _hoisted_9$5 = { class: "flex items-center border border-gray-300 rounded-lg overflow-hidden" };
const _hoisted_10$4 = ["disabled", "onClick"];
const _hoisted_11$4 = { class: "px-3 py-1 bg-white text-center min-w-[40px] text-sm" };
const _hoisted_12$4 = ["onClick"];
const _sfc_main$9 = {
  __name: "PackagingSelector",
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "Упаковка"
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function isSelected(id) {
      return props.modelValue.some((item) => item.uid === id);
    }
    function getQuantity(id) {
      const item = props.modelValue.find((item2) => item2.uid === id);
      return item ? item.quantity : 1;
    }
    function getUnitLabel(id) {
      const option = props.options.find((opt) => opt.value === id);
      if (!option) return "шт";
      if (option.uidUnit) {
        const unitMap2 = {
          "unit-pcs": "шт",
          "unit-m3": "м³",
          "unit-m2": "м²",
          "unit-lm": "пог.м"
        };
        return unitMap2[option.uidUnit] || "шт";
      }
      const unitMap = {
        "box-005": "м³",
        // Обрешётка
        "box-009": "пог.м",
        // Пузырчатая пленка
        "box-010": "м²"
        // Стрейч пленка
      };
      return unitMap[id] || "шт";
    }
    function toggleSelection(id) {
      const currentItems = [...props.modelValue];
      const existingIndex = currentItems.findIndex((item) => item.uid === id);
      if (existingIndex >= 0) {
        currentItems.splice(existingIndex, 1);
      } else {
        currentItems.push({ uid: id, quantity: 1 });
      }
      emit("update:modelValue", currentItems);
    }
    function incrementQuantity(id) {
      const currentItems = [...props.modelValue];
      const item = currentItems.find((item2) => item2.uid === id);
      if (item) {
        item.quantity += 1;
        emit("update:modelValue", currentItems);
      }
    }
    function decrementQuantity(id) {
      const currentItems = [...props.modelValue];
      const item = currentItems.find((item2) => item2.uid === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        emit("update:modelValue", currentItems);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$9, [
          createBaseVNode("label", _hoisted_2$8, toDisplayString(__props.label), 1),
          _cache[0] || (_cache[0] = createBaseVNode("span", {
            class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
            "data-tip": "Выберите необходимые типы упаковки. Вы можете заказать несколько типов одновременно. Стоимость упаковки будет добавлена к общей стоимости доставки."
          }, [
            createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_3$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
            return openBlock(), createElementBlock("div", {
              key: option.value,
              class: "flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            }, [
              createBaseVNode("div", _hoisted_4$7, [
                createBaseVNode("input", {
                  id: `${__props.name}_${option.value}`,
                  type: "checkbox",
                  checked: isSelected(option.value),
                  onChange: ($event) => toggleSelection(option.value),
                  class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                }, null, 40, _hoisted_5$6),
                createBaseVNode("label", {
                  for: `${__props.name}_${option.value}`,
                  class: "text-sm font-medium text-gray-700 cursor-pointer"
                }, toDisplayString(option.label), 9, _hoisted_6$6)
              ]),
              isSelected(option.value) ? (openBlock(), createElementBlock("div", _hoisted_7$6, [
                createBaseVNode("span", _hoisted_8$5, toDisplayString(getUnitLabel(option.value)), 1),
                createBaseVNode("div", _hoisted_9$5, [
                  createBaseVNode("button", {
                    type: "button",
                    class: "px-3 py-1 text-gray-700 hover:bg-brand-blue hover:text-white disabled:bg-gray-100 disabled:text-gray-300",
                    disabled: getQuantity(option.value) <= 1,
                    onClick: ($event) => decrementQuantity(option.value)
                  }, " − ", 8, _hoisted_10$4),
                  createBaseVNode("span", _hoisted_11$4, toDisplayString(getQuantity(option.value)), 1),
                  createBaseVNode("button", {
                    type: "button",
                    class: "px-3 py-1 text-gray-700 hover:bg-brand-blue hover:text-white",
                    onClick: ($event) => incrementQuantity(option.value)
                  }, " + ", 8, _hoisted_12$4)
                ])
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
};
const PackagingSelector = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6f38001a"]]);
const _hoisted_1$8 = { class: "flex flex-col gap-4" };
const _hoisted_2$7 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4 [&_.text-input-vue>input]:text-center" };
const _hoisted_3$6 = { class: "flex flex-col gap-2" };
const _hoisted_4$6 = {
  key: 0,
  class: "flex items-center gap-2"
};
const _hoisted_5$5 = { class: "bg-gray-200 rounded-lg p-4 text-gray-500 text-lg" };
const _hoisted_6$5 = {
  key: 1,
  class: "text-sm text-gray-500 italic"
};
const _hoisted_7$5 = { class: "flex items-center gap-4" };
const _hoisted_8$4 = {
  key: 0,
  class: "flex items-center gap-2 flex-shrink-0"
};
const _hoisted_9$4 = { class: "flex items-center border border-gray-300 rounded-lg overflow-hidden" };
const _hoisted_10$3 = ["disabled"];
const _hoisted_11$3 = { class: "px-4 py-2 bg-white text-center min-w-[60px]" };
const _hoisted_12$3 = { class: "border-t border-gray-200 pt-4 flex flex-col gap-4" };
const _hoisted_13$3 = { class: "flex flex-col gap-3" };
const _hoisted_14$2 = { class: "flex items-start gap-2" };
const _hoisted_15$2 = { class: "flex items-start gap-2" };
const _hoisted_16$2 = { class: "flex items-start gap-2" };
const _sfc_main$8 = {
  __name: "CargoPlaceForm",
  props: {
    modelValue: { type: Object, required: true },
    showDuplicateButton: { type: Boolean, default: true },
    calculatorConfig: { type: Object, default: () => ({}) }
  },
  emits: ["update:modelValue", "duplicate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const id = ref(props.modelValue.id || Date.now());
    const length = ref(props.modelValue.length || "");
    const width = ref(props.modelValue.width || "");
    const height = ref(props.modelValue.height || "");
    const volume = ref(props.modelValue.volume || "");
    const weight = ref(props.modelValue.weight || "");
    const description = ref(props.modelValue.description || "");
    const declaredValue = ref(props.modelValue.declaredValue !== void 0 ? props.modelValue.declaredValue : "");
    const packagingItems = ref(props.modelValue.packagingItems || []);
    const selfMarking = ref(props.modelValue.selfMarking || false);
    const dangerousGoods = ref(props.modelValue.dangerousGoods || false);
    const tempControl = ref(props.modelValue.tempControl || false);
    const quantity = ref(props.modelValue.quantity || 1);
    const packagingOptions = computed(() => {
      if (!props.calculatorConfig.packaging) return [];
      return props.calculatorConfig.packaging.map((p) => ({
        value: p.uid,
        label: p.typeBoxing || p.name,
        uidUnit: p.uidUnit,
        price: p.price
      }));
    });
    function incrementQuantity() {
      quantity.value++;
    }
    function decrementQuantity() {
      if (quantity.value > 1) {
        quantity.value--;
      }
    }
    watch(() => props.modelValue, (newValue) => {
      if (id.value !== newValue.id) id.value = newValue.id || Date.now();
      if (length.value !== newValue.length) length.value = newValue.length || "";
      if (width.value !== newValue.width) width.value = newValue.width || "";
      if (height.value !== newValue.height) height.value = newValue.height || "";
      const newVolume = newValue.volume !== void 0 ? newValue.volume : "";
      if (volume.value !== newVolume) volume.value = newVolume;
      if (weight.value !== newValue.weight) weight.value = newValue.weight || "";
      if (description.value !== newValue.description) description.value = newValue.description || "";
      const newDeclaredValue = newValue.declaredValue !== void 0 ? newValue.declaredValue : "";
      if (declaredValue.value !== newDeclaredValue) declaredValue.value = newDeclaredValue;
      const newPackagingItems = newValue.packagingItems || [];
      if (JSON.stringify(packagingItems.value) !== JSON.stringify(newPackagingItems)) {
        packagingItems.value = newPackagingItems;
      }
      if (selfMarking.value !== (newValue.selfMarking || false)) selfMarking.value = newValue.selfMarking || false;
      if (dangerousGoods.value !== (newValue.dangerousGoods || false)) dangerousGoods.value = newValue.dangerousGoods || false;
      if (tempControl.value !== (newValue.tempControl || false)) tempControl.value = newValue.tempControl || false;
      const newQuantity = newValue.quantity || 1;
      if (quantity.value !== newQuantity) quantity.value = newQuantity;
    }, { immediate: true, deep: true });
    watch([length, width, height, volume, weight, description, declaredValue, packagingItems, selfMarking, dangerousGoods, tempControl, quantity], () => {
      emit("update:modelValue", {
        id: id.value,
        length: length.value,
        width: width.value,
        height: height.value,
        volume: volume.value,
        weight: weight.value,
        description: description.value,
        declaredValue: declaredValue.value,
        packagingItems: packagingItems.value,
        selfMarking: selfMarking.value,
        dangerousGoods: dangerousGoods.value,
        tempControl: tempControl.value,
        quantity: quantity.value
      });
    });
    const calculatedVolume = computed(() => {
      const volumeStr = volume.value !== null && volume.value !== void 0 && volume.value !== "" ? String(volume.value).trim() : "";
      if (volumeStr && quantity.value === 1) {
        const vol = parseFloat(volumeStr);
        if (!isNaN(vol) && vol >= 0) {
          return vol.toFixed(3);
        }
      }
      if (length.value && width.value && height.value) {
        const l = parseFloat(length.value) || 0;
        const w = parseFloat(width.value) || 0;
        const h = parseFloat(height.value) || 0;
        if (l > 0 && w > 0 && h > 0) {
          return (l * w * h / 1e6).toFixed(3);
        }
      }
      return "0.000";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("div", _hoisted_2$7, [
          createVNode(CalculatorTextInput, {
            name: `pkg_${id.value}_length`,
            placeholder: "Длина, см",
            modelValue: length.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => length.value = $event),
            type: "number",
            "display-prefix": "Длина",
            "display-suffix": "см",
            "show-formatted-when-blurred": true
          }, null, 8, ["name", "modelValue"]),
          createVNode(CalculatorTextInput, {
            name: `pkg_${id.value}_width`,
            placeholder: "Ширина, см",
            modelValue: width.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => width.value = $event),
            type: "number",
            "display-prefix": "Ширина",
            "display-suffix": "см",
            "show-formatted-when-blurred": true
          }, null, 8, ["name", "modelValue"]),
          createVNode(CalculatorTextInput, {
            name: `pkg_${id.value}_height`,
            placeholder: "Высота, см",
            modelValue: height.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => height.value = $event),
            type: "number",
            "display-prefix": "Высота",
            "display-suffix": "см",
            "show-formatted-when-blurred": true
          }, null, 8, ["name", "modelValue"])
        ]),
        createBaseVNode("div", _hoisted_3$6, [
          quantity.value === 1 ? (openBlock(), createElementBlock("div", _hoisted_4$6, [
            createVNode(CalculatorTextInput, {
              name: `pkg_${id.value}_volume`,
              placeholder: "Объём, куб.м",
              modelValue: volume.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => volume.value = $event),
              type: "number",
              class: "flex-1",
              "display-prefix": "Объём",
              "display-suffix": "куб.м",
              "show-formatted-when-blurred": true
            }, null, 8, ["name", "modelValue"]),
            _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-sm text-gray-500 whitespace-nowrap" }, "или укажите габариты выше", -1))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_5$5, " Объём, куб.м: " + toDisplayString(calculatedVolume.value), 1),
          quantity.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_6$5, " Для одинаковых мест объем рассчитывается только из габаритов ")) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_7$5, [
          createVNode(CalculatorTextInput, {
            name: `pkg_${id.value}_weight`,
            placeholder: "Вес, кг",
            modelValue: weight.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => weight.value = $event),
            type: "number",
            class: "flex-1",
            "display-prefix": "Вес",
            "display-suffix": "кг",
            "show-formatted-when-blurred": true
          }, null, 8, ["name", "modelValue"]),
          __props.showDuplicateButton ? (openBlock(), createElementBlock("div", _hoisted_8$4, [
            _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-sm text-gray-600" }, "Одинаковые места", -1)),
            createBaseVNode("div", _hoisted_9$4, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["px-3 py-2", quantity.value <= 1 ? "bg-gray-100 text-gray-300" : "text-gray-700 hover:bg-brand-blue hover:text-white"]),
                onClick: decrementQuantity,
                disabled: quantity.value <= 1
              }, "−", 10, _hoisted_10$3),
              createBaseVNode("span", _hoisted_11$3, toDisplayString(quantity.value), 1),
              createBaseVNode("button", {
                type: "button",
                class: "px-3 py-2 bg-gray-100 hover:bg-brand-blue text-gray-700 hover:text-white",
                onClick: incrementQuantity
              }, "+")
            ])
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_12$3, [
          createBaseVNode("div", null, [
            _cache[13] || (_cache[13] = createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
              createBaseVNode("label", { class: "text-sm font-medium text-gray-700" }, "Описание содержимого"),
              createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "Укажите краткое описание содержимого посылки для таможенного оформления и безопасной транспортировки."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ])
            ], -1)),
            createVNode(CalculatorTextInput, {
              name: `pkg_${id.value}_desc`,
              placeholder: "Описание содержимого",
              modelValue: description.value,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => description.value = $event)
            }, null, 8, ["name", "modelValue"])
          ]),
          createBaseVNode("div", null, [
            _cache[14] || (_cache[14] = createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
              createBaseVNode("label", { class: "text-sm font-medium text-gray-700" }, "Оценочная стоимость грузоместа, ₽"),
              createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "Укажите объявленную ценность груза для страхования. В случае утери или повреждения компенсация будет рассчитана на основе этой суммы."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ])
            ], -1)),
            createVNode(CalculatorTextInput, {
              name: `pkg_${id.value}_value`,
              placeholder: "Оценочная стоимость грузоместа, ₽",
              modelValue: declaredValue.value,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => declaredValue.value = $event),
              type: "number",
              "display-suffix": "₽",
              "show-formatted-when-blurred": true
            }, null, 8, ["name", "modelValue"])
          ]),
          createVNode(PackagingSelector, {
            name: `pkg_${id.value}_packaging`,
            options: packagingOptions.value,
            modelValue: packagingItems.value,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => packagingItems.value = $event)
          }, null, 8, ["name", "options", "modelValue"]),
          createBaseVNode("div", _hoisted_13$3, [
            createBaseVNode("div", _hoisted_14$2, [
              createVNode(CalculatorCheckboxInput, {
                name: `pkg_${id.value}_self_marking`,
                label: "Самостоятельная маркировка груза",
                modelValue: selfMarking.value,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => selfMarking.value = $event)
              }, null, 8, ["name", "modelValue"]),
              _cache[15] || (_cache[15] = createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "Если вы самостоятельно промаркировали груз штрихкодом или QR-кодом согласно нашим требованиям."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_15$2, [
              createVNode(CalculatorCheckboxInput, {
                name: `pkg_${id.value}_dangerous`,
                label: "Есть опасный груз",
                modelValue: dangerousGoods.value,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => dangerousGoods.value = $event)
              }, null, 8, ["name", "modelValue"]),
              _cache[16] || (_cache[16] = createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "Отметьте, если груз содержит опасные вещества (легковоспламеняющиеся, токсичные, коррозионные материалы). Требуется специальная документация."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_16$2, [
              createVNode(CalculatorCheckboxInput, {
                name: `pkg_${id.value}_temp`,
                label: "Требуется температурный режим",
                modelValue: tempControl.value,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => tempControl.value = $event)
              }, null, 8, ["name", "modelValue"]),
              _cache[17] || (_cache[17] = createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "Для грузов, требующих поддержания определенной температуры при транспортировке (продукты питания, медикаменты)."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ], -1))
            ])
          ])
        ])
      ]);
    };
  }
};
const CargoPlaceForm = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-c967a349"]]);
const _hoisted_1$7 = { class: "w-full" };
const _hoisted_2$6 = { class: "flex gap-2 mb-4 justify-between items-start" };
const _hoisted_3$5 = { class: "overflow-x-auto flex gap-2 flex-1 min-w-0 rounded-lg" };
const _hoisted_4$5 = ["onClick"];
const _hoisted_5$4 = { class: "px-5" };
const _hoisted_6$4 = {
  key: 0,
  class: ""
};
const _hoisted_7$4 = ["onClick"];
const _sfc_main$7 = {
  __name: "CargoPlacesTabs",
  props: {
    modelValue: { type: Array, required: true },
    calculatorConfig: { type: Object, default: () => ({}) }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const packages = ref([]);
    const activeIndex = ref(0);
    let isUpdatingFromParent = false;
    function createDefaultPlace() {
      return {
        id: Date.now() + Math.random(),
        // Уникальный ID
        length: "",
        width: "",
        height: "",
        volume: "",
        weight: "",
        description: "",
        declaredValue: 1e3,
        packagingItems: [],
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
      };
    }
    function initializePackages() {
      if (props.modelValue && props.modelValue.length > 0) {
        packages.value = props.modelValue.map((pkg) => ({
          id: pkg.id || Date.now() + Math.random(),
          length: pkg.length || "",
          width: pkg.width || "",
          height: pkg.height || "",
          volume: pkg.volume !== void 0 ? pkg.volume : "",
          weight: pkg.weight || "",
          description: pkg.description || "",
          declaredValue: pkg.declaredValue !== void 0 ? pkg.declaredValue : 1e3,
          packagingItems: pkg.packagingItems || [],
          selfMarking: pkg.selfMarking || false,
          dangerousGoods: pkg.dangerousGoods || false,
          tempControl: pkg.tempControl || false,
          quantity: pkg.quantity || 1
        }));
      } else {
        packages.value = [createDefaultPlace()];
      }
      if (activeIndex.value >= packages.value.length) {
        activeIndex.value = packages.value.length - 1;
      }
    }
    watch(() => props.modelValue, (newValue) => {
      if (isUpdatingFromParent) return;
      if (newValue && newValue.length > 0) {
        isUpdatingFromParent = true;
        packages.value = newValue.map((pkg) => ({
          id: pkg.id || Date.now() + Math.random(),
          length: pkg.length || "",
          width: pkg.width || "",
          height: pkg.height || "",
          volume: pkg.volume !== void 0 ? pkg.volume : "",
          weight: pkg.weight || "",
          description: pkg.description || "",
          declaredValue: pkg.declaredValue !== void 0 ? pkg.declaredValue : 1e3,
          packagingItems: pkg.packagingItems || [],
          selfMarking: pkg.selfMarking || false,
          dangerousGoods: pkg.dangerousGoods || false,
          tempControl: pkg.tempControl || false,
          quantity: pkg.quantity || 1
        }));
        if (activeIndex.value >= packages.value.length) {
          activeIndex.value = packages.value.length - 1;
        }
        nextTick(() => {
          isUpdatingFromParent = false;
        });
      }
    }, { deep: true, immediate: true });
    watch(packages, (newPackages) => {
      if (isUpdatingFromParent) return;
      emit("update:modelValue", newPackages);
    }, { deep: true });
    function setActive(idx) {
      if (idx >= 0 && idx < packages.value.length) {
        activeIndex.value = idx;
      }
    }
    function add() {
      const newPlace = createDefaultPlace();
      packages.value.push(newPlace);
      activeIndex.value = packages.value.length - 1;
    }
    function remove(idx) {
      if (packages.value.length === 1) return;
      packages.value.splice(idx, 1);
      if (activeIndex.value >= packages.value.length) {
        activeIndex.value = packages.value.length - 1;
      } else if (activeIndex.value > idx) {
        activeIndex.value--;
      }
    }
    initializePackages();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("div", _hoisted_3$5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(packages.value, (pkg, idx) => {
              return openBlock(), createElementBlock("button", {
                key: pkg.id,
                class: normalizeClass(["tab tab-bordered !flex flex-nowrap whitespace-nowrap text-lg flex-shrink-0 bg-white hover:border-brand-blue hover:text-brand-blue", { "[&.tab-active]:bg-brand-gray [&.tab-active]:hover:bg-brand-blue hover:text-white tab-active text-white": idx === activeIndex.value }]),
                onClick: ($event) => setActive(idx)
              }, [
                createBaseVNode("span", _hoisted_5$4, [
                  createTextVNode(toDisplayString(idx + 1) + " место ", 1),
                  pkg.quantity && pkg.quantity > 1 ? (openBlock(), createElementBlock("span", _hoisted_6$4, "(×" + toDisplayString(pkg.quantity) + ")", 1)) : createCommentVNode("", true)
                ]),
                packages.value.length > 1 ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  onClick: withModifiers(($event) => remove(idx), ["stop"]),
                  class: "absolute px-3 mb-[1px] py-4 right-0 top-1/2 -translate-y-1/2 ml-2 text-gray-400 hover:text-red-500 text-3xl leading-[0] h-full flex flex-col justify-center"
                }, "×", 8, _hoisted_7$4)) : createCommentVNode("", true)
              ], 10, _hoisted_4$5);
            }), 128))
          ]),
          createBaseVNode("button", {
            class: "btn btn-primary text-sm flex-shrink-0 ml-2 px-5 py-4",
            onClick: add
          }, "+ Добавить")
        ]),
        packages.value[activeIndex.value] ? (openBlock(), createBlock(CargoPlaceForm, {
          key: 0,
          modelValue: packages.value[activeIndex.value],
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => packages.value[activeIndex.value] = $event),
          "calculator-config": __props.calculatorConfig
        }, null, 8, ["modelValue", "calculator-config"])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$6 = { class: "card items-stretch" };
const _hoisted_2$5 = { class: "flex border border-gray-200 rounded-lg p-1 mb-4 w-full" };
const _hoisted_3$4 = {
  key: 0,
  class: "flex flex-col gap-4"
};
const _hoisted_4$4 = {
  key: 1,
  class: "flex flex-col gap-4"
};
const _sfc_main$6 = {
  __name: "CargoParamsForm",
  props: {
    modelValue: { type: Object, required: true },
    calculatorConfig: { type: Object, required: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const mode = ref(props.modelValue.mode || "total");
    function createDefaultPlace() {
      return {
        id: Date.now() + Math.random(),
        length: "",
        width: "",
        height: "",
        volume: "",
        weight: "",
        description: "",
        declaredValue: "",
        packagingItems: [],
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
      };
    }
    const individualState = ref({
      packages: []
    });
    const totalState = ref({
      package: createDefaultPlace()
    });
    function initializeComponent() {
      mode.value = props.modelValue.mode || "total";
    }
    function setMode(newMode) {
      mode.value = newMode;
      nextTick(() => {
        emitCurrentState();
      });
    }
    function emitCurrentState() {
      let packages;
      if (mode.value === "individual") {
        packages = individualState.value.packages;
      } else {
        packages = [totalState.value.package];
      }
      const dataToEmit = {
        mode: mode.value,
        packages
      };
      emit("update:modelValue", dataToEmit);
    }
    let isUpdatingFromParent = false;
    watch([mode, individualState, totalState], () => {
      if (isUpdatingFromParent) return;
      emitCurrentState();
    }, { deep: true });
    watch(() => props.modelValue, (newValue) => {
      if (isUpdatingFromParent) return;
      isUpdatingFromParent = true;
      mode.value = newValue.mode || "total";
      if (newValue.packages && newValue.packages.length > 0 && newValue.mode === "individual") {
        individualState.value.packages = newValue.packages.map((pkg) => ({
          ...createDefaultPlace(),
          ...pkg
        }));
      } else if (!newValue.packages || newValue.packages.length === 0) {
        individualState.value.packages = [createDefaultPlace()];
      }
      if (newValue.packages && newValue.packages.length > 0 && newValue.mode === "total") {
        totalState.value.package = {
          ...createDefaultPlace(),
          ...newValue.packages[0]
        };
      } else if (!newValue.packages || newValue.packages.length === 0) {
        totalState.value.package = createDefaultPlace();
      }
      nextTick(() => {
        isUpdatingFromParent = false;
      });
    }, { deep: true, immediate: true });
    onMounted(() => {
      initializeComponent();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$6, [
        _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Параметры груза", -1)),
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => setMode("total"), ["prevent"])),
            class: normalizeClass(["flex-1 py-4 uppercase text-caps-regular px-4 rounded-md", mode.value === "total" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Общий вес и объём ", 2),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => setMode("individual"), ["prevent"])),
            class: normalizeClass(["flex-1 py-4 uppercase text-caps-regular px-4 rounded-md", mode.value === "individual" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Места по-отдельности ", 2)
        ]),
        mode.value === "individual" ? (openBlock(), createElementBlock("div", _hoisted_3$4, [
          createVNode(_sfc_main$7, {
            modelValue: individualState.value.packages,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => individualState.value.packages = $event),
            "calculator-config": __props.calculatorConfig
          }, null, 8, ["modelValue", "calculator-config"])
        ])) : createCommentVNode("", true),
        mode.value === "total" ? (openBlock(), createElementBlock("div", _hoisted_4$4, [
          totalState.value.package && totalState.value.package.id ? (openBlock(), createBlock(CargoPlaceForm, {
            key: `total-package-${totalState.value.package.id}`,
            modelValue: totalState.value.package,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => totalState.value.package = $event),
            "calculator-config": __props.calculatorConfig,
            showDuplicateButton: false
          }, null, 8, ["modelValue", "calculator-config"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$5 = { class: "w-full" };
const _sfc_main$5 = {
  __name: "DatePickerVue",
  props: {
    initialDate: {
      type: [Date, String],
      default: null
    },
    placeholder: {
      type: String,
      default: "Выберите дату"
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    minDate: {
      type: [Date, String],
      default: null
    },
    maxDate: {
      type: [Date, String],
      default: null
    }
  },
  emits: ["date-select", "clear-selection", "update:date"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedDate = ref(props.initialDate);
    const locale = ref(lang);
    const isOpen = ref(false);
    watch(() => props.initialDate, (newDate) => {
      console.log("DatePickerVue: initialDate prop changed to:", newDate);
      selectedDate.value = newDate;
      console.log("DatePickerVue: selectedDate updated to:", selectedDate.value);
    }, { immediate: true });
    watch(selectedDate, (newDate) => {
      console.log("DatePickerVue: selectedDate changed, emitting update:date", newDate);
      emit("update:date", newDate);
    });
    const handleChange = (newDate) => {
      selectedDate.value = newDate;
      if (props.closeOnSelect && newDate) {
        isOpen.value = false;
      }
    };
    const handleClose = () => {
      console.log("Date picker closed");
    };
    const clearSelection = () => {
      selectedDate.value = null;
      emit("clear-selection");
    };
    __expose({
      clearSelection
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createVNode(unref(index), {
          value: selectedDate.value,
          "onUpdate:value": _cache[0] || (_cache[0] = ($event) => selectedDate.value = $event),
          open: isOpen.value,
          "onUpdate:open": _cache[1] || (_cache[1] = ($event) => isOpen.value = $event),
          type: "date",
          placeholder: "Выберите дату",
          format: "DD.MM.YYYY",
          lang: locale.value,
          onChange: handleChange,
          onClose: handleClose
        }, null, 8, ["value", "open", "lang"])
      ]);
    };
  }
};
const DatePickerVue = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e6da803b"]]);
function formatPVZName(address) {
  if (!address) return "";
  const type = address.type || "";
  const street = address.street || "";
  const houseNumber = address.houseNumber || "";
  const phone = address.phone || "";
  let addressPart = "";
  if (street && houseNumber) {
    addressPart = `${street}, ${houseNumber}`;
  } else if (street) {
    addressPart = street;
  } else if (houseNumber) {
    addressPart = houseNumber;
  }
  let result = "";
  if (type) {
    result = type;
    if (addressPart) {
      result += ` - ${addressPart}`;
    }
  } else if (addressPart) {
    result = addressPart;
  }
  if (phone) {
    result += result ? `, ${phone}` : phone;
  }
  return result;
}
const _hoisted_1$4 = {
  key: 0,
  class: "text-h4 font-bold mb-4"
};
const _hoisted_2$4 = {
  key: 1,
  class: "text-gray-600 mb-6"
};
const _hoisted_3$3 = { key: 0 };
const _hoisted_4$3 = {
  key: 1,
  class: "text-sm text-gray-600 mb-2"
};
const _hoisted_5$3 = { key: 2 };
const _hoisted_6$3 = {
  key: 3,
  class: "text-sm text-gray-600 mb-2"
};
const _hoisted_7$3 = { key: 4 };
const _hoisted_8$3 = { class: "flex gap-4 pt-4" };
const _hoisted_9$3 = ["disabled"];
const _sfc_main$4 = {
  __name: "ManagerRequestForm",
  props: {
    // Предзаполненные данные
    prefillRegion: {
      type: String,
      default: ""
    },
    prefillLocality: {
      type: String,
      default: ""
    },
    prefillStreet: {
      type: String,
      default: ""
    },
    regions: {
      type: Array,
      default: () => []
    },
    localities: {
      type: Array,
      default: () => []
    },
    // Компактный режим (без заголовка и описания)
    compact: {
      type: Boolean,
      default: false
    },
    // Показывать ли поле улицы
    showStreetField: {
      type: Boolean,
      default: true
    }
  },
  emits: ["cancel", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formData = ref({
      region: props.prefillRegion || "",
      locality: props.prefillLocality || "",
      street: props.prefillStreet || "",
      phone: "",
      email: ""
    });
    const isSubmitting = ref(false);
    const message = ref({
      show: false,
      type: "success",
      text: ""
    });
    const isFormValid = computed(() => {
      const regionValid = props.compact ? true : formData.value.region.trim() !== "";
      const localityValid = props.compact ? true : formData.value.locality.trim() !== "";
      const phoneValid = formData.value.phone.trim() !== "";
      const emailValid = formData.value.email.trim() !== "" && isValidEmail(formData.value.email);
      return regionValid && localityValid && phoneValid && emailValid;
    });
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    function formatRegionName(region) {
      if (typeof region === "string") return region;
      return (region == null ? void 0 : region.name) || "";
    }
    function formatLocalityName(locality) {
      if (typeof locality === "string") return locality;
      return (locality == null ? void 0 : locality.name) || "";
    }
    async function searchRegionsApi(query) {
      try {
        if (!query || query.trim() === "") {
          return props.regions || [];
        }
        const queryLower = query.toLowerCase().trim();
        return (props.regions || []).filter((region) => {
          const regionName = typeof region === "string" ? region : region.name || region;
          return regionName.toLowerCase().includes(queryLower);
        });
      } catch (error) {
        console.error("Ошибка при поиске регионов:", error);
        return [];
      }
    }
    async function searchLocalitiesApi(query) {
      try {
        if (!query || query.trim() === "") {
          return props.localities || [];
        }
        const queryLower = query.toLowerCase().trim();
        return (props.localities || []).filter((locality) => {
          const localityName = typeof locality === "string" ? locality : locality.name || "";
          const regionName = typeof locality === "string" ? "" : locality.region || "";
          return localityName.toLowerCase().includes(queryLower) || regionName.toLowerCase().includes(queryLower);
        });
      } catch (error) {
        console.error("Ошибка при поиске населенных пунктов:", error);
        return [];
      }
    }
    async function handleSubmit() {
      if (!isFormValid.value) {
        message.value = {
          show: true,
          type: "error",
          text: "Пожалуйста, заполните все обязательные поля корректно"
        };
        return;
      }
      isSubmitting.value = true;
      message.value.show = false;
      try {
        emit("submit", {
          region: formData.value.region,
          locality: formData.value.locality,
          street: formData.value.street,
          phone: formData.value.phone,
          email: formData.value.email
        });
        message.value = {
          show: true,
          type: "success",
          text: "Запрос успешно отправлен! Наш менеджер свяжется с вами в ближайшее время."
        };
        setTimeout(() => {
          formData.value = {
            region: props.prefillRegion || "",
            locality: props.prefillLocality || "",
            street: props.prefillStreet || "",
            phone: "",
            email: ""
          };
          message.value.show = false;
        }, 3e3);
      } catch (error) {
        message.value = {
          show: true,
          type: "error",
          text: "Произошла ошибка при отправке запроса. Пожалуйста, попробуйте еще раз."
        };
      } finally {
        isSubmitting.value = false;
      }
    }
    function handleCancel() {
      emit("cancel");
    }
    watch(() => [props.prefillRegion, props.prefillLocality, props.prefillStreet], ([region, locality, street]) => {
      if (region) {
        formData.value.region = region;
      }
      if (locality) {
        formData.value.locality = locality;
      }
      if (street && !formData.value.street) {
        formData.value.street = street;
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(__props.compact ? "" : "bg-brand-light p-5 rounded-lg")
      }, [
        !__props.compact ? (openBlock(), createElementBlock("h2", _hoisted_1$4, "Запрос на добавление направления")) : createCommentVNode("", true),
        !__props.compact ? (openBlock(), createElementBlock("p", _hoisted_2$4, " Выбранное направление временно недоступно. Заполните форму, и наш менеджер свяжется с вами для уточнения деталей. ")) : createCommentVNode("", true),
        createBaseVNode("form", {
          onSubmit: withModifiers(handleSubmit, ["prevent"]),
          class: "space-y-4"
        }, [
          !__props.compact ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
            _cache[5] || (_cache[5] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, [
              createTextVNode(" Регион "),
              createBaseVNode("span", { class: "text-red-500" }, "*")
            ], -1)),
            createVNode(AutocompleteInput, {
              name: "region",
              placeholder: "Выберите или введите регион",
              items: __props.regions,
              modelValue: formData.value.region,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.region = $event),
              useApiSearch: true,
              apiSearchFunction: searchRegionsApi,
              itemFormatter: formatRegionName,
              selectedValueFormatter: formatRegionName,
              required: ""
            }, null, 8, ["items", "modelValue"])
          ])) : formData.value.region ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
            _cache[6] || (_cache[6] = createBaseVNode("strong", null, "Регион:", -1)),
            createTextVNode(" " + toDisplayString(formData.value.region), 1)
          ])) : createCommentVNode("", true),
          !__props.compact ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
            _cache[7] || (_cache[7] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, [
              createTextVNode(" Населенный пункт "),
              createBaseVNode("span", { class: "text-red-500" }, "*")
            ], -1)),
            createVNode(AutocompleteInput, {
              name: "locality",
              placeholder: "Выберите или введите населенный пункт",
              items: __props.localities,
              modelValue: formData.value.locality,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.locality = $event),
              useApiSearch: true,
              apiSearchFunction: searchLocalitiesApi,
              itemFormatter: formatLocalityName,
              selectedValueFormatter: formatLocalityName,
              required: ""
            }, null, 8, ["items", "modelValue"])
          ])) : formData.value.locality ? (openBlock(), createElementBlock("div", _hoisted_6$3, [
            _cache[8] || (_cache[8] = createBaseVNode("strong", null, "Город:", -1)),
            createTextVNode(" " + toDisplayString(formData.value.locality), 1)
          ])) : createCommentVNode("", true),
          __props.showStreetField ? (openBlock(), createElementBlock("div", _hoisted_7$3, [
            _cache[9] || (_cache[9] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, " Улица ", -1)),
            createVNode(TextInput, {
              name: "street",
              placeholder: "Введите название улицы",
              modelValue: formData.value.street,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.street = $event)
            }, null, 8, ["modelValue"])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            _cache[10] || (_cache[10] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, [
              createTextVNode(" Телефон "),
              createBaseVNode("span", { class: "text-red-500" }, "*")
            ], -1)),
            createVNode(TextInput, {
              name: "phone",
              type: "tel",
              placeholder: "+7 (XXX) XXX-XX-XX",
              modelValue: formData.value.phone,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.value.phone = $event),
              required: ""
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("div", null, [
            _cache[11] || (_cache[11] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, [
              createTextVNode(" Email "),
              createBaseVNode("span", { class: "text-red-500" }, "*")
            ], -1)),
            createVNode(TextInput, {
              name: "email",
              type: "email",
              placeholder: "example@mail.com",
              modelValue: formData.value.email,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.value.email = $event),
              required: ""
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("div", _hoisted_8$3, [
            createBaseVNode("button", {
              type: "submit",
              class: "bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors",
              disabled: isSubmitting.value || !isFormValid.value
            }, toDisplayString(isSubmitting.value ? "Отправка..." : "Отправить запрос"), 9, _hoisted_9$3),
            !__props.compact ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              onClick: handleCancel,
              class: "bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            }, " Отмена ")) : createCommentVNode("", true)
          ]),
          message.value.show ? (openBlock(), createElementBlock("div", {
            key: 5,
            class: normalizeClass([
              "p-4 rounded-lg",
              message.value.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            ])
          }, toDisplayString(message.value.text), 3)) : createCommentVNode("", true)
        ], 32)
      ], 2);
    };
  }
};
const ManagerRequestForm = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-080136a3"]]);
const _hoisted_1$3 = { class: "card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$3 = { class: "text-h4 font-bold mb-4" };
const _hoisted_3$2 = {
  key: 0,
  class: "mb-4 text-sm text-gray-600"
};
const _hoisted_4$2 = { class: "flex border border-gray-200 rounded-lg p-1 mb-4" };
const _hoisted_5$2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_6$2 = { class: "md:col-span-2" };
const _hoisted_7$2 = {
  key: 0,
  class: "md:col-span-2"
};
const _hoisted_8$2 = {
  key: 0,
  class: "md:col-span-2 mb-4"
};
const _hoisted_9$2 = { class: "bg-yellow-50 border border-yellow-200 rounded-lg p-4" };
const _hoisted_10$2 = {
  key: 1,
  class: "md:col-span-2"
};
const _hoisted_11$2 = {
  key: 2,
  class: "mt-4"
};
const _hoisted_12$2 = { class: "bg-yellow-50 border border-yellow-200 rounded-lg p-4" };
const _hoisted_13$2 = { class: "md:col-span-2 grid grid-cols-3 gap-4" };
const _hoisted_14$1 = { class: "md:col-span-2" };
const _hoisted_15$1 = { class: "md:col-span-2" };
const _hoisted_16$1 = {
  key: 2,
  class: "md:col-span-2"
};
const _hoisted_17$1 = { class: "md:col-span-2 flex items-center gap-2" };
const _hoisted_18$1 = {
  key: 3,
  class: "md:col-span-2"
};
const _hoisted_19$1 = {
  key: 4,
  class: "md:col-span-2"
};
const _hoisted_20$1 = { class: "md:col-span-2 border border-gray-200 rounded-lg p-4 space-y-3" };
const _sfc_main$3 = {
  __name: "DeliveryPointForm",
  props: {
    title: { type: String, required: true },
    terminalLabel: { type: String, required: true },
    addressLabel: { type: String, required: true },
    city: { type: String, required: true },
    locality: { type: Object, default: null },
    // Объект locality для точного сравнения
    localities: { type: Array, default: () => [] },
    // Массив всех localities для поиска по ID
    billingAddresses: { type: Array, required: true },
    terminals: { type: Array, default: () => [] },
    takeDelivers: { type: Array, default: () => [] },
    transportTypes: { type: Array, default: () => [] },
    modelValue: { type: Object, required: true },
    namePrefix: { type: String, required: true }
    // e.g., 'departure' or 'destination'
  },
  emits: ["update:modelValue", "addressNotFound", "addressFound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let isUpdatingFromParent = false;
    let streetValidationTimer = null;
    const streetNotFound = ref(false);
    const terminalInputRef = ref(null);
    ref(null);
    const streetInputRef = ref(null);
    const houseInputRef = ref(null);
    const deliveryMode = ref(props.modelValue.deliveryMode || "terminal");
    const date = ref(props.modelValue.date || "");
    const state = ref({
      // Данные для режима терминала
      terminal: {
        searchText: "",
        // Текст поиска в поле ввода
        selectedPVZ: null,
        // Выбранный ПВЗ объект
        displayText: ""
        // Отображаемый текст (отформатированное имя ПВЗ)
      },
      // Данные для режима адреса
      address: {
        street: "",
        // Улица
        house: "",
        // Дом
        building: "",
        // Строение
        office: "",
        // Офис/кв.
        notes: "",
        // Примечания к адресу
        interval: "08:00-12:00",
        // Интервал
        loadingUnloading: false,
        // Погрузо-разгрузочные работы
        floor: "",
        // Этаж
        noElevator: false,
        // Нет лифта
        unpacking: false,
        // Разбор упаковки (только для пункта назначения)
        retailChains: false,
        // Доставка в торговые сети (только для пункта назначения)
        fixedDateTime: false,
        // Фиксированная дата и время (для забора и доставки)
        fixedTime: ""
        // Время при фиксированной дате (шаг в полчаса)
      }
    });
    const location = computed({
      get() {
        if (deliveryMode.value === "terminal") {
          if (state.value.terminal.selectedPVZ) {
            return state.value.terminal.displayText || formatPVZName(state.value.terminal.selectedPVZ);
          }
          return state.value.terminal.searchText || "";
        }
        return "";
      },
      set(newValue) {
        if (isUpdatingFromParent) return;
        if (deliveryMode.value === "terminal") {
          if (newValue && typeof newValue === "object" && (newValue.uidBillingAddress || newValue.uid)) {
            console.log("DeliveryPointForm: location set получил объект терминала", newValue);
            state.value.terminal.selectedPVZ = newValue;
            state.value.terminal.displayText = formatPVZName(newValue);
            state.value.terminal.searchText = "";
            emitCurrentState();
            return;
          }
          if (typeof newValue === "string") {
            const foundTerminal = terminalOptions.value.find((term) => {
              const termRepresentation = term.representation || "";
              const termFormatted = formatPVZName(term);
              const normalizedNewValue = newValue.trim().toLowerCase();
              const normalizedRepresentation = termRepresentation.trim().toLowerCase();
              const normalizedFormatted = termFormatted.trim().toLowerCase();
              return normalizedRepresentation === normalizedNewValue || normalizedFormatted === normalizedNewValue || termRepresentation === newValue || termFormatted === newValue;
            });
            if (foundTerminal) {
              console.log("DeliveryPointForm: Найден терминал по строке", {
                searchValue: newValue,
                foundTerminal,
                representation: foundTerminal.representation,
                uidBillingAddress: foundTerminal.uidBillingAddress
              });
              state.value.terminal.selectedPVZ = foundTerminal;
              state.value.terminal.displayText = foundTerminal.representation || formatPVZName(foundTerminal);
              state.value.terminal.searchText = "";
              emitCurrentState();
              return;
            }
            const isFormattedTerminal = state.value.terminal.selectedPVZ && (state.value.terminal.selectedPVZ.representation === newValue || formatPVZName(state.value.terminal.selectedPVZ) === newValue);
            if (!isFormattedTerminal) {
              state.value.terminal.searchText = newValue;
              state.value.terminal.selectedPVZ = null;
              state.value.terminal.displayText = "";
            }
          }
        }
      }
    });
    function emitCurrentState() {
      let currentLocation;
      if (deliveryMode.value === "terminal") {
        currentLocation = state.value.terminal.selectedPVZ || state.value.terminal.searchText;
      } else {
        currentLocation = {
          street: state.value.address.street,
          house: state.value.address.house,
          building: state.value.address.building,
          office: state.value.address.office,
          notes: state.value.address.notes,
          interval: state.value.address.interval,
          loadingUnloading: state.value.address.loadingUnloading,
          floor: state.value.address.floor,
          noElevator: state.value.address.noElevator,
          unpacking: state.value.address.unpacking,
          retailChains: state.value.address.retailChains,
          fixedDateTime: state.value.address.fixedDateTime,
          fixedTime: state.value.address.fixedTime
        };
      }
      console.log("DeliveryPointForm: Отправка состояния", {
        deliveryMode: deliveryMode.value,
        currentLocation,
        state: state.value
      });
      emit("update:modelValue", {
        ...props.modelValue,
        deliveryMode: deliveryMode.value,
        location: currentLocation,
        date: date.value
      });
    }
    function initializeState() {
      const modelValue = props.modelValue;
      console.log("DeliveryPointForm: Инициализация состояния", {
        modelValue,
        deliveryMode: modelValue.deliveryMode,
        location: modelValue.location,
        locationType: typeof modelValue.location
      });
      if (!hasTerminals.value) {
        deliveryMode.value = "address";
      } else {
        deliveryMode.value = modelValue.deliveryMode || "terminal";
      }
      date.value = modelValue.date || "";
      if (modelValue.location && typeof modelValue.location === "object") {
        if ((modelValue.location.uidBillingAddress || modelValue.location.uid) && !modelValue.location.house) {
          state.value.terminal.selectedPVZ = modelValue.location;
          state.value.terminal.displayText = formatPVZName(modelValue.location);
          state.value.terminal.searchText = "";
          console.log("DeliveryPointForm: Инициализирован терминал", {
            terminal: state.value.terminal,
            location: modelValue.location,
            hasUidBillingAddress: !!modelValue.location.uidBillingAddress
          });
        } else if (modelValue.location.street && modelValue.location.phone && !modelValue.location.house) {
          state.value.terminal.selectedPVZ = modelValue.location;
          state.value.terminal.displayText = formatPVZName(modelValue.location);
          state.value.terminal.searchText = "";
          console.log("DeliveryPointForm: Инициализирован ПВЗ (старый формат)", state.value.terminal);
        } else if (modelValue.location.street !== void 0 || modelValue.location.house !== void 0) {
          state.value.address.street = modelValue.location.street || "";
          state.value.address.house = modelValue.location.house || "";
          state.value.address.building = modelValue.location.building || "";
          state.value.address.office = modelValue.location.office || "";
          state.value.address.notes = modelValue.location.notes || "";
          state.value.address.interval = modelValue.location.interval || "08:00-12:00";
          state.value.address.loadingUnloading = modelValue.location.loadingUnloading || false;
          state.value.address.floor = modelValue.location.floor || "";
          state.value.address.noElevator = modelValue.location.noElevator || false;
          state.value.address.unpacking = modelValue.location.unpacking || false;
          state.value.address.retailChains = modelValue.location.retailChains || false;
          state.value.address.fixedDateTime = modelValue.location.fixedDateTime || false;
          state.value.address.fixedTime = modelValue.location.fixedTime || "";
          console.log("DeliveryPointForm: Инициализирован адрес (объект)", state.value.address);
        }
      } else if (typeof modelValue.location === "string" && modelValue.location.trim()) {
        if (deliveryMode.value === "terminal") {
          state.value.terminal.searchText = modelValue.location;
          state.value.terminal.displayText = "";
          state.value.terminal.selectedPVZ = null;
          console.log("DeliveryPointForm: Инициализирован терминал (строка)", state.value.terminal);
        } else {
          state.value.address.street = modelValue.location;
          console.log("DeliveryPointForm: Инициализирован адрес (строка)", state.value.address);
        }
      }
    }
    const terminalOptions = computed(() => {
      if (!props.city || !props.terminals || props.terminals.length === 0) return [];
      let cityName = null;
      let localityObj = props.locality;
      if (!localityObj && props.localities && props.localities.length > 0) {
        const cityNameFromString = extractCityNameFromFormattedString(props.city);
        localityObj = props.localities.find((loc) => {
          const formattedName = formatSelectedLocalityName(loc);
          const extractedFromFormatted = extractCityNameFromFormattedString(formattedName);
          return extractedFromFormatted === cityNameFromString || loc.name === cityNameFromString;
        });
      }
      if (localityObj && localityObj.name) {
        cityName = localityObj.name;
      } else {
        cityName = extractCityNameFromFormattedString(props.city);
      }
      const normalizedCityName = cityName ? cityName.toLowerCase().trim() : "";
      const filtered = props.terminals.filter((terminal) => {
        if (!terminal.locality) return false;
        const normalizedTerminalLocality = terminal.locality.toLowerCase().trim();
        return normalizedTerminalLocality === normalizedCityName;
      });
      let filteredWithPartial = filtered;
      if (filtered.length === 0 && normalizedCityName) {
        filteredWithPartial = props.terminals.filter((terminal) => {
          if (!terminal.locality) return false;
          const normalizedTerminalLocality = terminal.locality.toLowerCase().trim();
          return normalizedTerminalLocality.includes(normalizedCityName) || normalizedCityName.includes(normalizedTerminalLocality);
        });
      }
      console.log("Фильтрация терминалов:", {
        city: props.city,
        locality: localityObj,
        localityName: localityObj == null ? void 0 : localityObj.name,
        cityName,
        normalizedCityName,
        terminalsCount: props.terminals.length,
        filteredCount: filtered.length,
        filteredWithPartialCount: filteredWithPartial.length,
        allTerminalLocalities: [...new Set(props.terminals.map((t) => t.locality).filter(Boolean))].slice(0, 10),
        sampleTerminals: props.terminals.slice(0, 5).map((t) => {
          var _a;
          return {
            locality: t.locality,
            normalizedLocality: (_a = t.locality) == null ? void 0 : _a.toLowerCase().trim(),
            representation: t.representation
          };
        }),
        filteredTerminals: filteredWithPartial.slice(0, 3).map((t) => ({
          locality: t.locality,
          representation: t.representation
        }))
      });
      return filteredWithPartial;
    });
    const hasAvailableStreets = computed(() => {
      var _a;
      if (!props.city || !props.billingAddresses || props.billingAddresses.length === 0) {
        return false;
      }
      const cityName = ((_a = props.locality) == null ? void 0 : _a.name) || extractCityNameFromFormattedString(props.city);
      if (!cityName) return false;
      return props.billingAddresses.some((addr) => {
        var _a2;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
        return addrCity === cityName && addr.street && addr.street.trim() !== "";
      });
    });
    const hasCityWideCoverage = computed(() => {
      var _a;
      if (!props.city || !props.billingAddresses || props.billingAddresses.length === 0) {
        return false;
      }
      const cityName = ((_a = props.locality) == null ? void 0 : _a.name) || extractCityNameFromFormattedString(props.city);
      if (!cityName) return false;
      const cityWideAddress = props.billingAddresses.find((addr) => {
        var _a2;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
        const addrStreet = addr.street || "";
        return addrCity === cityName && (!addrStreet || addrStreet.trim() === "");
      });
      if (!cityWideAddress) {
        return false;
      }
      if (!props.takeDelivers || props.takeDelivers.length === 0) {
        return false;
      }
      return props.takeDelivers.some((td) => {
        return String(td.uidBillingAddress) === String(cityWideAddress.uid);
      });
    });
    const availableCities = computed(() => {
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
    const availableRegions = computed(() => {
      const regionsSet = /* @__PURE__ */ new Set();
      if (!props.billingAddresses || !Array.isArray(props.billingAddresses)) {
        return [];
      }
      props.billingAddresses.forEach((addr) => {
        var _a;
        if (!addr) return;
        const region = typeof addr.region === "string" ? addr.region : ((_a = addr.region) == null ? void 0 : _a.name) || "";
        if (region && typeof region === "string" && region.trim() !== "") {
          regionsSet.add(region);
        }
      });
      return Array.from(regionsSet).sort();
    });
    const currentCityName = computed(() => {
      var _a;
      return ((_a = props.locality) == null ? void 0 : _a.name) || extractCityNameFromFormattedString(props.city);
    });
    const currentRegion = computed(() => {
      var _a, _b, _c;
      if ((_a = props.locality) == null ? void 0 : _a.region) {
        return typeof props.locality.region === "string" ? props.locality.region : ((_b = props.locality.region) == null ? void 0 : _b.name) || "";
      }
      const cityName = currentCityName.value;
      if (!cityName) return "";
      const address = props.billingAddresses.find((addr) => {
        var _a2;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
        return addrCity === cityName;
      });
      if (!address) return "";
      return typeof address.region === "string" ? address.region : ((_c = address.region) == null ? void 0 : _c.name) || "";
    });
    function handleStreetRequestSubmit(formData) {
      console.log("Street request submitted:", formData);
      alert("Запрос на добавление улицы отправлен! Наш менеджер свяжется с вами в ближайшее время.");
    }
    function extractCityNameFromFormattedString(formattedCity) {
      if (!formattedCity) return "";
      let cityName = formattedCity.trim();
      if (cityName.includes("(")) {
        cityName = cityName.split("(")[0].trim();
      }
      if (cityName.includes(",")) {
        cityName = cityName.split(",")[0].trim();
      }
      cityName = cityName.replace(/^(г\.|пос\.|ст\.|с\.|д\.|х\.|аул|кишл\.)\s*/i, "").trim();
      return cityName;
    }
    const hasTerminals = computed(() => {
      return terminalOptions.value.length > 0;
    });
    const intervalOptions = [
      { value: "08:00-12:00", label: "08:00-12:00" },
      { value: "12:00-16:00", label: "12:00-16:00" },
      { value: "16:00-20:00", label: "16:00-20:00" },
      { value: "20:00-22:00", label: "20:00-22:00" }
    ];
    const timeOptions = [];
    for (let hour = 8; hour <= 22; hour++) {
      timeOptions.push({ value: `${hour.toString().padStart(2, "0")}:00`, label: `${hour.toString().padStart(2, "0")}:00` });
      if (hour < 22) {
        timeOptions.push({ value: `${hour.toString().padStart(2, "0")}:30`, label: `${hour.toString().padStart(2, "0")}:30` });
      }
    }
    const streetOptions = ref([]);
    const houseOptions = ref([]);
    const searchStreetsFunction = computed(() => {
      return async (query) => {
        const currentCity = props.city;
        if (!currentCity) {
          streetOptions.value = [];
          return [];
        }
        try {
          const results = await apiService.searchStreets(currentCity, query);
          if (props.city === currentCity) {
            streetOptions.value = results;
            return results;
          } else {
            streetOptions.value = [];
            return [];
          }
        } catch (error) {
          console.error("Ошибка при поиске улиц:", error);
          streetOptions.value = [];
          return [];
        }
      };
    });
    const searchHousesFunction = computed(() => {
      return async (query) => {
        const currentCity = props.city;
        const currentStreet = state.value.address.street;
        if (!currentCity || !currentStreet) {
          houseOptions.value = [];
          return [];
        }
        try {
          const results = await apiService.searchHouses(currentCity, currentStreet, query);
          if (props.city === currentCity && state.value.address.street === currentStreet) {
            houseOptions.value = results;
            return results;
          } else {
            houseOptions.value = [];
            return [];
          }
        } catch (error) {
          console.error("Ошибка при поиске домов:", error);
          houseOptions.value = [];
          return [];
        }
      };
    });
    function validateAddress(cityName, streetName) {
      if (!cityName || !streetName || !props.billingAddresses || props.billingAddresses.length === 0) {
        return { valid: false, billingAddress: null, isCityWide: false };
      }
      const normalizedStreetName = streetName.toLowerCase().trim();
      const billingAddress = props.billingAddresses.find((addr) => {
        var _a;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "";
        const addrStreet = (addr.street || "").toLowerCase().trim();
        return addrCity === cityName && addrStreet === normalizedStreetName;
      });
      if (billingAddress) {
        if (!props.takeDelivers || props.takeDelivers.length === 0) {
          return { valid: false, billingAddress, isCityWide: false };
        }
        const hasTakeDeliver = props.takeDelivers.some((td) => {
          return String(td.uidBillingAddress) === String(billingAddress.uid);
        });
        if (!hasTakeDeliver) {
          return { valid: false, billingAddress, isCityWide: false };
        }
        return { valid: true, billingAddress, isCityWide: false };
      }
      const cityWideAddress = props.billingAddresses.find((addr) => {
        var _a;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "";
        const addrStreet = addr.street || "";
        return addrCity === cityName && (!addrStreet || addrStreet.trim() === "");
      });
      if (cityWideAddress) {
        if (!props.takeDelivers || props.takeDelivers.length === 0) {
          return { valid: false, billingAddress: null, isCityWide: false };
        }
        const hasTakeDeliver = props.takeDelivers.some((td) => {
          return String(td.uidBillingAddress) === String(cityWideAddress.uid);
        });
        if (hasTakeDeliver) {
          return { valid: true, billingAddress: cityWideAddress, isCityWide: true };
        }
      }
      return { valid: false, billingAddress: null, isCityWide: false };
    }
    function onStreetSelected(item) {
      var _a;
      if (isUpdatingFromParent) return;
      const streetName = item.name || item.street || "";
      state.value.address.street = streetName;
      streetNotFound.value = false;
      state.value.address.house = "";
      state.value.address.building = "";
      state.value.address.office = "";
      if (houseInputRef.value && houseInputRef.value.setInputValue) {
        houseInputRef.value.setInputValue("");
      }
      if (deliveryMode.value === "address" && props.city && streetName) {
        const cityName = ((_a = props.locality) == null ? void 0 : _a.name) || extractCityNameFromFormattedString(props.city);
        const validation = validateAddress(cityName, streetName);
        if (!validation.valid) {
          if (validation.isCityWide || hasCityWideCoverage.value) {
            emit("addressFound", { type: props.namePrefix });
          } else {
            const localityObj = props.locality || props.localities.find((loc) => loc.name === cityName);
            emit("addressNotFound", {
              type: props.namePrefix,
              // 'departure' or 'destination'
              city: cityName,
              street: streetName,
              locality: localityObj,
              region: (localityObj == null ? void 0 : localityObj.region) || ""
            });
            return;
          }
        } else {
          emit("addressFound", { type: props.namePrefix });
        }
      }
      emitCurrentState();
    }
    function onStreetInputChange(value) {
      if (isUpdatingFromParent) return;
      state.value.address.street = value || "";
      if (!value || !value.trim()) {
        state.value.address.house = "";
        state.value.address.building = "";
        state.value.address.office = "";
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
          houseInputRef.value.setInputValue("");
        }
        if (streetValidationTimer) {
          clearTimeout(streetValidationTimer);
          streetValidationTimer = null;
        }
        streetNotFound.value = false;
        emit("addressFound", { type: props.namePrefix });
        emitCurrentState();
        return;
      }
      if (streetValidationTimer) {
        clearTimeout(streetValidationTimer);
      }
      streetValidationTimer = setTimeout(() => {
        var _a;
        if (deliveryMode.value === "address" && props.city && value && value.trim()) {
          const cityName = ((_a = props.locality) == null ? void 0 : _a.name) || extractCityNameFromFormattedString(props.city);
          const validation = validateAddress(cityName, value.trim());
          if (!validation.valid) {
            if (validation.isCityWide || hasCityWideCoverage.value) {
              streetNotFound.value = false;
              emit("addressFound", { type: props.namePrefix });
            } else {
              streetNotFound.value = true;
              const localityObj = props.locality || props.localities.find((loc) => loc.name === cityName);
              emit("addressNotFound", {
                type: props.namePrefix,
                city: cityName,
                street: value.trim(),
                locality: localityObj,
                region: (localityObj == null ? void 0 : localityObj.region) || ""
              });
            }
          } else {
            streetNotFound.value = false;
            emit("addressFound", { type: props.namePrefix });
          }
        }
        streetValidationTimer = null;
      }, 1e3);
      emitCurrentState();
    }
    function onStreetReset() {
      if (isUpdatingFromParent) return;
      state.value.address.street = "";
      state.value.address.house = "";
      state.value.address.building = "";
      state.value.address.office = "";
      streetNotFound.value = false;
      if (houseInputRef.value && houseInputRef.value.setInputValue) {
        houseInputRef.value.setInputValue("");
      }
      emitCurrentState();
    }
    function onHouseSelected(item) {
      if (isUpdatingFromParent) return;
      const houseName = item.name || item.houseNumber || "";
      state.value.address.house = houseName;
      state.value.address.building = "";
      state.value.address.office = "";
      emitCurrentState();
    }
    function onHouseInputChange(value) {
      if (isUpdatingFromParent) return;
      state.value.address.house = value || "";
      if (!value || !value.trim()) {
        state.value.address.building = "";
        state.value.address.office = "";
      }
      emitCurrentState();
    }
    function onHouseReset() {
      if (isUpdatingFromParent) return;
      state.value.address.house = "";
      state.value.address.building = "";
      state.value.address.office = "";
      emitCurrentState();
    }
    function formatStreetName(item) {
      return item.name || item.street || "";
    }
    function formatStreetSelected(item) {
      return item.name || item.street || "";
    }
    function formatHouseName(item) {
      return item.name || item.houseNumber || "";
    }
    function formatHouseSelected(item) {
      return item.name || item.houseNumber || "";
    }
    function onAddressFieldChange() {
      if (isUpdatingFromParent) return;
      emitCurrentState();
    }
    watch(() => state.value.address.fixedDateTime, (newValue) => {
      if (isUpdatingFromParent) return;
      if (!newValue) {
        state.value.address.fixedTime = "";
      }
      emitCurrentState();
    });
    watch(() => state.value.address.loadingUnloading, (newValue) => {
      if (isUpdatingFromParent) return;
      if (!newValue) {
        state.value.address.floor = "";
        state.value.address.noElevator = false;
        state.value.address.unpacking = false;
      }
      emitCurrentState();
    });
    function onTerminalSelected(address) {
      var _a, _b;
      if (isUpdatingFromParent) return;
      console.log("DeliveryPointForm: onTerminalSelected вызван", {
        address,
        addressType: typeof address,
        addressKeys: address && typeof address === "object" ? Object.keys(address) : null,
        hasUidBillingAddress: address == null ? void 0 : address.uidBillingAddress,
        uidBillingAddress: address == null ? void 0 : address.uidBillingAddress,
        fullAddress: address
      });
      if (!address || typeof address !== "object") {
        console.warn("DeliveryPointForm: onTerminalSelected получил не объект:", address);
        return;
      }
      state.value.terminal.selectedPVZ = address;
      state.value.terminal.displayText = formatPVZName(address);
      state.value.terminal.searchText = "";
      console.log("DeliveryPointForm: Выбран терминал", {
        terminal: state.value.terminal,
        selectedPVZ: state.value.terminal.selectedPVZ,
        hasUidBillingAddress: !!((_a = state.value.terminal.selectedPVZ) == null ? void 0 : _a.uidBillingAddress),
        uidBillingAddress: (_b = state.value.terminal.selectedPVZ) == null ? void 0 : _b.uidBillingAddress,
        fullSelectedPVZ: state.value.terminal.selectedPVZ
      });
      emitCurrentState();
    }
    function onTerminalReset() {
      if (isUpdatingFromParent) return;
      state.value.terminal.selectedPVZ = null;
      state.value.terminal.displayText = "";
      state.value.terminal.searchText = "";
      console.log("DeliveryPointForm: Сброшен ПВЗ", state.value.terminal);
      emitCurrentState();
    }
    function onDateChange(newDate) {
      if (isUpdatingFromParent) return;
      date.value = newDate;
      emitCurrentState();
    }
    watch(() => props.city, (newCity, oldCity) => {
      if (isUpdatingFromParent) return;
      if (newCity === oldCity) return;
      streetNotFound.value = false;
      console.log("DeliveryPointForm: Изменение города", { newCity, oldCity, deliveryMode: deliveryMode.value });
      streetOptions.value = [];
      houseOptions.value = [];
      state.value.address.street = "";
      state.value.address.house = "";
      state.value.address.building = "";
      state.value.address.office = "";
      nextTick(() => {
        if (streetInputRef.value && streetInputRef.value.setInputValue) {
          streetInputRef.value.setInputValue("");
        }
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
          houseInputRef.value.setInputValue("");
        }
      });
      if (newCity && !hasTerminals.value && deliveryMode.value === "terminal") {
        deliveryMode.value = "address";
        state.value.terminal.selectedPVZ = null;
        state.value.terminal.displayText = "";
        state.value.terminal.searchText = "";
        emitCurrentState();
        return;
      }
      if (newCity && deliveryMode.value === "terminal" && terminalOptions.value.length > 0) {
        const currentPVZ = state.value.terminal.selectedPVZ;
        let shouldKeepCurrentPVZ = false;
        if (currentPVZ && typeof currentPVZ === "object" && currentPVZ.type) {
          shouldKeepCurrentPVZ = terminalOptions.value.some((pvz) => pvz.id === currentPVZ.id);
        }
        if (shouldKeepCurrentPVZ) {
          return;
        } else {
          state.value.terminal.selectedPVZ = null;
          state.value.terminal.displayText = "";
          state.value.terminal.searchText = "";
          emitCurrentState();
          return;
        }
      }
      if (deliveryMode.value === "terminal") {
        state.value.terminal.selectedPVZ = null;
        state.value.terminal.displayText = "";
        state.value.terminal.searchText = "";
      }
      emitCurrentState();
    });
    watch(() => state.value.address.street, (newStreet, oldStreet) => {
      if (isUpdatingFromParent) return;
      if (oldStreet !== void 0 && newStreet !== oldStreet && newStreet !== "") {
        state.value.address.house = "";
        state.value.address.building = "";
        state.value.address.office = "";
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
          houseInputRef.value.setInputValue("");
        }
        houseOptions.value = [];
      } else if (newStreet === "" || !newStreet) {
        state.value.address.house = "";
        state.value.address.building = "";
        state.value.address.office = "";
        if (houseInputRef.value && houseInputRef.value.setInputValue) {
          houseInputRef.value.setInputValue("");
        }
        houseOptions.value = [];
      }
    });
    watch([deliveryMode, date], () => {
      if (isUpdatingFromParent) return;
      emitCurrentState();
    });
    watch(deliveryMode, (newMode, oldMode) => {
      if (isUpdatingFromParent) return;
      console.log("DeliveryPointForm: Переключение режима", {
        newMode,
        oldMode,
        state: state.value,
        hasTerminals: hasTerminals.value
      });
      if (newMode === "terminal" && !hasTerminals.value) {
        console.log("DeliveryPointForm: Переключение на терминал запрещено - терминалов нет");
        deliveryMode.value = "address";
        return;
      }
      if (newMode === "terminal" && props.city && terminalOptions.value.length > 0) {
        if (state.value.terminal.selectedPVZ) {
          console.log("DeliveryPointForm: Восстанавливаем сохраненный ПВЗ", state.value.terminal.selectedPVZ);
          return;
        } else if (state.value.terminal.searchText) {
          console.log("DeliveryPointForm: Восстанавливаем сохраненную строку поиска", state.value.terminal.searchText);
          return;
        } else {
          console.log("DeliveryPointForm: Нет сохраненного ПВЗ, оставляем поле пустым");
        }
      }
      if (newMode === "address") {
        console.log("DeliveryPointForm: Переключились на адрес, текущее состояние адреса:", state.value.address);
      }
      nextTick(() => {
        console.log("DeliveryPointForm: Принудительное обновление отображения после переключения режима", {
          deliveryMode: deliveryMode.value,
          locationValue: location.value,
          state: state.value
        });
        if (newMode === "terminal" && terminalInputRef.value) {
          const terminalValue = state.value.terminal.displayText || state.value.terminal.searchText || "";
          console.log("DeliveryPointForm: Принудительно устанавливаем значение терминала:", terminalValue);
          if (terminalInputRef.value.setInputValue) {
            terminalInputRef.value.setInputValue(terminalValue);
          }
        }
      });
      emitCurrentState();
    });
    watch(() => props.modelValue, (newValue) => {
      if (isUpdatingFromParent) return;
      isUpdatingFromParent = true;
      console.log("DeliveryPointForm: Получено обновление от родителя", {
        newValue,
        currentDeliveryMode: deliveryMode.value,
        newDeliveryMode: newValue.deliveryMode
      });
      const newDeliveryMode = newValue.deliveryMode || "terminal";
      deliveryMode.value = newDeliveryMode;
      date.value = newValue.date || "";
      if (newValue.location && typeof newValue.location === "object" && (newValue.location.uidBillingAddress || newValue.location.uid || newValue.location.street && newValue.location.phone)) {
        state.value.terminal.selectedPVZ = newValue.location;
        state.value.terminal.displayText = formatPVZName(newValue.location);
        state.value.terminal.searchText = "";
        console.log("DeliveryPointForm: Обновлен терминал", {
          terminal: state.value.terminal,
          location: newValue.location,
          hasUidBillingAddress: !!newValue.location.uidBillingAddress
        });
      } else if (typeof newValue.location === "object" && newValue.location !== null) {
        if (newValue.location.street !== void 0 || newValue.location.house !== void 0) {
          state.value.address.street = newValue.location.street || "";
          state.value.address.house = newValue.location.house || "";
          state.value.address.building = newValue.location.building || "";
          state.value.address.office = newValue.location.office || "";
          state.value.address.notes = newValue.location.notes || "";
          state.value.address.interval = newValue.location.interval || "08:00-12:00";
          state.value.address.loadingUnloading = newValue.location.loadingUnloading || false;
          state.value.address.floor = newValue.location.floor || "";
          state.value.address.noElevator = newValue.location.noElevator || false;
          state.value.address.unpacking = newValue.location.unpacking || false;
          state.value.address.retailChains = newValue.location.retailChains || false;
          state.value.address.fixedDateTime = newValue.location.fixedDateTime || false;
          state.value.address.fixedTime = newValue.location.fixedTime || "";
          console.log("DeliveryPointForm: Обновлен адрес (объект)", state.value.address);
        }
      } else if (typeof newValue.location === "string") {
        if (newDeliveryMode === "terminal") {
          state.value.terminal.searchText = newValue.location;
          state.value.terminal.displayText = "";
          if (!newValue.location.trim()) {
            state.value.terminal.selectedPVZ = null;
          }
          console.log("DeliveryPointForm: Обновлен терминал (строка)", state.value.terminal);
        } else {
          state.value.address.street = newValue.location;
          console.log("DeliveryPointForm: Обновлен адрес (строка)", state.value.address);
        }
      } else if (!newValue.location) {
        if (newDeliveryMode === "terminal") {
          state.value.terminal.selectedPVZ = null;
          state.value.terminal.displayText = "";
          state.value.terminal.searchText = "";
        } else {
          state.value.address.street = "";
          state.value.address.house = "";
          state.value.address.building = "";
          state.value.address.office = "";
          state.value.address.notes = "";
          state.value.address.loadingUnloading = false;
          state.value.address.floor = "";
          state.value.address.noElevator = false;
          state.value.address.unpacking = false;
          state.value.address.retailChains = false;
          state.value.address.fixedDateTime = false;
          state.value.address.fixedTime = "";
        }
        console.log("DeliveryPointForm: Очищено состояние для режима", newDeliveryMode);
      }
      setTimeout(() => {
        isUpdatingFromParent = false;
      }, 0);
    }, { deep: true });
    onMounted(() => {
      initializeState();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$3, [
        createBaseVNode("h2", _hoisted_2$3, toDisplayString(__props.title), 1),
        !hasTerminals.value && __props.namePrefix === "destination" ? (openBlock(), createElementBlock("div", _hoisted_3$2, " ЕСЛИ ПОЛУЧИТЬ НА ТЕРМИНАЛЕ - НЕДОСТУПНО ")) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_4$2, [
          hasTerminals.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => deliveryMode.value = "terminal", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", deliveryMode.value === "terminal" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, toDisplayString(__props.terminalLabel), 3)) : createCommentVNode("", true),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => deliveryMode.value = "address", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", deliveryMode.value === "address" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, toDisplayString(__props.addressLabel), 3)
        ]),
        createBaseVNode("div", _hoisted_5$2, [
          deliveryMode.value === "terminal" && hasTerminals.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", _hoisted_6$2, [
              createVNode(AutocompleteInput, {
                ref_key: "terminalInputRef",
                ref: terminalInputRef,
                name: `${__props.namePrefix}_terminal_address`,
                label: "Адрес терминала",
                items: terminalOptions.value,
                disabled: !__props.city,
                placeholder: __props.city ? "Выберите терминал" : "Сначала выберите город",
                modelValue: location.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => location.value = $event),
                emitFullItem: true,
                onItemSelected: onTerminalSelected,
                showResetButton: true,
                onReset: onTerminalReset,
                itemFormatter: unref(formatPVZName),
                selectedValueFormatter: unref(formatPVZName)
              }, null, 8, ["name", "items", "disabled", "placeholder", "modelValue", "itemFormatter", "selectedValueFormatter"])
            ]),
            __props.namePrefix === "departure" ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
              _cache[17] || (_cache[17] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, " Дата сдачи груза ", -1)),
              createVNode(DatePickerVue, {
                name: `${__props.namePrefix}_date`,
                "initial-date": date.value,
                disabled: !__props.city,
                placeholder: "Выберите дату",
                "onUpdate:date": onDateChange
              }, null, 8, ["name", "initial-date", "disabled"])
            ])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          deliveryMode.value === "address" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !hasAvailableStreets.value && !hasCityWideCoverage.value ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
              createBaseVNode("div", _hoisted_9$2, [
                _cache[18] || (_cache[18] = createBaseVNode("p", { class: "text-sm text-yellow-800 mb-4" }, " Для выбранного города нет доступных улиц в системе. Заполните форму ниже, и наш менеджер свяжется с вами для уточнения деталей. ", -1)),
                createVNode(ManagerRequestForm, {
                  compact: true,
                  "show-street-field": true,
                  "prefill-region": currentRegion.value,
                  "prefill-locality": currentCityName.value,
                  "prefill-street": state.value.address.street,
                  regions: availableRegions.value,
                  localities: availableCities.value,
                  onSubmit: handleStreetRequestSubmit
                }, null, 8, ["prefill-region", "prefill-locality", "prefill-street", "regions", "localities"])
              ])
            ])) : createCommentVNode("", true),
            hasAvailableStreets.value || hasCityWideCoverage.value ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
              hasAvailableStreets.value ? (openBlock(), createBlock(AutocompleteInput, {
                key: 0,
                ref_key: "streetInputRef",
                ref: streetInputRef,
                name: `${__props.namePrefix}_street`,
                label: "Улица",
                placeholder: "Укажите улицу",
                disabled: !__props.city,
                modelValue: state.value.address.street,
                "onUpdate:modelValue": [
                  _cache[3] || (_cache[3] = ($event) => state.value.address.street = $event),
                  onStreetInputChange
                ],
                items: streetOptions.value,
                useApiSearch: true,
                apiSearchFunction: searchStreetsFunction.value,
                emitFullItem: true,
                itemFormatter: formatStreetName,
                selectedValueFormatter: formatStreetSelected,
                onItemSelected: onStreetSelected,
                showResetButton: true,
                onReset: onStreetReset
              }, null, 8, ["name", "disabled", "modelValue", "items", "apiSearchFunction"])) : hasCityWideCoverage.value ? (openBlock(), createBlock(TextInput, {
                key: 1,
                name: `${__props.namePrefix}_street`,
                label: "Улица",
                placeholder: "Укажите улицу",
                disabled: !__props.city,
                modelValue: state.value.address.street,
                "onUpdate:modelValue": [
                  _cache[4] || (_cache[4] = ($event) => state.value.address.street = $event),
                  onStreetInputChange
                ]
              }, null, 8, ["name", "disabled", "modelValue"])) : createCommentVNode("", true),
              streetNotFound.value && state.value.address.street && state.value.address.street.trim() && !hasCityWideCoverage.value ? (openBlock(), createElementBlock("div", _hoisted_11$2, [
                createBaseVNode("div", _hoisted_12$2, [
                  _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-sm text-yellow-800 mb-4" }, " Введенная улица не найдена в системе. Заполните форму ниже, и наш менеджер свяжется с вами для уточнения деталей. ", -1)),
                  createVNode(ManagerRequestForm, {
                    compact: true,
                    "show-street-field": true,
                    "prefill-region": currentRegion.value,
                    "prefill-locality": currentCityName.value,
                    "prefill-street": state.value.address.street,
                    regions: availableRegions.value,
                    localities: availableCities.value,
                    onSubmit: handleStreetRequestSubmit
                  }, null, 8, ["prefill-region", "prefill-locality", "prefill-street", "regions", "localities"])
                ])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_13$2, [
              createBaseVNode("div", null, [
                createVNode(AutocompleteInput, {
                  ref_key: "houseInputRef",
                  ref: houseInputRef,
                  name: `${__props.namePrefix}_house`,
                  label: "Дом",
                  placeholder: "Дом",
                  disabled: !__props.city || !state.value.address.street,
                  modelValue: state.value.address.house,
                  "onUpdate:modelValue": [
                    _cache[5] || (_cache[5] = ($event) => state.value.address.house = $event),
                    onHouseInputChange
                  ],
                  items: houseOptions.value,
                  useApiSearch: true,
                  apiSearchFunction: searchHousesFunction.value,
                  emitFullItem: true,
                  itemFormatter: formatHouseName,
                  selectedValueFormatter: formatHouseSelected,
                  onItemSelected: onHouseSelected,
                  showResetButton: true,
                  onReset: onHouseReset
                }, null, 8, ["name", "disabled", "modelValue", "items", "apiSearchFunction"])
              ]),
              createBaseVNode("div", null, [
                createVNode(TextInput, {
                  name: `${__props.namePrefix}_building`,
                  label: "Строение",
                  placeholder: "Строение",
                  disabled: !__props.city || !state.value.address.house,
                  modelValue: state.value.address.building,
                  "onUpdate:modelValue": [
                    _cache[6] || (_cache[6] = ($event) => state.value.address.building = $event),
                    onAddressFieldChange
                  ]
                }, null, 8, ["name", "disabled", "modelValue"])
              ]),
              createBaseVNode("div", null, [
                createVNode(TextInput, {
                  name: `${__props.namePrefix}_office`,
                  label: "Офис/кв.",
                  placeholder: "Офис/кв.",
                  disabled: !__props.city || !state.value.address.house,
                  modelValue: state.value.address.office,
                  "onUpdate:modelValue": [
                    _cache[7] || (_cache[7] = ($event) => state.value.address.office = $event),
                    onAddressFieldChange
                  ]
                }, null, 8, ["name", "disabled", "modelValue"])
              ])
            ]),
            createBaseVNode("div", _hoisted_14$1, [
              createVNode(TextareaInput, {
                name: `${__props.namePrefix}_notes`,
                label: "Примечания к адресу",
                placeholder: "Укажите примечания",
                disabled: !__props.city,
                modelValue: state.value.address.notes,
                "onUpdate:modelValue": [
                  _cache[8] || (_cache[8] = ($event) => state.value.address.notes = $event),
                  onAddressFieldChange
                ]
              }, null, 8, ["name", "disabled", "modelValue"])
            ]),
            createBaseVNode("div", _hoisted_15$1, [
              _cache[20] || (_cache[20] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, " Дата сдачи груза ", -1)),
              createVNode(DatePickerVue, {
                name: `${__props.namePrefix}_date`,
                "initial-date": date.value,
                disabled: !__props.city,
                placeholder: "Выберите дату",
                "onUpdate:date": onDateChange
              }, null, 8, ["name", "initial-date", "disabled"])
            ]),
            !state.value.address.fixedDateTime ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
              createVNode(SelectInput, {
                name: `${__props.namePrefix}_interval`,
                label: "Интервал",
                options: intervalOptions,
                disabled: !__props.city,
                modelValue: state.value.address.interval,
                "onUpdate:modelValue": [
                  _cache[9] || (_cache[9] = ($event) => state.value.address.interval = $event),
                  onAddressFieldChange
                ]
              }, null, 8, ["name", "disabled", "modelValue"])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_17$1, [
              createVNode(CheckboxInput, {
                name: `${__props.namePrefix}_fixed_datetime`,
                label: "Фиксированная дата и время",
                modelValue: state.value.address.fixedDateTime,
                "onUpdate:modelValue": [
                  _cache[10] || (_cache[10] = ($event) => state.value.address.fixedDateTime = $event),
                  onAddressFieldChange
                ]
              }, null, 8, ["name", "modelValue"]),
              _cache[21] || (_cache[21] = createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "При выборе этой опции доставка будет выполнена строго в указанную дату и время. Дополнительная плата может быть применена за фиксированное время доставки."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ], -1))
            ]),
            state.value.address.fixedDateTime ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
              createVNode(SelectInput, {
                name: `${__props.namePrefix}_fixed_time`,
                label: __props.namePrefix === "departure" ? "Время забора" : "Время доставки",
                options: timeOptions,
                disabled: !__props.city,
                modelValue: state.value.address.fixedTime,
                "onUpdate:modelValue": [
                  _cache[11] || (_cache[11] = ($event) => state.value.address.fixedTime = $event),
                  onAddressFieldChange
                ]
              }, null, 8, ["name", "label", "disabled", "modelValue"])
            ])) : createCommentVNode("", true),
            __props.namePrefix === "destination" ? (openBlock(), createElementBlock("div", _hoisted_19$1, [
              createVNode(CheckboxInput, {
                name: `${__props.namePrefix}_retail_chains`,
                label: "Доставка в торговые сети",
                modelValue: state.value.address.retailChains,
                "onUpdate:modelValue": [
                  _cache[12] || (_cache[12] = ($event) => state.value.address.retailChains = $event),
                  onAddressFieldChange
                ]
              }, null, 8, ["name", "modelValue"])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_20$1, [
              createVNode(CheckboxInput, {
                name: `${__props.namePrefix}_loading_unloading`,
                label: "Погрузо-разгрузочные работы",
                modelValue: state.value.address.loadingUnloading,
                "onUpdate:modelValue": [
                  _cache[13] || (_cache[13] = ($event) => state.value.address.loadingUnloading = $event),
                  onAddressFieldChange
                ]
              }, null, 8, ["name", "modelValue"]),
              state.value.address.loadingUnloading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createVNode(TextInput, {
                  name: `${__props.namePrefix}_floor`,
                  label: "Этаж",
                  placeholder: "Укажите этаж",
                  disabled: !__props.city,
                  modelValue: state.value.address.floor,
                  "onUpdate:modelValue": [
                    _cache[14] || (_cache[14] = ($event) => state.value.address.floor = $event),
                    onAddressFieldChange
                  ]
                }, null, 8, ["name", "disabled", "modelValue"]),
                createVNode(CheckboxInput, {
                  name: `${__props.namePrefix}_no_elevator`,
                  label: "Нет лифта",
                  modelValue: state.value.address.noElevator,
                  "onUpdate:modelValue": [
                    _cache[15] || (_cache[15] = ($event) => state.value.address.noElevator = $event),
                    onAddressFieldChange
                  ]
                }, null, 8, ["name", "modelValue"]),
                __props.namePrefix === "destination" ? (openBlock(), createBlock(CheckboxInput, {
                  key: 0,
                  name: `${__props.namePrefix}_unpacking`,
                  label: "Разбор упаковки",
                  modelValue: state.value.address.unpacking,
                  "onUpdate:modelValue": [
                    _cache[16] || (_cache[16] = ($event) => state.value.address.unpacking = $event),
                    onAddressFieldChange
                  ]
                }, null, 8, ["name", "modelValue"])) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true)
            ])
          ], 64)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const _hoisted_1$2 = { class: "card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$2 = { class: "flex flex-col gap-4" };
const _sfc_main$2 = {
  __name: "ExtraOptionsForm",
  props: {
    modelValue: { type: Object, required: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let isUpdatingFromParent = false;
    const requiresAccompanyingDocs = ref(props.modelValue.requiresAccompanyingDocs || false);
    const returnDocsToSender = ref(props.modelValue.returnDocsToSender || false);
    watch([requiresAccompanyingDocs, returnDocsToSender], () => {
      if (isUpdatingFromParent) return;
      emit("update:modelValue", {
        requiresAccompanyingDocs: requiresAccompanyingDocs.value,
        returnDocsToSender: returnDocsToSender.value
      });
    });
    watch(() => props.modelValue, (newValue) => {
      if (isUpdatingFromParent) return;
      isUpdatingFromParent = true;
      requiresAccompanyingDocs.value = newValue.requiresAccompanyingDocs || false;
      returnDocsToSender.value = newValue.returnDocsToSender || false;
      setTimeout(() => {
        isUpdatingFromParent = false;
      }, 0);
    }, { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Дополнительные опции", -1)),
        createBaseVNode("div", _hoisted_2$2, [
          createVNode(CheckboxInput, {
            name: "requires_accompanying_docs",
            label: "Требуется перевозка сопроводительных документов",
            modelValue: requiresAccompanyingDocs.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => requiresAccompanyingDocs.value = $event)
          }, null, 8, ["modelValue"]),
          createVNode(CheckboxInput, {
            name: "return_docs_to_sender",
            label: "Возврат документов отправителю",
            modelValue: returnDocsToSender.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => returnDocsToSender.value = $event)
          }, null, 8, ["modelValue"])
        ])
      ]);
    };
  }
};
function tryOnScopeDispose(fn, failSilently) {
  if (getCurrentScope()) {
    onScopeDispose(fn, failSilently);
    return true;
  }
  return false;
}
const localProvidedStateMap = /* @__PURE__ */ new WeakMap();
const injectLocal = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  var _getCurrentInstance;
  const key = args[0];
  const instance = (_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
  const owner = instance !== null && instance !== void 0 ? instance : getCurrentScope();
  if (owner == null && !hasInjectionContext()) throw new Error("injectLocal must be called in setup");
  if (owner && localProvidedStateMap.has(owner) && key in localProvidedStateMap.get(owner)) return localProvidedStateMap.get(owner)[key];
  return inject(...args);
};
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const notNullish = (val) => val != null;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), {
        fn,
        thisArg: this,
        args
      })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer$1) => {
    clearTimeout(timer$1);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke$1) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer) _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = void 0;
      }
      return Promise.resolve(invoke$1());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke$1;
      if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
        if (timer) _clearTimeout(timer);
        maxTimer = void 0;
        resolve(lastInvoker());
      }, maxDuration);
      timer = setTimeout(() => {
        if (maxTimer) _clearTimeout(maxTimer);
        maxTimer = void 0;
        resolve(invoke$1());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(...args) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  let ms;
  let trailing;
  let leading;
  let rejectOnCancel;
  if (!isRef(args[0]) && typeof args[0] === "object") ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
  else [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke$1 = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke$1();
    }
    if (elapsed > duration) {
      lastExec = Date.now();
      if (leading || !isLeading) invoke$1();
    } else if (trailing) lastValue = new Promise((resolve, reject) => {
      lastRejector = rejectOnCancel ? reject : resolve;
      timer = setTimeout(() => {
        lastExec = Date.now();
        isLeading = true;
        resolve(invoke$1());
        clear();
      }, Math.max(0, duration - elapsed));
    });
    if (!leading && !timer) timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function pxValue(px) {
  return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
// @__NO_SIDE_EFFECTS__
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
// @__NO_SIDE_EFFECTS__
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function tryOnMounted(fn, sync = true, target) {
  if (getLifeCycleTarget()) onMounted(fn, target);
  else if (sync) fn();
  else nextTick(fn);
}
function watchImmediate(source, cb, options) {
  return watch(source, cb, {
    ...options,
    immediate: true
  });
}
const defaultWindow = isClient ? window : void 0;
function unrefElement(elRef) {
  var _$el;
  const plain = toValue(elRef);
  return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(() => {
    var _firstParamTargets$va, _firstParamTargets$va2;
    return [
      (_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
      toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
      toArray(unref(firstParamTargets.value ? args[2] : args[1])),
      toValue(firstParamTargets.value ? args[3] : args[2])
    ];
  }, ([raw_targets, raw_events, raw_listeners, raw_options]) => {
    cleanup();
    if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
    const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
    cleanups.push(...raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone)))));
  }, { flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
// @__NO_SIDE_EFFECTS__
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) onMounted(() => {
    isMounted.value = true;
  }, instance);
  return isMounted;
}
// @__NO_SIDE_EFFECTS__
function useSupported(callback) {
  const isMounted = /* @__PURE__ */ useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window$1 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = /* @__PURE__ */ useSupported(() => window$1 && "MutationObserver" in window$1);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(computed(() => {
    const items = toArray(toValue(target)).map(unrefElement).filter(notNullish);
    return new Set(items);
  }), (newTargets) => {
    cleanup();
    if (isSupported.value && newTargets.size) {
      observer = new MutationObserver(callback);
      newTargets.forEach((el) => observer.observe(el, mutationOptions));
    }
  }, {
    immediate: true,
    flush: "post"
  });
  const takeRecords = () => {
    return observer === null || observer === void 0 ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}
const ssrWidthSymbol = Symbol("vueuse-ssr-width");
// @__NO_SIDE_EFFECTS__
function useSSRWidth() {
  const ssrWidth = hasInjectionContext() ? /* @__PURE__ */ injectLocal(ssrWidthSymbol, null) : null;
  return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
function useMediaQuery(query, options = {}) {
  const { window: window$1 = defaultWindow, ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
  const isSupported = /* @__PURE__ */ useSupported(() => window$1 && "matchMedia" in window$1 && typeof window$1.matchMedia === "function");
  const ssrSupport = shallowRef(typeof ssrWidth === "number");
  const mediaQuery = shallowRef();
  const matches = shallowRef(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  watchEffect(() => {
    if (ssrSupport.value) {
      ssrSupport.value = !isSupported.value;
      matches.value = toValue(query).split(",").some((queryString) => {
        const not = queryString.includes("not all");
        const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let res = Boolean(minWidth || maxWidth);
        if (minWidth && res) res = ssrWidth >= pxValue(minWidth[1]);
        if (maxWidth && res) res = ssrWidth <= pxValue(maxWidth[1]);
        return not ? !res : res;
      });
      return;
    }
    if (!isSupported.value) return;
    mediaQuery.value = window$1.matchMedia(toValue(query));
    matches.value = mediaQuery.value.matches;
  });
  useEventListener(mediaQuery, "change", handler, { passive: true });
  return computed(() => matches.value);
}
const ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(element, options = {}) {
  const { throttle = 0, idle = 200, onStop = noop, onScroll = noop, offset = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }, observe: _observe = { mutation: false }, eventListenerOptions = {
    capture: false,
    passive: true
  }, behavior = "auto", window: window$1 = defaultWindow, onError = (e) => {
    console.error(e);
  } } = options;
  const observe = typeof _observe === "boolean" ? { mutation: _observe } : _observe;
  const internalX = shallowRef(0);
  const internalY = shallowRef(0);
  const x = computed({
    get() {
      return internalX.value;
    },
    set(x$1) {
      scrollTo(x$1, void 0);
    }
  });
  const y = computed({
    get() {
      return internalY.value;
    },
    set(y$1) {
      scrollTo(void 0, y$1);
    }
  });
  function scrollTo(_x, _y) {
    var _ref, _toValue, _toValue2, _document;
    if (!window$1) return;
    const _element = toValue(element);
    if (!_element) return;
    (_ref = _element instanceof Document ? window$1.document.body : _element) === null || _ref === void 0 || _ref.scrollTo({
      top: (_toValue = toValue(_y)) !== null && _toValue !== void 0 ? _toValue : y.value,
      left: (_toValue2 = toValue(_x)) !== null && _toValue2 !== void 0 ? _toValue2 : x.value,
      behavior: toValue(behavior)
    });
    const scrollContainer = (_element === null || _element === void 0 || (_document = _element.document) === null || _document === void 0 ? void 0 : _document.documentElement) || (_element === null || _element === void 0 ? void 0 : _element.documentElement) || _element;
    if (x != null) internalX.value = scrollContainer.scrollLeft;
    if (y != null) internalY.value = scrollContainer.scrollTop;
  }
  const isScrolling = shallowRef(false);
  const arrivedState = reactive({
    left: true,
    right: false,
    top: true,
    bottom: false
  });
  const directions = reactive({
    left: false,
    right: false,
    top: false,
    bottom: false
  });
  const onScrollEnd = (e) => {
    if (!isScrolling.value) return;
    isScrolling.value = false;
    directions.left = false;
    directions.right = false;
    directions.top = false;
    directions.bottom = false;
    onStop(e);
  };
  const onScrollEndDebounced = /* @__PURE__ */ useDebounceFn(onScrollEnd, throttle + idle);
  const setArrivedState = (target) => {
    var _document2;
    if (!window$1) return;
    const el = (target === null || target === void 0 || (_document2 = target.document) === null || _document2 === void 0 ? void 0 : _document2.documentElement) || (target === null || target === void 0 ? void 0 : target.documentElement) || unrefElement(target);
    const { display, flexDirection, direction } = getComputedStyle(el);
    const directionMultipler = direction === "rtl" ? -1 : 1;
    const scrollLeft = el.scrollLeft;
    directions.left = scrollLeft < internalX.value;
    directions.right = scrollLeft > internalX.value;
    const left = Math.abs(scrollLeft * directionMultipler) <= (offset.left || 0);
    const right = Math.abs(scrollLeft * directionMultipler) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "row-reverse") {
      arrivedState.left = right;
      arrivedState.right = left;
    } else {
      arrivedState.left = left;
      arrivedState.right = right;
    }
    internalX.value = scrollLeft;
    let scrollTop = el.scrollTop;
    if (target === window$1.document && !scrollTop) scrollTop = window$1.document.body.scrollTop;
    directions.top = scrollTop < internalY.value;
    directions.bottom = scrollTop > internalY.value;
    const top = Math.abs(scrollTop) <= (offset.top || 0);
    const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "column-reverse") {
      arrivedState.top = bottom;
      arrivedState.bottom = top;
    } else {
      arrivedState.top = top;
      arrivedState.bottom = bottom;
    }
    internalY.value = scrollTop;
  };
  const onScrollHandler = (e) => {
    var _documentElement;
    if (!window$1) return;
    setArrivedState((_documentElement = e.target.documentElement) !== null && _documentElement !== void 0 ? _documentElement : e.target);
    isScrolling.value = true;
    onScrollEndDebounced(e);
    onScroll(e);
  };
  useEventListener(element, "scroll", throttle ? /* @__PURE__ */ useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler, eventListenerOptions);
  tryOnMounted(() => {
    try {
      const _element = toValue(element);
      if (!_element) return;
      setArrivedState(_element);
    } catch (e) {
      onError(e);
    }
  });
  if ((observe === null || observe === void 0 ? void 0 : observe.mutation) && element != null && element !== window$1 && element !== document) useMutationObserver(element, () => {
    const _element = toValue(element);
    if (!_element) return;
    setArrivedState(_element);
  }, {
    attributes: true,
    childList: true,
    subtree: true
  });
  useEventListener(element, "scrollend", onScrollEnd, eventListenerOptions);
  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    measure() {
      const _element = toValue(element);
      if (window$1 && _element) setArrivedState(_element);
    }
  };
}
function useWindowScroll(options = {}) {
  const { window: window$1 = defaultWindow, ...rest } = options;
  return useScroll(window$1, rest);
}
// @__NO_SIDE_EFFECTS__
function useWindowSize(options = {}) {
  const { window: window$1 = defaultWindow, initialWidth = Number.POSITIVE_INFINITY, initialHeight = Number.POSITIVE_INFINITY, listenOrientation = true, includeScrollbar = true, type = "inner" } = options;
  const width = shallowRef(initialWidth);
  const height = shallowRef(initialHeight);
  const update = () => {
    if (window$1) if (type === "outer") {
      width.value = window$1.outerWidth;
      height.value = window$1.outerHeight;
    } else if (type === "visual" && window$1.visualViewport) {
      const { width: visualViewportWidth, height: visualViewportHeight, scale } = window$1.visualViewport;
      width.value = Math.round(visualViewportWidth * scale);
      height.value = Math.round(visualViewportHeight * scale);
    } else if (includeScrollbar) {
      width.value = window$1.innerWidth;
      height.value = window$1.innerHeight;
    } else {
      width.value = window$1.document.documentElement.clientWidth;
      height.value = window$1.document.documentElement.clientHeight;
    }
  };
  update();
  tryOnMounted(update);
  const listenerOptions = { passive: true };
  useEventListener("resize", update, listenerOptions);
  if (window$1 && type === "visual" && window$1.visualViewport) useEventListener(window$1.visualViewport, "resize", update, listenerOptions);
  if (listenOrientation) watch(useMediaQuery("(orientation: portrait)"), () => update());
  return {
    width,
    height
  };
}
function useSticky(options = {}) {
  const { top = 16, minWidth = 1024 } = options;
  const elementRef = ref(null);
  const isSticky = ref(false);
  const { y: scrollY } = useWindowScroll();
  const { width: windowWidth } = /* @__PURE__ */ useWindowSize();
  const isLargeScreen = computed(() => windowWidth.value >= minWidth);
  const stickyStyle = computed(() => {
    if (!isSticky.value || !elementRef.value) return {};
    const rect = elementRef.value.getBoundingClientRect();
    return {
      position: "fixed",
      top: `${top}px`,
      width: `${rect.width}px`,
      zIndex: 10
    };
  });
  let initialTop = null;
  let parentElement = null;
  function updateSticky() {
    if (!elementRef.value || !isLargeScreen.value) {
      isSticky.value = false;
      return;
    }
    const rect = elementRef.value.getBoundingClientRect();
    const scrollTop = scrollY.value;
    if (!parentElement) {
      parentElement = elementRef.value.parentElement;
      while (parentElement && parentElement !== document.body) {
        if (parentElement.classList.contains("bg-brand-light")) {
          break;
        }
        const parentStyle = getComputedStyle(parentElement);
        if (parentStyle.overflow !== "visible" && parentStyle.overflow !== "") {
          break;
        }
        parentElement = parentElement.parentElement;
      }
      if (!parentElement || parentElement === document.body) {
        parentElement = elementRef.value.parentElement;
      }
    }
    const parentRect = parentElement.getBoundingClientRect();
    const elementHeight = rect.height;
    if (initialTop === null && !isSticky.value) {
      initialTop = rect.top + scrollTop;
      parentRect.top + scrollTop;
    }
    const elementTopRelativeToViewport = rect.top;
    const parentTopRelativeToViewport = parentRect.top;
    const parentBottomRelativeToViewport = parentRect.bottom;
    const stickyStart = initialTop - top;
    const shouldStartSticky = scrollTop >= stickyStart && elementTopRelativeToViewport <= top;
    const elementBottomInStickyMode = top + elementHeight;
    const shouldStopAtBottom = elementBottomInStickyMode >= parentBottomRelativeToViewport;
    const shouldStopAtTop = parentTopRelativeToViewport > top;
    const finalSticky = shouldStartSticky && !shouldStopAtBottom && !shouldStopAtTop;
    if (finalSticky !== isSticky.value) {
      isSticky.value = finalSticky;
      if (!finalSticky) {
        initialTop = null;
      }
    }
  }
  let rafId = null;
  function handleScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      updateSticky();
      rafId = null;
    });
  }
  onMounted(() => {
    if (elementRef.value) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", updateSticky, { passive: true });
      setTimeout(updateSticky, 100);
    }
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", updateSticky);
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  });
  watch(scrollY, () => {
    handleScroll();
  });
  return {
    elementRef,
    isSticky,
    stickyStyle
  };
}
const _hoisted_1$1 = {
  key: 0,
  class: "text-gray-500"
};
const _hoisted_2$1 = {
  key: 0,
  class: "font-medium text-gray-700 mb-2"
};
const _hoisted_3$1 = { key: 1 };
const _hoisted_4$1 = {
  key: 2,
  class: "mt-3 text-sm text-gray-400"
};
const _hoisted_5$1 = { key: 1 };
const _hoisted_6$1 = { class: "mb-4" };
const _hoisted_7$1 = { class: "flex items-center justify-between mb-4" };
const _hoisted_8$1 = { class: "text-left" };
const _hoisted_9$1 = { class: "font-semibold text-base leading-1 mb-2" };
const _hoisted_10$1 = { class: "text-xs text-gray-500 leading-1" };
const _hoisted_11$1 = { class: "text-right" };
const _hoisted_12$1 = { class: "font-semibold text-base leading-1 mb-2" };
const _hoisted_13$1 = { class: "text-xs text-gray-500 leading-1" };
const _hoisted_14 = { class: "grid grid-cols-3 gap-4 text-center" };
const _hoisted_15 = { class: "text-2xl font-bold text-gray-800 leading-1 mb-2" };
const _hoisted_16 = { class: "text-xs text-gray-600 leading-1" };
const _hoisted_17 = { class: "text-2xl font-bold text-gray-800 leading-1 mb-2" };
const _hoisted_18 = { class: "text-2xl font-bold text-gray-800 leading-1 mb-2" };
const _hoisted_19 = {
  key: 0,
  class: "mt-2 text-center"
};
const _hoisted_20 = { class: "text-lg font-bold text-gray-900" };
const _hoisted_21 = {
  key: 0,
  class: "space-y-4 mb-6"
};
const _hoisted_22 = ["onClick"];
const _hoisted_23 = { class: "flex justify-between items-start mb-2 relative" };
const _hoisted_24 = { class: "flex-1" };
const _hoisted_25 = { class: "font-semibold text-gray-800 flex items-center gap-2" };
const _hoisted_26 = {
  key: 0,
  class: "absolute top-0 right-0 left-auto -translate-y-7 translate-x-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
};
const _hoisted_27 = { class: "text-sm text-gray-600 mb-1" };
const _hoisted_28 = { class: "text-xs text-gray-500 mb-1" };
const _hoisted_29 = { key: 0 };
const _hoisted_30 = { key: 1 };
const _hoisted_31 = {
  key: 0,
  class: "text-xs text-red-500 mb-1 font-medium"
};
const _hoisted_32 = { class: "text-right" };
const _hoisted_33 = {
  key: 0,
  class: "text-xl font-bold text-gray-800"
};
const _hoisted_34 = {
  key: 1,
  class: "text-xl font-bold text-gray-400"
};
const _hoisted_35 = {
  key: 0,
  class: "mt-3 pt-3 border-t border-gray-200"
};
const _hoisted_36 = ["onClick"];
const _hoisted_37 = {
  key: 0,
  class: "mt-3 space-y-1 text-sm animate-fade-in"
};
const _hoisted_38 = { key: 0 };
const _hoisted_39 = {
  key: 0,
  class: "border-t pt-2 mt-2"
};
const _hoisted_40 = { class: "flex justify-between" };
const _hoisted_41 = { class: "font-medium" };
const _hoisted_42 = {
  key: 0,
  class: "flex justify-between"
};
const _hoisted_43 = { class: "font-medium" };
const _hoisted_44 = {
  key: 1,
  class: "border-t pt-4"
};
const _hoisted_45 = {
  key: 0,
  class: "text-sm space-y-1 mb-3"
};
const _hoisted_46 = {
  key: 0,
  class: "flex justify-between text-gray-600"
};
const _hoisted_47 = {
  key: 1,
  class: "flex justify-between text-gray-600"
};
const _hoisted_48 = {
  key: 2,
  class: "flex justify-between text-gray-600"
};
const _hoisted_49 = {
  key: 3,
  class: "flex justify-between text-gray-600"
};
const _hoisted_50 = {
  key: 4,
  class: "flex justify-between text-gray-600 border-t pt-1"
};
const _hoisted_51 = {
  key: 5,
  class: "flex justify-between text-gray-600"
};
const _hoisted_52 = { class: "flex justify-between items-center font-bold text-lg border-t pt-3" };
const _hoisted_53 = { class: "text-xl" };
const _sfc_main$1 = {
  __name: "CalculationResult",
  props: {
    result: {
      type: Object,
      default: null
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    calculatorConfig: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["print", "selectTariff"],
  setup(__props) {
    const { elementRef: stickyRef, stickyStyle } = useSticky({ top: 16 });
    const props = __props;
    const expandedTariffs = ref([]);
    function toggleTariffDetails(tariffUid) {
      if (expandedTariffs.value.includes(tariffUid)) {
        expandedTariffs.value = expandedTariffs.value.filter((uid) => uid !== tariffUid);
      } else {
        expandedTariffs.value.push(tariffUid);
      }
    }
    const routeInfo = computed(() => {
      var _a, _b;
      if (!props.formData.direction) {
        return { from: "", to: "", fromDetails: "", toDetails: "" };
      }
      return {
        from: props.formData.direction.from || "",
        to: props.formData.direction.to || "",
        fromDetails: ((_a = props.formData.departure) == null ? void 0 : _a.deliveryMode) === "terminal" ? "От терминала" : "От адреса",
        toDetails: ((_b = props.formData.destination) == null ? void 0 : _b.deliveryMode) === "terminal" ? "До терминала" : "До адреса"
      };
    });
    const cargoInfo = computed(() => {
      if (props.result && props.result.selectedTariff && props.result.selectedTariff.packageDetails && props.result.selectedTariff.packageDetails.length > 0) {
        const details = props.result.selectedTariff.packageDetails;
        const totalCount2 = details.reduce((sum, pkg) => sum + (pkg.quantity || 1), 0);
        const totalWeight2 = details.reduce((sum, pkg) => sum + (pkg.totalWeight || 0), 0);
        const totalVolume2 = details.reduce((sum, pkg) => sum + (pkg.totalVolume || 0), 0);
        const countLabel2 = totalCount2 === 1 ? "место" : "мест";
        return {
          count: formatNumber(totalCount2),
          countLabel: countLabel2,
          weight: formatWeight(totalWeight2),
          volume: formatVolume(totalVolume2)
        };
      }
      if (!props.formData.cargo || !props.formData.cargo.packages || props.formData.cargo.packages.length === 0) {
        return {
          count: "0",
          countLabel: "мест",
          weight: "0.00",
          volume: "0.000"
        };
      }
      const { cargo } = props.formData;
      let totalWeight = 0;
      let totalVolume = 0;
      let totalCount = 0;
      let countLabel = "мест";
      const processedPackages = cargo.packages.map((pkg) => ({
        ...pkg,
        weight: parseFloat(pkg.weight) || 0,
        length: parseFloat(pkg.length) || 0,
        width: parseFloat(pkg.width) || 0,
        height: parseFloat(pkg.height) || 0,
        quantity: parseInt(pkg.quantity) || 1
      }));
      if (cargo.mode === "individual") {
        totalCount = processedPackages.reduce((sum, pkg) => sum + (pkg.quantity || 1), 0);
        countLabel = totalCount === 1 ? "место" : "мест";
        totalWeight = processedPackages.reduce((sum, pkg) => sum + pkg.weight * pkg.quantity, 0);
        totalVolume = processedPackages.reduce((sum, pkg) => sum + pkg.length * pkg.width * pkg.height / 1e6 * pkg.quantity, 0);
      } else {
        const totalPackage = processedPackages[0];
        if (totalPackage) {
          totalCount = totalPackage.quantity;
          countLabel = totalPackage.quantity === 1 ? "место" : "мест";
          totalWeight = totalPackage.weight * totalPackage.quantity;
          totalVolume = totalPackage.length * totalPackage.width * totalPackage.height / 1e6 * totalPackage.quantity;
        }
      }
      return {
        count: formatNumber(totalCount),
        countLabel,
        weight: formatWeight(totalWeight),
        volume: formatVolume(totalVolume)
      };
    });
    function formatCurrency(value) {
      if (typeof value !== "number") {
        return "0,00 ₽";
      }
      return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 2 }).format(value);
    }
    function formatNumber(value) {
      if (typeof value !== "number") {
        return "0";
      }
      return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value);
    }
    function formatWeight(value) {
      if (typeof value !== "number") {
        return "0";
      }
      return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    }
    function formatVolume(value) {
      if (typeof value !== "number") {
        return "0";
      }
      return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(value);
    }
    computed(() => {
      if (!props.result || !props.result.selectedTariff || !props.result.selectedTariff.details) {
        return [];
      }
      const details = props.result.selectedTariff.details;
      const categories = {
        "Базовый": { category: "Базовый тариф", items: [] },
        "Расстояние": { category: "Расстояние", items: [] },
        "Наценка": { category: "Наценки и коэффициенты", items: [] },
        "Скидка": { category: "Скидки", items: [] },
        "Услуги": { category: "Дополнительные услуги", items: [] },
        "Упаковка": { category: "Упаковка", items: [] }
      };
      details.forEach((item) => {
        if (item.name.includes("По весу") || item.name.includes("По объему")) {
          categories["Базовый"].items.push(item);
        } else if (item.name.includes("Расстояние")) {
          categories["Расстояние"].items.push(item);
        } else if (item.name.includes("Наценка") || item.name.includes("опасный") || item.name.includes("температур") || item.name.includes("адрес")) {
          categories["Наценка"].items.push(item);
        } else if (item.cost < 0) {
          categories["Скидка"].items.push(item);
        } else if (item.name.includes("Коробка") || item.name.includes("Паллет") || item.name.includes("упаков")) {
          categories["Упаковка"].items.push(item);
        } else {
          categories["Услуги"].items.push(item);
        }
      });
      return Object.values(categories).filter((cat) => cat.items.length > 0);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", {
        ref_key: "stickyRef",
        ref: stickyRef,
        style: normalizeStyle(unref(stickyStyle)),
        class: "card"
      }, [
        _cache[18] || (_cache[18] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Стоимость перевозки", -1)),
        !__props.result || !__props.result.isValid ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          __props.result && __props.result.message ? (openBlock(), createElementBlock("p", _hoisted_2$1, toDisplayString(__props.result.message), 1)) : (openBlock(), createElementBlock("p", _hoisted_3$1, "Заполните все обязательные поля, чтобы увидеть стоимость перевозки.")),
          !__props.result || !__props.result.message ? (openBlock(), createElementBlock("div", _hoisted_4$1, _cache[1] || (_cache[1] = [
            createBaseVNode("p", null, "Необходимо указать:", -1),
            createBaseVNode("ul", { class: "list-disc list-inside mt-1 space-y-1" }, [
              createBaseVNode("li", null, "Города отправления и назначения"),
              createBaseVNode("li", null, "Параметры груза (размеры и вес)"),
              createBaseVNode("li", null, "Пункты отправки и получения"),
              createBaseVNode("li", null, "Дату отправки")
            ], -1)
          ]))) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock("div", _hoisted_5$1, [
          createBaseVNode("div", _hoisted_6$1, [
            createBaseVNode("div", _hoisted_7$1, [
              createBaseVNode("div", _hoisted_8$1, [
                createBaseVNode("div", _hoisted_9$1, toDisplayString(routeInfo.value.from), 1),
                createBaseVNode("div", _hoisted_10$1, toDisplayString(routeInfo.value.fromDetails), 1)
              ]),
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "mx-4 flex-1 flex items-center justify-center" }, [
                createBaseVNode("svg", {
                  class: "w-6 h-6 text-gray-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M13 7l5 5m0 0l-5 5m5-5H6"
                  })
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_11$1, [
                createBaseVNode("div", _hoisted_12$1, toDisplayString(routeInfo.value.to), 1),
                createBaseVNode("div", _hoisted_13$1, toDisplayString(routeInfo.value.toDetails), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_15, toDisplayString(cargoInfo.value.count), 1),
                createBaseVNode("div", _hoisted_16, toDisplayString(cargoInfo.value.countLabel), 1)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_17, toDisplayString(cargoInfo.value.weight), 1),
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-xs text-gray-600 leading-1" }, "кг (объемный вес)", -1))
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_18, toDisplayString(cargoInfo.value.volume), 1),
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-xs text-gray-600 leading-1" }, "куб.м", -1))
              ])
            ]),
            __props.result.distanceKm ? (openBlock(), createElementBlock("div", _hoisted_19, [
              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-base text-gray-700 font-medium" }, "Расстояние: ", -1)),
              createBaseVNode("span", _hoisted_20, toDisplayString(Math.round(__props.result.distanceKm)) + " км", 1)
            ])) : createCommentVNode("", true)
          ]),
          __props.result.allTariffs && __props.result.allTariffs.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_21, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.result.allTariffs, (tariff) => {
              var _a;
              return openBlock(), createElementBlock("div", {
                key: tariff.id,
                class: normalizeClass([
                  "border rounded-lg p-4 transition-all duration-200",
                  tariff.isAvailable ? "cursor-pointer hover:border-blue-300" : "opacity-60 cursor-not-allowed bg-gray-100",
                  tariff.id === ((_a = __props.result.selectedTariff) == null ? void 0 : _a.id) && tariff.isAvailable ? "border-brand-blue bg-blue-50" : "border-gray-200"
                ]),
                onClick: ($event) => tariff.isAvailable && _ctx.$emit("selectTariff", tariff.id)
              }, [
                createBaseVNode("div", _hoisted_23, [
                  createBaseVNode("div", _hoisted_24, [
                    createBaseVNode("h4", _hoisted_25, [
                      createTextVNode(toDisplayString(tariff.fullName) + " ", 1),
                      tariff.isAvailable && tariff.isRecommended ? (openBlock(), createElementBlock("span", _hoisted_26, " Экономия " + toDisplayString(Math.round(tariff.savings)) + " ₽. Рекомендуем! ", 1)) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("p", _hoisted_27, toDisplayString(tariff.description || tariff.name || "Доставка груза"), 1),
                    createBaseVNode("ul", _hoisted_28, [
                      tariff.transportationCoefficient ? (openBlock(), createElementBlock("li", _hoisted_29, "Коэффициент перевозки: " + toDisplayString(tariff.transportationCoefficient), 1)) : createCommentVNode("", true),
                      tariff.deliveryInfo ? (openBlock(), createElementBlock("li", _hoisted_30, "Время доставки: " + toDisplayString(tariff.deliveryInfo.description), 1)) : createCommentVNode("", true)
                    ]),
                    !tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_31, " Недоступно: " + toDisplayString(tariff.reason), 1)) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_32, [
                    tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_33, toDisplayString(tariff.cost ? Math.round(tariff.cost).toLocaleString() : "0") + " ₽", 1)) : (openBlock(), createElementBlock("div", _hoisted_34, "—"))
                  ])
                ]),
                tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_35, [
                  createBaseVNode("button", {
                    onClick: withModifiers(($event) => toggleTariffDetails(tariff.id), ["stop"]),
                    class: "text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  }, [
                    createBaseVNode("span", null, toDisplayString(expandedTariffs.value.includes(tariff.id) ? "Скрыть" : "Показать") + " детализацию", 1),
                    (openBlock(), createElementBlock("svg", {
                      class: normalizeClass(["w-4 h-4 transition-transform", expandedTariffs.value.includes(tariff.id) ? "rotate-180" : ""]),
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, _cache[6] || (_cache[6] = [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M19 9l-7 7-7-7"
                      }, null, -1)
                    ]), 2))
                  ], 8, _hoisted_36),
                  expandedTariffs.value.includes(tariff.id) && tariff.details ? (openBlock(), createElementBlock("div", _hoisted_37, [
                    _cache[9] || (_cache[9] = createBaseVNode("h5", { class: "font-medium text-gray-700 mb-2" }, "Детализация расчета:", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(tariff.details, (detail, index2) => {
                      return openBlock(), createElementBlock("div", {
                        key: `${tariff.id}-detail-${index2}-${detail.name}`,
                        class: normalizeClass([
                          "flex justify-between",
                          detail.isHeader ? "font-semibold text-gray-800 mt-3 mb-1" : "",
                          detail.isSubHeader ? "font-medium text-gray-700 mt-2" : "",
                          detail.isDetail ? "text-gray-500 text-xs pl-4" : "",
                          detail.isDetailCost ? "text-gray-600 text-xs pl-4" : "",
                          detail.cost < 0 ? "text-green-600" : ""
                        ])
                      }, [
                        createBaseVNode("span", null, toDisplayString(detail.name), 1),
                        !detail.isHeader && !detail.isSubHeader && !detail.isDetail && detail.cost !== 0 ? (openBlock(), createElementBlock("span", _hoisted_38, toDisplayString(detail.cost < 0 ? "" : "+") + toDisplayString(formatCurrency(detail.cost)), 1)) : createCommentVNode("", true)
                      ], 2);
                    }), 128)),
                    tariff.deliveryInfo ? (openBlock(), createElementBlock("div", _hoisted_39, [
                      createBaseVNode("div", _hoisted_40, [
                        _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-gray-600" }, "Время доставки:", -1)),
                        createBaseVNode("span", _hoisted_41, toDisplayString(tariff.deliveryInfo.days) + " дн.", 1)
                      ]),
                      __props.result.distanceKm ? (openBlock(), createElementBlock("div", _hoisted_42, [
                        _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-gray-600" }, "Расстояние:", -1)),
                        createBaseVNode("span", _hoisted_43, toDisplayString(Math.round(__props.result.distanceKm)) + " км", 1)
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ], 10, _hoisted_22);
            }), 128))
          ])) : createCommentVNode("", true),
          __props.result.selectedTariff ? (openBlock(), createElementBlock("div", _hoisted_44, [
            __props.result.selectedTariff.summary ? (openBlock(), createElementBlock("div", _hoisted_45, [
              __props.result.selectedTariff.summary.transportationCost ? (openBlock(), createElementBlock("div", _hoisted_46, [
                _cache[10] || (_cache[10] = createBaseVNode("span", null, "Стоимость перевозки:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.transportationCost)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.pickupCost > 0 ? (openBlock(), createElementBlock("div", _hoisted_47, [
                _cache[11] || (_cache[11] = createBaseVNode("span", null, "Стоимость забора:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.pickupCost)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.deliveryCost > 0 ? (openBlock(), createElementBlock("div", _hoisted_48, [
                _cache[12] || (_cache[12] = createBaseVNode("span", null, "Стоимость доставки:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.deliveryCost)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.additionalServices > 0 ? (openBlock(), createElementBlock("div", _hoisted_49, [
                _cache[13] || (_cache[13] = createBaseVNode("span", null, "Дополнительные услуги:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.additionalServices)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.totalWithoutVAT ? (openBlock(), createElementBlock("div", _hoisted_50, [
                _cache[14] || (_cache[14] = createBaseVNode("span", null, "Стоимость без НДС:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.totalWithoutVAT)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.vatAmount ? (openBlock(), createElementBlock("div", _hoisted_51, [
                _cache[15] || (_cache[15] = createBaseVNode("span", null, "НДС (5%):", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.vatAmount)), 1)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_52, [
              _cache[16] || (_cache[16] = createBaseVNode("span", null, "Общая стоимость", -1)),
              createBaseVNode("span", _hoisted_53, toDisplayString(formatCurrency(__props.result.selectedTariff.cost)), 1)
            ]),
            _cache[17] || (_cache[17] = createBaseVNode("div", { class: "text-xs text-gray-400 mt-1" }, " С учетом НДС ", -1))
          ])) : createCommentVNode("", true),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("print")),
            class: "btn btn-secondary w-full mt-4 border-none py-3 rounded-xs"
          }, "Распечатать")
        ]))
      ], 4);
    };
  }
};
const CalculationResult = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ba68cd3a"]]);
const _hoisted_1 = { class: "bg-brand-light p-5 rounded-lg mb-6" };
const _hoisted_2 = {
  key: 0,
  class: "w-full"
};
const _hoisted_3 = { class: "flex flex-col lg:flex-row lg:items-stretch gap-8 min-w-0" };
const _hoisted_4 = { class: "flex flex-col gap-6 lg:flex-1 [&_.text-input-vue]:focus-visible:outline-blue-400 [&_.text-input-vue>input]:p-4 [&_.text-input-vue>input::placeholder]:text-gray-600 min-w-0" };
const _hoisted_5 = { class: "bg-brand-light p-5 rounded-lg" };
const _hoisted_6 = { class: "flex flex-col gap-6" };
const _hoisted_7 = { class: "bg-brand-light p-5 rounded-lg" };
const _hoisted_8 = { class: "bg-brand-light p-5 rounded-lg w-full lg:w-80" };
const _hoisted_9 = {
  key: 1,
  class: "bg-brand-light p-5 rounded-lg mt-6"
};
const _hoisted_10 = { class: "bg-yellow-50 border border-yellow-200 rounded-lg p-4" };
const _hoisted_11 = { class: "text-sm text-yellow-800 mb-4" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = { key: 1 };
const _sfc_main = {
  __name: "CalculatorPage",
  setup(__props) {
    const billingAddresses = ref([]);
    const terminals = ref([]);
    const localities = ref([]);
    const transportTypes = ref([]);
    const tariffGrids = ref([]);
    const tariffZones = ref([]);
    const takeDelivers = ref([]);
    const boxings = ref([]);
    const units = ref([]);
    const regions = ref([]);
    const cargoOptions = ref([]);
    const calculatorConfig = ref({});
    const invalidFromCity = ref(null);
    const invalidToCity = ref(null);
    const invalidFromAddress = ref(null);
    const invalidToAddress = ref(null);
    const managerRequestData = computed(() => {
      const fromCity = formData.direction.fromAddress || invalidFromCity.value;
      const toCity = formData.direction.toAddress || invalidToCity.value;
      if (invalidFromAddress.value) {
        return {
          region: invalidFromAddress.value.region || "",
          locality: invalidFromAddress.value.city || "",
          street: invalidFromAddress.value.street || ""
        };
      }
      if (invalidToAddress.value) {
        return {
          region: invalidToAddress.value.region || "",
          locality: invalidToAddress.value.city || "",
          street: invalidToAddress.value.street || ""
        };
      }
      if (fromCity) {
        return {
          region: fromCity.region || "",
          locality: fromCity.name || fromCity.city || "",
          street: ""
        };
      }
      if (toCity) {
        return {
          region: toCity.region || "",
          locality: toCity.name || toCity.city || "",
          street: ""
        };
      }
      return {
        region: "",
        locality: "",
        street: ""
      };
    });
    const availableCities = computed(() => {
      const citiesMap = /* @__PURE__ */ new Map();
      billingAddresses.value.forEach((addr) => {
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
    const availableRegions = computed(() => {
      const regionsSet = /* @__PURE__ */ new Set();
      billingAddresses.value.forEach((addr) => {
        var _a;
        const region = typeof addr.region === "string" ? addr.region : ((_a = addr.region) == null ? void 0 : _a.name) || "";
        if (region && region.trim() !== "") {
          regionsSet.add(region);
        }
      });
      return Array.from(regionsSet).sort();
    });
    const showCalculator = computed(() => {
      if (invalidFromCity.value || invalidToCity.value) {
        return false;
      }
      const fromCityName = formData.direction.fromAddress ? typeof formData.direction.fromAddress === "string" ? formData.direction.fromAddress : formData.direction.fromAddress.name || "" : formData.direction.from;
      const toCityName = formData.direction.toAddress ? typeof formData.direction.toAddress === "string" ? formData.direction.toAddress : formData.direction.toAddress.name || "" : formData.direction.to;
      if (!fromCityName || !toCityName) {
        return false;
      }
      const fromExists = billingAddresses.value.some((addr) => {
        var _a;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "";
        return addrCity === fromCityName;
      });
      const toExists = billingAddresses.value.some((addr) => {
        var _a;
        const addrCity = typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "";
        return addrCity === toCityName;
      });
      return fromExists && toExists;
    });
    const formData = reactive({
      direction: {
        from: "",
        to: "",
        fromAddress: null,
        // Полный объект адреса отправки
        toAddress: null,
        // Полный объект адреса назначения
        fromLocalityId: null,
        // ID населенного пункта отправки
        toLocalityId: null
        // ID населенного пункта назначения
      },
      cargo: {
        mode: "total",
        packages: [{
          id: Date.now(),
          length: "",
          width: "",
          height: "",
          weight: "",
          description: "",
          declaredValue: "",
          packagingItems: [],
          selfMarking: false,
          dangerousGoods: false,
          tempControl: false,
          quantity: 1
        }]
      },
      departure: {
        deliveryMode: "terminal",
        location: "",
        date: (() => {
          const tomorrow = /* @__PURE__ */ new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow.toISOString().split("T")[0];
        })()
      },
      destination: {
        deliveryMode: "terminal",
        location: "",
        date: ""
      },
      extraOptions: {
        requiresAccompanyingDocs: false,
        returnDocsToSender: false
      },
      selectedTariff: null
    });
    function getAllTariffsWithStatus() {
      var _a, _b;
      if (!transportTypes.value || !isFormDataValid()) {
        return [];
      }
      const { direction, cargo, departure, destination } = formData;
      const processedPackages = cargo.packages.map((pkg) => ({
        ...pkg,
        weight: parseFloat(pkg.weight) || 0,
        length: parseFloat(pkg.length) || 0,
        width: parseFloat(pkg.width) || 0,
        height: parseFloat(pkg.height) || 0,
        quantity: parseInt(pkg.quantity) || 1
      }));
      const cargoData = { packages: processedPackages };
      const defaultDeliveryMode = ((_b = (_a = calculatorConfig.value.defaultValues) == null ? void 0 : _a.delivery) == null ? void 0 : _b.mode) || "terminal";
      ({
        deliveryMode: departure.deliveryMode || defaultDeliveryMode,
        location: departure.location || "",
        date: departure.date || (() => {
          const tomorrow = /* @__PURE__ */ new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow.toISOString().split("T")[0];
        })()
      });
      ({
        deliveryMode: destination.deliveryMode || defaultDeliveryMode,
        location: destination.location || "",
        date: destination.date || ""
      });
      let distanceKm = null;
      if (billingAddresses.value && direction.fromAddress && direction.toAddress) {
        let fromCoords = null;
        let toCoords = null;
        const fromCityName = typeof direction.fromAddress === "string" ? direction.fromAddress : direction.fromAddress.name || "";
        const toCityName = typeof direction.toAddress === "string" ? direction.toAddress : direction.toAddress.name || "";
        const fromAddressForCoords = billingAddresses.value.find((addr) => {
          var _a2;
          const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
          return addrLocalityName === fromCityName;
        });
        const toAddressForCoords = billingAddresses.value.find((addr) => {
          var _a2;
          const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
          return addrLocalityName === toCityName;
        });
        if (fromAddressForCoords && fromAddressForCoords.coordinates) {
          fromCoords = fromAddressForCoords.coordinates;
        }
        if (toAddressForCoords && toAddressForCoords.coordinates) {
          toCoords = toAddressForCoords.coordinates;
        }
        if (fromCoords && toCoords) {
          distanceKm = getDistanceKm(
            parseFloat(fromCoords[0]),
            parseFloat(fromCoords[1]),
            parseFloat(toCoords[0]),
            parseFloat(toCoords[1])
          );
        }
      }
      const result = transportTypes.value.map((transportType) => {
        const constraintCheck = checkTariffConstraints(transportType, cargoData, direction, distanceKm);
        if (!constraintCheck.isAvailable) {
          return {
            ...transportType,
            isAvailable: false,
            cost: null,
            reason: constraintCheck.reason
          };
        }
        const calculationResult2 = calculateTariffCost(transportType);
        if (calculationResult2 !== null) {
          return {
            ...transportType,
            fullName: transportType.name,
            isAvailable: true,
            cost: calculationResult2.totalCost,
            reason: null
          };
        }
        let reason = "Нет данных для расчета";
        if (!direction.fromAddress || !direction.toAddress) {
          reason = "Не выбраны города отправления и назначения";
        } else {
          reason = "Нет данных для расчета. Проверьте консоль браузера для деталей.";
        }
        return {
          ...transportType,
          fullName: transportType.name,
          isAvailable: false,
          cost: null,
          reason
        };
      });
      return result;
    }
    function checkTariffConstraints(transportType, cargoData, direction, distanceKm) {
      var _a, _b, _c;
      const tariffConfig = (_a = calculatorConfig.value.tariffs) == null ? void 0 : _a.find(
        (t) => t.name === transportType.name || t.id === `cargo-${transportType.name.toLowerCase()}`
      );
      if (!tariffConfig) {
        return { isAvailable: true, reason: null };
      }
      const constraints = tariffConfig.availability;
      const totalWeight = cargoData.packages.reduce((sum, pkg) => sum + pkg.weight * pkg.quantity, 0);
      const totalVolume = cargoData.packages.reduce((sum, pkg) => {
        const quantity = parseInt(pkg.quantity) || 1;
        let volume = 0;
        const volumeStr = pkg.volume !== null && pkg.volume !== void 0 && pkg.volume !== "" ? String(pkg.volume).trim() : "";
        if (volumeStr && quantity === 1) {
          const vol = parseFloat(volumeStr);
          if (!isNaN(vol) && vol >= 0) {
            volume = vol;
          } else {
            volume = pkg.length * pkg.width * pkg.height / 1e6;
          }
        } else {
          volume = pkg.length * pkg.width * pkg.height / 1e6;
        }
        return sum + volume * quantity;
      }, 0);
      if (constraints.minWeight && totalWeight < constraints.minWeight) {
        return { isAvailable: false, reason: `Минимальный вес для данного тарифа: ${constraints.minWeight} кг` };
      }
      if (constraints.maxWeight && totalWeight > constraints.maxWeight) {
        return { isAvailable: false, reason: `Максимальный вес для данного тарифа: ${constraints.maxWeight} кг` };
      }
      if (constraints.minVolume && totalVolume < constraints.minVolume) {
        return { isAvailable: false, reason: `Минимальный объем для данного тарифа: ${constraints.minVolume} м³` };
      }
      if (constraints.maxVolume && totalVolume > constraints.maxVolume) {
        return { isAvailable: false, reason: `Максимальный объем для данного тарифа: ${constraints.maxVolume} м³` };
      }
      if (constraints.minDistance && distanceKm && distanceKm < constraints.minDistance) {
        return { isAvailable: false, reason: `Минимальное расстояние для данного тарифа: ${constraints.minDistance} км` };
      }
      if (constraints.maxDistance && distanceKm && distanceKm > constraints.maxDistance) {
        return { isAvailable: false, reason: `Максимальное расстояние для данного тарифа: ${constraints.maxDistance} км` };
      }
      if (constraints.allowedRegions && constraints.allowedRegions.length > 0) {
        const fromRegion = (_b = direction.fromAddress) == null ? void 0 : _b.region_id;
        const toRegion = (_c = direction.toAddress) == null ? void 0 : _c.region_id;
        const isFromAllowed = !fromRegion || constraints.allowedRegions.some(
          (region) => fromRegion.includes(region) || region.includes(fromRegion)
        );
        const isToAllowed = !toRegion || constraints.allowedRegions.some(
          (region) => toRegion.includes(region) || region.includes(toRegion)
        );
        if (!isFromAllowed || !isToAllowed) {
          return { isAvailable: false, reason: `Тариф доступен только для регионов: ${constraints.allowedRegions.join(", ")}` };
        }
      }
      return { isAvailable: true, reason: null };
    }
    function calculateTariffCost(typeTransportation) {
      var _a, _b, _c, _d;
      const { cargo, departure, destination, extraOptions, direction } = formData;
      const isPickupAtTerminal = departure.deliveryMode === "terminal";
      const isDeliveryAtTerminal = destination.deliveryMode === "terminal";
      console.log("calculateTariffCost: Начало расчета", {
        typeTransportation: typeTransportation.name,
        isPickupAtTerminal,
        isDeliveryAtTerminal,
        departure: {
          deliveryMode: departure.deliveryMode,
          location: departure.location,
          locationType: typeof departure.location,
          locationKeys: departure.location && typeof departure.location === "object" ? Object.keys(departure.location) : null,
          uidBillingAddress: (_a = departure.location) == null ? void 0 : _a.uidBillingAddress
        },
        destination: {
          deliveryMode: destination.deliveryMode,
          location: destination.location,
          locationType: typeof destination.location,
          locationKeys: destination.location && typeof destination.location === "object" ? Object.keys(destination.location) : null,
          uidBillingAddress: (_b = destination.location) == null ? void 0 : _b.uidBillingAddress
        }
      });
      const transportTypeUid = typeTransportation.uid;
      let takeDeliverFrom = null;
      let takeDeliverTo = null;
      let fromAddress = null;
      let toAddress = null;
      let isCityWidePickup = false;
      let isCityWideDelivery = false;
      let originalTakeDeliverFrom = null;
      let originalTakeDeliverTo = null;
      let hasSpecificStreetFrom = false;
      let hasSpecificStreetTo = false;
      if (isPickupAtTerminal) {
        const terminalFrom = departure.location && typeof departure.location === "object" ? departure.location : null;
        console.log("Поиск takeDeliverFrom для терминала:", {
          isPickupAtTerminal,
          terminalFrom,
          terminalFromKeys: terminalFrom ? Object.keys(terminalFrom) : null,
          uidBillingAddress: terminalFrom == null ? void 0 : terminalFrom.uidBillingAddress,
          directionFromAddress: direction.fromAddress
        });
        if (terminalFrom && terminalFrom.uidBillingAddress) {
          fromAddress = billingAddresses.value.find(
            (addr) => String(addr.uid) === String(terminalFrom.uidBillingAddress)
          );
          if (fromAddress) {
            takeDeliverFrom = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(terminalFrom.uidBillingAddress) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            console.log("takeDeliverFrom найден через uidBillingAddress:", takeDeliverFrom ? {
              uid: takeDeliverFrom.uid,
              uidBillingAddress: takeDeliverFrom.uidBillingAddress,
              tariffZone: takeDeliverFrom.tariffZone
            } : "не найден");
          }
        }
        if (!takeDeliverFrom && direction.fromAddress) {
          const fromCityName = typeof direction.fromAddress === "string" ? direction.fromAddress : direction.fromAddress.name || "";
          console.log("Поиск fromAddress для терминала через direction.fromAddress:", {
            fromCityName,
            directionFromAddress: direction.fromAddress
          });
          fromAddress = billingAddresses.value.find((addr) => {
            var _a2;
            const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
            return addrLocalityName === fromCityName;
          });
          if (fromAddress) {
            const fromAddressUid = fromAddress.uid;
            takeDeliverFrom = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(fromAddressUid) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            console.log("takeDeliverFrom найден через direction.fromAddress:", takeDeliverFrom ? {
              uid: takeDeliverFrom.uid,
              uidBillingAddress: takeDeliverFrom.uidBillingAddress,
              tariffZone: takeDeliverFrom.tariffZone
            } : "не найден");
          }
        }
        if (!takeDeliverFrom) {
          console.warn("takeDeliverFrom не найден для терминала:", {
            terminalFrom,
            hasUidBillingAddress: terminalFrom == null ? void 0 : terminalFrom.uidBillingAddress,
            directionFromAddress: direction.fromAddress,
            fromAddress: fromAddress ? "found" : "not found"
          });
        }
      } else {
        if (direction.fromAddress) {
          const fromCityName = typeof direction.fromAddress === "string" ? direction.fromAddress : direction.fromAddress.name || "";
          const streetFromLocation = departure.location && typeof departure.location === "object" ? departure.location.street || "" : "";
          console.log("Поиск fromAddress для адреса:", {
            fromCityName,
            streetFromLocation,
            directionFromAddress: direction.fromAddress,
            billingAddressesCount: billingAddresses.value.length
          });
          const hasSpecificStreet = streetFromLocation && streetFromLocation.trim();
          if (hasSpecificStreet) {
            fromAddress = billingAddresses.value.find((addr) => {
              var _a2;
              const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
              const addrStreet = addr.street || "";
              return addrLocalityName === fromCityName && addrStreet === streetFromLocation.trim();
            });
            console.log("fromAddress найден с конкретной улицей:", fromAddress ? {
              uid: fromAddress.uid,
              locality: fromAddress.locality,
              street: fromAddress.street
            } : "не найден");
            if (!fromAddress) {
              fromAddress = billingAddresses.value.find((addr) => {
                var _a2;
                const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
                const addrStreet = addr.street || "";
                return addrLocalityName === fromCityName && (!addrStreet || addrStreet.trim() === "");
              });
              console.log("fromAddress найден без улицы (fallback после поиска конкретной улицы):", fromAddress ? {
                uid: fromAddress.uid,
                locality: fromAddress.locality,
                street: fromAddress.street
              } : "не найден");
            }
          } else {
            fromAddress = billingAddresses.value.find((addr) => {
              var _a2;
              const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
              const addrStreet = addr.street || "";
              return addrLocalityName === fromCityName && (!addrStreet || addrStreet.trim() === "");
            });
            console.log("fromAddress найден без улицы (для всего города):", fromAddress ? {
              uid: fromAddress.uid,
              locality: fromAddress.locality,
              street: fromAddress.street
            } : "не найден");
          }
          if (fromAddress) {
            const fromAddressUid = fromAddress.uid;
            const fromAddressStreet = fromAddress.street || "";
            const hasSpecificStreetInAddress = fromAddressStreet && fromAddressStreet.trim() !== "";
            hasSpecificStreetFrom = hasSpecificStreetInAddress;
            takeDeliverFrom = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(fromAddressUid) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            if (takeDeliverFrom && hasSpecificStreetInAddress) {
              originalTakeDeliverFrom = takeDeliverFrom;
            }
            console.log("takeDeliverFrom найден:", takeDeliverFrom ? {
              uid: takeDeliverFrom.uid,
              uidBillingAddress: takeDeliverFrom.uidBillingAddress,
              tariffZone: takeDeliverFrom.tariffZone,
              isSpecificAddress: hasSpecificStreetInAddress
            } : "не найден");
            if (!takeDeliverFrom && hasSpecificStreetInAddress) {
              console.log("takeDeliverFrom не найден для конкретного адреса, ищем для города:", {
                fromCityName,
                fromAddressStreet,
                fromAddressUid
              });
              const cityWideFromAddress = billingAddresses.value.find((addr) => {
                var _a2;
                const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
                const addrStreet = addr.street || "";
                return addrLocalityName === fromCityName && (!addrStreet || addrStreet.trim() === "");
              });
              if (cityWideFromAddress) {
                const cityWideFromAddressUid = cityWideFromAddress.uid;
                takeDeliverFrom = takeDelivers.value.find(
                  (td) => String(td.uidBillingAddress) === String(cityWideFromAddressUid) && String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                if (takeDeliverFrom) {
                  console.log("takeDeliverFrom найден для города (fallback):", {
                    uid: takeDeliverFrom.uid,
                    uidBillingAddress: takeDeliverFrom.uidBillingAddress,
                    tariffZone: takeDeliverFrom.tariffZone,
                    cityWideAddressUid: cityWideFromAddressUid
                  });
                  fromAddress = cityWideFromAddress;
                  isCityWidePickup = true;
                } else {
                  console.warn("takeDeliverFrom не найден даже для города:", {
                    cityWideFromAddressUid,
                    transportTypeUid
                  });
                }
              } else {
                console.warn("billingAddress для города не найден:", {
                  fromCityName
                });
              }
            }
          }
        } else {
          console.warn("direction.fromAddress отсутствует");
        }
      }
      if (isDeliveryAtTerminal) {
        const terminalTo = destination.location && typeof destination.location === "object" ? destination.location : null;
        console.log("Поиск takeDeliverTo для терминала:", {
          isDeliveryAtTerminal,
          terminalTo,
          terminalToKeys: terminalTo ? Object.keys(terminalTo) : null,
          uidBillingAddress: terminalTo == null ? void 0 : terminalTo.uidBillingAddress,
          directionToAddress: direction.toAddress
        });
        if (terminalTo && terminalTo.uidBillingAddress) {
          toAddress = billingAddresses.value.find(
            (addr) => String(addr.uid) === String(terminalTo.uidBillingAddress)
          );
          if (toAddress) {
            takeDeliverTo = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(terminalTo.uidBillingAddress) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            console.log("takeDeliverTo найден через uidBillingAddress:", takeDeliverTo ? {
              uid: takeDeliverTo.uid,
              uidBillingAddress: takeDeliverTo.uidBillingAddress,
              tariffZone: takeDeliverTo.tariffZone
            } : "не найден");
          }
        }
        if (!takeDeliverTo && direction.toAddress) {
          const toCityName = typeof direction.toAddress === "string" ? direction.toAddress : direction.toAddress.name || "";
          console.log("Поиск toAddress для терминала через direction.toAddress:", {
            toCityName,
            directionToAddress: direction.toAddress
          });
          toAddress = billingAddresses.value.find((addr) => {
            var _a2;
            const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
            return addrLocalityName === toCityName;
          });
          if (toAddress) {
            const toAddressUid = toAddress.uid;
            takeDeliverTo = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(toAddressUid) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            console.log("takeDeliverTo найден через direction.toAddress:", takeDeliverTo ? {
              uid: takeDeliverTo.uid,
              uidBillingAddress: takeDeliverTo.uidBillingAddress,
              tariffZone: takeDeliverTo.tariffZone
            } : "не найден");
          }
        }
        if (!takeDeliverTo) {
          console.warn("takeDeliverTo не найден для терминала:", {
            terminalTo,
            hasUidBillingAddress: terminalTo == null ? void 0 : terminalTo.uidBillingAddress,
            directionToAddress: direction.toAddress,
            toAddress: toAddress ? "found" : "not found"
          });
        }
      } else {
        if (direction.toAddress) {
          const toCityName = typeof direction.toAddress === "string" ? direction.toAddress : direction.toAddress.name || "";
          const streetFromLocation = destination.location && typeof destination.location === "object" ? destination.location.street || "" : "";
          console.log("Поиск toAddress для адреса:", {
            toCityName,
            streetFromLocation,
            directionToAddress: direction.toAddress,
            billingAddressesCount: billingAddresses.value.length
          });
          const hasSpecificStreet = streetFromLocation && streetFromLocation.trim();
          if (hasSpecificStreet) {
            toAddress = billingAddresses.value.find((addr) => {
              var _a2;
              const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
              const addrStreet = addr.street || "";
              return addrLocalityName === toCityName && addrStreet === streetFromLocation.trim();
            });
            console.log("toAddress найден с конкретной улицей:", toAddress ? {
              uid: toAddress.uid,
              locality: toAddress.locality,
              street: toAddress.street
            } : "не найден");
            if (!toAddress) {
              toAddress = billingAddresses.value.find((addr) => {
                var _a2;
                const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
                const addrStreet = addr.street || "";
                return addrLocalityName === toCityName && (!addrStreet || addrStreet.trim() === "");
              });
              console.log("toAddress найден без улицы (fallback после поиска конкретной улицы):", toAddress ? {
                uid: toAddress.uid,
                locality: toAddress.locality,
                street: toAddress.street
              } : "не найден");
            }
          } else {
            toAddress = billingAddresses.value.find((addr) => {
              var _a2;
              const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
              const addrStreet = addr.street || "";
              return addrLocalityName === toCityName && (!addrStreet || addrStreet.trim() === "");
            });
            console.log("toAddress найден без улицы (для всего города):", toAddress ? {
              uid: toAddress.uid,
              locality: toAddress.locality,
              street: toAddress.street
            } : "не найден");
          }
          if (toAddress) {
            const toAddressUid = toAddress.uid;
            const toAddressStreet = toAddress.street || "";
            const hasSpecificStreetInAddress = toAddressStreet && toAddressStreet.trim() !== "";
            hasSpecificStreetTo = hasSpecificStreetInAddress;
            takeDeliverTo = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(toAddressUid) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            if (takeDeliverTo && hasSpecificStreetInAddress) {
              originalTakeDeliverTo = takeDeliverTo;
            }
            console.log("takeDeliverTo найден:", takeDeliverTo ? {
              uid: takeDeliverTo.uid,
              uidBillingAddress: takeDeliverTo.uidBillingAddress,
              tariffZone: takeDeliverTo.tariffZone,
              isSpecificAddress: hasSpecificStreetInAddress
            } : "не найден");
            if (!takeDeliverTo && hasSpecificStreetInAddress) {
              console.log("takeDeliverTo не найден для конкретного адреса, ищем для города:", {
                toCityName,
                toAddressStreet,
                toAddressUid
              });
              const cityWideToAddress = billingAddresses.value.find((addr) => {
                var _a2;
                const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
                const addrStreet = addr.street || "";
                return addrLocalityName === toCityName && (!addrStreet || addrStreet.trim() === "");
              });
              if (cityWideToAddress) {
                const cityWideToAddressUid = cityWideToAddress.uid;
                takeDeliverTo = takeDelivers.value.find(
                  (td) => String(td.uidBillingAddress) === String(cityWideToAddressUid) && String(td.uidTypeTransportation) === String(transportTypeUid)
                );
                if (takeDeliverTo) {
                  console.log("takeDeliverTo найден для города (fallback):", {
                    uid: takeDeliverTo.uid,
                    uidBillingAddress: takeDeliverTo.uidBillingAddress,
                    tariffZone: takeDeliverTo.tariffZone,
                    cityWideAddressUid: cityWideToAddressUid
                  });
                  toAddress = cityWideToAddress;
                  isCityWideDelivery = true;
                } else {
                  console.warn("takeDeliverTo не найден даже для города:", {
                    cityWideToAddressUid,
                    transportTypeUid
                  });
                }
              } else {
                console.warn("billingAddress для города не найден:", {
                  toCityName
                });
              }
            }
          }
        } else {
          console.warn("direction.toAddress отсутствует");
        }
      }
      if (!takeDeliverFrom || !takeDeliverTo) {
        console.warn("takeDeliver записи не найдены:", {
          isPickupAtTerminal,
          isDeliveryAtTerminal,
          takeDeliverFrom: takeDeliverFrom ? "found" : "not found",
          takeDeliverTo: takeDeliverTo ? "found" : "not found",
          fromAddress: fromAddress ? "found" : "not found",
          toAddress: toAddress ? "found" : "not found"
        });
        return null;
      }
      let takeDeliverFromUid = takeDeliverFrom.uid;
      let takeDeliverToUid = takeDeliverTo.uid;
      if (!takeDeliverFromUid || !takeDeliverToUid || !transportTypeUid) {
        console.warn("UID не найдены:", {
          takeDeliverFromUid,
          takeDeliverToUid,
          transportTypeUid,
          takeDeliverFrom,
          takeDeliverTo,
          typeTransportation
        });
        return null;
      }
      console.log("Поиск тарифной зоны:", {
        takeDeliverFromUid,
        takeDeliverToUid,
        transportTypeUid,
        totalTariffZones: tariffZones.value.length,
        sampleZones: tariffZones.value.slice(0, 3).map((tz) => ({
          uidTakeLocality: tz.uidTakeLocality,
          uidDeliverLocality: tz.uidDeliverLocality,
          uidTypeTransportation: tz.uidTypeTransportation
        }))
      });
      let tariffZone = tariffZones.value.find(
        (tz) => String(tz.uidTakeLocality) === String(takeDeliverFromUid) && String(tz.uidDeliverLocality) === String(takeDeliverToUid) && String(tz.uidTypeTransportation) === String(transportTypeUid)
      );
      if (!tariffZone && (hasSpecificStreetFrom || hasSpecificStreetTo)) {
        console.log("Тарифная зона не найдена для конкретного адреса, пробуем найти для города:", {
          hasSpecificStreetFrom,
          hasSpecificStreetTo,
          takeDeliverFromUid,
          takeDeliverToUid,
          originalTakeDeliverFromUid: originalTakeDeliverFrom == null ? void 0 : originalTakeDeliverFrom.uid,
          originalTakeDeliverToUid: originalTakeDeliverTo == null ? void 0 : originalTakeDeliverTo.uid
        });
        let cityWideTakeDeliverFromUid = takeDeliverFromUid;
        let cityWideTakeDeliverToUid = takeDeliverToUid;
        let cityWideTakeDeliverFrom = null;
        let cityWideTakeDeliverTo = null;
        let cityWideFromAddress = null;
        let cityWideToAddress = null;
        if (hasSpecificStreetFrom && originalTakeDeliverFrom && fromAddress) {
          const fromCityName = typeof fromAddress.locality === "string" ? fromAddress.locality : ((_c = fromAddress.locality) == null ? void 0 : _c.name) || "";
          cityWideFromAddress = billingAddresses.value.find((addr) => {
            var _a2;
            const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
            const addrStreet = addr.street || "";
            return addrLocalityName === fromCityName && (!addrStreet || addrStreet.trim() === "");
          });
          if (cityWideFromAddress) {
            cityWideTakeDeliverFrom = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(cityWideFromAddress.uid) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            if (cityWideTakeDeliverFrom) {
              cityWideTakeDeliverFromUid = cityWideTakeDeliverFrom.uid;
              console.log("Найден cityWideTakeDeliverFrom для fallback тарифной зоны:", {
                uid: cityWideTakeDeliverFrom.uid,
                uidBillingAddress: cityWideTakeDeliverFrom.uidBillingAddress
              });
            }
          }
        }
        if (hasSpecificStreetTo && originalTakeDeliverTo && toAddress) {
          const toCityName = typeof toAddress.locality === "string" ? toAddress.locality : ((_d = toAddress.locality) == null ? void 0 : _d.name) || "";
          cityWideToAddress = billingAddresses.value.find((addr) => {
            var _a2;
            const addrLocalityName = typeof addr.locality === "string" ? addr.locality : ((_a2 = addr.locality) == null ? void 0 : _a2.name) || "";
            const addrStreet = addr.street || "";
            return addrLocalityName === toCityName && (!addrStreet || addrStreet.trim() === "");
          });
          if (cityWideToAddress) {
            cityWideTakeDeliverTo = takeDelivers.value.find(
              (td) => String(td.uidBillingAddress) === String(cityWideToAddress.uid) && String(td.uidTypeTransportation) === String(transportTypeUid)
            );
            if (cityWideTakeDeliverTo) {
              cityWideTakeDeliverToUid = cityWideTakeDeliverTo.uid;
              console.log("Найден cityWideTakeDeliverTo для fallback тарифной зоны:", {
                uid: cityWideTakeDeliverTo.uid,
                uidBillingAddress: cityWideTakeDeliverTo.uidBillingAddress
              });
            }
          }
        }
        if (cityWideTakeDeliverFromUid !== takeDeliverFromUid || cityWideTakeDeliverToUid !== takeDeliverToUid) {
          tariffZone = tariffZones.value.find(
            (tz) => String(tz.uidTakeLocality) === String(cityWideTakeDeliverFromUid) && String(tz.uidDeliverLocality) === String(cityWideTakeDeliverToUid) && String(tz.uidTypeTransportation) === String(transportTypeUid)
          );
          if (tariffZone) {
            console.log("Тарифная зона найдена для города (fallback):", {
              uid: tariffZone.uid,
              tariffZone: tariffZone.tariffZone,
              uidTakeLocality: tariffZone.uidTakeLocality,
              uidDeliverLocality: tariffZone.uidDeliverLocality,
              usedCityWidePickup: cityWideTakeDeliverFromUid !== takeDeliverFromUid,
              usedCityWideDelivery: cityWideTakeDeliverToUid !== takeDeliverToUid
            });
            if (cityWideTakeDeliverFromUid !== takeDeliverFromUid && cityWideTakeDeliverFrom && cityWideFromAddress) {
              takeDeliverFrom = cityWideTakeDeliverFrom;
              fromAddress = cityWideFromAddress;
              isCityWidePickup = true;
            }
            if (cityWideTakeDeliverToUid !== takeDeliverToUid && cityWideTakeDeliverTo && cityWideToAddress) {
              takeDeliverTo = cityWideTakeDeliverTo;
              toAddress = cityWideToAddress;
              isCityWideDelivery = true;
            }
          }
        }
      }
      if (!tariffZone) {
        const allZonesForTransportType = tariffZones.value.filter((tz) => String(tz.uidTypeTransportation) === String(transportTypeUid));
        console.warn("Тарифная зона не найдена:", {
          transportType: typeTransportation.name,
          transportTypeId: typeTransportation.id,
          transportTypeUid,
          takeDeliverFromUid,
          takeDeliverToUid,
          hasSpecificStreetFrom,
          hasSpecificStreetTo,
          totalTariffZones: tariffZones.value.length,
          zonesForTransportType: allZonesForTransportType.length,
          availableZones: allZonesForTransportType.map((tz) => ({
            uidTakeLocality: tz.uidTakeLocality,
            uidDeliverLocality: tz.uidDeliverLocality,
            uidTypeTransportation: tz.uidTypeTransportation,
            matchesTake: String(tz.uidTakeLocality) === String(takeDeliverFromUid),
            matchesDeliver: String(tz.uidDeliverLocality) === String(takeDeliverToUid),
            matchesTransport: String(tz.uidTypeTransportation) === String(transportTypeUid)
          }))
        });
        return null;
      }
      console.log("Тарифная зона найдена:", {
        uid: tariffZone.uid,
        tariffZone: tariffZone.tariffZone,
        uidTakeLocality: tariffZone.uidTakeLocality,
        uidDeliverLocality: tariffZone.uidDeliverLocality,
        coefficient: tariffZone.coefficient
      });
      const tariffZoneValue = tariffZone.tariffZone;
      if (!tariffGrids.value || tariffGrids.value.length === 0) {
        console.warn("Тарифные сетки не загружены");
        return null;
      }
      const relevantTarifGrid = tariffGrids.value.filter((tg) => {
        const transportTypeUid2 = typeTransportation.uid;
        if (String(tg.transportType_uid) !== String(transportTypeUid2)) return false;
        const tgNumberZone = tg.NumberZone;
        const expectedZone = tariffZoneValue;
        if (tgNumberZone === expectedZone) return true;
        if (String(tgNumberZone) === String(expectedZone)) return true;
        const tgZoneNum = Number(tgNumberZone);
        const expectedZoneNum = Number(expectedZone);
        if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
          return true;
        }
        return false;
      });
      if (relevantTarifGrid.length === 0) {
        const transportTypeUid2 = typeTransportation.uid;
        const expectedZoneNum = Number(tariffZoneValue);
        const allGridsForTransportType = tariffGrids.value.filter((tg) => {
          return String(tg.transportType_uid) === String(transportTypeUid2);
        });
        const matchingZones = allGridsForTransportType.filter((tg) => {
          const tgNumberZone = tg.NumberZone;
          const expectedZone = tariffZoneValue;
          if (tgNumberZone === expectedZone) return true;
          if (String(tgNumberZone) === String(expectedZone)) return true;
          const tgZoneNum = Number(tgNumberZone);
          const expectedZoneNum2 = Number(expectedZone);
          if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum2) && tgZoneNum === expectedZoneNum2) {
            return true;
          }
          return false;
        });
        console.warn("Тарифная сетка не найдена:", {
          transportType: typeTransportation.name,
          transportTypeId: typeTransportation.id,
          transportTypeUid: transportTypeUid2,
          tariffZone: tariffZone.tariffZone,
          tariffZoneValue,
          expectedZoneNum,
          tariffZoneType: typeof tariffZone.tariffZone,
          totalTariffGrids: tariffGrids.value.length,
          totalGridsForTransportType: allGridsForTransportType.length,
          matchingZonesCount: matchingZones.length,
          sampleGrids: allGridsForTransportType.slice(0, 10).map((tg) => {
            const tgZoneNum = Number(tg.NumberZone);
            const isZoneMatch = !isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum;
            return {
              transportType_uid: tg.transportType_uid,
              transportType_uidType: typeof tg.transportType_uid,
              NumberZone: tg.NumberZone,
              NumberZoneType: typeof tg.NumberZone,
              NumberZoneNum: tgZoneNum,
              expectedZoneNum,
              isNaN_tgZone: isNaN(tgZoneNum),
              isNaN_expected: isNaN(expectedZoneNum),
              matchesTransportType: String(tg.transportType_uid) === String(transportTypeUid2),
              matchesZone: isZoneMatch
            };
          }),
          uniqueZones: [...new Set(allGridsForTransportType.map((tg) => String(tg.NumberZone)))].slice(0, 10)
        });
        return null;
      }
      const packages = cargo.packages && cargo.packages.length > 0 ? cargo.packages : [{
        id: Date.now(),
        length: "30",
        width: "20",
        height: "10",
        weight: "5",
        description: "Посылка",
        declaredValue: 5e3,
        packagingItems: [],
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
      }];
      packages.forEach((pkg) => {
        if (pkg.packaging && !pkg.packagingItems) {
          pkg.packagingItems = [{ uid: pkg.packaging, quantity: 1 }];
        }
      });
      const details = [];
      const packageDetails = [];
      let totalWeight = 0;
      let totalVolume = 0;
      let hasAnyDangerousGoods = false;
      let hasAnyTempControl = false;
      let additionalCosts = 0;
      packages.forEach((pkg, index2) => {
        const length = parseFloat(pkg.length) || 0;
        const width = parseFloat(pkg.width) || 0;
        const height = parseFloat(pkg.height) || 0;
        const weight = parseFloat(pkg.weight) || 0;
        const quantity = parseInt(pkg.quantity) || 1;
        const declaredValue = parseFloat(pkg.declaredValue) || 0;
        let volume = 0;
        let volumeCm3 = 0;
        const volumeStr = pkg.volume !== null && pkg.volume !== void 0 && pkg.volume !== "" ? String(pkg.volume).trim() : "";
        if (volumeStr && quantity === 1) {
          const vol = parseFloat(volumeStr);
          if (!isNaN(vol) && vol >= 0) {
            volume = vol;
            volumeCm3 = volume * 1e6;
          } else {
            volumeCm3 = length * width * height;
            volume = volumeCm3 / 1e6;
          }
        } else {
          volumeCm3 = length * width * height;
          volume = volumeCm3 / 1e6;
        }
        const volumetricWeightPerPlace = volumeCm3 / typeTransportation.transportationCoefficient;
        const volumetricWeightTotal = volumetricWeightPerPlace * quantity;
        const actualWeightTotal = weight * quantity;
        const payableWeight = Math.max(volumetricWeightTotal, actualWeightTotal);
        totalWeight += payableWeight;
        totalVolume += volume * quantity;
        if (pkg.dangerousGoods) hasAnyDangerousGoods = true;
        if (pkg.tempControl) hasAnyTempControl = true;
        let packagingCost = 0;
        if (pkg.packagingItems && pkg.packagingItems.length > 0) {
          pkg.packagingItems.forEach((item) => {
            const boxing = boxings.value.find((b) => b.id === item.uid);
            if (boxing) {
              packagingCost += boxing.price * item.quantity;
            }
          });
        }
        additionalCosts += packagingCost * quantity;
        const packageInfo = {
          index: index2 + 1,
          description: pkg.description || `Место ${index2 + 1}`,
          dimensions: `${length}×${width}×${height} см`,
          singleWeight: weight,
          singleVolume: volume,
          volumetricWeightPerPlace,
          volumetricWeightTotal,
          actualWeightTotal,
          payableWeight,
          quantity,
          totalWeight: payableWeight,
          totalVolume: volume * quantity,
          dangerousGoods: pkg.dangerousGoods,
          tempControl: pkg.tempControl,
          declaredValue
        };
        packageDetails.push(packageInfo);
      });
      const totalPayableWeight = totalWeight;
      function calculateCostByTariffGrid(tariffGridArray, payableWeight) {
        if (!tariffGridArray || tariffGridArray.length === 0) {
          return 0;
        }
        const sortedTariffGrid = [...tariffGridArray].sort((a, b) => {
          const aFrom = parseFloat(a.unitFrom) || 0;
          const bFrom = parseFloat(b.unitFrom) || 0;
          return aFrom - bFrom;
        });
        const applicableTariff = sortedTariffGrid.find((tg) => {
          const unitFrom = parseFloat(tg.unitFrom) || 0;
          const unitTo = parseFloat(tg.unitTo) || Infinity;
          return payableWeight >= unitFrom && payableWeight <= unitTo;
        });
        if (applicableTariff) {
          const unitFrom = parseFloat(applicableTariff.unitFrom) || 0;
          const step = parseFloat(applicableTariff.step) || 1;
          const stepPrice = parseFloat(applicableTariff.stepPrice) || 0;
          const startingPrice = parseFloat(applicableTariff.startingPrice) || 0;
          const steps = payableWeight > unitFrom ? Math.ceil((payableWeight - unitFrom) / step) : 0;
          return startingPrice + steps * stepPrice;
        } else {
          const firstTariff = sortedTariffGrid[0];
          const lastTariff = sortedTariffGrid[sortedTariffGrid.length - 1];
          if (!firstTariff) {
            return 0;
          }
          const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
          const lastUnitTo = parseFloat(lastTariff.unitTo) || Infinity;
          if (payableWeight < firstUnitFrom) {
            console.warn("Платный вес меньше минимального unitFrom, используем минимальную стоимость:", {
              payableWeight,
              firstUnitFrom,
              startingPrice: firstTariff.startingPrice
            });
            return parseFloat(firstTariff.startingPrice) || 0;
          }
          if (payableWeight > lastUnitTo) {
            const unitFrom = parseFloat(lastTariff.unitFrom) || 0;
            const step = parseFloat(lastTariff.step) || 1;
            const stepPrice = parseFloat(lastTariff.stepPrice) || 0;
            const startingPrice = parseFloat(lastTariff.startingPrice) || 0;
            const steps = Math.ceil((payableWeight - unitFrom) / step);
            return startingPrice + steps * stepPrice;
          }
          console.warn("Не удалось найти подходящий тариф, используем минимальную стоимость:", {
            payableWeight,
            firstUnitFrom,
            lastUnitTo,
            startingPrice: firstTariff.startingPrice
          });
          return parseFloat(firstTariff.startingPrice) || 0;
        }
      }
      const transportationBaseCost = calculateCostByTariffGrid(relevantTarifGrid, totalPayableWeight);
      let transportationCost = transportationBaseCost;
      console.log("Расчет стоимости перевозки:", {
        fromLocalityId: direction.fromLocalityId,
        toLocalityId: direction.toLocalityId,
        transportTypeId: typeTransportation.id,
        transportationZone: tariffZone.tariffZone,
        transportationZoneSource: "tariffZones.tariffZone",
        tariffZone: {
          uid: tariffZone.uid || null,
          uidTakeLocality: tariffZone.uidTakeLocality,
          uidDeliverLocality: tariffZone.uidDeliverLocality,
          tariffZone: tariffZone.tariffZone,
          coefficient: tariffZone.coefficient,
          minTermDays: tariffZone.minTermDays,
          maxTermDays: tariffZone.maxTermDays
        },
        relevantTariffGrid: relevantTarifGrid.map((tg) => ({
          NumberZone: tg.NumberZone,
          unitFrom: tg.unitFrom,
          unitTo: tg.unitTo,
          startingPrice: tg.startingPrice,
          step: tg.step,
          stepPrice: tg.stepPrice
        })),
        totalPayableWeight,
        transportationBaseCost
      });
      if (tariffZone.coefficient && tariffZone.coefficient !== 1) {
        transportationCost *= tariffZone.coefficient;
        console.log("Применен коэффициент зоны перевозки:", {
          baseCost: transportationBaseCost,
          coefficient: tariffZone.coefficient,
          costAfterCoefficient: transportationCost
        });
      } else {
        console.log("Коэффициент зоны перевозки не применяется (coefficient =", tariffZone.coefficient || 1, ")");
      }
      console.log("Итоговая стоимость перевозки (до применения коэффициентов опасного груза/температурного режима):", {
        baseCost: transportationBaseCost,
        coefficient: tariffZone.coefficient || 1,
        costAfterCoefficient: transportationCost
      });
      let pickupCost = 0;
      if (!isPickupAtTerminal && takeDeliverFrom) {
        const pickupZone = takeDeliverFrom.tariffZone || "D";
        const pickupTariffGrid = tariffGrids.value.filter((tg) => {
          const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid);
          if (!transportTypeMatch) return false;
          const tgNumberZone = tg.NumberZone;
          const expectedZone = pickupZone;
          if (tgNumberZone === expectedZone) return true;
          if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
          const tgZoneNum = Number(tgNumberZone);
          const expectedZoneNum = Number(expectedZone);
          if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
            return true;
          }
          return false;
        });
        if (pickupTariffGrid.length > 0) {
          const pickupBaseCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
          pickupCost = pickupBaseCost;
          console.log("Расчет стоимости забора:", {
            fromAddressUid: (fromAddress == null ? void 0 : fromAddress.uid) || "N/A",
            fromAddressUid: (fromAddress == null ? void 0 : fromAddress.uid) || "N/A",
            isPickupAtTerminal,
            transportTypeId: typeTransportation.id,
            pickupZone,
            pickupZoneSource: "takeDeliver.tariffZone",
            takeDeliverFrom: {
              id: takeDeliverFrom.id,
              uidBillingAddress: takeDeliverFrom.uidBillingAddress,
              tariffZone: takeDeliverFrom.tariffZone,
              surcharge: takeDeliverFrom.surcharge,
              coefficientSurcharge: takeDeliverFrom.coefficientSurcharge
            },
            pickupTariffGrid: pickupTariffGrid.map((tg) => ({
              NumberZone: tg.NumberZone,
              unitFrom: tg.unitFrom,
              unitTo: tg.unitTo,
              startingPrice: tg.startingPrice,
              step: tg.step,
              stepPrice: tg.stepPrice
            })),
            totalPayableWeight,
            pickupBaseCost
          });
          if (takeDeliverFrom.surcharge) {
            pickupCost += takeDeliverFrom.surcharge;
            console.log("Применена надбавка surcharge:", {
              baseCost: pickupBaseCost,
              surcharge: takeDeliverFrom.surcharge,
              costAfterSurcharge: pickupCost
            });
          }
          if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
            const costBeforeCoefficient = pickupCost;
            pickupCost *= takeDeliverFrom.coefficientSurcharge;
            console.log("Применен коэффициент coefficientSurcharge:", {
              costBeforeCoefficient,
              coefficientSurcharge: takeDeliverFrom.coefficientSurcharge,
              costAfterCoefficient: pickupCost
            });
          }
          console.log("Итоговая стоимость забора:", {
            baseCost: pickupBaseCost,
            surcharge: takeDeliverFrom.surcharge || 0,
            coefficientSurcharge: takeDeliverFrom.coefficientSurcharge || 1,
            finalPickupCost: pickupCost
          });
        } else {
          const availableZones = [...new Set(tariffGrids.value.filter((tg) => String(tg.transportType_uid) === String(transportTypeUid)).map((tg) => String(tg.NumberZone)))];
          console.error("❌ ОШИБКА: Тарифная сетка для забора не найдена!", {
            transportType: typeTransportation.name,
            transportTypeId: typeTransportation.id,
            pickupZone,
            pickupZoneSource: "takeDeliver.tariffZone",
            fromAddressUid: (fromAddress == null ? void 0 : fromAddress.uid) || "N/A",
            isPickupAtTerminal,
            takeDeliverFrom,
            availableZones,
            message: `Зона "${pickupZone}" из takeDeliver не найдена в тарифной сетке. Доступные зоны: ${availableZones.join(", ")}`
          });
          details.push({
            name: `⚠️ ВНИМАНИЕ: Тарифная сетка для зоны забора "${pickupZone}" не найдена. Доступные зоны: ${availableZones.join(", ")}`,
            cost: 0,
            isDetail: true
          });
        }
      } else if (!isPickupAtTerminal && !takeDeliverFrom) {
        console.warn("Данные takeDeliver для забора не найдены:", {
          fromAddressUid: (fromAddress == null ? void 0 : fromAddress.uid) || "N/A",
          isPickupAtTerminal,
          transportTypeId: typeTransportation.id,
          availableTakeDelivers: takeDelivers.value.filter((td) => String(td.uidTypeTransportation) === String(typeTransportation.uid)).map((td) => ({
            uidBillingAddress: td.uidBillingAddress,
            uidTypeTransportation: td.uidTypeTransportation,
            tariffZone: td.tariffZone
          }))
        });
      }
      let deliveryCost = 0;
      if (!isDeliveryAtTerminal && takeDeliverTo) {
        const deliveryZone = takeDeliverTo.tariffZone || "H";
        const deliveryTariffGrid = tariffGrids.value.filter((tg) => {
          const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid);
          if (!transportTypeMatch) return false;
          const tgNumberZone = tg.NumberZone;
          const expectedZone = deliveryZone;
          if (tgNumberZone === expectedZone) return true;
          if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
          const tgZoneNum = Number(tgNumberZone);
          const expectedZoneNum = Number(expectedZone);
          if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
            return true;
          }
          return false;
        });
        if (deliveryTariffGrid.length > 0) {
          const deliveryBaseCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
          deliveryCost = deliveryBaseCost;
          console.log("Расчет стоимости доставки:", {
            toAddressUid: (toAddress == null ? void 0 : toAddress.uid) || "N/A",
            toAddressUid: (toAddress == null ? void 0 : toAddress.uid) || "N/A",
            isDeliveryAtTerminal,
            transportTypeId: typeTransportation.id,
            deliveryZone,
            deliveryZoneSource: "takeDeliver.tariffZone",
            takeDeliverTo: {
              id: takeDeliverTo.id,
              uidBillingAddress: takeDeliverTo.uidBillingAddress,
              tariffZone: takeDeliverTo.tariffZone,
              surcharge: takeDeliverTo.surcharge,
              coefficientSurcharge: takeDeliverTo.coefficientSurcharge
            },
            deliveryTariffGrid: deliveryTariffGrid.map((tg) => ({
              NumberZone: tg.NumberZone,
              unitFrom: tg.unitFrom,
              unitTo: tg.unitTo,
              startingPrice: tg.startingPrice,
              step: tg.step,
              stepPrice: tg.stepPrice
            })),
            totalPayableWeight,
            deliveryBaseCost
          });
          if (takeDeliverTo.surcharge) {
            deliveryCost += takeDeliverTo.surcharge;
            console.log("Применена надбавка surcharge:", {
              baseCost: deliveryBaseCost,
              surcharge: takeDeliverTo.surcharge,
              costAfterSurcharge: deliveryCost
            });
          }
          if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
            const costBeforeCoefficient = deliveryCost;
            deliveryCost *= takeDeliverTo.coefficientSurcharge;
            console.log("Применен коэффициент coefficientSurcharge:", {
              costBeforeCoefficient,
              coefficientSurcharge: takeDeliverTo.coefficientSurcharge,
              costAfterCoefficient: deliveryCost
            });
          }
          console.log("Итоговая стоимость доставки:", {
            baseCost: deliveryBaseCost,
            surcharge: takeDeliverTo.surcharge || 0,
            coefficientSurcharge: takeDeliverTo.coefficientSurcharge || 1,
            finalDeliveryCost: deliveryCost
          });
        } else {
          const availableZones = [...new Set(tariffGrids.value.filter((tg) => String(tg.transportType_uid) === String(transportTypeUid)).map((tg) => String(tg.NumberZone)))];
          console.error("❌ ОШИБКА: Тарифная сетка для доставки не найдена!", {
            transportType: typeTransportation.name,
            transportTypeId: typeTransportation.id,
            deliveryZone,
            deliveryZoneSource: "takeDeliver.tariffZone",
            toAddressUid: (toAddress == null ? void 0 : toAddress.uid) || "N/A",
            isDeliveryAtTerminal,
            takeDeliverTo,
            availableZones,
            message: `Зона "${deliveryZone}" из takeDeliver не найдена в тарифной сетке. Доступные зоны: ${availableZones.join(", ")}`
          });
          details.push({
            name: `⚠️ ВНИМАНИЕ: Тарифная сетка для зоны доставки "${deliveryZone}" не найдена. Доступные зоны: ${availableZones.join(", ")}`,
            cost: 0,
            isDetail: true
          });
        }
      } else if (!isDeliveryAtTerminal && !takeDeliverTo) {
        console.warn("Данные takeDeliver для доставки не найдены:", {
          toAddressUid: (toAddress == null ? void 0 : toAddress.uid) || "N/A",
          isDeliveryAtTerminal,
          transportTypeId: typeTransportation.id,
          availableTakeDelivers: takeDelivers.value.filter((td) => String(td.uidTypeTransportation) === String(typeTransportation.uid)).map((td) => ({
            uidBillingAddress: td.uidBillingAddress,
            uidTypeTransportation: td.uidTypeTransportation,
            tariffZone: td.tariffZone
          }))
        });
      }
      function calculateLoadingUnloadingCost(localityId, locationData, payableWeight, volume) {
        if (!locationData || typeof locationData !== "object" || !locationData.loadingUnloading) {
          return 0;
        }
        const locality = localities.value.find((loc) => String(loc.id) === String(localityId));
        if (!locality || !locality.loadingUnloadingRates) {
          return 0;
        }
        const rates = locality.loadingUnloadingRates;
        const floor = parseInt(locationData.floor) || 0;
        const noElevator = locationData.noElevator || false;
        let cost = 0;
        if (floor > 0) {
          const ratePerFloor = noElevator ? rates.perFloorWithoutElevator || 0 : rates.perFloorWithElevator || 0;
          cost += floor * ratePerFloor;
        }
        if (rates.weightCoefficient && payableWeight > 0) {
          cost += payableWeight * rates.weightCoefficient;
        }
        if (rates.volumeCoefficient && volume > 0) {
          cost += volume * rates.volumeCoefficient;
        }
        return cost;
      }
      let loadingUnloadingCostPickup = 0;
      if (!isPickupAtTerminal && departure.location && typeof departure.location === "object") {
        loadingUnloadingCostPickup = calculateLoadingUnloadingCost(
          direction.fromLocalityId,
          departure.location,
          totalPayableWeight,
          totalVolume
        );
      }
      let loadingUnloadingCostDelivery = 0;
      if (!isDeliveryAtTerminal && destination.location && typeof destination.location === "object") {
        loadingUnloadingCostDelivery = calculateLoadingUnloadingCost(
          direction.toLocalityId,
          destination.location,
          totalPayableWeight,
          totalVolume
        );
        if (destination.location.unpacking) ;
      }
      const totalLoadingUnloadingCost = loadingUnloadingCostPickup + loadingUnloadingCostDelivery;
      const transportationZoneValue = tariffZone.tariffZone;
      const pickupZoneValue = (takeDeliverFrom == null ? void 0 : takeDeliverFrom.tariffZone) || null;
      const deliveryZoneValue = (takeDeliverTo == null ? void 0 : takeDeliverTo.tariffZone) || null;
      const zoneWarnings = [];
      if (pickupZoneValue && String(pickupZoneValue) === String(transportationZoneValue)) {
        zoneWarnings.push({
          type: "pickup",
          message: `⚠️ ВНИМАНИЕ: Зона забора "${pickupZoneValue}" совпадает с зоной перевозки "${transportationZoneValue}". По ТЗ зона забора должна быть буквенной (например, "D"), а не числовой.`
        });
        console.warn("⚠️ ВНИМАНИЕ: Зона забора совпадает с зоной перевозки:", {
          pickupZone: pickupZoneValue,
          transportationZone: transportationZoneValue,
          message: 'По ТЗ зона забора должна быть буквенной (например, "D"), а не числовой'
        });
      }
      if (deliveryZoneValue && String(deliveryZoneValue) === String(transportationZoneValue)) {
        zoneWarnings.push({
          type: "delivery",
          message: `⚠️ ВНИМАНИЕ: Зона доставки "${deliveryZoneValue}" совпадает с зоной перевозки "${transportationZoneValue}". По ТЗ зона доставки должна быть буквенной (например, "H"), а не числовой.`
        });
        console.warn("⚠️ ВНИМАНИЕ: Зона доставки совпадает с зоной перевозки:", {
          deliveryZone: deliveryZoneValue,
          transportationZone: transportationZoneValue,
          message: 'По ТЗ зона доставки должна быть буквенной (например, "H"), а не числовой'
        });
      }
      if (pickupZoneValue && deliveryZoneValue && String(pickupZoneValue) === String(deliveryZoneValue)) {
        zoneWarnings.push({
          type: "pickup_delivery",
          message: `⚠️ ВНИМАНИЕ: Зона забора "${pickupZoneValue}" совпадает с зоной доставки "${deliveryZoneValue}". По ТЗ зоны забора и доставки должны быть разными.`
        });
        console.warn("⚠️ ВНИМАНИЕ: Зона забора совпадает с зоной доставки:", {
          pickupZone: pickupZoneValue,
          deliveryZone: deliveryZoneValue,
          message: "По ТЗ зоны забора и доставки должны быть разными"
        });
      }
      if (pickupCost > 0 && deliveryCost > 0 && transportationCost > 0) {
        const pickupBaseCost = pickupCost / ((takeDeliverFrom == null ? void 0 : takeDeliverFrom.coefficientSurcharge) || 1) - ((takeDeliverFrom == null ? void 0 : takeDeliverFrom.surcharge) || 0);
        const deliveryBaseCost = deliveryCost / ((takeDeliverTo == null ? void 0 : takeDeliverTo.coefficientSurcharge) || 1) - ((takeDeliverTo == null ? void 0 : takeDeliverTo.surcharge) || 0);
        const transportationBaseCostValue = transportationBaseCost;
        const costDifference = Math.abs(pickupBaseCost - transportationBaseCostValue);
        if (costDifference < 0.01 && String(pickupZoneValue) === String(transportationZoneValue)) {
          zoneWarnings.push({
            type: "tariff",
            message: `⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для забора и перевозки (зона "${pickupZoneValue}"). По ТЗ должны быть разные зоны и разные тарифы.`
          });
          console.warn("⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для забора и перевозки:", {
            pickupZone: pickupZoneValue,
            transportationZone: transportationZoneValue,
            pickupBaseCost,
            transportationBaseCost: transportationBaseCostValue,
            message: "По ТЗ должны быть разные зоны и разные тарифы"
          });
        }
        const deliveryCostDifference = Math.abs(deliveryBaseCost - transportationBaseCostValue);
        if (deliveryCostDifference < 0.01 && String(deliveryZoneValue) === String(transportationZoneValue)) {
          zoneWarnings.push({
            type: "tariff",
            message: `⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для доставки и перевозки (зона "${deliveryZoneValue}"). По ТЗ должны быть разные зоны и разные тарифы.`
          });
          console.warn("⚠️ ВНИМАНИЕ: Используются одинаковые тарифы для доставки и перевозки:", {
            deliveryZone: deliveryZoneValue,
            transportationZone: transportationZoneValue,
            deliveryBaseCost,
            transportationBaseCost: transportationBaseCostValue,
            message: "По ТЗ должны быть разные зоны и разные тарифы"
          });
        }
      }
      let dangerousGoodsMultiplier = 1;
      let tempControlMultiplier = 1;
      if (hasAnyDangerousGoods) {
        dangerousGoodsMultiplier = 1.4;
      }
      if (hasAnyTempControl) {
        tempControlMultiplier = 1.25;
      }
      const totalMultiplier = dangerousGoodsMultiplier * tempControlMultiplier;
      console.log("Применение коэффициентов опасного груза/температурного режима:", {
        hasAnyDangerousGoods,
        dangerousGoodsMultiplier,
        hasAnyTempControl,
        tempControlMultiplier,
        totalMultiplier,
        costsBeforeMultiplier: {
          transportationCost,
          pickupCost,
          deliveryCost
        }
      });
      const transportationCostBeforeMultiplier = transportationCost;
      const pickupCostBeforeMultiplier = pickupCost;
      const deliveryCostBeforeMultiplier = deliveryCost;
      transportationCost *= totalMultiplier;
      pickupCost *= totalMultiplier;
      deliveryCost *= totalMultiplier;
      if (totalMultiplier !== 1) {
        console.log("Применены коэффициенты опасного груза/температурного режима:", {
          transportationCost: `${transportationCostBeforeMultiplier} × ${totalMultiplier} = ${transportationCost}`,
          pickupCost: `${pickupCostBeforeMultiplier} × ${totalMultiplier} = ${pickupCost}`,
          deliveryCost: `${deliveryCostBeforeMultiplier} × ${totalMultiplier} = ${deliveryCost}`
        });
      } else {
        console.log("Коэффициенты опасного груза/температурного режима не применяются (оба равны 1)");
      }
      const totalWithoutVAT = transportationCost + pickupCost + deliveryCost + additionalCosts + totalLoadingUnloadingCost;
      console.log("Итоговая стоимость без НДС:", {
        transportationCost,
        pickupCost,
        deliveryCost,
        additionalCosts,
        totalLoadingUnloadingCost,
        totalWithoutVAT,
        breakdown: {
          "Перевозка": transportationCost,
          "Забор": pickupCost,
          "Доставка": deliveryCost,
          "Дополнительные услуги": additionalCosts,
          "Погрузо-разгрузочные работы": totalLoadingUnloadingCost
        }
      });
      const vatRate = 0.05;
      const vatAmount = totalWithoutVAT * vatRate;
      const finalCost = totalWithoutVAT + vatAmount;
      console.log("Расчет НДС и итоговой стоимости:", {
        totalWithoutVAT,
        vatRate,
        vatAmount,
        finalCost
      });
      if (zoneWarnings && zoneWarnings.length > 0) {
        details.push({ name: "⚠️ ПРЕДУПРЕЖДЕНИЯ О ЗОНАХ", cost: 0, isSubHeader: true });
        zoneWarnings.forEach((warning) => {
          details.push({
            name: warning.message,
            cost: 0,
            isDetail: true
          });
        });
      }
      details.push({
        name: `Объем: ${totalVolume.toFixed(3)} м³`,
        cost: 0
      });
      details.push({
        name: `Платный вес (ПВ): ${totalPayableWeight.toFixed(2)} кг`,
        cost: 0
      });
      details.push({
        name: `Тарифная зона перевозки: ${tariffZone.tariffZone}`,
        cost: 0
      });
      details.push({ name: "ФОРМУЛЫ РАСЧЕТА", cost: 0, isHeader: true });
      packages.forEach((pkg, index2) => {
        const length = parseFloat(pkg.length) || 0;
        const width = parseFloat(pkg.width) || 0;
        const height = parseFloat(pkg.height) || 0;
        const weight = parseFloat(pkg.weight) || 0;
        const quantity = parseInt(pkg.quantity) || 1;
        let volumeCm3 = 0;
        const volumeStr = pkg.volume !== null && pkg.volume !== void 0 && pkg.volume !== "" ? String(pkg.volume).trim() : "";
        if (volumeStr && quantity === 1) {
          const volume = parseFloat(volumeStr);
          if (!isNaN(volume) && volume >= 0) {
            volumeCm3 = volume * 1e6;
          } else {
            volumeCm3 = length * width * height;
          }
        } else {
          volumeCm3 = length * width * height;
        }
        const volumetricWeightPerPlace = volumeCm3 / typeTransportation.transportationCoefficient;
        const volumetricWeightTotal = volumetricWeightPerPlace * quantity;
        const actualWeightTotal = weight * quantity;
        const payableWeight = Math.max(volumetricWeightTotal, actualWeightTotal);
        details.push({
          name: `Место ${index2 + 1}${quantity > 1 ? ` (×${quantity})` : ""}:`,
          cost: 0,
          isSubHeader: true
        });
        const volumeStrForFormula = pkg.volume !== null && pkg.volume !== void 0 && pkg.volume !== "" ? String(pkg.volume).trim() : "";
        if (volumeStrForFormula && quantity === 1) {
          const volume = parseFloat(volumeStrForFormula);
          if (!isNaN(volume) && volume >= 0) {
            details.push({
              name: `V = ${volume.toFixed(3)} (объем, м³ из формы) × 1000000 = ${volumeCm3.toFixed(2)} см³`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `V = ${length.toFixed(2)} (длина, см) × ${width.toFixed(2)} (ширина, см) × ${height.toFixed(2)} (высота, см) = ${volumeCm3.toFixed(2)} см³`,
              cost: 0,
              isDetail: true
            });
          }
        } else {
          details.push({
            name: `V = ${length.toFixed(2)} (длина, см) × ${width.toFixed(2)} (ширина, см) × ${height.toFixed(2)} (высота, см) = ${volumeCm3.toFixed(2)} см³`,
            cost: 0,
            isDetail: true
          });
        }
        details.push({
          name: `Объемный вес 1 места = ${volumeCm3.toFixed(2)} (объем, см³) / ${typeTransportation.transportationCoefficient} (коэффициент перевозки из тарифа "${typeTransportation.name}") = ${volumetricWeightPerPlace.toFixed(2)} кг`,
          cost: 0,
          isDetail: true
        });
        details.push({
          name: `Объемный вес всего = ${volumetricWeightPerPlace.toFixed(2)} (объемный вес 1 места) × ${quantity} (количество мест из формы) = ${volumetricWeightTotal.toFixed(2)} кг`,
          cost: 0,
          isDetail: true
        });
        details.push({
          name: `Фактический вес всего = ${weight.toFixed(2)} (вес 1 места, кг из формы) × ${quantity} (количество мест из формы) = ${actualWeightTotal.toFixed(2)} кг`,
          cost: 0,
          isDetail: true
        });
        details.push({
          name: `Платный вес места ${index2 + 1} = MAX(${volumetricWeightTotal.toFixed(2)} (объемный вес всего), ${actualWeightTotal.toFixed(2)} (фактический вес всего)) = ${payableWeight.toFixed(2)} кг`,
          cost: 0,
          isDetail: true
        });
      });
      const sortedRelevantTariffGrid = [...relevantTarifGrid].sort((a, b) => {
        const aFrom = parseFloat(a.unitFrom) || 0;
        const bFrom = parseFloat(b.unitFrom) || 0;
        return aFrom - bFrom;
      });
      let applicableTransportationTariff = sortedRelevantTariffGrid.find((tg) => {
        const unitFrom = parseFloat(tg.unitFrom) || 0;
        const unitTo = parseFloat(tg.unitTo) || Infinity;
        return totalPayableWeight >= unitFrom && totalPayableWeight <= unitTo;
      });
      if (!applicableTransportationTariff && sortedRelevantTariffGrid.length > 0) {
        const firstTariff = sortedRelevantTariffGrid[0];
        const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
        if (totalPayableWeight < firstUnitFrom) {
          applicableTransportationTariff = firstTariff;
        } else {
          applicableTransportationTariff = sortedRelevantTariffGrid[sortedRelevantTariffGrid.length - 1];
        }
      }
      if (applicableTransportationTariff) {
        const unitFrom = parseFloat(applicableTransportationTariff.unitFrom) || 0;
        const step = parseFloat(applicableTransportationTariff.step) || 1;
        let steps = 0;
        if (step > 0 && totalPayableWeight > unitFrom) {
          steps = Math.ceil((totalPayableWeight - unitFrom) / step);
        }
        details.push({
          name: "ФОРМУЛА СТОИМОСТИ ПЕРЕВОЗКИ",
          cost: 0,
          isSubHeader: true
        });
        if (step > 0 && totalPayableWeight > unitFrom) {
          const transportationStepsCalculation = (totalPayableWeight - unitFrom) / step;
          details.push({
            name: `Расчет шагов: (${totalPayableWeight.toFixed(2)} (ПВ, кг) - ${unitFrom} (unitFrom из тарифной сетки зоны ${tariffZone.tariffZone})) / ${step} (step из тарифной сетки) = ${transportationStepsCalculation.toFixed(2)}`,
            cost: 0,
            isDetail: true
          });
          details.push({
            name: `Количество шагов = округление вверх до целого числа = ${steps}`,
            cost: 0,
            isDetail: true
          });
          details.push({
            name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки) + ${steps} (шаги) × ${applicableTransportationTariff.stepPrice} (stepPrice из тарифной сетки) = ${transportationBaseCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
        } else if (step === 0) {
          details.push({
            name: `Тарифная сетка имеет фиксированную цену (step = 0) для зоны ${tariffZone.tariffZone}.`,
            cost: 0,
            isDetail: true
          });
          details.push({
            name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки, фиксированная цена) = ${transportationBaseCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
        } else {
          details.push({
            name: `Платный вес (${totalPayableWeight.toFixed(2)} кг) равен минимальному весу (${unitFrom} кг) для зоны ${tariffZone.tariffZone}. Используется минимальная стоимость (startingPrice).`,
            cost: 0,
            isDetail: true
          });
          details.push({
            name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки, шаги не применяются, так как ПВ = unitFrom) = ${transportationBaseCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
        }
        if (tariffZone.coefficient && tariffZone.coefficient !== 1) {
          details.push({
            name: `Стоимость с коэффициентом зоны = ${transportationBaseCost.toFixed(2)} (базовая стоимость) × ${tariffZone.coefficient} (коэффициент зоны ${tariffZone.tariffZone} из tariffZones) = ${(transportationBaseCost * tariffZone.coefficient).toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
        }
        if (totalMultiplier !== 1) {
          details.push({
            name: `Стоимость с коэффициентами = ${(transportationBaseCost * (tariffZone.coefficient || 1)).toFixed(2)} (стоимость перевозки) × ${totalMultiplier.toFixed(2)} (коэффициент ${hasAnyDangerousGoods ? "опасного груза 1.4" : "1"} × ${hasAnyTempControl ? "температурного режима 1.25" : "1"}) = ${transportationCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
        }
      }
      if (pickupCost > 0 && !isPickupAtTerminal && takeDeliverFrom) {
        const pickupZone = takeDeliverFrom.tariffZone || "D";
        const pickupTariffGrid = tariffGrids.value.filter((tg) => {
          const transportTypeUid2 = typeTransportation.uid;
          const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid2);
          if (!transportTypeMatch) return false;
          const tgNumberZone = tg.NumberZone;
          const expectedZone = pickupZone;
          if (tgNumberZone === expectedZone) return true;
          if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
          const tgZoneNum = Number(tgNumberZone);
          const expectedZoneNum = Number(expectedZone);
          if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
            return true;
          }
          return false;
        });
        const pickupBaseCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
        const sortedPickupTariffGrid = [...pickupTariffGrid].sort((a, b) => {
          const aFrom = parseFloat(a.unitFrom) || 0;
          const bFrom = parseFloat(b.unitFrom) || 0;
          return aFrom - bFrom;
        });
        let applicablePickupTariff = sortedPickupTariffGrid.find((tg) => {
          const unitFrom = parseFloat(tg.unitFrom) || 0;
          const unitTo = parseFloat(tg.unitTo) || Infinity;
          return totalPayableWeight >= unitFrom && totalPayableWeight <= unitTo;
        });
        if (!applicablePickupTariff && sortedPickupTariffGrid.length > 0) {
          const firstTariff = sortedPickupTariffGrid[0];
          const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
          if (totalPayableWeight < firstUnitFrom) {
            applicablePickupTariff = firstTariff;
          } else {
            applicablePickupTariff = sortedPickupTariffGrid[sortedPickupTariffGrid.length - 1];
          }
        }
        if (applicablePickupTariff) {
          const unitFrom = parseFloat(applicablePickupTariff.unitFrom) || 0;
          const step = parseFloat(applicablePickupTariff.step) || 1;
          const pickupSteps = totalPayableWeight > unitFrom ? Math.ceil((totalPayableWeight - unitFrom) / step) : 0;
          details.push({
            name: "ФОРМУЛА СТОИМОСТИ ЗАБОРА",
            cost: 0,
            isSubHeader: true
          });
          if (isCityWidePickup) {
            details.push({
              name: "⚠️ Используется покрытие города (конкретный адрес не найден в системе)",
              cost: 0,
              isDetail: true
            });
          }
          if (step > 0 && totalPayableWeight > unitFrom) {
            const pickupStepsCalculation = (totalPayableWeight - unitFrom) / step;
            details.push({
              name: `Расчет шагов: (${totalPayableWeight.toFixed(2)} (ПВ) - ${unitFrom} (unitFrom из тарифной сетки зоны ${pickupZone} из takeDeliver для адреса отправки)) / ${step} (step) = ${pickupStepsCalculation.toFixed(2)}`,
              cost: 0,
              isDetail: true
            });
            details.push({
              name: `Количество шагов = округление вверх до целого числа = ${pickupSteps}`,
              cost: 0,
              isDetail: true
            });
          } else if (step === 0) {
            details.push({
              name: `Тарифная сетка имеет фиксированную цену (step = 0) для зоны ${pickupZone}.`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Платный вес (${totalPayableWeight.toFixed(2)} кг) равен минимальному весу (${unitFrom} кг) для зоны ${pickupZone}. Используется минимальная стоимость (startingPrice).`,
              cost: 0,
              isDetail: true
            });
          }
          if (pickupSteps > 0) {
            details.push({
              name: `Базовая стоимость забора = ${applicablePickupTariff.startingPrice} (startingPrice из тарифной сетки зоны ${pickupZone} из takeDeliver для адреса отправки) + ${pickupSteps} (шаги) × ${applicablePickupTariff.stepPrice} (stepPrice) = ${pickupBaseCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Базовая стоимость забора = ${applicablePickupTariff.startingPrice} (startingPrice из тарифной сетки зоны ${pickupZone} из takeDeliver для адреса отправки, шаги не применяются, так как ПВ ≤ unitFrom) = ${pickupBaseCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
          let pickupCostAfterSurcharge = pickupBaseCost;
          if (takeDeliverFrom.surcharge) {
            pickupCostAfterSurcharge = pickupBaseCost + takeDeliverFrom.surcharge;
            details.push({
              name: `Стоимость с надбавкой = ${pickupBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverFrom.surcharge} (surcharge из takeDeliver для адреса отправки) = ${pickupCostAfterSurcharge.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Надбавка surcharge не применяется (surcharge = 0 или отсутствует в takeDeliver для адреса отправки)`,
              cost: 0,
              isDetail: true
            });
          }
          let pickupCostAfterCoefficient = pickupCostAfterSurcharge;
          if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
            pickupCostAfterCoefficient = pickupCostAfterSurcharge * takeDeliverFrom.coefficientSurcharge;
            details.push({
              name: `Стоимость с коэффициентом = ${pickupCostAfterSurcharge.toFixed(2)} (стоимость ${takeDeliverFrom.surcharge ? "с надбавкой" : "базовая"}) × ${takeDeliverFrom.coefficientSurcharge} (coefficientSurcharge из takeDeliver для адреса отправки) = ${pickupCostAfterCoefficient.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Коэффициент coefficientSurcharge не применяется (coefficientSurcharge = ${takeDeliverFrom.coefficientSurcharge || 1} в takeDeliver для адреса отправки)`,
              cost: 0,
              isDetail: true
            });
          }
          if (totalMultiplier !== 1) {
            details.push({
              name: `Итоговая стоимость забора = ${pickupCostAfterCoefficient.toFixed(2)} (стоимость забора) × ${totalMultiplier.toFixed(2)} (коэффициенты ${hasAnyDangerousGoods ? "опасного груза 1.4" : "1"} × ${hasAnyTempControl ? "температурного режима 1.25" : "1"}) = ${pickupCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Итоговая стоимость забора = ${pickupCostAfterCoefficient.toFixed(2)} ₽ (коэффициенты опасного груза/температурного режима не применяются)`,
              cost: 0,
              isDetail: true
            });
          }
        }
      }
      if (deliveryCost > 0 && !isDeliveryAtTerminal && takeDeliverTo) {
        const deliveryZone = takeDeliverTo.tariffZone || "H";
        const deliveryTariffGrid = tariffGrids.value.filter((tg) => {
          const transportTypeUid2 = typeTransportation.uid;
          const transportTypeMatch = String(tg.transportType_uid) === String(transportTypeUid2);
          if (!transportTypeMatch) return false;
          const tgNumberZone = tg.NumberZone;
          const expectedZone = deliveryZone;
          if (tgNumberZone === expectedZone) return true;
          if (String(tgNumberZone).toUpperCase() === String(expectedZone).toUpperCase()) return true;
          const tgZoneNum = Number(tgNumberZone);
          const expectedZoneNum = Number(expectedZone);
          if (!isNaN(tgZoneNum) && !isNaN(expectedZoneNum) && tgZoneNum === expectedZoneNum) {
            return true;
          }
          return false;
        });
        const deliveryBaseCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
        const sortedDeliveryTariffGrid = [...deliveryTariffGrid].sort((a, b) => {
          const aFrom = parseFloat(a.unitFrom) || 0;
          const bFrom = parseFloat(b.unitFrom) || 0;
          return aFrom - bFrom;
        });
        let applicableDeliveryTariff = sortedDeliveryTariffGrid.find((tg) => {
          const unitFrom = parseFloat(tg.unitFrom) || 0;
          const unitTo = parseFloat(tg.unitTo) || Infinity;
          return totalPayableWeight >= unitFrom && totalPayableWeight <= unitTo;
        });
        if (!applicableDeliveryTariff && sortedDeliveryTariffGrid.length > 0) {
          const firstTariff = sortedDeliveryTariffGrid[0];
          const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
          if (totalPayableWeight < firstUnitFrom) {
            applicableDeliveryTariff = firstTariff;
          } else {
            applicableDeliveryTariff = sortedDeliveryTariffGrid[sortedDeliveryTariffGrid.length - 1];
          }
        }
        if (applicableDeliveryTariff) {
          const unitFrom = parseFloat(applicableDeliveryTariff.unitFrom) || 0;
          const step = parseFloat(applicableDeliveryTariff.step) || 1;
          const deliverySteps = totalPayableWeight > unitFrom ? Math.ceil((totalPayableWeight - unitFrom) / step) : 0;
          details.push({
            name: "ФОРМУЛА СТОИМОСТИ ДОСТАВКИ",
            cost: 0,
            isSubHeader: true
          });
          if (isCityWideDelivery) {
            details.push({
              name: "⚠️ Используется покрытие города (конкретный адрес не найден в системе)",
              cost: 0,
              isDetail: true
            });
          }
          if (step > 0 && totalPayableWeight > unitFrom) {
            const deliveryStepsCalculation = (totalPayableWeight - unitFrom) / step;
            details.push({
              name: `Расчет шагов: (${totalPayableWeight.toFixed(2)} (ПВ) - ${unitFrom} (unitFrom из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения)) / ${step} (step) = ${deliveryStepsCalculation.toFixed(2)}`,
              cost: 0,
              isDetail: true
            });
            details.push({
              name: `Количество шагов = округление вверх до целого числа = ${deliverySteps}`,
              cost: 0,
              isDetail: true
            });
            details.push({
              name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения) + ${deliverySteps} (шаги) × ${applicableDeliveryTariff.stepPrice} (stepPrice) = ${deliveryBaseCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else if (step === 0) {
            details.push({
              name: `Тарифная сетка имеет фиксированную цену (step = 0) для зоны ${deliveryZone}.`,
              cost: 0,
              isDetail: true
            });
            details.push({
              name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения, фиксированная цена) = ${deliveryBaseCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Платный вес (${totalPayableWeight.toFixed(2)} кг) равен минимальному весу (${unitFrom} кг) для зоны ${deliveryZone}. Используется минимальная стоимость (startingPrice).`,
              cost: 0,
              isDetail: true
            });
            details.push({
              name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone} из takeDeliver для адреса назначения, шаги не применяются, так как ПВ = unitFrom) = ${deliveryBaseCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
          let deliveryCostAfterSurcharge = deliveryBaseCost;
          if (takeDeliverTo.surcharge) {
            deliveryCostAfterSurcharge = deliveryBaseCost + takeDeliverTo.surcharge;
            details.push({
              name: `Стоимость с надбавкой = ${deliveryBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverTo.surcharge} (surcharge из takeDeliver для адреса назначения) = ${deliveryCostAfterSurcharge.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Надбавка surcharge не применяется (surcharge = 0 или отсутствует в takeDeliver для адреса назначения)`,
              cost: 0,
              isDetail: true
            });
          }
          let deliveryCostAfterCoefficient = deliveryCostAfterSurcharge;
          if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
            deliveryCostAfterCoefficient = deliveryCostAfterSurcharge * takeDeliverTo.coefficientSurcharge;
            details.push({
              name: `Стоимость с коэффициентом = ${deliveryCostAfterSurcharge.toFixed(2)} (стоимость ${takeDeliverTo.surcharge ? "с надбавкой" : "базовая"}) × ${takeDeliverTo.coefficientSurcharge} (coefficientSurcharge из takeDeliver для адреса назначения) = ${deliveryCostAfterCoefficient.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Коэффициент coefficientSurcharge не применяется (coefficientSurcharge = ${takeDeliverTo.coefficientSurcharge || 1} в takeDeliver для адреса назначения)`,
              cost: 0,
              isDetail: true
            });
          }
          if (totalMultiplier !== 1) {
            details.push({
              name: `Итоговая стоимость доставки = ${deliveryCostAfterCoefficient.toFixed(2)} (стоимость доставки) × ${totalMultiplier.toFixed(2)} (коэффициенты ${hasAnyDangerousGoods ? "опасного груза 1.4" : "1"} × ${hasAnyTempControl ? "температурного режима 1.25" : "1"}) = ${deliveryCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `Итоговая стоимость доставки = ${deliveryCostAfterCoefficient.toFixed(2)} ₽ (коэффициенты опасного груза/температурного режима не применяются)`,
              cost: 0,
              isDetail: true
            });
          }
        }
      }
      if (totalLoadingUnloadingCost > 0) {
        details.push({
          name: "ФОРМУЛА СТОИМОСТИ ПОГРУЗО-РАЗГРУЗОЧНЫХ РАБОТ",
          cost: 0,
          isSubHeader: true
        });
        if (loadingUnloadingCostPickup > 0 && departure.location && typeof departure.location === "object") {
          const fromLocality = localities.value.find((loc) => String(loc.id) === String(direction.fromLocalityId));
          const floor = parseInt(departure.location.floor) || 0;
          const noElevator = departure.location.noElevator || false;
          const rates = fromLocality == null ? void 0 : fromLocality.loadingUnloadingRates;
          const formulaParts2 = [];
          if (floor > 0) {
            const ratePerFloor = noElevator ? (rates == null ? void 0 : rates.perFloorWithoutElevator) || 0 : (rates == null ? void 0 : rates.perFloorWithElevator) || 0;
            if (ratePerFloor > 0) {
              const floorCost = floor * ratePerFloor;
              formulaParts2.push(`${floor} (этаж) × ${ratePerFloor.toFixed(2)} (цена за этаж ${noElevator ? "без лифта" : "с лифтом"}) = ${floorCost.toFixed(2)}`);
            }
          }
          if ((rates == null ? void 0 : rates.weightCoefficient) && totalPayableWeight > 0) {
            const weightCost = totalPayableWeight * rates.weightCoefficient;
            formulaParts2.push(`${totalPayableWeight.toFixed(2)} (платный вес, кг) × ${rates.weightCoefficient.toFixed(2)} (коэффициент веса) = ${weightCost.toFixed(2)}`);
          }
          if ((rates == null ? void 0 : rates.volumeCoefficient) && totalVolume > 0) {
            const volumeCost = totalVolume * rates.volumeCoefficient;
            formulaParts2.push(`${totalVolume.toFixed(3)} (объем, м³) × ${rates.volumeCoefficient.toFixed(2)} (коэффициент объема) = ${volumeCost.toFixed(2)}`);
          }
          if (formulaParts2.length > 0) {
            details.push({
              name: `Стоимость погрузки (пункт отправки, "${(fromLocality == null ? void 0 : fromLocality.name) || ""}") = ${formulaParts2.join(" + ")} = ${loadingUnloadingCostPickup.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
        }
        if (loadingUnloadingCostDelivery > 0 && destination.location && typeof destination.location === "object") {
          const toLocality = localities.value.find((loc) => String(loc.id) === String(direction.toLocalityId));
          const floor = parseInt(destination.location.floor) || 0;
          const noElevator = destination.location.noElevator || false;
          const rates = toLocality == null ? void 0 : toLocality.loadingUnloadingRates;
          const formulaParts2 = [];
          if (floor > 0) {
            const ratePerFloor = noElevator ? (rates == null ? void 0 : rates.perFloorWithoutElevator) || 0 : (rates == null ? void 0 : rates.perFloorWithElevator) || 0;
            if (ratePerFloor > 0) {
              const floorCost = floor * ratePerFloor;
              formulaParts2.push(`${floor} (этаж) × ${ratePerFloor.toFixed(2)} (цена за этаж ${noElevator ? "без лифта" : "с лифтом"}) = ${floorCost.toFixed(2)}`);
            }
          }
          if ((rates == null ? void 0 : rates.weightCoefficient) && totalPayableWeight > 0) {
            const weightCost = totalPayableWeight * rates.weightCoefficient;
            formulaParts2.push(`${totalPayableWeight.toFixed(2)} (платный вес, кг) × ${rates.weightCoefficient.toFixed(2)} (коэффициент веса) = ${weightCost.toFixed(2)}`);
          }
          if ((rates == null ? void 0 : rates.volumeCoefficient) && totalVolume > 0) {
            const volumeCost = totalVolume * rates.volumeCoefficient;
            formulaParts2.push(`${totalVolume.toFixed(3)} (объем, м³) × ${rates.volumeCoefficient.toFixed(2)} (коэффициент объема) = ${volumeCost.toFixed(2)}`);
          }
          if (formulaParts2.length > 0) {
            details.push({
              name: `Стоимость разгрузки (пункт назначения, "${(toLocality == null ? void 0 : toLocality.name) || ""}") = ${formulaParts2.join(" + ")} = ${loadingUnloadingCostDelivery.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
          if (destination.location.unpacking) ;
        }
        if (loadingUnloadingCostPickup > 0 && loadingUnloadingCostDelivery > 0) {
          details.push({
            name: `Итого погрузо-разгрузочные работы = ${loadingUnloadingCostPickup.toFixed(2)} (погрузка) + ${loadingUnloadingCostDelivery.toFixed(2)} (разгрузка) = ${totalLoadingUnloadingCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
        }
      }
      details.push({
        name: "ИТОГОВАЯ ФОРМУЛА",
        cost: 0,
        isSubHeader: true
      });
      const formulaParts = [];
      formulaParts.push(`${transportationCost.toFixed(2)} (стоимость перевозки)`);
      if (pickupCost > 0) {
        formulaParts.push(`${pickupCost.toFixed(2)} (стоимость забора)`);
      }
      if (deliveryCost > 0) {
        formulaParts.push(`${deliveryCost.toFixed(2)} (стоимость доставки)`);
      }
      if (additionalCosts > 0) {
        formulaParts.push(`${additionalCosts.toFixed(2)} (дополнительные услуги - упаковка)`);
      }
      if (totalLoadingUnloadingCost > 0) {
        formulaParts.push(`${totalLoadingUnloadingCost.toFixed(2)} (погрузо-разгрузочные работы)`);
      }
      details.push({
        name: `Стоимость без НДС = ${formulaParts.join(" + ")} = ${totalWithoutVAT.toFixed(2)} ₽`,
        cost: 0,
        isDetail: true
      });
      details.push({
        name: `НДС = ${totalWithoutVAT.toFixed(2)} (стоимость без НДС) × ${vatRate} (ставка НДС 5%) = ${vatAmount.toFixed(2)} ₽`,
        cost: 0,
        isDetail: true
      });
      details.push({
        name: `ИТОГО = ${totalWithoutVAT.toFixed(2)} (стоимость без НДС) + ${vatAmount.toFixed(2)} (НДС) = ${finalCost.toFixed(2)} ₽`,
        cost: 0,
        isDetail: true
      });
      details.push({ name: "КРАТКАЯ СВОДКА", cost: 0, isHeader: true });
      details.push({
        name: `Стоимость перевозки: ${transportationCost.toFixed(2)} ₽ (зона ${tariffZone.tariffZone} из tariffZones)`,
        cost: transportationCost
      });
      if (pickupCost > 0) {
        const pickupZone = (takeDeliverFrom == null ? void 0 : takeDeliverFrom.tariffZone) || "D";
        const pickupInfo = [`Стоимость забора: ${pickupCost.toFixed(2)} ₽ (зона ${pickupZone} из takeDeliver)`];
        if (takeDeliverFrom) {
          if (takeDeliverFrom.surcharge) {
            pickupInfo.push(`(включая surcharge ${takeDeliverFrom.surcharge} ₽)`);
          }
          if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
            pickupInfo.push(`(коэффициент ${takeDeliverFrom.coefficientSurcharge})`);
          }
        }
        details.push({
          name: pickupInfo.join(", "),
          cost: pickupCost
        });
      }
      if (deliveryCost > 0) {
        const deliveryZone = (takeDeliverTo == null ? void 0 : takeDeliverTo.tariffZone) || "H";
        const deliveryInfo2 = [`Стоимость доставки: ${deliveryCost.toFixed(2)} ₽ (зона ${deliveryZone} из takeDeliver)`];
        if (takeDeliverTo) {
          if (takeDeliverTo.surcharge) {
            deliveryInfo2.push(`(включая surcharge ${takeDeliverTo.surcharge} ₽)`);
          }
          if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
            deliveryInfo2.push(`(коэффициент ${takeDeliverTo.coefficientSurcharge})`);
          }
        }
        details.push({
          name: deliveryInfo2.join(", "),
          cost: deliveryCost
        });
      }
      if (totalMultiplier !== 1) {
        details.push({
          name: `Коэффициенты (опасный груз/температурный режим): ${totalMultiplier.toFixed(2)}`,
          cost: 0
        });
      }
      if (additionalCosts > 0) {
        details.push({
          name: `Дополнительные услуги (упаковка): ${additionalCosts.toFixed(2)} ₽`,
          cost: additionalCosts
        });
      }
      if (totalLoadingUnloadingCost > 0) {
        details.push({
          name: `Погрузо-разгрузочные работы: ${totalLoadingUnloadingCost.toFixed(2)} ₽`,
          cost: totalLoadingUnloadingCost
        });
      }
      details.push({
        name: `Стоимость без НДС: ${totalWithoutVAT.toFixed(2)} ₽`,
        cost: totalWithoutVAT
      });
      details.push({
        name: `НДС (5%): ${vatAmount.toFixed(2)} ₽`,
        cost: vatAmount
      });
      const deliveryInfo = {
        days: tariffZone.minTermDays + Math.ceil((tariffZone.maxTermDays - tariffZone.minTermDays) / 2),
        description: `${tariffZone.minTermDays}-${tariffZone.maxTermDays} дней`
      };
      return {
        tariff: typeTransportation,
        totalCost: finalCost,
        details,
        packageDetails,
        summary: {
          transportationCost,
          pickupCost,
          deliveryCost,
          additionalServices: additionalCosts,
          loadingUnloadingCost: totalLoadingUnloadingCost,
          totalWithoutVAT,
          vatAmount,
          distance: 0,
          multiplier: totalMultiplier
        },
        deliveryInfo,
        minDeliveryDate: null,
        distanceKm: null
      };
    }
    async function fetchData() {
      try {
        console.log("Начинаем загрузку данных...");
        const billingAddressesData = await apiService.getBillingAddressesWithRelations();
        console.log("billingAddresses загружены:", (billingAddressesData == null ? void 0 : billingAddressesData.length) || 0);
        const localitiesData = await apiService.getLocalitiesWithRelations();
        console.log("localities загружены:", (localitiesData == null ? void 0 : localitiesData.length) || 0);
        const transportTypesData = await apiService.getTransportTypes();
        console.log("transportTypes загружены:", (transportTypesData == null ? void 0 : transportTypesData.length) || 0);
        const tariffGridsData = await apiService.getTariffGrids();
        console.log("tariffGrids загружены:", (tariffGridsData == null ? void 0 : tariffGridsData.length) || 0);
        const tariffZonesData = await apiService.getTariffZones();
        console.log("tariffZones загружены:", (tariffZonesData == null ? void 0 : tariffZonesData.length) || 0);
        const takeDeliversData = await apiService.getTakeDelivers();
        console.log("takeDelivers загружены:", (takeDeliversData == null ? void 0 : takeDeliversData.length) || 0);
        const boxingsData = await apiService.getBoxings();
        console.log("boxings загружены:", (boxingsData == null ? void 0 : boxingsData.length) || 0);
        const unitsData = await apiService.getUnits();
        console.log("units загружены:", (unitsData == null ? void 0 : unitsData.length) || 0);
        const regionsData = await apiService.getRegions();
        console.log("regions загружены:", (regionsData == null ? void 0 : regionsData.length) || 0);
        const cargoOptionsData = await apiService.getCargoOptions();
        console.log("cargoOptions загружены:", (cargoOptionsData == null ? void 0 : cargoOptionsData.length) || 0);
        const terminalsData = await apiService.getTerminals();
        console.log("terminals загружены:", (terminalsData == null ? void 0 : terminalsData.length) || 0);
        billingAddresses.value = billingAddressesData || [];
        terminals.value = terminalsData || [];
        localities.value = localitiesData || [];
        transportTypes.value = transportTypesData || [];
        tariffGrids.value = tariffGridsData || [];
        tariffZones.value = tariffZonesData || [];
        takeDelivers.value = takeDeliversData || [];
        boxings.value = boxingsData || [];
        units.value = unitsData || [];
        regions.value = regionsData || [];
        cargoOptions.value = cargoOptionsData || [];
        console.log("Данные загружены:", {
          billingAddresses: billingAddresses.value.length,
          transportTypes: transportTypes.value.length,
          tariffGrids: tariffGrids.value.length,
          tariffZones: tariffZones.value.length,
          takeDelivers: takeDelivers.value.length,
          boxings: boxings.value.length,
          units: units.value.length,
          regions: regions.value.length,
          cargoOptions: cargoOptions.value.length
        });
        calculatorConfig.value = {
          packaging: boxings.value.map((box) => ({
            uid: box.id,
            typeBoxing: box.typeBoxing,
            uidUnit: box.uidUnit,
            price: box.price
          })),
          cargoOptions: cargoOptions.value.map((option) => ({
            id: option.id,
            name: option.name,
            description: option.description,
            type: option.type,
            defaultValue: option.defaultValue,
            costImpact: option.costImpact,
            costValue: option.costValue,
            multiplier: option.multiplier,
            enabled: option.enabled
          })),
          defaultValues: {
            cargo: {
              package: {
                length: "30",
                width: "20",
                height: "10",
                weight: "5",
                description: "Посылка",
                declaredValue: "",
                packagingItems: [],
                selfMarking: false,
                dangerousGoods: false,
                tempControl: false,
                quantity: 1
              }
            },
            delivery: {
              mode: "terminal",
              advanceBookingDays: 0
            }
          }
        };
        const urlParams = new URLSearchParams(window.location.search);
        const fromId = urlParams.get("from");
        const toId = urlParams.get("to");
        window.pendingAddresses = { fromId, toId };
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Ошибка загрузки данных. Проверьте подключение к интернету.");
      }
    }
    function deg2rad(num) {
      return num * Math.PI / 180;
    }
    function getDistanceKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    function isFormDataValid() {
      const { direction, cargo } = formData;
      if (!direction.from || !direction.to) return false;
      if (!direction.fromAddress || !direction.toAddress) return false;
      if (!cargo.packages || cargo.packages.length === 0) return false;
      for (const pkg of cargo.packages) {
        const length = parseFloat(pkg.length);
        const width = parseFloat(pkg.width);
        const height = parseFloat(pkg.height);
        const weight = parseFloat(pkg.weight);
        const quantity = parseInt(pkg.quantity);
        const volumeStr = pkg.volume !== null && pkg.volume !== void 0 && pkg.volume !== "" ? String(pkg.volume).trim() : "";
        const hasDirectVolume = volumeStr && quantity === 1;
        const directVolumeValid = hasDirectVolume && !isNaN(parseFloat(volumeStr)) && parseFloat(volumeStr) >= 0;
        if (!directVolumeValid) {
          if (!length || length <= 0) return false;
          if (!width || width <= 0) return false;
          if (!height || height <= 0) return false;
        }
        if (!weight || weight <= 0) return false;
        if (!quantity || quantity <= 0) return false;
      }
      return true;
    }
    const calculationResult = computed(() => {
      var _a, _b;
      console.log("calculationResult: Начало вычисления", {
        hasTransportTypes: !!transportTypes.value,
        from: formData.direction.from,
        to: formData.direction.to,
        fromAddress: formData.direction.fromAddress,
        toAddress: formData.direction.toAddress,
        showCalculator: showCalculator.value
      });
      if (!transportTypes.value || !formData.direction.from || !formData.direction.to) {
        console.log("calculationResult: Не заполнены города или нет типов транспорта");
        return {
          isValid: false,
          message: "Заполните города отправления и назначения",
          allTariffs: [],
          selectedTariff: null,
          calculation: null
        };
      }
      const isValid = isFormDataValid();
      console.log("calculationResult: Проверка валидности формы", {
        isValid,
        cargoPackages: ((_b = (_a = formData.cargo) == null ? void 0 : _a.packages) == null ? void 0 : _b.length) || 0
      });
      if (!isValid) {
        const missingFields = [];
        const { cargo } = formData;
        if (!cargo.packages || cargo.packages.length === 0) {
          missingFields.push("параметры груза (места)");
        } else {
          cargo.packages.forEach((pkg, index2) => {
            const placeNum = index2 + 1;
            const quantity = parseInt(pkg.quantity) || 0;
            const volumeStr = pkg.volume !== null && pkg.volume !== void 0 && pkg.volume !== "" ? String(pkg.volume).trim() : "";
            const hasDirectVolume = volumeStr && quantity === 1;
            const directVolumeValid = hasDirectVolume && !isNaN(parseFloat(volumeStr)) && parseFloat(volumeStr) >= 0;
            const hasLength = parseFloat(pkg.length) && parseFloat(pkg.length) > 0;
            const hasWidth = parseFloat(pkg.width) && parseFloat(pkg.width) > 0;
            const hasHeight = parseFloat(pkg.height) && parseFloat(pkg.height) > 0;
            const hasDimensions = hasLength && hasWidth && hasHeight;
            if (!directVolumeValid && !hasDimensions) {
              missingFields.push(`габариты или объем места ${placeNum}`);
            }
            if (!parseFloat(pkg.weight) || parseFloat(pkg.weight) <= 0) {
              missingFields.push(`вес места ${placeNum}`);
            }
            if (!quantity || quantity <= 0) {
              missingFields.push(`количество места ${placeNum}`);
            }
          });
        }
        return {
          isValid: false,
          message: missingFields.length > 0 ? `Для расчета необходимо заполнить обязательные поля: ${missingFields.join(", ")}` : "Для расчета необходимо заполнить все обязательные поля груза",
          allTariffs: [],
          selectedTariff: null,
          calculation: null
        };
      }
      console.log("calculationResult: Вызов getAllTariffsWithStatus");
      const allTariffs = getAllTariffsWithStatus();
      console.log("calculationResult: Получено тарифов", {
        total: allTariffs.length,
        available: allTariffs.filter((t) => t.isAvailable).length,
        unavailable: allTariffs.filter((t) => !t.isAvailable).length
      });
      const tariffCalculations = allTariffs.map((tariff) => {
        if (tariff.isAvailable) {
          console.log("calculationResult: Расчет стоимости для тарифа", tariff.name);
          const calculation = calculateTariffCost(tariff);
          console.log("calculationResult: Результат расчета", {
            tariff: tariff.name,
            hasCalculation: !!calculation,
            totalCost: (calculation == null ? void 0 : calculation.totalCost) || null
          });
          return {
            ...tariff,
            cost: calculation ? calculation.totalCost : null,
            details: calculation ? calculation.details : [],
            packageDetails: calculation ? calculation.packageDetails : [],
            summary: calculation ? calculation.summary : null,
            deliveryInfo: calculation ? calculation.deliveryInfo : null,
            minDeliveryDate: calculation ? calculation.minDeliveryDate : null,
            distanceKm: calculation ? calculation.distanceKm : null
          };
        } else {
          return {
            ...tariff,
            cost: null,
            details: [],
            summary: null,
            deliveryInfo: null,
            minDeliveryDate: null,
            distanceKm: null
          };
        }
      });
      const available = tariffCalculations.filter((t) => t.isAvailable).sort((a, b) => (a.cost || 0) - (b.cost || 0));
      const unavailable = tariffCalculations.filter((t) => !t.isAvailable);
      const basicTariff = available.find((t) => t.id === 1);
      const basicCost = basicTariff ? basicTariff.cost : null;
      const availableWithSavings = available.map((tariff, index2) => {
        let savingsAmount = 0;
        let isRecommended = false;
        if (basicCost && tariff.cost < basicCost) {
          savingsAmount = basicCost - tariff.cost;
          isRecommended = index2 === 0 && available.length > 1 && savingsAmount > 0;
        }
        return {
          ...tariff,
          savings: savingsAmount,
          isRecommended
        };
      });
      const allSorted = [...availableWithSavings, ...unavailable];
      let selectedTariff = null;
      if (formData.selectedTariff) {
        selectedTariff = availableWithSavings.find((t) => t.id === formData.selectedTariff);
      }
      if (!selectedTariff && availableWithSavings.length > 0) {
        selectedTariff = availableWithSavings[0];
        formData.selectedTariff = selectedTariff.id;
      }
      return {
        isValid: allSorted.length > 0,
        // Показываем интерфейс если есть любые тарифы (доступные или недоступные)
        message: availableWithSavings.length === 0 ? "Нет доступных тарифов для указанных параметров" : "",
        allTariffs: allSorted,
        selectedTariff,
        calculation: selectedTariff,
        distanceKm: (selectedTariff == null ? void 0 : selectedTariff.distanceKm) || null
      };
    });
    function printResult() {
      window.print();
    }
    function selectTariff(tariffUid) {
      formData.selectedTariff = tariffUid;
    }
    function handleCityNotFound(data) {
      console.log("City not found:", data);
      if (data.type === "from") {
        invalidFromCity.value = {
          city: data.city,
          locality: data.locality,
          region: data.region
        };
        formData.direction.fromAddress = null;
        formData.direction.fromLocalityId = null;
      } else if (data.type === "to") {
        invalidToCity.value = {
          city: data.city,
          locality: data.locality,
          region: data.region
        };
        formData.direction.toAddress = null;
        formData.direction.toLocalityId = null;
      }
    }
    function handleCityFound(data) {
      console.log("City found:", data);
      if (data.type === "from") {
        invalidFromCity.value = null;
      } else if (data.type === "to") {
        invalidToCity.value = null;
      }
    }
    function handleAddressNotFound(data) {
      console.log("Address not found:", data);
      if (data.type === "departure") {
        invalidFromAddress.value = {
          city: data.city,
          street: data.street,
          locality: data.locality,
          region: data.region
        };
      } else if (data.type === "destination") {
        invalidToAddress.value = {
          city: data.city,
          street: data.street,
          locality: data.locality,
          region: data.region
        };
      }
    }
    function handleAddressFound(data) {
      console.log("Address found:", data);
      if (data.type === "departure") {
        invalidFromAddress.value = null;
      } else if (data.type === "destination") {
        invalidToAddress.value = null;
      }
    }
    function handleManagerRequestCancel() {
      invalidFromCity.value = null;
      invalidToCity.value = null;
      invalidFromAddress.value = null;
      invalidToAddress.value = null;
    }
    function handleManagerRequestSubmit(formData2) {
      console.log("Manager request submitted:", formData2);
      alert("Запрос отправлен! Наш менеджер свяжется с вами в ближайшее время.");
      handleManagerRequestCancel();
    }
    function setAddressesFromParams() {
      if (!window.pendingAddresses) return;
      const { fromId, toId } = window.pendingAddresses;
      if (fromId) {
        const locality = localities.value.find((loc) => loc.id == fromId);
        if (locality) {
          formData.direction.fromAddress = locality;
          formData.direction.from = formatSelectedLocalityName(locality);
          formData.direction.fromLocalityId = locality.id;
        }
      }
      if (toId) {
        const locality = localities.value.find((loc) => String(loc.id) === String(toId));
        if (locality) {
          formData.direction.toAddress = locality;
          formData.direction.to = formatSelectedLocalityName(locality);
          formData.direction.toLocalityId = locality.id;
        }
      }
      delete window.pendingAddresses;
    }
    onMounted(async () => {
      await fetchData();
      setTimeout(() => {
        setAddressesFromParams();
      }, 100);
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[9] || (_cache[9] = createBaseVNode("div", { class: "title-wrapper mb-6" }, [
          createBaseVNode("h1", { class: "text-h3 mb-2 px-3 xl:px-0" }, "Калькулятор стоимости перевозки")
        ], -1)),
        createBaseVNode("div", _hoisted_1, [
          createVNode(_sfc_main$c, {
            billingAddresses: billingAddresses.value,
            modelValue: formData.direction,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.direction = $event),
            onCityNotFound: handleCityNotFound,
            onCityFound: handleCityFound
          }, null, 8, ["billingAddresses", "modelValue"])
        ]),
        !invalidFromCity.value && !invalidToCity.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[7] || (_cache[7] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Пункты доставки", -1)),
                createBaseVNode("div", _hoisted_6, [
                  formData.direction.from ? (openBlock(), createBlock(_sfc_main$3, {
                    key: 0,
                    title: "Пункт отправки",
                    "terminal-label": "Сдать на терминале",
                    "address-label": "Забрать по адресу",
                    "name-prefix": "departure",
                    city: formData.direction.from,
                    locality: formData.direction.fromAddress,
                    localities: [],
                    billingAddresses: billingAddresses.value,
                    terminals: terminals.value,
                    takeDelivers: takeDelivers.value,
                    transportTypes: transportTypes.value,
                    modelValue: formData.departure,
                    "onUpdate:modelValue": [
                      _cache[1] || (_cache[1] = ($event) => formData.departure = $event),
                      _cache[2] || (_cache[2] = (value) => {
                        console.log("CalculatorPage: Обновление departure", value);
                        formData.departure = value;
                      })
                    ],
                    onAddressNotFound: handleAddressNotFound,
                    onAddressFound: handleAddressFound
                  }, null, 8, ["city", "locality", "billingAddresses", "terminals", "takeDelivers", "transportTypes", "modelValue"])) : createCommentVNode("", true),
                  formData.direction.to ? (openBlock(), createBlock(_sfc_main$3, {
                    key: 1,
                    title: "Пункт назначения",
                    "terminal-label": "Получить на терминале",
                    "address-label": "Доставить по адресу",
                    "name-prefix": "destination",
                    city: formData.direction.to,
                    locality: formData.direction.toAddress,
                    localities: [],
                    billingAddresses: billingAddresses.value,
                    terminals: terminals.value,
                    takeDelivers: takeDelivers.value,
                    transportTypes: transportTypes.value,
                    modelValue: formData.destination,
                    "onUpdate:modelValue": [
                      _cache[3] || (_cache[3] = ($event) => formData.destination = $event),
                      _cache[4] || (_cache[4] = (value) => {
                        console.log("CalculatorPage: Обновление destination", value);
                        formData.destination = value;
                      })
                    ],
                    onAddressNotFound: handleAddressNotFound,
                    onAddressFound: handleAddressFound
                  }, null, 8, ["city", "locality", "billingAddresses", "terminals", "takeDelivers", "transportTypes", "modelValue"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$2, {
                    modelValue: formData.extraOptions,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.extraOptions = $event)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              createBaseVNode("div", _hoisted_7, [
                createVNode(_sfc_main$6, {
                  "calculator-config": calculatorConfig.value,
                  modelValue: formData.cargo,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => formData.cargo = $event)
                }, null, 8, ["calculator-config", "modelValue"])
              ])
            ]),
            createBaseVNode("div", _hoisted_8, [
              createVNode(CalculationResult, {
                result: calculationResult.value,
                "form-data": formData,
                "calculator-config": calculatorConfig.value,
                onPrint: printResult,
                onSelectTariff: selectTariff
              }, null, 8, ["result", "form-data", "calculator-config"])
            ])
          ])
        ])) : createCommentVNode("", true),
        (invalidFromCity.value || invalidToCity.value) && (((_a = formData.direction.from) == null ? void 0 : _a.trim()) || ((_b = formData.direction.to) == null ? void 0 : _b.trim())) ? (openBlock(), createElementBlock("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("p", _hoisted_11, [
              invalidFromCity.value ? (openBlock(), createElementBlock("span", _hoisted_12, "Выбранный город отправки не найден в системе.")) : createCommentVNode("", true),
              invalidToCity.value ? (openBlock(), createElementBlock("span", _hoisted_13, "Выбранный город назначения не найден в системе.")) : createCommentVNode("", true),
              _cache[8] || (_cache[8] = createTextVNode(" Заполните форму ниже, и наш менеджер свяжется с вами для уточнения деталей. "))
            ]),
            createVNode(ManagerRequestForm, {
              "prefill-region": managerRequestData.value.region,
              "prefill-locality": managerRequestData.value.locality,
              "prefill-street": managerRequestData.value.street,
              regions: availableRegions.value,
              localities: availableCities.value,
              onCancel: handleManagerRequestCancel,
              onSubmit: handleManagerRequestSubmit
            }, null, 8, ["prefill-region", "prefill-locality", "prefill-street", "regions", "localities"])
          ])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
};
const app = createApp(_sfc_main);
app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#calculator-app");
