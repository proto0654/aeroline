# Active Context

## Current Focus

- ✅ COMPLETED: Implemented a unified global modal system using Vue 3, Pinia, and DaisyUI.
- ✅ COMPLETED: All major modals (login, email submission, sender/receiver creation/editing/deletion) migrated to the new unified Vue 3 system.
- ✅ COMPLETED: All import errors and modal functionalities fixed, including "Modal was cancelled" console messages.
- All main and sub-menu items created and linked.
- Mobile menu fully compliant with design: two levels, toggles, animated arrow.
- Stub pages implemented for all menu items.
- JS logic for mobile menu toggles implemented.
- Implementation and optimization of service acts page.
- ✅ COMPLETED: Styling and refinement of UI components, such as V-Calendar.
- ✅ COMPLETED: Vue 3 integration for personal account (MVP) - using the latest stable Vue 3 version.
- ✅ COMPLETED: Date range picker component implemented using Vue 3 and test JSON data via bundler.
- Project currently uses Vite 4.
- ✅ COMPLETED: Replaced date picker vanilla-calendar-pro with a reusable Vue 3 island component on `service-acts.html` and `news.html`.
- ✅ COMPLETED: News detail modal refactored to use the unified global Vue 3 modal system.
- ✅ COMPLETED: Refactored the entire news page (`news.html`) to use Vue 3 components for news grid, pagination, and date filtering. This is an MVP using test data from `assets/data/news.json` with a future plan for Bitrix CMS integration.
- ✅ COMPLETED: Tables on `senders-receivers.html` and `service-acts.html` refactored to use a reusable Vue 3 component `EasyDataTableWrapper.vue` based on `vue3-easy-data-table`, replacing List.js.
- Adapted existing JavaScript files (`service-acts-page.js`, `news-page.js`) to interact with new Vue components.
- Ensured correct integration works both in development and after the Vite build process.
- Handlebars is used for server-side rendering of parts of MVP pages, with Vue islands for interactive components.
- ✅ COMPLETED: News block on the main page implemented as a Vue component, replacing old slider/carousel logic.
- ➡️ Current Task: Continue working on other project features, prioritizing refactoring existing forms and dynamic elements into Vue 3 components.

## Recent Changes (Latest Session)

- ✅ FIXED: Corrected import paths in `assets/js/modules/home-page.js`.
- ✅ FIXED: Removed local Pinia initialization in `assets/js/modules/home-page.js` to use global instance.
- ✅ FIXED: Fixed prop name passed to `NewsDetailModal.vue` from `newsItem` to `news` in `HomePageNews.vue`.
- ✅ FIXED: Ensured `news.content` is used for full news text in `NewsDetailModal.vue`.
- ✅ IMPLEMENTED: Created `assets/vue/components/HomePageNews.vue` to display the latest 3 news in a grid on the main page.
- ✅ UPDATED: Modified `index.html` to include a container for `HomePageNews.vue` and removed the old news HTML block.
- ✅ UPDATED: Modified `assets/js/modules/home-page.js` to remove old news carousel logic and mount `HomePageNews.vue`.
- ✅ IMPLEMENTED: Added 'isNew' indicator with SVG to news cards in `HomePageNews.vue`.
- ✅ IMPLEMENTED: Changed 'Become a Client' button on index.html to direct link to user-create.html.
- ✅ DELETED: Removed JavaScript code in assets/js/page-entrypoints/index.js that triggered the 'Become a Client' modal.
- ✅ DELETED: Removed BecomeClientForm.vue component as it is no longer used.
- ✅ IMPLEMENTED: Refactored tables on `senders-receivers.html` and `service-acts.html` to use `EasyDataTableWrapper.vue`.
- Minor layout adjustments were made and accepted in `HomePageNews.vue`.
- ✅ FIXED: Fixed build error "Could not resolve entry module" by removing reference to assets/js/modules/news-page.js from vite.config.js.

## Modal System Status

- **Implementation**: Unified global modal system using Vue 3, Pinia, and DaisyUI.
- **Host Component**: `GlobalModalHost.vue` centrally manages modal structure and behavior.
- **State Management**: Pinia store (`globalModal.js`) manages modal state (open/close, component, props, size).
- **Structure**: All modals use DaisyUI classes for consistent styling.
- **Behavior**: Consistent closing on Escape, backdrop click, close buttons. Promise-based results (success/cancellation) instead of rejections for cancellation.
- **Sizes**: Support for small, default (`max-w-md`), large (`w-auto max-w-[calc(100vw-8rem)]`), full sizes.
- **Updated Pages**:
  - ✅ index.html (client login modal)
  - ✅ profile.html (password/email change modals)
  - ✅ news.html (news detail modal - _now uses unified system_)
  - ✅ service-acts.html (email submission modal)
  - ✅ senders-receivers.html (create/edit/delete modals)

## JavaScript Modules Status

- ✅ global-ui.js: New module for global UI interactions (e.g., login modal button), integrated into `header.hbs`.
- ✅ modal-manager.js: Removed from direct use by Vue components; now primarily used by global UI modules for general modal behavior (should be removed after refactoring all native modals).
- ✅ home-page.js: Updated to use the new modal system.
- ✅ news-page.js: Updated to use the new modal system and Vue date picker (_now also uses the new global modal for news details_).
- ✅ service-acts-page.js: Updated to use the new modal system and Vue date picker, click handler fixed.
- ✅ senders-receivers-page.js: Fully refactored to use the new modal system.
- ✅ senders-receivers-page.js: Refactored to use Vue 3 component `EasyDataTableWrapper.vue` for table handling.
- ✅ service-acts-page.js: Updated to work with Vue 3 component `EasyDataTableWrapper.vue` for table handling, preserving form mounting logic.
- ✅ main.js: Imports and makes globalModalStore globally accessible.
- ❌ DELETED: modal.js, modal2.js (old systems), `ModalCancelledError.js`.
- ✅ UPDATED: `service-acts-page.js` and `news-page.js` updated to use Vue date picker component.

## Next Steps

- Continue working on other project features, prioritizing refactoring existing forms and dynamic elements into Vue 3 components.
- Identify and migrate remaining native JavaScript UI interactions to Vue 3 components where beneficial.
- Ensure strict adherence to unified Vue 3 / Pinia / DaisyUI patterns for all new pages and features.
- Plan and execute Vite upgrade to the latest stable version (if not already done).
- Address potential Handlebars template issues after Vite upgrade.
- **FORMS AND VALIDATION:** Continue implementing unified, reusable Vue 3 form components with VeeValidate.
  - Identify next forms for refactoring (e.g., any remaining forms in profile, other pages).
  - Create base Vue input components (text, select, textarea, checkbox, radio) integrated with VeeValidate for validation messages per field.
  - Implement form-level success/error messages at the bottom of the form using DaisyUI `alert` components.
  - Account for diverse and custom field types.
  - Implement base form submission logic (console log, alert) as a temporary placeholder for API integration.
- **BITRIX CMS INTEGRATION:** (Future) Plan and implement integration with Bitrix CMS for news data and other dynamic content.

## Active Decisions

- All modals MUST use the unified global Vue 3 / Pinia modal system (`GlobalModalHost.vue`).
- No more `dialog` elements - only `div`-based modals.
- Consistent behavior for all modals (closing, opening, promise resolution).
- `window.globalModalStore` is available for direct Pinia store access.
- All menu items must have a page.
- Mobile menu must precisely match design.
- Use Tailwind utilities instead of custom CSS.
- Maintain table sorting functionality only in headers.
- Using Vite 4 currently; planning to upgrade to the latest stable version.
- Vue 3 integration initially for MVP personal account, extending to other dynamic UI.
- Handlebars is only used for MVP templates (likely for test data).
- Vite upgrade needs careful management due to potential conflicts with Handlebars.
- New date range picker is a reusable Vue 3 island component.
- **FORMS AND VALIDATION:** Use VeeValidate for all Vue 3 form validation and management.
- **FORMS AND VALIDATION:** Form-level messages (success/error) will be displayed at the bottom of the form using DaisyUI alert components. Individual field errors will be displayed below their respective fields.
- **FORMS AND VALIDATION:** All forms will be built as reusable Vue components to handle diverse field types and custom validation.
- **FORMS AND VALIDATION:** Initial form submission will use `console.log` and `alert` as placeholders for future API integration.
- **REFACTORING STRATEGY:** Gradual replacement of native JavaScript UI logic with Vue 3 components, prioritizing interactive elements and forms.
- **NEWS PAGE:** News page refactoring is an MVP (Minimum Viable Product) and will initially use test data from `assets/data/news.json`. Future integration with Bitrix CMS API for data and API will be implemented.
- **NEWS ON MAIN PAGE:** The news block on the main page is now a Vue component (`HomePageNews.vue`) displaying the latest 3 news in a grid. It uses the global modal system with `NewsDetailModal.vue` to display full news content.
- **REFACTORING STRATEGY:** Gradual replacement of native JavaScript UI logic with Vue 3 components, prioritizing interactive elements and forms.

## Known Issues (Resolved)

- ~~Consistent modal behavior across all pages~~ ✅ FIXED
- ~~News modal does not use unified system~~ ✅ FIXED
- ~~All modals became large due to incorrect size application~~ ✅ FIXED
- ~~Service acts page with List.js sorting and pagination~~ ✅ REPLACED with `EasyDataTableWrapper.vue`
- ~~Build error "Could not resolve entry module assets/js/modules/news-page.js"~~ ✅ FIXED

## Remaining Minor Issues

- ~~Consistent modal behavior across all pages~~ ✅ FIXED
- ~~News modal does not use unified system~~ ✅ FIXED
- ~~All modals became large due to incorrect size application~~ ✅ FIXED
- ~~Service acts page with List.js sorting and pagination~~ ✅ REPLACED with `EasyDataTableWrapper.vue`
- ~~Build error "Could not resolve entry module assets/js/modules/news-page.js"~~ ✅ FIXED

## Current Considerations

