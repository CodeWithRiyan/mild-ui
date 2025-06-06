// packages/core/src/utils/component-helpers.ts
/// Utility functions for component development
/// @fileoverview Helper functions for building components

import type { Size, ColorScheme } from '../types/common';

/**
 * Generate component class names based on props
 */
export function createComponentClass(
  baseClass: string,
  variant?: string,
  size?: Size,
  colorScheme?: ColorScheme,
  additionalClasses?: string,
  modifiers?: Record<string, boolean>
): string {
  const classes = [baseClass];
  
  if (variant) {
    classes.push(`${baseClass}--${variant}`);
  }
  
  if (size) {
    classes.push(`${baseClass}--${size}`);
  }
  
  if (colorScheme) {
    classes.push(`${baseClass}--${colorScheme}`);
  }
  
  // Add modifier classes
  if (modifiers) {
    Object.entries(modifiers).forEach(([modifier, condition]) => {
      if (condition) {
        classes.push(`${baseClass}--${modifier}`);
      }
    });
  }
  
  if (additionalClasses) {
    classes.push(additionalClasses);
  }
  
  return classes.join(' ');
}

/**
 * Extract platform-specific props from component props
 */
export function extractPlatformProps<T extends Record<string, any>>(
  props: T,
  platformKeys: string[]
): [T, Record<string, any>] {
  const platformProps: Record<string, any> = {};
  const coreProps = { ...props };
  
  platformKeys.forEach(key => {
    if (key in props) {
      platformProps[key] = props[key];
      delete coreProps[key];
    }
  });
  
  return [coreProps, platformProps];
}

/**
 * Convert spacing value to CSS value
 */
export function getSpacingValue(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  
  // Check if it's a design token
  if (typeof value === 'string' && !value.includes('px') && !value.includes('rem') && !value.includes('%')) {
    return `var(--mild-space-${value})`;
  }
  
  return value;
}

/**
 * Convert color value to CSS value
 */
export function getColorValue(color: string | ColorScheme): string {
  // If it's a design token color scheme
  const colorSchemes: ColorScheme[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'gray'];
  
  if (colorSchemes.includes(color as ColorScheme)) {
    return `var(--mild-color-${color}-500)`;
  }
  
  // Return as-is for custom colors
  return color as string;
}

/**
 * Generate responsive class names
 */
export function createResponsiveClasses(
  baseClass: string,
  responsiveProps: Record<string, any>
): string[] {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const classes: string[] = [];
  
  breakpoints.forEach(breakpoint => {
    const propValue = responsiveProps[breakpoint];
    if (propValue) {
      if (breakpoint === 'xs') {
        classes.push(`${baseClass}-${propValue}`);
      } else {
        classes.push(`${breakpoint}:${baseClass}-${propValue}`);
      }
    }
  });
  
  return classes;
}

/**
 * Validate component props for development
 */
export function validateProps<T extends Record<string, any>>(
  props: T,
  validations: Record<keyof T, (value: any) => boolean | string>
): void {
  if (process.env.NODE_ENV === 'development') {
    Object.entries(validations).forEach(([key, validator]) => {
      const value = props[key];
      if (value !== undefined) {
        const result = validator(value);
        if (typeof result === 'string') {
          console.warn(`Invalid prop '${key}': ${result}`);
        } else if (!result) {
          console.warn(`Invalid prop '${key}': ${value}`);
        }
      }
    });
  }
}