// packages/vue/src/utils/button.ts
import { cn } from "./cn";
import type { ButtonCoreProps } from "../types";

export interface ButtonUtilProps extends ButtonCoreProps {
  className?: string;
  fullWidth?: boolean;
  colorScheme?: string;
}

/**
 * The stylesheet paints buttons per *style* x *color* (`.mild-button--solid.mild-button--primary`).
 * The public `variant` prop mixes both notions, so it is mapped onto that pair here.
 */
const VARIANT_STYLE: Record<NonNullable<ButtonCoreProps["variant"]>, string> = {
  primary: "solid",
  secondary: "solid",
  destructive: "solid",
  outline: "outline",
  ghost: "ghost",
  link: "link",
};

/** Solid variants carry their own color; the others take `colorScheme` (default primary). */
const VARIANT_COLOR: Partial<Record<NonNullable<ButtonCoreProps["variant"]>, string>> = {
  primary: "primary",
  secondary: "secondary",
  destructive: "danger",
};

export function getButtonProps(props: ButtonUtilProps) {
  const {
    variant = "primary",
    size = "md",
    colorScheme,
    fullWidth = false,
    loading = false,
    disabled = false,
    className,
  } = props;

  const style = VARIANT_STYLE[variant] ?? "solid";
  const color = colorScheme ?? VARIANT_COLOR[variant] ?? "primary";

  const classes = cn(
    "mild-button",
    // Public variant name (kept for consumers styling on it)
    `mild-button--${variant}`,
    // Style + color pair the stylesheet actually keys on
    style !== variant && `mild-button--${style}`,
    color !== variant && `mild-button--${color}`,
    `mild-button--${size}`,
    fullWidth && "mild-button--full-width",
    loading && "mild-button--loading",
    disabled && "mild-button--disabled",
    className,
  );

  return {
    className: classes,
    // Loading is not `disabled`: the button keeps focus and is announced busy instead.
    disabled,
    "data-loading": loading ? "" : undefined,
    "data-disabled": disabled ? "" : undefined,
  };
}

export function getButtonState(props: { loading?: boolean; disabled?: boolean }) {
  const { loading = false, disabled = false } = props;

  return {
    canClick: !loading && !disabled,
    isLoading: loading,
    isDisabled: disabled,
  };
}

export function getButtonA11yProps<Type extends string = "button" | "submit" | "reset">(props: {
  loading?: boolean;
  disabled?: boolean;
  type?: Type;
}) {
  const { loading = false, disabled = false, type = "button" as Type } = props;

  return {
    type,
    // Only emitted when true, so idle buttons carry no noise.
    "aria-disabled": disabled || loading || undefined,
    "aria-busy": loading || undefined,
    tabindex: disabled ? -1 : undefined,
  };
}
