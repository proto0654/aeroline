import { createApp } from 'vue';
import RequestActForm from '../../vue/components/forms/RequestActForm.vue';

document.addEventListener('DOMContentLoaded', () => {
  const requestActApp = createApp(RequestActForm);
  requestActApp.mount('#request-act-form-app');
}); 