// packages/vue/src/types/checkbox.ts
import type { Size } from "./common";

/** `true`, `false`, or `"indeterminate"` (announced as mixed). */
export type CheckboxValue = boolean | "indeterminate";

/** Extra classes per part. */
export interface CheckboxUiClasses {
  container?: string;
  checkbox?: string;
  indicator?: string;
  label?: string;
}

export interface CheckboxProps {
  id?: string;
  /** `v-model`: `true`, `false`, or `"indeterminate"`. Makes the checkbox controlled. */
  modelValue?: CheckboxValue;
  /** Initial state when uncontrolled. */
  defaultChecked?: CheckboxValue;
  /** Shows the mixed state regardless of the model. Same as `modelValue="indeterminate"`. */
  indeterminate?: boolean;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  /** Submits a hidden `<input type="checkbox">` under this name. */
  name?: string;
  /** Value of the hidden input. Defaults to `"on"`. */
  value?: string;
  /** Label text. Use the default slot for rich content. */
  label?: string;
  /** Extra classes per part. `class`/`style` on the component go to the checkbox itself. */
  ui?: CheckboxUiClasses;
}
