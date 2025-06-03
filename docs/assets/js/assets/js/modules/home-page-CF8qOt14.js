import { l as loadSwiper } from "./slider-RQj1bYBM.js";
import { c as createAutocompleteInput } from "./autocomplete-CjR2TxGO.js";
import { m as modalManager } from "./modal-manager-BXwv0V3q.js";
import "./utils-BNm1gLxD.js";
function initHomePage() {
  console.log("Инициализация главной страницы начата");
  if (document.querySelector(".swiper-container") || document.querySelector(".news-swiper-container")) {
    console.log("Обнаружен контейнер Swiper, начинаю загрузку...");
    loadSwiper().catch((error) => {
      console.error("Не удалось загрузить Swiper:", error);
    });
  } else {
    console.log("Контейнеры Swiper не обнаружены на странице");
  }
  console.log("Используем новости, уже загруженные через шаблонизатор");
  const newsCarousel = document.querySelector(".news-carousel");
  const newsPrevButton = document.querySelector(".news-carousel button.absolute.left-0");
  const newsNextButton = document.querySelector(".news-carousel button.absolute.right-0");
  if (newsCarousel && newsPrevButton && newsNextButton) {
    const newsItems = newsCarousel.querySelectorAll(".bg-brand-light");
    let currentNewsIndex = 0;
    const showNews = (index) => {
      newsItems.forEach((item) => {
        item.style.display = "none";
      });
      newsItems[index].style.display = "block";
    };
    newsPrevButton.addEventListener("click", () => {
      currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
      showNews(currentNewsIndex);
    });
    newsNextButton.addEventListener("click", () => {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      showNews(currentNewsIndex);
    });
    showNews(currentNewsIndex);
  }
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-container .absolute.left-4");
  const nextButton = document.querySelector(".carousel-container .absolute.right-4");
  if (carouselSlides.length > 0 && prevButton && nextButton) {
    let currentSlide = 0;
    const showSlide = (index) => {
      carouselSlides.forEach((slide) => {
        slide.classList.remove("active");
        slide.style.display = "none";
      });
      carouselSlides[index].classList.add("active");
      carouselSlides[index].style.display = "block";
    };
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
      showSlide(currentSlide);
    });
    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      showSlide(currentSlide);
    });
    showSlide(currentSlide);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      showSlide(currentSlide);
    }, 5e3);
  }
  const trackForm = document.querySelector(".track-form");
  if (trackForm) {
    trackForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const trackInput = this.querySelector('input[type="text"]').value;
      if (trackInput.trim() !== "") {
        console.log("Отслеживание заказа:", trackInput);
        alert(`Отслеживание заказа: ${trackInput}`);
      } else {
        console.warn("Пустой ввод в форме отслеживания заказа");
        alert("Пожалуйста, введите номер заказа");
      }
    });
  } else {
    const trackingFormContainer = document.querySelector(".tracking-form-container, .p-4.rounded-lg.w-full.md\\:w-2\\/5");
    if (trackingFormContainer) {
      console.log("Найден контейнер формы отслеживания");
      const allButtonsInTrackingContainer = trackingFormContainer.querySelectorAll("button");
      console.log(`В контейнере формы отслеживания найдено ${allButtonsInTrackingContainer.length} кнопок:`);
      allButtonsInTrackingContainer.forEach((btn, index) => {
        console.log(`Кнопка #${index + 1}:`, {
          classes: btn.className,
          text: btn.textContent.trim()
        });
      });
      let searchButton = trackingFormContainer.querySelector("button.bg-brand-gray");
      if (!searchButton) {
        console.log('Не найдена кнопка по классу, ищем по тексту "Поиск"');
        const buttons = Array.from(trackingFormContainer.querySelectorAll("button"));
        searchButton = buttons.find(
          (btn) => btn.textContent.trim().toLowerCase().includes("поиск")
        );
      }
      if (searchButton) {
        console.log('Найдена кнопка "Поиск" для отслеживания:', {
          text: searchButton.textContent.trim(),
          classes: searchButton.className
        });
        searchButton.addEventListener("click", function(e) {
          e.preventDefault();
          console.log('Клик по кнопке "Поиск" для отслеживания');
          const trackingInput = trackingFormContainer.querySelector('input[type="text"]');
          if (!trackingInput) {
            console.error("Не найдено поле ввода для формы отслеживания");
            return;
          }
          if (!trackingInput.hasAttribute("required")) {
            trackingInput.setAttribute("required", "");
          }
          if (trackingInput.validity.valid) {
            console.log("Отслеживание номера:", trackingInput.value);
            alert(`Отслеживание номера: ${trackingInput.value}`);
          } else {
            trackingInput.reportValidity();
          }
        });
      } else {
        console.warn('Не найдена кнопка "Поиск" в контейнере формы отслеживания');
      }
    } else {
      console.warn("Не найден контейнер формы отслеживания");
    }
  }
  initAutocomplete();
  const priceForm = document.querySelector(".price-form");
  let priceFormFound = false;
  if (priceForm) {
    priceFormFound = true;
    priceForm.addEventListener("submit", function(e) {
      e.preventDefault();
      if (this.checkValidity()) {
        const fromInput = document.querySelector("#from-city-input");
        const toInput = document.querySelector("#to-city-input");
        console.log("Расчет стоимости доставки:", {
          from: fromInput.value,
          to: toInput.value
        });
        alert(`Расчет стоимости доставки: ${fromInput.value} -> ${toInput.value}`);
      } else {
        this.reportValidity();
      }
    });
  }
  if (!priceFormFound) {
    const priceFormContainer = document.querySelector(".bg-brand-light.p-4.rounded-lg.w-full.md\\:w-3\\/5");
    if (priceFormContainer) {
      console.log("Найден контейнер формы расчета, будем использовать клик по кнопке");
      const allButtonsInContainer = priceFormContainer.querySelectorAll("button");
      console.log(`В контейнере формы расчета найдено ${allButtonsInContainer.length} кнопок:`);
      allButtonsInContainer.forEach((btn, index) => {
        console.log(`Кнопка #${index + 1}:`, {
          classes: btn.className,
          text: btn.textContent.trim()
        });
      });
      let calculateButton = priceFormContainer.querySelector("button.bg-brand-gray");
      if (!calculateButton) {
        console.log('Не найдена кнопка по классу, ищем по тексту "Рассчитать"');
        const buttons = Array.from(priceFormContainer.querySelectorAll("button"));
        calculateButton = buttons.find(
          (btn) => btn.textContent.trim().toLowerCase().includes("рассчитать")
        );
      }
      if (calculateButton) {
        console.log('Найдена кнопка "Рассчитать" для расчета стоимости:', {
          text: calculateButton.textContent.trim(),
          classes: calculateButton.className
        });
        calculateButton.addEventListener("click", function(e) {
          e.preventDefault();
          console.log('Клик по кнопке "Рассчитать"');
          const fromInput = document.querySelector("#from-city-input");
          const toInput = document.querySelector("#to-city-input");
          if (!fromInput || !toInput) {
            console.error("Не найдены поля ввода для формы расчета");
            return;
          }
          const isFormValid = fromInput.validity.valid && toInput.validity.valid;
          if (isFormValid) {
            console.log("Расчет стоимости доставки:", {
              from: fromInput.value,
              to: toInput.value
            });
            alert(`Расчет стоимости доставки: ${fromInput.value} -> ${toInput.value}`);
          } else {
            if (!fromInput.validity.valid) fromInput.reportValidity();
            else if (!toInput.validity.valid) toInput.reportValidity();
          }
        });
      } else {
        console.warn('Не найдена кнопка "Рассчитать" в контейнере формы расчета');
      }
    }
  }
  const clientButton = document.getElementById("become-client-btn");
  if (clientButton) {
    clientButton.addEventListener("click", function() {
      modalManager.open("become-client-modal", {
        onOpen: (modal) => {
          const form = modal.querySelector("#become-client-form");
          if (form) {
            form.addEventListener("submit", function(e) {
              e.preventDefault();
              if (this.checkValidity()) {
                const formData = {
                  name: document.getElementById("client-name").value,
                  phone: document.getElementById("client-phone").value,
                  email: document.getElementById("client-email").value,
                  type: document.getElementById("client-type").value,
                  comment: document.getElementById("client-comment").value
                };
                console.log("Заявка на становление клиентом:", formData);
                alert(`Спасибо за заявку, ${formData.name}! Мы свяжемся с вами в ближайшее время.`);
                modalManager.close(modal);
                this.reset();
              } else {
                this.reportValidity();
              }
            });
          }
        }
      });
    });
  }
  const contactForm = document.querySelector("form.space-y-4");
  if (contactForm) {
    const requiredFields = contactForm.querySelectorAll('input[type="text"], input[type="tel"], input[type="checkbox"]');
    requiredFields.forEach((field) => {
      if (!field.hasAttribute("required")) {
        field.setAttribute("required", "");
      }
    });
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      if (this.checkValidity()) {
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        alert(`Спасибо за заявку, ${name}! Мы свяжемся с вами по номеру ${phone}`);
        this.reset();
      } else {
        this.reportValidity();
      }
    });
  }
  console.log("Инициализация главной страницы завершена");
}
function initAutocomplete() {
  console.log("Инициализация автокомплита для полей выбора объектов");
  let offices = [];
  if (window.officesData && window.officesData.length > 0) {
    offices = window.officesData;
    console.log("Используем офисы из window.officesData:", offices.length);
  } else {
    const officeElements = document.querySelectorAll("#offices-data .office-data");
    offices = Array.from(officeElements).map((el) => ({
      city: el.dataset.city,
      address: el.dataset.address,
      type: el.dataset.type,
      phone: el.dataset.phone,
      email: el.dataset.email,
      coordinates: el.dataset.coordinates
    }));
    console.log("Офисы из DOM:", offices.length);
  }
  setupAutocompleteInputs(offices);
  setupCityLinks();
}
function setupAutocompleteInputs(offices) {
  console.log("Настройка полей ввода с автокомплитом для офисов");
  const fromSelectContainer = document.querySelector("select.from").closest(".relative.w-full");
  const toSelectContainer = document.querySelector("select.to").closest(".relative.w-full");
  if (!fromSelectContainer || !toSelectContainer) {
    console.error("Не найдены контейнеры для полей выбора объектов");
    return;
  }
  createAutocompleteInput(fromSelectContainer, offices, "from-city", "Откуда");
  createAutocompleteInput(toSelectContainer, offices, "to-city", "Куда");
}
function setupCityLinks(offices) {
  const cityContainers = document.querySelectorAll(".flex.md\\:flex-row.flex-col .flex.flex-row.flex-wrap.gap-2");
  cityContainers.forEach((container, index) => {
    const input = document.getElementById(index === 0 ? "from-city-input" : "to-city-input");
    if (!input) return;
    container.querySelectorAll("span").forEach((citySpan) => {
      citySpan.addEventListener("click", () => {
        const cityName = citySpan.textContent.trim();
        input.value = cityName;
        input.focus();
        setTimeout(() => {
          input.dispatchEvent(new Event("focus", { bubbles: true }));
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }, 50);
      });
    });
  });
}
export {
  initHomePage as i
};
