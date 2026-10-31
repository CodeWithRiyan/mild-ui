// SegmentedControl component types.
import type { Size } from "./common";

export type SegmentedControlSize = Exclude<Size, "xs" | "xl">;
export type SegmentedControlOrientation = "horizontal" | "vertical";

export interface SegmentedControlItem {
  value: string;
  /** Visible content; defaults to the value. */
  label?: string;
  disabled?: boolean;
}

export interface SegmentedControlCoreProps {
  items: SegmentedControlItem[];
  /** Controlled value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Submits the value through a hidden input. */
  name?: string;
  size?: SegmentedControlSize;
  orientation?: SegmentedControlOrientation;
  /** Stretch the segments to fill the line. */
  fullWidth?: boolean;
  disabled?: boolean;
}
