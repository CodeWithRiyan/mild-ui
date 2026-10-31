<!-- packages/vue/src/components/Grid/GridItem.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { responsiveClasses } from "../../utils/layout";
import type { GridItemProps } from "../../types/grid";

// A `Grid` child that spans columns (`colSpan`, per breakpoint if needed) and/or rows.
const props = withDefaults(defineProps<GridItemProps>(), {
  as: "div",
  colSpan: undefined,
  rowSpan: undefined,
});

const classes = computed(() =>
  cn(
    "mild-grid-item",
    ...responsiveClasses(props.colSpan, (span, bp) =>
      bp ? `mild-grid-item--${bp}-col-span-${span}` : `mild-grid-item--col-span-${span}`,
    ),
    props.rowSpan && `mild-grid-item--row-span-${props.rowSpan}`,
  ),
);
</script>

<template>
  <component :is="as" :class="classes"><slot /></component>
</template>
