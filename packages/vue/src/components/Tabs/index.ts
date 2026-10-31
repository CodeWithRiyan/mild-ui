export { default as Tabs } from "./Tabs.vue";
export { default as TabsList } from "./TabsList.vue";
export { default as TabsTrigger } from "./TabsTrigger.vue";
export { default as TabsContent } from "./TabsContent.vue";
export { useTabsContext, tabId, tabPanelId } from "./context";
export type { TabsContextValue } from "./context";
export type {
  TabsProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsVariant,
  TabsSize,
  TabsOrientation,
  TabsActivation,
} from "../../types/tabs";
