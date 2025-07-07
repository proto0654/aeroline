import { i as index, l as lang } from "../lkDatepickerJs-C8l-Z66K.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { r as ref, w as watch, c as createElementBlock, o as openBlock, a as createVNode, u as unref } from "./runtime-dom.esm-bundler-BbrWZI0-.js";
const _sfc_main = {
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
    const handleConfirm = () => {
      console.log("DateRangePickerVue: confirmed selection", dateRange.value);
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
          type: "daterange",
          range: "",
          placeholder: "Выберите период",
          format: "DD.MM.YYYY",
          lang: locale.value,
          onConfirm: handleConfirm,
          onClose: handleClose
        }, null, 8, ["value", "lang"])
      ]);
    };
  }
};
const DateRangePickerVue = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-69653669"]]);
export {
  DateRangePickerVue as D
};
