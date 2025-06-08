// packages/core/src/components/Label/Label.types.ts
export interface LabelCoreProps {
  error?: boolean;
  required?: boolean;
  className?: string;
  ui?: {
    label?: string;
    asterisk?: string;
  };
}
