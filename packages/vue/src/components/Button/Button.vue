<template>
    <button
      :class="[baseClasses, customClass]"
      :disabled="disabled"
      @click="onClick"
    >
      <span v-if="$slots['leading-icon']" class="mild-button-icon mild-button-leading-icon">
        <slot name="leading-icon"></slot>
      </span>
      <span class="mild-button-content">
        <slot></slot>
      </span>
      <span v-if="$slots['trailing-icon']" class="mild-button-icon mild-button-trailing-icon">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { getButtonAttributes, ButtonVariant, ButtonSize } from '@mild-ui/core';
  
  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    customClass?: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    customClass: ''
  });
  
  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
  }>();
  
  const baseClasses = computed(() => {
    const attrs = getButtonAttributes({
      variant: props.variant,
      size: props.size,
      disabled: props.disabled
    });
    return attrs.className;
  });
  
  const onClick = (event: MouseEvent) => {
    emit('click', event);
  };
  </script>