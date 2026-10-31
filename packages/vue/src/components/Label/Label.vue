<!-- packages/vue/src/components/Label/Label.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { labelVariants } from "../../utils/label";
import { cn } from "../../utils/cn";
import { useOptionalFormItem } from "../Form/context";
import type { LabelProps } from "../../types/label";

const props = withDefaults(defineProps<LabelProps>(), {
  for: undefined,
  htmlFor: undefined,
  required: false,
  error: false,
  ui: undefined,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

/** Elements a `<label for>` names and activates by itself (HTML "labelable elements"). */
const LABELABLE = ["BUTTON", "INPUT", "METER", "OUTPUT", "PROGRESS", "SELECT", "TEXTAREA"];
/** Custom controls a label click should activate, as it would a native checkbox/radio. */
const ACTIVATED_BY_LABEL = ["checkbox", "radio", "switch"];

const formItem = useOptionalFormItem();
const htmlFor = computed(() => props.for ?? props.htmlFor);
const classes = computed(() => labelVariants({ required: props.required, error: props.error }));

/**
 * Clicking a label focuses its control. Browsers do this for native controls; custom controls
 * (`span[role="checkbox"]`, ...) are not labelable, so they are focused (and, for checkbox-like
 * roles, activated) here. When the field primitive behind <FormField> owns this label (it is
 * the field's registered label part) it does the same through its own listener, which runs
 * after this one, so the work is left to it and never done twice.
 */
function handleClick(event: MouseEvent): void {
  emit("click", event);
  const target = htmlFor.value;
  if (event.defaultPrevented || !target) return;

  const label = event.currentTarget as HTMLLabelElement;
  const control = label.ownerDocument.getElementById(target);
  if (!control || control.contains(event.target as Node)) return;

  if (LABELABLE.includes(control.tagName)) {
    // The browser activates it; only make sure it also receives focus.
    control.focus();
    return;
  }
  if (formItem?.parts.label === label) return;

  event.preventDefault();
  control.focus();
  if (ACTIVATED_BY_LABEL.includes(control.getAttribute("role") ?? "")) control.click();
}

// Template notes
// A label is natively clickable (it activates its control); the handler only extends that native
// behaviour to custom controls, so no keyboard listener is needed.
//
// Decorative: the control's own `required`/`aria-required` is what gets announced, so the marker
// is hidden from assistive tech to avoid "required" being read twice.
</script>

<template>
  <label :class="classes" :for="htmlFor" @click="handleClick">
    <slot />
    <span
      v-if="required"
      :class="cn('mild-label__marker', ui?.asterisk)"
      aria-hidden="true"
      data-required-marker=""
      >*</span
    >
  </label>
</template>
