# System Patterns

## Architecture Overview
The project is based on a component architecture using modern web technologies with DaisyUI and Vue 3 as primary UI frameworks. Native JavaScript is progressively being refactored to Vue components for dynamic UI.

## Key Technical Decisions
1. Vite for fast development and optimized builds
2. Tailwind CSS for consistent styling
3. DaisyUI for UI components
4. Vue 3 for dynamic components and UI
5. Pinia for global state management (especially for modals)
6. Modular component structure
7. Optimized resource loading
8. Mobile menu: two-level structure, toggles with animated SVG arrow, JS logic for submenu toggling
9. All menu items must have a corresponding page
10. ✅ **COMPLETED**: Unified global modal system implemented with Vue 3, Pinia, and `GlobalModalHost.vue`
11. ✅ **COMPLETED**: All modals use div-based DaisyUI structure (no dialog elements)
12. ✅ **COMPLETED**: Consistent modal behavior across all pages (promise-based results for success/cancellation)

## Design Patterns
1. Component-based approach (Vue components as building blocks)
2. Modular architecture
3. Responsive design
4. Progressive Enhancement
5. Mobile menu toggles (accordion pattern)
6. Table sorting and pagination pattern
7. Unified global modal pattern with `GlobalModalHost.vue` and Pinia
8. DaisyUI form components pattern (integrated with VeeValidate)
9. DaisyUI navigation pattern
10. Wrapper Component Pattern: Using lightweight Vue components (e.g., `DateRangeFilter.vue`) to wrap third-party components (e.g., `DateRangePickerVue.vue` based on `vue-datepicker-next`). This pattern encapsulates external library logic and provides a consistent, project-specific interface, simplifying integration and maintenance.
11. Universal Table Component Pattern: Using the `EasyDataTableWrapper.vue` component based on `vue3-easy-data-table` for all data tables to ensure consistent UI, sorting, filtering, and pagination.
11. **News Card Pattern:** Displaying news items in a grid format with a condensed view and a 'Подробнее' button to open a modal with full details. Includes an 'isNew' indicator for recent news.

## Component Relationships
- Main page as the entry point
- Independent modules for each feature (e.g., order, tracking, payments)
- Reusable Vue components for UI elements and forms
- Centralized style management via Tailwind CSS and DaisyUI
- Mobile menu and navigation are decoupled and extensible
- Table components with built-in sorting and pagination (List.js, considering Vue integration)
- Data tables use the `EasyDataTableWrapper.vue` component for consistent display and functionality.
- Universal global modal container (`GlobalModalHost.vue`) displays all modal content, managed by Pinia store.
- DaisyUI theme system for consistent styling
- `HomePageNews.vue` component on the home page interacts with `GlobalModalHost.vue` and `NewsDetailModal.vue` to display news details in a modal.

## File Structure
```
/
├── assets/         # Static resources and reusable components
│   ├── js/        # JavaScript modules (old and new global/page-specific)
│   ├── vue/       # Vue components, entrypoints, and stores
│   │   ├── components/ # Reusable Vue components
│   │   │   ├── forms/ # Form components
│   │   │   ├── modals/ # Modal content components
│   │   │   └── HomePageNews.vue # Component for home page news
│   │   ├── entrypoints/ # Vue application entry points
│   │   └── stores/ # Pinia stores
│   ├── css/       # Styles
│   ├── partials/  # Handlebars templates
│   └── img/       # Images
├── docs/          # Build output
└── [pages]        # HTML pages (all menu items have a page)
``` 

## Partials & JS Modules
- Partials: 
  - header.hbs (navigation, mobile menu, contacts, **includes global modal host and global UI scripts**)
  - footer.hbs (navigation, contacts, policy)
- JS modules: 
  - ✅ **global-ui.js** (new module for global UI interactions like login modal button, integrated in header.hbs)
  - ✅ **main.js** (global imports, exposes `window.globalModalStore` globally)
  - ✅ **home-page.js** (updated to use new modal system)
  - ❌ **DELETED**: news-page.js (functionality migrated to Vue components)
  - ✅ **service-acts-page.js** (updated to use new modal system and Vue date picker, and fixed click handler)
  - ✅ **senders-receivers-page.js** (completely refactored to use new modal system)
  - utils.js (utility functions, PhoneValidator)
  - ui.js (UI init, phone mask, menu, FAQ, tabs)
  - pagination.js (Pagination class for lists - **Future refactoring to Vue is planned**)
  - table-manager.js (TableManager for consistent table functionality)
  - contacts-page.js
  - vacancies-page.js
  - slider.js (Swiper integration)
  - ❌ **DELETED**: modal.js (old system)
  - ❌ **DELETED**: modal2.js (old system)
  - ❌ **DELETED**: `ModalCancelledError.js`
