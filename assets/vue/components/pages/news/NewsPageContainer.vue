<template>
  <div class="news-page-container container mx-auto px-4 py-8 flex flex-col items-center">
   

    <DateRangeFilter 
      @date-range-changed="handleDateRangeChanged"
      :initialStartDate="defaultStartDate"
      :initialEndDate="defaultEndDate"
      class="my-20" 
    />

    <div v-if="loading" class="text-center text-lg text-gray-600">Загрузка новостей...</div>
    <div v-else-if="error" class="text-center text-lg text-red-600">Ошибка при загрузке новостей: {{ error }}</div>
    <div v-else-if="paginatedNews.length > 0">
      <NewsGrid :newsItems="paginatedNews" />
      <NewsPagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="updateCurrentPage"
      />
    </div>
    <div v-else class="text-center text-lg text-gray-600">Нет новостей, соответствующих вашим критериям.</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NewsGrid from './NewsGrid.vue';
import NewsPagination from './NewsPagination.vue';
import DateRangeFilter from './DateRangeFilter.vue';

const news = ref([]);
const loading = ref(true);
const error = ref(null);

const currentPage = ref(1);
const itemsPerPage = ref(5); // Устанавливаем количество новостей на странице по умолчанию

const startDateFilter = ref(null);
const endDateFilter = ref(null);

const defaultStartDate = ref(null);
const defaultEndDate = ref(null);

// Загрузка данных
onMounted(async () => {
  try {
    // В реальном приложении здесь будет API-запрос к Bitrix CMS
    const response = await fetch('/assets/data/news.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    news.value = data.news.map(item => ({
      ...item,
      // Преобразуем timestamp в объект Date для удобства фильтрации
      dateObject: new Date(item.timestamp * 1000)
    })).sort((a, b) => b.timestamp - a.timestamp); // Сортируем по убыванию даты

    // Если в news.json есть itemsPerPage, используем его
    if (data.itemsPerPage) {
      itemsPerPage.value = data.itemsPerPage;
    }

    // Устанавливаем начальный диапазон дат: текущая дата и месяц назад
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    oneMonthAgo.setDate(1); // Устанавливаем на первое число месяца для более предсказуемого диапазона

    defaultStartDate.value = oneMonthAgo;
    defaultEndDate.value = today;
    
    // Применяем фильтр по умолчанию сразу
    startDateFilter.value = defaultStartDate.value;
    endDateFilter.value = defaultEndDate.value;

    loading.value = false;
    console.log('NewsPageContainer: Данные загружены.', news.value.length, 'новостей.');
    console.log('NewsPageContainer: Фильтр по умолчанию установлен: с', defaultStartDate.value, 'по', defaultEndDate.value);
  } catch (e) {
    error.value = e.message;
    loading.value = false;
    console.error('NewsPageContainer: Ошибка загрузки данных:', e);
  }
});

const filteredNews = computed(() => {
  console.log('NewsPageContainer: Вычисляемое свойство filteredNews запущено.');
  console.log('NewsPageContainer: startDateFilter =', startDateFilter.value);
  console.log('NewsPageContainer: endDateFilter =', endDateFilter.value);

  if (!startDateFilter.value && !endDateFilter.value) {
    console.log('NewsPageContainer: Фильтры дат не установлены, возвращаем все новости.');
    return news.value;
  }

  return news.value.filter(item => {
    const itemDate = new Date(item.dateObject.getFullYear(), item.dateObject.getMonth(), item.dateObject.getDate());

    const startFilterDate = startDateFilter.value ? new Date(startDateFilter.value.getFullYear(), startDateFilter.value.getMonth(), startDateFilter.value.getDate()) : null;
    const endFilterDate = endDateFilter.value ? new Date(endDateFilter.value.getFullYear(), endDateFilter.value.getMonth(), endDateFilter.value.getDate()) : null;
    
    // Добавим +1 день к endFilterDate, чтобы включить весь последний день диапазона
    if (endFilterDate) {
      endFilterDate.setDate(endFilterDate.getDate() + 1);
    }

    const startMatch = startFilterDate ? itemDate >= startFilterDate : true;
    const endMatch = endFilterDate ? itemDate < endFilterDate : true; // Используем < для исключения следующего дня

    // Логирование для отладки каждой новости
    // console.log(`Item ID: ${item.id}, ItemDate: ${itemDate.toISOString().split('T')[0]}`);
    // console.log(`  Filter: Start: ${startFilterDate ? startFilterDate.toISOString().split('T')[0] : 'N/A'}, End: ${endFilterDate ? endFilterDate.toISOString().split('T')[0] : 'N/A'}`);
    // console.log(`  Match: Start: ${startMatch}, End: ${endMatch}, Overall: ${startMatch && endMatch}`);

    return startMatch && endMatch;
  });
});

const totalPages = computed(() => {
  console.log('NewsPageContainer: Вычисляемое свойство totalPages запущено. Filtered news count:', filteredNews.value.length);
  return Math.ceil(filteredNews.value.length / itemsPerPage.value);
});

const paginatedNews = computed(() => {
  console.log('NewsPageContainer: Вычисляемое свойство paginatedNews запущено. Current page:', currentPage.value, 'Items per page:', itemsPerPage.value);
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredNews.value.slice(start, end);
});

const updateCurrentPage = (page) => {
  console.log('NewsPageContainer: updateCurrentPage вызван, новая страница:', page);
  currentPage.value = page;
  // Прокрутка к началу списка новостей при смене страницы (опционально)
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleDateRangeChanged = (payload) => {
  console.log('NewsPageContainer: handleDateRangeChanged вызван с payload:', payload);
  // payload.start и payload.end уже являются объектами Date
  startDateFilter.value = payload.start || null;
  endDateFilter.value = payload.end || null;
  currentPage.value = 1; // Сброс страницы при изменении фильтра
  console.log('NewsPageContainer: Фильтры дат установлены: startDateFilter=', startDateFilter.value, 'endDateFilter=', endDateFilter.value);
};
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style> 