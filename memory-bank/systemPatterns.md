# System Patterns

## Architecture Overview
The project is based on a component architecture using modern web technologies, with DaisyUI and Vue 3 as the primary UI frameworks. Native JavaScript is gradually being refactored into Vue components for dynamic UI.

## Key Technical Decisions
1. Vite for fast development and optimized builds
2. Tailwind CSS for consistent styling
3. DaisyUI for UI components
4. Vue 3 for dynamic components and UI
5. Pinia for global state management (especially for modals)
6. Modular component structure
7. Optimized asset loading
8. Mobile menu: two-level structure, toggles with animated SVG arrow, JS logic for submenu toggling
9. All menu items must have a corresponding page
10. ✅ **COMPLETED**: Unified global modal system implemented with Vue 3, Pinia, and `GlobalModalHost.vue`
11. ✅ **COMPLETED**: All modals use a div-based structure with DaisyUI (no dialog elements)
12. ✅ **COMPLETED**: Consistent modal behavior across all pages (promise-based results for success/cancellation)

## Design Patterns
1. Component-based approach (Vue components as building blocks)
2. Modular architecture
3. Responsive design
4. Progressive enhancement
5. Mobile menu toggles (accordion pattern)
6. Table sorting and pagination pattern
7. Unified global modal pattern with `GlobalModalHost.vue` and Pinia
8. DaisyUI form component pattern (integrated with VeeValidate)
9. DaisyUI navigation pattern
10. Wrapper Component Pattern: Using lightweight Vue components (e.g., `DateRangeFilter.vue`) to wrap third-party components (e.g., `DateRangePickerVue.vue` based on `vue-datepicker-next`). This pattern encapsulates external library logic and provides a consistent, project-specific interface, simplifying integration and maintenance.
11. Universal Table Component Pattern: Using the `EasyDataTableWrapper.vue` component based on `vue3-easy-data-table` for all data tables to ensure consistent UI, sorting, filtering, and pagination.
12. **News Card Pattern:** Displaying news items in a grid format with a condensed view and a 'Read More' button to open a modal with full details. Includes an 'isNew' indicator for recent news.

## Component Relationships
- Main page as an entry point
- Independent modules for each feature (e.g., order, tracking, payments)
- Reusable Vue components for UI elements and forms
- Centralized style management via Tailwind CSS and DaisyUI
- Mobile menu and navigation are separated and extensible
- Table components with built-in sorting and pagination (List.js, considering Vue integration)
- Data tables use the `EasyDataTableWrapper.vue` component for consistent display and functionality.
- The universal global modal container (`GlobalModalHost.vue`) displays all modal content, managed by a Pinia store.
- DaisyUI theme system for consistent styling
- `HomePageNews.vue` component on the main page interacts with `GlobalModalHost.vue` and `NewsDetailModal.vue` to display news details in a modal.

## File Structure
```
/
├── assets/         # Static assets and reusable components
│   ├── js/        # JavaScript modules (old and new global/page-specific)
│   ├── vue/       # Vue components, entry points, and stores
│   │   ├── components/ # Reusable Vue components
│   │   │   ├── forms/ # Form components
│   │   │   ├── modals/ # Modal content components
│   │   │   └── HomePageNews.vue # Component for news on the main page
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
  - ✅ **global-ui.js** (new module for global UI interactions, e.g., login modal button, integrated into header.hbs)
  - ✅ **main.js** (global imports, makes `window.globalModalStore` globally accessible)
  - ✅ **home-page.js** (updated to use the new modal system)
  - ❌ **DELETED**: news-page.js (functionality migrated to Vue components)
  - ✅ **service-acts-page.js** (updated to use the new modal system and Vue date picker, click handler fixed)
  - ✅ **senders-receivers-page.js** (fully refactored to use the new modal system)
  - utils.js (utility functions, PhoneValidator)
  - ui.js (UI initialization, phone mask, menu, FAQ, tabs)
  - pagination.js (Pagination class for lists - **Future refactoring to Vue planned**)
  - table-manager.js (TableManager for consistent table functionality)
  - contacts-page.js
  - vacancies-page.js
  - slider.js (Swiper integration)
  - ❌ **DELETED**: modal.js (old system)
  - ❌ **DELETED**: modal2.js (old system)
  - ❌ **DELETED**: `ModalCancelledError.js`
- ✅ **Modal system**: Unified global modal system using Vue 3, Pinia, and `GlobalModalHost.vue`
- ✅ **Modal structure**: All modals use a consistent DaisyUI structure: div.modal > div.modal-backdrop + div.modal-box
- ✅ **Modal behavior**: Consistent closing on Escape, backdrop click, close buttons. Promise-based results (success/cancellation) instead of rejections for cancellation.
- ✅ **Modal sizes**: Support for small, default, large, full sizes.
- Pagination and filtering handled by universal Pagination class
- Table sorting, filtering, and pagination handled by `EasyDataTableWrapper.vue` component using `vue3-easy-data-table`.
- All UI logic is modular, and page-specific logic is separated
- Phone mask does not interfere with editing, works on blur, supports +7 and 8
- All styling is done via Tailwind utilities and DaisyUI components
- **Refactoring Strategy:** Gradual replacement of native JavaScript UI logic with Vue 3 components, prioritizing interactive elements and forms.

## UI Components

-   `HomePageNews.vue`: Component for displaying the latest 3 news on the main page.
-   `EasyDataTableWrapper.vue`: Reusable Vue component wrapping `vue3-easy-data-table` to ensure consistent table UI and functionality (sorting, filtering, pagination). Supports optional row selection via the `selectable` boolean prop. **Crucially, use slots with names `#item-{header.value}` in the parent component to define the content of individual cells for columns (e.g., for action buttons). This component is used in multiple places, so changes should be made with caution.**

