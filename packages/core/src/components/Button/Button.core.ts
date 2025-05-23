// packages/core/src/components/Button/Button.core.ts
import { ButtonCoreProps, ButtonStyleProps } from './Button.types';
import { buttonVariants } from './Button.styles';
import { cn } from '../../utils/cn';

export function getButtonProps(props: ButtonCoreProps & ButtonStyleProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    disabled = false,
    ...restProps
  } = props;
  
  return {
    className: cn(buttonVariants({ variant, size }), className),
    disabled,
    variant,
    size,
    ...restProps
  };
}