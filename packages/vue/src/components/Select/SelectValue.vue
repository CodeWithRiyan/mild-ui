<!-- packages/vue/src/components/Select/SelectValue.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { useSelectContext } from "./context";
import type { SelectValueProps } from "../../types/select";

withDefaults(defineProps<SelectValueProps>(), { placeholder: undefined });

const context = useSelectContext("SelectValue");
/** The selected item's label slot, or `undefined` while nothing (known) is selected. */
const label = computed(() =>
  context.value.value === null ? undefined : context.labels.get(context.value.value),
);

// Template notes
// Shows the selected item's label, or the placeholder.
</script>

<template>
  <span
    :class="cn('mild-select-value', label === undefined && 'mild-select-placeholder')"
    :data-placeholder="label === undefined ? '' : undefined"
  >
    <component :is="label" v-if="label" />
    <template v-else>{{ placeholder }}</template>
  </span>
</template>
