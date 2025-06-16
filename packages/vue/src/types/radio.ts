// Radio component types
export interface RadioCoreProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
}

export interface RadioStyleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}