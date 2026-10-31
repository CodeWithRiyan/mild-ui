// packages/react/src/components/Switch/Switch.tsx
import * as React from "react";
import { createSwitch } from "@mild-ui/primitives/switch";
import type { SwitchCoreProps } from "../../types";
import { switchLabelVariants, switchThumbVariants, switchVariants } from "../../utils/switch";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { Label } from "../Label";

export interface SwitchProps extends Omit<
  SwitchCoreProps,
  "onCheckedChange" | "onChange" | "indeterminate"
> {
  id?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  label?: React.ReactNode;
  /** Rendered inside the thumb, e.g. an on/off glyph. */
  thumbIcon?: React.ReactNode;
}

/**
 * On/off switch. Behaviour (role, `aria-checked`, Space and Enter to toggle) comes from
 * `@mild-ui/primitives/switch`; this component only renders and maps props.
 */
const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>((props, ref) => {
  const {
    className,
    size = "md",
    label,
    checked: checkedProp,
    defaultChecked,
    disabled = false,
    required,
    name,
    value = "on",
    id,
    ui,
    thumbIcon,
    onCheckedChange,
    ...restProps
  } = props;

  const labelId = React.useId();
  const isControlled = checkedProp !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const checked = isControlled ? checkedProp : internal;

  const machine = useMachine(
    (element: HTMLSpanElement, options) => createSwitch({ element, ...options }),
    {
      checked,
      disabled,
      onChange: (next: boolean) => {
        if (!isControlled) setInternal(next);
        onCheckedChange?.(next);
      },
    },
    (instance, options) => {
      instance.setChecked(options.checked);
      instance.setDisabled(options.disabled);
    },
  );

  const composedRef = React.useCallback(
    (element: HTMLSpanElement | null) => {
      machine.ref(element);
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [machine, ref],
  );

  return (
    <div className={cn("mild-switch-field", ui?.container)}>
      <span
        ref={composedRef}
        id={id}
        role="switch"
        aria-checked={checked}
        // A <label for> only names native form controls, so the label is linked explicitly.
        aria-labelledby={label ? labelId : undefined}
        aria-required={required || undefined}
        data-state={checked ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        className={cn(switchVariants({ size }), className, ui?.switch)}
        {...restProps}
      >
        <span
          className={cn(switchThumbVariants({ size }), ui?.thumb)}
          data-state={checked ? "checked" : "unchecked"}
        >
          {thumbIcon}
        </span>
      </span>
      {name && (
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          required={required}
          readOnly
          hidden
          aria-hidden
          tabIndex={-1}
        />
      )}
      {label && (
        <Label
          id={labelId}
          htmlFor={id}
          className={cn(
            switchLabelVariants({ size }),
            disabled && "mild-switch-label--disabled",
            ui?.label,
          )}
          required={required}
          onClick={(event) => {
            event.preventDefault();
            machine.instance.current?.element.click();
          }}
        >
          {label}
        </Label>
      )}
    </div>
  );
});

Switch.displayName = "Switch";

export { Switch };
