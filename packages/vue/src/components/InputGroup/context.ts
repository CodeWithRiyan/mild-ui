// packages/vue/src/components/InputGroup/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { InputGroupCoreProps } from "../../types/input-group";

/** What a group hands to the input inside it. */
export interface InputGroupContextValue {
  size: ComputedRef<InputGroupCoreProps["size"]>;
  /** Field wiring (`id`, `name`, `required`) a <FormControl> put on the group, for the input. */
  id: ComputedRef<string | undefined>;
  name: ComputedRef<string | undefined>;
  required: ComputedRef<boolean | undefined>;
}

const InputGroupKey: InjectionKey<InputGroupContextValue> = Symbol("mild-ui:input-group");

export function provideInputGroup(context: InputGroupContextValue): void {
  provide(InputGroupKey, context);
}

/** The enclosing `InputGroup`'s defaults (`null` outside a group). */
export function useInputGroup(): InputGroupContextValue | null {
  return inject(InputGroupKey, null);
}
