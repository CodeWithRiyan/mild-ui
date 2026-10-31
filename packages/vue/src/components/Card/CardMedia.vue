<!-- packages/vue/src/components/Card/CardMedia.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { CardMediaProps } from "../../types/data-display";

// A full-width image at the top (or bottom) of the card.
const props = withDefaults(defineProps<CardMediaProps>(), {
  src: undefined,
  alt: "",
  position: "top",
  fit: "cover",
});
const classes = computed(() =>
  cn(
    "mild-card-media",
    `mild-card-media--rounded-${props.position}`,
    `mild-card-media--${props.fit}`,
  ),
);
</script>

<template>
  <img :src="src" :alt="alt" :class="classes" />
</template>
