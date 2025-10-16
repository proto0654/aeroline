<template>
    <div>
        <!-- Заголовок с tooltip -->
        <div class="flex items-center gap-2 mb-4">
            <label class="text-sm font-medium text-gray-700">{{ label }}</label>
            <span class="tooltip tooltip-bottom md:tooltip-right cursor-help mobile-tooltip-center" 
                  data-tip="Выберите необходимые типы упаковки. Вы можете заказать несколько типов одновременно. Стоимость упаковки будет добавлена к общей стоимости доставки.">
                <span class="inline-flex items-center justify-center w-5 h-5 
                             text-sm border border-gray-400 rounded-full 
                             text-gray-600 hover:bg-gray-100">?</span>
            </span>
        </div>

        <!-- Список упаковок -->
        <div class="space-y-3">
            <div v-for="option in options" :key="option.value" 
                 class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <!-- Чекбокс с названием -->
                <div class="flex items-center gap-3">
                    <input 
                        :id="`${name}_${option.value}`"
                        type="checkbox" 
                        :checked="isSelected(option.value)"
                        @change="toggleSelection(option.value)"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                    />
                    <label :for="`${name}_${option.value}`" class="text-sm font-medium text-gray-700 cursor-pointer">
                        {{ option.label }}
                    </label>
                </div>

                <!-- Счетчик количества (показывается только если выбрано) -->
                <div v-if="isSelected(option.value)" class="flex items-center gap-2">
                    <span class="text-sm text-gray-500">{{ getUnitLabel(option.value) }}</span>
                    <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button 
                            type="button" 
                            class="px-3 py-1 text-gray-700 hover:bg-brand-blue hover:text-white disabled:bg-gray-100 disabled:text-gray-300"
                            :disabled="getQuantity(option.value) <= 1"
                            @click="decrementQuantity(option.value)"
                        >
                            −
                        </button>
                        <span class="px-3 py-1 bg-white text-center min-w-[40px] text-sm">
                            {{ getQuantity(option.value) }}
                        </span>
                        <button 
                            type="button" 
                            class="px-3 py-1 text-gray-700 hover:bg-brand-blue hover:text-white"
                            @click="incrementQuantity(option.value)"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: 'Упаковка'
    },
    options: {
        type: Array,
        required: true,
        default: () => []
    },
    modelValue: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['update:modelValue']);

// Проверяем, выбрана ли упаковка
function isSelected(id) {
    return props.modelValue.some(item => item.uid === id);
}

// Получаем количество для выбранной упаковки
function getQuantity(id) {
    const item = props.modelValue.find(item => item.uid === id);
    return item ? item.quantity : 1;
}

// Получаем единицу измерения для упаковки
function getUnitLabel(id) {
    const option = props.options.find(opt => opt.value === id);
    if (!option) return 'шт';
    
    // Используем uidUnit из API, если доступен
    if (option.uidUnit) {
        const unitMap = {
            'unit-pcs': 'шт',
            'unit-m3': 'м³',
            'unit-m2': 'м²',
            'unit-lm': 'пог.м'
        };
        return unitMap[option.uidUnit] || 'шт';
    }
    
    // Fallback на основе типа упаковки
    const unitMap = {
        'box-005': 'м³', // Обрешётка
        'box-009': 'пог.м', // Пузырчатая пленка
        'box-010': 'м²' // Стрейч пленка
    };
    
    return unitMap[id] || 'шт';
}

// Переключаем выбор упаковки
function toggleSelection(id) {
    const currentItems = [...props.modelValue];
    const existingIndex = currentItems.findIndex(item => item.uid === id);
    
    if (existingIndex >= 0) {
        // Удаляем из выбранных
        currentItems.splice(existingIndex, 1);
    } else {
        // Добавляем в выбранные с количеством 1
        currentItems.push({ uid: id, quantity: 1 });
    }
    
    emit('update:modelValue', currentItems);
}

// Увеличиваем количество
function incrementQuantity(id) {
    const currentItems = [...props.modelValue];
    const item = currentItems.find(item => item.uid === id);
    if (item) {
        item.quantity += 1;
        emit('update:modelValue', currentItems);
    }
}

// Уменьшаем количество
function decrementQuantity(id) {
    const currentItems = [...props.modelValue];
    const item = currentItems.find(item => item.uid === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        emit('update:modelValue', currentItems);
    }
}
</script>

<style scoped>
/* Стили мобильных tooltips подключены глобально в main.css */
</style>