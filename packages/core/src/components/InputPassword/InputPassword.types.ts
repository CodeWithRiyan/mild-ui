// packages/core/src/components/InputPassword/InputPassword.types.ts
export interface InputPasswordCoreProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export type InputPasswordSize = "sm" | "md" | "lg";
export type InputPasswordVariant = "default" | "filled" | "outline" | "ghost";

export interface InputPasswordStyleProps {
  size?: InputPasswordSize;
  variant?: InputPasswordVariant;
  fullWidth?: boolean;
  error?: boolean;
  ui?: {
    container?: string;
    input?: string;
    buttonIcon?: string;
  };
}
