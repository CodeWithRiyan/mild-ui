import { cn } from "./cn";
import type { ButtonVariant, ButtonSize } from "../types/button";

interface ButtonPropsConfig {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

export function getButtonProps(config: ButtonPropsConfig) {
  const { variant = "primary", size = "md", disabled = false, className = "" } = config;

  const baseClasses = [
    "mild-inline-flex",
    "mild-items-center",
    "mild-justify-center",
    "mild-font-medium",
    "mild-transition-colors",
    "mild-border",
    "mild-cursor-pointer",
    "focus:mild-outline-none",
    "focus:mild-ring-2",
    "focus:mild-ring-offset-2",
    "disabled:mild-opacity-50",
    "disabled:mild-cursor-not-allowed",
  ];

  // Variant classes
  const variantClasses = {
    primary: [
      "mild-bg-primary-500",
      "mild-text-white",
      "mild-border-primary-500",
      "hover:mild-bg-primary-600",
      "focus:mild-ring-primary-500",
    ],
    secondary: [
      "mild-bg-gray-100",
      "mild-text-gray-900",
      "mild-border-gray-200",
      "hover:mild-bg-gray-200",
      "focus:mild-ring-gray-500",
    ],
    outline: [
      "mild-bg-transparent",
      "mild-text-primary-500",
      "mild-border-primary-500",
      "hover:mild-bg-primary-50",
      "focus:mild-ring-primary-500",
    ],
    ghost: [
      "mild-bg-transparent",
      "mild-text-gray-700",
      "mild-border-transparent",
      "hover:mild-bg-gray-100",
      "focus:mild-ring-gray-500",
    ],
    link: [
      "mild-bg-transparent",
      "mild-text-primary-500",
      "mild-border-transparent",
      "hover:mild-text-primary-600",
      "mild-underline",
      "focus:mild-ring-primary-500",
    ],
    destructive: [
      "mild-bg-red-500",
      "mild-text-white",
      "mild-border-red-500",
      "hover:mild-bg-red-600",
      "focus:mild-ring-red-500",
    ],
  };

  // Size classes
  const sizeClasses = {
    sm: ["mild-text-sm", "mild-px-3", "mild-py-1.5", "mild-radius-sm"],
    md: ["mild-text-base", "mild-px-4", "mild-py-2", "mild-radius-md"],
    lg: ["mild-text-lg", "mild-px-6", "mild-py-3", "mild-radius-lg"],
    icon: ["mild-p-2", "mild-radius-md"],
  };

  const classes = cn(
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    className
  );

  return {
    className: classes,
    disabled,
  };
}