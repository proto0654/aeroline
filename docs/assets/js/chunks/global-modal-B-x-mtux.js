import { r as ref, v as computed, w as watch, b as onMounted, z as onUnmounted, c as createElementBlock, d as createBaseVNode, A as createBlock, e as createCommentVNode, B as mergeProps, u as unref, C as resolveDynamicComponent, D as normalizeClass, q as nextTick, o as openBlock, E as createApp } from "./runtime-dom.esm-bundler-D-nyHKmb.js";
import { u as useGlobalModalStore, c as createPinia } from "./globalModal-Bn39zecy.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
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
document.addEventListener("DOMContentLoaded", () => {
  const globalModalContainer = document.querySelector(".vue-app-mount-point");
  if (globalModalContainer) {
    const app = createApp(_sfc_main);
    const pinia = createPinia();
    app.use(pinia);
    app.mount(globalModalContainer);
    window.globalModalStore = useGlobalModalStore();
  } else {
    console.warn("Global modal host container #global-modal-host not found.");
  }
});
