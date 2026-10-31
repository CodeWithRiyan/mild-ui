// IconButton / CloseButton component types.
import type { Size } from "./common";
import type { ButtonVariant } from "./button";

export type IconButtonSize = Size;

export interface IconButtonCoreProps {
  /** Accessible name; the glyph carries no text, so this is required. */
  label: string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
  /** Fully rounded. */
  round?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
