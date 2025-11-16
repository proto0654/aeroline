import { p as computed, v as toRef, q as watch, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, t as toDisplayString, x as withDirectives, y as vModelText, z as unref, A as mergeProps, i as isRef } from "./runtime-dom.esm-bundler-BeftXQEh.js";
import { u as useField } from "./TextInput-BUdG7Qkf.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = ["for"];
const _hoisted_2 = { class: "relative w-full" };
const _hoisted_3 = ["id", "placeholder", "disabled", "required", "rows"];
const _hoisted_4 = {
  key: 0,
  class: "text-brand-red absolute right-3 top-3 text-lg font-bold pointer-events-none"
};
const _hoisted_5 = {
  key: 1,
  class: "base-form-error"
};
const _hoisted_6 = {
  key: 2,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main = {
  __name: "TextareaInput",
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
    rows: {
      type: [String, Number],
      default: 4
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
      type: String,
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
    const inputId = computed(() => props.id || `textarea-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
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
          withDirectives(createBaseVNode("textarea", mergeProps({
            class: "vue-form-field w-full",
            id: inputId.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
            placeholder: __props.placeholder,
            disabled: __props.disabled,
            required: __props.required,
            rows: __props.rows
          }, _ctx.$attrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
            class: [
              unref(errorMessage) ? "border-red-500" : "",
              __props.disabled ? "bg-gray-100 cursor-not-allowed" : ""
            ]
          }), null, 16, _hoisted_3), [
            [vModelText, unref(inputValue)]
          ]),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_4, "*")) : createCommentVNode("", true)
        ]),
        unref(errorMessage) ? (openBlock(), createElementBlock("p", _hoisted_5, toDisplayString(unref(errorMessage)), 1)) : __props.hint ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const TextareaInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7763e18"]]);
export {
  TextareaInput as T
};
