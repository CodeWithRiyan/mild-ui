<!-- packages/vue/src/components/Toast/ToastRegion.vue -->
<script setup lang="ts">
import type { ToastRegionProps } from "../../types/toast";

// The landmark that stacks the toasts of one placement.
withDefaults(defineProps<ToastRegionProps>(), { label: "Notifications" });
</script>

<template>
  <div
    role="region"
    :aria-label="label"
    :data-placement="placement"
    :class="['mild-toast-region', `mild-toast-region--${placement}`]"
  >
    <slot />
  </div>
</template>
