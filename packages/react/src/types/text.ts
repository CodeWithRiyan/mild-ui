// Text component types
import type { FontSize, FontWeight, TextAlign, TextTransform, TextDecoration } from "./common";
import type { TextColor } from "./tokens";

export interface TextCoreProps {
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  textTransform?: TextTransform;
  textDecoration?: TextDecoration;
  /** Semantic color painted by `.mild-text--<color>`. */
  color?: TextColor;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  truncate?: boolean;
  noOfLines?: number;
}
