// packages/react/src/components/Button/Button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { getButtonProps } from '@mild-ui/core';
import type { ButtonProps } from './Button.types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className,
  disabled = false,
  onClick,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  const { className: buttonClassName, ...buttonProps } = getButtonProps({ 
    variant, 
    size, 
    disabled, 
    className 
  });
  
  return (
    <Comp
      className={buttonClassName}
      ref={ref}
      onClick={onClick}
      {...props}
      {...buttonProps}
    >
      {leadingIcon && <span className="mr-2">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };