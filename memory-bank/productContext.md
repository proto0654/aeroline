# Product Context

## Purpose
The project requires a streamlined and reliable build process suitable for static hosting platforms like GitHub Pages. The output in the `docs` folder should be easy to navigate, debug, and visually compare to the source code, especially for older parts of the application.

## Problems Solved
1. Simplifies the process of placing and tracking deliveries
2. Centralized access to delivery information
3. Easy order status tracking
4. Access to help and documentation
5. Viewing company news and promotions
6. Management of service acts and reconciliation statements

## User Experience Goals
- Intuitive interface
- Fast access to key features
- Responsive design for all devices
- Clear site navigation
- Optimized performance
- Easy access to service documentation

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

## How it Should Work
The new Vite build should take source files (HTML, Handlebars, JS, Vue, CSS, Assets) and produce a production-ready output in `docs` where:
- HTML files are in the root.
- JS files (entry points and modules) are in `docs/assets/js/` with structure and hashes.
- Vue entry points are handled similarly.
- CSS files are processed and placed in `docs/assets/css/` with structure and hashes.
- **All other assets (images, fonts, SVG, etc.) are automatically placed in `docs/assets/` maintaining their original subfolder structure from the source `assets/` directory, with filenames including hashes.**

## User Experience Goals
Developers working with the project should have a simple `npm run build` command that produces a predictable, debuggable, and correctly linked output ready for deployment, without manual copying steps for assets. 