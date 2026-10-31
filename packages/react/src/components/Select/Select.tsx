// packages/react/src/components/Select/Select.tsx
import * as React from "react";
import { createListbox } from "@mild-ui/primitives/listbox";
import type { SelectCoreProps, SelectStyleProps, SelectOption, Size } from "../../types";
import {
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
} from "../../utils/select";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { CheckIcon, ChevronDownIcon } from "../icons";

// ---------------------------------------------------------------------------------------------
// Root: owns open/value/active state and shares it with the parts below.
// ---------------------------------------------------------------------------------------------

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | null;
  select: (value: string) => void;
  active: string | null;
  setActive: (value: string | null) => void;
  labels: Map<string, React.ReactNode>;
  registerLabel: (value: string, label: React.ReactNode) => void;
  listboxId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  disabled: boolean;
  required: boolean;
  size?: Size;
  itemIndicator?: React.ReactNode;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext(part: string): SelectContextValue {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error(`<${part}> must be used inside <Select> or <SelectRoot>`);
  return context;
}

export interface SelectRootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  size?: Size;
  /** Shown next to the selected item. Defaults to a check mark. Items can override it. */
  itemIndicator?: React.ReactNode;
  children?: React.ReactNode;
}

const SelectRoot: React.FC<SelectRootProps> = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  disabled = false,
  required = false,
  name,
  size,
  itemIndicator,
  children,
}) => {
  const isValueControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue ?? null);
  const value = isValueControlled ? valueProp : internalValue;

  const isOpenControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const open = isOpenControlled ? openProp : internalOpen;

  const [active, setActive] = React.useState<string | null>(null);
  const [labels, setLabels] = React.useState(() => new Map<string, React.ReactNode>());
  const listboxId = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (disabled && next) return;
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [disabled, isOpenControlled, onOpenChange],
  );

  const select = React.useCallback(
    (next: string) => {
      if (!isValueControlled) setInternalValue(next);
      onValueChange?.(next);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [isValueControlled, onValueChange, setOpen],
  );

  // A new Map per change, so the context value changes and the trigger re-renders its label.
  const registerLabel = React.useCallback((itemValue: string, label: React.ReactNode) => {
    setLabels((current) =>
      current.get(itemValue) === label ? current : new Map(current).set(itemValue, label),
    );
  }, []);

  // Clicking anywhere outside closes the popup.
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, setOpen]);

  const context = React.useMemo<SelectContextValue>(
    () => ({
      open,
      setOpen,
      value,
      select,
      active,
      setActive,
      labels,
      registerLabel,
      listboxId,
      triggerRef,
      disabled,
      required,
      size,
      itemIndicator,
    }),
    [
      open,
      setOpen,
      value,
      select,
      active,
      labels,
      registerLabel,
      listboxId,
      disabled,
      required,
      size,
      itemIndicator,
    ],
  );

  return (
    <SelectContext.Provider value={context}>
      <div ref={rootRef} className="mild-select" data-state={open ? "open" : "closed"}>
        {children}
        {name && <input type="hidden" name={name} value={value ?? ""} />}
      </div>
    </SelectContext.Provider>
  );
};
SelectRoot.displayName = "SelectRoot";

// ---------------------------------------------------------------------------------------------
// Trigger: a select-only combobox button (APG "Select-Only Combobox").
// ---------------------------------------------------------------------------------------------

