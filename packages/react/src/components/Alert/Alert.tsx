// packages/react/src/components/Alert/Alert.tsx
import * as React from "react";
import type { AlertCoreProps } from "../../types";
import { cn } from "../../utils";
import { StatusIcon, XIcon } from "../icons";

export interface AlertProps
  extends AlertCoreProps, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Bold first line. */
  title?: React.ReactNode;
  /** Body text; `children` is an alias. */
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Replaces the status glyph; `null` removes it. */
  icon?: React.ReactNode;
  /** Accessible name of the close button. Default `"Dismiss"`. */
  dismissLabel?: string;
}

/**
 * Inline status message. Rendered with `role="alert"` for errors and warnings (announced at
 * once) and `role="status"` otherwise (announced politely), unless a `role` is given.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status = "info",
      variant = "subtle",
      size = "md",
      dismissible = false,
      onDismiss,
      title,
      description,
      children,
      icon,
      dismissLabel = "Dismiss",
      role,
      className,
      ...rest
    },
    ref,
  ) => {
    const body = description ?? children;
    return (
      <div
        ref={ref}
        role={role ?? (status === "error" || status === "warning" ? "alert" : "status")}
        data-status={status}
        className={cn(
          "mild-alert",
          `mild-alert--${variant}`,
          `mild-alert--${status}`,
          size !== "md" && `mild-alert--${size}`,
          dismissible && "mild-alert--dismissible",
          className,
        )}
        {...rest}
      >
        {icon !== null && (
          <span className="mild-alert__icon" aria-hidden="true">
            {icon ?? <StatusIcon status={status} />}
          </span>
        )}
        <div className="mild-alert__content">
          {title !== undefined && title !== null && (
            <div className="mild-alert__title">{title}</div>
          )}
          {body !== undefined && body !== null && (
            <div className="mild-alert__description">{body}</div>
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            className="mild-alert__dismiss"
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            <XIcon />
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";
