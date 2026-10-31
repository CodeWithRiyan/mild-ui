// List component types.
import type { SpaceToken } from "./tokens";

/** `list-style-type` values the stylesheet ships a rule for. */
export type ListMarker =
  | "disc"
  | "circle"
  | "square"
  | "decimal"
  | "decimal-leading-zero"
  | "lower-alpha"
  | "upper-alpha"
  | "lower-roman"
  | "upper-roman"
  | "none";

export interface ListCoreProps {
  /** Render an `ol` instead of a `ul` (marker defaults to `"decimal"`). */
  ordered?: boolean;
  /** Marker style; defaults to `"decimal"` when ordered, otherwise the browser's `disc`. */
  marker?: ListMarker;
  /** Drop the marker and the indentation. */
  unstyled?: boolean;
  /** Space between items (spacing token). */
  spacing?: SpaceToken;
}
