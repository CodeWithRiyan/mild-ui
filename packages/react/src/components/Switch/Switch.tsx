// packages/react/src/components/Switch/Switch.tsx
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Check } from "lucide-react";
import {
  SwitchCoreProps,
  switchStyles,
  SwitchStyleProps,
  switchThumbStyles,
  switchLabelStyles,
} from "@mild-ui/core";
import { cn } from "../../utils";
import { Label } from "../Label";

// Extend from core types but manually handle React-specific props
export interface SwitchProps extends SwitchCoreProps, SwitchStyleProps {
  // React-specific props
  id?: string;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  className?: string;
  label?: React.ReactNode;
}

// Use explicit type annotations
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
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
      ui,
      onCheckedChange,
      ...restProps
    } = props;

    return (
      <div className={cn("flex items-center space-x-4", ui?.container)}>
        <SwitchPrimitive.Root
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          name={name}
          value={value}
          onCheckedChange={onCheckedChange}
          className={cn(switchStyles({ size }), className, ui?.switch)}
          {...restProps}
        >
          <SwitchPrimitive.Thumb
            className={cn(switchThumbStyles({ size }), ui?.thumb)}
          />
        </SwitchPrimitive.Root>
        {label && (
          <Label
            htmlFor={id}
            className={cn(switchLabelStyles({ size }), ui?.label)}
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
Switch.displayName = "Switch";

export { Switch };
