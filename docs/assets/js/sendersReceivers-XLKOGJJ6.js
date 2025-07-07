import "./chunks/global-modal-CtLjFuPd.js";
import "./mainJs-B6nrBSwm.js";
import { d as useField, c as create$3, a as create$6, T as TextInput, B as BaseForm } from "./globalUiJs-CIMhq8JL.js";
import { s as computed, W as toRef, w as watch, c as createElementBlock, o as openBlock, e as createCommentVNode, b as createBaseVNode, t as toDisplayString, U as withDirectives, _ as vModelSelect, u as unref, B as mergeProps, i as isRef, K as Fragment, L as renderList, F as defineComponent, r as ref, a as createVNode, $ as vModelRadio, Q as withCtx, y as onMounted, D as normalizeClass, E as createApp } from "./chunks/runtime-dom.esm-bundler-BbrWZI0-.js";
import { c as createPinia } from "./chunks/globalModal-BF5JWlWX.js";
import { E as EasyDataTableWrapper } from "./chunks/EasyDataTableWrapper-zETKEiPm.js";
import { D as DeleteConfirmModal } from "./chunks/DeleteConfirmModal-pCpusVGU.js";
import { _ as _export_sfc } from "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/slider-q_NEEFv1.js";
import "./chunks/modal-manager-BXwv0V3q.js";
const _imports_0 = "" + new URL("../img/select-arrow-BP51TTpS.svg", import.meta.url).href;
const _hoisted_1$2 = ["for"];
const _hoisted_2$2 = { class: "relative" };
const _hoisted_3$2 = ["id", "disabled", "required"];
const _hoisted_4$2 = {
  key: 0,
  value: "",
  disabled: ""
};
const _hoisted_5$2 = ["value"];
const _hoisted_6$2 = {
  key: 0,
  class: "text-brand-red absolute right-8 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
};
const _hoisted_7$2 = {
  key: 1,
  class: "base-form-error"
};
const _hoisted_8$2 = {
  key: 2,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main$2 = {
  __name: "SelectInput",
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    id: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputId = computed(() => props.id || `select-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
    const {
      value: inputValue,
      errorMessage,
      handleBlur
    } = useField(props.name);
    const modelValue = toRef(props, "modelValue");
    watch(modelValue, (newValue) => {
      if (newValue !== inputValue.value) {
        inputValue.value = newValue;
      }
    });
    watch(inputValue, (newValue) => {
      if (newValue !== modelValue.value) {
        emit("update:modelValue", newValue);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: inputId.value,
          class: ""
        }, toDisplayString(__props.label), 9, _hoisted_1$2)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$2, [
          withDirectives(createBaseVNode("select", mergeProps({
            class: "vue-form-field appearance-none",
            id: inputId.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
            disabled: __props.disabled,
            required: __props.required
          }, _ctx.$attrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
            class: [
              unref(errorMessage) ? "border-red-500" : "",
              __props.disabled ? "bg-gray-100 cursor-not-allowed" : ""
            ]
          }), [
            __props.placeholder ? (openBlock(), createElementBlock("option", _hoisted_4$2, toDisplayString(__props.placeholder), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
              return openBlock(), createElementBlock("option", {
                key: option.value,
                value: option.value
              }, toDisplayString(option.label), 9, _hoisted_5$2);
            }), 128))
          ], 16, _hoisted_3$2), [
            [vModelSelect, unref(inputValue)]
          ]),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_6$2, "*")) : createCommentVNode("", true),
          _cache[2] || (_cache[2] = createBaseVNode("img", {
            src: _imports_0,
            alt: "",
            class: "absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          }, null, -1))
        ]),
        unref(errorMessage) ? (openBlock(), createElementBlock("p", _hoisted_7$2, toDisplayString(unref(errorMessage)), 1)) : __props.hint ? (openBlock(), createElementBlock("p", _hoisted_8$2, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const SelectInput = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ef7d8368"]]);
const _hoisted_1$1 = {
  class: "modal-content",
  style: { "min-width": "500px" }
};
const _hoisted_2$1 = { class: "text-h5 font-bold text-brand-gray mb-4 text-center" };
const _hoisted_3$1 = {
  role: "tablist",
  class: "tabs tabs-boxed mb-4"
};
const _hoisted_4$1 = { class: "form-fields" };
const _hoisted_5$1 = {
  key: 0,
  role: "tabpanel",
  class: "tab-content p-0"
};
const _hoisted_6$1 = { class: "form space-y-4" };
const _hoisted_7$1 = { class: "grid grid-cols-3 gap-4 mb-4" };
const _hoisted_8$1 = {
  key: 1,
  role: "tabpanel",
  class: "tab-content p-0"
};
const _hoisted_9$1 = { class: "form space-y-4" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CreateSenderReceiverForm",
  props: {
    title: {
      type: String,
      default: "Новый контакт"
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emit = __emit;
    const juridicalSchema = create$3({
      jurName: create$6().required("Наименование обязательно"),
      inn: create$6().optional(),
      kpp: create$6().optional(),
      ogrn: create$6().optional(),
      address: create$6().optional(),
      country: create$6().optional(),
      index: create$6().optional(),
      region: create$6().optional(),
      city: create$6().optional(),
      phone: create$6().required("Телефон обязателен"),
      // Обработка пустой строки для опционального email
      email: create$6().email("Некорректный email").transform((value) => value === "" ? void 0 : value).optional()
    });
    const physicalSchema = create$3({
      fio: create$6().required("ФИО обязательно"),
      phone: create$6().required("Телефон обязателен"),
      // Обработка пустой строки для опционального email
      email: create$6().email("Некорректный email").transform((value) => value === "" ? void 0 : value).optional()
    });
    const initialValues = computed(() => {
      const baseDefaults = {
        jurName: "",
        inn: "",
        kpp: "",
        ogrn: "",
        address: "",
        country: "",
        index: "",
        region: "",
        city: "",
        phone: "",
        email: "",
        fio: ""
      };
      return { ...baseDefaults, ...props.initialData };
    });
    const entityType = ref(((_a = props.initialData) == null ? void 0 : _a.entity_type) || "juridical");
    const validationSchema = ref(entityType.value === "juridical" ? juridicalSchema : physicalSchema);
    watch(entityType, (newEntityType) => {
      validationSchema.value = newEntityType === "juridical" ? juridicalSchema : physicalSchema;
    });
    const handleSubmit = async (values) => {
      console.log("Form submitted with values:", values);
      const dataToSubmit = {
        ...values,
        entity_type: entityType.value
      };
      emit("submit", dataToSubmit);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("h3", _hoisted_2$1, toDisplayString(__props.isEdit ? "Редактировать контакт" : "Новый контакт"), 1),
        createBaseVNode("div", _hoisted_3$1, [
          withDirectives(createBaseVNode("input", {
            type: "radio",
            name: "entity_type",
            role: "tab",
            class: "tab",
            "aria-label": "ЮР.ЛИЦО",
            value: "juridical",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => entityType.value = $event)
          }, null, 512), [
            [vModelRadio, entityType.value]
          ]),
          withDirectives(createBaseVNode("input", {
            type: "radio",
            name: "entity_type",
            role: "tab",
            class: "tab",
            "aria-label": "ФИЗ.ЛИЦО",
            value: "physical",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => entityType.value = $event)
          }, null, 512), [
            [vModelRadio, entityType.value]
          ])
        ]),
        createVNode(BaseForm, {
          "validation-schema": validationSchema.value,
          "initial-values": initialValues.value,
          "on-submit": handleSubmit
        }, {
          default: withCtx(({ values, errors, isSubmitting }) => [
            createBaseVNode("div", _hoisted_4$1, [
              entityType.value === "juridical" ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
                createBaseVNode("div", _hoisted_6$1, [
                  createVNode(TextInput, {
                    name: "jurName",
                    label: "Наименование юридического лица",
                    placeholder: "Введите наименование",
                    "model-value": values.jurName,
                    "onUpdate:modelValue": ($event) => values.jurName = $event,
                    error: errors.jurName
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "inn",
                    label: "ИНН",
                    placeholder: "Введите ИНН",
                    "model-value": values.inn,
                    "onUpdate:modelValue": ($event) => values.inn = $event,
                    error: errors.inn
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "kpp",
                    label: "КПП",
                    placeholder: "Введите КПП",
                    "model-value": values.kpp,
                    "onUpdate:modelValue": ($event) => values.kpp = $event,
                    error: errors.kpp
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "ogrn",
                    label: "ОГРН",
                    placeholder: "Введите ОГРН",
                    "model-value": values.ogrn,
                    "onUpdate:modelValue": ($event) => values.ogrn = $event,
                    error: errors.ogrn
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "address",
                    label: "Адрес юридического лица",
                    placeholder: "Введите адрес",
                    "model-value": values.address,
                    "onUpdate:modelValue": ($event) => values.address = $event,
                    error: errors.address
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createBaseVNode("div", _hoisted_7$1, [
                    createVNode(SelectInput, {
                      name: "country",
                      label: "Страна",
                      options: [],
                      "model-value": values.country,
                      "onUpdate:modelValue": ($event) => values.country = $event,
                      error: errors.country
                    }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                    createVNode(TextInput, {
                      name: "index",
                      label: "Индекс",
                      placeholder: "Введите индекс",
                      "model-value": values.index,
                      "onUpdate:modelValue": ($event) => values.index = $event,
                      error: errors.index
                    }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                    createVNode(SelectInput, {
                      name: "region",
                      label: "Регион",
                      options: [],
                      "model-value": values.region,
                      "onUpdate:modelValue": ($event) => values.region = $event,
                      error: errors.region
                    }, null, 8, ["model-value", "onUpdate:modelValue", "error"])
                  ]),
                  createVNode(TextInput, {
                    name: "city",
                    label: "Город",
                    placeholder: "Введите город",
                    "model-value": values.city,
                    "onUpdate:modelValue": ($event) => values.city = $event,
                    error: errors.city
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "phone",
                    label: "Телефон",
                    placeholder: "Введите номер телефона",
                    "model-value": values.phone,
                    "onUpdate:modelValue": ($event) => values.phone = $event,
                    error: errors.phone
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "email",
                    label: "Email",
                    placeholder: "Введите адрес электронной почты",
                    "model-value": values.email,
                    "onUpdate:modelValue": ($event) => values.email = $event,
                    error: errors.email
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"])
                ])
              ])) : entityType.value === "physical" ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
                createBaseVNode("div", _hoisted_9$1, [
                  createVNode(TextInput, {
                    name: "fio",
                    label: "ФИО",
                    placeholder: "Введите ФИО",
                    "model-value": values.fio,
                    "onUpdate:modelValue": ($event) => values.fio = $event,
                    error: errors.fio
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "phone",
                    label: "Телефон",
                    placeholder: "Введите номер телефона",
                    "model-value": values.phone,
                    "onUpdate:modelValue": ($event) => values.phone = $event,
                    error: errors.phone
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"]),
                  createVNode(TextInput, {
                    name: "email",
                    label: "Email",
                    placeholder: "Введите адрес электронной почты",
                    "model-value": values.email,
                    "onUpdate:modelValue": ($event) => values.email = $event,
                    error: errors.email
                  }, null, 8, ["model-value", "onUpdate:modelValue", "error"])
                ])
              ])) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["validation-schema", "initial-values"])
      ]);
    };
  }
});
const CreateSenderReceiverForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-44deb595"]]);
const _hoisted_1 = { class: "flex items-stretch md:items-center justify-between flex-col-reverse md:flex-row w-full mb-4 mt-2" };
const _hoisted_2 = { class: "btn-group bg-gray-100 rounded-2xl p-2 gap-2 flex flex-col md:flex-row [&>button]:py-2 [&>button]:px-8 [&>button]:font-semibold" };
const _hoisted_3 = {
  key: 0,
  class: "flex items-center mb-4 gap-2"
};
const _hoisted_4 = { class: "text-brand-gray font-semibold" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "flex gap-3 justify-center" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "text-brand-gray" };
const _hoisted_10 = { class: "text-brand-gray" };
const _hoisted_11 = { class: "text-brand-gray whitespace-nowrap" };
const _hoisted_12 = { class: "text-brand-gray" };
const _hoisted_13 = { class: "text-brand-gray" };
const _hoisted_14 = { class: "text-brand-gray" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SendersReceiversPage",
  setup(__props) {
    const initialItems = ref([]);
    const activeTab = ref("all");
    const searchTerm = ref("");
    const selectedItems = ref([]);
    onMounted(() => {
      if (window.initialData && window.initialData.sendersReceivers) {
        initialItems.value = window.initialData.sendersReceivers.map((item) => ({ ...item, id: item.id || Date.now() + Math.random() }));
      }
    });
    const headers = ref([
      { text: "Действия", value: "actions", sortable: false, width: 40 },
      { text: "Тип", value: "type", sortable: true, width: 40 },
      { text: "ФИО / Название", value: "name", sortable: true },
      { text: "Телефон", value: "phone", sortable: true, width: 60 },
      { text: "Населенный пункт", value: "location", sortable: true },
      { text: "Адрес", value: "address", sortable: true },
      { text: "Комментарий для курьера", value: "comment", sortable: false }
    ]);
    const filteredItems = computed(() => {
      let items = initialItems.value;
      if (activeTab.value !== "all") {
        items = items.filter((item) => item.type === activeTab.value);
      }
      if (searchTerm.value) {
        const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
        items = items.filter((item) => {
          return item.name.toLowerCase().includes(lowerCaseSearchTerm) || item.phone.toLowerCase().includes(lowerCaseSearchTerm) || item.location.toLowerCase().includes(lowerCaseSearchTerm) || item.address.toLowerCase().includes(lowerCaseSearchTerm) || item.comment && item.comment.toLowerCase().includes(lowerCaseSearchTerm);
        });
      }
      return items;
    });
    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };
    const handleSearch = (value) => {
      searchTerm.value = value;
    };
    const openCreateModal = async () => {
      try {
        const result = await window.globalModalStore.openModal(
          CreateSenderReceiverForm,
          { mode: "create" },
          // Пропсы вторым аргументом
          "large"
          // Размер третьим аргументом
        );
        console.log("Create Modal Result:", result);
        if (result && result.type === "success" && result.data) {
          console.log("Новая запись создана:", result.data);
          alert("Запись успешно создана (имитация).");
        }
      } catch (error) {
        console.error("Create Modal cancelled:", error, "\nopenCreateModal");
      }
    };
    const openEditModal = async (item) => {
      try {
        const result = await window.globalModalStore.openModal(
          CreateSenderReceiverForm,
          { mode: "edit", initialData: item, isEdit: true },
          // Пропсы вторым аргументом
          "large"
          // Размер третьим аргументом
        );
        console.log("Edit Modal Result:", result);
        if (result && result.type === "success" && result.data) {
          const index = initialItems.value.findIndex((sr) => sr.id === item.id);
          if (index !== -1) {
            initialItems.value[index] = { ...initialItems.value[index], ...result.data };
          }
          console.log("Запись обновлена:", result.data);
          alert("Запись успешно обновлена (имитация).");
        }
      } catch (error) {
        console.error("Edit Modal cancelled:", error);
      }
    };
    const openDeleteModal = async (item) => {
      try {
        const result = await window.globalModalStore.openModal(
          DeleteConfirmModal,
          // Компонент первым аргументом
          {
            // Пропсы вторым аргументом
            title: "Удалить запись?",
            message: `Вы действительно хотите удалить запись ${item.name}?`,
            confirmButtonText: "Удалить",
            item
            // Pass the item object
          },
          "default"
          // Размер третьим аргументом - меняем на 'default'
        );
        console.log("Delete Modal Result:", result);
        if (result) {
          initialItems.value = initialItems.value.filter((sr) => sr.id !== item.id);
          selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id !== item.id);
        }
      } catch (error) {
        console.error("Delete Modal cancelled:", error);
      }
    };
    const openDeleteSelectedModal = async () => {
      if (selectedItems.value.length === 0) return;
      try {
        const result = await window.globalModalStore.openModal(
          DeleteConfirmModal,
          // Компонент первым аргументом
          {
            // Пропсы вторым аргументом
            title: `Удалить выбранные записи (${selectedItems.value.length})?`,
            message: `Вы действительно хотите удалить выбранные записи?`,
            // Можно добавить список записей
            confirmButtonText: "Удалить все",
            item: selectedItems.value
            // Pass the selected items array (modal needs to handle array)
          },
          "default"
          // Размер третьим аргументом - меняем на 'default'
        );
        console.log("Delete Selected Modal Result:", result);
        if (result) {
          const selectedIds = selectedItems.value.map((item) => item.id);
          initialItems.value = initialItems.value.filter((item) => !selectedIds.includes(item.id));
          selectedItems.value = [];
          alert(`${selectedIds.length} записей успешно удалено (имитация).`);
        }
      } catch (error) {
        console.error("Delete Selected Modal cancelled:", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("button", {
              class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "all", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "all" }]),
              onClick: _cache[0] || (_cache[0] = ($event) => setActiveTab("all"))
            }, " ВСЕ ", 2),
            createBaseVNode("button", {
              class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "Юр.лицо", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "Юр.лицо" }]),
              onClick: _cache[1] || (_cache[1] = ($event) => setActiveTab("Юр.лицо"))
            }, " ЮР.ЛИЦО ", 2),
            createBaseVNode("button", {
              class: normalizeClass(["type-tab rounded-xl", { "data-[active=true]:bg-white data-[active=true]:text-gray-800": activeTab.value === "Физ.лицо", "data-[active=false]:bg-transparent data-[active=false]:text-gray-500": activeTab.value !== "Физ.лицо" }]),
              onClick: _cache[2] || (_cache[2] = ($event) => setActiveTab("Физ.лицо"))
            }, " ФИЗ.ЛИЦО ", 2)
          ]),
          createBaseVNode("button", {
            type: "button",
            id: "create-btn",
            class: "btn btn-primary rounded-xl px-8 my-5 py-3 font-semibold shadow",
            onClick: openCreateModal
          }, " Создать ")
        ]),
        selectedItems.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("span", _hoisted_4, "Выбрано: " + toDisplayString(selectedItems.value.length), 1),
          createBaseVNode("button", {
            class: "btn btn-sm btn-error text-white rounded-xl px-4 font-semibold shadow",
            onClick: openDeleteSelectedModal
          }, " Удалить выбранные (" + toDisplayString(selectedItems.value.length) + ") ", 1),
          createBaseVNode("button", {
            class: "btn btn-sm btn-warning text-white rounded-xl px-4 font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: selectedItems.value.length !== 1,
            onClick: _cache[3] || (_cache[3] = ($event) => openEditModal(selectedItems.value[0]))
          }, " Редактировать выбранную ", 8, _hoisted_5)
        ])) : createCommentVNode("", true),
        createVNode(EasyDataTableWrapper, {
          "items-selected": selectedItems.value,
          "onUpdate:itemsSelected": _cache[4] || (_cache[4] = ($event) => selectedItems.value = $event),
          headers: headers.value,
          items: filteredItems.value,
          searchable: true,
          "search-field": "name",
          "search-placeholder": "Компания, ФИО или телефон",
          selectable: true,
          "show-index": false,
          "onUpdate:search": handleSearch
        }, {
          "item-actions": withCtx((item) => [
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("button", {
                class: "edit-btn text-brand-blue hover:text-brand-blue-dark transition-colors",
                onClick: ($event) => openEditModal(item)
              }, _cache[5] || (_cache[5] = [
                createBaseVNode("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createBaseVNode("path", {
                    d: "M5.83301 5.83398H4.99967C4.55765 5.83398 4.13372 6.00958 3.82116 6.32214C3.5086 6.6347 3.33301 7.05862 3.33301 7.50065V15.0007C3.33301 15.4427 3.5086 15.8666 3.82116 16.1792C4.13372 16.4917 4.55765 16.6673 4.99967 16.6673H12.4997C12.9417 16.6673 13.3656 16.4917 13.6782 16.1792C13.9907 15.8666 14.1663 15.4427 14.1663 15.0007V14.1673",
                    stroke: "#4D4D4D",
                    "stroke-width": "1.66667",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createBaseVNode("path", {
                    d: "M13.3333 4.16676L15.8333 6.66676M16.9875 5.48759C17.3157 5.15938 17.5001 4.71424 17.5001 4.25009C17.5001 3.78594 17.3157 3.34079 16.9875 3.01259C16.6593 2.68438 16.2142 2.5 15.75 2.5C15.2858 2.5 14.8407 2.68438 14.5125 3.01259L7.5 10.0001V12.5001H10L16.9875 5.48759Z",
                    stroke: "#4D4D4D",
                    "stroke-width": "1.66667",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)
              ]), 8, _hoisted_7),
              createBaseVNode("button", {
                class: "delete-btn text-red-500 hover:text-red-700 transition-colors",
                onClick: ($event) => openDeleteModal(item)
              }, _cache[6] || (_cache[6] = [
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
              ]), 8, _hoisted_8)
            ])
          ]),
          "item-type": withCtx((item) => [
            createBaseVNode("span", _hoisted_9, toDisplayString(item.type), 1)
          ]),
          "item-name": withCtx((item) => [
            createBaseVNode("span", _hoisted_10, toDisplayString(item.name), 1)
          ]),
          "item-phone": withCtx((item) => [
            createBaseVNode("span", _hoisted_11, toDisplayString(item.phone), 1)
          ]),
          "item-location": withCtx((item) => [
            createBaseVNode("span", _hoisted_12, toDisplayString(item.location), 1)
          ]),
          "item-address": withCtx((item) => [
            createBaseVNode("span", _hoisted_13, toDisplayString(item.address), 1)
          ]),
          "item-comment": withCtx((item) => [
            createBaseVNode("span", _hoisted_14, toDisplayString(item.comment || "—"), 1)
          ]),
          _: 1
        }, 8, ["items-selected", "headers", "items"])
      ]);
    };
  }
});
const SendersReceiversPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16ff6cda"]]);
const app = createApp(SendersReceiversPage);
const pinia = createPinia();
app.use(pinia);
app.mount("#senders-receivers-table-app");
