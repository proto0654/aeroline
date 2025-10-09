// API Service для работы с mokky.dev
class ApiService {
    constructor() {
        this.baseUrl = 'https://08615a563fb9b4f8.mokky.dev';
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
            console.error('Ошибка при получении посылок:', error);
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
            console.error('Ошибка при получении посылки:', error);
            throw error;
        }
    }

    // Создание новой посылки
    async createParcel(parcelData) {
        try {
            const response = await fetch(`${this.baseUrl}/parcels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(parcelData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при создании посылки:', error);
            throw error;
        }
    }

    // Обновление посылки
    async updateParcel(id, updateData) {
        try {
            const response = await fetch(`${this.baseUrl}/parcels/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при обновлении посылки:', error);
            throw error;
        }
    }

    // Удаление посылки
    async deleteParcel(id) {
        try {
            const response = await fetch(`${this.baseUrl}/parcels/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error('Ошибка при удалении посылки:', error);
            throw error;
        }
    }

    // Преобразование данных посылки в формат заказа для таблицы
    transformParcelToOrder(parcel) {
        // Определяем статус на основе последнего события отслеживания
        let status = 'СОЗДАН';
        if (parcel.tracking && parcel.tracking.length > 0) {
            const lastEvent = parcel.tracking[parcel.tracking.length - 1];
            if (lastEvent.group && lastEvent.events && lastEvent.events.length > 0) {
                const lastGroupEvent = lastEvent.events[lastEvent.events.length - 1];
                status = this.mapTrackingStatusToOrderStatus(lastGroupEvent.stateCurrent);
            } else if (!lastEvent.group) {
                status = this.mapTrackingStatusToOrderStatus(lastEvent.stateCurrent);
            }
        }

        // Извлекаем даты из событий отслеживания
        const createdDate = this.extractDateFromTracking(parcel.tracking, 'ЗС');
        const pickupDate = this.extractDateFromTracking(parcel.tracking, 'ГЗ');
        const deliveryDate = this.extractDateFromTracking(parcel.tracking, 'ОК');

        return {
            id: parcel.uid,
            number: parcel.orderNumber,
            created: createdDate || this.formatDate(new Date()),
            from: {
                region: this.getRegionFromCity(parcel.from),
                city: parcel.from
            },
            to: {
                region: this.getRegionFromCity(parcel.to),
                city: parcel.to
            },
            pickupDate: pickupDate || '',
            deliveryDate: deliveryDate || '',
            status: status,
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
            'ЗС': 'СОЗДАН',
            'ЗП': 'СОЗДАН',
            'ГЗ': 'В ПУТИ',
            'ТО': 'В ПУТИ',
            'ГС': 'В ПУТИ',
            'ПП': 'В ПУТИ',
            'ГП': 'В ПУТИ',
            'ДН': 'В ПУТИ',
            'КД': 'В ПУТИ',
            'СВ': 'ГОТОВ К ВЫДАЧЕ',
            'ОК': 'ДОСТАВЛЕН',
            'НВ': 'ОТМЕНЕН',
            'НД': 'НД',
            'ДП': 'ПРОБЛЕМА',
            'ПГ': 'ПРОБЛЕМА',
            'ЧС': 'В ПУТИ',
            'ЧД': 'ЧАСТИЧНО ДОСТАВЛЕН',
            'ОС': 'ПРОБЛЕМА',
            'СП': 'СОЗДАН',
            'ПД': 'В ПУТИ'
        };
        return statusMap[trackingStatus] || 'СОЗДАН';
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
        if (!dateString) return '';
        try {
            const [datePart, timePart] = dateString.split(' ');
            const [day, month, year] = datePart.split('.');
            return `${day}.${month}.${year}`;
        } catch (error) {
            console.error('Ошибка форматирования даты:', error);
            return dateString;
        }
    }

    // Форматирование даты
    formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Получение региона по городу (упрощенная версия)
    getRegionFromCity(city) {
        const cityRegionMap = {
            // Основные города
            'Москва': 'Московская область',
            'Санкт-Петербург': 'Санкт-Петербург',
            'Новосибирск': 'Новосибирская область',
            'Екатеринбург': 'Свердловская область',
            'Красноярск': 'Красноярский край',
            'Барнаул': 'Алтайский край',
            'Томск': 'Томская область',
            'Кемерово': 'Кемеровская область',
            'Новокузнецк': 'Кемеровская область',
            'Омск': 'Омская область',
            'Тюмень': 'Тюменская область',
            'Челябинск': 'Челябинская область',
            'Пермь': 'Пермский край',
            'Уфа': 'Республика Башкортостан',
            'Владивосток': 'Приморский край',
            'Хабаровск': 'Хабаровский край',
            'Ростов-на-Дону': 'Ростовская область',
            'Краснодар': 'Краснодарский край',
            'Иркутск': 'Иркутская область',
            'Улан-Удэ': 'Республика Бурятия',
            'Абакан': 'Республика Хакасия',
            
            // Города из мок данных
            'Самара': 'Самарская область',
            'Казань': 'Республика Татарстан',
            'Воронеж': 'Воронежская область',
            'Липецк': 'Липецкая область',
            'Тула': 'Тульская область',
            'Рязань': 'Рязанская область',
            'Белгород': 'Белгородская область',
            'Курск': 'Курская область',
            'Орёл': 'Орловская область',
            'Брянск': 'Брянская область',
            'Смоленск': 'Смоленская область',
            'Калуга': 'Калужская область',
            'Тверь': 'Тверская область',
            'Ярославль': 'Ярославская область',
            'Кострома': 'Костромская область',
            'Иваново': 'Ивановская область',
            'Владимир': 'Владимирская область',
            'Нижний Новгород': 'Нижегородская область',
            'Архангельск': 'Архангельская область',
            'Мурманск': 'Мурманская область',
            'Петрозаводск': 'Республика Карелия',
            'Вологда': 'Вологодская область',
            'Череповец': 'Вологодская область',
            'Великий Новгород': 'Новгородская область',
            'Псков': 'Псковская область',
            'Великие Луки': 'Псковская область',
            'Калининград': 'Калининградская область',
            'Советск': 'Калининградская область',
            'Магадан': 'Магаданская область',
            'Петропавловск-Камчатский': 'Камчатский край',
            'Южно-Сахалинск': 'Сахалинская область',
            'Благовещенск': 'Амурская область',
            'Комсомольск-на-Амуре': 'Хабаровский край'
        };
        return cityRegionMap[city] || 'Неизвестный регион';
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
            console.error('Ошибка при получении офисов:', error);
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
            console.error('Ошибка при получении офиса:', error);
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
            console.error('Ошибка при получении офисов по городу:', error);
            throw error;
        }
    }

    // Создание нового офиса
    async createOffice(officeData) {
        try {
            const response = await fetch(`${this.baseUrl}/pvzs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(officeData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при создании офиса:', error);
            throw error;
        }
    }

    // Обновление офиса
    async updateOffice(id, updateData) {
        try {
            const response = await fetch(`${this.baseUrl}/pvzs/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при обновлении офиса:', error);
            throw error;
        }
    }

    // Удаление офиса
    async deleteOffice(id) {
        try {
            const response = await fetch(`${this.baseUrl}/pvzs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error('Ошибка при удалении офиса:', error);
            throw error;
        }
    }

    // Получение списка городов (извлекаем из офисов)
    async getCities() {
        try {
            const offices = await this.getOffices();
            const uniqueCities = [...new Set(offices.map(office => office.city))];
            return uniqueCities;
        } catch (error) {
            console.error('Ошибка при получении городов:', error);
            throw error;
        }
    }
}

// Создаем экземпляр сервиса
const apiService = new ApiService();

export default apiService;
