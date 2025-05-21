/**
 * ui.js
 * Модуль для работы с UI-компонентами
 */

/**
 * Функция инициализации бургер-меню
 */
export function initMobileMenu() {
  const burgerMenuBtn = document.getElementById('burger-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerLines = document.querySelectorAll('.burger-line');

  // Если на странице нет мобильного меню, выходим
  if (!mobileMenu) return;

  // Функция для открытия мобильного меню
  const openMobileMenu = () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');

    // Анимация бургер-иконки в крестик
    burgerLines[0].classList.add('rotate-45', 'translate-y-2');
    burgerLines[1].classList.add('opacity-0');
    burgerLines[2].classList.add('-rotate-45', '-translate-y-2');

    // Блокировка прокрутки страницы
    document.body.classList.add('overflow-hidden');
  };

  // Функция для закрытия мобильного меню
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');

    // Возврат бургер-иконки в исходное состояние
    burgerLines[0].classList.remove('rotate-45', 'translate-y-2');
    burgerLines[1].classList.remove('opacity-0');
    burgerLines[2].classList.remove('-rotate-45', '-translate-y-2');

    // Разблокировка прокрутки страницы
    document.body.classList.remove('overflow-hidden');
  };

  // Обработчики событий для открытия и закрытия меню
  if (burgerMenuBtn) {
    burgerMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }
}

/**
 * Функция для инициализации анимаций заголовков
 */
export function initTitleAnimations() {
  // Находим все элементы с классами для анимации
  const animatedTitles = document.querySelectorAll('.animated-title');
  const animatedSubtitles = document.querySelectorAll('.animated-subtitle');

  // Проверяем наличие элементов для анимации
  if (animatedTitles.length === 0 && animatedSubtitles.length === 0) {
    return; // Если элементов нет, выходим из функции
  }

  // Запускаем анимацию с небольшой задержкой после загрузки страницы
  setTimeout(() => {
    // Анимируем заголовки
    animatedTitles.forEach(title => {
      title.classList.add('show');
    });

    // Анимируем подзаголовки с дополнительной задержкой
    setTimeout(() => {
      animatedSubtitles.forEach(subtitle => {
        subtitle.classList.add('show');
      });
    }, 300);
  }, 200);
}

/**
 * Инициализация аккордеона FAQ
 */
export function initFaqAccordion() {
  // Аккордеон для FAQ
  const faqToggleButtons = document.querySelectorAll('.faq-toggle');
  if (faqToggleButtons.length > 0) {
    faqToggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const content = this.parentElement.querySelector('.faq-content');
        const icon = this.querySelector('svg');

        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden');
          icon.classList.add('rotate-180');
        } else {
          content.classList.add('hidden');
          icon.classList.remove('rotate-180');
        }
      });
    });
  }
}

/**
 * Инициализация форм
 */
export function initForms() {
  // Обработчик формы на странице контактов
  const contactForm = document.querySelector('form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Форма отправлена!');
    });
  }
}

/**
 * Инициализация табов для страницы платежей
 */
export function initPaymentTabs() {
  console.log('Инициализация табов на странице платежей...');
  
  // Табы "Рассчитайте стоимость"
  const paymentTabs = document.querySelectorAll('.payment-tab');
  const paymentContents = document.querySelectorAll('.payment-tab-content');
  
  if (paymentTabs.length > 0) {
    paymentTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        const contentId = `tab-${tabId}`;
        
        // Удаляем активные классы со всех табов
        paymentTabs.forEach(t => {
          t.classList.remove('bg-white');
          t.classList.add('bg-brand-light', 'border-transparent', 'text-brand-gray');
        });
        
        // Добавляем активные классы текущему табу
        this.classList.remove('bg-brand-light');
        this.classList.add('bg-white', 'border-transparent', 'text-brand-gray');
        
        // Скрываем все контенты
        paymentContents.forEach(content => {
          content.classList.add('hidden');
        });
        
        // Показываем нужный контент
        document.getElementById(contentId).classList.remove('hidden');
      });
    });
  }
  
  // Табы "Когда можно оплатить"
  const deliveryTabs = document.querySelectorAll('.delivery-tab');
  const deliveryContents = document.querySelectorAll('.delivery-tab-content');
  
  if (deliveryTabs.length > 0) {
    deliveryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        const contentId = `tab-${tabId}`;
        
        // Удаляем активные классы со всех табов
        deliveryTabs.forEach(t => {
          t.classList.remove('bg-white');
          t.classList.add('bg-brand-light', 'border-transparent', 'text-brand-gray');
        });
        
        // Добавляем активные классы текущему табу
        this.classList.remove('bg-brand-light');
        this.classList.add('bg-white', 'border-transparent', 'text-brand-gray');
        
        // Скрываем все контенты
        deliveryContents.forEach(content => {
          content.classList.add('hidden');
        });
        
        // Показываем нужный контент
        document.getElementById(contentId).classList.remove('hidden');
      });
    });
  }
} 