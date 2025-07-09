# Current Tasks

## Global Refactoring Strategy

The overall project development strategy is a gradual transition from native JavaScript to Vue 3 components for all dynamic UI elements. Progress is being made in several key areas:

### ✅ Completed

1. **Global Modal System**

   - Unified `GlobalModalHost.vue` component with Pinia management
   - Migration of all key modals to the new system
   - Consistent behavior and styling (DaisyUI based)

2. **Data Table Component**

   - Implementation of `EasyDataTableWrapper.vue` based on `vue3-easy-data-table`
   - Refactoring of tables on senders/receivers and service acts pages
   - Consistent sorting, filtering, and pagination

3. **Date Range Picker Component**

   - Implementation of `DateRangePickerVue.vue` based on `vue-datepicker-next`
   - Integration on service acts and news pages
   - Configuration for correct interaction with other code

4. **Homepage News**

   - Replacement of carousel with `HomePageNews.vue` component
   - Integration with global modal system
   - Addition of "new news" indicator

5. **Delivery Form Integration Across Pages**
   - Replaced old HTML forms on homepage and contacts page with Vue components
   - Created `DirectionForm.vue` for homepage with calculate button functionality
   - Created `CityAutocompleteForm.vue` for contacts page city filtering
   - Enhanced `AutocompleteInput.vue` with:
     - Flexible item emission (full object vs city only via `emitFullItem` prop)
     - Reset button functionality (`showResetButton` prop)
     - Specific office selection tracking with visual feedback
     - Dynamic UI: hides dropdown arrow and repositions reset button when specific office is selected
   - Added GET parameter support in calculator page for pre-filling form via URL (e.g., `?from=1&to=7`)
   - Updated entry point files to properly mount Vue components on respective pages

### 🔄 In Progress

1. **News Page Refactoring**

   - Creation of Vue components for news grid, pagination, and filtering
   - Working with test data from JSON
   - Integration with global modal system
   - Refining news pagination

2. **Asset Management System Update**
   - Configuring `vite.config.js` for optimal asset processing and output
   - Categorization of assets by type (images, CSS, JS, fonts)
   - Support for file naming hashing while preserving structure

### 📋 Planned

1. **Unified Forms System**

   - Creation of base input field components (text, select, checkbox, etc.)
   - Integration with VeeValidate for validation
   - Form wrapper component with unified style and behavior

2. **Refactoring Remaining Pages**

   - Identification of priority pages for refactoring
   - Creation of Vue components for interactive elements
   - Ensuring compatibility with existing code

3. **Bitrix CMS Integration**

   - Preparing architecture for API interaction
   - Replacing test data with real data
   - Implementation of authorization and other necessary mechanisms

4. **Senders and Receivers Page Further Development**
   - Implement additional features as required (e.g., API integration, more complex UI elements, specific business logic).
   - This task covers any work on the /senders-receivers.html page beyond the initial data table and modal implementation.

## Current Priorities

1. Complete news page refactoring, especially the pagination component
2. Continue refactoring forms into Vue components using VeeValidate
3. Maintain and expand existing documentation as the project evolves
4. Ensure compatibility with the latest dependency versions, including Vite

**Note:** All future entries and modifications to this memory bank should be written in English.

# Задача: Перенос и улучшение автокомплита калькулятора в Vue

## Краткое описание

Перенос кастомного автокомплита из старой реализации (vanilla JS) в современный Vue-компонент с сохранением всей логики, приоритезации поиска и кастомного отображения офисов. Обеспечена максимальная идентичность поведения и внешнего вида, а также интеграция с формами калькулятора.

## Основные шаги и решения

1. **Анализ оригинального автокомплита**

   - Изучена функция `createAutocompleteInput` из `assets/js/modules/autocomplete.js`.
   - Выявлены ключевые особенности: поиск по всем полям (город, адрес, тип, телефон) с приоритетом, кастомный HTML-рендеринг, отсутствие использования `<select>`, поддержка клавиатурной навигации, отображение всех офисов, а не только городов.

2. **Перенос логики в Vue**

   - Создан компонент `AutocompleteInput.vue` с:
     - Полной кастомной версткой (input, кнопка, стрелка, выпадающий список)
     - Поиском по всем полям с приоритетом: сначала `city.startsWith`, затем `city.includes`, затем остальные поля (адрес, тип, телефон)
     - Кастомным HTML для каждого офиса (город, адрес, тип, телефон)
     - Поддержкой клавиатурной навигации (стрелки, Enter, Escape)
     - Событием выбора города (`citySelected`), чтобы интеграция с формой была удобной
     - Корректной работой как для поиска по городам (режим onlyCities), так и для поиска по всем офисам (основной режим калькулятора)

3. **Интеграция с формами калькулятора**

   - Компонент `DirectionForm.vue` теперь использует новый автокомплит и передает в форму только название города, а в поле ввода отображает полную строку (город, адрес, телефон).
   - Исправлены все места, где ранее использовался старый проп `options` (заменено на `items`).
   - Исправлены обработчики событий, чтобы в форму попадал только город, а не весь объект офиса.

4. **Стилизация и соответствие UI**

   - Использованы те же классы Tailwind, что и в оригинале.
   - Важно: для всех новых и рефакторимых компонентов рекомендуется использовать [DaisyUI](https://daisyui.com/) для унификации внешнего вида и ускорения верстки.
   - Кастомные элементы (input, dropdown) стилизованы с учетом совместимости с DaisyUI и Tailwind.

5. **Рекомендации по структуре компонентов**
   - Все переиспользуемые элементы формы (input, select, autocomplete и т.д.) должны располагаться в `assets/vue/components/forms/`.
   - Страницы и крупные формы — в `assets/vue/components/pages/` (например, калькулятор: `pages/calculator/`).
   - Для сложных форм рекомендуется разбивать на логические подкомпоненты (например, `DirectionForm`, `CargoParamsForm`, `DeliveryPointForm`).
   - Все компоненты должны быть максимально атомарными и переиспользуемыми.
   - Вся верстка новых компонентов — через DaisyUI + Tailwind.

## Итог

- Автокомплит полностью повторяет оригинальную логику и внешний вид.
- Поиск работает по всем полям с приоритетом.
- Кастомный HTML для каждого офиса.
- Интеграция с формами калькулятора через v-model и события.
- Структура компонентов и рекомендации по DaisyUI зафиксированы для будущей разработки.
