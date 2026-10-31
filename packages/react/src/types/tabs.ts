// Tabs component types.
import type { Size } from "./common";

export type TabsVariant = "default" | "pills" | "underline";
export type TabsSize = Exclude<Size, "xs" | "xl">;
export type TabsOrientation = "horizontal" | "vertical";
export type TabsActivation = "automatic" | "manual";

export interface TabsCoreProps {
  /** Controlled selected tab. */
  value?: string;
  /** Initial tab when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  /** `"automatic"` selects on focus (default), `"manual"` on Enter / Space. */
  activation?: TabsActivation;
}
