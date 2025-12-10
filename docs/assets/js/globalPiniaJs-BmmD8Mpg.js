import { c as createPinia, s as setActivePinia } from "./chunks/pinia-BykoCM9g.js";
import { u as useGlobalModalStore } from "./chunks/globalModal-DEHeP1wE.js";
import { u as useAuthStore } from "./chunks/auth-BfnmLw6b.js";
import "./chunks/runtime-core.esm-bundler-xz8C70T0.js";
function initGlobalPinia() {
  if (!window.pinia) {
    window.pinia = createPinia();
    setActivePinia(window.pinia);
    console.log("Глобальная Pinia создана и активирована");
  }
  if (window.pinia) {
    setActivePinia(window.pinia);
    if (!window.globalModalStore) {
      window.globalModalStore = useGlobalModalStore();
      console.log("Global modal store инициализирован:", window.globalModalStore);
    }
    if (!window.authStore) {
      window.authStore = useAuthStore();
      window.authStore.checkAuth();
      console.log("Auth store инициализирован:", window.authStore);
    }
  } else {
    console.error("Не удалось создать глобальную Pinia");
  }
}
console.log("[global-pinia.js] Начало загрузки модуля");
initGlobalPinia();
console.log("[global-pinia.js] Модуль загружен, Pinia:", window.pinia ? "создана" : "НЕ создана");
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.pinia) {
      console.warn("Pinia не была инициализирована при первой попытке, повторная инициализация...");
      initGlobalPinia();
    }
  });
}
