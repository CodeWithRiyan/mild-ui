# @mild-ui/core

Pure CSS/SCSS design system with Tailwind-like utilities - framework agnostic, no runtime dependencies

## Overview

@mild-ui/core provides a comprehensive CSS/SCSS design system with utility classes similar to Tailwind CSS, but with the `mild-` prefix to avoid conflicts. This package contains only CSS and SCSS files - no TypeScript types or JavaScript utilities.

## Features

- **Tailwind-like utilities** with `mild-` prefix (no conflicts!)
- **Design tokens** as CSS custom properties
- **Component styles** for React/Vue packages
- **Dark/Light themes** with automatic switching
- **Responsive design** with mobile-first approach
- **No runtime dependencies** - pure CSS/SCSS only

## Installation

```bash
npm install @mild-ui/core
```

## Usage

### Import CSS utilities only:

```css
@import "@mild-ui/core/css/utilities";
```

### Import full design system (utilities + components):

```css
@import "@mild-ui/core/css";
```

### Import SCSS for customization:

```scss
@use "@mild-ui/core/scss";
```

### Minified versions:

```css
@import "@mild-ui/core/css/min";
@import "@mild-ui/core/css/utilities/min";
```

## Available Utility Classes

All utilities use the `mild-` prefix to avoid conflicts with Tailwind CSS:

```html
<!-- Layout -->
<div class="mild-flex mild-items-center mild-justify-between">
  <!-- Spacing -->
  <div class="mild-p-4 mild-m-2 mild-gap-4">
    <!-- Colors -->
    <div class="mild-bg-primary-500 mild-text-white">
      <!-- Typography -->
      <h1 class="mild-text-xl mild-font-bold">
        <!-- Borders -->
        <div class="mild-border mild-border-gray-200 mild-radius-md"></div>
      </h1>
    </div>
  </div>
</div>
```

## Use with Tailwind CSS

Since all utilities use the `mild-` prefix, you can use both libraries together:

```html
<div class="flex items-center">
  <!-- Tailwind -->
  <div class="mild-p-4 mild-bg-primary-100">
    <!-- Mild UI -->
    No conflicts!
  </div>
</div>
```

## Theming

### Accent

Primary buttons, checked checkboxes/radios/switches, focus rings and active tabs all read one token, `--mild-color-accent` (default: `--mild-color-primary-500`), with `-hover`, `-active`, `-foreground`, `-soft`, `-subtle` and `-muted` shades. Re-theme the interactive color in one place, at build time or at runtime:

```css
:root {
  --mild-color-accent: var(--mild-color-green-600);
  --mild-color-accent-hover: var(--mild-color-green-700);
  --mild-color-accent-active: var(--mild-color-green-800);
}
```

```js
document.documentElement.style.setProperty("--mild-color-accent", "#e11d48");
```

`--mild-color-accent` is the brand color; the older `--mild-accent` is the subtle surface tint (gray-100) used for hover rows and the like.

### Translucent colors

Overlays, scrims and gradients use `--mild-color-black-alpha-{0..90}` and `--mild-color-white-alpha-{0..90}` (10 = 10% opaque), plus `--mild-color-white`/`--mild-color-black`, instead of `rgba()` literals.

### Dark mode

Automatic dark mode support:

```css
/* System preference */
@media (prefers-color-scheme: dark) { /* handled automatically */ }

/* Manual toggle */
<html data-theme="dark">
```

## Package Exports

- `@mild-ui/core/css` - Full CSS (utilities + components)
- `@mild-ui/core/mild-ui.css` - Same file as `@mild-ui/core/css`, with a `.css` extension for TypeScript projects that check side-effect imports
- `@mild-ui/core/css/min` - Minified full CSS
- `@mild-ui/core/css/utilities` - Utilities only
- `@mild-ui/core/css/utilities/min` - Minified utilities
- `@mild-ui/core/scss` - Main SCSS entry point
- `@mild-ui/core/scss/utilities` - Utilities SCSS only
- `@mild-ui/core/scss/tokens/*` - Individual Sass token modules (`colors`, `spacing`, `typography`, `radius`, `elevation`, `breakpoints`, `animation`, `dimensions`) with their functions, e.g. `@use "@mild-ui/core/scss/tokens/colors" as colors;` then `colors.mild-color("yellow", 600)`
- `@mild-ui/core/themes/light` - Light theme CSS
- `@mild-ui/core/themes/dark` - Dark theme CSS
- `@mild-ui/core/tokens` - Design tokens JSON

## Component styles are written in tokens

`src/sass/components/**/*.scss` is linted with [Stylelint](https://stylelint.io/) (`stylelint.config.mjs`, run by the root `pnpm lint`): no hex, `rgb()`/`rgba()`/`hsl()`, named colors or `px` literals — only `var(--mild-*)` tokens and Sass token functions. Literals live in `src/sass/tokens/` and the `:root` block of `index.scss`. The two agreed exceptions (px in `@media` features, and the accordion's `max-height` transition ceiling) are written in the config with their reasons.

## Documentation

- [Utilities Guide](./UTILITIES.md) - Complete list of utility classes
- [Storybook](https://codewithriyan.github.io/mild-ui/) - Interactive examples

## Framework Packages

This core package is used by:

- [`@mild-ui/react`](../react) - React components
- [`@mild-ui/vue`](../vue) - Vue components

## License

MIT
