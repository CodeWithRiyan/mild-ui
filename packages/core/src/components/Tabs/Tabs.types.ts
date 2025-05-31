// packages/core/src/components/Tabs/Tabs.types.ts
export interface TabsCoreProps {
    value?: string;
    defaultValue?: string;
    orientation?: "horizontal" | "vertical";
    className?: string;
  }
  
  export type TabsSize = "sm" | "md" | "lg";
  export type TabsVariant = "default" | "pills" | "underline";
  
  export interface TabsStyleProps {
    size?: TabsSize;
    variant?: TabsVariant;
  }
  
  export interface TabsListCoreProps {
    className?: string;
  }
  
  export interface TabsListStyleProps {
    size?: TabsSize;
    variant?: TabsVariant;
    orientation?: "horizontal" | "vertical";
  }
  
  export interface TabsTriggerCoreProps {
    value: string;
    disabled?: boolean;
    className?: string;
  }
  
  export interface TabsTriggerStyleProps {
    size?: TabsSize;
    variant?: TabsVariant;
  }
  
  export interface TabsContentCoreProps {
    value: string;
    className?: string;
  }
  
  export interface TabsContentStyleProps {
    size?: TabsSize;
  }