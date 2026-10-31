// packages/vue/src/types/input-password.ts
import type { InputCoreProps } from "./input";

export interface InputPasswordUiClasses {
  container?: string;
  input?: string;
  buttonIcon?: string;
}

export interface InputPasswordProps extends InputCoreProps {
  /** `v-model` */
  modelValue?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** Extra classes per part. */
  ui?: InputPasswordUiClasses;
}
