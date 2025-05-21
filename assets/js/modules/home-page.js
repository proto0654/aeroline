/**
 * home-page.js
 * Модуль для функциональности главной страницы
 */

import { loadSwiper } from './slider.js';

/**
 * Функция для инициализации главной страницы
 */
export function initHomePage() {
  console.log('Инициализация главной страницы начата');
  
  // Загрузка Swiper, если на странице есть слайдер
  if (document.querySelector('.swiper-container') || document.querySelector('.news-swiper-container')) {
    console.log('Обнаружен контейнер Swiper, начинаю загрузку...');
    loadSwiper().catch(error => {
      console.error('Не удалось загрузить Swiper:', error);
    });
  } else {
    console.log('Контейнеры Swiper не обнаружены на странице');
  }

  // Новости уже были загружены через шаблонизатор в HTML
  console.log('Используем новости, уже загруженные через шаблонизатор');
  
  // Инициализация карусели новостей
  const newsCarousel = document.querySelector('.news-carousel');
  const newsPrevButton = document.querySelector('.news-carousel button.absolute.left-0');
  const newsNextButton = document.querySelector('.news-carousel button.absolute.right-0');

  if (newsCarousel && newsPrevButton && newsNextButton) {
    const newsItems = newsCarousel.querySelectorAll('.bg-brand-light');
    let currentNewsIndex = 0;

    // Функция для переключения новостей
    const showNews = (index) => {
      // Скрываем все новости
      newsItems.forEach(item => {
        item.style.display = 'none';
      });

      // Показываем текущую новость
      newsItems[index].style.display = 'block';
    };

    // Обработчики для кнопок
    newsPrevButton.addEventListener('click', () => {
      currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
      showNews(currentNewsIndex);
    });

    newsNextButton.addEventListener('click', () => {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      showNews(currentNewsIndex);
    });

    // Показываем первую новость при загрузке
    showNews(currentNewsIndex);
  }

  // Инициализация карусели на главной странице
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-container .absolute.left-4');
  const nextButton = document.querySelector('.carousel-container .absolute.right-4');

  if (carouselSlides.length > 0 && prevButton && nextButton) {
    let currentSlide = 0;

    // Функция для переключения слайдов
    const showSlide = (index) => {
      // Скрываем все слайды
      carouselSlides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
      });

      // Показываем текущий слайд
      carouselSlides[index].classList.add('active');
      carouselSlides[index].style.display = 'block';
    };

    // Обработчики для кнопок
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
      showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      showSlide(currentSlide);
    });

    // Показываем первый слайд при загрузке
    showSlide(currentSlide);

    // Автоматическое переключение слайдов каждые 5 секунд
    setInterval(() => {
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // Инициализация формы отслеживания
  const trackForm = document.querySelector('.track-form');
  if (trackForm) {
    trackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const trackInput = this.querySelector('input[type="text"]').value;
      if (trackInput.trim() !== '') {
        alert(`Отслеживание заказа: ${trackInput}`);
      } else {
        alert('Пожалуйста, введите номер заказа');
      }
    });
  }

  // Инициализация формы расчета
  const priceForm = document.querySelector('.price-form');
  if (priceForm) {
    priceForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const fromSelect = this.querySelector('select:nth-of-type(1)').value;
      const toSelect = this.querySelector('select:nth-of-type(2)').value;

      if (fromSelect && toSelect) {
        alert(`Расчет стоимости доставки: ${fromSelect} -> ${toSelect}`);
      } else {
        alert('Пожалуйста, выберите город отправления и прибытия');
      }
    });
  }

  // Быстрый выбор городов
  const cityLinks = document.querySelectorAll('.mt-4 .cursor-pointer');
  if (cityLinks.length > 0) {
    cityLinks.forEach(link => {
      link.addEventListener('click', function () {
        const citySelect = document.querySelector('select:nth-of-type(1)');
        const cityName = this.textContent.trim();

        // Находим соответствующую опцию в селекте
        Array.from(citySelect.options).forEach(option => {
          if (option.text === cityName) {
            citySelect.value = option.value;
          }
        });
      });
    });
  }

  // Инициализация кнопки "Стать клиентом"
  const clientButton = document.querySelector('.relative.bg-brand-light button');
  if (clientButton) {
    clientButton.addEventListener('click', function () {
      alert('Форма для отправки заявки будет открыта');
    });
  }

  // Инициализация формы обратной связи
  const contactForm = document.querySelector('form.space-y-4');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.querySelector('input[type="text"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const consent = this.querySelector('input[type="checkbox"]').checked;

      if (name && phone && consent) {
        alert(`Спасибо за заявку, ${name}! Мы свяжемся с вами по номеру ${phone}`);
        this.reset();
      } else {
        alert('Пожалуйста, заполните все поля и дайте согласие на обработку данных');
      }
    });
  }

  console.log('Инициализация главной страницы завершена');
} 