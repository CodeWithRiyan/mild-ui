// packages/react/src/components/Checkbox/Checkbox.tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import type { CheckboxCoreProps } from "../../types";
import {
  checkboxVariants,
  checkboxLabelVariants,
} from "../../utils/checkbox";
import { cn } from "../../utils";
import { Label } from "../Label";

// Extend from core types but manually handle React-specific props
export interface CheckboxProps extends Omit<CheckboxCoreProps, "onCheckedChange" | "onChange"> {
  // React-specific props
  id?: string;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  className?: string;
  label?: React.ReactNode;
}

// Use explicit type annotations
const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    const {
      className,
      size = "md",
      label,
      checked,
      defaultChecked,
      disabled,
      required,
      name,
      value,
      id,
      onCheckedChange,
      ...restProps
    } = props;

    return (
      <div className="flex items-center space-x-2">
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          name={name}
          value={value}
          onCheckedChange={onCheckedChange}
          className={cn(checkboxVariants({ size }), className)}
          {...restProps}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            <Check className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <Label
            htmlFor={id}
            className={cn(checkboxLabelVariants({ size }))}
            required={required}
          >
            {label}
          </Label>
        )}
      </div>
    );
  },
);

// Set a simple displayName
Checkbox.displayName = "Checkbox";

export { Checkbox };
