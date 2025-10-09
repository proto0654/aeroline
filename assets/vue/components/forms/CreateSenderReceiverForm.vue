<template>
  <!-- Удалена внешняя структура модального окна, она теперь управляется GlobalModalHost -->
  <div class="modal-content" style="min-width: 500px;">
    <!-- Удаляем тестовый параграф -->
    <!-- <p style="color: red; font-weight: bold;">Тест рендеринга формы</p> -->

    <!-- Заголовок формы -->
    <h3 class="text-h5 font-bold text-brand-gray mb-4 text-center">
      {{ isEdit ? 'Редактировать контакт' : 'Новый контакт' }}
    </h3>

    <!-- DaisyUI Tabs for selecting entity type -->
    <div role="tablist" class="tabs tabs-boxed mb-4">
      <input
        type="radio"
        name="entity_type"
        role="tab"
        class="tab"
        aria-label="ЮР.ЛИЦО"
        value="juridical"
        v-model="entityType"
        />
      <input
        type="radio"
        name="entity_type"
        role="tab"
        class="tab"
        aria-label="ФИЗ.ЛИЦО"
        value="physical"
        v-model="entityType"
      />
    </div>

    <BaseForm
      :validation-schema="validationSchema"
      :initial-values="initialValues"
      :on-submit="handleSubmit"
      v-slot="{ values, errors, isSubmitting }"
    >
      <!-- Оборачиваем содержимое слота в один корневой div -->
      <div class="form-fields">
        <!-- Fields for ЮР.ЛИЦО -->
        <div v-if="entityType === 'juridical'" role="tabpanel" class="tab-content p-0">
          <div class="form space-y-4">
            <TextInput
              name="jurName"
              label="Наименование юридического лица"
              placeholder="Введите наименование"
              :model-value="values.jurName"
              @update:model-value="values.jurName = $event"
              :error="errors.jurName"
            />
            <TextInput
              name="inn"
              label="ИНН"
              placeholder="Введите ИНН"
              :model-value="values.inn"
              @update:model-value="values.inn = $event"
              :error="errors.inn"
            />
            <TextInput
              name="kpp"
              label="КПП"
              placeholder="Введите КПП"
              :model-value="values.kpp"
              @update:model-value="values.kpp = $event"
              :error="errors.kpp"
            />
            <TextInput
              name="ogrn"
              label="ОГРН"
              placeholder="Введите ОГРН"
              :model-value="values.ogrn"
              @update:model-value="values.ogrn = $event"
              :error="errors.ogrn"
            />
            <TextInput
              name="address"
              label="Адрес юридического лица"
              placeholder="Введите адрес"
              :model-value="values.address"
              @update:model-value="values.address = $event"
              :error="errors.address"
            />

            <div class="grid grid-cols-3 gap-4 mb-4">
               <!-- TODO: Add actual country options -->
               <SelectInput
                name="country"
                label="Страна"
                 :options="[]"
                 :model-value="values.country"
                 @update:model-value="values.country = $event"
                 :error="errors.country"
              />
               <TextInput
                name="index"
                label="Индекс"
                placeholder="Введите индекс"
                 :model-value="values.index"
                 @update:model-value="values.index = $event"
                 :error="errors.index"
              />
               <!-- TODO: Add actual region options -->
               <SelectInput
                name="region"
                label="Регион"
                 :options="[]"
                 :model-value="values.region"
                 @update:model-value="values.region = $event"
                 :error="errors.region"
              />
            </div>

            <TextInput
              name="city"
              label="Город"
              placeholder="Введите город"
              :model-value="values.city"
              @update:model-value="values.city = $event"
              :error="errors.city"
            />
             <TextInput
              name="phone"
              label="Телефон"
              placeholder="Введите номер телефона"
               :model-value="values.phone"
               @update:model-value="values.phone = $event"
               :error="errors.phone"
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="Введите адрес электронной почты"
               :model-value="values.email"
               @update:model-value="values.email = $event"
               :error="errors.email"
            />
          </div>
        </div>

        <!-- Fields for ФИЗ.ЛИЦО -->
        <div v-else-if="entityType === 'physical'" role="tabpanel" class="tab-content p-0">
           <div class="form space-y-4">
              <TextInput
                name="fio"
                label="ФИО"
                placeholder="Введите ФИО"
                 :model-value="values.fio"
                 @update:model-value="values.fio = $event"
                 :error="errors.fio"
              />
               <TextInput
                name="phone"
                label="Телефон"
                placeholder="Введите номер телефона"
                 :model-value="values.phone"
                 @update:model-value="values.phone = $event"
                 :error="errors.phone"
              />
              <TextInput
                name="email"
                label="Email"
                placeholder="Введите адрес электронной почты"
                 :model-value="values.email"
                 @update:model-value="values.email = $event"
                 :error="errors.email"
              />
           </div>
        </div>
      </div>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
// import { z } from 'zod'; // Удаляем импорт zod
import * as yup from 'yup'; // Добавляем импорт yup
import BaseForm from '@/components/forms/BaseForm.vue';
import TextInput from '@/components/forms/TextInput.vue';
import SelectInput from '@/components/forms/SelectInput.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Новый контакт'
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['submit', 'cancel']);

// Define validation schemas using yup
const juridicalSchema = yup.object({
  jurName: yup.string().required('Наименование обязательно'),
  inn: yup.string().optional(),
  kpp: yup.string().optional(),
  ogrn: yup.string().optional(),
  address: yup.string().optional(),
  country: yup.string().optional(),
  index: yup.string().optional(),
  region: yup.string().optional(),
  city: yup.string().optional(),
  phone: yup.string().required('Телефон обязателен'),
  // Обработка пустой строки для опционального email
  email: yup.string().email('Некорректный email').transform(value => value === '' ? undefined : value).optional(),
});

const physicalSchema = yup.object({
  fio: yup.string().required('ФИО обязательно'),
  phone: yup.string().required('Телефон обязателен'),
   // Обработка пустой строки для опционального email
  email: yup.string().email('Некорректный email').transform(value => value === '' ? undefined : value).optional(),
});

// Reactive state for initial values and validation schema
const initialValues = computed(() => { // Изменяем на computed
  const baseDefaults = {
    jurName: '', inn: '', kpp: '', ogrn: '', address: '', country: '', index: '', region: '', city: '', phone: '', email: '',
    fio: '',
  };
  return { ...baseDefaults, ...props.initialData };
});

const entityType = ref(props.initialData?.entity_type || 'juridical'); // Default to juridical
const validationSchema = ref(entityType.value === 'juridical' ? juridicalSchema : physicalSchema);

// Watch for entityType changes to update validation schema
watch(entityType, (newEntityType) => {
  validationSchema.value = newEntityType === 'juridical' ? juridicalSchema : physicalSchema;
  // Reset errors and potentially clear values when switching type?
  // For simplicity, we'll rely on the form handling validation on submit
});

const handleSubmit = async (values: any) => {
  console.log('Form submitted with values:', values);
  // Add entity type to the submitted data
  const dataToSubmit = {
    ...values,
    entity_type: entityType.value
  };
  emit('submit', dataToSubmit);
};

</script>

<style scoped>
/* Add any specific styles for this modal if necessary */
.modal-content {
  /* Ensure modal-content styles are compatible with DaisyUI tabs */
}
</style> 