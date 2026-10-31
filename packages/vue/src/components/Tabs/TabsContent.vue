<!-- packages/vue/src/components/Tabs/TabsContent.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { tabId, tabPanelId, useTabsContext } from "./context";
import type { TabsContentProps } from "../../types/tabs";

// One panel (`role="tabpanel"`), shown while its tab is selected.
const props = withDefaults(defineProps<TabsContentProps>(), { forceMount: false });

const context = useTabsContext("TabsContent");
const selected = computed(() => context.value.value === props.value);
const classes = computed(() =>
  cn(
    "mild-tabs-content",
    "mild-tabs-panel",
    context.size.value !== "md" && `mild-tabs-content--${context.size.value}`,
  ),
);
</script>

<template>
  <div
    v-if="selected || forceMount"
    :id="tabPanelId(context.baseId, value)"
    role="tabpanel"
    :aria-labelledby="tabId(context.baseId, value)"
    :hidden="!selected"
    tabindex="0"
    :data-state="selected ? 'active' : 'inactive'"
    :class="classes"
  >
    <slot />
  </div>
</template>
