// packages/core/src/components/Select/Select.styles.ts
import { cva } from "class-variance-authority";

export const selectTriggerStyles = cva(
  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      error: {
        true: "border-destructive focus:ring-destructive/50",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: true,
      error: false,
    },
  },
);

export const selectContentStyles = cva(
  "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
  {
    variants: {
      position: {
        popper: "translate-y-1",
        "item-aligned": "",
      },
    },
    defaultVariants: {
      position: "popper",
    },
  },
);

export const selectItemStyles = cva(
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      size: {
        sm: "py-1 text-xs",
        md: "py-1.5 text-sm",
        lg: "py-2 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
