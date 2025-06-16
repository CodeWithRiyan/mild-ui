<!-- packages/vue/src/components/Checkbox/Checkbox.vue -->
<template>
  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      :class="checkboxClasses"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      @change="onChange"
      v-bind="$attrs"
    />
    <slot v-if="$slots.default" />
    <label
      v-else-if="label"
      :for="$attrs.id as string | undefined"
      :class="labelClasses"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  type CheckboxCoreProps,
  type CheckboxStyleProps,
} from "../../types";
import {
  cn,
  checkboxStyles,
  checkboxLabelStyles,
} from "../../utils";

interface Props extends CheckboxCoreProps, CheckboxStyleProps {
  modelValue?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  disabled: false,
  required: false,
  modelValue: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const checkboxClasses = computed(() => {
  return cn(checkboxStyles({ size: props.size }), props.className);
});

const labelClasses = computed(() => {
  return cn(checkboxLabelStyles({ size: props.size }));
});

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>
