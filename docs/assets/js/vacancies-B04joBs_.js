import "./chunks/global-modal-B-x-mtux.js";
import "./mainJs-B6nrBSwm.js";
import "./globalUiJs-bfub43N5.js";
import { P as Pagination } from "./chunks/pagination-5ZDBlBwd.js";
import "./chunks/runtime-dom.esm-bundler-D-nyHKmb.js";
import "./chunks/globalModal-Bn39zecy.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
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