export interface SelectTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  className?: string;
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  /** Shown after the value. Defaults to a chevron. */
  icon?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>((props, ref) => {
  const {
    className,
    size,
    fullWidth,
    error,
    children,
    icon,
    disabled,
    onClick,
    onKeyDown,
    ...restProps
  } = props;
  const context = useSelectContext("SelectTrigger");
  const isDisabled = disabled ?? context.disabled;

  const composedRef = React.useCallback(
    (element: HTMLButtonElement | null) => {
      (context.triggerRef as { current: HTMLButtonElement | null }).current = element;
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [context.triggerRef, ref],
  );

  return (
    <button
      ref={composedRef}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={context.open}
      aria-controls={context.open ? context.listboxId : undefined}
      aria-required={context.required || undefined}
      disabled={isDisabled}
      data-state={context.open ? "open" : "closed"}
      data-placeholder={context.value === null ? "" : undefined}
      className={cn(
        selectTriggerVariants({ size: size ?? context.size, fullWidth, error }),
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setOpen(!context.open);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          context.setOpen(true);
        }
      }}
      {...restProps}
    >
      {children}
      <span
        className={cn("mild-select-icon", context.open && "mild-select-icon--open")}
        aria-hidden
        data-icon
      >
        {icon ?? <ChevronDownIcon />}
      </span>
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

/** Shows the selected item's label, or the placeholder. */
const SelectValue: React.FC<SelectValueProps> = ({ placeholder, className }) => {
  const context = useSelectContext("SelectValue");
  const label = context.value === null ? undefined : context.labels.get(context.value);
  return (
    <span
      className={cn(
        "mild-select-value",
        label === undefined && "mild-select-placeholder",
        className,
      )}
      data-placeholder={label === undefined ? "" : undefined}
    >
      {label ?? placeholder}
    </span>
  );
};
SelectValue.displayName = "SelectValue";

// ---------------------------------------------------------------------------------------------
// Content: the popup, containing the listbox driven by @mild-ui/primitives/listbox.
// ---------------------------------------------------------------------------------------------

export interface SelectContentProps {
  className?: string;
  children?: React.ReactNode;
  position?: "popper" | "item-aligned";
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const { className, children, position = "popper" } = props;
  const context = useSelectContext("SelectContent");

  const machine = useMachine(
    (element: HTMLUListElement, options) => createListbox({ element, ...options }),
    {
      value: context.value,
      selectionFollowsFocus: false,
      onChange: context.select,
      onEscape: () => {
        context.setOpen(false);
        context.triggerRef.current?.focus();
      },
      onActiveChange: context.setActive,
    },
    (instance, options) => {
      instance.refresh();
      instance.setValue(options.value);
    },
  );

  // The popup stays mounted (hidden while closed) so the items' labels are known to the trigger
  // and the listbox primitive is created once. Opening moves focus into it.
  React.useEffect(() => {
    if (context.open) machine.instance.current?.element.focus();
  }, [context.open, machine]);

  return (
    <div
      ref={ref}
      className={cn(selectContentVariants({ position }), className)}
      data-state={context.open ? "open" : "closed"}
      hidden={!context.open}
    >
      <ul
        ref={machine.ref}
        id={context.listboxId}
        role="listbox"
        className="mild-select-viewport"
        onKeyDown={(event) => {
          if (event.key === "Tab") context.setOpen(false);
        }}
      >
        {children}
      </ul>
    </div>
  );
});
SelectContent.displayName = "SelectContent";

// ---------------------------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------------------------

export interface SelectItemProps {
  className?: string;
  size?: Size;
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
  /** Shown while selected. Overrides the root's `itemIndicator`. */
  indicator?: React.ReactNode;
}

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>((props, ref) => {
  const { className, size, children, value, disabled, indicator } = props;
  const context = useSelectContext("SelectItem");
  const { registerLabel } = context;
  const selected = context.value === value;
  const highlighted = context.active === value;

  React.useEffect(() => {
    registerLabel(value, children);
  }, [registerLabel, value, children]);

  return (
    <li
      ref={ref}
      role="option"
      data-value={value}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-selected={selected ? "" : undefined}
      data-highlighted={highlighted ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(selectItemVariants({ size: size ?? context.size }), className)}
    >
      <span className="mild-select-item__indicator" aria-hidden>
        {selected ? (indicator ?? context.itemIndicator ?? <CheckIcon />) : null}
      </span>
      <span>{children}</span>
    </li>
  );
});
SelectItem.displayName = "SelectItem";

// ---------------------------------------------------------------------------------------------
// Composite
// ---------------------------------------------------------------------------------------------

export interface SelectProps extends SelectCoreProps, SelectStyleProps {
  options?: SelectOption[];
  onChange?: (value: string) => void;
  /** Shown in the trigger after the value. Defaults to a chevron. */
  icon?: React.ReactNode;
  /** Shown next to the selected item. Defaults to a check mark. */
  itemIndicator?: React.ReactNode;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {
  const {
    value,
    defaultValue,
    placeholder,
    disabled,
    required,
    name,
    id,
    options = [],
    className,
    size,
    fullWidth,
    error,
    icon,
    itemIndicator,
    onChange,
    onValueChange,
    // Not rendered; kept on the props type for API compatibility.
    variant: _variant,
    colorScheme: _colorScheme,
    ...restProps
  } = props;

  return (
    <SelectRoot
      value={value}
      defaultValue={defaultValue}
      name={name}
      disabled={disabled}
      required={required}
      size={size}
      itemIndicator={itemIndicator}
      onValueChange={(next) => {
        onChange?.(next);
        onValueChange?.(next);
      }}
    >
      <SelectTrigger
        ref={ref}
        id={id}
        fullWidth={fullWidth}
        error={error}
        className={className}
        icon={icon}
        {...restProps}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
});
Select.displayName = "Select";

export { Select, SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem };
