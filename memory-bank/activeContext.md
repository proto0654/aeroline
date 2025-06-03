# Active Context

## Current Focus
- ✅ COMPLETED: Unified modal system implementation using DaisyUI
- ✅ COMPLETED: All modal windows now use consistent ModalManager
- ✅ COMPLETED: Fixed all import errors and modal functionality
- All main and submenu pages are created and linked
- Mobile menu fully matches the design: two levels, toggles, animated arrow
- Placeholder pages for all menu items are implemented
- JS logic for mobile menu toggles is in place
- Service acts page implementation and optimization
- ✅ Continue styling and refining UI components, such as the V-Calendar.
- ✅ COMPLETED: Starting Vue 3 integration for Personal Account (MVP) - using latest stable Vue 3
- ✅ COMPLETED: First task: Implement Date Range Picker component using Vue 3 and mock JSON data via bundler
- Project currently uses Vite 4.
- ✅ COMPLETED: Replacing vanilla-calendar-pro date picker with a reusable Vue 3 component-island on `service-acts.html` and `news.html`.
- ➡️ Next task: Further integrate Vue 3 components for Personal Account MVP features.
- Replacing the old `vanilla-calendar-pro` date picker with a Vue 3 component island.
- Adapting existing JavaScript files (`service-acts-page.js`, `news-page.js`) to interact with the new Vue date picker.
- Ensuring the integration works correctly both in development and after the Vite build process.
- Handlebars is used for server-rendered parts of the MVP pages, with Vue islands for interactive components.

## Recent Changes (Latest Session)
- ✅ COMPLETED: Full modal system unification across entire project
- ✅ FIXED: Removed all old modal files (modal.js, modal2.js, modal-templates.hbs, etc.)
- ✅ FIXED: Updated all HTML pages to use DaisyUI modal structure (div-based, not dialog-based)
- ✅ FIXED: Updated all JavaScript modules to use new ModalManager
- ✅ FIXED: Resolved import error in profile.html (was importing deleted modal.js)
- ✅ FIXED: Added "Become Client" modal to index.html with proper form
- ✅ FIXED: Corrected button IDs in senders-receivers-page.js
- ✅ FIXED: Fixed email modal in service-acts.html (closest() instead of classList.contains())
- ✅ CREATED: Comprehensive modal-test.html page for testing all modal types
- ✅ UPDATED: Styles for V-Calendar date selection in `assets/css/main.css` to improve visual appearance of selected dates and ranges.
- Updated Vite to 6.3.5 and added Vue 3 dependencies. Verified Handlebars is still functional with warnings.
- Created `assets/vue/components/DateRangePickerVue.vue`.
- Created `assets/vue/entrypoints/lk-datepicker.js`.
- Modified `service-acts.html` and `news.html` to host the Vue date picker component.
- Adapted `assets/js/modules/service-acts-page.js` and `assets/js/modules/news-page.js` to use the new Vue component and its events.

## Modal System Status
- **ModalManager**: Single unified system for all modals
- **Structure**: All modals use DaisyUI div-based structure
- **Behavior**: Consistent close on Escape, backdrop click, close buttons
- **Sizes**: Support for small, default, large, full sizes
- **Pages Updated**: 
  - ✅ index.html (become client modal)
  - ✅ profile.html (password/email change modals)
  - ✅ news.html (news detail modal)
  - ✅ service-acts.html (email sending modal)
  - ✅ senders-receivers.html (create/edit/delete modals)

## JavaScript Modules Status
- ✅ modal-manager.js: New unified modal system
- ✅ home-page.js: Updated to use ModalManager
- ✅ news-page.js: Updated to use ModalManager
- ✅ service-acts-page.js: Updated to use ModalManager + fixed click handler
- ✅ senders-receivers-page.js: Completely rewritten for ModalManager
- ✅ main.js: Imports and exposes modalManager globally
- ❌ DELETED: modal.js, modal2.js (old systems)
- ✅ UPDATED: `service-acts-page.js` and `news-page.js` updated to use Vue date picker component.

