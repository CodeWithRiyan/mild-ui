<!-- packages/vue/src/components/Dialog/DialogTitle.vue -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useDialogContext } from "./context";

// The dialog's accessible name (`aria-labelledby`).
const { titleId, hasTitle } = useDialogContext("DialogTitle");
onMounted(() => {
  hasTitle.value = true;
});
onBeforeUnmount(() => {
  hasTitle.value = false;
});
</script>

<template>
  <h2 :id="titleId" class="mild-modal-title"><slot /></h2>
</template>
