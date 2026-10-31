<!-- packages/vue/src/components/Grid/Grid.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getSpacingValue } from "../../utils/styling";
import { responsiveClasses } from "../../utils/layout";
import type { GridProps } from "../../types/grid";

// CSS grid with 1-12 equal columns (`columns`, per breakpoint if needed) or a custom template.
// Renders a `div`, or the element given with `as`. Place children with `GridItem` to span
// columns or rows.
const props = withDefaults(defineProps<GridProps>(), {
  as: "div",
  columns: undefined,
  rows: undefined,
  templateColumns: undefined,
  templateRows: undefined,
  gap: undefined,
  columnGap: undefined,
  rowGap: undefined,
  flow: undefined,
  align: undefined,
  justify: undefined,
  inline: false,
});

const classes = computed(() =>
  cn(
    "mild-grid",
    props.inline && "mild-grid--inline",
    ...responsiveClasses(props.columns, (count, bp) =>
      bp ? `mild-grid--${bp}-cols-${count}` : `mild-grid--cols-${count}`,
    ),
    props.rows && `mild-grid--rows-${props.rows}`,
    props.flow && `mild-grid--flow-${props.flow}`,
    props.align && `mild-grid--items-${props.align}`,
    props.justify && `mild-grid--justify-${props.justify}`,
  ),
);

const style = computed(() => {
  const result: Record<string, string> = {};
  if (props.templateColumns) result.gridTemplateColumns = props.templateColumns;
  if (props.templateRows) result.gridTemplateRows = props.templateRows;
  if (props.gap) result.gap = getSpacingValue(props.gap);
  if (props.columnGap) result.columnGap = getSpacingValue(props.columnGap);
  if (props.rowGap) result.rowGap = getSpacingValue(props.rowGap);
  return Object.keys(result).length > 0 ? result : undefined;
});
</script>

<template>
  <component :is="as" :class="classes" :style="style"><slot /></component>
</template>
