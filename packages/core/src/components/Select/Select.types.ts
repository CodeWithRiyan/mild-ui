// packages/core/src/components/Select/Select.types.ts
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectCoreProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  options?: SelectOption[];
  className?: string;
}

export type SelectSize = "sm" | "md" | "lg";

export interface SelectStyleProps {
  size?: SelectSize;
  fullWidth?: boolean;
  error?: boolean;
}
