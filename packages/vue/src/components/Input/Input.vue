<!-- packages/vue/src/components/Input/Input.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { inputVariants } from "../../utils/input";
import { useInputGroup } from "../InputGroup/context";
import type { InputProps } from "../../types/input";

const props = withDefaults(defineProps<InputProps>(), {
  variant: "outline",
  size: undefined,
  fullWidth: true,
  error: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  disabled: false,
  readonly: false,
  required: undefined,
  type: "text",
  modelValue: undefined,
  id: undefined,
  name: undefined,
  // Styling-only props: consumed here so they never reach the DOM.
  colorScheme: undefined,
  errorBorderColor: undefined,
  focusBorderColor: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
}>();

// An enclosing <InputGroup> sizes its input and addons together; the prop still wins. A
// <FormField> around an <InputGroup> wires the group; the input picks the wiring up here.
const group = useInputGroup();
const size = computed(() => props.size ?? group?.size.value ?? "md");
const id = computed(() => props.id ?? group?.id.value);
const name = computed(() => props.name ?? group?.name.value);

const invalid = computed(() => props.error || props.isInvalid);
const disabled = computed(() => props.disabled || props.isDisabled);
const readonly = computed(() => props.readonly || props.isReadOnly);
const required = computed(() => props.required ?? group?.required.value ?? props.isRequired);

const classes = computed(() =>
  inputVariants({
    variant: props.variant,
    size: size.value,
    fullWidth: props.fullWidth,
    error: invalid.value,
    disabled: disabled.value,
    readonly: readonly.value,
    required: Boolean(required.value),
  }),
);

function onInput(event: Event): void {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    :id="id"
    :type="type"
    :name="name"
    :class="classes"
    :value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :aria-invalid="invalid || undefined"
    :data-controlled="modelValue !== undefined ? 'true' : undefined"
    @input="onInput"
  />
</template>
