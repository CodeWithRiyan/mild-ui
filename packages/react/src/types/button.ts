// Button types for React package
import type { Size } from "./common";

export type ButtonVariant = 
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";

export type ButtonSize = Size | "icon";

export interface ButtonCoreProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
}