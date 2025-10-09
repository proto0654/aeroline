import { defineStore } from 'pinia';
import { ref, markRaw } from 'vue';

export const useGlobalModalStore = defineStore('globalModal', () => {
  const isOpen = ref(false);
  const component = ref(null); // Компонент для отображения в модалке
  const props = ref({});       // Пропсы для передаваемого компонента
  const resolvePromise = ref(null); // Для возврата результата из модалки
  const size = ref('default'); // Размер модального окна: 'default', 'small', 'large', 'full'
  // const rejectPromise = ref(null);  // Для обработки отмены/ошибки - больше не нужен

// Определяем пользовательскую ошибку для отмены модального окна
// class ModalCancelledError extends Error {
//   constructor(message = 'Modal was cancelled') {
//     super(message);
//     this.name = 'ModalCancelledError';
//   }
// }

  /**
   * Открывает глобальное модальное окно.
   * @param {Object} modalComponent - Vue-компонент, который будет отображен внутри модалки.
   * @param {Object} modalProps - Пропсы, которые будут переданы в `modalComponent`.
   * @returns {Promise<any>} Промис, который разрешается при успешном закрытии модалки (сабмит) или отклоняется при отмене.
   */
  function openModal(modalComponent, modalProps = {}, modalSize = 'default') {
    // wrap with markRaw to prevent Vue from trying to make it reactive
    component.value = markRaw(modalComponent);
    props.value = modalProps;
    size.value = modalSize;
    isOpen.value = true;

    // Создаем новый промис, который будет разрешен или отклонен при закрытии модалки
    return new Promise((resolve) => { // Всегда resolve
      resolvePromise.value = resolve;
      // rejectPromise.value = reject; // Больше не нужен reject для отмены
    });
  }

  /**
   * Закрывает глобальное модальное окно и разрешает промис.
   * @param {any} result - Результат, который будет передан в resolve промиса.
   */
  function closeModal(result = null) {
    if (resolvePromise.value) {
      resolvePromise.value({ type: 'success', data: result });
      resolvePromise.value = null;
    }
    isOpen.value = false;
    // component.value = null; // Очищаем компонент после закрытия
    // props.value = {}; // Очищаем пропсы
    size.value = 'default'; // Сбрасываем размер
  }

  /**
   * Отменяет глобальное модальное окно и отклоняет промис.
   * @param {any} error - Ошибка, которая будет передана в reject промиса.
   */
  function cancelModal() {
    if (resolvePromise.value) {
      resolvePromise.value({ type: 'cancelled' });
      resolvePromise.value = null;
    }
    isOpen.value = false;
    // component.value = null; // Очищаем компонент после закрытия
    // props.value = {}; // Очищаем пропсы
    size.value = 'default'; // Сбрасываем размер
  }

  return {
    isOpen,
    component,
    props,
    size,
    openModal,
    closeModal,
    cancelModal
    // ModalCancelledError // Удаляем экспорт, так как класс больше не нужен здесь
  };
}); 