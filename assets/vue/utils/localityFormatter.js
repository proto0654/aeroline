/**
 * Утилита для форматирования названий населенных пунктов
 * Единая точка логики отображения городов с префиксами и региональной информацией
 */

export function formatLocalityName(item) {
    if (!item) return '';
    
    const cityName = item.name || item.locality || item.city || '';
    const regionName = item.region?.name || '';
    const federalDistrict = item.region?.federalDistrict || '';
    const isRegionalCenter = item.isRegionalCenter || false;
    const type = item.type || '';
    
    // Префиксы для типов населенных пунктов
    const typePrefixes = {
        'город': 'г.',
        'поселок': 'пос.',
        'станица': 'ст.',
        'село': 'с.',
        'деревня': 'д.',
        'хутор': 'х.',
        'аул': 'аул',
        'кишлак': 'кишл.'
    };
    
    const prefix = typePrefixes[type] ? `${typePrefixes[type]} ` : '';
    
    let regionInfo = '';
    if (isRegionalCenter) {
        // Для областных центров показываем только ФО
        if (federalDistrict) {
            regionInfo = ` (${federalDistrict})`;
        }
    } else {
        // Для обычных городов показываем область и ФО
        if (regionName && federalDistrict) {
            regionInfo = ` (${regionName}, ${federalDistrict})`;
        } else if (regionName) {
            regionInfo = ` (${regionName})`;
        }
    }
    
    return `${prefix}${cityName}${regionInfo}`;
}

/**
 * Упрощенное форматирование для выбранного значения в поле ввода
 * - Для городов убираем префикс "г."
 * - Для областных центров убираем ФО
 * - Для остальных типов оставляем префиксы
 */
export function formatSelectedLocalityName(item) {
    if (!item) return '';
    
    const cityName = item.name || item.locality || item.city || '';
    const regionName = item.region?.name || '';
    const federalDistrict = item.region?.federalDistrict || '';
    const isRegionalCenter = item.isRegionalCenter || false;
    const type = item.type || '';
    
    // Префиксы для типов населенных пунктов (кроме городов)
    const typePrefixes = {
        'поселок': 'пос.',
        'станица': 'ст.',
        'село': 'с.',
        'деревня': 'д.',
        'хутор': 'х.',
        'аул': 'аул',
        'кишлак': 'кишл.'
    };
    
    const prefix = typePrefixes[type] ? `${typePrefixes[type]} ` : '';
    
    let regionInfo = '';
    if (isRegionalCenter) {
        // Для областных центров не показываем ФО
        // Оставляем только название города
    } else {
        // Для обычных городов показываем область и ФО
        if (regionName && federalDistrict) {
            regionInfo = ` (${regionName}, ${federalDistrict})`;
        } else if (regionName) {
            regionInfo = ` (${regionName})`;
        }
    }
    
    return `${prefix}${cityName}${regionInfo}`;
}
