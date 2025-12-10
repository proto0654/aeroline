import { d as defineStore } from "./pinia-BykoCM9g.js";
import { r as ref, O as markRaw } from "./runtime-core.esm-bundler-xz8C70T0.js";
const useGlobalModalStore = defineStore("globalModal", () => {
  const isOpen = ref(false);
  const component = ref(null);
  const props = ref({});
  const resolvePromise = ref(null);
  const size = ref("default");
  function openModal(modalComponent, modalProps = {}, modalSize = "default") {
    component.value = markRaw(modalComponent);
    props.value = modalProps;
    size.value = modalSize;
    isOpen.value = true;
    return new Promise((resolve) => {
      resolvePromise.value = resolve;
    });
  }
  function closeModal(result = null) {
    if (resolvePromise.value) {
      resolvePromise.value({ type: "success", data: result });
      resolvePromise.value = null;
    }
    isOpen.value = false;
    size.value = "default";
  }
  function cancelModal() {
    if (resolvePromise.value) {
      resolvePromise.value({ type: "cancelled" });
      resolvePromise.value = null;
    }
    isOpen.value = false;
    size.value = "default";
  }
  return {
    isOpen,
    component,
    props,
    size,
    openModal,
    closeModal,
    cancelModal
    // ModalCancelledError // Удаляем экспорт, так как класс больше не нужен здесь
  };
});
export {
  useGlobalModalStore as u
};
