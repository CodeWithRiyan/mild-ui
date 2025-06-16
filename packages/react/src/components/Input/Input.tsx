// packages/react/src/components/Input/Input.tsx
import React, { forwardRef } from "react";
import type { InputCoreProps } from "../../types";
import { inputVariants } from "../../utils/input";

export interface InputProps
  extends Omit<InputCoreProps, "onChange" | "onBlur" | "onFocus" | "value" | "defaultValue" | "autoComplete" | "type">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "md",
      fullWidth = true,
      error = false,
      isDisabled: disabled = false,
      isReadOnly: readonly = false,
      isRequired: required = false,
      type = "text",
      className,
      ...rest
    },
    ref,
  ) => {
    // Generate classes using variant system
    const classes = inputVariants({
      variant,
      size,
      fullWidth,
      error,
      isDisabled: disabled,
      isReadOnly: readonly,
      isRequired: required,
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
