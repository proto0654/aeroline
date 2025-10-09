import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ServiceActsPage from '../components/pages/service-acts/ServiceActsPage.vue';

const app = createApp(ServiceActsPage);
const pinia = createPinia();
app.use(pinia);
app.mount('#service-acts-table-app'); 