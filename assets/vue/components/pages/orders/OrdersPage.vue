<template>
  <div>
    <!-- Кнопка создания -->
    <div class="flex items-stretch md:items-center justify-end w-full mb-4 mt-2">
      <button type="button" id="create-btn" class="btn btn-primary rounded-xl px-8 my-5 py-3 font-semibold shadow" @click="openCreateModal">
        Создать
      </button>
    </div>

    <!-- Таблица с поиском (search-value) и кастомным полем через слот -->
    <EasyDataTableWrapper
      v-model:items-selected="selectedItems"
      :headers="headers"
      :items="tabFilteredItems"
      :searchable="true"
      search-field="number"
      :search-value="searchValue"
      :selectable="true"
      :show-index="false"
    >
      <template #search>
        <div class="mb-4 flex justify-between items-center flex-wrap gap-2">
          <input
            v-model="searchValue"
            type="text"
            placeholder="Поиск по номеру заказа"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
      </template>

      <!-- Custom 'Действия' slot -->
      <template #item-actions="item">
        <div class="flex gap-3 justify-center">
          <button class="info-btn text-brand-blue hover:text-brand-blue-dark transition-colors" @click="viewOrderDetails(item)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0003 3.33398C5.83366 3.33398 2.27533 6.15065 0.833664 10.0007C2.27533 13.8507 5.83366 16.6673 10.0003 16.6673C14.167 16.6673 17.7253 13.8507 19.167 10.0007C17.7253 6.15065 14.167 3.33398 10.0003 3.33398Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 13.334C11.8409 13.334 13.3333 11.8415 13.3333 10.0007C13.3333 8.15979 11.8409 6.66732 10 6.66732C8.15905 6.66732 6.66667 8.15979 6.66667 10.0007C6.66667 11.8415 8.15905 13.334 10 13.334Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="track-btn text-brand-green hover:text-brand-green-dark transition-colors" @click="trackOrder(item)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0003 17.5007C14.167 17.5007 17.5003 14.1673 17.5003 10.0007C17.5003 5.83398 14.167 2.50065 10.0003 2.50065C5.83366 2.50065 2.50033 5.83398 2.50033 10.0007C2.50033 14.1673 5.83366 17.5007 10.0003 17.5007Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.99967 6.66732V10.0007" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.33301 2.5H11.6663" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.99967 10.0007L13.333 13.334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="delete-btn text-red-500 hover:text-red-700 transition-colors" @click="openDeleteModal(item)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9 1.66602C12.2498 1.66611 12.5907 1.77625 12.8744 1.98086C13.1581 2.18546 13.3703 2.47414 13.4808 2.80602L13.7947 3.74935H12.0387L11.9 3.33268H8.1L7.96125 3.74935H6.2053L6.51917 2.80602C6.62975 2.47401 6.84203 2.18523 7.12592 1.98061C7.4098 1.776 7.75089 1.66593 8.10083 1.66602H11.9ZM12.1775 4.16602H7.8225H6.06667H3.33333C3.11232 4.16602 2.90036 4.25381 2.74408 4.41009C2.5878 4.56637 2.5 4.77834 2.5 4.99935C2.5 5.22036 2.5878 5.43232 2.74408 5.5886C2.90036 5.74488 3.11232 5.83268 3.33333 5.83268L3.33583 5.89102L4.05833 16.011C4.10342 16.6415 4.38569 17.2315 4.84831 17.6623C5.31092 18.0931 5.91955 18.3326 6.55167 18.3327H13.4483C14.0805 18.3326 14.6891 18.0931 15.1517 17.6623C15.6143 17.2315 15.8966 16.6415 15.9417 16.011L16.6642 5.89185L16.6667 5.83268C16.8877 5.83268 17.0996 5.74488 17.2559 5.5886C17.4122 5.43232 17.5 5.22036 17.5 4.99935C17.5 4.77834 17.4122 4.56637 17.2559 4.41009C17.0996 4.25381 16.8877 4.16602 16.6667 4.16602H13.9333H12.1775ZM14.9975 5.83268H5.0025L5.72083 15.8918C5.73579 16.102 5.82981 16.2987 5.98397 16.4424C6.13812 16.586 6.34096 16.6659 6.55167 16.666H13.4483C13.659 16.6659 13.8619 16.586 14.016 16.4424C14.1702 16.2987 14.2642 16.102 14.2792 15.8918L14.9975 5.83268Z" fill="#D64877"/>
              <rect x="7.60938" y="8.33398" width="7.5" height="1.33333" rx="0.666667" transform="rotate(45 7.60938 8.33398)" fill="#D64877"/>
              <rect width="7.5" height="1.33333" rx="0.666667" transform="matrix(-0.707107 0.707107 0.707107 0.707107 11.9697 8.33398)" fill="#D64877"/>
            </svg>
          </button>
        </div>
      </template>

      <!-- Custom 'Номер' slot -->
      <template #item-number="item">
        <span class="text-brand-gray">{{ item.number }}</span>
      </template>

      <!-- Custom 'Создан' slot -->
      <template #item-created="item">
        <span class="text-brand-gray">{{ item.created }}</span>
      </template>

      <!-- Custom 'Откуда' slot -->
      <template #item-from="item">
        <span class="text-brand-gray">{{ item.from.region }}, {{ item.from.city }}</span>
      </template>

      <!-- Custom 'Куда' slot -->
      <template #item-to="item">
        <span class="text-brand-gray">{{ item.to.region }}, {{ item.to.city }}</span>
      </template>

      <!-- Custom 'Забран' slot -->
      <template #item-pickupDate="item">
        <span class="text-brand-gray">{{ item.pickupDate }}</span>
      </template>

      <!-- Custom 'Доставлен' slot -->
      <template #item-deliveryDate="item">
        <span class="text-brand-gray">{{ item.deliveryDate }}</span>
      </template>

      <!-- Custom 'Статус' slot -->
      <template #item-status="item">
        <span class="text-brand-gray font-medium" :class="{
          'text-yellow-500': item.status === 'СОЗДАН',
          'text-blue-500': item.status === 'В ПУТИ',
          'text-green-500': item.status === 'ГОТОВ К ВЫДАЧЕ',
          'text-red-500': item.status === 'НД'
        }">
          {{ item.status }}
        </span>
      </template>

    </EasyDataTableWrapper>

    <!-- Табы фильтрации по статусу под поиском -->
    <div class="flex flex-wrap gap-2 mt-4 mb-4">
      <button
        class="type-tab rounded-xl"
        :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'all', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'all'}"
        @click="setActiveTab('all')"
      >ВСЕ</button>
      <button
        class="type-tab rounded-xl"
        :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'СОЗДАН', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'СОЗДАН'}"
        @click="setActiveTab('СОЗДАН')"
      >СОЗДАН</button>
      <button
        class="type-tab rounded-xl"
        :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'В ПУТИ', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'В ПУТИ'}"
        @click="setActiveTab('В ПУТИ')"
      >В ПУТИ</button>
      <button
        class="type-tab rounded-xl"
        :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'ГОТОВ К ВЫДАЧЕ', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'ГОТОВ К ВЫДАЧЕ'}"
        @click="setActiveTab('ГОТОВ К ВЫДАЧЕ')"
      >ГОТОВ К ВЫДАЧЕ</button>
      <button
        class="type-tab rounded-xl"
        :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'НД', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'НД'}"
        @click="setActiveTab('НД')"
      >НД</button>
    </div>

    <!-- Кнопки массовых действий и фильтра -->
    <div class="flex items-center gap-2 mb-4">
      <button 
        class="btn btn-sm btn-error text-white rounded-xl px-4 font-semibold shadow" 
        @click="openDeleteSelectedModal"
        v-if="selectedItems.length > 0"
      >
        Удалить выбранные ({{ selectedItems.length }})
      </button>
      <button
        class="btn btn-sm btn-ghost border border-gray-200 text-gray-700 rounded-xl px-4 font-semibold shadow-sm"
        @click="toggleFilterPanel"
      >
        Использовать фильтр
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import EasyDataTableWrapper from '../../../components/tables/EasyDataTableWrapper.vue';
import DeleteConfirmModal from '../../../components/modals/DeleteConfirmModal.vue';

