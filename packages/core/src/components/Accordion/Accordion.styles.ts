
// packages/core/src/components/Accordion/Accordion.styles.ts
import { cva } from "../../utils/cn";

export const accordionVariants = cva(
  "mild-accordion",
  {
    variants: {
      variant: {
        default: "mild-accordion--default",
        ghost: "mild-accordion--ghost",
        bordered: "mild-accordion--bordered",
      },
      size: {
        sm: "mild-accordion--sm",
        md: "mild-accordion--md",
        lg: "mild-accordion--lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const accordionItemVariants = cva(
  "mild-accordion-item",
  {
    variants: {
      variant: {
        default: "mild-accordion-item--default",
        ghost: "mild-accordion-item--ghost",
        bordered: "mild-accordion-item--bordered",
      },
      size: {
        sm: "mild-accordion-item--sm",
        md: "mild-accordion-item--md",
        lg: "mild-accordion-item--lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const accordionTriggerVariants = cva(
  "mild-accordion-trigger",
  {
    variants: {
      variant: {
        default: "mild-accordion-trigger--default",
        ghost: "mild-accordion-trigger--ghost",
        bordered: "mild-accordion-trigger--bordered",
      },
      size: {
        sm: "mild-accordion-trigger--sm",
        md: "mild-accordion-trigger--md",
        lg: "mild-accordion-trigger--lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const accordionContentVariants = cva(
  "mild-accordion-content",
  {
    variants: {
      variant: {
        default: "mild-accordion-content--default",
        ghost: "mild-accordion-content--ghost",
        bordered: "mild-accordion-content--bordered",
      },
      size: {
        sm: "mild-accordion-content--sm",
        md: "mild-accordion-content--md",
        lg: "mild-accordion-content--lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
