// packages/react/src/components/Checkbox/Checkbox.tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import {
  CheckboxCoreProps,
  checkboxStyles,
  CheckboxStyleProps,
  checkboxLabelStyles,
} from "@mild-ui/core";
import { cn } from "../../utils";

// Extend from core types but manually handle React-specific props
export interface CheckboxProps extends CheckboxCoreProps, CheckboxStyleProps {
  // React-specific props
  id?: string;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  className?: string;
  label?: string;
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
      indeterminate,
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
          required={required}
          name={name}
          value={value}
          onCheckedChange={onCheckedChange}
          className={cn(checkboxStyles({ size }), className)}
          {...restProps}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            <Check className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label htmlFor={id} className={cn(checkboxLabelStyles({ size }))}>
            {label}
          </label>
        )}
      </div>
    );
  },
);

// Set a simple displayName
Checkbox.displayName = "Checkbox";

export { Checkbox };
