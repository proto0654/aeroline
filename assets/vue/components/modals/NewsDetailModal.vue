<template>
  <div class="modal-content">
    <h2 class="text-h4 font-bold text-brand-gray mb-4">{{ news.title }}</h2>
    <div v-if="news.image && !news.isPlaceholder" class="news-image mb-4">
      <div class="rounded-2xl overflow-hidden">
        <img :src="getImageUrl(news.image)" :alt="news.title" class="w-full object-cover aspect-[1.85/1]">
      </div>
    </div>
    <p class="news-text text-body text-brand-gray mb-4">{{ news.content }}</p>
    <p class="text-caption-form text-brand-gray-light">{{ news.date }}</p>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';

// Импортируем все картинки из папки news (Vite подставит правильные пути с хешем)
const images = import.meta.glob('/assets/img/news/*', { eager: true, as: 'url' });

const props = defineProps({
  news: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// Функция для поиска картинки по имени файла
const getImageUrl = (imgName) => {
  if (!imgName) return new URL('/assets/img/layout/Logotype_aerline_light.png', import.meta.url).href;
  const found = Object.entries(images).find(([path]) => path.endsWith('/' + imgName));
  if (found) return found[1];
  return new URL('/assets/img/layout/Logotype_aerline_light.png', import.meta.url).href;
};

onMounted(() => {
  console.log('NewsDetailModal mounted with news:', props.news);
});
</script> 