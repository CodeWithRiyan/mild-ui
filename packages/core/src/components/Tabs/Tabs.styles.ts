// packages/core/src/components/Tabs/Tabs.styles.ts
import { cva } from "../../utils/cn";

export const tabsListVariants = cva("mild-tabs-list", {
  variants: {
    variant: {
      default: "mild-tabs-list--default",
      pills: "mild-tabs-list--pills",
      underline: "mild-tabs-list--underline",
    },
    orientation: {
      horizontal: "mild-tabs-list--horizontal",
      vertical: "mild-tabs-list--vertical",
    },
    size: {
      sm: "mild-tabs-list--sm",
      md: "mild-tabs-list--md",
      lg: "mild-tabs-list--lg",
    },
  },
  compoundVariants: [
    {
      variant: "underline",
      class: "mild-tabs-list--underline-transparent",
    },
    {
      orientation: "vertical",
      variant: "default",
      class: "mild-tabs-list--vertical-default",
    },
  ],
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
    size: "md",
  },
});

export const tabsTriggerVariants = cva("mild-tabs-trigger", {
  variants: {
    variant: {
      default: "mild-tabs-trigger--default",
      pills: "mild-tabs-trigger--pills",
      underline: "mild-tabs-trigger--underline",
    },
    size: {
      sm: "mild-tabs-trigger--sm",
      md: "mild-tabs-trigger--md",
      lg: "mild-tabs-trigger--lg",
    },
    active: {
      true: "mild-tabs-trigger--active",
      false: "",
    },
    disabled: {
      true: "mild-tabs-trigger--disabled",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    active: false,
    disabled: false,
  },
});

export const tabsContentVariants = cva("mild-tabs-content", {
  variants: {
    size: {
      sm: "mild-tabs-content--sm",
      md: "mild-tabs-content--md",
      lg: "mild-tabs-content--lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
