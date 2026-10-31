<!-- packages/vue/src/components/Radio/RadioGroup.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createRadioGroup } from "@mild-ui/primitives/radio-group";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { provideRadioGroup } from "./context";
import type { RadioGroupProps } from "../../types/radio";

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  name: undefined,
  disabled: false,
  required: false,
  ui: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
  /** Fired when the user checks a radio, controlled or not. */
  (e: "change", value: string): void;
}>();

const element = ref<HTMLDivElement | null>(null);
const internal = ref<string | null>(props.defaultValue ?? null);
const isControlled = computed(() => props.modelValue !== undefined);
const value = computed(() => (isControlled.value ? (props.modelValue ?? null) : internal.value));

/**
 * Radio group with roving tabindex. Behaviour (`role="radiogroup"`, `aria-checked`, the single
 * tab stop, Arrow keys that move and check, Space) comes from `@mild-ui/primitives/radio-group`;
 * this component only renders and maps props.
 */
useMachine(
  element,
  (el, options) => createRadioGroup({ element: el, ...options }),
  () => ({
    value: value.value,
    onChange: (next: string) => {
      if (!isControlled.value) internal.value = next;
      emit("update:modelValue", next);
      emit("change", next);
    },
  }),
  (instance, options) => {
    // Radios may mount or unmount between renders, so re-read them every time.
    instance.refresh();
    instance.setValue(options.value);
  },
);

provideRadioGroup({
  value,
  disabled: computed(() => props.disabled),
  required: computed(() => props.required),
});
</script>

<template>
  <div
    ref="element"
    role="radiogroup"
    :aria-required="required || undefined"
    :aria-disabled="disabled || undefined"
    :class="cn('mild-radio-group', ui?.container)"
  >
    <slot />
    <input v-if="name" type="hidden" :name="name" :value="value ?? ''" />
  </div>
</template>
