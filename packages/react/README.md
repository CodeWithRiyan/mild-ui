# @mild-ui/react

React components with **SASS-powered styling** for modern web applications. Part of the mild-ui cross-platform component library that works across React, Vue, React Native, and Flutter.

## Overview

@mild-ui/react provides production-ready React components with **pre-compiled SASS styling**, **zero external dependencies**, and comprehensive theming support. Built with TypeScript and designed for optimal performance with tree-shaking and SSR compatibility.

## Features

- 🎨 **SASS-powered styling** - Advanced design system with zero runtime overhead
- 📦 **Zero dependencies** - Complete styling system included, no CSS frameworks required
- 🎯 **CSS custom properties** - Runtime theming without SASS knowledge
- 📚 **TypeScript-first** - Full type safety with excellent IntelliSense
- ♿ **Accessibility-compliant** - WCAG 2.1 AA standards built-in
- ⚡ **Performance optimized** - Tree-shakable with minimal bundle impact
- 🌙 **Dark mode support** - Built-in color mode switching
- 📱 **Responsive design** - Mobile-first responsive components

## Installation

```bash
npm install @mild-ui/react
```

### Peer Dependencies
```bash
npm install react react-dom
```

## Quick Start

### 1. Set up ThemeProvider
```tsx
// app.tsx or index.tsx
import { ThemeProvider } from '@mild-ui/react';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

export default App;
```

### 2. Import and use components
```tsx
import { Button, Input, Card, Alert } from '@mild-ui/react';

function Dashboard() {
  return (
    <Card padding="lg" shadow="md">
      <Alert status="success" title="Welcome!">
        Your React app is ready with mild-ui components.
      </Alert>
      
      <Input 
        placeholder="Enter your name"
        variant="outline"
        size="lg"
      />
      
      <Button 
        colorScheme="primary" 
        size="lg"
        onClick={() => console.log('Clicked!')}
      >
        Get Started
      </Button>
    </Card>
  );
}
```

## Available Components

### ✅ **Form Components**
```tsx
import { 
  Button, 
  Input, 
  Checkbox, 
  Radio, 
  Select, 
  Switch,
  FormControl,
  FormLabel,
  FormErrorMessage 
} from '@mild-ui/react';
```

- **Button** - Multiple variants (solid, outline, ghost, link) with 5 sizes
- **Input** - Text input with validation states and variants
- **Checkbox** - Interactive checkbox with indeterminate state
- **Radio** - Radio button groups with custom styling
- **Select** - Dropdown selection with search capability
- **Switch** - Toggle switch with smooth animations
- **FormControl** - Form field wrapper with validation
- **FormLabel** - Accessible form labels
- **FormErrorMessage** - Error message display

### ✅ **Layout & Display**
```tsx
import { 
  Box, 
  Text, 
  Card, 
  Alert, 
  Spinner 
} from '@mild-ui/react';
```

- **Box** - Flexible layout primitive with CSS Grid and Flexbox
- **Text** - Typography component with responsive sizing
- **Card** - Content container with elevation and variants
- **Alert** - Feedback messages with status types
- **Spinner** - Loading indicators with multiple variants

### ✅ **Navigation & Interaction**
```tsx
import { 
  Tabs, 
  Modal, 
  Accordion 
} from '@mild-ui/react';
```

- **Tabs** - Tabbed navigation with multiple styles
- **Modal** - Overlay dialogs with size variants
- **Accordion** - Collapsible content sections

## Component Examples

### Button with Icons
```tsx
import { Button } from '@mild-ui/react';
import { ChevronRight, Download } from 'lucide-react';

function ButtonExamples() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button 
        variant="solid" 
        colorScheme="primary"
        leftIcon={<Download size={16} />}
      >
        Download
      </Button>
      
      <Button 
        variant="outline" 
        rightIcon={<ChevronRight size={16} />}
      >
        Next Step
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        isLoading
      >
        Loading...
      </Button>
    </div>
  );
}
```

