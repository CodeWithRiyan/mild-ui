import { cn } from "./cn";

interface RadioProps {
  size?: "sm" | "md" | "lg";
}

interface RadioLabelProps {
  size?: "sm" | "md" | "lg";
}

export function radioStyles({ size = "md" }: RadioProps = {}) {
  const baseClasses = [
    "aspect-square",
    "h-4",
    "w-4",
    "rounded-full",
    "border",
    "border-primary",
    "text-primary",
    "ring-offset-background",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ];

  const sizeClasses = {
    sm: ["h-3", "w-3"],
    md: ["h-4", "w-4"],
    lg: ["h-5", "w-5"],
  };

  return cn(...baseClasses, ...sizeClasses[size]);
}

export function radioLabelStyles({ size = "md" }: RadioLabelProps = {}) {
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