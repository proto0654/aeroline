import "./chunks/modulepreload-polyfill-DaKOjhqt.js";
import "./mainJs-BsNWYi9M.js";
import "./globalPiniaJs-BmmD8Mpg.js";
import "./globalModalJs-Vuiuh3zT.js";
import "./globalUiJs-CR_EC2SH.js";
import { c as createApp } from "./chunks/runtime-dom.esm-bundler-DT6Q_ZxL.js";
import { _ as _sfc_main } from "./chunks/CityAutocompleteForm-hf1FtYXG.js";
import { a as apiService } from "./chunks/apiService-Cx0D3LEu.js";
import { r as ref, u as onMounted, c as computed, x as h } from "./chunks/runtime-core.esm-bundler-xz8C70T0.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/pinia-BykoCM9g.js";
import "./chunks/globalModal-DEHeP1wE.js";
import "./chunks/auth-BfnmLw6b.js";
import "./chunks/TextInput-r96FTHSo.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/AutocompleteInput-BlakmFHS.js";
import "./chunks/select-arrow-He2ejS2L.js";
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const selectedCity = ref("Все города");
const vacancies = ref([]);
const cities = ref([]);
const loading = ref(true);
const error = ref(null);
const loadVacanciesData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const vacanciesData = await apiService.getVacancies();
    console.log("Вакансии загружены:", vacanciesData.length);
    vacancies.value = vacanciesData;
    const citiesSet = /* @__PURE__ */ new Set();
    vacanciesData.forEach((vacancy) => {
      if (vacancy.location) {
        const locationParts = vacancy.location.split(",");
        if (locationParts.length > 0) {
          let city = locationParts[0].trim().replace(/^г\.\s*/i, "").trim();
          if (city) {
            citiesSet.add(city);
          }
        }
      }
    });
    cities.value = Array.from(citiesSet).sort();
    console.log("Города из вакансий:", cities.value.length);
    updateVacanciesDOM();
  } catch (err) {
    console.error("Ошибка загрузки вакансий:", err);
    error.value = "Ошибка загрузки данных";
    if (window.initialData && window.initialData.vacancies) {
      vacancies.value = window.initialData.vacancies || [];
      cities.value = window.initialData.cities || [];
      updateVacanciesDOM();
    }
  } finally {
    loading.value = false;
  }
};
function updateVacanciesDOM() {
  const container = document.querySelector(".vacancies-container");
  if (!container) return;
  container.innerHTML = "";
  let filteredVacancies = vacancies.value;
  if (selectedCity.value && selectedCity.value !== "Все города") {
    filteredVacancies = vacancies.value.filter((vacancy) => {
      if (!vacancy.location) return false;
      const locationParts = vacancy.location.split(",");
      if (locationParts.length > 0) {
        let city = locationParts[0].trim().replace(/^г\.\s*/i, "").trim();
        return city === selectedCity.value;
      }
      return false;
    });
  }
  filteredVacancies.forEach((vacancy) => {
    const vacancyElement = createVacancyElement(vacancy);
    container.appendChild(vacancyElement);
  });
  setTimeout(() => {
    __vitePreload(() => Promise.resolve().then(() => vacanciesPage), true ? void 0 : void 0, import.meta.url).then((module) => {
      if (module.initVacanciesPagination) {
        module.initVacanciesPagination();
      }
    });
  }, 100);
}
function createVacancyElement(vacancy) {
  const div = document.createElement("div");
  div.className = "vacancy-item bg-brand-light rounded-xl overflow-hidden p-2";
  div.setAttribute("data-location", vacancy.location || "");
  const dutiesHTML = vacancy.duties ? `
    <div class="mb-2 font-semibold">Обязанности</div>
    <ul class="list-disc list-inside text-base mb-4">
      ${vacancy.duties.map((duty) => `<li>${duty}</li>`).join("")}
    </ul>
  ` : "";
  const requirementsHTML = vacancy.requirements ? `
    <div class="mb-2 font-semibold">Требования</div>
    <ul class="list-disc list-inside text-base mb-4">
      ${vacancy.requirements.map((req) => `<li>${req}</li>`).join("")}
    </ul>
  ` : "";
  const conditionsHTML = vacancy.conditions ? `
    <div class="mb-2 font-semibold">Условия</div>
    <ul class="list-disc list-inside text-sm md:text-base">
      ${vacancy.conditions.map((cond) => `<li>${cond}</li>`).join("")}
    </ul>
  ` : "";
  const contactHTML = vacancy.contact ? `
    <div class="font-semibold mb-2 text-h5">Обращаться по телефону</div>
    <div class="mb-2">${vacancy.contact.phone || ""}</div>
    <div class="mb-2">Контактное лицо: ${vacancy.contact.person || ""}</div>
    <div class="mb-2">Email: ${vacancy.contact.email || ""}</div>
  ` : "";
  div.innerHTML = `
    <button type="button" class="w-full flex justify-between items-center p-1 md:px-3 md:py-3 focus:outline-none vacancy-toggle">
      <div>
        <div class="font-bold text-h6 md:text-h5 text-brand-gray mb-1 text-left px-2 leading-1.2">${vacancy.title || ""}</div>
        <div class="text-brand-blue font-bold text-base md:text-lg text-left px-2">${vacancy.salary || ""} <span class="text-brand-gray font-normal">${vacancy.location || ""}</span></div>
      </div>
      <div class="bg-white p-3 rounded-full ml-5 md:ml-0">
        <svg class="w-5 h-5 text-brand-gray transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </div>
    </button>
    <div class="vacancy-content hidden px-4 pb-4 md:px-5 md:pb-6">
      <hr class="border-t border-t-2 border-white mb-4">
      <div class="grid md:grid-cols-3 gap-6 items-start">
        <div class="md:col-span-2">
          ${dutiesHTML}
          ${requirementsHTML}
          ${conditionsHTML}
        </div>
        <div class="bg-brand-white rounded-lg p-8 rounded-xl flex flex-col justify-between gap-4">
          <div>
            ${contactHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  const toggleButton = div.querySelector(".vacancy-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", function() {
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
  }
  return div;
}
const cityFilterApp = createApp({
  setup() {
    onMounted(() => {
      loadVacanciesData();
    });
    function onCitySelected(city) {
      console.log("Фильтр обновил город:", city);
      selectedCity.value = city;
      updateVacanciesDOM();
    }
    function onFilterReset() {
      console.log("Фильтр сброшен");
      selectedCity.value = "Все города";
      updateVacanciesDOM();
    }
    const officesForFilter = computed(() => {
      return vacancies.value.map((v) => ({ city: extractCityFromLocation(v.location) })).filter((v) => v.city);
    });
    return () => h(_sfc_main, {
      offices: officesForFilter.value,
      cities: cities.value,
      localities: [],
      loading: loading.value,
      error: error.value,
      onCitySelected,
      onFilterReset
    });
  }
});
function extractCityFromLocation(location) {
  if (!location) return "";
  const locationParts = location.split(",");
  if (locationParts.length > 0) {
    return locationParts[0].trim().replace(/^г\.\s*/i, "").trim();
  }
  return "";
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    const filterContainer = document.getElementById("city-filter-app");
    if (filterContainer) {
      cityFilterApp.mount("#city-filter-app");
      console.log("VacanciesPage Vue: Приложение смонтировано");
    } else {
      console.error("VacanciesPage Vue: Контейнер #city-filter-app не найден");
    }
  });
} else {
  const filterContainer = document.getElementById("city-filter-app");
  if (filterContainer) {
    cityFilterApp.mount("#city-filter-app");
    console.log("VacanciesPage Vue: Приложение смонтировано");
  } else {
    console.error("VacanciesPage Vue: Контейнер #city-filter-app не найден");
  }
}
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
    } catch (error2) {
      console.error("Pagination: Ошибка при инициализации:", error2);
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
    } catch (error2) {
      console.error(
        "Pagination: Ошибка при создании элементов пагинации:",
        error2
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
    } catch (error2) {
      console.error(
        "Pagination: Ошибка при обновлении кнопок пагинации:",
        error2
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
    } catch (error2) {
      console.error("Pagination: Ошибка при показе страницы:", error2);
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
    } catch (error2) {
      console.error("Pagination: Ошибка при обновлении элементов:", error2);
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
    } catch (error2) {
      console.error(
        "Pagination: Ошибка при обновлении видимых элементов:",
        error2
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
    } catch (error2) {
      console.error("Pagination: Ошибка при сбросе фильтра:", error2);
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
      // filterSelector больше не используется, фильтрация в Vue
      filterAttribute: "data-location",
      useDisplayNone: true
      // Используем display: none вместо класса hidden для вакансий
    });
    console.log("VacanciesPage: Пагинация успешно инициализирована");
  } else {
    console.error("VacanciesPage: Невозможно инициализировать пагинацию - отсутствуют необходимые элементы");
  }
}
const vacanciesPage = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  initVacanciesPage,
  initVacanciesPagination
}, Symbol.toStringTag, { value: "Module" }));
document.addEventListener("DOMContentLoaded", () => {
  initVacanciesPage();
});
