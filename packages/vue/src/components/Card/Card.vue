<!-- packages/vue/src/components/Card/Card.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { provideCard } from "./context";
import type { CardProps } from "../../types/data-display";

// Surface grouping related content. Compose with `CardHeader` (+ `CardTitle`,
// `CardDescription`), `CardBody`, `CardFooter` and `CardMedia`. Renders a `div`, or the element
// given with `as` (`article`, `section`, `a`, ...).
const props = withDefaults(defineProps<CardProps>(), {
  as: "div",
  variant: "default",
  padding: "md",
  interactive: false,
  disabled: false,
});

provideCard({ padding: computed(() => props.padding) });

const classes = computed(() =>
  cn(
    "mild-card",
    `mild-card--${props.variant}`,
    props.interactive && "mild-card--interactive",
    props.disabled && "mild-card--disabled",
  ),
);
</script>

<template>
  <component :is="as" :class="classes" :data-disabled="disabled ? '' : undefined"
    ><slot
  /></component>
</template>
