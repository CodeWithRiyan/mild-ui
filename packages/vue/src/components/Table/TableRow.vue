<!-- packages/vue/src/components/Table/TableRow.vue -->
<script setup lang="ts">
import type { TableRowProps } from "../../types/table";

withDefaults(defineProps<TableRowProps>(), { selected: undefined });
</script>

<template>
  <tr
    class="mild-table__row"
    :aria-selected="selected === undefined ? undefined : selected"
    :data-selected="selected ? '' : undefined"
  >
    <slot />
  </tr>
</template>
