<!-- packages/vue/src/components/Container/Container.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getSpacingValue } from "../../utils/styling";
import type { ContainerProps } from "../../types/container";

// Horizontally centered wrapper with a max-width from the breakpoint scale (`size`) and
// horizontal padding. Renders a `div`, or the element given with `as` (`main`, `section`, ...).
const props = withDefaults(defineProps<ContainerProps>(), {
  as: "div",
  size: "lg",
  padding: undefined,
  centerContent: false,
});

const classes = computed(() =>
  cn(
    "mild-container",
    `mild-container--${props.size}`,
    props.centerContent && "mild-container--center-content",
  ),
);

const style = computed(() =>
  props.padding
    ? { paddingLeft: getSpacingValue(props.padding), paddingRight: getSpacingValue(props.padding) }
    : undefined,
);
</script>

<template>
  <component :is="as" :class="classes" :style="style"><slot /></component>
</template>
