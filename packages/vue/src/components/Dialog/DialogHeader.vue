<!-- packages/vue/src/components/Dialog/DialogHeader.vue -->
<script setup lang="ts">
import type { DialogHeaderProps } from "../../types/dialog";

withDefaults(defineProps<DialogHeaderProps>(), { noBorder: false });
</script>

<template>
  <div :class="['mild-modal-header', noBorder && 'mild-modal-header--no-border']"><slot /></div>
</template>
