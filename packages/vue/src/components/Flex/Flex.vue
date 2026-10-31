<!-- packages/vue/src/components/Flex/Flex.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getSpacingValue } from "../../utils/styling";
import { flexModifierClasses } from "../../utils/layout";
import type { FlexProps } from "../../types/flex";

// General-purpose flex container (a row by default). Renders a `div`, or the element given
// with `as`.
const props = withDefaults(defineProps<FlexProps>(), {
  as: "div",
  direction: "row",
  wrap: undefined,
  align: undefined,
  justify: undefined,
  gap: undefined,
  inline: false,
});

const classes = computed(() =>
  cn(
    "mild-flex",
    props.inline && "mild-flex--inline",
    ...flexModifierClasses("flex", {
      direction: props.direction,
      wrap: props.wrap,
      align: props.align,
      justify: props.justify,
    }),
  ),
);

const style = computed(() => (props.gap ? { gap: getSpacingValue(props.gap) } : undefined));
</script>

<template>
  <component :is="as" :class="classes" :style="style"><slot /></component>
</template>
