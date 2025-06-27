# Active Context

## Current Focus
- ✅ COMPLETED: Unified global modal system implementation using Vue 3, Pinia, and DaisyUI.
- ✅ COMPLETED: All core modal windows (login, email send, create/edit/delete sender/receiver) migrated to the new unified Vue 3 system.
- ✅ COMPLETED: Fixed all import errors and modal functionality, including the "Modal was cancelled" console messages.
- All main and submenu pages are created and linked.
- Mobile menu fully matches the design: two levels, toggles, animated arrow.
- Placeholder pages for all menu items are implemented.
- JS logic for mobile menu toggles is in place.
- Service acts page implementation and optimization.
- ✅ COMPLETED: Styling and refining UI components.
- ✅ COMPLETED: Vue 3 integration for Personal Account (MVP) - using latest stable Vue 3.
- ✅ COMPLETED: Implement Date Range Picker component using Vue 3 and mock JSON data via bundler.
- Project currently uses Vite 4.
- ✅ COMPLETED: Replacing vanilla-calendar-pro date picker with a reusable Vue 3 component-island on `service-acts.html` and `news.html`.
- ✅ COMPLETED: News page modal refactored to use unified global Vue 3 modal system.
- ✅ COMPLETED: Refactor the entire News page (`news.html`) to use Vue 3 components for news grid, pagination, and date filtering. This is an MVP, utilizing mock data from `assets/data/news.json` with a future plan for integration with Bitrix CMS.
- ✅ COMPLETED: Refactoring tables on `senders-receivers.html` and `service-acts.html` to use the reusable Vue 3 component `EasyDataTableWrapper.vue` based on `vue3-easy-data-table`, replacing List.js.
- Adapting existing JavaScript files (`service-acts-page.js`, `news-page.js`) to interact with new Vue components.
- Ensuring the integration works correctly both in development and after the Vite build process.
- Handlebars is used for server-rendered parts of the MVP pages, with Vue islands for interactive components.
- ✅ COMPLETED: Implemented home page news block as a Vue component, replacing the old slider/carousel logic.
- ➡️ Current task: Continue with other project features, prioritizing refactoring of existing forms and dynamic elements to Vue 3 components.

## Recent Changes (Latest Session)
- ✅ FIXED: Corrected import paths in `assets/js/modules/home-page.js`.
- ✅ FIXED: Removed local Pinia initialization in `assets/js/modules/home-page.js` to use the global instance.
- ✅ FIXED: Corrected the prop name passed to `NewsDetailModal.vue` from `newsItem` to `news` in `HomePageNews.vue`.
- ✅ FIXED: Ensured `NewsDetailModal.vue` uses `news.content` for the full news text.
- ✅ IMPLEMENTED: Created `assets/vue/components/HomePageNews.vue` to display the latest 3 news items in a grid on the home page.
- ✅ UPDATED: Modified `index.html` to include a container for `HomePageNews.vue` and removed the old news block HTML.
- ✅ UPDATED: Modified `assets/js/modules/home-page.js` to remove old news carousel logic and mount `HomePageNews.vue`.
- ✅ IMPLEMENTED: Added the 'isNew' indicator with SVG to news cards in `HomePageNews.vue`.
- ✅ IMPLEMENTED: Changed the 'Стать клиентом' button on index.html to a direct link to user-create.html.
- ✅ REMOVED: Deleted the JavaScript code in assets/js/page-entrypoints/index.js that triggered the 'Стать клиентом' modal.
- ✅ REMOVED: Deleted the BecomeClientForm.vue component as it is no longer used.
- ✅ IMPLEMENTED: Refactored tables on `senders-receivers.html` and `service-acts.html` to use `EasyDataTableWrapper.vue`.
- Minor layout adjustments were made and accepted in `HomePageNews.vue`.
- ✅ FIXED: Исправлена ошибка сборки "Could not resolve entry module" путем удаления ссылки на assets/js/modules/news-page.js из vite.config.js.

## Modal System Status
- **Implementation**: Unified global modal system using Vue 3, Pinia, and DaisyUI.
- **Host Component**: `GlobalModalHost.vue` centrally manages modal structure and behavior.
- **State Management**: Pinia store (`globalModal.js`) manages modal state (open/close, component, props, size).
- **Structure**: All modals utilize DaisyUI classes for consistent styling.
- **Behavior**: Consistent close on Escape, backdrop click, close buttons. Promise-based results (success/cancelled) instead of rejections for dismissals.
- **Sizes**: Support for small, default (`max-w-md`), large (`w-auto max-w-[calc(100vw-8rem)]`), full sizes.
- **Pages Updated**: 
  - ✅ index.html (become client modal)
  - ✅ profile.html (password/email change modals)
  - ✅ news.html (news detail modal - *now using unified system*)
  - ✅ service-acts.html (email sending modal)
  - ✅ senders-receivers.html (create/edit/delete modals)

