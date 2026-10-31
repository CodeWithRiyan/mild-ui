<!-- packages/vue/src/components/InputGroup/InputRightElement.vue -->
<script setup lang="ts">
import InputElement from "./InputElement.vue";

withDefaults(defineProps<{ interactive?: boolean }>(), { interactive: false });
</script>

<template>
  <InputElement placement="right" :interactive="interactive"><slot /></InputElement>
</template>
