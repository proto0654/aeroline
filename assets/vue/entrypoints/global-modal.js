import { createApp } from 'vue';
import { createPinia } from 'pinia';
import GlobalModalHost from '../components/GlobalModalHost.vue';
import { useGlobalModalStore } from '../stores/globalModal.js';

document.addEventListener('DOMContentLoaded', () => {
  const globalModalContainer = document.querySelector('.vue-app-mount-point');

  if (globalModalContainer) {
    const app = createApp(GlobalModalHost);
    const pinia = createPinia();

    app.use(pinia);
    app.mount(globalModalContainer);

    window.globalModalStore = useGlobalModalStore();
  } else {
    console.warn('Global modal host container #global-modal-host not found.');
  }
}); 