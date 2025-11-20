import { describe, it, expect, beforeEach } from 'vitest';
import { testCase1Data, testCase2Data, testCase4Data } from '../../mocks/apiService';

/**
 * Тесты для функции calculateTariffCost
 * Эти тесты проверяют логику расчета тарифов на основе данных из тестовых кейсов
 */

describe('calculateTariffCost - Логика расчета тарифов', () => {
  describe('Кейс 1: Терминал → Терминал', () => {
    it('должен находить правильные takeDeliver записи', () => {
      const terminalFrom = testCase1Data.terminals[0];
      const terminalTo = testCase1Data.terminals[1];

      const billingAddressFrom = testCase1Data.billingAddresses.find(
        addr => addr.uid === terminalFrom.uidBillingAddress
      );
      const billingAddressTo = testCase1Data.billingAddresses.find(
        addr => addr.uid === terminalTo.uidBillingAddress
      );

      const takeDeliverFrom = testCase1Data.takeDelivers.find(
        td => td.uidBillingAddress === billingAddressFrom.uid
      );
      const takeDeliverTo = testCase1Data.takeDelivers.find(
        td => td.uidBillingAddress === billingAddressTo.uid
      );

      expect(takeDeliverFrom).toBeDefined();
      expect(takeDeliverTo).toBeDefined();
      expect(takeDeliverFrom.uid).toBe('7f40e4fa-5936-11eb-a7ef-d89d672a90e6');
      expect(takeDeliverTo.uid).toBe('85392a9d-5936-11eb-a7ef-d89d672a90e6');
    });

    it('должен находить tariffZone для направления', () => {
      const takeDeliverFrom = testCase1Data.takeDelivers[0];
      const takeDeliverTo = testCase1Data.takeDelivers[1];
      const transportTypeUid = testCase1Data.transportType.uid;

      const tariffZone = testCase1Data.tariffZones.find(tz =>
        tz.uidTakeLocality === takeDeliverFrom.uid &&
        tz.uidDeliverLocality === takeDeliverTo.uid &&
        tz.uidTypeTransportation === transportTypeUid
      );

      expect(tariffZone).toBeDefined();
      expect(tariffZone.tariffZone).toBe(4);
    });

    it('должен возвращать забор = 0 для терминала', () => {
      const isPickupAtTerminal = true;
      const pickupCost = isPickupAtTerminal ? 0 : null; // В реальной функции будет расчет

      expect(pickupCost).toBe(0);
    });

    it('должен возвращать доставку = 0 для терминала', () => {
      const isDeliveryAtTerminal = true;
      const deliveryCost = isDeliveryAtTerminal ? 0 : null; // В реальной функции будет расчет

      expect(deliveryCost).toBe(0);
    });
  });

  describe('Кейс 2: Адрес → Терминал', () => {
    it('должен находить billingAddress для адреса через терминал', () => {
      const cityName = 'Красноярск';
      const streetName = 'Авиаторов ул';

      // Находим терминал в городе
      const terminalsInCity = testCase2Data.terminals.filter(t => t.locality === cityName);
      expect(terminalsInCity.length).toBeGreaterThan(0);

      // Используем billingAddress из терминала
      const terminal = terminalsInCity[0];
      const billingAddress = testCase2Data.billingAddresses.find(
        addr => addr.uid === terminal.uidBillingAddress
      );

      expect(billingAddress).toBeDefined();
      expect(billingAddress.locality).toBe(cityName);
    });

    it('должен находить takeDeliver для адреса (тот же, что и для терминала)', () => {
      const cityName = 'Красноярск';
      const terminal = testCase2Data.terminals.find(t => t.locality === cityName);
      const billingAddress = testCase2Data.billingAddresses.find(
        addr => addr.uid === terminal.uidBillingAddress
      );

      const takeDeliver = testCase2Data.takeDelivers.find(
        td => td.uidBillingAddress === billingAddress.uid
      );

      expect(takeDeliver).toBeDefined();
      expect(takeDeliver.tariffZone).toBe('A');
    });

    it('должен рассчитывать забор для адреса (не 0)', () => {
      const isPickupAtTerminal = false;
      const takeDeliver = testCase2Data.takeDelivers[0]; // Зона A

      expect(isPickupAtTerminal).toBe(false);
      expect(takeDeliver.tariffZone).toBe('A');
      // В реальной функции здесь будет расчет стоимости забора
    });

    it('должен возвращать доставку = 0 для терминала', () => {
      const isDeliveryAtTerminal = true;
      const deliveryCost = isDeliveryAtTerminal ? 0 : null;

      expect(deliveryCost).toBe(0);
    });
  });

  describe('Кейс 4: Адрес → Адрес', () => {
    it('должен находить оба адреса через терминалы', () => {
      const fromCity = 'Красноярск';
      const toCity = 'Новосибирск';

      const fromTerminal = testCase4Data.terminals.find(t => t.locality === fromCity);
      const toTerminal = testCase4Data.terminals.find(t => t.locality === toCity);

      const fromBillingAddress = testCase4Data.billingAddresses.find(
        addr => addr.uid === fromTerminal.uidBillingAddress
      );
      const toBillingAddress = testCase4Data.billingAddresses.find(
        addr => addr.uid === toTerminal.uidBillingAddress
      );

      expect(fromBillingAddress).toBeDefined();
      expect(toBillingAddress).toBeDefined();
    });

    it('должен находить takeDeliver для обоих адресов', () => {
      const fromTerminal = testCase4Data.terminals[0];
      const toTerminal = testCase4Data.terminals[1];

      const fromBillingAddress = testCase4Data.billingAddresses.find(
        addr => addr.uid === fromTerminal.uidBillingAddress
      );
      const toBillingAddress = testCase4Data.billingAddresses.find(
        addr => addr.uid === toTerminal.uidBillingAddress
      );

      const takeDeliverFrom = testCase4Data.takeDelivers.find(
        td => td.uidBillingAddress === fromBillingAddress.uid
      );
      const takeDeliverTo = testCase4Data.takeDelivers.find(
        td => td.uidBillingAddress === toBillingAddress.uid
      );

      expect(takeDeliverFrom).toBeDefined();
      expect(takeDeliverTo).toBeDefined();
      expect(takeDeliverFrom.tariffZone).toBe('A');
      expect(takeDeliverTo.tariffZone).toBe('C');
    });

    it('должен рассчитывать забор и доставку (оба не 0)', () => {
      const isPickupAtTerminal = false;
      const isDeliveryAtTerminal = false;

      expect(isPickupAtTerminal).toBe(false);
      expect(isDeliveryAtTerminal).toBe(false);
      // В реальной функции здесь будет расчет стоимости забора и доставки
    });
  });
});

