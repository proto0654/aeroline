import { createApp } from 'vue';
import DateRangePickerVue from '../components/DateRangePickerVue.vue';

/**
 * Монтирует компонент DateRangePickerVue в указанный контейнер.
 * @param {string} selector CSS-селектор элемента, в который нужно смонтировать компонент.
 * @param {Object} [props] Начальные пропсы для компонента DateRangePickerVue.
 * @param {Function} [onRangeSelect] Коллбэк для обработки выбора диапазона.
 * @param {Function} [onClearSelection] Коллбэк для обработки сброса выбора.
 * @returns {Object|null} Экземпляр Vue приложения или null, если элемент не найден.
 */
export function mountDateRangePicker(selector, props = {}, onRangeSelect = null, onClearSelection = null) {
  const container = document.querySelector(selector);

  if (!container) {
    console.warn(`Container element not found for selector: ${selector}`);
    return null;
  }

  // Передаем переданные коллбэки onRangeSelect и onClearSelection как пропсы
  // Vue 3 автоматически свяжет их с соответствующими emit-ами компонента.
  const appProps = {
    ...props,
    'onRangeSelect': onRangeSelect,
    'onClearSelection': onClearSelection
  };

  const app = createApp(DateRangePickerVue, appProps);

  const mountedApp = app.mount(container);

  console.log(`Vue DateRangePicker mounted on element with selector: ${selector}`);

  return app;
}

// Пример использования (не будет выполняться напрямую при импорте, только при вызове функции)
// import { mountDateRangePicker } from '/assets/vue/entrypoints/lk-datepicker.js';
// mountDateRangePicker('#my-datepicker-container', { initialRange: [new Date(), new Date()] }, (range) => {
//   console.log('Выбран диапазон:', range);
// }); 