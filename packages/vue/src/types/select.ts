// Select component types
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectCoreProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: SelectOption[];
}

export interface SelectStyleProps {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  error?: boolean;
  className?: string;
}