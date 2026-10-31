// packages/react/src/components/Progress/Progress.tsx
import * as React from "react";
import type { ProgressCoreProps } from "../../types";
import { cn, getProgressA11yProps, progressPercent } from "../../utils";

export interface ProgressProps
  extends ProgressCoreProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {}

/**
 * Linear progress bar (`role="progressbar"` with `aria-valuenow/min/max`). Without a `value`,
 * or with `indeterminate`, the bar animates and announces itself as busy.
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      indeterminate: indeterminateProp,
      size = "md",
      colorScheme = "primary",
      striped = false,
      animated = false,
      label,
      valueText,
      showValue = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const indeterminate = indeterminateProp ?? value === undefined;
    const percent = indeterminate || value === undefined ? 0 : progressPercent(value, min, max);
    const a11y = getProgressA11yProps({ value, min, max, indeterminate, label, valueText });

    return (
      <div className="mild-progress-field">
        <div
          ref={ref}
          {...a11y}
          className={cn(
            "mild-progress",
            `mild-progress--${size}`,
            `mild-progress--${colorScheme}`,
            striped && "mild-progress--striped",
            animated && "mild-progress--animated",
            indeterminate && "mild-progress--indeterminate",
            className,
          )}
          style={
            {
              ...(indeterminate ? {} : { "--mild-progress-value": `${percent}%` }),
              ...style,
            } as React.CSSProperties
          }
          {...rest}
        >
          <div className="mild-progress__bar" />
        </div>
        {showValue && !indeterminate && (
          <span className="mild-progress__label" aria-hidden="true">
            {a11y["aria-valuetext"]}
          </span>
        )}
      </div>
    );
  },
);
Progress.displayName = "Progress";
