# System Patterns

## Architecture Overview
The project is based on a component architecture using modern web technologies with DaisyUI as the primary UI framework.

## Key Technical Decisions
1. Vite for fast development and optimized builds
2. Tailwind CSS for consistent styling
3. DaisyUI for UI components
4. Modular component structure
5. Optimized resource loading
6. Mobile menu: two-level structure, toggles with animated SVG arrow, JS logic for submenu toggling
7. All menu items must have a corresponding page
8. List.js for table sorting and pagination
9. Tailwind utilities for all styling needs
10. ✅ **COMPLETED**: Unified modal system using DaisyUI with ModalManager
11. ✅ **COMPLETED**: All modals use div-based DaisyUI structure (no dialog elements)
12. ✅ **COMPLETED**: Consistent modal behavior across all pages

## Design Patterns
1. Component-based approach
2. Modular architecture
3. Responsive design
4. Progressive Enhancement
5. Mobile menu toggles (accordion pattern)
6. Table sorting and pagination pattern
7. DaisyUI modal pattern with unified ModalManager
8. DaisyUI form components pattern
9. DaisyUI navigation pattern

## Component Relationships
- Main page as the entry point
- Independent modules for each feature (e.g., order, tracking, payments)
- Reusable components
- Centralized style management
- Mobile menu and navigation are decoupled and extensible
- Table components with built-in sorting and pagination
- Universal modal system using DaisyUI components with ModalManager
- DaisyUI theme system for consistent styling

## File Structure
```
/
├── assets/         # Static resources and reusable components
│   ├── js/        # JavaScript modules
│   ├── css/       # Styles
│   ├── partials/  # Handlebars templates
│   └── img/       # Images
├── docs/          # Build output
└── [pages]        # HTML pages (all menu items have a page)
``` 

## Partials & JS Modules
- Partials: 
  - header.hbs (navigation, mobile menu, contacts)
  - footer.hbs (navigation, contacts, policy)
- JS modules: 
  - ✅ **modal-manager.js** (unified DaisyUI modal manager - NEW)
  - ✅ **main.js** (global imports, modalManager exposure)
  - ✅ **home-page.js** (updated for ModalManager)
  - ✅ **news-page.js** (updated for ModalManager)
  - ✅ **service-acts-page.js** (updated for ModalManager + fixed click handlers)
  - ✅ **senders-receivers-page.js** (completely rewritten for ModalManager)
  - utils.js (utility functions, PhoneValidator)
  - ui.js (UI init, phone mask, menu, FAQ, tabs)
  - pagination.js (Pagination class for lists)
  - table-manager.js (TableManager for consistent table functionality)
  - contacts-page.js
  - vacancies-page.js
  - slider.js (Swiper integration)
  - ❌ **DELETED**: modal.js (old system)
  - ❌ **DELETED**: modal2.js (old system)
- ✅ **Modal system**: Uses DaisyUI components with unified ModalManager
- ✅ **Modal structure**: All modals use consistent DaisyUI structure: div.modal > div.modal-backdrop + div.modal-box
- ✅ **ModalManager API**: open(), close(), create(), updateContent(), isOpen(), closeAll()
- ✅ **Modal behavior**: Consistent close on Escape, backdrop click, close buttons
- ✅ **Modal sizes**: Support for small, default, large, full sizes
- Pagination and filtering are handled by a universal Pagination class
- Table sorting and pagination are handled by List.js
- All UI logic is modular and page-specific logic is separated
- Phone mask does not interfere with editing, works on blur, supports +7 and 8
- All styling is done through Tailwind utilities and DaisyUI components 