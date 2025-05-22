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
        console.log('Отслеживание заказа:', trackInput);
        alert(`Отслеживание заказа: ${trackInput}`);
      } else {
        console.warn('Пустой ввод в форме отслеживания заказа');
        alert('Пожалуйста, введите номер заказа');
      }
    });
  } else {
    // Обработчик для формы отслеживания - ищем специфичный блок для отслеживания
    const trackingFormContainer = document.querySelector('.tracking-form-container, .p-4.rounded-lg.w-full.md\\:w-2\\/5');
    
    if (trackingFormContainer) {
      console.log('Найден контейнер формы отслеживания');
      
      // Диагностика для кнопок в контейнере отслеживания
      const allButtonsInTrackingContainer = trackingFormContainer.querySelectorAll('button');
      console.log(`В контейнере формы отслеживания найдено ${allButtonsInTrackingContainer.length} кнопок:`);
      allButtonsInTrackingContainer.forEach((btn, index) => {
        console.log(`Кнопка #${index + 1}:`, {
          classes: btn.className,
          text: btn.textContent.trim()
        });
      });
      
      // Ищем кнопку поиска в контейнере отслеживания
      // Сначала пробуем найти по классу
      let searchButton = trackingFormContainer.querySelector('button.bg-brand-gray');
      
      // Если не нашли по классу, ищем по тексту (более надежно)
      if (!searchButton) {
        console.log('Не найдена кнопка по классу, ищем по тексту "Поиск"');
        const buttons = Array.from(trackingFormContainer.querySelectorAll('button'));
        searchButton = buttons.find(btn => 
          btn.textContent.trim().toLowerCase().includes('поиск')
        );
      }
      
      if (searchButton) {
        console.log('Найдена кнопка "Поиск" для отслеживания:', {
          text: searchButton.textContent.trim(),
          classes: searchButton.className
        });
        
        searchButton.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Клик по кнопке "Поиск" для отслеживания');
          
          const trackingInput = trackingFormContainer.querySelector('input[type="text"]');
          
          // Проверяем, что поле существует
          if (!trackingInput) {
            console.error('Не найдено поле ввода для формы отслеживания');
            return;
          }
          
          // Добавляем атрибут required программно, если его нет
          if (!trackingInput.hasAttribute('required')) {
            trackingInput.setAttribute('required', '');
          }
          
          // Проверяем валидность поля
          if (trackingInput.validity.valid) {
            console.log('Отслеживание номера:', trackingInput.value);
            alert(`Отслеживание номера: ${trackingInput.value}`);
          } else {
            // Активируем встроенную валидацию браузера
            trackingInput.reportValidity();
          }
        });
      } else {
        console.warn('Не найдена кнопка "Поиск" в контейнере формы отслеживания');
      }
    } else {
      console.warn('Не найден контейнер формы отслеживания');
    }
  }

  // Инициализация автокомплита для формы расчета
  initAutocomplete();

  // Инициализация формы расчета
  const priceForm = document.querySelector('.price-form');
  let priceFormFound = false;
  
  if (priceForm) {
    priceFormFound = true;
    priceForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Используем встроенную валидацию HTML5
      if (this.checkValidity()) {
        const fromInput = document.querySelector('#from-city-input');
        const toInput = document.querySelector('#to-city-input');
        
        console.log('Расчет стоимости доставки:', {
          from: fromInput.value,
          to: toInput.value
        });
        alert(`Расчет стоимости доставки: ${fromInput.value} -> ${toInput.value}`);
      } else {
        // Встроенная валидация браузера покажет сообщения об ошибках
        this.reportValidity();
      }
    });
  } 
  
  // Если не нашли форму по классу, ищем по контейнеру
  if (!priceFormFound) {
    const priceFormContainer = document.querySelector('.bg-brand-light.p-4.rounded-lg.w-full.md\\:w-3\\/5');
    if (priceFormContainer) {
      console.log('Найден контейнер формы расчета, будем использовать клик по кнопке');
      
      // Диагностика для поиска кнопки "Рассчитать"
      const allButtonsInContainer = priceFormContainer.querySelectorAll('button');
      console.log(`В контейнере формы расчета найдено ${allButtonsInContainer.length} кнопок:`);
      allButtonsInContainer.forEach((btn, index) => {
        console.log(`Кнопка #${index + 1}:`, {
          classes: btn.className,
          text: btn.textContent.trim()
        });
      });
      
      // Более специфичный селектор для кнопки Рассчитать (в блоке расчета стоимости)
      // Сначала пробуем найти по класу и тексту
      let calculateButton = priceFormContainer.querySelector('button.bg-brand-gray');
      
      // Если не нашли по классу, ищем по тексту (более надежно)
      if (!calculateButton) {
        console.log('Не найдена кнопка по классу, ищем по тексту "Рассчитать"');
        const buttons = Array.from(priceFormContainer.querySelectorAll('button'));
        calculateButton = buttons.find(btn => 
          btn.textContent.trim().toLowerCase().includes('рассчитать')
        );
      }
      
      if (calculateButton) {
        console.log('Найдена кнопка "Рассчитать" для расчета стоимости:', {
          text: calculateButton.textContent.trim(),
          classes: calculateButton.className
        });
        
        calculateButton.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Клик по кнопке "Рассчитать"');
          
          const fromInput = document.querySelector('#from-city-input');
          const toInput = document.querySelector('#to-city-input');
          
          // Проверяем, что поля существуют
          if (!fromInput || !toInput) {
            console.error('Не найдены поля ввода для формы расчета');
            return;
          }
          
          // Проверяем валидность полей (благодаря атрибуту required)
          const isFormValid = fromInput.validity.valid && toInput.validity.valid;
          
          if (isFormValid) {
            console.log('Расчет стоимости доставки:', {
              from: fromInput.value,
              to: toInput.value
            });
            alert(`Расчет стоимости доставки: ${fromInput.value} -> ${toInput.value}`);
          } else {
            // Активируем встроенную валидацию браузера
            if (!fromInput.validity.valid) fromInput.reportValidity();
            else if (!toInput.validity.valid) toInput.reportValidity();
          }
        });
      } else {
        console.warn('Не найдена кнопка "Рассчитать" в контейнере формы расчета');
      }
    }
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
    // Убедимся, что все поля имеют атрибут required
    const requiredFields = contactForm.querySelectorAll('input[type="text"], input[type="tel"], input[type="checkbox"]');
    requiredFields.forEach(field => {
      if (!field.hasAttribute('required')) {
        field.setAttribute('required', '');
      }
    });
    
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Используем встроенную валидацию HTML5
      if (this.checkValidity()) {
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        
        alert(`Спасибо за заявку, ${name}! Мы свяжемся с вами по номеру ${phone}`);
        this.reset();
      } else {
        // Встроенная валидация браузера покажет сообщения об ошибках
        this.reportValidity();
      }
    });
  }

  console.log('Инициализация главной страницы завершена');
} 

