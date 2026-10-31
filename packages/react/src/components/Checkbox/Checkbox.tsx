// packages/react/src/components/Checkbox/Checkbox.tsx
import * as React from "react";
import { createCheckbox, type CheckboxState } from "@mild-ui/primitives/checkbox";
import type { CheckboxCoreProps } from "../../types";
import { checkboxVariants, checkboxLabelVariants } from "../../utils/checkbox";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { Label } from "../Label";
import { CheckIcon, MinusIcon } from "../icons";

export interface CheckboxProps extends Omit<
  CheckboxCoreProps,
  "onCheckedChange" | "onChange" | "indeterminate" | "checked" | "defaultChecked"
> {
  id?: string;
  /** `true`, `false`, or `"indeterminate"`. Makes the checkbox controlled. */
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  /** Shows the mixed state regardless of `checked`. Same as `checked="indeterminate"`. */
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  className?: string;
  label?: React.ReactNode;
  /** Shown while checked. Defaults to a check mark. */
  icon?: React.ReactNode;
  /** Shown while indeterminate. Defaults to a minus. */
  indeterminateIcon?: React.ReactNode;
}

const toState = (value: boolean | "indeterminate" | undefined): CheckboxState =>
  value === "indeterminate" ? "mixed" : (value ?? false);
const fromState = (state: CheckboxState): boolean | "indeterminate" =>
  state === "mixed" ? "indeterminate" : state;

/**
 * Tri-state checkbox. Behaviour (role, `aria-checked`, Space to toggle, mixed -> checked) comes
 * from `@mild-ui/primitives/checkbox`; this component only renders and maps props.
 */
const Checkbox = React.forwardRef<HTMLSpanElement, CheckboxProps>((props, ref) => {
  const {
    className,
    size = "md",
    label,
    checked: checkedProp,
    defaultChecked,
    indeterminate,
    disabled = false,
    required,
    name,
    value = "on",
    id,
    icon,
    indeterminateIcon,
    onCheckedChange,
    ...restProps
  } = props;

  const labelId = React.useId();
  const isControlled = checkedProp !== undefined;
  const [internal, setInternal] = React.useState<CheckboxState>(toState(defaultChecked));
  const state: CheckboxState = indeterminate
    ? "mixed"
    : isControlled
      ? toState(checkedProp)
      : internal;

  const machine = useMachine(
    (element: HTMLSpanElement, options) => createCheckbox({ element, ...options }),
    {
      checked: state,
      disabled,
      onChange: (next: CheckboxState) => {
        if (!isControlled) setInternal(next);
        onCheckedChange?.(fromState(next));
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

  const dataState = state === "mixed" ? "indeterminate" : state ? "checked" : "unchecked";

  return (
    <div className="mild-checkbox-field">
      <span
        ref={composedRef}
        id={id}
        // The primitive sets role/tabindex/aria-checked on mount; these keep server markup honest.
        role="checkbox"
        aria-checked={state === "mixed" ? "mixed" : state}
        // A <label for> only names native form controls, so the label is linked explicitly.
        aria-labelledby={label ? labelId : undefined}
        aria-required={required || undefined}
        data-state={dataState}
        data-disabled={disabled ? "" : undefined}
        className={cn(checkboxVariants({ size }), className)}
        {...restProps}
      >
        <span className="mild-checkbox__indicator" data-indicator>
          {state === "mixed" ? (indeterminateIcon ?? <MinusIcon />) : null}
          {state === true ? (icon ?? <CheckIcon />) : null}
        </span>
      </span>
      {name && (
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={state === true}
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
            checkboxLabelVariants({ size }),
            disabled && "mild-checkbox-label--disabled",
          )}
          required={required}
          onClick={(event) => {
            // Clicking a label activates a native control; do the same for this one.
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

Checkbox.displayName = "Checkbox";

export { Checkbox };
