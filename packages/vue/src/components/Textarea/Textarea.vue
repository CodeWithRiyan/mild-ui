<!-- packages/vue/src/components/Textarea/Textarea.vue -->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { textareaVariants } from "../../utils/textarea";
import type { TextareaProps } from "../../types/textarea";

// Multi-line text field with the same variants, sizes and states as `Input`. `autoResize`
// grows the field with its content instead of scrolling.
const props = withDefaults(defineProps<TextareaProps>(), {
  variant: "outline",
  size: "md",
  fullWidth: true,
  error: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  disabled: false,
  readonly: false,
  required: false,
  resize: "vertical",
  autoResize: false,
  rows: 3,
  modelValue: undefined,
  id: undefined,
  name: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
}>();

const element = ref<HTMLTextAreaElement | null>(null);
const invalid = computed(() => props.error || props.isInvalid);
const disabled = computed(() => props.disabled || props.isDisabled);
const readonly = computed(() => props.readonly || props.isReadOnly);
const required = computed(() => props.required || props.isRequired);

const classes = computed(() =>
  textareaVariants({
    variant: props.variant,
    size: props.size,
    fullWidth: props.fullWidth,
    error: invalid.value,
    disabled: disabled.value,
    readonly: readonly.value,
    required: required.value,
    resize: props.resize,
    autoResize: props.autoResize,
  }),
);

/** Sets the height to fit the content (used by `autoResize`). */
function fitToContent(textarea: HTMLTextAreaElement): void {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function fit(): void {
  if (props.autoResize && element.value) fitToContent(element.value);
}

// Fit on mount and whenever the (controlled) value changes from outside.
onMounted(fit);
watch(() => [props.autoResize, props.modelValue], fit, { flush: "post" });

function onInput(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement;
  if (props.autoResize) fitToContent(textarea);
  emit("update:modelValue", textarea.value);
}
</script>

<template>
  <textarea
    :id="id"
    ref="element"
    :name="name"
    :rows="rows"
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
