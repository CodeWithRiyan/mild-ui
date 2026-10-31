<!-- packages/vue/src/components/Accordion/AccordionContent.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { useAccordionContext, useAccordionItemContext } from "./context";
import type { AccordionContentProps } from "../../types/disclosure";

// The item's panel (`role="region"`, named by its header).
withDefaults(defineProps<AccordionContentProps>(), { forceMount: true });

const accordion = useAccordionContext("AccordionContent");
const item = useAccordionItemContext("AccordionContent");
const innerClasses = computed(() =>
  cn(
    "mild-accordion-content-inner",
    accordion.size.value !== "md" && `mild-accordion-content-inner--${accordion.size.value}`,
  ),
);
</script>

<template>
  <div
    v-if="item.open.value || forceMount"
    :id="item.contentId"
    role="region"
    :aria-labelledby="item.triggerId"
    :hidden="!item.open.value"
    :data-state="item.open.value ? 'open' : 'closed'"
    class="mild-accordion-content"
  >
    <div :class="innerClasses"><slot /></div>
  </div>
</template>
