// packages/core/src/components/InputPassword/InputPassword.types.ts
export interface InputPasswordCoreProps {
  /** Input variant */
  variant?: InputPasswordVariant;
  /** Input size */
  size?: InputPasswordSize;
  /** Readonly field */
  readonly?: boolean;
  /** Invalid state */
  invalid?: boolean;
  /** Error state */
  error?: boolean;
  /** Auto focus */
  autoFocus?: boolean;
  /** Full width size*/
  fullWidth?: boolean;
  ui?: {
    container?: string;
    input?: string;
    buttonIcon?: string;
  };
}

export type InputPasswordSize = "sm" | "md" | "lg";
export type InputPasswordVariant =
  | "outline"
  | "filled"
  | "flushed"
  | "unstyled";
