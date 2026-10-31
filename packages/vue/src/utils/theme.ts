// packages/vue/src/utils/theme.ts
// Theme utility functions
import type { ThemeConfig } from "../types";

// Default theme: the same values as the core tokens (packages/core/src/sass/tokens), so what
// JavaScript reads through `useTheme().theme` matches what the stylesheet paints.
export const defaultTheme: ThemeConfig = {
  colorMode: "system",
  colors: {
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712",
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16",
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#422006",
    },
  },
  fonts: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: '"JetBrains Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Menlo, Consolas, monospace',
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  space: {
    "0": "0px",
    px: "1px",
    "0-5": "0.125rem",
    "1": "0.25rem",
    "1-5": "0.375rem",
    "2": "0.5rem",
    "2-5": "0.625rem",
    "3": "0.75rem",
    "3-5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "11": "2.75rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem",
  },
  radii: {
    none: "0px",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none",
  },
};

/**
 * Merge multiple theme configurations
 */
export function mergeThemes(...themes: Array<Partial<ThemeConfig>>): ThemeConfig {
  // Merged one level deep; keyed loosely here because each theme section has its own shape.
  const result: Record<string, unknown> = { ...defaultTheme };

  themes.forEach((theme) => {
    if (theme) {
      Object.entries(theme).forEach(([key, themeValue]) => {
        const currentValue = result[key];

        if (
          typeof themeValue === "object" &&
          themeValue !== null &&
          typeof currentValue === "object" &&
          currentValue !== null
        ) {
          result[key] = { ...currentValue, ...themeValue };
        } else if (themeValue !== undefined) {
          result[key] = themeValue;
        }
      });
    }
  });

  return result as unknown as ThemeConfig;
}

/** Theme section -> custom-property name segment, matching the core stylesheet. */
const SECTION_PREFIX: Record<Exclude<keyof ThemeConfig, "colorMode">, string> = {
  colors: "color",
  fonts: "font-family",
  fontSizes: "font-size",
  fontWeights: "font-weight",
  lineHeights: "line-height",
  letterSpacings: "letter-spacing",
  space: "space",
  sizes: "dimension",
  radii: "radius",
  shadows: "shadow",
  zIndices: "z-index",
  breakpoints: "breakpoint",
};

/**
 * Generate CSS custom properties from a theme (or theme overrides), named like the core tokens:
 * `colors.primary[500]` -> `--mild-color-primary-500`, `space["4"]` -> `--mild-space-4`,
 * `radii.lg` -> `--mild-radius-lg`, ...
 */
export function generateCSSProperties(
  theme: Partial<ThemeConfig>,
  prefix: string = "mild",
): Record<string, string> {
  const properties: Record<string, string> = {};

  for (const [section, segment] of Object.entries(SECTION_PREFIX)) {
    const values = theme[section as keyof typeof SECTION_PREFIX];
    if (!values) continue;
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "object" && value !== null) {
        // Nested scale, e.g. colors.primary -> --mild-color-primary-<shade>
        for (const [shade, shadeValue] of Object.entries(value)) {
          properties[`--${prefix}-${segment}-${key}-${shade}`] = String(shadeValue);
        }
      } else {
        properties[`--${prefix}-${segment}-${key}`] = String(value);
      }
    }
  }

  return properties;
}

/**
 * Apply CSS custom properties to <html>. Returns a function that removes them again.
 */
export function applyCSSProperties(properties: Record<string, string>): () => void {
  if (typeof document === "undefined") return () => {};
  const root = document.documentElement;

  for (const [property, value] of Object.entries(properties)) {
    root.style.setProperty(property, value);
  }
  return () => {
    for (const property of Object.keys(properties)) root.style.removeProperty(property);
  };
}

/**
 * Get theme color value
 */
export function getThemeColor(theme: ThemeConfig, colorPath: string): string {
  const parts = colorPath.split(".");
  let current: unknown = theme.colors;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return colorPath; // Return original if not found
    }
  }

  return typeof current === "string" ? current : String(current || colorPath);
}
