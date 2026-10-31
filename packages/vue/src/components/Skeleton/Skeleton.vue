<!-- packages/vue/src/components/Skeleton/Skeleton.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getDimensionValue } from "../../utils/styling";
import type { SkeletonProps } from "../../types/feedback";

// Placeholder shape shown while content loads. Hidden from assistive technology (the
// surrounding region should announce loading, e.g. with `aria-busy`); renders the default slot
// once `loaded`.
const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: "rect",
  animation: "pulse",
  width: undefined,
  height: undefined,
  loaded: false,
});

const classes = computed(() =>
  cn("mild-skeleton", `mild-skeleton--${props.variant}`, `mild-skeleton--${props.animation}`),
);

const style = computed(() => {
  const result: Record<string, string> = {};
  if (props.width) result.width = getDimensionValue(props.width);
  if (props.height) result.height = getDimensionValue(props.height);
  return Object.keys(result).length > 0 ? result : undefined;
});
</script>

<template>
  <slot v-if="loaded" />
  <div v-else aria-hidden="true" data-loading="" :class="classes" :style="style"><slot /></div>
</template>
