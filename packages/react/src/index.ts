// packages/react/src/index.ts
// Theme system
export { ThemeProvider, useTheme } from "./providers/ThemeProvider";
export type {
  ThemeProviderProps,
  ThemeContextValue,
} from "./providers/ThemeProvider";

// Components
export * from "./components";

// Hooks
export * from "./hooks";

// Re-export core types and utilities for convenience
export type {
  ThemeConfig,
  ColorMode,
  Size,
  ColorScheme,
  Variant,
  ButtonCoreProps,
  InputCoreProps,
  TextCoreProps,
  BoxProps as CoreBoxProps,
} from "../../core";

export {
  defaultTheme,
  darkTheme,
  mergeThemes,
  getThemeColor,
  generateCSSProperties,
  applyCSSProperties,
  cn,
  cva,
  cssVar,
  dataAttr,
  ariaAttr,
} from "../../core";
