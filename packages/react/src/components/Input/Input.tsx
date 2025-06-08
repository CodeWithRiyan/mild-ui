// packages/react/src/components/Input/Input.tsx
import React, { forwardRef } from "react";
import type { InputCoreProps } from "../../../../core";
import { inputVariants } from "../../../../core";

export interface InputProps
  extends InputCoreProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "md",
      fullWidth = true,
      error = false,
      disabled = false,
      readonly = false,
      required = false,
      type = "text",
      className,
      ...rest
    },
    ref,
  ) => {
    // Generate classes using core variant system
    const classes = inputVariants({
      variant,
      size,
      fullWidth,
      error,
      disabled,
      readonly,
      required,
      className,
    });

    return (
      <input
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        required={required}
        aria-invalid={error || undefined}
        data-controlled={rest.value !== undefined ? "true" : undefined}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
