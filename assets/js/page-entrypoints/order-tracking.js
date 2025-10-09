import { createApp } from "vue";
import OrderTrackingPage from "../../vue/components/pages/orders/OrderTrackingPage.vue";

document.addEventListener("DOMContentLoaded", () => {
  const appElement = document.getElementById("order-tracking-app");
  if (appElement) {
    const app = createApp(OrderTrackingPage);
    app.mount(appElement);
  }
});
