// packages/core/src/components/Radio/Radio.types.ts
export interface RadioCoreProps extends RadioStyleProps {
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  defaultValue?: string;
  value?: string | null;
}

export type RadioSize = "sm" | "md" | "lg";

export interface RadioStyleProps {
  size?: RadioSize;
}
