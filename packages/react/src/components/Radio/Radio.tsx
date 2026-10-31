// packages/react/src/components/Radio/Radio.tsx
import * as React from "react";
import { createRadioGroup } from "@mild-ui/primitives/radio-group";
import type { RadioStyleProps, RadioSize } from "../../types";
import { radioVariants, radioLabelVariants } from "../../utils/radio";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { DotIcon } from "../icons";

interface RadioGroupContextValue {
  value: string | null;
  disabled: boolean;
  required: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  value: null,
  disabled: false,
  required: false,
});

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
  ui?: {
    contaier?: string;
    items?: string;
  };
}

/**
 * Radio group with roving tabindex. Behaviour (`role="radiogroup"`, `aria-checked`, the single
 * tab stop, Arrow keys that move and check, Space) comes from `@mild-ui/primitives/radio-group`;
 * this component only renders and maps props.
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    className,
    value: valueProp,
    defaultValue,
    onValueChange,
    name,
    disabled = false,
    required = false,
    children,
    ui,
    ...restProps
  } = props;

  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState<string | null>(defaultValue ?? null);
  const value = isControlled ? valueProp : internal;

  const machine = useMachine(
    (element: HTMLDivElement, options) => createRadioGroup({ element, ...options }),
    {
      value,
      onChange: (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
      },
    },
    (instance, options) => {
      // Radios may mount or unmount between renders, so re-read them every time.
      instance.refresh();
      instance.setValue(options.value);
    },
  );

  const composedRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      machine.ref(element);
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [machine, ref],
  );

  const context = React.useMemo(() => ({ value, disabled, required }), [value, disabled, required]);

  return (
    <RadioGroupContext.Provider value={context}>
      <div
        ref={composedRef}
        role="radiogroup"
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        className={cn("mild-radio-group", className, ui?.contaier)}
        {...restProps}
      >
        {children}
        {name && <input type="hidden" name={name} value={value ?? ""} />}
      </div>
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends RadioStyleProps {
  id?: string;
  className?: string;
  label?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  /** Shown while checked. Defaults to a filled dot. */
  indicator?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLSpanElement, RadioGroupItemProps>((props, ref) => {
  const {
    className,
    size = "md",
    label,
    value,
    disabled: itemDisabled,
    // Required is a property of the group (aria-required on the radiogroup), not of one radio.
    required: _required,
    id,
    indicator,
    name: _name,
    ...restProps
  } = props;
  const group = React.useContext(RadioGroupContext);
  const disabled = group.disabled || Boolean(itemDisabled);
  const checked = group.value === value;
  const radioId = id || `radio-${value}`;
  const labelId = `${radioId}-label`;
  const radioRef = React.useRef<HTMLSpanElement | null>(null);
  const composedRef = React.useCallback(
    (element: HTMLSpanElement | null) => {
      radioRef.current = element;
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [ref],
  );

  return (
    <div className="mild-radio-field">
      <span
        ref={composedRef}
        id={radioId}
        // The group primitive finds radios by role and reads `data-value`; it sets aria-checked
        // and tabindex itself. These keep server markup honest.
        role="radio"
        aria-checked={checked}
        aria-labelledby={label ? labelId : undefined}
        aria-disabled={disabled || undefined}
        data-value={value}
        data-state={checked ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        className={cn(radioVariants({ size }), className)}
        {...restProps}
      >
        <span className="mild-radio__indicator" data-indicator>
          {checked ? (indicator ?? <DotIcon />) : null}
        </span>
      </span>
      {label && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- mirrors native <label> activation; the radio itself handles the keyboard
        <label
          id={labelId}
          htmlFor={radioId}
          className={cn(radioLabelVariants({ size }), disabled && "mild-radio-label--disabled")}
          onClick={(event) => {
            // A <label for> neither names nor activates a non-native control; do both here.
            event.preventDefault();
            radioRef.current?.click();
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

interface RadioProps extends RadioGroupProps {
  items?: RadioGroupItemProps[];
  size?: RadioSize;
}

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ items, size = "md", children, className, ui, ...props }, ref) => {
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
  },
);
Radio.displayName = "Radio";

export { RadioGroup, RadioGroupItem, Radio };
export type { RadioGroupProps as RadioGroupComponentProps, RadioGroupItemProps, RadioProps };
