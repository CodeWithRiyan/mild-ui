// Switch utility functions
import { cn } from "./cn";
import type { Size } from "../types";

export interface SwitchVariantProps {
  size?: Size;
}

export function switchVariants(props: SwitchVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-switch",
    
    // Size classes
    `mild-switch--${size}`
  );
}

export function switchThumbVariants(props: SwitchVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-switch-thumb",
    
    // Size classes
    `mild-switch-thumb--${size}`
  );
}

export function switchLabelVariants(props: SwitchVariantProps) {
  const { size = "md" } = props;

  return cn(
    // Base classes
    "mild-switch-label",
    
    // Size classes
    `mild-switch-label--${size}`
  );
}