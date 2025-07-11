# Progress

## What Works ✅

- ✅ **COMPLETED**: Unified global modal system using Vue 3, Pinia, and `GlobalModalHost.vue`.
- ✅ **COMPLETED**: All major modals work consistently across all pages (login, become a client, email submission, sender/receiver creation/editing/deletion).
- ✅ **COMPLETED**: All import errors resolved.
- ✅ **COMPLETED**: All main and sub-menu items exist and are linked.
- ✅ **COMPLETED**: Mobile menu: two-level structure, toggles, animated SVG arrow.
- ✅ **COMPLETED**: Stub pages for each menu item.
- ✅ **COMPLETED**: JS logic for submenu toggling in the mobile menu.
- ✅ **COMPLETED**: Service acts page with List.js sorting and pagination (Vue integration pending).
- ✅ **COMPLETED**: Tables on `senders-receivers.html` and `service-acts.html` refactored to use a reusable Vue 3 component `EasyDataTableWrapper.vue` based on `vue3-easy-data-table`, replacing List.js. Pagination color and spacing are styled using the `theme-color` prop and CSS variables.
- ✅ **COMPLETED**: DaisyUI theme system implemented.
- ✅ **COMPLETED**: All pages use a consistent modal structure (div-based, not dialog).
- ✅ **UPDATED**: V-Calendar date picker styling improved in `assets/css/main.css`.
- Vite updated to 6.3.5; Handlebars processing seems functional with deprecation warnings.
- ✅ **COMPLETED**: Vue 3 Date Range Picker island component integrated on `service-acts.html` and `news.html`.
- ✅ **COMPLETED**: "Modal was cancelled" console errors resolved by switching `globalModal` to always resolve promises with `success` or `cancelled` flags.
- ✅ **COMPLETED**: Login button logic moved to `global-ui.js` for universal accessibility.
- ✅ **COMPLETED**: News modal refactored to use the unified global Vue 3 modal system.
- ✅ **COMPLETED**: Old static news modal HTML removed from `news.html`.
- ✅ **COMPLETED**: `assets/vue/components/modals/NewsDetailModal.vue` created for news details.
- ✅ **COMPLETED**: `assets/js/modules/news-page.js` updated to use `window.globalModalStore.openModal` with `NewsDetailModal` and correct parameter passing.
- ✅ **COMPLETED**: `assets/vue/stores/globalModal.js` updated to include `size` parameter in `openModal` and manage it in state.
- ✅ **COMPLETED**: `assets/vue/components/GlobalModalHost.vue` updated to dynamically apply DaisyUI size classes (`w-auto max-w-[calc(100vw-8rem)]` for `'large'`, `max-w-md` for `'default'`) to the modal-box.
- ✅ **COMPLETED**: Replaced news slider/carousel on the main page with a grid of the latest 3 news using a Vue component (`HomePageNews.vue`) and integration with the global modal system for details.
- ✅ **COMPLETED**: Added 'isNew' indicator (SVG) to news cards on the main page.
- ✅ **COMPLETED**: Changed 'Become a Client' button on index.html to direct link to user-create.html.
- ✅ **COMPLETED**: Removed JavaScript code in assets/js/page-entrypoints/index.js that triggered the 'Become a Client' modal.
- ✅ **COMPLETED**: Removed BecomeClientForm.vue component as it is no longer used.
- ✅ **COMPLETED**: Cargo Calculator Forms Refactoring:
  - **Per-Place Parameters**: Refactored cargo parameters (description, declared value, packaging, self-marking, dangerous goods, temperature control) to apply to each individual package/place, enabling granular control.
  - **State Persistence**: Resolved data loss when switching between "Places individually" and "Total weight/volume" modes, and between individual place tabs, ensuring all data is retained.
  - **Quantity Counter**: Implemented a quantity counter system for identical packages, replacing duplicate functionality and updating calculations to account for quantity.
  - **Detailed Breakdown**: Enhanced calculation result display with detailed per-place breakdowns, including costs, multipliers, and tariff coefficients.
  - **VeeValidate Removal**: Replaced VeeValidate-based form components (`TextInput`, `SelectInput`, `CheckboxInput`) within the calculator with custom, simpler Vue components (`CalculatorTextInput`, `CalculatorSelectInput`, `CalculatorCheckboxInput`), resolving display and state synchronization issues.
  - **Formatted Inputs**: Implemented intelligent formatting for numerical input fields (length, width, height, weight, declared value) in `CalculatorTextInput.vue`, displaying values with prefixes/suffixes (e.g., "Длина 200 см") on blur, and raw values on focus.

