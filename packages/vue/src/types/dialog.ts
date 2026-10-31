// packages/vue/src/types/dialog.ts
// Dialog / AlertDialog component types.

export type DialogSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type DialogRole = "dialog" | "alertdialog";

/** An element, or a getter for one (so a template ref can be read when the dialog opens). */
export type FocusTarget = HTMLElement | null | undefined | (() => HTMLElement | null | undefined);

export interface DialogCoreProps {
  /** Whether the dialog is shown (`v-model:open`). */
  open: boolean;
  size?: DialogSize;
  /** Close when the overlay is clicked. Default `true` for a dialog, `false` for an alert dialog. */
  closeOnOverlayClick?: boolean;
  /** Close on Escape. Default `true`. */
  closeOnEscape?: boolean;
  /** Element to focus on open; defaults to the first tabbable element in the dialog. */
  initialFocus?: FocusTarget;
  /** Element to focus on close; defaults to the element focused before the dialog opened. */
  finalFocus?: FocusTarget;
  /** Blur the page behind the overlay. */
  blurOverlay?: boolean;
}

export interface DialogProps extends DialogCoreProps {
  /** `"dialog"` (default) or `"alertdialog"` (see `AlertDialog`). */
  role?: DialogRole;
}

export interface AlertDialogProps extends Omit<DialogCoreProps, "initialFocus"> {
  /**
   * The least destructive action (usually "Cancel"), focused when the dialog opens so that
   * an accidental Enter does not confirm.
   */
  leastDestructive?: FocusTarget;
}

export interface DialogHeaderProps {
  /** Drop the divider under the header. */
  noBorder?: boolean;
}

export interface DialogBodyProps {
  noPadding?: boolean;
}

export interface DialogFooterProps {
  /** Horizontal alignment of the actions. Default end. */
  align?: "start" | "center" | "end" | "between";
  noBorder?: boolean;
}
