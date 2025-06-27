# Product Context

## Purpose
The project requires a streamlined and reliable build process suitable for static hosting platforms like GitHub Pages. The output in the `docs` folder should be easy to navigate, debug, and visually compare to the source code. Simultaneously, the project aims to establish a modern, consistent, and maintainable UI/UX by leveraging Vue 3, Pinia for state management, and DaisyUI for components. This includes a unified global modal system.

## Problems Solved
1. Simplifies the process of placing and tracking deliveries
2. Centralized access to delivery information
3. Easy order status tracking
4. Access to help and documentation
5. Viewing company news and promotions
6. Management of service acts and reconciliation statements
7. **Elimination of inconsistent modal implementations and complex JavaScript for UI interactions.**
8. **Improved maintainability and scalability of dynamic UI elements.**
9. Implementation of a unified and maintainable table solution with sorting, filtering, and pagination using a reusable Vue component based on `vue3-easy-data-table`, replacing the old List.js implementation.

## User Experience Goals
- Intuitive interface
- Fast access to key features
- Responsive design for all devices
- Clear site navigation
- Optimized performance
- Easy access to service documentation
- **Consistent and modern user interactions across all dynamic elements and forms.**
- **Seamless and predictable behavior for all modal windows.**
- Consistent and modern appearance and behavior for all data tables.

## Key Features
1. Delivery order system
2. Order tracking
3. Information portal
4. Help/FAQ system
5. Payment system
6. Vacancies section
7. News section
8. Service acts management
9. Reconciliation statements
10. **Unified Global Modal System.**
11. **Vue 3 powered interactive forms and dynamic UI components.**
12. Unified Data Table Component with Sorting, Filtering, and Pagination using `vue3-easy-data-table`.

## How it Should Work
The new Vite build should take source files (HTML, Handlebars, JS, Vue, CSS, Assets) and produce a production-ready output in `docs` where:
- HTML files are in the root.
- JS files (entry points and modules) are in `docs/assets/js/` with structure and hashes.
- Vue entry points are handled similarly.
- CSS files are processed and placed in `docs/assets/css/` with structure and hashes.
- **All other assets (images, fonts, SVG, etc.) are automatically placed in `docs/assets/` maintaining their original subfolder structure from the source `assets/` directory, with filenames including hashes.**
- **Dynamic UI elements and forms are progressively migrated from native JavaScript to Vue 3 components, managed by Pinia for global state.**
- **A single global modal host component (`GlobalModalHost.vue`) is used across the application to display all modal content, ensuring consistent styling and behavior.**
- Data tables on relevant pages (e.g., senders-receivers.html, service-acts.html) are implemented using a reusable Vue 3 component (`EasyDataTableWrapper.vue`) which handles sorting, filtering, and pagination using `vue3-easy-data-table`, ensuring consistent styling and behavior including pagination color and spacing.

## User Experience Goals
Developers working with the project should have a simple `npm run build` command that produces a predictable, debuggable, and correctly linked output ready for deployment, without manual copying steps for assets. The codebase should promote the use of Vue 3 components and Pinia for all new dynamic UI features, and guide the refactoring of existing JavaScript to these patterns. 