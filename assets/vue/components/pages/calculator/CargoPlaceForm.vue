<template>
    <div class="flex flex-col gap-4">
        <!-- 1-й ряд: габариты -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 [&_.text-input-vue>input]:text-center">
            <CalculatorTextInput :name="`pkg_${id}_length`" placeholder="Длина, см" v-model="length" type="number"
                display-prefix="Длина" display-suffix="см" :show-formatted-when-blurred="true" />
            <CalculatorTextInput :name="`pkg_${id}_width`" placeholder="Ширина, см" v-model="width" type="number"
                display-prefix="Ширина" display-suffix="см" :show-formatted-when-blurred="true" />
            <CalculatorTextInput :name="`pkg_${id}_height`" placeholder="Высота, см" v-model="height" type="number"
                display-prefix="Высота" display-suffix="см" :show-formatted-when-blurred="true" />
        </div>
        <!-- 2-й ряд: объём -->
        <div class="bg-gray-200 rounded-lg p-4 text-gray-500 text-lg">Объём, куб.м: {{ calculatedVolume }}</div>
        
        <!-- Информация о минимальных значениях -->
        <div v-if="usesMinimalValues" class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
            <div class="flex items-start gap-2">
                <span class="text-blue-500">ℹ</span>
                <div>
                    <div class="font-medium mb-1">Используются минимальные значения для расчета:</div>
                    <ul class="space-y-1 text-xs">
                        <li v-if="usesMinimalWeight">• Вес: {{ minimalValues.weight }} кг</li>
                        <li v-if="usesMinimalDimensions">• Габариты: {{ minimalValues.length }}×{{ minimalValues.width }}×{{ minimalValues.height }} см</li>
                        <li v-if="usesMinimalQuantity">• Количество: {{ minimalValues.quantity }} шт</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 3-й ряд: вес и счетчик одинаковых мест -->
        <div class="flex items-center gap-4">
            <CalculatorTextInput :name="`pkg_${id}_weight`" placeholder="Вес, кг" v-model="weight" type="number"
                class="flex-1" display-prefix="Вес" display-suffix="кг" :show-formatted-when-blurred="true" />
            <div v-if="showDuplicateButton" class="flex items-center gap-2 flex-shrink-0">
                <span class="text-sm text-gray-600">Одинаковые места</span>
                <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button type="button" class="px-3 py-2"
                        :class="quantity <= 1 ? 'bg-gray-100 text-gray-300' : 'text-gray-700 hover:bg-brand-blue hover:text-white'"
                        @click="decrementQuantity" :disabled="quantity <= 1">−</button>
                    <span class="px-4 py-2 bg-white text-center min-w-[60px]">{{ quantity }}</span>
                    <button type="button"
                        class="px-3 py-2 bg-gray-100 hover:bg-brand-blue text-gray-700 hover:text-white"
                        @click="incrementQuantity">+</button>
                </div>
            </div>
        </div>

        <!-- Блок дополнительных параметров -->
        <div class="border-t border-gray-200 pt-4 flex flex-col gap-4">
            <!-- Описание и стоимость -->
            <div>
                <div class="flex items-center gap-2 mb-2">
                    <label class="text-sm font-medium text-gray-700">Описание содержимого</label>
                    <span class="tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center" 
                          data-tip="Укажите краткое описание содержимого посылки для таможенного оформления и безопасной транспортировки.">
                        <span class="inline-flex items-center justify-center w-5 h-5 
                                     text-sm border border-gray-400 rounded-full 
                                     text-gray-600 hover:bg-gray-100">?</span>
                    </span>
                </div>
                <CalculatorTextInput :name="`pkg_${id}_desc`" placeholder="Описание содержимого" v-model="description" />
            </div>
            
            <div>
                <div class="flex items-center gap-2 mb-2">
                    <label class="text-sm font-medium text-gray-700">Оценочная стоимость грузоместа, ₽</label>
                    <span class="tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center" 
                          data-tip="Укажите объявленную ценность груза для страхования. В случае утери или повреждения компенсация будет рассчитана на основе этой суммы.">
                        <span class="inline-flex items-center justify-center w-5 h-5 
                                     text-sm border border-gray-400 rounded-full 
                                     text-gray-600 hover:bg-gray-100">?</span>
                    </span>
                </div>
                <CalculatorTextInput :name="`pkg_${id}_value`" placeholder="Оценочная стоимость грузоместа, ₽"
                    v-model="declaredValue" type="number" display-suffix="₽" :show-formatted-when-blurred="true" />
            </div>

            <!-- Упаковка -->
            <PackagingSelector :name="`pkg_${id}_packaging`" :options="packagingOptions" v-model="packagingItems" />

            <!-- Дополнительные опции -->
            <div class="flex flex-col gap-3">
                <div class="flex items-start gap-2">
                    <CalculatorCheckboxInput :name="`pkg_${id}_self_marking`" label="Самостоятельная маркировка груза"
                        v-model="selfMarking" />
                    <span class="tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center" 
                          data-tip="Если вы самостоятельно промаркировали груз штрихкодом или QR-кодом согласно нашим требованиям.">
                        <span class="inline-flex items-center justify-center w-5 h-5 
                                     text-sm border border-gray-400 rounded-full 
                                     text-gray-600 hover:bg-gray-100">?</span>
                    </span>
                </div>
                
                <div class="flex items-start gap-2">
                    <CalculatorCheckboxInput :name="`pkg_${id}_dangerous`" label="Есть опасный груз"
                        v-model="dangerousGoods" />
                    <span class="tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center" 
                          data-tip="Отметьте, если груз содержит опасные вещества (легковоспламеняющиеся, токсичные, коррозионные материалы). Требуется специальная документация.">
                        <span class="inline-flex items-center justify-center w-5 h-5 
                                     text-sm border border-gray-400 rounded-full 
                                     text-gray-600 hover:bg-gray-100">?</span>
                    </span>
                </div>
                
                <div class="flex items-start gap-2">
                    <CalculatorCheckboxInput :name="`pkg_${id}_temp`" label="Требуется температурный режим"
                        v-model="tempControl" />
                    <span class="tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center" 
                          data-tip="Для грузов, требующих поддержания определенной температуры при транспортировке (продукты питания, медикаменты).">
                        <span class="inline-flex items-center justify-center w-5 h-5 
                                     text-sm border border-gray-400 rounded-full 
                                     text-gray-600 hover:bg-gray-100">?</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import CalculatorTextInput from './CalculatorTextInput.vue';
