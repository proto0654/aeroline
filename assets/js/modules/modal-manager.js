/**
 * modal-manager.js
 * Единый модуль для управления модальными окнами с DaisyUI
 */

export class ModalManager {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close(this.activeModal);
      }
    });

    // Закрытие по клику на backdrop
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') && this.activeModal) {
        this.close(this.activeModal);
      }
    });

    // Закрытие по кнопкам с классом modal-close
    document.addEventListener('click', (e) => {
      if (e.target.closest('.modal-close') && this.activeModal) {
        this.close(this.activeModal);
      }
    });
  }

  /**
   * Открыть модальное окно
   * @param {string|HTMLElement} modal - ID модального окна или элемент
   * @param {Object} options - Дополнительные опции
   */
  open(modal, options = {}) {
    const modalElement = typeof modal === 'string' ? document.getElementById(modal) : modal;
    
    if (!modalElement) {
      console.error('Модальное окно не найдено:', modal);
      return;
    }

    // Закрываем предыдущее модальное окно
    if (this.activeModal && this.activeModal !== modalElement) {
      this.close(this.activeModal);
    }

    this.activeModal = modalElement;

    // Добавляем класс modal-open
    modalElement.classList.add('modal-open');
    
    // Блокируем прокрутку body
    document.body.style.overflow = 'hidden';

    // Фокус на модальном окне для доступности
    modalElement.focus();

    // Вызываем callback, если передан
    if (options.onOpen) {
      options.onOpen(modalElement);
    }

    console.log('Модальное окно открыто:', modalElement.id);
  }

  /**
   * Закрыть модальное окно
   * @param {string|HTMLElement} modal - ID модального окна или элемент
   * @param {Object} options - Дополнительные опции
   */
  close(modal, options = {}) {
    const modalElement = typeof modal === 'string' ? document.getElementById(modal) : modal;
    
    if (!modalElement) {
      console.error('Модальное окно не найдено:', modal);
      return;
    }

    // Убираем класс modal-open
    modalElement.classList.remove('modal-open');
    
    // Восстанавливаем прокрутку body
    document.body.style.overflow = '';

    // Сбрасываем активное модальное окно
    if (this.activeModal === modalElement) {
      this.activeModal = null;
    }

    // Вызываем callback, если передан
    if (options.onClose) {
      options.onClose(modalElement);
    }

    console.log('Модальное окно закрыто:', modalElement.id);
  }

  /**
   * Создать модальное окно программно
   * @param {Object} config - Конфигурация модального окна
   */
  create(config = {}) {
    const {
      id = 'dynamic-modal',
      title = '',
      content = '',
      size = 'default', // default, small, large, full
      showCloseButton = true,
      backdrop = true,
      onOpen = null,
      onClose = null
    } = config;

    // Удаляем существующее модальное окно с таким ID
    const existingModal = document.getElementById(id);
    if (existingModal) {
      existingModal.remove();
    }

    // Определяем размер модального окна
    let sizeClass = '';
    switch (size) {
      case 'small':
        sizeClass = 'max-w-md';
        break;
      case 'large':
        sizeClass = 'max-w-4xl';
        break;
      case 'full':
        sizeClass = 'max-w-full w-full h-full';
        break;
      default:
        sizeClass = 'max-w-2xl';
    }

    // Создаем HTML структуру
    const modalHTML = `
      <div id="${id}" class="modal">
        ${backdrop ? '<div class="modal-backdrop"></div>' : ''}
        <div class="modal-box ${sizeClass} bg-brand-light">
          ${showCloseButton ? `
            <button class="modal-close absolute right-4 top-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow" aria-label="Закрыть">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l8 8M6 14L14 6" stroke-linecap="round"/></svg>
            </button>
          ` : ''}
          ${title ? `<h3 class="font-bold text-lg mb-4">${title}</h3>` : ''}
          <div class="modal-content">
            ${content}
          </div>
        </div>
      </div>
    `;

    // Добавляем в DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalElement = document.getElementById(id);

    // Открываем модальное окно
    this.open(modalElement, { onOpen, onClose });

    return modalElement;
  }

  /**
   * Обновить содержимое модального окна
   * @param {string|HTMLElement} modal - ID модального окна или элемент
   * @param {string} content - Новое содержимое
   */
  updateContent(modal, content) {
    const modalElement = typeof modal === 'string' ? document.getElementById(modal) : modal;
    
    if (!modalElement) {
      console.error('Модальное окно не найдено:', modal);
      return;
    }

    const contentContainer = modalElement.querySelector('.modal-content');
    if (contentContainer) {
      contentContainer.innerHTML = content;
    }
  }

  /**
   * Проверить, открыто ли модальное окно
   * @param {string|HTMLElement} modal - ID модального окна или элемент
   */
  isOpen(modal) {
    const modalElement = typeof modal === 'string' ? document.getElementById(modal) : modal;
    return modalElement && modalElement.classList.contains('modal-open');
  }

  /**
   * Закрыть все открытые модальные окна
   */
  closeAll() {
    const openModals = document.querySelectorAll('.modal.modal-open');
    openModals.forEach(modal => this.close(modal));
  }
}

// Создаем глобальный экземпляр
export const modalManager = new ModalManager();

// Экспортируем для глобального использования
window.modalManager = modalManager; 