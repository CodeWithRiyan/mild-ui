// Box component types
import type { 
  SpacingValue, 
  ColorValue, 
  DisplayValue, 
  FlexDirection, 
  FlexWrap, 
  AlignItems, 
  JustifyContent,
  PositionValue,
  OverflowValue
} from "./common";

export interface BoxCoreProps {
  // Display
  display?: DisplayValue;
  
  // Flexbox props
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  gap?: SpacingValue;
  
  // Grid props
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: SpacingValue;
  
  // Spacing props
  padding?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  margin?: SpacingValue;
  marginX?: SpacingValue;
  marginY?: SpacingValue;
  marginTop?: SpacingValue;
  marginRight?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  
  // Sizing props
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  
  // Border and background
  borderRadius?: SpacingValue;
  borderWidth?: SpacingValue;
  borderColor?: ColorValue;
  backgroundColor?: ColorValue;
  color?: ColorValue;
  
  // Position props
  position?: PositionValue;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
  
  // Overflow props
  overflow?: OverflowValue;
  overflowX?: OverflowValue;
  overflowY?: OverflowValue;
}