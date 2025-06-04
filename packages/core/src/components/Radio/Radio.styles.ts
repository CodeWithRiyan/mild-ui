
// packages/core/src/components/Radio/Radio.styles.ts
import { cva } from "../../utils/cn";

export const radioVariants = cva(
  "mild-radio",
  {
    variants: {
      size: {
        sm: "mild-radio--sm",
        md: "mild-radio--md",
        lg: "mild-radio--lg",
      },
      error: {
        true: "mild-radio--error", 
        false: "",
      },
      disabled: {
        true: "mild-radio--disabled",
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

export const radioLabelVariants = cva(
  "mild-radio-label",
  {
    variants: {
      size: {
        sm: "mild-radio-label--sm",
        md: "mild-radio-label--md", 
        lg: "mild-radio-label--lg",
      },
      disabled: {
        true: "mild-radio-label--disabled",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);
