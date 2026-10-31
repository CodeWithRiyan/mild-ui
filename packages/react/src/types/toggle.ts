// Toggle / ToggleGroup component types.
import type { Size } from "./common";

export type ToggleVariant = "ghost" | "outline";
export type ToggleSize = Exclude<Size, "xs" | "xl">;
export type ToggleGroupOrientation = "horizontal" | "vertical";

export interface ToggleCoreProps {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled. */
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
}

export interface ToggleGroupCoreProps {
  variant?: ToggleVariant;
  size?: ToggleSize;
  orientation?: ToggleGroupOrientation;
  /** Join the toggles into one bar. */
  attached?: boolean;
  /** Wrap from the last toggle to the first with the Arrow keys. Default `true`. */
  loop?: boolean;
  disabled?: boolean;
}

/** At most one toggle pressed; pressing it again clears the selection. */
export interface ToggleGroupSingleProps extends ToggleGroupCoreProps {
  type?: "single";
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

/** Any number of toggles pressed. */
export interface ToggleGroupMultipleProps extends ToggleGroupCoreProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}
