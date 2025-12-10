import { createApp } from 'vue';
import { createPinia } from 'pinia';
import SendersReceiversPage from '../components/pages/senders-receivers/SendersReceiversPage.vue';

// Используем глобальную Pinia, если она уже создана в global-modal.js
const pinia = window.pinia || createPinia();
if (!window.pinia) {
  window.pinia = pinia;
}

const app = createApp(SendersReceiversPage);
app.use(pinia);
app.mount('#senders-receivers-table-app'); 