<template>
    <section class="card bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-h4 font-bold mb-4">Параметры груза</h2>

        <!-- Переключатель режима -->
        <div class="flex border border-gray-200 rounded-lg p-1 mb-4 max-w-sm">
            <button @click.prevent="mode = 'individual'"
                :class="['flex-1 py-2 px-4 rounded-md text-sm', mode === 'individual' ? 'bg-brand-blue text-white shadow' : 'text-gray-600']">
                Места по-отдельности
            </button>
            <button @click.prevent="mode = 'total'"
                :class="['flex-1 py-2 px-4 rounded-md text-sm', mode === 'total' ? 'bg-brand-blue text-white shadow' : 'text-gray-600']">
                Общий вес и объём
            </button>
        </div>

        <!-- Форма для режима "Места по-отдельности" -->
        <div v-if="mode === 'individual'" class="flex flex-col gap-4">
            <div v-for="(pkg, index) in packages" :key="pkg.id" class="border border-gray-200 p-4 rounded-lg relative">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TextInput :name="`pkg_${pkg.id}_length`" label="Длина, см" v-model="pkg.length" type="number" />
                    <TextInput :name="`pkg_${pkg.id}_width`" label="Ширина, см" v-model="pkg.width" type="number" />
                    <TextInput :name="`pkg_${pkg.id}_height`" label="Высота, см" v-model="pkg.height" type="number" />
                    <TextInput :name="`pkg_${pkg.id}_weight`" label="Вес, кг" v-model="pkg.weight" type="number" />
                </div>
                <div class="text-sm text-gray-500 mt-2">Объём: {{ calculatedVolume(pkg) }} м³</div>
                <button @click.prevent="removePackage(index)" v-if="packages.length > 1"
                    class="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <button @click.prevent="addPackage" class="btn btn-secondary w-full md:w-auto self-start">+ Добавить
                место</button>
        </div>

        <!-- Форма для режима "Общий вес и объём" -->
        <div v-if="mode === 'total'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput name="total_weight" label="Общий вес, кг" v-model="totalWeight" type="number" />
            <TextInput name="total_volume" label="Общий объём, м³" v-model="totalVolume" type="number" />
        </div>

        <!-- Общие поля -->
        <div class="mt-6 border-t border-gray-200 pt-6 flex flex-col gap-4">
            <TextInput name="content_description" label="Описание содержимого" v-model="contentDescription"
                placeholder="Например: Личные вещи, запчасти" />
            <TextInput name="declared_value" label="Оценочная стоимость, ₽" v-model="declaredValue" type="number" />
            <SelectInput name="packaging" label="Упаковка" :options="packagingOptions" v-model="packaging" />
            <CheckboxInput name="self_marking" label="Самостоятельная маркировка груза" v-model="selfMarking" />
            <CheckboxInput name="dangerous_goods" label="Есть опасный груз" v-model="dangerousGoods" />
            <CheckboxInput name="temp_control" label="Требуется температурный режим" v-model="tempControl" />
        </div>

    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TextInput from '@/components/forms/TextInput.vue';
import CheckboxInput from '@/components/forms/CheckboxInput.vue';
import SelectInput from '@/components/forms/SelectInput.vue';

const props = defineProps({
    modelValue: { type: Object, required: true },
    calculatorConfig: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

// Local state
const mode = ref('individual');
const packages = ref(props.modelValue.packages || [{ id: Date.now(), length: '', width: '', height: '', weight: '' }]);
const totalWeight = ref(props.modelValue.totalWeight || '');
const totalVolume = ref(props.modelValue.totalVolume || '');
const contentDescription = ref(props.modelValue.contentDescription || '');
const declaredValue = ref(props.modelValue.declaredValue || '');
const packaging = ref(props.modelValue.packaging || '');
const selfMarking = ref(props.modelValue.selfMarking || false);
const dangerousGoods = ref(props.modelValue.dangerousGoods || false);
const tempControl = ref(props.modelValue.tempControl || false);

const packagingOptions = computed(() => {
    if (!props.calculatorConfig.packaging) return [];
    return props.calculatorConfig.packaging.map(p => ({ value: p.id, label: p.name }));
});

const calculatedVolume = (pkg) => {
    if (pkg.length && pkg.width && pkg.height) {
        return ((pkg.length * pkg.width * pkg.height) / 1000000).toFixed(3);
    }
    return '0.000';
};

function addPackage() {
    packages.value.push({ id: Date.now(), length: '', width: '', height: '', weight: '' });
}

function removePackage(index) {
    packages.value.splice(index, 1);
}

// Watch for changes and emit update
watch([mode, packages, totalWeight, totalVolume, contentDescription, declaredValue, packaging, selfMarking, dangerousGoods, tempControl],
    () => {
        emit('update:modelValue', {
            mode: mode.value,
            packages: packages.value,
            totalWeight: totalWeight.value,
            totalVolume: totalVolume.value,
            contentDescription: contentDescription.value,
            declaredValue: declaredValue.value,
            packaging: packaging.value,
            selfMarking: selfMarking.value,
            dangerousGoods: dangerousGoods.value,
            tempControl: tempControl.value,
        });
    },
    { deep: true }
);

</script>