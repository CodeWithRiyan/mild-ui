// packages/core/src/types/common.ts
/// Common types used across all components
/// @fileoverview Universal type definitions for cross-platform components

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray';
export type Variant = 'solid' | 'outline' | 'ghost' | 'link';
export type ColorMode = 'light' | 'dark' | 'system';

// Base component props that all components should support
export interface BaseComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Component size */
  size?: Size;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Test ID for testing purposes */
  testId?: string;
}

// Theme-related types
export interface ThemeColors {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ThemeConfig {
  colors: {
    primary: ThemeColors;
    secondary: ThemeColors;
    success: ThemeColors;
    warning: ThemeColors;
    danger: ThemeColors;
    gray: ThemeColors;
  };
  spacing: Record<string, string>;
  fontSizes: Record<string, string>;
  fontWeights: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
}

// Accessibility types
export interface AriaProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-pressed'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  role?: string;
}

// Event handler types (platform agnostic)
export interface EventHandlers {
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}