// packages/vue/src/types/label.ts
export interface LabelUiClasses {
  asterisk?: string;
}

export interface LabelProps {
  /** Id of the control the label names (the `for` attribute). */
  for?: string;
  /** Alias of `for`, for parity with React. */
  htmlFor?: string;
  required?: boolean;
  error?: boolean;
  ui?: LabelUiClasses;
}
