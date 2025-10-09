<template>
  <div class="easy-data-table-wrapper bg-white rounded-lg">
    <!-- Search Input (теперь опционально через слот) -->
    <div v-if="searchable">
      <slot name="search">
        <div class="p-4 border-b border-gray-200">
          <div class="relative bg-gray-50 rounded-xl">
            <input
              type="text"
              v-model="searchValueModel"
              :placeholder="searchPlaceholder"
              class="w-full px-5 py-3 bg-transparent rounded-xl focus:outline-none text-gray-800 placeholder-gray-400 pr-12"
              @input="onSearchInput"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </span>
          </div>
        </div>
      </slot>
    </div>

    <!-- EasyDataTable Component -->
    <EasyDataTable
      ref="easyTableRef"
      :headers="headers"
      :items="items"
      :rows-per-page="rowsPerPage"
      :alternating="alternating"
      :border-cell="borderCell"
      :buttons-pagination="buttonsPagination"
      :show-index="showIndex"
      :table-class-name="tableClassName"
      :search-field="searchField"
      :search-value="searchValueModel"
      :loading="loading"
      :empty-slot-message="emptySlotMessage"
      hide-rows-per-page
      rows-of-page-separator-message=" из "
      :i18n="i18n"
      theme-color="#008DD2"
      v-bind="selectable ? { 'items-selected': itemsSelectedModel, 'fixed-checkbox': fixedCheckbox } : {}"
      @update:page="handleUpdatePage"
      @update:rows-per-page="handleUpdateRowsPerPage"
      @update:sort="handleUpdateSort"
      @update:items-selected="selectable ? itemsSelectedModel = $event : null"
    >
      <!-- Customizing header slots if needed -->
      <template v-for="header in headers" #[`header-${header.value}`]="header">
        <slot :name="`header-${header.value}`" v-bind="header">{{ header.text }}</slot>
      </template>

      <!-- Customizing item slots if needed -->
      <template v-for="header in headers" #[`item-${header.value}`]="item">
        <slot :name="`item-${header.value}`" v-bind="item"></slot>
      </template>

      <!-- Customizing footer slot for pagination -->
      <!-- Удаляем кастомный слот пагинации, чтобы использовать встроенный buttons-pagination -->

    </EasyDataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import type { Header, Item, SortType } from 'vue3-easy-data-table';

// Define the i18n function
const i18n = (key, args) => {
  console.log('i18n key:', key, 'args:', args);
  switch (key) {
    case 'displayItems':
      // args contains { currentPage, currentRowsPerPage, totalItem }
      const start = (args.currentPage - 1) * args.currentRowsPerPage + 1;
      const end = Math.min(args.currentPage * args.currentRowsPerPage, args.totalItem);
      return `${start}-${end} из ${args.totalItem}`;
    // Add other keys if needed in the future
    default:
      // Fallback to default English text if the key is not handled
      // In a real app, you might want to use a proper i18n library
      console.warn(`Missing translation key: ${key}`);
      return key; // Or some default English text representation
  }
};

interface EasyDataTableProps {
  headers: Header[];
  items: Item[];
  rowsPerPage?: number;
  alternating?: boolean;
  borderCell?: boolean;
  buttonsPagination?: boolean;
  showIndex?: boolean;
  tableClassName?: string;
  searchable?: boolean;
  searchField?: string | string[];
  searchPlaceholder?: string;
  loading?: boolean;
  emptySlotMessage?: string;
  initialSearchValue?: string;
  itemsSelected?: Item[];
  fixedCheckbox?: boolean;
  selectable?: boolean;
  searchValue?: string;
}

const props = withDefaults(defineProps<EasyDataTableProps>(), {
  rowsPerPage: 10,
  alternating: false,
  borderCell: true,
  buttonsPagination: true,
  showIndex: true,
  tableClassName: 'customize-table',
  searchable: false,
  searchField: undefined,
  searchPlaceholder: 'Поиск...',
  loading: false,
  emptySlotMessage: 'Нет данных',
  initialSearchValue: '',
  itemsSelected: () => [],
  fixedCheckbox: true,
  selectable: false,
  searchValue: undefined
});

