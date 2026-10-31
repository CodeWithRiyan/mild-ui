// packages/vue/src/components/Collapsible/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";

export interface CollapsibleContextValue {
  open: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  contentId: string;
  toggle: () => void;
}

const CollapsibleKey: InjectionKey<CollapsibleContextValue> = Symbol("mild-ui:collapsible");

export function provideCollapsible(context: CollapsibleContextValue): void {
  provide(CollapsibleKey, context);
}

export function useCollapsibleContext(part: string): CollapsibleContextValue {
  const context = inject(CollapsibleKey, null);
  if (!context) throw new Error(`<${part}> must be rendered inside <Collapsible>.`);
  return context;
}
