# mild-ui

[![CI](https://github.com/CodeWithRiyan/mild-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeWithRiyan/mild-ui/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/CodeWithRiyan/mild-ui/badge)](https://scorecard.dev/viewer/?uri=github.com/CodeWithRiyan/mild-ui)
[![npm](https://img.shields.io/npm/v/@mild-ui/react)](https://www.npmjs.com/package/@mild-ui/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

mild-ui is a UI component library for **React** and **Vue**, styled by a shared SCSS design system (`@mild-ui/core`). Since 1.0 the public API follows semver; every change is recorded in each package's `CHANGELOG.md`.

## Available

| Package               | What it is                                                                                                                                               | Docs                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `@mild-ui/core`       | Framework-agnostic CSS, SCSS sources, light/dark themes, tokens                                                                                          | [Utilities](https://codewithriyan.github.io/mild-ui/core/)  |
| `@mild-ui/react`      | React 18/19 components                                                                                                                                   | [Storybook](https://codewithriyan.github.io/mild-ui/react/) |
| `@mild-ui/vue`        | Vue 3 components                                                                                                                                         | [Storybook](https://codewithriyan.github.io/mild-ui/vue/)   |
| `@mild-ui/tokens`     | Design tokens as JSON, with CSS/SCSS/JSON/TS builds and a WCAG contrast check                                                                            | [README](./packages/tokens)                                 |
| `@mild-ui/primitives` | Framework-agnostic, accessible UI behaviour (checkbox, radio group, switch, listbox, toggle group, tabs, accordion, dialog, tooltip, toast timer, field) | [README](./packages/primitives)                             |

Components shipped today (React and Vue; Vue's set is listed below the table):

| Group                   | Components                                                                                                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Forms                   | Button, IconButton, CloseButton, ButtonGroup, Input, InputGroup, InputPassword, Textarea, Checkbox, Radio, Switch, Select, SegmentedControl, Toggle, ToggleGroup, Label, Form |
| Layout                  | Box, Stack, Flex, Grid, Container, Divider, AspectRatio, ScrollArea                                                                                                           |
| Typography & navigation | Text, Heading, Link, Breadcrumb, Code, Kbd, List                                                                                                                              |
| Feedback                | Alert, Spinner, Progress, CircularProgress, Skeleton, Toast                                                                                                                   |
| Overlay & disclosure    | Dialog, AlertDialog, Tooltip, Tabs, Accordion, Collapsible                                                                                                                    |
| Data display            | Card, Badge, Tag, Avatar, AvatarGroup, Image, Stat, Table, DataTable, Map                                                                                                     |
| Theme                   | ThemeProvider, ColorModeScript, useColorMode                                                                                                                                  |

Vue ships Button, Checkbox, Radio (+ RadioGroup, RadioGroupItem), Select (+ parts), Input,
InputPassword, Switch, Label, Text, Box, Form (+ FormField, FormLabel, FormControl,
FormDescription, FormMessage), ThemeProvider (+ `useTheme`, `useColorMode`), the layout set
(Stack, Flex, Grid + GridItem, Container, Divider, AspectRatio, ScrollArea), typography and
navigation (Heading, Link, Breadcrumb, Code, Kbd, List), the basic inputs (Textarea,
IconButton, ButtonGroup, CloseButton, InputGroup, SegmentedControl, Toggle, ToggleGroup),
feedback (Alert, Spinner, Progress, CircularProgress, Skeleton, Toast), overlay and disclosure
(Dialog, AlertDialog, Tooltip, Tabs, Accordion, Collapsible) and data display (Card, Badge, Tag,
Avatar, AvatarGroup, Image, Stat, Table, DataTable, Map). They are built on the same `@mild-ui/primitives` as the
React ones and render the same DOM for the same props.

Every React component is covered by the same contracts: shared DOM test cases
(`@mild-ui/test-cases`), WAI-ARIA pattern tests for the interactive ones, a
[server-rendering + hydration test](./packages/react/src/ssr.test.tsx), and a
[per-component size budget](./size-budget.json). Every Vue component is covered by the shared
test cases, WAI-ARIA keyboard tests, an axe-core check in both themes, a 90% per-file coverage
gate, a [server-rendering test](./packages/vue/src/ssr.test.ts), a
[per-component size budget](./size-budget.vue.json), and runs on the committed Vue version and
`vue@latest` (`pnpm test:vue:matrix`).

## Playgrounds

| Playground                                                 | What it shows                                                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [`apps/playground-react`](./apps/playground-react)         | Every React component on one Vite page, from source; smoke-tested, and server-rendered + hydrated in tests               |
| [`apps/playground-vue`](./apps/playground-vue)             | Every Vue component on one Vite page, from source; smoke-tested, and server-rendered + hydrated in tests                 |
| [`templates/next-app-router`](./templates/next-app-router) | The same components in a Next.js **App Router** app: a Server Component page, one client boundary, no hydration warnings |
| [`templates/nuxt`](./templates/nuxt)                       | The Vue components in a **Nuxt** app: server-rendered pages, the color-mode script in `<head>`, no hydration warnings    |

Both Storybooks document the same components, story for story (`pnpm check:storybooks` keeps
them aligned); the [docs site](https://codewithriyan.github.io/mild-ui/) fronts them with a
landing page built from [`site/`](./site).

## Planned

- Every component ships for React and Vue; other platforms such as React Native or Flutter are not on the current roadmap.

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

In React and Vue, `ThemeProvider` also accepts a `theme` object and a `colorMode` (`"light"`, `"dark"`, or `"system"`), and `useTheme()` reads or changes the active mode.

The interactive color (primary buttons, checked controls, focus rings, active tabs) is a single token, `--mild-color-accent`. Three runnable examples in [`examples/`](./examples) show the ways to set it:

| Example                                                  | How                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`examples/styling-css`](./examples/styling-css)         | Prebuilt CSS plus a `theme.css` that points tokens at other tokens             |
| [`examples/scss`](./examples/scss)                       | Compiled from the Sass source, accent derived with Sass token functions        |
| [`examples/styling-runtime`](./examples/styling-runtime) | Set from JavaScript via `?accent=` URL parameter, with a visual snapshot check |

`pnpm build` builds all three; `pnpm --filter @mild-ui/example-styling-runtime snapshot` takes the screenshots.

## Development

Requirements: Node.js 20, 22, or 24 and Corepack (bundled with Node.js).

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
