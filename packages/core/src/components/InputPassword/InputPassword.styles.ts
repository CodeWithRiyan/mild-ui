// packages/core/src/components/InputPassword/InputPassword.styles.ts
import { cva } from "../../utils/cn";

export const inputPasswordVariants = cva("mild-input-password", {
  variants: {
    variant: {
      default: "mild-input-password--default",
      filled: "mild-input-password--filled",
      outline: "mild-input-password--outline",
      ghost: "mild-input-password--ghost",
    },
    size: {
      sm: "mild-input-password--sm",
      md: "mild-input-password--md",
      lg: "mild-input-password--lg",
    },
    fullWidth: {
      true: "mild-input-password--full-width",
      false: "",
    },
    error: {
      true: "mild-input-password--error",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    fullWidth: true,
    error: false,
  },
});
