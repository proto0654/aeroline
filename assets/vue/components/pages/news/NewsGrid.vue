<template>
  <div class="news-grid space-y-6 md:space-y-8 w-full">
    <NewsCard v-for="newsItem in newsItems" :key="newsItem.id" :news="newsItem" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import NewsCard from './NewsCard.vue';

const props = defineProps({
  newsItems: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style> 