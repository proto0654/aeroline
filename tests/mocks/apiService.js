// Моки для apiService
export const mockApiService = {
  baseUrl: 'https://08615a563fb9b4f8.mokky.dev',
  
  // Моки данных для тестов
  mockData: {
    billingAddresses: [],
    terminals: [],
    tariffZones: [],
    takeDelivers: [],
    tariffGrids: [],
    transportTypes: [],
  },

  async getBillingAddresses() {
    return this.mockData.billingAddresses;
  },

  async getTerminals(localityName = null) {
    if (localityName) {
      return this.mockData.terminals.filter(t => t.locality === localityName);
    }
    return this.mockData.terminals;
  },

  async getTariffZones(transportTypeUid = null) {
    if (transportTypeUid) {
      return this.mockData.tariffZones.filter(tz => 
        tz.uidTypeTransportation === transportTypeUid
      );
    }
    return this.mockData.tariffZones;
  },

  async getTakeDelivers(transportTypeUid = null, addressUid = null) {
    let result = this.mockData.takeDelivers;
    
    if (transportTypeUid) {
      result = result.filter(td => td.uidTypeTransportation === transportTypeUid);
    }
    
    if (addressUid) {
      result = result.filter(td => td.uidBillingAddress === addressUid);
    }
    
    return result;
  },

  async getTariffGrids(transportTypeUid = null) {
    if (transportTypeUid) {
      return this.mockData.tariffGrids.filter(tg => 
        tg.transportType_uid === transportTypeUid
      );
    }
    return this.mockData.tariffGrids;
  },

  async getTransportTypes() {
    return this.mockData.transportTypes;
  },

  async getBillingAddressesWithRelations() {
    return this.mockData.billingAddresses;
  },

  searchStreets(cityName, query) {
    const cityAddresses = this.mockData.billingAddresses.filter(addr => {
      const addrCity = typeof addr.locality === 'string' ? addr.locality : addr.locality?.name;
      return addrCity === cityName && addr.street && addr.street.toLowerCase().includes(query.toLowerCase());
    });
    
    return [...new Set(cityAddresses.map(addr => addr.street))];
  },

  searchHouses(cityName, streetName, query) {
    return this.mockData.billingAddresses
      .filter(addr => {
        const addrCity = typeof addr.locality === 'string' ? addr.locality : addr.locality?.name;
        return addrCity === cityName && addr.street === streetName && addr.house;
      })
      .map(addr => addr.house)
      .filter((house, index, self) => self.indexOf(house) === index);
  }
};

// Данные для Кейса 1: Терминал → Терминал (Красноярск → Новосибирск)
// Актуальные данные из API (2025-01-21)
export const testCase1Data = {
  transportType: {
    uid: '205006fa-3cc0-11ea-9463-7824af43f0ed',
    name: 'Cargo-Регион'
  },
  billingAddresses: [
    {
      uid: '4dc6ccfb-dfce-11ec-a806-d89d672a90e7',
      locality: 'Красноярск',
      street: '',
      house: ''
    },
    {
      uid: '4dc6cd45-dfce-11ec-a806-d89d672a90e7',
      locality: 'Новосибирск',
      street: '',
      house: ''
    }
  ],
  terminals: [
    {
      uid: '6fc2398d-c532-11e8-942c-001a7dda7113',
      locality: 'Красноярск',
      uidBillingAddress: '4dc6ccfb-dfce-11ec-a806-d89d672a90e7',
      representation: 'Красноярск, Промысловая ул, 25а, 11'
    },
    {
      uid: '3f6a8bdc-e647-11e8-a69f-74d02b985cb1',
      locality: 'Новосибирск',
      uidBillingAddress: '4dc6cd45-dfce-11ec-a806-d89d672a90e7',
      representation: 'Новосибирск, Толмачевское шоссе, 16'
    }
  ],
  takeDelivers: [
    {
      uid: '7f40e4fa-5936-11eb-a7ef-d89d672a90e6',
      uidBillingAddress: '4dc6ccfb-dfce-11ec-a806-d89d672a90e7',
      uidTypeTransportation: '205006fa-3cc0-11ea-9463-7824af43f0ed',
      tariffZone: 'A'
    },
    {
      uid: '85392a9d-5936-11eb-a7ef-d89d672a90e6',
      uidBillingAddress: '4dc6cd45-dfce-11ec-a806-d89d672a90e7',
      uidTypeTransportation: '205006fa-3cc0-11ea-9463-7824af43f0ed',
      tariffZone: 'C'
    }
  ],
  tariffZones: [
    {
      uid: 'tariff-zone-1',
      uidTakeLocality: '7f40e4fa-5936-11eb-a7ef-d89d672a90e6',
      uidDeliverLocality: '85392a9d-5936-11eb-a7ef-d89d672a90e6',
      uidTypeTransportation: '205006fa-3cc0-11ea-9463-7824af43f0ed',
      tariffZone: 4
    }
  ],
  tariffGrids: [
    {
      uid: 'grid-transport-4',
      transportType_uid: '205006fa-3cc0-11ea-9463-7824af43f0ed',
      NumberZone: 4,
      startingPrice: 1000,
      unitFrom: 0,
      step: 10,
      stepPrice: 50
    },
    {
      uid: 'grid-take-A',
      transportType_uid: '205006fa-3cc0-11ea-9463-7824af43f0ed',
      NumberZone: 'A',
      startingPrice: 500,
      unitFrom: 0,
      step: 5,
      stepPrice: 25
    },
    {
      uid: 'grid-deliver-C',
      transportType_uid: '205006fa-3cc0-11ea-9463-7824af43f0ed',
      NumberZone: 'C',
      startingPrice: 600,
      unitFrom: 0,
      step: 5,
      stepPrice: 30
    }
  ]
};

// Данные для Кейса 2: Адрес → Терминал
// Актуальные данные из API (2025-01-21)
export const testCase2Data = {
  ...testCase1Data,
  billingAddresses: [
    ...testCase1Data.billingAddresses,
    {
      uid: '4dc6ccfc-dfce-11ec-a806-d89d672a90e7',
      locality: 'Красноярск',
      street: 'Авиаторов ул',
      house: ''
    },
    {
      uid: '213776ff-9db6-11ef-9fb7-0cc47aa88e61',
      locality: 'Красноярск',
      street: 'Пограничников ул',
      house: ''
    }
  ]
};

// Данные для Кейса 4: Адрес → Адрес
// Актуальные данные из API (2025-01-21)
export const testCase4Data = {
  ...testCase1Data,
  billingAddresses: [
    ...testCase1Data.billingAddresses,
    {
      uid: '4dc6ccfc-dfce-11ec-a806-d89d672a90e7',
      locality: 'Красноярск',
      street: 'Авиаторов ул',
      house: ''
    },
    {
      uid: '213776ff-9db6-11ef-9fb7-0cc47aa88e61',
      locality: 'Красноярск',
      street: 'Пограничников ул',
      house: ''
    },
    {
      uid: '4dc6cd46-dfce-11ec-a806-d89d672a90e7',
      locality: 'Новосибирск',
      street: 'Станционная ул',
      house: ''
    }
  ]
};

