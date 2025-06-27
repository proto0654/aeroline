<template>
  <form class="form space-y-4" @submit.prevent="onSubmit">
    <div>
      <TextInput
        name="name"
        label="Имя"
        placeholder="Имя"
        :required="true"
        class=""
      />
    </div>

    <div>
      <TextInput
        name="phone"
        label="Телефон"
        placeholder="+7 (___) ___-__-__"
        :required="true"
        type="tel"
        class=""
      />
    </div>

    <button type="submit" class="btn text-white px-6 py-3 rounded-lg text-buttons w-full">
      Отправить
    </button>

    <CheckboxInput
      name="consent"
      :required="true"
      label="Согласен на обработку персональных данных, ознакомлен с пользовательским соглашением и политикой конфиденциальности"
      id="consent-checkbox"
      class="mt-2"
    />
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import TextInput from './TextInput.vue';
import CheckboxInput from './CheckboxInput.vue';

// Define validation schema using yup
const schema = yup.object({
  name: yup.string().required('Поле "Имя" обязательно для заполнения'),
  phone: yup.string().required('Поле "Телефон" обязательно для заполнения').matches(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d{3}[- .]?\d{4}$/, 'Неверный формат номера телефона'),
  consent: yup.boolean().oneOf([true], 'Необходимо согласие на обработку персональных данных').required('Необходимо согласие'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

// Handle form submission
const onSubmit = handleSubmit(values => {
  // TODO: Integrate with actual API endpoint for form submission
  console.log('Form submitted with values:', values);
  alert('Форма успешно отправлена (имитация)');
  resetForm();
});
</script>

<style scoped>
/* Add any component specific styles here */
:deep(.sr-only) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style> 