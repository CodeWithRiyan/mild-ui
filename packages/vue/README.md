# @mild-ui/vue

Vue 3 components with **SASS-powered styling** for modern web applications. Part of the mild-ui cross-platform component library that works across React, Vue, React Native, and Flutter.

## Overview

@mild-ui/vue provides production-ready Vue 3 components with **pre-compiled SASS styling**, **zero external dependencies**, and comprehensive theming support. Built with TypeScript and the Composition API, designed for optimal performance with tree-shaking and SSR compatibility.

## Features

- 🎨 **SASS-powered styling** - Advanced design system with zero runtime overhead
- 📦 **Zero dependencies** - Complete styling system included, no CSS frameworks required
- 🎯 **CSS custom properties** - Runtime theming without SASS knowledge
- 📚 **TypeScript-first** - Full type safety with excellent IntelliSense
- ⚡ **Vue 3 Composition API** - Modern Vue patterns with script setup
- ♿ **Accessibility-compliant** - WCAG 2.1 AA standards built-in
- 🔥 **Performance optimized** - Tree-shakable with minimal bundle impact
- 🌙 **Dark mode support** - Built-in color mode switching
- 📱 **Responsive design** - Mobile-first responsive components
- 🚀 **SSR/SSG ready** - Works with Nuxt, Vite, and other Vue frameworks

## Installation

```bash
npm install @mild-ui/vue
```

### Peer Dependencies
```bash
npm install vue@^3.3.0
```

## Quick Start

### 1. Set up ThemeProvider
```vue
<!-- App.vue -->
<template>
  <ThemeProvider>
    <router-view />
  </ThemeProvider>
</template>

<script setup>
import { ThemeProvider } from '@mild-ui/vue';
</script>
```

### 2. Import and use components
```vue
<template>
  <Card padding="lg" shadow="md">
    <Alert 
      status="success" 
      title="Welcome!"
      class="mb-4"
    >
      Your Vue app is ready with mild-ui components.
    </Alert>
    
    <Input 
      v-model="name"
      placeholder="Enter your name"
      variant="outline"
      size="lg"
      class="mb-4"
    />
    
    <Button 
      color-scheme="primary" 
      size="lg"
      @click="handleSubmit"
    >
      Get Started
    </Button>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import { Button, Input, Card, Alert } from '@mild-ui/vue';

const name = ref('');

const handleSubmit = () => {
  console.log('Submitted:', name.value);
};
</script>
```

## Available Components

### ✅ **Form Components**
```vue
<script setup>
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
} from '@mild-ui/vue';
</script>
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
```vue
<script setup>
import { 
  Box, 
  Text, 
  Card, 
  Alert, 
  Spinner 
} from '@mild-ui/vue';
</script>
```

- **Box** - Flexible layout primitive with CSS Grid and Flexbox
- **Text** - Typography component with responsive sizing
- **Card** - Content container with elevation and variants
- **Alert** - Feedback messages with status types
- **Spinner** - Loading indicators with multiple variants

### ✅ **Navigation & Interaction**
```vue
<script setup>
import { 
  Tabs, 
  Modal, 
  Accordion 
} from '@mild-ui/vue';
</script>
```

- **Tabs** - Tabbed navigation with multiple styles
- **Modal** - Overlay dialogs with size variants
- **Accordion** - Collapsible content sections

## Component Examples

### Button with Icons (Vue 3 Style)
```vue
<template>
  <div class="flex gap-4 flex-wrap">
    <Button 
      variant="solid" 
      color-scheme="primary"
    >
      <template #left-icon>
        <Download :size="16" />
      </template>
      Download
    </Button>
    
    <Button 
      variant="outline"
    >
      Next Step
      <template #right-icon>
        <ChevronRight :size="16" />
      </template>
    </Button>
    
    <Button 
      variant="ghost" 
      size="sm"
      :loading="isLoading"
      @click="handleLoad"
    >
      {{ isLoading ? 'Loading...' : 'Load Data' }}
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '@mild-ui/vue';
import { Download, ChevronRight } from 'lucide-vue-next';

const isLoading = ref(false);

