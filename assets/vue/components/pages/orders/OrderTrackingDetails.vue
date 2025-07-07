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
                            <td class="font-medium text-brand-gray">Номер заказа</td>
                            <td>{{ order.orderNumber }}</td>
                            <td class="font-medium text-brand-gray">Номер ТН</td>
                            <td>{{ order.invoiceNumber }}</td>
                        </tr>
                        <tr>
                            <td class="font-medium text-brand-gray">Номер заказа клиента</td>
                            <td>{{ order.additionalCheck }}</td>
                            <td class="font-medium text-brand-gray">Количество мест</td>
                            <td>{{ order.numberSeats }}</td>
                        </tr>
                        <tr>
                            <td class="font-medium text-brand-gray">Вес, кг</td>
                            <td>{{ order.weight }}</td>
                            <td class="font-medium text-brand-gray">Объем, куб.м.</td>
                            <td>{{ order.volume }}</td>
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
};
</script>