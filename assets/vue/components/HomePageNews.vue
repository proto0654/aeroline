<template>
  <div class="news-grid grid grid-cols-1 md:grid-cols-3 gap-6">
    <div v-for="newsItem in latestNews" :key="newsItem.id"
      class="relative news-card bg-brand-light p-6 rounded-lg flex flex-col justify-between relative">

      <div class="wrapper">
        <div class="w-full flex justify-between">
          <h3 class="text-lg font-bold text-brand-gray mb-4  leading-1.2">{{ newsItem.title }}</h3>
          <div v-if="newsItem.isNew" class="new-indicator w-10 h-10 flex items-center justify-center">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g :filter="`url(#filter0_d_news_${newsItem.id})`">
                <circle cx="25" cy="25" r="5" fill="#008DD2"></circle>
              </g>
              <circle cx="25" cy="25" r="7" stroke="#008DD2"></circle>
              <defs>
                <filter :id="`filter0_d_news_${newsItem.id}`" x="0" y="0" width="50" height="50"
                  filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"></feColorMatrix>
                  <feOffset></feOffset>
                  <feGaussianBlur stdDeviation="10"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.552941 0 0 0 0.823529 0 0 0 1 0">
                  </feColorMatrix>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_news_{{id}}"></feBlend>
                  <feBlend mode="normal" in="SourceGraphic" :in2="`effect1_dropShadow_news_${newsItem.id}`"
                    result="shape">
                  </feBlend>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <p class="text-brand-gray text-sm mb-4 flex-grow line-clamp-3">{{ newsItem.content }}</p>
      </div>
      <div class="flex flex-row justify-between items-center mt-4">
        <span class="text-sm mb-2">{{ newsItem.date }}</span>
        <button @click="openNewsModal(newsItem)" class="text-brand-blue text-sm text-left">
          Подробнее
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useGlobalModalStore } from '../stores/globalModal';
import NewsDetailModal from './modals/NewsDetailModal.vue';
import newsData from '../../data/news.json'; // Using mock data for now

// Функция для корректного формирования пути к картинке
const getImageUrl = (imgPath) => {
  if (!imgPath) return new URL('/assets/img/layout/Logotype_aerline_light.png', import.meta.url).href;
  if (/^https?:\/\//.test(imgPath)) return imgPath;
  return new URL(`/${imgPath.replace(/^\//, '')}`, import.meta.url).href;
};

export default {
  name: 'HomePageNews',
  setup() {
    const modalStore = useGlobalModalStore();

    // Assuming newsData is an array of news objects
    // Sort by date and take the latest 3
    const latestNews = computed(() => {
      // Simple date parsing, adjust if format is different
      // Correcting to access the news array from the imported object
      if (!newsData || !Array.isArray(newsData.news)) {
        console.error('Expected newsData.news to be an array, but got:', newsData);
        return []; // Return empty array to prevent errors
      }
      const sortedNews = [...newsData.news].sort((a, b) => new Date(b.date) - new Date(a.date));
      return sortedNews.slice(0, 3);
    });

    const openNewsModal = (newsItem) => {
      console.log('Attempting to open modal with news item:', newsItem);
      modalStore.openModal(
        NewsDetailModal,
        { news: newsItem },
        'large'
      );
    };

    return {
      latestNews,
      openNewsModal,
      getImageUrl,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>