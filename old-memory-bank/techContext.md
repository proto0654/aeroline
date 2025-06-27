# Technical Context

## Tech Context

**Core Technologies:**
- **Build Tool:** Vite
- **Bundler:** Rollup (integrated within Vite)
- **Templating:** Handlebars (`vite-plugin-handlebars`)
- **JavaScript Framework:** Vue 3 (`@vitejs/plugin-vue`)
- **State Management:** Pinia
- **CSS Pre/Post-processing:** PostCSS, TailwindCSS, Autoprefixer
- **File System Utilities:** `glob` (for dynamic input gathering), `path` (Node.js built-in)
- **Table Component:** `vue3-easy-data-table`

**Dependencies (Dev):**
- `vite`
- `@vitejs/plugin-vue`
- `vite-plugin-handlebars`
- `tailwindcss`
- `autoprefixer`
- `postcss`
- `glob`
- `pinia`
- `vee-validate`
- `yup`
- `vee-validate-i18n`
- `cpx` (previously used for copying, now removed from build script but may still be installed)
- `vue3-easy-data-table`
- ... (other project-specific dev dependencies from `package.json`)

**Dependencies (Prod):**
- `vue`
- `pinia`
- `vee-validate`
- `yup`
- `vee-validate-i18n`
- ... (other project-specific runtime dependencies)

**Development Setup:** Standard Node.js environment. Development server provided by Vite (`npm run dev`). The codebase promotes progressive refactoring of native JavaScript into modern Vue 3 components.

**Technical Constraints:**
- Compatibility with GitHub Pages static hosting.
- Need to handle a mix of plain JS modules and Vue components (with gradual migration of plain JS to Vue).
- Desire to keep the output `docs` folder structure similar to the source `assets`.

**Environment:** Windows 11, PowerShell terminal.

## Technologies Used
- Vite (build tool)
- Tailwind CSS (styling)
- DaisyUI (UI components)
- Vue 3 (dynamic components and UI)
- Pinia (state management)
- JavaScript (interactivity, gradually being refactored to Vue)
- HTML5 (structure)
- List.js (table sorting and pagination)
- Swiper (sliders)
- V-Calendar (for date selection)
- vue3-easy-data-table (table component)

## Technical Stack
- Vite as a build tool
- Tailwind CSS for styling
- DaisyUI for UI components
- Vue 3 for dynamic components and UI
- Pinia for state management
- JavaScript for interactivity (gradually being refactored to Vue)
- HTML5 for structure
- Swiper for sliders
- List.js for table functionality (being reviewed for Vue integration, will be refactored to Vue)
- vue3-easy-data-table for table functionality
- VeeValidate for form validation in Vue components.
- **Mock Data**: Currently using local JSON files from the `assets/data/` directory for MVP features (e.g., `news.json`, `service-acts.json`).
- **Date Range Picker**: Using the `vue-datepicker-next` library for date range selection. The component `assets/vue/components/DateRangePickerVue.vue` wraps this library to provide a standardized interface. It accepts an `initialRange` prop (`[Date | null, Date | null]`) and emits an `update:range` event (`{ start: Date | null, end: Date | null }`) on selection change or clear. A page-specific wrapper like `assets/vue/components/pages/news/DateRangeFilter.vue` can be used to pass individual start/end dates and remap the event name if needed.

## Development Setup
- `npm install` for dependencies
- `npm run dev` for local development with Vite
- `npm run build` for production build
- Node.js environment
- **NOTE:** When refactoring old page-specific JavaScript entry points (e.g., in `assets/js/modules/`) to new Vue entry points (e.g., in `assets/vue/entrypoints/`), remember to update the `rollupOptions.input` section in `vite.config.js` to remove the old JS file and include the new Vue entry point.

## Dependencies
Main dependencies:
- Vite for builds
- Tailwind CSS for styles
- DaisyUI for UI components
- Vue 3
- Pinia
- VeeValidate
- Yup
- VeeValidate-i18n
- PostCSS for CSS processing
- Various plugins for optimization
- Custom JS modules for UI (menu, toggles, etc.)
- List.js for table functionality
- vue3-easy-data-table for table functionality
- Swiper for sliders

## Technical Constraints
1. Support for modern browsers
2. Performance optimization
3. Accessibility (WCAG)
4. Responsive design
5. All navigation/menu items must have a corresponding HTML page
6. Mobile menu uses JS for toggles and animation (accordion pattern)
7. SVG icons for menu toggles (from vacancies)
8. All styling must use Tailwind utilities
9. Table sorting, filtering, and pagination must use `vue3-easy-data-table` via the `EasyDataTableWrapper.vue` component
10. Modal system must use unified global Vue 3 / Pinia system with `GlobalModalHost.vue`
11. Consistent UI patterns across all pages
12. Progressive refactoring of native JavaScript UI to Vue 3 components.
13. **Future CMS Integration**: The long-term goal is to integrate with Bitrix CMS. Current MVP features are built with mock data and a component-based approach that should facilitate this transition. APIs from Bitrix CMS will be consumed in the future.
14. **Table Component**: Implementation of a reusable Vue component (`EasyDataTableWrapper.vue`) based on `vue3-easy-data-table` for consistent table sorting, filtering, and pagination across relevant pages.

