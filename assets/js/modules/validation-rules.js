/**
 * validation-rules.js
 * Централизованные правила валидации для VeeValidate
 */

import * as yup from 'yup';
import { defineRule } from 'vee-validate';
import { required, email, min, max, confirmed } from '@vee-validate/rules';

// Регистрация стандартных правил
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('confirmed', confirmed);

// Кастомное правило для проверки телефона (российский формат)
defineRule('phone', (value) => {
  if (!value || !value.trim()) {
    return true;
  }
  
  // Проверяем формат +7 (XXX) XXX-XX-XX
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  if (!phoneRegex.test(value)) {
    return 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX';
  }
  
  return true;
});

// Yup схемы для различных форм
export const createSenderReceiverSchema = yup.object({
  type: yup.string().required('Выберите тип'),
  name: yup.string().required('Введите имя или название организации'),
  phone: yup.string()
    .required('Введите номер телефона')
    .test('phone-format', 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX', 
      (value) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)),
  location: yup.string().required('Введите населенный пункт'),
  address: yup.string().required('Введите адрес'),
  comment: yup.string()
});

export const editSenderReceiverSchema = yup.object({
  type: yup.string().required('Выберите тип'),
  name: yup.string().required('Введите имя или название организации'),
  phone: yup.string()
    .required('Введите номер телефона')
    .test('phone-format', 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX', 
      (value) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)),
  location: yup.string().required('Введите населенный пункт'),
  address: yup.string().required('Введите адрес'),
  comment: yup.string()
});

export const becomeClientSchema = yup.object({
  name: yup.string().required('Введите ФИО или название организации'),
  phone: yup.string()
    .required('Введите номер телефона')
    .test('phone-format', 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX', 
      (value) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)),
  email: yup.string().required('Введите email').email('Введите корректный email'),
  type: yup.string().required('Выберите тип клиента')
});

// Добавьте другие схемы по мере необходимости 