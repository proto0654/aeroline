import "./chunks/global-modal-BuE9KR4J.js";
import "./mainJs-CNnx_5Px.js";
import "./globalUiJs-CiezMbV9.js";
import { F as defineComponent, r as ref, y as onMounted, s as computed, c as createElementBlock, o as openBlock, b as createBaseVNode, a as createVNode, Q as withCtx, D as normalizeClass, t as toDisplayString, U as withDirectives, V as vModelText, e as createCommentVNode, E as createApp } from "./chunks/runtime-dom.esm-bundler-C8J7FHpO.js";
import { c as createPinia } from "./chunks/globalModal--1m5qnLi.js";
import { E as EasyDataTableWrapper } from "./chunks/EasyDataTableWrapper-ClDh7Byd.js";
import { D as DeleteConfirmModal } from "./chunks/DeleteConfirmModal-B6hdeSlr.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
const _hoisted_1 = { class: "mb-4 flex justify-between items-center flex-wrap gap-2" };
const _hoisted_2 = { class: "flex gap-3 justify-center" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "text-brand-gray" };
const _hoisted_7 = { class: "text-brand-gray" };
const _hoisted_8 = { class: "text-brand-gray" };
const _hoisted_9 = { class: "text-brand-gray" };
const _hoisted_10 = { class: "text-brand-gray" };
const _hoisted_11 = { class: "text-brand-gray" };
const _hoisted_12 = { class: "flex flex-wrap gap-2 mt-4 mb-4" };
const _hoisted_13 = { class: "flex items-center gap-2 mb-4" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OrdersPage",
  setup(__props) {
    const initialItems = ref([]);
    const activeTab = ref("all");
    const selectedItems = ref([]);
    const showFilterPanel = ref(false);
    const searchValue = ref("");
    onMounted(() => {
      if (window.initialData && window.initialData.orders) {
        initialItems.value = window.initialData.orders.map((item) => ({ ...item, id: item.id || Date.now() + Math.random() }));
      }
    });
    const headers = ref([
      { text: "Действия", value: "actions", sortable: false, width: 40 },
      { text: "Номер заказа", value: "number", sortable: true },
      { text: "Создан", value: "created", sortable: true, width: 40 },
      { text: "Откуда", value: "from", sortable: false },
      { text: "Куда", value: "to", sortable: false },
      { text: "Забран", value: "pickupDate", sortable: true, width: 40 },
      { text: "Доставлен", value: "deliveryDate", sortable: true, width: 40 },
      { text: "Статус", value: "status", sortable: true, width: 40 }
    ]);
    const tabFilteredItems = computed(() => {
      if (activeTab.value === "all") return initialItems.value;
      return initialItems.value.filter((item) => item.status === activeTab.value);
    });
    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };
    const toggleFilterPanel = () => {
      showFilterPanel.value = !showFilterPanel.value;
      alert("Функционал фильтрации будет реализован в следующих версиях");
    };
    const openCreateModal = async () => {
      try {
        alert("Функционал создания заказа будет реализован в следующих версиях");
      } catch (error) {
        console.error("Create Modal cancelled:", error);
      }
    };
    const openDeleteModal = async (item) => {
      try {
        const result = await window.globalModalStore.openModal(
          DeleteConfirmModal,
          {
            title: "Удалить заказ?",
            message: `Вы действительно хотите удалить заказ ${item.number}?`,
            confirmButtonText: "Удалить",
            item
          },
          "default"
        );
        if (result && result.type === "success" && result.data && result.data.success) {
          const index = initialItems.value.findIndex((order) => order.id === item.id);
          if (index !== -1) {
            initialItems.value.splice(index, 1);
          }
          alert("Заказ успешно удален (имитация).");
        }
      } catch (error) {
        console.error("Delete Modal cancelled:", error);
      }
    };
    const openDeleteSelectedModal = async () => {
      try {
        const result = await window.globalModalStore.openModal(
          DeleteConfirmModal,
          {
            title: "Удалить выбранные заказы?",
            message: `Вы действительно хотите удалить выбранные заказы (${selectedItems.value.length})?`,
            confirmButtonText: "Удалить",
            item: selectedItems.value
          },
          "default"
        );
        if (result && result.type === "success" && result.data && result.data.success) {
          const selectedIds = selectedItems.value.map((item) => item.id);
          initialItems.value = initialItems.value.filter((item) => !selectedIds.includes(item.id));
          selectedItems.value = [];
          alert("Выбранные заказы успешно удалены (имитация).");
        }
      } catch (error) {
        console.error("Delete Selected Modal cancelled:", error);
      }
    };
    const viewOrderDetails = (item) => {
      alert(`Просмотр деталей заказа ${item.number} будет реализован в следующих версиях`);
    };
    const trackOrder = (item) => {
      alert(`Отслеживание заказа ${item.number} будет реализовано в следующих версиях`);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", { class: "flex items-stretch md:items-center justify-end w-full mb-4 mt-2" }, [
          createBaseVNode("button", {
            type: "button",
            id: "create-btn",
            class: "btn btn-primary rounded-xl px-8 my-5 py-3 font-semibold shadow",
            onClick: openCreateModal
          }, " Создать ")
        ]),
        createVNode(EasyDataTableWrapper, {
          "items-selected": selectedItems.value,
          "onUpdate:itemsSelected": _cache[1] || (_cache[1] = ($event) => selectedItems.value = $event),
          headers: headers.value,
          items: tabFilteredItems.value,
          searchable: true,
          "search-field": "number",
          "search-value": searchValue.value,
          selectable: true,
          "show-index": false
        }, {
          search: withCtx(() => [
            createBaseVNode("div", _hoisted_1, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchValue.value = $event),
                type: "text",
                placeholder: "Поиск по номеру заказа",
                class: "input input-bordered w-full max-w-xs"
              }, null, 512), [
                [vModelText, searchValue.value]
              ])
            ])
          ]),
          "item-actions": withCtx((item) => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("button", {
                class: "info-btn text-brand-blue hover:text-brand-blue-dark transition-colors",
                onClick: ($event) => viewOrderDetails(item)
              }, _cache[7] || (_cache[7] = [
                createBaseVNode("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createBaseVNode("path", {
                    d: "M10.0003 3.33398C5.83366 3.33398 2.27533 6.15065 0.833664 10.0007C2.27533 13.8507 5.83366 16.6673 10.0003 16.6673C14.167 16.6673 17.7253 13.8507 19.167 10.0007C17.7253 6.15065 14.167 3.33398 10.0003 3.33398Z",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createBaseVNode("path", {
                    d: "M10 13.334C11.8409 13.334 13.3333 11.8415 13.3333 10.0007C13.3333 8.15979 11.8409 6.66732 10 6.66732C8.15905 6.66732 6.66667 8.15979 6.66667 10.0007C6.66667 11.8415 8.15905 13.334 10 13.334Z",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)
              ]), 8, _hoisted_3),
              createBaseVNode("button", {
                class: "track-btn text-brand-green hover:text-brand-green-dark transition-colors",
                onClick: ($event) => trackOrder(item)
              }, _cache[8] || (_cache[8] = [
                createBaseVNode("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createBaseVNode("path", {
                    d: "M10.0003 17.5007C14.167 17.5007 17.5003 14.1673 17.5003 10.0007C17.5003 5.83398 14.167 2.50065 10.0003 2.50065C5.83366 2.50065 2.50033 5.83398 2.50033 10.0007C2.50033 14.1673 5.83366 17.5007 10.0003 17.5007Z",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createBaseVNode("path", {
                    d: "M9.99967 6.66732V10.0007",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createBaseVNode("path", {
                    d: "M8.33301 2.5H11.6663",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createBaseVNode("path", {
                    d: "M9.99967 10.0007L13.333 13.334",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)
              ]), 8, _hoisted_4),
              createBaseVNode("button", {
                class: "delete-btn text-red-500 hover:text-red-700 transition-colors",
                onClick: ($event) => openDeleteModal(item)
              }, _cache[9] || (_cache[9] = [
                createBaseVNode("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    d: "M11.9 1.66602C12.2498 1.66611 12.5907 1.77625 12.8744 1.98086C13.1581 2.18546 13.3703 2.47414 13.4808 2.80602L13.7947 3.74935H12.0387L11.9 3.33268H8.1L7.96125 3.74935H6.2053L6.51917 2.80602C6.62975 2.47401 6.84203 2.18523 7.12592 1.98061C7.4098 1.776 7.75089 1.66593 8.10083 1.66602H11.9ZM12.1775 4.16602H7.8225H6.06667H3.33333C3.11232 4.16602 2.90036 4.25381 2.74408 4.41009C2.5878 4.56637 2.5 4.77834 2.5 4.99935C2.5 5.22036 2.5878 5.43232 2.74408 5.5886C2.90036 5.74488 3.11232 5.83268 3.33333 5.83268L3.33583 5.89102L4.05833 16.011C4.10342 16.6415 4.38569 17.2315 4.84831 17.6623C5.31092 18.0931 5.91955 18.3326 6.55167 18.3327H13.4483C14.0805 18.3326 14.6891 18.0931 15.1517 17.6623C15.6143 17.2315 15.8966 16.6415 15.9417 16.011L16.6642 5.89185L16.6667 5.83268C16.8877 5.83268 17.0996 5.74488 17.2559 5.5886C17.4122 5.43232 17.5 5.22036 17.5 4.99935C17.5 4.77834 17.4122 4.56637 17.2559 4.41009C17.0996 4.25381 16.8877 4.16602 16.6667 4.16602H13.9333H12.1775ZM14.9975 5.83268H5.0025L5.72083 15.8918C5.73579 16.102 5.82981 16.2987 5.98397 16.4424C6.13812 16.586 6.34096 16.6659 6.55167 16.666H13.4483C13.659 16.6659 13.8619 16.586 14.016 16.4424C14.1702 16.2987 14.2642 16.102 14.2792 15.8918L14.9975 5.83268Z",
                    fill: "#D64877"
                  }),
                  createBaseVNode("rect", {
                    x: "7.60938",
                    y: "8.33398",
                    width: "7.5",
                    height: "1.33333",
                    rx: "0.666667",
                    transform: "rotate(45 7.60938 8.33398)",
                    fill: "#D64877"
                  }),
                  createBaseVNode("rect", {
                    width: "7.5",
                    height: "1.33333",
                    rx: "0.666667",
                    transform: "matrix(-0.707107 0.707107 0.707107 0.707107 11.9697 8.33398)",
                    fill: "#D64877"
                  })
                ], -1)
              ]), 8, _hoisted_5)
            ])
          ]),
          "item-number": withCtx((item) => [
            createBaseVNode("span", _hoisted_6, toDisplayString(item.number), 1)
          ]),
          "item-created": withCtx((item) => [
            createBaseVNode("span", _hoisted_7, toDisplayString(item.created), 1)
          ]),
          "item-from": withCtx((item) => [
            createBaseVNode("span", _hoisted_8, toDisplayString(item.from.region) + ", " + toDisplayString(item.from.city), 1)
          ]),
          "item-to": withCtx((item) => [
            createBaseVNode("span", _hoisted_9, toDisplayString(item.to.region) + ", " + toDisplayString(item.to.city), 1)
          ]),
          "item-pickupDate": withCtx((item) => [
            createBaseVNode("span", _hoisted_10, toDisplayString(item.pickupDate), 1)
          ]),
          "item-deliveryDate": withCtx((item) => [
            createBaseVNode("span", _hoisted_11, toDisplayString(item.deliveryDate), 1)
          ]),
          "item-status": withCtx((item) => [
            createBaseVNode("span", {
              class: normalizeClass(["text-brand-gray font-medium", {
                "text-yellow-500": item.status === "СОЗДАН",
                "text-blue-500": item.status === "В ПУТИ",
                "text-green-500": item.status === "ГОТОВ К ВЫДАЧЕ",
                "text-red-500": item.status === "НД"
              }])
            }, toDisplayString(item.status), 3)
          ]),
          _: 1
        }, 8, ["items-selected", "headers", "items", "search-value"]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("button", {
            class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "all", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "all" }]),
            onClick: _cache[2] || (_cache[2] = ($event) => setActiveTab("all"))
          }, "ВСЕ", 2),
          createBaseVNode("button", {
            class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "СОЗДАН", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "СОЗДАН" }]),
            onClick: _cache[3] || (_cache[3] = ($event) => setActiveTab("СОЗДАН"))
          }, "СОЗДАН", 2),
          createBaseVNode("button", {
            class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "В ПУТИ", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "В ПУТИ" }]),
            onClick: _cache[4] || (_cache[4] = ($event) => setActiveTab("В ПУТИ"))
          }, "В ПУТИ", 2),
          createBaseVNode("button", {
            class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "ГОТОВ К ВЫДАЧЕ", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "ГОТОВ К ВЫДАЧЕ" }]),
            onClick: _cache[5] || (_cache[5] = ($event) => setActiveTab("ГОТОВ К ВЫДАЧЕ"))
          }, "ГОТОВ К ВЫДАЧЕ", 2),
          createBaseVNode("button", {
            class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "НД", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "НД" }]),
            onClick: _cache[6] || (_cache[6] = ($event) => setActiveTab("НД"))
          }, "НД", 2)
        ]),
        createBaseVNode("div", _hoisted_13, [
          selectedItems.value.length > 0 ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "btn btn-sm btn-error text-white rounded-xl px-4 font-semibold shadow",
            onClick: openDeleteSelectedModal
          }, " Удалить выбранные (" + toDisplayString(selectedItems.value.length) + ") ", 1)) : createCommentVNode("", true),
          createBaseVNode("button", {
            class: "btn btn-sm btn-ghost border border-gray-200 text-gray-700 rounded-xl px-4 font-semibold shadow-sm",
            onClick: toggleFilterPanel
          }, " Использовать фильтр ")
        ])
      ]);
    };
  }
});
const OrdersPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d53e365"]]);
const app = createApp(OrdersPage);
const pinia = createPinia();
app.use(pinia);
app.mount("#orders-table-app");
