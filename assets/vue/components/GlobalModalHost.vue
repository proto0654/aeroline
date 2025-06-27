<template>
  <div
    ref="modalElement"
    :id="modalId"
    class="modal fixed inset-0 z-[9999] flex items-center justify-center"
    :class="{ 'modal-open': globalModal.isOpen }"
    @transitionend="handleModalTransitionEnd"
  >
    <div class="modal-backdrop absolute inset-0 bg-black bg-opacity-50" @click="handleBackdropClick"></div>
    <div
      class="modal-box relative bg-white rounded-lg p-6 z-10"
      :class="modalBoxSizeClass"
    >
      <button
        class="modal-close absolute right-4 top-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
        aria-label="Закрыть"
        @click="handleCloseButton"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 6l8 8M6 14L14 6" stroke-linecap="round" />
        </svg>
      </button>

      <div class="modal-content">
        <!-- Динамическое отображение компонента - рендерим только когда контент должен быть виден -->
        <component
          v-if="isContentVisible"
          :is="globalModal.component"
          v-bind="globalModal.props"
          @submit="handleComponentSubmit"
          @cancel="handleComponentCancel"
          @close="handleComponentClose"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { useGlobalModalStore } from '../stores/globalModal';

const globalModal = useGlobalModalStore();

const modalId = 'global-modal-host';
const modalElement = ref(null);
const isContentVisible = ref(false); // Новое состояние для управления видимостью контента

const modalBoxSizeClass = computed(() => {
  switch (globalModal.size) {
    case 'small':
      return 'modal-box-sm';
    case 'large':
      return 'w-auto max-w-[calc(100vw-8rem)]';
    case 'full':
      return 'modal-box-full';
    case 'default':
    default:
      return 'max-w-md'; // Явно применяем max-w-md для размера по умолчанию
  }
});

// Наблюдаем за изменением состояния isOpen в сторе Pinia
watch(() => globalModal.isOpen, async (newValue) => {
  // console.log('GlobalModalHost: globalModal.isOpen changed to', newValue); // Лог изменения isOpen
  if (newValue) {
    // Если модалка открывается, сначала делаем контент видимым
    isContentVisible.value = true;
    // console.log('GlobalModalHost: isContentVisible set to true'); // Лог изменения isContentVisible
    await nextTick(); // Ждем, пока Vue обновит DOM
    // === Debugging START ===
    // console.log('GlobalModalHost: globalModal.component (before render):', globalModal.component);
    // console.log('GlobalModalHost: typeof globalModal.component:', typeof globalModal.component);
    // if (globalModal.component) {
    //   console.log('GlobalModalHost: globalModal.component.name:', globalModal.component.name);
    //   console.log('GlobalModalHost: globalModal.component.__file:', globalModal.component.__file); // Для отладки пути файла компонента
    // }
    // === Debugging END ===
    // Затем добавляем класс modal-open и блокируем скролл
    modalElement.value.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    modalElement.value.focus(); // Фокус на модальном окне для доступности
  } else {
    // Если модалка закрывается, удаляем класс modal-open (начинается анимация)
    modalElement.value.classList.remove('modal-open');
    document.body.style.overflow = '';
    // console.log('GlobalModalHost: isContentVisible will be set to false after transition'); // Лог изменения isContentVisible
    // isContentVisible будет установлено в false после завершения анимации
  }
});

// Новый обработчик события transitionend
const handleModalTransitionEnd = (event) => {
  // console.log('GlobalModalHost: transitionend event fired', event.target); // Лог события transitionend
  // Убеждаемся, что переход произошел на корневом элементе модального окна
  // и модальное окно должно быть закрыто (globalModal.isOpen === false)
  if (event.target === modalElement.value && !globalModal.isOpen) {
    isContentVisible.value = false; // Скрываем контент
    // console.log('GlobalModalHost: isContentVisible set to false'); // Лог изменения isContentVisible
    // Очищаем компонент и пропсы в сторе после завершения анимации закрытия
    globalModal.component = null;
    globalModal.props = {};
  }
};

// Обработчики для взаимодействия с ModalManager (хост-компонент управляет этим)
const handleCloseButton = () => {
  globalModal.cancelModal(); // Отменяем модалку при клике на кнопку закрытия
};

const handleBackdropClick = () => {
  // console.log('Клик по бэкдропу зарегистрирован.'); // Для отладки
  globalModal.cancelModal(); // Отменяем модалку при клике на backdrop
};

// Обработчики событий от динамического компонента
const handleComponentSubmit = (result) => {
  globalModal.closeModal(result);
};

const handleComponentCancel = () => {
  globalModal.cancelModal();
};

const handleComponentClose = () => {
  globalModal.cancelModal();
};

// Добавляем глобальный обработчик для клавиши Escape
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && globalModal.isOpen) {
    globalModal.cancelModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
});
</script> 