"use client";

// packages/react/src/components/Tabs/Tabs.tsx
//
// Tabs. Behaviour (`aria-selected`, one tab stop, Arrow/Home/End keys, automatic or manual
// activation) comes from `@mild-ui/primitives/tabs`; this file renders and maps props.
import * as React from "react";
import { createTabs } from "@mild-ui/primitives/tabs";
import type { TabsCoreProps } from "../../types";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";

interface TabsContextValue extends Required<
  Pick<TabsCoreProps, "variant" | "size" | "orientation" | "activation">
> {
  value: string | null;
  baseId: string;
  select: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(part: string): TabsContextValue {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error(`<${part}> must be rendered inside <Tabs>.`);
  return context;
}

export const tabId = (baseId: string, value: string) => `${baseId}-tab-${value}`;
export const tabPanelId = (baseId: string, value: string) => `${baseId}-panel-${value}`;

export interface TabsProps
  extends TabsCoreProps, Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  children?: React.ReactNode;
}

/** Tabs root: owns the selected value and hands it to `TabsList`/`TabsTrigger`/`TabsContent`. */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      variant = "default",
      size = "md",
      orientation = "horizontal",
      activation = "automatic",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const baseId = React.useId();
    const isControlled = valueProp !== undefined;
    const [internal, setInternal] = React.useState<string | null>(defaultValue ?? null);
    const value = isControlled ? valueProp : internal;

    const select = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const context = React.useMemo(
      () => ({ value, baseId, select, variant, size, orientation, activation }),
      [value, baseId, select, variant, size, orientation, activation],
    );

    return (
      <TabsContext.Provider value={context}>
        <div
          ref={ref}
          data-orientation={orientation}
          className={cn(
            "mild-tabs",
            orientation === "vertical" && "mild-tabs--vertical",
            className,
          )}
          {...rest}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** The `tablist`: one tab stop, navigated with the Arrow keys. */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...rest }, ref) => {
    const { value, select, variant, size, orientation, activation } = useTabsContext("TabsList");

    const machine = useMachine(
      (element: HTMLDivElement, options) => createTabs({ element, ...options }),
      { value, orientation, activation, onChange: select },
      (instance, options) => {
        instance.refresh();
        instance.setValue(options.value);
      },
      [orientation, activation],
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
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "mild-tabs-list",
          `mild-tabs-list--${variant}`,
          `mild-tabs-list--${orientation}`,
          size !== "md" && `mild-tabs-list--${size}`,
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "type"
> {
  value: string;
  children?: React.ReactNode;
}

/** One tab (`role="tab"`). */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, className, children, ...rest }, ref) => {
    const context = useTabsContext("TabsTrigger");
    const selected = context.value === value;
    return (
      <button
        ref={ref}
        type="button"
        // The list primitive finds tabs by role and reads `data-value`; it sets aria-selected
        // and tabindex itself. These keep server markup honest.
        role="tab"
        id={tabId(context.baseId, value)}
        aria-selected={selected}
        aria-controls={tabPanelId(context.baseId, value)}
        tabIndex={selected ? 0 : -1}
        data-value={value}
        data-state={selected ? "active" : "inactive"}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        className={cn(
          "mild-tabs-trigger",
          selected && "mild-tabs-trigger--active",
          disabled && "mild-tabs-trigger--disabled",
          context.size !== "md" && `mild-tabs-trigger--${context.size}`,
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep the panel mounted (hidden) while another tab is selected. */
  forceMount?: boolean;
  children?: React.ReactNode;
}

/** One panel (`role="tabpanel"`), shown while its tab is selected. */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, forceMount = false, className, children, ...rest }, ref) => {
    const context = useTabsContext("TabsContent");
    const selected = context.value === value;
    if (!selected && !forceMount) return null;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={tabPanelId(context.baseId, value)}
        aria-labelledby={tabId(context.baseId, value)}
        hidden={!selected}
        tabIndex={0}
        data-state={selected ? "active" : "inactive"}
        className={cn(
          "mild-tabs-content",
          "mild-tabs-panel",
          context.size !== "md" && `mild-tabs-content--${context.size}`,
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = "TabsContent";
