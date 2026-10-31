<!-- packages/vue/src/components/ToggleGroup/ToggleGroupItem.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { Toggle } from "../Toggle";
import { useToggleGroup } from "./context";
import type { ToggleGroupItemProps } from "../../types/toggle";

// One toggle of a `ToggleGroup`. Its pressed state is owned by the group: the group primitive
// handles the click, the controlled Toggle just renders the state.
const props = withDefaults(defineProps<ToggleGroupItemProps>(), {
  variant: undefined,
  size: undefined,
  disabled: false,
});

const group = useToggleGroup();
const pressed = computed(() => group.value.value.includes(props.value));
const disabled = computed(() => group.disabled.value || props.disabled);
</script>

<template>
  <Toggle
    :pressed="pressed"
    :variant="variant ?? group.variant.value"
    :size="size ?? group.size.value"
    :disabled="disabled"
    :data-value="value"
    class="mild-toggle-group__item"
  >
    <slot />
  </Toggle>
</template>
