// packages/react/src/components/Button/Button.types.ts
import type { ButtonCoreProps, ButtonVariant, ButtonSize } from "../../types/button";

export interface ButtonProps
  extends ButtonCoreProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Left icon element */
  leftIcon?: React.ReactElement;
  /** Right icon element */
  rightIcon?: React.ReactElement;
  /** Full width button */
  fullWidth?: boolean;
  /** Color scheme */
  colorScheme?: string;
  /** Button type */
  type?: "button" | "submit" | "reset";
}

// Re-export these for convenience
export type { ButtonVariant, ButtonSize };
