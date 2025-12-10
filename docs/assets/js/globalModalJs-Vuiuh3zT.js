import { c as createApp } from "./chunks/runtime-dom.esm-bundler-DT6Q_ZxL.js";
import { u as useGlobalModalStore } from "./chunks/globalModal-DEHeP1wE.js";
import { r as ref, c as computed, w as watch, u as onMounted, v as onUnmounted, a as createElementBlock, b as createBaseVNode, a5 as createBlock, $ as createCommentVNode, a3 as mergeProps, a2 as unref, a6 as resolveDynamicComponent, a7 as normalizeClass, C as nextTick, o as openBlock } from "./chunks/runtime-core.esm-bundler-xz8C70T0.js";
import "./chunks/pinia-BykoCM9g.js";
const _hoisted_1 = { class: "modal-content" };
const modalId = "global-modal-host";
const _sfc_main = {
  __name: "GlobalModalHost",
  setup(__props) {
    const globalModal = useGlobalModalStore();
    const modalElement = ref(null);
    const isContentVisible = ref(false);
    const modalBoxSizeClass = computed(() => {
      switch (globalModal.size) {
        case "small":
          return "modal-box-sm";
        case "large":
          return "w-auto max-w-[calc(100vw-8rem)]";
        case "full":
          return "modal-box-full";
        case "default":
        default:
          return "max-w-md";
      }
    });
    watch(() => globalModal.isOpen, async (newValue) => {
      if (newValue) {
        isContentVisible.value = true;
        await nextTick();
        modalElement.value.classList.add("modal-open");
        document.body.style.overflow = "hidden";
        modalElement.value.focus();
      } else {
        modalElement.value.classList.remove("modal-open");
        document.body.style.overflow = "";
      }
    });
    const handleModalTransitionEnd = (event) => {
      if (event.target === modalElement.value && !globalModal.isOpen) {
        isContentVisible.value = false;
        globalModal.component = null;
        globalModal.props = {};
      }
    };
    const handleCloseButton = () => {
      globalModal.cancelModal();
    };
    const handleBackdropClick = () => {
      globalModal.cancelModal();
    };
    const handleComponentSubmit = (result) => {
      globalModal.closeModal(result);
    };
    const handleComponentCancel = () => {
      globalModal.cancelModal();
    };
    const handleComponentClose = () => {
      globalModal.cancelModal();
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && globalModal.isOpen) {
        globalModal.cancelModal();
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleEscapeKey);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleEscapeKey);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "modalElement",
        ref: modalElement,
        id: modalId,
        class: normalizeClass(["modal fixed inset-0 z-[9999] flex items-center justify-center", { "modal-open": unref(globalModal).isOpen }]),
        onTransitionend: handleModalTransitionEnd
      }, [
        createBaseVNode("div", {
          class: "modal-backdrop absolute inset-0 bg-black bg-opacity-50",
          onClick: handleBackdropClick
        }),
        createBaseVNode("div", {
          class: normalizeClass(["modal-box relative bg-white rounded-lg p-6 z-10", modalBoxSizeClass.value])
        }, [
          createBaseVNode("button", {
            class: "modal-close absolute right-4 top-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow",
            "aria-label": "Закрыть",
            onClick: handleCloseButton
          }, _cache[0] || (_cache[0] = [
            createBaseVNode("svg", {
              width: "20",
              height: "20",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              createBaseVNode("path", {
                d: "M6 6l8 8M6 14L14 6",
                "stroke-linecap": "round"
              })
            ], -1)
          ])),
          createBaseVNode("div", _hoisted_1, [
            isContentVisible.value ? (openBlock(), createBlock(resolveDynamicComponent(unref(globalModal).component), mergeProps({ key: 0 }, unref(globalModal).props, {
              onSubmit: handleComponentSubmit,
              onCancel: handleComponentCancel,
              onClose: handleComponentClose
            }), null, 16)) : createCommentVNode("", true)
          ])
        ], 2)
      ], 34);
    };
  }
};
async function initGlobalModal() {
  const globalModalContainer = document.querySelector(".vue-app-mount-point");
  if (globalModalContainer) {
    let attempts = 0;
    while (!window.pinia && attempts < 100) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      attempts++;
    }
    if (!window.pinia) {
      console.error("Pinia не инициализирована. Убедитесь, что global-pinia.js загружен перед global-modal.js");
      return;
    }
    const app = createApp(_sfc_main);
    app.use(window.pinia);
    app.mount(globalModalContainer);
    console.log("Global modal host инициализирован");
  } else {
    console.warn("Global modal host container .vue-app-mount-point not found.");
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobalModal);
} else {
  initGlobalModal();
}
