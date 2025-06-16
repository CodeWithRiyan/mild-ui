// Theme utility functions
import type { ThemeConfig } from "../types";

// Default theme configuration
export const defaultTheme: ThemeConfig = {
  colorMode: "light",
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
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
    },
  },
  space: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem",
  },
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  fontWeights: {
    thin: "100",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  lineHeights: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  zIndices: {
    hide: "-1",
    auto: "auto",
    base: "0",
    docked: "10",
    dropdown: "1000",
    sticky: "1100",
    banner: "1200",
    overlay: "1300",
    modal: "1400",
    popover: "1500",
    skipLink: "1600",
    toast: "1700",
    tooltip: "1800",
  },
};

/**
 * Merge multiple theme configurations
 */
export function mergeThemes(...themes: Array<Partial<ThemeConfig>>): ThemeConfig {
  const result = { ...defaultTheme };
  
  themes.forEach(theme => {
    if (theme) {
      Object.keys(theme).forEach(key => {
        const themeKey = key as keyof ThemeConfig;
        const themeValue = theme[themeKey];
        const currentValue = result[themeKey];
        
        if (typeof themeValue === 'object' && themeValue !== null && 
            typeof currentValue === 'object' && currentValue !== null) {
          result[themeKey] = { 
            ...currentValue, 
            ...themeValue 
          } as any;
        } else if (themeValue !== undefined) {
          result[themeKey] = themeValue as any;
        }
      });
    }
  });
  
  return result;
}

/**
 * Generate CSS custom properties from theme
 */
export function generateCSSProperties(
  theme: ThemeConfig,
  prefix: string = "mild"
): Record<string, string> {
  const properties: Record<string, string> = {};
  
  // Generate color properties
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'object') {
        Object.entries(colorValue).forEach(([shade, value]) => {
          properties[`--${prefix}-colors-${colorName}-${shade}`] = String(value);
        });
      } else {
        properties[`--${prefix}-colors-${colorName}`] = colorValue;
      }
    });
  }
  
  // Generate spacing properties
  if (theme.space) {
    Object.entries(theme.space).forEach(([key, value]) => {
      properties[`--${prefix}-space-${key}`] = value;
    });
  }
  
  // Generate size properties
  if (theme.sizes) {
    Object.entries(theme.sizes).forEach(([key, value]) => {
      properties[`--${prefix}-sizes-${key}`] = value;
    });
  }
  
  // Generate other theme properties
  const otherProperties: Array<keyof ThemeConfig> = ['radii', 'fontSizes', 'fontWeights', 'lineHeights', 'letterSpacings', 'shadows'];
  otherProperties.forEach(prop => {
    const propValue = theme[prop];
    if (propValue && typeof propValue === 'object') {
      Object.entries(propValue).forEach(([key, value]) => {
        properties[`--${prefix}-${prop}-${key}`] = String(value);
      });
    }
  });
  
  return properties;
}

/**
 * Apply CSS custom properties to document
 */
export function applyCSSProperties(properties: Record<string, string>): void {
  if (typeof document === 'undefined') return;
  
  Object.entries(properties).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
}

/**
 * Get theme color value
 */
export function getThemeColor(theme: ThemeConfig, colorPath: string): string {
  const parts = colorPath.split('.');
  let current: any = theme.colors;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return colorPath; // Return original if not found
    }
  }
  
  return typeof current === 'string' ? current : String(current || colorPath);
}