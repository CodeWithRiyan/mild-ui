// Checkbox component types
export interface CheckboxCoreProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
}

export interface CheckboxStyleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}