<!-- packages/vue/src/components/Card/CardFooter.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { paddingClass, useCardPadding } from "./context";
import type { CardFooterProps } from "../../types/data-display";

const props = withDefaults(defineProps<CardFooterProps>(), {
  padding: undefined,
  align: undefined,
  noBorder: false,
});
const padding = useCardPadding(() => props.padding);
const classes = computed(() =>
  cn(
    "mild-card-footer",
    paddingClass("mild-card-footer", padding.value),
    props.align && `mild-card-footer--${props.align}`,
    props.noBorder && "mild-card-footer--no-border",
  ),
);
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
