<!-- packages/vue/src/components/AlertDialog/AlertDialog.vue -->
<script setup lang="ts">
import Dialog from "../Dialog/Dialog.vue";
import type { AlertDialogProps } from "../../types/dialog";

// Attributes (class, style) go on the overlay, like `Dialog`.
defineOptions({ inheritAttrs: false });

// A dialog that interrupts the user with a decision (`role="alertdialog"`). Unlike `Dialog`,
// clicking the overlay does not close it, and focus starts on the least destructive action.
// Compose it with `AlertDialogContent`, `AlertDialogTitle`, `AlertDialogDescription`, ...
withDefaults(defineProps<AlertDialogProps>(), {
  size: "md",
  closeOnOverlayClick: false,
  closeOnEscape: true,
  finalFocus: undefined,
  leastDestructive: undefined,
  blurOverlay: false,
});

const emit = defineEmits<{
  /** `v-model:open` */
  (e: "update:open", open: boolean): void;
}>();
</script>

<template>
  <Dialog
    role="alertdialog"
    :open="open"
    :size="size"
    :close-on-overlay-click="closeOnOverlayClick"
    :close-on-escape="closeOnEscape"
    :initial-focus="leastDestructive"
    :final-focus="finalFocus"
    :blur-overlay="blurOverlay"
    v-bind="$attrs"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </Dialog>
</template>
