# mild-ui

[![CI](https://github.com/CodeWithRiyan/mild-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeWithRiyan/mild-ui/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/CodeWithRiyan/mild-ui/badge)](https://scorecard.dev/viewer/?uri=github.com/CodeWithRiyan/mild-ui)
[![npm](https://img.shields.io/npm/v/@mild-ui/react)](https://www.npmjs.com/package/@mild-ui/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

mild-ui is a UI component library for **React**, styled by an SCSS design system (`@mild-ui/core`). The project is pre-1.0: APIs can still change between minor versions, and every change is recorded in each package's `CHANGELOG.md`.

## Available

| Package          | What it is                                                      | Docs                                                        |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| `@mild-ui/core`  | Framework-agnostic CSS, SCSS sources, light/dark themes, tokens | [Utilities](https://codewithriyan.github.io/mild-ui/core/)  |
| `@mild-ui/react` | React 18/19 components                                          | [Storybook](https://codewithriyan.github.io/mild-ui/react/) |

Components shipped today: Button, Checkbox, Input, InputPassword, Label, Radio / RadioGroup, Select, Switch, Text, Box, Form (built on `react-hook-form`), and ThemeProvider.

## Planned

Not available yet; nothing below can be installed today.

- A design tokens package and headless primitives under the React components.
- More components (for example Card, Alert, Modal, Tabs).
- Vue, React Native, and Flutter are not on the current roadmap. `@mild-ui/vue` 0.5.1 stays on npm but is no longer developed.

## Quick Start

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

## Theming

Every color, spacing, and radius value is a CSS custom property, so a theme can be changed without SCSS:

```css
:root {
  --mild-color-primary-500: #8b5cf6;
  --mild-color-primary-600: #7c3aed;
}
```

`ThemeProvider` also accepts a `theme` object and a `colorMode` (`"light"`, `"dark"`, or `"system"`), and `useTheme()` reads or changes the active mode.

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
