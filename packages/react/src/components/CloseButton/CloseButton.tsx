// packages/react/src/components/CloseButton/CloseButton.tsx
import * as React from "react";
import { cn } from "../../utils";
import { IconButton, type IconButtonProps } from "../IconButton";
import { XIcon } from "../icons";

export interface CloseButtonProps extends Omit<IconButtonProps, "icon" | "label"> {
  /** Accessible name. Default `"Close"`. */
  label?: string;
  /** Replaces the default X glyph. */
  icon?: React.ReactNode;
}

/** The "dismiss" button of dialogs, alerts and tags: a ghost `IconButton` with an X. */
export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ label = "Close", icon, variant = "ghost", className, ...rest }, ref) => (
    <IconButton
      ref={ref}
      label={label}
      icon={icon ?? <XIcon />}
      variant={variant}
      className={cn("mild-close-button", className)}
      {...rest}
    />
  ),
);
CloseButton.displayName = "CloseButton";
