# Style Guide

## General Principles

- Use Tailwind utilities instead of custom CSS
- Apply DaisyUI components for basic UI
- Follow a consistent project structure
- Maintain consistency in naming
- Write clean and documented code

## Vue Components

### Naming Standards

- Component names in PascalCase (e.g., `GlobalModalHost.vue`)
- Prop names in camelCase (e.g., `initialRange`)
- Event names in kebab-case with a prefix (e.g., `@update:range`)
- Slots named in kebab-case (e.g., `#default`, `#header`)

### Component Organization

- Each component in a separate file
- Internal structure: template -> script -> style
- Use Composition API and `<script setup>`
- Explicitly define prop types
- Define default values for optional props

### Component Folder Structure

- Reusable form elements: `assets/vue/components/forms/`
- Page-level and large forms: `assets/vue/components/pages/`
- Subdivide complex forms into logical subcomponents

## Modals

All modals must follow a consistent pattern:

1. Use `GlobalModalHost.vue` for display
2. DaisyUI-based structure: `div.modal > div.modal-backdrop + div.modal-box`
3. Support 4 sizes: small, default, large, full
4. Close on Escape, backdrop click, and close button
5. Return result via promise (success/cancelled)

Example modal call:

```js
// Via Pinia store
window.globalModalStore
  .openModal({
    component: MyModalComponent,
    props: {
      // props for the modal component
    },
    size: "default", // 'small', 'default', 'large', 'full'
  })
  .then((result) => {
    if (result.success) {
      // handle successful closing
      console.log(result.data);
    } else if (result.cancelled) {
      // handle cancellation
    }
  });
```

## Forms

### Mandatory Components

All forms must use the following components:

- `TextInput.vue` — for text, email, password fields
- `SelectInput.vue` — for dropdown lists
- `TextareaInput.vue` — for multi-line fields
- `CheckboxInput.vue` — for checkboxes
- `PhoneInput.vue` — for phone fields with mask

### Form Structure

Each form must be wrapped by the `BaseForm.vue` component, which provides:

- Unified styling via the `.aero-form` class
- Integration with VeeValidate
- Standard submit/cancel buttons
- Display of success/error messages

Form example:

```vue
<template>
  <BaseForm @submit="handleSubmit">
    <TextInput
      name="email"
      label="Email"
      v-model="form.email"
      rules="required|email"
      required
    />

    <PhoneInput
      name="phone"
      label="Phone"
      v-model="form.phone"
      rules="required"
      required
    />

    <template #actions>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="button" class="btn" @click="cancel">Cancel</button>
    </template>
  </BaseForm>
</template>
```

## Tables

All data tables must use the `EasyDataTableWrapper.vue` component:

- Consistent sorting
- Built-in pagination
- Filtering
- Responsiveness
- Customizable columns

Example usage:

```vue
<EasyDataTableWrapper
  :headers="headers"
  :items="items"
  :server-options="serverOptions"
  theme-color="#367fa9"
  @update:options="updateOptions"
/>
```

## JavaScript

### Module Structure

- Group related functions
- Export only what is necessary
- Use comments for documentation
- Follow clean code principles

### Asynchronous Code

- Prefer async/await over then/catch chains
- Handle errors correctly
- Use try/catch where necessary

```js
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    // error handling
  }
}
```

## Styling

### CSS Priorities

1. Tailwind utilities
2. DaisyUI components
3. CSS variables for repetitive values
4. Custom classes only if necessary

### Responsiveness

- Develop with a mobile-first approach
- Use Tailwind breakpoints
- Test on various screen sizes

### Example

- See `AutocompleteInput.vue` for a reference of custom UI with DaisyUI-compatible classes.

## Refactoring

When refactoring existing code, follow these principles:

1. Preserve existing functionality
2. Gradually replace native JS with Vue components
3. Break down complex logic into reusable parts
4. Refactor most frequently used elements first
5. Document changes

**Note:** All future entries and modifications to this memory bank should be written in English.