/**
 * Инициализация автокомплита для полей выбора городов
 */
function initAutocomplete() {
  console.log('Инициализация автокомплита для полей выбора городов');
  
  // Получаем данные городов из загруженных данных офисов
  let cities = [];
  
  // Проверяем, есть ли данные офисов в глобальной переменной
  if (window.officesData && window.officesData.length > 0) {
    console.log('Получаем города из данных офисов:', window.officesData.length);
    
    // Собираем уникальные города из данных офисов
    const citySet = new Set();
    window.officesData.forEach(office => {
      if (office.city) {
        citySet.add(office.city);
      }
    });
    
    cities = Array.from(citySet);
    console.log('Получили уникальные города:', cities.length);
  } else {
    // Если данных нет в глобальной переменной, ищем их в DOM структуре
    console.log('Ищем данные офисов в DOM-структуре');
    const officeElements = document.querySelectorAll('#offices-data .office-data');
    if (officeElements && officeElements.length) {
      console.log('Найдены элементы данных офисов:', officeElements.length);
      const citySet = new Set();
      officeElements.forEach(officeElem => {
        const city = officeElem.dataset.city;
        if (city) {
          citySet.add(city);
        }
      });
      
      cities = Array.from(citySet);
      console.log('Получили уникальные города из DOM:', cities.length);
    } else {
      // Если нигде не нашли данные городов, используем стандартный набор
      console.log('Не найдены данные офисов, используем стандартный набор городов');
      cities = ['Новосибирск', 'Красноярск', 'Иркутск', 'Абакан', 'Томск'];
    }
  }
  
  console.log('Список городов для автокомплита:', cities);
  
  // Заменяем select'ы на input с автокомплитом
  setupAutocompleteInputs(cities);
}

