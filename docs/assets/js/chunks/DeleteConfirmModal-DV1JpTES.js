import { r as ref, c as createElementBlock, o as openBlock, a as createBaseVNode, t as toDisplayString, b as createTextVNode, d as createCommentVNode, w as withModifiers } from "./runtime-dom.esm-bundler-BEj-0d2c.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = { class: "modal-content" };
const _hoisted_2 = { class: "text-h5 font-bold text-brand-gray mb-2 text-center" };
const _hoisted_3 = { class: "text-body-secondary text-brand-gray mb-4 text-center" };
const _hoisted_4 = { class: "flex gap-3" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = {
  key: 0,
  class: "ml-2 inline-block animate-spin"
};
const _sfc_main = {
  __name: "DeleteConfirmModal",
  props: {
    title: {
      type: String,
      default: "Удаление"
    },
    message: {
      type: String,
      default: "Вы уверены, что хотите удалить этот элемент?"
    },
    submitButtonText: {
      type: String,
      default: "Удалить"
    },
    item: {
      type: [Object, Array],
      required: true,
      default: () => ({})
    }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isSubmitting = ref(false);
    const handleSubmit = async () => {
      try {
        isSubmitting.value = true;
        const result = { success: true, data: props.item };
        emit("submit", result);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "mb-4 text-center" }, [
          createBaseVNode("svg", {
            class: "w-12 h-12 mx-auto text-red-500",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            createBaseVNode("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            })
          ])
        ], -1)),
        createBaseVNode("h3", _hoisted_2, toDisplayString(__props.title), 1),
        createBaseVNode("p", _hoisted_3, toDisplayString(__props.message), 1),
        createBaseVNode("form", {
          class: "form space-y-4",
          onSubmit: withModifiers(handleSubmit, ["prevent"])
        }, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              type: "button",
              class: "flex-1 px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors",
              onClick: _cache[0] || (_cache[0] = ($event) => emit("cancel"))
            }, " Отмена "),
            createBaseVNode("button", {
              type: "submit",
              class: "flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors",
              disabled: isSubmitting.value
            }, [
              createTextVNode(toDisplayString(__props.submitButtonText) + " ", 1),
              isSubmitting.value ? (openBlock(), createElementBlock("span", _hoisted_6, _cache[1] || (_cache[1] = [
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
        ], 32)
      ]);
    };
  }
};
const DeleteConfirmModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fed58464"]]);
export {
  DeleteConfirmModal as D
};
