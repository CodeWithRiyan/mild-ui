<!-- packages/vue/src/components/ButtonGroup/ButtonGroup.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { provideButtonGroup } from "./context";
import type { ButtonGroupProps } from "../../types/button-group";

// Lays buttons out in a row (or column) and hands them a shared `size`, `variant` and
// `disabled`. `attached` joins them into one bar. Rendered with `role="group"`; give it an
// `aria-label` when the group's purpose is not obvious from context.
const props = withDefaults(defineProps<ButtonGroupProps>(), {
  attached: false,
  orientation: "horizontal",
  fullWidth: false,
  size: undefined,
  variant: undefined,
  disabled: undefined,
});

const classes = computed(() =>
  cn(
    "mild-button-group",
    props.attached && "mild-button-group--attached",
    props.orientation === "vertical" && "mild-button-group--vertical",
    props.fullWidth && "mild-button-group--full-width",
  ),
);

provideButtonGroup({
  size: computed(() => props.size),
  variant: computed(() => props.variant),
  disabled: computed(() => props.disabled),
});
</script>

<template>
  <div
    role="group"
    :class="classes"
    :data-orientation="orientation"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </div>
</template>
