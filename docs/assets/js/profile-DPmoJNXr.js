import "./chunks/global-modal-dZf6PbYv.js";
import "./mainJs-BzcWqHOU.js";
import { c as create$3, a as create$6, b as create$9 } from "./globalUiJs-Bq6ceTVX.js";
import { i as initProfilePage } from "./profilePageJs-B65luuBh.js";
import { c as createElementBlock, o as openBlock, a as createBaseVNode, I as createVNode, w as withModifiers, A as unref } from "./chunks/runtime-dom.esm-bundler-DZCqFWTW.js";
import { a as useForm, T as TextInput } from "./chunks/TextInput-DRKSnHb_.js";
import "./chunks/globalModal-WavfrdGt.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1$1 = { class: "modal-content p-6" };
const _sfc_main$1 = {
  __name: "EditEmailForm",
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const schema = create$3({
      newEmail: create$6().required("Email обязателен").email("Неверный формат email")
    });
    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema
    });
    const onSubmit = handleSubmit((values) => {
      console.log("Форма изменения email отправлена:", values);
      emit("success", { success: true, message: "Email успешно изменен!" });
      emit("close");
      resetForm();
    });
    const onCancel = () => {
      emit("close");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _cache[2] || (_cache[2] = createBaseVNode("h3", { class: "text-h4 font-bold text-brand-gray mb-4" }, "Изменить Email", -1)),
        createBaseVNode("form", {
          onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"])),
          class: "space-y-4"
        }, [
          createVNode(TextInput, {
            name: "newEmail",
            label: "Новый Email",
            placeholder: "example@email.com",
            type: "email",
            required: true,
            autocomplete: "email"
          }),
          createBaseVNode("div", { class: "flex justify-end gap-3" }, [
            createBaseVNode("button", {
              type: "button",
              onClick: onCancel,
              class: "px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors"
            }, " Отмена "),
            _cache[1] || (_cache[1] = createBaseVNode("button", {
              type: "submit",
              class: "px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            }, " Сохранить ", -1))
          ])
        ], 32)
      ]);
    };
  }
};
const _hoisted_1 = { class: "modal-content p-6" };
const _sfc_main = {
  __name: "ChangePasswordForm",
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const schema = create$3({
      currentPassword: create$6().required("Текущий пароль обязателен"),
      newPassword: create$6().required("Новый пароль обязателен").min(6, "Пароль должен быть не менее 6 символов"),
      confirmPassword: create$6().required("Подтверждение пароля обязательно").oneOf([create$9("newPassword"), null], "Пароли не совпадают")
    });
    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema
    });
    const onSubmit = handleSubmit((values) => {
      console.log("Форма изменения пароля отправлена:", values);
      emit("success", { success: true, message: "Пароль успешно изменен!" });
      emit("close");
      resetForm();
    });
    const onCancel = () => {
      emit("close");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[2] || (_cache[2] = createBaseVNode("h3", { class: "text-h4 font-bold text-brand-gray mb-4" }, "Изменить Пароль", -1)),
        createBaseVNode("form", {
          onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"])),
          class: "space-y-4"
        }, [
          createVNode(TextInput, {
            name: "currentPassword",
            label: "Текущий пароль",
            placeholder: "••••••••",
            type: "password",
            required: true,
            autocomplete: "current-password"
          }),
          createVNode(TextInput, {
            name: "newPassword",
            label: "Новый пароль",
            placeholder: "••••••••",
            type: "password",
            required: true,
            autocomplete: "new-password"
          }),
          createVNode(TextInput, {
            name: "confirmPassword",
            label: "Подтвердите новый пароль",
            placeholder: "••••••••",
            type: "password",
            required: true,
            autocomplete: "new-password"
          }),
          createBaseVNode("div", { class: "flex justify-end gap-3" }, [
            createBaseVNode("button", {
              type: "button",
              onClick: onCancel,
              class: "px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors"
            }, " Отмена "),
            _cache[1] || (_cache[1] = createBaseVNode("button", {
              type: "submit",
              class: "px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            }, " Сохранить ", -1))
          ])
        ], 32)
      ]);
    };
  }
};
document.addEventListener("DOMContentLoaded", () => {
  initProfilePage();
  const globalModal = window.globalModalStore;
  const editEmailButton = document.querySelector(".open-edit-email-modal-btn");
  if (editEmailButton) {
    editEmailButton.addEventListener("click", async () => {
      console.log('Клик по кнопке "Изменить email" зарегистрирован.');
      try {
        const result = await globalModal.openModal(_sfc_main$1);
        console.log('Модалка "Изменить Email" закрыта с результатом:', result);
        if (result && result.success) {
          alert(result.message);
        }
      } catch (error) {
        console.error('Модалка "Изменить Email" была отменена или произошла ошибка:', error.message);
      }
    });
  } else {
    console.warn("Кнопка с классом .open-edit-email-modal-btn не найдена на странице.");
  }
  const changePasswordButton = document.querySelector(".open-change-password-modal-btn");
  if (changePasswordButton) {
    changePasswordButton.addEventListener("click", async () => {
      console.log('Клик по кнопке "Изменить пароль" зарегистрирован.');
      try {
        const result = await globalModal.openModal(_sfc_main);
        console.log('Модалка "Изменить Пароль" закрыта с результатом:', result);
        if (result && result.success) {
          alert(result.message);
        }
      } catch (error) {
        console.error('Модалка "Изменить Пароль" была отменена или произошла ошибка:', error.message);
      }
    });
  } else {
    console.warn("Кнопка с классом .open-change-password-modal-btn не найдена на странице.");
  }
});
