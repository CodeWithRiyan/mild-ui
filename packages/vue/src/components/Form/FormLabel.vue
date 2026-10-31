<!-- packages/vue/src/components/Form/FormLabel.vue -->
<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { Label } from "../Label";
import { useFormField, useRegisteredPart } from "./context";
import type { LabelProps } from "../../types/label";

const props = withDefaults(defineProps<Pick<LabelProps, "required" | "error" | "ui">>(), {
  required: undefined,
  error: undefined,
  ui: undefined,
});

const field = useFormField("FormLabel");
const register = useRegisteredPart("label", "FormLabel");

// A function ref: called with the Label instance on mount and with `null` on unmount, so the
// field knows its label element exactly while it exists.
function setLabel(instance: unknown): void {
  register(instance ? (instance as ComponentPublicInstance).$el : null);
}
</script>

<template>
  <Label
    :ref="setLabel"
    :for="field.formItemId"
    :required="props.required ?? field.required.value"
    :error="props.error ?? field.invalid.value"
    :ui="ui"
  >
    <slot />
  </Label>
</template>
