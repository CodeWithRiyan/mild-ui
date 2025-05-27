import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ThemeConfig,
  defaultTheme,
  darkTheme,
  applyTheme,
} from "@mild-ui/core";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  config: ThemeConfig;
  setConfig: (config: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  config?: ThemeConfig;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme: initialTheme = "system",
  config = defaultTheme,
  storageKey = "mild-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as ThemeMode) || initialTheme;
    }
    return initialTheme;
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(config);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let effectiveTheme: "light" | "dark";

    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = theme;
    }

    root.classList.add(effectiveTheme);

    // Apply the theme configuration
    const activeConfig = effectiveTheme === "dark" ? darkTheme : themeConfig;
    applyTheme(activeConfig);
  }, [theme, themeConfig]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");

      const activeConfig = mediaQuery.matches ? darkTheme : themeConfig;
      applyTheme(activeConfig);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, themeConfig]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        config: themeConfig,
        setConfig: setThemeConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
