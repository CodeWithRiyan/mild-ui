<!-- packages/vue/src/components/Collapsible/CollapsibleContent.vue -->
<script setup lang="ts">
import { useCollapsibleContext } from "./context";
import type { CollapsibleContentProps } from "../../types/disclosure";

withDefaults(defineProps<CollapsibleContentProps>(), { forceMount: true });

const { open, contentId } = useCollapsibleContext("CollapsibleContent");
</script>

<template>
  <div
    v-if="open || forceMount"
    :id="contentId"
    :hidden="!open"
    :data-state="open ? 'open' : 'closed'"
    class="mild-collapsible-content"
  >
    <slot />
  </div>
</template>
