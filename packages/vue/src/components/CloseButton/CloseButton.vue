<!-- packages/vue/src/components/CloseButton/CloseButton.vue -->
<script setup lang="ts">
import { IconButton } from "../IconButton";
import { XIcon } from "../icons";
import type { CloseButtonProps } from "../../types/icon-button";

// The "dismiss" button of dialogs, alerts and tags: a ghost `IconButton` with an X. The default
// slot replaces the glyph.
withDefaults(defineProps<CloseButtonProps>(), {
  label: "Close",
  variant: "ghost",
  size: undefined,
  round: false,
  disabled: undefined,
  loading: undefined,
  colorScheme: undefined,
  type: undefined,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <IconButton
    :label="label"
    :variant="variant"
    :size="size"
    :round="round"
    :disabled="disabled"
    :loading="loading"
    :color-scheme="colorScheme"
    :type="type"
    class="mild-close-button"
    @click="emit('click', $event)"
  >
    <slot><XIcon /></slot>
  </IconButton>
</template>
