// packages/react/src/components/Spinner/Spinner.tsx
import * as React from "react";
import type { SpinnerCoreProps } from "../../types";
import { cn } from "../../utils";

export interface SpinnerProps extends SpinnerCoreProps, React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Indeterminate loading indicator. Announced through a visually hidden `label`
 * (`role="status"`), so the animation itself stays decorative.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    { size = "md", variant = "border", speed = "normal", label = "Loading...", className, ...rest },
    ref,
  ) => (
    <span
      ref={ref}
      role="status"
      className={cn(
        "mild-spinner",
        `mild-spinner--${variant}`,
        `mild-spinner--${size}`,
        `mild-spinner--${speed}`,
        className,
      )}
      {...rest}
    >
      <span className="mild-spinner__label">{label}</span>
    </span>
  ),
);
Spinner.displayName = "Spinner";
