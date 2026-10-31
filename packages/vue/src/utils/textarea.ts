// packages/vue/src/utils/textarea.ts
import { cn } from "./cn";
import type { TextareaResize, TextareaSize, InputVariant } from "../types";

export interface TextareaVariantProps {
  variant?: InputVariant;
  size?: TextareaSize;
  fullWidth?: boolean;
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  resize?: TextareaResize;
  autoResize?: boolean;
  className?: string;
}

export function textareaVariants(props: TextareaVariantProps) {
  const {
    variant = "outline",
    size = "md",
    fullWidth = true,
    error = false,
    disabled = false,
    readonly = false,
    required = false,
    resize = "vertical",
    autoResize = false,
    className,
  } = props;

  return cn(
    "mild-textarea",
    `mild-textarea--${variant}`,
    `mild-textarea--${size}`,
    `mild-textarea--resize-${resize}`,
    autoResize && "mild-textarea--auto-resize",
    fullWidth && "mild-textarea--full-width",
    error && "mild-textarea--error",
    disabled && "mild-textarea--disabled",
    readonly && "mild-textarea--readonly",
    required && "mild-textarea--required",
    className,
  );
}
