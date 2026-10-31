// packages/vue/src/types/toast.ts
import type { VNodeChild } from "vue";
import type { AlertStatus } from "./feedback";

export type ToastStatus = AlertStatus;
export type ToastPlacement =
  "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right";

export interface ToastOptions {
  /** Stable id; generated when omitted. Re-using an id updates that toast. */
  id?: string;
  title?: string;
  description?: string;
  status?: ToastStatus;
  /** Milliseconds before the toast dismisses itself; `null` keeps it until closed. Default 5000. */
  duration?: number | null;
  /** Show the close button. Default `true`. */
  closable?: boolean;
  /** Renders an action under the text (a button, a link). */
  action?: () => VNodeChild;
  /** Renders a glyph instead of the status icon. */
  icon?: () => VNodeChild;
  /** Where the toast stacks. Default: the provider's placement. */
  placement?: ToastPlacement;
  onClose?: () => void;
}

export interface ToastData extends ToastOptions {
  id: string;
  placement: ToastPlacement;
}

export interface ToastProviderProps {
  /** Where toasts stack by default. Default `"bottom-right"`. */
  placement?: ToastPlacement;
  /** Default auto-dismiss delay in milliseconds (`null` = never). Default `5000`. */
  duration?: number | null;
  /** Most toasts shown per placement at once; older ones are dropped. Default `5`. */
  max?: number;
  /** Accessible name of the regions. Default `"Notifications"`. */
  label?: string;
}

export interface ToastRegionProps {
  placement: ToastPlacement;
  /** Accessible name. Default `"Notifications"`. */
  label?: string;
}

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  status?: ToastStatus;
  duration?: number | null;
  closable?: boolean;
  /** Drop the status glyph. */
  noIcon?: boolean;
  /** Accessible name of the close button. Default `"Close"`. */
  closeLabel?: string;
}