### Form with Validation
```tsx
import { 
  FormControl, 
  FormLabel, 
  Input, 
  FormErrorMessage, 
  Button 
} from '@mild-ui/react';
import { useState } from 'react';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
      console.log('Form submitted:', email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!error}>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
      
      <Button type="submit" colorScheme="primary" mt={4}>
        Subscribe
      </Button>
    </form>
  );
}
```

### Responsive Card Layout
```tsx
import { Card, Text, Button, Box } from '@mild-ui/react';

function ProductCard({ product }) {
  return (
    <Card 
      maxWidth="sm" 
      shadow="lg" 
      borderRadius="lg"
      overflow="hidden"
    >
      <Box padding="lg">
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {product.title}
        </Text>
        <Text color="gray.600" mb={4}>
          {product.description}
        </Text>
        <Button colorScheme="primary" fullWidth>
          Buy Now - ${product.price}
        </Button>
      </Box>
    </Card>
  );
}
```

## Theming & Customization

### Custom Theme
```tsx
import { ThemeProvider, extendTheme } from '@mild-ui/react';

const customTheme = extendTheme({
  colors: {
    primary: {
      500: '#8B5CF6', // Purple
      600: '#7C3AED',
    },
    brand: {
      500: '#FF6B6B', // Custom brand color
      600: '#FF5252',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

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
/* globals.css */
:root {
  /* Override default colors */
  --mild-color-primary-500: #8B5CF6;
  --mild-color-primary-600: #7C3AED;
  
  /* Custom spacing */
  --mild-space-18: 4.5rem;
  
  /* Custom fonts */
  --mild-font-family-heading: 'Inter', sans-serif;
  
  /* Custom border radius */
  --mild-radius-2xl: 1rem;
}

/* Dark mode customization */
[data-theme="dark"] {
  --mild-color-primary-500: #A78BFA;
  --mild-background: #1A202C;
  --mild-foreground: #F7FAFC;
}
```

### Color Mode Support
```tsx
import { Button, useColorMode } from '@mild-ui/react';

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Button 
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
    >
      {colorMode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { 
  ButtonProps, 
  InputProps, 
  ThemeConfig,
  ColorMode 
} from '@mild-ui/react';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  customProp, 
  ...buttonProps 
}) => {
  return <Button {...buttonProps} />;
};
```

## SSR/SSG Support

mild-ui/react works seamlessly with Next.js, Remix, and other React frameworks:

```tsx
// next.js app/layout.tsx
import { ThemeProvider } from '@mild-ui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Performance

- **Tree-shakable**: Import only the components you use
- **Zero runtime CSS**: All SASS pre-compiled during build
- **Minimal bundle impact**: Core + components ≈ 15KB gzipped
- **CSS custom properties**: Efficient runtime theming
- **Optimized re-renders**: React.memo and useMemo where appropriate

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Progressive enhancement**: Graceful degradation for older browsers
- **Mobile optimized**: Touch-friendly interactions and responsive design

## Documentation & Examples

- **📖 [Interactive Storybook](https://mild-ui.github.io/react/)** - Live component examples
- **🎮 [CodeSandbox Examples](https://codesandbox.io/s/mild-ui-react)** - Editable examples
- **📚 [API Documentation](https://mild-ui.github.io/docs/react/)** - Complete API reference
- **🚀 [Next.js Example](https://github.com/mild-ui/examples/tree/main/react-nextjs)** - Full application example

## Contributing

We welcome contributions! See our [Contributing Guide](../../CONTRIBUTING.md) for details.

### Development Setup
```bash
# Clone the repository
git clone https://github.com/mild-ui/mild-ui.git
cd mild-ui

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run React Storybook
pnpm storybook:react
```

## License

MIT License - see [LICENSE](../../LICENSE) for details.

---

## Why @mild-ui/react?

- **🚀 Zero Setup**: Install and use immediately, no configuration required
- **🎨 SASS-Powered**: Advanced design system with pre-compiled styling
- **📦 Complete**: Everything included - no external CSS frameworks needed
- **⚡ Performance**: Optimized bundles with tree-shaking support
- **🔧 DX**: Excellent developer experience with TypeScript and hot-reload
- **🌍 Universal**: Part of cross-platform mild-ui ecosystem

**Professional React components. SASS-powered styling. Zero dependencies.**