## Modal System Status ✅

- **Implementation**: Unified global modal system using Vue 3, Pinia, and DaisyUI.
- **Host Component**: `GlobalModalHost.vue` centrally manages modal structure and behavior.
- **State Management**: Pinia store (`globalModal.js`) manages modal state (open/close, component, props, size).
- **Structure**: All modals use DaisyUI classes for consistent styling.
- **Behavior**: Consistent closing on Escape, backdrop click, close buttons. Promise-based results (success/cancellation) instead of rejections for cancellation.
- **Sizes**: Support for small, default (`max-w-md`), large (`w-auto max-w-[calc(100vw-8rem)]`), full sizes.
- **Pages**: index.html, profile.html, news.html, service-acts.html, senders-receivers.html
- **JavaScript**: All relevant modules updated to use the global modal store.
- **Testing**: `modal-test.html` (if still relevant) created for comprehensive testing.

## What's Left to Do

- Continue refactoring existing native JavaScript forms and dynamic elements into Vue 3 components.
- Implement and integrate other Vue 3 components beyond the date range picker.
- Refactor the entire news page to use Vue 3 components for news grid, pagination, and date filtering, using test data from `assets/data/news.json` for MVP.
- Integration with a real Bitrix CMS API for news data (future phase).
- Address potential Handlebars template issues after Vite upgrade.

## Current Status

- ✅ Project design for navigation and menus is compliant.
- ✅ All navigation points are functional.
- ✅ Unified global modal system is fully implemented and works as expected.
- ✅ All import errors resolved.
- ✅ All major functionality tested and verified.
- ✅ Ready for new features and continued refactoring.
- Vite updated to 6.3.5, Vue 3 dependencies added.
- Vue 3 Date Range Picker component integrated as an island on `service-acts.html` and `news.html`.
- News modal refactored to use the unified global Vue 3 modal system.
- Asset handling strategy in `vite.config.js` implemented and works as expected.
- ✅ **COMPLETED**: News block on the main page is now a functional Vue component displaying the latest 3 news and using the global modal for details, including an 'isNew' indicator.
- ✅ **COMPLETED**: 'Become a Client' button on index.html now directly links to user-create.html, and related modal logic and component were removed.
- Current focus on refactoring other sections/components.
- ✅ **COMPLETED**: Tables on `senders-receivers.html` and `service-acts.html` have been refactored to use a reusable Vue 3 component `EasyDataTableWrapper.vue` based on `vue3-easy-data-table`, ensuring unified sorting, filtering, and pagination.
- ✅ **COMPLETED**: Cargo Calculator forms have been refactored to use independent states for different modes, ensuring data persistence and improved UX with intelligent input formatting.

## Known Issues (Resolved)

- ~~Consistent modal behavior across all pages~~ ✅ FIXED
- ~~Import errors with deleted modal files~~ ✅ FIXED
- ~~Inconsistent modal structures~~ ✅ FIXED
- ~~Button click handlers not working~~ ✅ FIXED
- ~~"Modal was cancelled" console errors~~ ✅ FIXED
- ~~News modal does not use unified system~~ ✅ FIXED
- ~~All modals became large due to incorrect size application~~ ✅ FIXED
- ~~Service acts page with List.js sorting and pagination~~ ✅ REPLACED with `EasyDataTableWrapper.vue`
- ~~Cargo calculator parameters (description, declared value, etc.) were globally applied instead of per-place.~~ ✅ FIXED
- ~~Cargo calculator data not persisting when switching between modes or tabs.~~ ✅ FIXED
- ~~Cargo calculator input fields not displaying saved values correctly.~~ ✅ FIXED

