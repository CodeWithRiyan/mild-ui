# @mild-ui/core Examples

This directory contains practical examples demonstrating how to use @mild-ui/core CSS utilities and components in real-world scenarios.

## 📁 Available Examples

### 1. [Basic Examples (`index.html`)](./index.html)
**What it shows:**
- Layout utilities (flexbox, grid)
- Form components and styling
- Card components with shadows and borders
- Dark mode implementation
- Typography and spacing utilities

**Key mild-ui features:**
- `mild-flex`, `mild-grid` layout systems
- `mild-p-*`, `mild-m-*` spacing utilities
- `mild-bg-*`, `mild-text-*` color utilities
- `mild-radius-*`, `mild-shadow-*` styling utilities

### 2. [Landing Page (`landing-page.html`)](./landing-page.html)
**What it shows:**
- Complete marketing website layout
- Navigation with responsive design
- Hero section with gradients
- Feature cards and testimonials
- Call-to-action sections
- Footer with links

**Key mild-ui features:**
- Responsive grid: `mild-grid-cols-1 md:mild-grid-cols-3`
- Spacing system: `mild-py-20`, `mild-px-4`
- Typography scale: `mild-text-xl`, `mild-text-4xl`
- Color system: `mild-bg-blue-600`, `mild-text-white`
- Interactive states: `hover:mild-bg-blue-700`

### 3. [Dashboard (`dashboard.html`)](./dashboard.html)
**What it shows:**
- Admin dashboard layout with sidebar
- Statistics cards with icons
- Data tables with hover effects
- Chart placeholder areas
- Activity feeds and notifications
- Complex responsive layouts

**Key mild-ui features:**
- Layout: `mild-flex`, `mild-w-64` (sidebar width)
- Cards: `mild-bg-white`, `mild-shadow-sm`, `mild-radius-lg`
- Tables: `mild-divide-y`, `hover:mild-bg-gray-50`
- Status badges: `mild-bg-green-100`, `mild-text-green-800`
- Complex spacing: `mild-space-y-4`, `mild-gap-6`

## 🚀 How to Use These Examples

### Option 1: View Directly
Open any HTML file in your browser to see the examples in action.

### Option 2: Serve Locally
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Then visit http://localhost:8000
```

### Option 3: Copy Components
Copy specific sections from the examples into your own projects.

## 📋 What Each Example Teaches

### Layout Patterns
```html
<!-- Flexbox Layout -->
<div class="mild-flex mild-items-center mild-justify-between">
  <div>Left content</div>
  <div>Right content</div>
</div>

<!-- Grid Layout -->
<div class="mild-grid mild-grid-cols-1 md:mild-grid-cols-3 mild-gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

### Component Patterns
```html
<!-- Card Component -->
<div class="mild-bg-white mild-p-6 mild-radius-lg mild-shadow-sm mild-border">
  <h3 class="mild-text-lg mild-font-semibold mild-mb-4">Card Title</h3>
  <p class="mild-text-gray-600">Card content</p>
</div>

<!-- Button Component -->
<button class="mild-px-4 mild-py-2 mild-bg-blue-600 mild-text-white mild-radius-md hover:mild-bg-blue-700 mild-transition-colors">
  Click me
</button>
```

### Form Patterns
```html
<!-- Input Field -->
<div>
  <label class="mild-block mild-text-sm mild-font-medium mild-text-gray-700 mild-mb-1">
    Email
  </label>
  <input type="email" 
         class="mild-w-full mild-px-3 mild-py-2 mild-border mild-border-gray-300 mild-radius-md focus:mild-border-blue-500" 
         placeholder="Enter your email">
</div>
```

### Responsive Patterns
```html
<!-- Responsive Grid -->
<div class="mild-grid mild-grid-cols-1 sm:mild-grid-cols-2 lg:mild-grid-cols-4 mild-gap-4">
  <!-- Content adapts from 1 column on mobile to 4 on large screens -->
</div>

<!-- Responsive Text -->
<h1 class="mild-text-2xl md:mild-text-4xl lg:mild-text-6xl mild-font-bold">
  Responsive Heading
</h1>
```

## 🎨 Design Tokens Used

These examples demonstrate the full range of mild-ui design tokens:

### Colors
- **Primary**: `mild-bg-blue-600`, `mild-text-blue-600`
- **Grays**: `mild-bg-gray-50` through `mild-bg-gray-900`
- **Status**: `mild-bg-green-100`, `mild-bg-red-100`, `mild-bg-yellow-100`

### Spacing
- **Padding**: `mild-p-2`, `mild-p-4`, `mild-p-6`, `mild-p-8`
- **Margin**: `mild-m-2`, `mild-m-4`, `mild-mb-6`, `mild-mt-8`
- **Gap**: `mild-gap-2`, `mild-gap-4`, `mild-gap-6`, `mild-gap-8`

### Typography
- **Sizes**: `mild-text-xs`, `mild-text-sm`, `mild-text-base`, `mild-text-lg`, `mild-text-xl`
- **Weights**: `mild-font-normal`, `mild-font-medium`, `mild-font-semibold`, `mild-font-bold`

### Layout
- **Flexbox**: `mild-flex`, `mild-items-center`, `mild-justify-between`
- **Grid**: `mild-grid`, `mild-grid-cols-*`, `mild-col-span-*`
- **Sizing**: `mild-w-*`, `mild-h-*`, `mild-max-w-*`

## 💡 Tips for Using These Examples

1. **Start Simple**: Begin with the basic examples (`index.html`) to understand the utility system
2. **Copy Components**: Extract reusable components from the more complex examples
3. **Customize Colors**: Replace color classes to match your brand
4. **Add Interactions**: These are static examples - add JavaScript for full functionality
5. **Responsive First**: Notice how examples use responsive prefixes (`md:`, `lg:`)

## 🔗 Related Documentation

- [Main README](../README.md) - Core package overview
- [Utilities Guide](../UTILITIES.md) - Complete utility reference
- [Storybook](https://codewithriyan.github.io/mild-ui/) - Interactive component examples

## 🤝 Contributing Examples

Have a great example to share? We'd love to see it! Consider contributing:

1. Create a new HTML file with your example
2. Follow the existing patterns and naming conventions
3. Document what your example demonstrates
4. Submit a pull request

---

**Happy building with mild-ui! 🎉**