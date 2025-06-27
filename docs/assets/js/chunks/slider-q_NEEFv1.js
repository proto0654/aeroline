function getBasePath() {
  const scripts = document.getElementsByTagName("script");
  const currentScript = scripts[scripts.length - 1];
  try {
    const scriptSrc = currentScript.src;
    if (scriptSrc.includes("://")) {
      const url = new URL(scriptSrc);
      const pathParts = url.pathname.split("/");
      pathParts.pop();
      if (pathParts[pathParts.length - 1] === "js" && pathParts[pathParts.length - 2] === "assets") {
        pathParts.pop();
        pathParts.pop();
      } else if (pathParts[pathParts.length - 1] === "assets") {
        pathParts.pop();
      }
      return pathParts.join("/") + "/";
    } else {
      const pathParts = scriptSrc.split("/");
      pathParts.pop();
      if (pathParts.length >= 2 && pathParts[pathParts.length - 1] === "js" && pathParts[pathParts.length - 2] === "assets") {
        pathParts.pop();
        pathParts.pop();
      } else if (pathParts.length >= 1 && pathParts[pathParts.length - 1] === "assets") {
        pathParts.pop();
      }
      return pathParts.join("/") + "/";
    }
  } catch (error) {
    console.error("Ошибка при определении базового пути:", error);
    return "./";
  }
}
function domReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    if (callback) callback(null);
  };
  script.onerror = () => {
    if (callback) callback(new Error(`Не удалось загрузить скрипт: ${src}`));
  };
  document.head.appendChild(script);
}
function loadStyle(href, callback) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.onload = () => {
    if (callback) callback(null);
  };
  link.onerror = () => {
    if (callback) callback(new Error(`Не удалось загрузить стиль: ${href}`));
  };
  document.head.appendChild(link);
}
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  return "desktop";
}
class PhoneValidator {
  constructor(input) {
    this.input = input;
    this.init();
  }
  init() {
    this.input.placeholder = "+7 (___) ___-__-__";
    this.input.addEventListener("blur", this.onBlur.bind(this));
    this.input.addEventListener("input", this.onInput.bind(this));
  }
  onInput(e) {
    const allowed = /[\d\+\-\(\) ]/g;
    let filtered = this.input.value.match(allowed);
    if (filtered) {
      this.input.value = filtered.join("");
    } else {
      this.input.value = "";
    }
    this.input.setCustomValidity("");
  }
  onBlur(e) {
    let value = this.input.value.replace(/[^\d\+]/g, "");
    if (value.startsWith("8")) value = "+7" + value.slice(1);
    if (value.startsWith("+7")) {
      if (value.length === 12) {
        const num = value.replace(/\D/g, "");
        this.input.value = `+7 (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 9)}-${num.slice(9, 11)}`;
        this.input.setCustomValidity("");
        return;
      }
    }
    this.input.setCustomValidity("Введите корректный номер телефона");
  }
}
function initSwiperSlider() {
  if (typeof Swiper === "undefined") {
    console.error("Swiper не загружен!");
    return;
  }
  new Swiper(".swiper-container", {
    // Базовые настройки
    slidesPerView: 1,
    spaceBetween: 0,
    // Цикличный режим
    loop: true,
    speed: 800,
    // Эффект fade
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    // Автопрокрутка
    autoplay: {
      delay: 7e4,
      disableOnInteraction: false
    },
    // Пагинация - стандартная
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    // Навигационные кнопки
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    // Базовые колбеки
    on: {
      init: function() {
        console.log("Swiper инициализирован");
      }
    }
  });
  if (document.querySelector(".news-swiper-container")) {
    console.log("Инициализация Swiper для новостей с уже существующими слайдами...");
    const newsContainer = document.querySelector(".news-swiper-container .swiper-wrapper");
    const existingSlides = newsContainer ? newsContainer.querySelectorAll(".swiper-slide") : [];
    console.log(`Найдено ${existingSlides.length} существующих слайдов новостей от шаблонизатора`);
    new Swiper(".news-swiper-container", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: existingSlides.length > 1,
      // Включаем loop только если есть больше 1 слайда
      speed: 1100,
      // Эффект fade
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      // Автопрокрутка
      autoplay: {
        delay: 7e3,
        disableOnInteraction: false
      },
      pagination: {
        el: ".news-swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".news-swiper-button-next",
        prevEl: ".news-swiper-button-prev"
      },
      breakpoints: {
        // На мобильных устройствах
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // На планшетах
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      },
      on: {
        init: function() {
          console.log("Swiper новостей инициализирован");
        }
      }
    });
  }
}
function loadSwiper() {
  return new Promise((resolve, reject) => {
    try {
      loadStyle("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css", (err) => {
        if (err) {
          console.error("Не удалось загрузить стили Swiper:", err);
          reject(err);
          return;
        }
        loadScript("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js", (err2) => {
          if (err2) {
            console.error("Не удалось загрузить библиотеку Swiper:", err2);
            reject(err2);
            return;
          }
          console.log("Swiper успешно загружен");
          if (typeof Swiper !== "undefined") {
            console.log("Инициализация Swiper...");
            setTimeout(() => {
              initSwiperSlider();
              resolve();
            }, 100);
          } else {
            reject(new Error("Swiper не определен после загрузки"));
          }
        });
      });
    } catch (error) {
      console.error("Ошибка при загрузке Swiper:", error);
      reject(error);
    }
  });
}
export {
  PhoneValidator as P,
  getDeviceType as a,
  domReady as d,
  getBasePath as g,
  initSwiperSlider as i,
  loadSwiper as l
};
