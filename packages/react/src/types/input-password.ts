// InputPassword component types
import type { Size } from "./common";

export interface InputPasswordCoreProps {
  size?: Size;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  colorScheme?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorBorderColor?: string;
  focusBorderColor?: string;
  fullWidth?: boolean;
  error?: boolean;
  ui?: {
    container?: string;
    input?: string;
    buttonIcon?: string;
  };
}