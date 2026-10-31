// packages/vue/src/types/radio.ts
import type { Size } from "./common";

export type RadioSize = Size;

/** Extra classes per part of a group. */
export interface RadioGroupUiClasses {
  container?: string;
  /** Applied to every radio (the `RadioGroupItem` control) rendered from `items`. */
  items?: string;
}

/** Extra classes per part of an item. */
export interface RadioGroupItemUiClasses {
  container?: string;
  radio?: string;
  indicator?: string;
  label?: string;
}

export interface RadioGroupProps {
  /** `v-model`: the checked value. Makes the group controlled. */
  modelValue?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  /** Submits a hidden input under this name. */
  name?: string;
  disabled?: boolean;
  required?: boolean;
  /** Extra classes per part. `class`/`style` on the component go to the group element. */
  ui?: RadioGroupUiClasses;
}

export interface RadioGroupItemProps {
  id?: string;
  value: string;
  label?: string;
  size?: RadioSize;
  disabled?: boolean;
  /** Extra classes per part. `class`/`style` on the component go to the radio itself. */
  ui?: RadioGroupItemUiClasses;
}

export interface RadioItem {
  value: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  class?: string;
}

export interface RadioProps extends RadioGroupProps {
  /** Items rendered as `RadioGroupItem`s. Use the default slot instead for custom markup. */
  items?: RadioItem[];
  size?: RadioSize;
}
