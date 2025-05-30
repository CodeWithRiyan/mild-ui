// packages/core/src/components/Label/Label.types.ts
export interface LabelCoreProps {
  required?: boolean;
  error?: boolean;
  className?: string;
  ui?: {
    label?: string;
    asterisk?: string;
  }
}

export interface LabelStyleProps {
  error?: boolean;
}
