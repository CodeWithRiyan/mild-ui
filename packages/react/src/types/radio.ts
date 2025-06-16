// Radio component types
import type { Size } from "./common";

export interface RadioCoreProps {
  size?: Size;
  colorScheme?: string;
  isChecked?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  isDisabled?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

export interface RadioGroupProps {
  size?: Size;
  colorScheme?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export interface RadioStyleProps {
  size?: Size;
  className?: string;
}

export type RadioSize = Size;