<!-- packages/vue/src/components/Dialog/Dialog.vue -->
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { cn } from "../../utils/cn";
import { useId } from "../../composables/useId";
import { provideDialog } from "./context";
import type { DialogProps } from "../../types/dialog";

// Attributes (class, style) go on the overlay, not on the teleport.
defineOptions({ inheritAttrs: false });

// Modal dialog root. Controlled through `v-model:open`. While open it renders its children in
// a teleport under an overlay, traps focus, locks the page scroll, closes on Escape (and on the
// overlay) and returns focus to the trigger when it closes. Dialogs may nest: Escape closes the
// topmost one only. Behaviour comes from `@mild-ui/primitives/dialog`, bound by `DialogContent`.
const props = withDefaults(defineProps<DialogProps>(), {
  role: "dialog",
  size: "md",
  closeOnOverlayClick: undefined,
  closeOnEscape: true,
  initialFocus: undefined,
  finalFocus: undefined,
  blurOverlay: false,
});

const emit = defineEmits<{
  /** `v-model:open`: the user asked to close it (Escape, the overlay, a close button). */
  (e: "update:open", open: boolean): void;
}>();

const baseId = useId();
// Teleports cannot be server-rendered: the dialog mounts once the page is hydrated.
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const closeOnOverlayClick = computed(
  () => props.closeOnOverlayClick ?? props.role !== "alertdialog",
);

function close(): void {
  emit("update:open", false);
}

provideDialog({
  role: computed(() => props.role),
  size: computed(() => props.size),
  closeOnEscape: computed(() => props.closeOnEscape),
  titleId: `${baseId}-title`,
  descriptionId: `${baseId}-description`,
  hasTitle: ref(false),
  hasDescription: ref(false),
  initialFocus: computed(() => props.initialFocus),
  finalFocus: computed(() => props.finalFocus),
  close,
});

function onOverlayClick(event: MouseEvent): void {
  // Only a click on the overlay itself (not inside the panel) closes.
  if (closeOnOverlayClick.value && event.target === event.currentTarget) close();
}
</script>

<template>
  <Teleport v-if="mounted && open" to="body">
    <div
      :class="cn('mild-modal-overlay', blurOverlay && 'mild-modal-overlay--blur')"
      data-dialog-overlay=""
      v-bind="$attrs"
      @click="onOverlayClick"
    >
      <slot />
    </div>
  </Teleport>
</template>
