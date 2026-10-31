// packages/vue/src/utils/input.ts
import { cn } from "./cn";
import type { InputVariant, Size } from "../types";

export interface InputVariantProps {
  variant?: InputVariant;
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  className?: string;
}

/** Class list for `.mild-input` (or `.mild-input-password` when `base` says so). */
export function inputVariants(props: InputVariantProps, base = "mild-input") {
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
    base,
    `${base}--${variant}`,
    `${base}--${size}`,
    fullWidth && `${base}--full-width`,
    error && `${base}--error`,
    disabled && `${base}--disabled`,
    readonly && `${base}--readonly`,
    required && `${base}--required`,
    className,
  );
}
