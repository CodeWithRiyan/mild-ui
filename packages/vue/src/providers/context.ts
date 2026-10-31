// packages/vue/src/providers/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { ColorMode, ResolvedColorMode, ThemeConfig } from "../types";

export interface ColorModeContextValue {
  /** The chosen mode: `"light"`, `"dark"` or `"system"`. */
  colorMode: ComputedRef<ColorMode>;
  /** The mode actually applied (`"system"` resolved against the OS preference). */
  resolvedColorMode: ComputedRef<ResolvedColorMode>;
  /** The OS preference, kept live through `prefers-color-scheme`. */
  systemColorMode: ComputedRef<ResolvedColorMode>;
  setColorMode: (mode: ColorMode) => void;
  /** Switches between light and dark (leaves `"system"` for the explicit opposite mode). */
  toggleColorMode: () => void;
  isDark: ComputedRef<boolean>;
  isLight: ComputedRef<boolean>;
  isSystem: ComputedRef<boolean>;
}

export interface ThemeContextValue extends ColorModeContextValue {
  /** The default theme merged with the `theme` prop. */
  theme: ComputedRef<ThemeConfig>;
}

const ThemeKey: InjectionKey<ThemeContextValue> = Symbol("mild-ui:theme");

export function provideTheme(context: ThemeContextValue): void {
  provide(ThemeKey, context);
}

/** Theme and color mode of the nearest <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const context = inject(ThemeKey, undefined);
  if (context === undefined) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}

/** The color-mode part of `useTheme()`, for components that only switch modes. */
export function useColorMode(): ColorModeContextValue {
  const context = inject(ThemeKey, undefined);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a <ThemeProvider>");
  }
  const { theme: _theme, ...colorMode } = context;
  return colorMode;
}
