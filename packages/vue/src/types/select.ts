// packages/vue/src/types/select.ts
import type { Size } from "./common";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectRootProps {
  /** `v-model`: the selected value. Makes the select controlled. */
  modelValue?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  /** `v-model:open`: whether the popup is open. */
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Submits a hidden input under this name. */
  name?: string;
  size?: Size;
}

export interface SelectTriggerProps {
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
  disabled?: boolean;
  /** Extra classes per part. `class`/`style` on the component go to the button itself. */
  ui?: { icon?: string };
}

export interface SelectValueProps {
  placeholder?: string;
}

export interface SelectContentProps {
  position?: "popper" | "item-aligned";
}

export interface SelectItemProps {
  value: string;
  size?: Size;
  disabled?: boolean;
}

/** Extra classes per part of the composite `Select`. */
export interface SelectUiClasses {
  root?: string;
  trigger?: string;
  value?: string;
  icon?: string;
  content?: string;
  item?: string;
}

export interface SelectProps extends SelectRootProps, SelectTriggerProps {
  id?: string;
  placeholder?: string;
  options?: SelectOption[];
  /** Extra classes per part. `class`/`style` on the component go to the trigger button. */
  ui?: SelectUiClasses;
}
