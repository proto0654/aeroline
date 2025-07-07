<template>
    <img :src="iconSrc" :alt="status" class="w-18 h-18" />
</template>

<script>
export default {
    props: {
        status: {
            type: String,
            required: true,
        },
    },
    computed: {
        iconSrc() {
            const iconMap = {
                'ЗС': '/assets/img/icons/order-tracking/Component 1-1.svg', // Создан
                'ГЗ': '/assets/img/icons/order-tracking/Component 1-2.svg', // Груз получен (Ожидаем)
                'ЗП': '/assets/img/icons/order-tracking/Component 1.svg',   // В пути (используем пока эту)
                // 'ОТМЕНЕН': '/assets/img/icons/order-tracking/Component 1.svg',
            };
            return iconMap[this.status] || '/assets/img/icons/order-tracking/Component 1.svg'; // Default icon
        },
    },
};
</script>