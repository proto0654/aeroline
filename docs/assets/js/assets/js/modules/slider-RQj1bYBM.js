import { l as loadStyle, b as loadScript } from "./utils-BNm1gLxD.js";
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
  initSwiperSlider as i,
  loadSwiper as l
};
