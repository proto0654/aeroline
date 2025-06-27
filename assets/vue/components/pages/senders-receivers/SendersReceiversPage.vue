<template>
  <div>
    <!-- Tabs and Create Button -->
    <div class="flex items-stretch md:items-center justify-between flex-col-reverse md:flex-row w-full mb-4 mt-2">
      <div class="btn-group bg-gray-100 rounded-2xl p-2 gap-2 flex flex-col md:flex-row [&>button]:py-2 [&>button]:px-8 [&>button]:font-semibold">
        <button
          class="type-tab rounded-xl"
          :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'all', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'all'}"
          @click="setActiveTab('all')"
        >
          ВСЕ
        </button>
        <button
          class="type-tab rounded-xl"
          :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'Юр.лицо', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'Юр.лицо'}"
          @click="setActiveTab('Юр.лицо')"
        >
          ЮР.ЛИЦО
        </button>
        <button
          class="type-tab rounded-xl"
          :class="{'data-[active=true]:bg-white data-[active=true]:text-gray-800': activeTab === 'Физ.лицо', 'data-[active=false]:bg-transparent data-[active=false]:text-gray-500': activeTab !== 'Физ.лицо'}"
          @click="setActiveTab('Физ.лицо')"
        >
          ФИЗ.ЛИЦО
        </button>
      </div>
      <button type="button" id="create-btn" class="btn btn-primary rounded-xl px-8 my-5 py-3 font-semibold shadow" @click="openCreateModal">
        Создать
      </button>
    </div>

    <!-- Add buttons for actions on selected items -->
    <div v-if="selectedItems.length > 0" class="flex items-center mb-4 gap-2">
      <span class="text-brand-gray font-semibold">Выбрано: {{ selectedItems.length }}</span>
      <button 
        class="btn btn-sm btn-error text-white rounded-xl px-4 font-semibold shadow" 
        @click="openDeleteSelectedModal"
      >
        Удалить выбранные ({{ selectedItems.length }})
      </button>
      <!-- Редактирование недоступно для нескольких строк -->
       <button 
        class="btn btn-sm btn-warning text-white rounded-xl px-4 font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="selectedItems.length !== 1"
        @click="openEditModal(selectedItems[0])"
      >
        Редактировать выбранную
      </button>
    </div>

    <!-- EasyDataTableWrapper Component -->
    <EasyDataTableWrapper
      v-model:items-selected="selectedItems"
      :headers="headers"
      :items="filteredItems"
      :searchable="true"
      search-field="name"
      search-placeholder="Компания, ФИО или телефон"
      :selectable="true"
      :show-index="false"
      @update:search="handleSearch"
    >
      <!-- Custom 'Действия' slot -->
      <template #item-actions="item">
        <!-- Возвращаем кнопки редактирования и удаления с SVG иконками -->
        <div class="flex gap-3 justify-center">
          <button class="edit-btn text-brand-blue hover:text-brand-blue-dark transition-colors" @click="openEditModal(item)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83301 5.83398H4.99967C4.55765 5.83398 4.13372 6.00958 3.82116 6.32214C3.5086 6.6347 3.33301 7.05862 3.33301 7.50065V15.0007C3.33301 15.4427 3.5086 15.8666 3.82116 16.1792C4.13372 16.4917 4.55765 16.6673 4.99967 16.6673H12.4997C12.9417 16.6673 13.3656 16.4917 13.6782 16.1792C13.9907 15.8666 14.1663 15.4427 14.1663 15.0007V14.1673" stroke="#4D4D4D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 4.16676L15.8333 6.66676M16.9875 5.48759C17.3157 5.15938 17.5001 4.71424 17.5001 4.25009C17.5001 3.78594 17.3157 3.34079 16.9875 3.01259C16.6593 2.68438 16.2142 2.5 15.75 2.5C15.2858 2.5 14.8407 2.68438 14.5125 3.01259L7.5 10.0001V12.5001H10L16.9875 5.48759Z" stroke="#4D4D4D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
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

      <!-- Custom 'Тип' slot -->
      <template #item-type="item">
        <span class="text-brand-gray">{{ item.type }}</span>
      </template>

      <!-- Custom 'ФИО / Название' slot -->
      <template #item-name="item">
        <span class="text-brand-gray">{{ item.name }}</span>
      </template>

      <!-- Custom 'Телефон' slot -->
      <template #item-phone="item">
        <span class="text-brand-gray whitespace-nowrap">{{ item.phone }}</span>
      </template>

      <!-- Custom 'Населенный пункт' slot -->
      <template #item-location="item">
        <span class="text-brand-gray">{{ item.location }}</span>
      </template>

      <!-- Custom 'Адрес' slot -->
      <template #item-address="item">
        <span class="text-brand-gray">{{ item.address }}</span>
      </template>

      <!-- Custom 'Комментарий для курьера' slot -->
      <template #item-comment="item">
        <span class="text-brand-gray">
          {{ item.comment || '—' }}
        </span>
      </template>

    </EasyDataTableWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import EasyDataTableWrapper from '../../../components/tables/EasyDataTableWrapper.vue';
