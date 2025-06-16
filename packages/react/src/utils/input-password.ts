// InputPassword utility functions
import { cn } from "./cn";
import type { Size } from "../types";

export interface InputPasswordVariantProps {
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  className?: string;
}

export function inputPasswordVariants(props: InputPasswordVariantProps) {
  const {
    variant = "outline",
    size = "md",
    fullWidth = true,
    error = false,
    disabled = false,
    readonly = false,
    required = false,
    className,
  } = props;

  return cn(
    // Base classes
    "mild-input-password",
    
    // Variant classes
    `mild-input-password--${variant}`,
    
    // Size classes
    `mild-input-password--${size}`,
    
    // State classes
    fullWidth && "mild-input-password--full-width",
    error && "mild-input-password--error",
    disabled && "mild-input-password--disabled",
    readonly && "mild-input-password--readonly",
    required && "mild-input-password--required",
    
    // Custom className
    className
  );
}

export interface InputPasswordToggleVariantProps {
  size?: Size;
}

export function inputPasswordToggleVariants(props: InputPasswordToggleVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-input-password-toggle",
    
    // Size classes
    `mild-input-password-toggle--${size}`
  );
}