<!-- packages/vue/src/components/Badge/Badge.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { BadgeProps } from "../../types/data-display";

// Small inline status label ("NEW", "BETA", a count). Static text: it has no role of its own.
const props = withDefaults(defineProps<BadgeProps>(), {
  as: "span",
  variant: "subtle",
  colorScheme: "gray",
  size: "md",
  pill: false,
  dot: false,
});

const classes = computed(() =>
  cn(
    "mild-badge",
    `mild-badge--${props.variant}`,
    `mild-badge--${props.colorScheme}`,
    `mild-badge--${props.size}`,
    props.pill && "mild-badge--pill",
  ),
);
</script>

<template>
  <component :is="as" :class="classes">
    <span v-if="dot" class="mild-badge__dot" aria-hidden="true" />
    <slot />
  </component>
</template>
