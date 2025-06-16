// Select utility functions
import { cn } from "./cn";
import type { Size } from "../types";

export interface SelectTriggerVariantProps {
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
}

export function selectTriggerVariants(props: SelectTriggerVariantProps) {
  const { size = "md", fullWidth = false, error = false } = props;

  return cn(
    // Base classes
    "mild-select-trigger",
    
    // Size classes
    `mild-select-trigger--${size}`,
    
    // State classes
    fullWidth && "mild-select-trigger--full-width",
    error && "mild-select-trigger--error"
  );
}

export interface SelectContentVariantProps {
  position?: "popper" | "item-aligned";
}

export function selectContentVariants(props: SelectContentVariantProps) {
  const { position = "popper" } = props;

  return cn(
    // Base classes
    "mild-select-content",
    
    // Position classes
    `mild-select-content--${position}`
  );
}

export interface SelectItemVariantProps {
  size?: Size;
}

export function selectItemVariants(props: SelectItemVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-select-item",
    
    // Size classes
    `mild-select-item--${size}`
  );
}