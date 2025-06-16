// Label utility functions
import { cn } from "./cn";

export interface LabelVariantProps {
  required?: boolean;
  error?: boolean;
  className?: string;
}

export function labelVariants(props: LabelVariantProps) {
  const { required = false, error = false, className } = props;

  return cn(
    // Base classes
    "mild-label",
    
    // State classes
    required && "mild-label--required",
    error && "mild-label--error",
    
    // Custom className
    className
  );
}