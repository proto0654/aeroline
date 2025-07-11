import { i as index, l as lang } from "./ru.es-BU9Gbdrk.js";
import "../lkDatepickerJs-iq-wnAN6.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { r as ref, q as watch, c as createElementBlock, o as openBlock, I as createVNode, A as unref } from "./runtime-dom.esm-bundler-DZCqFWTW.js";
const _sfc_main$1 = {
  __name: "DateRangePickerVue",
  props: {
    initialRange: {
      // Начальный выбранный диапазон [Date, Date] или [String, String]
      type: Array,
      default: null
    },
    placeholder: {
      // Текст плейсхолдера
      type: String,
      default: "Выберите период"
    },
    closeOnSelect: {
      // Закрывать ли попап после выбора диапазона
      type: Boolean,
      default: true
    }
    // Можно добавить другие пропсы для настройки DatePicker из библиотеки
    // minDate, maxDate, format, etc.
  },
  emits: ["range-select", "clear-selection", "update:range"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const dateRange = ref(props.initialRange);
    const locale = ref(lang);
    const isOpen = ref(false);
    watch(() => props.initialRange, (newRange) => {
      console.log("DateRangePickerVue: initialRange prop changed to:", newRange);
      dateRange.value = newRange;
      console.log("DateRangePickerVue: dateRange updated to:", dateRange.value);
    }, { immediate: true });
    watch(dateRange, (newRange) => {
      console.log("DateRangePickerVue: dateRange changed, emitting update:range", newRange);
      if (!newRange || newRange.length !== 2 || !newRange[0] || !newRange[1]) {
        emit("update:range", { start: null, end: null });
      } else {
        emit("update:range", { start: newRange[0], end: newRange[1] });
      }
    });
    const handleChange = (newRange) => {
      dateRange.value = newRange;
      if (props.closeOnSelect && Array.isArray(newRange) && newRange.length === 2 && newRange[0] && newRange[1]) {
        isOpen.value = false;
      }
    };
    const handleClose = () => {
      console.log("Date picker closed");
    };
    const clearSelection = () => {
      dateRange.value = null;
      emit("clear-selection");
    };
    __expose({
      clearSelection
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(unref(index), {
          value: dateRange.value,
          "onUpdate:value": _cache[0] || (_cache[0] = ($event) => dateRange.value = $event),
          open: isOpen.value,
          "onUpdate:open": _cache[1] || (_cache[1] = ($event) => isOpen.value = $event),
          type: "daterange",
          range: "",
          placeholder: "Выберите период",
          format: "DD.MM.YYYY",
          lang: locale.value,
          onChange: handleChange,
          onClose: handleClose
        }, null, 8, ["value", "open", "lang"])
      ]);
    };
  }
};
const DateRangePickerVue = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-200713a2"]]);
const _hoisted_1 = { class: "date-range-filter mb-6" };
const _sfc_main = {
  __name: "DateRangeFilter",
  props: {
    initialStartDate: {
      type: [String, Date],
      default: null
    },
    initialEndDate: {
      type: [String, Date],
      default: null
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    }
  },
  emits: ["date-range-changed"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleDateRangeSelected = (payload) => {
      emit("date-range-changed", payload);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(DateRangePickerVue, {
          initialRange: [__props.initialStartDate, __props.initialEndDate],
          "onUpdate:range": handleDateRangeSelected,
          "close-on-select": __props.closeOnSelect,
          class: "w-full"
        }, null, 8, ["initialRange", "close-on-select"])
      ]);
    };
  }
};
const DateRangeFilter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb555c5e"]]);
export {
  DateRangeFilter as D
};
