<!-- packages/vue/src/components/Skeleton/SkeletonText.vue -->
<script setup lang="ts">
import Skeleton from "./Skeleton.vue";
import type { SkeletonTextProps } from "../../types/feedback";

// A paragraph placeholder: `lines` text skeletons.
withDefaults(defineProps<SkeletonTextProps>(), {
  lines: 3,
  animation: "pulse",
  width: undefined,
  loaded: false,
});
</script>

<template>
  <slot v-if="loaded" />
  <div v-else aria-hidden="true" class="mild-skeleton-text">
    <Skeleton
      v-for="line in lines"
      :key="line"
      variant="text"
      :animation="animation"
      :width="width"
    />
  </div>
</template>
