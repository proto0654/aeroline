import { createApp, h, ref, computed, watch, onMounted } from "vue";
import CityAutocompleteForm from "@/components/forms/CityAutocompleteForm.vue";
import apiService from "@/services/apiService.js";

// 1. Инициализация общего состояния
const selectedCity = ref("Все города");
const vacancies = ref([]);
const cities = ref([]);
const loading = ref(true);
const error = ref(null);

// 2. Загрузка данных через API
const loadVacanciesData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Загружаем вакансии из API
    const vacanciesData = await apiService.getVacancies();
    
    console.log("Вакансии загружены:", vacanciesData.length);
    
    vacancies.value = vacanciesData;
    
    // Извлекаем уникальные города из вакансий
    const citiesSet = new Set();
    vacanciesData.forEach(vacancy => {
      if (vacancy.location) {
        // Извлекаем город из location (формат: "г. Москва, ул. Тверская 22, БЦ 'Галерея'")
        const locationParts = vacancy.location.split(',');
        if (locationParts.length > 0) {
          // Убираем префикс "г. " если есть
          let city = locationParts[0].trim().replace(/^г\.\s*/i, '').trim();
          if (city) {
            citiesSet.add(city);
          }
        }
      }
    });
    
    cities.value = Array.from(citiesSet).sort();
    
    console.log("Города из вакансий:", cities.value.length);
    
    // Обновляем DOM с вакансиями
    updateVacanciesDOM();
    
  } catch (err) {
    console.error('Ошибка загрузки вакансий:', err);
    error.value = 'Ошибка загрузки данных';
    
    // Fallback на старые данные если есть
    if (window.initialData && window.initialData.vacancies) {
      vacancies.value = window.initialData.vacancies || [];
      cities.value = window.initialData.cities || [];
      updateVacanciesDOM();
    }
  } finally {
    loading.value = false;
  }
};

// 3. Обновление DOM с вакансиями
function updateVacanciesDOM() {
  const container = document.querySelector('.vacancies-container');
  if (!container) return;
  
  // Очищаем контейнер
  container.innerHTML = '';
  
  // Фильтруем вакансии по выбранному городу
  let filteredVacancies = vacancies.value;
  if (selectedCity.value && selectedCity.value !== 'Все города') {
    filteredVacancies = vacancies.value.filter(vacancy => {
      if (!vacancy.location) return false;
      const locationParts = vacancy.location.split(',');
      if (locationParts.length > 0) {
        let city = locationParts[0].trim().replace(/^г\.\s*/i, '').trim();
        return city === selectedCity.value;
      }
      return false;
    });
  }
  
  // Создаем элементы вакансий
  filteredVacancies.forEach(vacancy => {
    const vacancyElement = createVacancyElement(vacancy);
    container.appendChild(vacancyElement);
  });
  
  // Переинициализируем пагинацию после обновления DOM
  setTimeout(() => {
    import('../../js/modules/vacancies-page.js').then(module => {
      if (module.initVacanciesPagination) {
        module.initVacanciesPagination();
      }
    });
  }, 100);
}

