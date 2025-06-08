// packages/react/src/components/Button/Button.types.ts
// import type {
//   ButtonCoreProps,
//   ButtonStyleProps,
//   ButtonVariant,
//   ButtonSize,
// } from "@mild-ui/core";
import { ButtonVariant, ButtonSize, ButtonCoreProps } from "../../../../core";

export interface ButtonProps
  extends ButtonCoreProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Left icon element */
  leftIcon?: React.ReactElement;
  /** Right icon element */
  rightIcon?: React.ReactElement;
}

// Re-export these for convenience
export type { ButtonVariant, ButtonSize };
