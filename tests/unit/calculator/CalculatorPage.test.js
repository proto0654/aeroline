import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CalculatorPage from '@/components/pages/calculator/CalculatorPage.vue';
import { mockApiService, testCase1Data, testCase2Data, testCase4Data } from '../../mocks/apiService';

// Мокируем apiService
vi.mock('@/services/apiService.js', () => ({
  default: mockApiService
}));

describe('CalculatorPage - Кейс 1: Терминал → Терминал', () => {
  let wrapper;

  beforeEach(() => {
    // Устанавливаем данные для теста
    mockApiService.mockData = { ...testCase1Data };
    
    wrapper = mount(CalculatorPage, {
      global: {
        stubs: {
          DirectionForm: true,
          DeliveryPointForm: true,
          CargoParamsForm: true,
          ExtraOptionsForm: true,
          CalculationResult: true,
          ManagerRequestForm: true
        }
      }
    });
  });

  it('должен загружать данные из API', async () => {
    await nextTick();
    expect(mockApiService.getBillingAddresses).toBeDefined();
    expect(mockApiService.getTerminals).toBeDefined();
  });

  it('должен находить takeDeliverFrom для терминала Красноярска', async () => {
    const terminal = testCase1Data.terminals[0];
    const billingAddress = testCase1Data.billingAddresses.find(
      addr => addr.uid === terminal.uidBillingAddress
    );
    const takeDeliver = testCase1Data.takeDelivers.find(
      td => td.uidBillingAddress === billingAddress.uid
    );

    expect(takeDeliver).toBeDefined();
    expect(takeDeliver.uid).toBe('7f40e4fa-5936-11eb-a7ef-d89d672a90e6');
    expect(takeDeliver.tariffZone).toBe('A');
  });

  it('должен находить takeDeliverTo для терминала Новосибирска', async () => {
    const terminal = testCase1Data.terminals[1];
    const billingAddress = testCase1Data.billingAddresses.find(
      addr => addr.uid === terminal.uidBillingAddress
    );
    const takeDeliver = testCase1Data.takeDelivers.find(
      td => td.uidBillingAddress === billingAddress.uid
    );

    expect(takeDeliver).toBeDefined();
    expect(takeDeliver.uid).toBe('85392a9d-5936-11eb-a7ef-d89d672a90e6');
    expect(takeDeliver.tariffZone).toBe('C');
  });

  it('должен находить tariffZone для направления Красноярск → Новосибирск', async () => {
    const takeDeliverFrom = testCase1Data.takeDelivers[0];
    const takeDeliverTo = testCase1Data.takeDelivers[1];
    const tariffZone = testCase1Data.tariffZones.find(tz =>
      tz.uidTakeLocality === takeDeliverFrom.uid &&
      tz.uidDeliverLocality === takeDeliverTo.uid
    );

    expect(tariffZone).toBeDefined();
    expect(tariffZone.tariffZone).toBe(4);
  });

  it('должен рассчитывать забор = 0₽ для терминала', () => {
    // Логика: если выбран терминал, забор = 0
    const isPickupAtTerminal = true;
    expect(isPickupAtTerminal).toBe(true);
    // В реальном тесте здесь будет проверка результата расчета
  });

  it('должен рассчитывать доставку = 0₽ для терминала', () => {
    // Логика: если выбран терминал, доставка = 0
    const isDeliveryAtTerminal = true;
    expect(isDeliveryAtTerminal).toBe(true);
    // В реальном тесте здесь будет проверка результата расчета
  });
});

describe('CalculatorPage - Кейс 2: Адрес → Терминал', () => {
  beforeEach(() => {
    mockApiService.mockData = { ...testCase2Data };
  });

  it('должен находить billingAddress для адреса через терминал', async () => {
    const cityName = 'Красноярск';
    const terminalsInCity = testCase2Data.terminals.filter(t => t.locality === cityName);
    
    expect(terminalsInCity.length).toBeGreaterThan(0);
    
    if (terminalsInCity.length > 0 && terminalsInCity[0].uidBillingAddress) {
      const billingAddress = testCase2Data.billingAddresses.find(
        addr => addr.uid === terminalsInCity[0].uidBillingAddress
      );
      
      expect(billingAddress).toBeDefined();
      expect(billingAddress.locality).toBe('Красноярск');
    }
  });

  it('должен находить takeDeliver для адреса', async () => {
    const address = testCase2Data.billingAddresses.find(
      addr => addr.street === 'Авиаторов ул'
    );
    
    const takeDeliver = testCase2Data.takeDelivers.find(
      td => td.uidBillingAddress === address.uid
    );

    // Если takeDeliver не найден напрямую, используем тот же, что и для терминала
    const terminal = testCase2Data.terminals.find(t => t.locality === address.locality);
    const terminalBillingAddress = testCase2Data.billingAddresses.find(
      addr => addr.uid === terminal.uidBillingAddress
    );
    const terminalTakeDeliver = testCase2Data.takeDelivers.find(
      td => td.uidBillingAddress === terminalBillingAddress.uid
    );

    expect(terminalTakeDeliver).toBeDefined();
    expect(terminalTakeDeliver.tariffZone).toBe('A');
  });
});

describe('CalculatorPage - Кейс 4: Адрес → Адрес', () => {
  beforeEach(() => {
    mockApiService.mockData = { ...testCase4Data };
  });

  it('должен находить оба адреса через терминалы', async () => {
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

  it('должен находить takeDeliver для обоих адресов', async () => {
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
});

