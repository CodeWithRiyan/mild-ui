# @mild-ui/core

> **Pure SASS Design System with Utility Classes**  
> Like Tailwind CSS but with `mild-` prefix to avoid conflicts

A comprehensive design system built with SASS that provides design tokens, utility classes, and theming support. Perfect for building consistent UIs across any framework.

## ✨ Features

- 🎨 **Complete Design System** - Colors, spacing, typography, shadows, and more
- 🔧 **Utility Classes** - Thousands of utility classes like `.mild-flex`, `.mild-p-4`, `.mild-bg-blue-500`
- 🌓 **Built-in Theming** - Light and dark mode support
- 🚫 **No Conflicts** - `mild-` prefix prevents conflicts with Tailwind CSS
- ⚡ **Zero Dependencies** - Pure SASS with no runtime dependencies
- 📱 **Framework Agnostic** - Works with React, Vue, Angular, or plain HTML
- 🎯 **Tailwind-like DX** - Familiar utility-first approach

## 📦 Installation

```bash
npm install @mild-ui/core
# or
yarn add @mild-ui/core
# or
pnpm add @mild-ui/core
```

## 🚀 Quick Start

### Method 1: Import Compiled CSS

```css
/* Import the complete design system */
@import '@mild-ui/core/css';

/* Or import minified version for production */
@import '@mild-ui/core/css/min';
```

### Method 2: Import SASS Source

```scss
// Import everything
@import '@mild-ui/core/sass';

// Or import specific parts
@import '@mild-ui/core/sass/tokens/colors';
@import '@mild-ui/core/utilities/spacing';
```

### Method 3: HTML Link (CDN)

```html
<link rel="stylesheet" href="https://unpkg.com/@mild-ui/core/dist/mild-ui.css">
```

## 🎨 Usage Examples

### Basic Layout

```html
<div class="mild-flex mild-items-center mild-justify-center mild-min-h-screen mild-bg-gray-50">
  <div class="mild-max-w-md mild-w-full mild-bg-white mild-rounded-lg mild-shadow-md mild-p-6">
    <h1 class="mild-text-2xl mild-font-bold mild-text-gray-900 mild-mb-4">
      Welcome to Mild UI
    </h1>
    <p class="mild-text-gray-600 mild-mb-6">
      A beautiful design system with utility classes.
    </p>
    <button class="mild-w-full mild-bg-blue-500 mild-text-white mild-py-3 mild-px-4 mild-rounded-md mild-font-medium hover:mild-bg-blue-600 mild-transition-colors">
      Get Started
    </button>
  </div>
</div>
```

### Card Component

```html
<div class="mild-bg-white mild-rounded-xl mild-shadow-lg mild-overflow-hidden">
  <img class="mild-w-full mild-h-48 mild-object-cover" src="image.jpg" alt="Card image">
  <div class="mild-p-6">
    <h3 class="mild-text-xl mild-font-semibold mild-text-gray-900 mild-mb-2">
      Card Title
    </h3>
    <p class="mild-text-gray-600 mild-mb-4">
      Card description text goes here.
    </p>
    <div class="mild-flex mild-items-center mild-justify-between">
      <span class="mild-text-2xl mild-font-bold mild-text-blue-600">$29</span>
      <button class="mild-bg-blue-500 mild-text-white mild-px-4 mild-py-2 mild-rounded-md mild-text-sm mild-font-medium">
        Add to Cart
      </button>
    </div>
  </div>
</div>
```

### Form Example

```html
<form class="mild-space-y-4 mild-max-w-md mild-mx-auto">
  <div>
    <label class="mild-block mild-text-sm mild-font-medium mild-text-gray-700 mild-mb-1">
      Email Address
    </label>
    <input 
      type="email" 
      class="mild-w-full mild-px-3 mild-py-2 mild-border mild-border-gray-300 mild-rounded-md mild-focus:outline-none mild-focus:ring-2 mild-focus:ring-blue-500"
      placeholder="Enter your email"
    >
  </div>
  
  <div>
    <label class="mild-block mild-text-sm mild-font-medium mild-text-gray-700 mild-mb-1">
      Password
    </label>
    <input 
      type="password" 
      class="mild-w-full mild-px-3 mild-py-2 mild-border mild-border-gray-300 mild-rounded-md mild-focus:outline-none mild-focus:ring-2 mild-focus:ring-blue-500"
      placeholder="Enter your password"
    >
  </div>
  
  <button 
    type="submit"
    class="mild-w-full mild-bg-blue-500 mild-text-white mild-py-2 mild-px-4 mild-rounded-md mild-font-medium mild-hover:bg-blue-600 mild-focus:outline-none mild-focus:ring-2 mild-focus:ring-blue-500"
  >
    Sign In
  </button>
</form>
```

## 🎯 Design Tokens

### Colors

```scss
// Use in SASS
.my-component {
  color: color('primary', 500);
  background-color: color('gray', 50);
}
```

