// packages/core/src/components/Input/Input.styles.ts
import { cva } from "class-variance-authority";

export const inputPasswordStyles = cva(
  "relative flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted/50",
        outline: "border-input",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "h-8 px-3 py-1",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-5 py-3",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      error: {
        true: "border-destructive focus-visible:ring-destructive/50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: true,
      error: false,
    },
  },
);