- ✅ **Modal system**: Unified global modal system using Vue 3, Pinia, and `GlobalModalHost.vue`
- ✅ **Modal structure**: All modals use consistent DaisyUI structure: div.modal > div.modal-backdrop + div.modal-box
- ✅ **Modal behavior**: Consistent close on Escape, backdrop click, close buttons. Promise-based results (success/cancelled) for dismissals.
- ✅ **Modal sizes**: Support for small, default, large, full sizes.
- Pagination and filtering are handled by a universal Pagination class
- Table sorting, filtering, and pagination are handled by the `EasyDataTableWrapper.vue` component using `vue3-easy-data-table`.
- All UI logic is modular and page-specific logic is separated
- Phone mask does not interfere with editing, works on blur, supports +7 and 8
- All styling is done through Tailwind utilities and DaisyUI components
- **Refactoring Strategy:** Progressively replacing native JavaScript UI logic with Vue 3 components, prioritizing interactive elements and forms. 

## UI Components
- `HomePageNews.vue`: Component for displaying the latest 3 news items on the home page. 
- `EasyDataTableWrapper.vue`: Reusable Vue component for data tables based on `vue3-easy-data-table`.

## Form Field Pattern (Обязательный паттерн для всех форм)

- Все формы должны использовать переиспользуемые компоненты:
  - `TextInput.vue` — для текстовых, email, password и других однострочных полей
  - `SelectInput.vue` — для выпадающих списков
  - `TextareaInput.vue` — для многострочных полей
  - `CheckboxInput.vue` — для чекбоксов (согласие, опции и т.д.)
  - `PhoneInput.vue` — для всех телефонных полей (маска, required, ошибки, VeeValidate)
- Эти компоненты интегрированы с VeeValidate и обеспечивают:
  - Единый стиль оформления
  - Автоматическое позиционирование required-метки (звездочки)
  - Унифицированную обработку ошибок
  - Корректную работу с label и доступностью
- Прямое использование `<input>`, `<select>`, `<textarea>`, `<Field as=...>`, `<input type='tel'>` в шаблонах форм запрещено, кроме как внутри этих компонентов.
- Любая новая форма или рефакторинг существующей должны следовать этому паттерну. 

### Централизованная стилизация форм
- Базовые стили для всех input, select, textarea, label, ошибок и т.д. задаются централизованно через @apply в компоненте-обёртке BaseForm.vue.
- Внутри компонентов полей (TextInput, PhoneInput, SelectInput, TextareaInput, CheckboxInput) запрещено дублировать эти утилиты Tailwind — допускается только добавление специфических классов для особых случаев (например, required-метка, кастомная иконка).
- Кнопки и служебные классы (например, .sr-only для доступности) могут оформляться отдельно.
- Любая новая форма или рефакторинг существующей должны следовать этому паттерну. 

## Forms

### Reusable Form Components

- **TextInput.vue**: For single-line text input fields.
- **SelectInput.vue**: For dropdown selection fields.
- **TextareaInput.vue**: For multi-line text input areas.
- **CheckboxInput.vue**: For single checkbox inputs.
- **PhoneInput.vue**: For phone number input with masking.

All form fields **must** use these reusable components. Direct usage of native `<input>`, `<select>`, or `<textarea>` elements is **forbidden** within application forms to ensure consistency, proper styling, validation, and accessibility.

### Centralized Form Styling with BaseForm.vue

All forms within the application **must** be wrapped by the `BaseForm.vue` component. This component provides:

- **Centralized styling**: By applying the `.aero-form` class to the `<form>` tag, which is styled via `assets/css/forms.css`.
- **VeeValidate integration**: Seamlessly handles form validation, submission, and error display.
- **Standardized actions**: Provides default submit and cancel buttons via a dedicated slot.
- **Feedback messages**: Displays success or error messages after form submission.

This pattern ensures a consistent look and feel, unified validation logic, and simplified development for all forms across the application. Any custom buttons or form elements within `BaseForm.vue` should be placed within the appropriate slots. 