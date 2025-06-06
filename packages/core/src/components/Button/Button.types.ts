// packages/core/src/components/Button/Button.types.ts
/// Button component universal types (Updated with Gray ColorScheme)
/// @fileoverview Framework-agnostic button component interfaces

import type { BaseComponentProps, ColorScheme, Variant, AriaProps, EventHandlers } from '../../types/common';

export type ButtonVariant = Variant;
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColorScheme = ColorScheme; // This includes 'gray' now

export interface ButtonCoreProps extends BaseComponentProps, AriaProps, EventHandlers {
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color scheme */
  colorScheme?: ButtonColorScheme;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button type (for forms) */
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonStyleProps {
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color scheme */
  colorScheme?: ButtonColorScheme;
  /** Full width button */
  fullWidth?: boolean;
  /** Custom CSS class */
  className?: string;
}

export interface ButtonPlatformProps {
  /** Platform-specific click handler */
  // onClick?: (e: any) => void;
  onPress?: () => void; // React Native
  onTap?: () => void;   // Flutter equivalent
}

export type ButtonProps = ButtonCoreProps & ButtonPlatformProps;

// Button style configuration
export interface ButtonStyleConfig {
  baseStyles: string;
  variants: Record<ButtonVariant, string>;
  sizes: Record<ButtonSize, string>;
  colorSchemes: Record<ButtonColorScheme, Record<ButtonVariant, string>>;
}