<!-- packages/vue/src/components/Accordion/AccordionItem.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { provideAccordionItem, useAccordionContext } from "./context";
import type { AccordionItemProps } from "../../types/disclosure";

// One header + panel pair.
const props = withDefaults(defineProps<AccordionItemProps>(), { disabled: false });

const accordion = useAccordionContext("AccordionItem");
const open = computed(() => accordion.value.value.includes(props.value));
const disabled = computed(() => accordion.disabled.value || props.disabled);

provideAccordionItem({
  value: props.value,
  open,
  disabled,
  triggerId: `${accordion.baseId}-trigger-${props.value}`,
  contentId: `${accordion.baseId}-content-${props.value}`,
});
</script>

<template>
  <div
    :data-state="open ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    class="mild-accordion-item"
  >
    <slot />
  </div>
</template>
