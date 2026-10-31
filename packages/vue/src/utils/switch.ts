// packages/vue/src/utils/switch.ts
import { cn } from "./cn";
import type { Size } from "../types";

export interface SwitchVariantProps {
  size?: Size;
}

export function switchVariants(props: SwitchVariantProps) {
  const { size = "md" } = props;
  return cn("mild-switch", `mild-switch--${size}`);
}

export function switchThumbVariants(props: SwitchVariantProps) {
  const { size = "md" } = props;
  return cn("mild-switch-thumb", `mild-switch-thumb--${size}`);
}

export function switchLabelVariants(props: SwitchVariantProps) {
  const { size = "md" } = props;
  return cn("mild-switch-label", `mild-switch-label--${size}`);
}
