// packages/react/src/components/Button/Button.tsx
import React, { forwardRef } from "react";
import {
  getButtonProps,
  getButtonState,
  getButtonA11yProps,
} from "../../../../core";
import { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      colorScheme = "primary",
      fullWidth = false,
      loading = false,
      disabled = false,
      children,
      onClick,
      leftIcon,
      rightIcon,
      className,
      type = "button",
      ...rest
    },
    ref,
  ) => {
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

    return (
      <button
        ref={ref}
        {...buttonProps}
        {...a11yProps}
        {...rest}
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
