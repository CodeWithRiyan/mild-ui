<!-- packages/vue/src/components/SegmentedControl/SegmentedControl.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createRadioGroup } from "@mild-ui/primitives/radio-group";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import type { SegmentedControlProps } from "../../types/segmented-control";

// Single-choice control drawn as one bar of segments. It is a radio group: behaviour
// (`aria-checked`, one tab stop, Arrow keys that move and select, Space) comes from
// `@mild-ui/primitives/radio-group`; this component only renders and maps props.
const props = withDefaults(defineProps<SegmentedControlProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  name: undefined,
  size: "md",
  orientation: "horizontal",
  fullWidth: false,
  disabled: false,
  ui: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
  /** Fired when the user selects a segment, controlled or not. */
  (e: "change", value: string): void;
}>();

const element = ref<HTMLDivElement | null>(null);
const internal = ref<string | null>(props.defaultValue ?? null);
const isControlled = computed(() => props.modelValue !== undefined);
// Controlled means `modelValue` is defined, so the cast only narrows the type.
const value = computed(() => (isControlled.value ? (props.modelValue as string) : internal.value));

useMachine(
  element,
  (el, options) => createRadioGroup({ element: el, ...options }),
  () => ({
    value: value.value,
    onChange: (next: string) => {
      if (!isControlled.value) internal.value = next;
      emit("update:modelValue", next);
      emit("change", next);
    },
  }),
  (instance, options) => {
    instance.refresh();
    instance.setValue(options.value);
  },
);

// The group primitive finds segments by role and reads `data-value`; it sets aria-checked and
// tabindex itself. The template bindings keep server markup honest.
const classes = computed(() =>
  cn(
    "mild-segmented-control",
    `mild-segmented-control--${props.size}`,
    props.orientation === "vertical" && "mild-segmented-control--vertical",
    props.fullWidth && "mild-segmented-control--full-width",
  ),
);
</script>

<template>
  <div
    ref="element"
    role="radiogroup"
    :aria-disabled="disabled || undefined"
    :aria-orientation="orientation"
    :data-orientation="orientation"
    :class="classes"
  >
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      role="radio"
      :aria-checked="value === item.value"
      :data-value="item.value"
      :data-state="value === item.value ? 'checked' : 'unchecked'"
      :disabled="disabled || Boolean(item.disabled)"
      :class="cn('mild-segmented-control__item', ui?.item)"
    >
      {{ item.label ?? item.value }}
    </button>
    <input v-if="name" type="hidden" :name="name" :value="value ?? ''" />
  </div>
</template>
