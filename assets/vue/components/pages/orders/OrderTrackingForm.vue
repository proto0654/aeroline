<template>
    <form class="form form-dark flex flex-row w-full gap-2" @submit.prevent="submitForm">
        <div class="flex items-center rounded-lg grow px-1">
            <input type="text" placeholder="Номер заказа"
                class="border border-gray-200 px-4 py-3 w-full focus:outline-none text-body-secondary focus:border-gray!"
                v-model="orderNumber" />
        </div>
        <button
            class="btn-gray px-3 py-2 rounded-lg text-white flex flex-rows items-center justify-center gap-1 min-w-[3em] text-buttons">
            <img src="/assets/img/search.svg" alt="Поиск" class="w-6 h-6">
        </button>
    </form>
</template>

<script>
export default {
    props: {
        initialOrderNumber: {
            type: String,
            default: null,
        }
    },
    data() {
        return {
            orderNumber: this.initialOrderNumber || '',
        };
    },
    watch: {
        initialOrderNumber(newVal) {
            if (newVal) {
                this.orderNumber = newVal;
            }
        }
    },
    methods: {
        submitForm() {
            this.$emit('search', this.orderNumber);
        },
    },
};
</script>