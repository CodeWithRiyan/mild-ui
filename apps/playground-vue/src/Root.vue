<!-- apps/playground-vue/src/Root.vue -->
<!-- The app root: the theme provider, then the page. -->
<script setup lang="ts">
import { ThemeProvider } from "@mild-ui/vue";
import App from "./App.vue";
</script>

<template>
  <ThemeProvider default-color-mode="system">
    <App />
  </ThemeProvider>
</template>
