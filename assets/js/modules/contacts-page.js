/**
 * contacts-page.js
 * Модуль для функциональности страницы контактов
 */

import { selectOfficeCardNoFocus } from './map.js';

/**
 * Инициализация функционала для страницы контактов
 */
export function initContactsPage() {
  const officeCards = document.querySelectorAll('.office-card');
  const officeInfoCard = document.querySelector('.selected-office-card');
  const closeSelectedOfficeBtn = document.getElementById('close-selected-office');
  
  // Гарантированно снимаем выделение со всех карточек при инициализации
  selectOfficeCardNoFocus(null);

  // Обработчик закрытия выбранного офиса
  if (closeSelectedOfficeBtn && officeInfoCard) {
    closeSelectedOfficeBtn.addEventListener('click', function () {
      officeInfoCard.style.display = 'none';
      // Снимаем выделение с карточек
      selectOfficeCardNoFocus(null);
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

      // При клике на карточку показываем офис на карте - нет необходимости дублировать обработчики,
      // они уже добавлены в initMap. Мы только обрабатываем событие для карты, если она инициализирована.
    });
    
    // Скрываем информационную панель при инициализации
    const infoPanel = document.querySelector('.map-info-panel');
    if (infoPanel) {
      infoPanel.classList.add('hidden');
    }
    
    // Отложенная инициализация карты для показа всех офисов, как на главной
    setTimeout(() => {
      // Сначала снимаем все выделения с карточек
      selectOfficeCardNoFocus(null);
      
      // Собираем координаты всех офисов для инициализации карты
      const allOfficeCoordinates = [];
      officeCards.forEach(card => {
        if (card.dataset.coordinates) {
          const coordinates = card.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim()));
          if (coordinates.length === 2) {
            allOfficeCoordinates.push(coordinates);
          }
        }
      });
      
      // Если есть координаты офисов и карта доступна, устанавливаем карту в отдаленный вид
      if (allOfficeCoordinates.length > 0 && typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
          const mapInstance = document.querySelector('#map')?.__yamap;
          if (mapInstance) {
            // Сбрасываем активные маркеры
            if (typeof window.resetAllMarkers === 'function') {
              window.resetAllMarkers();
            }
          }
        });
      }
    }, 300);
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

    // Функция для создания элементов пагинации
    function updatePaginationButtons(currentPage, totalPages) {
      const paginationContainer = document.querySelector('.pagination-container nav');
      if (!paginationContainer) return;
      
      // Очищаем текущую пагинацию, оставляя только кнопки "Вперед" и "Назад"
      const prevButton = paginationContainer.querySelector('button:first-child');
      const nextButton = paginationContainer.querySelector('button:last-child');
      
      while (paginationContainer.children.length > 2) {
        paginationContainer.removeChild(paginationContainer.children[1]);
      }

      // Обновляем состояние кнопок "Вперед" и "Назад"
      if (prevButton) {
        if (currentPage === 1) {
          prevButton.setAttribute('disabled', 'disabled');
          prevButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          prevButton.removeAttribute('disabled');
          prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }

      if (nextButton) {
        if (currentPage === totalPages) {
          nextButton.setAttribute('disabled', 'disabled');
          nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          nextButton.removeAttribute('disabled');
          nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }
      
      // Создаем новые кнопки пагинации с логикой "1 2 3 ... n"
      let pagesToShow = [];
      
      if (totalPages <= 5) {
        // Если страниц меньше 5, показываем все
        for (let i = 1; i <= totalPages; i++) {
          pagesToShow.push(i);
        }
      } else {
        // Всегда показываем первую страницу
        pagesToShow.push(1);
        
        // Логика отображения средних страниц
        if (currentPage <= 3) {
          // Для первых трех страниц: 1 2 3 4 ... n
          pagesToShow.push(2, 3, 4);
        } else if (currentPage >= totalPages - 2) {
          // Для последних трех страниц: 1 ... n-3 n-2 n-1 n
          pagesToShow.push(totalPages - 3, totalPages - 2, totalPages - 1);
        } else {
          // Для средних страниц: 1 ... p-1 p p+1 ... n
          pagesToShow.push(currentPage - 1, currentPage, currentPage + 1);
        }
        
        // Всегда показываем последнюю страницу
        pagesToShow.push(totalPages);
      }
      
      // Удаляем дубликаты и сортируем
      pagesToShow = [...new Set(pagesToShow)].sort((a, b) => a - b);
      
      // Добавляем кнопки пагинации
      let lastPage = 0;
      for (const page of pagesToShow) {
        // Если есть пропуск в страницах, добавляем многоточие
        if (page - lastPage > 1) {
          const ellipsis = document.createElement('span');
          ellipsis.className = 'w-8 h-8 flex items-center justify-center';
          ellipsis.textContent = '...';
          paginationContainer.insertBefore(ellipsis, nextButton);
        }
        
        // Создаем кнопку страницы
        const pageButton = document.createElement('button');
        if (page === currentPage) {
          pageButton.className = 'pagination-number pagination-button w-8 h-8 flex items-center justify-center rounded bg-brand-blue text-white font-bold';
        } else {
          pageButton.className = 'pagination-number pagination-button w-8 h-8 flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors';
        }
        pageButton.textContent = page;
        
        // Добавляем обработчик клика
        pageButton.addEventListener('click', function() {
          const pageNumber = parseInt(this.textContent);
          showOfficesPage(pageNumber);
        });
        
        paginationContainer.insertBefore(pageButton, nextButton);
        lastPage = page;
      }
    }

    // Функция для отображения офисов на определенной странице
    function showOfficesPage(page) {
      // Перед сменой страницы снимаем выделение со всех карточек
      selectOfficeCardNoFocus(null);
      
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

      // Обновляем пагинацию
      updatePaginationButtons(page, totalPages);

      // Сохраняем текущую страницу
      currentPage = page;
      
      // После смены страницы загружаем дефолтный офис для новой страницы
      setTimeout(() => {
        // Проверяем текущие выделения
        const currentSelectedCards = document.querySelectorAll('.office-card.ring.ring-brand-blue:not(.hidden)');
        
        // Если нет выделенных карточек на текущей странице, выделяем дефолтную или первую
        if (currentSelectedCards.length === 0) {
          const visibleCards = Array.from(document.querySelectorAll('.office-card:not(.hidden)'));
          if (visibleCards.length > 0) {
            // Выделяем первую видимую карточку
            visibleCards[0].click();
          }
        }
      }, 50);
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

        // Обновляем пагинацию и показываем текущую страницу
        updatePaginationButtons(currentPage, totalPages);
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

        // Снимаем выделение со всех карточек перед фильтрацией
        document.querySelectorAll('.office-card').forEach(card => {
          card.classList.remove('ring', 'ring-brand-blue');
        });

        // Показываем первую страницу с отфильтрованными результатами
        showOfficesPage(1);
      });
    }
  }
} 