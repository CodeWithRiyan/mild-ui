/**
 * React Button Types
 * @description React-specific button type definitions extending core types
 */

import type { 
  ButtonProps as CoreButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonColorScheme
} from '@mild-ui/core';
import type { ReactNode } from 'react';

export interface ReactButtonProps extends CoreButtonProps {
  /** Render as child element */
  asChild?: boolean;
  /** Left icon element */
  leftIcon?: ReactNode;
  /** Right icon element */
  rightIcon?: ReactNode;
  /** Button content */
  children?: ReactNode;
  /** React click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ButtonProps
  extends ReactButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ReactButtonProps> {}

// Re-export core types for convenience
export type { ButtonVariant, ButtonSize, ButtonColorScheme };
