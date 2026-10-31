<!-- packages/vue/src/components/Form/FormItem.vue -->
<script setup lang="ts">
import { computed, shallowReactive } from "vue";
import { useId } from "../../composables/useId";
import { provideFormItem, type FormItemPart, type FormItemParts } from "./context";
import type { FormItemProps } from "../../types/form";

const props = withDefaults(defineProps<FormItemProps>(), {
  name: undefined,
  error: undefined,
  invalid: undefined,
  required: false,
});

const id = useId();
const parts = shallowReactive<FormItemParts>({});
const invalid = computed(() => props.invalid ?? Boolean(props.error));

function register(part: FormItemPart, element: HTMLElement | null): void {
  // shallowReactive only notifies when the element actually changes.
  parts[part] = element;
}

/** Owns one field's ids, validation state and mounted parts. */
provideFormItem({
  id,
  name: computed(() => props.name),
  error: computed(() => props.error),
  invalid,
  required: computed(() => props.required),
  parts,
  register,
});
</script>

<template>
  <div
    class="mild-form-item"
    :data-invalid="invalid ? '' : undefined"
    :data-required="required ? '' : undefined"
  >
    <slot />
  </div>
</template>
