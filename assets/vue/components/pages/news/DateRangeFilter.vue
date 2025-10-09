<template>
  <div class="date-range-filter mb-6">
    <DateRangePickerVue :initialRange="[initialStartDate, initialEndDate]" @update:range="handleDateRangeSelected"
      :close-on-select="closeOnSelect" class="w-full" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import DateRangePickerVue from '../../../components/DateRangePickerVue.vue';

const props = defineProps({
  initialStartDate: {
    type: [String, Date],
    default: null,
  },
  initialEndDate: {
    type: [String, Date],
    default: null,
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['date-range-changed']);

const handleDateRangeSelected = (payload) => {
  emit('date-range-changed', payload);
  // После выбора диапазона компонент DateRangePickerVue сам закроет попап,
  // если closeOnSelect: true.
  // Никаких дополнительных действий здесь не требуется.
};
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style>