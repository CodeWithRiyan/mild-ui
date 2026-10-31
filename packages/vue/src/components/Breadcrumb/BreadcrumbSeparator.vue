<!-- packages/vue/src/components/Breadcrumb/BreadcrumbSeparator.vue -->
<script setup lang="ts">
// The glyph between two items. It is decorative (`aria-hidden`), so screen readers announce
// the trail without reading a separator between every step.
</script>

<template>
  <li class="mild-breadcrumb-separator" aria-hidden="true"><slot>/</slot></li>
</template>
