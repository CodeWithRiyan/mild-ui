// Radio utility functions
import { cn } from "./cn";
import type { Size } from "../types";

export interface RadioVariantProps {
  size?: Size;
}

export function radioVariants(props: RadioVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-radio",
    
    // Size classes
    `mild-radio--${size}`
  );
}

export function radioLabelVariants(props: RadioVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-radio-label",
    
    // Size classes
    `mild-radio-label--${size}`
  );
}