const emit = defineEmits(['update:page', 'update:rows-per-page', 'update:sort', 'update:search', 'update:itemsSelected', 'update:searchValue']);

// Универсальная реактивная модель поиска
const localSearchValue = ref(props.initialSearchValue);
const searchValueModel = computed({
  get: () => props.searchValue !== undefined ? props.searchValue : localSearchValue.value,
  set: (val) => {
    if (props.searchValue !== undefined) {
      emit('update:searchValue', val);
    } else {
      localSearchValue.value = val;
    }
    emit('update:search', val);
  }
});

const easyTableRef = ref(null); // Define the ref

const itemsSelectedModel = ref<Item[]>(props.itemsSelected);

watch(() => props.itemsSelected, (newValue) => {
  itemsSelectedModel.value = newValue;
});

watch(itemsSelectedModel, (newValue) => {
  if (props.selectable) {
    emit('update:itemsSelected', newValue);
  }
});

watch(() => props.initialSearchValue, (newValue) => {
  searchValueModel.value = newValue;
});

const onSearchInput = () => {
  emit('update:search', searchValueModel.value);
  emit('update:searchValue', searchValueModel.value);
};

const handleUpdatePage = (page: number) => {
  emit('update:page', page);
};

const handleUpdateRowsPerPage = (rows: number) => {
  emit('update:rows-per-page', rows);
};

const handleUpdateSort = (sortBy: string, sortType: SortType) => {
  emit('update:sort', { sortBy, sortType });
};

// Expose internal methods if needed, for example, to clear search from parent
defineExpose({
  clearSearch() {
    searchValueModel.value = '';
    emit('update:search', '');
    emit('update:searchValue', '');
  }
});
</script>

<style scoped>
.easy-data-table-wrapper {
  /* Basic styling for the wrapper, matches existing card style */
  
}
.easy-table-footer {
  overflow: visible;
}

.customize-table {
  --easy-table-header-font-size: 0.875rem; /* text-sm */
  --easy-table-header-font-weight: 500; /* font-medium */
  --easy-table-header-font-color: #4a5568; /* text-brand-gray */
  --easy-table-header-background-color: #f9fafb; /* bg-gray-50 */
  --easy-table-border: 1px solid #e2e8f000; /* border-gray-200 */
  --easy-table-row-border: 1px solid #e2e8f0; /* border-gray-200 */

  --easy-table-body-row-hover-background-color: #f9fafb; /* hover:bg-gray-50 */
  --easy-table-body-row-font-color: #4a5568; /* text-brand-gray */

  --easy-table-row-index-font-color: #4a5568;
  --easy-table-row-index-background-color: #f9fafb;

  --easy-table-footer-background-color: transparent;
  --easy-table-footer-font-color: #718096; /* text-base-content/70 */
  --easy-table-footer-font-size: 0.875rem; /* text-sm */

  --easy-table-message-font-color: #718096;
  --easy-table-message-font-size: 1rem;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-z-index: 1;
  --easy-table-border-radius: 0.5rem; /* rounded-lg */

  /* Pagination button styles */
  --easy-table-toggle-button-background-color: #f3f4f6; /* bg-gray-100 */
  --easy-table-toggle-button-color: #4a5568; /* text-gray-800 */
  --easy-table-toggle-button-border-radius: 0.25rem; /* rounded-md */
  --easy-table-toggle-button-font-weight: 600; /* font-semibold */
  --easy-table-toggle-button-padding: 0.25rem 0.75rem; /* px-3 py-1 */
  --easy-table-toggle-button-margin: 0 0.5rem; /* increased horizontal margin */

  /* Active button styles - overriding library default */
  .buttons-pagination .item.button.active {
    background-color: #008DD2 !important; /* brand-blue */
    border-color: #008DD2 !important; /* brand-blue */
    color: #ffffff !important; /* white */
  }
  .buttons-pagination .button{
    margin: 0 0.125rem!important;
  }
}
</style> 