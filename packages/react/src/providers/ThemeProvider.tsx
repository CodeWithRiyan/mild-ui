// packages/react/src/providers/ThemeProvider.tsx
//
// Theme + color mode in one context.
//
//   <ColorModeScript />                       in <head>: applies the saved mode before first paint
//   <ThemeProvider defaultColorMode="system"> owns the mode, persists it, follows the OS live
//   useTheme()        -> { theme, ...colorMode }
//   useColorMode()    -> the color-mode slice of the same context
//
// The resolved mode is written to <html data-theme="light|dark"> (what the core stylesheet keys
// on) and to <html style="color-scheme">, so native controls and scrollbars follow as well.
import * as React from "react";
import type { ColorMode, ResolvedColorMode, ThemeConfig } from "../types";
import { useIsomorphicLayoutEffect } from "../hooks/useHydrated";
import {
  applyCSSProperties,
  generateCSSProperties,
  mergeThemes,
  defaultTheme,
} from "../utils/theme";
import {
  COLOR_MODE_ATTRIBUTE,
  DEFAULT_STORAGE_KEY,
  RESOLVED_ATTRIBUTE,
  isColorMode,
} from "./color-mode";

export interface ColorModeContextValue {
  /** The chosen mode: `"light"`, `"dark"` or `"system"`. */
  colorMode: ColorMode;
  /** The mode actually applied (`"system"` resolved against the OS preference). */
  resolvedColorMode: ResolvedColorMode;
  /** The OS preference, kept live through `prefers-color-scheme`. */
  systemColorMode: ResolvedColorMode;
  setColorMode: (mode: ColorMode) => void;
  /** Switches between light and dark (leaves `"system"` for the explicit opposite mode). */
  toggleColorMode: () => void;
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
}

export interface ThemeContextValue extends ColorModeContextValue {
  /** The default theme merged with the `theme` prop. */
  theme: ThemeConfig;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  /** Overrides merged into the default theme and applied as `--mild-*` custom properties. */
  theme?: Partial<ThemeConfig>;
  /** Initial mode when nothing is stored (uncontrolled). Defaults to `"system"`. */
  defaultColorMode?: ColorMode;
  /** Controlled mode. Pair with `onColorModeChange`. */
  colorMode?: ColorMode;
  onColorModeChange?: (mode: ColorMode) => void;
  /** `localStorage` key the mode is persisted under; `null` disables persistence. */
  storageKey?: string | null;
  /** Prefix of the generated custom properties (`--<prefix>-color-...`). */
  cssVarPrefix?: string;
  children: React.ReactNode;
}

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStoredColorMode(storageKey: string | null): ColorMode | null {
  if (storageKey === null || typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(storageKey);
    return isColorMode(stored) ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredColorMode(storageKey: string | null, mode: ColorMode): void {
  if (storageKey === null || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, mode);
  } catch {
    // Storage can be unavailable (privacy mode, quota); the mode still applies for the session.
  }
}

export function ThemeProvider({
  theme: themeOverrides,
  defaultColorMode = "system",
  colorMode: colorModeProp,
  onColorModeChange,
  storageKey = DEFAULT_STORAGE_KEY,
  cssVarPrefix = "mild",
  children,
}: ThemeProviderProps): React.ReactElement {
  const theme = React.useMemo(
    () => (themeOverrides ? mergeThemes(defaultTheme, themeOverrides) : defaultTheme),
    [themeOverrides],
  );

  // Chosen mode: controlled, else stored, else the default.
  const isControlled = colorModeProp !== undefined;
  // The first render must match the server HTML, so it starts from the default; the stored
  // choice is applied right after mount (ColorModeScript already painted it, so nothing flashes).
  const [internalMode, setInternalMode] = React.useState<ColorMode>(defaultColorMode);
  useIsomorphicLayoutEffect(() => {
    const stored = readStoredColorMode(storageKey);
    if (stored) setInternalMode(stored);
  }, [storageKey]);
  const colorMode = isControlled ? colorModeProp : internalMode;

  // OS preference, followed live (read after mount for the same reason).
  const [systemColorMode, setSystemColorMode] = React.useState<ResolvedColorMode>("light");
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(DARK_QUERY);
    const update = () => setSystemColorMode(query.matches ? "dark" : "light");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const resolvedColorMode: ResolvedColorMode = colorMode === "system" ? systemColorMode : colorMode;

  const setColorMode = React.useCallback(
    (mode: ColorMode) => {
      if (!isControlled) setInternalMode(mode);
      writeStoredColorMode(storageKey, mode);
      onColorModeChange?.(mode);
    },
    [isControlled, onColorModeChange, storageKey],
  );

  const toggleColorMode = React.useCallback(() => {
    setColorMode(resolvedColorMode === "dark" ? "light" : "dark");
  }, [resolvedColorMode, setColorMode]);

  // Reflect the mode on <html>: data-theme drives the stylesheet, color-scheme the UA styles.
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute(RESOLVED_ATTRIBUTE, resolvedColorMode);
    root.setAttribute(COLOR_MODE_ATTRIBUTE, colorMode);
    root.style.colorScheme = resolvedColorMode;
  }, [resolvedColorMode, colorMode]);

  // Theme overrides become custom properties on <html>; the defaults already come from the
  // stylesheet, so only what the consumer changed is written (and removed again on change).
  React.useEffect(() => {
    if (!themeOverrides) return;
    return applyCSSProperties(generateCSSProperties(themeOverrides, cssVarPrefix));
  }, [themeOverrides, cssVarPrefix]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorMode,
      resolvedColorMode,
      systemColorMode,
      setColorMode,
      toggleColorMode,
      isDark: resolvedColorMode === "dark",
      isLight: resolvedColorMode === "light",
      isSystem: colorMode === "system",
    }),
    [theme, colorMode, resolvedColorMode, systemColorMode, setColorMode, toggleColorMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
ThemeProvider.displayName = "ThemeProvider";

/** Theme and color mode of the nearest <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}

/** The color-mode part of `useTheme()`, for components that only switch modes. */
export function useColorMode(): ColorModeContextValue {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a <ThemeProvider>");
  }
  const { theme: _theme, ...colorMode } = context;
  return colorMode;
}
