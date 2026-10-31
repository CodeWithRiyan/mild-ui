// Textarea utility functions
import { cn } from "./cn";
import type { TextareaCoreProps } from "../types";

export interface TextareaVariantProps extends TextareaCoreProps {
  className?: string;
}

export function textareaVariants(props: TextareaVariantProps) {
  const {
    variant = "outline",
    size = "md",
    fullWidth = true,
    error = false,
    isDisabled: disabled = false,
    isReadOnly: readonly = false,
    isRequired: required = false,
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