Available color scales:
- **Base Colors**: `blue`, `gray`, `red`, `green`, `yellow`, `purple`, `teal`, `orange`
- **Semantic Colors**: `primary`, `secondary`, `success`, `warning`, `danger`, `info`
- **Shades**: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`

### Spacing

```scss
// Use in SASS
.my-component {
  margin: spacing('4');    // 1rem
  padding: spacing('2');   // 0.5rem
}
```

Available sizes: `0`, `px`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `44`, `48`, `52`, `56`, `60`, `64`, `72`, `80`, `96`

### Typography

```scss
// Use in SASS
.my-component {
  font-size: font-size('lg');      // 1.125rem
  font-weight: font-weight('bold'); // 700
  font-family: font-family('sans'); // System font stack
}
```

- **Font Sizes**: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl`, `9xl`
- **Font Weights**: `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`
- **Font Families**: `sans`, `serif`, `mono`

## 🔧 Utility Classes

### Layout

```html
<!-- Display -->
<div class="mild-flex mild-grid mild-block mild-inline mild-hidden">

<!-- Position -->
<div class="mild-relative mild-absolute mild-fixed mild-sticky">

<!-- Flexbox -->
<div class="mild-flex mild-flex-col mild-items-center mild-justify-between">

<!-- Grid -->
<div class="mild-grid mild-grid-cols-3 mild-gap-4">

<!-- Width & Height -->
<div class="mild-w-full mild-h-64 mild-w-96 mild-h-auto">
```

### Spacing

```html
<!-- Margin -->
<div class="mild-m-4 mild-mx-auto mild-mt-8 mild-mb-0">

<!-- Padding -->
<div class="mild-p-6 mild-px-4 mild-py-2">

<!-- Negative Margins -->
<div class="mild--mt-4 mild--mx-2">
```

### Colors

```html
<!-- Text Colors -->
<p class="mild-text-blue-500 mild-text-gray-900 mild-text-white">

<!-- Background Colors -->
<div class="mild-bg-red-500 mild-bg-gray-100 mild-bg-transparent">

<!-- Border Colors -->
<div class="mild-border mild-border-blue-300 mild-border-gray-200">
```

### Typography

```html
<!-- Font Size -->
<h1 class="mild-text-4xl mild-text-lg mild-text-sm">

<!-- Font Weight -->
<p class="mild-font-bold mild-font-medium mild-font-light">

<!-- Text Alignment -->
<p class="mild-text-center mild-text-left mild-text-right">

<!-- Text Transform -->
<p class="mild-uppercase mild-lowercase mild-capitalize">
```

### Borders & Effects

```html
<!-- Border Radius -->
<div class="mild-rounded-lg mild-rounded-full mild-rounded-none">

<!-- Shadows -->
<div class="mild-shadow-md mild-shadow-lg mild-shadow-none">

<!-- Opacity -->
<div class="mild-opacity-50 mild-opacity-100 mild-opacity-0">
```

## 🌓 Dark Mode

Mild UI includes built-in dark mode support:

```html
<!-- Toggle dark mode by adding data-theme attribute -->
<html data-theme="dark">
  <body class="mild-bg-gray-900 mild-text-white">
    <!-- Your content automatically adapts -->
  </body>
</html>
```

```javascript
// Toggle theme with JavaScript
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}
```

## ⚙️ Customization

### Custom SASS Variables

```scss
// Override design tokens before importing
$mild-colors: map-merge($mild-colors, (
  'primary-500': #8b5cf6,  // Custom purple
  'primary-600': #7c3aed,
));

@import '@mild-ui/core/sass';
```

### Custom CSS Properties

```css
:root {
  /* Override specific design tokens */
  --mild-color-primary-500: #8b5cf6;
  --mild-color-primary-600: #7c3aed;
  --mild-space-4: 1.5rem;
  --mild-font-size-lg: 1.25rem;
}
```

## 🤝 Compatibility with Tailwind CSS

Mild UI uses the `mild-` prefix for all utility classes, so it's **100% compatible** with Tailwind CSS:

```html
<!-- Mix and match without conflicts -->
<div class="flex p-4 bg-blue-500">  <!-- Tailwind -->
  <div class="mild-flex mild-p-4 mild-bg-red-500">  <!-- Mild UI -->
    No conflicts!
  </div>
</div>
```

## 📁 Package Structure

```
@mild-ui/core/
├── dist/
│   ├── mild-ui.css         # Compiled CSS
│   └── mild-ui.min.css     # Minified CSS
├── src/
│   ├── sass/               # SASS source files
│   │   ├── tokens/         # Design tokens
│   │   ├── base/           # Base styles
│   │   └── themes/         # Theme files
│   └── utilities/          # Utility classes
│       ├── _layout.scss
│       ├── _spacing.scss
│       ├── _colors.scss
│       ├── _typography.scss
│       ├── _borders.scss
│       └── _effects.scss
└── README.md
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build CSS from SASS
pnpm run build

# Watch for changes during development
pnpm run dev

# Clean build artifacts
pnpm run clean
```

## 📊 Bundle Size

- **Full CSS**: ~45KB (uncompressed)
- **Minified CSS**: ~35KB (compressed)
- **Gzipped**: ~8KB

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ by the Mild UI team**
