// packages/vue/src/components/Select/context.ts
import { inject, provide, type ComputedRef, type InjectionKey, type Ref, type Slot } from "vue";
import type { Size } from "../../types";

export interface SelectContextValue {
  open: ComputedRef<boolean>;
  setOpen: (open: boolean) => void;
  value: ComputedRef<string | null>;
  select: (value: string) => void;
  active: Ref<string | null>;
  setActive: (value: string | null) => void;
  /** Item value -> the item's label slot, so the trigger can show the selected label. */
  labels: Map<string, Slot | undefined>;
  registerLabel: (value: string, label: Slot | undefined) => void;
  listboxId: string;
  triggerRef: Ref<HTMLButtonElement | null>;
  disabled: ComputedRef<boolean>;
  required: ComputedRef<boolean>;
  size: ComputedRef<Size | undefined>;
  /** Shown next to the selected item unless the item overrides it. */
  itemIndicator: ComputedRef<Slot | undefined>;
}

const SelectKey: InjectionKey<SelectContextValue> = Symbol("mild-ui:select");

export function provideSelect(context: SelectContextValue): void {
  provide(SelectKey, context);
}

export function useSelectContext(part: string): SelectContextValue {
  const context = inject(SelectKey, null);
  if (!context) throw new Error(`<${part}> must be used inside <Select> or <SelectRoot>`);
  return context;
}
