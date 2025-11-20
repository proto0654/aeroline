import { describe, it, expect } from 'vitest';

/**
 * Тесты для проверки правильного выбора тарифной сетки
 * Проверяет случай, когда Платный Вес (ПВ) меньше unitFrom
 */

describe('Выбор тарифной сетки - обработка ПВ < unitFrom', () => {
    // Симуляция функции calculateCostByTariffGrid
    function calculateCostByTariffGrid(tariffGridArray, payableWeight) {
        if (!tariffGridArray || tariffGridArray.length === 0) {
            return 0;
        }

        // Сортируем тарифную сетку по unitFrom для правильного поиска
        const sortedTariffGrid = [...tariffGridArray].sort((a, b) => {
            const aFrom = parseFloat(a.unitFrom) || 0;
            const bFrom = parseFloat(b.unitFrom) || 0;
            return aFrom - bFrom;
        });

        // Найти подходящий диапазон в тарифной сетке
        // Условие из ТЗ: unitFrom < ПВ <= unitTo
        const applicableTariff = sortedTariffGrid.find(tg => {
            const unitFrom = parseFloat(tg.unitFrom) || 0;
            const unitTo = parseFloat(tg.unitTo) || Infinity;
            return payableWeight > unitFrom && payableWeight <= unitTo;
        });

        if (applicableTariff) {
            // Формула из ТЗ: ((ПВ - unitFrom) / step) × stepPrice + startingPrice
            const unitFrom = parseFloat(applicableTariff.unitFrom) || 0;
            const step = parseFloat(applicableTariff.step) || 1;
            const stepPrice = parseFloat(applicableTariff.stepPrice) || 0;
            const startingPrice = parseFloat(applicableTariff.startingPrice) || 0;
            
            // Расчет шагов: если ПВ < unitFrom, шаги = 0 (используем только startingPrice)
            const steps = payableWeight > unitFrom 
                ? Math.ceil((payableWeight - unitFrom) / step)
                : 0;
            
            return startingPrice + (steps * stepPrice);
        } else {
            // Если не найден подходящий диапазон
            const firstTariff = sortedTariffGrid[0];
            const lastTariff = sortedTariffGrid[sortedTariffGrid.length - 1];
            
            if (!firstTariff) {
                return 0;
            }
            
            const firstUnitFrom = parseFloat(firstTariff.unitFrom) || 0;
            const lastUnitTo = parseFloat(lastTariff.unitTo) || Infinity;
            
            // Если ПВ меньше минимального unitFrom - используем минимальную стоимость (startingPrice первой строки)
            if (payableWeight <= firstUnitFrom) {
                return parseFloat(firstTariff.startingPrice) || 0;
            }
            
            // Если ПВ больше максимального unitTo - используем расчет по последней строке
            if (payableWeight > lastUnitTo) {
                const unitFrom = parseFloat(lastTariff.unitFrom) || 0;
                const step = parseFloat(lastTariff.step) || 1;
                const stepPrice = parseFloat(lastTariff.stepPrice) || 0;
                const startingPrice = parseFloat(lastTariff.startingPrice) || 0;
                
                const steps = Math.ceil((payableWeight - unitFrom) / step);
                return startingPrice + (steps * stepPrice);
            }
            
            // Если попали сюда, значит что-то не так с данными
            return parseFloat(firstTariff.startingPrice) || 0;
        }
    }

    it('должен использовать минимальную стоимость, когда ПВ < unitFrom', () => {
        // Тарифная сетка для зоны A (как в примере пользователя)
        const tariffGridA = [
            {
                NumberZone: 'A',
                unitFrom: 500,
                unitTo: 1000,
                startingPrice: 2195,
                step: 1,
                stepPrice: 2
            }
        ];

        const payableWeight = 50; // ПВ меньше unitFrom (500)
        const cost = calculateCostByTariffGrid(tariffGridA, payableWeight);

        // Должна быть использована минимальная стоимость (startingPrice)
        expect(cost).toBe(2195);
        expect(cost).not.toBe(1295); // Не должна быть неправильная стоимость с отрицательными шагами
    });

    it('должен правильно рассчитывать, когда ПВ попадает в диапазон', () => {
        const tariffGridA = [
            {
                NumberZone: 'A',
                unitFrom: 500,
                unitTo: 1000,
                startingPrice: 2195,
                step: 1,
                stepPrice: 2
            }
        ];

        const payableWeight = 600; // ПВ в диапазоне 500-1000
        const cost = calculateCostByTariffGrid(tariffGridA, payableWeight);

        // Расчет: 2195 + (600 - 500) / 1 * 2 = 2195 + 200 = 2395
        const expectedSteps = Math.ceil((600 - 500) / 1);
        const expectedCost = 2195 + (expectedSteps * 2);
        expect(cost).toBe(expectedCost);
        expect(cost).toBe(2395);
    });

    it('должен правильно обрабатывать несколько диапазонов тарифной сетки', () => {
        const tariffGrid = [
            {
                NumberZone: 'A',
                unitFrom: 500,
                unitTo: 1000,
                startingPrice: 2195,
                step: 1,
                stepPrice: 2
            },
            {
                NumberZone: 'A',
                unitFrom: 0,
                unitTo: 500,
                startingPrice: 1000,
                step: 10,
                stepPrice: 5
            }
        ];

        const payableWeight = 50; // ПВ попадает в диапазон 0-500
        const cost = calculateCostByTariffGrid(tariffGrid, payableWeight);

        // Должен быть выбран правильный тариф (0-500)
        // Расчет: 1000 + ceil((50 - 0) / 10) * 5 = 1000 + 5 * 5 = 1025
        const expectedSteps = Math.ceil((50 - 0) / 10);
        const expectedCost = 1000 + (expectedSteps * 5);
        expect(cost).toBe(expectedCost);
        expect(cost).toBe(1025);
    });

    it('должен использовать минимальную стоимость для ПВ = unitFrom', () => {
        const tariffGridA = [
            {
                NumberZone: 'A',
                unitFrom: 500,
                unitTo: 1000,
                startingPrice: 2195,
                step: 1,
                stepPrice: 2
            }
        ];

        const payableWeight = 500; // ПВ равен unitFrom
        const cost = calculateCostByTariffGrid(tariffGridA, payableWeight);

        // Должна быть использована минимальная стоимость (startingPrice)
        // так как условие unitFrom < ПВ не выполняется (500 не больше 500)
        expect(cost).toBe(2195);
    });
});

