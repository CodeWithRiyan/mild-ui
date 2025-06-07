// packages/react/src/components/Radio/Radio.tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import {
  RadioCoreProps,
  radioVariants,
  RadioStyleProps,
  radioLabelVariants,
  RadioSize,
  cn,
} from "../../../../core";

// Props untuk RadioGroup
interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  children?: React.ReactNode;
  className?: string;
  ui?: {
    contaier?: string;
    items?: string;
  };
}

// Props untuk RadioGroupItem
interface RadioGroupItemProps extends RadioCoreProps, RadioStyleProps {
  id?: string;
  className?: string;
  label?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

// RadioGroup component
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = "RadioGroup";

// RadioGroupItem component
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    { className, size = "md", label, value, disabled, required, id, ...props },
    ref,
  ) => {
    const radioId = id || `radio-${value}`;

    return (
      <div className="flex items-center space-x-2">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(radioVariants({ size }), className)}
          value={value}
          disabled={disabled}
          required={required}
          id={radioId}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className={cn("h-2.5 w-2.5 fill-current text-current")} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && (
          <label
            htmlFor={radioId}
            className={cn(
              radioLabelVariants({ size }),
              disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";

// Komponen Radio yang lebih fleksibel
interface RadioProps extends RadioGroupProps {
  items?: RadioGroupItemProps[];
  size?: RadioSize;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioProps
>(({ items, size = "md", children, className, ui, ...props }, ref) => {
  return (
    <RadioGroup ref={ref} className={cn(className, ui?.contaier)} {...props}>
      {items
        ? items.map((item) => (
            <RadioGroupItem
              {...item}
              key={item.value}
              size={size}
              className={cn(item.className, ui?.items)}
            />
          ))
        : children}
    </RadioGroup>
  );
});
Radio.displayName = "Radio";

export { RadioGroup, RadioGroupItem, Radio };
export type { RadioGroupProps, RadioGroupItemProps, RadioProps };
