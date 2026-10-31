<!-- packages/vue/src/components/InputGroup/InputLeftElement.vue -->
<script setup lang="ts">
import InputElement from "./InputElement.vue";

withDefaults(defineProps<{ interactive?: boolean }>(), { interactive: false });
</script>

<template>
  <InputElement placement="left" :interactive="interactive"><slot /></InputElement>
</template>
