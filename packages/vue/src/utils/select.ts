import { cn } from "./cn";

interface SelectTriggerProps {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  error?: boolean;
}

interface SelectItemProps {
  size?: "sm" | "md" | "lg";
}

export function selectTriggerStyles({
  size = "md",
  fullWidth = true,
  error = false,
}: SelectTriggerProps = {}) {
  const baseClasses = [
    "flex",
    "items-center",
    "justify-between",
    "rounded-md",
    "border",
    "bg-background",
    "px-3",
    "py-2",
    "text-sm",
    "ring-offset-background",
    "placeholder:text-muted-foreground",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-ring",
    "focus:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ];

  const sizeClasses = {
    sm: ["text-xs", "px-2", "py-1"],
    md: ["text-sm", "px-3", "py-2"],
    lg: ["text-base", "px-4", "py-3"],
  };

  const widthClasses = fullWidth ? ["w-full"] : [];

  const errorClasses = error
    ? ["border-red-500", "focus:ring-red-500"]
    : ["border-input"];

  return cn(
    ...baseClasses,
    ...sizeClasses[size],
    ...widthClasses,
    ...errorClasses
  );
}

export function selectItemStyles({ size = "md" }: SelectItemProps = {}) {
  const baseClasses = [
    "relative",
    "flex",
    "cursor-default",
    "select-none",
    "items-center",
    "rounded-sm",
    "pl-8",
    "pr-2",
    "text-sm",
    "outline-none",
    "focus:bg-accent",
    "focus:text-accent-foreground",
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",
  ];

  const sizeClasses = {
    sm: ["text-xs", "py-1"],
    md: ["text-sm", "py-1.5"],
    lg: ["text-base", "py-2"],
  };

  return cn(...baseClasses, ...sizeClasses[size]);
}