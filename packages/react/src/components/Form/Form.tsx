"use client";

// packages/react/src/components/Form/Form.tsx
//
// Form field wiring with no form-library dependency. A field is a control plus its label,
// description and error message; `@mild-ui/primitives/field` links them (`for` /
// `aria-labelledby`, `aria-describedby`, `aria-invalid`) on the DOM once the control mounts.
//
//   <FormField name="email" label="Email" description="Work address" error={errors.email}>
//     <Input />
//   </FormField>
//
// Validation state comes in through props (`error`), so any form library - or none - can
// drive it. A react-hook-form integration lives in the Storybook examples.
import * as React from "react";
import { createField } from "@mild-ui/primitives/field";
import { cn } from "../../utils/cn";
import { useMachine } from "../../hooks/useMachine";
import { Label } from "../Label";

// ---------------------------------------------------------------------------------------------
// Form: a plain <form>
// ---------------------------------------------------------------------------------------------

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn("mild-form", className)} {...props} />
));
Form.displayName = "Form";

// ---------------------------------------------------------------------------------------------
// FormItem: owns one field's ids, validation state and mounted parts
// ---------------------------------------------------------------------------------------------

type FormItemPart = "label" | "description" | "message";
type FormItemParts = Partial<Record<FormItemPart, HTMLElement | null>>;

