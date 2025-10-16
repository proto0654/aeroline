import { p as computed, r as ref, q as watch, v as onMounted, x as onUnmounted, c as createElementBlock, o as openBlock, d as createCommentVNode, a as createBaseVNode, t as toDisplayString, F as withDirectives, G as vModelText, A as unref, C as normalizeClass, i as isRef, H as Fragment, I as renderList } from "./runtime-dom.esm-bundler-cJ5wxxpw.js";
import { _ as _imports_0 } from "./select-arrow-He2ejS2L.js";
import { u as useField } from "./TextInput-okLtxo6B.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
function formatLocalityName(item) {
  var _a, _b;
  if (!item) return "";
  const cityName = item.name || item.locality || item.city || "";
  const regionName = ((_a = item.region) == null ? void 0 : _a.name) || "";
  const federalDistrict = ((_b = item.region) == null ? void 0 : _b.federalDistrict) || "";
  const isRegionalCenter = item.isRegionalCenter || false;
  const type = item.type || "";
  const typePrefixes = {
    "город": "г.",
    "поселок": "пос.",
    "станица": "ст.",
    "село": "с.",
    "деревня": "д.",
    "хутор": "х.",
    "аул": "аул",
    "кишлак": "кишл."
  };
  const prefix = typePrefixes[type] ? `${typePrefixes[type]} ` : "";
  let regionInfo = "";
  if (isRegionalCenter) {
    if (federalDistrict) {
      regionInfo = ` (${federalDistrict})`;
    }
  } else {
    if (regionName && federalDistrict) {
      regionInfo = ` (${regionName}, ${federalDistrict})`;
    } else if (regionName) {
      regionInfo = ` (${regionName})`;
    }
  }
  return `${prefix}${cityName}${regionInfo}`;
}
function formatSelectedLocalityName(item) {
  var _a, _b;
  if (!item) return "";
  const cityName = item.name || item.locality || item.city || "";
  const regionName = ((_a = item.region) == null ? void 0 : _a.name) || "";
  const federalDistrict = ((_b = item.region) == null ? void 0 : _b.federalDistrict) || "";
  const isRegionalCenter = item.isRegionalCenter || false;
  const type = item.type || "";
  const typePrefixes = {
    "поселок": "пос.",
    "станица": "ст.",
    "село": "с.",
    "деревня": "д.",
    "хутор": "х.",
    "аул": "аул",
    "кишлак": "кишл."
  };
  const prefix = typePrefixes[type] ? `${typePrefixes[type]} ` : "";
  let regionInfo = "";
  if (isRegionalCenter) ;
  else {
    if (regionName && federalDistrict) {
      regionInfo = ` (${regionName}, ${federalDistrict})`;
    } else if (regionName) {
      regionInfo = ` (${regionName})`;
    }
  }
  return `${prefix}${cityName}${regionInfo}`;
}
const _hoisted_1 = ["for"];
const _hoisted_2 = { class: "relative w-full" };
const _hoisted_3 = ["id", "placeholder", "required", "disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  key: 0,
  src: _imports_0,
  alt: "",
  class: "absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
};
const _hoisted_6 = ["data-office-id", "onClick", "innerHTML"];
const _hoisted_7 = {
  key: 2,
  class: "text-brand-red absolute right-8 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
};
const _hoisted_8 = {
  key: 1,
  class: "text-red-500 text-sm mt-1"
};
const _hoisted_9 = {
  key: 2,
  class: "mt-1 text-sm text-gray-500"
};
const _sfc_main = {
  __name: "AutocompleteInput",
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
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    showResetButton: {
      type: Boolean,
      default: false
    },
    emitFullItem: {
      type: Boolean,
      default: false
    },
    useApiSearch: {
      type: Boolean,
      default: false
    },
    apiSearchFunction: {
      type: Function,
      default: null
    },
    itemFormatter: {
      type: Function,
      default: null
    },
    selectedValueFormatter: {
      type: Function,
      default: null
    }
  },
  emits: ["update:modelValue", "itemSelected", "reset"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputId = computed(() => props.id || `autocomplete-${props.name}-${Math.random().toString(36).substr(2, 9)}`);
    const inputRef = ref(null);
    const listRef = ref(null);
    const isDropdownVisible = ref(false);
    const currentIndex = ref(-1);
    const selectedItem = ref(null);
    const apiSearchResults = ref([]);
    const isApiSearching = ref(false);
    const {
      value: inputValue,
      errorMessage,
      handleBlur
    } = useField(props.name);
    const isSpecificOfficeSelected = computed(() => {
      return selectedItem.value && selectedItem.value.id;
    });
    watch(() => props.modelValue, (newValue) => {
      if (newValue !== inputValue.value) {
        inputValue.value = newValue;
      }
    });
    watch(inputValue, (newValue) => {
      emit("update:modelValue", newValue);
      if (newValue && newValue.trim()) {
        const foundItem = props.items.find((item) => {
          if (props.itemFormatter) {
            const formattedName = props.itemFormatter(item);
            return formattedName === newValue.trim();
          }
          const cityName = item.name || item.locality || item.city;
          return cityName === newValue.trim();
        });
        if (foundItem) {
          selectedItem.value = foundItem;
        } else {
          selectedItem.value = null;
        }
      } else {
        selectedItem.value = null;
      }
    });
    const filteredItems = computed(() => {
      var _a;
      const query = ((_a = inputValue.value) == null ? void 0 : _a.toLowerCase().trim()) || "";
      if (!query) {
        return getUniqueItems();
      }
      if (props.useApiSearch && props.apiSearchFunction) {
        return apiSearchResults.value;
      }
      const byCityExact = [];
      const byCityStart = [];
      const byCityInclude = [];
      const byRegion = [];
      props.items.forEach((item) => {
        var _a2, _b;
        const cityName = item.name || item.locality || item.city;
        const regionName = ((_a2 = item.region) == null ? void 0 : _a2.name) || "";
        const federalDistrict = ((_b = item.region) == null ? void 0 : _b.federalDistrict) || "";
        const pvzType = item.type || "";
        const pvzStreet = item.street || "";
        const pvzHouseNumber = item.houseNumber || "";
        const pvzPhone = item.phone || "";
        if (pvzType) {
          const typeLower = pvzType.toLowerCase();
          const streetLower = pvzStreet.toLowerCase();
          const houseLower = pvzHouseNumber.toLowerCase();
          const phoneLower = pvzPhone.toLowerCase();
          const combinedString2 = `${typeLower} ${streetLower} ${houseLower} ${phoneLower}`.trim();
          const typeExact = typeLower === query;
          const typeStart = typeLower.startsWith(query);
          const typeInclude = typeLower.includes(query);
          const streetMatch = streetLower.includes(query);
          const houseMatch = houseLower.includes(query);
          const phoneMatch = phoneLower.includes(query);
          const combinedMatch2 = combinedString2.includes(query);
          if (typeExact) {
            byCityExact.push(item);
          } else if (typeStart) {
            byCityStart.push(item);
          } else if (typeInclude || streetMatch || houseMatch || phoneMatch || combinedMatch2) {
            byCityInclude.push(item);
          }
          return;
        }
        if (!cityName) return;
        const cityLower = cityName.toLowerCase();
        const regionLower = regionName.toLowerCase();
        const federalLower = federalDistrict.toLowerCase();
        const combinedString = `${cityLower} ${regionLower} ${federalLower}`.trim();
        const cityExact = cityLower === query;
        const cityStart = cityLower.startsWith(query);
        const cityInclude = cityLower.includes(query);
        const regionMatch = regionLower.includes(query);
        const federalMatch = federalLower.includes(query);
        const combinedMatch = combinedString.includes(query);
        if (cityExact) {
          byCityExact.push(item);
        } else if (cityStart) {
          byCityStart.push(item);
        } else if (cityInclude) {
          byCityInclude.push(item);
        } else if (regionMatch || federalMatch || combinedMatch) {
          byRegion.push(item);
        }
      });
      return [...byCityExact, ...byCityStart, ...byCityInclude, ...byRegion];
    });
    const getUniqueItems = () => {
      return props.items.filter((item) => {
        const cityName = item.name || item.locality || item.city;
        const pvzType = item.type;
        if (pvzType) {
          return pvzType && pvzType.trim() !== "";
        }
        return cityName && cityName.trim() !== "";
      });
    };
    const formatItemToString = (item) => {
      if (props.itemFormatter) {
        return props.itemFormatter(item);
      }
      return formatLocalityName(item);
    };
    const formatSelectedValue = (item) => {
      if (props.selectedValueFormatter) {
        return props.selectedValueFormatter(item);
      }
      return formatSelectedLocalityName(item);
    };
    const formatItemHTML = (item) => {
      const formattedText = formatItemToString(item);
      return `
        <div style="line-height:1.3; padding:2px 0;">
            <div>${formattedText}</div>
        </div>
    `;
    };
    const getItemKey = (item, index) => {
      return `${item.locality || item.city || ""}-${item.street || item.address || ""}-${index}`;
    };
    const performApiSearch = async (query) => {
      if (!props.apiSearchFunction || !query) {
        apiSearchResults.value = [];
        return;
      }
      isApiSearching.value = true;
      try {
        const results = await props.apiSearchFunction(query);
        apiSearchResults.value = results || [];
      } catch (error) {
        console.error("Ошибка API поиска:", error);
        apiSearchResults.value = [];
      } finally {
        isApiSearching.value = false;
      }
    };
    let searchTimeout = null;
    const debouncedApiSearch = (query) => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        performApiSearch(query);
      }, 300);
    };
    const onInput = () => {
      var _a;
      const value = ((_a = inputValue.value) == null ? void 0 : _a.trim()) || "";
      currentIndex.value = -1;
      selectedItem.value = null;
      if (!value) {
        isDropdownVisible.value = false;
        apiSearchResults.value = [];
        return;
      }
      if (props.useApiSearch && props.apiSearchFunction) {
        debouncedApiSearch(value);
        isDropdownVisible.value = true;
        return;
      }
      if (filteredItems.value.length === 0) {
        isDropdownVisible.value = false;
        return;
      }
      isDropdownVisible.value = true;
    };
    const onFocus = () => {
      var _a;
      const value = ((_a = inputValue.value) == null ? void 0 : _a.trim()) || "";
      if (!value) return;
      if (filteredItems.value.length > 0) {
        isDropdownVisible.value = true;
      }
    };
    const onToggleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (props.disabled) return;
      if (isSpecificOfficeSelected.value) return;
      if (isDropdownVisible.value) {
        isDropdownVisible.value = false;
      } else {
        showAllSuggestions();
      }
    };
    const showAllSuggestions = () => {
      currentIndex.value = -1;
      isDropdownVisible.value = true;
    };
    const selectItem = (item) => {
      inputValue.value = formatSelectedValue(item);
      selectedItem.value = item;
      isDropdownVisible.value = false;
      Promise.resolve().then(() => {
        if (props.emitFullItem) {
          emit("itemSelected", item);
        } else {
          emit("itemSelected", { city: item.locality || item.city });
        }
      });
    };
    const selectItemById = (id) => {
      const item = props.items.find((office) => office.id === parseInt(id));
      if (item) {
        selectItem(item);
        return true;
      }
      return false;
    };
    const setInputValue = (value) => {
      inputValue.value = value;
      isDropdownVisible.value = false;
      currentIndex.value = -1;
    };
    __expose({
      selectItemById,
      setInputValue
    });
    const onKeydown = (e) => {
      var _a, _b;
      const items = ((_a = listRef.value) == null ? void 0 : _a.querySelectorAll("li")) || [];
      if (!isDropdownVisible.value || items.length === 0) {
        if (e.key === "ArrowDown" && ((_b = inputValue.value) == null ? void 0 : _b.trim()) === "") {
          e.preventDefault();
          showAllSuggestions();
          return;
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        currentIndex.value = (currentIndex.value + 1) % items.length;
        highlightItem(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        currentIndex.value = (currentIndex.value - 1 + items.length) % items.length;
        highlightItem(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentIndex.value >= 0 && currentIndex.value < filteredItems.value.length) {
          const item = filteredItems.value[currentIndex.value];
          if (item) selectItem(item);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        isDropdownVisible.value = false;
      }
    };
    const highlightItem = (items) => {
      if (currentIndex.value >= 0 && listRef.value) {
        const selectedItem2 = items[currentIndex.value];
        const listRect = listRef.value.getBoundingClientRect();
        const itemRect = selectedItem2.getBoundingClientRect();
        if (itemRect.bottom > listRect.bottom) {
          selectedItem2.scrollIntoView(false);
        } else if (itemRect.top < listRect.top) {
          selectedItem2.scrollIntoView(true);
        }
      }
    };
    const handleGlobalClick = (e) => {
      if (!listRef.value || !inputRef.value) return;
      if (!listRef.value.contains(e.target) && e.target !== inputRef.value && !e.target.closest(".absolute.right-0.top-0")) {
        isDropdownVisible.value = false;
      }
    };
    const resetInput = () => {
      inputValue.value = "";
      selectedItem.value = null;
      emit("update:modelValue", "");
      emit("reset");
    };
    onMounted(() => {
      document.addEventListener("click", handleGlobalClick);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleGlobalClick);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          for: inputId.value,
          class: "block text-brand-gray font-medium mb-2"
        }, toDisplayString(__props.label), 9, _hoisted_1)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2, [
          withDirectives(createBaseVNode("input", {
            id: inputId.value,
            ref_key: "inputRef",
            ref: inputRef,
            type: "text",
            class: normalizeClass(["vue-form-field w-full", [
              unref(errorMessage) ? "border-red-500" : "",
              __props.disabled ? "bg-gray-100 cursor-not-allowed" : ""
            ]]),
            placeholder: __props.placeholder,
            autocomplete: "off",
            required: __props.required,
            disabled: __props.disabled,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
            onInput,
            onFocus,
            onKeydown,
            onBlur: _cache[1] || (_cache[1] = (...args) => unref(handleBlur) && unref(handleBlur)(...args))
          }, null, 42, _hoisted_3), [
            [vModelText, unref(inputValue)]
          ]),
          createBaseVNode("button", {
            type: "button",
            class: "absolute right-0 top-0 h-full w-12 text-gray-400 focus:outline-none z-10",
            onClick: onToggleClick,
            disabled: __props.disabled
          }, null, 8, _hoisted_4),
          !isSpecificOfficeSelected.value ? (openBlock(), createElementBlock("img", _hoisted_5)) : createCommentVNode("", true),
          __props.showResetButton && unref(inputValue) && unref(inputValue).trim() && isSpecificOfficeSelected.value ? (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            onClick: resetInput,
            class: normalizeClass([
              "absolute top-1/2 -translate-y-1/2 text-brand-blue hover:text-red-500 z-20 bg-white p-2 right-1"
            ])
          }, _cache[2] || (_cache[2] = [
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
          ]))) : createCommentVNode("", true),
          createBaseVNode("ul", {
            ref_key: "listRef",
            ref: listRef,
            class: normalizeClass(["absolute w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-20", { "hidden": !isDropdownVisible.value }]),
            style: { "max-height": "200px", "overflow-y": "auto", "overscroll-behavior": "contain" }
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredItems.value, (item, index) => {
              return openBlock(), createElementBlock("li", {
                key: getItemKey(item, index),
                class: normalizeClass(["px-4 py-2 hover:bg-blue-100 cursor-pointer", { "bg-blue-100": currentIndex.value === index }]),
                "data-office-id": item.id,
                onClick: ($event) => selectItem(item),
                innerHTML: formatItemHTML(item)
              }, null, 10, _hoisted_6);
            }), 128))
          ], 2),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_7, "*")) : createCommentVNode("", true)
        ]),
        unref(errorMessage) ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(unref(errorMessage)), 1)) : __props.hint ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(__props.hint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
const AutocompleteInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c28f3003"]]);
export {
  AutocompleteInput as A,
  formatSelectedLocalityName as a,
  formatLocalityName as f
};
