// packages/vue/src/components/ButtonGroup/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { ButtonGroupCoreProps } from "../../types/button-group";

/** Defaults a group hands to the buttons inside it. */
export interface ButtonGroupContextValue {
  size: ComputedRef<ButtonGroupCoreProps["size"]>;
  variant: ComputedRef<ButtonGroupCoreProps["variant"]>;
  disabled: ComputedRef<boolean | undefined>;
}

const ButtonGroupKey: InjectionKey<ButtonGroupContextValue> = Symbol("mild-ui:button-group");

export function provideButtonGroup(context: ButtonGroupContextValue): void {
  provide(ButtonGroupKey, context);
}

/** The enclosing `ButtonGroup`'s defaults (`null` outside a group). */
export function useButtonGroup(): ButtonGroupContextValue | null {
  return inject(ButtonGroupKey, null);
}
