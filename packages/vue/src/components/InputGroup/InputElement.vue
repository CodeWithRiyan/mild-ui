<!-- packages/vue/src/components/InputGroup/InputElement.vue -->
<script setup lang="ts">
import type { InputElementProps } from "../../types/input-group";

// An icon or button overlaid inside the field; the field gets padding to make room.
withDefaults(defineProps<InputElementProps>(), { placement: "left", interactive: false });
</script>

<template>
  <div
    :class="[
      'mild-input-element',
      `mild-input-element--${placement}`,
      interactive && 'mild-input-element--interactive',
    ]"
    :data-placement="placement"
  >
    <slot />
  </div>
</template>
