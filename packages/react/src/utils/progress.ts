// Progress utility functions shared by Progress and CircularProgress.

/** Clamps `value` into `[min, max]` and returns the completed fraction (0-1). */
export function progressFraction(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  const clamped = Math.min(max, Math.max(min, value));
  return (clamped - min) / (max - min);
}

/** Whole percentage for display ("42%"). */
export function progressPercent(value: number, min: number, max: number): number {
  return Math.round(progressFraction(value, min, max) * 100);
}

export interface ProgressA11yOptions {
  value?: number;
  min: number;
  max: number;
  indeterminate: boolean;
  label?: string;
  valueText?: string;
}

/** The `role="progressbar"` attributes; an indeterminate bar has no `aria-valuenow`. */
export function getProgressA11yProps({
  value,
  min,
  max,
  indeterminate,
  label,
  valueText,
}: ProgressA11yOptions) {
  const known = !indeterminate && value !== undefined;
  return {
    role: "progressbar" as const,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": known ? Math.min(max, Math.max(min, value)) : undefined,
    "aria-valuetext": known ? (valueText ?? `${progressPercent(value, min, max)}%`) : valueText,
    "aria-label": label,
    "aria-busy": indeterminate || undefined,
  };
}
