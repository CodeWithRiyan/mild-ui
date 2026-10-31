<!-- packages/vue/src/components/Table/TableCell.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { TableCellProps } from "../../types/table";

const props = withDefaults(defineProps<TableCellProps>(), { align: undefined, numeric: false });

const classes = computed(() =>
  cn(
    "mild-table__cell",
    props.align && `mild-table__cell--${props.align}`,
    props.numeric && "mild-table__cell--numeric",
  ),
);
</script>

<template>
  <td :class="classes"><slot /></td>
</template>
