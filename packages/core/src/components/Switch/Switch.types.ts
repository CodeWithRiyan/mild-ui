// packages/core/src/components/Switch/Switch.types.ts
export interface SwitchCoreProps extends SwitchStyleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  indeterminate?: boolean;
  className?: string;
  ui?: {
    container?: string;
    switch?: string;
    thumb?: string;
    label?: string;
  };
}

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchStyleProps {
  size?: SwitchSize;
}
