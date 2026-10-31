// Tooltip component types.

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipCoreProps {
  /** Tooltip text. */
  label: React.ReactNode;
  placement?: TooltipPlacement;
  /** Milliseconds of hover before showing. Default `300`. */
  openDelay?: number;
  /** Milliseconds after leaving before hiding. Default `100`. */
  closeDelay?: number;
  /** Render the children without a tooltip. */
  disabled?: boolean;
  /** Allow the text to wrap. */
  multiline?: boolean;
}
