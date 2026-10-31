// packages/react/src/index.ts
// Theme system
export { ThemeProvider, useTheme } from "./providers/ThemeProvider";
export type {
  ThemeProviderProps,
  ThemeContextValue,
  ColorModeContextValue,
} from "./providers/ThemeProvider";
export { ColorModeScript, getColorModeScript } from "./providers/ColorModeScript";
export type { ColorModeScriptProps, ColorModeScriptOptions } from "./providers/ColorModeScript";

// Components
export * from "./components";

// Hooks
export * from "./hooks";

// Types
export type * from "./types";

// Utilities
export * from "./utils";
