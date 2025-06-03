<template>
  <div>
    <date-picker
      v-model:value="dateRange"
      type="date"
      range
      placeholder="Выберите период"
      format="DD.MM.YYYY"
      :lang="locale"
      @confirm="handleConfirm"
      @close="handleClose"
    ></date-picker>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css'; // Базовые стили календаря
import langRu from 'vue-datepicker-next/locale/ru.es'; // Локализация для production сборки

// Определяем пропсы, которые компонент может принимать
const props = defineProps({
  initialRange: { // Начальный выбранный диапазон [Date, Date] или [String, String]
    type: Array,
    default: null
  },
  placeholder: { // Текст плейсхолдера
    type: String,
    default: 'Выберите период'
  }
  // Можно добавить другие пропсы для настройки DatePicker из библиотеки
  // minDate, maxDate, format, etc.
});

// Определяем события, которые компонент может излучать
const emit = defineEmits(['range-select', 'clear-selection']);

// Состояние для выбранного диапазона
const dateRange = ref(props.initialRange);

// Настройка локализации
const locale = ref(langRu);

// Синхронизация внутреннего состояния с начальным пропсом
watch(() => props.initialRange, (newRange) => {
  dateRange.value = newRange;
});

// Обработчик подтверждения выбора диапазона
const handleConfirm = () => {
  if (dateRange.value && dateRange.value.length === 2 && dateRange.value[0] && dateRange.value[1]) {
    emit('range-select', {
      start: dateRange.value[0],
      end: dateRange.value[1],
      formattedRange: formatRange(dateRange.value)
    });
  } else {
     // Если выбранный диапазон невалиден после подтверждения, сбрасываем выбор
     dateRange.value = null;
     emit('clear-selection');
  }
};

// Обработчик закрытия календаря (если нужно что-то делать при закрытии без подтверждения)
const handleClose = () => {
  console.log('Date picker closed');
  // Можно добавить логику, если нужна реакция на закрытие без выбора
};

// Вспомогательная функция для форматирования диапазона дат
const formatRange = (range) => {
  if (!range || range.length !== 2 || !range[0] || !range[1]) return '';

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const start = formatDate(range[0]);
  const end = formatDate(range[1]);

  return `${start} - ${end}`;
};

// Метод для очистки выбранного диапазона извне (если нужно)
const clearSelection = () => {
  dateRange.value = null;
  emit('clear-selection');
};

// Предоставляем метод очистки для доступа извне компонента-острова
defineExpose({
  clearSelection
});

</script>

<style scoped>
/* Здесь можно добавить специфичные стили для компонента */
/* Например, для адаптации внешнего вида календаря к дизайну DaisyUI */
/* .date-range-picker-container {} */
</style>

<style>
/* Здесь можно добавить глобальные стили для оверрайда библиотеки, если scoped стили не работают */
/* Например, для стилизации выпадающего календаря */
/* .mx-datepicker-popup { z-index: 1050 !important; } */
</style> 