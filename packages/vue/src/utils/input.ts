import { cn } from "./cn";

interface InputProps {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  error?: boolean;
}

export function inputStyles({
  variant = "default",
  size = "md",
  fullWidth = true,
  error = false,
}: InputProps = {}) {
  const baseClasses = [
    "flex",
    "rounded-md",
    "border",
    "bg-background",
    "text-sm",
    "ring-offset-background",
    "file:border-0",
    "file:bg-transparent",
    "file:text-sm",
    "file:font-medium",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ];

  const variantClasses = {
    default: ["border-input", "bg-background"],
    filled: ["border-transparent", "bg-muted"],
    outlined: ["border-2", "border-input", "bg-background"],
  };

  const sizeClasses = {
    sm: ["h-8", "px-2", "text-xs"],
    md: ["h-10", "px-3", "text-sm"],
    lg: ["h-12", "px-4", "text-base"],
  };

  const widthClasses = fullWidth ? ["w-full"] : [];

  const errorClasses = error
    ? ["border-red-500", "focus-visible:ring-red-500"]
    : [];

  return cn(
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    ...widthClasses,
    ...errorClasses
  );
}