import "./chunks/global-modal-JqaLCeH7.js";
import "./mainJs-D0-2qTTl.js";
import "./globalUiJs-D9SlClYo.js";
import "./chunks/runtime-dom.esm-bundler-BeftXQEh.js";
import "./chunks/globalModal-CXKQxX77.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/TextInput-BUdG7Qkf.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
class Pagination {
  /**
   * Создает экземпляр класса пагинации
   * @param {Object} options - Настройки пагинации
   * @param {string} options.containerSelector - CSS селектор контейнера с элементами
   * @param {string} options.itemSelector - CSS селектор элементов для пагинации
   * @param {string} options.paginationSelector - CSS селектор контейнера пагинации
   * @param {number} options.itemsPerPage - Количество элементов на странице
   * @param {Function} options.onPageChange - Callback-функция при смене страницы (необязательно)
   * @param {Function} options.afterPageRender - Callback-функция после отрисовки страницы (необязательно)
   * @param {Function} options.beforePageChange - Callback-функция перед сменой страницы (необязательно)
   * @param {string} options.filterSelector - CSS селектор для фильтра (необязательно)
   * @param {string} options.filterAttribute - Атрибут для фильтрации (необязательно)
   * @param {boolean} options.useDisplayNone - Использовать display: none вместо класса hidden (необязательно)
   */
  constructor(options) {
    console.log("Pagination: Создание экземпляра пагинации");
    this.containerSelector = options.containerSelector;
    this.itemSelector = options.itemSelector;
    this.paginationSelector = options.paginationSelector;
    this.itemsPerPage = options.itemsPerPage || 9;
    this.onPageChange = options.onPageChange || null;
    this.afterPageRender = options.afterPageRender || null;
    this.beforePageChange = options.beforePageChange || null;
    this.filterSelector = options.filterSelector || null;
    this.filterAttribute = options.filterAttribute || "data-filter";
    this.useDisplayNone = options.useDisplayNone || false;
    this.container = document.querySelector(this.containerSelector);
    this.paginationContainer = document.querySelector(this.paginationSelector);
    console.log("Pagination: Найден контейнер:", this.container !== null);
    console.log(
      "Pagination: Найден контейнер пагинации:",
      this.paginationContainer !== null
    );
    this.currentPage = 1;
    this.allItems = [];
    this.filteredItems = [];
    this.totalPages = 0;
    if (this.container && this.paginationContainer) {
      this.init();
    } else {
      console.error(
        "Pagination: Не удалось найти контейнер или контейнер пагинации"
      );
      console.error(
        `Pagination: Контейнер "${this.containerSelector}" найден: ${this.container !== null}`
      );
      console.error(
        `Pagination: Контейнер пагинации "${this.paginationSelector}" найден: ${this.paginationContainer !== null}`
      );
    }
  }
  /**
   * Инициализация пагинации
   */
  init() {
    try {
      console.log("Pagination: Начало инициализации");
      this.allItems = Array.from(document.querySelectorAll(this.itemSelector));
      console.log("Pagination: Найдено элементов:", this.allItems.length);
      this.filteredItems = [...this.allItems];
      this.totalPages = Math.ceil(
        this.filteredItems.length / this.itemsPerPage
      );
      console.log("Pagination: Общее количество страниц:", this.totalPages);
      this.createPaginationElements();
      this.showPage(1);
      this.initFilter();
      console.log("Pagination: Инициализация завершена успешно");
    } catch (error) {
      console.error("Pagination: Ошибка при инициализации:", error);
    }
  }
  /**
   * Создание элементов пагинации
   */
  createPaginationElements() {
    try {
      console.log("Pagination: Создание элементов пагинации");
      this.paginationContainer.innerHTML = "";
      if (this.totalPages <= 1) {
        console.log("Pagination: Всего одна страница, пагинация не требуется");
        return;
      }
      const nav = document.createElement("nav");
      nav.className = "inline-flex items-center justify-center space-x-2";
      nav.setAttribute("aria-label", "Pagination");
      const prevButton = document.createElement("button");
      prevButton.className = "pagination-prev pagination-button flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-8 h-8";
      prevButton.innerHTML = "&lt;";
      prevButton.disabled = true;
      prevButton.setAttribute("aria-label", "Предыдущая страница");
      prevButton.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.showPage(this.currentPage - 1);
        }
      });
      nav.appendChild(prevButton);
      this.updatePaginationButtons(1, this.totalPages, nav, prevButton);
      const nextButton = document.createElement("button");
      nextButton.className = "pagination-next pagination-button flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-8 h-8";
      nextButton.innerHTML = "&gt;";
      nextButton.setAttribute("aria-label", "Следующая страница");
      if (this.totalPages <= 1) {
        nextButton.disabled = true;
      }
      nextButton.addEventListener("click", () => {
        if (this.currentPage < this.totalPages) {
          this.showPage(this.currentPage + 1);
        }
      });
      nav.appendChild(nextButton);
      const paginationWrapper = document.createElement("div");
      paginationWrapper.className = "flex justify-center items-center w-full";
      paginationWrapper.appendChild(nav);
      this.paginationContainer.appendChild(paginationWrapper);
      console.log("Pagination: Элементы пагинации созданы успешно");
    } catch (error) {
      console.error(
        "Pagination: Ошибка при создании элементов пагинации:",
        error
      );
    }
  }
  /**
   * Обновление кнопок пагинации
   * @param {number} currentPage - Текущая страница
   * @param {number} totalPages - Общее количество страниц
   * @param {HTMLElement} nav - Элемент навигации
   * @param {HTMLElement} prevButton - Кнопка "Предыдущая"
   */
  updatePaginationButtons(currentPage, totalPages, nav, prevButton) {
    try {
      const pageButtons = nav.querySelectorAll(
        ".pagination-number, .pagination-ellipsis"
      );
      pageButtons.forEach((button) => button.remove());
      const nextButton = nav.querySelector(".pagination-next");
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          this.addPageButton(i, currentPage, nav, nextButton);
        }
      } else {
        this.addPageButton(1, currentPage, nav, nextButton);
        let startPage, endPage;
        if (currentPage <= 4) {
          startPage = 2;
          endPage = 5;
          for (let i = startPage; i <= endPage; i++) {
            this.addPageButton(i, currentPage, nav, nextButton);
          }
          this.addEllipsis(nav, nextButton);
          this.addPageButton(totalPages, currentPage, nav, nextButton);
        } else if (currentPage >= totalPages - 3) {
          startPage = totalPages - 4;
          endPage = totalPages - 1;
          this.addEllipsis(nav, nextButton);
          for (let i = startPage; i <= endPage; i++) {
            this.addPageButton(i, currentPage, nav, nextButton);
          }
          this.addPageButton(totalPages, currentPage, nav, nextButton);
        } else {
          this.addEllipsis(nav, nextButton);
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            this.addPageButton(i, currentPage, nav, nextButton);
          }
          this.addEllipsis(nav, nextButton);
          this.addPageButton(totalPages, currentPage, nav, nextButton);
        }
      }
      if (prevButton) {
        if (currentPage === 1) {
          prevButton.setAttribute("disabled", "disabled");
          prevButton.classList.add("opacity-50", "cursor-not-allowed");
        } else {
          prevButton.removeAttribute("disabled");
          prevButton.classList.remove("opacity-50", "cursor-not-allowed");
        }
      }
      if (nextButton) {
        if (currentPage === totalPages || totalPages === 0) {
          nextButton.setAttribute("disabled", "disabled");
          nextButton.classList.add("opacity-50", "cursor-not-allowed");
        } else {
          nextButton.removeAttribute("disabled");
          nextButton.classList.remove("opacity-50", "cursor-not-allowed");
        }
      }
    } catch (error) {
      console.error(
        "Pagination: Ошибка при обновлении кнопок пагинации:",
        error
      );
    }
  }
  /**
   * Добавляет кнопку страницы в навигацию
   * @param {number} page - Номер страницы
   * @param {number} currentPage - Текущая активная страница
   * @param {HTMLElement} nav - Элемент навигации
   * @param {HTMLElement} nextButton - Кнопка "Следующая"
   */
  addPageButton(page, currentPage, nav, nextButton) {
    const pageButton = document.createElement("button");
    if (page === currentPage) {
      pageButton.className = "pagination-number pagination-button flex items-center justify-center rounded bg-brand-blue text-white font-bold w-8 h-8";
    } else {
      pageButton.className = "pagination-number pagination-button flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors w-8 h-8";
    }
    pageButton.textContent = page;
    pageButton.addEventListener("click", () => {
      const pageNumber = parseInt(pageButton.textContent);
      this.showPage(pageNumber);
    });
    nav.insertBefore(pageButton, nextButton);
  }
  /**
   * Добавляет многоточие в навигацию
   * @param {HTMLElement} nav - Элемент навигации
   * @param {HTMLElement} nextButton - Кнопка "Следующая"
   */
  addEllipsis(nav, nextButton) {
    const ellipsis = document.createElement("span");
    ellipsis.className = "pagination-ellipsis flex items-center justify-center w-8 h-8 text-brand-gray";
    ellipsis.textContent = "...";
    nav.insertBefore(ellipsis, nextButton);
  }
  /**
   * Показать определенную страницу
   * @param {number} page - Номер страницы
   */
  showPage(page) {
    try {
      console.log("Pagination: Показ страницы", page);
      if (this.beforePageChange) {
        this.beforePageChange(page);
      }
      this.allItems.forEach((item) => {
        if (this.useDisplayNone) {
          item.style.display = "none";
        } else {
          item.classList.add("hidden");
        }
      });
      const startIndex = (page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.filteredItems.slice(startIndex, endIndex).forEach((item) => {
        if (this.useDisplayNone) {
          item.style.display = "";
        } else {
          item.classList.remove("hidden");
        }
      });
      const nav = this.paginationContainer.querySelector("nav");
      if (nav) {
        const prevButton = nav.querySelector(".pagination-prev");
        this.updatePaginationButtons(page, this.totalPages, nav, prevButton);
      }
      this.currentPage = page;
      if (this.onPageChange) {
        this.onPageChange(page);
      }
      if (this.afterPageRender) {
        this.afterPageRender(page);
      }
      console.log("Pagination: Страница", page, "показана успешно");
    } catch (error) {
      console.error("Pagination: Ошибка при показе страницы:", error);
    }
  }
  /**
   * Инициализация фильтра
   */
  initFilter() {
    if (!this.filterSelector) {
      console.log("Pagination: Селектор фильтра не указан.");
      return;
    }
    const filterInput = document.querySelector(this.filterSelector);
    if (!filterInput) {
      console.warn(`Pagination: Фильтр не найден: ${this.filterSelector}`);
      return;
    }
    console.log(`Pagination: Фильтр найден: ${this.filterSelector}`);
    filterInput.addEventListener("input", () => {
      this.applyFilter(filterInput.value);
    });
  }
  /**
   * Обновление элементов (например, после динамической загрузки)
   */
  updateItems() {
    try {
      console.log("Pagination: Обновление элементов");
      this.allItems = Array.from(document.querySelectorAll(this.itemSelector));
      this.filteredItems = [...this.allItems];
      console.log("Pagination: Обновлено элементов:", this.allItems.length);
      this.totalPages = Math.ceil(
        this.filteredItems.length / this.itemsPerPage
      );
      this.createPaginationElements();
      this.showPage(1);
    } catch (error) {
      console.error("Pagination: Ошибка при обновлении элементов:", error);
    }
  }
  /**
   * Обновление пагинации на основе видимых элементов (для фильтрации)
   */
  updateVisibleItems() {
    try {
      console.log("Pagination: Обновление видимых элементов");
      this.filteredItems = this.allItems.filter((item) => {
        if (this.useDisplayNone) {
          return item.style.display !== "none";
        } else {
          return !item.classList.contains("hidden");
        }
      });
      console.log("Pagination: Видимых элементов:", this.filteredItems.length);
      this.totalPages = Math.ceil(
        this.filteredItems.length / this.itemsPerPage
      );
      this.createPaginationElements();
      this.showPage(1);
    } catch (error) {
      console.error(
        "Pagination: Ошибка при обновлении видимых элементов:",
        error
      );
    }
  }
  /**
   * Программное применение фильтра
   * @param {string} filterValue - Значение для фильтрации
   */
  applyFilter(filterValue) {
    console.log(`Pagination: Программное применение фильтра: ${filterValue}`);
    this.currentFilter = filterValue;
    this.updateItems();
  }
  /**
   * Сброс фильтра
   */
  resetFilter() {
    try {
      console.log("Pagination: Сброс фильтра");
      const filterElement = document.querySelector(this.filterSelector);
      if (filterElement) {
        this.filteredItems = [...this.allItems];
        this.totalPages = Math.ceil(
          this.filteredItems.length / this.itemsPerPage
        );
        this.createPaginationElements();
        this.showPage(1);
        console.log("Pagination: Фильтр сброшен успешно");
      } else {
        console.warn(
          "Pagination: Не удалось сбросить фильтр - элемент не найден:",
          this.filterSelector
        );
      }
    } catch (error) {
      console.error("Pagination: Ошибка при сбросе фильтра:", error);
    }
  }
}
function initVacanciesPage() {
  console.log("VacanciesPage: Начало инициализации");
  const vacancyToggleButtons = document.querySelectorAll(".vacancy-toggle");
  console.log("VacanciesPage: Найдено кнопок для вакансий:", vacancyToggleButtons.length);
  if (vacancyToggleButtons.length > 0) {
    vacancyToggleButtons.forEach((btn) => {
      btn.addEventListener("click", function() {
        const content = this.parentElement.querySelector(".vacancy-content");
        const icon = this.querySelector("svg");
        if (content.classList.contains("hidden")) {
          content.classList.remove("hidden");
          icon.classList.add("rotate-180");
        } else {
          content.classList.add("hidden");
          icon.classList.remove("rotate-180");
        }
      });
    });
    console.log("VacanciesPage: Инициализация пагинации с задержкой...");
    setTimeout(() => {
      initVacanciesPagination();
    }, 100);
  } else {
    console.warn("VacanciesPage: Не найдены кнопки для вакансий");
  }
  console.log("VacanciesPage: Инициализация завершена");
}
function initVacanciesPagination() {
  console.log("VacanciesPage: Проверка контейнеров для пагинации...");
  const containerElement = document.querySelector(".vacancies-container");
  const itemElements = document.querySelectorAll(".vacancy-item");
  const paginationElement = document.querySelector(".pagination-container");
  console.log("VacanciesPage: Найден контейнер для вакансий:", containerElement !== null);
  console.log("VacanciesPage: Найдено элементов вакансий:", itemElements.length);
  console.log("VacanciesPage: Найден контейнер для пагинации:", paginationElement !== null);
  if (containerElement && itemElements.length > 0 && paginationElement) {
    if (itemElements.length <= 5) {
      console.log("VacanciesPage: Пагинация не требуется, количество элементов не превышает лимит на странице");
      return;
    }
    new Pagination({
      containerSelector: ".vacancies-container",
      itemSelector: ".vacancy-item",
      paginationSelector: ".pagination-container",
      itemsPerPage: 5,
      // Количество вакансий на странице
      filterSelector: "#cityFilter",
      filterAttribute: "data-location",
      useDisplayNone: true
      // Используем display: none вместо класса hidden для вакансий
    });
    console.log("VacanciesPage: Пагинация успешно инициализирована");
  } else {
    console.error("VacanciesPage: Невозможно инициализировать пагинацию - отсутствуют необходимые элементы");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initVacanciesPage();
});
