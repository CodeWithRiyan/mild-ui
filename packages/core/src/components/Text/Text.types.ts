// packages/core/src/components/Text/Text.types.ts
/// Text component universal types
/// @fileoverview Framework-agnostic text component interfaces

import type {
  BaseComponentProps,
  ColorScheme,
  AriaProps,
} from "../../types/common";

export type TextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";
export type TextWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextDecoration = "none" | "underline" | "line-through";

export interface TextCoreProps extends BaseComponentProps, AriaProps {
  /** Text size */
  fontSize?: TextSize;
  /** Font weight */
  fontWeight?: TextWeight;
  /** Text alignment */
  textAlign?: TextAlign;
  /** Text transform */
  textTransform?: TextTransform;
  /** Text decoration */
  textDecoration?: TextDecoration;
  /** Text color */
  color?: string | ColorScheme;
  /** Line height */
  lineHeight?: string | number;
  /** Letter spacing */
  letterSpacing?: string | number;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Number of lines before truncation */
  noOfLines?: number;
  /** HTML element to render */
  as?:
    | "span"
    | "p"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "caption";
}

export interface TextContentProps {
  /** Text content */
  children?: any;
}

export type TextProps = TextCoreProps & TextContentProps;