// import { useGlobalModalStore } from '../../../stores/globalModal'; // Удаляем импорт для глобального стора модальных окон

// Import modal components - assuming they exist in assets/vue/components/modals/
// import SenderReceiverModal from '../../../components/modals/SenderReceiverModal.vue'; // Удаляем импорт SenderReceiverModal
import DeleteConfirmModal from '../../../components/modals/DeleteConfirmModal.vue';
import CreateSenderReceiverForm from '../../../components/forms/CreateSenderReceiverForm.vue'; // Импортируем CreateSenderReceiverForm

// const globalModalStore = window.globalModalStore; // Используем глобальный экземпляр - УДАЛЯЕМ ЭТУ СТРОКУ

const initialItems = ref<any[]>([]);
const activeTab = ref('all');
const searchTerm = ref('');
const selectedItems = ref<any[]>([]); // Add state for selected items

onMounted(() => {
  if (window.initialData && window.initialData.sendersReceivers) {
    initialItems.value = window.initialData.sendersReceivers.map(item => ({ ...item, id: item.id || Date.now() + Math.random() })); // Ensure items have a unique ID
  }
});

const headers = ref([
  { text: "Действия", value: "actions", sortable: false, width: 40 },
  { text: "Тип", value: "type", sortable: true, width: 40 },
  { text: "ФИО / Название", value: "name", sortable: true },
  { text: "Телефон", value: "phone", sortable: true, width: 60  },
  { text: "Населенный пункт", value: "location", sortable: true },
  { text: "Адрес", value: "address", sortable: true },
  { text: "Комментарий для курьера", value: "comment", sortable: false },
]);

