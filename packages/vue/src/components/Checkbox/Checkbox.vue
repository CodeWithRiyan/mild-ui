<!-- packages/vue/src/components/Checkbox/Checkbox.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createCheckbox, type CheckboxState } from "@mild-ui/primitives/checkbox";
import { checkboxVariants, checkboxLabelVariants } from "../../utils/checkbox";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { useId } from "../../composables/useId";
import { Label } from "../Label";
import { CheckIcon, MinusIcon } from "../icons";
import type { CheckboxProps, CheckboxValue } from "../../types/checkbox";

// Attributes (class, aria-*, data-*) go on the checkbox itself, not the field wrapper.
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<CheckboxProps>(), {
  id: undefined,
  modelValue: undefined,
  defaultChecked: undefined,
  indeterminate: false,
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
  (e: "update:modelValue", value: CheckboxValue): void;
  /** Fired on every user toggle, controlled or not. */
  (e: "change", value: CheckboxValue): void;
}>();

const slots = defineSlots<{
  /** Label content; takes precedence over the `label` prop. */
  default?: () => unknown;
  /** Shown while checked. Defaults to a check mark. */
  icon?: () => unknown;
  /** Shown while indeterminate. Defaults to a minus. */
  indeterminateIcon?: () => unknown;
}>();

const toState = (value: CheckboxValue | undefined): CheckboxState =>
  value === "indeterminate" ? "mixed" : (value ?? false);
const fromState = (state: CheckboxState): CheckboxValue =>
  state === "mixed" ? "indeterminate" : state;

const labelId = useId();
const element = ref<HTMLSpanElement | null>(null);
const internal = ref<CheckboxState>(toState(props.defaultChecked));
const isControlled = computed(() => props.modelValue !== undefined);
const state = computed<CheckboxState>(() =>
  props.indeterminate ? "mixed" : isControlled.value ? toState(props.modelValue) : internal.value,
);
const hasLabel = computed(() => Boolean(slots.default) || props.label !== undefined);

/**
 * Tri-state checkbox. Behaviour (role, `aria-checked`, Space to toggle, mixed -> checked) comes
 * from `@mild-ui/primitives/checkbox`; this component only renders and maps props.
 */
const machine = useMachine(
  element,
  (el, options) => createCheckbox({ element: el, ...options }),
  () => ({
    checked: state.value,
    disabled: props.disabled,
    onChange: (next: CheckboxState) => {
      if (!isControlled.value) internal.value = next;
      emit("update:modelValue", fromState(next));
      emit("change", fromState(next));
    },
  }),
  (instance, options) => {
    instance.setChecked(options.checked);
    instance.setDisabled(options.disabled);
  },
);

const dataState = computed(() =>
  state.value === "mixed" ? "indeterminate" : state.value ? "checked" : "unchecked",
);

function onLabelClick(event: MouseEvent): void {
  // Clicking a label focuses and activates a native control; do the same for this one.
  event.preventDefault();
  const checkbox = machine.instance.value?.element;
  checkbox?.focus();
  checkbox?.click();
}

// Template notes
// The primitive sets role/tabindex/aria-checked on mount; the bindings above keep server markup
// honest. A <label for> only names native form controls, so the label is linked explicitly
// through aria-labelledby.
</script>

<template>
  <div :class="cn('mild-checkbox-field', ui?.container)">
    <span
      :id="id"
      ref="element"
      role="checkbox"
      :aria-checked="state === 'mixed' ? 'mixed' : state"
      :aria-labelledby="hasLabel ? labelId : undefined"
      :aria-required="required || undefined"
      :data-state="dataState"
      :data-disabled="disabled ? '' : undefined"
      :class="cn(checkboxVariants({ size }), ui?.checkbox)"
      v-bind="$attrs"
    >
      <span :class="cn('mild-checkbox__indicator', ui?.indicator)" data-indicator>
        <slot v-if="state === 'mixed'" name="indeterminateIcon"><MinusIcon /></slot>
        <slot v-else-if="state === true" name="icon"><CheckIcon /></slot>
      </span>
    </span>
    <input
      v-if="name"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="state === true"
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
        cn(checkboxLabelVariants({ size }), disabled && 'mild-checkbox-label--disabled', ui?.label)
      "
      :required="required"
      @click="onLabelClick"
    >
      <slot>{{ label }}</slot>
    </Label>
  </div>
</template>
