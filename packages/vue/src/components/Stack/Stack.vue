<!-- packages/vue/src/components/Stack/Stack.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getSpacingValue } from "../../utils/styling";
import { flexModifierClasses } from "../../utils/layout";
import type { StackProps } from "../../types/stack";

// Spaces its children along one axis (a column by default) with a gap from the spacing scale.
// Renders a `div`, or the element given with `as`.
const props = withDefaults(defineProps<StackProps>(), {
  as: "div",
  direction: "column",
  gap: "4",
  align: undefined,
  justify: undefined,
  wrap: undefined,
  inline: false,
});

const classes = computed(() =>
  cn(
    "mild-stack",
    props.inline && "mild-stack--inline",
    ...flexModifierClasses("stack", {
      direction: props.direction,
      wrap: props.wrap,
      align: props.align,
      justify: props.justify,
    }),
  ),
);

const style = computed(() => ({ gap: getSpacingValue(props.gap) }));
</script>

<template>
  <component :is="as" :class="classes" :style="style"><slot /></component>
</template>
