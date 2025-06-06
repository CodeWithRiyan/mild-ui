// packages/core/src/components/Button/Button.core.ts
/// Zero-dependency button core logic
/// @fileoverview Pure TypeScript button utilities without external dependencies

import { ButtonCoreProps } from "./Button.types";
import {
  buttonVariants,
  buttonIconVariants,
  buttonSpinnerVariants,
} from "./Button.styles";
import { cn } from "../../utils/cn";

/**
 * Get button props with computed class names
 * Uses pure SASS-generated classes without external dependencies
 */
export function getButtonProps(
  props: ButtonCoreProps & { className?: string },
) {
  const {
    variant = "solid",
    size = "md",
    colorScheme = "primary",
    fullWidth = false,
    loading = false,
    disabled = false,
    className,
    ...restProps
  } = props;

  // Generate class name using pure SASS classes
  const computedClassName = buttonVariants({
    variant,
    size,
    colorScheme,
    fullWidth,
    loading,
    disabled,
    className,
  });

  return {
    className: computedClassName,
    variant,
    size,
    colorScheme,
    fullWidth,
    loading,
    disabled,
    // Data attributes for SASS targeting
    "data-variant": variant,
    "data-size": size,
    "data-color-scheme": colorScheme,
    "data-full-width": fullWidth || undefined,
    "data-loading": loading || undefined,
    "aria-disabled": disabled || undefined,
    ...restProps,
  };
}

/**
 * Get button icon props with computed class names
 */
export function getButtonIconProps(props: {
  position: "left" | "right";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const { position, size = "md", className } = props;

  return {
    className: cn(buttonIconVariants({ position, size }), className),
  };
}

/**
 * Get button spinner props with computed class names
 */
export function getButtonSpinnerProps(props: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const { size = "md", className } = props;

  return {
    className: cn(buttonSpinnerVariants({ size }), className),
  };
}

/**
 * Button state utilities
 */
export function getButtonState(props: ButtonCoreProps) {
  const { loading = false, disabled = false } = props;

  return {
    isInteractive: !loading && !disabled,
    isLoading: loading,
    isDisabled: disabled,
    canClick: !loading && !disabled,
  };
}

/**
 * Button accessibility helpers
 */
export function getButtonA11yProps(props: ButtonCoreProps) {
  const { loading = false, disabled = false, type = "button" } = props;

  return {
    type,
    "aria-disabled": disabled || undefined,
    "aria-busy": loading || undefined,
    tabIndex: disabled ? -1 : undefined,
  };
}