## JavaScript Modules Status
- ✅ global-ui.js: New module for global UI interactions (e.g., login modal button), integrated into `header.hbs`.
- ✅ modal-manager.js: Removed from direct usage by Vue components; now primarily used by global UI modules for general modal behavior (should be removed once all native modals are refactored).
- ✅ home-page.js: Updated to use new modal system.
- ✅ news-page.js: Updated to use new modal system and Vue date picker (*now also uses new global modal for news details*).
- ✅ service-acts-page.js: Updated to use new modal system and Vue date picker, and fixed click handler.
- ✅ senders-receivers-page.js: Completely refactored to use new modal system.
- ✅ senders-receivers-page.js: Refactored to use Vue 3 component `EasyDataTableWrapper.vue` for table handling.
- ✅ service-acts-page.js: Updated to work with Vue 3 component `EasyDataTableWrapper.vue` for table handling, while retaining form mounting logic.
- ✅ main.js: Imports and exposes globalModalStore globally.
- ❌ DELETED: modal.js, modal2.js (old systems), `ModalCancelledError.js`.
- ✅ UPDATED: `service-acts-page.js` and `news-page.js` updated to use Vue date picker component.

## Next Steps
- Continue with other project features, prioritizing refactoring of existing forms and dynamic elements to Vue 3 components.
- Identify and migrate remaining native JavaScript UI interactions to Vue 3 components where beneficial.
- Ensure all new pages and features strictly adhere to the unified Vue 3 / Pinia / DaisyUI patterns.
- Plan and execute upgrade of Vite to the latest stable version (if not already done).
- Address potential Handlebars template errors after Vite upgrade.
- **FORMS & VALIDATION:** Continue implementing unified, reusable Vue 3 form components using VeeValidate.
  - Identify next forms for refactoring (e.g., any remaining forms in profile, other pages).
  - Create base Vue input components (text, select, textarea, checkbox, radio) integrated with VeeValidate for per-field validation messages.
  - Implement form-level success/error messages at the bottom of the form using DaisyUI `alert` components.
  - Account for diverse and custom field types.
  - Implement basic form submission logic (console log, alert) as a temporary placeholder for API integration.
- **BITRIX CMS INTEGRATION:** (Future) Plan and implement integration with Bitrix CMS for data retrieval for news and other dynamic content.

## Active Decisions
- All modals MUST use the unified global Vue 3 / Pinia modal system (`GlobalModalHost.vue`).
- No more `dialog` elements - only `div`-based modals.
- Consistent behavior across all modal windows (closing, opening, promise resolution).
- `window.globalModalStore` is available for direct access to the Pinia store.
- All menu items must have a page.
- Mobile menu must match design exactly.
- Use Tailwind utilities instead of custom CSS.
- Keep table sorting functionality in headers only.
- Use Vite 4 currently; plan to upgrade to latest stable.
- Vue 3 integration is for Personal Account MVP initially, expanding to other dynamic UI.
- Handlebars is used only for MVP templates (likely for mock data).
- Need to carefully manage Vite upgrade due to potential Handlebars conflicts.
- New Date Range Picker is a reusable Vue 3 component-island.
- **FORMS & VALIDATION:** Use VeeValidate for all Vue 3 form validation and management.
- **FORMS & VALIDATION:** Form-level messages (success/error) will be displayed at the bottom of the form using DaisyUI alert components. Individual field errors will be displayed below their respective fields.
- **FORMS & VALIDATION:** All forms will be built as reusable Vue components to handle diverse field types and custom validation.
- **FORMS & VALIDATION:** Initial form submission will use `console.log` and `alert` as placeholders for future API integration.
- **REFACTORING STRATEGY:** Progressively replace native JavaScript UI logic with Vue 3 components, prioritizing interactive elements and forms.
- **NEWS PAGE:** The news page refactoring is an MVP (Minimum Viable Product) and will initially use mock data from `assets/data/news.json`. Future integration with Bitrix CMS for data retrieval and API will be implemented.
- **HOME PAGE NEWS:** The news block on the home page is now a Vue component (`HomePageNews.vue`) displaying the latest 3 news items in a grid. It utilizes the global modal system with `NewsDetailModal.vue` for displaying full news content.
- **REFACTORING STRATEGY:** Progressively replace native JavaScript UI logic with Vue 3 components, prioritizing interactive elements and forms.

## Known Issues (Resolved)
- ~~Modal behavior consistency across pages~~ ✅ FIXED
- ~~News page modal not using unified system~~ ✅ FIXED
- ~~All modals became large due to incorrect size application~~ ✅ FIXED
- ~~Service acts page with List.js sorting and pagination~~ ✅ REPLACED by `EasyDataTableWrapper.vue`
- ~~Build error "Could not resolve entry module assets/js/modules/news-page.js"~~ ✅ FIXED

## Remaining Minor Issues
- ~~Modal behavior consistency across pages~~ ✅ FIXED
- ~~News page modal not using unified system~~ ✅ FIXED
- ~~All modals became large due to incorrect size application~~ ✅ FIXED
- ~~Service acts page with List.js sorting and pagination~~ ✅ REPLACED by `EasyDataTableWrapper.vue`
- ~~Build error "Could not resolve entry module assets/js/modules/news-page.js"~~ ✅ FIXED

