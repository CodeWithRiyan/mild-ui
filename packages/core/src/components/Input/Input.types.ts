// packages/core/src/components/Input/Input.types.ts
export interface InputCoreProps {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "outline" | "ghost";

export interface InputStyleProps {
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  error?: boolean;
}