## Build Process
1. Development with Vite
2. CSS build with Tailwind
3. Resource optimization
4. Code minification (disabled for transparency)
5. DaisyUI theme compilation

## Development Workflow
1. Local development
2. Testing
3. Build
4. Deploy

## Environment Requirements
- Node.js
- npm/yarn
- Git
- Modern browser

## UI Components
- Unified global modal system using Vue 3, Pinia, and `GlobalModalHost.vue`
- DaisyUI form components (integrated with VeeValidate)
- DaisyUI navigation components
- V-Calendar component with custom styling
- Custom Vue components for interactive elements

## Asset Handling Strategy
The project now uses a custom asset handling strategy in Vite configuration to maintain consistent output directory structure:

- **Explicit Asset Organization:** Assets are explicitly categorized by file extension and placed in appropriate subdirectories.
- **Asset Categories:**
  - Images (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`, `.svg`, `.ico`) → `assets/img/`
  - CSS files → `assets/css/`
  - Fonts (`.woff`, `.woff2`, `.ttf`, `.eot`, `.otf`) → `assets/fonts/`
  - JSON data files → `assets/data/`
  - JavaScript entry points → `assets/js/`
  - JavaScript chunks → `assets/js/chunks/`
  
- **Explicit Configuration:** This approach uses a custom function in `assetFileNames` that analyzes each file's extension and explicitly assigns it to the correct output directory.
- **Consistent Structure:** The explicit categorization ensures that all processed assets maintain a consistent structure in the output directory regardless of their source location.
- **Filename Hashing:** All asset filenames include a content hash for cache busting. 

### DateRangePickerVue Component (`assets/vue/components/DateRangePickerVue.vue`)

**Description**:
A reusable Vue 3 component that wraps the `vue-datepicker-next` library to provide a standardized date range selection interface. It is designed for consistency across the application and integrated with VeeValidate for form validation.

**Usage**:
This component can be used directly or wrapped by a page-specific component (e.g., `DateRangeFilter.vue`) to adapt to specific page logic or prop remapping.

**Props**:
- `initialRange` (Type: `Array`, Default: `[null, null]`, Format: `[Date | null, Date | null]`):
  The initial date range to display in the picker. It's recommended to pass `[null, null]` as a default if no initial selection is needed.
- `placeholder` (Type: `String`, Default: `'Выберите период'`):
  Text displayed in the input field when no date range is selected.

**Events**:
- `update:range` (Payload: `{ start: Date | null, end: Date | null }`):
  Emitted when the selected date range changes or is cleared. The payload contains an object with `start` and `end` Date objects, or `null` if the selection is cleared.
  This event supports `v-model:range` for two-way binding.

**Methods (exposed via `defineExpose`)**:
- `clearSelection()`:
  Resets the date picker's selected range to `null`. This method can be called from the parent component using a `ref` on `DateRangePickerVue`.

**Example Usage in a Parent Component (e.g., `RequestActForm.vue`)**:
```vue
<template>
  <DateRangePickerVue
    name="dateRange"
    :initial-range="initialDateRange"
    placeholder="Выберите период для акта сверки"
    v-model:range="dateRangeValue"
    ref="datePickerRef"
  />
</template>

<script setup>
import { ref } from 'vue';
import DateRangePickerVue from '../DateRangePickerVue.vue';

// Define the initial date range prop if the component expects one
const props = defineProps({
  initialDateRange: {
    type: Array,
    default: () => [null, null]
  }
});

// For v-model:range integration with VeeValidate
const dateRangeValue = ref(props.initialDateRange);

// Ref to access the clearSelection method
const datePickerRef = ref(null);

// Example of clearing selection programmatically
const handleClearDates = () => {
  if (datePickerRef.value && datePickerRef.value.clearSelection) {
    datePickerRef.value.clearSelection();
  }
};
</script>
```

**Dependencies**:
- `vue-datepicker-next` (library)
- `vue-datepicker-next/index.css` (basic styles)
- `vue-datepicker-next/locale/ru.es` (Russian localization)

**Styling**:
Basic styles are provided by `vue-datepicker-next/index.css`. Further customization can be done via global CSS or scoped styles within parent components to match DaisyUI/Tailwind.

**Integration with VeeValidate**:
When used in forms, the component's `v-model:range` can be bound to a VeeValidate field (`useField`) to enable validation of the date range. A custom Yup schema can be used to ensure both `start` and `end` dates are selected. 