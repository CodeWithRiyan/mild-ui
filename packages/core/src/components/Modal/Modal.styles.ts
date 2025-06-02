// packages/core/src/components/Modal/Modal.styles.ts
import { cva } from "class-variance-authority";

export const modalOverlayStyles = cva(
  "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
);

export const modalContentStyles = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-none w-[95vw] h-[95vh]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const modalHeaderStyles = cva(
  "flex flex-col space-y-1.5 text-center sm:text-left",
);

export const modalFooterStyles = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
);

export const modalTitleStyles = cva(
  "text-lg font-semibold leading-none tracking-tight",
);

export const modalDescriptionStyles = cva("text-sm text-muted-foreground");

export const modalCloseStyles = cva(
  "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
);
