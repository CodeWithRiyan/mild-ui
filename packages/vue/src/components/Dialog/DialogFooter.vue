<!-- packages/vue/src/components/Dialog/DialogFooter.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { DialogFooterProps } from "../../types/dialog";

const props = withDefaults(defineProps<DialogFooterProps>(), { align: "end", noBorder: false });
const classes = computed(() =>
  cn(
    "mild-modal-footer",
    props.align !== "end" && `mild-modal-footer--${props.align}`,
    props.noBorder && "mild-modal-footer--no-border",
  ),
);
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
