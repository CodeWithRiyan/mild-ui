// packages/vue/src/types/icon-button.ts
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

export interface IconButtonProps extends IconButtonCoreProps {
  colorScheme?: string;
  type?: "button" | "submit" | "reset";
}

export interface CloseButtonProps extends Omit<IconButtonProps, "label"> {
  /** Accessible name. Default `"Close"`. */
  label?: string;
}
