// packages/vue/src/utils/checkbox.ts
import { cn } from "./cn";
import type { Size } from "../types";

export interface CheckboxVariantProps {
  size?: Size;
}

export function checkboxVariants(props: CheckboxVariantProps) {
  const { size = "md" } = props;
  return cn("mild-checkbox", `mild-checkbox--${size}`);
}

export function checkboxLabelVariants(props: CheckboxVariantProps) {
  const { size = "md" } = props;
  return cn("mild-checkbox-label", `mild-checkbox-label--${size}`);
}
