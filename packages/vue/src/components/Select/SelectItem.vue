<!-- packages/vue/src/components/Select/SelectItem.vue -->
<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect, type Slot } from "vue";
import { selectItemVariants } from "../../utils/select";
import { useSelectContext } from "./context";
import { CheckIcon } from "../icons";
import type { SelectItemProps } from "../../types/select";

const props = withDefaults(defineProps<SelectItemProps>(), { size: undefined, disabled: false });

const slots = defineSlots<{
  default?: Slot;
  /** Shown while selected. Overrides the root's `itemIndicator`. */
  indicator?: Slot;
}>();

const context = useSelectContext("SelectItem");
const selected = computed(() => context.value.value === props.value);
const highlighted = computed(() => context.active.value === props.value);
const classes = computed(() => selectItemVariants({ size: props.size ?? context.size.value }));
const indicator = computed(() => slots.indicator ?? context.itemIndicator.value);

// The trigger shows this item's label while it is selected.
watchEffect(() => context.registerLabel(props.value, slots.default));
onBeforeUnmount(() => context.labels.delete(props.value));
</script>

<template>
  <li
    role="option"
    :data-value="value"
    :aria-selected="selected"
    :aria-disabled="disabled || undefined"
    :data-selected="selected ? '' : undefined"
    :data-highlighted="highlighted ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :class="classes"
  >
    <span class="mild-select-item__indicator" aria-hidden="true">
      <template v-if="selected">
        <component :is="indicator" v-if="indicator" />
        <CheckIcon v-else />
      </template>
    </span>
    <span><slot /></span>
  </li>
</template>
