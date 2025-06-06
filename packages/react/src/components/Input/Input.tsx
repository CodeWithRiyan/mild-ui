// packages/react/src/components/Input/Input.tsx
import React, { forwardRef } from "react";
import type { InputProps as CoreInputProps } from "../../../../core";
import { inputVariants } from "../../../../core";

export interface InputProps
  extends Omit<
    CoreInputProps,
    "onChange" | "onBlur" | "onFocus" | "onInput" | "onChangeText"
  > {
  /** Input change handler */
  onChange?: (value: string) => void;
  /** Input blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Additional CSS class */
  className?: string;
  /** Ref forwarding */
  ref?: React.Ref<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "md",
      error = false,
      disabled = false,
      readonly = false,
      required = false,
      type = "text",
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      className,
      ...rest
    },
    ref,
  ) => {
    // Generate classes using core variant system
    const classes = inputVariants({
      variant,
      size,
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
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        aria-invalid={error || undefined}
        data-controlled={value !== undefined ? "true" : undefined}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
