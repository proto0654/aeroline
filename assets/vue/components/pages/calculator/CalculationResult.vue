<template>
    <aside class="lg:sticky top-6 h-fit card bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-h4 font-bold mb-4">Стоимость перевозки</h2>

        <div v-if="!result" class="text-gray-500">
            <p>Заполните все обязательные поля и нажмите "Рассчитать", чтобы увидеть стоимость.</p>
        </div>

        <div v-else>
            <!-- Основной тариф -->
            <div class="border-b pb-2 mb-2">
                <div class="flex justify-between items-center">
                    <span class="font-bold text-lg">{{ result.tariff.name }}</span>
                    <span class="font-bold text-lg">{{ formatCurrency(result.totalCost) }}</span>
                </div>
                <div class="text-sm text-gray-500">{{ result.tariff.description }}</div>
            </div>

            <!-- Детализация -->
            <div class="text-sm space-y-1">
                <div v-for="item in result.details" :key="item.name" class="flex justify-between">
                    <span>{{ item.name }}</span>
                    <span>{{ formatCurrency(item.cost) }}</span>
                </div>
            </div>

            <!-- Итоговая стоимость -->
            <div class="flex justify-between items-center font-bold text-base mt-4 border-t pt-2">
                <span>Общая стоимость</span>
                <span>{{ formatCurrency(result.totalCost) }}</span>
            </div>

            <div class="text-xs text-gray-400 mt-1">
                С учетом НДС
            </div>

            <button @click="$emit('print')" class="btn btn-secondary w-full mt-4">Распечатать</button>
        </div>
    </aside>
</template>

<script setup>
const props = defineProps({
    result: {
        type: Object,
        default: null
    }
});

defineEmits(['print']);

function formatCurrency(value) {
    if (typeof value !== 'number') {
        return '0,00 ₽';
    }
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 2 }).format(value);
}
</script>