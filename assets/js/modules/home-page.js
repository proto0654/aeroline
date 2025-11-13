/**
 * home-page.js
 * Модуль для функциональности главной страницы
 */

import { loadSwiper, initSwiperSlider } from "./slider.js";
import { createAutocompleteInput } from "./autocomplete.js";
import { modalManager } from "./modal-manager.js";

// Import Vue and the new component
import { createApp } from "vue";
import HomePageNews from "../../vue/components/HomePageNews.vue";

/**
 * Функция для инициализации главной страницы
 */
export function initHomePage() {
  console.log("Инициализация главной страницы начата");

  // Загрузка Swiper, если на странице есть слайдер
  if (
    document.querySelector(".swiper-container") ||
    document.querySelector(".news-swiper-container")
  ) {
    console.log("Обнаружен контейнер Swiper, начинаю загрузку...");
    loadSwiper().catch((error) => {
      console.error("Не удалось загрузить Swiper:", error);
    });
  } else {
    console.log("Контейнеры Swiper не обнаружены на странице");
  }

  // Новости уже были загружены через шаблонизатор в HTML
  console.log("Используем новости, уже загруженные через шаблонизатор");

  // Инициализация карусели на главной странице
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(
    ".carousel-container .absolute.left-4"
  );
  const nextButton = document.querySelector(
    ".carousel-container .absolute.right-4"
  );

  if (carouselSlides.length > 0 && prevButton && nextButton) {
    let currentSlide = 0;

    // Функция для переключения слайдов
    const showSlide = (index) => {
      // Скрываем все слайды
      carouselSlides.forEach((slide) => {
        slide.classList.remove("active");
        slide.style.display = "none";
      });

      // Показываем текущий слайд
      carouselSlides[index].classList.add("active");
      carouselSlides[index].style.display = "block";
    };

    // Обработчики для кнопок
    prevButton.addEventListener("click", () => {
      currentSlide =
        (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
      showSlide(currentSlide);
    });

    nextButton.addEventListener("click", () => {
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
  const trackForm = document.querySelector(".track-form");
  if (trackForm) {
    trackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const trackInput = this.querySelector('input[type="text"]').value;
      if (trackInput.trim() !== "") {
        console.log("Отслеживание заказа:", trackInput);
        alert(`Отслеживание заказа: ${trackInput}`);
      } else {
        console.warn("Пустой ввод в форме отслеживания заказа");
        alert("Пожалуйста, введите номер заказа");
      }
    });
  } else {
    // Обработчик для формы отслеживания - ищем специфичный блок для отслеживания
    const trackingFormContainer = document.querySelector(
      ".tracking-form-container, .p-4.rounded-lg.w-full.md\\:w-2\\/5"
    );

    if (trackingFormContainer) {
      console.log("Найден контейнер формы отслеживания");

      // Диагностика для кнопок в контейнере отслеживания
      const allButtonsInTrackingContainer =
        trackingFormContainer.querySelectorAll("button");
      console.log(
        `В контейнере формы отслеживания найдено ${allButtonsInTrackingContainer.length} кнопок:`
      );
      allButtonsInTrackingContainer.forEach((btn, index) => {
        console.log(`Кнопка #${index + 1}:`, {
          classes: btn.className,
          text: btn.textContent.trim(),
        });
      });

      // Ищем кнопку поиска в контейнере отслеживания
      // Сначала пробуем найти по классу
      let searchButton = trackingFormContainer.querySelector(
        "button.bg-brand-gray"
      );

      // Если не нашли по классу, ищем по тексту (более надежно)
      if (!searchButton) {
        console.log('Не найдена кнопка по классу, ищем по тексту "Поиск"');
        const buttons = Array.from(
          trackingFormContainer.querySelectorAll("button")
        );
        searchButton = buttons.find((btn) =>
          btn.textContent.trim().toLowerCase().includes("поиск")
        );
      }

      if (searchButton) {
        console.log('Найдена кнопка "Поиск" для отслеживания:', {
          text: searchButton.textContent.trim(),
          classes: searchButton.className,
        });

        // Функция для обработки поиска
        const handleTrackingSearch = (e) => {
          e.preventDefault();
          console.log('Поиск заказа для отслеживания');

          const trackingInput =
            trackingFormContainer.querySelector('input[type="text"]');

          // Проверяем, что поле существует
          if (!trackingInput) {
            console.error("Не найдено поле ввода для формы отслеживания");
            return;
          }

          // Добавляем атрибут required программно, если его нет
          if (!trackingInput.hasAttribute("required")) {
            trackingInput.setAttribute("required", "");
          }

          // Проверяем валидность поля
          if (trackingInput.validity.valid) {
            const orderNumber = trackingInput.value.trim();
            console.log("Отслеживание номера:", orderNumber);
            
            // Перенаправляем на страницу отслеживания с номером заказа в GET параметре
            window.location.href = `order-tracking.html?orderNumber=${encodeURIComponent(orderNumber)}`;
          } else {
            // Активируем встроенную валидацию браузера
            trackingInput.reportValidity();
          }
        };

        // Обработчик для кнопки поиска
        searchButton.addEventListener("click", handleTrackingSearch);

        // Обработчик для формы (для работы с Enter)
        const form = trackingFormContainer.querySelector('form');
        if (form) {
          form.addEventListener("submit", handleTrackingSearch);
        }
      } else {
        console.warn(
          'Не найдена кнопка "Поиск" в контейнере формы отслеживания'
        );
      }
    } else {
      console.warn("Не найден контейнер формы отслеживания");
    }
  }

  // Инициализация автокомплита
  initAutocomplete();

  // Инициализация формы обратной связи
  const contactForm = document.querySelector("form.space-y-4");
  if (contactForm) {
    // Убедимся, что все поля имеют атрибут required
    const requiredFields = contactForm.querySelectorAll(
      'input[type="text"], input[type="tel"], input[type="checkbox"]'
    );
    requiredFields.forEach((field) => {
      if (!field.hasAttribute("required")) {
        field.setAttribute("required", "");
      }
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Используем встроенную валидацию HTML5
      if (this.checkValidity()) {
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;

        alert(
          `Спасибо за заявку, ${name}! Мы свяжемся с вами по номеру ${phone}`
        );
        this.reset();
      } else {
        // Встроенная валидация браузера покажет сообщения об ошибках
        this.reportValidity();
      }
    });
  }

  // Mount the new Vue news component
  const homePageNewsAppElement = document.getElementById("home-page-news-app");
  if (homePageNewsAppElement) {
    console.log("Found #home-page-news-app, mounting Vue component");
    const app = createApp(HomePageNews);

    // Use the existing Pinia store instance if available, otherwise create a new one
    // This assumes createPinia() and app.use(pinia) are called elsewhere globally, e.g., in main.js
    // const pinia = createPinia(); // Удаляем локальную инициализацию Pinia
    // app.use(pinia); // Удаляем локальное использование Pinia

    // Provide access to the global modal store if needed within the component setup
    // app.provide('globalModalStore', useGlobalModalStore()); // This is one way, but importing directly in component is also fine

    app.mount(homePageNewsAppElement);
    console.log("HomePageNews component mounted.");
  } else {
    console.warn(
      "Could not find #home-page-news-app element to mount Vue component."
    );
  }

  console.log("Инициализация главной страницы завершена");
}

/**
 * Инициализация автокомплита для полей выбора объектов
 * ОТКЛЮЧЕНО: теперь используются Vue-компоненты
 */
function initAutocomplete() {
  console.log("Автокомплит отключен - используются Vue-компоненты");
  // Комментируем весь код автокомплита, так как используем Vue-компоненты
  /*
  console.log('Инициализация автокомплита для полей выбора объектов');

  // Получаем данные офисов (ПВЗ/склады)
  let offices = [];
  if (window.officesData && window.officesData.length > 0) {
    offices = window.officesData;
    console.log('Используем офисы из window.officesData:', offices.length);
  } else {
    // Если нет глобальных данных, ищем в DOM
    const officeElements = document.querySelectorAll('#offices-data .office-data');
    offices = Array.from(officeElements).map(el => ({
      city: el.dataset.city,
      address: el.dataset.address,
      type: el.dataset.type,
      phone: el.dataset.phone,
      email: el.dataset.email,
      coordinates: el.dataset.coordinates
    }));
    console.log('Офисы из DOM:', offices.length);
  }

  setupAutocompleteInputs(offices);
  setupCityLinks(offices);
  */
}

/**
 * Настройка полей ввода с автокомплитом для офисов
 * ОТКЛЮЧЕНО: теперь используются Vue-компоненты
 */
function setupAutocompleteInputs(offices) {
  console.log("setupAutocompleteInputs отключен - используются Vue-компоненты");
  // Комментируем код, так как используем Vue-компоненты
  /*
  console.log('Настройка полей ввода с автокомплитом для офисов');
  const fromSelectContainer = document.querySelector('select.from').closest('.relative.w-full');
  const toSelectContainer = document.querySelector('select.to').closest('.relative.w-full');
  if (!fromSelectContainer || !toSelectContainer) {
    console.error('Не найдены контейнеры для полей выбора объектов');
    return;
  }
  createAutocompleteInput(fromSelectContainer, offices, 'from-city', 'Откуда');
  createAutocompleteInput(toSelectContainer, offices, 'to-city', 'Куда');
  */
}

/**
 * Настройка обработчиков клика для ссылок городов
 * ОТКЛЮЧЕНО: теперь используются Vue-компоненты
 */
function setupCityLinks(offices) {
  console.log("setupCityLinks отключен - используются Vue-компоненты");
  // Комментируем код, так как используем Vue-компоненты
  /*
  // Находим все контейнеры с городами
  const cityContainers = document.querySelectorAll('.flex.md\\:flex-row.flex-col .flex.flex-row.flex-wrap.gap-2');
  
  cityContainers.forEach((container, index) => {
    // Получаем соответствующее поле ввода
    const input = document.getElementById(index === 0 ? 'from-city-input' : 'to-city-input');
    if (!input) return;

    // Добавляем обработчик клика для каждого города
    container.querySelectorAll('span').forEach(citySpan => {
      citySpan.addEventListener('click', () => {
        const cityName = citySpan.textContent.trim();
        
        // Устанавливаем значение в поле ввода
        input.value = cityName;
        
        // Фокусируемся на поле ввода
        input.focus();
        
        // Небольшая задержка перед вызовом событий
        setTimeout(() => {
          // Вызываем события для активации поиска и выпадающего списка
          input.dispatchEvent(new Event('focus', { bubbles: true }));
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }, 50);
      });
    });
  });
  */
}
