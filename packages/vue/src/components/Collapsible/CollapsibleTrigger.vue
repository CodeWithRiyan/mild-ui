<!-- packages/vue/src/components/Collapsible/CollapsibleTrigger.vue -->
<script setup lang="ts">
import { ChevronDownIcon } from "../icons";
import { useCollapsibleContext } from "./context";
import type { CollapsibleTriggerProps } from "../../types/disclosure";

withDefaults(defineProps<CollapsibleTriggerProps>(), { noIcon: false });

const emit = defineEmits<{
  /** Fired before the toggle; `preventDefault()` cancels it. */
  (e: "click", event: MouseEvent): void;
}>();

defineSlots<{
  default?: () => unknown;
  /** Replaces the chevron. */
  icon?: () => unknown;
}>();

const { open, disabled, contentId, toggle } = useCollapsibleContext("CollapsibleTrigger");

function onClick(event: MouseEvent): void {
  emit("click", event);
  if (!event.defaultPrevented) toggle();
}
</script>

<template>
  <button
    type="button"
    :aria-expanded="open"
    :aria-controls="contentId"
    :data-state="open ? 'open' : 'closed'"
    :disabled="disabled"
    class="mild-collapsible-trigger"
    @click="onClick"
  >
    <slot />
    <span v-if="!noIcon" class="mild-collapsible-trigger__icon" aria-hidden="true">
      <slot name="icon"><ChevronDownIcon /></slot>
    </span>
  </button>
</template>
