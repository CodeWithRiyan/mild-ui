// packages/react/src/components/SegmentedControl/SegmentedControl.tsx
import * as React from "react";
import { createRadioGroup } from "@mild-ui/primitives/radio-group";
import type { SegmentedControlCoreProps } from "../../types";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";

export interface SegmentedControlProps
  extends
    SegmentedControlCoreProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** Class names for the inner parts. */
  ui?: {
    item?: string;
  };
}

/**
 * Single-choice control drawn as one bar of segments. It is a radio group: behaviour
 * (`aria-checked`, one tab stop, Arrow keys that move and select, Space) comes from
 * `@mild-ui/primitives/radio-group`; this component only renders and maps props.
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      items,
      value: valueProp,
      defaultValue,
      onValueChange,
      name,
      size = "md",
      orientation = "horizontal",
      fullWidth = false,
      disabled = false,
      className,
      ui,
      ...rest
    },
    ref,
  ) => {
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

    return (
      <div
        ref={composedRef}
        role="radiogroup"
        aria-disabled={disabled || undefined}
        aria-orientation={orientation}
        data-orientation={orientation}
        className={cn(
          "mild-segmented-control",
          `mild-segmented-control--${size}`,
          orientation === "vertical" && "mild-segmented-control--vertical",
          fullWidth && "mild-segmented-control--full-width",
          className,
        )}
        {...rest}
      >
        {items.map((item) => {
          const checked = value === item.value;
          const itemDisabled = disabled || Boolean(item.disabled);
          return (
            <button
              key={item.value}
              type="button"
              // The group primitive finds segments by role and reads `data-value`; it sets
              // aria-checked and tabindex itself. These keep server markup honest.
              role="radio"
              aria-checked={checked}
              data-value={item.value}
              data-state={checked ? "checked" : "unchecked"}
              disabled={itemDisabled}
              className={cn("mild-segmented-control__item", ui?.item)}
            >
              {item.label ?? item.value}
            </button>
          );
        })}
        {name && <input type="hidden" name={name} value={value ?? ""} />}
      </div>
    );
  },
);
SegmentedControl.displayName = "SegmentedControl";
