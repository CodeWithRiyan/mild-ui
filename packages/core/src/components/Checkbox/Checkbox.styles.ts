// packages/core/src/components/Checkbox/Checkbox.styles.ts
import { cva } from "../../utils/cn";

export const checkboxVariants = cva(
  "mild-checkbox",
  {
    variants: {
      size: {
        sm: "mild-checkbox--sm",
        md: "mild-checkbox--md", 
        lg: "mild-checkbox--lg",
      },
      error: {
        true: "mild-checkbox--error",
        false: "",
      },
      disabled: {
        true: "mild-checkbox--disabled",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
      disabled: false,
    },
  },
);

export const checkboxLabelVariants = cva(
  "mild-checkbox-label",
  {
    variants: {
      size: {
        sm: "mild-checkbox-label--sm",
        md: "mild-checkbox-label--md",
        lg: "mild-checkbox-label--lg", 
      },
      disabled: {
        true: "mild-checkbox-label--disabled",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);
