# @mild-ui/vue

Vue 3 components for the mild-ui design system, styled by [`@mild-ui/core`](../core).

## Installation

```bash
npm install @mild-ui/vue @mild-ui/core
```

`vue` (3.3 or newer) is a peer dependency.

## Quick Start

```vue
<script setup lang="ts">
import { ref } from "vue";
import "@mild-ui/core/mild-ui.css";
import { ThemeProvider, Button, Input } from "@mild-ui/vue";

const name = ref("");
</script>

<template>
  <ThemeProvider>
    <Input v-model="name" placeholder="Enter your name" />
    <Button variant="primary" size="lg">Get Started</Button>
  </ThemeProvider>
</template>
```

## Components

| Component     | Exports               |
| ------------- | --------------------- |
| Button        | `Button`              |
| Checkbox      | `Checkbox`            |
| Input         | `Input`               |
| Radio         | `Radio`, `RadioGroup` |
| Select        | `Select`              |
| ThemeProvider | `ThemeProvider`       |

Form inputs support `v-model`. Live examples are in the [Vue Storybook](https://codewithriyan.github.io/mild-ui/vue/).

## Theming

`ThemeProvider` props:

| Prop           | Type                            | Description                                       |
| -------------- | ------------------------------- | ------------------------------------------------- |
| `defaultTheme` | `"light" \| "dark" \| "system"` | Initial color mode (default `"system"`)           |
| `config`       | `ThemeConfig`                   | Colors and radii applied as CSS custom properties |
| `storageKey`   | `string`                        | `localStorage` key used to persist the color mode |

Its default slot receives `theme`, `setTheme`, `config`, and `setConfig`.

## License

[MIT](./LICENSE)
