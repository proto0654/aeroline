import { createApp } from 'vue';
import { createPinia } from 'pinia';
import OrdersPage from '../components/pages/orders/OrdersPage.vue';

// Используем глобальную Pinia, если она уже создана в global-modal.js
// Иначе создаем новую (на случай, если global-modal.js не загружен)
const pinia = window.pinia || createPinia();
if (!window.pinia) {
  window.pinia = pinia;
}

const app = createApp(OrdersPage);
app.use(pinia);
app.mount('#orders-table-app'); 