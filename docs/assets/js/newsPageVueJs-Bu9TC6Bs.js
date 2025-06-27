import { s as computed, c as createElementBlock, o as openBlock, b as createBaseVNode, e as createCommentVNode, t as toDisplayString, Y as createStaticVNode, f as withModifiers, K as Fragment, L as renderList, A as createBlock, D as normalizeClass, a as createVNode, r as ref, y as onMounted, E as createApp } from "./chunks/runtime-dom.esm-bundler-ga6ljDpR.js";
import { _ as _sfc_main$5, a as __vite_glob_0_6, b as __vite_glob_0_5, c as __vite_glob_0_4, d as __vite_glob_0_3, e as __vite_glob_0_2, f as __vite_glob_0_1, g as __vite_glob_0_0 } from "./chunks/NewsDetailModal-Dxlusbak.js";
import { u as useGlobalModalStore } from "./chunks/globalModal-CT_hlU_k.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { D as DateRangePickerVue } from "./chunks/DateRangePickerVue-DmAlbIfR.js";
import "./lkDatepickerJs-DJS98bK4.js";
const _hoisted_1$4 = {
  class: "news-card mb-4 py-2 md:py-4 bg-brand-light border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow",
  "data-news-id": "{{news.id}}"
};
const _hoisted_2$2 = { class: "flex flex-col md:flex-row gap-4" };
const _hoisted_3$2 = { class: "w-full md:w-2/5 rounded-2xl overflow-hidden px-2 md:px-4" };
const _hoisted_4$2 = ["src", "alt"];
const _hoisted_5$2 = ["src", "alt"];
const _hoisted_6$1 = { class: "w-full md:w-3/5 px-2 md:px-4 py-3 md:py-4" };
const _hoisted_7 = { class: "flex items-start justify-between mb-4" };
const _hoisted_8 = { class: "news-title text-h5 md:text-h4 font-bold text-brand-gray pr-4" };
const _hoisted_9 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_10 = {
  width: "50",
  height: "50",
  viewBox: "0 0 50 50",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_11 = ["filter"];
const _hoisted_12 = ["id"];
const _hoisted_13 = { class: "news-content text-brand-gray mb-6" };
const _hoisted_14 = { class: "flex justify-between items-center pr-2 md:pr-0" };
const _hoisted_15 = { class: "news-date text-caption-form text-brand-gray" };
const _sfc_main$4 = {
  __name: "NewsCard",
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const images = /* @__PURE__ */ Object.assign({ "/assets/img/news/563x304 (1).jpg": __vite_glob_0_0, "/assets/img/news/563x304.jpg": __vite_glob_0_1, "/assets/img/news/800x400 (1).jpg": __vite_glob_0_2, "/assets/img/news/800x400 (2).jpg": __vite_glob_0_3, "/assets/img/news/800x400.jpg": __vite_glob_0_4, "/assets/img/news/scale_1200 (1).jpg": __vite_glob_0_5, "/assets/img/news/scale_1200.jpg": __vite_glob_0_6 });
    const props = __props;
    const globalModalStore = useGlobalModalStore();
    const truncatedContent = computed(() => {
      const maxLength = 120;
      if (props.news.content.length > maxLength) {
        return props.news.content.substring(0, maxLength) + "...";
      }
      return props.news.content;
    });
    const openNewsDetail = (newsItem) => {
      globalModalStore.openModal(_sfc_main$5, { news: newsItem }, "large");
    };
    const getImageUrl = (imgName) => {
      if (!imgName) return new URL("" + new URL("../img/Logotype_aerline_light-BjokHjWg.png", import.meta.url).href, import.meta.url).href;
      const found = Object.entries(images).find(([path]) => path.endsWith("/" + imgName));
      if (found) return found[1];
      return new URL("" + new URL("../img/Logotype_aerline_light-BjokHjWg.png", import.meta.url).href, import.meta.url).href;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$2, [
            __props.news.image ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: getImageUrl(__props.news.image),
              alt: __props.news.title,
              class: "w-full object-cover rounded-2xl aspect-video max-w-[100%]"
            }, null, 8, _hoisted_4$2)) : (openBlock(), createElementBlock("img", {
              key: 1,
              src: getImageUrl(""),
              alt: __props.news.title,
              class: "placeholder w-full object-contain min-h-[120px] h-full p-10"
            }, null, 8, _hoisted_5$2))
          ]),
          createBaseVNode("div", _hoisted_6$1, [
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("h3", _hoisted_8, toDisplayString(__props.news.title), 1),
              __props.news.isNew ? (openBlock(), createElementBlock("div", _hoisted_9, [
                (openBlock(), createElementBlock("svg", _hoisted_10, [
                  createBaseVNode("g", {
                    filter: `url(#filter0_d_news_${__props.news.id})`
                  }, _cache[1] || (_cache[1] = [
                    createBaseVNode("circle", {
                      cx: "25",
                      cy: "25",
                      r: "5",
                      fill: "#008DD2"
                    }, null, -1)
                  ]), 8, _hoisted_11),
                  _cache[3] || (_cache[3] = createBaseVNode("circle", {
                    cx: "25",
                    cy: "25",
                    r: "7",
                    stroke: "#008DD2"
                  }, null, -1)),
                  createBaseVNode("defs", null, [
                    createBaseVNode("filter", {
                      id: `filter0_d_news_${__props.news.id}`,
                      x: "0",
                      y: "0",
                      width: "50",
                      height: "50",
                      filterUnits: "userSpaceOnUse",
                      "color-interpolation-filters": "sRGB"
                    }, _cache[2] || (_cache[2] = [
                      createStaticVNode('<feFlood flood-opacity="0" result="BackgroundImageFix" data-v-010fb64a></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" data-v-010fb64a></feColorMatrix><feOffset data-v-010fb64a></feOffset><feGaussianBlur stdDeviation="10" data-v-010fb64a></feGaussianBlur><feComposite in2="hardAlpha" operator="out" data-v-010fb64a></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.552941 0 0 0 0 0.823529 0 0 0 1 0" data-v-010fb64a></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_news_${news.id}" data-v-010fb64a></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_news_${news.id}" result="shape" data-v-010fb64a></feBlend>', 8)
                    ]), 8, _hoisted_12)
                  ])
                ]))
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("p", _hoisted_13, toDisplayString(truncatedContent.value), 1),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, toDisplayString(__props.news.date), 1),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => openNewsDetail(__props.news), ["prevent"])),
                class: "news-details-btn text-brand-blue md:text-body-secondary hover:text-brand-blue-dark transition-colors"
              }, "Подробнее")
            ])
          ])
        ])
      ]);
    };
  }
};
const NewsCard = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-010fb64a"]]);
const _hoisted_1$3 = { class: "news-grid space-y-6 md:space-y-8 w-full" };
const _sfc_main$3 = {
  __name: "NewsGrid",
  props: {
    newsItems: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.newsItems, (newsItem) => {
          return openBlock(), createBlock(NewsCard, {
            key: newsItem.id,
            news: newsItem
          }, null, 8, ["news"]);
        }), 128))
      ]);
    };
  }
};
const NewsGrid = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-25620fd2"]]);
const _hoisted_1$2 = {
  key: 0,
  class: "flex justify-center mt-8 space-x-2"
};
const _hoisted_2$1 = ["disabled"];
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = ["onClick"];
const _hoisted_5$1 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _sfc_main$2 = {
  __name: "NewsPagination",
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    pageRange: {
      type: Number,
      default: 5
      // Количество отображаемых номеров страниц
    }
  },
  emits: ["update:currentPage"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const displayedPages = computed(() => {
      const pages = [];
      const startPage = Math.max(1, props.currentPage - Math.floor(props.pageRange / 2));
      const endPage = Math.min(props.totalPages, startPage + props.pageRange - 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      while (pages.length < props.pageRange && pages[0] > 1) {
        pages.unshift(pages[0] - 1);
      }
      return pages;
    });
    const goToPage = (page) => {
      if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
        emit("update:currentPage", page);
      }
    };
    return (_ctx, _cache) => {
      return __props.totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => goToPage(1)),
          disabled: __props.currentPage === 1,
          class: "btn btn-square btn-ghost",
          "aria-label": "First page"
        }, " ⏮ ", 8, _hoisted_2$1),
        createBaseVNode("button", {
          onClick: _cache[1] || (_cache[1] = ($event) => goToPage(__props.currentPage - 1)),
          disabled: __props.currentPage === 1,
          class: "btn btn-square btn-ghost",
          "aria-label": "Previous page"
        }, " ◀ ", 8, _hoisted_3$1),
        (openBlock(true), createElementBlock(Fragment, null, renderList(displayedPages.value, (page) => {
          return openBlock(), createElementBlock("button", {
            key: page,
            onClick: ($event) => goToPage(page),
            class: normalizeClass(["btn btn-square", { "btn-primary": page === __props.currentPage }])
          }, toDisplayString(page), 11, _hoisted_4$1);
        }), 128)),
        createBaseVNode("button", {
          onClick: _cache[2] || (_cache[2] = ($event) => goToPage(__props.currentPage + 1)),
          disabled: __props.currentPage === __props.totalPages,
          class: "btn btn-square btn-ghost",
          "aria-label": "Next page"
        }, " ▶ ", 8, _hoisted_5$1),
        createBaseVNode("button", {
          onClick: _cache[3] || (_cache[3] = ($event) => goToPage(__props.totalPages)),
          disabled: __props.currentPage === __props.totalPages,
          class: "btn btn-square btn-ghost",
          "aria-label": "Last page"
        }, " ⏭ ", 8, _hoisted_6)
      ])) : createCommentVNode("", true);
    };
  }
};
const NewsPagination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bd9ca762"]]);
const _hoisted_1$1 = { class: "date-range-filter mb-6" };
const _sfc_main$1 = {
  __name: "DateRangeFilter",
  props: {
    initialStartDate: {
      type: [String, Date],
      default: null
    },
    initialEndDate: {
      type: [String, Date],
      default: null
    }
  },
  emits: ["date-range-changed"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleDateRangeSelected = (payload) => {
      emit("date-range-changed", payload);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(DateRangePickerVue, {
          initialRange: [__props.initialStartDate, __props.initialEndDate],
          "onUpdate:range": handleDateRangeSelected,
          class: "w-full"
        }, null, 8, ["initialRange"])
      ]);
    };
  }
};
const DateRangeFilter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f336f74c"]]);
const _hoisted_1 = { class: "news-page-container container mx-auto px-4 py-8 flex flex-col items-center" };
const _hoisted_2 = {
  key: 0,
  class: "text-center text-lg text-gray-600"
};
const _hoisted_3 = {
  key: 1,
  class: "text-center text-lg text-red-600"
};
const _hoisted_4 = { key: 2 };
const _hoisted_5 = {
  key: 3,
  class: "text-center text-lg text-gray-600"
};
const _sfc_main = {
  __name: "NewsPageContainer",
  setup(__props) {
    const news = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = ref(5);
    const startDateFilter = ref(null);
    const endDateFilter = ref(null);
    const defaultStartDate = ref(null);
    const defaultEndDate = ref(null);
    onMounted(async () => {
      try {
        const jsonUrl = `${"./"}assets/data/news.json`;
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        news.value = data.news.map((item) => ({
          ...item,
          // Преобразуем timestamp в объект Date для удобства фильтрации
          dateObject: new Date(item.timestamp * 1e3)
        })).sort((a, b) => b.timestamp - a.timestamp);
        if (data.itemsPerPage) {
          itemsPerPage.value = data.itemsPerPage;
        }
        const today = /* @__PURE__ */ new Date();
        const oneMonthAgo = /* @__PURE__ */ new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        oneMonthAgo.setDate(1);
        defaultStartDate.value = oneMonthAgo;
        defaultEndDate.value = today;
        startDateFilter.value = defaultStartDate.value;
        endDateFilter.value = defaultEndDate.value;
        loading.value = false;
        console.log("NewsPageContainer: Данные загружены.", news.value.length, "новостей.");
        console.log("NewsPageContainer: Фильтр по умолчанию установлен: с", defaultStartDate.value, "по", defaultEndDate.value);
      } catch (e) {
        error.value = e.message;
        loading.value = false;
        console.error("NewsPageContainer: Ошибка загрузки данных:", e);
      }
    });
    const filteredNews = computed(() => {
      console.log("NewsPageContainer: Вычисляемое свойство filteredNews запущено.");
      console.log("NewsPageContainer: startDateFilter =", startDateFilter.value);
      console.log("NewsPageContainer: endDateFilter =", endDateFilter.value);
      if (!startDateFilter.value && !endDateFilter.value) {
        console.log("NewsPageContainer: Фильтры дат не установлены, возвращаем все новости.");
        return news.value;
      }
      return news.value.filter((item) => {
        const itemDate = new Date(item.dateObject.getFullYear(), item.dateObject.getMonth(), item.dateObject.getDate());
        const startFilterDate = startDateFilter.value ? new Date(startDateFilter.value.getFullYear(), startDateFilter.value.getMonth(), startDateFilter.value.getDate()) : null;
        const endFilterDate = endDateFilter.value ? new Date(endDateFilter.value.getFullYear(), endDateFilter.value.getMonth(), endDateFilter.value.getDate()) : null;
        if (endFilterDate) {
          endFilterDate.setDate(endFilterDate.getDate() + 1);
        }
        const startMatch = startFilterDate ? itemDate >= startFilterDate : true;
        const endMatch = endFilterDate ? itemDate < endFilterDate : true;
        return startMatch && endMatch;
      });
    });
    const totalPages = computed(() => {
      console.log("NewsPageContainer: Вычисляемое свойство totalPages запущено. Filtered news count:", filteredNews.value.length);
      return Math.ceil(filteredNews.value.length / itemsPerPage.value);
    });
    const paginatedNews = computed(() => {
      console.log("NewsPageContainer: Вычисляемое свойство paginatedNews запущено. Current page:", currentPage.value, "Items per page:", itemsPerPage.value);
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredNews.value.slice(start, end);
    });
    const updateCurrentPage = (page) => {
      console.log("NewsPageContainer: updateCurrentPage вызван, новая страница:", page);
      currentPage.value = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleDateRangeChanged = (payload) => {
      console.log("NewsPageContainer: handleDateRangeChanged вызван с payload:", payload);
      startDateFilter.value = payload.start || null;
      endDateFilter.value = payload.end || null;
      currentPage.value = 1;
      console.log("NewsPageContainer: Фильтры дат установлены: startDateFilter=", startDateFilter.value, "endDateFilter=", endDateFilter.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(DateRangeFilter, {
          onDateRangeChanged: handleDateRangeChanged,
          initialStartDate: defaultStartDate.value,
          initialEndDate: defaultEndDate.value,
          class: "my-20"
        }, null, 8, ["initialStartDate", "initialEndDate"]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2, "Загрузка новостей...")) : error.value ? (openBlock(), createElementBlock("div", _hoisted_3, "Ошибка при загрузке новостей: " + toDisplayString(error.value), 1)) : paginatedNews.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(NewsGrid, { newsItems: paginatedNews.value }, null, 8, ["newsItems"]),
          createVNode(NewsPagination, {
            currentPage: currentPage.value,
            totalPages: totalPages.value,
            "onUpdate:currentPage": updateCurrentPage
          }, null, 8, ["currentPage", "totalPages"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_5, "Нет новостей, соответствующих вашим критериям."))
      ]);
    };
  }
};
const NewsPageContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-54bb1d17"]]);
const newsPageApp = createApp(NewsPageContainer);
const newsPageElement = document.getElementById("news-page-app");
if (newsPageElement) {
  newsPageApp.mount(newsPageElement);
}
