// packages/react/src/components/IconButton/IconButton.tsx
import * as React from "react";
import type { IconButtonCoreProps } from "../../types";
import { cn } from "../../utils";
import { Button, type ButtonProps } from "../Button";
import { useButtonGroup } from "../ButtonGroup/ButtonGroup";

export interface IconButtonProps
  extends
    IconButtonCoreProps,
    Omit<
      ButtonProps,
      "children" | "leftIcon" | "rightIcon" | "size" | "variant" | "disabled" | "loading"
    > {
  /** The glyph. */
  icon: React.ReactNode;
}

/**
 * A square button that shows one glyph. `label` is its accessible name (there is no visible
 * text), applied as `aria-label`; the glyph itself is hidden from assistive technology.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, icon, size: sizeProp, round = false, className, ...rest }, ref) => {
    const group = useButtonGroup();
    const size = sizeProp ?? (group.size !== "icon" ? group.size : undefined) ?? "md";

    return (
      <Button
        ref={ref}
        size={size}
        aria-label={label}
        className={cn(
          "mild-icon-button",
          `mild-icon-button--${size}`,
          round && "mild-icon-button--round",
          className,
        )}
        {...rest}
      >
        <span aria-hidden="true" className="mild-icon-button__icon">
          {icon}
        </span>
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";
