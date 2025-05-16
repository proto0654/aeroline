// Определяем базовый путь для ресурсов, используя атрибуты скрипта
function getBasePath() {
  // Получаем текущий скрипт
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1]; // Последний загруженный скрипт (наш файл)
  
  // Получаем путь к скрипту и извлекаем базовый путь
  const scriptSrc = currentScript.src;
  const pathParts = scriptSrc.split('/');
  
  // Удаляем имя файла и папку assets из пути
  pathParts.pop(); // Удаляем имя файла (main.js)
  pathParts.pop(); // Удаляем папку (assets)
  
  return pathParts.join('/') + '/';
}

// Базовый путь для использования в скрипте
const BASE_PATH = getBasePath();

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
      btn.addEventListener('click', function() {
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
      cityFilter.addEventListener('change', function() {
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
    closeSelectedOfficeBtn.addEventListener('click', function() {
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
      card.addEventListener('mouseenter', function() {
        this.classList.add('shadow-md');
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('shadow-md');
        this.style.transform = 'translateY(0)';
      });
      
      // При клике на карточку показываем офис на карте
      card.addEventListener('click', function() {
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
          button.addEventListener('click', function() {
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
      cityFilter.addEventListener('change', function() {
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

// Главная функция инициализации, запускается сразу и при загрузке DOM
function initializePage() {
  console.log('Base path for resources:', BASE_PATH);
  
  // Инициализация мобильного меню
  initMobileMenu();
  
  // Инициализация форм
  initForms();
  
  // Анимация заголовков на страницах-заглушках
  initTitleAnimations();
  
  // Функционал страницы вакансий
  initVacanciesPage();
  
  // Функционал страницы контактов
  initContactsPage();
  
  console.log('Инициализация страницы завершена');
}

// Функция для проверки загрузки DOM
function domReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Вызываем функцию инициализации при загрузке DOM с помощью функции domReady
domReady(initializePage);

// Повторный вызов для страниц, где может быть проблема с загрузкой DOM
window.addEventListener('load', initializePage);

// Запускаем инициализацию сразу для обеспечения работы в любом случае
initializePage(); 