<template>
  <div class="date-range-filter mb-6">
    <DateRangePickerVue
      :initialRange="[initialStartDate, initialEndDate]"
      @update:range="handleDateRangeSelected"
      class="w-full"
    />
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
});

const emit = defineEmits(['date-range-changed']);

const handleDateRangeSelected = (payload) => {
  emit('date-range-changed', payload);
};
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style> 