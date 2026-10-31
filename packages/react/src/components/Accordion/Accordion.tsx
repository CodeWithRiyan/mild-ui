"use client";

// packages/react/src/components/Accordion/Accordion.tsx
//
// Accordion. Behaviour (`aria-expanded`, Enter/Space/click toggling, Arrow/Home/End between the
// headers, single or multiple) comes from `@mild-ui/primitives/accordion`; this file renders
// the heading + button + region markup and maps props.
import * as React from "react";
import { createAccordion } from "@mild-ui/primitives/accordion";
import type { AccordionMultipleProps, AccordionSingleProps } from "../../types";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { ChevronDownIcon } from "../icons";

interface AccordionContextValue {
  value: string[];
  baseId: string;
  variant: NonNullable<AccordionSingleProps["variant"]>;
  size: NonNullable<AccordionSingleProps["size"]>;
  headingLevel: NonNullable<AccordionSingleProps["headingLevel"]>;
  disabled: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionContext(part: string): AccordionContextValue {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error(`<${part}> must be rendered inside <Accordion>.`);
  return context;
}

function useAccordionItemContext(part: string): AccordionItemContextValue {
  const context = React.useContext(AccordionItemContext);
  if (!context) throw new Error(`<${part}> must be rendered inside <AccordionItem>.`);
  return context;
}

type OwnProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">;

export type AccordionProps = OwnProps & (AccordionSingleProps | AccordionMultipleProps);

function toArray(value: string | string[] | null | undefined): string[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Accordion root. `type="single"` (default) opens one panel at a time, `type="multiple"` any
 * number. Compose with `AccordionItem` > `AccordionTrigger` + `AccordionContent`.
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    type = "single",
    value: valueProp,
    defaultValue,
    onValueChange,
    variant = "default",
    size = "md",
    headingLevel = 3,
    disabled = false,
    className,
    children,
    ...rest
  } = props;
  const multiple = type === "multiple";
  const collapsible = multiple ? true : ((props as AccordionSingleProps).collapsible ?? true);
  const { collapsible: _collapsible, ...domProps } = rest as typeof rest & {
    collapsible?: boolean;
  };

  const baseId = React.useId();
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState<string[]>(() => toArray(defaultValue));
  const value = isControlled ? toArray(valueProp) : internal;

  const machine = useMachine(
    (element: HTMLDivElement, options) => createAccordion({ element, ...options }),
    {
      multiple,
      collapsible,
      value,
      onChange: (next: string[]) => {
        if (!isControlled) setInternal(next);
        if (multiple) (onValueChange as AccordionMultipleProps["onValueChange"])?.(next);
        else (onValueChange as AccordionSingleProps["onValueChange"])?.(next[0] ?? null);
      },
    },
    (instance, options) => {
      instance.refresh();
      instance.setValue(options.value);
    },
    [multiple, collapsible],
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
    () => ({ value, baseId, variant, size, headingLevel, disabled }),
    [value, baseId, variant, size, headingLevel, disabled],
  );

  return (
    <AccordionContext.Provider value={context}>
      <div
        ref={composedRef}
        data-type={type}
        className={cn(
          "mild-accordion",
          `mild-accordion--${variant}`,
          `mild-accordion--${type}`,
          size !== "md" && `mild-accordion--${size}`,
          className,
        )}
        {...domProps}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

/** One header + panel pair. */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled: itemDisabled = false, className, children, ...rest }, ref) => {
    const accordion = useAccordionContext("AccordionItem");
    const open = accordion.value.includes(value);
    const disabled = accordion.disabled || itemDisabled;
    const context = React.useMemo(
      () => ({
        value,
        open,
        disabled,
        triggerId: `${accordion.baseId}-trigger-${value}`,
        contentId: `${accordion.baseId}-content-${value}`,
      }),
      [value, open, disabled, accordion.baseId],
    );

    return (
      <AccordionItemContext.Provider value={context}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cn("mild-accordion-item", className)}
          {...rest}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  /** Replaces the chevron; `null` removes it. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/** The item's header: a heading wrapping a button with `aria-expanded` / `aria-controls`. */
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ icon, className, children, ...rest }, ref) => {
    const accordion = useAccordionContext("AccordionTrigger");
    const item = useAccordionItemContext("AccordionTrigger");
    const Heading = `h${accordion.headingLevel}` as "h3";
    const state = item.open ? "open" : "closed";
    return (
      <Heading className="mild-accordion-header" data-state={state}>
        <button
          ref={ref}
          type="button"
          id={item.triggerId}
          // The accordion primitive finds headers by `aria-expanded` and reads `data-value`.
          aria-expanded={item.open}
          aria-controls={item.contentId}
          data-value={item.value}
          data-state={state}
          data-disabled={item.disabled ? "" : undefined}
          disabled={item.disabled}
          className={cn(
            "mild-accordion-trigger",
            item.disabled && "mild-accordion-trigger--disabled",
            accordion.size !== "md" && `mild-accordion-trigger--${accordion.size}`,
            className,
          )}
          {...rest}
        >
          <span className="mild-accordion-trigger-content">{children}</span>
          {icon !== null && (
            <span className="mild-accordion-trigger-icon" data-state={state} aria-hidden="true">
              {icon ?? <ChevronDownIcon />}
            </span>
          )}
        </button>
      </Heading>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Keep the panel in the DOM (hidden) while closed. Default `true`. */
  forceMount?: boolean;
  children?: React.ReactNode;
}

/** The item's panel (`role="region"`, named by its header). */
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ forceMount = true, className, children, ...rest }, ref) => {
    const accordion = useAccordionContext("AccordionContent");
    const item = useAccordionItemContext("AccordionContent");
    if (!item.open && !forceMount) return null;
    return (
      <div
        ref={ref}
        role="region"
        id={item.contentId}
        aria-labelledby={item.triggerId}
        hidden={!item.open}
        data-state={item.open ? "open" : "closed"}
        className={cn("mild-accordion-content", className)}
        {...rest}
      >
        <div
          className={cn(
            "mild-accordion-content-inner",
            accordion.size !== "md" && `mild-accordion-content-inner--${accordion.size}`,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";
