<!-- packages/vue/src/components/Stat/Stat.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { ArrowDownIcon, ArrowUpIcon } from "../icons";
import type { StatProps } from "../../types/data-display";

// A key figure with its label and an optional trend. The trend arrow is decorative; its
// direction is announced in words ("increased by 12%").
const props = withDefaults(defineProps<StatProps>(), {
  label: undefined,
  value: undefined,
  helpText: undefined,
  trend: undefined,
  trendValue: undefined,
  size: "md",
});

const slots = defineSlots<{
  /** Extra content under the value (a sparkline, an action). */
  default?: () => unknown;
  label?: () => unknown;
  value?: () => unknown;
  helpText?: () => unknown;
  trendValue?: () => unknown;
}>();

const classes = computed(() => cn("mild-stat", `mild-stat--${props.size}`));
const hasHelp = computed(
  () => props.helpText !== undefined || props.trend !== undefined || Boolean(slots.helpText),
);
</script>

<template>
  <div :class="classes">
    <span class="mild-stat__label"
      ><slot name="label">{{ label }}</slot></span
    >
    <span class="mild-stat__value"
      ><slot name="value">{{ value }}</slot></span
    >
    <span v-if="hasHelp" class="mild-stat__help">
      <span
        v-if="trend"
        :class="cn('mild-stat__trend', `mild-stat__trend--${trend}`)"
        :data-trend="trend"
      >
        <ArrowUpIcon v-if="trend === 'increase'" />
        <ArrowDownIcon v-else />
        <span class="mild-stat__trend-text">
          <span class="mild-stat__sr-only">{{
            trend === "increase" ? "increased by " : "decreased by "
          }}</span>
          <slot name="trendValue">{{ trendValue }}</slot>
        </span>
      </span>
      <slot name="helpText">{{ helpText }}</slot>
    </span>
    <slot />
  </div>
</template>
