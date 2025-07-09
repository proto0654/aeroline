<template>
    <div class="title-wrapper mb-6">
        <h1 class="animated-title text-center text-h2 mb-2">Калькулятор стоимости пересылки</h1>
    </div>

    <Form :validation-schema="validationSchema" v-slot="{ handleSubmit, errors }">
        <form @submit.prevent="handleSubmit(submit)">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Левая колонка: Формы ввода -->
                <div class="flex flex-col gap-6">
                    <DirectionForm :offices="offices" v-model="formData.direction" />
                    <CargoParamsForm v-if="calculatorConfig.packaging" :calculator-config="calculatorConfig"
                        v-model="formData.cargo" />
                    <DeliveryPointForm title="Пункт отправки" terminal-label="Сдать на терминале"
                        address-label="Забрать по адресу" name-prefix="departure" :city="formData.direction.from"
                        :offices="offices" v-model="formData.departure" />
                    <DeliveryPointForm title="Пункт назначения" terminal-label="Получить на терминале"
                        address-label="Доставить по адресу" name-prefix="destination" :city="formData.direction.to"
                        :offices="offices" v-model="formData.destination" />
                    <ExtraOptionsForm v-model="formData.extraOptions" />

                    <section class="card bg-white p-6 rounded-lg shadow-sm">
                        <h2 class="text-h4 font-bold mb-4">Дополнительные опции</h2>
                        <p class="text-gray-500">Здесь будут дополнительные опции...</p>
                    </section>
                </div>

                <!-- Правая колонка: Результаты расчета -->
                <div class="lg:sticky top-6 h-fit">
                    <CalculationResult :result="calculationResult" @print="printResult" />
                    <button type="submit" class="btn btn-primary w-full mt-4">Рассчитать</button>
                    <div v-if="Object.keys(errors).length > 0" class="mt-4 text-red-500 text-sm">
                        <p>Пожалуйста, заполните все обязательные поля.</p>
                    </div>
                </div>
            </div>
        </form>
    </Form>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { Form } from 'vee-validate';
import DirectionForm from './DirectionForm.vue';
import CargoParamsForm from './CargoParamsForm.vue';
import DeliveryPointForm from './DeliveryPointForm.vue';
import ExtraOptionsForm from './ExtraOptionsForm.vue';
import CalculationResult from './CalculationResult.vue';
import * as yup from 'yup';

const offices = ref([]);
const calculatorConfig = ref({});
const calculationResult = ref(null);

const formData = reactive({
    direction: {
        from: '',
        to: ''
    },
    cargo: {
        mode: 'individual',
        packages: [{ id: Date.now(), length: '', width: '', height: '', weight: '' }],
        totalWeight: '',
        totalVolume: '',
        contentDescription: 'Личные вещи',
        declaredValue: 1000,
        packaging: 'box-s',
        selfMarking: false,
        dangerousGoods: false,
        tempControl: false,
    },
    departure: {
        deliveryMode: 'terminal',
        location: '',
        date: new Date().toISOString().split('T')[0]
    },
    destination: {
        deliveryMode: 'terminal',
        location: '',
        date: ''
    },
    extraOptions: {
        requiresAccompanyingDocs: false,
        returnDocsToSender: false
    }
});

const packageSchema = yup.object().shape({
    length: yup.number().required().positive().typeError('Должно быть число'),
    width: yup.number().required().positive().typeError('Должно быть число'),
    height: yup.number().required().positive().typeError('Должно быть число'),
    weight: yup.number().required().positive().typeError('Должно быть число'),
});

const validationSchema = yup.object({
    direction: yup.object({
        from: yup.string().required('Выберите город отправления'),
        to: yup.string().required('Выберите город назначения'),
    }),
    cargo: yup.object({
        mode: yup.string().required(),
        packages: yup.array().when('mode', {
            is: 'individual',
            then: (schema) => schema.of(packageSchema).min(1),
        }),
        totalWeight: yup.number().when('mode', { is: 'total', then: (schema) => schema.required().positive() }),
        totalVolume: yup.number().when('mode', { is: 'total', then: (schema) => schema.required().positive() }),
        declaredValue: yup.number().required().min(0),
    }),
    departure: yup.object({
        location: yup.string().required('Укажите место отправки'),
        date: yup.string().required('Укажите дату'),
    }),
    destination: yup.object({
        location: yup.string().required('Укажите место назначения'),
    })
});

async function fetchData() {
    try {
        const [officesRes, configRes] = await Promise.all([
            fetch('/assets/data/contacts.json'),
            fetch('/assets/data/calculator-data.json')
        ]);
        const officesData = await officesRes.json();
        offices.value = officesData.offices || [];
        calculatorConfig.value = await configRes.json();

        // Проверка GET-параметров после загрузки данных офисов
        const urlParams = new URLSearchParams(window.location.search);
        const fromId = urlParams.get('from');
        const toId = urlParams.get('to');

        if (fromId) {
            const office = offices.value.find(o => o.id === parseInt(fromId));
            if (office) {
                formData.direction.from = office.city + (office.address ? ', ' + office.address : '');
            }
        }

        if (toId) {
            const office = offices.value.find(o => o.id === parseInt(toId));
            if (office) {
                formData.direction.to = office.city + (office.address ? ', ' + office.address : '');
            }
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

function calculateCost() {
    const { services, coefficients, tariffs } = calculatorConfig.value;
    const { cargo, departure, destination, extraOptions } = formData;

    // Выбираем тариф (пока заглушка, берем первый)
    const tariff = tariffs[0];
    let totalCost = 0;
    const details = [];

    // 1. Расчет веса и объема
    let totalWeight, totalVolume;
    if (cargo.mode === 'individual') {
        totalWeight = cargo.packages.reduce((sum, pkg) => sum + (parseFloat(pkg.weight) || 0), 0);
        totalVolume = cargo.packages.reduce((sum, pkg) => {
            const vol = (parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height)) / 1000000;
            return sum + (vol || 0);
        }, 0);
    } else {
        totalWeight = parseFloat(cargo.totalWeight) || 0;
        totalVolume = parseFloat(cargo.totalVolume) || 0;
    }

    // 2. Расчет базовой стоимости
    const weightCost = totalWeight * tariff.baseRatePerKg;
    const volumeCost = totalVolume * tariff.baseRatePerM3;
    let baseCost = Math.max(weightCost, volumeCost, tariff.minCost);
    details.push({ name: 'Базовый тариф', cost: baseCost });

    // 3. Коэффициенты
    if (cargo.dangerousGoods) {
        const markup = baseCost * (coefficients.dangerousGoodsMultiplier.value - 1);
        baseCost += markup;
        details.push({ name: coefficients.dangerousGoodsMultiplier.name, cost: markup });
    }
    if (departure.deliveryMode === 'address') {
        const markup = baseCost * (coefficients.fromAddressMultiplier.value - 1);
        baseCost += markup;
        details.push({ name: coefficients.fromAddressMultiplier.name, cost: markup });
    }
    // ... другие коэф-ты

    // 4. Доп услуги
    totalCost = baseCost;
    if (services.logisticProcessing) {
        totalCost += services.logisticProcessing.cost;
        details.push(services.logisticProcessing);
    }
    if (extraOptions.returnDocsToSender && services.documentReturn) {
        totalCost += services.documentReturn.cost;
        details.push(services.documentReturn);
    }
    // ... другие услуги

    return { totalCost, details, tariff };
}

function submit() {
    console.log('Form submitted:', JSON.parse(JSON.stringify(formData)));
    calculationResult.value = calculateCost();
}

function printResult() {
    window.print();
}

onMounted(fetchData);

</script>