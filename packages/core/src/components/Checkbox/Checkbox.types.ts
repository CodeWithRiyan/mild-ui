// packages/core/src/components/Checkbox/Checkbox.types.ts
export interface CheckboxCoreProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  indeterminate?: boolean;
  className?: string;
}

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxStyleProps {
  size?: CheckboxSize;
}
