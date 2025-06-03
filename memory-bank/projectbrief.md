# Project Brief: Aeroline

## Project Overview
Aeroline is a modern delivery service website, built with up-to-date web technologies and a unified UI system. The project uses Vite 4 and plans to integrate Vue 3 for specific dynamic sections (initially Personal Account MVP), while keeping future integration with Bitrix CMS in mind.

## Core Requirements
- Modern, responsive design using DaisyUI components
- Optimized performance
- Accessibility for all users
- Scalable architecture
- All navigation/menu pages must exist and be accessible
- Mobile menu must support two-level structure with toggles and animation
- Unified modal system across all pages
- Consistent UI components using DaisyUI

## Technical Stack
- Vite as a build tool
- Tailwind CSS for styling
- DaisyUI for UI components
- JavaScript for interactivity
- HTML5 for structure
- Swiper for sliders
- List.js for table functionality

## Project Goals
1. Provide a user-friendly interface for delivery service clients
2. Ensure fast loading and responsiveness
3. Implement all essential delivery service features
4. Maintain high code quality standards
5. Ensure all navigation/menu items are implemented and interactive
6. Implement consistent UI patterns across all pages
7. Maintain unified modal system

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
- Unified modal system implementation

## Project Brief

**Project Name:** Aeroline Frontend (Рефакторинг сборки Vite)

**Goal:** To refactor the frontend build process using Vite to achieve a "transparent" output in the `docs` folder for deployment on GitHub Pages. The primary objective is to preserve the original `assets` folder structure and file naming (with added hashes for cache busting) as much as possible, minimizing code changes in the application itself.

**Current Focus:** Configuring Vite's asset handling (`rollupOptions.output.assetFileNames`) to automatically replicate the source `assets` folder structure in the output `docs/assets` for all asset types (images, fonts, SVG, CSS processed by Vite, etc.) and ensure filenames include hashes.

**Status:** In Progress. We have configured Vite entry points, disabled minification/sourcemaps (as per user request for transparency), and removed the old JS build script. We are currently refining the asset naming strategy in `vite.config.js` to achieve the desired output structure without relying on external copying tools like `cpx`. The next step is to verify the latest build output. 