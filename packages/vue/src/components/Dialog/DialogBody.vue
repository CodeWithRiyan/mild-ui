<!-- packages/vue/src/components/Dialog/DialogBody.vue -->
<script setup lang="ts">
import type { DialogBodyProps } from "../../types/dialog";

withDefaults(defineProps<DialogBodyProps>(), { noPadding: false });
</script>

<template>
  <div :class="['mild-modal-body', noPadding && 'mild-modal-body--no-padding']"><slot /></div>
</template>
