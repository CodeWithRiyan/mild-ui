// packages/vue/src/types/segmented-control.ts
import type { Size } from "./common";

export type SegmentedControlSize = Exclude<Size, "xs" | "xl">;
export type SegmentedControlOrientation = "horizontal" | "vertical";

export interface SegmentedControlItem {
  value: string;
  /** Visible content; defaults to the value. */
  label?: string;
  disabled?: boolean;
}

/** Extra classes for the inner parts. */
export interface SegmentedControlUiClasses {
  item?: string;
}

export interface SegmentedControlProps {
  items: SegmentedControlItem[];
  /** `v-model`: the selected value. Makes the control controlled. */
  modelValue?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  /** Submits the value through a hidden input. */
  name?: string;
  size?: SegmentedControlSize;
  orientation?: SegmentedControlOrientation;
  /** Stretch the segments to fill the line. */
  fullWidth?: boolean;
  disabled?: boolean;
  ui?: SegmentedControlUiClasses;
}
