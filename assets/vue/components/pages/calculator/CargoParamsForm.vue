<template>
    <section class="card items-stretch">
        <h2 class="text-h4 font-bold mb-4">Параметры груза</h2>

        <!-- Переключатель режима -->
        <div class="flex border border-gray-200 rounded-lg p-1 mb-4 w-full">
            <button @click.prevent="setMode('total')"
                :class="['flex-1 py-4 uppercase text-caps-regular px-4 rounded-md', mode === 'total' ? 'bg-brand-blue text-white shadow' : 'text-gray-600']">
                Общий вес и объём
            </button>
            <button @click.prevent="setMode('individual')"
                :class="['flex-1 py-4 uppercase text-caps-regular px-4 rounded-md', mode === 'individual' ? 'bg-brand-blue text-white shadow' : 'text-gray-600']">
                Места по-отдельности
            </button>
        </div>

        <!-- Форма для режима "Места по-отдельности" -->
        <div v-if="mode === 'individual'" class="flex flex-col gap-4">
            <CargoPlacesTabs v-model="individualState.packages" :calculator-config="calculatorConfig" />
        </div>

        <!-- Форма для режима "Общий вес и объём" -->
        <div v-if="mode === 'total'" class="flex flex-col gap-4">
            <CargoPlaceForm v-if="totalState.package && totalState.package.id"
                :key="`total-package-${totalState.package.id}`" v-model="totalState.package"
                :calculator-config="calculatorConfig" :showDuplicateButton="false" />
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted, nextTick } from 'vue';
import CargoPlacesTabs from './CargoPlacesTabs.vue';
import CargoPlaceForm from './CargoPlaceForm.vue';

const props = defineProps({
    modelValue: { type: Object, required: true },
    calculatorConfig: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

// Текущий активный режим
const mode = ref(props.modelValue.mode || 'total');

// Функция создания дефолтного места
function createDefaultPlace() {
    return {
        id: Date.now() + Math.random(),
        length: '',
        width: '',
        height: '',
        weight: '',
        description: '',
        declaredValue: '',
        packagingItems: [],
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
    };
}

// Отдельные состояния для каждого режима
const individualState = ref({
    packages: []
});

const totalState = ref({
    package: createDefaultPlace()
});

// Инициализация данных при монтировании компонента
// На этом этапе просто устанавливаем начальный режим.
// Синхронизация данных будет происходить в вотче на props.modelValue
function initializeComponent() {
    mode.value = props.modelValue.mode || 'total';
}

// Переключение режима (без копирования данных)
function setMode(newMode) {
    mode.value = newMode;
    nextTick(() => {
        emitCurrentState();
    });
}

function emitCurrentState() {
    let packages;
    if (mode.value === 'individual') {
        packages = individualState.value.packages;
    } else {
        packages = [totalState.value.package];
    }

    const dataToEmit = {
        mode: mode.value,
        packages: packages
    };

    emit('update:modelValue', dataToEmit);
}

// Флаг для предотвращения циклических обновлений
let isUpdatingFromParent = false;

// Отслеживаем изменения в состояниях individualState и totalState для отправки родителю
watch([mode, individualState, totalState], () => {
    if (isUpdatingFromParent) return;
    emitCurrentState();
}, { deep: true });

// Отслеживаем изменения от родителя для синхронизации внутренних состояний
watch(() => props.modelValue, (newValue) => {
    if (isUpdatingFromParent) return;

    isUpdatingFromParent = true;

    // Обновляем режим, если он изменился
    mode.value = newValue.mode || 'total';

    // Всегда обновляем individualState.packages, если родитель передал данные для него
    if (newValue.packages && newValue.packages.length > 0 && newValue.mode === 'individual') {
        individualState.value.packages = newValue.packages.map(pkg => ({
            ...createDefaultPlace(),
            ...pkg
        }));
    } else if (!newValue.packages || newValue.packages.length === 0) { // Если нет данных, то возвращаем к дефолту
        individualState.value.packages = [createDefaultPlace()];
    }

    // Всегда обновляем totalState.package, если родитель передал данные для него
    if (newValue.packages && newValue.packages.length > 0 && newValue.mode === 'total') {
        totalState.value.package = {
            ...createDefaultPlace(),
            ...newValue.packages[0]
        };
    } else if (!newValue.packages || newValue.packages.length === 0) { // Если нет данных, то возвращаем к дефолту
        totalState.value.package = createDefaultPlace();
    }

    // В случае если родитель передал массив для individual, но текущий режим total
    // и наоборот, мы не перезатираем данные, а сохраняем их в соответствующем state.

    nextTick(() => {
        isUpdatingFromParent = false;
    });
}, { deep: true, immediate: true });

onMounted(() => {
    initializeComponent();
});
</script>