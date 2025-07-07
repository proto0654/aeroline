import "./chunks/global-modal-BuE9KR4J.js";
import "./mainJs-Dz3psANh.js";
import "./globalUiJs-CiezMbV9.js";
import { c as createElementBlock, o as openBlock, b as createBaseVNode, U as withDirectives, V as vModelText, f as withModifiers, $ as resolveComponent, e as createCommentVNode, K as Fragment, L as renderList, D as normalizeClass, a as createVNode, t as toDisplayString, E as createApp } from "./chunks/runtime-dom.esm-bundler-C8J7FHpO.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/globalModal--1m5qnLi.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
const _imports_0$1 = "" + new URL("../img/search-CYPbi9xb.svg", import.meta.url).href;
const _sfc_main$4 = {
  props: {
    initialOrderNumber: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      orderNumber: this.initialOrderNumber || ""
    };
  },
  watch: {
    initialOrderNumber(newVal) {
      if (newVal) {
        this.orderNumber = newVal;
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit("search", this.orderNumber);
    }
  }
};
const _hoisted_1$4 = { class: "flex items-center rounded-lg grow px-1" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("form", {
    class: "form form-dark flex flex-row w-full gap-2",
    onSubmit: _cache[1] || (_cache[1] = withModifiers((...args) => $options.submitForm && $options.submitForm(...args), ["prevent"]))
  }, [
    createBaseVNode("div", _hoisted_1$4, [
      withDirectives(createBaseVNode("input", {
        type: "text",
        placeholder: "Номер заказа",
        class: "border border-gray-200 px-4 py-3 w-full focus:outline-none text-body-secondary focus:border-gray!",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.orderNumber = $event)
      }, null, 512), [
        [vModelText, $data.orderNumber]
      ])
    ]),
    _cache[2] || (_cache[2] = createBaseVNode("button", { class: "btn-gray px-3 py-2 rounded-lg text-white flex flex-rows items-center justify-center gap-1 min-w-[3em] text-buttons" }, [
      createBaseVNode("img", {
        src: _imports_0$1,
        alt: "Поиск",
        class: "w-6 h-6"
      })
    ], -1))
  ], 32);
}
const OrderTrackingForm = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const iconCreated = "" + new URL("../img/component-1-1-CN7DWFsZ.svg", import.meta.url).href;
const iconReceived = "" + new URL("../img/component-1-2-mR4BVpBn.svg", import.meta.url).href;
const iconDefault = "" + new URL("../img/component-1-D8YgY9xC.svg", import.meta.url).href;
const _sfc_main$3 = {
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    iconSrc() {
      const iconMap = {
        "ЗС": iconCreated,
        // Создан
        "ГЗ": iconReceived,
        // Груз получен (Ожидаем)
        "ЗП": iconDefault
        // В пути (используем пока эту)
      };
      return iconMap[this.status] || iconDefault;
    }
  }
};
const _hoisted_1$3 = ["src", "alt"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("img", {
    src: $options.iconSrc,
    alt: $props.status,
    class: "w-18 h-18"
  }, null, 8, _hoisted_1$3);
}
const StatusIcon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  components: {
    StatusIcon
  },
  props: {
    tracking: {
      type: Array,
      required: true
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        "ГЗ": "Груз получен",
        "ЗП": "Заказ в пути",
        "ЗС": "Заказ создан"
        // Add other statuses here
      };
      return statusMap[status] || status;
    }
  }
};
const _hoisted_1$2 = { class: "md:basis-2/5 w-full bg-brand-light rounded-xl p-6 md:p-8 flex flex-col gap-6 mx-auto md:mx-0" };
const _hoisted_2$2 = { class: "flex flex-col gap-0.5 relative" };
const _hoisted_3$2 = {
  key: 0,
  class: "absolute left-6 top-12 bottom-12 w-0.5 border-l-2 border-dashed border-gray-400 z-0"
};
const _hoisted_4$2 = { class: "w-12 h-12 flex items-center justify-center bg-white rounded-[10px] shadow" };
const _hoisted_5$2 = { class: "font-bold text-gray-800 uppercase" };
const _hoisted_6$2 = { class: "text-xs text-gray-600" };
const _hoisted_7$2 = {
  key: 0,
  class: "text-xs text-gray-600"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_status_icon = resolveComponent("status-icon");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      $props.tracking && $props.tracking.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_3$2)) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.tracking, (status, index) => {
        return openBlock(), createElementBlock("div", {
          key: index,
          class: normalizeClass(["flex items-center gap-3 relative z-10", { "mt-10": index > 0 }])
        }, [
          createBaseVNode("div", _hoisted_4$2, [
            createVNode(_component_status_icon, {
              status: status.stateCurrent
            }, null, 8, ["status"])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_5$2, toDisplayString($options.getStatusText(status.stateCurrent)), 1),
            createBaseVNode("div", _hoisted_6$2, toDisplayString(status.date), 1),
            status.city ? (openBlock(), createElementBlock("div", _hoisted_7$2, toDisplayString(status.city), 1)) : createCommentVNode("", true)
          ])
        ], 2);
      }), 128))
    ])
  ]);
}
const OrderTrackingStatus = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = {
  props: {
    order: {
      type: Object,
      required: true
    }
  }
};
const _hoisted_1$1 = { class: "md:basis-3/5 w-full p-2 md:p-6 flex flex-col gap-6" };
const _hoisted_2$1 = { class: "bg-white rounded-xl p-4" };
const _hoisted_3$1 = { class: "flex flex-col md:flex-row p-4 gap-4" };
const _hoisted_4$1 = { class: "flex-1" };
const _hoisted_5$1 = { class: "font-semibold text-body-secondary leading-1.2" };
const _hoisted_6$1 = { class: "flex-1" };
const _hoisted_7$1 = { class: "font-semibold text-brand-gray text-body-secondary leading-1.2" };
const _hoisted_8 = { class: "overflow-x-auto" };
const _hoisted_9 = { class: "table w-full table-zebra" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("div", _hoisted_3$1, [
        createBaseVNode("div", _hoisted_4$1, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-xs text-gray-400 mb-1" }, "Пункт отправления", -1)),
          createBaseVNode("div", _hoisted_5$1, toDisplayString($props.order.from), 1)
        ]),
        createBaseVNode("div", _hoisted_6$1, [
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-xs text-gray-400 mb-1" }, "Пункт назначения", -1)),
          createBaseVNode("div", _hoisted_7$1, toDisplayString($props.order.to), 1)
        ])
      ]),
      createBaseVNode("div", _hoisted_8, [
        createBaseVNode("table", _hoisted_9, [
          createBaseVNode("tbody", null, [
            createBaseVNode("tr", null, [
              _cache[2] || (_cache[2] = createBaseVNode("td", { class: "font-medium text-brand-gray" }, "Номер заказа", -1)),
              createBaseVNode("td", null, toDisplayString($props.order.orderNumber), 1),
              _cache[3] || (_cache[3] = createBaseVNode("td", { class: "font-medium text-brand-gray" }, "Номер ТН", -1)),
              createBaseVNode("td", null, toDisplayString($props.order.invoiceNumber), 1)
            ]),
            createBaseVNode("tr", null, [
              _cache[4] || (_cache[4] = createBaseVNode("td", { class: "font-medium text-brand-gray" }, "Номер заказа клиента", -1)),
              createBaseVNode("td", null, toDisplayString($props.order.additionalCheck), 1),
              _cache[5] || (_cache[5] = createBaseVNode("td", { class: "font-medium text-brand-gray" }, "Количество мест", -1)),
              createBaseVNode("td", null, toDisplayString($props.order.numberSeats), 1)
            ]),
            createBaseVNode("tr", null, [
              _cache[6] || (_cache[6] = createBaseVNode("td", { class: "font-medium text-brand-gray" }, "Вес, кг", -1)),
              createBaseVNode("td", null, toDisplayString($props.order.weight), 1),
              _cache[7] || (_cache[7] = createBaseVNode("td", { class: "font-medium text-brand-gray" }, "Объем, куб.м.", -1)),
              createBaseVNode("td", null, toDisplayString($props.order.volume), 1)
            ])
          ])
        ])
      ])
    ])
  ]);
}
const OrderTrackingDetails = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _imports_0 = "" + new URL("../img/order-tracking-img-CkPtxPsa.png", import.meta.url).href;
const _sfc_main = {
  components: {
    OrderTrackingForm,
    OrderTrackingStatus,
    OrderTrackingDetails
  },
  data() {
    return {
      order: null,
      loading: false,
      error: null,
      orderNumberFromUrl: null
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.orderNumberFromUrl = urlParams.get("orderNumber");
    if (this.orderNumberFromUrl) {
      this.handleSearch(this.orderNumberFromUrl);
    }
  },
  methods: {
    async handleSearch(orderNumber) {
      if (!orderNumber) {
        alert("Пожалуйста, введите номер заказа");
        return;
      }
      this.loading = true;
      this.error = null;
      this.order = null;
      try {
        const response = await fetch(`https://185.225.35.11/getclientpurchase/?orderNumber=${orderNumber}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Заказ не найден. Проверьте правильность номера.");
          }
          throw new Error("Произошла ошибка при загрузке данных.");
        }
        const data = await response.json();
        this.order = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
const _hoisted_1 = { class: "relative z-10" };
const _hoisted_2 = { class: "bg-brand-light rounded-2xl flex flex-col" };
const _hoisted_3 = { class: "flex flex-col-reverse md:flex-row gap-6 items-stretch" };
const _hoisted_4 = { class: "md:basis-2/5 w-full flex flex-col justify-center p-4 md:p-8" };
const _hoisted_5 = {
  key: 0,
  class: "text-center p-8"
};
const _hoisted_6 = {
  key: 1,
  class: "text-center p-8 text-red-500"
};
const _hoisted_7 = {
  key: 2,
  class: "flex flex-col md:flex-row gap-2 relative z-1 bg-brand-light rounded-2xl"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_order_tracking_form = resolveComponent("order-tracking-form");
  const _component_order_tracking_status = resolveComponent("order-tracking-status");
  const _component_order_tracking_details = resolveComponent("order-tracking-details");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("section", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            _cache[0] || (_cache[0] = createBaseVNode("h2", { class: "text-h5 md:text-h4 font-bold text-brand-gray mb-4" }, "Отследить посылку", -1)),
            createVNode(_component_order_tracking_form, {
              onSearch: $options.handleSearch,
              "initial-order-number": $data.orderNumberFromUrl
            }, null, 8, ["onSearch", "initial-order-number"]),
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "relative mt-2 w-full" }, [
              createBaseVNode("span", {
                class: "text-sm text-base-content underline cursor-pointer tooltip tooltip-bottom block w-full md:w-auto md:max-w-[20rem] xl:inline-block",
                id: "order-hint-trigger",
                "data-tip": "Обычно номер заказа можно найти в СМС, email, или в личном кабинете.\nЕсли у вас нет номера заказа — запросите его у продавца или отправителя.",
                tabindex: "0"
              }, " Где найти номер заказа? ")
            ], -1))
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "md:basis-3/5 w-full flex items-center justify-center" }, [
            createBaseVNode("img", {
              src: _imports_0,
              alt: "Грузовик и коробки",
              class: "md:max-h-[250px] object-cover md:object-right rounded-2xl w-full md:max-w-full object-contain"
            })
          ], -1))
        ])
      ])
    ]),
    $data.loading ? (openBlock(), createElementBlock("div", _hoisted_5, _cache[3] || (_cache[3] = [
      createBaseVNode("p", null, "Загрузка...", -1)
    ]))) : createCommentVNode("", true),
    $data.error ? (openBlock(), createElementBlock("div", _hoisted_6, [
      createBaseVNode("p", null, toDisplayString($data.error), 1)
    ])) : createCommentVNode("", true),
    $data.order ? (openBlock(), createElementBlock("section", _hoisted_7, [
      createVNode(_component_order_tracking_status, {
        tracking: $data.order.tracking
      }, null, 8, ["tracking"]),
      createVNode(_component_order_tracking_details, { order: $data.order }, null, 8, ["order"])
    ])) : createCommentVNode("", true)
  ]);
}
const OrderTrackingPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
document.addEventListener("DOMContentLoaded", () => {
  const appElement = document.getElementById("order-tracking-app");
  if (appElement) {
    const app = createApp(OrderTrackingPage);
    app.mount(appElement);
  }
});
