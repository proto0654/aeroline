<template>
  <div class="news-page-container container mx-auto px-4 py-8 flex flex-col items-center">


    <DateRangeFilter @date-range-changed="handleDateRangeChanged" :initialStartDate="defaultStartDate"
      :initialEndDate="defaultEndDate" class="my-20" />

    <div v-if="loading" class="text-center text-lg text-gray-600">Загрузка новостей...</div>
    <div v-else-if="error" class="text-center text-lg text-red-600">Ошибка при загрузке новостей: {{ error }}</div>
    <div v-else-if="paginatedNews.length > 0">
      <NewsGrid :newsItems="paginatedNews" />
      <NewsPagination :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="updateCurrentPage" />
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
    // Загружаем данные из API
    const apiUrl = 'https://08615a563fb9b4f8.mokky.dev/news';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // API возвращает массив напрямую, а не объект с полем news
    const newsArray = Array.isArray(data) ? data : (data.news || []);
    
    // Функция для парсинга даты из строки формата "5 май 2025"
    const parseDateString = (dateStr) => {
      if (!dateStr) return null;
      const months = {
        'январь': 0, 'февраль': 1, 'март': 2, 'апрель': 3, 'май': 4, 'июнь': 5,
        'июль': 6, 'август': 7, 'сентябрь': 8, 'октябрь': 9, 'ноябрь': 10, 'декабрь': 11
      };
      const parts = dateStr.toLowerCase().split(' ');
      if (parts.length >= 3) {
        const day = parseInt(parts[0]);
        const monthName = parts[1];
        const year = parseInt(parts[2]);
        if (months.hasOwnProperty(monthName)) {
          return new Date(year, months[monthName], day);
        }
      }
      return null;
    };

    news.value = newsArray.map(item => {
      // Пробуем использовать поле date для точной даты, если оно есть
      let dateObj = null;
      if (item.date) {
        const parsedDate = parseDateString(item.date);
        if (parsedDate) {
          dateObj = parsedDate;
        }
      }
      
      // Если не удалось распарсить date, используем timestamp
      if (!dateObj && item.timestamp) {
        dateObj = new Date(item.timestamp * 1000);
        // Корректируем на локальное время: берем только дату без времени
        const localDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        dateObj = localDate;
      }
      
      // Логирование для отладки новостей за май 2025
      if (item.id === '15' || item.id === 15 || (item.date && item.date.includes('5 май'))) {
        console.log(`[DEBUG LOAD] Item ID: ${item.id}, timestamp: ${item.timestamp}, date: ${item.date}, dateObject: ${dateObj}, dateString: ${dateObj ? dateObj.toISOString().split('T')[0] : 'null'}`);
      }
      
      return {
        ...item,
        // Преобразуем timestamp в объект Date для удобства фильтрации
        dateObject: dateObj || new Date()
      };
    }).sort((a, b) => {
      // Сортируем по dateObject, если есть, иначе по timestamp
      if (a.dateObject && b.dateObject) {
        return b.dateObject.getTime() - a.dateObject.getTime();
      }
      return (b.timestamp || 0) - (a.timestamp || 0);
    });

    // Если в данных есть itemsPerPage, используем его
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
    // Нормализуем дату новости: создаем новую дату только с годом, месяцем и днем (без времени)
    const itemDate = new Date(item.dateObject.getFullYear(), item.dateObject.getMonth(), item.dateObject.getDate());

    // Нормализуем даты фильтра (убираем время, оставляем только дату)
    const startFilterDate = startDateFilter.value ? new Date(startDateFilter.value.getFullYear(), startDateFilter.value.getMonth(), startDateFilter.value.getDate()) : null;
    const endFilterDate = endDateFilter.value ? new Date(endDateFilter.value.getFullYear(), endDateFilter.value.getMonth(), endDateFilter.value.getDate()) : null;

    // Проверяем, выбрана ли только одна дата (точная дата)
    const isSingleDate = startFilterDate && endFilterDate && 
      startFilterDate.getTime() === endFilterDate.getTime();
    
    // Если выбрана только одна дата, фильтруем по точной дате
    if (isSingleDate) {
      // Сравниваем даты по строковому представлению YYYY-MM-DD для надежности
      const itemDateStr = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
      const filterDateStr = `${startFilterDate.getFullYear()}-${String(startFilterDate.getMonth() + 1).padStart(2, '0')}-${String(startFilterDate.getDate()).padStart(2, '0')}`;
      const match = itemDateStr === filterDateStr;
      
      // Логирование для отладки (временно включено)
      if (item.id === '15' || item.id === 15) {
        console.log(`[DEBUG] Item ID: ${item.id}, timestamp: ${item.timestamp}, dateObject: ${item.dateObject}, itemDate: ${itemDateStr}, filterDate: ${filterDateStr}, match: ${match}`);
      }
      
      return match;
    }

    // Если выбран диапазон дат
    // Если есть только startDate, фильтруем от этой даты и дальше
    // Если есть только endDate, фильтруем до этой даты включительно
    let startMatch = true;
    let endMatch = true;

    if (startFilterDate) {
      startMatch = itemDate >= startFilterDate;
    }

    if (endFilterDate) {
      // Добавим +1 день к endFilterDate, чтобы включить весь последний день диапазона
      const endFilterDatePlusOne = new Date(endFilterDate);
      endFilterDatePlusOne.setDate(endFilterDatePlusOne.getDate() + 1);
      endMatch = itemDate < endFilterDatePlusOne;
    }

    // Логирование для отладки
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
  // Если выбрана только одна дата, устанавливаем её как startDate и endDate
  if (payload.start && !payload.end) {
    // Если есть только start, используем его как единственную дату
    startDateFilter.value = payload.start;
    endDateFilter.value = payload.start;
  } else if (!payload.start && payload.end) {
    // Если есть только end, используем его как единственную дату
    startDateFilter.value = payload.end;
    endDateFilter.value = payload.end;
  } else {
    // Если есть обе даты или обе null
    startDateFilter.value = payload.start || null;
    endDateFilter.value = payload.end || null;
  }
  currentPage.value = 1; // Сброс страницы при изменении фильтра
  console.log('NewsPageContainer: Фильтры дат установлены: startDateFilter=', startDateFilter.value, 'endDateFilter=', endDateFilter.value);
};
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style>