<template>
    <img :src="iconSrc" :alt="status" class="w-18 h-18" />
</template>

<script>
import iconCreated from '../../../../img/icons/order-tracking/folder-plus.svg';
import iconMessageDots from '../../../../img/icons/order-tracking/message-dots.svg';
import iconDenied from '../../../../img/icons/order-tracking/denied.svg';
import iconTrouble from '../../../../img/icons/order-tracking/trouble.svg';
import iconTruckFast from '../../../../img/icons/order-tracking/truck-fast.svg';
import iconPvz from '../../../../img/icons/order-tracking/pvz.svg';
import iconChecked from '../../../../img/icons/order-tracking/checked.svg';

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
                'ДП': iconTrouble, // Вручен с проблемой

                'ПГ': iconTrouble, // Проблемный груз
                'ЧС': iconTrouble, // Часть груза находится на складе
                'ЧД': iconTrouble, // Груз частично доставлен

                'СП': iconMessageDots, // Ожидаем груз от отправителя
                'ПД': iconMessageDots, // Доставка согласована

                'ЗП': iconTruckFast, // Заказ назначен на маршрут
                'ГЗ': iconTruckFast, // Груз забран у отправителя
                'ГП': iconTruckFast, // Груз забран у отправителя
                'ПП': iconTruckFast, // Груз передан на перевозку
                'ДН': iconTruckFast, // Назначен на доставку
                'КД': iconTruckFast, // Передан на доставку получателю

                'ОК': iconChecked, // Вручен

                'НВ': iconDenied, // Заказ отменен
                'ОС': iconDenied, // Ошибка сортировки
                'НД': iconDenied, // Груз не доставлен

                'ГС': iconPvz, // Груз находится на складе

                'СВ': iconPvz, // Готов к выдаче
                'ЗС': iconCreated, // Заказ создан
            };
            return iconMap[this.status] || iconDenied;
        },
    },
};
</script>