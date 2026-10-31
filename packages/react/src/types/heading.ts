// Heading component types.
import type { FontSize, FontWeight, TextAlign } from "./common";
import type { TextColor } from "./tokens";

/** Heading levels: `1` renders an `h1`, `2` an `h2`, ... */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingCoreProps {
  /** Heading level; also the rendered element unless `as` says otherwise. Default `2`. */
  level?: HeadingLevel;
  /** Font size; defaults to the size of the `level`. */
  size?: FontSize;
  /** Font weight. Default `"semibold"`. */
  weight?: FontWeight;
  /** Text alignment; inherited when not set. */
  align?: TextAlign;
  /** Semantic color painted by `.mild-heading--<color>`. */
  color?: TextColor;
  /** Truncate to a single line with an ellipsis. */
  truncate?: boolean;
}
