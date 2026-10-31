<!-- packages/vue/src/components/Table/Table.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { TableProps } from "../../types/table";

// Attributes (class, style, aria-*) go on the <table>, not the scroll container.
defineOptions({ inheritAttrs: false });

// Data table (`<table>`) in a horizontally scrolling container. Compose with `TableCaption`,
// `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead` and `TableCell`; see
// `DataTable` for the data-driven version with sorting and selection.
const props = withDefaults(defineProps<TableProps>(), {
  variant: "simple",
  size: "md",
  hoverable: false,
  stickyHeader: false,
  ui: undefined,
});

const classes = computed(() =>
  cn(
    "mild-table",
    `mild-table--${props.variant}`,
    `mild-table--${props.size}`,
    props.hoverable && "mild-table--hoverable",
    props.stickyHeader && "mild-table--sticky-header",
  ),
);
</script>

<template>
  <div
    :class="cn('mild-table-container', ui?.container)"
    :data-sticky-header="stickyHeader ? '' : undefined"
  >
    <table :class="classes" v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
