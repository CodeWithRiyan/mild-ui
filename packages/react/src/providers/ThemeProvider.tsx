// packages/react/src/providers/ThemeProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { ColorMode, ThemeConfig } from "../types";
import {
  applyCSSProperties,
  generateCSSProperties,
  mergeThemes,
  defaultTheme,
} from "../utils/theme";

export interface ThemeContextValue {
  theme: ThemeConfig;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  resolvedColorMode: "light" | "dark";
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  /** Custom theme configuration */
  theme?: Partial<ThemeConfig>;
  /** Initial color mode */
  colorMode?: ColorMode;
  /** CSS variables prefix */
  cssVarPrefix?: string;
  /** Storage key for persisting color mode */
  storageKey?: string;
  /** Children components */
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: customTheme = {},
  colorMode: initialColorMode = "light",
  cssVarPrefix = "mild",
  storageKey = "mild-ui-color-mode",
  children,
}) => {
  // Merge custom theme with default theme
  const theme = mergeThemes(defaultTheme, customTheme);

  // Color mode state with localStorage persistence
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (typeof window === "undefined") return initialColorMode;

    try {
      const stored = localStorage.getItem(storageKey);
      return (stored as ColorMode) || initialColorMode;
    } catch {
      return initialColorMode;
    }
  });

  // Resolve system color mode
  const [systemColorMode, setSystemColorMode] = useState<"light" | "dark">(
    () => {
      if (typeof window === "undefined") return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    },
  );

  // Listen for system color mode changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemColorMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Resolved color mode (system resolved to light/dark)
  const resolvedColorMode =
    colorMode === "system" ? systemColorMode : colorMode;

  // Helper booleans
  const isDark = resolvedColorMode === "dark";
  const isLight = resolvedColorMode === "light";
  const isSystem = colorMode === "system";

  // Set color mode with persistence
  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    try {
      localStorage.setItem(storageKey, mode);
    } catch {
      // Handle localStorage errors silently
    }
  };

  // Toggle between light and dark
  const toggleColorMode = () => {
    setColorMode(resolvedColorMode === "light" ? "dark" : "light");
  };

  // Apply CSS custom properties when theme or color mode changes
  useEffect(() => {
    const properties = generateCSSProperties(theme, cssVarPrefix);
    applyCSSProperties(properties);

    // Set data attributes for styling
    document.documentElement.setAttribute("data-theme", resolvedColorMode);
    document.documentElement.setAttribute("data-color-mode", colorMode);
  }, [theme, resolvedColorMode, colorMode, cssVarPrefix]);

  const value: ThemeContextValue = {
    theme,
    colorMode,
    setColorMode,
    toggleColorMode,
    resolvedColorMode,
    isDark,
    isLight,
    isSystem,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className="mild-react-root" data-theme={resolvedColorMode}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
