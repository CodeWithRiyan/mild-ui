// packages/vue/src/types/divider.ts
// Divider component types: a horizontal or vertical separator.
import type { ColorToken } from "./tokens";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerSize = "sm" | "md" | "lg";
export type DividerLabelPosition = "start" | "center" | "end";

export interface DividerCoreProps {
  /** Default `"horizontal"`. */
  orientation?: DividerOrientation;
  /** Line style. Default `"solid"`. */
  variant?: DividerVariant;
  /** Line thickness (1x / 2x / 4x `--mild-border-width`). Default `"sm"`. */
  size?: DividerSize;
  /** Line color (palette token); defaults to the theme border color. */
  color?: ColorToken;
  /** Where the `label` sits along the line. Default `"center"`. */
  labelPosition?: DividerLabelPosition;
  /**
   * Purely visual separator: rendered with `role="none"` and hidden from assistive
   * technology instead of `role="separator"`.
   */
  decorative?: boolean;
}

export interface DividerProps extends DividerCoreProps {
  /** Element to render. Defaults to `div`. */
  as?: string;
  /** Text shown in the middle of the line. Use the `label` slot for rich content. */
  label?: string;
}
