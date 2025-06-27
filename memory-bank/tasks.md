# Current Tasks

## Global Refactoring Strategy

The overall project development strategy is a gradual transition from native JavaScript to Vue 3 components for all dynamic UI elements. Progress is being made in several key areas:

### ✅ Completed

1. **Global Modal System**
   - Unified `GlobalModalHost.vue` component with Pinia management
   - Migration of all key modals to the new system
   - Consistent behavior and styling (DaisyUI based)

2. **Data Table Component**
   - Implementation of `EasyDataTableWrapper.vue` based on `vue3-easy-data-table`
   - Refactoring of tables on senders/receivers and service acts pages
   - Consistent sorting, filtering, and pagination

3. **Date Range Picker Component**
   - Implementation of `DateRangePickerVue.vue` based on `vue-datepicker-next`
   - Integration on service acts and news pages
   - Configuration for correct interaction with other code

4. **Homepage News**
   - Replacement of carousel with `HomePageNews.vue` component
   - Integration with global modal system
   - Addition of "new news" indicator

### 🔄 In Progress

1. **News Page Refactoring**
   - Creation of Vue components for news grid, pagination, and filtering
   - Working with test data from JSON
   - Integration with global modal system
   - Refining news pagination

2. **Asset Management System Update**
   - Configuring `vite.config.js` for optimal asset processing and output
   - Categorization of assets by type (images, CSS, JS, fonts)
   - Support for file naming hashing while preserving structure

### 📋 Planned

1. **Unified Forms System**
   - Creation of base input field components (text, select, checkbox, etc.)
   - Integration with VeeValidate for validation
   - Form wrapper component with unified style and behavior

2. **Refactoring Remaining Pages**
   - Identification of priority pages for refactoring
   - Creation of Vue components for interactive elements
   - Ensuring compatibility with existing code

3. **Bitrix CMS Integration**
   - Preparing architecture for API interaction
   - Replacing test data with real data
   - Implementation of authorization and other necessary mechanisms

4. **Senders and Receivers Page Further Development**
   - Implement additional features as required (e.g., API integration, more complex UI elements, specific business logic).
   - This task covers any work on the /senders-receivers.html page beyond the initial data table and modal implementation.

## Current Priorities

1. Complete news page refactoring, especially the pagination component
2. Continue refactoring forms into Vue components using VeeValidate
3. Maintain and expand existing documentation as the project evolves
4. Ensure compatibility with the latest dependency versions, including Vite

**Note:** All future entries and modifications to this memory bank should be written in English. 