// packages/core/src/components/Tabs/Tabs.styles.ts
import { cva } from "class-variance-authority";

export const tabsListStyles = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "rounded-md bg-muted p-1",
      pills: "space-x-1",
      underline: "border-b border-border",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col space-y-1",
    },
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
  },
  compoundVariants: [
    {
      variant: "underline",
      class: "bg-transparent p-0 space-x-0",
    },
    {
      orientation: "vertical",
      variant: "default",
      class: "h-auto w-fit flex-col space-y-1",
    },
  ],
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
    size: "md",
  },
});

export const tabsTriggerStyles = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        pills:
          "rounded-md hover:bg-muted data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        underline:
          "rounded-none border-b-2 border-transparent bg-transparent hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const tabsContentStyles = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
