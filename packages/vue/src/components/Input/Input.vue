<!-- packages/vue/src/components/Input/Input.vue -->
<template>
  <input
    :class="inputClasses"
    :type="type"
    :value="modelValue"
    @input="onInput"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  inputStyles,
  type InputCoreProps,
  type InputStyleProps,
} from "@mild-ui/core";
import { cn } from "../../utils";

interface Props extends InputCoreProps, InputStyleProps {
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  variant: "default",
  size: "md",
  fullWidth: true,
  error: false,
  disabled: false,
  modelValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputClasses = computed(() => {
  return cn(
    inputStyles({
      variant: props.variant,
      size: props.size,
      fullWidth: props.fullWidth,
      error: props.error,
    }),
    props.className,
  );
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
