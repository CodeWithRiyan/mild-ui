<!-- packages/vue/src/components/Dialog/DialogDescription.vue -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useDialogContext } from "./context";

// The dialog's accessible description (`aria-describedby`).
const { descriptionId, hasDescription } = useDialogContext("DialogDescription");
onMounted(() => {
  hasDescription.value = true;
});
onBeforeUnmount(() => {
  hasDescription.value = false;
});
</script>

<template>
  <p :id="descriptionId" class="mild-modal-description"><slot /></p>
</template>
