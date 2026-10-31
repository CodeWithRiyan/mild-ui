<!-- packages/vue/src/components/Form/FormField.vue -->
<script setup lang="ts">
import FormItem from "./FormItem.vue";
import FormLabel from "./FormLabel.vue";
import FormControl from "./FormControl.vue";
import FormDescription from "./FormDescription.vue";
import FormMessage from "./FormMessage.vue";
import type { FormFieldProps } from "../../types/form";

/**
 * Label + control + description + error message, linked automatically:
 * the label names the control, the description and (while present) the error describe it,
 * and the error marks it invalid.
 */
withDefaults(defineProps<FormFieldProps>(), {
  name: undefined,
  error: undefined,
  invalid: undefined,
  required: false,
  label: undefined,
  description: undefined,
  hideError: false,
  ui: undefined,
});

defineSlots<{
  /** The control. Exactly one element or component. */
  default?: () => unknown;
  /** Rich label content; takes precedence over the `label` prop. */
  label?: () => unknown;
  /** Rich description content; takes precedence over the `description` prop. */
  description?: () => unknown;
}>();
</script>

<template>
  <FormItem :name="name" :error="error" :invalid="invalid" :required="required">
    <FormLabel v-if="$slots.label || label !== undefined" :class="ui?.label">
      <slot name="label">{{ label }}</slot>
    </FormLabel>
    <FormControl :class="ui?.control"><slot /></FormControl>
    <FormDescription
      v-if="$slots.description || description !== undefined"
      :class="ui?.description"
    >
      <slot name="description">{{ description }}</slot>
    </FormDescription>
    <FormMessage v-if="!hideError" :class="ui?.message" />
  </FormItem>
</template>
