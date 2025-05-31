// packages/core/src/components/Accordion/Accordion.styles.ts
import { cva } from "class-variance-authority";

export const accordionStyles = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        bordered: "border border-border rounded-lg",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const accordionItemStyles = cva(
  "",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        ghost: "",
        bordered: "border-b border-border last:border-b-0",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const accordionTriggerStyles = cva(
  "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md px-2",
        bordered: "px-4",
      },
      size: {
        sm: "py-2 text-sm",
        md: "py-4 text-base",
        lg: "py-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const accordionContentStyles = cva(
  "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  {
    variants: {
      variant: {
        default: "pb-4 pt-0",
        ghost: "pb-4 pt-0 px-2",
        bordered: "pb-4 pt-0 px-4",
      },
      size: {
        sm: "text-xs pb-2",
        md: "text-sm pb-4",
        lg: "text-base pb-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
