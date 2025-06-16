// Input utility functions
import { cn } from "./cn";
import type { InputCoreProps } from "../types";

export interface InputVariantProps extends InputCoreProps {
  className?: string;
  readonly?: boolean;
}

export function inputVariants(props: InputVariantProps) {
  const {
    variant = "outline",
    size = "md",
    fullWidth = true,
    error = false,
    isDisabled: disabled = false,
    isReadOnly: readonly = false,
    isRequired: required = false,
    className,
  } = props;

  return cn(
    // Base classes
    "mild-input",
    
    // Variant classes
    `mild-input--${variant}`,
    
    // Size classes
    `mild-input--${size}`,
    
    // State classes
    fullWidth && "mild-input--full-width",
    error && "mild-input--error",
    disabled && "mild-input--disabled",
    readonly && "mild-input--readonly",
    required && "mild-input--required",
    
    // Custom className
    className
  );
}