## Form Field Pattern (Mandatory pattern for all forms)

- All forms must use reusable components:
  - `TextInput.vue` — for text, email, password, and other single-line fields
  - `SelectInput.vue` — for dropdowns
  - `TextareaInput.vue` — for multi-line fields
  - `CheckboxInput.vue` — for checkboxes (consent, options, etc.)
  - `PhoneInput.vue` — for all phone fields (mask, required, errors, VeeValidate)
- These components are integrated with VeeValidate and provide:
  - Unified styling
  - Automatic positioning of the required label (asterisk)
  - Unified error handling
  - Correct `label` and accessibility support
- Direct use of `<input>`, `<select>`, `<textarea>`, `<Field as=...>`, `<input type='tel'>` in form templates is prohibited, except inside these components.
- Any new form or refactoring of an existing one must follow this pattern. 

### Centralized form styling
- Base styles for all input, select, textarea, label, errors, etc., are set centrally via @apply in the `BaseForm.vue` wrapper component.
- Within field components (TextInput, PhoneInput, SelectInput, TextareaInput, CheckboxInput), duplicating these Tailwind utilities is prohibited — only adding specific classes for special cases (e.g., required label, custom icon) is allowed.
- Buttons and utility classes (e.g., .sr-only for accessibility) can be styled separately.
- Any new form or refactoring of an existing one must follow this pattern. 

## Forms

### Reusable Form Components

-   **TextInput.vue**: For single-line text fields.
-   **SelectInput.vue**: For dropdown select fields.
-   **TextareaInput.vue**: For multi-line text areas.
-   **CheckboxInput.vue**: For single checkboxes.
-   **PhoneInput.vue**: For phone number input with masking.

All form fields **must** use these reusable components. Direct use of native `<input>`, `<select>`, or `<textarea>` elements is **prohibited** within application forms to ensure consistency, proper styling, validation, and accessibility.

### Centralized Form Styling with BaseForm.vue

All forms in the application **must** be wrapped by the `BaseForm.vue` component. This component provides:

-   **Centralized styling**: By applying the `.aero-form` class to the `<form>` tag, which is styled via `assets/css/forms.css`.
-   **VeeValidate integration**: Seamlessly handles form validation, submission, and error display.
-   **Standardized actions**: Provides default submit and cancel buttons via a dedicated slot.
-   **Feedback messages**: Displays success or error messages after form submission.

This pattern ensures consistent look and feel, unified validation logic, and simplified development for all forms in the application. Any custom buttons or form elements within `BaseForm.vue` should be placed in their respective slots. 

**Note:** All future entries and modifications to this memory bank should be written in English. 

## Global Modal System

The application utilizes a unified global modal system based on Vue 3, Pinia, and a dedicated host component (`GlobalModalHost.vue`). This system provides a consistent way to display various modal dialogs across the application and manage their lifecycle and data flow.

### Architecture

-   **Pinia Store (`stores/globalModal.js`):** Manages the state of the global modal, including whether it is open (`isOpen`), the component to be displayed (`component`), the props for that component (`props`), and the size of the modal (`size`).
-   **Global Modal Host Component (`components/GlobalModalHost.vue`):** This component is responsible for rendering the modal structure and the dynamic component specified in the Pinia store\'s `component` state. It listens to changes in the `globalModalStore` and conditionally renders the modal.
-   **Mounting Point:** The `GlobalModalHost.vue` component is mounted into a global container element with the class `.vue-app-mount-point`. This container is located within the `assets/partials/header.hbs` file, ensuring it is present on all pages that include the header.

### Usage

To open a modal, access the global store instance available on the window object and call the `openModal` action.

