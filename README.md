# mild-ui

[![CI](https://github.com/CodeWithRiyan/mild-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeWithRiyan/mild-ui/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/CodeWithRiyan/mild-ui/badge)](https://scorecard.dev/viewer/?uri=github.com/CodeWithRiyan/mild-ui)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

mild-ui is a UI component library for **React** and **Vue**, styled by a shared SCSS design system (`@mild-ui/core`). The project is pre-1.0: APIs can still change between minor versions, and every change is recorded in each package's `CHANGELOG.md`.

## Available

| Package          | What it is                                                      | Docs                                                        |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| `@mild-ui/core`  | Framework-agnostic CSS, SCSS sources, light/dark themes, tokens | [Utilities](https://codewithriyan.github.io/mild-ui/core/)  |
| `@mild-ui/react` | React 18/19 components                                          | [Storybook](https://codewithriyan.github.io/mild-ui/react/) |
| `@mild-ui/vue`   | Vue 3 components                                                | [Storybook](https://codewithriyan.github.io/mild-ui/vue/)   |

Components shipped today:

| Component                         | React | Vue |
| --------------------------------- | :---: | :-: |
| Button                            |  ✅   | ✅  |
| Checkbox                          |  ✅   | ✅  |
| Input                             |  ✅   | ✅  |
| Radio / RadioGroup                |  ✅   | ✅  |
| Select                            |  ✅   | ✅  |
| ThemeProvider                     |  ✅   | ✅  |
| InputPassword                     |  ✅   |  —  |
| Switch                            |  ✅   |  —  |
| Label                             |  ✅   |  —  |
| Text                              |  ✅   |  —  |
| Box                               |  ✅   |  —  |
| Form (built on `react-hook-form`) |  ✅   |  —  |

## Planned

Not available yet; nothing below can be installed today.

- Vue versions of InputPassword, Switch, Label, Text, Box, and Form.
- Design tokens package and headless primitives shared by React and Vue.
- More components (for example Card, Alert, Modal, Tabs).
- Other platforms such as React Native or Flutter are not on the current roadmap.

## Quick Start (React)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @mild-ui/react
```

Replace `src/App.tsx` with:

```tsx
import "@mild-ui/react/styles.css";
import { ThemeProvider, Button, Input } from "@mild-ui/react";

export default function App() {
  return (
    <ThemeProvider>
      <Input placeholder="Enter your name" />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

Then run `npm run dev`.

## Quick Start (Vue)

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install @mild-ui/vue @mild-ui/core
```

Replace `src/App.vue` with:

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

Then run `npm run dev`.

## Theming

Every color, spacing, and radius value is a CSS custom property, so a theme can be changed without SCSS:

```css
:root {
  --mild-color-primary-500: #8b5cf6;
  --mild-color-primary-600: #7c3aed;
}
```

In React, `ThemeProvider` also accepts a `theme` object and a `colorMode` (`"light"`, `"dark"`, or `"system"`), and `useTheme()` reads or changes the active mode.

## Development

Requirements: Node.js 18 or newer and Corepack (bundled with Node.js).

```bash
git clone https://github.com/CodeWithRiyan/mild-ui.git
cd mild-ui
corepack enable
pnpm install
pnpm build
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow and the checks every PR must pass.

## License

[MIT](./LICENSE)
