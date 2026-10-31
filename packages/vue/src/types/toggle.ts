// packages/vue/src/types/toggle.ts
// Toggle / ToggleGroup component types.
import type { Size } from "./common";

export type ToggleVariant = "ghost" | "outline";
export type ToggleSize = Exclude<Size, "xs" | "xl">;
export type ToggleGroupOrientation = "horizontal" | "vertical";
export type ToggleGroupType = "single" | "multiple";

export interface ToggleProps {
  /** `v-model:pressed`: controlled pressed state. */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled. */
  defaultPressed?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  /** `"single"` (default): at most one pressed, pressing it again clears. `"multiple"`: any number. */
  type?: ToggleGroupType;
  /** `v-model`: `string | null` for single, `string[]` for multiple. */
  modelValue?: string | string[] | null;
  /** Initial value when uncontrolled. */
  defaultValue?: string | string[] | null;
  variant?: ToggleVariant;
  size?: ToggleSize;
  orientation?: ToggleGroupOrientation;
  /** Join the toggles into one bar. */
  attached?: boolean;
  /** Wrap from the last toggle to the first with the Arrow keys. Default `true`. */
  loop?: boolean;
  disabled?: boolean;
}

export interface ToggleGroupItemProps {
  /** The value this item adds to the group's value while pressed. */
  value: string;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
}
