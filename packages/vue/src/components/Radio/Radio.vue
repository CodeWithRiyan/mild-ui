<!-- packages/vue/src/components/Radio/Radio.vue -->
<template>
  <div class="flex items-center space-x-2">
    <input
      type="radio"
      :class="radioClasses"
      :checked="checked"
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
  type RadioCoreProps,
  type RadioStyleProps,
} from "../../types";
import {
  cn,
  radioStyles,
  radioLabelStyles,
} from "../../utils";

interface Props extends RadioCoreProps, RadioStyleProps {
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  disabled: false,
  required: false,
  checked: false,
});

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

const radioClasses = computed(() => {
  return cn(radioStyles({ size: props.size }), props.className);
});

const labelClasses = computed(() => {
  return cn(radioLabelStyles({ size: props.size }));
});

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", target.value);
};
</script>
