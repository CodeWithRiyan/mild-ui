<!-- packages/vue/src/components/Accordion/Accordion.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createAccordion } from "@mild-ui/primitives/accordion";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { useId } from "../../composables/useId";
import { provideAccordion } from "./context";
import type { AccordionProps } from "../../types/disclosure";

// Accordion root. `type="single"` (default) opens one panel at a time, `type="multiple"` any
// number. Compose with `AccordionItem` > `AccordionTrigger` + `AccordionContent`. Behaviour
// (`aria-expanded`, Enter/Space/click toggling, Arrow/Home/End between the headers, single or
// multiple) comes from `@mild-ui/primitives/accordion`.
const props = withDefaults(defineProps<AccordionProps>(), {
  type: "single",
  modelValue: undefined,
  defaultValue: undefined,
  collapsible: true,
  variant: "default",
  size: "md",
  headingLevel: 3,
  disabled: false,
});

const emit = defineEmits<{
  /** `v-model`: `string | null` for single, `string[]` for multiple. */
  (e: "update:modelValue", value: string | string[] | null): void;
  (e: "change", value: string | string[] | null): void;
}>();

function toArray(value: string | string[] | null | undefined): string[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

const multiple = computed(() => props.type === "multiple");
const collapsible = computed(() => (multiple.value ? true : props.collapsible));
const element = ref<HTMLDivElement | null>(null);
const isControlled = computed(() => props.modelValue !== undefined);
const internal = ref<string[]>(toArray(props.defaultValue));
const value = computed(() => (isControlled.value ? toArray(props.modelValue) : internal.value));

useMachine(
  element,
  (el, options) => createAccordion({ element: el, ...options }),
  () => ({
    multiple: multiple.value,
    collapsible: collapsible.value,
    value: value.value,
    onChange: (next: string[]) => {
      if (!isControlled.value) internal.value = next;
      const reported = multiple.value ? next : (next[0] ?? null);
      emit("update:modelValue", reported);
      emit("change", reported);
    },
  }),
  (instance, options) => {
    instance.refresh();
    instance.setValue(options.value);
  },
  () => [multiple.value, collapsible.value],
);

provideAccordion({
  value,
  baseId: useId(),
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  headingLevel: computed(() => props.headingLevel),
  disabled: computed(() => props.disabled),
});

const classes = computed(() =>
  cn(
    "mild-accordion",
    `mild-accordion--${props.variant}`,
    `mild-accordion--${props.type}`,
    props.size !== "md" && `mild-accordion--${props.size}`,
  ),
);
</script>

<template>
  <div ref="element" :data-type="type" :class="classes"><slot /></div>
</template>
