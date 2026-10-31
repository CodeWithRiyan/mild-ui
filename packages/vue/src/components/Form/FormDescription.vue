<!-- packages/vue/src/components/Form/FormDescription.vue -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useFormField, useRegisteredPart } from "./context";

const { formDescriptionId } = useFormField("FormDescription");
const register = useRegisteredPart("description", "FormDescription");
const element = ref<HTMLParagraphElement | null>(null);

onMounted(() => register(element.value));
onBeforeUnmount(() => register(null));
</script>

<template>
  <p :id="formDescriptionId" ref="element" class="mild-form-description"><slot /></p>
</template>
