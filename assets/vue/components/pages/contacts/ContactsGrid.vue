<template>
    <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 offices-grid">
            <div v-for="office in paginatedOffices" :key="office.id"
                class="bg-brand-light h-96 rounded-xl p-8 md:p-12 flex flex-col gap-2 justify-between shadow office-card"
                :data-city="office.city" :data-coordinates="`${office.coordinates[0]},${office.coordinates[1]}`"
                @click="onCardClick(office, $event)">
                <div>
                    <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M35.2402 13.9C33.1402 4.66 25.0802 0.5 18.0002 0.5C18.0002 0.5 18.0002 0.5 17.9802 0.5C10.9202 0.5 2.84019 4.64 0.740191 13.88C-1.59981 24.2 4.72019 32.94 10.4402 38.44C12.5602 40.48 15.2802 41.5 18.0002 41.5C20.7202 41.5 23.4402 40.48 25.5402 38.44C31.2602 32.94 37.5802 24.22 35.2402 13.9ZM18.0002 23.92C14.5202 23.92 11.7002 21.1 11.7002 17.62C11.7002 14.14 14.5202 11.32 18.0002 11.32C21.4802 11.32 24.3002 14.14 24.3002 17.62C24.3002 21.1 21.4802 23.92 18.0002 23.92Z"
                            fill="#008DD2" />
                    </svg>
                    <h3 class="font-bold text-brand-gray body-secondary leading-1.2 my-2 text-h5">{{ office.city }}</h3>
                    <div class="text-brand-gray mb-2">{{ office.address }}</div>
                    <div class="text-brand-gray">{{ office.type }}</div>
                    <div class="text-brand-gray">{{ office.phone }}</div>
                    <div class="text-brand-gray">{{ office.email }}</div>
                </div>
                <a href="#map" class="text-brand-blue text-xl font-medium hover:underline mt-2">Посмотреть на карте</a>
            </div>
        </div>

        <div v-if="totalPages > 1" class="flex justify-start mt-8 pagination-container">
            <nav class="inline-flex items-center space-x-1">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                    class="w-8 h-8 flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50">&lt;</button>

                <button v-for="page in pages" :key="page" @click="changePage(page)"
                    :class="['w-8 h-8 flex items-center justify-center rounded transition-colors', page === currentPage ? 'bg-brand-blue text-white font-bold' : 'bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white']">
                    {{ page }}
                </button>

                <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                    class="w-8 h-8 flex items-center justify-center rounded bg-brand-light text-brand-gray hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50">&gt;</button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    offices: {
        type: Array,
        required: true,
    },
    initialFilter: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['card-click']);

const currentPage = ref(1);
const itemsPerPage = 9;
const selectedCity = ref(props.initialFilter);

const filteredOffices = computed(() => {
    if (!selectedCity.value || selectedCity.value === 'Все города') {
        return props.offices;
    }
    return props.offices.filter(office => office.city === selectedCity.value);
});

const totalPages = computed(() => {
    return Math.ceil(filteredOffices.value.length / itemsPerPage);
});

const paginatedOffices = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredOffices.value.slice(start, end);
});

const pages = computed(() => {
    const pagesArray = [];
    for (let i = 1; i <= totalPages.value; i++) {
        pagesArray.push(i);
    }
    return pagesArray;
});

function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

function setFilter(city) {
    selectedCity.value = city;
    currentPage.value = 1; // Сбрасываем на первую страницу при фильтрации
}

function onCardClick(office, event) {
    emit('card-click', { office, event });
}

// Делаем метод доступным для вызова извне
defineExpose({
    setFilter,
});

</script>