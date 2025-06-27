<template>
  <div class="news-card py-2 md:py-4 bg-brand-light border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-news-id="{{news.id}}">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-2/5 rounded-2xl overflow-hidden px-2 md:px-4 ">
        <img v-if="news.image" :src="news.image" :alt="news.title" class="w-full object-cover rounded-2xl aspect-video max-w-[100%]">
        <img v-else :src="basePath + 'assets/img/layout/Logotype_aerline_light.png'" :alt="news.title" class="placeholder w-full object-contain min-h-[120px] h-full p-10">
      </div>
      <div class="w-full md:w-3/5 px-2 md:px-4 py-3 md:py-4">
        <div class="flex items-start justify-between mb-4">
          <h3 class="news-title text-h5 md:text-h4 font-bold text-brand-gray pr-4">{{ news.title }}</h3>
          <div v-if="news.isNew" class="flex-shrink-0">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g :filter="`url(#filter0_d_news_${news.id})`">
                <circle cx="25" cy="25" r="5" fill="#008DD2"></circle>
              </g>
              <circle cx="25" cy="25" r="7" stroke="#008DD2"></circle>
              <defs>
                <filter :id="`filter0_d_news_${news.id}`" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                  <feOffset></feOffset>
                  <feGaussianBlur stdDeviation="10"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.552941 0 0 0 0 0.823529 0 0 0 1 0"></feColorMatrix>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_news_${news.id}"></feBlend>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_news_${news.id}" result="shape"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <p class="news-content text-brand-gray mb-6">{{ truncatedContent }}</p>
        <div class="flex justify-between items-center pr-2 md:pr-0">
          <div class="news-date text-caption-form text-brand-gray">{{ news.date }}</div>
          <button @click.prevent="openNewsDetail(news)" class="news-details-btn text-brand-blue md:text-body-secondary hover:text-brand-blue-dark transition-colors">Подробнее</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useGlobalModalStore } from '../../../stores/globalModal';
import NewsDetailModal from '../../modals/NewsDetailModal.vue';

const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
});

const globalModalStore = useGlobalModalStore();

const truncatedContent = computed(() => {
  const maxLength = 120; // Примерная длина для краткого описания
  if (props.news.content.length > maxLength) {
    return props.news.content.substring(0, maxLength) + '...';
  }
  return props.news.content;
});

const openNewsDetail = (newsItem) => {
  globalModalStore.openModal(NewsDetailModal, { news: newsItem }, 'large');
};

const basePath = '/'; // Временно используем для статичного пути, Vite должен будет его заменить
</script>

<style scoped>
/* Дополнительные стили, если нужны */
.news-card .news-content {
  line-clamp: 4;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 