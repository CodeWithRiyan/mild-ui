<!-- packages/vue/src/components/Collapsible/Collapsible.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { useId } from "../../composables/useId";
import { provideCollapsible } from "./context";
import type { CollapsibleProps } from "../../types/disclosure";

// A single disclosure: a `CollapsibleTrigger` (button with `aria-expanded` / `aria-controls`)
// that shows or hides a `CollapsibleContent`. Controlled through `v-model:open`, or
// uncontrolled with `defaultOpen`.
const props = withDefaults(defineProps<CollapsibleProps>(), {
  open: undefined,
  defaultOpen: false,
  disabled: false,
});

const emit = defineEmits<{
  /** `v-model:open` */
  (e: "update:open", open: boolean): void;
  (e: "change", open: boolean): void;
}>();

const isControlled = computed(() => props.open !== undefined);
const internal = ref(props.defaultOpen);
const open = computed(() => (isControlled.value ? Boolean(props.open) : internal.value));

function toggle(): void {
  if (props.disabled) return;
  const next = !open.value;
  if (!isControlled.value) internal.value = next;
  emit("update:open", next);
  emit("change", next);
}

provideCollapsible({
  open,
  disabled: computed(() => props.disabled),
  contentId: `${useId()}-content`,
  toggle,
});
</script>

<template>
  <div
    class="mild-collapsible"
    :data-state="open ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </div>
</template>
