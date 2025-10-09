<script setup>
import { ref, computed } from 'vue';
import * as yup from 'yup';
import BaseForm from './BaseForm.vue';
import TextInput from './TextInput.vue';
import TextareaInput from './TextareaInput.vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  // We need to capture actId from initialData
  actId: {
    type: [String, Number],
    default: null
  }
});

const emit = defineEmits(['close', 'success']); // Changed from ['submit', 'cancel'] to match global modal pattern

// Schema validation for email sending form
const emailSendSchema = yup.object({
  email: yup.string().required('Введите email').email('Введите корректный email'),
  message: yup.string()
});

// Default values
const defaultValues = {
  email: '',
  message: ''
};

// Initial form values, merged with props.initialData
const initialValues = computed(() => {
  return { ...defaultValues, ...props.initialData };
});

// Handle form submission
const handleSubmit = async (values) => {
  try {
    const submitData = {
      ...values,
      actId: props.initialData.actId // Get actId from initialData
    };
    console.log('Форма отправки email акта отправлена:', submitData);
    // Simulate server response
    emit('success', { success: true, message: 'Письмо успешно отправлено!', data: submitData });
    emit('close'); // Close the modal after successful submission
  } catch (error) {
    // Re-throw error for handling in BaseForm, if any (though success is simulated here)
    throw new Error(error?.message || 'Произошла ошибка при отправке письма');
  }
};
</script>

<template>
  <div class="modal-content p-6 max-w-sm">
    <h3 class="text-h4 font-bold text-brand-gray mb-4">Отправить акт на email</h3>
    <p class="text-body-secondary text-brand-gray mb-6">Акт №<span v-text="initialValues.actId"></span> будет отправлен на указанный email адрес.</p>
    <BaseForm
      :validation-schema="emailSendSchema"
      :initial-values="initialValues"
      :on-submit="handleSubmit"
      :submit-button-text="'Отправить'"
      @cancel="$emit('close')"
    >
      <template v-slot="{ errors, values }">
        <TextInput
          name="email"
          label="Email адрес"
          placeholder="Введите email"
          required
          type="email"
        />
        <TextareaInput
          name="message"
          label="Комментарий (необязательно)"
          placeholder="Введите комментарий к письму"
          rows="4"
        />
      </template>
    </BaseForm>
  </div>
</template> 