const initialItems = ref<any[]>([]);
const activeTab = ref('all');
const selectedItems = ref<any[]>([]);
const showFilterPanel = ref(false);
const searchValue = ref('');

onMounted(() => {
  if (window.initialData && window.initialData.orders) {
    initialItems.value = window.initialData.orders.map(item => ({ ...item, id: item.id || Date.now() + Math.random() }));
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
  { text: "Статус", value: "status", sortable: true, width: 40 },
]);

// Только таб-фильтрация по статусу
const tabFilteredItems = computed(() => {
  if (activeTab.value === 'all') return initialItems.value;
  return initialItems.value.filter(item => item.status === activeTab.value);
});

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const toggleFilterPanel = () => {
  showFilterPanel.value = !showFilterPanel.value;
  alert('Функционал фильтрации будет реализован в следующих версиях');
};

const openCreateModal = async () => {
  try {
    alert('Функционал создания заказа будет реализован в следующих версиях');
  } catch (error) {
    console.error('Create Modal cancelled:', error);
  }
};

const openDeleteModal = async (item: any) => {
  try {
    const result = await (window.globalModalStore as any).openModal(
      DeleteConfirmModal,
      {
        title: 'Удалить заказ?',
        message: `Вы действительно хотите удалить заказ ${item.number}?`,
        confirmButtonText: 'Удалить',
        item: item
      },
      'default'
    );
    
    if (result && result.type === 'success' && result.data && result.data.success) {
      const index = initialItems.value.findIndex(order => order.id === item.id);
      if (index !== -1) {
        initialItems.value.splice(index, 1);
      }
      alert('Заказ успешно удален (имитация).');
    }
  } catch (error) {
    console.error('Delete Modal cancelled:', error);
  }
};

const openDeleteSelectedModal = async () => {
  try {
    const result = await (window.globalModalStore as any).openModal(
      DeleteConfirmModal,
      {
        title: 'Удалить выбранные заказы?',
        message: `Вы действительно хотите удалить выбранные заказы (${selectedItems.value.length})?`,
        confirmButtonText: 'Удалить',
        item: selectedItems.value
      },
      'default'
    );
    
    if (result && result.type === 'success' && result.data && result.data.success) {
      const selectedIds = selectedItems.value.map(item => item.id);
      initialItems.value = initialItems.value.filter(item => !selectedIds.includes(item.id));
      selectedItems.value = [];
      alert('Выбранные заказы успешно удалены (имитация).');
    }
  } catch (error) {
    console.error('Delete Selected Modal cancelled:', error);
  }
};

const viewOrderDetails = (item: any) => {
  alert(`Просмотр деталей заказа ${item.number} будет реализован в следующих версиях`);
};

const trackOrder = (item: any) => {
  alert(`Отслеживание заказа ${item.number} будет реализовано в следующих версиях`);
};
</script>

<style scoped>
/* Скрываем стандартное поле поиска библиотеки */
.easy-data-table-wrapper .p-4.border-b,
.easy-data-table-wrapper .easy-data-table__search {
  display: none !important;
}
</style> 