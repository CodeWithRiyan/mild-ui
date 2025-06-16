// Common types for React package
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type ColorScheme = "primary" | "secondary" | "success" | "warning" | "error" | "info";
export type Variant = "solid" | "outline" | "ghost" | "link";
export type ColorMode = "light" | "dark" | "system";

// Theme configuration
export interface ThemeConfig {
  colorMode?: ColorMode;
  colors?: Record<string, any>;
  fonts?: Record<string, string>;
  fontSizes?: Record<string, string>;
  fontWeights?: Record<string, string | number>;
  lineHeights?: Record<string, string | number>;
  letterSpacings?: Record<string, string>;
  space?: Record<string, string>;
  sizes?: Record<string, string>;
  radii?: Record<string, string>;
  shadows?: Record<string, string>;
  zIndices?: Record<string, string | number>;
  breakpoints?: Record<string, string>;
}

// Spacing values
export type SpacingValue = 
  | string 
  | number 
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | "32" | "40" | "48" | "56" | "64";

// Color values
export type ColorValue = 
  | string 
  | "transparent" 
  | "current" 
  | "inherit"
  | "primary" | "secondary" | "success" | "warning" | "error" | "info"
  | "gray" | "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

// CSS Display values
export type DisplayValue = 
  | "block" | "inline-block" | "inline" | "flex" | "inline-flex" 
  | "grid" | "inline-grid" | "none" | "contents";

// Flexbox values
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type AlignItems = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
export type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";

// Position values
export type PositionValue = "static" | "relative" | "absolute" | "fixed" | "sticky";

// Overflow values
export type OverflowValue = "visible" | "hidden" | "scroll" | "auto";

// Text values
export type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
export type FontWeight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextDecoration = "none" | "underline" | "line-through" | "overline";