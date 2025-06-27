<template>
  <div>
    <!-- Search Input -->
    <div class="form-control w-full mb-6">

      <EasyDataTableWrapper :headers="headers" :items="filteredItems" :searchable="true"
        search-placeholder="Поиск по дате, номеру акта, сумме или организации" :show-index="false"
        @update:search="handleSearch">
        <!-- Custom 'Дата' slot -->
        <template #item-date="item">
          <span class="text-brand-gray text-center text-center block">{{ item.date }}</span>
        </template>

        <!-- Custom 'Номер акта' slot -->
        <template #item-actNumber="item">
          <span class="text-brand-gray text-center text-center block">{{ item.actNumber }}</span>
        </template>

        <!-- Custom 'Сумма' slot -->
        <template #item-amount="item">
          <span class="text-brand-gray text-center block">{{ item.amount }}</span>
        </template>

        <!-- Custom 'Название организации' slot -->
        <template #item-organizationName="item">
          <span class="text-brand-gray">{{ item.organizationName }}</span>
        </template>

        <!-- Custom 'Действие' slot -->
        <template #item-action="item">
          <button class="send-email-btn w-full flex items-center justify-center gap-1 text-brand-blue"
            @click="openSendEmailModal(item)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>Отправить на почту
          </button>
        </template>
      </EasyDataTableWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import EasyDataTableWrapper from '../../../components/tables/EasyDataTableWrapper.vue';
// import { useGlobalModalStore } from '../../../stores/globalModal'; // Удаляем импорт для глобального стора модальных окон

// Import modal components
import EmailSendModal from '../../../components/modals/EmailSendModal.vue';

// const globalModalStore = useGlobalModalStore(); // Удаляем локальный экземпляр стора

const initialItems = ref<any[]>([]);
const searchTerm = ref('');

onMounted(() => {
  if (window.initialData && window.initialData.serviceActs) {
    initialItems.value = window.initialData.serviceActs;
    console.log('ServiceActsPage: initialItems loaded', initialItems.value);
  }
});

const headers = ref([
  { text: "Дата", value: "date", sortable: true, width: 80, },
  { text: "Номер акта", value: "actNumber", sortable: true, width: 150 },
  { text: "Сумма", value: "amount", sortable: true, width: 80 },
  { text: "Название организации", value: "organizationName", sortable: true },
  { text: "Действие", value: "action", sortable: false, width: 200 },
]);

const filteredItems = computed(() => {
  let items = initialItems.value;

  console.log('ServiceActsPage: Filtering items with searchTerm', searchTerm.value);

  // Filter by search term (date, actNumber, amount, organizationName)
  if (searchTerm.value) {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    items = items.filter(item => {
      const dateMatch = item.date.toLowerCase().includes(lowerCaseSearchTerm);
      const actNumberMatch = item.actNumber.toLowerCase().includes(lowerCaseSearchTerm);
      const amountMatch = item.amount.toString().toLowerCase().includes(lowerCaseSearchTerm);
      const organizationNameMatch = item.organizationName.toLowerCase().includes(lowerCaseSearchTerm);

      console.log(`Item: ${item.actNumber}, Search: ${lowerCaseSearchTerm}, DateMatch: ${dateMatch}, ActNumberMatch: ${actNumberMatch}, AmountMatch: ${amountMatch}, OrgNameMatch: ${organizationNameMatch}`);

      return (
        dateMatch ||
        actNumberMatch ||
        amountMatch ||
        organizationNameMatch
      );
    });
  }

  console.log('ServiceActsPage: Filtered items count', items.length);
  return items;
});

const handleSearch = (value: string) => {
  searchTerm.value = value;
  console.log('ServiceActsPage: searchTerm updated', searchTerm.value);
};

const openSendEmailModal = async (item: any) => {
  // console.log('Attempting to open Send Email Modal for item:', item); // Удаляем лог
  try {
    const result = await (window.globalModalStore as any).openModal(
      EmailSendModal,
      { actNumber: item.actNumber, organizationName: item.organizationName },
      'default'
    );
    // console.log('Send Email Modal Result:', result);
  } catch (error) {
    // console.error('Send Email Modal cancelled:', error);
  }
};
</script>

<style scoped>
/* Add any specific styles for this page if necessary */
</style>