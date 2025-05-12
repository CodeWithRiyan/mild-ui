import { ButtonBaseProps } from '@mild-ui/core';
import { ReactNode, MouseEvent } from 'react';

export interface ButtonProps extends ButtonBaseProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}