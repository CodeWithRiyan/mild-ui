// packages/core/src/components/FormControl/FormControl.types.ts
export interface FormControlCoreProps {
  /** Unique form control ID */
  id?: string;
  /** Control name for form submission */
  name?: string;
  /** Whether the field is required */
  isRequired?: boolean;
  /** Whether the field is disabled */
  isDisabled?: boolean;
  /** Whether the field is read-only */
  isReadOnly?: boolean;
  /** Whether the field has an error */
  isInvalid?: boolean;
  /** Custom error message */
  errorMessage?: string;
  /** Help text */
  helperText?: string;
  /** Label text */
  label?: string;
  /** Custom className */
  className?: string;
}

export interface ValidationIntegration {
  /** Validation errors from validation libraries */
  errors?: Record<string, any>;
  /** Touched fields tracking */
  touched?: Record<string, boolean>;
  /** Current values */
  values?: Record<string, any>;
  /** Validation library integration */
  validation?: {
    schema?: any; // Yup/Zod schema
    validate?: (value: any) => Promise<any> | any;
    onValidationChange?: (field: string, error?: string) => void;
  };
}

export type FormControlProps = FormControlCoreProps & ValidationIntegration;
