<!-- packages/vue/src/components/ScrollArea/ScrollArea.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getDimensionValue } from "../../utils/styling";
import type { ScrollAreaProps } from "../../types/scroll-area";

// Scroll container with slim, themed scrollbars. Give it a `maxHeight` (or `maxWidth` for
// horizontal) so the content has something to overflow. Keyboard-focusable (`tabindex="0"`)
// so the region can be scrolled without a pointer; a caller's `tabindex` attribute still wins.
// Renders a `div`, or the element given with `as`.
const props = withDefaults(defineProps<ScrollAreaProps>(), {
  as: "div",
  orientation: "vertical",
  scrollbars: "auto",
  height: undefined,
  maxHeight: undefined,
  maxWidth: undefined,
});

const classes = computed(() =>
  cn(
    "mild-scroll-area",
    `mild-scroll-area--${props.orientation}`,
    props.scrollbars !== "auto" && `mild-scroll-area--${props.scrollbars}`,
  ),
);

const style = computed(() => {
  const result: Record<string, string> = {};
  if (props.height) result.height = getDimensionValue(props.height);
  if (props.maxHeight) result.maxHeight = getDimensionValue(props.maxHeight);
  if (props.maxWidth) result.maxWidth = getDimensionValue(props.maxWidth);
  return Object.keys(result).length > 0 ? result : undefined;
});
</script>

<template>
  <component :is="as" :class="classes" :style="style" tabindex="0"><slot /></component>
</template>
