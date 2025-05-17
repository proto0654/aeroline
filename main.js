// Определяем базовый путь для ресурсов, используя атрибуты скрипта
function getBasePath() {
  // Получаем текущий скрипт
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1]; // Последний загруженный скрипт (наш файл)

  try {
    // Получаем путь к скрипту и извлекаем базовый путь
    const scriptSrc = currentScript.src;
    
    // Проверяем, содержит ли путь http:// или https://
    if (scriptSrc.includes('://')) {
      // Если это полный URL, извлекаем путь относительно корня сайта
      const url = new URL(scriptSrc);
      const pathParts = url.pathname.split('/');
      pathParts.pop(); // Удаляем имя файла (main.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      
      return pathParts.join('/') + '/';
    } else {
      // Если это относительный путь
      const pathParts = scriptSrc.split('/');
      pathParts.pop(); // Удаляем имя файла (main.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts.length >= 2 && pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      
      return pathParts.join('/') + '/';
    }
  } catch (error) {
    console.error('Ошибка при определении базового пути:', error);
    // Возвращаем относительный путь от корня в случае ошибки
    return './';
  }
}

// Базовый путь для использования в скрипте
const BASE_PATH = getBasePath();

// Функция инициализации Swiper
function initSwiperSlider() {
  if (typeof Swiper === 'undefined') {
    console.error('Swiper не загружен!');
    return;
  }

  const swiper = new Swiper('.swiper-container', {
    // Базовые настройки
    slidesPerView: 1,
    spaceBetween: 0,

    // Цикличный режим
    loop: true,
    speed: 800,

    // Эффект fade
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    // Автопрокрутка
    autoplay: {
      delay: 70000,
      disableOnInteraction: false
    },

    // Пагинация - стандартная
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // Навигационные кнопки
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Базовые колбеки
    on: {
      init: function () {
        console.log('Swiper инициализирован');
      }
    }
  });

  // Инициализируем свайпер для новостей, если он есть на странице
  if (document.querySelector('.news-swiper-container')) {
    console.log('Инициализация Swiper для новостей с уже существующими слайдами...');
    
    // Проверяем, есть ли уже слайды в контейнере
    const newsContainer = document.querySelector('.news-swiper-container .swiper-wrapper');
    const existingSlides = newsContainer ? newsContainer.querySelectorAll('.swiper-slide') : [];
    
    console.log(`Найдено ${existingSlides.length} существующих слайдов новостей от шаблонизатора`);
    
    // Инициализируем Swiper для новостей
    const newsSwiper = new Swiper('.news-swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: existingSlides.length > 1, // Включаем loop только если есть больше 1 слайда
      speed: 1100,
      // Эффект fade
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      // Автопрокрутка
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.news-swiper-pagination',
        clickable: true
      },

      navigation: {
        nextEl: '.news-swiper-button-next',
        prevEl: '.news-swiper-button-prev',
      },

      breakpoints: {
        // На мобильных устройствах
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // На планшетах
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      },

      on: {
        init: function () {
          console.log('Swiper новостей инициализирован');
        }
      }
    });
  }
}

// Динамическая загрузка Swiper
function loadSwiper() {
  return new Promise((resolve, reject) => {
    try {
      // Загрузка стилей Swiper
      const swiperCSS = document.createElement('link');
      swiperCSS.rel = 'stylesheet';
      swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
      document.head.appendChild(swiperCSS);

      // Загрузка скрипта Swiper
      const swiperScript = document.createElement('script');
      swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
      swiperScript.onload = () => {
        console.log('Swiper успешно загружен');

        // Вместо загрузки внешнего файла, инициализируем Swiper прямо здесь
        if (typeof Swiper !== 'undefined') {
          console.log('Инициализация Swiper...');
          setTimeout(() => {
            initSwiperSlider();
            resolve();
          }, 100);
        } else {
          reject(new Error('Swiper не определен после загрузки'));
        }
      };

      swiperScript.onerror = (error) => {
        console.error('Не удалось загрузить библиотеку Swiper:', error);
        reject(error);
      };

      document.head.appendChild(swiperScript);
    } catch (error) {
      console.error('Ошибка при загрузке Swiper:', error);
      reject(error);
    }
  });
}

