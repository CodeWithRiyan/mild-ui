// packages/core/src/components/Button/Button.types.ts
/// Button component universal types (Updated with Gray ColorScheme)
/// @fileoverview Framework-agnostic button component interfaces

import type { ColorScheme, Variant } from "../../types/common";

export type ButtonVariant = Variant;
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonColorScheme = ColorScheme; // This includes 'gray' now

export interface ButtonCoreProps extends ButtonStyleProps {
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button type (for forms) */
  type?: "button" | "submit" | "reset";
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
}
