# mild-ui

mild-ui is a comprehensive cross-platform UI component library with **SASS-powered styling** that works seamlessly across React, Vue, React Native, and Flutter. Built with **zero external dependencies**, mild-ui provides a complete design system with pre-compiled styling, offering the simplicity of Chakra UI with the power of a systematic SASS architecture.

## Features

- 🌐 **Cross-platform compatibility**: Works with React, Vue, React Native, and Flutter
- 🎨 **SASS-powered design system**: Advanced styling foundation with zero runtime dependencies
- 🧩 **Framework-agnostic core**: Universal design tokens and component logic
- 🌈 **Unified developer experience**: Consistent API and styling across all platforms
- 📦 **Zero external dependencies**: Complete styling and functionality included - no CSS frameworks or build tools required
- ⚡ **Pre-compiled styling**: SASS compilation happens during package build, not your build
- 🎯 **CSS custom properties**: Runtime theming without SASS knowledge
- 📚 **TypeScript-first**: Built with TypeScript for improved type safety
- ♿ **Accessibility-compliant**: Built-in accessibility features across all platforms
- 🔧 **Chakra UI-style DX**: Simple npm install with immediate usage

## Installation

### React (Web)

```bash
npm install @mild-ui/react
```

### Vue (Web)

```bash
npm install @mild-ui/vue
```

### React Native (Mobile)

```bash
npm install @mild-ui/react-native
```

### Flutter (Mobile)

```yaml
# pubspec.yaml
dependencies:
  mild_ui: ^1.0.0
```

## Quick Start

### React

```tsx
import { ThemeProvider, Button, Input, Card } from "@mild-ui/react";

function App() {
  return (
    <ThemeProvider>
      <Card padding="lg">
        <Button colorScheme="primary" size="lg">
          Get Started
        </Button>
        <Input placeholder="Enter your name" variant="outline" />
      </Card>
    </ThemeProvider>
  );
}
```

### Vue

```vue
<template>
  <ThemeProvider>
    <Card padding="lg">
      <Button color-scheme="primary" size="lg"> Get Started </Button>
      <Input placeholder="Enter your name" variant="outline" />
    </Card>
  </ThemeProvider>
</template>

<script setup>
import { ThemeProvider, Button, Input, Card } from "@mild-ui/vue";
</script>
```

### React Native

```tsx
import { ThemeProvider, Button, Input, Card } from "@mild-ui/react-native";

export default function App() {
  return (
    <ThemeProvider>
      <Card padding="lg">
        <Button
          colorScheme="primary"
          size="lg"
          onPress={() => console.log("Pressed!")}
        >
          Get Started
        </Button>
        <Input placeholder="Enter your name" variant="outline" />
      </Card>
    </ThemeProvider>
  );
}
```

### Flutter

```dart
import 'package:mild_ui/mild_ui.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MildApp(
      home: Scaffold(
        body: MildCard(
          padding: CardPadding.lg,
          child: Column(
            children: [
              MildButton(
                colorScheme: 'primary',
                size: ButtonSize.lg,
                onPressed: () => print('Pressed!'),
                child: Text('Get Started'),
              ),
              MildInput(
                placeholder: 'Enter your name',
                variant: InputVariant.outline,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

## Available Components

### ✅ **Form Components**

- **Button** - Multiple variants (solid, outline, ghost, link) with 5 sizes and 6 color schemes
- **Input** - Text input with validation states and multiple variants
- **Checkbox** - Interactive checkbox with indeterminate state
- **Radio** - Radio button groups with custom styling
- **Select** - Dropdown selection with searchable options
- **Switch** - Toggle switch with smooth animations
- **FormControl** - Form field wrapper with validation
- **FormLabel** - Accessible form labels
- **FormErrorMessage** - Error message display

### ✅ **Layout & Display**

- **Box** - Layout primitive with flexbox and grid support
- **Text** - Typography component with responsive sizing
- **Card** - Content container with elevation and variants
- **Alert** - Feedback messages with multiple status types
- **Spinner** - Loading indicators with multiple variants

### ✅ **Navigation & Interaction**

- **Tabs** - Tabbed navigation with multiple styles
- **Modal** - Overlay dialogs with size variants
- **Accordion** - Collapsible content sections

### 🔄 **Coming Soon**

- Badge, Avatar, Tooltip, Popover
- Table, List, Breadcrumb
- DatePicker, Slider, Progress
- Drawer, Menu, Pagination

## Advanced Theming

mild-ui provides extensive theming capabilities through **CSS custom properties** (no SASS knowledge required):

### Basic Theme Customization

```tsx
import { ThemeProvider } from "@mild-ui/react";

