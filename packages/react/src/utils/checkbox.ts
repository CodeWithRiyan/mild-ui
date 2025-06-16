// Checkbox utility functions
import { cn } from "./cn";
import type { Size } from "../types";

export interface CheckboxVariantProps {
  size?: Size;
}

export function checkboxVariants(props: CheckboxVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-checkbox",
    
    // Size classes
    `mild-checkbox--${size}`
  );
}

export function checkboxLabelVariants(props: CheckboxVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-checkbox-label",
    
    // Size classes
    `mild-checkbox-label--${size}`
  );
}