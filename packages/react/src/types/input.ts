// Input component types
import type { Size } from "./common";

export interface InputCoreProps {
  size?: Size;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  colorScheme?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorBorderColor?: string;
  focusBorderColor?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  form?: string;
  list?: string;
  max?: string | number;
  maxLength?: number;
  min?: string | number;
  minLength?: number;
  multiple?: boolean;
  pattern?: string;
  step?: string | number;
  fullWidth?: boolean;
  error?: boolean;
}