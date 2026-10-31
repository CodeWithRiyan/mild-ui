"use client";

// packages/react/src/components/Toast/Toast.tsx
//
// Toast notifications. `ToastProvider` owns the queue and renders one region per placement
// through a portal; `useToast()` adds, updates and dismisses toasts; `Toast` is one
// notification. The auto-dismiss timer (paused while hovered or focused) comes from
// `@mild-ui/primitives/toast`.
import * as React from "react";
import { createPortal } from "react-dom";
import { createToastTimer } from "@mild-ui/primitives/toast";
import type { ToastData, ToastOptions, ToastPlacement, ToastStatus } from "../../types";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { useHydrated } from "../../hooks/useHydrated";
import { CloseButton } from "../CloseButton";
import { StatusIcon } from "../icons";

export interface ToastContextValue {
  /** Shows a toast and returns its id. */
  toast: (options: ToastOptions) => string;
  /** Changes an existing toast in place. */
  update: (id: string, options: Partial<ToastOptions>) => void;
  /** Removes one toast. */
  dismiss: (id: string) => void;
  /** Removes every toast. */
  dismissAll: () => void;
  /** The toasts currently shown, oldest first. */
  toasts: ToastData[];
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** The toast API of the enclosing `ToastProvider`. */
export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast() must be used inside <ToastProvider>.");
  return context;
}

const PLACEMENTS: readonly ToastPlacement[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom",
  "bottom-right",
];

export interface ToastProviderProps {
  children?: React.ReactNode;
  /** Where toasts stack by default. Default `"bottom-right"`. */
  placement?: ToastPlacement;
  /** Default auto-dismiss delay in milliseconds (`null` = never). Default `5000`. */
  duration?: number | null;
  /** Most toasts shown per placement at once; older ones are dropped. Default `5`. */
  max?: number;
  /** Accessible name of the regions. Default `"Notifications"`. */
  label?: string;
}

let nextToastId = 0;

/** Owns the toast queue and renders the stacked regions. Put it once, near the app root. */
export function ToastProvider({
  children,
  placement: defaultPlacement = "bottom-right",
  duration: defaultDuration = 5000,
  max = 5,
  label = "Notifications",
}: ToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  // The regions are portals: they mount once the page is hydrated.
  const hydrated = useHydrated();

  const dismiss = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => setToasts([]), []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? `mild-toast-${++nextToastId}`;
      const placement = options.placement ?? defaultPlacement;
      const data: ToastData = { duration: defaultDuration, ...options, id, placement };
      setToasts((current) => {
        const existing = current.findIndex((entry) => entry.id === id);
        if (existing !== -1) {
          const next = [...current];
          next[existing] = data;
          return next;
        }
        const next = [...current, data];
        // Keep at most `max` per placement, dropping the oldest.
        const same = next.filter((entry) => entry.placement === placement);
        const overflow = same.slice(0, Math.max(0, same.length - max));
        return overflow.length > 0 ? next.filter((entry) => !overflow.includes(entry)) : next;
      });
      return id;
    },
    [defaultPlacement, defaultDuration, max],
  );

  const update = React.useCallback((id: string, options: Partial<ToastOptions>) => {
    setToasts((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, ...options, id } : entry)),
    );
  }, []);

  const context = React.useMemo(
    () => ({ toast, update, dismiss, dismissAll, toasts }),
    [toast, update, dismiss, dismissAll, toasts],
  );

  const regions = PLACEMENTS.map((placement) => {
    const here = toasts.filter((entry) => entry.placement === placement);
    if (here.length === 0) return null;
    return (
      <ToastRegion key={placement} placement={placement} label={label}>
        {here.map((entry) => (
          <Toast
            key={entry.id}
            {...entry}
            onClose={() => {
              dismiss(entry.id);
              entry.onClose?.();
            }}
          />
        ))}
      </ToastRegion>
    );
  });

  return (
    <ToastContext.Provider value={context}>
      {children}
      {hydrated && createPortal(regions, document.body)}
    </ToastContext.Provider>
  );
}
ToastProvider.displayName = "ToastProvider";

export interface ToastRegionProps extends React.HTMLAttributes<HTMLDivElement> {
  placement: ToastPlacement;
  /** Accessible name. Default `"Notifications"`. */
  label?: string;
}

/** The landmark that stacks the toasts of one placement. */
export const ToastRegion = React.forwardRef<HTMLDivElement, ToastRegionProps>(
  ({ placement, label = "Notifications", className, children, ...rest }, ref) => (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      data-placement={placement}
      className={cn("mild-toast-region", `mild-toast-region--${placement}`, className)}
      {...rest}
    >
      {children}
    </div>
  ),
);
ToastRegion.displayName = "ToastRegion";

export interface ToastProps
  extends
    Omit<ToastOptions, "id" | "placement" | "title">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title?: React.ReactNode;
  /** Accessible name of the close button. Default `"Close"`. */
  closeLabel?: string;
}

/**
 * One notification. Errors and warnings are `role="alert"`, the rest `role="status"`. The
 * auto-dismiss countdown pauses while the pointer is over the toast or focus is inside it.
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      title,
      description,
      status = "info",
      duration = 5000,
      closable = true,
      action,
      icon,
      onClose,
      closeLabel = "Close",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const machine = useMachine(
      (element: HTMLDivElement, options) => createToastTimer({ element, ...options }),
      { duration, onExpire: () => onClose?.() },
      undefined,
      // A new duration restarts the countdown.
      [duration],
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
        id={id}
        role={status === "error" || status === "warning" ? "alert" : "status"}
        data-status={status}
        className={cn("mild-toast", `mild-toast--${status as ToastStatus}`, className)}
        {...rest}
      >
        {icon !== null && (
          <span className="mild-toast__icon" aria-hidden="true">
            {icon ?? <StatusIcon status={status} />}
          </span>
        )}
        <div className="mild-toast__content">
          {title !== undefined && title !== null && (
            <div className="mild-toast__title">{title}</div>
          )}
          {description !== undefined && description !== null && (
            <div className="mild-toast__description">{description}</div>
          )}
          {children}
          {action !== undefined && action !== null && (
            <div className="mild-toast__action">{action}</div>
          )}
        </div>
        {closable && (
          <CloseButton
            size="xs"
            label={closeLabel}
            className="mild-toast__close"
            onClick={onClose}
          />
        )}
      </div>
    );
  },
);
Toast.displayName = "Toast";
