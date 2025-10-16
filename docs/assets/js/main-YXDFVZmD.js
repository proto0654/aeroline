import "./chunks/global-modal-BWTPTdhn.js";
import "./mainJs-CV2jXQD7.js";
import { c as create$3, d as create$7, a as create$6 } from "./globalUiJs-CvOT7_7X.js";
import { D as createApp, R as h, c as createElementBlock, o as openBlock, a as createBaseVNode, E as createVNode, w as withModifiers, A as unref } from "./chunks/runtime-dom.esm-bundler-cJ5wxxpw.js";
import { _ as _sfc_main$1, C as CheckboxInput } from "./chunks/CheckboxInput-BrPGLlrK.js";
import { a as apiService } from "./chunks/apiService-WO6BkSV4.js";
import { i as initHomePage } from "./homePageJs-D1esXqNr.js";
import { u as useGlobalModalStore } from "./chunks/globalModal-BsIq6B_a.js";
import { a as useForm, T as TextInput } from "./chunks/TextInput-okLtxo6B.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/AutocompleteInput-Be-2lfM1.js";
import "./chunks/select-arrow-He2ejS2L.js";
import "./chunks/NewsDetailModal-Cy0tCnZ-.js";
async function initDirectionForm() {
  const directionFormElement = document.getElementById("direction-form-app");
  if (!directionFormElement) return;
  try {
    const billingAddressesData = await apiService.getBillingAddresses();
    const localitiesData = await apiService.getLocalitiesWithRelations();
    const directionApp = createApp({
      data() {
        return {
          billingAddresses: billingAddressesData || [],
          localities: localitiesData || [],
          direction: {
            from: "",
            to: ""
          }
        };
      },
      methods: {
        onDirectionChange(newDirection) {
          this.direction = newDirection;
          console.log("Направление изменено:", newDirection);
        }
      },
      render() {
        return h(_sfc_main$1, {
          billingAddresses: this.billingAddresses,
          localities: this.localities,
          modelValue: this.direction,
          showCalculateButton: true,
          showTitle: false,
          "onUpdate:modelValue": this.onDirectionChange
        });
      }
    });
    directionApp.mount(directionFormElement);
  } catch (error) {
    console.error("Ошибка при загрузке данных адресов:", error);
    const directionApp = createApp({
      data() {
        return {
          billingAddresses: [],
          localities: [],
          direction: { from: "", to: "" }
        };
      },
      render() {
        return h(_sfc_main$1, {
          billingAddresses: this.billingAddresses,
          localities: this.localities,
          modelValue: this.direction,
          showCalculateButton: true,
          showTitle: false
        });
      }
    });
    directionApp.mount(directionFormElement);
  }
}
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
document.addEventListener("DOMContentLoaded", async () => {
  initHomePage();
  useGlobalModalStore();
  const contactFormElement = document.getElementById("contact-form-app");
  if (contactFormElement) {
    createApp(ContactForm).mount(contactFormElement);
  }
  await initDirectionForm();
});
