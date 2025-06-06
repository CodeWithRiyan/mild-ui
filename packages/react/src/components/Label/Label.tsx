// packages/react/src/components/Label/Label.tsx
import React, { forwardRef } from 'react';
import type { LabelProps as CoreLabelProps } from '../../../../core';
import { labelVariants } from '../../../../core';
import { cn } from '../../../../core';

export interface LabelProps extends CoreLabelProps {
  /** Label content */
  children: React.ReactNode;
  /** Associated form control ID */
  htmlFor?: string;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void;
  /** Ref forwarding */
  ref?: React.Ref<HTMLLabelElement>;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      required = false,
      error = false,
      ui,
      children,
      htmlFor,
      className,
      onClick,
      ...rest
    },
    ref
  ) => {
    const classes = labelVariants({
      required,
      error,
      className,
    });

    return (
      <label
        ref={ref}
        className={classes}
        htmlFor={htmlFor}
        onClick={onClick}
        {...rest}
      >
        {children}
        {required && (
          <span className={cn("--mild-space-1 --mild-color-red-500", ui?.asterisk)}>*</span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';