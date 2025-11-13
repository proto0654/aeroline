import { r as ref, p as computed, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, t as toDisplayString, z as mergeProps, n as nextTick, V as renderSlot, b as createTextVNode, H as Fragment, I as renderList, q as watch, E as createVNode, C as normalizeClass, y as createBlock, w as withModifiers, v as onMounted, A as unref, Y as normalizeStyle, f as reactive, D as createApp } from "./chunks/runtime-dom.esm-bundler-cJ5wxxpw.js";
import { C as CheckboxInput, _ as _sfc_main$b } from "./chunks/CheckboxInput-BrPGLlrK.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { T as TextInput, F as Form, b as Field, E as ErrorMessage } from "./chunks/TextInput-okLtxo6B.js";
import { A as AutocompleteInput, a as formatSelectedLocalityName } from "./chunks/AutocompleteInput-Be-2lfM1.js";
import { l as lang, i as index } from "./chunks/ru.es-CeyHxouQ.js";
import { a as apiService } from "./chunks/apiService-WO6BkSV4.js";
import "./chunks/select-arrow-He2ejS2L.js";
const _hoisted_1$9 = ["for"];
const _hoisted_2$9 = { class: "relative text-input-vue" };
const _hoisted_3$8 = ["id", "value", "type", "placeholder", "disabled", "required"];
const _hoisted_4$8 = {
  key: 0,
  class: "text-brand-red absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
};
const _hoisted_5$6 = {
  key: 1,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main$a = {
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
        }, toDisplayString(__props.label), 9, _hoisted_1$9)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$9, [
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
          }), null, 16, _hoisted_3$8),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_4$8, "*")) : createCommentVNode("", true)
        ]),
        __props.hint ? (openBlock(), createElementBlock("p", _hoisted_5$6, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const CalculatorTextInput = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-f5165da5"]]);
const _hoisted_1$8 = { class: "flex items-start relative" };
const _hoisted_2$8 = { class: "flex items-center h-6 mt-1" };
const _hoisted_3$7 = ["id", "checked", "disabled", "required"];
const _hoisted_4$7 = ["for"];
const _sfc_main$9 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("input", mergeProps({
            id: inputId.value,
            type: "checkbox",
            checked: __props.modelValue,
            onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.checked)),
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, { class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" }), null, 16, _hoisted_3$7)
        ]),
        createBaseVNode("label", {
          for: inputId.value,
          class: "ml-2 select-none cursor-pointer"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ], 8, _hoisted_4$7)
      ]);
    };
  }
};
const CalculatorCheckboxInput = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-bcdd8af1"]]);
const _hoisted_1$7 = { class: "flex items-center gap-2 mb-4" };
const _hoisted_2$7 = { class: "text-sm font-medium text-gray-700" };
const _hoisted_3$6 = { class: "space-y-3" };
const _hoisted_4$6 = { class: "flex items-center gap-3" };
const _hoisted_5$5 = ["id", "checked", "onChange"];
const _hoisted_6$4 = ["for"];
const _hoisted_7$4 = {
  key: 0,
  class: "flex items-center gap-2"
};
const _hoisted_8$2 = { class: "text-sm text-gray-500" };
const _hoisted_9$2 = { class: "flex items-center border border-gray-300 rounded-lg overflow-hidden" };
const _hoisted_10$2 = ["disabled", "onClick"];
const _hoisted_11$2 = { class: "px-3 py-1 bg-white text-center min-w-[40px] text-sm" };
const _hoisted_12$2 = ["onClick"];
const _sfc_main$8 = {
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
        createBaseVNode("div", _hoisted_1$7, [
          createBaseVNode("label", _hoisted_2$7, toDisplayString(__props.label), 1),
          _cache[0] || (_cache[0] = createBaseVNode("span", {
            class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
            "data-tip": "Выберите необходимые типы упаковки. Вы можете заказать несколько типов одновременно. Стоимость упаковки будет добавлена к общей стоимости доставки."
          }, [
            createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_3$6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
            return openBlock(), createElementBlock("div", {
              key: option.value,
              class: "flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            }, [
              createBaseVNode("div", _hoisted_4$6, [
                createBaseVNode("input", {
                  id: `${__props.name}_${option.value}`,
                  type: "checkbox",
                  checked: isSelected(option.value),
                  onChange: ($event) => toggleSelection(option.value),
                  class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                }, null, 40, _hoisted_5$5),
                createBaseVNode("label", {
                  for: `${__props.name}_${option.value}`,
                  class: "text-sm font-medium text-gray-700 cursor-pointer"
                }, toDisplayString(option.label), 9, _hoisted_6$4)
              ]),
              isSelected(option.value) ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
                createBaseVNode("span", _hoisted_8$2, toDisplayString(getUnitLabel(option.value)), 1),
                createBaseVNode("div", _hoisted_9$2, [
                  createBaseVNode("button", {
                    type: "button",
                    class: "px-3 py-1 text-gray-700 hover:bg-brand-blue hover:text-white disabled:bg-gray-100 disabled:text-gray-300",
                    disabled: getQuantity(option.value) <= 1,
                    onClick: ($event) => decrementQuantity(option.value)
                  }, " − ", 8, _hoisted_10$2),
                  createBaseVNode("span", _hoisted_11$2, toDisplayString(getQuantity(option.value)), 1),
                  createBaseVNode("button", {
                    type: "button",
                    class: "px-3 py-1 text-gray-700 hover:bg-brand-blue hover:text-white",
                    onClick: ($event) => incrementQuantity(option.value)
                  }, " + ", 8, _hoisted_12$2)
                ])
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
};
const PackagingSelector = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-6f38001a"]]);
const _hoisted_1$6 = { class: "flex flex-col gap-4" };
const _hoisted_2$6 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4 [&_.text-input-vue>input]:text-center" };
const _hoisted_3$5 = { class: "bg-gray-200 rounded-lg p-4 text-gray-500 text-lg" };
const _hoisted_4$5 = { class: "flex items-center gap-4" };
const _hoisted_5$4 = {
  key: 0,
  class: "flex items-center gap-2 flex-shrink-0"
};
const _hoisted_6$3 = { class: "flex items-center border border-gray-300 rounded-lg overflow-hidden" };
const _hoisted_7$3 = ["disabled"];
const _hoisted_8$1 = { class: "px-4 py-2 bg-white text-center min-w-[60px]" };
const _hoisted_9$1 = { class: "border-t border-gray-200 pt-4 flex flex-col gap-4" };
const _hoisted_10$1 = { class: "flex flex-col gap-3" };
const _hoisted_11$1 = { class: "flex items-start gap-2" };
const _hoisted_12$1 = { class: "flex items-start gap-2" };
const _hoisted_13$1 = { class: "flex items-start gap-2" };
const _sfc_main$7 = {
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
    watch([length, width, height, weight, description, declaredValue, packagingItems, selfMarking, dangerousGoods, tempControl, quantity], () => {
      emit("update:modelValue", {
        id: id.value,
        length: length.value,
        width: width.value,
        height: height.value,
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
      if (length.value && width.value && height.value) {
        return (length.value * width.value * height.value / 1e6).toFixed(3);
      }
      return "0.000";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$6, [
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
        createBaseVNode("div", _hoisted_3$5, "Объём, куб.м: " + toDisplayString(calculatedVolume.value), 1),
        createBaseVNode("div", _hoisted_4$5, [
          createVNode(CalculatorTextInput, {
            name: `pkg_${id.value}_weight`,
            placeholder: "Вес, кг",
            modelValue: weight.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => weight.value = $event),
            type: "number",
            class: "flex-1",
            "display-prefix": "Вес",
            "display-suffix": "кг",
            "show-formatted-when-blurred": true
          }, null, 8, ["name", "modelValue"]),
          __props.showDuplicateButton ? (openBlock(), createElementBlock("div", _hoisted_5$4, [
            _cache[10] || (_cache[10] = createBaseVNode("span", { class: "text-sm text-gray-600" }, "Одинаковые места", -1)),
            createBaseVNode("div", _hoisted_6$3, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["px-3 py-2", quantity.value <= 1 ? "bg-gray-100 text-gray-300" : "text-gray-700 hover:bg-brand-blue hover:text-white"]),
                onClick: decrementQuantity,
                disabled: quantity.value <= 1
              }, "−", 10, _hoisted_7$3),
              createBaseVNode("span", _hoisted_8$1, toDisplayString(quantity.value), 1),
              createBaseVNode("button", {
                type: "button",
                class: "px-3 py-2 bg-gray-100 hover:bg-brand-blue text-gray-700 hover:text-white",
                onClick: incrementQuantity
              }, "+")
            ])
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_9$1, [
          createBaseVNode("div", null, [
            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
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
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => description.value = $event)
            }, null, 8, ["name", "modelValue"])
          ]),
          createBaseVNode("div", null, [
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
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
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => declaredValue.value = $event),
              type: "number",
              "display-suffix": "₽",
              "show-formatted-when-blurred": true
            }, null, 8, ["name", "modelValue"])
          ]),
          createVNode(PackagingSelector, {
            name: `pkg_${id.value}_packaging`,
            options: packagingOptions.value,
            modelValue: packagingItems.value,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => packagingItems.value = $event)
          }, null, 8, ["name", "options", "modelValue"]),
          createBaseVNode("div", _hoisted_10$1, [
            createBaseVNode("div", _hoisted_11$1, [
              createVNode(CalculatorCheckboxInput, {
                name: `pkg_${id.value}_self_marking`,
                label: "Самостоятельная маркировка груза",
                modelValue: selfMarking.value,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => selfMarking.value = $event)
              }, null, 8, ["name", "modelValue"]),
              _cache[13] || (_cache[13] = createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "Если вы самостоятельно промаркировали груз штрихкодом или QR-кодом согласно нашим требованиям."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_12$1, [
              createVNode(CalculatorCheckboxInput, {
                name: `pkg_${id.value}_dangerous`,
                label: "Есть опасный груз",
                modelValue: dangerousGoods.value,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => dangerousGoods.value = $event)
              }, null, 8, ["name", "modelValue"]),
              _cache[14] || (_cache[14] = createBaseVNode("span", {
                class: "tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center",
                "data-tip": "Отметьте, если груз содержит опасные вещества (легковоспламеняющиеся, токсичные, коррозионные материалы). Требуется специальная документация."
              }, [
                createBaseVNode("span", { class: "inline-flex items-center justify-center w-5 h-5 text-sm border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100" }, "?")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_13$1, [
              createVNode(CalculatorCheckboxInput, {
                name: `pkg_${id.value}_temp`,
                label: "Требуется температурный режим",
                modelValue: tempControl.value,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => tempControl.value = $event)
              }, null, 8, ["name", "modelValue"]),
              _cache[15] || (_cache[15] = createBaseVNode("span", {
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
const CargoPlaceForm = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-d3da6083"]]);
const _hoisted_1$5 = { class: "w-full" };
const _hoisted_2$5 = { class: "flex gap-2 mb-4 justify-between items-start" };
const _hoisted_3$4 = { class: "overflow-x-auto flex gap-2 flex-1 min-w-0 rounded-lg" };
const _hoisted_4$4 = ["onClick"];
const _hoisted_5$3 = { class: "px-5" };
const _hoisted_6$2 = {
  key: 0,
  class: ""
};
const _hoisted_7$2 = ["onClick"];
const _sfc_main$6 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("div", _hoisted_3$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(packages.value, (pkg, idx) => {
              return openBlock(), createElementBlock("button", {
                key: pkg.id,
                class: normalizeClass(["tab tab-bordered !flex flex-nowrap whitespace-nowrap text-lg flex-shrink-0 bg-white hover:border-brand-blue hover:text-brand-blue", { "[&.tab-active]:bg-brand-gray [&.tab-active]:hover:bg-brand-blue hover:text-white tab-active text-white": idx === activeIndex.value }]),
                onClick: ($event) => setActive(idx)
              }, [
                createBaseVNode("span", _hoisted_5$3, [
                  createTextVNode(toDisplayString(idx + 1) + " место ", 1),
                  pkg.quantity && pkg.quantity > 1 ? (openBlock(), createElementBlock("span", _hoisted_6$2, "(×" + toDisplayString(pkg.quantity) + ")", 1)) : createCommentVNode("", true)
                ]),
                packages.value.length > 1 ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  onClick: withModifiers(($event) => remove(idx), ["stop"]),
                  class: "absolute px-3 mb-[1px] py-4 right-0 top-1/2 -translate-y-1/2 ml-2 text-gray-400 hover:text-red-500 text-3xl leading-[0] h-full flex flex-col justify-center"
                }, "×", 8, _hoisted_7$2)) : createCommentVNode("", true)
              ], 10, _hoisted_4$4);
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
const _hoisted_1$4 = { class: "card items-stretch" };
const _hoisted_2$4 = { class: "flex border border-gray-200 rounded-lg p-1 mb-4 w-full" };
const _hoisted_3$3 = {
  key: 0,
  class: "flex flex-col gap-4"
};
const _hoisted_4$3 = {
  key: 1,
  class: "flex flex-col gap-4"
};
const _sfc_main$5 = {
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
      return openBlock(), createElementBlock("section", _hoisted_1$4, [
        _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Параметры груза", -1)),
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => setMode("total"), ["prevent"])),
            class: normalizeClass(["flex-1 py-4 uppercase text-caps-regular px-4 rounded-md", mode.value === "total" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Общий вес и объём ", 2),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => setMode("individual"), ["prevent"])),
            class: normalizeClass(["flex-1 py-4 uppercase text-caps-regular px-4 rounded-md", mode.value === "individual" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Места по-отдельности ", 2)
        ]),
        mode.value === "individual" ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
          createVNode(_sfc_main$6, {
            modelValue: individualState.value.packages,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => individualState.value.packages = $event),
            "calculator-config": __props.calculatorConfig
          }, null, 8, ["modelValue", "calculator-config"])
        ])) : createCommentVNode("", true),
        mode.value === "total" ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
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
const _sfc_main$4 = {
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
      return openBlock(), createElementBlock("div", null, [
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
const DatePickerVue = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6089db1b"]]);
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
const _hoisted_1$3 = { class: "card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$3 = { class: "text-h4 font-bold mb-4" };
const _hoisted_3$2 = { class: "flex border border-gray-200 rounded-lg p-1 mb-4" };
const _hoisted_4$2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_5$2 = { class: "w-full" };
const _sfc_main$3 = {
  __name: "DeliveryPointForm",
  props: {
    title: { type: String, required: true },
    terminalLabel: { type: String, required: true },
    addressLabel: { type: String, required: true },
    city: { type: String, required: true },
    billingAddresses: { type: Array, required: true },
    modelValue: { type: Object, required: true },
    namePrefix: { type: String, required: true }
    // e.g., 'departure' or 'destination'
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let isUpdatingFromParent = false;
    const terminalInputRef = ref(null);
    const addressInputRef = ref(null);
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
        text: ""
        // Введенный адрес
      }
    });
    const location = computed({
      get() {
        let value;
        if (deliveryMode.value === "terminal") {
          value = state.value.terminal.displayText || state.value.terminal.searchText || "";
        } else {
          value = state.value.address.text || "";
        }
        console.log("DeliveryPointForm: location getter", {
          deliveryMode: deliveryMode.value,
          value,
          state: state.value,
          terminalDisplayText: state.value.terminal.displayText,
          terminalSearchText: state.value.terminal.searchText,
          addressText: state.value.address.text
        });
        return value;
      },
      set(newValue) {
        if (isUpdatingFromParent) return;
        console.log("DeliveryPointForm: location setter", {
          newValue,
          deliveryMode: deliveryMode.value,
          state: state.value
        });
        if (deliveryMode.value === "terminal") {
          state.value.terminal.searchText = newValue;
          if (newValue && !state.value.terminal.selectedPVZ) {
            state.value.terminal.selectedPVZ = null;
            state.value.terminal.displayText = "";
          }
        } else {
          state.value.address.text = newValue;
        }
        emitCurrentState();
      }
    });
    function emitCurrentState() {
      let currentLocation;
      if (deliveryMode.value === "terminal") {
        currentLocation = state.value.terminal.selectedPVZ || state.value.terminal.searchText;
      } else {
        currentLocation = state.value.address.text;
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
      deliveryMode.value = modelValue.deliveryMode || "terminal";
      date.value = modelValue.date || "";
      if (modelValue.location && typeof modelValue.location === "object" && modelValue.location.street && modelValue.location.phone) {
        state.value.terminal.selectedPVZ = modelValue.location;
        state.value.terminal.displayText = formatPVZName(modelValue.location);
        state.value.terminal.searchText = "";
        console.log("DeliveryPointForm: Инициализирован ПВЗ", state.value.terminal);
      } else if (typeof modelValue.location === "string" && modelValue.location.trim()) {
        if (deliveryMode.value === "terminal") {
          state.value.terminal.searchText = modelValue.location;
          state.value.terminal.displayText = "";
          state.value.terminal.selectedPVZ = null;
          console.log("DeliveryPointForm: Инициализирован терминал (строка)", state.value.terminal);
        } else {
          state.value.address.text = modelValue.location;
          console.log("DeliveryPointForm: Инициализирован адрес (строка)", state.value.address);
        }
      }
    }
    const terminalOptions = computed(() => {
      if (!props.city) return [];
      const filtered = props.billingAddresses.filter((addr) => {
        if (addr.locality && typeof addr.locality === "object") {
          return addr.locality.name === props.city;
        }
        return addr.locality === props.city;
      });
      return filtered;
    });
    function onTerminalSelected(address) {
      if (isUpdatingFromParent) return;
      state.value.terminal.selectedPVZ = address;
      state.value.terminal.displayText = formatPVZName(address);
      state.value.terminal.searchText = "";
      console.log("DeliveryPointForm: Выбран ПВЗ", state.value.terminal);
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
      } else {
        state.value.address.text = "";
      }
      emitCurrentState();
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
        state: state.value
      });
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
        if (state.value.address.text) {
          console.log("DeliveryPointForm: Восстанавливаем сохраненный адрес:", state.value.address.text);
        }
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
        } else if (newMode === "address" && addressInputRef.value) {
          const addressValue = state.value.address.text || "";
          console.log("DeliveryPointForm: Принудительно устанавливаем значение адреса:", addressValue);
          if (addressValue !== location.value) {
            location.value = addressValue;
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
      if (newValue.location && typeof newValue.location === "object" && newValue.location.street && newValue.location.phone) {
        state.value.terminal.selectedPVZ = newValue.location;
        state.value.terminal.displayText = formatPVZName(newValue.location);
        state.value.terminal.searchText = "";
        console.log("DeliveryPointForm: Обновлен ПВЗ", state.value.terminal);
      } else if (typeof newValue.location === "string") {
        if (newDeliveryMode === "terminal") {
          state.value.terminal.searchText = newValue.location;
          state.value.terminal.displayText = "";
          if (!newValue.location.trim()) {
            state.value.terminal.selectedPVZ = null;
          }
          console.log("DeliveryPointForm: Обновлен терминал (строка)", state.value.terminal);
        } else {
          state.value.address.text = newValue.location;
          console.log("DeliveryPointForm: Обновлен адрес (строка)", state.value.address);
        }
      } else if (!newValue.location) {
        if (newDeliveryMode === "terminal") {
          state.value.terminal.selectedPVZ = null;
          state.value.terminal.displayText = "";
          state.value.terminal.searchText = "";
        } else {
          state.value.address.text = "";
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
        createBaseVNode("div", _hoisted_3$2, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => deliveryMode.value = "terminal", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", deliveryMode.value === "terminal" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, toDisplayString(__props.terminalLabel), 3),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => deliveryMode.value = "address", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", deliveryMode.value === "address" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, toDisplayString(__props.addressLabel), 3)
        ]),
        createBaseVNode("div", _hoisted_4$2, [
          createBaseVNode("div", {
            style: normalizeStyle({ display: deliveryMode.value === "terminal" ? "block" : "none" })
          }, [
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
          ], 4),
          createBaseVNode("div", {
            style: normalizeStyle({ display: deliveryMode.value === "address" ? "block" : "none" })
          }, [
            createVNode(TextInput, {
              ref_key: "addressInputRef",
              ref: addressInputRef,
              name: `${__props.namePrefix}_pickup_address`,
              label: "Адрес",
              placeholder: "Укажите адрес",
              disabled: !__props.city,
              modelValue: location.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => location.value = $event)
            }, null, 8, ["name", "disabled", "modelValue"])
          ], 4),
          createBaseVNode("div", _hoisted_5$2, [
            _cache[4] || (_cache[4] = createBaseVNode("label", { class: "block text-brand-gray font-medium mb-2" }, " Дата ", -1)),
            createVNode(DatePickerVue, {
              name: `${__props.namePrefix}_date`,
              "initial-date": date.value,
              disabled: !__props.city,
              placeholder: "Выберите дату",
              "onUpdate:date": onDateChange
            }, null, 8, ["name", "initial-date", "disabled"])
          ])
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
const _hoisted_1$1 = { class: "h-fit card" };
const _hoisted_2$1 = {
  key: 0,
  class: "text-gray-500"
};
const _hoisted_3$1 = {
  key: 0,
  class: "font-medium text-gray-700 mb-2"
};
const _hoisted_4$1 = { key: 1 };
const _hoisted_5$1 = {
  key: 2,
  class: "mt-3 text-sm text-gray-400"
};
const _hoisted_6$1 = { key: 1 };
const _hoisted_7$1 = { class: "border-b pb-4 mb-4" };
const _hoisted_8 = { class: "flex items-center justify-between mb-4" };
const _hoisted_9 = { class: "text-left" };
const _hoisted_10 = { class: "font-semibold text-base" };
const _hoisted_11 = { class: "text-sm text-gray-500" };
const _hoisted_12 = { class: "text-right" };
const _hoisted_13 = { class: "font-semibold text-base" };
const _hoisted_14 = { class: "text-sm text-gray-500" };
const _hoisted_15 = { class: "grid grid-cols-3 gap-4 text-center" };
const _hoisted_16 = { class: "text-2xl font-bold text-gray-800" };
const _hoisted_17 = { class: "text-sm text-gray-600" };
const _hoisted_18 = { class: "text-2xl font-bold text-gray-800" };
const _hoisted_19 = { class: "text-2xl font-bold text-gray-800" };
const _hoisted_20 = {
  key: 0,
  class: "mt-2 text-center"
};
const _hoisted_21 = { class: "text-lg font-bold text-gray-900" };
const _hoisted_22 = {
  key: 0,
  class: "border-b pb-4 mb-4"
};
const _hoisted_23 = { class: "flex justify-between items-center mb-2" };
const _hoisted_24 = { class: "font-bold text-lg" };
const _hoisted_25 = { class: "font-bold text-lg" };
const _hoisted_26 = { class: "text-sm text-gray-500 mb-3" };
const _hoisted_27 = {
  key: 0,
  class: "text-sm text-blue-600 mb-2"
};
const _hoisted_28 = { key: 0 };
const _hoisted_29 = {
  key: 1,
  class: "text-sm text-green-600 mb-3"
};
const _hoisted_30 = {
  key: 1,
  class: "space-y-4 mb-6"
};
const _hoisted_31 = ["onClick"];
const _hoisted_32 = { class: "flex justify-between items-start mb-2 relative" };
const _hoisted_33 = { class: "flex-1" };
const _hoisted_34 = { class: "font-semibold text-gray-800 flex items-center gap-2" };
const _hoisted_35 = {
  key: 0,
  class: "absolute top-0 right-0 left-auto -translate-y-7 translate-x-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
};
const _hoisted_36 = { class: "text-sm text-gray-600 mb-1" };
const _hoisted_37 = { class: "text-xs text-gray-500 mb-1" };
const _hoisted_38 = { key: 0 };
const _hoisted_39 = { key: 1 };
const _hoisted_40 = {
  key: 0,
  class: "text-xs text-red-500 mb-1 font-medium"
};
const _hoisted_41 = {
  key: 1,
  class: "mt-1 text-sm text-blue-600"
};
const _hoisted_42 = { key: 0 };
const _hoisted_43 = { class: "text-right" };
const _hoisted_44 = {
  key: 0,
  class: "text-xl font-bold text-gray-800"
};
const _hoisted_45 = {
  key: 1,
  class: "text-xl font-bold text-gray-400"
};
const _hoisted_46 = {
  key: 0,
  class: "mt-3 pt-3 border-t border-gray-200"
};
const _hoisted_47 = ["onClick"];
const _hoisted_48 = {
  key: 0,
  class: "mt-3 space-y-1 text-sm animate-fade-in"
};
const _hoisted_49 = { key: 0 };
const _hoisted_50 = {
  key: 0,
  class: "border-t pt-2 mt-2"
};
const _hoisted_51 = { class: "flex justify-between" };
const _hoisted_52 = { class: "font-medium" };
const _hoisted_53 = {
  key: 0,
  class: "flex justify-between"
};
const _hoisted_54 = { class: "font-medium" };
const _hoisted_55 = {
  key: 2,
  class: "border-t pt-4"
};
const _hoisted_56 = {
  key: 0,
  class: "text-sm space-y-1 mb-3"
};
const _hoisted_57 = {
  key: 0,
  class: "flex justify-between text-gray-600"
};
const _hoisted_58 = {
  key: 1,
  class: "flex justify-between text-gray-600"
};
const _hoisted_59 = {
  key: 2,
  class: "flex justify-between text-gray-600"
};
const _hoisted_60 = {
  key: 3,
  class: "flex justify-between text-gray-600"
};
const _hoisted_61 = {
  key: 4,
  class: "flex justify-between text-gray-600 border-t pt-1"
};
const _hoisted_62 = {
  key: 5,
  class: "flex justify-between text-gray-600"
};
const _hoisted_63 = { class: "flex justify-between items-center font-bold text-lg border-t pt-3" };
const _hoisted_64 = { class: "text-xl" };
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
    function formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", _hoisted_1$1, [
        _cache[23] || (_cache[23] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Стоимость перевозки", -1)),
        !__props.result || !__props.result.isValid ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          __props.result && __props.result.message ? (openBlock(), createElementBlock("p", _hoisted_3$1, toDisplayString(__props.result.message), 1)) : (openBlock(), createElementBlock("p", _hoisted_4$1, "Заполните все обязательные поля, чтобы увидеть стоимость перевозки.")),
          !__props.result || !__props.result.message ? (openBlock(), createElementBlock("div", _hoisted_5$1, _cache[1] || (_cache[1] = [
            createBaseVNode("p", null, "Необходимо указать:", -1),
            createBaseVNode("ul", { class: "list-disc list-inside mt-1 space-y-1" }, [
              createBaseVNode("li", null, "Города отправления и назначения"),
              createBaseVNode("li", null, "Параметры груза (размеры и вес)"),
              createBaseVNode("li", null, "Пункты отправки и получения"),
              createBaseVNode("li", null, "Дату отправки")
            ], -1)
          ]))) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock("div", _hoisted_6$1, [
          createBaseVNode("div", _hoisted_7$1, [
            _cache[6] || (_cache[6] = createBaseVNode("h3", { class: "text-lg font-semibold mb-3 text-gray-700" }, "Параметры расчёта", -1)),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("div", _hoisted_10, toDisplayString(routeInfo.value.from), 1),
                createBaseVNode("div", _hoisted_11, toDisplayString(routeInfo.value.fromDetails), 1)
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
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, toDisplayString(routeInfo.value.to), 1),
                createBaseVNode("div", _hoisted_14, toDisplayString(routeInfo.value.toDetails), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_16, toDisplayString(cargoInfo.value.count), 1),
                createBaseVNode("div", _hoisted_17, toDisplayString(cargoInfo.value.countLabel), 1)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_18, toDisplayString(cargoInfo.value.weight), 1),
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-sm text-gray-600" }, "кг", -1))
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_19, toDisplayString(cargoInfo.value.volume), 1),
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-sm text-gray-600" }, "куб.м", -1))
              ])
            ]),
            __props.result.distanceKm ? (openBlock(), createElementBlock("div", _hoisted_20, [
              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-base text-gray-700 font-medium" }, "Расстояние: ", -1)),
              createBaseVNode("span", _hoisted_21, toDisplayString(Math.round(__props.result.distanceKm)) + " км", 1)
            ])) : createCommentVNode("", true)
          ]),
          __props.result.selectedTariff ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createBaseVNode("div", _hoisted_23, [
              createBaseVNode("span", _hoisted_24, toDisplayString(__props.result.selectedTariff.name), 1),
              createBaseVNode("span", _hoisted_25, toDisplayString(formatCurrency(__props.result.selectedTariff.cost)), 1)
            ]),
            createBaseVNode("div", _hoisted_26, toDisplayString(__props.result.selectedTariff.description), 1),
            __props.result.selectedTariff.deliveryInfo ? (openBlock(), createElementBlock("div", _hoisted_27, [
              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "font-medium" }, "Время доставки:", -1)),
              createTextVNode(" " + toDisplayString(__props.result.selectedTariff.deliveryInfo.description) + " ", 1),
              __props.result.selectedTariff.deliveryInfo.days ? (openBlock(), createElementBlock("span", _hoisted_28, " (" + toDisplayString(__props.result.selectedTariff.deliveryInfo.days) + " дн.)", 1)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            __props.result.selectedTariff.minDeliveryDate ? (openBlock(), createElementBlock("div", _hoisted_29, [
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "font-medium" }, "Минимальная дата доставки:", -1)),
              createTextVNode(" " + toDisplayString(formatDate(__props.result.selectedTariff.minDeliveryDate.date)), 1)
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          __props.result.allTariffs && __props.result.allTariffs.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_30, [
            _cache[14] || (_cache[14] = createBaseVNode("h3", { class: "text-lg font-semibold text-gray-800" }, "Все тарифы:", -1)),
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
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("div", _hoisted_33, [
                    createBaseVNode("h4", _hoisted_34, [
                      createTextVNode(toDisplayString(tariff.fullName) + " ", 1),
                      tariff.isAvailable && tariff.isRecommended ? (openBlock(), createElementBlock("span", _hoisted_35, " Экономия " + toDisplayString(Math.round(tariff.savings)) + " ₽. Рекомендуем! ", 1)) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("p", _hoisted_36, toDisplayString(tariff.description || tariff.name || "Доставка груза"), 1),
                    createBaseVNode("ul", _hoisted_37, [
                      tariff.transportationCoefficient ? (openBlock(), createElementBlock("li", _hoisted_38, "Коэффициент перевозки: " + toDisplayString(tariff.transportationCoefficient), 1)) : createCommentVNode("", true),
                      tariff.deliveryInfo ? (openBlock(), createElementBlock("li", _hoisted_39, "Время доставки: " + toDisplayString(tariff.deliveryInfo.description), 1)) : createCommentVNode("", true)
                    ]),
                    !tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_40, " Недоступно: " + toDisplayString(tariff.reason), 1)) : createCommentVNode("", true),
                    tariff.deliveryInfo ? (openBlock(), createElementBlock("div", _hoisted_41, [
                      _cache[9] || (_cache[9] = createBaseVNode("span", { class: "font-medium" }, "Время доставки:", -1)),
                      createTextVNode(" " + toDisplayString(tariff.deliveryInfo.description) + " ", 1),
                      tariff.deliveryInfo.days ? (openBlock(), createElementBlock("span", _hoisted_42, " (" + toDisplayString(tariff.deliveryInfo.days) + " дн.)", 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_43, [
                    tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_44, toDisplayString(tariff.cost ? Math.round(tariff.cost).toLocaleString() : "0") + " ₽", 1)) : (openBlock(), createElementBlock("div", _hoisted_45, "—"))
                  ])
                ]),
                tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_46, [
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
                    }, _cache[10] || (_cache[10] = [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M19 9l-7 7-7-7"
                      }, null, -1)
                    ]), 2))
                  ], 8, _hoisted_47),
                  expandedTariffs.value.includes(tariff.id) && tariff.details ? (openBlock(), createElementBlock("div", _hoisted_48, [
                    _cache[13] || (_cache[13] = createBaseVNode("h5", { class: "font-medium text-gray-700 mb-2" }, "Детализация расчета:", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(tariff.details, (detail) => {
                      return openBlock(), createElementBlock("div", {
                        key: detail.name,
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
                        !detail.isHeader && !detail.isSubHeader && !detail.isDetail && detail.cost !== 0 ? (openBlock(), createElementBlock("span", _hoisted_49, toDisplayString(detail.cost < 0 ? "" : "+") + toDisplayString(formatCurrency(detail.cost)), 1)) : createCommentVNode("", true)
                      ], 2);
                    }), 128)),
                    tariff.deliveryInfo ? (openBlock(), createElementBlock("div", _hoisted_50, [
                      createBaseVNode("div", _hoisted_51, [
                        _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-gray-600" }, "Время доставки:", -1)),
                        createBaseVNode("span", _hoisted_52, toDisplayString(tariff.deliveryInfo.days) + " дн.", 1)
                      ]),
                      __props.result.distanceKm ? (openBlock(), createElementBlock("div", _hoisted_53, [
                        _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-gray-600" }, "Расстояние:", -1)),
                        createBaseVNode("span", _hoisted_54, toDisplayString(Math.round(__props.result.distanceKm)) + " км", 1)
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ], 10, _hoisted_31);
            }), 128))
          ])) : createCommentVNode("", true),
          __props.result.selectedTariff ? (openBlock(), createElementBlock("div", _hoisted_55, [
            __props.result.selectedTariff.summary ? (openBlock(), createElementBlock("div", _hoisted_56, [
              __props.result.selectedTariff.summary.transportationCost ? (openBlock(), createElementBlock("div", _hoisted_57, [
                _cache[15] || (_cache[15] = createBaseVNode("span", null, "Стоимость перевозки:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.transportationCost)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.pickupCost > 0 ? (openBlock(), createElementBlock("div", _hoisted_58, [
                _cache[16] || (_cache[16] = createBaseVNode("span", null, "Стоимость забора:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.pickupCost)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.deliveryCost > 0 ? (openBlock(), createElementBlock("div", _hoisted_59, [
                _cache[17] || (_cache[17] = createBaseVNode("span", null, "Стоимость доставки:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.deliveryCost)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.additionalServices > 0 ? (openBlock(), createElementBlock("div", _hoisted_60, [
                _cache[18] || (_cache[18] = createBaseVNode("span", null, "Дополнительные услуги:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.additionalServices)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.totalWithoutVAT ? (openBlock(), createElementBlock("div", _hoisted_61, [
                _cache[19] || (_cache[19] = createBaseVNode("span", null, "Стоимость без НДС:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.totalWithoutVAT)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.vatAmount ? (openBlock(), createElementBlock("div", _hoisted_62, [
                _cache[20] || (_cache[20] = createBaseVNode("span", null, "НДС (5%):", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.vatAmount)), 1)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_63, [
              _cache[21] || (_cache[21] = createBaseVNode("span", null, "Общая стоимость", -1)),
              createBaseVNode("span", _hoisted_64, toDisplayString(formatCurrency(__props.result.selectedTariff.cost)), 1)
            ]),
            _cache[22] || (_cache[22] = createBaseVNode("div", { class: "text-xs text-gray-400 mt-1" }, " С учетом НДС ", -1))
          ])) : createCommentVNode("", true),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("print")),
            class: "btn btn-secondary w-full mt-4"
          }, "Распечатать")
        ]))
      ]);
    };
  }
};
const CalculationResult = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8694341d"]]);
const _hoisted_1 = { class: "flex flex-col flex-1 lg:flex-row gap-8 min-w-0" };
const _hoisted_2 = { class: "flex flex-col gap-6 lg:flex-1 [&_.text-input-vue]:focus-visible:outline-blue-400 [&_.text-input-vue>input]:p-4 [&_.text-input-vue>input::placeholder]:text-gray-600 min-w-0" };
const _hoisted_3 = { class: "bg-brand-light p-5 rounded-lg" };
const _hoisted_4 = {
  key: 0,
  class: "bg-brand-light p-5 rounded-lg"
};
const _hoisted_5 = { class: "flex flex-col gap-6" };
const _hoisted_6 = { class: "bg-brand-light p-5 rounded-lg" };
const _hoisted_7 = { class: "h-fit bg-brand-light p-5 rounded-lg w-full lg:w-80 flex-none" };
const _sfc_main = {
  __name: "CalculatorPage",
  setup(__props) {
    const billingAddresses = ref([]);
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
      if (billingAddresses.value && direction.fromLocalityId && direction.toLocalityId) {
        let fromCoords = null;
        let toCoords = null;
        const fromAddress = billingAddresses.value.find((addr) => addr.locality_id === direction.fromLocalityId);
        const toAddress = billingAddresses.value.find((addr) => addr.locality_id === direction.toLocalityId);
        if (fromAddress && fromAddress.coordinates) {
          fromCoords = fromAddress.coordinates;
        }
        if (toAddress && toAddress.coordinates) {
          toCoords = toAddress.coordinates;
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
        if (!direction.fromLocalityId || !direction.toLocalityId) {
          reason = "Не выбраны города отправления и назначения";
        } else {
          const tariffZone = tariffZones.value.find(
            (tz) => tz.takeLocality_id === direction.fromLocalityId && tz.deliverLocality_id === direction.toLocalityId && tz.transportType_id === transportType.id
          );
          if (!tariffZone) {
            reason = "Нет тарифной зоны для данного направления";
          } else {
            const totalWeight = processedPackages.reduce((sum, pkg) => {
              const weight = parseFloat(pkg.weight) || 0;
              const quantity = parseInt(pkg.quantity) || 1;
              return sum + weight * quantity;
            }, 0);
            const relevantTariffGrid = tariffGrids.value.filter(
              (tg) => tg.transportType_id === transportType.id && tg.numberZone === tariffZone.tariffZone.toString()
            );
            if (relevantTariffGrid.length > 0) {
              const maxWeight = Math.max(...relevantTariffGrid.map((tg) => tg.unitTo));
              if (totalWeight > maxWeight) {
                reason = `Превышен максимальный вес для данного тарифа (${maxWeight} кг)`;
              } else {
                reason = "Нет данных для расчета";
              }
            } else {
              reason = "Нет тарифной сетки для данного направления";
            }
          }
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
        const volume = pkg.length * pkg.width * pkg.height / 1e6;
        return sum + volume * pkg.quantity;
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
      const { cargo, departure, destination, extraOptions, direction } = formData;
      const fromAddress = billingAddresses.value.find((addr) => addr.locality_id === direction.fromLocalityId);
      const toAddress = billingAddresses.value.find((addr) => addr.locality_id === direction.toLocalityId);
      if (!fromAddress || !toAddress) {
        return null;
      }
      const tariffZone = tariffZones.value.find(
        (tz) => tz.takeLocality_id === direction.fromLocalityId && tz.deliverLocality_id === direction.toLocalityId && tz.transportType_id === typeTransportation.id
      );
      if (!tariffZone) {
        return null;
      }
      const takeDeliverFrom = takeDelivers.value.find(
        (td) => td.billingAddress_id === fromAddress.id && td.transportType_id === typeTransportation.id
      );
      const takeDeliverTo = takeDelivers.value.find(
        (td) => td.billingAddress_id === toAddress.id && td.transportType_id === typeTransportation.id
      );
      const relevantTarifGrid = tariffGrids.value.filter(
        (tg) => tg.transportType_id === typeTransportation.id && tg.numberZone === tariffZone.tariffZone.toString()
      );
      if (relevantTarifGrid.length === 0) {
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
        const volumeCm3 = length * width * height;
        const volume = volumeCm3 / 1e6;
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
        const applicableTariff = tariffGridArray.find(
          (tg) => payableWeight >= tg.unitFrom && payableWeight <= tg.unitTo
        );
        if (applicableTariff) {
          const steps = Math.ceil((payableWeight - applicableTariff.unitFrom) / applicableTariff.step);
          return applicableTariff.startingPrice + steps * applicableTariff.stepPrice;
        } else {
          const lastTariff = tariffGridArray[tariffGridArray.length - 1];
          if (lastTariff) {
            const steps = Math.ceil((payableWeight - lastTariff.unitFrom) / lastTariff.step);
            return lastTariff.startingPrice + steps * lastTariff.stepPrice;
          }
        }
        return 0;
      }
      let transportationCost = calculateCostByTariffGrid(relevantTarifGrid, totalPayableWeight);
      if (tariffZone.coefficient) {
        transportationCost *= tariffZone.coefficient;
      }
      let pickupCost = 0;
      const isPickupAtTerminal = departure.deliveryMode === "terminal";
      if (!isPickupAtTerminal && takeDeliverFrom) {
        const pickupZone = takeDeliverFrom.tariffZone || "D";
        const pickupTariffGrid = tariffGrids.value.filter(
          (tg) => tg.transportType_id === typeTransportation.id && tg.numberZone === pickupZone.toString()
        );
        if (pickupTariffGrid.length > 0) {
          pickupCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
          if (takeDeliverFrom.surcharge) {
            pickupCost += takeDeliverFrom.surcharge;
          }
          if (takeDeliverFrom.coefficientSurcharge) {
            pickupCost *= takeDeliverFrom.coefficientSurcharge;
          }
        }
      }
      let deliveryCost = 0;
      const isDeliveryAtTerminal = destination.deliveryMode === "terminal";
      if (!isDeliveryAtTerminal && takeDeliverTo) {
        const deliveryZone = takeDeliverTo.tariffZone || "H";
        const deliveryTariffGrid = tariffGrids.value.filter(
          (tg) => tg.transportType_id === typeTransportation.id && tg.numberZone === deliveryZone.toString()
        );
        if (deliveryTariffGrid.length > 0) {
          deliveryCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
          if (takeDeliverTo.surcharge) {
            deliveryCost += takeDeliverTo.surcharge;
          }
          if (takeDeliverTo.coefficientSurcharge) {
            deliveryCost *= takeDeliverTo.coefficientSurcharge;
          }
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
      transportationCost *= totalMultiplier;
      pickupCost *= totalMultiplier;
      deliveryCost *= totalMultiplier;
      const totalWithoutVAT = transportationCost + pickupCost + deliveryCost + additionalCosts;
      const vatRate = 0.05;
      const vatAmount = totalWithoutVAT * vatRate;
      const finalCost = totalWithoutVAT + vatAmount;
      details.push({ name: "РАСЧЕТ ПО ТЗ", cost: 0, isHeader: true });
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
        const volumeCm3 = length * width * height;
        const volumetricWeightPerPlace = volumeCm3 / typeTransportation.transportationCoefficient;
        const volumetricWeightTotal = volumetricWeightPerPlace * quantity;
        const actualWeightTotal = weight * quantity;
        const payableWeight = Math.max(volumetricWeightTotal, actualWeightTotal);
        details.push({
          name: `Место ${index2 + 1}${quantity > 1 ? ` (×${quantity})` : ""}:`,
          cost: 0,
          isSubHeader: true
        });
        details.push({
          name: `V = ${length.toFixed(2)} (длина, см) × ${width.toFixed(2)} (ширина, см) × ${height.toFixed(2)} (высота, см) = ${volumeCm3.toFixed(2)} см³`,
          cost: 0,
          isDetail: true
        });
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
      const transportationBaseCost = calculateCostByTariffGrid(relevantTarifGrid, totalPayableWeight);
      const applicableTransportationTariff = relevantTarifGrid.find(
        (tg) => totalPayableWeight >= tg.unitFrom && totalPayableWeight <= tg.unitTo
      ) || relevantTarifGrid[relevantTarifGrid.length - 1];
      if (applicableTransportationTariff) {
        const steps = Math.ceil((totalPayableWeight - applicableTransportationTariff.unitFrom) / applicableTransportationTariff.step);
        details.push({
          name: "ФОРМУЛА СТОИМОСТИ ПЕРЕВОЗКИ",
          cost: 0,
          isSubHeader: true
        });
        details.push({
          name: `Шаги = CEIL((${totalPayableWeight.toFixed(2)} (ПВ, кг) - ${applicableTransportationTariff.unitFrom} (unitFrom из тарифной сетки зоны ${tariffZone.tariffZone})) / ${applicableTransportationTariff.step} (step из тарифной сетки)) = ${steps}`,
          cost: 0,
          isDetail: true
        });
        details.push({
          name: `Базовая стоимость = ${applicableTransportationTariff.startingPrice} (startingPrice из тарифной сетки) + ${steps} (шаги) × ${applicableTransportationTariff.stepPrice} (stepPrice из тарифной сетки) = ${transportationBaseCost.toFixed(2)} ₽`,
          cost: 0,
          isDetail: true
        });
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
        const pickupTariffGrid = tariffGrids.value.filter(
          (tg) => tg.transportType_id === typeTransportation.id && tg.numberZone === pickupZone.toString()
        );
        const pickupBaseCost = calculateCostByTariffGrid(pickupTariffGrid, totalPayableWeight);
        const applicablePickupTariff = pickupTariffGrid.find(
          (tg) => totalPayableWeight >= tg.unitFrom && totalPayableWeight <= tg.unitTo
        ) || pickupTariffGrid[pickupTariffGrid.length - 1];
        if (applicablePickupTariff) {
          Math.ceil((totalPayableWeight - applicablePickupTariff.unitFrom) / applicablePickupTariff.step);
          details.push({
            name: "ФОРМУЛА СТОИМОСТИ ЗАБОРА",
            cost: 0,
            isSubHeader: true
          });
          details.push({
            name: `Базовая стоимость забора = ${applicablePickupTariff.startingPrice} (startingPrice из тарифной сетки зоны ${pickupZone}) + CEIL((${totalPayableWeight.toFixed(2)} (ПВ) - ${applicablePickupTariff.unitFrom} (unitFrom)) / ${applicablePickupTariff.step} (step)) × ${applicablePickupTariff.stepPrice} (stepPrice) = ${pickupBaseCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
          if (takeDeliverFrom.surcharge) {
            details.push({
              name: `Стоимость с надбавкой = ${pickupBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverFrom.surcharge} (surcharge из takeDeliver для адреса отправки) = ${(pickupBaseCost + takeDeliverFrom.surcharge).toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
          if (takeDeliverFrom.coefficientSurcharge && takeDeliverFrom.coefficientSurcharge !== 1) {
            details.push({
              name: `Стоимость с коэффициентом = ${(pickupBaseCost + (takeDeliverFrom.surcharge || 0)).toFixed(2)} (стоимость с надбавкой) × ${takeDeliverFrom.coefficientSurcharge} (coefficientSurcharge из takeDeliver) = ${((pickupBaseCost + (takeDeliverFrom.surcharge || 0)) * takeDeliverFrom.coefficientSurcharge).toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
          if (totalMultiplier !== 1) {
            details.push({
              name: `Итоговая стоимость забора = ${((pickupBaseCost + (takeDeliverFrom.surcharge || 0)) * (takeDeliverFrom.coefficientSurcharge || 1)).toFixed(2)} (стоимость забора) × ${totalMultiplier.toFixed(2)} (коэффициенты опасного груза/температурного режима) = ${pickupCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
        }
      }
      if (deliveryCost > 0 && !isDeliveryAtTerminal && takeDeliverTo) {
        const deliveryZone = takeDeliverTo.tariffZone || "H";
        const deliveryTariffGrid = tariffGrids.value.filter(
          (tg) => tg.transportType_id === typeTransportation.id && tg.numberZone === deliveryZone.toString()
        );
        const deliveryBaseCost = calculateCostByTariffGrid(deliveryTariffGrid, totalPayableWeight);
        const applicableDeliveryTariff = deliveryTariffGrid.find(
          (tg) => totalPayableWeight >= tg.unitFrom && totalPayableWeight <= tg.unitTo
        ) || deliveryTariffGrid[deliveryTariffGrid.length - 1];
        if (applicableDeliveryTariff) {
          Math.ceil((totalPayableWeight - applicableDeliveryTariff.unitFrom) / applicableDeliveryTariff.step);
          details.push({
            name: "ФОРМУЛА СТОИМОСТИ ДОСТАВКИ",
            cost: 0,
            isSubHeader: true
          });
          details.push({
            name: `Базовая стоимость доставки = ${applicableDeliveryTariff.startingPrice} (startingPrice из тарифной сетки зоны ${deliveryZone}) + CEIL((${totalPayableWeight.toFixed(2)} (ПВ) - ${applicableDeliveryTariff.unitFrom} (unitFrom)) / ${applicableDeliveryTariff.step} (step)) × ${applicableDeliveryTariff.stepPrice} (stepPrice) = ${deliveryBaseCost.toFixed(2)} ₽`,
            cost: 0,
            isDetail: true
          });
          if (takeDeliverTo.surcharge) {
            details.push({
              name: `Стоимость с надбавкой = ${deliveryBaseCost.toFixed(2)} (базовая стоимость) + ${takeDeliverTo.surcharge} (surcharge из takeDeliver для адреса назначения) = ${(deliveryBaseCost + takeDeliverTo.surcharge).toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
          if (takeDeliverTo.coefficientSurcharge && takeDeliverTo.coefficientSurcharge !== 1) {
            details.push({
              name: `Стоимость с коэффициентом = ${(deliveryBaseCost + (takeDeliverTo.surcharge || 0)).toFixed(2)} (стоимость с надбавкой) × ${takeDeliverTo.coefficientSurcharge} (coefficientSurcharge из takeDeliver) = ${((deliveryBaseCost + (takeDeliverTo.surcharge || 0)) * takeDeliverTo.coefficientSurcharge).toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
          if (totalMultiplier !== 1) {
            details.push({
              name: `Итоговая стоимость доставки = ${((deliveryBaseCost + (takeDeliverTo.surcharge || 0)) * (takeDeliverTo.coefficientSurcharge || 1)).toFixed(2)} (стоимость доставки) × ${totalMultiplier.toFixed(2)} (коэффициенты опасного груза/температурного режима) = ${deliveryCost.toFixed(2)} ₽`,
              cost: 0,
              isDetail: true
            });
          }
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
        name: `Стоимость перевозки: ${transportationCost.toFixed(2)} ₽`,
        cost: transportationCost
      });
      if (pickupCost > 0) {
        details.push({
          name: `Стоимость забора: ${pickupCost.toFixed(2)} ₽`,
          cost: pickupCost
        });
      }
      if (deliveryCost > 0) {
        details.push({
          name: `Стоимость доставки: ${deliveryCost.toFixed(2)} ₽`,
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
        billingAddresses.value = billingAddressesData || [];
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
      if (!direction.fromLocalityId || !direction.toLocalityId) return false;
      if (!cargo.packages || cargo.packages.length === 0) return false;
      for (const pkg of cargo.packages) {
        const length = parseFloat(pkg.length);
        const width = parseFloat(pkg.width);
        const height = parseFloat(pkg.height);
        const weight = parseFloat(pkg.weight);
        const quantity = parseInt(pkg.quantity);
        if (!length || length <= 0) return false;
        if (!width || width <= 0) return false;
        if (!height || height <= 0) return false;
        if (!weight || weight <= 0) return false;
        if (!quantity || quantity <= 0) return false;
      }
      return true;
    }
    const calculationResult = computed(() => {
      if (!transportTypes.value || !formData.direction.from || !formData.direction.to) {
        return {
          isValid: false,
          message: "Заполните города отправления и назначения",
          allTariffs: [],
          selectedTariff: null,
          calculation: null
        };
      }
      if (!isFormDataValid()) {
        const missingFields = [];
        const { cargo } = formData;
        if (!cargo.packages || cargo.packages.length === 0) {
          missingFields.push("параметры груза (места)");
        } else {
          cargo.packages.forEach((pkg, index2) => {
            const placeNum = index2 + 1;
            if (!parseFloat(pkg.length) || parseFloat(pkg.length) <= 0) {
              missingFields.push(`длина места ${placeNum}`);
            }
            if (!parseFloat(pkg.width) || parseFloat(pkg.width) <= 0) {
              missingFields.push(`ширина места ${placeNum}`);
            }
            if (!parseFloat(pkg.height) || parseFloat(pkg.height) <= 0) {
              missingFields.push(`высота места ${placeNum}`);
            }
            if (!parseFloat(pkg.weight) || parseFloat(pkg.weight) <= 0) {
              missingFields.push(`вес места ${placeNum}`);
            }
            if (!parseInt(pkg.quantity) || parseInt(pkg.quantity) <= 0) {
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
      const allTariffs = getAllTariffsWithStatus();
      const tariffCalculations = allTariffs.map((tariff) => {
        if (tariff.isAvailable) {
          const calculation = calculateTariffCost(tariff);
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
        const locality = localities.value.find((loc) => loc.id == toId);
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
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[8] || (_cache[8] = createBaseVNode("div", { class: "title-wrapper mb-6" }, [
          createBaseVNode("h1", { class: "animated-title text-center text-h2 mb-2" }, "Калькулятор стоимости пересылки")
        ], -1)),
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createVNode(_sfc_main$b, {
                billingAddresses: billingAddresses.value,
                localities: localities.value,
                modelValue: formData.direction,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.direction = $event)
              }, null, 8, ["billingAddresses", "localities", "modelValue"])
            ]),
            formData.direction.from || formData.direction.to ? (openBlock(), createElementBlock("div", _hoisted_4, [
              _cache[7] || (_cache[7] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Пункты доставки", -1)),
              createBaseVNode("div", _hoisted_5, [
                formData.direction.from ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 0,
                  title: "Пункт отправки",
                  "terminal-label": "Сдать на терминале",
                  "address-label": "Забрать по адресу",
                  "name-prefix": "departure",
                  city: formData.direction.from,
                  billingAddresses: billingAddresses.value,
                  modelValue: formData.departure,
                  "onUpdate:modelValue": [
                    _cache[1] || (_cache[1] = ($event) => formData.departure = $event),
                    _cache[2] || (_cache[2] = (value) => {
                      console.log("CalculatorPage: Обновление departure", value);
                      formData.departure = value;
                    })
                  ]
                }, null, 8, ["city", "billingAddresses", "modelValue"])) : createCommentVNode("", true),
                formData.direction.to ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 1,
                  title: "Пункт назначения",
                  "terminal-label": "Получить на терминале",
                  "address-label": "Доставить по адресу",
                  "name-prefix": "destination",
                  city: formData.direction.to,
                  billingAddresses: billingAddresses.value,
                  modelValue: formData.destination,
                  "onUpdate:modelValue": [
                    _cache[3] || (_cache[3] = ($event) => formData.destination = $event),
                    _cache[4] || (_cache[4] = (value) => {
                      console.log("CalculatorPage: Обновление destination", value);
                      formData.destination = value;
                    })
                  ]
                }, null, 8, ["city", "billingAddresses", "modelValue"])) : createCommentVNode("", true),
                createVNode(_sfc_main$2, {
                  modelValue: formData.extraOptions,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.extraOptions = $event)
                }, null, 8, ["modelValue"])
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_6, [
              createVNode(_sfc_main$5, {
                "calculator-config": calculatorConfig.value,
                modelValue: formData.cargo,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => formData.cargo = $event)
              }, null, 8, ["calculator-config", "modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            createVNode(CalculationResult, {
              result: calculationResult.value,
              "form-data": formData,
              "calculator-config": calculatorConfig.value,
              onPrint: printResult,
              onSelectTariff: selectTariff
            }, null, 8, ["result", "form-data", "calculator-config"])
          ])
        ])
      ], 64);
    };
  }
};
const app = createApp(_sfc_main);
app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#calculator-app");
