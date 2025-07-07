<template>
    <div class="md:basis-2/5 w-full bg-brand-light rounded-xl p-6 md:p-8 flex flex-col gap-6 mx-auto md:mx-0">
        <div class="flex flex-col gap-0.5 relative">
            <div v-if="tracking && tracking.length > 1"
                class="absolute left-6 top-12 bottom-12 w-0.5 border-l-2 border-dashed border-gray-400 z-0"></div>
            <div v-for="(status, index) in tracking" :key="index" class="flex items-center gap-3 relative z-10"
                :class="{ 'mt-10': index > 0 }">
                <div class="w-12 h-12 flex items-center justify-center bg-white rounded-[10px] shadow">
                    <status-icon :status="status.stateCurrent"></status-icon>
                </div>
                <div>
                    <div class="font-bold text-gray-800 uppercase">{{ getStatusText(status.stateCurrent) }}</div>
                    <div class="text-xs text-gray-600">{{ status.date }}</div>
                    <div v-if="status.city" class="text-xs text-gray-600">{{ status.city }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StatusIcon from './StatusIcon.vue';

export default {
    components: {
        StatusIcon,
    },
    props: {
        tracking: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getStatusText(status) {
            const statusMap = {
                'ГЗ': 'Груз получен',
                'ЗП': 'Заказ в пути',
                'ЗС': 'Заказ создан',
                // Add other statuses here
            };
            return statusMap[status] || status;
        }
    }
};
</script>