import CalculatorSelectInput from './CalculatorSelectInput.vue';
import CalculatorCheckboxInput from './CalculatorCheckboxInput.vue';
import PackagingSelector from './PackagingSelector.vue';

const props = defineProps({
    modelValue: { type: Object, required: true },
    showDuplicateButton: { type: Boolean, default: true },
    calculatorConfig: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue', 'duplicate']);

// Создаем отдельные refs для v-model привязки с инициализацией из props
const id = ref(props.modelValue.id || Date.now());
const length = ref(props.modelValue.length || '');
const width = ref(props.modelValue.width || '');
const height = ref(props.modelValue.height || '');
const weight = ref(props.modelValue.weight || '');
const description = ref(props.modelValue.description || '');
const declaredValue = ref(props.modelValue.declaredValue !== undefined ? props.modelValue.declaredValue : '');
const packagingItems = ref(props.modelValue.packagingItems || []);
const selfMarking = ref(props.modelValue.selfMarking || false);
const dangerousGoods = ref(props.modelValue.dangerousGoods || false);
const tempControl = ref(props.modelValue.tempControl || false);
const quantity = ref(props.modelValue.quantity || 1);

// Computed для options упаковки
const packagingOptions = computed(() => {
    if (!props.calculatorConfig.packaging) return [];
    return props.calculatorConfig.packaging.map(p => ({ 
        value: p.uid, 
        label: p.typeBoxing || p.name,
        uidUnit: p.uidUnit,
        price: p.price
    }));
});

// Минимальные значения из конфигурации
const minimalValues = computed(() => {
    return props.calculatorConfig.minimalValues?.cargo?.package || {
        length: 10, width: 10, height: 5, weight: 0.1, quantity: 1
    };
});

// Проверяем, используются ли минимальные значения
const usesMinimalWeight = computed(() => {
    return !(parseFloat(weight.value) > 0);
});

const usesMinimalDimensions = computed(() => {
    return !(parseFloat(length.value) > 0 && parseFloat(width.value) > 0 && parseFloat(height.value) > 0);
});

const usesMinimalQuantity = computed(() => {
    return !(parseInt(quantity.value) > 0);
});

const usesMinimalValues = computed(() => {
    return usesMinimalWeight.value || usesMinimalDimensions.value || usesMinimalQuantity.value;
});

// Экспортируем computed свойства для использования в template
defineExpose({
    usesMinimalValues,
    usesMinimalWeight,
    usesMinimalDimensions,
    usesMinimalQuantity,
    minimalValues
});

// Функции для управления количеством
function incrementQuantity() {
    quantity.value++;
}

function decrementQuantity() {
    if (quantity.value > 1) {
        quantity.value--;
    }
}

// Обновляем локальное состояние при изменении props (синхронизация от родителя)
watch(() => props.modelValue, (newValue) => {
    // Обновляем только если значения действительно изменились
    if (id.value !== newValue.id) id.value = newValue.id || Date.now();
    if (length.value !== newValue.length) length.value = newValue.length || '';
    if (width.value !== newValue.width) width.value = newValue.width || '';
    if (height.value !== newValue.height) height.value = newValue.height || '';
    if (weight.value !== newValue.weight) weight.value = newValue.weight || '';
    if (description.value !== newValue.description) description.value = newValue.description || '';

    const newDeclaredValue = newValue.declaredValue !== undefined ? newValue.declaredValue : '';
    if (declaredValue.value !== newDeclaredValue) declaredValue.value = newDeclaredValue;

    const newPackagingItems = newValue.packagingItems || [];
    if (JSON.stringify(packagingItems.value) !== JSON.stringify(newPackagingItems)) {
        packagingItems.value = newPackagingItems;
    }

    if (selfMarking.value !== (newValue.selfMarking || false)) selfMarking.value = newValue.selfMarking || false;
    if (dangerousGoods.value !== (newValue.dangerousGoods || false)) dangerousGoods.value = newValue.dangerousGoods || false;
    if (tempControl.value !== (newValue.tempControl || false)) tempControl.value = newValue.tempControl || false;

    const newQuantity = newValue.quantity || 1;
    if (quantity.value !== newQuantity) quantity.value = newQuantity;
}, { immediate: true, deep: true });

// Отслеживаем изменения локального состояния и передаем их родителю
watch([length, width, height, weight, description, declaredValue, packagingItems, selfMarking, dangerousGoods, tempControl, quantity], () => {
    emit('update:modelValue', {
        id: id.value,
        length: length.value,
        width: width.value,
        height: height.value,
        weight: weight.value,
        description: description.value,
        declaredValue: declaredValue.value,
        packagingItems: packagingItems.value,
        selfMarking: selfMarking.value,
        dangerousGoods: dangerousGoods.value,
        tempControl: tempControl.value,
        quantity: quantity.value
    });
});

const calculatedVolume = computed(() => {
    if (length.value && width.value && height.value) {
        return ((length.value * width.value * height.value) / 1000000).toFixed(3);
    }
    return '0.000';
});
</script>

<style scoped>
/* Стили мобильных tooltips подключены глобально в main.css */
</style>