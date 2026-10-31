// packages/vue/src/components/Dialog/context.ts
import { inject, provide, type ComputedRef, type InjectionKey, type Ref } from "vue";
import type { DialogRole, DialogSize, FocusTarget } from "../../types/dialog";

export interface DialogContextValue {
  role: ComputedRef<DialogRole>;
  size: ComputedRef<DialogSize>;
  closeOnEscape: ComputedRef<boolean>;
  titleId: string;
  descriptionId: string;
  hasTitle: Ref<boolean>;
  hasDescription: Ref<boolean>;
  initialFocus: ComputedRef<FocusTarget>;
  finalFocus: ComputedRef<FocusTarget>;
  close: () => void;
}

const DialogKey: InjectionKey<DialogContextValue> = Symbol("mild-ui:dialog");

export function provideDialog(context: DialogContextValue): void {
  provide(DialogKey, context);
}

export function useDialogContext(part: string): DialogContextValue {
  const context = inject(DialogKey, null);
  if (!context) throw new Error(`<${part}> must be rendered inside <Dialog> or <AlertDialog>.`);
  return context;
}

/** Reads a `FocusTarget` (an element or a getter) when the dialog opens. */
export function resolveFocusTarget(target: FocusTarget): HTMLElement | null {
  const resolved = typeof target === "function" ? target() : target;
  return resolved ?? null;
}
