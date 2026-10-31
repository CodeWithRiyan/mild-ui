<!-- packages/vue/src/components/Radio/RadioGroupItem.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { radioVariants, radioLabelVariants } from "../../utils/radio";
import { cn } from "../../utils/cn";
import { useRadioGroup } from "./context";
import { DotIcon } from "../icons";
import type { RadioGroupItemProps } from "../../types/radio";

// Attributes (class, aria-*, data-*) go on the radio itself, not the field wrapper.
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  id: undefined,
  label: undefined,
  size: "md",
  disabled: false,
  ui: undefined,
});

const slots = defineSlots<{
  /** Label content; takes precedence over the `label` prop. */
  default?: () => unknown;
  /** Shown while checked. Defaults to a filled dot. */
  indicator?: () => unknown;
}>();

const group = useRadioGroup();
const radio = ref<HTMLSpanElement | null>(null);

const disabled = computed(() => Boolean(group?.disabled.value) || props.disabled);
const checked = computed(() => group?.value.value === props.value);
const radioId = computed(() => props.id || `radio-${props.value}`);
const labelId = computed(() => `${radioId.value}-label`);
const hasLabel = computed(() => Boolean(slots.default) || props.label !== undefined);

function onLabelClick(event: MouseEvent): void {
  // A <label for> neither names nor activates a non-native control; do both here.
  event.preventDefault();
  radio.value?.focus();
  radio.value?.click();
}

// Template notes
// The group primitive finds radios by role and reads `data-value`; it sets aria-checked and
// tabindex itself. The bindings above keep server markup honest.
//
// Mirrors native <label> activation; the radio itself handles the keyboard.
</script>

<template>
  <div :class="cn('mild-radio-field', ui?.container)">
    <span
      :id="radioId"
      ref="radio"
      role="radio"
      :aria-checked="checked"
      :aria-labelledby="hasLabel ? labelId : undefined"
      :aria-disabled="disabled || undefined"
      :data-value="value"
      :data-state="checked ? 'checked' : 'unchecked'"
      :data-disabled="disabled ? '' : undefined"
      :class="cn(radioVariants({ size }), ui?.radio)"
      v-bind="$attrs"
    >
      <span :class="cn('mild-radio__indicator', ui?.indicator)" data-indicator>
        <slot v-if="checked" name="indicator"><DotIcon /></slot>
      </span>
    </span>
    <label
      v-if="hasLabel"
      :id="labelId"
      :for="radioId"
      :class="cn(radioLabelVariants({ size }), disabled && 'mild-radio-label--disabled', ui?.label)"
      @click="onLabelClick"
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
