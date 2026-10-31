// packages/react/src/components/Button/Button.tsx
import React, { forwardRef } from "react";
import { getButtonProps, getButtonState, getButtonA11yProps } from "../../utils/button";
import { useButtonGroup } from "../ButtonGroup/ButtonGroup";
import { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant: variantProp,
      size: sizeProp,
      colorScheme,
      fullWidth = false,
      loading = false,
      disabled: disabledProp,
      children,
      onClick,
      leftIcon,
      rightIcon,
      className,
      type = "button" as const,
      ...rest
    },
    ref,
  ) => {
    // An enclosing <ButtonGroup> supplies defaults; the button's own props still win.
    const group = useButtonGroup();
    const variant = variantProp ?? group.variant ?? "primary";
    const size = sizeProp ?? group.size ?? "md";
    const disabled = disabledProp ?? group.disabled ?? false;

    // Get computed props from core
    const buttonProps = getButtonProps({
      variant,
      size,
      colorScheme,
      fullWidth,
      loading,
      disabled,
      className,
    });

    // Get button state
    const { canClick, isLoading } = getButtonState({ loading, disabled });

    // Get accessibility props
    const a11yProps = getButtonA11yProps({ loading, disabled, type });

    // Handle click events
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!canClick) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // Extract type from rest if it exists
    const restWithoutType = rest;

    return (
      <button
        ref={ref}
        {...buttonProps}
        {...a11yProps}
        {...restWithoutType}
        type={type}
        onClick={handleClick}
      >
        {leftIcon && (
          <span className="mild-button__left-icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {isLoading ? (
          <span className="mild-button__spinner" aria-hidden="true" />
        ) : (
          <span className="mild-button__content">{children}</span>
        )}

        {rightIcon && (
          <span className="mild-button__right-icon" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
