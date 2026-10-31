// packages/react/src/components/Toggle/Toggle.tsx
import * as React from "react";
import type { ToggleCoreProps } from "../../types";
import { cn } from "../../utils";

export interface ToggleProps
  extends ToggleCoreProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode;
}

/**
 * A two-state button (`aria-pressed`): bold on/off, mute on/off. Controlled through `pressed`
 * + `onPressedChange`, or uncontrolled with `defaultPressed`.
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed: pressedProp,
      defaultPressed = false,
      onPressedChange,
      variant = "ghost",
      size = "md",
      disabled = false,
      className,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const isControlled = pressedProp !== undefined;
    const [internal, setInternal] = React.useState(defaultPressed);
    const pressed = isControlled ? pressedProp : internal;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      const next = !pressed;
      if (!isControlled) setInternal(next);
      onPressedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        className={cn("mild-toggle", `mild-toggle--${variant}`, `mild-toggle--${size}`, className)}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
Toggle.displayName = "Toggle";
