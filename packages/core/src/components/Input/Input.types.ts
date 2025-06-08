// packages/core/src/components/Input/Input.types.ts
/// Input component universal types
/// @fileoverview Framework-agnostic input component interfaces

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled" | "flushed" | "unstyled";

export interface InputCoreProps {
  /** Input variant */
  variant?: InputVariant;
  /** Input size */
  size?: InputSize;
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
}
