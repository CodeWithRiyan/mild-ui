<!-- packages/vue/src/components/List/List.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getSpacingValue } from "../../utils/styling";
import type { ListProps } from "../../types/list";

// Bulleted or numbered list. `ordered` renders an `ol` (numbered), `unstyled` drops the marker
// and the indentation, and `spacing` takes a spacing token for the gap between items.
const props = withDefaults(defineProps<ListProps>(), {
  as: undefined,
  ordered: false,
  marker: undefined,
  unstyled: false,
  spacing: undefined,
});

const element = computed(() => props.as ?? (props.ordered ? "ol" : "ul"));
const markerType = computed(() => props.marker ?? (props.ordered ? "decimal" : undefined));

const classes = computed(() =>
  cn(
    "mild-list",
    props.unstyled && "mild-list--unstyled",
    !props.unstyled && markerType.value && `mild-list--marker-${markerType.value}`,
  ),
);

const style = computed(() =>
  props.spacing ? { "--mild-list-spacing": getSpacingValue(props.spacing) } : undefined,
);
</script>

<template>
  <component :is="element" :class="classes" :style="style"><slot /></component>
</template>
