// Text component types
import type { 
  FontSize, 
  FontWeight, 
  TextAlign, 
  TextTransform, 
  TextDecoration, 
  ColorValue 
} from "./common";

export interface TextCoreProps {
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  textTransform?: TextTransform;
  textDecoration?: TextDecoration;
  color?: ColorValue;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  truncate?: boolean;
  noOfLines?: number;
}