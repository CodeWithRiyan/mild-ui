<!-- packages/vue/src/components/Button/Button.vue -->
<template>
  <button
    :class="buttonProps.className"
    :disabled="disabled"
    @click="onClick"
    v-bind="$attrs"
  >
    <span v-if="$slots['leading-icon']" class="mr-2">
      <slot name="leading-icon"></slot>
    </span>

    <slot></slot>

    <span v-if="$slots['trailing-icon']" class="ml-2">
      <slot name="trailing-icon"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getButtonProps } from "../../utils/button";
import type { ButtonVariant, ButtonSize } from "../../types/button";

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md", // Updated from 'medium' to 'md'
  disabled: false,
  class: "",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const buttonProps = computed(() => {
  return getButtonProps({
    variant: props.variant,
    size: props.size,
    disabled: props.disabled,
    className: props.class,
  });
});

const onClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>
