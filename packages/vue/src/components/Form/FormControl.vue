<!-- packages/vue/src/components/Form/FormControl.vue -->
<script lang="ts">
import {
  cloneVNode,
  defineComponent,
  isVNode,
  shallowRef,
  Comment,
  Fragment,
  Text,
  type ComponentPublicInstance,
  type VNode,
  type VNodeArrayChildren,
} from "vue";
import { createField } from "@mild-ui/primitives/field";
import { useMachine } from "../../composables/useMachine";
import { useFormField, useFormItemContext } from "./context";

// Hidden inputs are the form-submission shadows of custom controls (Checkbox, Switch, Select),
// never the control itself.
const NATIVE_CONTROL = 'input:not([type="hidden"]):not([hidden]), textarea, select';
const CUSTOM_CONTROL = "[role], button";
const CONTROL_TAGS = ["input", "textarea", "select", "button"];

/**
 * The element the field is wired to: the child itself when it is a control, otherwise the
 * first control inside it (a wrapper such as the checkbox field forwards its root div).
 */
function resolveControl(element: HTMLElement): HTMLElement {
  if (element.matches(`${NATIVE_CONTROL}, ${CUSTOM_CONTROL}`)) return element;
  return (
    element.querySelector<HTMLElement>(NATIVE_CONTROL) ??
    element.querySelector<HTMLElement>(CUSTOM_CONTROL) ??
    element
  );
}

/** Flattens forwarded slots (`<slot />` renders a Fragment) and drops whitespace and comments. */
function flatten(children: VNodeArrayChildren): VNode[] {
  const result: VNode[] = [];
  for (const child of children) {
    if (!isVNode(child)) continue;
    if (child.type === Fragment && Array.isArray(child.children)) {
      result.push(...flatten(child.children));
    } else if (child.type !== Comment && !(child.type === Text && !String(child.children).trim())) {
      result.push(child);
    }
  }
  return result;
}

/** The single control vnode in the slot. */
function onlyChild(children: VNodeArrayChildren): VNode {
  const elements = flatten(children);
  if (elements.length !== 1) throw new Error("<FormControl> expects exactly one child control");
  return elements[0];
}

/**
 * Wires the child control to the field's label, description and error message. The ids,
 * `aria-describedby` (description first, error last, error only while invalid) and
 * `aria-invalid` come from `@mild-ui/primitives/field`, applied once the control mounts.
 */
export default defineComponent({
  name: "FormControl",
  props: {
    class: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const field = useFormField("FormControl");
    const { parts } = useFormItemContext("FormControl");
    const control = shallowRef<HTMLElement | null>(null);

    useMachine(
      control,
      (element, options) => createField({ control: element, ...options }),
      () => ({
        label: parts.label,
        description: parts.description,
        error: parts.message,
        id: field.formItemId,
        invalid: field.invalid.value,
      }),
      (instance, options) => instance.setInvalid(options.invalid),
      // The message only exists while there is an error, so the field is rebuilt when parts change.
      () => [parts.label, parts.description, parts.message],
    );

    function setControl(value: Element | ComponentPublicInstance | null): void {
      const element = value instanceof Element ? value : (value?.$el ?? null);
      control.value = element instanceof HTMLElement ? resolveControl(element) : null;
    }

    return () => {
      const child = onlyChild(slots.default?.() ?? []);
      const existing = (child.props ?? {}) as Record<string, unknown>;
      // A component or a native control takes the field's id/name/required itself. A plain
      // wrapper element does not: the control found inside it gets the id from the primitive.
      const isControl =
        typeof child.type !== "string" ||
        CONTROL_TAGS.includes(child.type) ||
        existing.role !== undefined;
      return cloneVNode(
        child,
        {
          ref: setControl,
          class: props.class,
          ...(isControl && {
            id: existing.id ?? field.formItemId,
            name: existing.name ?? field.name.value,
            required: existing.required ?? (field.required.value || undefined),
          }),
        },
        true,
      );
    };
  },
});
</script>
