// packages/core/src/components/Box/Box.types.ts
/// Box component universal types (layout primitive)
/// @fileoverview Framework-agnostic box/container component interfaces

import type { BaseComponentProps, AriaProps } from "../../types/common";

export interface BoxCoreProps extends BaseComponentProps, AriaProps {
  /** Display type */
  display?:
    | "block"
    | "inline"
    | "inline-block"
    | "flex"
    | "inline-flex"
    | "grid"
    | "inline-grid"
    | "none";

  // Flexbox properties
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: string | number;

  // Grid properties
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: string | number;

  // Spacing
  padding?: string | number;
  paddingX?: string | number;
  paddingY?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  margin?: string | number;
  marginX?: string | number;
  marginY?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;

  // Sizing
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;

  // Border and background
  borderRadius?: string | number;
  borderWidth?: string | number;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;

  // Position
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;

  // Overflow
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";
}

export interface BoxContentProps {
  /** Box content */
  children?: any;
}

export type BoxProps = BoxCoreProps;
