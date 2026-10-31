// packages/react/src/components/ButtonGroup/ButtonGroup.tsx
import * as React from "react";
import type { ButtonGroupCoreProps } from "../../types";
import { cn } from "../../utils";

/** Defaults a group hands to the buttons inside it. */
export interface ButtonGroupContextValue {
  size?: ButtonGroupCoreProps["size"];
  variant?: ButtonGroupCoreProps["variant"];
  disabled?: boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({});

/** The enclosing `ButtonGroup`'s defaults (`{}` outside a group). */
export function useButtonGroup(): ButtonGroupContextValue {
  return React.useContext(ButtonGroupContext);
}

export interface ButtonGroupProps
  extends ButtonGroupCoreProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Lays buttons out in a row (or column) and hands them a shared `size`, `variant` and
 * `disabled`. `attached` joins them into one bar. Rendered with `role="group"`; give it an
 * `aria-label` when the group's purpose is not obvious from context.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      attached = false,
      orientation = "horizontal",
      fullWidth = false,
      size,
      variant,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const context = React.useMemo(() => ({ size, variant, disabled }), [size, variant, disabled]);
    const classes = cn(
      "mild-button-group",
      attached && "mild-button-group--attached",
      orientation === "vertical" && "mild-button-group--vertical",
      fullWidth && "mild-button-group--full-width",
      className,
    );

    return (
      <ButtonGroupContext.Provider value={context}>
        <div
          ref={ref}
          role="group"
          className={classes}
          data-orientation={orientation}
          aria-disabled={disabled || undefined}
          {...rest}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";