/**
 * Настройка полей ввода с автокомплитом
 * @param {Array} cities - массив городов для автокомплита
 */
function setupAutocompleteInputs(cities) {
  console.log('Настройка полей ввода с автокомплитом');
  
  // Находим контейнеры с select-элементами
  const fromSelectContainer = document.querySelector('.flex.md\\:flex-row.flex-col .relative.w-full');
  const toSelectContainer = document.querySelectorAll('.flex.md\\:flex-row.flex-col .relative.w-full')[1];
  
  if (!fromSelectContainer || !toSelectContainer) {
    console.error('Не найдены контейнеры для полей выбора городов');
    
    // Подробная диагностика селекторов
    const flexContainers = document.querySelectorAll('.flex.md\\:flex-row.flex-col');
    console.log('Найдено flex-контейнеров:', flexContainers.length);
    
    flexContainers.forEach((container, index) => {
      const relativeContainers = container.querySelectorAll('.relative.w-full');
      console.log(`Flex-контейнер #${index+1} содержит ${relativeContainers.length} relative-контейнеров`);
    });
    
    return;
  }
  
  console.log('Найдены контейнеры для полей выбора', {
    fromContainer: !!fromSelectContainer,
    toContainer: !!toSelectContainer
  });
  
  // Создаем и настраиваем поля для автокомплита
  createAutocompleteInput(fromSelectContainer, cities, 'from-city', 'Откуда');
  createAutocompleteInput(toSelectContainer, cities, 'to-city', 'Куда');
  
  // Обработчик для кнопки переключения городов
  const switchButton = document.querySelector('.flex.md\\:flex-row.flex-col button.w-12');
  if (switchButton) {
    console.log('Найдена кнопка переключения городов');
    switchButton.addEventListener('click', function() {
      const fromInput = document.querySelector('#from-city-input');
      const toInput = document.querySelector('#to-city-input');
      
      if (fromInput && toInput) {
        const fromValue = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = fromValue;
        console.log('Выполнено переключение значений полей:', { 
          newFromValue: fromInput.value, 
          newToValue: toInput.value 
        });
      } else {
        console.warn('Не найдены поля ввода для переключения');
      }
    });
  } else {
    console.warn('Не найдена кнопка переключения городов');
  }
  
  // Настраиваем быстрый выбор городов для поля "Откуда"
  const firstSelectContainer = fromSelectContainer.parentElement;
  const fromQuickCityLinks = firstSelectContainer.querySelectorAll('.cursor-pointer');
  if (fromQuickCityLinks.length > 0) {
    console.log(`Найдено ${fromQuickCityLinks.length} ссылок быстрого выбора для поля "Откуда"`);
    fromQuickCityLinks.forEach(link => {
      link.addEventListener('click', function() {
        const fromInput = document.querySelector('#from-city-input');
        if (fromInput) {
          fromInput.value = this.textContent.trim();
          console.log('Быстрый выбор города "Откуда":', fromInput.value);
          // Закрываем список, если он открыт
          const suggestList = document.querySelector('#from-city-suggestions');
          if (suggestList) {
            suggestList.classList.add('hidden');
          }
        } else {
          console.warn('Не найдено поле ввода "Откуда" для быстрого выбора');
        }
      });
    });
  } else {
    console.warn('Не найдены ссылки быстрого выбора для поля "Откуда"');
  }
  
  // Настраиваем быстрый выбор городов для поля "Куда"
  const secondSelectContainer = toSelectContainer.parentElement;
  const toQuickCityLinks = secondSelectContainer.querySelectorAll('.cursor-pointer');
  if (toQuickCityLinks.length > 0) {
    console.log(`Найдено ${toQuickCityLinks.length} ссылок быстрого выбора для поля "Куда"`);
    toQuickCityLinks.forEach(link => {
      link.addEventListener('click', function() {
        const toInput = document.querySelector('#to-city-input');
        if (toInput) {
          toInput.value = this.textContent.trim();
          console.log('Быстрый выбор города "Куда":', toInput.value);
          // Закрываем список, если он открыт
          const suggestList = document.querySelector('#to-city-suggestions');
          if (suggestList) {
            suggestList.classList.add('hidden');
          }
        } else {
          console.warn('Не найдено поле ввода "Куда" для быстрого выбора');
        }
      });
    });
  } else {
    console.warn('Не найдены ссылки быстрого выбора для поля "Куда"');
  }
}

