"use client";

import * as React from "react";
import {
  cn,
  LabelCoreProps,
  LabelStyleProps,
  labelStyles,
} from "@mild-ui/core";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    LabelCoreProps,
    LabelStyleProps {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, error, ui, children, required, ...props }, ref) => {
    return (
      <label
        className={cn(labelStyles({ error }), className, ui?.label)}
        ref={ref}
        {...props}
      >
        {children}
        {required && (
          <span className={cn("pl-1 text-red-500", ui?.asterisk)}>*</span>
        )}
      </label>
    );
  },
);
Label.displayName = "Label";

export { Label };