const customTheme = {
  colors: {
    primary: {
      500: "#8B5CF6", // Purple primary
      600: "#7C3AED",
    },
  },
  spacing: {
    "4": "1.5rem", // Custom spacing
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### CSS Custom Properties

```css
:root {
  /* Color system */
  --mild-color-primary-500: #8b5cf6;
  --mild-color-primary-600: #7c3aed;

  /* Spacing system */
  --mild-space-4: 1.5rem;

  /* Typography */
  --mild-font-size-lg: 1.25rem;

  /* Border radius */
  --mild-radius-md: 0.5rem;
}

/* Dark mode */
[data-theme="dark"] {
  --mild-color-primary-500: #a78bfa;
  --mild-background: #1f2937;
  --mild-foreground: #f9fafb;
}
```

### Color Mode Toggle

```tsx
import { useTheme } from "@mild-ui/react";

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useTheme();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? "🌙" : "☀️"}
    </Button>
  );
}
```

## SASS-Powered Architecture (Internal)

While **users never interact with SASS**, mild-ui is built on a sophisticated SASS foundation:

- **🎯 Design Token System**: Systematic color, typography, and spacing generation
- **🔧 Component Variants**: Automatic variant and size generation using SASS loops
- **📱 Cross-Platform Compilation**: SASS compiles to CSS (web), StyleSheet objects (React Native), and Dart themes (Flutter)
- **⚡ Zero Runtime Overhead**: All SASS pre-compiled during package build
- **🎨 Advanced Theming**: CSS custom properties generated from SASS token system

## Platform-Specific Features

### Web (React, Vue)

- Responsive design with CSS Grid and Flexbox
- CSS custom properties for runtime theming
- Optimized CSS bundles with tree-shaking
- SSR/SSG compatibility

### Mobile (React Native)

- Platform-adaptive components (iOS/Android)
- Optimized StyleSheet objects
- Native performance with pre-compiled styles
- React Navigation integration

### Mobile (Flutter)

- Material Design and Cupertino adaptive widgets
- Dart theme system with design tokens
- Flutter widget composition patterns
- Platform-specific animations

## Documentation

- **📖 [React Storybook](https://mild-ui.github.io/react/)** - Interactive React component documentation
- **🎯 [Vue Storybook](https://mild-ui.github.io/vue/)** - Vue component examples and API
- **📱 [React Native Storybook](https://mild-ui.github.io/react-native/)** - Mobile component showcase
- **🎨 [Flutter Widgetbook](https://mild-ui.github.io/flutter/)** - Flutter widget documentation

## Examples

- **[React Example](./examples/react/)** - Complete React application
- **[Vue Example](./examples/vue/)** - Vue 3 with Composition API
- **[React Native Example](./examples/react-native/)** - Mobile app example
- **[Flutter Example](./examples/flutter/)** - Flutter application

## Contributing

We welcome contributions! mild-ui is designed to be extensible to new frameworks and platforms.

### Adding Components

1. Implement component types in `packages/core/src/components/`
2. Add SASS styling in `packages/core/src/sass/components/`
3. Create platform implementations in respective packages
4. Add documentation to Storybook/Widgetbook

### Adding Framework Support

Want to add Angular, Svelte, or native mobile support? Check out our [Extension Guide](./EXTENSION_GUIDE.md) for detailed instructions.

### Development Setup

```bash
# Clone and install
git clone https://github.com/mild-ui/mild-ui.git
cd mild-ui
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev

# Run Storybooks
pnpm storybook:react
pnpm storybook:vue
```

## License

mild-ui is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Why mild-ui?

- **🚀 Zero Setup**: `npm install` → `import` → use (no CLI, build config, or SASS setup)
- **🎨 Design System**: Comprehensive SASS-powered foundation (invisible to users)
- **📱 Universal**: Same components work across web and mobile platforms
- **⚡ Performance**: Pre-compiled styling with zero runtime overhead
- **🔧 DX**: Chakra UI-inspired developer experience with advanced theming
- **🌍 Cross-Platform**: Future-ready architecture for any framework or platform

**Get started in seconds. Scale across platforms. Powered by SASS. Zero dependencies.**
