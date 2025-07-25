<template>
    <div class="md:basis-2/5 w-full bg-brand-light rounded-xl p-6 md:p-8 flex flex-col gap-6 mx-auto md:mx-0">
        <div class="flex flex-col gap-0.5 relative">
            <div v-if="tracking && tracking.length > 1"
                class="absolute left-6 top-12 bottom-12 w-0.5 border-l-2 border-dashed border-gray-400 z-0"></div>
            <template v-for="(item, index) in preparedTracking" :key="index">
                <!-- Обычный статус -->
                <div v-if="item.type === 'status'" class="flex items-start gap-3 relative z-10"
                    :class="{ 'mt-10': index > 0 }">
                    <div class="w-12 h-12 flex items-center justify-center bg-white rounded-[10px] shadow">
                        <status-icon :status="item.stateCurrent"></status-icon>
                    </div>
                    <div>
                        <div class="font-bold text-gray-800 uppercase">{{ getStatusText(item.stateCurrent) }}</div>
                        <div class="text-xs text-gray-600">{{ item.date }}</div>
                        <div v-if="item.additionalInfo" class="text-xs text-gray-600">
                            {{ formatAdditionalInfo(item.stateCurrent, item.additionalInfo) }}
                        </div>
                    </div>
                </div>
                <!-- Группа с одним событием (только для СВ) -->
                <div v-else-if="item.type === 'group-single'" class="flex flex-col gap-1 relative z-10 mt-10">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 flex items-center justify-center bg-white rounded-[10px] shadow">
                            <status-icon :status="item.event.stateCurrent"></status-icon>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800 uppercase">{{ getStatusText(item.event.stateCurrent) }}
                            </div>
                            <div class="text-xs text-gray-600">{{ item.event.date }}</div>
                            <button
                                class="flex items-center gap-1 text-brand-blue underline text-xs font-medium mt-1 ml-0 focus:outline-none"
                                @click.stop="toggleGroup(index)">
                                <span>{{ openGroups[index] ? 'Скрыть' : 'Подробнее' }}</span>
                                <svg :class="['w-4 h-4 transition-transform', openGroups[index] ? 'rotate-180' : '']"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="openGroups[index]">
                        <div class="font-bold text-brand-blue mb-1 ml-6 mt-2 pl-9 relative">{{ item.city }} <span
                                class="dot-timeline absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-blue z-10"></span>
                        </div>
                        <div class="border-l-2 border-dashed border-gray-300 ml-6 flex flex-col gap-3">
                            <div class="pl-9 relative flex items-center gap-3">

                                <div>
                                    <div class="font-medium text-gray-900">{{ getStatusText(item.event.stateCurrent)
                                        }}</div>
                                    <div class="text-xs text-gray-500">{{ item.event.date }}</div>
                                    <div v-if="item.event.additionalInfo" class="text-xs text-gray-500">
                                        {{ formatAdditionalInfo(item.event.stateCurrent, item.event.additionalInfo) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Блок "В пути" с вложенными городами и событиями -->
                <div v-else-if="item.type === 'in-transit'" class="flex flex-col gap-1 relative z-10 mt-10">
                    <div class="flex items-start gap-3">
                        <div class="w-12 h-12 flex items-center justify-center bg-white rounded-[10px] shadow"
                            v-html="`<svg xmlns='http://www.w3.org/2000/svg' class='w-7 h-7 text-brand-blue' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-6 0h6m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z' /></svg>`">
                        </div>
                        <div>
                            <div class="font-bold text-gray-800 uppercase">В пути</div>
                            <div v-if="getLastInTransitEvent(item.groups)" class="text-xs text-gray-600">
                                {{ getLastInTransitEvent(item.groups).date }}
                            </div>
                            <button
                                class="flex items-center gap-1 text-brand-blue underline text-xs font-medium mt-1 ml-0 focus:outline-none"
                                @click.stop="toggleGroup(index)">
                                <span>{{ openGroups[index] ? 'Скрыть' : 'Подробнее' }}</span>
                                <svg :class="['w-4 h-4 transition-transform', openGroups[index] ? 'rotate-180' : '']"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="openGroups[index]">
                        <template v-for="(group, gidx) in item.groups" :key="gidx">
                            <div class="font-bold text-brand-blue mb-1 ml-6 mt-2 pl-9 relative">{{ group.city }}

                                <span
                                    class="dot-timeline absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-blue z-10"></span>
                            </div>
                            <div class="border-l-2 border-dashed border-gray-300 ml-6 flex flex-col gap-3">
                                <div v-for="(event, eventIdx) in group.events" :key="eventIdx"
                                    class="pl-9 relative flex items-center gap-3">

                                    <div>
                                        <div class="font-medium text-gray-900">{{ getStatusText(event.stateCurrent) }}
                                        </div>
                                        <div class="text-xs text-gray-500">{{ event.date }}</div>
                                        <div v-if="event.additionalInfo" class="text-xs text-gray-500">
                                            {{ formatAdditionalInfo(event.stateCurrent, event.additionalInfo) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import StatusIcon from './StatusIcon.vue';

const TRUCK_ICON = `<svg xmlns='http://www.w3.org/2000/svg' class='w-7 h-7 text-brand-blue' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-6 0h6m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z' /></svg>`;

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
    data() {
        return {
            openGroups: {}, // To manage the open/closed state of grouped events
        };
    },
    computed: {
        preparedTracking() {
            const result = [];
            let inTransitGroups = [];
            for (const item of this.tracking) {
                if (!item.group) {
                    if (inTransitGroups.length > 0) {
                        result.push({
                            type: 'in-transit',
                            groups: inTransitGroups
                        });
                        inTransitGroups = [];
                    }
                    result.push({ type: 'status', ...item });
                } else if (item.events.length === 1) {
                    const event = item.events[0];
                    if (event.stateCurrent === 'СВ') {
                        if (inTransitGroups.length > 0) {
                            result.push({
                                type: 'in-transit',
                                groups: inTransitGroups
                            });
                            inTransitGroups = [];
                        }
                        result.push({
                            type: 'group-single',
                            city: item.city,
                            event
                        });
                    } else {
                        if (inTransitGroups.length > 0) {
                            result.push({
                                type: 'in-transit',
                                groups: inTransitGroups
                            });
                            inTransitGroups = [];
                        }
                        result.push({
                            type: 'status',
                            ...event,
                            city: item.city
                        });
                    }
                } else if (item.events.length > 1) {
                    inTransitGroups.push({
                        city: item.city,
                        events: item.events,
                    });
                }
            }
            if (inTransitGroups.length > 0) {
                result.push({
                    type: 'in-transit',
                    groups: inTransitGroups
                });
            }
            return result;
        }
    },
    methods: {
        toggleGroup(index) {
            this.openGroups[index] = !this.openGroups[index];
            this.$forceUpdate(); // Force update to react to nested object changes
        },
        getStatusText(status) {
            const statusMap = {
                'ДП': 'Вручен с проблемой',
                'ЗС': 'Заказ создан',
                'СП': 'Ожидаем груз от отправителя',
                'ЗП': 'Заказ назначен на маршрут',
                'ГЗ': 'Груз забран у отправителя',
                'ГС': 'Груз находится на складе',
                'ПП': 'Груз передан на перевозку',
                'ГП': 'Груз прибыл в город назначения',
                'ДН': 'Назначен на доставку',
                'КД': 'Передан на доставку получателю',
                'НД': 'Груз не доставлен',
                'ПД': 'Доставка согласована',
                'ОК': 'Вручен',
                'НВ': 'Заказ отменен',
                'ПГ': 'Проблемный груз',
                'СВ': 'Готов к выдаче',
                'ТО': 'Принят в сортировочном центре отправителя',
                'ЧС': 'Часть груза находится на складе',
                'ОС': 'Ошибка сортировки',
                'ЧД': 'Груз частично доставлен',
            };
            return statusMap[status] || status;
        },
        formatAdditionalInfo(status, additionalInfo) {
            if (status === 'ПГ' && additionalInfo) {
                return `Проблемный груз: ${additionalInfo}`;
            }
            if (status === 'ОС' && additionalInfo) {
                return `Ошибка сортировки ${additionalInfo}`;
            }
            return additionalInfo;
        },
        getLastInTransitEvent(groups) {
            if (!groups || groups.length === 0) return null;
            let lastEvent = null;
            let lastDate = null;
            for (const group of groups) {
                for (const event of group.events) {
                    // event.date формат: 'DD.MM.YYYY HH:mm'
                    const [date, time] = event.date.split(' ');
                    const [d, m, y] = date.split('.');
                    const jsDate = new Date(`${y}-${m}-${d}T${time || '00:00'}`);
                    if (!lastDate || jsDate > lastDate) {
                        lastDate = jsDate;
                        lastEvent = event;
                    }
                }
            }
            return lastEvent;
        }
    }
};
</script>

<style scoped></style>