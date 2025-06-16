// Styling utility functions
import type { SpacingValue, ColorValue } from "../types";

// Spacing value mapping
const spacingMap: Record<string, string> = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
};

// Color value mapping
const colorMap: Record<string, string> = {
  transparent: "transparent",
  current: "currentColor",
  inherit: "inherit",
  primary: "var(--mild-colors-primary-500, #3b82f6)",
  secondary: "var(--mild-colors-secondary-500, #6b7280)",
  success: "var(--mild-colors-green-500, #10b981)",
  warning: "var(--mild-colors-yellow-500, #f59e0b)",
  error: "var(--mild-colors-red-500, #ef4444)",
  info: "var(--mild-colors-blue-500, #3b82f6)",
  gray: "var(--mild-colors-gray-500, #6b7280)",
  red: "var(--mild-colors-red-500, #ef4444)",
  orange: "var(--mild-colors-orange-500, #f97316)",
  yellow: "var(--mild-colors-yellow-500, #f59e0b)",
  green: "var(--mild-colors-green-500, #10b981)",
  blue: "var(--mild-colors-blue-500, #3b82f6)",
  purple: "var(--mild-colors-purple-500, #8b5cf6)",
  pink: "var(--mild-colors-pink-500, #ec4899)",
};

/**
 * Convert spacing value to CSS value
 */
export function getSpacingValue(value: SpacingValue): string {
  if (typeof value === "number") {
    return `${value}px`;
  }
  
  if (typeof value === "string") {
    // Check if it's a predefined spacing key
    if (spacingMap[value]) {
      return spacingMap[value];
    }
    
    // Return as-is for custom CSS values
    return value;
  }
  
  return "0";
}

/**
 * Convert color value to CSS value
 */
export function getColorValue(value: ColorValue): string {
  if (typeof value === "string") {
    // Check if it's a predefined color key
    if (colorMap[value]) {
      return colorMap[value];
    }
    
    // Return as-is for custom CSS values (hex, rgb, etc.)
    return value;
  }
  
  return value;
}

/**
 * Generate CSS variable name
 */
export function cssVar(property: string, value?: string): string {
  const varName = `--mild-${property}`;
  return value ? `var(${varName}, ${value})` : `var(${varName})`;
}

/**
 * Generate data attribute
 */
export function dataAttr(condition: boolean | undefined): string | undefined {
  return condition ? "" : undefined;
}

/**
 * Generate aria attribute
 */
export function ariaAttr(condition: boolean | undefined): boolean | undefined {
  return condition ? true : undefined;
}

/**
 * Class variance authority (CVA) utility - simplified version
 */
export function cva(
  base: string,
  options?: {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Record<string, any>;
  }
) {
  return (props?: Record<string, any>) => {
    const classes = [base];
    
    if (options?.variants && props) {
      Object.entries(options.variants).forEach(([key, variants]) => {
        const value = props[key] ?? options.defaultVariants?.[key];
        if (value && variants[value]) {
          classes.push(variants[value]);
        }
      });
    }
    
    return classes.filter(Boolean).join(" ");
  };
}