// Функция загрузки данных из JSON
function loadJsonData(url, callback) {
  console.log('Загрузка JSON данных из:', url);
  
  // Проверка наличия URL
  if (!url) {
    console.error('Ошибка: не указан URL для загрузки JSON');
    if (callback) callback(new Error('Не указан URL'), null);
    return;
  }
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('JSON данные успешно загружены');
      if (callback) callback(null, data);
    })
    .catch(error => {
      console.error('Ошибка при загрузке JSON:', error);
      if (callback) callback(error, null);
    });
}

// Функция для инициализации главной страницы
function initHomePage() {
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

  // Инициализация карты (если есть на странице)
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    // Здесь обычно будет инициализация карты через API (Leaflet/Google Maps)
    // Для примера просто меняем фон контейнера
    mapContainer.style.background = '#f1f1f1';
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

// Функция для инициализации анимаций заголовков
function initTitleAnimations() {
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

// Инициализация функционала для страницы вакансий
function initVacanciesPage() {
  // Аккордеон для вакансий
  const vacancyToggleButtons = document.querySelectorAll('.vacancy-toggle');
  if (vacancyToggleButtons.length > 0) {
    vacancyToggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const content = this.parentElement.querySelector('.vacancy-content');
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

    // Фильтрация вакансий по городам
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
      cityFilter.addEventListener('change', function () {
        const selectedCity = this.value;
        const vacancyItems = document.querySelectorAll('.vacancy-item');

        vacancyItems.forEach(item => {
          const location = item.getAttribute('data-location');

          if (selectedCity === 'all' || location.includes(selectedCity)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }
}

// Инициализация функционала для страницы контактов
function initContactsPage() {
  const officeCards = document.querySelectorAll('.office-card');
  const selectedOfficeCard = document.querySelector('.office-card.ring');
  const officeInfoCard = document.querySelector('.selected-office-card');
  const closeSelectedOfficeBtn = document.getElementById('close-selected-office');

  // Обработчик закрытия выбранного офиса
  if (closeSelectedOfficeBtn && officeInfoCard) {
    closeSelectedOfficeBtn.addEventListener('click', function () {
      officeInfoCard.style.display = 'none';

      // Снимаем выделение с карточки
      if (selectedOfficeCard) {
        selectedOfficeCard.classList.remove('ring', 'ring-brand-blue');
      }
    });
  }

  // Интерактивность с карточками офисов
  if (officeCards.length > 0) {
    officeCards.forEach(card => {
      // При наведении подсвечиваем карточку
      card.addEventListener('mouseenter', function () {
        this.classList.add('shadow-md');
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      });

      card.addEventListener('mouseleave', function () {
        this.classList.remove('shadow-md');
        this.style.transform = 'translateY(0)';
      });

      // При клике на карточку показываем офис на карте
      card.addEventListener('click', function () {
        // Снимаем выделение с предыдущей карточки
        const currentSelected = document.querySelector('.office-card.ring');
        if (currentSelected) {
          currentSelected.classList.remove('ring', 'ring-brand-blue');
        }

        // Выделяем текущую карточку
        this.classList.add('ring', 'ring-brand-blue');

        // Получаем данные офиса
        const city = this.getAttribute('data-city');
        const address = this.querySelector('h3').textContent.replace(city + ', ', '');
        const type = this.querySelectorAll('.text-sm')[0].textContent;
        const phone = this.querySelectorAll('.text-sm')[1].textContent;
        const email = this.querySelectorAll('.text-sm')[2].textContent;

        // Обновляем содержимое карточки офиса на карте
        if (officeInfoCard) {
          const cityElement = officeInfoCard.querySelector('.font-bold.text-2xl');
          const addressElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(1)');
          const typeElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(2)');
          const phoneElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(3)');
          const emailElement = officeInfoCard.querySelector('.text-brand-gray.mb-2:nth-of-type(4)');

          if (cityElement) cityElement.textContent = city;
          if (addressElement) addressElement.textContent = address;
          if (typeElement) typeElement.textContent = type;
          if (phoneElement) phoneElement.textContent = phone;
          if (emailElement) emailElement.textContent = email;

          // Показываем карточку если она была скрыта
          officeInfoCard.style.display = 'flex';
        }

        // Логирование для отладки (можно использовать для центрирования карты в реальном проекте)
        const coordinates = this.getAttribute('data-coordinates').split(',');
        console.log(`Показываем на карте: ${city}, координаты: ${coordinates[0]}, ${coordinates[1]}`);
      });
    });
  }

  // Обработчик пагинации
  const paginationButtons = document.querySelectorAll('.pagination-button');
  const officesGrid = document.querySelector('.offices-grid');
  const itemsPerPage = 9; // Количество офисов на странице
  let currentPage = 1;
  let allOffices = [];

  // Инициализация страницы с офисами
  if (officesGrid) {
    // Получаем все офисы
    allOffices = Array.from(document.querySelectorAll('.office-card'));

    // Получаем текущую страницу из активной кнопки пагинации
    const activePageButton = document.querySelector('.pagination-number.bg-brand-blue');
    if (activePageButton) {
      currentPage = parseInt(activePageButton.textContent);
    }

    // Общее количество страниц
    const totalPages = Math.ceil(allOffices.length / itemsPerPage);

    // Функция для отображения офисов на определенной странице
    function showOfficesPage(page) {
      // Скрываем все офисы
      allOffices.forEach(office => {
        office.classList.add('hidden');
      });

      // Показываем только офисы для выбранной страницы
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      allOffices.slice(startIndex, endIndex).forEach(office => {
        office.classList.remove('hidden');
      });

      // Обновляем активную кнопку в пагинации
      document.querySelectorAll('.pagination-number').forEach(btn => {
        if (parseInt(btn.textContent) === page) {
          btn.classList.remove('bg-brand-light', 'text-brand-gray', 'hover:bg-brand-blue', 'hover:text-white');
          btn.classList.add('bg-brand-blue', 'text-white', 'font-bold');
        } else {
          btn.classList.remove('bg-brand-blue', 'text-white', 'font-bold');
          btn.classList.add('bg-brand-light', 'text-brand-gray', 'hover:bg-brand-blue', 'hover:text-white');
        }
      });

      // Обновляем состояние кнопок "Вперед" и "Назад"
      const prevButton = document.querySelector('.pagination-prev');
      const nextButton = document.querySelector('.pagination-next');

      if (prevButton) {
        if (page === 1) {
          prevButton.setAttribute('disabled', 'disabled');
          prevButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          prevButton.removeAttribute('disabled');
          prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }

      if (nextButton) {
        if (page === totalPages) {
          nextButton.setAttribute('disabled', 'disabled');
          nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          nextButton.removeAttribute('disabled');
          nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }

      // Сохраняем текущую страницу
      currentPage = page;
    }

    // Инициализация пагинации
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
      // Добавляем классы к кнопкам пагинации для идентификации
      const allButtons = paginationContainer.querySelectorAll('button');

      if (allButtons.length > 0) {
        // Первая кнопка - "Предыдущая"
        allButtons[0].classList.add('pagination-prev', 'pagination-button');

        // Последняя кнопка - "Следующая"
        allButtons[allButtons.length - 1].classList.add('pagination-next', 'pagination-button');

        // Кнопки с номерами страниц
        for (let i = 1; i < allButtons.length - 1; i++) {
          if (allButtons[i].textContent !== '...') {
            allButtons[i].classList.add('pagination-number', 'pagination-button');
          }
        }

        // Обработчики событий для кнопок пагинации
        document.querySelectorAll('.pagination-button').forEach(button => {
          button.addEventListener('click', function () {
            // Определяем, какая кнопка была нажата
            if (this.classList.contains('pagination-prev')) {
              if (currentPage > 1) {
                showOfficesPage(currentPage - 1);
              }
            } else if (this.classList.contains('pagination-next')) {
              if (currentPage < totalPages) {
                showOfficesPage(currentPage + 1);
              }
            } else if (this.classList.contains('pagination-number')) {
              // Переход на конкретную страницу
              const pageNumber = parseInt(this.textContent);
              showOfficesPage(pageNumber);
            }
          });
        });

        // Скрываем офисы, которые не должны отображаться на текущей странице
        showOfficesPage(currentPage);
      }
    }

    // Фильтрация офисов по городу
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
      cityFilter.addEventListener('change', function () {
        const selectedCity = this.value;

        if (selectedCity === 'all') {
          // Если выбраны все города, показываем первую страницу без фильтрации
          allOffices = Array.from(document.querySelectorAll('.office-card'));
        } else {
          // Фильтруем офисы по выбранному городу
          allOffices = Array.from(document.querySelectorAll('.office-card')).filter(office => {
            const city = office.getAttribute('data-city');
            return city === selectedCity;
          });
        }

        // Обновляем количество страниц
        const newTotalPages = Math.ceil(allOffices.length / itemsPerPage);

        // Показываем первую страницу с отфильтрованными результатами
        showOfficesPage(1);
      });
    }
  }
}

// Функция инициализации бургер-меню
function initMobileMenu() {
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

// Функция инициализации формы
function initForms() {
  // Обработчик формы на странице контактов
  const contactForm = document.querySelector('form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Форма отправлена!');
    });
  }
}

// Функция инициализации аккордеона FAQ
function initFaqAccordion() {
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

// Функция инициализации табов для страницы платежей
function initPaymentTabs() {
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
          t.classList.remove('bg-white', 'border-brand-blue', 'text-brand-blue');
          t.classList.add('bg-brand-light', 'border-transparent', 'text-brand-gray');
        });
        
        // Добавляем активные классы текущему табу
        this.classList.remove('bg-brand-light', 'border-transparent', 'text-brand-gray');
        this.classList.add('bg-white', 'border-brand-blue', 'text-brand-blue');
        
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
          t.classList.remove('bg-white', 'border-brand-blue', 'text-brand-blue');
          t.classList.add('bg-brand-light', 'border-transparent', 'text-brand-gray');
        });
        
        // Добавляем активные классы текущему табу
        this.classList.remove('bg-brand-light', 'border-transparent', 'text-brand-gray');
        this.classList.add('bg-white', 'border-brand-blue', 'text-brand-blue');
        
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

// Function for payments page
function initPaymentsPage() {
  console.log('Инициализация страницы платежей...');
  
  // Initialize FAQ accordion
  initFaqAccordion();
  
  // Initialize payment tabs
  initPaymentTabs();
}

// Общая функция инициализации страницы
function initializePage() {
  console.log('=== Начало инициализации страницы ===');
  console.log('Base path for resources:', BASE_PATH);

  // Инициализация мобильного меню
  initMobileMenu();

  // Инициализация форм
  initForms();

  // Определяем текущую страницу и инициализируем соответствующий функционал
  const pathname = window.location.pathname;
  const currentPage = pathname.split('/').pop();
  
  console.log(`Текущий путь: ${pathname}, определена страница: ${currentPage || 'главная (индекс)'}`);

  if (currentPage === '' || currentPage === 'index.html') {
    // Главная страница
    console.log('Инициализация главной страницы...');
    initHomePage();
  } else if (currentPage === 'vacancies.html') {
    // Страница вакансий
    console.log('Инициализация страницы вакансий...');
    initVacanciesPage();
  } else if (currentPage === 'contacts.html') {
    // Страница контактов
    console.log('Инициализация страницы контактов...');
    initContactsPage();
  } else if (currentPage === 'payments.html') {
    // Страница платежей
    console.log('Инициализация страницы платежей...');
    initPaymentsPage();
  } else {
    console.log(`Не найдено специфической инициализации для страницы: ${currentPage}`);
  }

  // Анимация заголовков (для всех страниц)
  initTitleAnimations();

  console.log('=== Инициализация страницы завершена ===');
}

// Функция для проверки загрузки DOM
function domReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Создаем флаг для отслеживания, была ли уже вызвана инициализация
let isInitialized = false;
let isInitializing = false;

// Функция-обертка для предотвращения множественных инициализаций
function safeInitialize() {
  // Если инициализация уже выполнена или в процессе, не запускаем ее повторно
  if (isInitialized || isInitializing) {
    console.log('Инициализация уже выполнена или в процессе, пропускаем повторный вызов');
    return;
  }
  
  console.log('Начинаем безопасную инициализацию страницы');
  isInitializing = true;
  
  try {
    initializePage();
    isInitialized = true;
  } catch (error) {
    console.error('Ошибка при инициализации страницы:', error);
  } finally {
    isInitializing = false;
  }
}

// Запуск инициализации после загрузки DOM
domReady(safeInitialize);

// Повторный вызов для страниц, где может быть проблема с загрузкой DOM
window.addEventListener('load', safeInitialize);

// Не запускаем инициализацию сразу, так как это создает дублирование
// Инициализация происходит через domReady или событие load 