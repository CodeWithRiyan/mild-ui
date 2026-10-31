// packages/react/src/components/CircularProgress/CircularProgress.tsx
import * as React from "react";
import type { CircularProgressCoreProps } from "../../types";
import { cn, getProgressA11yProps, progressFraction } from "../../utils";

export interface CircularProgressProps
  extends CircularProgressCoreProps, React.HTMLAttributes<HTMLDivElement> {
  /** Content shown in the middle of the ring (instead of the percentage). */
  children?: React.ReactNode;
}

/** The SVG is drawn in a 100-unit box; the radius leaves room for the stroke. */
const VIEWBOX = 100;

/**
 * Ring-shaped progress indicator (`role="progressbar"`). Shows the percentage (or `children`)
 * in the middle; `indeterminate` spins the arc.
 */
export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      indeterminate: indeterminateProp,
      size = "md",
      colorScheme = "primary",
      thickness = 0.1,
      label,
      valueText,
      showValue = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const indeterminate = indeterminateProp ?? value === undefined;
    const fraction = indeterminate || value === undefined ? 0 : progressFraction(value, min, max);
    const a11y = getProgressA11yProps({ value, min, max, indeterminate, label, valueText });
    const strokeWidth = Math.min(0.5, Math.max(0.02, thickness)) * VIEWBOX;
    const radius = (VIEWBOX - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = VIEWBOX / 2;

    return (
      <div
        ref={ref}
        {...a11y}
        className={cn(
          "mild-circular-progress",
          `mild-circular-progress--${size}`,
          `mild-circular-progress--${colorScheme}`,
          indeterminate && "mild-circular-progress--indeterminate",
          className,
        )}
        {...rest}
      >
        <svg
          className="mild-circular-progress__svg"
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className="mild-circular-progress__track"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="mild-circular-progress__bar"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={indeterminate ? undefined : circumference}
            strokeDashoffset={indeterminate ? undefined : circumference * (1 - fraction)}
          />
        </svg>
        {(children !== undefined || (showValue && !indeterminate)) && (
          <span className="mild-circular-progress__label" aria-hidden="true">
            {children ?? a11y["aria-valuetext"]}
          </span>
        )}
      </div>
    );
  },
);
CircularProgress.displayName = "CircularProgress";
