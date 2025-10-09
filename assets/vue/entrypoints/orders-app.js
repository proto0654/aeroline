import { createApp } from 'vue';
import { createPinia } from 'pinia';
import OrdersPage from '../components/pages/orders/OrdersPage.vue';

const app = createApp(OrdersPage);
const pinia = createPinia();
app.use(pinia);
app.mount('#orders-table-app'); 