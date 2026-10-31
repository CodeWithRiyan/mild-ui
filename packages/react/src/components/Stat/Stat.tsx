// packages/react/src/components/Stat/Stat.tsx
import * as React from "react";
import type { StatCoreProps } from "../../types";
import { cn } from "../../utils";
import { ArrowDownIcon, ArrowUpIcon } from "../icons";

export interface StatProps
  extends StatCoreProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Extra content under the value (a sparkline, an action). */
  children?: React.ReactNode;
}

/**
 * A key figure with its label and an optional trend. The trend arrow is decorative; its
 * direction is announced in words ("increased by 12%").
 */
export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    { label, value, helpText, trend, trendValue, size = "md", className, children, ...rest },
    ref,
  ) => (
    <div ref={ref} className={cn("mild-stat", `mild-stat--${size}`, className)} {...rest}>
      <span className="mild-stat__label">{label}</span>
      <span className="mild-stat__value">{value}</span>
      {(helpText !== undefined || trend !== undefined) && (
        <span className="mild-stat__help">
          {trend && (
            <span
              className={cn("mild-stat__trend", `mild-stat__trend--${trend}`)}
              data-trend={trend}
            >
              {trend === "increase" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              <span className="mild-stat__trend-text">
                <span className="mild-stat__sr-only">
                  {trend === "increase" ? "increased by " : "decreased by "}
                </span>
                {trendValue}
              </span>
            </span>
          )}
          {helpText}
        </span>
      )}
      {children}
    </div>
  ),
);
Stat.displayName = "Stat";

export type StatGroupProps = React.HTMLAttributes<HTMLDivElement>;

/** A row of stats sharing the width. */
export const StatGroup = React.forwardRef<HTMLDivElement, StatGroupProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cn("mild-stat-group", className)} {...rest} />
  ),
);
StatGroup.displayName = "StatGroup";
