export class Modal {
  constructor() {
    this.container = document.getElementById('modal-container');
    this.overlay = this.container.querySelector('.modal-overlay');
    this.modal = this.container.querySelector('.modal');
    this.closeBtn = this.container.querySelector('.modal-close');
    this.content = this.container.querySelector('.modal-content');
    
    this.bindEvents();
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.container.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  open(content) {
    // Вставляем контент
    this.content.innerHTML = content;
    
    // Показываем модальное окно
    this.container.classList.remove('hidden');
    
    // Анимируем появление
    requestAnimationFrame(() => {
      this.overlay.classList.add('opacity-100');
      this.modal.classList.add('opacity-100', 'scale-100');
      this.modal.classList.remove('scale-95');
    });
    
    // Блокируем прокрутку body
    document.body.style.overflow = 'hidden';
  }

  close() {
    // Анимируем исчезновение
    this.overlay.classList.remove('opacity-100');
    this.modal.classList.remove('opacity-100', 'scale-100');
    this.modal.classList.add('scale-95');
    
    // Скрываем после анимации
    setTimeout(() => {
      this.container.classList.add('hidden');
      this.content.innerHTML = '';
      document.body.style.overflow = '';
    }, 300);
  }
} 