<!-- packages/vue/src/components/Breadcrumb/BreadcrumbItem.vue -->
<script setup lang="ts">
import type { BreadcrumbItemProps } from "../../types/breadcrumb";

// One step of the trail (a list item).
withDefaults(defineProps<BreadcrumbItemProps>(), { as: "li" });
</script>

<template>
  <component :is="as" class="mild-breadcrumb-item"><slot /></component>
</template>
