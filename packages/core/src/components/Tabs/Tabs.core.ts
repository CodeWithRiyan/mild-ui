// packages/core/src/components/Tabs/Tabs.core.ts
import { TabsStyleProps } from "./Tabs.types";
import {
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} from "./Tabs.styles";
import { cn } from "../../utils/cn";

export function getTabsListProps(
  props: TabsStyleProps & { className?: string },
) {
  const { variant = "default", size = "md", className } = props;

  return {
    className: cn(tabsListVariants({ variant, size }), className),
    variant,
    size,
  };
}

export function getTabsTriggerProps(
  props: TabsStyleProps & { className?: string },
) {
  const { variant = "default", size = "md", className } = props;

  return {
    className: cn(tabsTriggerVariants({ variant, size }), className),
    variant,
    size,
  };
}

export function getTabsContentProps(
  props: TabsStyleProps & { className?: string },
) {
  const { size = "md", className } = props;

  return {
    className: cn(tabsContentVariants({ size }), className),
    size,
  };
}
