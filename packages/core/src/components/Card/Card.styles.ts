// packages/core/src/components/Card/Card.styles.ts
import { cva } from "class-variance-authority";

export const cardStyles = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        outlined: "border-2 border-border bg-transparent",
        elevated: "border-border bg-card shadow-lg",
        filled: "border-border bg-muted/50",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-6",
        lg: "p-8",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      shadow: "sm",
    },
  },
);

export const cardHeaderStyles = cva("flex flex-col space-y-1.5 p-6", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardContentStyles = cva("p-6 pt-0", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3 pt-0",
      md: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardFooterStyles = cva("flex items-center p-6 pt-0", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3 pt-0",
      md: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardTitleStyles = cva(
  "text-2xl font-semibold leading-none tracking-tight",
);

export const cardDescriptionStyles = cva("text-sm text-muted-foreground");
