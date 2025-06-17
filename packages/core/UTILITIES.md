# Mild UI Utilities

Mild UI Core provides a comprehensive set of utility classes similar to Tailwind CSS, but with the `mild-` prefix to avoid conflicts when used alongside Tailwind CSS.

## Installation & Usage

```bash
npm install @mild-ui/core
```

### Import utilities only (without components):

```css
@import '@mild-ui/core/css/utilities';
```

### Import utilities minified:

```css
@import '@mild-ui/core/css/utilities/min';
```

### Import full Mild UI (utilities + components):

```css
@import '@mild-ui/core/css';
```

## Available Utility Classes

### Layout & Display

```css
/* Display */
.mild-block
.mild-inline-block
.mild-inline
.mild-flex
.mild-inline-flex
.mild-grid
.mild-inline-grid
.mild-hidden

/* Flexbox */
.mild-flex-row
.mild-flex-col
.mild-flex-wrap
.mild-flex-nowrap

/* Align Items */
.mild-items-start
.mild-items-end
.mild-items-center
.mild-items-baseline
.mild-items-stretch

/* Justify Content */
.mild-justify-start
.mild-justify-end
.mild-justify-center
.mild-justify-between
.mild-justify-around
.mild-justify-evenly

/* Position */
.mild-static
.mild-fixed
.mild-absolute
.mild-relative
.mild-sticky
```

### Spacing

```css
/* Margin - Available values: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 */
.mild-m-{size}      /* All sides */
.mild-mx-{size}     /* Horizontal */
.mild-my-{size}     /* Vertical */
.mild-mt-{size}     /* Top */
.mild-mr-{size}     /* Right */
.mild-mb-{size}     /* Bottom */
.mild-ml-{size}     /* Left */

/* Padding - Same values as margin */
.mild-p-{size}
.mild-px-{size}
.mild-py-{size}
.mild-pt-{size}
.mild-pr-{size}
.mild-pb-{size}
.mild-pl-{size}

/* Gap (for flexbox/grid) */
.mild-gap-{size}
.mild-gap-x-{size}
.mild-gap-y-{size}

/* Space between children */
.mild-space-x-{size}
.mild-space-y-{size}
```

### Sizing

```css
/* Width & Height - Available from spacing and dimension tokens */
.mild-w-{size}
.mild-h-{size}
.mild-min-w-{size}
.mild-min-h-{size}
.mild-max-w-{size}
.mild-max-h-{size}
```

### Colors

```css
/* Text Colors - Available for all color tokens (primary, gray, etc.) */
.mild-text-{color}-{shade}    /* e.g., .mild-text-primary-500 */
.mild-text-muted
.mild-text-emphasis
.mild-text-current

/* Background Colors */
.mild-bg-{color}-{shade}      /* e.g., .mild-bg-gray-100 */
.mild-bg-background
.mild-bg-muted

/* Border Colors */
.mild-border-{color}-{shade}
.mild-border-default

/* Fill */
.mild-fill-current
```

### Typography

```css
/* Font Size - xs, sm, base, lg, xl, 2xl, 3xl, 4xl */
.mild-text-{size}             /* e.g., .mild-text-lg */

/* Font Weight - normal, medium, semibold, bold */
.mild-font-{weight}           /* e.g., .mild-font-semibold */

/* Font Family */
.mild-font-{family}           /* Based on your typography tokens */

/* Text Alignment */
.mild-text-left
.mild-text-center
.mild-text-right
.mild-text-justify

/* Text Transform */
.mild-text-uppercase
.mild-text-lowercase
.mild-text-capitalize

/* Text Decoration */
.mild-text-underline
.mild-text-line-through
.mild-text-no-underline

/* Line Height */
.mild-leading-{height}        /* Based on your line-height tokens */

/* Letter Spacing */
.mild-tracking-{spacing}      /* Based on your letter-spacing tokens */
```

### Borders

```css
/* Border Width - 0, 2, 4, 8 */
.mild-border-{width}          /* All sides */
.mild-border-x-{width}        /* Horizontal */
.mild-border-y-{width}        /* Vertical */
.mild-border-t-{width}        /* Top */
.mild-border-r-{width}        /* Right */
.mild-border-b-{width}        /* Bottom */
.mild-border-l-{width}        /* Left */

/* Border Style */
.mild-border-solid
.mild-border-dashed
.mild-border-dotted
.mild-border-double
.mild-border-none

/* Border Radius */
.mild-radius-{size}           /* Based on your radius tokens */
```

### Shadows & Effects

```css
/* Box Shadow */
.mild-shadow-none
.mild-shadow-sm
.mild-shadow
.mild-shadow-md
.mild-shadow-lg
.mild-shadow-xl
.mild-shadow-2xl
.mild-shadow-inner

/* Opacity */
.mild-opacity-0
.mild-opacity-25
.mild-opacity-50
.mild-opacity-75
.mild-opacity-100
```

### Transforms

```css
/* Transform */
.mild-transform
.mild-transform-none

/* Scale */
.mild-scale-0
.mild-scale-50
.mild-scale-75
.mild-scale-90
.mild-scale-95
.mild-scale-100
.mild-scale-105
.mild-scale-110
.mild-scale-125
.mild-scale-150

/* Rotate */
.mild-rotate-0
.mild-rotate-1
.mild-rotate-2
.mild-rotate-3
.mild-rotate-6
.mild-rotate-12
.mild-rotate-45
.mild-rotate-90
.mild-rotate-180
```

### Grid

```css
/* Grid Template Columns/Rows - 1-12 */
.mild-grid-cols-{n}           /* e.g., .mild-grid-cols-3 */
.mild-grid-rows-{n}

/* Grid Span - 1-12 */
.mild-col-span-{n}
.mild-row-span-{n}
```

### Miscellaneous

```css
/* Cursor */
.mild-cursor-auto
.mild-cursor-default
.mild-cursor-pointer
.mild-cursor-wait
.mild-cursor-text
.mild-cursor-move
.mild-cursor-help
.mild-cursor-not-allowed

/* User Select */
.mild-select-none
.mild-select-text
.mild-select-all
.mild-select-auto

/* Pointer Events */
.mild-pointer-events-none
.mild-pointer-events-auto

/* Visibility */
.mild-visible
.mild-invisible

/* Overflow */
.mild-overflow-auto
.mild-overflow-hidden
.mild-overflow-visible
.mild-overflow-scroll

/* Z-Index - 1-5, 10, 20, 30, 40, 50 */
.mild-z-{index}

/* Transitions */
.mild-transition-none
.mild-transition-all
.mild-transition-colors
.mild-transition-opacity
.mild-transition-shadow
.mild-transition-transform
```

### Container

```css
/* Responsive Container */
.mild-container
```

## Dark Mode Support

All utilities automatically support dark mode through:

1. **System preference**: `@media (prefers-color-scheme: dark)`
2. **Manual toggle**: `[data-theme="dark"]` attribute

## Why Use Mild UI Utilities?

1. **No Conflicts**: Uses `mild-` prefix so you can use alongside Tailwind CSS
2. **Design System Integration**: Utilities are based on your design tokens
3. **Component Ready**: Designed to work seamlessly with Mild UI components
4. **Consistent**: All utilities follow the same naming conventions as your components
5. **Customizable**: Extend or modify utilities through SCSS variables and tokens

## Customization

You can customize utilities by modifying the design tokens in your SCSS files:

```scss
@use '@mild-ui/core/src/sass/tokens/colors' with (
  $mild-colors: (
    primary: (
      500: #your-color
    )
  )
);
```