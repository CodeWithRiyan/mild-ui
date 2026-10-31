<!-- packages/vue/src/components/Dialog/DialogCloseButton.vue -->
<script setup lang="ts">
import { CloseButton } from "../CloseButton";
import { useDialogContext } from "./context";
import type { CloseButtonProps } from "../../types/icon-button";

// A `CloseButton` that closes the dialog.
withDefaults(defineProps<CloseButtonProps>(), {
  label: "Close",
  variant: "ghost",
  size: "sm",
  round: false,
  disabled: undefined,
  loading: undefined,
  colorScheme: undefined,
  type: undefined,
});

const { close } = useDialogContext("DialogCloseButton");
</script>

<template>
  <CloseButton
    :label="label"
    :variant="variant"
    :size="size"
    :round="round"
    :disabled="disabled"
    :loading="loading"
    :color-scheme="colorScheme"
    :type="type"
    class="mild-modal-close"
    @click="close"
  >
    <slot />
  </CloseButton>
</template>
