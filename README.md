# mild-ui

mild-ui is a cross-framework UI component library inspired by the copy-paste approach of shadcn/ui but extended to work across React, Vue, and Svelte. The library employs a framework-agnostic core with specific adapters for each supported framework, allowing developers to use consistent components regardless of their frontend framework choice.

## Features

- ✅ Cross-framework compatibility: Works with React, Vue, and Svelte
- 🧩 Framework-agnostic core: Components designed with a framework-agnostic approach
- 🌈 Unified developer experience: Consistent API and styling across all frameworks
- 🎨 Extensible styling: Built with CSS variables for easy theming
- 📦 Copy-paste approach: No package dependencies, just add what you need
- 🔧 CLI tool: Easily add components to your project
- 📚 TypeScript-first: Built with TypeScript for improved type safety

## Getting Started

### Installation

```bash
# Install the CLI globally
npm install -g @mild-ui/cli

# Initialize mild-ui in your project
mild-ui init
```

The `init` command will prompt you to select your framework (React, Vue, or Svelte), whether to use TypeScript, and where to store your components.

### Adding Components

To add a component to your project, use the CLI:

```bash
# Add a button component for React (default)
mild-ui add button

# Add a button component for Vue
mild-ui add button --framework=vue

# Add a button component for Svelte
mild-ui add button --framework=svelte
```

This will create the component files in your project's components directory.

### Using Components

#### React

```jsx
import { Button } from './components';
import { Plus, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button 
        variant="outline" 
        size="large"
        leadingIcon={<Plus size={16} />}
        trailingIcon={<ArrowRight size={16} />}
      >
        Button with Icons
      </Button>
    </div>
  );
}
```

#### Vue

```vue
<template>
  <div>
    <Button>Default Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="outline" size="large">
      <template #leading-icon>
        <PlusIcon size="16" />
      </template>
      Button with Icons
      <template #trailing-icon>
        <ArrowRightIcon size="16" />
      </template>
    </Button>
  </div>
</template>

<script setup>
import { Button } from './components';
import { PlusIcon, ArrowRightIcon } from 'lucide-vue-next';
</script>
```

#### Svelte

```svelte
<script>
  import { Button } from './components';
  import { Plus, ArrowRight } from 'lucide-svelte';
</script>

<div>
  <Button>Default Button</Button>
  <Button variant="secondary">Secondary Button</Button>
  <Button variant="outline" size="large">
    <svelte:fragment slot="leading-icon">
      <Plus size={16} />
    </svelte:fragment>
    Button with Icons
    <svelte:fragment slot="trailing-icon">
      <ArrowRight size={16} />
    </svelte:fragment>
  </Button>
</div>
```

## Available Components

Currently, the following components are available:

- Button

More components will be added in future releases.

## Customization

You can customize the theme by modifying the CSS variables in your project. When you initialize mild-ui, a CSS file with variables is created in your project.

```css
:root {
  /* Colors */
  --mild-primary: #3b82f6;
  --mild-primary-hover: #2563eb;
  --mild-primary-active: #1d4ed8;
  /* ... more variables */
}

/* Add dark mode support */
[data-theme="dark"] {
  --mild-primary: #60a5fa;
  /* ... dark theme variables */
}
```

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started.

## License

mild-ui is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.