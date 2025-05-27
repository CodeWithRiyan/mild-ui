// packages/react/src/components/Radio/Radio.tsx
import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { RadioCoreProps, radioStyles, RadioStyleProps, radioLabelStyles } from '@mild-ui/core';
import { cn } from '../../utils'

// Combine our core props with necessary Radix props
interface RadioGroupItemProps extends RadioCoreProps, RadioStyleProps {
  // Additional React-specific props
  id?: string;
  className?: string;
  label?: string;
  // Required by Radix
  value: string;
  // Optional Radix props
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>((props, ref) => {
  const {
    className, 
    size = 'md', 
    label,
    value,
    // Extract these so we don't pass them to Radix (avoid prop conflicts)
    checked, // We remove checked as Radix handles this internally
    defaultChecked, // Not used by Radix RadioGroupItem
    // The following are valid for Radix
    disabled,
    required,
    name,
    id,
    // Get the rest of the props
    ...restProps 
  } = props;
  
  // Pass only valid Radix props to the RadioGroupItem
  const radixProps = {
    value,
    disabled,
    required,
    id,
    ...restProps
  };
  
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioStyles({ size }), className)}
        {...radixProps}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <label
          htmlFor={id}
          className={cn(radioLabelStyles({ size }))}
        >
          {label}
        </label>
      )}
    </div>
  );
});

// Fix displayName assignment
// Using type assertion to fix TypeScript errors
(RadioGroupItem as any).displayName = "RadioGroupItem";

// Export the Root component from Radix
const RadioGroup = RadioGroupPrimitive.Root;

export { RadioGroup, RadioGroupItem };