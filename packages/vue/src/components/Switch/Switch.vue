<!-- packages/vue/src/components/Switch/Switch.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createSwitch } from "@mild-ui/primitives/switch";
import { switchVariants, switchThumbVariants, switchLabelVariants } from "../../utils/switch";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { useId } from "../../composables/useId";
import { Label } from "../Label";
import type { SwitchProps } from "../../types/switch";

// Attributes (class, aria-*, data-*) go on the switch itself, not the field wrapper.
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<SwitchProps>(), {
  id: undefined,
  modelValue: undefined,
  defaultChecked: undefined,
  size: "md",
  disabled: false,
  required: false,
  name: undefined,
  value: "on",
  label: undefined,
  ui: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: boolean): void;
  /** Fired on every user toggle, controlled or not. */
  (e: "change", value: boolean): void;
}>();

const slots = defineSlots<{
  /** Label content; takes precedence over the `label` prop. */
  default?: () => unknown;
  /** Rendered inside the thumb, e.g. an on/off glyph. */
  thumbIcon?: () => unknown;
}>();

const labelId = useId();
const element = ref<HTMLSpanElement | null>(null);
const internal = ref(props.defaultChecked ?? false);
const isControlled = computed(() => props.modelValue !== undefined);
const checked = computed(() => (isControlled.value ? Boolean(props.modelValue) : internal.value));
const hasLabel = computed(() => Boolean(slots.default) || props.label !== undefined);
const dataState = computed(() => (checked.value ? "checked" : "unchecked"));

/**
 * On/off switch. Behaviour (role, `aria-checked`, Space and Enter to toggle) comes from
 * `@mild-ui/primitives/switch`; this component only renders and maps props.
 */
const machine = useMachine(
  element,
  (el, options) => createSwitch({ element: el, ...options }),
  () => ({
    checked: checked.value,
    disabled: props.disabled,
    onChange: (next: boolean) => {
      if (!isControlled.value) internal.value = next;
      emit("update:modelValue", next);
      emit("change", next);
    },
  }),
  (instance, options) => {
    instance.setChecked(options.checked);
    instance.setDisabled(options.disabled);
  },
);

function onLabelClick(event: MouseEvent): void {
  // Clicking a label focuses and activates a native control; do the same for this one.
  event.preventDefault();
  const toggle = machine.instance.value?.element;
  toggle?.focus();
  toggle?.click();
}
</script>

<template>
  <div :class="cn('mild-switch-field', ui?.container)">
    <span
      :id="id"
      ref="element"
      role="switch"
      :aria-checked="checked"
      :aria-labelledby="hasLabel ? labelId : undefined"
      :aria-required="required || undefined"
      :data-state="dataState"
      :data-disabled="disabled ? '' : undefined"
      :class="cn(switchVariants({ size }), ui?.switch)"
      v-bind="$attrs"
    >
      <span :class="cn(switchThumbVariants({ size }), ui?.thumb)" :data-state="dataState">
        <slot name="thumbIcon" />
      </span>
    </span>
    <input
      v-if="name"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      readonly
      hidden
      aria-hidden="true"
      tabindex="-1"
    />
    <Label
      v-if="hasLabel"
      :id="labelId"
      :for="id"
      :class="
        cn(switchLabelVariants({ size }), disabled && 'mild-switch-label--disabled', ui?.label)
      "
      :required="required"
      @click="onLabelClick"
    >
      <slot>{{ label }}</slot>
    </Label>
  </div>
</template>
