<template>
    <div class="w-full">
        <div class="flex gap-2 mb-4 justify-between items-start">
            <div class="overflow-x-auto flex gap-2 flex-1 min-w-0 rounded-lg">
                <template v-for="(pkg, idx) in packages" :key="pkg.id">
                    <button
                        class="tab tab-bordered !flex flex-nowrap whitespace-nowrap text-lg flex-shrink-0 bg-white hover:border-brand-blue hover:text-brand-blue"
                        :class="{ '[&.tab-active]:bg-brand-gray [&.tab-active]:hover:bg-brand-blue hover:text-white tab-active text-white': idx === activeIndex }"
                        @click="setActive(idx)">
                        <span class="px-5">{{ idx + 1 }} место
                            <span v-if="pkg.quantity && pkg.quantity > 1" class="">(×{{ pkg.quantity
                            }})</span>
                        </span>
                        <span v-if="packages.length > 1" @click.stop="remove(idx)"
                            class="absolute px-3 mb-[1px] py-4 right-0 top-1/2 -translate-y-1/2 ml-2 text-gray-400 hover:text-red-500 text-3xl leading-[0] h-full flex flex-col justify-center">×</span>
                    </button>
                </template>
            </div>
            <button class="btn btn-primary text-sm flex-shrink-0 ml-2 px-5 py-4" @click="add">+&nbsp;Добавить</button>
        </div>
        <!-- Принудительное обновление компонента при изменении активного места -->
        <CargoPlaceForm v-if="packages[activeIndex]" v-model="packages[activeIndex]"
            :calculator-config="calculatorConfig" />
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import CargoPlaceForm from './CargoPlaceForm.vue';

const props = defineProps({
    modelValue: { type: Array, required: true },
    calculatorConfig: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue']);

const packages = ref([]);
const activeIndex = ref(0);

// Флаг для предотвращения циклических обновлений
let isUpdatingFromParent = false;

// Функция создания дефолтного места
function createDefaultPlace() {
    return {
        id: Date.now() + Math.random(), // Уникальный ID
        length: '',
        width: '',
        height: '',
        volume: '',
        weight: '',
        description: '',
        declaredValue: 1000,
        packagingItems: [],
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
        quantity: 1
    };
}

// Инициализация при монтировании
function initializePackages() {
    if (props.modelValue && props.modelValue.length > 0) {
        packages.value = props.modelValue.map(pkg => ({
            id: pkg.id || Date.now() + Math.random(),
            length: pkg.length || '',
            width: pkg.width || '',
            height: pkg.height || '',
            volume: pkg.volume !== undefined ? pkg.volume : '',
            weight: pkg.weight || '',
            description: pkg.description || '',
            declaredValue: pkg.declaredValue !== undefined ? pkg.declaredValue : 1000,
            packagingItems: pkg.packagingItems || [],
            selfMarking: pkg.selfMarking || false,
            dangerousGoods: pkg.dangerousGoods || false,
            tempControl: pkg.tempControl || false,
            quantity: pkg.quantity || 1
        }));
    } else {
        packages.value = [createDefaultPlace()];
    }

    // Убеждаемся, что activeIndex корректный
    if (activeIndex.value >= packages.value.length) {
        activeIndex.value = packages.value.length - 1;
    }
}

// Обновление от родителя
watch(() => props.modelValue, (newValue) => {
    if (isUpdatingFromParent) return;

    if (newValue && newValue.length > 0) {
        isUpdatingFromParent = true;

        // Обновляем массив мест с сохранением всех полей
        packages.value = newValue.map(pkg => ({
            id: pkg.id || Date.now() + Math.random(),
            length: pkg.length || '',
            width: pkg.width || '',
            height: pkg.height || '',
            volume: pkg.volume !== undefined ? pkg.volume : '',
            weight: pkg.weight || '',
            description: pkg.description || '',
            declaredValue: pkg.declaredValue !== undefined ? pkg.declaredValue : 1000,
            packagingItems: pkg.packagingItems || [],
            selfMarking: pkg.selfMarking || false,
            dangerousGoods: pkg.dangerousGoods || false,
            tempControl: pkg.tempControl || false,
            quantity: pkg.quantity || 1
        }));

        // Корректируем активный индекс если необходимо
        if (activeIndex.value >= packages.value.length) {
            activeIndex.value = packages.value.length - 1;
        }

        nextTick(() => {
            isUpdatingFromParent = false;
        });
    }
}, { deep: true, immediate: true });

// Передача изменений родителю
watch(packages, (newPackages) => {
    if (isUpdatingFromParent) return;
    emit('update:modelValue', newPackages);
}, { deep: true });

function setActive(idx) {
    if (idx >= 0 && idx < packages.value.length) {
        activeIndex.value = idx;
    }
}

function add() {
    const newPlace = createDefaultPlace();
    packages.value.push(newPlace);
    activeIndex.value = packages.value.length - 1;
}

function remove(idx) {
    if (packages.value.length === 1) return;

    packages.value.splice(idx, 1);

    // Корректируем активный индекс
    if (activeIndex.value >= packages.value.length) {
        activeIndex.value = packages.value.length - 1;
    } else if (activeIndex.value > idx) {
        activeIndex.value--;
    }
}

// Инициализация при создании компонента
initializePackages();
</script>