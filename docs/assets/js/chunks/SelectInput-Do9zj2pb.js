import { p as computed, D as toRef, q as watch, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, t as toDisplayString, y as withDirectives, E as vModelSelect, A as unref, G as mergeProps, i as isRef, F as Fragment, C as renderList } from "./runtime-dom.esm-bundler-BEj-0d2c.js";
import { _ as _imports_0 } from "./select-arrow-He2ejS2L.js";
import { u as useField } from "./TextInput-BzNOv0NB.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = ["for"];
const _hoisted_2 = { class: "relative" };
const _hoisted_3 = ["id", "disabled", "required"];
const _hoisted_4 = {
  key: 0,
  value: "",
  disabled: ""
};
const _hoisted_5 = ["value"];
const _hoisted_6 = {
  key: 0,
  class: "text-brand-red absolute right-8 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
};
const _hoisted_7 = {
  key: 1,
  class: "base-form-error"
};
const _hoisted_8 = {
  key: 2,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main = {
  __name: "SelectInput",
  props: {
    name: {
      type: String,
      required: true
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
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputId = computed(() => props.id || `select-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
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
      return openBlock(), createElementBlock("div", null, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: inputId.value,
          class: ""
        }, toDisplayString(__props.label), 9, _hoisted_1)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2, [
          withDirectives(createBaseVNode("select", mergeProps({
            class: "vue-form-field appearance-none",
            id: inputId.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
            class: [
              unref(errorMessage) ? "border-red-500" : "",
              __props.disabled ? "bg-gray-100 cursor-not-allowed" : ""
            ]
          }), [
            __props.placeholder ? (openBlock(), createElementBlock("option", _hoisted_4, toDisplayString(__props.placeholder), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
              return openBlock(), createElementBlock("option", {
                key: option.value,
                value: option.value
              }, toDisplayString(option.label), 9, _hoisted_5);
            }), 128))
          ], 16, _hoisted_3), [
            [vModelSelect, unref(inputValue)]
          ]),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_6, "*")) : createCommentVNode("", true),
          _cache[2] || (_cache[2] = createBaseVNode("img", {
            src: _imports_0,
            alt: "",
            class: "absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          }, null, -1))
        ]),
        unref(errorMessage) ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(unref(errorMessage)), 1)) : __props.hint ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const SelectInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ef7d8368"]]);
export {
  SelectInput as S
};
