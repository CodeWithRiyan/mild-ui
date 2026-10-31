<!-- packages/vue/src/components/Select/SelectContent.vue -->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { createListbox } from "@mild-ui/primitives/listbox";
import { selectContentVariants } from "../../utils/select";
import { useMachine } from "../../composables/useMachine";
import { useSelectContext } from "./context";
import type { SelectContentProps } from "../../types/select";

const props = withDefaults(defineProps<SelectContentProps>(), { position: "popper" });

const context = useSelectContext("SelectContent");
const listbox = ref<HTMLUListElement | null>(null);
const classes = computed(() => selectContentVariants({ position: props.position }));

/** The popup's listbox, driven by `@mild-ui/primitives/listbox`. */
const machine = useMachine(
  listbox,
  (el, options) => createListbox({ element: el, ...options }),
  () => ({
    value: context.value.value,
    selectionFollowsFocus: false,
    onChange: context.select,
    onEscape: () => {
      context.setOpen(false);
      context.triggerRef.value?.focus();
    },
    onActiveChange: context.setActive,
  }),
  (instance, options) => {
    instance.refresh();
    instance.setValue(options.value);
  },
);

// The popup stays mounted (hidden while closed) so the items' labels are known to the trigger
// and the listbox primitive is created once. Opening moves focus into it.
watch(
  context.open,
  (open) => {
    if (open) machine.instance.value?.element.focus();
  },
  { flush: "post" },
);

function onKeyDown(event: KeyboardEvent): void {
  if (event.key === "Tab") context.setOpen(false);
}
</script>

<template>
  <div
    :class="classes"
    :data-state="context.open.value ? 'open' : 'closed'"
    :hidden="!context.open.value"
  >
    <ul
      :id="context.listboxId"
      ref="listbox"
      role="listbox"
      class="mild-select-viewport"
      @keydown="onKeyDown"
    >
      <slot />
    </ul>
  </div>
</template>
