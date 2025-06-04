// packages/core/src/components/Modal/Modal.styles.ts
import { cva } from "../../utils/cn";

export const modalOverlayVariants = cva(
  "mild-modal-overlay",
  {
    variants: {
      blur: {
        true: "mild-modal-overlay--blur",
        false: "",
      },
    },
    defaultVariants: {
      blur: true,
    },
  },
);

export const modalContentVariants = cva(
  "mild-modal-content",
  {
    variants: {
      size: {
        xs: "mild-modal-content--xs",
        sm: "mild-modal-content--sm",
        md: "mild-modal-content--md",
        lg: "mild-modal-content--lg",
        xl: "mild-modal-content--xl",
        full: "mild-modal-content--full",
      },
      centered: {
        true: "mild-modal-content--centered",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      centered: true,
    },
  },
);

export const modalHeaderVariants = cva("mild-modal-header");
export const modalFooterVariants = cva("mild-modal-footer");
export const modalTitleVariants = cva("mild-modal-title");
export const modalDescriptionVariants = cva("mild-modal-description");
export const modalCloseVariants = cva("mild-modal-close");
