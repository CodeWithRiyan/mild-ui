// packages/vue/src/components/ToggleGroup/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { ToggleSize, ToggleVariant } from "../../types/toggle";

export interface ToggleGroupContextValue {
  value: ComputedRef<string[]>;
  variant: ComputedRef<ToggleVariant>;
  size: ComputedRef<ToggleSize>;
  disabled: ComputedRef<boolean>;
}

const ToggleGroupKey: InjectionKey<ToggleGroupContextValue> = Symbol("mild-ui:toggle-group");

export function provideToggleGroup(context: ToggleGroupContextValue): void {
  provide(ToggleGroupKey, context);
}

export function useToggleGroup(): ToggleGroupContextValue {
  const context = inject(ToggleGroupKey, null);
  if (!context) throw new Error("<ToggleGroupItem> must be rendered inside <ToggleGroup>.");
  return context;
}
