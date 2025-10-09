import { r as ref, p as computed, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, t as toDisplayString, E as mergeProps, n as nextTick, F as Fragment, C as renderList, V as renderSlot, b as createTextVNode, q as watch, I as createVNode, B as normalizeClass, D as createBlock, w as withModifiers, v as onMounted, A as unref, f as reactive, H as createApp } from "./chunks/runtime-dom.esm-bundler-DZCqFWTW.js";
import { C as CheckboxInput, _ as _sfc_main$b } from "./chunks/CheckboxInput-DIFQR0HT.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _imports_0 } from "./chunks/select-arrow-He2ejS2L.js";
import { T as TextInput, F as Form, b as Field, E as ErrorMessage } from "./chunks/TextInput-DRKSnHb_.js";
import { A as AutocompleteInput } from "./chunks/AutocompleteInput-C1PGjSeS.js";
import { i as index, l as lang } from "./chunks/ru.es-BU9Gbdrk.js";
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
const _hoisted_1$8 = ["for"];
const _hoisted_2$8 = { class: "relative" };
const _hoisted_3$7 = ["id", "value", "disabled", "required"];
const _hoisted_4$7 = {
  key: 0,
  value: "",
  disabled: ""
};
const _hoisted_5$5 = ["value"];
const _hoisted_6$4 = {
  key: 0,
  class: "text-brand-red absolute right-8 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
};
const _hoisted_7$4 = {
  key: 1,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main$9 = {
  __name: "CalculatorSelectInput",
  props: {
    name: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      required: true,
      default: () => []
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
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const inputId = computed(() => props.id || `calc-select-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: inputId.value,
          class: ""
        }, toDisplayString(__props.label), 9, _hoisted_1$8)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("select", mergeProps({
            class: "vue-form-field appearance-none w-full bg-white",
            id: inputId.value,
            value: __props.modelValue,
            onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.value)),
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, {
            class: [
              __props.disabled ? "bg-gray-100 cursor-not-allowed" : ""
            ]
          }), [
            __props.placeholder ? (openBlock(), createElementBlock("option", _hoisted_4$7, toDisplayString(__props.placeholder), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
              return openBlock(), createElementBlock("option", {
                key: option.value,
                value: option.value
              }, toDisplayString(option.label), 9, _hoisted_5$5);
            }), 128))
          ], 16, _hoisted_3$7),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_6$4, "*")) : createCommentVNode("", true),
          _cache[1] || (_cache[1] = createBaseVNode("img", {
            src: _imports_0,
            alt: "",
            class: "absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          }, null, -1))
        ]),
        __props.hint ? (openBlock(), createElementBlock("p", _hoisted_7$4, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const CalculatorSelectInput = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-66ae05e2"]]);
const _hoisted_1$7 = { class: "flex items-start relative" };
const _hoisted_2$7 = { class: "flex items-center h-6 mt-1" };
const _hoisted_3$6 = ["id", "checked", "disabled", "required"];
const _hoisted_4$6 = ["for"];
const _sfc_main$8 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$7, [
          createBaseVNode("input", mergeProps({
            id: inputId.value,
            type: "checkbox",
            checked: __props.modelValue,
            onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.checked)),
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, { class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" }), null, 16, _hoisted_3$6)
        ]),
        createBaseVNode("label", {
          for: inputId.value,
          class: "ml-2 select-none cursor-pointer"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ], 8, _hoisted_4$6)
      ]);
    };
  }
};
const CalculatorCheckboxInput = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-bcdd8af1"]]);
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
    const declaredValue = ref(props.modelValue.declaredValue !== void 0 ? props.modelValue.declaredValue : 1e3);
    const packaging = ref(props.modelValue.packaging || "box-s");
    const selfMarking = ref(props.modelValue.selfMarking || false);
    const dangerousGoods = ref(props.modelValue.dangerousGoods || false);
    const tempControl = ref(props.modelValue.tempControl || false);
    const quantity = ref(props.modelValue.quantity || 1);
    const packagingOptions = computed(() => {
      if (!props.calculatorConfig.packaging) return [];
      return props.calculatorConfig.packaging.map((p) => ({ value: p.id, label: p.name }));
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
      const newDeclaredValue = newValue.declaredValue !== void 0 ? newValue.declaredValue : 1e3;
      if (declaredValue.value !== newDeclaredValue) declaredValue.value = newDeclaredValue;
      const newPackaging = newValue.packaging || "box-s";
      if (packaging.value !== newPackaging) packaging.value = newPackaging;
      if (selfMarking.value !== (newValue.selfMarking || false)) selfMarking.value = newValue.selfMarking || false;
      if (dangerousGoods.value !== (newValue.dangerousGoods || false)) dangerousGoods.value = newValue.dangerousGoods || false;
      if (tempControl.value !== (newValue.tempControl || false)) tempControl.value = newValue.tempControl || false;
      const newQuantity = newValue.quantity || 1;
      if (quantity.value !== newQuantity) quantity.value = newQuantity;
    }, { immediate: true, deep: true });
    watch([length, width, height, weight, description, declaredValue, packaging, selfMarking, dangerousGoods, tempControl, quantity], () => {
      emit("update:modelValue", {
        id: id.value,
        length: length.value,
        width: width.value,
        height: height.value,
        weight: weight.value,
        description: description.value,
        declaredValue: declaredValue.value,
        packaging: packaging.value,
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
          createVNode(CalculatorTextInput, {
            name: `pkg_${id.value}_desc`,
            placeholder: "Описание содержимого",
            modelValue: description.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => description.value = $event)
          }, null, 8, ["name", "modelValue"]),
          createVNode(CalculatorTextInput, {
            name: `pkg_${id.value}_value`,
            placeholder: "Оценочная стоимость грузоместа, ₽",
            modelValue: declaredValue.value,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => declaredValue.value = $event),
            type: "number",
            "display-suffix": "₽",
            "show-formatted-when-blurred": true
          }, null, 8, ["name", "modelValue"]),
          createVNode(CalculatorSelectInput, {
            name: `pkg_${id.value}_packaging`,
            label: "Упаковка",
            options: packagingOptions.value,
            modelValue: packaging.value,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => packaging.value = $event)
          }, null, 8, ["name", "options", "modelValue"]),
          createBaseVNode("div", _hoisted_10$1, [
            createVNode(CalculatorCheckboxInput, {
              name: `pkg_${id.value}_self_marking`,
              label: "Самостоятельная маркировка груза",
              modelValue: selfMarking.value,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => selfMarking.value = $event)
            }, null, 8, ["name", "modelValue"]),
            createVNode(CalculatorCheckboxInput, {
              name: `pkg_${id.value}_dangerous`,
              label: "Есть опасный груз",
              modelValue: dangerousGoods.value,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => dangerousGoods.value = $event)
            }, null, 8, ["name", "modelValue"]),
            createVNode(CalculatorCheckboxInput, {
              name: `pkg_${id.value}_temp`,
              label: "Требуется температурный режим",
              modelValue: tempControl.value,
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => tempControl.value = $event)
            }, null, 8, ["name", "modelValue"])
          ])
        ])
      ]);
    };
  }
};
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
        packaging: "box-s",
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
          packaging: pkg.packaging || "box-s",
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
          packaging: pkg.packaging || "box-s",
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
        packages.value[activeIndex.value] ? (openBlock(), createBlock(_sfc_main$7, {
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
    const mode = ref(props.modelValue.mode || "individual");
    function createDefaultPlace() {
      return {
        id: Date.now() + Math.random(),
        length: "",
        width: "",
        height: "",
        weight: "",
        description: "",
        declaredValue: 1e3,
        packaging: "box-s",
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
      mode.value = props.modelValue.mode || "individual";
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
      mode.value = newValue.mode || "individual";
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
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => setMode("individual"), ["prevent"])),
            class: normalizeClass(["flex-1 py-4 uppercase text-caps-regular px-4 rounded-md", mode.value === "individual" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Места по-отдельности ", 2),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => setMode("total"), ["prevent"])),
            class: normalizeClass(["flex-1 py-4 uppercase text-caps-regular px-4 rounded-md", mode.value === "total" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Общий вес и объём ", 2)
        ]),
        mode.value === "individual" ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
          createVNode(_sfc_main$6, {
            modelValue: individualState.value.packages,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => individualState.value.packages = $event),
            "calculator-config": __props.calculatorConfig
          }, null, 8, ["modelValue", "calculator-config"])
        ])) : createCommentVNode("", true),
        mode.value === "total" ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
          totalState.value.package && totalState.value.package.id ? (openBlock(), createBlock(_sfc_main$7, {
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
const DatePickerVue = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-afb37a2f"]]);
const _hoisted_1$3 = { class: "card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$3 = { class: "text-h4 font-bold mb-4" };
const _hoisted_3$2 = { class: "flex border border-gray-200 rounded-lg p-1 mb-4" };
const _hoisted_4$2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_5$2 = { key: 0 };
const _hoisted_6$1 = { key: 1 };
const _hoisted_7$1 = { class: "form-control w-full" };
const _sfc_main$3 = {
  __name: "DeliveryPointForm",
  props: {
    title: { type: String, required: true },
    terminalLabel: { type: String, required: true },
    addressLabel: { type: String, required: true },
    city: { type: String, required: true },
    offices: { type: Array, required: true },
    modelValue: { type: Object, required: true },
    namePrefix: { type: String, required: true }
    // e.g., 'departure' or 'destination'
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let isUpdatingFromParent = false;
    const deliveryMode = ref(props.modelValue.deliveryMode || "terminal");
    const date = ref(props.modelValue.date || "");
    const location = computed({
      get() {
        const loc = props.modelValue.location;
        if (typeof loc === "object" && loc !== null && loc.city) {
          return `${loc.city}${loc.address ? ", " + loc.address : ""}`;
        }
        return loc || "";
      },
      set(newValue) {
        if (isUpdatingFromParent) return;
        emit("update:modelValue", {
          ...props.modelValue,
          location: newValue
        });
      }
    });
    const terminalOptions = computed(() => {
      if (!props.city) return [];
      return props.offices.filter((office) => office.city === props.city);
    });
    function onTerminalSelected(office) {
      if (isUpdatingFromParent) return;
      emit("update:modelValue", {
        ...props.modelValue,
        location: office
        // emit the object
      });
    }
    function onTerminalReset() {
      if (isUpdatingFromParent) return;
      emit("update:modelValue", {
        ...props.modelValue,
        location: ""
      });
    }
    function onDateChange(newDate) {
      if (isUpdatingFromParent) return;
      emit("update:modelValue", {
        ...props.modelValue,
        date: newDate
      });
    }
    watch(() => props.city, () => {
      if (isUpdatingFromParent) return;
      emit("update:modelValue", {
        ...props.modelValue,
        location: ""
        // Reset location when city changes
      });
    });
    watch([deliveryMode, date], () => {
      if (isUpdatingFromParent) return;
      emit("update:modelValue", {
        ...props.modelValue,
        deliveryMode: deliveryMode.value,
        date: date.value
      });
    });
    watch(() => props.modelValue, (newValue) => {
      if (isUpdatingFromParent) return;
      isUpdatingFromParent = true;
      deliveryMode.value = newValue.deliveryMode || "terminal";
      date.value = newValue.date || "";
      setTimeout(() => {
        isUpdatingFromParent = false;
      }, 0);
    }, { deep: true });
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
          deliveryMode.value === "terminal" ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
            createVNode(AutocompleteInput, {
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
              onReset: onTerminalReset
            }, null, 8, ["name", "items", "disabled", "placeholder", "modelValue"])
          ])) : createCommentVNode("", true),
          deliveryMode.value === "address" ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
            createVNode(TextInput, {
              name: `${__props.namePrefix}_pickup_address`,
              label: "Адрес",
              placeholder: "Укажите адрес",
              disabled: !__props.city,
              modelValue: location.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => location.value = $event)
            }, null, 8, ["name", "disabled", "modelValue"])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_7$1, [
            _cache[4] || (_cache[4] = createBaseVNode("label", { class: "label" }, [
              createBaseVNode("span", { class: "label-text text-brand-gray font-medium" }, "Дата")
            ], -1)),
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
const _hoisted_3$1 = { key: 1 };
const _hoisted_4$1 = { class: "border-b pb-4 mb-4" };
const _hoisted_5$1 = { class: "flex items-center justify-between mb-4" };
const _hoisted_6 = { class: "text-left" };
const _hoisted_7 = { class: "font-semibold text-base" };
const _hoisted_8 = { class: "text-sm text-gray-500" };
const _hoisted_9 = { class: "text-right" };
const _hoisted_10 = { class: "font-semibold text-base" };
const _hoisted_11 = { class: "text-sm text-gray-500" };
const _hoisted_12 = { class: "grid grid-cols-3 gap-4 text-center" };
const _hoisted_13 = { class: "text-2xl font-bold text-gray-800" };
const _hoisted_14 = { class: "text-sm text-gray-600" };
const _hoisted_15 = { class: "text-2xl font-bold text-gray-800" };
const _hoisted_16 = { class: "text-2xl font-bold text-gray-800" };
const _hoisted_17 = {
  key: 0,
  class: "mt-2 text-center"
};
const _hoisted_18 = { class: "text-lg font-bold text-gray-900" };
const _hoisted_19 = {
  key: 0,
  class: "my-4"
};
const _hoisted_20 = {
  key: 0,
  class: "bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mt-2 rounded-b-md text-sm animate-fade-in",
  role: "alert"
};
const _hoisted_21 = { class: "list-disc list-inside space-y-1" };
const _hoisted_22 = {
  key: 1,
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
  key: 2,
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
const _hoisted_40 = { key: 2 };
const _hoisted_41 = { key: 3 };
const _hoisted_42 = { key: 4 };
const _hoisted_43 = { key: 5 };
const _hoisted_44 = { key: 6 };
const _hoisted_45 = { key: 7 };
const _hoisted_46 = {
  key: 0,
  class: "text-xs text-red-500 mb-1 font-medium"
};
const _hoisted_47 = {
  key: 1,
  class: "mt-1 text-sm text-blue-600"
};
const _hoisted_48 = { key: 0 };
const _hoisted_49 = {
  key: 2,
  class: "text-sm text-green-600"
};
const _hoisted_50 = { class: "text-right" };
const _hoisted_51 = {
  key: 0,
  class: "text-xl font-bold text-gray-800"
};
const _hoisted_52 = {
  key: 1,
  class: "text-xl font-bold text-gray-400"
};
const _hoisted_53 = {
  key: 0,
  class: "mt-3 pt-3 border-t border-gray-200"
};
const _hoisted_54 = ["onClick"];
const _hoisted_55 = {
  key: 0,
  class: "mt-3 space-y-1 text-sm animate-fade-in"
};
const _hoisted_56 = { key: 0 };
const _hoisted_57 = {
  key: 0,
  class: "border-t pt-2 mt-2"
};
const _hoisted_58 = { class: "flex justify-between" };
const _hoisted_59 = { class: "font-medium" };
const _hoisted_60 = {
  key: 0,
  class: "flex justify-between"
};
const _hoisted_61 = { class: "font-medium" };
const _hoisted_62 = {
  key: 3,
  class: "border-t pt-4"
};
const _hoisted_63 = {
  key: 0,
  class: "text-sm space-y-1 mb-3"
};
const _hoisted_64 = { class: "flex justify-between text-gray-600" };
const _hoisted_65 = {
  key: 0,
  class: "flex justify-between text-gray-600"
};
const _hoisted_66 = {
  key: 1,
  class: "flex justify-between text-gray-600"
};
const _hoisted_67 = { class: "flex justify-between items-center font-bold text-lg border-t pt-3" };
const _hoisted_68 = { class: "text-xl" };
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
    function toggleTariffDetails(tariffId) {
      if (expandedTariffs.value.includes(tariffId)) {
        expandedTariffs.value = expandedTariffs.value.filter((id) => id !== tariffId);
      } else {
        expandedTariffs.value.push(tariffId);
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
      var _a, _b;
      const defaultPackage = ((_b = (_a = props.calculatorConfig.defaultValues) == null ? void 0 : _a.cargo) == null ? void 0 : _b.package) || {
        length: "30",
        width: "20",
        height: "10",
        weight: "1",
        quantity: 1
      };
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
        const quantity = parseInt(defaultPackage.quantity) || 1;
        return {
          count: formatNumber(quantity),
          countLabel: quantity === 1 ? "место" : "мест",
          weight: formatWeight(parseFloat(defaultPackage.weight) * quantity),
          volume: formatVolume(parseFloat(defaultPackage.length) * parseFloat(defaultPackage.width) * parseFloat(defaultPackage.height) / 1e6 * quantity)
        };
      }
      const { cargo } = props.formData;
      let totalWeight = 0;
      let totalVolume = 0;
      let totalCount = 0;
      let countLabel = "мест";
      const processedPackages = cargo.packages.map((pkg) => {
        const useDefaultDimensions = !(parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0);
        return {
          ...pkg,
          weight: parseFloat(pkg.weight) > 0 ? parseFloat(pkg.weight) : parseFloat(defaultPackage.weight),
          length: useDefaultDimensions ? parseFloat(defaultPackage.length) : parseFloat(pkg.length),
          width: useDefaultDimensions ? parseFloat(defaultPackage.width) : parseFloat(pkg.width),
          height: useDefaultDimensions ? parseFloat(defaultPackage.height) : parseFloat(pkg.height),
          quantity: parseInt(pkg.quantity) > 0 ? parseInt(pkg.quantity) : 1
        };
      });
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
    const displayMessages = computed(() => {
      var _a, _b;
      const messages = [];
      const { formData, calculatorConfig } = props;
      const defaultPackage = ((_b = (_a = calculatorConfig.defaultValues) == null ? void 0 : _a.cargo) == null ? void 0 : _b.package) || {
        length: "30",
        width: "20",
        height: "10",
        weight: "1",
        quantity: 1
      };
      let cargoWeightProvided = false;
      let cargoDimensionsProvided = false;
      if (formData.cargo && formData.cargo.packages && formData.cargo.packages.length > 0) {
        const firstPackage = formData.cargo.packages[0];
        cargoWeightProvided = firstPackage.weight && parseFloat(firstPackage.weight) > 0;
        cargoDimensionsProvided = firstPackage.length && parseFloat(firstPackage.length) > 0 && firstPackage.width && parseFloat(firstPackage.width) > 0 && firstPackage.height && parseFloat(firstPackage.height) > 0;
      } else {
        cargoWeightProvided = false;
        cargoDimensionsProvided = false;
      }
      if (!cargoWeightProvided) {
        const defaultWeight = parseFloat(defaultPackage.weight) * (parseInt(defaultPackage.quantity) || 1);
        messages.push(`Вес груза не указан. Используется значение по умолчанию: ${formatWeight(defaultWeight)} кг.`);
      }
      if (!cargoDimensionsProvided) {
        const defaultVolume = parseFloat(defaultPackage.length) * parseFloat(defaultPackage.width) * parseFloat(defaultPackage.height) / 1e6 * (parseInt(defaultPackage.quantity) || 1);
        messages.push(`Габариты груза не указаны. Используются значения по умолчанию: ${defaultPackage.length}x${defaultPackage.width}x${defaultPackage.height} см, Объем ${formatVolume(defaultVolume)} м³.`);
      }
      const tomorrow = /* @__PURE__ */ new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const defaultDepartureDate = tomorrow.toISOString().split("T")[0];
      if (!formData.departure.date || new Date(formData.departure.date).toISOString().split("T")[0] === defaultDepartureDate) {
        messages.push(`Дата отправки не указана. Используется завтрашняя дата: ${formatDate(defaultDepartureDate)}.`);
      }
      const isDepartureLocationProvided = formData.departure.location && (typeof formData.departure.location === "object" ? !!formData.departure.location.id : formData.departure.location.trim() !== "");
      if (!isDepartureLocationProvided) {
        messages.push(`Пункт отправления не указан. Используется терминал по умолчанию в городе ${formData.direction.from || "отправления"}.`);
      }
      const isDestinationLocationProvided = formData.destination.location && (typeof formData.destination.location === "object" ? !!formData.destination.location.id : formData.destination.location.trim() !== "");
      if (!isDestinationLocationProvided) {
        messages.push(`Пункт назначения не указан. Используется терминал по умолчанию в городе ${formData.direction.to || "назначения"}.`);
      }
      return messages;
    });
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
    const isMessagesSpoilerExpanded = ref(false);
    function toggleMessagesSpoiler() {
      isMessagesSpoilerExpanded.value = !isMessagesSpoilerExpanded.value;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", _hoisted_1$1, [
        _cache[23] || (_cache[23] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Стоимость перевозки", -1)),
        !__props.result || !__props.result.isValid ? (openBlock(), createElementBlock("div", _hoisted_2$1, _cache[1] || (_cache[1] = [
          createBaseVNode("p", null, "Заполните все обязательные поля, чтобы увидеть стоимость перевозки.", -1),
          createBaseVNode("div", { class: "mt-3 text-sm text-gray-400" }, [
            createBaseVNode("p", null, "Необходимо указать:"),
            createBaseVNode("ul", { class: "list-disc list-inside mt-1 space-y-1" }, [
              createBaseVNode("li", null, "Города отправления и назначения"),
              createBaseVNode("li", null, "Параметры груза (размеры и вес)"),
              createBaseVNode("li", null, "Пункты отправки и получения"),
              createBaseVNode("li", null, "Дату отправки")
            ])
          ], -1)
        ]))) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            _cache[6] || (_cache[6] = createBaseVNode("h3", { class: "text-lg font-semibold mb-3 text-gray-700" }, "Параметры расчёта", -1)),
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, toDisplayString(routeInfo.value.from), 1),
                createBaseVNode("div", _hoisted_8, toDisplayString(routeInfo.value.fromDetails), 1)
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
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("div", _hoisted_10, toDisplayString(routeInfo.value.to), 1),
                createBaseVNode("div", _hoisted_11, toDisplayString(routeInfo.value.toDetails), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_13, toDisplayString(cargoInfo.value.count), 1),
                createBaseVNode("div", _hoisted_14, toDisplayString(cargoInfo.value.countLabel), 1)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_15, toDisplayString(cargoInfo.value.weight), 1),
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-sm text-gray-600" }, "кг", -1))
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_16, toDisplayString(cargoInfo.value.volume), 1),
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-sm text-gray-600" }, "куб.м", -1))
              ])
            ]),
            __props.result.distanceKm ? (openBlock(), createElementBlock("div", _hoisted_17, [
              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-base text-gray-700 font-medium" }, "Расстояние: ", -1)),
              createBaseVNode("span", _hoisted_18, toDisplayString(Math.round(__props.result.distanceKm)) + " км", 1)
            ])) : createCommentVNode("", true)
          ]),
          displayMessages.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_19, [
            createBaseVNode("button", {
              onClick: toggleMessagesSpoiler,
              class: "w-full flex items-starts justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            }, [
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "font-bold text-blue-800 text-sm" }, "Не все поля заполнены, использованы значения по умолчанию", -1)),
              (openBlock(), createElementBlock("svg", {
                class: normalizeClass(["w-7 h-7 text-blue-600 transition-transform", isMessagesSpoilerExpanded.value ? "rotate-180" : ""]),
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, _cache[7] || (_cache[7] = [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ]), 2))
            ]),
            isMessagesSpoilerExpanded.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
              createBaseVNode("ul", _hoisted_21, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(displayMessages.value, (message, index2) => {
                  return openBlock(), createElementBlock("li", { key: index2 }, toDisplayString(message), 1);
                }), 128))
              ])
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          __props.result.selectedTariff ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createBaseVNode("div", _hoisted_23, [
              createBaseVNode("span", _hoisted_24, toDisplayString(__props.result.selectedTariff.name), 1),
              createBaseVNode("span", _hoisted_25, toDisplayString(formatCurrency(__props.result.selectedTariff.totalCost)), 1)
            ]),
            createBaseVNode("div", _hoisted_26, toDisplayString(__props.result.selectedTariff.description), 1),
            __props.result.selectedTariff.deliveryInfo ? (openBlock(), createElementBlock("div", _hoisted_27, [
              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "font-medium" }, "Время доставки:", -1)),
              createTextVNode(" " + toDisplayString(__props.result.selectedTariff.deliveryInfo.description) + " ", 1),
              __props.result.selectedTariff.deliveryInfo.days ? (openBlock(), createElementBlock("span", _hoisted_28, " (" + toDisplayString(__props.result.selectedTariff.deliveryInfo.days) + " дн.)", 1)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            __props.result.selectedTariff.minDeliveryDate ? (openBlock(), createElementBlock("div", _hoisted_29, [
              _cache[10] || (_cache[10] = createBaseVNode("span", { class: "font-medium" }, "Минимальная дата доставки:", -1)),
              createTextVNode(" " + toDisplayString(formatDate(__props.result.selectedTariff.minDeliveryDate.date)), 1)
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          __props.result.allTariffs && __props.result.allTariffs.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_30, [
            _cache[17] || (_cache[17] = createBaseVNode("h3", { class: "text-lg font-semibold text-gray-800" }, "Все тарифы:", -1)),
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
                      createTextVNode(toDisplayString(tariff.name) + " ", 1),
                      tariff.isAvailable && tariff.isRecommended ? (openBlock(), createElementBlock("span", _hoisted_35, " Экономия " + toDisplayString(Math.round(tariff.savings)) + " ₽. Рекомендуем! ", 1)) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("p", _hoisted_36, toDisplayString(tariff.description), 1),
                    createBaseVNode("ul", _hoisted_37, [
                      tariff.availability.minWeight ? (openBlock(), createElementBlock("li", _hoisted_38, "Мин. вес: " + toDisplayString(tariff.availability.minWeight) + " кг", 1)) : createCommentVNode("", true),
                      tariff.availability.maxWeight ? (openBlock(), createElementBlock("li", _hoisted_39, "Макс. вес: " + toDisplayString(tariff.availability.maxWeight) + " кг", 1)) : createCommentVNode("", true),
                      tariff.availability.minVolume ? (openBlock(), createElementBlock("li", _hoisted_40, "Мин. объем: " + toDisplayString(tariff.availability.minVolume) + " м³", 1)) : createCommentVNode("", true),
                      tariff.availability.maxVolume ? (openBlock(), createElementBlock("li", _hoisted_41, "Макс. объем: " + toDisplayString(tariff.availability.maxVolume) + " м³", 1)) : createCommentVNode("", true),
                      tariff.availability.minDeclaredValue ? (openBlock(), createElementBlock("li", _hoisted_42, "Мин. оценочная стоимость: " + toDisplayString(tariff.availability.minDeclaredValue) + " ₽", 1)) : createCommentVNode("", true),
                      tariff.availability.maxDeclaredValue ? (openBlock(), createElementBlock("li", _hoisted_43, "Макс. оценочная стоимость: " + toDisplayString(tariff.availability.maxDeclaredValue) + " ₽", 1)) : createCommentVNode("", true),
                      tariff.availability.maxDistance ? (openBlock(), createElementBlock("li", _hoisted_44, "Макс. расстояние: " + toDisplayString(tariff.availability.maxDistance) + " км", 1)) : createCommentVNode("", true),
                      tariff.availability.allowedRegions && tariff.availability.allowedRegions.length ? (openBlock(), createElementBlock("li", _hoisted_45, " Только для: " + toDisplayString(tariff.availability.allowedRegions.join(", ")), 1)) : createCommentVNode("", true)
                    ]),
                    !tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_46, " Недоступно: " + toDisplayString(tariff.reason), 1)) : createCommentVNode("", true),
                    tariff.deliveryInfo ? (openBlock(), createElementBlock("div", _hoisted_47, [
                      _cache[11] || (_cache[11] = createBaseVNode("span", { class: "font-medium" }, "Время доставки:", -1)),
                      createTextVNode(" " + toDisplayString(tariff.deliveryInfo.description) + " ", 1),
                      tariff.deliveryInfo.days ? (openBlock(), createElementBlock("span", _hoisted_48, " (" + toDisplayString(tariff.deliveryInfo.days) + " дн.)", 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    tariff.minDeliveryDate ? (openBlock(), createElementBlock("div", _hoisted_49, [
                      _cache[12] || (_cache[12] = createBaseVNode("span", { class: "font-medium" }, "Минимальная дата доставки:", -1)),
                      createTextVNode(" " + toDisplayString(formatDate(tariff.minDeliveryDate.date)), 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_50, [
                    tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_51, toDisplayString(Math.round(tariff.totalCost)) + " ₽", 1)) : (openBlock(), createElementBlock("div", _hoisted_52, "—"))
                  ])
                ]),
                tariff.isAvailable ? (openBlock(), createElementBlock("div", _hoisted_53, [
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
                    }, _cache[13] || (_cache[13] = [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M19 9l-7 7-7-7"
                      }, null, -1)
                    ]), 2))
                  ], 8, _hoisted_54),
                  expandedTariffs.value.includes(tariff.id) && tariff.details ? (openBlock(), createElementBlock("div", _hoisted_55, [
                    _cache[16] || (_cache[16] = createBaseVNode("h5", { class: "font-medium text-gray-700 mb-2" }, "Детализация расчета:", -1)),
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
                        !detail.isHeader && !detail.isSubHeader && !detail.isDetail ? (openBlock(), createElementBlock("span", _hoisted_56, toDisplayString(detail.cost < 0 ? "" : "+") + toDisplayString(formatCurrency(detail.cost)), 1)) : createCommentVNode("", true)
                      ], 2);
                    }), 128)),
                    tariff.deliveryInfo ? (openBlock(), createElementBlock("div", _hoisted_57, [
                      createBaseVNode("div", _hoisted_58, [
                        _cache[14] || (_cache[14] = createBaseVNode("span", { class: "text-gray-600" }, "Время доставки:", -1)),
                        createBaseVNode("span", _hoisted_59, toDisplayString(tariff.deliveryInfo.days) + " дн.", 1)
                      ]),
                      __props.result.distanceKm ? (openBlock(), createElementBlock("div", _hoisted_60, [
                        _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-gray-600" }, "Расстояние:", -1)),
                        createBaseVNode("span", _hoisted_61, toDisplayString(Math.round(__props.result.distanceKm)) + " км", 1)
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ], 10, _hoisted_31);
            }), 128))
          ])) : createCommentVNode("", true),
          __props.result.selectedTariff ? (openBlock(), createElementBlock("div", _hoisted_62, [
            __props.result.selectedTariff.summary ? (openBlock(), createElementBlock("div", _hoisted_63, [
              createBaseVNode("div", _hoisted_64, [
                _cache[18] || (_cache[18] = createBaseVNode("span", null, "Тарифная стоимость:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.baseCost)), 1)
              ]),
              __props.result.selectedTariff.summary.additionalServices !== 0 ? (openBlock(), createElementBlock("div", _hoisted_65, [
                _cache[19] || (_cache[19] = createBaseVNode("span", null, "Дополнительные услуги:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.additionalServices)), 1)
              ])) : createCommentVNode("", true),
              __props.result.selectedTariff.summary.distance > 0 ? (openBlock(), createElementBlock("div", _hoisted_66, [
                _cache[20] || (_cache[20] = createBaseVNode("span", null, "Стоимость расстояния:", -1)),
                createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.selectedTariff.summary.distance)), 1)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_67, [
              _cache[21] || (_cache[21] = createBaseVNode("span", null, "Общая стоимость", -1)),
              createBaseVNode("span", _hoisted_68, toDisplayString(formatCurrency(__props.result.selectedTariff.totalCost)), 1)
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
const CalculationResult = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1e4f415b"]]);
const _hoisted_1 = { class: "flex flex-col flex-1 lg:flex-row gap-8 min-w-0" };
const _hoisted_2 = { class: "flex flex-col gap-6 lg:flex-1 [&_.text-input-vue]:focus-visible:outline-blue-400 [&_.text-input-vue>input]:p-4 [&_.text-input-vue>input::placeholder]:text-gray-600 min-w-0" };
const _hoisted_3 = { class: "bg-brand-light p-5 rounded-lg" };
const _hoisted_4 = { class: "bg-brand-light p-5 rounded-lg" };
const _hoisted_5 = { class: "h-fit bg-brand-light p-5 rounded-lg w-full lg:w-80 flex-none" };
const _sfc_main = {
  __name: "CalculatorPage",
  setup(__props) {
    const offices = ref([]);
    const calculatorConfig = ref({});
    const formData = reactive({
      direction: {
        from: "",
        to: ""
      },
      cargo: {
        mode: "individual",
        packages: [{
          id: Date.now(),
          length: "",
          width: "",
          height: "",
          weight: "",
          description: "",
          declaredValue: 1e3,
          packaging: "box-s",
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
    function calculateDeliveryTime(tariff, distanceKm) {
      if (!tariff.deliveryTime) return null;
      const { baseDays, additionalDaysPerKm, maxDays } = tariff.deliveryTime;
      const calculatedDays = baseDays + distanceKm * additionalDaysPerKm;
      const deliveryDays = Math.min(Math.ceil(calculatedDays), maxDays);
      return {
        days: deliveryDays,
        description: tariff.deliveryTime.description
      };
    }
    function calculateMinDeliveryDate(tariff, distanceKm, departureDate) {
      const deliveryTime = calculateDeliveryTime(tariff, distanceKm);
      if (!deliveryTime || !departureDate) return null;
      const depDate = new Date(departureDate);
      const minDeliveryDate = new Date(depDate);
      minDeliveryDate.setDate(depDate.getDate() + deliveryTime.days);
      return {
        date: minDeliveryDate,
        days: deliveryTime.days,
        description: deliveryTime.description
      };
    }
    function getAllTariffsWithStatus() {
      var _a, _b, _c, _d;
      if (!calculatorConfig.value.tariffs || !isFormDataValid()) {
        return [];
      }
      const { direction, cargo, departure, destination } = formData;
      const defaultPackage = ((_b = (_a = calculatorConfig.value.defaultValues) == null ? void 0 : _a.cargo) == null ? void 0 : _b.package) || {
        length: "30",
        width: "20",
        height: "10",
        weight: "1",
        description: "Посылка",
        declaredValue: 1e3,
        packaging: "box-s",
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
      };
      const processedPackages = cargo.packages && cargo.packages.length > 0 ? cargo.packages.map((pkg) => {
        const useDefaultDimensions = !(parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0);
        return {
          ...pkg,
          weight: parseFloat(pkg.weight) > 0 ? parseFloat(pkg.weight) : parseFloat(defaultPackage.weight),
          length: useDefaultDimensions ? parseFloat(defaultPackage.length) : parseFloat(pkg.length),
          width: useDefaultDimensions ? parseFloat(defaultPackage.width) : parseFloat(pkg.width),
          height: useDefaultDimensions ? parseFloat(defaultPackage.height) : parseFloat(pkg.height),
          quantity: parseInt(pkg.quantity) > 0 ? parseInt(pkg.quantity) : 1
        };
      }) : [{
        ...defaultPackage,
        id: Date.now()
      }];
      const cargoData = { packages: processedPackages };
      const defaultDeliveryMode = ((_d = (_c = calculatorConfig.value.defaultValues) == null ? void 0 : _c.delivery) == null ? void 0 : _d.mode) || "terminal";
      const departureData = {
        deliveryMode: departure.deliveryMode || defaultDeliveryMode,
        location: departure.location || "",
        date: departure.date || (() => {
          const tomorrow = /* @__PURE__ */ new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow.toISOString().split("T")[0];
        })()
      };
      const destinationData = {
        deliveryMode: destination.deliveryMode || defaultDeliveryMode,
        location: destination.location || "",
        date: destination.date || ""
      };
      let distanceKm = null;
      if (offices.value && direction.from && direction.to) {
        let fromCoords = null;
        let toCoords = null;
        if (typeof departureData.location === "object" && departureData.location !== null && departureData.location.coordinates) {
          fromCoords = departureData.location.coordinates;
        } else if (typeof departureData.location === "string" && departureData.location.includes(",")) {
          const foundOffice = offices.value.find((o) => {
            const officeString = `${o.city}, ${o.address}`;
            return departureData.location.includes(officeString) || departureData.location.includes(o.address);
          });
          if (foundOffice && foundOffice.coordinates) {
            fromCoords = foundOffice.coordinates;
          }
        } else if (direction.from) {
          const office = offices.value.find((o) => o.city === direction.from);
          if (office && office.coordinates) {
            fromCoords = office.coordinates;
          }
        }
        if (typeof destinationData.location === "object" && destinationData.location !== null && destinationData.location.coordinates) {
          toCoords = destinationData.location.coordinates;
        } else if (typeof destinationData.location === "string" && destinationData.location.includes(",")) {
          const foundOffice = offices.value.find((o) => {
            const officeString = `${o.city}, ${o.address}`;
            return destinationData.location.includes(officeString) || destinationData.location.includes(o.address);
          });
          if (foundOffice && foundOffice.coordinates) {
            toCoords = foundOffice.coordinates;
          }
        } else if (direction.to) {
          const office = offices.value.find((o) => o.city === direction.to);
          if (office && office.coordinates) {
            toCoords = office.coordinates;
          }
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
      return calculatorConfig.value.tariffs.map((tariff) => {
        let reason = "";
        let isAvailable = true;
        const { availability } = tariff;
        let totalWeight = 0, totalVolume = 0, maxDeclaredValue = 0;
        cargoData.packages.forEach((pkg) => {
          const weight = parseFloat(pkg.weight) || 0;
          const volume = parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height) / 1e6 || 0;
          const declaredValue = parseFloat(pkg.declaredValue) || 0;
          const quantity = parseInt(pkg.quantity) || 1;
          totalWeight += weight * quantity;
          totalVolume += volume * quantity;
          maxDeclaredValue = Math.max(maxDeclaredValue, declaredValue);
        });
        if (availability.minWeight && totalWeight < availability.minWeight) {
          isAvailable = false;
          reason = `Минимальный вес: ${availability.minWeight} кг`;
        } else if (availability.maxWeight && totalWeight > availability.maxWeight) {
          isAvailable = false;
          reason = `Максимальный вес: ${availability.maxWeight} кг`;
        } else if (availability.minVolume && totalVolume < availability.minVolume) {
          isAvailable = false;
          reason = `Минимальный объем: ${availability.minVolume} м³`;
        } else if (availability.maxVolume && totalVolume > availability.maxVolume) {
          isAvailable = false;
          reason = `Максимальный объем: ${availability.maxVolume} м³`;
        } else if (availability.minDeclaredValue && maxDeclaredValue < availability.minDeclaredValue) {
          isAvailable = false;
          reason = `Минимальная оценочная стоимость: ${availability.minDeclaredValue} ₽`;
        } else if (availability.maxDeclaredValue && maxDeclaredValue > availability.maxDeclaredValue) {
          isAvailable = false;
          reason = `Максимальная оценочная стоимость: ${availability.maxDeclaredValue} ₽`;
        } else if (distanceKm !== null && availability.minDistance && distanceKm < availability.minDistance) {
          isAvailable = false;
          reason = `Минимальное расстояние: ${availability.minDistance} км`;
        } else if (distanceKm !== null && availability.maxDistance && distanceKm > availability.maxDistance) {
          isAvailable = false;
          reason = `Максимальное расстояние: ${availability.maxDistance} км`;
        } else if (availability.allowedRegions.length > 0) {
          const fromAllowed = availability.allowedRegions.some((region) => direction.from.includes(region));
          const toAllowed = availability.allowedRegions.some((region) => direction.to.includes(region));
          if (!fromAllowed || !toAllowed) {
            isAvailable = false;
            reason = `Доступно только для: ${availability.allowedRegions.join(", ")}`;
          }
        } else if (availability.excludedRegions.length > 0) {
          const fromExcluded = availability.excludedRegions.some((region) => direction.from.includes(region));
          const toExcluded = availability.excludedRegions.some((region) => direction.to.includes(region));
          if (fromExcluded || toExcluded) {
            isAvailable = false;
            reason = `Недоступно для выбранных регионов`;
          }
        }
        if (isAvailable && departureData.date && availability.minAdvanceBookingDays !== void 0) {
          const today = /* @__PURE__ */ new Date();
          today.setHours(0, 0, 0, 0);
          const depDate = new Date(departureData.date);
          depDate.setHours(0, 0, 0, 0);
          const daysDifference = Math.floor((depDate - today) / (1e3 * 60 * 60 * 24));
          if (daysDifference < availability.minAdvanceBookingDays) {
            isAvailable = false;
            reason = `Минимальный срок предварительного заказа: ${availability.minAdvanceBookingDays} дней`;
          } else if (availability.maxAdvanceBookingDays && daysDifference > availability.maxAdvanceBookingDays) {
            isAvailable = false;
            reason = `Максимальный срок предварительного заказа: ${availability.maxAdvanceBookingDays} дней`;
          }
        }
        if (isAvailable && departureData.date && destinationData.date && distanceKm !== null) {
          const minDelivery = calculateMinDeliveryDate(tariff, distanceKm, departureData.date);
          if (minDelivery) {
            const requestedDeliveryDate = new Date(destinationData.date);
            if (requestedDeliveryDate < minDelivery.date) {
              isAvailable = false;
              reason = `Минимальная дата доставки: ${minDelivery.date.toLocaleDateString("ru-RU")}`;
            }
          }
        }
        return {
          ...tariff,
          isAvailable,
          reason
        };
      });
    }
    function calculateTariffCost(tariff) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const { calculationRules, packaging, defaultServices } = calculatorConfig.value;
      const { cargo, departure, destination, extraOptions, direction } = formData;
      const defaultPackage = ((_b = (_a = calculatorConfig.value.defaultValues) == null ? void 0 : _a.cargo) == null ? void 0 : _b.package) || {
        length: "30",
        width: "20",
        height: "10",
        weight: "1",
        description: "Посылка",
        declaredValue: 1e3,
        packaging: "box-s",
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
      };
      const packages = cargo.packages && cargo.packages.length > 0 ? cargo.packages.map((pkg) => {
        const useDefaultDimensions = !(parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0);
        return {
          ...pkg,
          weight: parseFloat(pkg.weight) > 0 ? parseFloat(pkg.weight) : parseFloat(defaultPackage.weight),
          length: useDefaultDimensions ? parseFloat(defaultPackage.length) : parseFloat(pkg.length),
          width: useDefaultDimensions ? parseFloat(defaultPackage.width) : parseFloat(pkg.width),
          height: useDefaultDimensions ? parseFloat(defaultPackage.height) : parseFloat(pkg.height),
          quantity: parseInt(pkg.quantity) > 0 ? parseInt(pkg.quantity) : 1
        };
      }) : [{
        ...defaultPackage,
        id: Date.now()
      }];
      const defaultDeliveryMode = ((_d = (_c = calculatorConfig.value.defaultValues) == null ? void 0 : _c.delivery) == null ? void 0 : _d.mode) || "terminal";
      const departureData = {
        deliveryMode: departure.deliveryMode || defaultDeliveryMode,
        location: departure.location || "",
        date: departure.date || (() => {
          const tomorrow = /* @__PURE__ */ new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow.toISOString().split("T")[0];
        })()
      };
      const destinationData = {
        deliveryMode: destination.deliveryMode || defaultDeliveryMode,
        location: destination.location || "",
        date: destination.date || ""
      };
      const extraOptionsData = {
        requiresAccompanyingDocs: extraOptions.requiresAccompanyingDocs || false,
        returnDocsToSender: extraOptions.returnDocsToSender || false
      };
      const details = [];
      const packageDetails = [];
      let totalWeight = 0, totalVolume = 0, maxDeclaredValue = 0;
      let hasAnyDangerousGoods = false, hasAnyTempControl = false;
      let totalPackagesCount = 0;
      let totalPackagingCost = 0, totalMarkingDiscount = 0;
      let distanceKm = null;
      if (offices.value && direction.from && direction.to) {
        let fromCoords = null;
        let toCoords = null;
        if (typeof departureData.location === "object" && departureData.location !== null && departureData.location.coordinates) {
          fromCoords = departureData.location.coordinates;
        } else if (typeof departureData.location === "string" && departureData.location.includes(",")) {
          const foundOffice = offices.value.find((o) => {
            const officeString = `${o.city}, ${o.address}`;
            return departureData.location.includes(officeString) || departureData.location.includes(o.address);
          });
          if (foundOffice && foundOffice.coordinates) {
            fromCoords = foundOffice.coordinates;
          }
        } else if (direction.from) {
          const office = offices.value.find((o) => o.city === direction.from);
          if (office && office.coordinates) {
            fromCoords = office.coordinates;
          }
        }
        if (typeof destinationData.location === "object" && destinationData.location !== null && destinationData.location.coordinates) {
          toCoords = destinationData.location.coordinates;
        } else if (typeof destinationData.location === "string" && destinationData.location.includes(",")) {
          const foundOffice = offices.value.find((o) => {
            const officeString = `${o.city}, ${o.address}`;
            return destinationData.location.includes(officeString) || destinationData.location.includes(o.address);
          });
          if (foundOffice && foundOffice.coordinates) {
            toCoords = foundOffice.coordinates;
          }
        } else if (direction.to) {
          const office = offices.value.find((o) => o.city === direction.to);
          if (office && office.coordinates) {
            toCoords = office.coordinates;
          }
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
      const deliveryTimeInfo = calculateDeliveryTime(tariff, distanceKm || 0);
      const minDeliveryInfo = calculateMinDeliveryDate(tariff, distanceKm || 0, departureData.date);
      packages.forEach((pkg, index2) => {
        var _a2, _b2;
        const weight = parseFloat(pkg.weight) || 0;
        const volume = parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height) / 1e6 || 0;
        const declaredValue = parseFloat(pkg.declaredValue) || 0;
        const quantity = parseInt(pkg.quantity) || 1;
        const packageWeight = weight * quantity;
        const packageVolume = volume * quantity;
        totalWeight += packageWeight;
        totalVolume += packageVolume;
        totalPackagesCount += quantity;
        maxDeclaredValue = Math.max(maxDeclaredValue, declaredValue);
        if (pkg.dangerousGoods) hasAnyDangerousGoods = true;
        if (pkg.tempControl) hasAnyTempControl = true;
        const singleWeightCost = weight * tariff.baseRatePerKg;
        const singleVolumeCost = volume * tariff.baseRatePerM3;
        const singleBaseCost = Math.max(singleWeightCost, singleVolumeCost, tariff.minCost / quantity);
        let packagePackagingCost = 0;
        if (pkg.packaging && packaging) {
          const packagingOption = packaging.find((p) => p.id === pkg.packaging);
          if (packagingOption && packagingOption.cost > 0) {
            packagePackagingCost = packagingOption.cost;
            totalPackagingCost += packagingOption.cost * quantity;
          }
        }
        let packageMarkingDiscount = 0;
        if (pkg.selfMarking && ((_b2 = (_a2 = tariff.services) == null ? void 0 : _a2.selfMarking) == null ? void 0 : _b2.enabled)) {
          packageMarkingDiscount = Math.abs(tariff.services.selfMarking.cost);
          totalMarkingDiscount += packageMarkingDiscount * quantity;
        }
        const packageInfo = {
          index: index2 + 1,
          description: pkg.description || `Место ${index2 + 1}`,
          dimensions: `${pkg.length || 0}×${pkg.width || 0}×${pkg.height || 0} см`,
          singleWeight: weight,
          singleVolume: volume,
          quantity,
          totalWeight: packageWeight,
          totalVolume: packageVolume,
          singleWeightCost,
          singleVolumeCost,
          singleBaseCost,
          totalBaseCost: singleBaseCost * quantity,
          packaging: pkg.packaging,
          packagingCost: packagePackagingCost,
          totalPackagingCost: packagePackagingCost * quantity,
          selfMarking: pkg.selfMarking,
          markingDiscount: packageMarkingDiscount,
          totalMarkingDiscount: packageMarkingDiscount * quantity,
          dangerousGoods: pkg.dangerousGoods,
          tempControl: pkg.tempControl,
          declaredValue
        };
        packageDetails.push(packageInfo);
      });
      let distanceCost = 0;
      const distanceCoefficient = (calculationRules == null ? void 0 : calculationRules.distanceCoefficient) || 10;
      if (offices.value && direction.from && direction.to) {
        let fromCoordsDistance = null;
        let toCoordsDistance = null;
        if (typeof departureData.location === "object" && departureData.location !== null && departureData.location.coordinates) {
          fromCoordsDistance = departureData.location.coordinates;
        } else if (typeof departureData.location === "string" && departureData.location.includes(",")) {
          const foundOffice = offices.value.find((o) => {
            const officeString = `${o.city}, ${o.address}`;
            return departureData.location.includes(officeString) || departureData.location.includes(o.address);
          });
          if (foundOffice && foundOffice.coordinates) {
            fromCoordsDistance = foundOffice.coordinates;
          }
        } else if (direction.from) {
          const office = offices.value.find((o) => o.city === direction.from);
          if (office && office.coordinates) {
            fromCoordsDistance = office.coordinates;
          }
        }
        if (typeof destinationData.location === "object" && destinationData.location !== null && destinationData.location.coordinates) {
          toCoordsDistance = destinationData.location.coordinates;
        } else if (typeof destinationData.location === "string" && destinationData.location.includes(",")) {
          const foundOffice = offices.value.find((o) => {
            const officeString = `${o.city}, ${o.address}`;
            return destinationData.location.includes(officeString) || destinationData.location.includes(o.address);
          });
          if (foundOffice && foundOffice.coordinates) {
            toCoordsDistance = foundOffice.coordinates;
          }
        } else if (direction.to) {
          const office = offices.value.find((o) => o.city === direction.to);
          if (office && office.coordinates) {
            toCoordsDistance = office.coordinates;
          }
        }
        if (fromCoordsDistance && toCoordsDistance) {
          distanceKm = getDistanceKm(
            parseFloat(fromCoordsDistance[0]),
            parseFloat(fromCoordsDistance[1]),
            parseFloat(toCoordsDistance[0]),
            parseFloat(toCoordsDistance[1])
          );
          distanceCost = distanceKm * distanceCoefficient;
        }
      }
      const weightCost = totalWeight * tariff.baseRatePerKg;
      const volumeCost = totalVolume * tariff.baseRatePerM3;
      let baseCost = Math.max(weightCost, volumeCost, tariff.minCost);
      if (packageDetails.length > 0) {
        details.push({ name: "ДЕТАЛИЗАЦИЯ ПО МЕСТАМ", cost: 0, isHeader: true });
        packageDetails.forEach((pkgDetail) => {
          const placeTitle = pkgDetail.quantity > 1 ? `${pkgDetail.description} (×${pkgDetail.quantity})` : pkgDetail.description;
          details.push({ name: placeTitle, cost: 0, isSubHeader: true });
          details.push({
            name: `  Размеры: ${pkgDetail.dimensions}, объем: ${pkgDetail.singleVolume.toFixed(3)} м³`,
            cost: 0,
            isDetail: true
          });
          if (pkgDetail.quantity > 1) {
            details.push({
              name: `  Вес одного места: ${pkgDetail.singleWeight.toFixed(1)} кг`,
              cost: 0,
              isDetail: true
            });
            details.push({
              name: `  Общий вес: ${pkgDetail.totalWeight.toFixed(1)} кг (${pkgDetail.singleWeight.toFixed(1)} × ${pkgDetail.quantity})`,
              cost: 0,
              isDetail: true
            });
          } else {
            details.push({
              name: `  Вес: ${pkgDetail.singleWeight.toFixed(1)} кг`,
              cost: 0,
              isDetail: true
            });
          }
          if (pkgDetail.quantity > 1) {
            details.push({
              name: `  Базовая стоимость одного места:`,
              cost: pkgDetail.singleBaseCost,
              isDetailCost: true
            });
            details.push({
              name: `  Стоимость всех мест (×${pkgDetail.quantity}):`,
              cost: pkgDetail.totalBaseCost,
              isDetailCost: true
            });
          } else {
            details.push({
              name: `  Базовая стоимость места:`,
              cost: pkgDetail.singleBaseCost,
              isDetailCost: true
            });
          }
          if (pkgDetail.totalPackagingCost > 0) {
            if (pkgDetail.quantity > 1) {
              details.push({
                name: `  Упаковка (×${pkgDetail.quantity}):`,
                cost: pkgDetail.totalPackagingCost,
                isDetailCost: true
              });
            } else {
              details.push({
                name: `  Упаковка:`,
                cost: pkgDetail.totalPackagingCost,
                isDetailCost: true
              });
            }
          }
          if (pkgDetail.totalMarkingDiscount > 0) {
            if (pkgDetail.quantity > 1) {
              details.push({
                name: `  Самостоятельная маркировка (×${pkgDetail.quantity}):`,
                cost: -pkgDetail.totalMarkingDiscount,
                isDetailCost: true
              });
            } else {
              details.push({
                name: `  Самостоятельная маркировка:`,
                cost: -pkgDetail.totalMarkingDiscount,
                isDetailCost: true
              });
            }
          }
          if (pkgDetail.dangerousGoods) {
            details.push({
              name: `  ⚠️ Опасный груз`,
              cost: 0,
              isDetail: true
            });
          }
          if (pkgDetail.tempControl) {
            details.push({
              name: `  🌡️ Температурный режим`,
              cost: 0,
              isDetail: true
            });
          }
          if (pkgDetail.declaredValue > 0) {
            details.push({
              name: `  💎 Оценочная стоимость: ${pkgDetail.declaredValue.toLocaleString("ru-RU")} ₽`,
              cost: 0,
              isDetail: true
            });
          }
        });
        details.push({ name: "ИТОГО ПО МЕСТАМ", cost: 0, isHeader: true });
        details.push({
          name: `Общее количество мест: ${totalPackagesCount}`,
          cost: 0,
          isDetail: true
        });
        details.push({
          name: `Общий вес: ${totalWeight.toFixed(1)} кг`,
          cost: 0,
          isDetail: true
        });
        details.push({
          name: `Общий объем: ${totalVolume.toFixed(3)} м³`,
          cost: 0,
          isDetail: true
        });
        details.push({ name: "РАСЧЕТ ТАРИФА", cost: 0, isHeader: true });
      }
      details.push({
        name: `По весу: ${totalWeight.toFixed(1)} кг × ${tariff.baseRatePerKg} ₽/кг`,
        cost: weightCost
      });
      details.push({
        name: `По объему: ${totalVolume.toFixed(3)} м³ × ${tariff.baseRatePerM3} ₽/м³`,
        cost: volumeCost
      });
      let totalMultiplier = 1;
      const tariffCoefficients = tariff.coefficients || {};
      if (hasAnyDangerousGoods && tariffCoefficients.dangerousGoodsMultiplier) {
        const multiplier = tariffCoefficients.dangerousGoodsMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: "Наценка за опасный груз", cost: markup });
      }
      if (hasAnyTempControl && tariffCoefficients.temperatureControlMultiplier) {
        const multiplier = tariffCoefficients.temperatureControlMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: "Наценка за температурный режим", cost: markup });
      }
      if (departureData.deliveryMode === "address" && tariffCoefficients.fromAddressMultiplier) {
        const multiplier = tariffCoefficients.fromAddressMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: "Забор от адреса", cost: markup });
      }
      if (destinationData.deliveryMode === "address" && tariffCoefficients.toAddressMultiplier) {
        const multiplier = tariffCoefficients.toAddressMultiplier;
        totalMultiplier *= multiplier;
        const markup = baseCost * (multiplier - 1);
        details.push({ name: "Доставка до адреса", cost: markup });
      }
      if (totalPackagesCount >= (((_e = tariffCoefficients.multiplePackagesDiscount) == null ? void 0 : _e.threshold) || 5) && tariffCoefficients.multiplePackagesDiscount) {
        const multiplier = tariffCoefficients.multiplePackagesDiscount.value;
        totalMultiplier *= multiplier;
        const discount = baseCost * (1 - multiplier);
        details.push({ name: `Скидка за множественные места (${totalPackagesCount} шт.)`, cost: -discount });
      }
      const adjustedBaseCost = baseCost * totalMultiplier;
      let additionalServicesCost = 0;
      const tariffServices = tariff.services || {};
      if (totalPackagingCost > 0) {
        additionalServicesCost += totalPackagingCost;
      }
      if (totalMarkingDiscount > 0) {
        additionalServicesCost -= totalMarkingDiscount;
      }
      if (distanceCost > 0) {
        additionalServicesCost += distanceCost;
        details.push({ name: `Расстояние: ${distanceKm.toFixed(2)} км (${distanceCoefficient} ₽/км)`, cost: distanceCost });
      }
      if (((_f = tariffServices.logisticProcessing) == null ? void 0 : _f.enabled) && tariffServices.logisticProcessing.cost > 0) {
        additionalServicesCost += tariffServices.logisticProcessing.cost;
        details.push({ name: defaultServices.logisticProcessing.name, cost: tariffServices.logisticProcessing.cost });
      }
      if (extraOptionsData.returnDocsToSender && ((_g = tariffServices.documentReturn) == null ? void 0 : _g.enabled)) {
        additionalServicesCost += tariffServices.documentReturn.cost;
        details.push({ name: defaultServices.documentReturn.name, cost: tariffServices.documentReturn.cost });
      }
      if (extraOptionsData.requiresAccompanyingDocs && ((_h = tariffServices.statusInfo) == null ? void 0 : _h.enabled)) {
        additionalServicesCost += tariffServices.statusInfo.cost;
        details.push({ name: defaultServices.statusInfo.name, cost: tariffServices.statusInfo.cost });
      }
      if (((_i = tariffServices.insurance) == null ? void 0 : _i.enabled) && maxDeclaredValue && maxDeclaredValue > 0) {
        const insuranceCost = Math.max(
          maxDeclaredValue * tariffServices.insurance.rate,
          tariffServices.insurance.min
        );
        additionalServicesCost += insuranceCost;
        details.push({
          name: `${defaultServices.insurance.name} (${(tariffServices.insurance.rate * 100).toFixed(1)}% от ${maxDeclaredValue.toLocaleString("ru-RU")} ₽)`,
          cost: insuranceCost
        });
      }
      const finalCost = adjustedBaseCost + additionalServicesCost;
      const summary = {
        baseCost: adjustedBaseCost,
        additionalServices: additionalServicesCost - distanceCost,
        // Services without distance
        distance: distanceCost,
        multiplier: totalMultiplier
      };
      return {
        tariff,
        totalCost: finalCost,
        details,
        packageDetails,
        summary,
        // Добавляем информацию о времени доставки
        deliveryInfo: deliveryTimeInfo,
        minDeliveryDate: minDeliveryInfo,
        distanceKm
      };
    }
    async function fetchData() {
      try {
        const [officesRes, configRes] = await Promise.all([
          fetch("/local/assets/data/contacts.json"),
          fetch("./assets/data/calculator-data.json")
        ]);
        const officesData = await officesRes.json();
        offices.value = officesData.offices || [];
        calculatorConfig.value = await configRes.json();
        const urlParams = new URLSearchParams(window.location.search);
        const fromId = urlParams.get("from");
        const toId = urlParams.get("to");
        if (fromId) {
          const office = offices.value.find((o) => o.id === parseInt(fromId));
          if (office) {
            formData.direction.from = office.city;
            formData.departure.location = office;
          }
        }
        if (toId) {
          const office = offices.value.find((o) => o.id === parseInt(toId));
          if (office) {
            formData.direction.to = office.city;
            formData.destination.location = office;
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
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
      const { direction } = formData;
      if (!direction.from || !direction.to) return false;
      return true;
    }
    const calculationResult = computed(() => {
      if (!calculatorConfig.value.tariffs || !formData.direction.from || !formData.direction.to) {
        return {
          isValid: false,
          message: "Заполните города отправления и назначения",
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
            totalCost: calculation.totalCost,
            details: calculation.details,
            packageDetails: calculation.packageDetails,
            summary: calculation.summary,
            deliveryInfo: calculation.deliveryInfo,
            minDeliveryDate: calculation.minDeliveryInfo,
            distanceKm: calculation.distanceKm
          };
        } else {
          return {
            ...tariff,
            totalCost: null,
            details: [],
            summary: null,
            deliveryInfo: null,
            minDeliveryDate: null,
            distanceKm: null
          };
        }
      });
      const available = tariffCalculations.filter((t) => t.isAvailable).sort((a, b) => a.totalCost - b.totalCost);
      const unavailable = tariffCalculations.filter((t) => !t.isAvailable).sort((a, b) => a.priority - b.priority);
      const basicTariff = available.find((t) => t.id === "cargo-basic");
      const basicCost = basicTariff ? basicTariff.totalCost : null;
      const availableWithSavings = available.map((tariff, index2) => {
        let savingsAmount = 0;
        let isRecommended = false;
        if (basicCost && tariff.totalCost < basicCost) {
          savingsAmount = basicCost - tariff.totalCost;
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
        isValid: availableWithSavings.length > 0,
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
    function selectTariff(tariffId) {
      formData.selectedTariff = tariffId;
    }
    onMounted(fetchData);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[5] || (_cache[5] = createBaseVNode("div", { class: "title-wrapper mb-6" }, [
          createBaseVNode("h1", { class: "animated-title text-center text-h2 mb-2" }, "Калькулятор стоимости пересылки")
        ], -1)),
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createVNode(_sfc_main$b, {
                offices: offices.value,
                modelValue: formData.direction,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.direction = $event),
                onlyCities: true
              }, null, 8, ["offices", "modelValue"])
            ]),
            createBaseVNode("div", _hoisted_4, [
              calculatorConfig.value.packaging ? (openBlock(), createBlock(_sfc_main$5, {
                key: 0,
                "calculator-config": calculatorConfig.value,
                modelValue: formData.cargo,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.cargo = $event)
              }, null, 8, ["calculator-config", "modelValue"])) : createCommentVNode("", true),
              createVNode(_sfc_main$3, {
                title: "Пункт отправки",
                "terminal-label": "Сдать на терминале",
                "address-label": "Забрать по адресу",
                "name-prefix": "departure",
                city: formData.direction.from,
                offices: offices.value,
                modelValue: formData.departure,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.departure = $event)
              }, null, 8, ["city", "offices", "modelValue"]),
              createVNode(_sfc_main$3, {
                title: "Пункт назначения",
                "terminal-label": "Получить на терминале",
                "address-label": "Доставить по адресу",
                "name-prefix": "destination",
                city: formData.direction.to,
                offices: offices.value,
                modelValue: formData.destination,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.destination = $event)
              }, null, 8, ["city", "offices", "modelValue"]),
              createVNode(_sfc_main$2, {
                modelValue: formData.extraOptions,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.extraOptions = $event)
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_5, [
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
