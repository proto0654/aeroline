<template>
  <form @submit="onSubmit" class="aero-form space-y-4">
    <slot 
      :errors="errors"
      :values="values"
      :meta="meta"
      :isSubmitting="isSubmitting"
      :submitCount="submitCount"
    ></slot>

    <div v-if="formMessage.show" :class="[
      'alert', 
      formMessage.type === 'success' ? 'alert-success' : 'alert-error',
      'p-4 rounded-lg mb-4'
    ]">
      <div class="flex items-center">
        <span v-if="formMessage.type === 'success'" class="mr-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </span>
        <span v-else class="mr-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </span>
        <span>{{ formMessage.text }}</span>
      </div>
    </div>

    <slot name="actions" 
      :isSubmitting="isSubmitting" 
      :submitCount="submitCount"
      :isValid="meta.valid"
      :reset="resetForm"
    >
      <div class="flex gap-3 pt-2">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="flex-1 px-4 py-2 border border-gray-300 text-brand-gray rounded-lg hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button 
          type="submit" 
          :disabled="isSubmitting" 
          class="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          {{ submitButtonText || 'Сохранить' }}
          <span v-if="isSubmitting" class="ml-2 inline-block animate-spin">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        </button>
      </div>
    </slot>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { ref, toRef, watch } from 'vue';

const props = defineProps({
  validationSchema: {
    type: Object,
    required: false
  },
  initialValues: {
    type: Object,
    default: () => ({})
  },
  submitButtonText: {
    type: String,
    default: ''
  },
  onSubmit: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['cancel', 'success', 'error', 'submit']);

const initialValues = toRef(props, 'initialValues');
const isSubmitting = ref(false);
const formMessage = ref({
  show: false,
  type: 'success',
  text: ''
});

const { handleSubmit, errors, values, meta, submitCount, resetForm } = useForm({
  validationSchema: props.validationSchema,
  initialValues
});

// Обновление initialValues при изменении props
watch(initialValues, (newValues) => {
  if (newValues && Object.keys(newValues).length > 0) {
    resetForm({ values: newValues });
  }
}, { deep: true });

const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    formMessage.value.show = false;
    
    // Отправляем данные в родительский компонент
    emit('submit', values);
    const result = await props.onSubmit(values);
    
    // Показываем сообщение об успехе
    formMessage.value = {
      show: true,
      type: 'success',
      text: result?.message || 'Данные успешно сохранены'
    };
    
    emit('success', result);
    
    // Опционально сбрасываем форму после успешной отправки
    if (result?.resetAfterSubmit) {
      resetForm();
    }
  } catch (error) {
    // Показываем сообщение об ошибке
    formMessage.value = {
      show: true,
      type: 'error',
      text: error?.message || 'Произошла ошибка при сохранении данных'
    };
    
    emit('error', error);
  } finally {
    isSubmitting.value = false;
    
    // Скрываем сообщение через 5 секунд
    setTimeout(() => {
      formMessage.value.show = false;
    }, 5000);
  }
});
</script>

<style scoped>
.alert-success {
  @apply bg-green-50 text-green-700 border border-green-200;
}

.alert-error {
  @apply bg-red-50 text-red-700 border border-red-200;
}
</style> 