<template>
    <div class="bg-brand-light rounded-2xl">
        <section class="relative z-10 ">
            <div class="flex flex-col">
                <div class="flex flex-col-reverse md:flex-row gap-6 items-stretch">
                    <div class="md:basis-2/5 w-full flex flex-col justify-center p-4 md:p-8">
                        <h2 class="text-h5 md:text-h4 font-bold text-brand-gray mb-4">Отследить посылку</h2>
                        <order-tracking-form @search="handleSearch"
                            :initial-order-number="orderNumberFromUrl"></order-tracking-form>
                        <div class="relative mt-2 w-full">
                            <span
                                class="text-sm text-base-content underline cursor-pointer tooltip tooltip-bottom block w-full md:w-auto md:max-w-[20rem] xl:inline-block"
                                id="order-hint-trigger"
                                data-tip="Обычно номер заказа можно найти в СМС, email, или в личном кабинете.&#10;Если у вас нет номера заказа — запросите его у продавца или отправителя."
                                tabindex="0">
                                Где найти номер заказа?
                            </span>
                        </div>
                    </div>
                    <div class="md:basis-3/5 w-full flex items-center justify-center">
                        <img src="/assets/img/layout/order-tracking-img.png" alt="Грузовик и коробки"
                            class="md:max-h-[250px] object-cover md:object-right w-full md:max-w-full object-contain rounded-2xl" />
                    </div>
                </div>
            </div>
        </section>

        <div v-if="loading || error" class="text-center p-20">
            <p class="text-h5" :class="{ 'text-red-500': error && !isNotFound }">
                {{ messageText }}
            </p>
        </div>

        <section v-if="order" class="flex flex-col md:flex-row-reverse gap-2 relative z-1 bg-brand-light">
            <order-tracking-details :order="order"></order-tracking-details>
            <order-tracking-status :tracking="order.tracking"></order-tracking-status>
        </section>
    </div>
</template>

<script>
import OrderTrackingForm from './OrderTrackingForm.vue';
import OrderTrackingStatus from './OrderTrackingStatus.vue';
import OrderTrackingDetails from './OrderTrackingDetails.vue';

export default {
    components: {
        OrderTrackingForm,
        OrderTrackingStatus,
        OrderTrackingDetails,
    },
    data() {
        return {
            order: null,
            loading: false,
            error: null,
            orderNumberFromUrl: null,
        };
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.orderNumberFromUrl = urlParams.get('orderNumber');
        if (this.orderNumberFromUrl) {
            this.handleSearch(this.orderNumberFromUrl);
        }
    },
    methods: {
        async handleSearch(orderNumber) {
            if (!orderNumber) {
                alert('Пожалуйста, введите номер заказа');
                return;
            }
            this.loading = true;
            this.error = null;
            this.order = null;
            try {
                const response = await fetch(`https://devserveraero.space/getclientpurchase/?orderNumber=${orderNumber}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Заказ не найден. Проверьте правильность номера.');
                    }
                    throw new Error('Произошла ошибка при загрузке данных.');
                }
                const text = await response.text();
                if (!text) {
                    throw new Error('Заказ не найден. Проверьте правильность номера.');
                }
                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    throw new Error('Заказ не найден. Проверьте правильность номера.');
                }
                this.order = data;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
    },
    computed: {
        isNotFound() {
            return this.error === 'Заказ не найден. Проверьте правильность номера.';
        },
        messageText() {
            if (this.error) {
                return this.isNotFound
                    ? 'Заказ не найден. Проверьте правильность номера или попробуйте другой номер.'
                    : this.error;
            }
            return 'Загрузка...';
        }
    },
};
</script>