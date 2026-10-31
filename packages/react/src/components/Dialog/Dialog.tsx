"use client";

// packages/react/src/components/Dialog/Dialog.tsx
//
// Modal dialog. Behaviour (focus trap, Escape, return focus to the trigger, scroll lock, one
// dialog closing at a time when nested) comes from `@mild-ui/primitives/dialog`; this file
// renders the overlay + panel through a portal and maps props.
import * as React from "react";
import { createPortal } from "react-dom";
import { createDialog } from "@mild-ui/primitives/dialog";
import type { DialogCoreProps, DialogRole } from "../../types";
import { cn } from "../../utils";
import { useMachine } from "../../hooks/useMachine";
import { useHydrated, useIsomorphicLayoutEffect } from "../../hooks/useHydrated";
import { CloseButton, type CloseButtonProps } from "../CloseButton";

interface DialogContextValue extends Required<Pick<DialogCoreProps, "size" | "closeOnEscape">> {
  role: DialogRole;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  setHasTitle: (has: boolean) => void;
  setHasDescription: (has: boolean) => void;
  initialFocusRef?: DialogCoreProps["initialFocusRef"];
  finalFocusRef?: DialogCoreProps["finalFocusRef"];
  close: () => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext(part: string): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error(`<${part}> must be rendered inside <Dialog> or <AlertDialog>.`);
  return context;
}

export interface DialogProps extends DialogCoreProps {
  /** `"dialog"` (default) or `"alertdialog"` (see `AlertDialog`). */
  role?: DialogRole;
  children?: React.ReactNode;
  /** Class of the overlay. */
  className?: string;
}

/**
 * Modal dialog root. Controlled through `open` + `onOpenChange`. While open it renders its
 * children in a portal under an overlay, traps focus, locks the page scroll, closes on Escape
 * (and on the overlay) and returns focus to the trigger when it closes. Dialogs may nest:
 * Escape closes the topmost one only.
 */
export function Dialog({
  open,
  onOpenChange,
  role = "dialog",
  size = "md",
  closeOnOverlayClick = role !== "alertdialog",
  closeOnEscape = true,
  initialFocusRef,
  finalFocusRef,
  blurOverlay = false,
  children,
  className,
}: DialogProps): React.ReactElement | null {
  const baseId = React.useId();
  // Portals cannot be server-rendered: the dialog mounts once the page is hydrated.
  const hydrated = useHydrated();
  const [hasTitle, setHasTitle] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);
  const close = React.useCallback(() => onOpenChange?.(false), [onOpenChange]);

  const context = React.useMemo<DialogContextValue>(
    () => ({
      role,
      size,
      closeOnEscape,
      titleId: `${baseId}-title`,
      descriptionId: `${baseId}-description`,
      hasTitle,
      hasDescription,
      setHasTitle,
      setHasDescription,
      initialFocusRef,
      finalFocusRef,
      close,
    }),
    [
      role,
      size,
      closeOnEscape,
      baseId,
      hasTitle,
      hasDescription,
      initialFocusRef,
      finalFocusRef,
      close,
    ],
  );

  if (!open || !hydrated) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only a click on the overlay itself (not inside the panel) closes.
    if (closeOnOverlayClick && event.target === event.currentTarget) close();
  };

  return createPortal(
    <DialogContext.Provider value={context}>
      {/* The overlay is a backdrop; the dialog panel inside handles the keyboard. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={cn("mild-modal-overlay", blurOverlay && "mild-modal-overlay--blur", className)}
        data-dialog-overlay=""
        onClick={handleOverlayClick}
      >
        {children}
      </div>
    </DialogContext.Provider>,
    document.body,
  );
}
Dialog.displayName = "Dialog";

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** The dialog panel: `role="dialog"` / `"alertdialog"`, named by `DialogTitle`. */
export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...rest }, ref) => {
    const context = useDialogContext("DialogContent");
    const { close, closeOnEscape, initialFocusRef, finalFocusRef } = context;

    const machine = useMachine(
      (element: HTMLDivElement, options) =>
        createDialog({
          element,
          ...options,
          // Read when the panel mounts, so the refs point at rendered elements.
          initialFocus: initialFocusRef?.current ?? undefined,
          returnFocus: finalFocusRef?.current ?? true,
        }),
      { onClose: close, closeOnEscape, modal: true },
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
        role={context.role}
        aria-labelledby={context.hasTitle ? context.titleId : undefined}
        aria-describedby={context.hasDescription ? context.descriptionId : undefined}
        className={cn(
          "mild-modal-content",
          `mild-modal-content--${context.size}`,
          context.role === "alertdialog" && "mild-modal-content--alert",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Drop the divider under the header. */
  noBorder?: boolean;
}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ noBorder = false, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("mild-modal-header", noBorder && "mild-modal-header--no-border", className)}
      {...rest}
    />
  ),
);
DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/** The dialog's accessible name (`aria-labelledby`). */
export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...rest }, ref) => {
    const { titleId, setHasTitle } = useDialogContext("DialogTitle");
    useIsomorphicLayoutEffect(() => {
      setHasTitle(true);
      return () => setHasTitle(false);
    }, [setHasTitle]);
    return (
      <h2 ref={ref} id={titleId} className={cn("mild-modal-title", className)} {...rest}>
        {children}
      </h2>
    );
  },
);
DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/** The dialog's accessible description (`aria-describedby`). */
export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...rest }, ref) => {
    const { descriptionId, setHasDescription } = useDialogContext("DialogDescription");
    useIsomorphicLayoutEffect(() => {
      setHasDescription(true);
      return () => setHasDescription(false);
    }, [setHasDescription]);
    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn("mild-modal-description", className)}
        {...rest}
      />
    );
  },
);
DialogDescription.displayName = "DialogDescription";

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ noPadding = false, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("mild-modal-body", noPadding && "mild-modal-body--no-padding", className)}
      {...rest}
    />
  ),
);
DialogBody.displayName = "DialogBody";

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal alignment of the actions. Default end. */
  align?: "start" | "center" | "end" | "between";
  noBorder?: boolean;
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ align = "end", noBorder = false, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mild-modal-footer",
        align !== "end" && `mild-modal-footer--${align}`,
        noBorder && "mild-modal-footer--no-border",
        className,
      )}
      {...rest}
    />
  ),
);
DialogFooter.displayName = "DialogFooter";

export type DialogCloseButtonProps = Omit<CloseButtonProps, "onClick">;

/** A `CloseButton` that closes the dialog. */
export const DialogCloseButton = React.forwardRef<HTMLButtonElement, DialogCloseButtonProps>(
  ({ className, size = "sm", ...rest }, ref) => {
    const { close } = useDialogContext("DialogCloseButton");
    return (
      <CloseButton
        ref={ref}
        size={size}
        className={cn("mild-modal-close", className)}
        onClick={close}
        {...rest}
      />
    );
  },
);
DialogCloseButton.displayName = "DialogCloseButton";