interface FormItemContextValue {
  /** Base for the generated ids. */
  id: string;
  /** Field name, forwarded to the control for form submission. */
  name?: string;
  /** Current error message; the field is invalid while it is truthy. */
  error?: React.ReactNode;
  /** Invalid without a message (e.g. the message is hidden). */
  invalid: boolean;
  required: boolean;
  /** The mounted label/description/message elements, for the field primitive to wire up. */
  parts: FormItemParts;
  register: (part: FormItemPart, element: HTMLElement | null) => void;
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

function useFormItemContext(part: string): FormItemContextValue {
  const context = React.useContext(FormItemContext);
  if (!context) throw new Error(`<${part}> must be used inside <FormItem> or <FormField>`);
  return context;
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field name, forwarded to the control. */
  name?: string;
  /** Error message. Renders in <FormMessage> and marks the control invalid. */
  error?: React.ReactNode;
  /** Marks the control invalid even without an error message. */
  invalid?: boolean;
  /** Marks the control required and shows the label marker. */
  required?: boolean;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, name, error, invalid: invalidProp, required = false, ...props }, ref) => {
    const id = React.useId();
    const [parts, setParts] = React.useState<FormItemParts>({});
    const register = React.useCallback((part: FormItemPart, element: HTMLElement | null) => {
      setParts((current) =>
        current[part] === element ? current : { ...current, [part]: element },
      );
    }, []);
    const invalid = invalidProp ?? Boolean(error);
    const context = React.useMemo<FormItemContextValue>(
      () => ({ id, name, error, invalid, required, parts, register }),
      [id, name, error, invalid, required, parts, register],
    );

    return (
      <FormItemContext.Provider value={context}>
        <div
          ref={ref}
          className={cn("mild-form-item", className)}
          data-invalid={invalid ? "" : undefined}
          data-required={required ? "" : undefined}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

/** Ids and state of the surrounding field, for custom parts. */
function useFormField(part = "useFormField") {
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

function useRegisteredRef<Element extends HTMLElement>(
  part: FormItemPart,
  forwarded: React.ForwardedRef<Element>,
): React.RefCallback<Element> {
  const { register } = useFormItemContext(part);
  return React.useCallback(
    (element: Element | null) => {
      register(part, element);
      if (typeof forwarded === "function") forwarded(element);
      else if (forwarded) forwarded.current = element;
    },
    [register, part, forwarded],
  );
}

// ---------------------------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------------------------

const FormLabel = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<typeof Label>>(
  ({ className, required, error, ...props }, ref) => {
    const field = useFormField("FormLabel");
    const registeredRef = useRegisteredRef<HTMLLabelElement>("label", ref);

    return (
      <Label
        ref={registeredRef}
        htmlFor={field.formItemId}
        required={required ?? field.required}
        error={error ?? field.invalid}
        className={className}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

/** Props a <FormControl> injects into its child control. */
export interface FieldChildProps {
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
  [key: string]: unknown;
}

/** The ref a consumer put on the child element (a prop in React 19, `element.ref` before). */
function getElementRef(element: React.ReactElement<FieldChildProps>): React.Ref<unknown> | null {
  const isReact19 = Number(React.version.split(".")[0]) >= 19;
  if (isReact19) return (element.props as { ref?: React.Ref<unknown> }).ref ?? null;
  return (element as { ref?: React.Ref<unknown> }).ref ?? null;
}

function assignRef<T>(ref: React.Ref<T> | null | undefined, value: T | null): void {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

export interface FormControlProps {
  /**
   * The single control element. It must forward its ref to the focusable element, or to a
   * wrapper around it (an `InputGroup`), in which case the control is found inside.
   */
  children: React.ReactElement<FieldChildProps>;
  className?: string;
}

const NATIVE_CONTROL = 'input:not([type="hidden"]), textarea, select';
const CUSTOM_CONTROL = "[role], button";

/**
 * The element the field is wired to: the child itself when it is a control, otherwise the
 * first control inside it (a wrapper such as <InputGroup> forwards its ref to its own div).
 */
function resolveControl(element: HTMLElement): HTMLElement {
  if (element.matches(`${NATIVE_CONTROL}, ${CUSTOM_CONTROL}`)) return element;
  return (
    element.querySelector<HTMLElement>(NATIVE_CONTROL) ??
    element.querySelector<HTMLElement>(CUSTOM_CONTROL) ??
    element
  );
}

/**
 * Wires the child control to the field's label, description and error message. The ids,
 * `aria-describedby` (description first, error last, error only while invalid) and
 * `aria-invalid` come from `@mild-ui/primitives/field`, applied once the control mounts.
 */
const FormControl = React.forwardRef<HTMLElement, FormControlProps>(
  ({ children, className }, ref) => {
    const field = useFormField("FormControl");
    const { parts } = useFormItemContext("FormControl");

    const machine = useMachine(
      (control: HTMLElement, options) => createField({ control, ...options }),
      {
        label: parts.label,
        description: parts.description,
        error: parts.message,
        id: field.formItemId,
        invalid: field.invalid,
      },
      (instance, options) => instance.setInvalid(options.invalid),
      // The message only exists while there is an error, so the field is rebuilt when parts change.
      [parts.label, parts.description, parts.message],
    );

    const child = React.Children.only(children);
    const childRef = getElementRef(child);
    const composedRef = React.useCallback(
      (element: HTMLElement | null) => {
        machine.ref(element && resolveControl(element));
        assignRef(childRef, element);
        assignRef(ref, element);
      },
      [machine, childRef, ref],
    );

    return React.cloneElement(child, {
      ref: composedRef,
      id: child.props.id ?? field.formItemId,
      name: child.props.name ?? field.name,
      required: child.props.required ?? (field.required || undefined),
      className: cn(child.props.className, className),
    } as FieldChildProps);
  },
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField("FormDescription");
  const registeredRef = useRegisteredRef<HTMLParagraphElement>("description", ref);

  return (
    <p
      ref={registeredRef}
      id={formDescriptionId}
      className={cn("mild-form-description", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField("FormMessage");
  const registeredRef = useRegisteredRef<HTMLParagraphElement>("message", ref);
  const body = error ?? children;

  if (!body) return null;

  return (
    <p
      ref={registeredRef}
      id={formMessageId}
      className={cn("mild-form-message", className)}
      // Errors appear after the user acts; announce them without moving focus.
      role="alert"
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

// ---------------------------------------------------------------------------------------------
// FormField: the whole field in one go
// ---------------------------------------------------------------------------------------------

export interface FormFieldProps extends Omit<FormItemProps, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** The control. It must forward its ref to the focusable element. */
  children: React.ReactElement<FieldChildProps>;
  /** Keep the control invalid but do not render the message. */
  hideError?: boolean;
}

/**
 * Label + control + description + error message, linked automatically:
 * the label names the control, the description and (while present) the error describe it,
 * and the error marks it invalid.
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, description, children, hideError = false, ...itemProps }, ref) => (
    <FormItem ref={ref} {...itemProps}>
      {label !== undefined && label !== null && <FormLabel>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description !== undefined && description !== null && (
        <FormDescription>{description}</FormDescription>
      )}
      {!hideError && <FormMessage />}
    </FormItem>
  ),
);
FormField.displayName = "FormField";

/** @deprecated Use `FormField`. */
const Field = FormField;

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  Field,
};
