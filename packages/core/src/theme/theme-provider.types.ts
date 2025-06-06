// packages/core/src/theme/theme-provider.types.ts
/// Theme provider universal types
/// @fileoverview Framework-agnostic theme provider interfaces

import type { ThemeConfig, ColorMode } from "../types/common";

export interface ThemeProviderProps {
  /** Theme configuration */
  theme?: Partial<ThemeConfig>;
  /** Initial color mode */
  colorMode?: ColorMode;
  /** Children components */
  children?: any;
  /** CSS variables prefix */
  cssVarPrefix?: string;
  /** Storage key for persisting color mode */
  storageKey?: string;
}

export interface ThemeContextValue {
  /** Current theme configuration */
  theme: ThemeConfig;
  /** Current color mode */
  colorMode: ColorMode;
  /** Set color mode */
  setColorMode: (mode: ColorMode) => void;
  /** Toggle between light and dark */
  toggleColorMode: () => void;
  /** Resolved color mode (system resolved to light/dark) */
  resolvedColorMode: "light" | "dark";
}

export interface UseThemeReturn extends ThemeContextValue {
  /** Check if current theme is dark */
  isDark: boolean;
  /** Check if current theme is light */
  isLight: boolean;
  /** Check if using system color mode */
  isSystem: boolean;
}
