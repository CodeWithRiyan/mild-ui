// packages/core/src/components/Switch/Switch.styles.ts
import { cva } from "../../utils/cn";

export const switchVariants = cva("mild-switch", {
  variants: {
    size: {
      sm: "mild-switch--sm",
      md: "mild-switch--md",
      lg: "mild-switch--lg",
    },
    disabled: {
      true: "mild-switch--disabled",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export const switchLabelVariants = cva("mild-switch-label", {
  variants: {
    size: {
      sm: "mild-switch-label--sm",
      md: "mild-switch-label--md",
      lg: "mild-switch-label--lg",
    },
    disabled: {
      true: "mild-switch-label--disabled",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export const switchThumbVariants = cva("mild-switch-thumb", {
  variants: {
    size: {
      sm: "mild-switch-thumb--sm",
      md: "mild-switch-thumb--md",
      lg: "mild-switch-thumb--lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
