import { createApp } from 'vue';
import { createPinia } from 'pinia';
import SendersReceiversPage from '../components/pages/senders-receivers/SendersReceiversPage.vue';

const app = createApp(SendersReceiversPage);
const pinia = createPinia();
app.use(pinia);
app.mount('#senders-receivers-table-app'); 