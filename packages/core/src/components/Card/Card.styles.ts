// packages/core/src/components/Card/Card.styles.ts
import { cva } from "../../utils/cn";

export const cardVariants = cva("mild-card", {
  variants: {
    variant: {
      default: "mild-card--default",
      outlined: "mild-card--outlined",
      elevated: "mild-card--elevated",
      filled: "mild-card--filled",
    },
    padding: {
      none: "mild-card--padding-none",
      sm: "mild-card--padding-sm",
      md: "mild-card--padding-md",
      lg: "mild-card--padding-lg",
    },
    shadow: {
      none: "mild-card--shadow-none",
      sm: "mild-card--shadow-sm",
      md: "mild-card--shadow-md",
      lg: "mild-card--shadow-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    shadow: "sm",
  },
});

export const cardHeaderVariants = cva("mild-card-header", {
  variants: {
    padding: {
      none: "mild-card-header--padding-none",
      sm: "mild-card-header--padding-sm",
      md: "mild-card-header--padding-md",
      lg: "mild-card-header--padding-lg",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardContentVariants = cva("mild-card-content", {
  variants: {
    padding: {
      none: "mild-card-content--padding-none",
      sm: "mild-card-content--padding-sm",
      md: "mild-card-content--padding-md",
      lg: "mild-card-content--padding-lg",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardFooterVariants = cva("mild-card-footer", {
  variants: {
    padding: {
      none: "mild-card-footer--padding-none",
      sm: "mild-card-footer--padding-sm",
      md: "mild-card-footer--padding-md",
      lg: "mild-card-footer--padding-lg",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardTitleVariants = cva("mild-card-title");
export const cardDescriptionVariants = cva("mild-card-description");