## Next Steps
- Monitor for any remaining modal-related issues
- Consider adding more modal features if needed (animations, custom callbacks)
- Continue with other project features
- Ensure all new pages use the unified modal system
- ✅ Continue styling and refining UI components, such as the V-Calendar.
- Plan and execute upgrade of Vite to the latest stable version.
- Address potential Handlebars template errors after Vite upgrade.
- Implement and integrate the Vue 3 Date Range Picker component on target pages.
- Plan and execute integration of other Vue 3 components for Personal Account MVP.

## Active Decisions
- All modals MUST use ModalManager and DaisyUI structure
- No more dialog elements - only div-based modals
- Consistent behavior across all modal windows
- Global modalManager available on window object
- All menu items must have a page
- Mobile menu must match design exactly
- Use Tailwind utilities instead of custom CSS
- Keep table sorting functionality in headers only
- Use Vite 4 currently, plan to upgrade to latest stable.
- Vue 3 integration is for Personal Account MVP initially.
- Handlebars is used only for MVP templates (likely for mock data).
- Need to carefully manage Vite upgrade due to past Handlebars conflicts.
- New Date Range Picker will be a reusable Vue 3 component-island.

## Current Considerations
- Modal system is now fully unified and consistent
- All import errors resolved
- All functionality tested and working
- ✅ Styling for V-Calendar date selection has been updated and improved.
- Ready for new features or bug fixes
- Future integration with Bitrix CMS needs to be kept in mind, while focusing on current MVP.
- The current vite-plugin-handlebars generates deprecated API warnings with Vite 6.3.5, but appears functional for now.

## UI/Frontend Structure
- All pages use partials for header, footer, and modal (Handlebars)
- Main sections (carousel, forms, cards, map, news, etc.) are rendered via template variables
- Profile page: two columns (user data, account details), modal popups for password/email change via JS
- Navigation: two-level, mobile menu with accordion logic
- Universal modal container using DaisyUI is included on every page
- All forms with phone input use PhoneValidator (mask +7/8, validation on blur, no input lock)
- Service acts page uses List.js for sorting and pagination with Tailwind utilities
- Modal system uses DaisyUI components with custom manager for unified behavior

## Current Work Focus:
✅ **COMPLETED:** Implementing the correct asset handling strategy in `vite.config.js` to automatically place all processed assets (CSS, images, fonts, SVG, etc.) into the `docs/assets/` directory while preserving their original subfolder structure from the source `assets/` directory and adding hashes to filenames.

## Recent Changes:
- ✅ **FIXED:** Modified `vite.config.js` to use a categorization strategy that explicitly places assets in appropriate subdirectories based on file extension.
- ✅ **IMPLEMENTED:** Custom `assetFileNames` function that analyzes each file and directs it to the correct output folder (`img/`, `css/`, `fonts/`, etc.).
- ✅ **COMPLETED:** Images (`.jpg`, `.png`, `.svg`, etc.) now go to `assets/img/`, CSS files to `assets/css/`, and so on.
- ✅ **FIXED:** JavaScript entry points and chunks also have explicit output paths to maintain structure.
- Disabled minification (`minify: false`) and sourcemaps (`sourcemap: false`) for a more transparent output.
- Updated `package.json` to remove the separate `vite.build-js.config.js` build step and the `cpx` copying command.

## Current State:
The asset handling strategy has been successfully implemented with an explicit categorization approach. Instead of trying to infer the output directory from the source path, we now categorize assets by their file extension:
- Images go to `assets/img/`
- CSS files go to `assets/css/`
- Fonts go to `assets/fonts/`
- Data files go to `assets/data/`
- JS entry points go to `assets/js/`
- JS chunks go to `assets/js/chunks/`

This approach ensures a clean, organized output directory structure that is easy to maintain and understand.

## Next Steps:
1. Continue with the planned Vue 3 integration for Personal Account MVP features.
2. Implement and integrate other Vue 3 components beyond the Date Range Picker.
3. Consider adding more advanced asset optimization strategies if needed (image compression, SVG optimization, etc.).
4. Monitor build output to ensure the asset categorization continues to work as expected with new file types. 