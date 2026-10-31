// packages/vue/src/types/tooltip.ts
export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip text. Use the `label` slot for rich content. */
  label?: string;
  placement?: TooltipPlacement;
  /** Milliseconds of hover before showing. Default `300`. */
  openDelay?: number;
  /** Milliseconds after leaving before hiding. Default `100`. */
  closeDelay?: number;
  /** Render the children without a tooltip. */
  disabled?: boolean;
  /** Allow the text to wrap. */
  multiline?: boolean;
  /** Id of the tooltip element. */
  id?: string;
}
