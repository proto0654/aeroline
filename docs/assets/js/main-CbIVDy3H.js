import "./chunks/global-modal-BtWx8YKa.js";
import "./mainJs-B6nrBSwm.js";
import { d as useField, c as create$3, e as create$7, a as create$6, u as useForm, T as TextInput } from "./globalUiJs-DEYqS53d.js";
import { s as computed, W as toRef, w as watch, c as createElementBlock, o as openBlock, b as createBaseVNode, e as createCommentVNode, U as withDirectives, X as vModelCheckbox, u as unref, B as mergeProps, i as isRef, J as renderSlot, d as createTextVNode, t as toDisplayString, a as createVNode, f as withModifiers, E as createApp } from "./chunks/runtime-dom.esm-bundler-ga6ljDpR.js";
import { i as initHomePage } from "./homePageJs-CIP9F7z4.js";
import { u as useGlobalModalStore } from "./chunks/globalModal-CT_hlU_k.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/autocomplete-CjR2TxGO.js";
import "./chunks/NewsDetailModal-Dxlusbak.js";
const _hoisted_1 = { class: "flex items-start relative" };
const _hoisted_2 = { class: "flex items-center h-6 mt-1" };
const _hoisted_3 = ["id", "disabled", "required"];
const _hoisted_4 = ["for"];
const _hoisted_5 = {
  key: 0,
  class: "base-form-error ml-2"
};
const _sfc_main$1 = {
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
const CheckboxInput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bd8eebe4"]]);
const _sfc_main = {
  __name: "ContactForm",
  setup(__props) {
    const schema = create$3({
      name: create$6().required('Поле "Имя" обязательно для заполнения'),
      phone: create$6().required('Поле "Телефон" обязательно для заполнения').matches(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d{3}[- .]?\d{4}$/, "Неверный формат номера телефона"),
      consent: create$7().oneOf([true], "Необходимо согласие на обработку персональных данных").required("Необходимо согласие")
    });
    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema
    });
    const onSubmit = handleSubmit((values) => {
      console.log("Form submitted with values:", values);
      alert("Форма успешно отправлена (имитация)");
      resetForm();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("form", {
        class: "form space-y-4",
        onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"]))
      }, [
        createBaseVNode("div", null, [
          createVNode(TextInput, {
            name: "name",
            label: "Имя",
            placeholder: "Имя",
            required: true,
            class: ""
          })
        ]),
        createBaseVNode("div", null, [
          createVNode(TextInput, {
            name: "phone",
            label: "Телефон",
            placeholder: "+7 (___) ___-__-__",
            required: true,
            type: "tel",
            class: ""
          })
        ]),
        _cache[1] || (_cache[1] = createBaseVNode("button", {
          type: "submit",
          class: "btn text-white px-6 py-3 rounded-lg text-buttons w-full"
        }, " Отправить ", -1)),
        createVNode(CheckboxInput, {
          name: "consent",
          required: true,
          label: "Согласен на обработку персональных данных, ознакомлен с пользовательским соглашением и политикой конфиденциальности",
          id: "consent-checkbox",
          class: "mt-2"
        })
      ], 32);
    };
  }
};
const ContactForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3bd91543"]]);
document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
  useGlobalModalStore();
  const contactFormElement = document.getElementById("contact-form-app");
  if (contactFormElement) {
    createApp(ContactForm).mount(contactFormElement);
  }
});
