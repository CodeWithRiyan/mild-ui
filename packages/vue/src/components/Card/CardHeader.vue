<!-- packages/vue/src/components/Card/CardHeader.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { paddingClass, useCardPadding } from "./context";
import type { CardHeaderProps } from "../../types/data-display";

const props = withDefaults(defineProps<CardHeaderProps>(), { padding: undefined, noBorder: false });
const padding = useCardPadding(() => props.padding);
const classes = computed(() =>
  cn(
    "mild-card-header",
    paddingClass("mild-card-header", padding.value),
    props.noBorder && "mild-card-header--no-border",
  ),
);
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
