<template>
    <div :class="compact ? '' : 'bg-brand-light p-5 rounded-lg'">
        <h2 v-if="!compact" class="text-h4 font-bold mb-4">Запрос на добавление направления</h2>
        <p v-if="!compact" class="text-gray-600 mb-6">
            Выбранное направление временно недоступно. Заполните форму, и наш менеджер свяжется с вами для уточнения деталей.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Регион (скрывается в компактном режиме) -->
            <div v-if="!compact">
                <label class="block text-brand-gray font-medium mb-2">
                    Регион <span class="text-red-500">*</span>
                </label>
                <AutocompleteInput
                    name="region"
                    placeholder="Выберите или введите регион"
                    :items="regions"
                    v-model="formData.region"
                    :useApiSearch="true"
                    :apiSearchFunction="searchRegionsApi"
                    :itemFormatter="formatRegionName"
                    :selectedValueFormatter="formatRegionName"
                    required
                />
            </div>
            <div v-else-if="formData.region" class="text-sm text-gray-600 mb-2">
                <strong>Регион:</strong> {{ formData.region }}
            </div>

            <!-- Населенный пункт (скрывается в компактном режиме) -->
            <div v-if="!compact">
                <label class="block text-brand-gray font-medium mb-2">
                    Населенный пункт <span class="text-red-500">*</span>
                </label>
                <AutocompleteInput
                    name="locality"
                    placeholder="Выберите или введите населенный пункт"
                    :items="localities"
                    v-model="formData.locality"
                    :useApiSearch="true"
                    :apiSearchFunction="searchLocalitiesApi"
                    :itemFormatter="formatLocalityName"
                    :selectedValueFormatter="formatLocalityName"
                    required
                />
            </div>
            <div v-else-if="formData.locality" class="text-sm text-gray-600 mb-2">
                <strong>Город:</strong> {{ formData.locality }}
            </div>

            <!-- Улица -->
            <div v-if="showStreetField">
                <label class="block text-brand-gray font-medium mb-2">
                    Улица
                </label>
                <TextInput
                    name="street"
                    placeholder="Введите название улицы"
                    v-model="formData.street"
                />
            </div>

            <!-- Телефон -->
            <div>
                <label class="block text-brand-gray font-medium mb-2">
                    Телефон <span class="text-red-500">*</span>
                </label>
                <TextInput
                    name="phone"
                    type="tel"
                    placeholder="+7 (XXX) XXX-XX-XX"
                    v-model="formData.phone"
                    required
                />
            </div>

            <!-- Email -->
            <div>
                <label class="block text-brand-gray font-medium mb-2">
                    Email <span class="text-red-500">*</span>
                </label>
                <TextInput
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    v-model="formData.email"
                    required
                />
            </div>

            <!-- Кнопка отправки -->
            <div class="flex gap-4 pt-4">
                <button
                    type="submit"
                    class="bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    :disabled="isSubmitting || !isFormValid"
                >
                    {{ isSubmitting ? 'Отправка...' : 'Отправить запрос' }}
                </button>
                <button
                    v-if="!compact"
                    type="button"
                    @click="handleCancel"
                    class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Отмена
                </button>
            </div>

            <!-- Сообщение об успехе/ошибке -->
            <div v-if="message.show" :class="[
                'p-4 rounded-lg',
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            ]">
                {{ message.text }}
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import TextInput from '../../forms/TextInput.vue';
import AutocompleteInput from '../../forms/AutocompleteInput.vue';
import apiService from '../../../services/apiService.js';
// Убрали зависимость от formatSelectedLocalityName - используем formatLocalityName

