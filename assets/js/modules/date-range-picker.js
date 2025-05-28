/**
 * date-range-picker.js
 * Переиспользуемый модуль для выбора диапазона дат с использованием Flatpickr
 */

import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";

export class DateRangePicker {
  constructor(options = {}) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this._init(options));
    } else {
      this._init(options);
    }
  }

  _init(options) {
    this.options = {
      inputId: options.inputId || 'date-range-input',
      containerId: options.containerId || 'date-range-container',
      placeholder: options.placeholder || 'Выберите период',
      format: options.format || 'd.m.Y',
      locale: options.locale || 'ru',
      onRangeSelect: options.onRangeSelect || null,
      allowSingleDate: options.allowSingleDate || false,
      autoApply: options.autoApply !== false,
      defaultRange: options.defaultRange !== false,
      ...options
    };

    this.startDate = null;
    this.endDate = null;
    this.inputElement = null;
    this.flatpickrInstance = null;
    this.footerApplyBtn = null;

    this.init();
  }

  init() {
    this.createElements();
    this.initializeFlatpickr();
  }

  createElements() {
    const container = document.getElementById(this.options.containerId);
    if (!container) {
      console.error(`Контейнер с ID ${this.options.containerId} не найден`);
      return;
    }

    // --- Обертка для относительного позиционирования ---
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';

    // Создаем input элемент
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    this.inputElement.id = this.options.inputId;
    this.inputElement.className = 'input input-bordered w-full';
    this.inputElement.placeholder = this.options.placeholder;
    this.inputElement.readOnly = true;
    this.inputElement.style.cursor = 'pointer';
    this.inputElement.style.paddingRight = '40px'; // чтобы текст не налезал на иконку

    // --- SVG иконка календаря ---
    const iconWrapper = document.createElement('div');
    iconWrapper.style.position = 'absolute';
    iconWrapper.style.right = '12px';
    iconWrapper.style.top = '50%';
    iconWrapper.style.transform = 'translateY(-50%)';
    iconWrapper.style.zIndex = '2';
    iconWrapper.style.pointerEvents = 'none'; // чтобы клик проходил на input
    iconWrapper.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3318 3.33301C10.3318 3.06779 10.2265 2.81344 10.0389 2.6259C9.85141 2.43836 9.59706 2.33301 9.33184 2.33301C9.06662 2.33301 8.81227 2.43836 8.62473 2.6259C8.4372 2.81344 8.33184 3.06779 8.33184 3.33301V5.43967C6.41184 5.59301 5.15317 5.96901 4.22784 6.89567C3.30117 7.82101 2.92517 9.08101 2.77051 10.9997H29.2265C29.0718 9.07967 28.6958 7.82101 27.7692 6.89567C26.8438 5.96901 25.5838 5.59301 23.6652 5.43834V3.33301C23.6652 3.06779 23.5598 2.81344 23.3723 2.6259C23.1847 2.43836 22.9304 2.33301 22.6652 2.33301C22.4 2.33301 22.1456 2.43836 21.9581 2.6259C21.7705 2.81344 21.6652 3.06779 21.6652 3.33301V5.35034C20.7785 5.33301 19.7838 5.33301 18.6652 5.33301H13.3318C12.2132 5.33301 11.2185 5.33301 10.3318 5.35034V3.33301Z" fill="#008DD2"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66699 16C2.66699 14.8813 2.66699 13.8867 2.68433 13H29.3163C29.3337 13.8867 29.3337 14.8813 29.3337 16V18.6667C29.3337 23.6947 29.3337 26.2093 27.771 27.7707C26.2083 29.332 23.695 29.3333 18.667 29.3333H13.3337C8.30566 29.3333 5.79099 29.3333 4.22966 27.7707C2.66833 26.208 2.66699 23.6947 2.66699 18.6667V16ZM22.667 18.6667C23.0206 18.6667 23.3598 18.5262 23.6098 18.2761C23.8598 18.0261 24.0003 17.687 24.0003 17.3333C24.0003 16.9797 23.8598 16.6406 23.6098 16.3905C23.3598 16.1405 23.0206 16 22.667 16C22.3134 16 21.9742 16.1405 21.7242 16.3905C21.4741 16.6406 21.3337 16.9797 21.3337 17.3333C21.3337 17.687 21.4741 18.0261 21.7242 18.2761C21.9742 18.5262 22.3134 18.6667 22.667 18.6667ZM22.667 24C23.0206 24 23.3598 23.8595 23.6098 23.6095C23.8598 23.3594 24.0003 23.0203 24.0003 22.6667C24.0003 22.313 23.8598 21.9739 23.6098 21.7239C23.3598 21.4738 23.0206 21.3333 22.667 21.3333C22.3134 21.3333 21.9742 21.4738 21.7242 21.7239C21.4741 21.9739 21.3337 22.313 21.3337 22.6667C21.3337 23.0203 21.4741 23.3594 21.7242 23.6095C21.9742 23.8595 22.3134 24 22.667 24ZM17.3337 17.3333C17.3337 17.687 17.1932 18.0261 16.9431 18.2761C16.6931 18.5262 16.3539 18.6667 16.0003 18.6667C15.6467 18.6667 15.3076 18.5262 15.0575 18.2761C14.8075 18.0261 14.667 17.687 14.667 17.3333C14.667 16.9797 14.8075 16.6406 15.0575 16.3905C15.3076 16.1405 15.6467 16 16.0003 16C16.3539 16 16.6931 16.1405 16.9431 16.3905C17.1932 16.6406 17.3337 16.9797 17.3337 17.3333ZM17.3337 22.6667C17.3337 23.0203 17.1932 23.3594 16.9431 23.6095C16.6931 23.8595 16.3539 24 16.0003 24C15.6467 24 15.3076 23.8595 15.0575 23.6095C14.8075 23.3594 14.667 23.0203 14.667 22.6667C14.667 22.313 14.8075 21.9739 15.0575 21.7239C15.3076 21.4738 15.6467 21.3333 16.0003 21.3333C16.3539 21.3333 16.6931 21.4738 16.9431 21.7239C17.1932 21.9739 17.3337 22.313 17.3337 22.6667ZM9.33366 18.6667C9.68728 18.6667 10.0264 18.5262 10.2765 18.2761C10.5265 18.0261 10.667 17.687 10.667 17.3333C10.667 16.9797 10.5265 16.6406 10.2765 16.3905C10.0264 16.1405 9.68728 16 9.33366 16C8.98004 16 8.6409 16.1405 8.39085 16.3905C8.1408 16.6406 8.00033 16.9797 8.00033 17.3333C8.00033 17.687 8.1408 18.0261 8.39085 18.2761C8.6409 18.5262 8.98004 18.6667 9.33366 18.6667ZM9.33366 24C9.68728 24 10.0264 23.8595 10.2765 23.6095C10.5265 23.3594 10.667 23.0203 10.667 22.6667C10.667 22.313 10.5265 21.9739 10.2765 21.7239C10.0264 21.4738 9.68728 21.3333 9.33366 21.3333C8.98004 21.3333 8.6409 21.4738 8.39085 21.7239C8.1408 21.9739 8.00033 22.313 8.00033 22.6667C8.00033 23.0203 8.1408 23.3594 8.39085 23.6095C8.6409 23.8595 8.98004 24 9.33366 24Z" fill="#008DD2"/>
      </svg>
    `;

    // Добавляем input и иконку в обертку
    wrapper.appendChild(this.inputElement);
    wrapper.appendChild(iconWrapper);
    // Добавляем обертку в контейнер
    container.appendChild(wrapper);

    // Устанавливаем дефолтный диапазон если включен
    if (this.options.defaultRange) {
      this.setDefaultRange();
    }
  }

  initializeFlatpickr() {
    const self = this;
    let originalClose = null;
    const flatpickrOptions = {
      mode: 'range',
      dateFormat: this.options.format,
      locale: Russian,
      allowInput: false,
      static: true,
      monthSelectorType: 'static',
      enableTime: false,
      time_24hr: true,
      clickOpens: false,
      onOpen: function(selectedDates, dateStr, instance) {
        // Сброс выбора при открытии
        self.startDate = null;
        self.endDate = null;
        instance.clear();
        self.updateApplyBtnState();
        // Переопределяем close
        if (!instance._originalClose) instance._originalClose = instance.close;
        instance.close = function() {};
        
        // Добавляем обработчик клика снаружи
        setTimeout(() => {
          self.addOutsideClickHandler(instance);
        }, 0);
      },
      onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
          self.startDate = selectedDates[0];
          self.endDate = selectedDates[1];
        } else {
          self.startDate = selectedDates[0] || null;
          self.endDate = null;
        }
        self.updateApplyBtnState();
      },
      onReady: function(selectedDates, dateStr, instance) {
        self.addCustomFooter(instance, originalClose);
        self.updateApplyBtnState();
        // Добавляем обработчик клика по input
        self.addInputClickHandler(instance);
      },
      onMonthChange: function(selectedDates, dateStr, instance) {
        self.addCustomFooter(instance, originalClose);
      },
      onYearChange: function(selectedDates, dateStr, instance) {
        self.addCustomFooter(instance, originalClose);
      },
      onClose: function() {
        // Удаляем обработчик клика снаружи
        self.removeOutsideClickHandler();
      }
    };
    this.flatpickrInstance = flatpickr(this.inputElement, flatpickrOptions);
    this._originalClose = originalClose;
  }

  addCustomFooter(instance, originalClose) {
    // Удаляем старый footer если есть
    const calendarContainer = instance.calendarContainer;
    let footer = calendarContainer.querySelector('.flatpickr-footer');
    if (footer) footer.remove();
    // Создаем footer
    footer = document.createElement('div');
    footer.className = 'flatpickr-footer';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'center';
    
    
    // Кнопка "Применить"
    const applyBtn = document.createElement('button');
    applyBtn.type = 'button';
    applyBtn.textContent = 'Применить';
    applyBtn.className = 'w-full bg-transparent hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 p-5 border-t uppercase font-semibold';
    applyBtn.disabled = true;
    
    // Цвет текста в зависимости от состояния
    const setBtnColor = () => {
      applyBtn.style.color = applyBtn.disabled ? '#C5C7CD' : '#008dd2';
    };
    setBtnColor();
    // Обновлять цвет при изменении disabled
    const observer = new MutationObserver(setBtnColor);
    observer.observe(applyBtn, { attributes: true, attributeFilter: ['disabled'] });
    applyBtn.addEventListener('click', () => {
      if (!applyBtn.disabled) {
        this.applySelection();
        // Восстанавливаем close и закрываем календарь
        if (this.flatpickrInstance && this.flatpickrInstance._originalClose) {
          this.flatpickrInstance.close = this.flatpickrInstance._originalClose;
          setTimeout(() => this.flatpickrInstance.close(), 0);
        }
      }
    });
    footer.appendChild(applyBtn);
    calendarContainer.appendChild(footer);
    this.footerApplyBtn = applyBtn;
  }

  updateApplyBtnState() {
    if (!this.footerApplyBtn) return;
    // Кнопка активна только если выбран диапазон из двух дат
    if (this.startDate && this.endDate) {
      this.footerApplyBtn.disabled = false;
    } else {
      this.footerApplyBtn.disabled = true;
    }
    // Цвет обновится автоматически через MutationObserver
  }

  setDefaultRange() {
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setMonth(today.getMonth() - 1);
    
    this.startDate = monthAgo;
    this.endDate = today;
    
    if (this.flatpickrInstance) {
      this.flatpickrInstance.setDate([monthAgo, today]);
    }
    
    if (this.options.onRangeSelect) {
      this.options.onRangeSelect({
        startDate: this.startDate,
        endDate: this.endDate,
        formattedRange: this.inputElement ? this.inputElement.value : '',
        isEmpty: false
      });
    }
  }

  formatDate(date) {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    switch (this.options.format) {
      case 'd.m.Y':
        return `${day}.${month}.${year}`;
      case 'm/d/Y':
        return `${month}/${day}/${year}`;
      case 'Y-m-d':
        return `${year}-${month}-${day}`;
      default:
        return `${day}.${month}.${year}`;
    }
  }

  clearSelection() {
    this.startDate = null;
    this.endDate = null;
    
    if (this.flatpickrInstance) {
      this.flatpickrInstance.clear();
    }

    if (this.options.autoApply) {
      this.applySelection();
    }
  }

  applySelection() {
    console.log('DateRangePicker: applySelection вызван', {
      startDate: this.startDate,
      endDate: this.endDate,
      hasCallback: !!this.options.onRangeSelect
    });
    
    // Формируем отформатированный диапазон
    let formattedRange = '';
    if (this.startDate && this.endDate) {
      const startFormatted = this.formatDate(this.startDate);
      const endFormatted = this.formatDate(this.endDate);
      formattedRange = `${startFormatted} ~ ${endFormatted}`;
    } else if (this.startDate) {
      formattedRange = this.formatDate(this.startDate);
    }
    
    // Обновляем input
    if (this.inputElement) {
      this.inputElement.value = formattedRange;
    }
    
    if (this.options.onRangeSelect && typeof this.options.onRangeSelect === 'function') {
      const rangeData = {
        startDate: this.startDate,
        endDate: this.endDate,
        formattedRange: formattedRange,
        isEmpty: !this.startDate && !this.endDate
      };
      
      console.log('DateRangePicker: Вызываем onRangeSelect с данными:', rangeData);
      this.options.onRangeSelect(rangeData);
    }
  }

  // Публичные методы
  getValue() {
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      formattedRange: this.inputElement ? this.inputElement.value : '',
      isEmpty: !this.startDate && !this.endDate
    };
  }

  setValue(startDate, endDate = null) {
    this.startDate = startDate ? new Date(startDate) : null;
    this.endDate = endDate ? new Date(endDate) : null;

    if (this.flatpickrInstance) {
      if (this.startDate && this.endDate) {
        this.flatpickrInstance.setDate([this.startDate, this.endDate]);
      } else if (this.startDate) {
        this.flatpickrInstance.setDate(this.startDate);
      } else {
        this.flatpickrInstance.clear();
      }
    }

    if (this.options.autoApply) {
      this.applySelection();
    }
  }

  destroy() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
      this.flatpickrInstance = null;
    }

    if (this.inputElement) {
      this.inputElement.remove();
    }
  }

  addOutsideClickHandler(instance) {
    this.outsideClickHandler = (event) => {
      const calendarContainer = instance.calendarContainer;
      const inputElement = this.inputElement;
      
      // Проверяем, что клик не по календарю и не по input
      if (!calendarContainer.contains(event.target) && !inputElement.contains(event.target)) {
        this.closeCalendar(instance);
      }
    };
    
    document.addEventListener('click', this.outsideClickHandler);
  }

  removeOutsideClickHandler() {
    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
    }
  }

  addInputClickHandler(instance) {
    this.inputClickHandler = (event) => {
      event.stopPropagation();
      
      // Если календарь открыт - закрываем, если закрыт - открываем
      if (instance.isOpen) {
        this.closeCalendar(instance);
    } else {
        instance.open();
      }
    };
    
    this.inputElement.addEventListener('click', this.inputClickHandler);
  }

  closeCalendar(instance) {
    // Восстанавливаем оригинальный close и закрываем
    if (instance && instance._originalClose) {
      instance.close = instance._originalClose;
      instance.close();
    }
  }
}

// Экспортируем функцию для быстрого создания
export function createDateRangePicker(containerId, options = {}) {
  return new DateRangePicker({
    containerId,
    ...options
  });
} 