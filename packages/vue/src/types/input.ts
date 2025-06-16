// Input component types
export interface InputCoreProps {
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  required?: boolean;
  readOnly?: boolean;
}

export interface InputStyleProps {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  error?: boolean;
  className?: string;
}