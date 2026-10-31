"use client";

// packages/react/src/components/Tooltip/Tooltip.tsx
import * as React from "react";
import { createTooltip } from "@mild-ui/primitives/tooltip";
import type { TooltipCoreProps } from "../../types";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";

export interface TooltipProps extends TooltipCoreProps {
  /** The single element the tooltip describes. It must forward its ref (buttons, links, ...). */
  children: React.ReactElement;
  /** Class of the tooltip bubble. */
  className?: string;
  /** Id of the tooltip element. */
  id?: string;
}

/** The ref a consumer put on the child element (a prop in React 19, `element.ref` before). */
function getElementRef(element: React.ReactElement): React.Ref<unknown> | null {
  const isReact19 = Number(React.version.split(".")[0]) >= 19;
  if (isReact19) return (element.props as { ref?: React.Ref<unknown> }).ref ?? null;
  return (element as { ref?: React.Ref<unknown> }).ref ?? null;
}

function assignRef<T>(ref: React.Ref<T> | null | undefined, value: T | null): void {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

/**
 * Describes its child with a small bubble (`role="tooltip"`, linked through
 * `aria-describedby`). Shows on hover after a delay and on keyboard focus at once; hides on
 * leave, blur or Escape. The bubble stays in the DOM so the description is always available.
 */
export function Tooltip({
  label,
  placement = "top",
  openDelay = 300,
  closeDelay = 100,
  disabled = false,
  multiline = false,
  children,
  className,
  id,
}: TooltipProps): React.ReactElement {
  const generatedId = React.useId();
  const tooltipId = id ?? `${generatedId}-tooltip`;
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  // The machine is bound to the bubble (rendered after the child, so the trigger ref is set).
  const machine = useMachine(
    (tooltip: HTMLElement, options) =>
      createTooltip({ trigger: triggerRef.current ?? tooltip, tooltip, ...options }),
    { openDelay, closeDelay, onOpenChange: setOpen },
    (instance, _options) => instance.setOpen(open),
    [openDelay, closeDelay],
  );

  const child = React.Children.only(children);
  const childRef = getElementRef(child);
  const composedChildRef = React.useCallback(
    (element: HTMLElement | null) => {
      triggerRef.current = element;
      assignRef(childRef, element);
    },
    [childRef],
  );

  if (disabled) return child;

  return (
    <span className="mild-tooltip-anchor">
      {React.cloneElement(child, { ref: composedChildRef } as React.Attributes)}
      <span
        ref={machine.ref}
        id={tooltipId}
        role="tooltip"
        hidden={!open}
        data-state={open ? "open" : "closed"}
        data-placement={placement}
        className={cn(
          "mild-tooltip",
          `mild-tooltip--${placement}`,
          multiline && "mild-tooltip--multiline",
          className,
        )}
      >
        {label}
      </span>
    </span>
  );
}
Tooltip.displayName = "Tooltip";
