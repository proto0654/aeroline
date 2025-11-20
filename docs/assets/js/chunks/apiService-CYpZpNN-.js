var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class ApiService {
  constructor() {
    // Кэш для загруженных данных
    __publicField(this, "_localitiesCache", null);
    __publicField(this, "_regionsCache", null);
    this.baseUrl = "https://08615a563fb9b4f8.mokky.dev";
  }
  // Получение всех посылок
  async getParcels() {
    try {
      const response = await fetch(`${this.baseUrl}/parcels`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении посылок:", error);
      throw error;
    }
  }
  // Получение посылки по номеру заказа
  async getParcelByOrderNumber(orderNumber) {
    try {
      const response = await fetch(`${this.baseUrl}/parcels?orderNumber=${orderNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("Ошибка при получении посылки:", error);
      throw error;
    }
  }
  // Создание новой посылки
  async createParcel(parcelData) {
    try {
      const response = await fetch(`${this.baseUrl}/parcels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(parcelData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при создании посылки:", error);
      throw error;
    }
  }
  // Обновление посылки
  async updateParcel(id, updateData) {
    try {
      const response = await fetch(`${this.baseUrl}/parcels/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при обновлении посылки:", error);
      throw error;
    }
  }
  // Удаление посылки
  async deleteParcel(id) {
    try {
      const response = await fetch(`${this.baseUrl}/parcels/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Ошибка при удалении посылки:", error);
      throw error;
    }
  }
  // Преобразование данных посылки в формат заказа для таблицы
  transformParcelToOrder(parcel) {
    let status = "СОЗДАН";
    if (parcel.tracking && parcel.tracking.length > 0) {
      const lastEvent = parcel.tracking[parcel.tracking.length - 1];
      if (lastEvent.group && lastEvent.events && lastEvent.events.length > 0) {
        const lastGroupEvent = lastEvent.events[lastEvent.events.length - 1];
        status = this.mapTrackingStatusToOrderStatus(lastGroupEvent.stateCurrent);
      } else if (!lastEvent.group) {
        status = this.mapTrackingStatusToOrderStatus(lastEvent.stateCurrent);
      }
    }
    const createdDate = this.extractDateFromTracking(parcel.tracking, "ЗС");
    const pickupDate = this.extractDateFromTracking(parcel.tracking, "ГЗ");
    const deliveryDate = this.extractDateFromTracking(parcel.tracking, "ОК");
    return {
      id: parcel.uid,
      number: parcel.orderNumber,
      created: createdDate || this.formatDate(/* @__PURE__ */ new Date()),
      from: {
        region: this.getRegionFromCity(parcel.from),
        city: parcel.from
      },
      to: {
        region: this.getRegionFromCity(parcel.to),
        city: parcel.to
      },
      pickupDate: pickupDate || "",
      deliveryDate: deliveryDate || "",
      status,
      // Дополнительные поля из API
      invoiceNumber: parcel.invoiceNumber,
      customerOrderNumber: parcel.customerOrderNumber,
      additionalCheck: parcel.additionalCheck,
      numberSeats: parcel.numberSeats,
      weight: parcel.weight,
      volume: parcel.volume,
      clientUid: parcel.clientUid,
      tracking: parcel.tracking
    };
  }
  // Маппинг статусов отслеживания в статусы заказов
  mapTrackingStatusToOrderStatus(trackingStatus) {
    const statusMap = {
      "ЗС": "СОЗДАН",
      "ЗП": "СОЗДАН",
      "ГЗ": "В ПУТИ",
      "ТО": "В ПУТИ",
      "ГС": "В ПУТИ",
      "ПП": "В ПУТИ",
      "ГП": "В ПУТИ",
      "ДН": "В ПУТИ",
      "КД": "В ПУТИ",
      "СВ": "ГОТОВ К ВЫДАЧЕ",
      "ОК": "ДОСТАВЛЕН",
      "НВ": "ОТМЕНЕН",
      "НД": "НД",
      "ДП": "ПРОБЛЕМА",
      "ПГ": "ПРОБЛЕМА",
      "ЧС": "В ПУТИ",
      "ЧД": "ЧАСТИЧНО ДОСТАВЛЕН",
      "ОС": "ПРОБЛЕМА",
      "СП": "СОЗДАН",
      "ПД": "В ПУТИ"
    };
    return statusMap[trackingStatus] || "СОЗДАН";
  }
  // Извлечение даты из событий отслеживания по статусу
  extractDateFromTracking(tracking, status) {
    if (!tracking) return null;
    for (const event of tracking) {
      if (event.group && event.events) {
        for (const subEvent of event.events) {
          if (subEvent.stateCurrent === status) {
            return this.formatDateFromString(subEvent.date);
          }
        }
      } else if (event.stateCurrent === status) {
        return this.formatDateFromString(event.date);
      }
    }
    return null;
  }
  // Форматирование даты из строки DD.MM.YYYY HH:mm
  formatDateFromString(dateString) {
    if (!dateString) return "";
    try {
      const [datePart, timePart] = dateString.split(" ");
      const [day, month, year] = datePart.split(".");
      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error("Ошибка форматирования даты:", error);
      return dateString;
    }
  }
  // Форматирование даты
  formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  // Получение региона по городу (упрощенная версия)
  getRegionFromCity(city) {
    const cityRegionMap = {
      // Основные города
      "Москва": "Московская область",
      "Санкт-Петербург": "Санкт-Петербург",
      "Новосибирск": "Новосибирская область",
      "Екатеринбург": "Свердловская область",
      "Красноярск": "Красноярский край",
      "Барнаул": "Алтайский край",
      "Томск": "Томская область",
      "Кемерово": "Кемеровская область",
      "Новокузнецк": "Кемеровская область",
      "Омск": "Омская область",
      "Тюмень": "Тюменская область",
      "Челябинск": "Челябинская область",
      "Пермь": "Пермский край",
      "Уфа": "Республика Башкортостан",
      "Владивосток": "Приморский край",
      "Хабаровск": "Хабаровский край",
      "Ростов-на-Дону": "Ростовская область",
      "Краснодар": "Краснодарский край",
      "Иркутск": "Иркутская область",
      "Улан-Удэ": "Республика Бурятия",
      "Абакан": "Республика Хакасия",
      // Города из мок данных
      "Самара": "Самарская область",
      "Казань": "Республика Татарстан",
      "Воронеж": "Воронежская область",
      "Липецк": "Липецкая область",
      "Тула": "Тульская область",
      "Рязань": "Рязанская область",
      "Белгород": "Белгородская область",
      "Курск": "Курская область",
      "Орёл": "Орловская область",
      "Брянск": "Брянская область",
      "Смоленск": "Смоленская область",
      "Калуга": "Калужская область",
      "Тверь": "Тверская область",
      "Ярославль": "Ярославская область",
      "Кострома": "Костромская область",
      "Иваново": "Ивановская область",
      "Владимир": "Владимирская область",
      "Нижний Новгород": "Нижегородская область",
      "Архангельск": "Архангельская область",
      "Мурманск": "Мурманская область",
      "Петрозаводск": "Республика Карелия",
      "Вологда": "Вологодская область",
      "Череповец": "Вологодская область",
      "Великий Новгород": "Новгородская область",
      "Псков": "Псковская область",
      "Великие Луки": "Псковская область",
      "Калининград": "Калининградская область",
      "Советск": "Калининградская область",
      "Магадан": "Магаданская область",
      "Петропавловск-Камчатский": "Камчатский край",
      "Южно-Сахалинск": "Сахалинская область",
      "Благовещенск": "Амурская область",
      "Комсомольск-на-Амуре": "Хабаровский край"
    };
    return cityRegionMap[city] || "Неизвестный регион";
  }
  // ========== МЕТОДЫ ДЛЯ РАБОТЫ С КОНТАКТАМИ ==========
  // Получение всех офисов
  async getOffices() {
    try {
      const response = await fetch(`${this.baseUrl}/pvzs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении офисов:", error);
      throw error;
    }
  }
  // Получение офиса по ID
  async getOfficeById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/pvzs/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении офиса:", error);
      throw error;
    }
  }
  // Получение офисов по городу
  async getOfficesByCity(city) {
    try {
      const response = await fetch(`${this.baseUrl}/pvzs?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении офисов по городу:", error);
      throw error;
    }
  }
  // Создание нового офиса
  async createOffice(officeData) {
    try {
      const response = await fetch(`${this.baseUrl}/pvzs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(officeData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при создании офиса:", error);
      throw error;
    }
  }
  // Обновление офиса
  async updateOffice(id, updateData) {
    try {
      const response = await fetch(`${this.baseUrl}/pvzs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при обновлении офиса:", error);
      throw error;
    }
  }
  // Удаление офиса
  async deleteOffice(id) {
    try {
      const response = await fetch(`${this.baseUrl}/pvzs/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Ошибка при удалении офиса:", error);
      throw error;
    }
  }
  // Получение списка городов (извлекаем из офисов)
  async getCities() {
    try {
      const offices = await this.getOffices();
      const uniqueCities = [...new Set(offices.map((office) => office.city))];
      return uniqueCities;
    } catch (error) {
      console.error("Ошибка при получении городов:", error);
      throw error;
    }
  }
  // ========== МЕТОДЫ ДЛЯ РАБОТЫ С КАЛЬКУЛЯТОРОМ ==========
  // Получение всех адресов для калькулятора
  async getBillingAddresses() {
    try {
      const response = await fetch(`${this.baseUrl}/billingAddresses`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении адресов:", error);
      throw error;
    }
  }
  // Получение видов перевозок
  async getTransportTypes() {
    try {
      const response = await fetch(`${this.baseUrl}/transportTypes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении видов перевозок:", error);
      throw error;
    }
  }
  // Получение тарифной сетки
  async getTariffGrids(transportTypeUid = null) {
    try {
      const url = transportTypeUid ? `${this.baseUrl}/tariffGrids?transportType_uid=${encodeURIComponent(transportTypeUid)}` : `${this.baseUrl}/tariffGrids`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении тарифной сетки:", error);
      throw error;
    }
  }
  // Получение терминалов
  async getTerminals(localityName = null) {
    try {
      let url = `${this.baseUrl}/terminals`;
      if (localityName) {
        url += `?locality=${encodeURIComponent(localityName)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении терминалов:", error);
      throw error;
    }
  }
  // Получение тарифных зон
  async getTariffZones(transportTypeUid = null) {
    try {
      const url = transportTypeUid ? `${this.baseUrl}/tariffZones?uidTypeTransportation=${encodeURIComponent(transportTypeUid)}` : `${this.baseUrl}/tariffZones`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении тарифных зон:", error);
      throw error;
    }
  }
  // Получение параметров забора/доставки
  async getTakeDelivers(transportTypeUid = null, addressUid = null) {
    try {
      let url = `${this.baseUrl}/takeDelivers`;
      const params = [];
      if (transportTypeUid) params.push(`uidTypeTransportation=${encodeURIComponent(transportTypeUid)}`);
      if (addressUid) params.push(`uidBillingAddress=${encodeURIComponent(addressUid)}`);
      if (params.length > 0) url += `?${params.join("&")}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении параметров забора/доставки:", error);
      throw error;
    }
  }
  // Получение видов упаковки
  async getBoxings() {
    try {
      const response = await fetch(`${this.baseUrl}/boxings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении видов упаковки:", error);
      throw error;
    }
  }
  // Получение единиц измерения
  async getUnits() {
    try {
      const response = await fetch(`${this.baseUrl}/units`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении единиц измерения:", error);
      throw error;
    }
  }
  // Получение регионов
  async getRegions() {
    try {
      const response = await fetch(`${this.baseUrl}/regions`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении регионов:", error);
      throw error;
    }
  }
  // Получение опций груза
  async getCargoOptions() {
    try {
      const response = await fetch(`${this.baseUrl}/cargoOptions`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении опций груза:", error);
      throw error;
    }
  }
  // ========== МЕТОДЫ ДЛЯ РАБОТЫ С НАСЕЛЕННЫМИ ПУНКТАМИ ==========
  // Получение всех населенных пунктов
  async getLocalities() {
    try {
      const response = await fetch(`${this.baseUrl}/localities`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении населенных пунктов:", error);
      throw error;
    }
  }
  // Получение населенного пункта по ID
  async getLocalityById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/localities/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении населенного пункта:", error);
      throw error;
    }
  }
  // Получение населенных пунктов по региону
  async getLocalitiesByRegion(regionId) {
    try {
      const response = await fetch(`${this.baseUrl}/localities?region_id=${regionId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении населенных пунктов по региону:", error);
      throw error;
    }
  }
  // Получение адресов с отношениями (населенные пункты и регионы)
  async getBillingAddressesWithRelations() {
    try {
      const response = await fetch(`${this.baseUrl}/billingAddresses`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const billingAddresses = await response.json();
      const { localities, regions } = await this._loadAllLocalitiesWithRegions();
      const enrichedAddresses = billingAddresses.map((address) => {
        let localityObj = null;
        if (typeof address.locality === "string") {
          localityObj = localities.find((l) => l.name === address.locality);
        }
        const region = (localityObj == null ? void 0 : localityObj.region) || null;
        return {
          ...address,
          locality: localityObj || address.locality || null,
          // Сохраняем объект или строку
          localityName: (localityObj == null ? void 0 : localityObj.name) || address.locality || "",
          // Для удобства добавляем имя
          region
        };
      });
      return enrichedAddresses;
    } catch (error) {
      console.error("Ошибка при получении адресов с отношениями:", error);
      throw error;
    }
  }
  // Получение населенных пунктов с отношениями (регионы)
  async getLocalitiesWithRelations() {
    try {
      const { localities } = await this._loadAllLocalitiesWithRegions();
      return localities;
    } catch (error) {
      console.error("Ошибка при получении населенных пунктов с отношениями:", error);
      throw error;
    }
  }
  // Загрузка всех населенных пунктов с регионами
  async _loadAllLocalitiesWithRegions() {
    if (this._localitiesCache && this._regionsCache) {
      return { localities: this._localitiesCache, regions: this._regionsCache };
    }
    try {
      const [localitiesResponse, regionsResponse] = await Promise.all([
        fetch(`${this.baseUrl}/localities`),
        fetch(`${this.baseUrl}/regions`)
      ]);
      if (!localitiesResponse.ok || !regionsResponse.ok) {
        throw new Error(`HTTP error! localities: ${localitiesResponse.status}, regions: ${regionsResponse.status}`);
      }
      const localities = await localitiesResponse.json();
      const regions = await regionsResponse.json();
      const enrichedLocalities = localities.map((locality) => {
        const region = regions.find((r) => r.id === locality.region_id);
        return {
          ...locality,
          region: region || null
        };
      });
      this._localitiesCache = enrichedLocalities;
      this._regionsCache = regions;
      return { localities: enrichedLocalities, regions };
    } catch (error) {
      console.error("Ошибка при загрузке всех данных:", error);
      throw error;
    }
  }
  // Комплексный поиск населенных пунктов (по городу, региону и федеральному округу)
  async searchLocalities(query) {
    try {
      const { localities, regions } = await this._loadAllLocalitiesWithRegions();
      const queryLower = query.toLowerCase();
      const results = [];
      localities.forEach((locality) => {
        var _a, _b;
        const cityName = locality.name || "";
        const regionName = ((_a = locality.region) == null ? void 0 : _a.name) || "";
        const federalDistrict = ((_b = locality.region) == null ? void 0 : _b.federalDistrict) || "";
        const cityLower = cityName.toLowerCase();
        const regionLower = regionName.toLowerCase();
        const federalLower = federalDistrict.toLowerCase();
        const cityExact = cityLower === queryLower;
        const cityStart = cityLower.startsWith(queryLower);
        const cityInclude = cityLower.includes(queryLower);
        const regionMatch = regionLower.includes(queryLower);
        const federalMatch = federalLower.includes(queryLower);
        if (cityExact || cityStart || cityInclude || regionMatch || federalMatch) {
          results.push({
            ...locality,
            matchType: cityExact ? "city_exact" : cityStart ? "city_start" : cityInclude ? "city_include" : regionMatch ? "region" : "federal"
          });
        }
      });
      return results.sort((a, b) => {
        const priorityOrder = {
          "city_exact": 1,
          "city_start": 2,
          "city_include": 3,
          "region": 4,
          "federal": 5
        };
        const aPriority = priorityOrder[a.matchType] || 6;
        const bPriority = priorityOrder[b.matchType] || 6;
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        return (a.id || 0) - (b.id || 0);
      });
    } catch (error) {
      console.error("Ошибка при поиске населенных пунктов:", error);
      throw error;
    }
  }
  // ========== МЕТОДЫ ДЛЯ ПОИСКА АДРЕСОВ ==========
  // Поиск улиц по городу
  async searchStreets(city, query = "") {
    try {
      const billingAddresses = await this.getBillingAddressesWithRelations();
      const cityName = this.extractCityNameFromFormattedString(city);
      const cityAddresses = billingAddresses.filter((addr) => {
        var _a;
        const localityName = addr.localityName || (typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "");
        const normalizedLocalityName = localityName.toLowerCase().trim();
        const normalizedCityName = cityName.toLowerCase().trim();
        const normalizedCity = city.toLowerCase().trim();
        return normalizedLocalityName === normalizedCityName || normalizedLocalityName === normalizedCity || localityName === cityName || localityName === city;
      });
      console.log("Поиск улиц:", {
        city,
        cityName,
        totalAddresses: billingAddresses.length,
        cityAddressesCount: cityAddresses.length,
        sampleAddresses: cityAddresses.slice(0, 3).map((addr) => ({
          locality: addr.locality,
          localityName: addr.localityName,
          street: addr.street,
          localityType: typeof addr.locality
        }))
      });
      const streetsMap = /* @__PURE__ */ new Map();
      cityAddresses.forEach((addr) => {
        const street = addr.street || "";
        if (street && !streetsMap.has(street)) {
          streetsMap.set(street, {
            name: street,
            id: `street-${street}`,
            city
          });
        }
      });
      let streets = Array.from(streetsMap.values());
      if (query && query.trim()) {
        const queryLower = query.toLowerCase().trim();
        streets = streets.filter((street) => {
          const streetLower = street.name.toLowerCase();
          return streetLower.includes(queryLower) || streetLower.startsWith(queryLower);
        });
      }
      return streets.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error("Ошибка при поиске улиц:", error);
      throw error;
    }
  }
  // Поиск домов по улице и городу
  async searchHouses(city, street, query = "") {
    try {
      const billingAddresses = await this.getBillingAddressesWithRelations();
      const cityName = this.extractCityNameFromFormattedString(city);
      const streetAddresses = billingAddresses.filter((addr) => {
        var _a;
        const localityName = addr.localityName || (typeof addr.locality === "string" ? addr.locality : ((_a = addr.locality) == null ? void 0 : _a.name) || "");
        const addrStreet = addr.street || "";
        const normalizedLocalityName = localityName.toLowerCase().trim();
        const normalizedCityName = cityName.toLowerCase().trim();
        const normalizedCity = city.toLowerCase().trim();
        return (normalizedLocalityName === normalizedCityName || normalizedLocalityName === normalizedCity || localityName === cityName || localityName === city) && addrStreet === street;
      });
      console.log("Поиск домов:", {
        city,
        cityName,
        street,
        totalAddresses: billingAddresses.length,
        streetAddressesCount: streetAddresses.length,
        sampleAddresses: streetAddresses.slice(0, 3).map((addr) => ({
          locality: addr.locality,
          localityName: addr.localityName,
          street: addr.street,
          houseNumber: addr.houseNumber
        }))
      });
      const housesMap = /* @__PURE__ */ new Map();
      streetAddresses.forEach((addr) => {
        const houseNumber = addr.houseNumber || "";
        if (houseNumber && !housesMap.has(houseNumber)) {
          housesMap.set(houseNumber, {
            name: houseNumber,
            id: `house-${houseNumber}`,
            street,
            city
          });
        }
      });
      let houses = Array.from(housesMap.values());
      if (query && query.trim()) {
        const queryLower = query.toLowerCase().trim();
        houses = houses.filter((house) => {
          const houseLower = house.name.toLowerCase();
          return houseLower.includes(queryLower) || houseLower.startsWith(queryLower);
        });
      }
      return houses.sort((a, b) => {
        const aNum = parseInt(a.name);
        const bNum = parseInt(b.name);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return aNum - bNum;
        }
        return a.name.localeCompare(b.name);
      });
    } catch (error) {
      console.error("Ошибка при поиске домов:", error);
      throw error;
    }
  }
  // Поиск квартир/офисов по дому, улице и городу
  async searchApartments(city, street, house, query = "") {
    try {
      const billingAddresses = await this.getBillingAddressesWithRelations();
      const houseAddresses = billingAddresses.filter((addr) => {
        var _a;
        const localityName = ((_a = addr.locality) == null ? void 0 : _a.name) || "";
        const addrStreet = addr.street || "";
        const addrHouse = addr.houseNumber || "";
        return localityName === city && addrStreet === street && addrHouse === house;
      });
      const apartments = [];
      if (query && query.trim()) {
        const queryLower = query.toLowerCase().trim();
        return apartments.filter((apt) => {
          const aptLower = apt.name.toLowerCase();
          return aptLower.includes(queryLower) || aptLower.startsWith(queryLower);
        });
      }
      return apartments;
    } catch (error) {
      console.error("Ошибка при поиске квартир:", error);
      throw error;
    }
  }
  // Вспомогательная функция для извлечения названия города из отформатированной строки
  extractCityNameFromFormattedString(formattedCity) {
    if (!formattedCity) return "";
    let cityName = formattedCity.trim();
    if (cityName.includes("(")) {
      cityName = cityName.split("(")[0].trim();
    }
    if (cityName.includes(",")) {
      cityName = cityName.split(",")[0].trim();
    }
    cityName = cityName.replace(/^(г\.|пос\.|ст\.|с\.|д\.|х\.|аул|кишл\.)\s*/i, "").trim();
    return cityName;
  }
}
const apiService = new ApiService();
export {
  apiService as a
};
