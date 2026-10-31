// packages/vue/src/components/Tag/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";

export interface TagContextValue {
  disabled: ComputedRef<boolean>;
}

const TagKey: InjectionKey<TagContextValue> = Symbol("mild-ui:tag");

export function provideTag(context: TagContextValue): void {
  provide(TagKey, context);
}

export function useTag(): TagContextValue | null {
  return inject(TagKey, null);
}
