import { a as useForm, c as create$3, b as create$6, T as TextInput } from "./chunks/TextInput-BzNOv0NB.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { D as toRef, r as ref, q as watch, c as createElementBlock, o as openBlock, L as renderSlot, d as createCommentVNode, A as unref, B as normalizeClass, a as createBaseVNode, t as toDisplayString, b as createTextVNode, K as createVNode, M as withCtx } from "./chunks/runtime-dom.esm-bundler-BEj-0d2c.js";
const _hoisted_1$1 = { class: "flex items-center" };
const _hoisted_2$1 = {
  key: 0,
  class: "mr-2"
};
const _hoisted_3$1 = {
  key: 1,
  class: "mr-2"
};
const _hoisted_4$1 = { class: "flex gap-3 pt-2" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = {
  key: 0,
  class: "ml-2 inline-block animate-spin"
};
const _sfc_main$1 = {
  __name: "BaseForm",
  props: {
    validationSchema: {
      type: Object,
      required: false
    },
    initialValues: {
      type: Object,
      default: () => ({})
    },
    submitButtonText: {
      type: String,
      default: ""
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  emits: ["cancel", "success", "error", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const initialValues = toRef(props, "initialValues");
    const isSubmitting = ref(false);
    const formMessage = ref({
      show: false,
      type: "success",
      text: ""
    });
    const { handleSubmit, errors, values, meta, submitCount, resetForm } = useForm({
      validationSchema: props.validationSchema,
      initialValues
    });
    watch(initialValues, (newValues) => {
      if (newValues && Object.keys(newValues).length > 0) {
        resetForm({ values: newValues });
      }
    }, { deep: true });
    const onSubmit = handleSubmit(async (values2) => {
      try {
        isSubmitting.value = true;
        formMessage.value.show = false;
        emit("submit", values2);
        const result = await props.onSubmit(values2);
        formMessage.value = {
          show: true,
          type: "success",
          text: (result == null ? void 0 : result.message) || "Данные успешно сохранены"
        };
        emit("success", result);
        if (result == null ? void 0 : result.resetAfterSubmit) {
          resetForm();
        }
      } catch (error) {
        formMessage.value = {
          show: true,
          type: "error",
          text: (error == null ? void 0 : error.message) || "Произошла ошибка при сохранении данных"
        };
        emit("error", error);
      } finally {
        isSubmitting.value = false;
        setTimeout(() => {
          formMessage.value.show = false;
        }, 5e3);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("form", {
        onSubmit: _cache[1] || (_cache[1] = (...args) => unref(onSubmit) && unref(onSubmit)(...args)),
        class: "aero-form space-y-4"
      }, [
        renderSlot(_ctx.$slots, "default", {
          errors: unref(errors),
          values: unref(values),
          meta: unref(meta),
          isSubmitting: isSubmitting.value,
          submitCount: unref(submitCount)
        }, void 0),
        formMessage.value.show ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([
            "alert",
            formMessage.value.type === "success" ? "alert-success" : "alert-error",
            "p-4 rounded-lg mb-4"
          ])
        }, [
          createBaseVNode("div", _hoisted_1$1, [
            formMessage.value.type === "success" ? (openBlock(), createElementBlock("span", _hoisted_2$1, _cache[2] || (_cache[2] = [
              createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M5 13l4 4L19 7"
                })
              ], -1)
            ]))) : (openBlock(), createElementBlock("span", _hoisted_3$1, _cache[3] || (_cache[3] = [
              createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M6 18L18 6M6 6l12 12"
                })
              ], -1)
            ]))),
            createBaseVNode("span", null, toDisplayString(formMessage.value.text), 1)
          ])
        ], 2)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "actions", {
          isSubmitting: isSubmitting.value,
          submitCount: unref(submitCount),
          isValid: unref(meta).valid,
          reset: unref(resetForm)
        }, () => [
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("button", {
              type: "button",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel")),
              class: "flex-1 px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors"
            }, " Отмена "),
            createBaseVNode("button", {
              type: "submit",
              disabled: isSubmitting.value,
              class: "flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
            }, [
              createTextVNode(toDisplayString(__props.submitButtonText || "Сохранить") + " ", 1),
              isSubmitting.value ? (openBlock(), createElementBlock("span", _hoisted_6, _cache[4] || (_cache[4] = [
                createBaseVNode("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("circle", {
                    class: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  createBaseVNode("path", {
                    class: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)
              ]))) : createCommentVNode("", true)
            ], 8, _hoisted_5)
          ])
        ])
      ], 32);
    };
  }
};
const BaseForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3bde0a66"]]);
const _hoisted_1 = { class: "modal-content p-6" };
const _hoisted_2 = { class: "flex justify-end gap-3" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = {
  key: 0,
  class: "ml-2 inline-block animate-spin"
};
const _sfc_main = {
  __name: "LoginForm",
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const schema = create$3({
      email: create$6().required("Email обязателен").email("Неверный формат email"),
      password: create$6().required("Пароль обязателен").min(6, "Пароль должен быть не менее 6 символов")
    });
    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema
    });
    const onSubmit = handleSubmit((values) => {
      console.log("Форма логина отправлена:", values);
      emit("success", { success: true, message: "Вход выполнен успешно!" });
      emit("close");
      resetForm();
    });
    const onCancel = () => {
      emit("close");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[2] || (_cache[2] = createBaseVNode("h3", { class: "text-h4 font-bold text-brand-gray mb-4" }, "Вход в систему", -1)),
        createVNode(BaseForm, {
          "validation-schema": unref(schema),
          "on-submit": unref(onSubmit),
          "submit-button-text": "Войти",
          onCancel
        }, {
          actions: withCtx(({ isSubmitting, isValid, reset }) => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("button", {
                type: "button",
                onClick: onCancel,
                class: "px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors"
              }, " Отмена "),
              createBaseVNode("button", {
                type: "submit",
                disabled: isSubmitting || !isValid,
                class: "px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              }, [
                _cache[1] || (_cache[1] = createTextVNode(" Войти ")),
                isSubmitting ? (openBlock(), createElementBlock("span", _hoisted_4, _cache[0] || (_cache[0] = [
                  createBaseVNode("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("circle", {
                      class: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      "stroke-width": "4"
                    }),
                    createBaseVNode("path", {
                      class: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    })
                  ], -1)
                ]))) : createCommentVNode("", true)
              ], 8, _hoisted_3)
            ])
          ]),
          default: withCtx(() => [
            createVNode(TextInput, {
              name: "email",
              label: "Email",
              placeholder: "example@email.com",
              type: "email",
              required: true,
              autocomplete: "username"
            }),
            createVNode(TextInput, {
              name: "password",
              label: "Пароль",
              placeholder: "••••••••",
              type: "password",
              required: true,
              autocomplete: "current-password"
            })
          ]),
          _: 1
        }, 8, ["validation-schema", "on-submit"])
      ]);
    };
  }
};
function initGlobalUI() {
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.globalModalStore) {
      console.error("globalModalStore не инициализирован. Убедитесь, что assets/vue/entrypoints/global-modal.js загружен.");
      return;
    }
    const globalModal = window.globalModalStore;
    const loginButtons = document.querySelectorAll(".open-login-modal-btn");
    if (loginButtons.length > 0) {
      console.log('Кнопка(и) "Войти" найдена(ы).', loginButtons);
      loginButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          console.log('Клик по кнопке "Войти" зарегистрирован.');
          const result = await globalModal.openModal(_sfc_main, {
            initialData: {
              /* Если нужны начальные данные для формы логина */
            }
          });
          if (result.type === "success") {
            console.log('Модалка "Вход" закрыта с успешным результатом:', result.data);
            alert(result.data.message);
          } else if (result.type === "cancelled") {
            console.log('Модалка "Вход" была отменена.');
          } else {
            console.error('Модалка "Вход" закрыта с неизвестным результатом:', result);
          }
        });
      });
    } else {
      console.warn("Кнопки с классом .open-login-modal-btn не найдены на странице.");
    }
  });
}
initGlobalUI();
export {
  BaseForm as B
};
