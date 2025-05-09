<template>
  <button
    :class="classes"
    :disabled="isLoading || disabled"
    v-bind="$attrs"
  >
    <slot name="loading" v-if="isLoading">
      <svg
        class="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </slot>

    <slot name="left-icon" v-if="!isLoading">
      <span v-if="leftIcon" class="mr-2 inline-flex">
        <component :is="leftIcon" />
      </span>
    </slot>

    <slot>
      {{ isLoading && loadingText ? loadingText : null }}
    </slot>

    <slot name="right-icon" v-if="!isLoading">
      <span v-if="rightIcon" class="ml-2 inline-flex">
        <component :is="rightIcon" />
      </span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define props
const props = withDefaults(defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'outlined' | 'ghost' | 'link';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: any;
  rightIcon?: any;
  disabled?: boolean;
  class?: string;
}>(), {
  color: 'primary',
  size: 'md',
  variant: 'filled',
  fullWidth: false,
  isLoading: false,
  disabled: false,
});

// Define Tailwind class mapping
const classes = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size classes
  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5 rounded-sm h-6',
    sm: 'text-sm px-3 py-1 rounded h-8',
    md: 'text-base px-4 py-1.5 h-10',
    lg: 'text-lg px-5 py-2 h-12',
    xl: 'text-xl px-6 py-2.5 h-14',
  }[props.size];
  
  // Color and variant classes
  let colorVariantClasses = '';
  
  if (props.variant === 'filled') {
    colorVariantClasses = {
      primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white',
      secondary: 'bg-secondary-600 hover:bg-secondary-700 active:bg-secondary-800 text-white',
      success: 'bg-success-600 hover:bg-success-700 active:bg-success-800 text-white',
      danger: 'bg-danger-600 hover:bg-danger-700 active:bg-danger-800 text-white',
      warning: 'bg-warning-600 hover:bg-warning-700 active:bg-warning-800 text-white',
      info: 'bg-info-600 hover:bg-info-700 active:bg-info-800 text-white',
      light: 'bg-light-200 hover:bg-light-300 active:bg-light-400 text-gray-900',
      dark: 'bg-gray-800 hover:bg-gray-900 active:bg-gray-950 text-white',
    }[props.color];
  } else if (props.variant === 'outlined') {
    colorVariantClasses = {
      primary: 'border border-primary-600 text-primary-600 hover:bg-primary-50 bg-transparent',
      secondary: 'border border-secondary-600 text-secondary-600 hover:bg-secondary-50 bg-transparent',
      success: 'border border-success-600 text-success-600 hover:bg-success-50 bg-transparent',
      danger: 'border border-danger-600 text-danger-600 hover:bg-danger-50 bg-transparent',
      warning: 'border border-warning-600 text-warning-600 hover:bg-warning-50 bg-transparent',
      info: 'border border-info-600 text-info-600 hover:bg-info-50 bg-transparent',
      light: 'border border-gray-300 text-gray-800 hover:bg-gray-100 bg-transparent',
      dark: 'border border-gray-800 text-gray-800 hover:bg-gray-100 bg-transparent',
    }[props.color];
  } else if (props.variant === 'ghost') {
    colorVariantClasses = {
      primary: 'text-primary-600 hover:bg-primary-100 bg-transparent',
      secondary: 'text-secondary-600 hover:bg-secondary-100 bg-transparent',
      success: 'text-success-600 hover:bg-success-100 bg-transparent',
      danger: 'text-danger-600 hover:bg-danger-100 bg-transparent',
      warning: 'text-warning-600 hover:bg-warning-100 bg-transparent',
      info: 'text-info-600 hover:bg-info-100 bg-transparent',
      light: 'text-gray-800 hover:bg-gray-100 bg-transparent',
      dark: 'text-gray-800 hover:bg-gray-100 bg-transparent',
    }[props.color];
  } else if (props.variant === 'link') {
    colorVariantClasses = {
      primary: 'text-primary-600 hover:text-primary-700 bg-transparent underline-offset-4 hover:underline',
      secondary: 'text-secondary-600 hover:text-secondary-700 bg-transparent underline-offset-4 hover:underline',
      success: 'text-success-600 hover:text-success-700 bg-transparent underline-offset-4 hover:underline',
      danger: 'text-danger-600 hover:text-danger-700 bg-transparent underline-offset-4 hover:underline',
      warning: 'text-warning-600 hover:text-warning-700 bg-transparent underline-offset-4 hover:underline',
      info: 'text-info-600 hover:text-info-700 bg-transparent underline-offset-4 hover:underline',
      light: 'text-gray-800 hover:text-gray-900 bg-transparent underline-offset-4 hover:underline',
      dark: 'text-gray-800 hover:text-gray-900 bg-transparent underline-offset-4 hover:underline',
    }[props.color];
  }
  
  // Width class
  const widthClass = props.fullWidth ? 'w-full' : '';
  
  return [baseClasses, sizeClasses, colorVariantClasses, widthClass, props.class].filter(Boolean).join(' ');
});
</script>