// packages/vue/src/providers/index.ts
export { default as ThemeProvider } from "./ThemeProvider.vue";
export { useTheme, useColorMode } from "./context";
export type { ThemeContextValue, ColorModeContextValue } from "./context";
export { ColorModeScript, getColorModeScript } from "./ColorModeScript";
export type { ColorModeScriptProps, ColorModeScriptOptions } from "./ColorModeScript";
export type { ThemeProviderProps } from "../types/theme";
