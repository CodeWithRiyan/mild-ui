// packages/vue/src/components/Radio/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";

export interface RadioGroupContextValue {
  value: ComputedRef<string | null>;
  disabled: ComputedRef<boolean>;
  required: ComputedRef<boolean>;
}

const RadioGroupKey: InjectionKey<RadioGroupContextValue> = Symbol("mild-ui:radio-group");

export function provideRadioGroup(context: RadioGroupContextValue): void {
  provide(RadioGroupKey, context);
}

/** The enclosing group, or `null` when an item is rendered on its own. */
export function useRadioGroup(): RadioGroupContextValue | null {
  return inject(RadioGroupKey, null);
}
