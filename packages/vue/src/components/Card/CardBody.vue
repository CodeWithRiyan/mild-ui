<!-- packages/vue/src/components/Card/CardBody.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { paddingClass, useCardPadding } from "./context";
import type { CardPartProps } from "../../types/data-display";

const props = withDefaults(defineProps<CardPartProps>(), { padding: undefined });
const padding = useCardPadding(() => props.padding);
const classes = computed(() =>
  cn("mild-card-content", paddingClass("mild-card-content", padding.value)),
);
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
