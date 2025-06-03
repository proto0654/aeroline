import { d as domReady, P as PhoneValidator } from "./utils-BNm1gLxD.js";
function initMobileMenu() {
  const burgerMenuBtn = document.getElementById("burger-menu-btn");
  const mobileCloseBtn = document.getElementById("mobile-close-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerLines = document.querySelectorAll(".burger-line");
  if (!mobileMenu) return;
  const openMobileMenu = () => {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    burgerLines[0].classList.add("rotate-45", "translate-y-2");
    burgerLines[1].classList.add("opacity-0");
    burgerLines[2].classList.add("-rotate-45", "-translate-y-2");
    document.body.classList.add("overflow-hidden");
  };
  const closeMobileMenu = () => {
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");
    burgerLines[0].classList.remove("rotate-45", "translate-y-2");
    burgerLines[1].classList.remove("opacity-0");
    burgerLines[2].classList.remove("-rotate-45", "-translate-y-2");
    document.body.classList.remove("overflow-hidden");
  };
  if (burgerMenuBtn) {
    burgerMenuBtn.addEventListener("click", openMobileMenu);
  }
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMobileMenu);
  }
}
function initTitleAnimations() {
  const animatedTitles = document.querySelectorAll(".animated-title");
  const animatedSubtitles = document.querySelectorAll(".animated-subtitle");
  if (animatedTitles.length === 0 && animatedSubtitles.length === 0) {
    return;
  }
  setTimeout(() => {
    animatedTitles.forEach((title) => {
      title.classList.add("show");
    });
    setTimeout(() => {
      animatedSubtitles.forEach((subtitle) => {
        subtitle.classList.add("show");
      });
    }, 300);
  }, 200);
}
function initFaqAccordion() {
  const faqToggleButtons = document.querySelectorAll(".faq-toggle");
  if (faqToggleButtons.length > 0) {
    faqToggleButtons.forEach((btn) => {
      btn.addEventListener("click", function() {
        const content = this.parentElement.querySelector(".faq-content");
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
  }
}
function initForms() {
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Форма отправлена!");
    });
  }
}
function initPaymentTabs() {
  console.log("Инициализация табов на странице платежей...");
  const paymentTabs = document.querySelectorAll(".payment-tab");
  const paymentContents = document.querySelectorAll(".payment-tab-content");
  if (paymentTabs.length > 0) {
    paymentTabs.forEach((tab) => {
      tab.addEventListener("click", function() {
        const tabId = this.getAttribute("data-tab");
        const contentId = `tab-${tabId}`;
        paymentTabs.forEach((t) => {
          t.classList.remove("bg-white");
          t.classList.add("bg-brand-light", "border-transparent", "text-brand-gray");
        });
        this.classList.remove("bg-brand-light");
        this.classList.add("bg-white", "border-transparent", "text-brand-gray");
        paymentContents.forEach((content) => {
          content.classList.add("hidden");
        });
        document.getElementById(contentId).classList.remove("hidden");
      });
    });
  }
  const deliveryTabs = document.querySelectorAll(".delivery-tab");
  const deliveryContents = document.querySelectorAll(".delivery-tab-content");
  if (deliveryTabs.length > 0) {
    deliveryTabs.forEach((tab) => {
      tab.addEventListener("click", function() {
        const tabId = this.getAttribute("data-tab");
        const contentId = `tab-${tabId}`;
        deliveryTabs.forEach((t) => {
          t.classList.remove("bg-white");
          t.classList.add("bg-brand-light", "border-transparent", "text-brand-gray");
        });
        this.classList.remove("bg-brand-light");
        this.classList.add("bg-white", "border-transparent", "text-brand-gray");
        deliveryContents.forEach((content) => {
          content.classList.add("hidden");
        });
        document.getElementById(contentId).classList.remove("hidden");
      });
    });
  }
}
function initMobileMenuToggles() {
  const toggles = document.querySelectorAll(".mobile-menu-toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function() {
      const submenu = this.parentElement.querySelector(".mobile-menu-submenu");
      const icon = this.querySelector("svg");
      if (!submenu) return;
      if (submenu.classList.contains("hidden")) {
        submenu.classList.remove("hidden");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        icon.classList.add("rotate-180");
      } else {
        submenu.classList.add("hidden");
        submenu.style.maxHeight = null;
        icon.classList.remove("rotate-180");
      }
    });
  });
}
function initPhoneInputs() {
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    new PhoneValidator(input);
  });
}
domReady(() => {
  initPhoneInputs();
});
export {
  initTitleAnimations as a,
  initForms as b,
  initFaqAccordion as c,
  initPaymentTabs as d,
  initMobileMenuToggles as e,
  initMobileMenu as i
};
