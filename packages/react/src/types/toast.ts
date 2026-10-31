// Toast component types.
import type { AlertStatus } from "./feedback";

export type ToastStatus = AlertStatus;
export type ToastPlacement =
  "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right";

export interface ToastOptions {
  /** Stable id; generated when omitted. Re-using an id updates that toast. */
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  status?: ToastStatus;
  /** Milliseconds before the toast dismisses itself; `null` keeps it until closed. Default 5000. */
  duration?: number | null;
  /** Show the close button. Default `true`. */
  closable?: boolean;
  /** An action rendered under the text (a button, a link). */
  action?: React.ReactNode;
  /** Overrides the status icon. */
  icon?: React.ReactNode;
  /** Where the toast stacks. Default: the provider's placement. */
  placement?: ToastPlacement;
  onClose?: () => void;
}

export interface ToastData extends ToastOptions {
  id: string;
  placement: ToastPlacement;
}
