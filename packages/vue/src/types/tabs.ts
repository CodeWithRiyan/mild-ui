// packages/vue/src/types/tabs.ts
import type { Size } from "./common";

export type TabsVariant = "default" | "pills" | "underline";
export type TabsSize = Exclude<Size, "xs" | "xl">;
export type TabsOrientation = "horizontal" | "vertical";
export type TabsActivation = "automatic" | "manual";

export interface TabsProps {
  /** `v-model`: the selected tab. */
  modelValue?: string;
  /** Initial tab when uncontrolled. */
  defaultValue?: string;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  /** `"automatic"` selects on focus (default), `"manual"` on Enter / Space. */
  activation?: TabsActivation;
}

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
}

export interface TabsContentProps {
  value: string;
  /** Keep the panel mounted (hidden) while another tab is selected. */
  forceMount?: boolean;
}
