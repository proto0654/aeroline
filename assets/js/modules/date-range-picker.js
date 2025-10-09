/**
 * Date Range Picker Module
 * Модуль для выбора диапазона дат с использованием vanilla-calendar-pro v3.0.4
 * @see https://vanilla-calendar.pro/
 */

import { Calendar } from 'vanilla-calendar-pro';
// Удаляем импорт стилей, так как они теперь в main.css
// import 'vanilla-calendar-pro/styles/index.css';

export class DateRangePicker {
  constructor(options = {}) {
    // Поддерживаем старый API - если передан containerId, используем его
    if (options.containerId) {
      this.selector = `#${options.containerId}`;
    } else if (options.selector) {
      this.selector = options.selector;
    } else {
      console.error('DateRangePicker: Не указан selector или containerId');
      return;
    }

    this.container = document.querySelector(this.selector);

    if (!this.container) {
      console.error(`DateRangePicker: Контейнер не найден для селектора "${this.selector}"`);
      return;
    }

    // Создаем поле ввода, если его нет
    this.inputElement = this.container.querySelector('input');
    if (!this.inputElement) {
      this.inputElement = document.createElement('input');
      this.inputElement.type = 'text';
      this.inputElement.className = 'input input-bordered w-full pr-10';
      this.inputElement.placeholder = options.placeholder || 'Выберите период';
      this.inputElement.readOnly = true;
      this.container.appendChild(this.inputElement);
    }

    // Сохраняем initialTextInputValue и устанавливаем его, если он есть
    this.initialTextInputValue = options.initialTextInputValue || '';
    if (this.initialTextInputValue) {
      this.inputElement.value = this.initialTextInputValue;
    }

    this.calendar = null;
    this.selectedDates = [];
    this.options = {
      minDate: options.minDate || '',
      maxDate: options.maxDate || '',
      initialDate: options.initialDate || new Date().toISOString().split('T')[0],
      locale: 'ru-RU',
    };
    this.onRangeSelect = options.onRangeSelect || null;

    // Создаем контейнер для календаря
    this.calendarContainer = document.createElement('div');
    this.calendarContainer.className = 'date-range-picker-popup';
    this.calendarContainer.style.cssText = `
      position: absolute;
      z-index: 1000;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-radius: 4px;
      display: none;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
      top: 100%;
      left: 0;
      margin-top: 0.5rem;
      min-width: 320px;
    `;

    // Добавляем классы для адаптивной сетки
    this.calendarContainer.classList.add(
      'flex',
      'flex-col'
    );
    this.container.appendChild(this.calendarContainer);

    // Создаем контейнер для кнопок
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.className = 'date-range-picker-actions flex gap-2  pt-0 p-2';

    // Кнопка "Отмена"
    this.cancelButton = document.createElement('button');
    this.cancelButton.type = 'button';
    this.cancelButton.className = 'btn-ghost border-brand-gray border px-8 w-1/2 rounded-lg hover:border-brand-blue'; // Используем классы Tailwind/DaisyUI
    this.cancelButton.textContent = 'Отмена';

    // Кнопка "Применить"
    this.applyButton = document.createElement('button');
    this.applyButton.type = 'button';
    this.applyButton.className = 'btn btn-primary !py-2 w-1/2'; // Используем классы Tailwind/DaisyUI
    this.applyButton.textContent = 'Применить';

    this.buttonsContainer.appendChild(this.cancelButton);
    this.buttonsContainer.appendChild(this.applyButton);
    this.calendarContainer.appendChild(this.buttonsContainer); // Добавляем контейнер с кнопками в ОСНОВНОЙ контейнер календаря

    this._init();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    // Обработчик клика по полю ввода
    this.inputElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.show();
    });

    // Закрытие календаря при клике вне
    document.addEventListener('mousedown', (e) => {
      // Проверяем, что клик был вне календаря и поля ввода
      // Используем contains вместо closest для более надежной проверки
      const isOutsideClick = !this.calendarContainer.contains(e.target) &&
        e.target !== this.inputElement &&
        !this.inputElement.contains(e.target);

      if (isOutsideClick) {
        this.hide();
      }
    });

    // Обработчик для кнопки "Отмена"
    this.cancelButton.addEventListener('click', () => {
      this.hide();
    });

    // Обработчик для кнопки "Применить"
    this.applyButton.addEventListener('click', () => {
      // Выводим весь объект календаря в консоль
      console.log('Весь объект календаря (при нажатии "Применить"):');
      console.dir(this.calendar); 

      try {
        const replacer = (key, value) => {
          if (key === 'parentNode' || key === 'ownerDocument' || key === 'parent') return '[DOM]';
          if (key === 'previousSibling' || key === 'nextSibling') return '[DOM]';
          if (typeof value === 'function') return 'function() { ... }';
          return value;
        };
        console.log('Структура календаря (при нажатии "Применить"):', JSON.parse(JSON.stringify(this.calendar, replacer)));
      } catch (e) {
        console.log('Не удалось сериализовать объект календаря (при нажатии "Применить"):', e);
      }
      
      // Обновляем выбранные даты из календаря перед обновлением интерфейса
      this._updateSelectedDatesFromCalendar();
      this._updateInputValue();
      this._notifyRangeSelect();
      this.hide();
    });
  }

  _init() {
    try {
      this.init();
    } catch (error) {
      console.error('Ошибка инициализации DateRangePicker:', error);
    }
  }

  init() {
    const calendarElement = document.createElement('div');
    this.calendarContainer.insertBefore(calendarElement, this.buttonsContainer);
    console.warn('[[DateRangePicker DEBUG]] Initializing Calendar instance...');

    const calendarOptions = {
      type: 'multiple',
      displayDatesOutside: false,
      dates: {
        minDate: this.options.minDate,
        maxDate: this.options.maxDate,
      },
      settings: {
        lang: 'ru',
        selection: {
          enableEdgeDatesOnly: false,
        },
        visibility: {
          weekend: true,
          today: true,
        },
        selectedDates: this.selectedDates, // Изначально пустой массив
      },
      actions: {
        selectDates: (event, dates) => {
          
          console.log(dates.join(', '));
        },
        onClickDate: (self, mouseEvent) => { 
          console.warn('[[DateRangePicker DEBUG]] onClickDate Invoked!');
          console.log('[[DateRangePicker DEBUG]] Calendar instance (self):', self);
          console.log('[[DateRangePicker DEBUG]] Mouse event:', mouseEvent);
          console.log('[[DateRangePicker DEBUG]] self.selectedDates from CALENDAR LIBRARY:', JSON.parse(JSON.stringify(self.selectedDates)));
          console.log('[[DateRangePicker DEBUG]] this.selectedDates (our internal) BEFORE processing:', JSON.parse(JSON.stringify(this.selectedDates)));

          // Вместо прямой работы с this.selectedDates,
          // будем полагаться на то, что библиотека сама обновляет self.selectedDates.
          // Наша задача - синхронизировать this.selectedDates с self.selectedDates
          // только при необходимости (например, при нажатии "Применить" или при запросе значения).

          // Этот колбэк теперь в основном для отладки и потенциальных будущих расширений,
          // но основная логика получения дат перенесена в _updateSelectedDatesFromCalendar,
          // которая будет вызвана при нажатии "Применить".

          // Попробуем вызвать self.update() для перерисовки, если это необходимо
          try {
              self.update();
              console.log('[[DateRangePicker DEBUG]] Called self.update() after date click.');
          } catch (e) {
              console.error('[[DateRangePicker DEBUG]] Error calling self.update() in onClickDate:', e.message);
          }
        },
        // Добавляем обработчик onChangeToInput для обновления inputElement
        // Этот обработчик будет вызываться библиотекой при изменении выбора
        onChangeToInput: (self) => {
          console.warn('[[DateRangePicker DEBUG]] onChangeToInput Invoked!');
          console.log('[[DateRangePicker DEBUG]] Calendar instance (self) in onChangeToInput:', self);
          console.log('[[DateRangePicker DEBUG]] self.selectedDates in onChangeToInput:', JSON.parse(JSON.stringify(self.selectedDates)));
          
          // Обновляем наше внутреннее состояние this.selectedDates
          // на основе данных из self.selectedDates (актуальные данные из библиотеки)
          const datesFromCalendar = self.selectedDates;
          if (Array.isArray(datesFromCalendar)) {
            this.selectedDates = datesFromCalendar.map(d => {
              try {
                if (!d) throw new Error('Date source is null or empty');
                return new Date(d).toISOString().split('T')[0];
              } catch (e) {
                console.error('[[DateRangePicker DEBUG]] Error parsing date in onChangeToInput:', d, 'Error:', e.message);
                return null;
              }
            }).filter(d => d !== null).sort();
            console.log('[[DateRangePicker DEBUG]] this.selectedDates updated from onChangeToInput:', JSON.parse(JSON.stringify(this.selectedDates)));
          }

          // Обновляем значение в поле ввода
          // this._updateInputValue(); // Вызывать _updateInputValue здесь может быть преждевременно,
                                  // так как пользователь еще может выбирать даты.
                                  // Обновление инпута лучше делать по кнопке "Применить" или если autoApply включен.
                                  // Если нужно немедленное обновление поля ввода, раскомментируйте.
        }
      },
      popups: {},
      selectionDatesMode: 'multiple-ranged',
      cssClass: 'date-range-picker-calendar',
      locale: 'ru-RU',
    };
    console.log('[[DateRangePicker DEBUG]] Calendar options to be used:', JSON.parse(JSON.stringify(calendarOptions)));

    try {
      this.calendar = new Calendar(calendarElement, calendarOptions);
      console.log('[[DateRangePicker DEBUG]] Calendar instance CREATED:', this.calendar);
      if (this.calendar && typeof this.calendar.init === 'function') {
        this.calendar.init();
        console.log('[[DateRangePicker DEBUG]] Calendar instance INITIALIZED.');
        console.log('[[DateRangePicker DEBUG]] Calendar internal selected dates AFTER init:', this.calendar.selectedDates);
      } else {
        console.error('[[DateRangePicker DEBUG]] Calendar instance is invalid or has no init method!');
      }
    } catch (e) {
      console.error('[[DateRangePicker DEBUG]] CRITICAL ERROR creating or initializing Calendar instance:', e.message, e.stack);
    }

    this._addCustomStyles();
  }

  _addCustomStyles() {
    if (!document.getElementById('date-range-picker-custom-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'date-range-picker-custom-styles';
      styleEl.textContent = `
        .date-range-picker-popup {
          z-index: 1050 !important;
        }
        .date-range-picker-calendar {
          background: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border-radius: 0.5rem;
          padding: 0.5rem;
        }
        .date-range-picker-calendar .vanilla-calendar-header {
          padding: 0.75rem;
        }
        .date-range-picker-calendar .vanilla-calendar-content {
          padding: 0.5rem;
        }
        .date-range-picker-calendar .vanilla-calendar-week__day {
          font-weight: bold;
        }
        
        /* Фиксим конфликт с классами vc- */
        .date-range-picker-calendar .vanilla-calendar-day[data-calendar-day-selected="true"] {
          background-color: var(--color-primary, #008DD2);
          color: white;
          font-weight: bold;
        }
        .date-range-picker-calendar .vanilla-calendar-day[data-calendar-day-selected="true"].vanilla-calendar-day_selected-first {
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }
        .date-range-picker-calendar .vanilla-calendar-day[data-calendar-day-selected="true"].vanilla-calendar-day_selected-last {
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }
        
        
      `;
      document.head.appendChild(styleEl);
    }
  }

  // Новый метод для обновления выбранных дат из объекта календаря
  _updateSelectedDatesFromCalendar() {
    if (!this.calendar || !this.calendar.context || !this.calendar.context.selectedDates) {
      console.warn('[[DateRangePicker DEBUG]] Calendar context or selectedDates not found in _updateSelectedDatesFromCalendar. Calendar object:', this.calendar);
      this.selectedDates = []; // Очищаем, если не можем получить данные
      return;
    }
    
    console.log('Обновляем выбранные даты из экземпляра календаря (this.calendar.context.selectedDates):', this.calendar.context.selectedDates);
    
    // Получаем выбранные даты из this.calendar.context.selectedDates
    const datesFromCalendar = this.calendar.context.selectedDates;
    
    if (Array.isArray(datesFromCalendar) && datesFromCalendar.length > 0) {
      const newProcessedDates = datesFromCalendar.map(d => {
        try {
          if (!d) throw new Error('Date source is null or empty');
          return new Date(d).toISOString().split('T')[0];
        } catch (e) {
          console.error('[[DateRangePicker DEBUG]] Error parsing date in _updateSelectedDatesFromCalendar:', d, 'Error:', e.message);
          return null;
        }
      }).filter(d => d !== null).sort();

      this.selectedDates = newProcessedDates;
      console.log('[[DateRangePicker DEBUG]] Updated internal selectedDates:', this.selectedDates);
    } else {
      this.selectedDates = [];
      console.log('[[DateRangePicker DEBUG]] No dates selected, cleared internal selectedDates');
    }
  }

  _updateInputValue() {
    // Сначала обновляем выбранные даты из календаря
    this._updateSelectedDatesFromCalendar();

    const formattedRange = this.getFormattedRange();
    console.log('Updating input value:', {
      formattedRange,
      selectedDates: this.selectedDates,
      initialText: this.initialTextInputValue
    });

    // Обновляем значение поля ввода
    if (this.inputElement) {
      if (formattedRange) { // Если есть выбранный диапазон
        this.inputElement.value = formattedRange;
      } else { // Если выбранных дат нет, используем initialTextInputValue или пустую строку
        this.inputElement.value = this.initialTextInputValue || '';
      }

      // Создаем и диспатчим событие input для корректной работы с формами
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      this.inputElement.dispatchEvent(event);
    }
  }

  // Вспомогательный метод для вызова коллбэка
  _notifyRangeSelect() {
    // Обновляем выбранные даты из календаря перед уведомлением
    this._updateSelectedDatesFromCalendar();

    if (this.onRangeSelect && this.selectedDates.length >= 1) {
      const range = {
        start: this.selectedDates[0],
        end: this.selectedDates[this.selectedDates.length - 1] || this.selectedDates[0],
        formattedRange: this.getFormattedRange(),
        isEmpty: this.selectedDates.length === 0
      };
      console.log('Notifying range select:', range);
      this.onRangeSelect(range);
    }
  }

  // Публичные методы для работы с выбранными датами
  getSelectedDates() {
    // Обновляем выбранные даты из календаря перед возвратом
    this._updateSelectedDatesFromCalendar();
    return this.selectedDates;
  }

  getValue() {
    // Обновляем выбранные даты из календаря перед возвратом
    this._updateSelectedDatesFromCalendar();

    if (this.selectedDates.length >= 1) {
      const range = {
        start: this.selectedDates[0],
        end: this.selectedDates[this.selectedDates.length - 1] || this.selectedDates[0],
        formattedRange: this.getFormattedRange(),
        isEmpty: false
      };
      console.log('Getting value:', range);
      return range;
    }
    return { isEmpty: true };
  }

  getFormattedRange() {
    if (this.selectedDates.length >= 1) {
      // Преобразуем строки дат в объекты Date
      const startDate = new Date(this.selectedDates[0]);
      const endDate = this.selectedDates.length > 1 ? new Date(this.selectedDates[this.selectedDates.length - 1]) : startDate;

      // Форматируем даты в нужный формат
      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      };

      const start = formatDate(startDate);
      const end = formatDate(endDate);

      console.log('Selected dates:', {
        raw: this.selectedDates,
        start: startDate,
        end: endDate,
        formatted: `${start} - ${end}`
      });

      return this.selectedDates.length === 1 ? start : `${start} - ${end}`;
    }
    return '';
  }

  // Установка выбранных дат
  setSelectedDates(dates) {
    if (!this.calendar || !Array.isArray(dates)) return;

    // Преобразуем даты в ISO формат YYYY-MM-DD
    this.selectedDates = dates.map(date => {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    }).sort();

    console.log('Setting selected dates:', {
      input: dates,
      processed: this.selectedDates
    });

    this.calendar.selectedDates = this.selectedDates;
    this.calendar.update();
    this._updateInputValue(); // Обновляем поле ввода после установки дат
  }

  // Очистка выбранных дат
  clear() {
    if (!this.calendar) return;

    this.selectedDates = [];
    this.calendar.selectedDates = [];
    this.calendar.update();
    this.inputElement.value = ''; // Явно очищаем поле ввода
    // При очистке, мы не восстанавливаем initialTextInputValue в поле
    this._notifyRangeSelect(); // Уведомляем, что выбор сброшен
  }

  clearSelection() {
    this.clear();
  }

  // Удаление календаря
  destroy() {
    if (!this.calendar) return;
    this.calendar.destroy();
    this.calendar = null;

    // Очищаем контейнер
    this.container.innerHTML = '';
  }

  // Показ/скрытие календаря
  show() {
    if (!this.calendar) return;

    this.calendarContainer.style.display = 'block';

    // Принудительно вызываем reflow
    this.calendarContainer.offsetHeight;

    // Показываем календарь с анимацией
    this.calendarContainer.style.opacity = '1';
    this.calendarContainer.style.visibility = 'visible';

    this.calendar.show();
  }

  hide() {
    if (!this.calendar) return;

    // Скрываем с анимацией
    this.calendarContainer.style.opacity = '0';
    this.calendarContainer.style.visibility = 'hidden';

    // Ждем окончания анимации перед скрытием
    setTimeout(() => {
      this.calendarContainer.style.display = 'none';
    }, 200);

    this.calendar.hide();
  }

  // Методы для получения начальной и конечной дат диапазона
  getStartDate() {
    // Обновляем выбранные даты из календаря перед возвратом
    this._updateSelectedDatesFromCalendar();
    return this.selectedDates.length > 0 ? this.selectedDates[0] : null;
  }

  getEndDate() {
    // Обновляем выбранные даты из календаря перед возвратом
    this._updateSelectedDatesFromCalendar();
    return this.selectedDates.length > 1 ? this.selectedDates[this.selectedDates.length - 1] : null;
  }
} 