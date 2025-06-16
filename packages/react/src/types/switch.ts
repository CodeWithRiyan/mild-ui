// Switch component types
import type { Size } from "./common";

export interface SwitchCoreProps {
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
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  ui?: {
    container?: string;
    switch?: string;
    track?: {
      bg?: string;
      _checked?: {
        bg?: string;
      };
    };
    thumb?: {
      bg?: string;
    };
    label?: string;
  };
}