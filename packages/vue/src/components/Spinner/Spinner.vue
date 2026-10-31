<!-- packages/vue/src/components/Spinner/Spinner.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { SpinnerProps } from "../../types/feedback";

// Indeterminate loading indicator. Announced through a visually hidden `label`
// (`role="status"`), so the animation itself stays decorative.
const props = withDefaults(defineProps<SpinnerProps>(), {
  size: "md",
  variant: "border",
  speed: "normal",
  label: "Loading...",
});

const classes = computed(() =>
  cn(
    "mild-spinner",
    `mild-spinner--${props.variant}`,
    `mild-spinner--${props.size}`,
    `mild-spinner--${props.speed}`,
  ),
);
</script>

<template>
  <span role="status" :class="classes"
    ><span class="mild-spinner__label">{{ label }}</span></span
  >
</template>
