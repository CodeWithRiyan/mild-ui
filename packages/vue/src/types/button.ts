// packages/vue/src/types/button.ts
import type { Size } from "./common";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";

export type ButtonSize = Size | "icon";

export interface ButtonCoreProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

export interface ButtonProps extends ButtonCoreProps {
  /** Full width button */
  fullWidth?: boolean;
  /** Color scheme for the outline, ghost and link styles (solid variants carry their own). */
  colorScheme?: string;
  /** Button type. Defaults to `"button"` so a button inside a form never submits by accident. */
  type?: "button" | "submit" | "reset";
}
