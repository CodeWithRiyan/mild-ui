// packages/react/src/components/Button/Button.types.ts
// import type {
//   ButtonCoreProps,
//   ButtonStyleProps,
//   ButtonVariant,
//   ButtonSize,
// } from "@mild-ui/core";
import { CoreButtonProps } from "../..";
import { ButtonVariant, ButtonSize } from '../../../../core';

export interface ButtonProps extends CoreButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Left icon element */
  leftIcon?: React.ReactElement;
  /** Right icon element */
  rightIcon?: React.ReactElement;
  /** Additional CSS class */
  className?: string;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Ref forwarding */
  ref?: React.Ref<HTMLButtonElement>;
}

// Re-export these for convenience
export type { ButtonVariant, ButtonSize };
