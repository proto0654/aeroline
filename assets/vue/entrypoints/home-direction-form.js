import { createApp, h } from "vue";
import DirectionForm from "@/components/pages/calculator/DirectionForm.vue";

async function initDirectionForm() {
  const directionFormElement = document.getElementById("direction-form-app");
  if (!directionFormElement) return;

  try {
    // Загружаем данные офисов для автокомплита
    const officesResponse = await fetch("./assets/data/contacts.json");
    const officesData = await officesResponse.json();

    const directionApp = createApp({
      data() {
        return {
          offices: officesData.offices || [],
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
          offices: this.offices,
          modelValue: this.direction,
          showCalculateButton: true,
          showTitle: false,
          "onUpdate:modelValue": this.onDirectionChange,
        });
      },
    });

    directionApp.mount(directionFormElement);

    // Добавляем глобальную функцию для кнопки "Рассчитать"
    window.calculateCost = () => {
      const app = directionApp._instance;
      if (app && app.direction.from && app.direction.to) {
        // Пока заглушка - можно потом добавить логику расчета или переход на калькулятор
        alert(
          `Расчет стоимости доставки: ${app.direction.from} → ${app.direction.to}`
        );
      } else {
        alert("Пожалуйста, выберите города отправления и назначения");
      }
    };
  } catch (error) {
    console.error("Ошибка при загрузке данных офисов:", error);
    // Монтируем компонент без данных в случае ошибки
    const directionApp = createApp({
      data() {
        return {
          offices: [],
          direction: { from: "", to: "" },
        };
      },
      render() {
        return h(DirectionForm, {
          offices: this.offices,
          modelValue: this.direction,
          showCalculateButton: true,
          showTitle: false,
        });
      },
    });
    directionApp.mount(directionFormElement);
  }
}

// Экспортируем функцию для использования в других модулях
export { initDirectionForm };