const props = defineProps({
    // Предзаполненные данные
    prefillRegion: {
        type: String,
        default: ''
    },
    prefillLocality: {
        type: String,
        default: ''
    },
    prefillStreet: {
        type: String,
        default: ''
    },
    regions: {
        type: Array,
        default: () => []
    },
    localities: {
        type: Array,
        default: () => []
    },
    // Компактный режим (без заголовка и описания)
    compact: {
        type: Boolean,
        default: false
    },
    // Показывать ли поле улицы
    showStreetField: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['cancel', 'submit']);

const formData = ref({
    region: props.prefillRegion || '',
    locality: props.prefillLocality || '',
    street: props.prefillStreet || '',
    phone: '',
    email: ''
});

const isSubmitting = ref(false);
const message = ref({
    show: false,
    type: 'success',
    text: ''
});

// Валидация формы
const isFormValid = computed(() => {
    // В компактном режиме регион и город уже предзаполнены и не требуют валидации
    const regionValid = props.compact ? true : (formData.value.region.trim() !== '');
    const localityValid = props.compact ? true : (formData.value.locality.trim() !== '');
    const phoneValid = formData.value.phone.trim() !== '';
    const emailValid = formData.value.email.trim() !== '' && isValidEmail(formData.value.email);
    
    return regionValid && localityValid && phoneValid && emailValid;
});

// Простая валидация email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Форматирование региона
function formatRegionName(region) {
    if (typeof region === 'string') return region;
    return region?.name || '';
}

// Форматирование населенного пункта
function formatLocalityName(locality) {
    if (typeof locality === 'string') return locality;
    return locality?.name || '';
}

// API поиск регионов (используем данные из props.regions)
async function searchRegionsApi(query) {
    try {
        if (!query || query.trim() === '') {
            return props.regions || [];
        }
        const queryLower = query.toLowerCase().trim();
        return (props.regions || []).filter(region => {
            const regionName = typeof region === 'string' ? region : (region.name || region);
            return regionName.toLowerCase().includes(queryLower);
        });
    } catch (error) {
        console.error('Ошибка при поиске регионов:', error);
        return [];
    }
}

// API поиск населенных пунктов (используем данные из props.localities)
async function searchLocalitiesApi(query) {
    try {
        if (!query || query.trim() === '') {
            return props.localities || [];
        }
        
        const queryLower = query.toLowerCase().trim();
        return (props.localities || []).filter(locality => {
            const localityName = typeof locality === 'string' ? locality : (locality.name || '');
            const regionName = typeof locality === 'string' ? '' : (locality.region || '');
            return localityName.toLowerCase().includes(queryLower) || 
                   regionName.toLowerCase().includes(queryLower);
        });
    } catch (error) {
        console.error('Ошибка при поиске населенных пунктов:', error);
        return [];
    }
}

// Обработка отправки формы
async function handleSubmit() {
    if (!isFormValid.value) {
        message.value = {
            show: true,
            type: 'error',
            text: 'Пожалуйста, заполните все обязательные поля корректно'
        };
        return;
    }

    isSubmitting.value = true;
    message.value.show = false;

    try {
        // TODO: Добавить API endpoint для отправки запроса
        // Пока просто эмитим событие
        emit('submit', {
            region: formData.value.region,
            locality: formData.value.locality,
            street: formData.value.street,
            phone: formData.value.phone,
            email: formData.value.email
        });

        message.value = {
            show: true,
            type: 'success',
            text: 'Запрос успешно отправлен! Наш менеджер свяжется с вами в ближайшее время.'
        };

        // Очищаем форму через 3 секунды
        setTimeout(() => {
            formData.value = {
                region: props.prefillRegion || '',
                locality: props.prefillLocality || '',
                street: props.prefillStreet || '',
                phone: '',
                email: ''
            };
            message.value.show = false;
        }, 3000);
    } catch (error) {
        message.value = {
            show: true,
            type: 'error',
            text: 'Произошла ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.'
        };
    } finally {
        isSubmitting.value = false;
    }
}

// Обработка отмены
function handleCancel() {
    emit('cancel');
}

// Обновление предзаполненных данных при изменении props
watch(() => [props.prefillRegion, props.prefillLocality, props.prefillStreet], ([region, locality, street]) => {
    // В компактном режиме всегда обновляем регион и город из props
    if (region) {
        formData.value.region = region;
    }
    if (locality) {
        formData.value.locality = locality;
    }
    if (street && !formData.value.street) {
        formData.value.street = street;
    }
}, { immediate: true });
</script>

<style scoped>
/* Стили уже применены через классы Tailwind */
</style>

