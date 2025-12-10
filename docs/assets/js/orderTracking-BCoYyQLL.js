import "./chunks/modulepreload-polyfill-DaKOjhqt.js";
import "./mainJs-BsNWYi9M.js";
import "./globalPiniaJs-BmmD8Mpg.js";
import "./globalModalJs-Vuiuh3zT.js";
import "./globalUiJs-CR_EC2SH.js";
import { v as vModelText, w as withModifiers, c as createApp } from "./chunks/runtime-dom.esm-bundler-DT6Q_ZxL.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import { a as createElementBlock, o as openBlock, b as createBaseVNode, a1 as withDirectives, ar as resolveComponent, $ as createCommentVNode, F as Fragment, a4 as renderList, a7 as normalizeClass, d as createVNode, t as toDisplayString, _ as createTextVNode } from "./chunks/runtime-core.esm-bundler-xz8C70T0.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
import "./chunks/pinia-BykoCM9g.js";
import "./chunks/globalModal-DEHeP1wE.js";
import "./chunks/auth-BfnmLw6b.js";
import "./chunks/TextInput-r96FTHSo.js";
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
const iconCreated = "" + new URL("../img/folder-plus-CMAG_r68.svg", import.meta.url).href;
const iconMessageDots = "" + new URL("../img/message-dots-CN7DWFsZ.svg", import.meta.url).href;
const iconDenied = "" + new URL("../img/denied-mR4BVpBn.svg", import.meta.url).href;
const iconTrouble = "" + new URL("../img/trouble-Cvl3i24o.svg", import.meta.url).href;
const iconTruckFast = "" + new URL("../img/truck-fast-HdQ00Q51.svg", import.meta.url).href;
const iconPvz = "" + new URL("../img/pvz-Dl8vKBnA.svg", import.meta.url).href;
const iconChecked = "" + new URL("../img/checked-KxLizkFk.svg", import.meta.url).href;
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
        "ДП": iconTrouble,
        // Вручен с проблемой
        "ПГ": iconTrouble,
        // Проблемный груз
        "ЧС": iconTrouble,
        // Часть груза находится на складе
        "ЧД": iconTrouble,
        // Груз частично доставлен
        "СП": iconMessageDots,
        // Ожидаем груз от отправителя
        "ПД": iconMessageDots,
        // Доставка согласована
        "ЗП": iconTruckFast,
        // Заказ назначен на маршрут
        "ГЗ": iconTruckFast,
        // Груз забран у отправителя
        "ГП": iconTruckFast,
        // Груз забран у отправителя
        "ПП": iconTruckFast,
        // Груз передан на перевозку
        "ДН": iconTruckFast,
        // Назначен на доставку
        "КД": iconTruckFast,
        // Передан на доставку получателю
        "ОК": iconChecked,
        // Вручен
        "НВ": iconDenied,
        // Заказ отменен
        "ОС": iconDenied,
        // Ошибка сортировки
        "НД": iconDenied,
        // Груз не доставлен
        "ГС": iconPvz,
        // Груз находится на складе
        "СВ": iconPvz,
        // Готов к выдаче
        "ЗС": iconCreated
        // Заказ создан
      };
      return iconMap[this.status] || iconDenied;
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
  data() {
    return {
      openGroups: {}
      // To manage the open/closed state of grouped events
    };
  },
  computed: {
    preparedTracking() {
      const result = [];
      let inTransitGroups = [];
      for (const item of this.tracking) {
        if (!item.group) {
          if (inTransitGroups.length > 0) {
            result.push({
              type: "in-transit",
              groups: inTransitGroups
            });
            inTransitGroups = [];
          }
          result.push({ type: "status", ...item });
        } else if (item.events.length === 1) {
          const event = item.events[0];
          if (event.stateCurrent === "СВ") {
            if (inTransitGroups.length > 0) {
              result.push({
                type: "in-transit",
                groups: inTransitGroups
              });
              inTransitGroups = [];
            }
            result.push({
              type: "group-single",
              city: item.city,
              event
            });
          } else {
            if (inTransitGroups.length > 0) {
              result.push({
                type: "in-transit",
                groups: inTransitGroups
              });
              inTransitGroups = [];
            }
            result.push({
              type: "status",
              ...event,
              city: item.city
            });
          }
        } else if (item.events.length > 1) {
          inTransitGroups.push({
            city: item.city,
            events: item.events
          });
        }
      }
      if (inTransitGroups.length > 0) {
        result.push({
          type: "in-transit",
          groups: inTransitGroups
        });
      }
      return result;
    }
  },
  methods: {
    toggleGroup(index) {
      this.openGroups[index] = !this.openGroups[index];
      this.$forceUpdate();
    },
    getStatusText(status) {
      const statusMap = {
        "ДП": "Вручен с проблемой",
        "ЗС": "Заказ создан",
        "СП": "Ожидаем груз от отправителя",
        "ЗП": "Заказ назначен на маршрут",
        "ГЗ": "Груз забран у отправителя",
        "ГС": "Груз находится на складе",
        "ПП": "Груз передан на перевозку",
        "ГП": "Груз прибыл в город назначения",
        "ДН": "Назначен на доставку",
        "КД": "Передан на доставку получателю",
        "НД": "Груз не доставлен",
        "ПД": "Доставка согласована",
        "ОК": "Вручен",
        "НВ": "Заказ отменен",
        "ПГ": "Проблемный груз",
        "СВ": "Готов к выдаче",
        "ТО": "Принят в сортировочном центре отправителя",
        "ЧС": "Часть груза находится на складе",
        "ОС": "Ошибка сортировки",
        "ЧД": "Груз частично доставлен"
      };
      return statusMap[status] || status;
    },
    formatAdditionalInfo(status, additionalInfo) {
      if (status === "ПГ" && additionalInfo) {
        return `Проблемный груз: ${additionalInfo}`;
      }
      if (status === "ОС" && additionalInfo) {
        return `Ошибка сортировки ${additionalInfo}`;
      }
      return additionalInfo;
    },
    getLastInTransitEvent(groups) {
      if (!groups || groups.length === 0) return null;
      let lastEvent = null;
      let lastDate = null;
      for (const group of groups) {
        for (const event of group.events) {
          const [date, time] = event.date.split(" ");
          const [d, m, y] = date.split(".");
          const jsDate = /* @__PURE__ */ new Date(`${y}-${m}-${d}T${time || "00:00"}`);
          if (!lastDate || jsDate > lastDate) {
            lastDate = jsDate;
            lastEvent = event;
          }
        }
      }
      return lastEvent;
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
const _hoisted_8$1 = {
  key: 1,
  class: "flex flex-col gap-1 relative z-10 mt-10"
};
const _hoisted_9$1 = { class: "flex items-center gap-3" };
const _hoisted_10$1 = { class: "w-12 h-12 flex items-center justify-center bg-white rounded-[10px] shadow" };
const _hoisted_11$1 = { class: "font-bold text-gray-800 uppercase" };
const _hoisted_12$1 = { class: "text-xs text-gray-600" };
const _hoisted_13$1 = ["onClick"];
const _hoisted_14$1 = { key: 0 };
const _hoisted_15$1 = { class: "font-bold text-brand-blue mb-1 ml-6 mt-2 pl-9 relative" };
const _hoisted_16$1 = { class: "border-l-2 border-dashed border-gray-300 ml-6 flex flex-col gap-3" };
const _hoisted_17$1 = { class: "pl-9 relative flex items-center gap-3" };
const _hoisted_18$1 = { class: "font-medium text-gray-900" };
const _hoisted_19$1 = { class: "text-xs text-gray-500" };
const _hoisted_20$1 = {
  key: 0,
  class: "text-xs text-gray-500"
};
const _hoisted_21$1 = {
  key: 2,
  class: "flex flex-col gap-1 relative z-10 mt-10"
};
const _hoisted_22 = { class: "flex items-start gap-3" };
const _hoisted_23 = { class: "w-12 h-12 flex items-center justify-center bg-white rounded-[10px] shadow" };
const _hoisted_24 = {
  key: 0,
  class: "text-xs text-gray-600"
};
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { key: 0 };
const _hoisted_27 = { class: "font-bold text-brand-blue mb-1 ml-6 mt-2 pl-9 relative" };
const _hoisted_28 = { class: "border-l-2 border-dashed border-gray-300 ml-6 flex flex-col gap-3" };
const _hoisted_29 = { class: "font-medium text-gray-900" };
const _hoisted_30 = { class: "text-xs text-gray-500" };
const _hoisted_31 = {
  key: 0,
  class: "text-xs text-gray-500"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_status_icon = resolveComponent("status-icon");
  const _component_StatusIcon = resolveComponent("StatusIcon");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      $props.tracking && $props.tracking.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_3$2)) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.preparedTracking, (item, index) => {
        return openBlock(), createElementBlock(Fragment, { key: index }, [
          item.type === "status" ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["flex items-start gap-3 relative z-10", { "mt-10": index > 0 }])
          }, [
            createBaseVNode("div", _hoisted_4$2, [
              createVNode(_component_status_icon, {
                status: item.stateCurrent
              }, null, 8, ["status"])
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_5$2, toDisplayString($options.getStatusText(item.stateCurrent)), 1),
              createBaseVNode("div", _hoisted_6$2, toDisplayString(item.date), 1),
              item.additionalInfo ? (openBlock(), createElementBlock("div", _hoisted_7$2, toDisplayString($options.formatAdditionalInfo(item.stateCurrent, item.additionalInfo)), 1)) : createCommentVNode("", true)
            ])
          ], 2)) : item.type === "group-single" ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
            createBaseVNode("div", _hoisted_9$1, [
              createBaseVNode("div", _hoisted_10$1, [
                createVNode(_component_status_icon, {
                  status: item.event.stateCurrent
                }, null, 8, ["status"])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_11$1, toDisplayString($options.getStatusText(item.event.stateCurrent)), 1),
                createBaseVNode("div", _hoisted_12$1, toDisplayString(item.event.date), 1),
                createBaseVNode("button", {
                  class: "flex items-center gap-1 text-brand-blue underline text-xs font-medium mt-1 ml-0 focus:outline-none",
                  onClick: withModifiers(($event) => $options.toggleGroup(index), ["stop"])
                }, [
                  createBaseVNode("span", null, toDisplayString($data.openGroups[index] ? "Скрыть" : "Подробнее"), 1),
                  (openBlock(), createElementBlock("svg", {
                    class: normalizeClass(["w-4 h-4 transition-transform", $data.openGroups[index] ? "rotate-180" : ""]),
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, _cache[0] || (_cache[0] = [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 9l-7 7-7-7"
                    }, null, -1)
                  ]), 2))
                ], 8, _hoisted_13$1)
              ])
            ]),
            $data.openGroups[index] ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
              createBaseVNode("div", _hoisted_15$1, [
                createTextVNode(toDisplayString(item.city) + " ", 1),
                _cache[1] || (_cache[1] = createBaseVNode("span", { class: "dot-timeline absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-blue z-10" }, null, -1))
              ]),
              createBaseVNode("div", _hoisted_16$1, [
                createBaseVNode("div", _hoisted_17$1, [
                  createBaseVNode("div", null, [
                    createBaseVNode("div", _hoisted_18$1, toDisplayString($options.getStatusText(item.event.stateCurrent)), 1),
                    createBaseVNode("div", _hoisted_19$1, toDisplayString(item.event.date), 1),
                    item.event.additionalInfo ? (openBlock(), createElementBlock("div", _hoisted_20$1, toDisplayString($options.formatAdditionalInfo(item.event.stateCurrent, item.event.additionalInfo)), 1)) : createCommentVNode("", true)
                  ])
                ])
              ])
            ])) : createCommentVNode("", true)
          ])) : item.type === "in-transit" ? (openBlock(), createElementBlock("div", _hoisted_21$1, [
            createBaseVNode("div", _hoisted_22, [
              createBaseVNode("div", _hoisted_23, [
                createVNode(_component_StatusIcon, { status: "ПП" })
              ]),
              createBaseVNode("div", null, [
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "font-bold text-gray-800 uppercase" }, "В пути", -1)),
                $options.getLastInTransitEvent(item.groups) ? (openBlock(), createElementBlock("div", _hoisted_24, toDisplayString($options.getLastInTransitEvent(item.groups).date), 1)) : createCommentVNode("", true),
                createBaseVNode("button", {
                  class: "flex items-center gap-1 text-brand-blue underline text-xs font-medium mt-1 ml-0 focus:outline-none",
                  onClick: withModifiers(($event) => $options.toggleGroup(index), ["stop"])
                }, [
                  createBaseVNode("span", null, toDisplayString($data.openGroups[index] ? "Скрыть" : "Подробнее"), 1),
                  (openBlock(), createElementBlock("svg", {
                    class: normalizeClass(["w-4 h-4 transition-transform", $data.openGroups[index] ? "rotate-180" : ""]),
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, _cache[2] || (_cache[2] = [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 9l-7 7-7-7"
                    }, null, -1)
                  ]), 2))
                ], 8, _hoisted_25)
              ])
            ]),
            $data.openGroups[index] ? (openBlock(), createElementBlock("div", _hoisted_26, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(item.groups, (group, gidx) => {
                return openBlock(), createElementBlock(Fragment, { key: gidx }, [
                  createBaseVNode("div", _hoisted_27, [
                    createTextVNode(toDisplayString(group.city) + " ", 1),
                    _cache[4] || (_cache[4] = createBaseVNode("span", { class: "dot-timeline absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-blue z-10" }, null, -1))
                  ]),
                  createBaseVNode("div", _hoisted_28, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group.events, (event, eventIdx) => {
                      return openBlock(), createElementBlock("div", {
                        key: eventIdx,
                        class: "pl-9 relative flex items-center gap-3"
                      }, [
                        createBaseVNode("div", null, [
                          createBaseVNode("div", _hoisted_29, toDisplayString($options.getStatusText(event.stateCurrent)), 1),
                          createBaseVNode("div", _hoisted_30, toDisplayString(event.date), 1),
                          event.additionalInfo ? (openBlock(), createElementBlock("div", _hoisted_31, toDisplayString($options.formatAdditionalInfo(event.stateCurrent, event.additionalInfo)), 1)) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
                  ])
                ], 64);
              }), 128))
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 64);
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
  },
  computed: {
    customerOrderNumberDisplay() {
      if (!this.order.customerOrderNumber || this.order.customerOrderNumber.trim() === "") {
        return "customerOrderNumber - не указан";
      }
      return this.order.customerOrderNumber;
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
const _hoisted_10 = { class: "flex flex-col" };
const _hoisted_11 = { class: "text-base font-medium text-gray-600" };
const _hoisted_12 = { class: "flex flex-col" };
const _hoisted_13 = { class: "text-base font-medium text-gray-600" };
const _hoisted_14 = { class: "flex flex-col" };
const _hoisted_15 = { class: "text-base font-medium text-gray-600" };
const _hoisted_16 = { class: "flex flex-col" };
const _hoisted_17 = { class: "text-base font-medium text-gray-600" };
const _hoisted_18 = { class: "flex flex-col" };
const _hoisted_19 = { class: "text-base font-medium text-gray-600" };
const _hoisted_20 = { class: "flex flex-col" };
const _hoisted_21 = { class: "text-base font-medium text-gray-600" };
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
              createBaseVNode("td", null, [
                createBaseVNode("div", _hoisted_10, [
                  _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-xs text-gray-500 mb-1" }, "Номер заказа", -1)),
                  createBaseVNode("div", _hoisted_11, toDisplayString($props.order.orderNumber), 1)
                ])
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("div", _hoisted_12, [
                  _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-xs text-gray-500 mb-1" }, "Номер ТН", -1)),
                  createBaseVNode("div", _hoisted_13, toDisplayString($props.order.invoiceNumber), 1)
                ])
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("div", _hoisted_14, [
                  _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-xs text-gray-500 mb-1" }, "Номер заказа клиента", -1)),
                  createBaseVNode("div", _hoisted_15, toDisplayString($options.customerOrderNumberDisplay), 1)
                ])
              ])
            ]),
            createBaseVNode("tr", null, [
              createBaseVNode("td", null, [
                createBaseVNode("div", _hoisted_16, [
                  _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-xs text-gray-500 mb-1" }, "Количество мест", -1)),
                  createBaseVNode("div", _hoisted_17, toDisplayString($props.order.numberSeats), 1)
                ])
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("div", _hoisted_18, [
                  _cache[6] || (_cache[6] = createBaseVNode("div", { class: "text-xs text-gray-500 mb-1" }, "Вес, кг", -1)),
                  createBaseVNode("div", _hoisted_19, toDisplayString($props.order.weight), 1)
                ])
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("div", _hoisted_20, [
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-xs text-gray-500 mb-1" }, "Объем, куб.м.", -1)),
                  createBaseVNode("div", _hoisted_21, toDisplayString($props.order.volume), 1)
                ])
              ])
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
        const response = await fetch(`https://08615a563fb9b4f8.mokky.dev/parcels?orderNumber=${orderNumber}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Заказ не найден. Проверьте правильность номера.");
          }
          throw new Error("Произошла ошибка при загрузке данных.");
        }
        const data = await response.json();
        if (!data || data.length === 0) {
          throw new Error("Заказ не найден. Проверьте правильность номера.");
        }
        const order = data.find((item) => item.orderNumber === orderNumber);
        if (!order) {
          throw new Error("Заказ не найден. Проверьте правильность номера.");
        }
        this.order = order;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    isNotFound() {
      return this.error === "Заказ не найден. Проверьте правильность номера.";
    },
    messageText() {
      if (this.error) {
        return this.isNotFound ? "Заказ не найден. Проверьте правильность номера или попробуйте другой номер." : this.error;
      }
      return "Загрузка...";
    }
  }
};
const _hoisted_1 = { class: "bg-brand-light rounded-2xl" };
const _hoisted_2 = { class: "relative z-10" };
const _hoisted_3 = { class: "flex flex-col" };
const _hoisted_4 = { class: "flex flex-col-reverse md:flex-row gap-6 items-stretch" };
const _hoisted_5 = { class: "md:basis-2/5 w-full flex flex-col justify-center p-4 md:p-8" };
const _hoisted_6 = {
  key: 0,
  class: "text-center p-20"
};
const _hoisted_7 = {
  key: 1,
  class: "flex flex-col md:flex-row-reverse gap-2 relative z-1 bg-brand-light"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_order_tracking_form = resolveComponent("order-tracking-form");
  const _component_order_tracking_details = resolveComponent("order-tracking-details");
  const _component_order_tracking_status = resolveComponent("order-tracking-status");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("section", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
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
              class: "md:max-h-[250px] object-cover md:object-right w-full md:max-w-full object-contain rounded-2xl"
            })
          ], -1))
        ])
      ])
    ]),
    $data.loading || $data.error ? (openBlock(), createElementBlock("div", _hoisted_6, [
      createBaseVNode("p", {
        class: normalizeClass(["text-h5", { "text-red-500": $data.error && !$options.isNotFound }])
      }, toDisplayString($options.messageText), 3)
    ])) : createCommentVNode("", true),
    $data.order ? (openBlock(), createElementBlock("section", _hoisted_7, [
      createVNode(_component_order_tracking_details, { order: $data.order }, null, 8, ["order"]),
      createVNode(_component_order_tracking_status, {
        tracking: $data.order.tracking
      }, null, 8, ["tracking"])
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
