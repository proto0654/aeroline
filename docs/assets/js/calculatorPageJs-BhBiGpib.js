import { r as ref, p as computed, q as watch, c as createElementBlock, o as openBlock, a as createBaseVNode, d as createCommentVNode, B as normalizeClass, w as withModifiers, F as Fragment, C as renderList, K as createVNode, t as toDisplayString, f as reactive, v as onMounted, M as withCtx, H as createBlock, A as unref, J as createApp } from "./chunks/runtime-dom.esm-bundler-BEj-0d2c.js";
import { T as TextInput, c as create$3, e as create$5, b as create$6, f as create$2, F as Form, g as Field, E as ErrorMessage } from "./chunks/TextInput-BzNOv0NB.js";
import { C as CheckboxInput, _ as _sfc_main$5 } from "./chunks/CheckboxInput-B1hFOZbU.js";
import { S as SelectInput } from "./chunks/SelectInput-Do9zj2pb.js";
import { A as AutocompleteInput } from "./chunks/AutocompleteInput-DDLeqRtM.js";
import "./chunks/_plugin-vue_export-helper-1tPrXgE0.js";
import "./chunks/select-arrow-He2ejS2L.js";
const _hoisted_1$4 = { class: "card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$4 = { class: "flex border border-gray-200 rounded-lg p-1 mb-4 max-w-sm" };
const _hoisted_3$3 = {
  key: 0,
  class: "flex flex-col gap-4"
};
const _hoisted_4$3 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4" };
const _hoisted_5$3 = { class: "text-sm text-gray-500 mt-2" };
const _hoisted_6$2 = ["onClick"];
const _hoisted_7$1 = {
  key: 1,
  class: "grid grid-cols-1 md:grid-cols-2 gap-4"
};
const _hoisted_8$1 = { class: "mt-6 border-t border-gray-200 pt-6 flex flex-col gap-4" };
const _sfc_main$4 = {
  __name: "CargoParamsForm",
  props: {
    modelValue: { type: Object, required: true },
    calculatorConfig: { type: Object, required: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const mode = ref("individual");
    const packages = ref(props.modelValue.packages || [{ id: Date.now(), length: "", width: "", height: "", weight: "" }]);
    const totalWeight = ref(props.modelValue.totalWeight || "");
    const totalVolume = ref(props.modelValue.totalVolume || "");
    const contentDescription = ref(props.modelValue.contentDescription || "");
    const declaredValue = ref(props.modelValue.declaredValue || "");
    const packaging = ref(props.modelValue.packaging || "");
    const selfMarking = ref(props.modelValue.selfMarking || false);
    const dangerousGoods = ref(props.modelValue.dangerousGoods || false);
    const tempControl = ref(props.modelValue.tempControl || false);
    const packagingOptions = computed(() => {
      if (!props.calculatorConfig.packaging) return [];
      return props.calculatorConfig.packaging.map((p) => ({ value: p.id, label: p.name }));
    });
    const calculatedVolume = (pkg) => {
      if (pkg.length && pkg.width && pkg.height) {
        return (pkg.length * pkg.width * pkg.height / 1e6).toFixed(3);
      }
      return "0.000";
    };
    function addPackage() {
      packages.value.push({ id: Date.now(), length: "", width: "", height: "", weight: "" });
    }
    function removePackage(index) {
      packages.value.splice(index, 1);
    }
    watch(
      [mode, packages, totalWeight, totalVolume, contentDescription, declaredValue, packaging, selfMarking, dangerousGoods, tempControl],
      () => {
        emit("update:modelValue", {
          mode: mode.value,
          packages: packages.value,
          totalWeight: totalWeight.value,
          totalVolume: totalVolume.value,
          contentDescription: contentDescription.value,
          declaredValue: declaredValue.value,
          packaging: packaging.value,
          selfMarking: selfMarking.value,
          dangerousGoods: dangerousGoods.value,
          tempControl: tempControl.value
        });
      },
      { deep: true }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$4, [
        _cache[11] || (_cache[11] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Параметры груза", -1)),
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => mode.value = "individual", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", mode.value === "individual" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Места по-отдельности ", 2),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => mode.value = "total", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", mode.value === "total" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, " Общий вес и объём ", 2)
        ]),
        mode.value === "individual" ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(packages.value, (pkg, index) => {
            return openBlock(), createElementBlock("div", {
              key: pkg.id,
              class: "border border-gray-200 p-4 rounded-lg relative"
            }, [
              createBaseVNode("div", _hoisted_4$3, [
                createVNode(TextInput, {
                  name: `pkg_${pkg.id}_length`,
                  label: "Длина, см",
                  modelValue: pkg.length,
                  "onUpdate:modelValue": ($event) => pkg.length = $event,
                  type: "number"
                }, null, 8, ["name", "modelValue", "onUpdate:modelValue"]),
                createVNode(TextInput, {
                  name: `pkg_${pkg.id}_width`,
                  label: "Ширина, см",
                  modelValue: pkg.width,
                  "onUpdate:modelValue": ($event) => pkg.width = $event,
                  type: "number"
                }, null, 8, ["name", "modelValue", "onUpdate:modelValue"]),
                createVNode(TextInput, {
                  name: `pkg_${pkg.id}_height`,
                  label: "Высота, см",
                  modelValue: pkg.height,
                  "onUpdate:modelValue": ($event) => pkg.height = $event,
                  type: "number"
                }, null, 8, ["name", "modelValue", "onUpdate:modelValue"]),
                createVNode(TextInput, {
                  name: `pkg_${pkg.id}_weight`,
                  label: "Вес, кг",
                  modelValue: pkg.weight,
                  "onUpdate:modelValue": ($event) => pkg.weight = $event,
                  type: "number"
                }, null, 8, ["name", "modelValue", "onUpdate:modelValue"])
              ]),
              createBaseVNode("div", _hoisted_5$3, "Объём: " + toDisplayString(calculatedVolume(pkg)) + " м³", 1),
              packages.value.length > 1 ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: withModifiers(($event) => removePackage(index), ["prevent"]),
                class: "absolute top-2 right-2 text-gray-400 hover:text-red-500"
              }, _cache[10] || (_cache[10] = [
                createBaseVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M6 18L18 6M6 6l12 12"
                  })
                ], -1)
              ]), 8, _hoisted_6$2)) : createCommentVNode("", true)
            ]);
          }), 128)),
          createBaseVNode("button", {
            onClick: withModifiers(addPackage, ["prevent"]),
            class: "btn btn-secondary w-full md:w-auto self-start"
          }, "+ Добавить место")
        ])) : createCommentVNode("", true),
        mode.value === "total" ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
          createVNode(TextInput, {
            name: "total_weight",
            label: "Общий вес, кг",
            modelValue: totalWeight.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => totalWeight.value = $event),
            type: "number"
          }, null, 8, ["modelValue"]),
          createVNode(TextInput, {
            name: "total_volume",
            label: "Общий объём, м³",
            modelValue: totalVolume.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => totalVolume.value = $event),
            type: "number"
          }, null, 8, ["modelValue"])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_8$1, [
          createVNode(TextInput, {
            name: "content_description",
            label: "Описание содержимого",
            modelValue: contentDescription.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => contentDescription.value = $event),
            placeholder: "Например: Личные вещи, запчасти"
          }, null, 8, ["modelValue"]),
          createVNode(TextInput, {
            name: "declared_value",
            label: "Оценочная стоимость, ₽",
            modelValue: declaredValue.value,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => declaredValue.value = $event),
            type: "number"
          }, null, 8, ["modelValue"]),
          createVNode(SelectInput, {
            name: "packaging",
            label: "Упаковка",
            options: packagingOptions.value,
            modelValue: packaging.value,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => packaging.value = $event)
          }, null, 8, ["options", "modelValue"]),
          createVNode(CheckboxInput, {
            name: "self_marking",
            label: "Самостоятельная маркировка груза",
            modelValue: selfMarking.value,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => selfMarking.value = $event)
          }, null, 8, ["modelValue"]),
          createVNode(CheckboxInput, {
            name: "dangerous_goods",
            label: "Есть опасный груз",
            modelValue: dangerousGoods.value,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => dangerousGoods.value = $event)
          }, null, 8, ["modelValue"]),
          createVNode(CheckboxInput, {
            name: "temp_control",
            label: "Требуется температурный режим",
            modelValue: tempControl.value,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => tempControl.value = $event)
          }, null, 8, ["modelValue"])
        ])
      ]);
    };
  }
};
const _hoisted_1$3 = { class: "card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$3 = { class: "text-h4 font-bold mb-4" };
const _hoisted_3$2 = { class: "flex border border-gray-200 rounded-lg p-1 mb-4" };
const _hoisted_4$2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_5$2 = { key: 0 };
const _hoisted_6$1 = { key: 1 };
const _sfc_main$3 = {
  __name: "DeliveryPointForm",
  props: {
    title: { type: String, required: true },
    terminalLabel: { type: String, required: true },
    addressLabel: { type: String, required: true },
    city: { type: String, required: true },
    offices: { type: Array, required: true },
    modelValue: { type: Object, required: true },
    namePrefix: { type: String, required: true }
    // e.g., 'departure' or 'destination'
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const deliveryMode = ref(props.modelValue.deliveryMode || "terminal");
    const location = ref(props.modelValue.location || "");
    const date = ref(props.modelValue.date || "");
    const terminalOptions = computed(() => {
      if (!props.city) return [];
      return props.offices.filter((office) => office.city === props.city);
    });
    watch(() => props.city, () => {
      location.value = "";
    });
    watch([deliveryMode, location, date], () => {
      emit("update:modelValue", {
        deliveryMode: deliveryMode.value,
        location: location.value,
        date: date.value
      });
    });
    watch(() => props.modelValue, (newValue) => {
      deliveryMode.value = newValue.deliveryMode;
      location.value = newValue.location;
      date.value = newValue.date;
    }, { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$3, [
        createBaseVNode("h2", _hoisted_2$3, toDisplayString(__props.title), 1),
        createBaseVNode("div", _hoisted_3$2, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => deliveryMode.value = "terminal", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", deliveryMode.value === "terminal" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, toDisplayString(__props.terminalLabel), 3),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => deliveryMode.value = "address", ["prevent"])),
            class: normalizeClass(["flex-1 py-2 px-4 rounded-md text-sm", deliveryMode.value === "address" ? "bg-brand-blue text-white shadow" : "text-gray-600"])
          }, toDisplayString(__props.addressLabel), 3)
        ]),
        createBaseVNode("div", _hoisted_4$2, [
          deliveryMode.value === "terminal" ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
            createVNode(AutocompleteInput, {
              name: `${__props.namePrefix}_terminal_address`,
              label: "Адрес терминала",
              items: terminalOptions.value,
              disabled: !__props.city,
              placeholder: __props.city ? "Выберите терминал" : "Сначала выберите город",
              modelValue: location.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => location.value = $event)
            }, null, 8, ["name", "items", "disabled", "placeholder", "modelValue"])
          ])) : createCommentVNode("", true),
          deliveryMode.value === "address" ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
            createVNode(TextInput, {
              name: `${__props.namePrefix}_pickup_address`,
              label: "Адрес",
              placeholder: "Укажите адрес",
              disabled: !__props.city,
              modelValue: location.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => location.value = $event)
            }, null, 8, ["name", "disabled", "modelValue"])
          ])) : createCommentVNode("", true),
          createVNode(TextInput, {
            name: `${__props.namePrefix}_date`,
            label: "Дата",
            type: "date",
            disabled: !__props.city,
            modelValue: date.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => date.value = $event)
          }, null, 8, ["name", "disabled", "modelValue"])
        ])
      ]);
    };
  }
};
const _hoisted_1$2 = { class: "card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$2 = { class: "flex flex-col gap-4" };
const _sfc_main$2 = {
  __name: "ExtraOptionsForm",
  props: {
    modelValue: { type: Object, required: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const requiresAccompanyingDocs = ref(props.modelValue.requiresAccompanyingDocs || false);
    const returnDocsToSender = ref(props.modelValue.returnDocsToSender || false);
    watch([requiresAccompanyingDocs, returnDocsToSender], () => {
      emit("update:modelValue", {
        requiresAccompanyingDocs: requiresAccompanyingDocs.value,
        returnDocsToSender: returnDocsToSender.value
      });
    });
    watch(() => props.modelValue, (newValue) => {
      requiresAccompanyingDocs.value = newValue.requiresAccompanyingDocs;
      returnDocsToSender.value = newValue.returnDocsToSender;
    }, { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Дополнительные опции", -1)),
        createBaseVNode("div", _hoisted_2$2, [
          createVNode(CheckboxInput, {
            name: "requires_accompanying_docs",
            label: "Требуется перевозка сопроводительных документов",
            modelValue: requiresAccompanyingDocs.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => requiresAccompanyingDocs.value = $event)
          }, null, 8, ["modelValue"]),
          createVNode(CheckboxInput, {
            name: "return_docs_to_sender",
            label: "Возврат документов отправителю",
            modelValue: returnDocsToSender.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => returnDocsToSender.value = $event)
          }, null, 8, ["modelValue"])
        ])
      ]);
    };
  }
};
const _hoisted_1$1 = { class: "lg:sticky top-6 h-fit card bg-white p-6 rounded-lg shadow-sm" };
const _hoisted_2$1 = {
  key: 0,
  class: "text-gray-500"
};
const _hoisted_3$1 = { key: 1 };
const _hoisted_4$1 = { class: "border-b pb-2 mb-2" };
const _hoisted_5$1 = { class: "flex justify-between items-center" };
const _hoisted_6 = { class: "font-bold text-lg" };
const _hoisted_7 = { class: "font-bold text-lg" };
const _hoisted_8 = { class: "text-sm text-gray-500" };
const _hoisted_9 = { class: "text-sm space-y-1" };
const _hoisted_10 = { class: "flex justify-between items-center font-bold text-base mt-4 border-t pt-2" };
const _sfc_main$1 = {
  __name: "CalculationResult",
  props: {
    result: {
      type: Object,
      default: null
    }
  },
  emits: ["print"],
  setup(__props) {
    function formatCurrency(value) {
      if (typeof value !== "number") {
        return "0,00 ₽";
      }
      return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 2 }).format(value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", _hoisted_1$1, [
        _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Стоимость перевозки", -1)),
        !__props.result ? (openBlock(), createElementBlock("div", _hoisted_2$1, _cache[1] || (_cache[1] = [
          createBaseVNode("p", null, 'Заполните все обязательные поля и нажмите "Рассчитать", чтобы увидеть стоимость.', -1)
        ]))) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("span", _hoisted_6, toDisplayString(__props.result.tariff.name), 1),
              createBaseVNode("span", _hoisted_7, toDisplayString(formatCurrency(__props.result.totalCost)), 1)
            ]),
            createBaseVNode("div", _hoisted_8, toDisplayString(__props.result.tariff.description), 1)
          ]),
          createBaseVNode("div", _hoisted_9, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.result.details, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.name,
                class: "flex justify-between"
              }, [
                createBaseVNode("span", null, toDisplayString(item.name), 1),
                createBaseVNode("span", null, toDisplayString(formatCurrency(item.cost)), 1)
              ]);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_10, [
            _cache[2] || (_cache[2] = createBaseVNode("span", null, "Общая стоимость", -1)),
            createBaseVNode("span", null, toDisplayString(formatCurrency(__props.result.totalCost)), 1)
          ]),
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-xs text-gray-400 mt-1" }, " С учетом НДС ", -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("print")),
            class: "btn btn-secondary w-full mt-4"
          }, "Распечатать")
        ]))
      ]);
    };
  }
};
const _hoisted_1 = ["onSubmit"];
const _hoisted_2 = { class: "grid grid-cols-1 lg:grid-cols-2 gap-8" };
const _hoisted_3 = { class: "flex flex-col gap-6" };
const _hoisted_4 = { class: "lg:sticky top-6 h-fit" };
const _hoisted_5 = {
  key: 0,
  class: "mt-4 text-red-500 text-sm"
};
const _sfc_main = {
  __name: "CalculatorPage",
  setup(__props) {
    const offices = ref([]);
    const calculatorConfig = ref({});
    const calculationResult = ref(null);
    const formData = reactive({
      direction: {
        from: "",
        to: ""
      },
      cargo: {
        mode: "individual",
        packages: [{ id: Date.now(), length: "", width: "", height: "", weight: "" }],
        totalWeight: "",
        totalVolume: "",
        contentDescription: "Личные вещи",
        declaredValue: 1e3,
        packaging: "box-s",
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false
      },
      departure: {
        deliveryMode: "terminal",
        location: "",
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      },
      destination: {
        deliveryMode: "terminal",
        location: "",
        date: ""
      },
      extraOptions: {
        requiresAccompanyingDocs: false,
        returnDocsToSender: false
      }
    });
    const packageSchema = create$3().shape({
      length: create$5().required().positive().typeError("Должно быть число"),
      width: create$5().required().positive().typeError("Должно быть число"),
      height: create$5().required().positive().typeError("Должно быть число"),
      weight: create$5().required().positive().typeError("Должно быть число")
    });
    const validationSchema = create$3({
      direction: create$3({
        from: create$6().required("Выберите город отправления"),
        to: create$6().required("Выберите город назначения")
      }),
      cargo: create$3({
        mode: create$6().required(),
        packages: create$2().when("mode", {
          is: "individual",
          then: (schema) => schema.of(packageSchema).min(1)
        }),
        totalWeight: create$5().when("mode", { is: "total", then: (schema) => schema.required().positive() }),
        totalVolume: create$5().when("mode", { is: "total", then: (schema) => schema.required().positive() }),
        declaredValue: create$5().required().min(0)
      }),
      departure: create$3({
        location: create$6().required("Укажите место отправки"),
        date: create$6().required("Укажите дату")
      }),
      destination: create$3({
        location: create$6().required("Укажите место назначения")
      })
    });
    async function fetchData() {
      try {
        const [officesRes, configRes] = await Promise.all([
          fetch("/assets/data/contacts.json"),
          fetch("/assets/data/calculator-data.json")
        ]);
        const officesData = await officesRes.json();
        offices.value = officesData.offices || [];
        calculatorConfig.value = await configRes.json();
        const urlParams = new URLSearchParams(window.location.search);
        const fromId = urlParams.get("from");
        const toId = urlParams.get("to");
        if (fromId) {
          const office = offices.value.find((o) => o.id === parseInt(fromId));
          if (office) {
            formData.direction.from = office.city + (office.address ? ", " + office.address : "");
          }
        }
        if (toId) {
          const office = offices.value.find((o) => o.id === parseInt(toId));
          if (office) {
            formData.direction.to = office.city + (office.address ? ", " + office.address : "");
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    }
    function calculateCost() {
      const { services, coefficients, tariffs } = calculatorConfig.value;
      const { cargo, departure, destination, extraOptions } = formData;
      const tariff = tariffs[0];
      let totalCost = 0;
      const details = [];
      let totalWeight, totalVolume;
      if (cargo.mode === "individual") {
        totalWeight = cargo.packages.reduce((sum, pkg) => sum + (parseFloat(pkg.weight) || 0), 0);
        totalVolume = cargo.packages.reduce((sum, pkg) => {
          const vol = parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height) / 1e6;
          return sum + (vol || 0);
        }, 0);
      } else {
        totalWeight = parseFloat(cargo.totalWeight) || 0;
        totalVolume = parseFloat(cargo.totalVolume) || 0;
      }
      const weightCost = totalWeight * tariff.baseRatePerKg;
      const volumeCost = totalVolume * tariff.baseRatePerM3;
      let baseCost = Math.max(weightCost, volumeCost, tariff.minCost);
      details.push({ name: "Базовый тариф", cost: baseCost });
      if (cargo.dangerousGoods) {
        const markup = baseCost * (coefficients.dangerousGoodsMultiplier.value - 1);
        baseCost += markup;
        details.push({ name: coefficients.dangerousGoodsMultiplier.name, cost: markup });
      }
      if (departure.deliveryMode === "address") {
        const markup = baseCost * (coefficients.fromAddressMultiplier.value - 1);
        baseCost += markup;
        details.push({ name: coefficients.fromAddressMultiplier.name, cost: markup });
      }
      totalCost = baseCost;
      if (services.logisticProcessing) {
        totalCost += services.logisticProcessing.cost;
        details.push(services.logisticProcessing);
      }
      if (extraOptions.returnDocsToSender && services.documentReturn) {
        totalCost += services.documentReturn.cost;
        details.push(services.documentReturn);
      }
      return { totalCost, details, tariff };
    }
    function submit() {
      console.log("Form submitted:", JSON.parse(JSON.stringify(formData)));
      calculationResult.value = calculateCost();
    }
    function printResult() {
      window.print();
    }
    onMounted(fetchData);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[8] || (_cache[8] = createBaseVNode("div", { class: "title-wrapper mb-6" }, [
          createBaseVNode("h1", { class: "animated-title text-center text-h2 mb-2" }, "Калькулятор стоимости пересылки")
        ], -1)),
        createVNode(unref(Form), { "validation-schema": unref(validationSchema) }, {
          default: withCtx(({ handleSubmit, errors }) => [
            createBaseVNode("form", {
              onSubmit: withModifiers(($event) => handleSubmit(submit), ["prevent"])
            }, [
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(_sfc_main$5, {
                    offices: offices.value,
                    modelValue: formData.direction,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.direction = $event)
                  }, null, 8, ["offices", "modelValue"]),
                  calculatorConfig.value.packaging ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    "calculator-config": calculatorConfig.value,
                    modelValue: formData.cargo,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.cargo = $event)
                  }, null, 8, ["calculator-config", "modelValue"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$3, {
                    title: "Пункт отправки",
                    "terminal-label": "Сдать на терминале",
                    "address-label": "Забрать по адресу",
                    "name-prefix": "departure",
                    city: formData.direction.from,
                    offices: offices.value,
                    modelValue: formData.departure,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.departure = $event)
                  }, null, 8, ["city", "offices", "modelValue"]),
                  createVNode(_sfc_main$3, {
                    title: "Пункт назначения",
                    "terminal-label": "Получить на терминале",
                    "address-label": "Доставить по адресу",
                    "name-prefix": "destination",
                    city: formData.direction.to,
                    offices: offices.value,
                    modelValue: formData.destination,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.destination = $event)
                  }, null, 8, ["city", "offices", "modelValue"]),
                  createVNode(_sfc_main$2, {
                    modelValue: formData.extraOptions,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.extraOptions = $event)
                  }, null, 8, ["modelValue"]),
                  _cache[5] || (_cache[5] = createBaseVNode("section", { class: "card bg-white p-6 rounded-lg shadow-sm" }, [
                    createBaseVNode("h2", { class: "text-h4 font-bold mb-4" }, "Дополнительные опции"),
                    createBaseVNode("p", { class: "text-gray-500" }, "Здесь будут дополнительные опции...")
                  ], -1))
                ]),
                createBaseVNode("div", _hoisted_4, [
                  createVNode(_sfc_main$1, {
                    result: calculationResult.value,
                    onPrint: printResult
                  }, null, 8, ["result"]),
                  _cache[7] || (_cache[7] = createBaseVNode("button", {
                    type: "submit",
                    class: "btn btn-primary w-full mt-4"
                  }, "Рассчитать", -1)),
                  Object.keys(errors).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5, _cache[6] || (_cache[6] = [
                    createBaseVNode("p", null, "Пожалуйста, заполните все обязательные поля.", -1)
                  ]))) : createCommentVNode("", true)
                ])
              ])
            ], 40, _hoisted_1)
          ]),
          _: 1
        }, 8, ["validation-schema"])
      ], 64);
    };
  }
};
const app = createApp(_sfc_main);
app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#calculator-app");
