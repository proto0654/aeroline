import { createApp, h } from "vue";
import DirectionForm from "@/components/pages/calculator/DirectionForm.vue";
import apiService from "@/services/apiService.js";

async function initDirectionForm() {
  const directionFormElement = document.getElementById("direction-form-app");
  if (!directionFormElement) return;

  try {
    // Загружаем данные адресов и населенных пунктов из API
    const billingAddressesData = await apiService.getBillingAddresses();
    const localitiesData = await apiService.getLocalitiesWithRelations();

    const directionApp = createApp({
      data() {
        return {
          billingAddresses: billingAddressesData || [],
          localities: localitiesData || [],
          direction: {
            from: "",
            to: "",
          },
        };
      },
      methods: {
        onDirectionChange(newDirection) {
          this.direction = newDirection;
          console.log("Направление изменено:", newDirection);
        },
      },
      render() {
        return h(DirectionForm, {
          billingAddresses: this.billingAddresses,
          localities: this.localities,
          modelValue: this.direction,
          showCalculateButton: true,
          showTitle: false,
          "onUpdate:modelValue": this.onDirectionChange,
        });
      },
    });

    // Используем глобальную Pinia, если она доступна
    if (window.pinia) {
      directionApp.use(window.pinia);
    }
    directionApp.mount(directionFormElement);
  } catch (error) {
    console.error("Ошибка при загрузке данных адресов:", error);
    // Монтируем компонент без данных в случае ошибки
    const directionApp = createApp({
      data() {
        return {
          billingAddresses: [],
          localities: [],
          direction: { from: "", to: "" },
        };
      },
      render() {
        return h(DirectionForm, {
          billingAddresses: this.billingAddresses,
          localities: this.localities,
          modelValue: this.direction,
          showCalculateButton: true,
          showTitle: false,
        });
      },
    });
    // Используем глобальную Pinia, если она доступна
    if (window.pinia) {
      directionApp.use(window.pinia);
    }
    directionApp.mount(directionFormElement);
  }
}

// Экспортируем функцию для использования в других модулях
export { initDirectionForm };
