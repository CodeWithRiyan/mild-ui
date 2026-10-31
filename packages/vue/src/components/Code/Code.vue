<!-- packages/vue/src/components/Code/Code.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { CodeProps } from "../../types/code";

// Inline code. `block` keeps the whitespace and scrolls horizontally instead; pair it with
// `as="pre"` for a real code block.
const props = withDefaults(defineProps<CodeProps>(), {
  as: "code",
  variant: "subtle",
  size: "md",
  block: false,
});

const classes = computed(() =>
  cn(
    "mild-code",
    `mild-code--${props.variant}`,
    `mild-code--${props.size}`,
    props.block && "mild-code--block",
  ),
);
</script>

<template>
  <component :is="as" :class="classes"><slot /></component>
</template>
