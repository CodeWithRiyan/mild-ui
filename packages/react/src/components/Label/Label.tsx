// packages/react/src/components/Label/Label.tsx
import React, { forwardRef } from "react";
import type { LabelCoreProps } from "../../types/label";
import { labelVariants } from "../../utils/label";
import { cn } from "../../utils";

export interface LabelProps
  extends LabelCoreProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      required = false,
      error = false,
      ui,
      children,
      htmlFor,
      className,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const classes = labelVariants({
      required,
      error,
      className,
    });

    return (
      <label
        ref={ref}
        className={classes}
        htmlFor={htmlFor}
        onClick={onClick}
        {...rest}
      >
        {children}
        {required && (
          <span
            className={cn("--mild-pl-1 --mild-color-red-500", ui?.asterisk)}
          >
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";
