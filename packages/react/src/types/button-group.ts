// ButtonGroup component types.
import type { ButtonSize, ButtonVariant } from "./button";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupCoreProps {
  /** Join the buttons into one bar (no gap, inner corners squared). */
  attached?: boolean;
  /** Lay the buttons out in a column. Default `"horizontal"`. */
  orientation?: ButtonGroupOrientation;
  /** Stretch the group and share the width between the buttons. */
  fullWidth?: boolean;
  /** Default `size` for the buttons inside. */
  size?: ButtonSize;
  /** Default `variant` for the buttons inside. */
  variant?: ButtonVariant;
  /** Disables every button inside. */
  disabled?: boolean;
}
