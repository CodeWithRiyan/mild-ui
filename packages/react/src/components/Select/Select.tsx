// packages/react/src/components/Select/Select.tsx
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type {
  SelectCoreProps,
  SelectStyleProps,
  SelectOption,
} from "../../types";
import {
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
} from "../../utils/select";
import { cn } from "../../utils";

// Define simple prop interfaces without complex type extending
import type { Size } from "../../types";

export interface SelectTriggerProps {
  className?: string;
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

// Fix the forwardRef syntax with explicit types
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (props, ref) => {
    const { className, size, fullWidth, error, children, ...restProps } = props;

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          selectTriggerVariants({ size, fullWidth, error }),
          className,
        )}
        {...restProps}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="--mild-h-4 --mild-w-4 --mild-opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);

// Use type assertion for displayName
(SelectTrigger as any).displayName = "SelectTrigger";

// Simple props for content
export interface SelectContentProps {
  className?: string;
  children?: React.ReactNode;
  position?: "popper" | "item-aligned";
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (props, ref) => {
    const { className, children, position = "popper", ...restProps } = props;

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(selectContentVariants({ position }), className)}
          position={position}
          {...restProps}
        >
          <SelectPrimitive.Viewport className="--mild-p-1">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);

// Use type assertion for displayName
(SelectContent as any).displayName = "SelectContent";

// Simple props for item
export interface SelectItemProps {
  className?: string;
  size?: Size;
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  (props, ref) => {
    const { className, size, children, ...restProps } = props;

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(selectItemVariants({ size }), className)}
        {...restProps}
      >
        <span className="--mild-absolute --mild-left-2 --mild-flex --mild-h-3.5 --mild-w-3.5 --mild-items-center --mild-justify-center">
          <SelectPrimitive.ItemIndicator>
            <Check className="--mild-h-4 --mild-w-4" />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);

// Use type assertion for displayName
(SelectItem as any).displayName = "SelectItem";

// Define a composite component that uses all the pieces
export interface SelectProps extends SelectCoreProps, SelectStyleProps {
  options?: SelectOption[];
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  placeholder,
  disabled,
  required,
  name,
  options = [],
  className,
  size,
  fullWidth,
  error,
  onChange,
  ...props
}) => {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      name={name}
      disabled={disabled}
      required={required}
      onValueChange={onChange}
      {...props}
    >
      <SelectTrigger
        size={size}
        fullWidth={fullWidth}
        error={error}
        className={className}
        disabled={disabled}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            size={size}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive.Root>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem };
