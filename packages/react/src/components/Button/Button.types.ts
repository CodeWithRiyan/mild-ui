// packages/react/src/components/Button/Button.types.ts
import type { ButtonCoreProps, ButtonStyleProps, ButtonVariant, ButtonSize } from '@mild-ui/core';

export interface ButtonReactProps extends ButtonCoreProps, ButtonStyleProps {
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ButtonProps extends ButtonReactProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonReactProps> {}

// Re-export these for convenience
export type { ButtonVariant, ButtonSize };