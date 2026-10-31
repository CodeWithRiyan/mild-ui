<!-- packages/vue/src/components/CircularProgress/CircularProgress.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getProgressA11yProps, progressFraction } from "../../utils/progress";
import type { CircularProgressProps } from "../../types/feedback";

// Ring-shaped progress indicator (`role="progressbar"`). Shows the percentage (or the default
// slot) in the middle; `indeterminate` spins the arc.
const props = withDefaults(defineProps<CircularProgressProps>(), {
  value: undefined,
  min: 0,
  max: 100,
  indeterminate: undefined,
  size: "md",
  colorScheme: "primary",
  thickness: 0.1,
  label: undefined,
  valueText: undefined,
  showValue: false,
});

const slots = defineSlots<{
  /** Content shown in the middle of the ring (instead of the percentage). */
  default?: () => unknown;
}>();

/** The SVG is drawn in a 100-unit box; the radius leaves room for the stroke. */
const VIEWBOX = 100;

const indeterminate = computed(() => props.indeterminate ?? props.value === undefined);
const fraction = computed(() =>
  indeterminate.value || props.value === undefined
    ? 0
    : progressFraction(props.value, props.min, props.max),
);
const a11y = computed(() =>
  getProgressA11yProps({
    value: props.value,
    min: props.min,
    max: props.max,
    indeterminate: indeterminate.value,
    label: props.label,
    valueText: props.valueText,
  }),
);
const strokeWidth = computed(() => Math.min(0.5, Math.max(0.02, props.thickness)) * VIEWBOX);
const radius = computed(() => (VIEWBOX - strokeWidth.value) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const center = VIEWBOX / 2;
const showLabel = computed(
  () => Boolean(slots.default) || (props.showValue && !indeterminate.value),
);

const classes = computed(() =>
  cn(
    "mild-circular-progress",
    `mild-circular-progress--${props.size}`,
    `mild-circular-progress--${props.colorScheme}`,
    indeterminate.value && "mild-circular-progress--indeterminate",
  ),
);
</script>

<template>
  <div v-bind="a11y" :class="classes">
    <svg
      class="mild-circular-progress__svg"
      :viewBox="`0 0 ${VIEWBOX} ${VIEWBOX}`"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        class="mild-circular-progress__track"
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
      />
      <circle
        class="mild-circular-progress__bar"
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke-dasharray="indeterminate ? undefined : circumference"
        :stroke-dashoffset="indeterminate ? undefined : circumference * (1 - fraction)"
      />
    </svg>
    <span v-if="showLabel" class="mild-circular-progress__label" aria-hidden="true">
      <slot>{{ a11y["aria-valuetext"] }}</slot>
    </span>
  </div>
</template>
