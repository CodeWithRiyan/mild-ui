<!-- packages/vue/src/components/Nav/NavItem.vue -->
<script setup lang="ts">
import type { NavItemProps } from "../../types/nav";

// One entry of the list (a list item); holds a `NavLink`.
withDefaults(defineProps<NavItemProps>(), { as: "li" });
</script>

<template>
  <component :is="as" class="mild-nav-item"><slot /></component>
</template>
