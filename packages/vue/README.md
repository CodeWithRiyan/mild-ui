# @mild-ui/vue

Vue implementation of mild-ui component library.

## Overview

@mild-ui/vue provides Vue components from the mild-ui library, a cross-framework UI component library inspired by the copy-paste approach of shadcn/ui. Components are designed to be copied into your project, not imported as dependencies.

## Installation

This package is typically not installed directly. Instead, use the CLI to add components to your project:

```bash
# Install the CLI globally
npm install -g @mild-ui/cli

# Initialize mild-ui in your project
mild-ui init

# Add components to your project
mild-ui add button --framework=vue
```

## Usage

If you've added components using the CLI, you can import them directly from your components folder:

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
import { Button } from "./components";
import { PlusIcon, ArrowRightIcon } from "lucide-vue-next";
</script>
```

## Available Components

- Button

More components will be added in future releases.

## Customization

You can customize components by editing their source code directly in your project. CSS variables can be modified to match your design system.

## Documentation

For complete documentation, visit our [Storybook site](https://codewithriyan.github.io/mild-ui/).

## License

MIT