const filteredItems = computed(() => {
  let items = initialItems.value;

  // Filter by tab
  if (activeTab.value !== 'all') {
    items = items.filter(item => item.type === activeTab.value);
  }

  // Filter by search term (name, phone, location, address, comment)
  if (searchTerm.value) {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    items = items.filter(item => {
      return (
        item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.phone.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.location.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.address.toLowerCase().includes(lowerCaseSearchTerm) ||
        (item.comment && item.comment.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });
  }

  return items;
});

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const handleSearch = (value: string) => {
  searchTerm.value = value;
};

const openCreateModal = async () => {
  try {
    // Передаем компонент формы напрямую и пропсы отдельным аргументом
    const result = await (window.globalModalStore as any).openModal(
      CreateSenderReceiverForm, 
      { mode: 'create' }, // Пропсы вторым аргументом
      'large' // Размер третьим аргументом
    );
    console.log('Create Modal Result:', result);
    // Обработка результата после закрытия модалки (например, добавление новой записи)
    if (result && result.type === 'success' && result.data) {
      // Здесь нужно добавить логику для добавления новой записи в initialItems
      // Например, если результат содержит новую запись с ID:
      // initialItems.value.push({ id: Date.now(), ...result.data }); // Пример с временным ID
      console.log('Новая запись создана:', result.data);
      // В реальном приложении здесь должен быть вызов API и обновление списка
      alert('Запись успешно создана (имитация).');
    }

  } catch (error) {
    console.error('Create Modal cancelled:', error, '\nopenCreateModal');
  }
};

const openEditModal = async (item: any) => {
  try {
    // Передаем компонент формы напрямую с начальными данными и флагом isEdit
    const result = await (window.globalModalStore as any).openModal(
      CreateSenderReceiverForm,
      { mode: 'edit', initialData: item, isEdit: true }, // Пропсы вторым аргументом
      'large' // Размер третьим аргументом
    );
    console.log('Edit Modal Result:', result);
    // Обработка результата после закрытия модалки (например, обновление записи)
     if (result && result.type === 'success' && result.data) {
      // Здесь нужно добавить логику для обновления существующей записи в initialItems
      // Например, найти запись по ID и обновить ее:
       const index = initialItems.value.findIndex(sr => sr.id === item.id);
       if (index !== -1) {
         initialItems.value[index] = { ...initialItems.value[index], ...result.data };
       }
      console.log('Запись обновлена:', result.data);
      // В реальном приложении здесь должен быть вызов API и обновление списка
      alert('Запись успешно обновлена (имитация).');
    }

  } catch (error) {
    console.error('Edit Modal cancelled:', error);
  }
};

const openDeleteModal = async (item: any) => {
  try {
    // Исправляем вызов openModal в соответствии с сигнатурой: component, props, size
    const result = await (window.globalModalStore as any).openModal(
      DeleteConfirmModal, // Компонент первым аргументом
      { // Пропсы вторым аргументом
        title: 'Удалить запись?',
        message: `Вы действительно хотите удалить запись ${item.name}?`,
        confirmButtonText: 'Удалить',
        item: item // Pass the item object
      },
      'default' // Размер третьим аргументом - меняем на 'default'
    );
    console.log('Delete Modal Result:', result);
    // Handle result, e.g., remove item from list if result is confirmed
    if (result) {
        // Perform delete operation here, e.g., call API or remove from local state
        initialItems.value = initialItems.value.filter(sr => sr.id !== item.id);
        // Deselect the item after deletion
        selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== item.id);
    }
  } catch (error) {
    console.error('Delete Modal cancelled:', error);
  }
};

// Add new function to open confirmation modal for deleting selected items
const openDeleteSelectedModal = async () => {
  if (selectedItems.value.length === 0) return; // Do nothing if no items are selected

  try {
    // Исправляем вызов openModal в соответствии с сигнатурой: component, props, size
    const result = await (window.globalModalStore as any).openModal(
      DeleteConfirmModal, // Компонент первым аргументом
      { // Пропсы вторым аргументом
        title: `Удалить выбранные записи (${selectedItems.value.length})?`,
        message: `Вы действительно хотите удалить выбранные записи?`, // Можно добавить список записей
        confirmButtonText: 'Удалить все',
        item: selectedItems.value // Pass the selected items array (modal needs to handle array)
      },
      'default' // Размер третьим аргументом - меняем на 'default'
    );

    console.log('Delete Selected Modal Result:', result);

    if (result) {
      // Perform bulk delete operation here
      const selectedIds = selectedItems.value.map(item => item.id);
      initialItems.value = initialItems.value.filter(item => !selectedIds.includes(item.id));
      // Clear selected items after deletion
      selectedItems.value = [];
       alert(`${selectedIds.length} записей успешно удалено (имитация).`);
    }
  } catch (error) {
    console.error('Delete Selected Modal cancelled:', error);
  }
};
</script>

<style scoped>
/* Add any specific styles for this page if necessary */
</style> 