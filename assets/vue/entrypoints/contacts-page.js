import { createApp, h, ref, watch, onMounted } from "vue";
import ContactsGrid from "@/components/pages/contacts/ContactsGrid.vue";
import CityAutocompleteForm from "@/components/forms/CityAutocompleteForm.vue";
import apiService from "@/services/apiService.js";

// 1. Инициализация общего состояния
const selectedCity = ref("Все города");
const offices = ref([]);
const cities = ref([]);
const loading = ref(true);
const error = ref(null);

// 2. Загрузка данных через API
const loadContactsData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Загружаем офисы из API
    const officesData = await apiService.getOffices();
    offices.value = officesData;
    
    // Извлекаем уникальные города из офисов
    const uniqueCities = [...new Set(officesData.map(office => office.city))];
    cities.value = uniqueCities;
    
  } catch (err) {
    console.error('Ошибка загрузки контактов:', err);
    error.value = 'Ошибка загрузки данных';
    
    // Fallback на старые данные если есть
    if (window.initialData) {
      offices.value = window.initialData.offices || [];
      cities.value = window.initialData.cities || [];
    }
  } finally {
    loading.value = false;
  }
};

// 3. Инициализация приложения с фильтром
const cityFilterApp = createApp({
  setup() {
    onMounted(() => {
      loadContactsData();
    });

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
        offices: offices.value,
        cities: cities.value,
        loading: loading.value,
        error: error.value,
        onCitySelected,
        onFilterReset,
      });
  },
});
cityFilterApp.mount("#city-filter-app");

// 4. Инициализация приложения с сеткой контактов
const contactsGridApp = createApp({
  setup() {
    const gridRef = ref(null);

    // Смотрим за изменениями selectedCity
    watch(selectedCity, (newCity) => {
      if (gridRef.value) {
        gridRef.value.setFilter(newCity);
      }
    });

    return () =>
      h(ContactsGrid, {
        offices: offices.value,
        cities: cities.value,
        loading: loading.value,
        error: error.value,
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
