// packages/vue/src/types/feedback.ts
// Feedback component types: Alert, Spinner, Progress, CircularProgress, Skeleton.
import type { Size } from "./common";
import type { DimensionToken } from "./tokens";

export type AlertStatus = "info" | "success" | "warning" | "error";
export type AlertVariant = "subtle" | "solid" | "left-accent" | "top-accent";
export type AlertSize = Exclude<Size, "xs" | "xl">;

export interface AlertCoreProps {
  /** Semantic status; also picks the default icon. Default `"info"`. */
  status?: AlertStatus;
  /** Visual style. Default `"subtle"`. */
  variant?: AlertVariant;
  size?: AlertSize;
  /** Shows a close button; `dismiss` is emitted when it is pressed. */
  dismissible?: boolean;
}

export interface AlertProps extends AlertCoreProps {
  /** Bold first line. Use the `title` slot for rich content. */
  title?: string;
  /** Body text; the default slot is an alias. */
  description?: string;
  /** Drop the status glyph. */
  noIcon?: boolean;
  /** Accessible name of the close button. Default `"Dismiss"`. */
  dismissLabel?: string;
  /** `"alert"` for errors and warnings, `"status"` otherwise, unless given. */
  role?: string;
}

export type SpinnerSize = Size;
export type SpinnerVariant = "border" | "dots" | "pulse" | "bars";
export type SpinnerSpeed = "slow" | "normal" | "fast";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  speed?: SpinnerSpeed;
  /** Text for assistive technology (visually hidden). Default `"Loading..."`. */
  label?: string;
}

export type ProgressSize = "xs" | "sm" | "md" | "lg";
export type ProgressColorScheme = "primary" | "success" | "warning" | "danger" | "info";

export interface ProgressProps {
  /** Current value between `min` and `max`. Omit (or set `indeterminate`) for unknown progress. */
  value?: number;
  /** Default `0`. */
  min?: number;
  /** Default `100`. */
  max?: number;
  /** Unknown progress: the bar animates instead of filling. */
  indeterminate?: boolean;
  size?: ProgressSize;
  colorScheme?: ProgressColorScheme;
  striped?: boolean;
  /** Animate the stripes. */
  animated?: boolean;
  /** Accessible name. */
  label?: string;
  /** Human-readable value for assistive technology (`aria-valuetext`), e.g. "3 of 10 files". */
  valueText?: string;
  /** Show the percentage under the bar. */
  showValue?: boolean;
}

export type CircularProgressSize = "sm" | "md" | "lg" | "xl";

export interface CircularProgressProps {
  value?: number;
  min?: number;
  max?: number;
  indeterminate?: boolean;
  size?: CircularProgressSize;
  colorScheme?: ProgressColorScheme;
  /** Ring thickness as a fraction of the size (0-1). Default `0.1`. */
  thickness?: number;
  label?: string;
  valueText?: string;
  /** Show the percentage in the middle. */
  showValue?: boolean;
}

export type SkeletonVariant = "text" | "circle" | "rect";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: DimensionToken;
  height?: DimensionToken;
  /** Render the children instead of the placeholder. */
  loaded?: boolean;
}

export interface SkeletonTextProps extends Omit<SkeletonProps, "variant" | "height"> {
  /** Number of lines. Default `3`. */
  lines?: number;
}
