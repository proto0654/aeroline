// Инициализация карты при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, есть ли элемент карты на странице
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  // Добавляем стиль для скрытия атрибуции на мобильных устройствах
  const style = document.createElement('style');
  style.textContent = '@media (max-width: 768px) { .leaflet-control-attribution { display: none; } }';
  document.head.appendChild(style);

  // Загружаем данные офисов из JSON
  fetch('/assets/data/contacts.json')
    .then(response => response.json())
    .then(data => {
      initMap(data.offices);
    })
    .catch(error => {
      console.error('Ошибка загрузки данных офисов:', error);
    });
});

/**
 * Инициализация карты с маркерами офисов
 * @param {Array} offices - массив офисов из JSON
 */
function initMap(offices) {
  // Центрируем карту на России
  const map = L.map('map').setView([60, 100], 3);

  // Добавляем тайловый слой OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Создаем иконки для маркеров с использованием внешних SVG файлов
  const defaultIcon = L.divIcon({
    html: `<div class="flex items-center justify-center w-9 h-[42px] text-brand-gray">
            <img src="/assets/img/map-marker.svg" alt="Маркер" class="w-full h-full" />
           </div>`,
    className: '',
    iconSize: [36, 42],
    iconAnchor: [18, 42]
  });

  const activeIcon = L.divIcon({
    html: `<div class="flex items-center justify-center w-9 h-[42px] text-brand-blue">
            <img src="/assets/img/map-marker-active.svg" alt="Активный маркер" class="w-full h-full" />
           </div>`,
    className: '',
    iconSize: [36, 42],
    iconAnchor: [18, 42]
  });

  // Создаем группу маркеров для удобного управления
  const markers = L.featureGroup();
  const officeMarkers = {};
  
  // Добавляем маркеры для каждого офиса
  offices.forEach((office, index) => {
    if (!office.coordinates || office.coordinates.length !== 2) return;
    
    const marker = L.marker(office.coordinates, { icon: defaultIcon })
      .bindTooltip(office.city)
      .addTo(map);
    
    // Сохраняем маркер с индексом офиса для последующего доступа
    officeMarkers[index] = marker;
    markers.addLayer(marker);
    
    // Обработчик клика по маркеру
    marker.on('click', () => {
      // Сбрасываем иконки всех маркеров на дефолтные
      Object.values(officeMarkers).forEach(m => m.setIcon(defaultIcon));
      
      // Устанавливаем активную иконку для выбранного маркера
      marker.setIcon(activeIcon);
      
      // Обновляем информационную панель
      updateInfoPanel(office);
    });
  });
  
  // Добавляем группу маркеров на карту и масштабируем карту
  markers.addTo(map);
  if (markers.getLayers().length > 0) {
    map.fitBounds(markers.getBounds(), { padding: [50, 50] });
  }
  
  // Проверяем, есть ли уже выбранный офис в HTML
  const infoPanel = document.querySelector('.map-info-panel');
  const isDefaultOfficeVisible = !infoPanel.classList.contains('hidden');
  
  // Если нет выбранного офиса, устанавливаем офис по умолчанию (первый в списке или Москва)
  if (!isDefaultOfficeVisible) {
    // Ищем офис в Москве или берем первый офис
    const defaultOfficeIndex = offices.findIndex(office => office.city === 'Москва') !== -1 ? 
      offices.findIndex(office => office.city === 'Москва') : 0;
    
    if (defaultOfficeIndex !== -1 && officeMarkers[defaultOfficeIndex]) {
      // Активируем маркер по умолчанию
      officeMarkers[defaultOfficeIndex].setIcon(activeIcon);
      
      // Центрируем карту на выбранном маркере
      map.setView(officeMarkers[defaultOfficeIndex].getLatLng(), 10);
      
      // Обновляем информационную панель
      updateInfoPanel(offices[defaultOfficeIndex]);
    }
  }
  
  // Обработчик клика по карточкам офисов на странице (если они есть)
  document.querySelectorAll('.office-card').forEach(card => {
    card.addEventListener('click', function() {
      const index = parseInt(this.dataset.index, 10);
      const marker = officeMarkers[index];
      
      if (marker) {
        // Сбрасываем иконки всех маркеров
        Object.values(officeMarkers).forEach(m => m.setIcon(defaultIcon));
        
        // Активируем выбранный маркер
        marker.setIcon(activeIcon);
        
        // Центрируем карту на выбранном маркере
        map.setView(marker.getLatLng(), 12);
        
        // Обновляем информационную панель
        updateInfoPanel(offices[index]);
      }
    });
  });
  
  // Добавляем обработчик для кнопки закрытия информационной панели
  const closeButtons = document.querySelectorAll('.close-info-panel');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const infoPanel = this.closest('.map-info-panel');
      if (infoPanel) {
        infoPanel.classList.add('hidden');
        
        // Сбрасываем иконки всех маркеров на дефолтные
        Object.values(officeMarkers).forEach(m => m.setIcon(defaultIcon));
      }
    });
  });
}

/**
 * Обновляет информационную панель с данными выбранного офиса
 * @param {Object} office - данные офиса
 */
function updateInfoPanel(office) {
  const infoPanel = document.querySelector('.map-info-panel');
  if (!infoPanel) return;
  
  // Если панель уже содержит данные из шаблона, не обновляем её через JavaScript
  if (infoPanel.querySelector('.font-bold.text-2xl') && 
      !infoPanel.classList.contains('hidden') && 
      infoPanel.querySelector('.font-bold.text-2xl').textContent === office.city) {
    return;
  }
  
  infoPanel.innerHTML = `
    <div class="flex justify-end items-center mb-2">
      <button class="text-brand-gray hover:text-brand-blue transition-colors close-info-panel">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="font-bold text-2xl text-brand-gray">${office.city}</div>
    <div class="text-brand-gray">${office.address}</div>
    <div class="text-brand-gray">${office.type}</div>
    <div class="text-brand-gray">${office.phone}</div>
    <div class="text-brand-gray">${office.email}</div>
    <button class="bg-brand-blue mt-5 text-white rounded-lg py-3 px-4 text-sm hover:bg-blue-700 transition-colors">Подробнее</button>
  `;
  
  // Показываем панель
  infoPanel.classList.remove('hidden');
  
  // Добавляем обработчик для кнопки закрытия
  const closeButton = infoPanel.querySelector('.close-info-panel');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      infoPanel.classList.add('hidden');
    });
  }
} 