// packages/vue/src/types/switch.ts
import type { Size } from "./common";

export interface SwitchUiClasses {
  container?: string;
  switch?: string;
  thumb?: string;
  label?: string;
}

export interface SwitchProps {
  id?: string;
  /** `v-model`: on or off. Makes the switch controlled. */
  modelValue?: boolean;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  /** Submits a hidden `<input type="checkbox">` under this name. */
  name?: string;
  /** Value of the hidden input. Defaults to `"on"`. */
  value?: string;
  /** Label text. Use the default slot for rich content. */
  label?: string;
  /** Extra classes per part. */
  ui?: SwitchUiClasses;
}
