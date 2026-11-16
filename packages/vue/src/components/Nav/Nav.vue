<!-- packages/vue/src/components/Nav/Nav.vue -->
<script setup lang="ts">
import { cn } from "../../utils/cn";
import type { NavProps } from "../../types/nav";

// Site or section navigation (`nav > ul > li > a`). Links are plain links in the normal Tab
// order: this is not a tablist, so there is no roving tabindex and no arrow-key handling.
// Horizontal navs scroll sideways on narrow screens instead of wrapping.
withDefaults(defineProps<NavProps>(), {
  variant: "plain",
  orientation: "horizontal",
  ui: undefined,
});
</script>

<template>
  <!-- Several navigations can share a page, so it names itself; a caller's aria-label wins. -->
  <nav aria-label="Main" :class="`mild-nav mild-nav--${variant} mild-nav--${orientation}`">
    <ul :class="cn('mild-nav__list', ui?.list)">
      <slot />
    </ul>
  </nav>
</template>
