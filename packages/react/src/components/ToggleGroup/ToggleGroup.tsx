// packages/react/src/components/ToggleGroup/ToggleGroup.tsx
import * as React from "react";
import { createToggleGroup } from "@mild-ui/primitives/toggle-group";
import type { ToggleGroupMultipleProps, ToggleGroupSingleProps } from "../../types";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { Toggle, type ToggleProps } from "../Toggle";

interface ToggleGroupContextValue {
  value: string[];
  variant: ToggleProps["variant"];
  size: ToggleProps["size"];
  disabled: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

type OwnProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">;

export type ToggleGroupProps = OwnProps & (ToggleGroupSingleProps | ToggleGroupMultipleProps);

/** Normalizes the single (`string | null`) and multiple (`string[]`) forms to an array. */
function toArray(value: string | string[] | null | undefined): string[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * A set of `ToggleGroupItem`s that press one at a time (`type="single"`, default) or any number
 * (`type="multiple"`). Behaviour (`aria-pressed`, one tab stop, Arrow/Home/End keys) comes
 * from `@mild-ui/primitives/toggle-group`; this component only renders and maps props.
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>((props, ref) => {
  const {
    type = "single",
    value: valueProp,
    defaultValue,
    onValueChange,
    variant = "ghost",
    size = "md",
    orientation = "horizontal",
    attached = false,
    loop = true,
    disabled = false,
    className,
    children,
    ...rest
  } = props;
  const multiple = type === "multiple";

  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState<string[]>(() => toArray(defaultValue));
  const value = isControlled ? toArray(valueProp) : internal;

  const machine = useMachine(
    (element: HTMLDivElement, options) => createToggleGroup({ element, ...options }),
    {
      multiple,
      loop,
      value,
      onChange: (next: string[]) => {
        if (!isControlled) setInternal(next);
        if (multiple) (onValueChange as ToggleGroupMultipleProps["onValueChange"])?.(next);
        else (onValueChange as ToggleGroupSingleProps["onValueChange"])?.(next[0] ?? null);
      },
    },
    (instance, options) => {
      // Items may mount or unmount between renders, so re-read them every time.
      instance.refresh();
      instance.setValue(options.value);
    },
    // `multiple` and `loop` are read once at creation.
    [multiple, loop],
  );

  const composedRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      machine.ref(element);
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [machine, ref],
  );

  const context = React.useMemo(
    () => ({ value, variant, size, disabled }),
    [value, variant, size, disabled],
  );

  return (
    <ToggleGroupContext.Provider value={context}>
      <div
        ref={composedRef}
        role="group"
        className={cn(
          "mild-toggle-group",
          attached && "mild-toggle-group--attached",
          orientation === "vertical" && "mild-toggle-group--vertical",
          className,
        )}
        data-orientation={orientation}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
});
ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps extends Omit<
  ToggleProps,
  "pressed" | "defaultPressed" | "onPressedChange"
> {
  /** The value this item adds to the group's value while pressed. */
  value: string;
}

/** One toggle of a `ToggleGroup`. Its pressed state is owned by the group. */
export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, variant, size, disabled: itemDisabled, className, children, ...rest }, ref) => {
    const group = React.useContext(ToggleGroupContext);
    if (!group) throw new Error("<ToggleGroupItem> must be rendered inside <ToggleGroup>.");
    const disabled = group.disabled || Boolean(itemDisabled);

    return (
      // The group primitive handles the click; the controlled Toggle just renders the state.
      <Toggle
        ref={ref}
        pressed={group.value.includes(value)}
        variant={variant ?? group.variant}
        size={size ?? group.size}
        disabled={disabled}
        data-value={value}
        className={cn("mild-toggle-group__item", className)}
        {...rest}
      >
        {children}
      </Toggle>
    );
  },
);
ToggleGroupItem.displayName = "ToggleGroupItem";
