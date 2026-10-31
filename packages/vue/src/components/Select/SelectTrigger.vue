<!-- packages/vue/src/components/Select/SelectTrigger.vue -->
<script setup lang="ts">
import { computed, type ComponentPublicInstance } from "vue";
import { selectTriggerVariants } from "../../utils/select";
import { cn } from "../../utils/cn";
import { useSelectContext } from "./context";
import { ChevronDownIcon } from "../icons";
import type { SelectTriggerProps } from "../../types/select";

const props = withDefaults(defineProps<SelectTriggerProps>(), {
  size: undefined,
  fullWidth: false,
  error: false,
  disabled: undefined,
  ui: undefined,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
  (e: "keydown", event: KeyboardEvent): void;
}>();

defineSlots<{
  default?: () => unknown;
  /** Shown after the value. Defaults to a chevron. */
  icon?: () => unknown;
}>();

const context = useSelectContext("SelectTrigger");
const isDisabled = computed(() => props.disabled ?? context.disabled.value);
const classes = computed(() =>
  selectTriggerVariants({
    size: props.size ?? context.size.value,
    fullWidth: props.fullWidth,
    error: props.error,
  }),
);

function setTriggerRef(el: Element | ComponentPublicInstance | null): void {
  // The root focuses the trigger again after a selection or Escape.
  context.triggerRef.value = el instanceof HTMLButtonElement ? el : null;
}

function onClick(event: MouseEvent): void {
  emit("click", event);
  if (!event.defaultPrevented) context.setOpen(!context.open.value);
}

function onKeyDown(event: KeyboardEvent): void {
  emit("keydown", event);
  if (event.defaultPrevented) return;
  if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
    event.preventDefault();
    context.setOpen(true);
  }
}

// Template notes
// A select-only combobox button (APG "Select-Only Combobox").
</script>

<template>
  <button
    :ref="setTriggerRef"
    type="button"
    role="combobox"
    aria-haspopup="listbox"
    :aria-expanded="context.open.value"
    :aria-controls="context.open.value ? context.listboxId : undefined"
    :aria-required="context.required.value || undefined"
    :disabled="isDisabled"
    :data-state="context.open.value ? 'open' : 'closed'"
    :data-placeholder="context.value.value === null ? '' : undefined"
    :class="classes"
    @click="onClick"
    @keydown="onKeyDown"
  >
    <slot />
    <span
      :class="cn('mild-select-icon', context.open.value && 'mild-select-icon--open', ui?.icon)"
      aria-hidden="true"
      data-icon
    >
      <slot name="icon"><ChevronDownIcon /></slot>
    </span>
  </button>
</template>
