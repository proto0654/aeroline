<template>
  <div class="modal-content">
    <h2 class="text-h4 font-bold text-brand-gray mb-4">{{ news.title }}</h2>
    <div v-if="news.image && !news.isPlaceholder" class="news-image mb-4">
      <div class="rounded-2xl overflow-hidden">
        <img :src="news.image" :alt="news.title" class="w-full object-cover aspect-[1.85/1]">
      </div>
    </div>
    <p class="news-text text-body text-brand-gray mb-4">{{ news.content }}</p>
    <p class="text-caption-form text-brand-gray-light">{{ news.date }}</p>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  news: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

onMounted(() => {
  console.log('NewsDetailModal mounted with news:', props.news);
});
</script> 