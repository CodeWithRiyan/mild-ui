// packages/vue/src/components/Toast/context.ts
import { inject, provide, type InjectionKey, type Ref } from "vue";
import type { ToastData, ToastOptions } from "../../types/toast";

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
  toasts: Readonly<Ref<readonly ToastData[]>>;
}

const ToastKey: InjectionKey<ToastContextValue> = Symbol("mild-ui:toast");

export function provideToast(context: ToastContextValue): void {
  provide(ToastKey, context);
}

/** The toast API of the enclosing `ToastProvider`. */
export function useToast(): ToastContextValue {
  const context = inject(ToastKey, null);
  if (!context) throw new Error("useToast() must be used inside <ToastProvider>.");
  return context;
}
