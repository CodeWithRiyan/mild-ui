// Dialog / AlertDialog component types.

export type DialogSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type DialogRole = "dialog" | "alertdialog";

export interface DialogCoreProps {
  /** Whether the dialog is shown (controlled). */
  open: boolean;
  /** Called when the user asks to close it (Escape, the overlay, a close button). */
  onOpenChange?: (open: boolean) => void;
  size?: DialogSize;
  /** Close when the overlay is clicked. Default `true` for a dialog, `false` for an alert dialog. */
  closeOnOverlayClick?: boolean;
  /** Close on Escape. Default `true`. */
  closeOnEscape?: boolean;
  /** Element to focus on open; defaults to the first tabbable element in the dialog. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Element to focus on close; defaults to the element focused before the dialog opened. */
  finalFocusRef?: React.RefObject<HTMLElement | null>;
  /** Blur the page behind the overlay. */
  blurOverlay?: boolean;
}
