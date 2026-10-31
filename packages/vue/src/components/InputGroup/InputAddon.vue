<!-- packages/vue/src/components/InputGroup/InputAddon.vue -->
<script setup lang="ts">
import type { InputAddonProps } from "../../types/input-group";

// Static text (or anything) that sits outside the field and shares its border.
withDefaults(defineProps<InputAddonProps>(), { placement: "left" });
</script>

<template>
  <div :class="['mild-input-addon', `mild-input-addon--${placement}`]" :data-placement="placement">
    <slot />
  </div>
</template>
