"use client";

// packages/react/src/components/Collapsible/Collapsible.tsx
import * as React from "react";
import type { CollapsibleCoreProps } from "../../types";
import { cn } from "../../utils";
import { ChevronDownIcon } from "../icons";

interface CollapsibleContextValue {
  open: boolean;
  disabled: boolean;
  contentId: string;
  toggle: () => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(part: string): CollapsibleContextValue {
  const context = React.useContext(CollapsibleContext);
  if (!context) throw new Error(`<${part}> must be rendered inside <Collapsible>.`);
  return context;
}

export interface CollapsibleProps
  extends CollapsibleCoreProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * A single disclosure: a `CollapsibleTrigger` (button with `aria-expanded` / `aria-controls`)
 * that shows or hides a `CollapsibleContent`. Controlled through `open` + `onOpenChange`, or
 * uncontrolled with `defaultOpen`.
 */
export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const contentId = React.useId();
    const isControlled = openProp !== undefined;
    const [internal, setInternal] = React.useState(defaultOpen);
    const open = isControlled ? openProp : internal;

    const toggle = React.useCallback(() => {
      if (disabled) return;
      const next = !open;
      if (!isControlled) setInternal(next);
      onOpenChange?.(next);
    }, [disabled, open, isControlled, onOpenChange]);

    const context = React.useMemo(
      () => ({ open, disabled, contentId: `${contentId}-content`, toggle }),
      [open, disabled, contentId, toggle],
    );

    return (
      <CollapsibleContext.Provider value={context}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cn("mild-collapsible", className)}
          {...rest}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);
Collapsible.displayName = "Collapsible";

export interface CollapsibleTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  /** Replaces the chevron; `null` removes it. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ icon, className, children, onClick, ...rest }, ref) => {
    const { open, disabled, contentId, toggle } = useCollapsibleContext("CollapsibleTrigger");
    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        data-state={open ? "open" : "closed"}
        disabled={disabled}
        className={cn("mild-collapsible-trigger", className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle();
        }}
        {...rest}
      >
        {children}
        {icon !== null && (
          <span className="mild-collapsible-trigger__icon" aria-hidden="true">
            {icon ?? <ChevronDownIcon />}
          </span>
        )}
      </button>
    );
  },
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Keep the content in the DOM (hidden) while closed. Default `true`. */
  forceMount?: boolean;
  children?: React.ReactNode;
}

export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ forceMount = true, className, children, ...rest }, ref) => {
    const { open, contentId } = useCollapsibleContext("CollapsibleContent");
    if (!open && !forceMount) return null;
    return (
      <div
        ref={ref}
        id={contentId}
        hidden={!open}
        data-state={open ? "open" : "closed"}
        className={cn("mild-collapsible-content", className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
CollapsibleContent.displayName = "CollapsibleContent";
