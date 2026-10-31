<!-- packages/vue/src/components/IconButton/IconButton.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { useButtonGroup } from "../ButtonGroup/context";
import type { IconButtonProps } from "../../types/icon-button";

// A square button that shows one glyph (the default slot). `label` is its accessible name
// (there is no visible text), applied as `aria-label`; the glyph itself is hidden from
// assistive technology.
const props = withDefaults(defineProps<IconButtonProps>(), {
  variant: undefined,
  size: undefined,
  round: false,
  disabled: undefined,
  loading: undefined,
  colorScheme: undefined,
  type: undefined,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const group = useButtonGroup();
const size = computed(() => {
  const groupSize = group?.size.value;
  return props.size ?? (groupSize !== "icon" ? groupSize : undefined) ?? "md";
});

const classes = computed(() =>
  cn(
    "mild-icon-button",
    `mild-icon-button--${size.value}`,
    props.round && "mild-icon-button--round",
  ),
);
</script>

<template>
  <Button
    :size="size"
    :variant="variant"
    :disabled="disabled"
    :loading="loading"
    :color-scheme="colorScheme"
    :type="type"
    :aria-label="label"
    :class="classes"
    @click="emit('click', $event)"
  >
    <span aria-hidden="true" class="mild-icon-button__icon"><slot /></span>
  </Button>
</template>
