<!-- packages/vue/src/components/Card/CardTitle.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { CardTitleProps } from "../../types/data-display";

// The card's heading (an `h3` by default; pick the level with `as`).
const props = withDefaults(defineProps<CardTitleProps>(), { as: "h3", size: "md" });
const classes = computed(() =>
  cn("mild-card-title", props.size !== "md" && `mild-card-title--${props.size}`),
);
</script>

<template>
  <component :is="as" :class="classes"><slot /></component>
</template>
