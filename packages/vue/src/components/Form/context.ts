// packages/vue/src/components/Form/context.ts
//
// Form field wiring with no form-library dependency. A field is a control plus its label,
// description and error message; `@mild-ui/primitives/field` links them (`for` /
// `aria-labelledby`, `aria-describedby`, `aria-invalid`) on the DOM once the control mounts.
//
//   <FormField name="email" label="Email" description="Work address" :error="errors.email">
//     <Input v-model="email" />
//   </FormField>
//
// Validation state comes in through props (`error`), so any form library - or none - can
// drive it.
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";

export type FormItemPart = "label" | "description" | "message";
export type FormItemParts = Partial<Record<FormItemPart, HTMLElement | null>>;

export interface FormItemContextValue {
  /** Base for the generated ids. */
  id: string;
  /** Field name, forwarded to the control for form submission. */
  name: ComputedRef<string | undefined>;
  /** Current error message; the field is invalid while it is truthy. */
  error: ComputedRef<string | undefined>;
  /** Invalid without a message (e.g. the message is hidden). */
  invalid: ComputedRef<boolean>;
  required: ComputedRef<boolean>;
  /** The mounted label/description/message elements, for the field primitive to wire up. */
  parts: FormItemParts;
  register: (part: FormItemPart, element: HTMLElement | null) => void;
}

const FormItemKey: InjectionKey<FormItemContextValue> = Symbol("mild-ui:form-item");

export function provideFormItem(context: FormItemContextValue): void {
  provide(FormItemKey, context);
}

/** The enclosing field, or `null` outside one. */
export function useOptionalFormItem(): FormItemContextValue | null {
  return inject(FormItemKey, null);
}

export function useFormItemContext(part: string): FormItemContextValue {
  const context = inject(FormItemKey, null);
  if (!context) throw new Error(`<${part}> must be used inside <FormItem> or <FormField>`);
  return context;
}

export interface FormFieldState {
  id: string;
  name: ComputedRef<string | undefined>;
  error: ComputedRef<string | undefined>;
  invalid: ComputedRef<boolean>;
  required: ComputedRef<boolean>;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
}

/** Ids and state of the surrounding field, for custom parts. */
export function useFormField(part = "useFormField"): FormFieldState {
  const { id, name, error, invalid, required } = useFormItemContext(part);
  return {
    id,
    name,
    error,
    invalid,
    required,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
}

/** Registers a part's element with the field while it is mounted. */
export function useRegisteredPart(part: FormItemPart, partName: string) {
  const { register } = useFormItemContext(partName);
  return (element: HTMLElement | null) => register(part, element);
}
