# Technical Context

## Tech Context

**Core Technologies:**
- **Build Tool:** Vite
- **Bundler:** Rollup (integrated within Vite)
- **Templating:** Handlebars (`vite-plugin-handlebars`)
- **JavaScript Framework:** Vue 3 (`@vitejs/plugin-vue`)
- **CSS Pre/Post-processing:** PostCSS, TailwindCSS, Autoprefixer
- **File System Utilities:** `glob` (for dynamic input gathering), `path` (Node.js built-in)

**Dependencies (Dev):**
- `vite`
- `@vitejs/plugin-vue`
- `vite-plugin-handlebars`
- `tailwindcss`
- `autoprefixer`
- `postcss`
- `glob`
- `cpx` (previously used for copying, now removed from build script but may still be installed)
- ... (other project-specific dev dependencies from `package.json`)

**Dependencies (Prod):**
- `vue`
- ... (other project-specific runtime dependencies)

**Development Setup:** Standard Node.js environment. Development server provided by Vite (`npm run dev`).

**Technical Constraints:**
- Compatibility with GitHub Pages static hosting.
- Need to handle a mix of plain JS modules and Vue components.
- Desire to keep the output `docs` folder structure similar to the source `assets`.

**Environment:** Windows 11, PowerShell terminal.

## Technologies Used
- Vite (build tool)
- Tailwind CSS (styling)
- DaisyUI (UI components)
- JavaScript (interactivity, menu toggles)
- HTML5 (structure)
- List.js (table sorting and pagination)
- Swiper (sliders)
- V-Calendar (for date selection)

## Technical Stack
- Vite as a build tool
- Tailwind CSS for styling
- DaisyUI for UI components
- JavaScript for interactivity
- PostCSS for CSS processing
- Various plugins for optimization
- Custom JS modules for UI (menu, toggles, etc.)
- List.js for table functionality
- Swiper for sliders
- V-Calendar (for date selection)
- ➡️ **Planned:** Vue 3 (for Personal Account dynamic interfaces) - latest stable version
- ➡️ **Planned:** Pinia (State Management for Vue 3)
- ➡️ **Planned:** Axios (or similar for API calls in the future)
- **Future Consideration:** Bitrix CMS integration in production.

## Development Setup
- Node.js and npm for dependency management
- Vite for local development and builds
- Modular JS (ES modules)
- DaisyUI theme configuration

## Dependencies
Main dependencies:
- Vite for builds
- Tailwind CSS for styles
- DaisyUI for UI components
- PostCSS for CSS processing
- Various plugins for optimization
- Custom JS modules for UI (menu, toggles, etc.)
- List.js for table functionality
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
9. Table sorting and pagination must use List.js
10. Modal system must use DaisyUI components
11. Consistent UI patterns across all pages

## Build Process
1. Development with Vite
2. CSS build with Tailwind
3. Resource optimization
4. Code minification
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
- DaisyUI modal system
- DaisyUI form components
- DaisyUI navigation components
- Custom modal manager for unified behavior
- V-Calendar component with custom styling 

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