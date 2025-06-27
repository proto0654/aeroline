# Project Brief: Aeroline

## Project Overview
Aeroline is a modern delivery service website, built with up-to-date web technologies and a unified UI system. The project uses Vite 4 and is actively integrating Vue 3 for dynamic sections and UI components, including a new global modal system. Future integration with Bitrix CMS is kept in mind. The project is progressively refactoring existing native JavaScript functionalities to Vue components.

## Core Requirements
- Modern, responsive design using DaisyUI components
- Optimized performance
- Accessibility for all users
- Scalable architecture
- All navigation/menu pages must exist and be accessible
- Mobile menu must support two-level structure with toggles and animation
- Unified global modal system implemented with Vue 3 and Pinia
- Consistent UI components using DaisyUI

## Technical Stack
- Vite as a build tool
- Tailwind CSS for styling
- DaisyUI for UI components
- Vue 3 for dynamic components and UI
- Pinia for state management (especially for global modals)
- JavaScript for interactivity (gradually being refactored to Vue)
- HTML5 for structure
- Swiper for sliders
- vue3-easy-data-table for table functionality (integrated with Vue 3 components)

## Project Goals
1. Provide a user-friendly interface for delivery service clients
2. Ensure fast loading and responsiveness
3. Implement all essential delivery service features
4. Maintain high code quality standards
5. Ensure all navigation/menu items are implemented and interactive
6. Implement consistent UI patterns across all pages using DaisyUI and Vue components
7. Maintain unified global modal system
8. Progressively refactor legacy JavaScript into modern Vue 3 components
9. Implement unified and consistent table UI/UX using a reusable Vue component.

## Scope
- Main page
- News page
- Services page
- Vacancies page
- Contacts page
- Payments page
- Order tracking system
- Help/FAQ system
- All menu pages and subpages as per design
- Unified global modal system implementation across all relevant pages
- Refactoring of existing forms and dynamic elements to Vue 3
- Table refactoring completed for Senders/Receivers and Service Acts pages.

## Project Brief

**Project Name:** Aeroline Frontend (Vite Build & UI Refactoring)

**Goal:** To refactor the frontend build process using Vite to achieve a "transparent" output in the `docs` folder for deployment on GitHub Pages. The primary objective is to preserve the original `assets` folder structure and file naming (with added hashes for cache busting) as much as possible, minimizing code changes in the application itself. Concurrently, the project aims to modernize the UI and dynamic functionalities by transitioning to Vue 3, Pinia, and DaisyUI, implementing a unified global modal system, and progressively refactoring legacy JavaScript code.

**Current Focus:** Configuring Vite's asset handling (`rollupOptions.output.assetFileNames`) to automatically replicate the source `assets` folder structure in the output `docs/assets` for all asset types (images, fonts, SVG, CSS processed by Vite, etc.) and ensure filenames include hashes. Major focus is on migrating existing modal windows and forms to the new unified Vue 3/Pinia/DaisyUI modal system and refactoring related native JS. 

**Status:** In Progress. We have configured Vite entry points, disabled minification/sourcemaps (as per user request for transparency), and removed the old JS build script. The unified global modal system is largely implemented and integrated across main, profile, and senders/receivers pages. Remaining work involves further refactoring of other modals, forms, and dynamic elements to the new Vue/DaisyUI pattern, as well as refining the asset naming strategy in `vite.config.js`. 

The project has successfully refactored tables on Senders/Receivers and Service Acts pages to use a universal Vue 3 component (`EasyDataTableWrapper.vue`) based on `vue3-easy-data-table`, replacing the old List.js implementation. The styling of the active pagination button color and spacing have been successfully implemented using the `theme-color` prop and CSS variables.

**Note:** All future entries and modifications to this memory bank should be written in English. 