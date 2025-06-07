// packages/core/src/components/Spinner/Spinner.types.ts
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "border" | "dots" | "pulse" | "bars";

export interface SpinnerCoreProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Visual variant */
  variant?: SpinnerVariant;
  /** Custom color */
  color?: string;
  /** Loading label for accessibility */
  label?: string;
  /** Animation speed */
  speed?: "slow" | "normal" | "fast";
  /** Custom className */
  className?: string;
  /** Thickness for border variant */
  thickness?: number;
}

export type SpinnerProps = SpinnerCoreProps;