- The global modal system is now fully unified and consistent, with `console.error` messages for cancellation resolved.
- All import errors resolved.
- All major modal functionality tested and working.
- V-Calendar date picker styling updated and improved.
- Ready for new features and continued refactoring.
- Future Bitrix CMS integration needs to be considered while focusing on current MVP.
- Current `vite-plugin-handlebars` generates deprecated API warnings with Vite 6.3.5, but appears functional for now.
- **Modal Sizes**: `GlobalModalHost.vue` now supports dynamic sizing, with `large` modals adapting width (`w-auto max-w-[calc(100vw-8rem)]`) and `default` modals explicitly set to `max-w-md`.
- **NEWS PAGE:** News data is currently sourced from `assets/data/news.json`. This is a temporary solution for MVP.
- **NEWS ON MAIN PAGE:** The news block on the main page is now a functional Vue component displaying the latest 3 news and using the global modal for details.

## UI/Frontend Structure

- All pages use partials for header, footer, and a single global modal host (Handlebars).
- Main sections (carousel, forms, cards, map, news, etc.) are rendered via template variables.
- Profile page: two columns (user data, account details), pop-up modals for password/email change via Vue components.
- Navigation: two-level, mobile menu with accordion logic.
- Universal global modal container (`GlobalModalHost.vue`) included on every page via `header.hbs`.
- All forms with phone input use PhoneValidator (mask +7/8, validates on blur, no input blocking) - _to be refactored into Vue/VeeValidate_.
- Service acts page uses List.js for sorting and pagination with Tailwind utilities - _consider Vue integration_.
- Modal system uses DaisyUI components with custom Pinia store for consistent behavior.

## Current Work Focus:

✅ **COMPLETED:** Implemented correct asset handling strategy in `vite.config.js` to automatically place all processed assets (CSS, images, fonts, SVG, etc.) in the `docs/assets/` directory while preserving their original subfolder structure from the source `assets/` directory and adding hashes to filenames.
✅ **COMPLETED:** Refactored news page to Vue 3 components (MVP with test data).
✅ **COMPLETED:** Replaced news slider/carousel on the main page with a Vue component displaying the latest 3 news in a grid, with global modal integration for details.
➡️ **CURRENTLY:** Continuing work on other project features and refactoring.

## Recent Changes:

- ✅ **IMPLEMENTED:** Created `assets/vue/components/HomePageNews.vue` and integrated into `index.html`.
- ✅ **DELETED:** Old news carousel logic from `assets/js/modules/home-page.js`.
- ✅ **FIXED:** Fixed import paths and Pinia initialization in `assets/js/modules/home-page.js`.
- ✅ **FIXED:** Fixed prop passing and content display in `HomePageNews.vue` and `NewsDetailModal.vue`.
- ✅ **IMPLEMENTED:** Added 'isNew' indicator (SVG) to news cards on the main page.

## Current State:

Asset handling strategy has been successfully implemented with an explicit categorization approach. Instead of trying to deduce the output directory from the source path, we now categorize assets by their file extension:

- Images go to `assets/img/`
- CSS files go to `assets/css/`
- Fonts go to `assets/fonts/`
- Data files go to `assets/data/`
- JS entry points go to `assets/js/`
- JS chunks go to `assets/js/chunks/`

This approach ensures a clean, organized output directory structure that is easy to maintain and understand.

News block on the main page is now a functional Vue component, displaying the latest 3 news and using the global modal for details.

## Next Steps:

1. Continue planned Vue 3 integration for MVP personal account features.
2. Implement and integrate other Vue 3 components beyond the date range picker.
3. Consider adding more advanced asset optimization strategies if needed (image compression, SVG optimization, etc.).
4. Monitor build output to ensure asset categorization continues to work as expected with new file types.
5. Continue planned Vue 3 integration for other forms and dynamic elements.
6. **BITRIX CMS INTEGRATION:** (Future) Plan and implement integration with Bitrix CMS for news data and other dynamic content.
7. **TEST DATA USAGE:** Ensure consistent usage of test data from `assets/data/` for MVP features before Bitrix CMS integration.

## Active Context

- **Current focus:** Continuing refactoring of the news page (`news.html`) to use Vue 3 components. Currently focusing on integrating and debugging core functionality within `NewsPageContainer.vue`, including news grid display, pagination, and date filtering.
- **Recent changes:** Successfully implemented and debugged date range filtering functionality for news using `DateRangeFilter.vue` and `DateRangePickerVue.vue`. Fixed issues with initial date display and filter updates. Also resolved an issue with `NewsDetailModal.vue` not displaying correctly in the global modal.
- **Next steps:** Implement news pagination logic in Vue. Ensure correct integration with filtered news data. Continue refining UI/UX to match original design. Prepare for eventual Bitrix CMS API integration for news data.
- **Active decisions/considerations:** Using `assets/data/news.json` for MVP data. File structure for news-related Vue components confirmed in `assets/vue/components/pages/news/`. Decided to use `DateRangeFilter.vue` as a wrapper for `DateRangePickerVue.vue` for cleaner integration.

**Note:** All future entries and modifications to this memory bank should be written in English.
