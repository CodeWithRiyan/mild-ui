// packages/core/src/components/Checkbox/Checkbox.types.ts
export interface CheckboxCoreProps extends CheckboxStyleProps {
  checked?: "indeterminate" | boolean;
  defaultChecked?: "indeterminate" | boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string | number | readonly string[];
}

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxStyleProps {
  size?: CheckboxSize;
}
