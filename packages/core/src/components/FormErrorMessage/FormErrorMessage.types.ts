// packages/core/src/components/FormErrorMessage/FormErrorMessage.types.ts
export interface FormErrorMessageCoreProps {
  /** Error message text */
  message?: string;
  /** Error message key for i18n */
  messageKey?: string;
  /** Variables for message interpolation */
  values?: Record<string, any>;
  /** Whether to show the error */
  isVisible?: boolean;
  /** Custom className */
  className?: string;
  /** Custom icon */
  icon?: any; // Platform-specific icon type
  /** Animation preference */
  animate?: boolean;
}

export interface I18nSupport {
  /** Translation function */
  t?: (key: string, values?: Record<string, any>) => string;
  /** Fallback language */
  fallbackLang?: string;
  /** Current language */
  currentLang?: string;
}

export type FormErrorMessageProps = FormErrorMessageCoreProps & I18nSupport;
