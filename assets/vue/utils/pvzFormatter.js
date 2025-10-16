/**
 * Утилита для форматирования названий ПВЗ (пунктов выдачи заказов)
 * Единая точка логики отображения адресов с типом офиса, адресом и телефоном
 */

/**
 * Форматирование ПВЗ для отображения в выпадающем списке и выбранном значении
 * @param {Object} address - Объект адреса из billingAddresses
 * @returns {string} Отформатированная строка
 */
export function formatPVZName(address) {
    if (!address) return '';
    
    const type = address.type || '';
    const street = address.street || '';
    const houseNumber = address.houseNumber || '';
    const phone = address.phone || '';
    
    // Формируем адресную часть
    let addressPart = '';
    if (street && houseNumber) {
        addressPart = `${street}, ${houseNumber}`;
    } else if (street) {
        addressPart = street;
    } else if (houseNumber) {
        addressPart = houseNumber;
    }
    
    // Формируем полную строку
    let result = '';
    if (type) {
        result = type;
        if (addressPart) {
            result += ` - ${addressPart}`;
        }
    } else if (addressPart) {
        result = addressPart;
    }
    
    // Добавляем телефон
    if (phone) {
        result += result ? `, ${phone}` : phone;
    }
    
    return result;
}

/**
 * Форматирование ПВЗ для поиска (включает все поля для гибкого поиска)
 * @param {Object} address - Объект адреса из billingAddresses
 * @returns {string} Строка для поиска
 */
export function formatPVZForSearch(address) {
    if (!address) return '';
    
    const type = address.type || '';
    const street = address.street || '';
    const houseNumber = address.houseNumber || '';
    const phone = address.phone || '';
    const locality = address.locality || '';
    
    // Объединяем все поля для поиска
    return `${type} ${street} ${houseNumber} ${phone} ${locality}`.trim();
}

/**
 * Форматирование ПВЗ для HTML отображения в выпадающем списке
 * @param {Object} address - Объект адреса из billingAddresses
 * @returns {string} HTML строка
 */
export function formatPVZHTML(address) {
    const formattedText = formatPVZName(address);
    return `
        <div style="line-height:1.3; padding:2px 0;">
            <div>${formattedText}</div>
        </div>
    `;
}

/**
 * Получение ключа для элемента списка ПВЗ
 * @param {Object} address - Объект адреса из billingAddresses
 * @param {number} index - Индекс элемента
 * @returns {string} Уникальный ключ
 */
export function getPVZKey(address, index) {
    return `pvz-${address.id || ''}-${address.street || ''}-${index}`;
}
