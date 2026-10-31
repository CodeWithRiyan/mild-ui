// packages/react/src/components/Tag/Tag.tsx
import * as React from "react";
import type { TagCoreProps } from "../../types";
import { cn } from "../../utils";
import { XIcon } from "../icons";

const TagContext = React.createContext<{ disabled: boolean }>({ disabled: false });

export interface TagProps extends TagCoreProps, React.HTMLAttributes<HTMLSpanElement> {
  /** Leading glyph. */
  icon?: React.ReactNode;
  /**
   * Shows a close button; called when it is pressed. Compose `TagCloseButton` yourself for
   * more control.
   */
  onClose?: () => void;
  /** Accessible name of the close button. Default `"Remove"`. */
  closeLabel?: string;
  children?: React.ReactNode;
}

/**
 * A label that can be removed (a filter chip, a selected option). The close button is a real
 * button in the tab order, named "Remove" (or `closeLabel`) plus the tag's text.
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = "subtle",
      colorScheme = "gray",
      size = "md",
      pill = false,
      disabled = false,
      icon,
      onClose,
      closeLabel = "Remove",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const context = React.useMemo(() => ({ disabled }), [disabled]);
    return (
      <TagContext.Provider value={context}>
        <span
          ref={ref}
          className={cn(
            "mild-tag",
            `mild-tag--${variant}`,
            `mild-tag--${colorScheme}`,
            `mild-tag--${size}`,
            pill && "mild-tag--pill",
            disabled && "mild-tag--disabled",
            className,
          )}
          data-disabled={disabled ? "" : undefined}
          {...rest}
        >
          {icon !== undefined && icon !== null && (
            <span className="mild-tag__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="mild-tag__label">{children}</span>
          {onClose && (
            <TagCloseButton
              onClick={onClose}
              aria-label={typeof children === "string" ? `${closeLabel} ${children}` : closeLabel}
            />
          )}
        </span>
      </TagContext.Provider>
    );
  },
);
Tag.displayName = "Tag";

export interface TagCloseButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  /** Replaces the X glyph. */
  icon?: React.ReactNode;
}

/** The tag's remove button. Disabled along with the tag. */
export const TagCloseButton = React.forwardRef<HTMLButtonElement, TagCloseButtonProps>(
  ({ icon, className, disabled, "aria-label": ariaLabel = "Remove", ...rest }, ref) => {
    const tag = React.useContext(TagContext);
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        disabled={disabled ?? tag.disabled}
        className={cn("mild-tag__close", className)}
        {...rest}
      >
        {icon ?? <XIcon />}
      </button>
    );
  },
);
TagCloseButton.displayName = "TagCloseButton";
