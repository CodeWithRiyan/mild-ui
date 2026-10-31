<!-- packages/vue/src/components/Accordion/AccordionTrigger.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { ChevronDownIcon } from "../icons";
import { useAccordionContext, useAccordionItemContext } from "./context";
import type { AccordionTriggerProps } from "../../types/disclosure";

// Attributes (class, style, aria-*) go on the button, not the heading around it.
defineOptions({ inheritAttrs: false });

// The item's header: a heading wrapping a button with `aria-expanded` / `aria-controls`. The
// accordion primitive finds headers by `aria-expanded` and reads `data-value`.
withDefaults(defineProps<AccordionTriggerProps>(), { noIcon: false });

defineSlots<{
  default?: () => unknown;
  /** Replaces the chevron. */
  icon?: () => unknown;
}>();

const accordion = useAccordionContext("AccordionTrigger");
const item = useAccordionItemContext("AccordionTrigger");
const heading = computed(() => `h${accordion.headingLevel.value}`);
const state = computed(() => (item.open.value ? "open" : "closed"));

const classes = computed(() =>
  cn(
    "mild-accordion-trigger",
    item.disabled.value && "mild-accordion-trigger--disabled",
    accordion.size.value !== "md" && `mild-accordion-trigger--${accordion.size.value}`,
  ),
);
</script>

<template>
  <component :is="heading" class="mild-accordion-header" :data-state="state">
    <button
      :id="item.triggerId"
      type="button"
      :aria-expanded="item.open.value"
      :aria-controls="item.contentId"
      :data-value="item.value"
      :data-state="state"
      :data-disabled="item.disabled.value ? '' : undefined"
      :disabled="item.disabled.value"
      :class="classes"
      v-bind="$attrs"
    >
      <span class="mild-accordion-trigger-content"><slot /></span>
      <span
        v-if="!noIcon"
        class="mild-accordion-trigger-icon"
        :data-state="state"
        aria-hidden="true"
      >
        <slot name="icon"><ChevronDownIcon /></slot>
      </span>
    </button>
  </component>
</template>
