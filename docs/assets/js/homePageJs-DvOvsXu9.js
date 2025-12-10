import { l as loadSwiper } from "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import { c as createApp } from "./chunks/runtime-dom.esm-bundler-DT6Q_ZxL.js";
import { u as useGlobalModalStore } from "./chunks/globalModal-DEHeP1wE.js";
import { _ as _sfc_main$1 } from "./chunks/NewsDetailModal-gu3yf6Jj.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { a as createElementBlock, o as openBlock, F as Fragment, a4 as renderList, r as ref, u as onMounted, c as computed, b as createBaseVNode, $ as createCommentVNode, t as toDisplayString, aq as createStaticVNode } from "./chunks/runtime-core.esm-bundler-xz8C70T0.js";
import "./chunks/pinia-BykoCM9g.js";
const __vite_glob_0_0 = "" + new URL("../CURRENT_STATUS-C5jkPBsV.md", import.meta.url).href;
const __vite_glob_0_1 = "" + new URL("../PROJECT_CONTEXT-_heXsWAf.md", import.meta.url).href;
const __vite_glob_0_2 = "" + new URL("../README-Bmi0E0Ey.md", import.meta.url).href;
const __vite_glob_0_3 = "" + new URL("../TEST_CASES-C9Qskk_i.md", import.meta.url).href;
const __vite_glob_0_4 = "" + new URL("../../bulk-order..html", import.meta.url).href;
const __vite_glob_0_5 = "" + new URL("../../calculator..html", import.meta.url).href;
const __vite_glob_0_6 = "" + new URL("../../contacts..html", import.meta.url).href;
const __vite_glob_0_7 = "" + new URL("../../cooperation..html", import.meta.url).href;
const __vite_glob_0_8 = "" + new URL("../copy-assets-CDK2vOol.js", import.meta.url).href;
const __vite_glob_0_9 = "" + new URL("../copy-to-bitrix-D4-hW-CU.js", import.meta.url).href;
const __vite_glob_0_10 = "" + new URL("../deploy-OIoQImof.cjs", import.meta.url).href;
const __vite_glob_0_11 = "" + new URL("../../helper..html", import.meta.url).href;
const __vite_glob_0_12 = "" + new URL("../../index..html", import.meta.url).href;
const __vite_glob_0_13 = "" + new URL("../../news..html", import.meta.url).href;
const __vite_glob_0_14 = "" + new URL("../../notifications..html", import.meta.url).href;
const __vite_glob_0_15 = "" + new URL("../../order-list..html", import.meta.url).href;
const __vite_glob_0_16 = "" + new URL("../../order-new..html", import.meta.url).href;
const __vite_glob_0_17 = "" + new URL("../../order-tracking..html", import.meta.url).href;
const __vite_glob_0_18 = "" + new URL("../data/package-lock-Cbu0gIvc.json", import.meta.url).href;
const __vite_glob_0_19 = "" + new URL("../data/package-BU0RKJwW.json", import.meta.url).href;
const __vite_glob_0_20 = "" + new URL("../../payments..html", import.meta.url).href;
const __vite_glob_0_21 = "" + new URL("../postcss.config-By4aJUYq.js", import.meta.url).href;
const __vite_glob_0_22 = "" + new URL("../../profile..html", import.meta.url).href;
const __vite_glob_0_23 = "" + new URL("../../reconciliation-act..html", import.meta.url).href;
const __vite_glob_0_24 = "" + new URL("../../reports..html", import.meta.url).href;
const __vite_glob_0_25 = "" + new URL("../../senders-receivers..html", import.meta.url).href;
const __vite_glob_0_26 = "" + new URL("../../service-acts..html", import.meta.url).href;
const __vite_glob_0_27 = "" + new URL("../../services..html", import.meta.url).href;
const __vite_glob_0_28 = "" + new URL("../tailwind.config-oiuvnReP.js", import.meta.url).href;
const __vite_glob_0_29 = "" + new URL("../../user-create..html", import.meta.url).href;
const __vite_glob_0_30 = "" + new URL("../../vacancies..html", import.meta.url).href;
const __vite_glob_0_31 = "" + new URL("../vite.config-DDoJPiaN.js", import.meta.url).href;
const __vite_glob_0_32 = "" + new URL("../vitest.config-Jh_lyu9d.js", import.meta.url).href;
const __vite_glob_0_33 = "" + new URL("../ТЗ на калькулятор-BfZfuS1N.docx", import.meta.url).href;
const getImageUrl = (imgPath) => {
  if (!imgPath) return new URL("" + new URL("../img/Logotype_aerline_light-BjokHjWg.png", import.meta.url).href, import.meta.url).href;
  if (/^https?:\/\//.test(imgPath)) return imgPath;
  return new URL((/* @__PURE__ */ Object.assign({ "/CURRENT_STATUS.md": __vite_glob_0_0, "/PROJECT_CONTEXT.md": __vite_glob_0_1, "/README.md": __vite_glob_0_2, "/TEST_CASES.md": __vite_glob_0_3, "/bulk-order.html": __vite_glob_0_4, "/calculator.html": __vite_glob_0_5, "/contacts.html": __vite_glob_0_6, "/cooperation.html": __vite_glob_0_7, "/copy-assets.js": __vite_glob_0_8, "/copy-to-bitrix.js": __vite_glob_0_9, "/deploy.cjs": __vite_glob_0_10, "/helper.html": __vite_glob_0_11, "/index.html": __vite_glob_0_12, "/news.html": __vite_glob_0_13, "/notifications.html": __vite_glob_0_14, "/order-list.html": __vite_glob_0_15, "/order-new.html": __vite_glob_0_16, "/order-tracking.html": __vite_glob_0_17, "/package-lock.json": __vite_glob_0_18, "/package.json": __vite_glob_0_19, "/payments.html": __vite_glob_0_20, "/postcss.config.js": __vite_glob_0_21, "/profile.html": __vite_glob_0_22, "/reconciliation-act.html": __vite_glob_0_23, "/reports.html": __vite_glob_0_24, "/senders-receivers.html": __vite_glob_0_25, "/service-acts.html": __vite_glob_0_26, "/services.html": __vite_glob_0_27, "/tailwind.config.js": __vite_glob_0_28, "/user-create.html": __vite_glob_0_29, "/vacancies.html": __vite_glob_0_30, "/vite.config.js": __vite_glob_0_31, "/vitest.config.js": __vite_glob_0_32, "/ТЗ на калькулятор.docx": __vite_glob_0_33 }))[`/${imgPath.replace(/^\//, "")}`], import.meta.url).href;
};
const _sfc_main = {
  name: "HomePageNews",
  setup() {
    const modalStore = useGlobalModalStore();
    const news = ref([]);
    const loading = ref(true);
    onMounted(async () => {
      try {
        const apiUrl = "https://08615a563fb9b4f8.mokky.dev/news";
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const newsArray = Array.isArray(data) ? data : data.news || [];
        news.value = newsArray;
        loading.value = false;
      } catch (error) {
        console.error("Error loading news:", error);
        news.value = [];
        loading.value = false;
      }
    });
    const latestNews = computed(() => {
      if (!news.value || !Array.isArray(news.value)) {
        return [];
      }
      const sortedNews = [...news.value].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      return sortedNews.slice(0, 3);
    });
    const openNewsModal = (newsItem) => {
      console.log("Attempting to open modal with news item:", newsItem);
      modalStore.openModal(
        _sfc_main$1,
        { news: newsItem },
        "large"
      );
    };
    return {
      latestNews,
      openNewsModal,
      getImageUrl,
      loading
    };
  }
};
const _hoisted_1 = { class: "news-grid grid grid-cols-1 md:grid-cols-3 gap-6" };
const _hoisted_2 = { class: "wrapper" };
const _hoisted_3 = { class: "w-full flex justify-between" };
const _hoisted_4 = { class: "text-lg font-bold text-brand-gray mb-4 leading-1.2" };
const _hoisted_5 = {
  key: 0,
  class: "new-indicator w-10 h-10 flex items-center justify-center"
};
const _hoisted_6 = {
  width: "50",
  height: "50",
  viewBox: "0 0 50 50",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_7 = ["filter"];
const _hoisted_8 = ["id"];
const _hoisted_9 = ["in2"];
const _hoisted_10 = { class: "text-brand-gray text-sm mb-4 flex-grow line-clamp-3" };
const _hoisted_11 = { class: "flex flex-row justify-between items-center mt-4" };
const _hoisted_12 = { class: "text-sm mb-2" };
const _hoisted_13 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.latestNews, (newsItem) => {
      return openBlock(), createElementBlock("div", {
        key: newsItem.id,
        class: "relative news-card bg-brand-light p-6 rounded-lg flex flex-col justify-between relative"
      }, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h3", _hoisted_4, toDisplayString(newsItem.title), 1),
            newsItem.isNew ? (openBlock(), createElementBlock("div", _hoisted_5, [
              (openBlock(), createElementBlock("svg", _hoisted_6, [
                createBaseVNode("g", {
                  filter: `url(#filter0_d_news_${newsItem.id})`
                }, _cache[0] || (_cache[0] = [
                  createBaseVNode("circle", {
                    cx: "25",
                    cy: "25",
                    r: "5",
                    fill: "#008DD2"
                  }, null, -1)
                ]), 8, _hoisted_7),
                _cache[2] || (_cache[2] = createBaseVNode("circle", {
                  cx: "25",
                  cy: "25",
                  r: "7",
                  stroke: "#008DD2"
                }, null, -1)),
                createBaseVNode("defs", null, [
                  createBaseVNode("filter", {
                    id: `filter0_d_news_${newsItem.id}`,
                    x: "0",
                    y: "0",
                    width: "50",
                    height: "50",
                    filterUnits: "userSpaceOnUse",
                    "color-interpolation-filters": "sRGB"
                  }, [
                    _cache[1] || (_cache[1] = createStaticVNode('<feFlood flood-opacity="0" result="BackgroundImageFix" data-v-c1b3bb09></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" data-v-c1b3bb09></feColorMatrix><feOffset data-v-c1b3bb09></feOffset><feGaussianBlur stdDeviation="10" data-v-c1b3bb09></feGaussianBlur><feComposite in2="hardAlpha" operator="out" data-v-c1b3bb09></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.552941 0 0 0 0.823529 0 0 0 1 0" data-v-c1b3bb09></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_news_{{id}}" data-v-c1b3bb09></feBlend>', 7)),
                    createBaseVNode("feBlend", {
                      mode: "normal",
                      in: "SourceGraphic",
                      in2: `effect1_dropShadow_news_${newsItem.id}`,
                      result: "shape"
                    }, null, 8, _hoisted_9)
                  ], 8, _hoisted_8)
                ])
              ]))
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("p", _hoisted_10, toDisplayString(newsItem.content), 1)
        ]),
        createBaseVNode("div", _hoisted_11, [
          createBaseVNode("span", _hoisted_12, toDisplayString(newsItem.date), 1),
          createBaseVNode("button", {
            onClick: ($event) => $setup.openNewsModal(newsItem),
            class: "text-brand-blue text-sm text-left"
          }, " Подробнее ", 8, _hoisted_13)
        ])
      ]);
    }), 128))
  ]);
}
const HomePageNews = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c1b3bb09"]]);
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
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(
    ".carousel-container .absolute.left-4"
  );
  const nextButton = document.querySelector(
    ".carousel-container .absolute.right-4"
  );
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
    const trackingFormContainer = document.querySelector(
      ".tracking-form-container, .p-4.rounded-lg.w-full.md\\:w-2\\/5"
    );
    if (trackingFormContainer) {
      console.log("Найден контейнер формы отслеживания");
      const allButtonsInTrackingContainer = trackingFormContainer.querySelectorAll("button");
      console.log(
        `В контейнере формы отслеживания найдено ${allButtonsInTrackingContainer.length} кнопок:`
      );
      allButtonsInTrackingContainer.forEach((btn, index) => {
        console.log(`Кнопка #${index + 1}:`, {
          classes: btn.className,
          text: btn.textContent.trim()
        });
      });
      let searchButton = trackingFormContainer.querySelector(
        "button.bg-brand-gray"
      );
      if (!searchButton) {
        console.log('Не найдена кнопка по классу, ищем по тексту "Поиск"');
        const buttons = Array.from(
          trackingFormContainer.querySelectorAll("button")
        );
        searchButton = buttons.find(
          (btn) => btn.textContent.trim().toLowerCase().includes("поиск")
        );
      }
      if (searchButton) {
        console.log('Найдена кнопка "Поиск" для отслеживания:', {
          text: searchButton.textContent.trim(),
          classes: searchButton.className
        });
        const handleTrackingSearch = (e) => {
          e.preventDefault();
          console.log("Поиск заказа для отслеживания");
          const trackingInput = trackingFormContainer.querySelector('input[type="text"]');
          if (!trackingInput) {
            console.error("Не найдено поле ввода для формы отслеживания");
            return;
          }
          if (!trackingInput.hasAttribute("required")) {
            trackingInput.setAttribute("required", "");
          }
          if (trackingInput.validity.valid) {
            const orderNumber = trackingInput.value.trim();
            console.log("Отслеживание номера:", orderNumber);
            window.location.href = `order-tracking.html?orderNumber=${encodeURIComponent(orderNumber)}`;
          } else {
            trackingInput.reportValidity();
          }
        };
        searchButton.addEventListener("click", handleTrackingSearch);
        const form = trackingFormContainer.querySelector("form");
        if (form) {
          form.addEventListener("submit", handleTrackingSearch);
        }
      } else {
        console.warn(
          'Не найдена кнопка "Поиск" в контейнере формы отслеживания'
        );
      }
    } else {
      console.warn("Не найден контейнер формы отслеживания");
    }
  }
  initAutocomplete();
  const contactForm = document.querySelector("form.space-y-4");
  if (contactForm) {
    const requiredFields = contactForm.querySelectorAll(
      'input[type="text"], input[type="tel"], input[type="checkbox"]'
    );
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
        alert(
          `Спасибо за заявку, ${name}! Мы свяжемся с вами по номеру ${phone}`
        );
        this.reset();
      } else {
        this.reportValidity();
      }
    });
  }
  const homePageNewsAppElement = document.getElementById("home-page-news-app");
  if (homePageNewsAppElement) {
    console.log("Found #home-page-news-app, mounting Vue component");
    async function mountHomePageNews() {
      let attempts = 0;
      while (!window.pinia && attempts < 100) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        attempts++;
      }
      if (!window.pinia) {
        console.error("Глобальная Pinia не инициализирована. Убедитесь, что global-pinia.js загружен.");
        return;
      }
      const app = createApp(HomePageNews);
      app.use(window.pinia);
      app.mount(homePageNewsAppElement);
      console.log("HomePageNews component mounted.");
    }
    mountHomePageNews();
  } else {
    console.warn(
      "Could not find #home-page-news-app element to mount Vue component."
    );
  }
  console.log("Инициализация главной страницы завершена");
}
function initAutocomplete() {
  console.log("Автокомплит отключен - используются Vue-компоненты");
}
export {
  initHomePage as i
};
