<!-- packages/vue/src/components/Table/TableCaption.vue -->
<script setup lang="ts">
import type { TableCaptionProps } from "../../types/table";

// The table's title, and its accessible name.
withDefaults(defineProps<TableCaptionProps>(), { placement: "top" });
</script>

<template>
  <caption
    :class="['mild-table__caption', placement === 'bottom' && 'mild-table__caption--bottom']"
  >
    <slot />
  </caption>
</template>
