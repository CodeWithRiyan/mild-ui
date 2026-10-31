<!-- packages/vue/src/components/Progress/Progress.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { getProgressA11yProps, progressPercent } from "../../utils/progress";
import type { ProgressProps } from "../../types/feedback";

// Attributes (class, style, aria-*) go on the bar, the element with the progressbar role.
defineOptions({ inheritAttrs: false });

// Linear progress bar (`role="progressbar"` with `aria-valuenow/min/max`). Without a `value`,
// or with `indeterminate`, the bar animates and announces itself as busy.
const props = withDefaults(defineProps<ProgressProps>(), {
  value: undefined,
  min: 0,
  max: 100,
  indeterminate: undefined,
  size: "md",
  colorScheme: "primary",
  striped: false,
  animated: false,
  label: undefined,
  valueText: undefined,
  showValue: false,
});

const indeterminate = computed(() => props.indeterminate ?? props.value === undefined);
const percent = computed(() =>
  indeterminate.value || props.value === undefined
    ? 0
    : progressPercent(props.value, props.min, props.max),
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

const classes = computed(() =>
  cn(
    "mild-progress",
    `mild-progress--${props.size}`,
    `mild-progress--${props.colorScheme}`,
    props.striped && "mild-progress--striped",
    props.animated && "mild-progress--animated",
    indeterminate.value && "mild-progress--indeterminate",
  ),
);

const style = computed(() =>
  indeterminate.value ? undefined : { "--mild-progress-value": `${percent.value}%` },
);
</script>

<template>
  <div class="mild-progress-field">
    <div v-bind="{ ...a11y, ...$attrs }" :class="classes" :style="style">
      <div class="mild-progress__bar" />
    </div>
    <span v-if="showValue && !indeterminate" class="mild-progress__label" aria-hidden="true">
      {{ a11y["aria-valuetext"] }}
    </span>
  </div>
</template>
