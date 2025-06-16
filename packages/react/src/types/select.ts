// Select component types
import type { Size } from "./common";

export interface SelectCoreProps {
  size?: Size;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  colorScheme?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  fullWidth?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroupProps {
  label?: string;
  children: React.ReactNode;
}

export interface SelectStyleProps {
  className?: string;
  // Style props for select
}