# @mild-ui/core

Pure CSS/SCSS design system with Tailwind-like utilities - framework agnostic with zero dependencies

## Overview

@mild-ui/core provides a comprehensive CSS/SCSS design system with utility classes similar to Tailwind CSS, but with the `mild-` prefix to avoid conflicts. This package contains only CSS and SCSS files - no TypeScript types or JavaScript utilities.

## Features

- **Tailwind-like utilities** with `mild-` prefix (no conflicts!)
- **Design tokens** as CSS custom properties
- **Component styles** for React/Vue packages
- **Dark/Light themes** with automatic switching
- **Responsive design** with mobile-first approach
- **Zero dependencies** - pure CSS/SCSS only

## Installation

```bash
npm install @mild-ui/core
```

## Usage

### Import CSS utilities only:
```css
@import '@mild-ui/core/css/utilities';
```

### Import full design system (utilities + components):
```css
@import '@mild-ui/core/css';
```

### Import SCSS for customization:
```scss
@use '@mild-ui/core/scss';
```

### Minified versions:
```css
@import '@mild-ui/core/css/min';
@import '@mild-ui/core/css/utilities/min';
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
<div class="mild-border mild-border-gray-200 mild-radius-md">
```

## Use with Tailwind CSS

Since all utilities use the `mild-` prefix, you can use both libraries together:

```html
<div class="flex items-center"> <!-- Tailwind -->
  <div class="mild-p-4 mild-bg-primary-100"> <!-- Mild UI -->
    No conflicts!
  </div>
</div>
```

## Theming

Automatic dark mode support:

```css
/* System preference */
@media (prefers-color-scheme: dark) { /* handled automatically */ }

/* Manual toggle */
<html data-theme="dark">
```

## Package Exports

- `@mild-ui/core/css` - Full CSS (utilities + components)
- `@mild-ui/core/css/min` - Minified full CSS
- `@mild-ui/core/css/utilities` - Utilities only
- `@mild-ui/core/css/utilities/min` - Minified utilities
- `@mild-ui/core/scss` - Main SCSS entry point
- `@mild-ui/core/scss/utilities` - Utilities SCSS only
- `@mild-ui/core/themes/light` - Light theme CSS
- `@mild-ui/core/themes/dark` - Dark theme CSS
- `@mild-ui/core/tokens` - Design tokens JSON

## Documentation

- [Utilities Guide](./UTILITIES.md) - Complete list of utility classes
- [Storybook](https://codewithriyan.github.io/mild-ui/) - Interactive examples

## Mobile Platform Support

Convert mild-ui design tokens to mobile platforms:

### 🐦 Flutter
```dart
import 'package:flutter/material.dart';
import 'themes/mild_theme.dart';

// Use in MaterialApp
MaterialApp(
  theme: MildTheme.lightTheme,
  darkTheme: MildTheme.darkTheme,
)

// Use utility extensions
Text('Hello').textXl().fontBold().p4()
```

### 📱 React Native
```javascript
import { MildTheme, MildUtils } from '@mild-ui/core/react-native/theme';

// Use in StyleSheet
const styles = StyleSheet.create({
  container: {
    ...MildUtils.spacing.p4,
    backgroundColor: MildTheme.colors.primary[500],
  }
});
```

### Generate Mobile Themes
```bash
npm run mobile:flutter      # Generate Flutter theme
npm run mobile:react-native # Generate React Native theme  
npm run mobile:all          # Generate both platforms
```

## Framework Packages

This core package is used by:
- [`@mild-ui/react`](../react) - React components
- [`@mild-ui/vue`](../vue) - Vue components
- **Flutter** - Auto-generated Dart theme files
- **React Native** - Auto-generated StyleSheet utilities

## License

MIT