## Current Considerations
- Global modal system is now fully unified and consistent, with `console.error` messages for cancellation resolved.
- All import errors resolved.
- All core modal functionality tested and working.
- Styling for V-Calendar date selection has been updated and improved.
- Ready for new features and continued refactoring.
- Future integration with Bitrix CMS needs to be kept in mind, while focusing on current MVP.
- The current `vite-plugin-handlebars` generates deprecated API warnings with Vite 6.3.5, but appears functional for now.
- **Modal Sizing**: `GlobalModalHost.vue` now supports dynamic sizing, with `large` modals adapting width (`w-auto max-w-[calc(100vw-8rem)]`) and `default` modals explicitly set to `max-w-md`.
- **NEWS PAGE:** News data is currently sourced from `assets/data/news.json`. This is a temporary solution for the MVP.
- **HOME PAGE NEWS:** The news block on the home page is now a functional Vue component displaying the latest 3 news and using the global modal for details.

## UI/Frontend Structure
- All pages use partials for header, footer, and a single global modal host (Handlebars).
- Main sections (carousel, forms, cards, map, news, etc.) are rendered via template variables.
- Profile page: two columns (user data, account details), modal popups for password/email change via Vue components.
- Navigation: two-level, mobile menu with accordion logic.
- Universal global modal container (`GlobalModalHost.vue`) is included on every page via `header.hbs`.
- All forms with phone input use PhoneValidator (mask +7/8, validation on blur, no input lock) - *to be refactored to Vue/VeeValidate*.
- Service acts page uses List.js for sorting and pagination with Tailwind utilities - *consider Vue integration*.
- Modal system uses DaisyUI components with a custom Pinia store for unified behavior.

## Current Work Focus:
✅ **COMPLETED:** Implementing the correct asset handling strategy in `vite.config.js` to automatically place all processed assets (CSS, images, fonts, SVG, etc.) into the `docs/assets/` directory while preserving their original subfolder structure from the source `assets/` directory and adding hashes to filenames.
✅ **COMPLETED:** Refactoring the News page to Vue 3 components (MVP with mock data).
✅ **COMPLETED:** Replacing the news slider/carousel on the home page with a Vue component displaying the latest 3 news items in a grid using the global modal for details.
➡️ **CURRENTLY:** Continuing with other project features and refactoring.

## Recent Changes:
- ✅ **IMPLEMENTED:** Created `assets/vue/components/HomePageNews.vue` and integrated it into `index.html`.
- ✅ **REMOVED:** Old news carousel logic from `assets/js/modules/home-page.js`.
- ✅ **FIXED:** Corrected import paths and Pinia initialization in `assets/js/modules/home-page.js`.
- ✅ **FIXED:** Corrected prop passing and content display in `HomePageNews.vue` and `NewsDetailModal.vue`.
- ✅ **IMPLEMENTED:** Added 'isNew' indicator (SVG) to home page news cards.

## Current State:
The asset handling strategy has been successfully implemented with an explicit categorization approach. Instead of trying to infer the output directory from the source path, we now categorize assets by their file extension:
- Images go to `assets/img/`
- CSS files go to `assets/css/`
- Fonts go to `assets/fonts/`
- Data files go to `assets/data/`
- JS entry points go to `assets/js/`
- JS chunks go to `assets/js/chunks/`

This approach ensures a clean, organized output directory structure that is easy to maintain and understand.

The home page news block is now a functional Vue component displaying the latest 3 news and using the global modal for details.

## Next Steps:
1. Continue with the planned Vue 3 integration for Personal Account MVP features.
2. Implement and integrate other Vue 3 components beyond the Date Range Picker.
3. Consider adding more advanced asset optimization strategies if needed (image compression, SVG optimization, etc.).
4. Monitor build output to ensure the asset categorization continues to work as expected with new file types.
5. Continue with the planned Vue 3 integration for other forms and dynamic elements.
6. **BITRIX CMS INTEGRATION:** (Future) Plan and implement integration with Bitrix CMS for data retrieval for news and other dynamic content.
7. **MOCK DATA USAGE:** Ensure consistent use of mock data from `assets/data/` for MVP features until Bitrix CMS integration.

## Active Context

- **Current Focus:** Continue refactoring the news page (`news.html`) to use Vue 3 components. Currently focused on integrating and debugging core functionalities within the `NewsPageContainer.vue`, including news grid display, pagination, and date filtering.
- **Recent Changes:** Successfully implemented and debugged the date range filtering functionality for news using `DateRangeFilter.vue` and `DateRangePickerVue.vue`. Fixed issues with the initial date display and filter updates. Also resolved the issue with the `NewsDetailModal.vue` not rendering correctly in the global modal.
- **Next Steps:** Implement the news pagination logic in Vue. Ensure proper integration with the filtered news data. Continue refining the UI/UX to match the original design. Prepare for eventual integration with the Bitrix CMS API for news data.
- **Active Decisions/Considerations:** Using `assets/data/news.json` for MVP data. Confirmed the file structure for news-related Vue components in `assets/vue/components/pages/news/`. Decided to use `DateRangeFilter.vue` as a wrapper for `DateRangePickerVue.vue` for cleaner integration. 