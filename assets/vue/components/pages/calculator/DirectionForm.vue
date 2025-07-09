<template>
    <div class="">
        <h3 v-if="showTitle" class="text-lg font-bold text-gray-800 mb-4">Откуда и куда</h3>

        <div class="flex xl:flex-row flex-col items-start gap-2 mb-4 items-center xl:items-start">
            <!-- Поле "Откуда" -->
            <div class="w-full">
                <AutocompleteInput name="direction.from" placeholder="Откуда" :items="offices" v-model="from"
                    @itemSelected="onFromItemSelected" :emitFullItem="true" :showResetButton="true" />

                <!-- Популярные города для "Откуда" -->
                <div
                    class="mb-0 md:mb-0 mt-2 md:mt-4 flex flex-row flex-wrap gap-2 text-caption-form text-brand-gray gap-x-2 gap-y-0">
                    <button v-for="city in quickSelectCities" :key="'from-' + city" @click="setFromCity(city)"
                        class="cursor-pointer underline leading-1.5" type="button">{{ city }}</button>
                </div>
            </div>

            <!-- Кнопка смены направления -->
            <button type="button" @click="swapDirections"
                class="w-12 mx-auto md:mx-2 my-4 md:mb-0 md:my-4 flex items-center justify-center">
                <img src="/assets/img/double-arrow.svg" alt="Поменять местами" class="w-6 h-6" />
            </button>

            <!-- Поле "Куда" -->
            <div class="w-full">
                <AutocompleteInput name="direction.to" placeholder="Куда" :items="offices" v-model="to"
                    @itemSelected="onToItemSelected" :emitFullItem="true" :showResetButton="true" />

                <!-- Популярные города для "Куда" -->
                <div
                    class="mb-4 md:mb-0 mt-2 md:mt-4 flex flex-row flex-wrap gap-2 text-caption-form text-brand-gray gap-x-2 gap-y-0">
                    <button v-for="city in quickSelectCities" :key="'to-' + city" @click="setToCity(city)"
                        class="cursor-pointer underline leading-1.5" type="button">{{ city }}</button>
                </div>
            </div>
            <button v-if="showCalculateButton"
                class="leading-[2.1em] w-full btn-gray px-3 py-2 rounded-lg text-white flex flex-rows items-center justify-center gap-1 min-w-[6em] text-buttons"
                @click="handleCalculate">
                Рассчитать
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';

const props = defineProps({
    offices: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Object,
        required: true
    },
    showCalculateButton: {
        type: Boolean,
        default: false
    },
    showTitle: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['update:modelValue', 'calculate']);

const from = ref(props.modelValue.from || '');
const to = ref(props.modelValue.to || '');

// Добавляем рефы для хранения выбранных объектов офисов
const fromOffice = ref(null);
const toOffice = ref(null);

// Популярные города для быстрого выбора  
const quickSelectCities = [
    'Новосибирск',
    'Красноярск',
    'Иркутск',
    'Абакан',
    'Томск'
];

// Методы для установки городов
const setFromCity = (city) => {
    from.value = city;
    fromOffice.value = props.offices.find(o => o.city === city) || null; // Находим первый офис для данного города
};

const setToCity = (city) => {
    to.value = city;
    toOffice.value = props.offices.find(o => o.city === city) || null; // Находим первый офис для данного города
};

// Обработчики событий выбора элемента (теперь получаем полный объект)
const onFromItemSelected = (item) => {
    from.value = item.city + (item.address ? ', ' + item.address : ''); // Обновляем отображаемое значение
    fromOffice.value = item;
};

const onToItemSelected = (item) => {
    to.value = item.city + (item.address ? ', ' + item.address : ''); // Обновляем отображаемое значение
    toOffice.value = item;
};

// Метод для смены направлений местами
const swapDirections = () => {
    const tempFrom = from.value;
    const tempTo = to.value;
    from.value = tempTo;
    to.value = tempFrom;

    const tempFromOffice = fromOffice.value;
    const tempToOffice = toOffice.value;
    fromOffice.value = tempToOffice;
    toOffice.value = tempFromOffice;
};

// Метод для обработки кнопки "Рассчитать"
const handleCalculate = () => {
    if (fromOffice.value && toOffice.value) {
        window.location.href = `/calculator.html?from=${encodeURIComponent(fromOffice.value.id)}&to=${encodeURIComponent(toOffice.value.id)}`;
    } else {
        alert('Пожалуйста, выберите корректные пункты отправки и назначения');
        emit('calculate', { from: from.value, to: to.value });
    }
};

// Helper to find office by string value (city or city, address)
const findOfficeByValue = (value) => {
    if (!value) return null;
    // Try to find by exact match of formatted string
    let foundOffice = props.offices.find(o => (o.city + (o.address ? ', ' + o.address : '')) === value);
    if (foundOffice) return foundOffice;

    // If not found by full string, try to find by city only (for quick selects or just city input)
    foundOffice = props.offices.find(o => o.city === value);
    return foundOffice || null;
};

// Watch for local changes and emit to parent
watch([from, to], ([newFrom, newTo]) => {
    emit('update:modelValue', { from: newFrom, to: newTo });
});

// Watch for parent changes and update local state
watch(() => props.modelValue, (newValue) => {
    from.value = newValue.from || '';
    to.value = newValue.to || '';
    fromOffice.value = findOfficeByValue(newValue.from);
    toOffice.value = findOfficeByValue(newValue.to);
}, { deep: true });

// Инициализация fromOffice и toOffice при монтировании, если modelValue уже имеет значения
import { onMounted } from 'vue';
onMounted(() => {
    if (props.modelValue.to) {
        toOffice.value = findOfficeByValue(props.modelValue.to);
    }

    // Проверка GET-параметров при загрузке компонента
    const urlParams = new URLSearchParams(window.location.search);
    const fromId = urlParams.get('from');
    const toId = urlParams.get('to');

    if (fromId) {
        const office = props.offices.find(o => o.id === parseInt(fromId));
        if (office) {
            fromOffice.value = office;
            from.value = office.city + (office.address ? ', ' + office.address : '');
        }
    }

    if (toId) {
        const office = props.offices.find(o => o.id === parseInt(toId));
        if (office) {
            toOffice.value = office;
            to.value = office.city + (office.address ? ', ' + office.address : '');
        }
    }
});
</script>