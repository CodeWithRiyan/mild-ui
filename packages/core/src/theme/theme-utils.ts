// packages/core/src/theme/theme-utils.ts
/// Theme utility functions
/// @fileoverview Utilities for working with themes

import type { ThemeConfig, ColorScheme, ThemeColors } from '../types/common';
import { defaultTheme } from './default-theme';

/**
 * Merge theme configurations deeply
 */
export function mergeThemes(base: ThemeConfig, override: Partial<ThemeConfig>): ThemeConfig {
  const merged = { ...base };
  
  if (override.colors) {
    merged.colors = {
      ...base.colors,
      ...override.colors
    };
    
    // Deep merge color schemes
    Object.keys(override.colors).forEach(colorKey => {
      const key = colorKey as keyof typeof override.colors;
      if (override.colors?.[key] && base.colors[key]) {
        merged.colors[key] = {
          ...base.colors[key],
          ...override.colors[key]
        } as ThemeColors;
      }
    });
  }
  
  if (override.spacing) {
    merged.spacing = { ...base.spacing, ...override.spacing };
  }
  
  if (override.fontSizes) {
    merged.fontSizes = { ...base.fontSizes, ...override.fontSizes };
  }
  
  if (override.fontWeights) {
    merged.fontWeights = { ...base.fontWeights, ...override.fontWeights };
  }
  
  if (override.borderRadius) {
    merged.borderRadius = { ...base.borderRadius, ...override.borderRadius };
  }
  
  if (override.shadows) {
    merged.shadows = { ...base.shadows, ...override.shadows };
  }
  
  if (override.breakpoints) {
    merged.breakpoints = { ...base.breakpoints, ...override.breakpoints };
  }
  
  return merged;
}

/**
 * Get color value from theme
 */
export function getThemeColor(
  theme: ThemeConfig,
  colorScheme: ColorScheme,
  shade: keyof ThemeColors = '500'
): string {
  return theme.colors[colorScheme][shade];
}

/**
 * Generate CSS custom properties from theme
 */
export function generateCSSProperties(theme: ThemeConfig, prefix = 'mild'): Record<string, string> {
  const properties: Record<string, string> = {};
  
  // Colors
  Object.entries(theme.colors).forEach(([colorName, colorScale]) => {
    Object.entries(colorScale).forEach(([shade, value]) => {
      properties[`--${prefix}-color-${colorName}-${shade}`] = value;
    });
  });
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    properties[`--${prefix}-space-${key}`] = value;
  });
  
  // Font sizes
  Object.entries(theme.fontSizes).forEach(([key, value]) => {
    properties[`--${prefix}-font-size-${key}`] = value;
  });
  
  // Font weights
  Object.entries(theme.fontWeights).forEach(([key, value]) => {
    properties[`--${prefix}-font-weight-${key}`] = value;
  });
  
  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    properties[`--${prefix}-radius-${key}`] = value;
  });
  
  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    properties[`--${prefix}-shadow-${key}`] = value;
  });
  
  return properties;
}

/**
 * Apply CSS properties to DOM
 */
export function applyCSSProperties(
  properties: Record<string, string>,
  element: HTMLElement = document.documentElement
): void {
  Object.entries(properties).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
}

/**
 * Create a theme with custom color scheme
 */
export function createCustomColorScheme(
  baseColor: string,
  name: string = 'custom'
): ThemeColors {
  // This is a simplified implementation
  // In a real implementation, you'd use color manipulation libraries
  // to generate proper color scales from a base color
  
  return {
    50: `color-mix(in srgb, ${baseColor} 10%, white)`,
    100: `color-mix(in srgb, ${baseColor} 20%, white)`,
    200: `color-mix(in srgb, ${baseColor} 30%, white)`,
    300: `color-mix(in srgb, ${baseColor} 40%, white)`,
    400: `color-mix(in srgb, ${baseColor} 60%, white)`,
    500: baseColor,
    600: `color-mix(in srgb, ${baseColor} 80%, black)`,
    700: `color-mix(in srgb, ${baseColor} 70%, black)`,
    800: `color-mix(in srgb, ${baseColor} 60%, black)`,
    900: `color-mix(in srgb, ${baseColor} 50%, black)`,
    950: `color-mix(in srgb, ${baseColor} 30%, black)`
  };
}

/**
 * Detect system color scheme preference
 */
export function getSystemColorScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light';
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Create responsive design token
 */
export function createResponsiveValue(values: Record<string, string | number>): string {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  
  // Start with mobile-first approach
  let cssValue = '';
  
  breakpoints.forEach((breakpoint, index) => {
    const value = values[breakpoint];
    if (value !== undefined) {
      if (index === 0) {
        // Base value (mobile)
        cssValue = String(value);
      } else {
        // Add media query for larger screens
        const breakpointPx = defaultTheme.breakpoints[breakpoint];
        cssValue += `; @media (min-width: ${breakpointPx}) { /* ${breakpoint}: ${value} */ }`;
      }
    }
  });
  
  return cssValue;
}