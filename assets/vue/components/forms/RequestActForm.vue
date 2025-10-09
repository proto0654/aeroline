<template>
  <BaseForm :validation-schema="schema" :on-submit="onSubmit" submit-button-text="ОТПРАВИТЬ ЗАПРОС" @cancel="onCancel">
    <TextInput name="email" label="Email" placeholder="Введите email" type="email" :required="true" />
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text text-brand-gray font-medium">Период для акта сверки</span>
        <span class="text-brand-red text-lg font-bold">*</span>
      </label>
      <DateRangeFilter :initial-start-date="initialDateRange ? initialDateRange[0] : null"
        :initial-end-date="initialDateRange ? initialDateRange[1] : null" @date-range-changed="handleDateChange"
        :close-on-select="true" />
      <p v-if="dateRangeErrorMessage" class="base-form-error">{{ dateRangeErrorMessage }}</p>
    </div>
  </BaseForm>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import TextInput from './TextInput.vue';
import BaseForm from './BaseForm.vue';
import DateRangeFilter from '../pages/news/DateRangeFilter.vue'; // Используем обертку

const props = defineProps({
  initialDateRange: {
    type: Array,
    default: () => [null, null]
  }
});

const emit = defineEmits(['close', 'success']);

// Validation schema
const schema = yup.object({
  email: yup.string().required('Email обязателен').email('Неверный формат email'),
  dateRange: yup.object().shape({
    start: yup.date().required('Начальная дата обязательна').nullable(),
    end: yup.date().required('Конечная дата обязательна').nullable(),
  }).test(
    'is-date-range-selected',
    'Пожалуйста, выберите период для акта сверки',
    (value) => {
      // Custom validation to ensure both start and end are present
      return value && value.start && value.end;
    }
  ).required('Период для акта сверки обязателен'),
});

// Initial values for the form fields
const initialValues = {
  email: '',
  dateRange: {
    start: props.initialDateRange ? props.initialDateRange[0] : null,
    end: props.initialDateRange ? props.initialDateRange[1] : null
  },
};

// Initialize the form with VeeValidate
const { handleSubmit, errors, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: initialValues,
});

// Use useField for dateRange to integrate with VeeValidate
const { value: dateRangeValue, errorMessage: dateRangeErrorMessage } = useField('dateRange');

const handleDateChange = (payload) => {
  setFieldValue('dateRange', payload);
};

const datePickerRef = ref(null); // Reference to the DateRangePickerVue component

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  console.log('Форма запроса акта сверки отправлена:', values);
  // Here you would typically send data to a server
  // For now, simulate success and then reset
  emit('success', {
    success: true,
    message: `Запрос на акт сверки за период ${formatRange(values.dateRange.start, values.dateRange.end)} отправлен на ${values.email}`,
    resetAfterSubmit: true // Instruct BaseForm to reset
  });
  // Clear the date picker selection
  handleDateChange({ start: null, end: null }); // Сбрасываем значение в форме
});

const onCancel = () => {
  console.log('Форма запроса акта сверки отменена.');
  // Optionally reset the form on cancel
  resetForm();
  handleDateChange({ start: null, end: null }); // Сбрасываем значение в форме
};

// Helper function to format date range for display
const formatRange = (start, end) => {
  if (!start || !end) return '';

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formattedStart = formatDate(start);
  const formattedEnd = formatDate(end);

  return `${formattedStart} - ${formattedEnd}`;
};
</script>

<style scoped>
/* Specific styles for this form if needed */
/* The base styling for inputs will come from forms.css via BaseForm.vue */
</style>