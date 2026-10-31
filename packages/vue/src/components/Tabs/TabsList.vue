<!-- packages/vue/src/components/Tabs/TabsList.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createTabs } from "@mild-ui/primitives/tabs";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { useTabsContext } from "./context";

// The `tablist`: one tab stop, navigated with the Arrow keys.
const context = useTabsContext("TabsList");
const element = ref<HTMLDivElement | null>(null);

useMachine(
  element,
  (el, options) => createTabs({ element: el, ...options }),
  () => ({
    value: context.value.value,
    orientation: context.orientation.value,
    activation: context.activation.value,
    onChange: context.select,
  }),
  (instance, options) => {
    instance.refresh();
    instance.setValue(options.value);
  },
  () => [context.orientation.value, context.activation.value],
);

const classes = computed(() =>
  cn(
    "mild-tabs-list",
    `mild-tabs-list--${context.variant.value}`,
    `mild-tabs-list--${context.orientation.value}`,
    context.size.value !== "md" && `mild-tabs-list--${context.size.value}`,
  ),
);
</script>

<template>
  <div ref="element" role="tablist" :aria-orientation="context.orientation.value" :class="classes">
    <slot />
  </div>
</template>
