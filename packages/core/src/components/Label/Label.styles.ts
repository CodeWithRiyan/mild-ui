// packages/core/src/components/Label/Label.styles.ts
import { cva } from "../../utils/cn";

export const labelVariants = cva(
  "mild-label",
  {
    variants: {
      error: {
        true: "mild-label--error",
        false: "",
      },
      required: {
        true: "mild-label--required", 
        false: "",
      },
      disabled: {
        true: "mild-label--disabled",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
      required: false,
      disabled: false,
    },
  },
);

