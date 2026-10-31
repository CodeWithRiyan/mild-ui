<!-- packages/vue/src/components/Kbd/Kbd.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { KbdProps } from "../../types/kbd";

// A keyboard key (`<kbd>`). Combine several for a shortcut: `<Kbd>⌘</Kbd> + <Kbd>K</Kbd>`.
const props = withDefaults(defineProps<KbdProps>(), { as: "kbd", size: "md" });

const classes = computed(() => cn("mild-kbd", `mild-kbd--${props.size}`));
</script>

<template>
  <component :is="as" :class="classes"><slot /></component>
</template>
