// packages/vue/src/utils/input-password.ts
import { cn } from "./cn";
import { inputVariants, type InputVariantProps } from "./input";
import type { Size } from "../types";

export type InputPasswordVariantProps = InputVariantProps;

export function inputPasswordVariants(props: InputPasswordVariantProps) {
  return inputVariants(props, "mild-input-password");
}

export interface InputPasswordToggleVariantProps {
  size?: Size;
}

export function inputPasswordToggleVariants(props: InputPasswordToggleVariantProps) {
  const { size = "md" } = props;
  return cn("mild-input-password-toggle", `mild-input-password-toggle--${size}`);
}
