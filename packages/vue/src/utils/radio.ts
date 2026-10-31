// packages/vue/src/utils/radio.ts
import { cn } from "./cn";
import type { Size } from "../types";

export interface RadioVariantProps {
  size?: Size;
}

export function radioVariants(props: RadioVariantProps) {
  const { size = "md" } = props;
  return cn("mild-radio", `mild-radio--${size}`);
}

export function radioLabelVariants(props: RadioVariantProps) {
  const { size = "md" } = props;
  return cn("mild-radio-label", `mild-radio-label--${size}`);
}
