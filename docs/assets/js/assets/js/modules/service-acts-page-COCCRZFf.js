import { T as TableManager } from "./table-manager-CPw7djFF.js";
import { m as modalManager } from "./modal-manager-BXwv0V3q.js";
import { m as mountDateRangePicker } from "../../vue/entrypoints/lk-datepicker-BAWDGYJK.js";
console.log("--- Debug: Attempting to import TableManager in service-acts-page.js ---");
console.log("--- Debug: TableManager imported successfully in service-acts-page.js ---");
console.log("--- Debug: Attempting to import modalManager in service-acts-page.js ---");
console.log("--- Debug: modalManager imported successfully in service-acts-page.js ---");
console.log("--- Debug: Attempting to import mountDateRangePicker in service-acts-page.js ---");
console.log("--- Debug: mountDateRangePicker imported successfully in service-acts-page.js ---");
console.log("--- Debug: Defining ServiceActsPage class ---");
class ServiceActsPage {
  constructor() {
    console.log("Инициализация класса");
    this.tableManager = null;
    this.emailModal = null;
    this.selectedDateRange = null;
    this.init();
  }
  init() {
    console.log("--- Debug: Start of init in service-acts-page.js ---");
    console.log("Инициализация страницы актов оказания услуг");
    const actsTable = document.getElementById("acts-table");
    if (!actsTable) {
      console.log("Таблица актов не найдена, пропускаем инициализацию");
      return;
    }
    this.initTable();
    this.initModal();
    this.initRequestForm();
    this.initDateRangePicker();
    console.log("--- Debug: End of init in service-acts-page.js ---");
  }
  initTable() {
    this.tableManager = new TableManager({
      containerId: "acts-table",
      valueNames: ["date", "actNumber", "amount", "organizationName"],
      page: 10,
      searchEnabled: true,
      searchInputId: "search-input",
      customPagination: false
      // Используем стандартную пагинацию List.js
    });
  }
  initDateRangePicker() {
    console.log("ServiceActsPage: Инициализация Vue DateRangePicker");
    const datePickerContainer = document.querySelector("#service-acts-datepicker-app");
    if (datePickerContainer) {
      this.datePickerApp = mountDateRangePicker(
        "#service-acts-datepicker-app",
        { placeholder: "Выберите период для акта сверки" },
        (range) => {
          console.log("ServiceActsPage: Выбран период для акта сверки (Vue):", range);
          this.selectedDateRange = range;
          console.log("ServiceActsPage: Обновлен selectedDateRange:", this.selectedDateRange);
        },
        () => {
          console.log("ServiceActsPage: Выбор периода для акта сверки сброшен (Vue)");
          this.selectedDateRange = null;
          console.log("ServiceActsPage: Сброшен selectedDateRange.");
        }
      );
      console.log("ServiceActsPage: Vue DateRangePicker смонтирован.");
    } else {
      console.warn("ServiceActsPage: Контейнер #service-acts-datepicker-app не найден, Vue DateRangePicker не будет смонтирован.");
    }
  }
  updateItemCounts() {
    if (!this.tableManager || !this.tableManager.list) return;
    const visibleItems = this.tableManager.list.visibleItems.length;
    const totalItems = this.tableManager.list.items.length;
    const itemsCountElement = document.getElementById("items-count");
    const totalCountElement = document.getElementById("total-count");
    if (itemsCountElement) itemsCountElement.textContent = visibleItems;
    if (totalCountElement) totalCountElement.textContent = totalItems;
  }
  initModal() {
    this.emailModal = document.getElementById("email_modal");
    if (!this.emailModal) return;
    const modalActNumber = document.getElementById("modal-act-number");
    const emailForm = document.getElementById("email-form");
    document.addEventListener("click", (e) => {
      const sendEmailBtn = e.target.closest(".send-email-btn");
      if (sendEmailBtn) {
        const actNumber = sendEmailBtn.dataset.actNumber;
        sendEmailBtn.dataset.organization;
        modalActNumber.textContent = actNumber;
        modalManager.open(this.emailModal);
      }
    });
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("modal-email").value;
      const actNumber = modalActNumber.textContent;
      console.log("Отправка акта", actNumber, "на email:", email);
      alert("Акт успешно отправлен на " + email);
      modalManager.close(this.emailModal);
      emailForm.reset();
    });
  }
  initRequestForm() {
    const requestForm = document.getElementById("request-form");
    if (!requestForm) return;
    requestForm.addEventListener("submit", (e) => {
      var _a, _b, _c, _d;
      e.preventDefault();
      const email = document.getElementById("email-input").value;
      const periodData = this.selectedDateRange;
      if (!periodData || !periodData.start || !periodData.end) {
        alert("Пожалуйста, выберите период для акта сверки");
        return;
      }
      console.log("Запрос акта сверки на email:", email, "за период:", periodData);
      alert(`Запрос на акт сверки за период ${periodData.formattedRange} отправлен на ${email}`);
      requestForm.reset();
      console.warn("ServiceActsPage: Сброс выбранного диапазона после отправки формы не реализован.");
      if (this.datePickerApp && ((_d = (_c = (_b = (_a = this.datePickerApp._container) == null ? void 0 : _a.__vue_app__) == null ? void 0 : _b._instance) == null ? void 0 : _c.proxy) == null ? void 0 : _d.clearSelection)) {
        this.datePickerApp._container.__vue_app__._instance.proxy.clearSelection();
        console.log("ServiceActsPage: Диапазон дат сброшен после отправки формы.");
      } else {
        console.warn("ServiceActsPage: Не удалось сбросить диапазон дат Vue компонента после отправки формы.");
      }
    });
  }
}
function initServiceActsPage() {
  console.log("initServiceActsPage called - Initializing ServiceActsPage module");
  new ServiceActsPage();
}
export {
  initServiceActsPage as i
};
