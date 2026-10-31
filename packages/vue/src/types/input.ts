// packages/vue/src/types/input.ts
import type { Size } from "./common";

export type InputVariant = "outline" | "filled" | "flushed" | "unstyled";

export interface InputCoreProps {
  size?: Size;
  variant?: InputVariant;
  colorScheme?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorBorderColor?: string;
  focusBorderColor?: string;
  fullWidth?: boolean;
  error?: boolean;
}

export interface InputProps extends InputCoreProps {
  /** `v-model` */
  modelValue?: string | number;
  type?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}
