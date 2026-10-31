// Box component types. Every style prop takes a design-token key (see ./tokens.ts),
// never a raw CSS value, so layouts stay on the scale and follow the theme.
import type { SpaceToken, DimensionToken, RadiusToken, ColorToken, ZIndexToken } from "./tokens";
import type {
  DisplayValue,
  FlexDirection,
  FlexWrap,
  AlignItems,
  JustifyContent,
  PositionValue,
  OverflowValue,
} from "./common";

export interface BoxCoreProps {
  // Display
  display?: DisplayValue;

  // Flexbox props
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  gap?: SpaceToken;

  // Grid props
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: SpaceToken;

  // Spacing props
  padding?: SpaceToken;
  paddingX?: SpaceToken;
  paddingY?: SpaceToken;
  paddingTop?: SpaceToken;
  paddingRight?: SpaceToken;
  paddingBottom?: SpaceToken;
  paddingLeft?: SpaceToken;
  margin?: SpaceToken;
  marginX?: SpaceToken;
  marginY?: SpaceToken;
  marginTop?: SpaceToken;
  marginRight?: SpaceToken;
  marginBottom?: SpaceToken;
  marginLeft?: SpaceToken;

  // Sizing props
  width?: DimensionToken;
  height?: DimensionToken;
  minWidth?: DimensionToken;
  minHeight?: DimensionToken;
  maxWidth?: DimensionToken;
  maxHeight?: DimensionToken;

  // Border and background
  borderRadius?: RadiusToken;
  borderWidth?: SpaceToken;
  borderColor?: ColorToken;
  backgroundColor?: ColorToken;
  color?: ColorToken;

  // Position props
  position?: PositionValue;
  top?: SpaceToken;
  right?: SpaceToken;
  bottom?: SpaceToken;
  left?: SpaceToken;
  zIndex?: ZIndexToken;

  // Overflow props
  overflow?: OverflowValue;
  overflowX?: OverflowValue;
  overflowY?: OverflowValue;
}
