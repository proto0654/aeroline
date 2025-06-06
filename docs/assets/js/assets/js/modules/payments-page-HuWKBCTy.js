import { c as initFaqAccordion, d as initPaymentTabs } from "./ui-IvxluLAz.js";
import "./utils-BNm1gLxD.js";
function initPaymentsPage() {
  console.log("Инициализация страницы платежей...");
  initFaqAccordion();
  initPaymentTabs();
  const sendCheckEmailCheckbox = document.getElementById("send-check-email");
  const emailField = document.getElementById("email-field");
  const emailInput = document.getElementById("email-input");
  if (sendCheckEmailCheckbox && emailField && emailInput) {
    console.log("Инициализация функционала отображения поля email...");
    if (sendCheckEmailCheckbox.checked) {
      emailField.classList.remove("hidden");
      emailInput.setAttribute("required", "");
    }
    sendCheckEmailCheckbox.addEventListener("change", function() {
      if (this.checked) {
        emailField.classList.remove("hidden");
        emailInput.setAttribute("required", "");
      } else {
        emailField.classList.add("hidden");
        emailInput.removeAttribute("required");
      }
    });
  }
  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    console.log("Инициализация обработчика формы оплаты...");
    paymentForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const orderNumber = document.getElementById("order-number").value;
      const sendCheckEmail = document.getElementById("send-check-email").checked;
      let email = null;
      if (!orderNumber) {
        alert("Пожалуйста, введите номер заказа");
        return;
      }
      if (sendCheckEmail) {
        email = document.getElementById("email-input").value;
        if (!email) {
          alert("Пожалуйста, введите email для отправки чека");
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Пожалуйста, введите корректный email");
          return;
        }
      }
      console.log("Отправка платежа:");
      console.log("Номер заказа:", orderNumber);
      console.log("Отправить чек на email:", sendCheckEmail);
      if (sendCheckEmail) {
        console.log("Email для чека:", email);
      }
      alert("Платеж отправлен! Проверьте консоль для деталей.");
    });
  }
  const orderHintTrigger = document.getElementById("order-hint-trigger");
  if (orderHintTrigger) {
    let tooltipVisible = false;
    orderHintTrigger.addEventListener("click", function(e) {
      e.stopPropagation();
      tooltipVisible = !tooltipVisible;
      if (tooltipVisible) {
        this.setAttribute("data-tip-show", "true");
      } else {
        this.removeAttribute("data-tip-show");
      }
    });
    document.addEventListener("click", function(e) {
      if (tooltipVisible && !orderHintTrigger.contains(e.target)) {
        orderHintTrigger.removeAttribute("data-tip-show");
        tooltipVisible = false;
      }
    });
    orderHintTrigger.addEventListener("mouseleave", function() {
      this.removeAttribute("data-tip-show");
      tooltipVisible = false;
    });
  }
}
export {
  initPaymentsPage as i
};
