<!-- packages/vue/src/components/Table/TableHead.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { TableHeadProps } from "../../types/table";

// A header cell (`<th scope="col">`).
const props = withDefaults(defineProps<TableHeadProps>(), {
  align: undefined,
  numeric: false,
  sort: undefined,
  scope: "col",
});

const classes = computed(() =>
  cn(
    "mild-table__head",
    props.align && `mild-table__head--${props.align}`,
    props.numeric && "mild-table__head--numeric",
  ),
);
</script>

<template>
  <th :scope="scope" :aria-sort="sort" :class="classes"><slot /></th>
</template>
