// packages/vue/src/types/form.ts
export interface FormItemProps {
  /** Field name, forwarded to the control. */
  name?: string;
  /** Error message. Renders in <FormMessage> and marks the control invalid. */
  error?: string;
  /** Marks the control invalid even without an error message. */
  invalid?: boolean;
  /** Marks the control required and shows the label marker. */
  required?: boolean;
}

/** Extra classes per part of a `FormField`. */
export interface FormFieldUiClasses {
  label?: string;
  control?: string;
  description?: string;
  message?: string;
}

export interface FormFieldProps extends FormItemProps {
  label?: string;
  description?: string;
  /** Keep the control invalid but do not render the message. */
  hideError?: boolean;
  /** Extra classes per part. `class`/`style` on the component go to the field wrapper. */
  ui?: FormFieldUiClasses;
}