const handleLoad = async () => {
  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  isLoading.value = false;
};
</script>
```

### Reactive Form with Validation
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FormControl :invalid="!!errors.email">
      <FormLabel>Email Address</FormLabel>
      <Input
        v-model="form.email"
        type="email"
        placeholder="Enter your email"
        @blur="validateEmail"
      />
      <FormErrorMessage v-if="errors.email">
        {{ errors.email }}
      </FormErrorMessage>
    </FormControl>
    
    <FormControl :invalid="!!errors.password" class="mt-4">
      <FormLabel>Password</FormLabel>
      <Input
        v-model="form.password"
        type="password"
        placeholder="Enter your password"
        @blur="validatePassword"
      />
      <FormErrorMessage v-if="errors.password">
        {{ errors.password }}
      </FormErrorMessage>
    </FormControl>
    
    <Button 
      type="submit" 
      color-scheme="primary" 
      :disabled="!isFormValid"
      class="mt-6"
      full-width
    >
      Sign In
    </Button>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { 
  FormControl, 
  FormLabel, 
  Input, 
  FormErrorMessage, 
  Button 
} from '@mild-ui/vue';

const form = reactive({
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: ''
});

const validateEmail = () => {
  if (!form.email) {
    errors.email = 'Email is required';
  } else if (!form.email.includes('@')) {
    errors.email = 'Please enter a valid email';
  } else {
    errors.email = '';
  }
};

const validatePassword = () => {
  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else {
    errors.password = '';
  }
};

const isFormValid = computed(() => {
  return form.email && form.password && !errors.email && !errors.password;
});

const handleSubmit = () => {
  validateEmail();
  validatePassword();
  
  if (isFormValid.value) {
    console.log('Form submitted:', form);
  }
};
</script>
```

### Tabs with Dynamic Content
```vue
<template>
  <Tabs v-model="activeTab" variant="underline">
    <template #list>
      <Tab value="profile">Profile</Tab>
      <Tab value="settings">Settings</Tab>
      <Tab value="notifications">Notifications</Tab>
    </template>
    
    <TabPanel value="profile">
      <Card padding="lg">
        <Text font-size="xl" font-weight="bold" class="mb-4">
          Profile Information
        </Text>
        <Input 
          v-model="profile.name"
          placeholder="Full Name"
          class="mb-3"
        />
        <Input 
          v-model="profile.bio"
          placeholder="Bio"
          type="textarea"
        />
      </Card>
    </TabPanel>
    
    <TabPanel value="settings">
      <Card padding="lg">
        <Text font-size="xl" font-weight="bold" class="mb-4">
          Settings
        </Text>
        <Switch 
          v-model="settings.notifications"
          class="mb-3"
        >
          Enable Notifications
        </Switch>
        <Switch 
          v-model="settings.darkMode"
          @change="toggleColorMode"
        >
          Dark Mode
        </Switch>
      </Card>
    </TabPanel>
    
    <TabPanel value="notifications">
      <Card padding="lg">
        <Text font-size="xl" font-weight="bold" class="mb-4">
          Notification Preferences
        </Text>
        <Checkbox 
          v-model="notifications.email"
          class="mb-2"
        >
          Email notifications
        </Checkbox>
        <Checkbox 
          v-model="notifications.push"
          class="mb-2"
        >
          Push notifications
        </Checkbox>
      </Card>
    </TabPanel>
  </Tabs>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { 
  Tabs, 
  Tab, 
  TabPanel, 
  Card, 
  Text, 
  Input, 
  Switch, 
  Checkbox 
} from '@mild-ui/vue';
import { useColorMode } from '@mild-ui/vue';

const { toggleColorMode } = useColorMode();

const activeTab = ref('profile');

const profile = reactive({
  name: '',
  bio: ''
});

const settings = reactive({
  notifications: true,
  darkMode: false
});

const notifications = reactive({
  email: true,
  push: false
});
</script>
```

## Theming & Customization

### Custom Theme with Composition API
```vue
<template>
  <ThemeProvider :theme="customTheme">
    <YourApp />
  </ThemeProvider>
</template>

<script setup>
import { ThemeProvider, extendTheme } from '@mild-ui/vue';

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
</script>
```

### CSS Custom Properties
```css
/* style.css */
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

### Color Mode Composable
```vue
<template>
  <Button 
    @click="toggleColorMode"
    variant="ghost"
    size="sm"
  >
    {{ colorMode === 'light' ? '🌙 Dark' : '☀️ Light' }}
  </Button>
</template>

<script setup>
import { Button, useColorMode } from '@mild-ui/vue';

const { colorMode, toggleColorMode, setColorMode } = useColorMode();

// You can also programmatically set color mode
// setColorMode('dark');
</script>
```

### Custom Composables
```vue
<template>
  <div>
    <Button @click="showNotification">
      Show Success
    </Button>
    
    <Button @click="showError" variant="outline">
      Show Error
    </Button>
  </div>
</template>