// 4. Создание элемента вакансии
function createVacancyElement(vacancy) {
  const div = document.createElement('div');
  div.className = 'vacancy-item bg-brand-light rounded-xl overflow-hidden p-2';
  div.setAttribute('data-location', vacancy.location || '');
  
  const dutiesHTML = vacancy.duties ? `
    <div class="mb-2 font-semibold">Обязанности</div>
    <ul class="list-disc list-inside text-base mb-4">
      ${vacancy.duties.map(duty => `<li>${duty}</li>`).join('')}
    </ul>
  ` : '';
  
  const requirementsHTML = vacancy.requirements ? `
    <div class="mb-2 font-semibold">Требования</div>
    <ul class="list-disc list-inside text-base mb-4">
      ${vacancy.requirements.map(req => `<li>${req}</li>`).join('')}
    </ul>
  ` : '';
  
  const conditionsHTML = vacancy.conditions ? `
    <div class="mb-2 font-semibold">Условия</div>
    <ul class="list-disc list-inside text-sm md:text-base">
      ${vacancy.conditions.map(cond => `<li>${cond}</li>`).join('')}
    </ul>
  ` : '';
  
  const contactHTML = vacancy.contact ? `
    <div class="font-semibold mb-2 text-h5">Обращаться по телефону</div>
    <div class="mb-2">${vacancy.contact.phone || ''}</div>
    <div class="mb-2">Контактное лицо: ${vacancy.contact.person || ''}</div>
    <div class="mb-2">Email: ${vacancy.contact.email || ''}</div>
  ` : '';
  
  div.innerHTML = `
    <button type="button" class="w-full flex justify-between items-center p-1 md:px-3 md:py-3 focus:outline-none vacancy-toggle">
      <div>
        <div class="font-bold text-h6 md:text-h5 text-brand-gray mb-1 text-left px-2 leading-1.2">${vacancy.title || ''}</div>
        <div class="text-brand-blue font-bold text-base md:text-lg text-left px-2">${vacancy.salary || ''} <span class="text-brand-gray font-normal">${vacancy.location || ''}</span></div>
      </div>
      <div class="bg-white p-3 rounded-full ml-5 md:ml-0">
        <svg class="w-5 h-5 text-brand-gray transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </div>
    </button>
    <div class="vacancy-content hidden px-4 pb-4 md:px-5 md:pb-6">
      <hr class="border-t border-t-2 border-white mb-4">
      <div class="grid md:grid-cols-3 gap-6 items-start">
        <div class="md:col-span-2">
          ${dutiesHTML}
          ${requirementsHTML}
          ${conditionsHTML}
        </div>
        <div class="bg-brand-white rounded-lg p-8 rounded-xl flex flex-col justify-between gap-4">
          <div>
            ${contactHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Добавляем обработчик клика для аккордеона
  const toggleButton = div.querySelector('.vacancy-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      const content = this.parentElement.querySelector('.vacancy-content');
      const icon = this.querySelector('svg');
      
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
      }
    });
  }
  
  return div;
}

// 5. Инициализация приложения с фильтром
const cityFilterApp = createApp({
  setup() {
    onMounted(() => {
      loadVacanciesData();
    });

    function onCitySelected(city) {
      console.log("Фильтр обновил город:", city);
      selectedCity.value = city;
      updateVacanciesDOM();
    }

    function onFilterReset() {
      console.log("Фильтр сброшен");
      selectedCity.value = "Все города";
      updateVacanciesDOM();
    }

    // Преобразуем вакансии в формат offices для CityAutocompleteForm
    const officesForFilter = computed(() => {
      return vacancies.value
        .map(v => ({ city: extractCityFromLocation(v.location) }))
        .filter(v => v.city);
    });

    return () =>
      h(CityAutocompleteForm, {
        offices: officesForFilter.value,
        cities: cities.value,
        localities: [],
        loading: loading.value,
        error: error.value,
        onCitySelected,
        onFilterReset,
      });
  },
});

// Вспомогательная функция для извлечения города из location
function extractCityFromLocation(location) {
  if (!location) return '';
  const locationParts = location.split(',');
  if (locationParts.length > 0) {
    return locationParts[0].trim().replace(/^г\.\s*/i, '').trim();
  }
  return '';
}

// Монтируем приложение после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.getElementById('city-filter-app');
    if (filterContainer) {
      cityFilterApp.mount('#city-filter-app');
      console.log('VacanciesPage Vue: Приложение смонтировано');
    } else {
      console.error('VacanciesPage Vue: Контейнер #city-filter-app не найден');
    }
  });
} else {
  // DOM уже загружен
  const filterContainer = document.getElementById('city-filter-app');
  if (filterContainer) {
    cityFilterApp.mount('#city-filter-app');
    console.log('VacanciesPage Vue: Приложение смонтировано');
  } else {
    console.error('VacanciesPage Vue: Контейнер #city-filter-app не найден');
  }
}

