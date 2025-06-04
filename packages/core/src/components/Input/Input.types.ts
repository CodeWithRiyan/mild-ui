// packages/core/src/components/Input/Input.types.ts
/// Input component universal types
/// @fileoverview Framework-agnostic input component interfaces

import type { BaseComponentProps, ColorScheme, AriaProps, EventHandlers } from '../../types/common';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

export interface InputCoreProps extends BaseComponentProps, AriaProps, EventHandlers {
  /** Input type */
  type?: InputType;
  /** Input variant */
  variant?: InputVariant;
  /** Input size */
  size?: InputSize;
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Required field */
  required?: boolean;
  /** Readonly field */
  readonly?: boolean;
  /** Invalid state */
  invalid?: boolean;
  /** Error state */
  error?: boolean;
  /** Max length */
  maxLength?: number;
  /** Min length */
  minLength?: number;
  /** Auto complete */
  autoComplete?: string;
  /** Auto focus */
  autoFocus?: boolean;
}

export interface InputPlatformProps {
  /** Platform-specific change handler */
  onChange?: (value: string) => void;
  onChangeText?: (value: string) => void; // React Native
  onInput?: (value: string) => void;      // Vue
}

export type InputProps = InputCoreProps & InputPlatformProps;