<!-- packages/vue/src/components/InputPassword/InputPassword.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { inputPasswordVariants, inputPasswordToggleVariants } from "../../utils/input-password";
import { cn } from "../../utils/cn";
import { EyeIcon, EyeOffIcon } from "../icons";
import type { InputPasswordProps } from "../../types/input-password";

// The wrapper is a plain div; attributes (placeholder, autocomplete, aria-*...) go on the input.
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<InputPasswordProps>(), {
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
  modelValue: undefined,
  id: undefined,
  name: undefined,
  ui: undefined,
  // Styling-only props: consumed here so they never reach the DOM.
  colorScheme: undefined,
  errorBorderColor: undefined,
  focusBorderColor: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
}>();

defineSlots<{
  /** Toggle glyph while the password is hidden ("Show password"). Defaults to an eye. */
  visibleIcon?: () => unknown;
  /** Toggle glyph while the password is shown ("Hide password"). Defaults to a crossed eye. */
  hiddenIcon?: () => unknown;
}>();

const inputType = ref<"password" | "text">("password");
const input = ref<HTMLInputElement | null>(null);

const invalid = computed(() => props.error || props.isInvalid);
const disabled = computed(() => props.disabled || props.isDisabled);
const readonly = computed(() => props.readonly || props.isReadOnly);
const required = computed(() => props.required || props.isRequired);

const classes = computed(() =>
  inputPasswordVariants({
    variant: props.variant,
    size: props.size,
    fullWidth: props.fullWidth,
    error: invalid.value,
    disabled: disabled.value,
    readonly: readonly.value,
    required: required.value,
  }),
);

/**
 * Switching `type` must not interrupt typing: when the input has focus, it keeps focus and its
 * selection. Activating the toggle from the keyboard leaves focus on the toggle.
 */
function toggleVisibility(): void {
  const element = input.value;
  const hadFocus = element !== null && element.ownerDocument.activeElement === element;
  const selection = hadFocus ? [element.selectionStart, element.selectionEnd] : null;

  inputType.value = inputType.value === "password" ? "text" : "password";

  if (!hadFocus) return;
  // The type switch re-renders the input; restore focus and caret after it commits.
  requestAnimationFrame(() => {
    element.focus();
    if (selection && selection[0] !== null && selection[1] !== null) {
      element.setSelectionRange(selection[0], selection[1]);
    }
  });
}

function onInput(event: Event): void {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}

// Template notes
// A mousedown on the toggle would move focus off the input; `.prevent` opts out of that so the
// caret stays where the user is typing. Keyboard focus is unaffected.
</script>

<template>
  <div
    :class="
      cn(
        'mild-input-password-field',
        fullWidth && 'mild-input-password-field--full-width',
        ui?.container,
      )
    "
  >
    <input
      :id="id"
      ref="input"
      :type="inputType"
      :name="name"
      :class="cn(classes, ui?.input)"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :aria-invalid="invalid || undefined"
      :data-controlled="modelValue !== undefined ? 'true' : undefined"
      v-bind="$attrs"
      @input="onInput"
    />
    <button
      type="button"
      :class="cn(inputPasswordToggleVariants({ size }), ui?.buttonIcon)"
      :aria-label="inputType === 'password' ? 'Show password' : 'Hide password'"
      :aria-pressed="inputType === 'text'"
      @mousedown.prevent
      @click="toggleVisibility"
    >
      <slot v-if="inputType === 'password'" name="visibleIcon"><EyeIcon /></slot>
      <slot v-else name="hiddenIcon"><EyeOffIcon /></slot>
    </button>
  </div>
</template>
