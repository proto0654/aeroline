<template>
    <div>
        <date-picker v-model:value="selectedDate" v-model:open="isOpen" type="date" placeholder="Выберите дату"
            format="DD.MM.YYYY" :lang="locale" @change="handleChange" @close="handleClose"></date-picker>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import langRu from 'vue-datepicker-next/locale/ru.es';

const props = defineProps({
    initialDate: {
        type: [Date, String],
        default: null
    },
    placeholder: {
        type: String,
        default: 'Выберите дату'
    },
    closeOnSelect: {
        type: Boolean,
        default: true
    },
    minDate: {
        type: [Date, String],
        default: null
    },
    maxDate: {
        type: [Date, String],
        default: null
    }
});

const emit = defineEmits(['date-select', 'clear-selection', 'update:date']);

const selectedDate = ref(props.initialDate);
const locale = ref(langRu);
const isOpen = ref(false);

// Синхронизация с начальным пропсом
watch(() => props.initialDate, (newDate) => {
    console.log('DatePickerVue: initialDate prop changed to:', newDate);
    selectedDate.value = newDate;
    console.log('DatePickerVue: selectedDate updated to:', selectedDate.value);
}, { immediate: true });

// Отслеживание изменений и эмитирование события
watch(selectedDate, (newDate) => {
    console.log('DatePickerVue: selectedDate changed, emitting update:date', newDate);
    emit('update:date', newDate);
});

// Обработчик изменения даты
const handleChange = (newDate) => {
    selectedDate.value = newDate;
    // Если выбрана дата и опция включена — закрываем попап
    if (props.closeOnSelect && newDate) {
        isOpen.value = false;
    }
};

// Обработчик закрытия календаря
const handleClose = () => {
    console.log('Date picker closed');
};

// Метод для очистки выбранной даты извне
const clearSelection = () => {
    selectedDate.value = null;
    emit('clear-selection');
};

// Предоставляем метод очистки для доступа извне
defineExpose({
    clearSelection
});
</script>

<style scoped>
/* Специфичные стили для компонента */
</style>

<style>
/* Глобальные стили для оверрайда библиотеки vue-datepicker-next */
.mx-datepicker {
  width: 100%;
}

.mx-input {
  border: 1px solid #e5e7eb !important; /* gray-200 */
  border-radius: 0.5rem !important; /* rounded-lg */
  padding: 0.75rem 1rem !important; /* px-4 py-3 */
  font-size: inherit;
  background-color: white;
  color: #6b7280; /* text-body-secondary */
  font-family: inherit;
  height: auto !important;
  min-height: 3rem;
}

.mx-input:focus {
  outline: none !important;
  border-color: #008dd2 !important; /* brand-blue */
  box-shadow: 0 0 0 2px rgba(0, 141, 210, 0.1) !important;
}

.mx-input::placeholder {
  color: #9ca3af !important; /* gray-400 */
}

/* Стилизация календаря */
.mx-datepicker-main {
  border: 1px solid #e5e7eb !important;
  border-radius: 0.5rem !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  font-family: inherit;
}

.mx-datepicker-header {
  background-color: #f9fafb !important; /* gray-50 */
  border-bottom: 1px solid #e5e7eb !important;
  padding: 0.75rem 1rem !important;
}

.mx-datepicker-body {
  background-color: white;
}

.mx-calendar {
  background-color: white;
}

.mx-calendar-header {
  background-color: #f9fafb !important;
  border-bottom: 1px solid #e5e7eb !important;
}

.mx-calendar-content {
  background-color: white;
}

.mx-calendar-content .mx-table-date td {
  padding: 0.5rem !important;
}

.mx-calendar-content .mx-table-date .cell {
  border-radius: 0.25rem !important;
  transition: all 0.2s ease-in-out;
}

.mx-calendar-content .mx-table-date .cell:hover {
  background-color: #f3f4f6 !important; /* gray-100 */
}

.mx-calendar-content .mx-table-date .cell.active {
  background-color: #008dd2 !important; /* brand-blue */
  color: white !important;
}

.mx-calendar-content .mx-table-date .cell.today {
  color: #008dd2 !important; /* brand-blue */
  font-weight: 600;
}

.mx-calendar-content .mx-table-date .cell.today.active {
  color: white !important;
}

/* Стили для кнопок навигации */
.mx-btn {
  color: #4d4d4d !important; /* brand-gray */
  background-color: transparent !important;
  border: none !important;
  padding: 0.5rem !important;
  border-radius: 0.25rem !important;
  transition: all 0.2s ease-in-out;
}

.mx-btn:hover {
  background-color: #f3f4f6 !important; /* gray-100 */
  color: #008dd2 !important; /* brand-blue */
}

/* Стили для заголовков месяцев/лет */
.mx-calendar-header .mx-btn {
  font-weight: 600;
  color: #374151 !important; /* gray-700 */
}

/* Стили для дней недели */
.mx-table-date thead th {
  color: #6b7280 !important; /* gray-500 */
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.5rem !important;
}

/* Стили для отключенных дат */
.mx-calendar-content .mx-table-date .cell.disabled {
  color: #d1d5db !important; /* gray-300 */
  cursor: not-allowed;
}

.mx-calendar-content .mx-table-date .cell.disabled:hover {
  background-color: transparent !important;
}
</style>