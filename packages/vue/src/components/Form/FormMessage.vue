<!-- packages/vue/src/components/Form/FormMessage.vue -->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFormField, useRegisteredPart } from "./context";

const slots = defineSlots<{ default?: () => unknown }>();
const { error, formMessageId } = useFormField("FormMessage");
const register = useRegisteredPart("message", "FormMessage");
const element = ref<HTMLParagraphElement | null>(null);

/** The field's error, or the slot content as a fallback message. */
const visible = computed(() => Boolean(error.value) || Boolean(slots.default));

// The message only exists while there is something to show; the field is re-wired when the
// element appears or goes away (see useMachine's `deps` in FormControl).
watch(element, (el) => register(el), { immediate: true, flush: "post" });

// Template notes
// Errors appear after the user acts; announce them without moving focus.
</script>

<template>
  <p v-if="visible" :id="formMessageId" ref="element" class="mild-form-message" role="alert">
    <template v-if="error">{{ error }}</template>
    <slot v-else />
  </p>
</template>
