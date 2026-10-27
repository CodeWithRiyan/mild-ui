# @mild-ui/react

React 18/19 components for the mild-ui design system, styled by [`@mild-ui/core`](../core).

## Installation

```bash
npm install @mild-ui/react
```

`react` and `react-dom` (18 or 19) are peer dependencies.

## Quick Start

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

`@mild-ui/react/styles.css` is the compiled stylesheet; import it once at the root of your app.

## Components

| Component     | Exports                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| Button        | `Button`                                                                                                      |
| Checkbox      | `Checkbox`                                                                                                    |
| Input         | `Input`                                                                                                       |
| InputPassword | `InputPassword`                                                                                               |
| Label         | `Label`                                                                                                       |
| Radio         | `Radio`, `RadioGroup`, `RadioGroupItem`                                                                       |
| Select        | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`                                                      |
| Switch        | `Switch`                                                                                                      |
| Text          | `Text`                                                                                                        |
| Box           | `Box`                                                                                                         |
| Form          | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField` |

`Form` is built on [react-hook-form](https://react-hook-form.com/).

Live examples for every component are in the [React Storybook](https://codewithriyan.github.io/mild-ui/react/).

## Theming

```tsx
import { ThemeProvider, useTheme, Button } from "@mild-ui/react";

function ColorModeToggle() {
  const { resolvedColorMode, toggleColorMode } = useTheme();
  return (
    <Button onClick={toggleColorMode}>{resolvedColorMode === "light" ? "Dark" : "Light"}</Button>
  );
}

export function App() {
  return (
    <ThemeProvider colorMode="system">
      <ColorModeToggle />
    </ThemeProvider>
  );
}
```

`ThemeProvider` props:

| Prop           | Type                            | Description                                       |
| -------------- | ------------------------------- | ------------------------------------------------- |
| `theme`        | `Partial<ThemeConfig>`          | Overrides merged into the default theme           |
| `colorMode`    | `"light" \| "dark" \| "system"` | Initial color mode                                |
| `cssVarPrefix` | `string`                        | Prefix for generated CSS custom properties        |
| `storageKey`   | `string`                        | `localStorage` key used to persist the color mode |

Every theme value is also a CSS custom property (for example `--mild-color-primary-500`), so it can be overridden from plain CSS.

## License

[MIT](./LICENSE)