## Remaining Minor Issues

- Minor animation refinement might be needed.
- Accessibility/keyboard navigation for mobile menu (review).
- Some styles might be moved to the main stylesheet (optional).
- Deprecation warnings from `vite-plugin-handlebars` with Vite 6.3.5.

## Base Project Structure ✅

- ✅ Base project structure.
- ✅ Main pages.
- ✅ Build system (Vite with asset categorization).
- ✅ Tailwind-based styling.
- ✅ DaisyUI integration.
- ✅ Unified global modal system.
- `assets/vue/`: New directory for Vue 3 components, stores, views, etc.
- `assets/vue/components/DateRangePickerVue.vue`: Vue 3 date range picker component.
- `assets/vue/entrypoints/lk-datepicker.js`: Entry point for mounting Vue date picker component.
- `assets/vue/components/forms/`: New directory for reusable Vue form components.
- `assets/vue/components/modals/NewsDetailModal.vue`: New component for news detail modal.
- `assets/vue/components/HomePageNews.vue`: New component for displaying news on the main page.
- `assets/vue/components/tables/EasyDataTableWrapper.vue`: Reusable Vue component for data tables.
- `assets/vue/components/pages/calculator/CalculatorTextInput.vue`: New custom text input component for calculator forms (without VeeValidate).
- `assets/vue/components/pages/calculator/CalculatorSelectInput.vue`: New custom select input component for calculator forms (without VeeValidate).
- `assets/vue/components/pages/calculator/CalculatorCheckboxInput.vue`: New custom checkbox input component for calculator forms (without VeeValidate).

## Reusable Patterns & Modules ✅

- ✅ All pages use header/footer/global modal host partials for layout consistency.
- ✅ **Global Modal System**: Universal modal system using Vue 3, Pinia, and `GlobalModalHost.vue`.
- ✅ PhoneValidator class for phone input mask/validation (+7/8, works on blur, no input blocking) - _to be refactored into Vue/VeeValidate_.
- ✅ Pagination class for lists (news, offices, vacancies).
- ✅ UI logic is modular, page-specific logic is separated.
- ✅ **Table Component**: Implementation of a reusable Vue component (`EasyDataTableWrapper.vue`) based on `vue3-easy-data-table` for consistent table sorting, filtering, and pagination on relevant pages.
- ✅ Tailwind utilities for all styling needs.
- ✅ DaisyUI components for consistent UI.
- ✅ TableManager for consistent table functionality.
- ✅ **Table Component Pattern**: Using `EasyDataTableWrapper.vue` for unified table UI/UX.
- ~~**FORMS AND VALIDATION:** VeeValidate for form management and validation.~~
- ~~**FORMS AND VALIDATION:** Standardized Vue input components for various field types.~~
- ~~**FORMS AND VALIDATION:** Form message component for success/error feedback.~~
- ✅ **FORMS AND VALIDATION (Calculator Specific):** Custom Vue input components (`CalculatorTextInput`, `CalculatorSelectInput`, `CalculatorCheckboxInput`) are now used for the calculator, providing specific formatting and state management without VeeValidate.

## Files Status

### ✅ Working Files

