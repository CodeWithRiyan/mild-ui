// packages/vue/src/components/Tabs/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { TabsActivation, TabsOrientation, TabsSize, TabsVariant } from "../../types/tabs";

export interface TabsContextValue {
  value: ComputedRef<string | null>;
  baseId: string;
  select: (value: string) => void;
  variant: ComputedRef<TabsVariant>;
  size: ComputedRef<TabsSize>;
  orientation: ComputedRef<TabsOrientation>;
  activation: ComputedRef<TabsActivation>;
}

const TabsKey: InjectionKey<TabsContextValue> = Symbol("mild-ui:tabs");

export function provideTabs(context: TabsContextValue): void {
  provide(TabsKey, context);
}

export function useTabsContext(part: string): TabsContextValue {
  const context = inject(TabsKey, null);
  if (!context) throw new Error(`<${part}> must be rendered inside <Tabs>.`);
  return context;
}

export const tabId = (baseId: string, value: string) => `${baseId}-tab-${value}`;
export const tabPanelId = (baseId: string, value: string) => `${baseId}-panel-${value}`;
