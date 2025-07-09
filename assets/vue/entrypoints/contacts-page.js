import { createApp, h, ref, watch } from "vue";
import ContactsGrid from "@/components/pages/contacts/ContactsGrid.vue";
import CityAutocompleteForm from "@/components/forms/CityAutocompleteForm.vue";

// 1. Инициализация общего состояния
const selectedCity = ref("Все города");

// 2. Инициализация приложения с фильтром
const cityFilterApp = createApp({
  setup() {
    const offices = window.initialData?.offices || [];

    function onCitySelected(city) {
      console.log("Фильтр обновил город:", city);
      selectedCity.value = city;
    }

    function onFilterReset() {
      console.log("Фильтр сброшен");
      selectedCity.value = "Все города";
    }

    return () =>
      h(CityAutocompleteForm, {
        offices,
        onCitySelected,
        onFilterReset,
      });
  },
});
cityFilterApp.mount("#city-filter-app");

// 3. Инициализация приложения с сеткой контактов
const contactsGridApp = createApp({
  setup() {
    const offices = window.initialData?.offices || [];
    const gridRef = ref(null);

    // Смотрим за изменениями selectedCity
    watch(selectedCity, (newCity) => {
      if (gridRef.value) {
        gridRef.value.setFilter(newCity);
      }
    });

    return () =>
      h(ContactsGrid, {
        offices,
        initialFilter: selectedCity.value,
        ref: gridRef,
        onCardClick: ({ office, event }) => {
          // Логика клика по карточке остается в contacts-page.js
          console.log("Клик по карточке в Vue:", office.city);
        },
      });
  },
});
contactsGridApp.mount("#contacts-grid-app");