- `global-ui.js` (new unified system for global UI interactions).
- `home-page.js` (updated).
- `news-page.js` (updated).
- `service-acts-page.js` (updated + fixed).
- `senders-receivers-page.js` (fully refactored).
- `main.js` (updated with `globalModalStore` access).
- All Vue components (e.g., `BecomeClientForm.vue`, `LoginForm.vue`, `SendEmailForm.vue`, `CreateSenderReceiverForm.vue`, `DeleteConfirmModal.vue`, `DateRangePickerVue.vue`, `GlobalModalHost.vue`, `NewsDetailModal.vue`, `HomePageNews.vue`, `EasyDataTableWrapper.vue`).
- `assets/vue/components/pages/calculator/CalculatorPage.vue` (updated).
- `assets/vue/components/pages/calculator/CargoParamsForm.vue` (updated).
- `assets/vue/components/pages/calculator/CargoPlaceForm.vue` (updated).
- `assets/vue/components/pages/calculator/CargoPlacesTabs.vue` (updated).
- `assets/vue/components/pages/calculator/CalculatorTextInput.vue` (NEW, implemented).
- `assets/vue/components/pages/calculator/CalculatorSelectInput.vue` (NEW, implemented).
- `assets/vue/components/pages/calculator/CalculatorCheckboxInput.vue` (NEW, implemented).
- `index.html` (Updated)
- `assets/js/modules/home-page.js` (Updated)

### ❌ Deleted Files

- `modal.js` (old system).
- `modal2.js` (old system).
- `modal-templates.hbs` (old templates).
- `daisy-modal.hbs` (old templates).
- `app.js` (old file).
- `modal-test.js` (old test file).
- `ModalCancelledError.js` (custom error class).
- `date-range-picker.js` (replaced by Vue component).
- `assets/vue/components/forms/BecomeClientForm.vue` (Deleted).
- `List.js` (Old table library, replaced by vue3-easy-data-table).
- `demo-test.html` (Deleted by user).
- `CHANGELOG.md` (Deleted by user).
- `demo-detailed-calculation.md` (Deleted by user).

## Progress Summary

- **What's Working:**

  - Vue 3 setup with Vite, Pinia, DaisyUI, Tailwind CSS is functional.
  - Global modal system (`GlobalModalHost.vue`) is implemented and correctly works with Vue components like `NewsDetailModal.vue`.
  - Date range filtering for news (`NewsPageContainer.vue`, `DateRangeFilter.vue`, `DateRangePickerVue.vue`) is successfully implemented and filters news based on selected range, including setting a default initial range and live updates/clearing.
  - News data is loaded from `assets/data/news.json`.
  - Basic news grid display (`NewsGrid.vue`) and card rendering (`NewsCard.vue`) match the original HTML structure and styling.
  - ✅ **COMPLETED**: News block on the main page is now a functional Vue component displaying the latest 3 news and using the global modal for details, including an 'isNew' indicator.
  - ✅ **COMPLETED**: 'Become a Client' button on index.html now directly links to user-create.html, and related modal logic and component were removed.
  - ✅ **COMPLETED**: Tables on `senders-receivers.html` and `service-acts.html` have been refactored to use a reusable Vue 3 component `EasyDataTableWrapper.vue` based on `vue3-easy-data-table`, ensuring unified sorting, filtering, and pagination.
  - ✅ **COMPLETED**: Cargo Calculator forms have been thoroughly refactored to ensure robust state management across different modes and tabs, with intelligent input formatting and the replacement of VeeValidate with custom components.

- **What's Left to Do:**

  - Vue pagination component (`NewsPagination.vue`) needs to be fully integrated and handle page changes, including updating displayed news and scrolling.
  - Integration with a real Bitrix CMS API for news data (future phase).
  - Refactoring of other pages/modules to Vue 3.

- **Current Status:** Core functionality (data loading, filtering, modal display) for the MVP news page refactoring is complete. Pagination is the main remaining task for this phase. Tables on `senders-receivers.html` and `service-acts.html` successfully refactored to use `EasyDataTableWrapper.vue`. Cargo Calculator forms are now robust and user-friendly.

- **Known Issues:** No critical issues for the current scope. Minor styling adjustments might be needed during final polishing.

**Note:** All future entries and modifications to this memory bank should be written in English.
