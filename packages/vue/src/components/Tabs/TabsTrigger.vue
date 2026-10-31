<!-- packages/vue/src/components/Tabs/TabsTrigger.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { tabId, tabPanelId, useTabsContext } from "./context";
import type { TabsTriggerProps } from "../../types/tabs";

// One tab (`role="tab"`). The list primitive finds tabs by role and reads `data-value`; it
// sets aria-selected and tabindex itself. The bindings keep server markup honest.
const props = withDefaults(defineProps<TabsTriggerProps>(), { disabled: false });

const context = useTabsContext("TabsTrigger");
const selected = computed(() => context.value.value === props.value);

const classes = computed(() =>
  cn(
    "mild-tabs-trigger",
    selected.value && "mild-tabs-trigger--active",
    props.disabled && "mild-tabs-trigger--disabled",
    context.size.value !== "md" && `mild-tabs-trigger--${context.size.value}`,
  ),
);
</script>

<template>
  <button
    :id="tabId(context.baseId, value)"
    type="button"
    role="tab"
    :aria-selected="selected"
    :aria-controls="tabPanelId(context.baseId, value)"
    :tabindex="selected ? 0 : -1"
    :data-value="value"
    :data-state="selected ? 'active' : 'inactive'"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </button>
</template>
