<!-- packages/vue/src/components/List/ListItem.vue -->
<script setup lang="ts">
import type { ListItemProps } from "../../types/list";

// A `List` item. Give it an `icon` slot to replace the marker with a glyph.
withDefaults(defineProps<ListItemProps>(), { as: "li" });

defineSlots<{
  default?: () => unknown;
  /** Icon shown instead of the list marker. Decorative: the item's text carries the meaning. */
  icon?: () => unknown;
}>();
</script>

<template>
  <component :is="as" class="mild-list-item">
    <span v-if="$slots.icon" class="mild-list-item__icon" aria-hidden="true"
      ><slot name="icon"
    /></span>
    <slot />
  </component>
</template>
