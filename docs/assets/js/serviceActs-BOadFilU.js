import "./chunks/global-modal-dZf6PbYv.js";
import "./mainJs-C_mRkBSU.js";
import { c as create$3, a as create$6, e as create$4, B as BaseForm } from "./globalUiJs-Bq6ceTVX.js";
import { r as ref, D as createBlock, o as openBlock, a0 as withCtx, I as createVNode, a as createBaseVNode, c as createElementBlock, d as createCommentVNode, A as unref, t as toDisplayString, H as createApp, p as computed, Q as toRef, q as watch, y as withDirectives, z as vModelText, E as mergeProps, i as isRef, P as defineComponent, v as onMounted, b as createTextVNode } from "./chunks/runtime-dom.esm-bundler-DZCqFWTW.js";
import { a as useForm, u as useField, T as TextInput } from "./chunks/TextInput-DRKSnHb_.js";
import { D as DateRangeFilter } from "./chunks/DateRangeFilter-DlQtVGNo.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { c as createPinia } from "./chunks/globalModal-WavfrdGt.js";
import { E as EasyDataTableWrapper } from "./chunks/EasyDataTableWrapper-CfG6tW4E.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/ru.es-BU9Gbdrk.js";
import "./lkDatepickerJs-iq-wnAN6.js";
const _hoisted_1$3 = { class: "form-control w-full" };
const _hoisted_2$2 = {
  key: 0,
  class: "base-form-error"
};
const _sfc_main$4 = {
  __name: "RequestActForm",
  props: {
    initialDateRange: {
      type: Array,
      default: () => [null, null]
    }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const schema = create$3({
      email: create$6().required("Email обязателен").email("Неверный формат email"),
      dateRange: create$3().shape({
        start: create$4().required("Начальная дата обязательна").nullable(),
        end: create$4().required("Конечная дата обязательна").nullable()
      }).test(
        "is-date-range-selected",
        "Пожалуйста, выберите период для акта сверки",
        (value) => {
          return value && value.start && value.end;
        }
      ).required("Период для акта сверки обязателен")
    });
    const initialValues = {
      email: "",
      dateRange: {
        start: props.initialDateRange ? props.initialDateRange[0] : null,
        end: props.initialDateRange ? props.initialDateRange[1] : null
      }
    };
    const { handleSubmit, errors, resetForm, setFieldValue } = useForm({
      validationSchema: schema,
      initialValues
    });
    const { value: dateRangeValue, errorMessage: dateRangeErrorMessage } = useField("dateRange");
    const handleDateChange = (payload) => {
      setFieldValue("dateRange", payload);
    };
    ref(null);
    const onSubmit = handleSubmit(async (values) => {
      console.log("Форма запроса акта сверки отправлена:", values);
      emit("success", {
        success: true,
        message: `Запрос на акт сверки за период ${formatRange(values.dateRange.start, values.dateRange.end)} отправлен на ${values.email}`,
        resetAfterSubmit: true
        // Instruct BaseForm to reset
      });
      handleDateChange({ start: null, end: null });
    });
    const onCancel = () => {
      console.log("Форма запроса акта сверки отменена.");
      resetForm();
      handleDateChange({ start: null, end: null });
    };
    const formatRange = (start, end) => {
      if (!start || !end) return "";
      const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
      };
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);
      return `${formattedStart} - ${formattedEnd}`;
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(BaseForm, {
        "validation-schema": unref(schema),
        "on-submit": unref(onSubmit),
        "submit-button-text": "ОТПРАВИТЬ ЗАПРОС",
        onCancel
      }, {
        default: withCtx(() => [
          createVNode(TextInput, {
            name: "email",
            label: "Email",
            placeholder: "Введите email",
            type: "email",
            required: true
          }),
          createBaseVNode("div", _hoisted_1$3, [
            _cache[0] || (_cache[0] = createBaseVNode("label", { class: "label" }, [
              createBaseVNode("span", { class: "label-text text-brand-gray font-medium" }, "Период для акта сверки"),
              createBaseVNode("span", { class: "text-brand-red text-lg font-bold" }, "*")
            ], -1)),
            createVNode(DateRangeFilter, {
              "initial-start-date": __props.initialDateRange ? __props.initialDateRange[0] : null,
              "initial-end-date": __props.initialDateRange ? __props.initialDateRange[1] : null,
              onDateRangeChanged: handleDateChange,
              "close-on-select": true
            }, null, 8, ["initial-start-date", "initial-end-date"]),
            unref(dateRangeErrorMessage) ? (openBlock(), createElementBlock("p", _hoisted_2$2, toDisplayString(unref(dateRangeErrorMessage)), 1)) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["validation-schema", "on-submit"]);
    };
  }
};
const RequestActForm = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e36349ff"]]);
document.addEventListener("DOMContentLoaded", () => {
  const requestActApp = createApp(RequestActForm);
  requestActApp.mount("#request-act-form-app");
});
const _hoisted_1$2 = ["for"];
const _hoisted_2$1 = { class: "relative" };
const _hoisted_3$1 = ["id", "placeholder", "disabled", "required", "rows"];
const _hoisted_4$1 = {
  key: 0,
  class: "text-brand-red absolute right-3 top-3 text-lg font-bold pointer-events-none"
};
const _hoisted_5$1 = {
  key: 1,
  class: "base-form-error"
};
const _hoisted_6$1 = {
  key: 2,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main$3 = {
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
        }, toDisplayString(__props.label), 9, _hoisted_1$2)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$1, [
          withDirectives(createBaseVNode("textarea", mergeProps({
            class: "vue-form-field",
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
          }), null, 16, _hoisted_3$1), [
            [vModelText, unref(inputValue)]
          ]),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_4$1, "*")) : createCommentVNode("", true)
        ]),
        unref(errorMessage) ? (openBlock(), createElementBlock("p", _hoisted_5$1, toDisplayString(unref(errorMessage)), 1)) : __props.hint ? (openBlock(), createElementBlock("p", _hoisted_6$1, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const TextareaInput = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-16bd0279"]]);
const _sfc_main$2 = {
  __name: "EmailSendForm",
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const emailSendSchema = create$3({
      email: create$6().required("Введите email").email("Введите корректный email"),
      message: create$6()
    });
    const defaultValues = {
      email: "",
      message: ""
    };
    const initialValues = computed(() => {
      return { ...defaultValues, ...props.initialData };
    });
    const handleSubmit = async (values) => {
      try {
        emit("submit", values);
        return {
          success: true,
          message: "Письмо успешно отправлено!",
          data: values,
          resetAfterSubmit: true
          // Сбрасываем форму после отправки
        };
      } catch (error) {
        throw new Error((error == null ? void 0 : error.message) || "Произошла ошибка при отправке письма");
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(BaseForm, {
        class: "vue-form",
        "validation-schema": unref(emailSendSchema),
        "initial-values": initialValues.value,
        "on-submit": handleSubmit,
        "submit-button-text": "Отправить",
        onCancel: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel"))
      }, {
        default: withCtx(({ errors, values }) => [
          createVNode(TextInput, {
            class: "vue-form-field",
            name: "email",
            label: "Email",
            placeholder: "Введите email для отправки",
            required: "",
            type: "email"
          }),
          createVNode(TextareaInput, {
            class: "vue-form-field",
            name: "message",
            label: "Комментарий",
            placeholder: "Введите комментарий к письму",
            rows: "4"
          })
        ]),
        _: 1
      }, 8, ["validation-schema", "initial-values"]);
    };
  }
};
const _hoisted_1$1 = { class: "modal-content" };
const _sfc_main$1 = {
  __name: "EmailSendModal",
  props: {
    // modalId: { // Удаляем prop modalId
    //   type: String,
    //   default: 'email-send-modal'
    // },
    initialData: {
      type: Object,
      default: () => ({})
    },
    actId: {
      type: [String, Number],
      default: null
    }
  },
  emits: ["submit", "close", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleSubmit = (values) => {
      const submitData = {
        ...values,
        actId: props.actId
      };
      emit("submit", submitData);
    };
    const closeModal = () => {
      emit("cancel");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _cache[0] || (_cache[0] = createBaseVNode("h3", { class: "text-h4 font-bold text-brand-gray mb-4" }, "Отправить по email", -1)),
        _cache[1] || (_cache[1] = createBaseVNode("p", { class: "text-body-secondary text-brand-gray mb-6" }, "Введите email для отправки акта выполненных работ", -1)),
        createVNode(_sfc_main$2, {
          "initial-data": __props.initialData,
          onSubmit: handleSubmit,
          onCancel: closeModal
        }, null, 8, ["initial-data"])
      ]);
    };
  }
};
const _hoisted_1 = { class: "form-control w-full mb-6" };
const _hoisted_2 = { class: "text-brand-gray text-center text-center block" };
const _hoisted_3 = { class: "text-brand-gray text-center text-center block" };
const _hoisted_4 = { class: "text-brand-gray text-center block" };
const _hoisted_5 = { class: "text-brand-gray" };
const _hoisted_6 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServiceActsPage",
  setup(__props) {
    const initialItems = ref([]);
    const searchTerm = ref("");
    onMounted(() => {
      if (window.initialData && window.initialData.serviceActs) {
        initialItems.value = window.initialData.serviceActs;
        console.log("ServiceActsPage: initialItems loaded", initialItems.value);
      }
    });
    const headers = ref([
      { text: "Дата", value: "date", sortable: true, width: 80 },
      { text: "Номер акта", value: "actNumber", sortable: true, width: 150 },
      { text: "Сумма", value: "amount", sortable: true, width: 80 },
      { text: "Название организации", value: "organizationName", sortable: true },
      { text: "Действие", value: "action", sortable: false, width: 200 }
    ]);
    const filteredItems = computed(() => {
      let items = initialItems.value;
      console.log("ServiceActsPage: Filtering items with searchTerm", searchTerm.value);
      if (searchTerm.value) {
        const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
        items = items.filter((item) => {
          const dateMatch = item.date.toLowerCase().includes(lowerCaseSearchTerm);
          const actNumberMatch = item.actNumber.toLowerCase().includes(lowerCaseSearchTerm);
          const amountMatch = item.amount.toString().toLowerCase().includes(lowerCaseSearchTerm);
          const organizationNameMatch = item.organizationName.toLowerCase().includes(lowerCaseSearchTerm);
          console.log(`Item: ${item.actNumber}, Search: ${lowerCaseSearchTerm}, DateMatch: ${dateMatch}, ActNumberMatch: ${actNumberMatch}, AmountMatch: ${amountMatch}, OrgNameMatch: ${organizationNameMatch}`);
          return dateMatch || actNumberMatch || amountMatch || organizationNameMatch;
        });
      }
      console.log("ServiceActsPage: Filtered items count", items.length);
      return items;
    });
    const handleSearch = (value) => {
      searchTerm.value = value;
      console.log("ServiceActsPage: searchTerm updated", searchTerm.value);
    };
    const openSendEmailModal = async (item) => {
      try {
        const result = await window.globalModalStore.openModal(
          _sfc_main$1,
          { actNumber: item.actNumber, organizationName: item.organizationName },
          "default"
        );
      } catch (error) {
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1, [
          createVNode(EasyDataTableWrapper, {
            headers: headers.value,
            items: filteredItems.value,
            searchable: true,
            "search-placeholder": "Поиск по дате, номеру акта, сумме или организации",
            "show-index": false,
            "onUpdate:search": handleSearch
          }, {
            "item-date": withCtx((item) => [
              createBaseVNode("span", _hoisted_2, toDisplayString(item.date), 1)
            ]),
            "item-actNumber": withCtx((item) => [
              createBaseVNode("span", _hoisted_3, toDisplayString(item.actNumber), 1)
            ]),
            "item-amount": withCtx((item) => [
              createBaseVNode("span", _hoisted_4, toDisplayString(item.amount), 1)
            ]),
            "item-organizationName": withCtx((item) => [
              createBaseVNode("span", _hoisted_5, toDisplayString(item.organizationName), 1)
            ]),
            "item-action": withCtx((item) => [
              createBaseVNode("button", {
                class: "send-email-btn w-full flex items-center justify-center gap-1 text-brand-blue",
                onClick: ($event) => openSendEmailModal(item)
              }, _cache[0] || (_cache[0] = [
                createBaseVNode("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createBaseVNode("path", {
                    d: "M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1),
                createTextVNode("Отправить на почту ")
              ]), 8, _hoisted_6)
            ]),
            _: 1
          }, 8, ["headers", "items"])
        ])
      ]);
    };
  }
});
const ServiceActsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7807888"]]);
const app = createApp(ServiceActsPage);
const pinia = createPinia();
app.use(pinia);
app.mount("#service-acts-table-app");
