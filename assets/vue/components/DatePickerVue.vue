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
/* Глобальные стили для оверрайда библиотеки */
</style>