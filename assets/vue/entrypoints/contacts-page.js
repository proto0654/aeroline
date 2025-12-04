import { createApp, h, ref, watch, onMounted } from "vue";
import ContactsGrid from "@/components/pages/contacts/ContactsGrid.vue";
import CityAutocompleteForm from "@/components/forms/CityAutocompleteForm.vue";
import apiService from "@/services/apiService.js";

// 1. Инициализация общего состояния
const selectedCity = ref("Все города");
const offices = ref([]);
const cities = ref([]);
const localities = ref([]);
const loading = ref(true);
const error = ref(null);

// 2. Загрузка данных через API
const loadContactsData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Загружаем терминалы и населенные пункты из API
    const [terminalsData, localitiesData] = await Promise.all([
      apiService.getTerminals(),
      apiService.getLocalitiesWithRelations()
    ]);
    
    console.log("Терминалы загружены:", terminalsData.length);
    
    // Используем данные терминалов напрямую (терминалы уже содержат все необходимые данные)
    const mergedOffices = terminalsData
      .map(terminal => {
        // Преобразуем координаты из строки "lat, lng" в массив [lat, lng]
        let coordinates = [];
        if (terminal.coordinates) {
          const coords = terminal.coordinates.split(',').map(c => parseFloat(c.trim()));
          if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            coordinates = coords;
          }
        }
        
        // Если координат нет, пропускаем терминал
        if (coordinates.length !== 2) {
          console.warn(`Координаты не найдены или некорректны для терминала ${terminal.uid}: ${terminal.coordinates}`);
          return null;
        }
        
        // Используем fullName из терминала как адрес (уже содержит полный адрес)
        // Если fullName нет, используем representation как fallback
        const address = terminal.fullName || terminal.representation || '';
        
        return {
          id: terminal.uid,
          city: terminal.locality || '',
          address: address,
          type: terminal.type || '',
          phone: terminal.phone || '',
          email: terminal.email || '',
          coordinates: coordinates
        };
      })
      .filter(office => office !== null && office.coordinates && office.coordinates.length === 2);
    
    offices.value = mergedOffices;
    localities.value = localitiesData;
    
    // Используем localities для городов
    cities.value = localitiesData.map(locality => locality.name);
    
    console.log("Данные офисов (терминалов) загружены и объединены:", offices.value.length);
    
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
        localities: localities.value,
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
