<!-- packages/vue/src/components/Dialog/DialogContent.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createDialog } from "@mild-ui/primitives/dialog";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { resolveFocusTarget, useDialogContext } from "./context";

// The dialog panel: `role="dialog"` / `"alertdialog"`, named by `DialogTitle`.
const context = useDialogContext("DialogContent");
const element = ref<HTMLDivElement | null>(null);

useMachine(
  element,
  (el, options) =>
    createDialog({
      element: el,
      ...options,
      // Read when the panel mounts, so template refs point at rendered elements.
      initialFocus: resolveFocusTarget(context.initialFocus.value) ?? undefined,
      returnFocus: resolveFocusTarget(context.finalFocus.value) ?? true,
    }),
  () => ({ onClose: context.close, closeOnEscape: context.closeOnEscape.value, modal: true }),
);

const classes = computed(() =>
  cn(
    "mild-modal-content",
    `mild-modal-content--${context.size.value}`,
    context.role.value === "alertdialog" && "mild-modal-content--alert",
  ),
);
</script>

<template>
  <div
    ref="element"
    :role="context.role.value"
    :aria-labelledby="context.hasTitle.value ? context.titleId : undefined"
    :aria-describedby="context.hasDescription.value ? context.descriptionId : undefined"
    :class="classes"
  >
    <slot />
  </div>
</template>
