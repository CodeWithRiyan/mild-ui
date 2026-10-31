<!-- packages/vue/src/components/ToggleGroup/ToggleGroup.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createToggleGroup } from "@mild-ui/primitives/toggle-group";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { provideToggleGroup } from "./context";
import type { ToggleGroupProps } from "../../types/toggle";

// A set of `ToggleGroupItem`s that press one at a time (`type="single"`, default) or any number
// (`type="multiple"`). Behaviour (`aria-pressed`, one tab stop, Arrow/Home/End keys) comes
// from `@mild-ui/primitives/toggle-group`; this component only renders and maps props.
const props = withDefaults(defineProps<ToggleGroupProps>(), {
  type: "single",
  modelValue: undefined,
  defaultValue: undefined,
  variant: "ghost",
  size: "md",
  orientation: "horizontal",
  attached: false,
  loop: true,
  disabled: false,
});

const emit = defineEmits<{
  /** `v-model`: `string | null` for single, `string[]` for multiple. */
  (e: "update:modelValue", value: string | string[] | null): void;
  (e: "change", value: string | string[] | null): void;
}>();

/** Normalizes the single (`string | null`) and multiple (`string[]`) forms to an array. */
function toArray(value: string | string[] | null | undefined): string[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

const multiple = computed(() => props.type === "multiple");
const element = ref<HTMLDivElement | null>(null);
const internal = ref<string[]>(toArray(props.defaultValue));
const isControlled = computed(() => props.modelValue !== undefined);
const value = computed(() => (isControlled.value ? toArray(props.modelValue) : internal.value));

useMachine(
  element,
  (el, options) => createToggleGroup({ element: el, ...options }),
  () => ({
    multiple: multiple.value,
    loop: props.loop,
    value: value.value,
    onChange: (next: string[]) => {
      if (!isControlled.value) internal.value = next;
      const reported = multiple.value ? next : (next[0] ?? null);
      emit("update:modelValue", reported);
      emit("change", reported);
    },
  }),
  (instance, options) => {
    // Items may mount or unmount between renders, so re-read them every time.
    instance.refresh();
    instance.setValue(options.value);
  },
  // `multiple` and `loop` are read once at creation.
  () => [multiple.value, props.loop],
);

provideToggleGroup({
  value,
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
});

const classes = computed(() =>
  cn(
    "mild-toggle-group",
    props.attached && "mild-toggle-group--attached",
    props.orientation === "vertical" && "mild-toggle-group--vertical",
  ),
);
</script>

<template>
  <div
    ref="element"
    role="group"
    :class="classes"
    :data-orientation="orientation"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </div>
</template>
