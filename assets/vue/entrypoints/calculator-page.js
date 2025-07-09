import { createApp } from "vue";
import CalculatorPage from "@/components/pages/calculator/CalculatorPage.vue";
import { Form, Field, ErrorMessage } from "vee-validate";

// Глобальная регистрация компонентов VeeValidate
const app = createApp(CalculatorPage);
app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#calculator-app");
