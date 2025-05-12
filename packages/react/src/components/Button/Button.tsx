import React from 'react';
import { getButtonAttributes } from '@mild-ui/core';
import { ButtonProps } from './Button.types';

const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  leadingIcon,
  trailingIcon,
  children,
  className = ''
}: ButtonProps) => {
  const baseAttributes = getButtonAttributes({ variant, size, disabled });
  
  return (
    <button
      className={`${baseAttributes.className} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leadingIcon && <span className="mild-button-icon mild-button-leading-icon">{leadingIcon}</span>}
      <span className="mild-button-content">{children}</span>
      {trailingIcon && <span className="mild-button-icon mild-button-trailing-icon">{trailingIcon}</span>}
    </button>
  );
};

export default Button;