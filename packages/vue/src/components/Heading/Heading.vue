<!-- packages/vue/src/components/Heading/Heading.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { HeadingProps } from "../../types/heading";

// Section heading. `level` picks both the element (`h1`..`h6`) and the default size, so the
// document outline and the visual size can be chosen independently (`<Heading :level="1"
// size="xl">`, or `as="div"` for a heading-looking label).
const props = withDefaults(defineProps<HeadingProps>(), {
  as: undefined,
  level: 2,
  size: undefined,
  weight: "semibold",
  align: undefined,
  color: undefined,
  truncate: false,
});

// The level picks the element (and the default size); `as` overrides the element only.
const element = computed(() => props.as ?? `h${props.level}`);

const classes = computed(() =>
  cn(
    "mild-heading",
    `mild-heading--level-${props.level}`,
    // An explicit size is declared after the level rules in the stylesheet, so it wins.
    props.size && `mild-heading--${props.size}`,
    `mild-heading--${props.weight}`,
    props.align && `mild-heading--${props.align}`,
    props.color && `mild-heading--${props.color}`,
    props.truncate && "mild-heading--truncate",
  ),
);
</script>

<template>
  <component :is="element" :class="classes"><slot /></component>
</template>
