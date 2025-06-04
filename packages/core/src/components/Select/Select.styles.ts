// packages/core/src/components/Select/Select.styles.ts  
import { cva } from "../../utils/cn";

export const selectTriggerVariants = cva(
  "mild-select-trigger",
  {
    variants: {
      size: {
        sm: "mild-select-trigger--sm",
        md: "mild-select-trigger--md",
        lg: "mild-select-trigger--lg",
      },
      fullWidth: {
        true: "mild-select-trigger--full-width",
        false: "",
      },
      error: {
        true: "mild-select-trigger--error",
        false: "",
      },
      disabled: {
        true: "mild-select-trigger--disabled",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: true,
      error: false,
      disabled: false,
    },
  },
);

export const selectContentVariants = cva(
  "mild-select-content",
  {
    variants: {
      position: {
        popper: "mild-select-content--popper",
        "item-aligned": "mild-select-content--item-aligned",
      },
    },
    defaultVariants: {
      position: "popper",
    },
  },
);

export const selectItemVariants = cva(
  "mild-select-item",
  {
    variants: {
      size: {
        sm: "mild-select-item--sm",
        md: "mild-select-item--md",
        lg: "mild-select-item--lg",
      },
      disabled: {
        true: "mild-select-item--disabled",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);