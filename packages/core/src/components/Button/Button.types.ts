// packages/core/src/components/Button/Button.types.ts
import { type ButtonVariantProps } from "./Button.styles";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonCoreProps {
  disabled?: boolean;
  className?: string;
}

export interface ButtonStyleProps extends ButtonVariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
