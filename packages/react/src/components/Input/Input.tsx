// packages/react/src/components/Input/Input.tsx
import * as React from "react";
import { InputCoreProps, inputStyles, InputStyleProps } from "@mild-ui/core";
import { cn } from "../../utils";

// Add 'value' to the Omit list
export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "type" | "size" | "value"
    >,
    InputCoreProps,
    InputStyleProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      size,
      variant,
      fullWidth,
      error,
      value,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        type={type}
        className={cn(
          inputStyles({ size, variant, fullWidth, error }),
          className,
        )}
        ref={ref}
        value={value}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