```javascript
// Access the global store instance
const globalModal = window.globalModalStore;

// Open a modal
try {
  const result = await globalModal.openModal(
    YourModalContentComponent, // Pass the component definition directly
    { yourProp1: value1, yourProp2: value2 }, // Pass props as the second argument (object)
    \'large\' // Pass size as the third argument (\'default\', \'small\', \'large\', \'full\')
  );

  // Handle the result when the modal is closed (e.g., form submitted)
  console.log(\'Modal closed with result:\', result);
  if (result && result.type === \'success\') {
    // Handle successful submission result.data
    console.log(\'Modal submitted successfully:\', result.data);\
  } else if (result && result.type === \'cancelled\') {
    // Handle modal cancellation
    console.log(\'Modal was cancelled.\');
  }

} catch (error) {
  // This catch block is for errors during modal opening or unexpected issues,
  // not typically for user cancellation if handled by the store\'s promise resolution.
  console.error(\'Error opening or interacting with modal:\', error);\
}
```

### `openModal` Function Signature

The `openModal` function in `globalModalStore` expects the following arguments:

1.  `modalComponent` (required): The Vue component definition to render inside the modal (e.g., `CreateSenderReceiverForm`).
2.  `modalProps` (optional, defaults to `{}`): An object containing props to pass to `modalComponent`.
3.  `modalSize` (optional, defaults to `\'default\'`): A string specifying the size of the modal box. Supported values are `\'default\'`, `\'small\'`, `\'large\'`, `\'full\'`.\

    **Modal Sizes and Corresponding Tailwind Classes (controlled by `GlobalModalHost.vue`):**

    *   `\'default\'`: Applies `max-w-md`. This is the standard moderate width for most forms and alerts.
    *   `\'small\'`: Applies `modal-box-sm`. This is a narrower size, typically used for very compact content.
    *   `\'large\'`: Applies `w-auto max-w-[calc(100vw-8rem)]`. This allows the modal to be wider, adapting to content up to a certain maximum width based on viewport.
    *   `\'full\'`: Applies `modal-box-full`. This makes the modal span almost the entire screen width and height.

The `openModal` function returns a Promise that resolves with an object `{ type: \'success\', data: result }` upon successful closure (e.g., form submission) or `{ type: \'cancelled\' }` if the modal is cancelled.

### Implementing Modal Content Components

Components intended to be displayed inside the global modal (e.g., `CreateSenderReceiverForm.vue`, `DeleteConfirmModal.vue`, `EmailSendModal.vue`) should:

-   **Focus solely on content**: These components should *only* contain the internal content of the modal (e.g., form fields, text, images). They must *not* include any modal-specific HTML structure (like `<div class="modal">`, `<div class="modal-backdrop">`, `<div class="modal-box">`, or close buttons). This structure is provided by the `GlobalModalHost.vue` component.
-   **Avoid `modalManager`**: They must *not* import or use `modalManager` or any other legacy modal management system. The `GlobalModalHost` fully handles the modal\'s lifecycle.
-   **Define props**: Define props to receive data from the component that opens the modal (e.g., `initialData`, `isEdit`, `title`, `message`, `actId`).
-   **Emit events**: Emit specific events to communicate back to the component that opened the modal. By convention, the `GlobalModalHost` listens for `submit` (with result data) and `cancel` (or `close`) events. Emitting one of these events will trigger the resolution of the Promise returned by `openModal` in the calling component. Avoid using `setTimeout` for closing the modal within these content components; let the `GlobalModalHost` handle the closure based on emitted events.
-   **Rely on GlobalModalHost for visibility**: Avoid managing their own modal visibility state (e.g., `onMounted` hooks to attach/initialize modal instances). They should rely entirely on the `GlobalModalHost` and the Pinia store to control their display.

This pattern ensures consistency and simplifies the implementation of new modal interactions across the application. 

## Паттерн: Универсальная реактивная связь поиска с таблицей (EasyDataTableWrapper)

**Описание:**
Для поддержки как внешнего управления поиском (через v-model:searchValue), так и стандартного внутреннего поиска библиотеки, используйте computed-модель, которая работает и с prop, и с локальным ref.

**Реализация:**
```js
const localSearchValue = ref(props.initialSearchValue);
const searchValueModel = computed({
  get: () => props.searchValue !== undefined ? props.searchValue : localSearchValue.value,
  set: (val) => {
    if (props.searchValue !== undefined) {
      emit('update:searchValue', val);
    } else {
      localSearchValue.value = val;
    }
    emit('update:search', val);
  }
});
```

**В шаблоне:**
```vue
<input v-model="searchValueModel" ... />
<EasyDataTable :search-value="searchValueModel" ... />
```

- Если используется внешний v-model:searchValue — поиск управляется снаружи.
- Если не используется — работает внутренний поиск библиотеки.
- Поддерживается и кастомное поле поиска через слот, и стандартное поле библиотеки.

**Где применять:**
- Для всех универсальных таблиц, где может понадобиться как внешний, так и внутренний поиск. 