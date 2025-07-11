<template>
    <section class="card bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-h4 font-bold mb-4">Дополнительные опции</h2>
        <div class="flex flex-col gap-4">
            <CheckboxInput name="requires_accompanying_docs" label="Требуется перевозка сопроводительных документов"
                v-model="requiresAccompanyingDocs" />
            <CheckboxInput name="return_docs_to_sender" label="Возврат документов отправителю"
                v-model="returnDocsToSender" />
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import CheckboxInput from '@/components/forms/CheckboxInput.vue';

const props = defineProps({
    modelValue: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

// Флаг для предотвращения циклических обновлений
let isUpdatingFromParent = false;

const requiresAccompanyingDocs = ref(props.modelValue.requiresAccompanyingDocs || false);
const returnDocsToSender = ref(props.modelValue.returnDocsToSender || false);

// Watch for local changes and emit update to parent
watch([requiresAccompanyingDocs, returnDocsToSender], () => {
    if (isUpdatingFromParent) return;
    
    emit('update:modelValue', {
        requiresAccompanyingDocs: requiresAccompanyingDocs.value,
        returnDocsToSender: returnDocsToSender.value,
    });
});

// Watch for parent changes and update local state
watch(() => props.modelValue, (newValue) => {
    if (isUpdatingFromParent) return;
    
    isUpdatingFromParent = true;
    
    requiresAccompanyingDocs.value = newValue.requiresAccompanyingDocs || false;
    returnDocsToSender.value = newValue.returnDocsToSender || false;
    
    // Используем setTimeout, чтобы убедиться, что все обновления завершены
    setTimeout(() => {
        isUpdatingFromParent = false;
    }, 0);
}, { deep: true });
</script>