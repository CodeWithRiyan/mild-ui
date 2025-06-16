import { cn } from "./cn";

interface CheckboxProps {
  size?: "sm" | "md" | "lg";
}

interface CheckboxLabelProps {
  size?: "sm" | "md" | "lg";
}

export function checkboxStyles({ size = "md" }: CheckboxProps = {}) {
  const baseClasses = [
    "peer",
    "h-4",
    "w-4",
    "shrink-0",
    "rounded-sm",
    "border",
    "border-primary",
    "ring-offset-background",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "data-[state=checked]:bg-primary",
    "data-[state=checked]:text-primary-foreground",
  ];

  const sizeClasses = {
    sm: ["h-3", "w-3"],
    md: ["h-4", "w-4"],
    lg: ["h-5", "w-5"],
  };

  return cn(...baseClasses, ...sizeClasses[size]);
}

export function checkboxLabelStyles({ size = "md" }: CheckboxLabelProps = {}) {
  const baseClasses = [
    "text-sm",
    "font-medium",
    "leading-none",
    "peer-disabled:cursor-not-allowed",
    "peer-disabled:opacity-70",
  ];

  const sizeClasses = {
    sm: ["text-xs"],
    md: ["text-sm"],
    lg: ["text-base"],
  };

  return cn(...baseClasses, ...sizeClasses[size]);
}