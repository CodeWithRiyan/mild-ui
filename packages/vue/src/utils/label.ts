// packages/vue/src/utils/label.ts
import { cn } from "./cn";

export interface LabelVariantProps {
  required?: boolean;
  error?: boolean;
  className?: string;
}

export function labelVariants(props: LabelVariantProps) {
  const { required = false, error = false, className } = props;
  return cn(
    "mild-label",
    required && "mild-label--required",
    error && "mild-label--error",
    className,
  );
}
