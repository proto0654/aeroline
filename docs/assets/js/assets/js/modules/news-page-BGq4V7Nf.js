import { P as Pagination } from "./pagination-5ZDBlBwd.js";
import { m as modalManager } from "./modal-manager-BXwv0V3q.js";
import { m as mountDateRangePicker } from "../../vue/entrypoints/lk-datepicker-BAWDGYJK.js";
console.log("--- Debug: Start of news-page.js ---");
console.log("--- Debug: Attempting to import Pagination in news-page.js ---");
console.log("--- Debug: Pagination imported successfully in news-page.js ---");
console.log("--- Debug: Attempting to import modalManager in news-page.js ---");
console.log("--- Debug: modalManager imported successfully in news-page.js ---");
console.log("--- Debug: Attempting to import mountDateRangePicker in news-page.js ---");
console.log("--- Debug: mountDateRangePicker imported successfully in news-page.js ---");
console.log("NewsPage: Модуль загружается...");
console.log("--- Debug: Defining NewsPage class ---");
class NewsPage {
  constructor() {
    console.log("NewsPage: Инициализация класса");
    this.modal = document.getElementById("news-modal");
    this.pagination = null;
    this.dateFilterPicker = null;
    this.currentFilters = {
      dateRange: null
    };
    this.init();
  }
  init() {
    console.log("--- Debug: Start of init in news-page.js ---");
    console.log("NewsPage: Начало инициализации");
    this.sortNewsByDate();
    this.bindNewsDetailsButtons();
    this.initClearFiltersButton();
    this.initDateFilter();
    console.log("NewsPage: Инициализация пагинации...");
    this.initPagination();
    console.log("NewsPage: Инициализация завершена");
    console.log("--- Debug: End of init in news-page.js ---");
  }
  initPagination() {
    const newsGrid = document.querySelector(".news-grid");
    const newsCards = document.querySelectorAll(".news-card");
    const paginationContainer = document.querySelector(".pagination-container");
    console.log("NewsPage: Контейнер для новостей найден:", !!newsGrid);
    console.log("NewsPage: Найдено новостей:", newsCards.length);
    console.log("NewsPage: Контейнер для пагинации найден:", !!paginationContainer);
    if (!newsGrid || newsCards.length === 0 || !paginationContainer) {
      console.error("NewsPage: Не удалось найти необходимые элементы для пагинации");
      return;
    }
    this.pagination = new Pagination({
      containerSelector: ".news-grid",
      itemSelector: ".news-card",
      paginationSelector: ".pagination-container",
      itemsPerPage: 5,
      useDisplayNone: false
    });
    console.log("NewsPage: Пагинация инициализирована");
  }
  initDateFilter() {
    console.log("NewsPage: Инициализация фильтра дат");
    this.datePickerApp = mountDateRangePicker("#news-datepicker-app", {
      placeholder: "Выберите период для фильтрации"
    }, (range) => {
      console.log("NewsPage: Выбран период для новостей (Vue):", range);
      this.currentFilters.dateRange = range;
      this.applyFilters();
    }, () => {
      console.log("NewsPage: Выбор периода для новостей сброшен (Vue)");
      this.currentFilters.dateRange = null;
      this.applyFilters();
    });
  }
  initClearFiltersButton() {
    const clearBtn = document.getElementById("clear-filters-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.clearAllFilters();
      });
    }
  }
  clearAllFilters() {
    var _a, _b, _c;
    if (this.datePickerApp) {
      const vueInstance = (_c = (_b = (_a = this.datePickerApp._container) == null ? void 0 : _a.__vue_app__) == null ? void 0 : _b._instance) == null ? void 0 : _c.proxy;
      if (vueInstance && vueInstance.clearSelection) {
        vueInstance.clearSelection();
        console.log("NewsPage: Диапазон дат в Vue компоненте сброшен.");
      } else {
        console.warn("NewsPage: Не удалось вызвать метод clearSelection на экземпляре Vue компонента.");
      }
    }
    this.currentFilters = {
      dateRange: null
    };
    this.applyFilters();
  }
  applyFilters() {
    const newsCards = document.querySelectorAll(".news-card");
    console.log("NewsPage: Применение фильтров:", this.currentFilters);
    console.log("NewsPage: Найдено карточек новостей:", newsCards.length);
    let visibleCount = 0;
    newsCards.forEach((card, index) => {
      let isVisible = true;
      if (this.currentFilters.dateRange && !this.currentFilters.dateRange.isEmpty) {
        const cardTimestamp = parseInt(card.dataset.timestamp);
        console.log(`NewsPage: Карточка ${index + 1} - timestamp:`, cardTimestamp);
        if (cardTimestamp) {
          const cardDate = new Date(cardTimestamp * 1e3);
          const startTime = this.currentFilters.dateRange.start.getTime();
          const endTime = this.currentFilters.dateRange.end.getTime();
          const cardDateNormalized = new Date(Date.UTC(cardDate.getFullYear(), cardDate.getMonth(), cardDate.getDate()));
          console.log(`NewsPage: Карточка ${index + 1} - сравнение дат:`, {
            cardDate: cardDateNormalized.toISOString().split("T")[0],
            startTime: new Date(startTime).toISOString().split("T")[0],
            endTime: new Date(endTime).toISOString().split("T")[0],
            cardTime: cardDateNormalized.getTime(),
            startTime,
            endTime
          });
          const cardTime = cardDateNormalized.getTime();
          if (cardTime < startTime || cardTime > endTime) {
            isVisible = false;
            console.log(`NewsPage: Карточка ${index + 1} скрыта - не попадает в диапазон`);
          } else {
            console.log(`NewsPage: Карточка ${index + 1} видима - попадает в диапазон`);
          }
        } else {
          console.log(`NewsPage: Карточка ${index + 1} - нет timestamp, скрываем`);
          isVisible = false;
        }
      } else {
        console.log(`NewsPage: Карточка ${index + 1} - фильтр не активен, показываем`);
      }
      if (isVisible) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });
    console.log("NewsPage: Видимых карточек:", visibleCount);
    if (this.pagination) {
      this.pagination.updateVisibleItems();
    }
  }
  bindNewsDetailsButtons() {
    const newsButtons = document.querySelectorAll(".news-details-btn");
    console.log("NewsPage: Найдено кнопок для новостей:", newsButtons.length);
    newsButtons.forEach((button) => {
      console.log("NewsPage: Добавление обработчика для кнопки");
      button.addEventListener("click", (e) => {
        var _a, _b, _c, _d, _e;
        console.log('NewsPage: Клик по кнопке "Подробнее"');
        e.preventDefault();
        const newsCard = button.closest(".news-card");
        console.log("NewsPage: Найдена карточка новости:", newsCard !== null);
        if (!newsCard) {
          console.error("NewsPage: Не удалось найти карточку новости");
          return;
        }
        const newsContent = {
          title: (_a = newsCard.querySelector(".news-title")) == null ? void 0 : _a.textContent,
          image: (_b = newsCard.querySelector("img")) == null ? void 0 : _b.src,
          isPlaceholder: (_c = newsCard.querySelector("img")) == null ? void 0 : _c.classList.contains("placeholder"),
          content: (_d = newsCard.querySelector(".news-content")) == null ? void 0 : _d.textContent,
          date: (_e = newsCard.querySelector(".news-date")) == null ? void 0 : _e.textContent
        };
        console.log("NewsPage: Собраны данные для модального окна:", newsContent);
        if (!newsContent.title || !newsContent.content) {
          console.error("NewsPage: Не удалось собрать все необходимые данные");
          return;
        }
        this.openNewsModal(newsContent);
      });
    });
  }
  openNewsModal(newsContent) {
    const modal = this.modal;
    const modalContent = modal.querySelector(".modal-content");
    modalContent.querySelector("h2").textContent = newsContent.title;
    modalContent.querySelector(".news-text").textContent = newsContent.content;
    modalContent.querySelector(".text-caption-form").textContent = newsContent.date;
    const imageContainer = modalContent.querySelector(".news-image");
    if (newsContent.image && !newsContent.isPlaceholder) {
      imageContainer.innerHTML = `
        <div class="rounded-2xl overflow-hidden">
          <img src="${newsContent.image}" 
               alt="${newsContent.title}" 
               class="w-full object-cover aspect-[1.85/1]">
        </div>
      `;
    } else {
      imageContainer.innerHTML = "";
    }
    modalManager.open(modal);
  }
  sortNewsByDate() {
    console.log("NewsPage: Сортировка новостей по дате...");
    const newsGrid = document.querySelector(".news-grid");
    const newsCards = Array.from(document.querySelectorAll(".news-card"));
    if (!newsGrid || newsCards.length === 0) {
      console.log("NewsPage: Нет новостей для сортировки");
      return;
    }
    newsCards.sort((a, b) => {
      const timestampA = parseInt(a.dataset.timestamp) || 0;
      const timestampB = parseInt(b.dataset.timestamp) || 0;
      return timestampB - timestampA;
    });
    newsCards.forEach((card) => {
      newsGrid.appendChild(card);
    });
    console.log("NewsPage: Новости отсортированы по дате (от новых к старым)");
  }
}
function initNewsPage() {
  console.log("initNewsPage called - Initializing NewsPage module");
  new NewsPage();
}
export {
  initNewsPage as i
};
