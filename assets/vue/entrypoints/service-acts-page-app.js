import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ServiceActsPage from '../components/pages/service-acts/ServiceActsPage.vue';

// Используем глобальную Pinia, если она уже создана в global-modal.js
const pinia = window.pinia || createPinia();
if (!window.pinia) {
  window.pinia = pinia;
}

const app = createApp(ServiceActsPage);
app.use(pinia);
app.mount('#service-acts-table-app'); 