// packages/vue/src/utils/select.ts
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
    "mild-select-trigger",
    `mild-select-trigger--${size}`,
    fullWidth && "mild-select-trigger--full-width",
    error && "mild-select-trigger--error",
  );
}

export interface SelectContentVariantProps {
  position?: "popper" | "item-aligned";
}

export function selectContentVariants(props: SelectContentVariantProps) {
  const { position = "popper" } = props;
  return cn("mild-select-content", `mild-select-content--${position}`);
}

export interface SelectItemVariantProps {
  size?: Size;
}

export function selectItemVariants(props: SelectItemVariantProps) {
  const { size = "md" } = props;
  return cn("mild-select-item", `mild-select-item--${size}`);
}