<script setup>
import { Button, useToast } from '@mild-ui/vue';

const toast = useToast();

const showNotification = () => {
  toast({
    title: 'Success!',
    description: 'Your action was completed successfully.',
    status: 'success',
    duration: 3000,
  });
};

const showError = () => {
  toast({
    title: 'Error occurred',
    description: 'Something went wrong. Please try again.',
    status: 'error',
    duration: 5000,
  });
};
</script>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```vue
<template>
  <CustomButton 
    :custom-prop="myProp"
    color-scheme="primary"
    @click="handleClick"
  >
    Custom Button
  </CustomButton>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@mild-ui/vue';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

interface Props extends CustomButtonProps {
  customProp: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  console.log('Custom prop:', props.customProp);
  emit('click', event);
};
</script>
```

## SSR/SSG Support

mild-ui/vue works seamlessly with Nuxt 3, Vite SSR, and other Vue frameworks:

### Nuxt 3 Integration
```vue
<!-- app.vue -->
<template>
  <NuxtLayout>
    <ThemeProvider>
      <NuxtPage />
    </ThemeProvider>
  </NuxtLayout>
</template>

<script setup>
import { ThemeProvider } from '@mild-ui/vue';
</script>
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@mild-ui/vue/dist/style.css'],
  build: {
    transpile: ['@mild-ui/vue']
  }
});
```

### Vite SSR Setup
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  ssr: {
    noExternal: ['@mild-ui/vue']
  }
});
```

## Vue 3 Specific Features

### Teleport Support
```vue
<template>
  <div>
    <Button @click="showModal = true">
      Open Modal
    </Button>
    
    <Modal 
      v-model="showModal"
      size="lg"
    >
      <ModalHeader>
        <Text font-size="xl" font-weight="bold">
          Modal Title
        </Text>
      </ModalHeader>
      
      <ModalBody>
        <Text>This modal uses Vue 3 Teleport for optimal rendering.</Text>
      </ModalBody>
      
      <ModalFooter>
        <Button @click="showModal = false">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Text 
} from '@mild-ui/vue';

const showModal = ref(false);
</script>
```

### Provide/Inject for Theme
```vue
<!-- Parent Component -->
<template>
  <ThemeProvider>
    <ChildComponent />
  </ThemeProvider>
</template>

<script setup>
import { provide } from 'vue';
import { ThemeProvider } from '@mild-ui/vue';

// Theme is automatically provided by ThemeProvider
</script>
```

```vue
<!-- Child Component -->
<template>
  <Button :color-scheme="theme.primaryColor">
    Themed Button
  </Button>
</template>

<script setup>
import { inject } from 'vue';
import { Button, useTheme } from '@mild-ui/vue';

// Access theme anywhere in component tree
const theme = useTheme();
</script>
```

## Performance

- **Tree-shakable**: Import only the components you use
- **Zero runtime CSS**: All SASS pre-compiled during build
- **Minimal bundle impact**: Core + components ≈ 15KB gzipped
- **Vue 3 optimized**: Leverages Composition API for optimal reactivity
- **CSS custom properties**: Efficient runtime theming
- **Optimized re-renders**: Smart reactive patterns and computed values

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Progressive enhancement**: Graceful degradation for older browsers
- **Mobile optimized**: Touch-friendly interactions and responsive design
- **Vue 3 compatible**: Requires Vue 3.3+ for full feature support

## Documentation & Examples

- **📖 [Interactive Storybook](https://mild-ui.github.io/vue/)** - Live component examples
- **🎮 [Vue Playground](https://play.vuejs.org/#eNp9kE1qAzEMha8i)** - Editable examples
- **📚 [API Documentation](https://mild-ui.github.io/docs/vue/)** - Complete API reference
- **🚀 [Nuxt 3 Example](https://github.com/mild-ui/examples/tree/main/vue-nuxt)** - Full application example

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

# Run Vue Storybook
pnpm storybook:vue
```

## License

MIT License - see [LICENSE](../../LICENSE) for details.

---

## Why @mild-ui/vue?

- **🚀 Vue 3 Native**: Built specifically for Vue 3 with Composition API
- **🎨 SASS-Powered**: Advanced design system with pre-compiled styling
- **📦 Complete**: Everything included - no external CSS frameworks needed
- **⚡ Performance**: Optimized bundles with tree-shaking support
- **🔧 DX**: Excellent developer experience with TypeScript and hot-reload
- **🌍 Universal**: Part of cross-platform mild-ui ecosystem

**Modern Vue 3 components. SASS-powered styling. Zero dependencies.**