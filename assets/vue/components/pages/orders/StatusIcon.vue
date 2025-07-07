<template>
    <img :src="iconSrc" :alt="status" class="w-18 h-18" />
</template>

<script>
import iconCreated from '../../../../img/icons/order-tracking/component-1-1.svg';
import iconReceived from '../../../../img/icons/order-tracking/component-1-2.svg';
import iconDefault from '../../../../img/icons/order-tracking/component-1.svg';

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
                'ЗС': iconCreated, // Создан
                'ГЗ': iconReceived, // Груз получен (Ожидаем)
                'ЗП': iconDefault,   // В пути (используем пока эту)
            };
            return iconMap[this.status] || iconDefault;
        },
    },
};
</script>