/**
 * Создание поля ввода с автокомплитом
 * @param {HTMLElement} container - контейнер для размещения поля
 * @param {Array} cities - массив городов для автокомплита
 * @param {string} id - идентификатор для элементов
 * @param {string} placeholder - текст placeholder
 */
function createAutocompleteInput(container, cities, id, placeholder) {
  console.log(`Создание поля автокомплита ${id} с плейсхолдером "${placeholder}"`);
  
  // Сохраняем иконку (стрелку) из существующего select
  const existingArrow = container.querySelector('img');
  let arrowHTML = '';
  if (existingArrow) {
    const arrowSrc = existingArrow.src;
    arrowHTML = `<img src="${arrowSrc}" alt="" class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">`;
    console.log(`Найдена существующая иконка стрелки для ${id}`);
  } else {
    console.warn(`Не найдена иконка стрелки для ${id}`);
  }
  
  // Создаем разметку для поля с автокомплитом
  const autocompleteHTML = `
    <div class="relative w-full">
      <input 
        id="${id}-input" 
        type="text" 
        class="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-brand-blue text-body-secondary"
        placeholder="${placeholder}" 
        autocomplete="off"
        required
      >
      <button type="button" class="absolute right-0 top-0 h-full w-12 text-gray-400 focus:outline-none z-10"></button>
      ${arrowHTML}
      <ul 
        id="${id}-suggestions" 
        class="absolute w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto hidden z-20"
      ></ul>
    </div>
  `;
  
  // Заменяем содержимое контейнера
  container.innerHTML = autocompleteHTML;
  console.log(`Вставлена HTML-разметка для поля ${id}`);
  
  // Получаем ссылки на новые элементы
  const input = document.getElementById(`${id}-input`);
  const list = document.getElementById(`${id}-suggestions`);
  const toggleButton = container.querySelector('button');
  
  if (!input || !list || !toggleButton) {
    console.error(`Не удалось создать элементы автокомплита для ${id}`, {
      input: !!input,
      list: !!list,
      toggleButton: !!toggleButton
    });
    return;
  }
  
  console.log(`Созданы элементы автокомплита для ${id}`);
  
  let currentIndex = -1;
  
  // Функция обновления списка подсказок
  function updateSuggestions(filtered) {
    console.log(`Обновление списка подсказок для ${id}:`, filtered.length);
    list.innerHTML = '';
    currentIndex = -1;

    filtered.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item;
      li.className = 'px-4 py-2 hover:bg-blue-100 cursor-pointer';
      li.addEventListener('click', () => {
        input.value = item;
        list.classList.add('hidden');
        console.log(`Выбран город "${item}" в поле ${id}`);
      });
      list.appendChild(li);
    });

    list.classList.remove('hidden');
  }
  
  // Функция для отображения всех городов в выпадающем списке
  function showAllSuggestions() {
    console.log(`Показываем все города для ${id}:`, cities.length);
    list.innerHTML = '';
    currentIndex = -1;
    
    cities.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item;
      li.className = 'px-4 py-2 hover:bg-blue-100 cursor-pointer';
      li.addEventListener('click', () => {
        input.value = item;
        list.classList.add('hidden');
        console.log(`Выбран город "${item}" в поле ${id} из полного списка`);
      });
      list.appendChild(li);
    });
    
    list.classList.remove('hidden');
  }
  
  // Обработчик клика по кнопке-стрелке
  toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (list.classList.contains('hidden')) {
      // Если список скрыт, показываем все города
      showAllSuggestions();
      console.log(`Открыт полный список городов для ${id}`);
    } else {
      // Если список уже виден, скрываем его
      list.classList.add('hidden');
      console.log(`Закрыт список городов для ${id}`);
    }
  });
  
  // Обработчик ввода текста
  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    if (!value) {
      list.classList.add('hidden');
      return;
    }

    const filtered = cities.filter(item => item.toLowerCase().startsWith(value));
    if (filtered.length === 0) {
      list.classList.add('hidden');
      console.log(`Не найдено совпадений для "${value}" в поле ${id}`);
      return;
    }

    updateSuggestions(filtered);
    console.log(`Найдено ${filtered.length} совпадений для "${value}" в поле ${id}`);
  });
  
  // Обработчик нажатия клавиш (стрелки и Enter)
  input.addEventListener('keydown', (e) => {
    const items = list.querySelectorAll('li');
    if (list.classList.contains('hidden') || items.length === 0) {
      // При нажатии стрелки вниз на пустом поле, показываем все города
      if (e.key === 'ArrowDown' && input.value.trim() === '') {
        e.preventDefault();
        showAllSuggestions();
        console.log(`Показан полный список городов по нажатию стрелки вниз в поле ${id}`);
        return;
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      highlightItem(items);
      console.log(`Выделен следующий элемент (${currentIndex}) в списке ${id}`);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      highlightItem(items);
      console.log(`Выделен предыдущий элемент (${currentIndex}) в списке ${id}`);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentIndex >= 0 && currentIndex < items.length) {
        input.value = items[currentIndex].textContent;
        list.classList.add('hidden');
        console.log(`Выбран город "${items[currentIndex].textContent}" через Enter в поле ${id}`);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      list.classList.add('hidden');
      console.log(`Закрыт список городов через Escape для ${id}`);
    }
  });
  
  // Функция подсветки выбранного элемента
  function highlightItem(items) {
    items.forEach((item, index) => {
      item.classList.toggle('bg-blue-100', index === currentIndex);
    });
    
    // Прокрутка до выделенного элемента, если он не виден
    if (currentIndex >= 0) {
      const selectedItem = items[currentIndex];
      const listRect = list.getBoundingClientRect();
      const itemRect = selectedItem.getBoundingClientRect();
      
      if (itemRect.bottom > listRect.bottom) {
        // Если элемент ниже видимой области - прокручиваем вниз
        selectedItem.scrollIntoView(false);
      } else if (itemRect.top < listRect.top) {
        // Если элемент выше видимой области - прокручиваем вверх
        selectedItem.scrollIntoView(true);
      }
    }
  }
  
  // Скрываем список при клике вне
  document.addEventListener('click', (e) => {
    if (!list.contains(e.target) && e.target !== input && e.target !== toggleButton) {
      list.classList.add('hidden');
    }
  });
  
  // Показываем список при фокусе, если есть текст
  input.addEventListener('focus', () => {
    const value = input.value.toLowerCase();
    if (!value) return;
    
    const filtered = cities.filter(item => item.toLowerCase().startsWith(value));
    if (filtered.length > 0) {
      updateSuggestions(filtered);
      console.log(`Показаны совпадения при фокусе для ${id}`);
    }
  });
  
  // Подгонка стилей для списка
  list.style.maxHeight = '200px';
  list.style.overflowY = 'auto';
  list.style.overscrollBehavior = 'contain';
  
  console.log(`Инициализация поля ${id} завершена`);
} 