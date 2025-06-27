<template>
  <div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
    <button
      @click="goToPage(1)"
      :disabled="currentPage === 1"
      class="btn btn-square btn-ghost"
      aria-label="First page"
    >
      &#x23EE;
    </button>
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="btn btn-square btn-ghost"
      aria-label="Previous page"
    >
      &#x25C0;
    </button>

    <button
      v-for="page in displayedPages"
      :key="page"
      @click="goToPage(page)"
      :class="['btn btn-square', { 'btn-primary': page === currentPage }]"
    >
      {{ page }}
    </button>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="btn btn-square btn-ghost"
      aria-label="Next page"
    >
      &#x25B6;
    </button>
    <button
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages"
      class="btn btn-square btn-ghost"
      aria-label="Last page"
    >
      &#x23ED;
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  pageRange: {
    type: Number,
    default: 5, // Количество отображаемых номеров страниц
  },
});

const emit = defineEmits(['update:currentPage']);

const displayedPages = computed(() => {
  const pages = [];
  const startPage = Math.max(1, props.currentPage - Math.floor(props.pageRange / 2));
  const endPage = Math.min(props.totalPages, startPage + props.pageRange - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Корректировка, если в конце не хватает страниц
  while (pages.length < props.pageRange && pages[0] > 1) {
    pages.unshift(pages[0] - 1);
  }

  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page);
  }
};
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style> 