<template>
    <div class="md:basis-3/5 w-full p-2 md:p-6 flex flex-col gap-6 ">
        <div class="bg-white rounded-xl p-4 ">
            <div class="flex flex-col md:flex-row p-4 gap-4">
                <div class="flex-1">
                    <div class="text-xs text-gray-400 mb-1">Пункт отправления</div>
                    <div class="font-semibold text-body-secondary leading-1.2">{{ order.from }}</div>
                </div>
                <div class="flex-1">
                    <div class="text-xs text-gray-400 mb-1">Пункт назначения</div>
                    <div class="font-semibold text-brand-gray text-body-secondary leading-1.2">{{ order.to }}</div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="table w-full table-zebra">
                    <tbody>
                        <tr>
                            <td>
                                <div class="flex flex-col">
                                    <div class="text-xs text-gray-500 mb-1">Номер заказа</div>
                                    <div class="text-base font-medium text-gray-600">{{ order.orderNumber }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <div class="text-xs text-gray-500 mb-1">Номер ТН</div>
                                    <div class="text-base font-medium text-gray-600">{{ order.invoiceNumber }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <div class="text-xs text-gray-500 mb-1">Номер заказа клиента</div>
                                    <div class="text-base font-medium text-gray-600">{{ customerOrderNumberDisplay }}</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="flex flex-col">
                                    <div class="text-xs text-gray-500 mb-1">Количество мест</div>
                                    <div class="text-base font-medium text-gray-600">{{ order.numberSeats }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <div class="text-xs text-gray-500 mb-1">Вес, кг</div>
                                    <div class="text-base font-medium text-gray-600">{{ order.weight }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <div class="text-xs text-gray-500 mb-1">Объем, куб.м.</div>
                                    <div class="text-base font-medium text-gray-600">{{ order.volume }}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        order: {
            type: Object,
            required: true,
        },
    },
    computed: {
        customerOrderNumberDisplay() {
            if (!this.order.customerOrderNumber || this.order.customerOrderNumber.trim() === '') {
                return 'customerOrderNumber - не указан';
            }
            return this.order.customerOrderNumber;
        },
    },
};
</script>