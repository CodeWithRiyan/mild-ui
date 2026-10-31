// storybook/react/src/examples/react-hook-form.tsx
//
// Example integration of @mild-ui/react form parts with react-hook-form.
//
// @mild-ui/react has no form-library dependency: <FormField> takes its validation state
// through props (`error`). This adapter shows how to feed that from react-hook-form, and is
// what the stories use. Copy it into your app if you use react-hook-form.
import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type Control,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem as MildFormItem,
  FormLabel,
  FormMessage,
  type FieldChildProps,
  type FormItemProps as MildFormItemProps,
} from "@mild-ui/react";

/** Provides the react-hook-form methods to the fields below (`<Form {...useForm()}>`). */
export const Form = FormProvider;

// ---------------------------------------------------------------------------------------------
// FormField / FormItem: the composable shape, with the error read from react-hook-form
// ---------------------------------------------------------------------------------------------

const FieldNameContext = React.createContext<string | null>(null);

/** A react-hook-form <Controller> whose field name is known to the <FormItem> it renders. */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FieldNameContext.Provider value={props.name}>
      <Controller {...props} />
    </FieldNameContext.Provider>
  );
}

export type FormItemProps = MildFormItemProps;

/** <FormItem> that takes its name and error message from the surrounding react-hook-form field. */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const name = React.useContext(FieldNameContext);
  const { getFieldState, formState } = useFormContext();
  const error = name ? getFieldState(name, formState).error?.message : undefined;
  return <MildFormItem ref={ref} name={name ?? undefined} error={error} {...props} />;
});
FormItem.displayName = "FormItem";

// ---------------------------------------------------------------------------------------------
// Field: label + control + description + message in one go, bound to a react-hook-form field
// ---------------------------------------------------------------------------------------------

export interface FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control?: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactElement<FieldChildProps>;
  required?: boolean;
  className?: string;
  hideError?: boolean;
  /** The control reports `onCheckedChange(boolean)` (Checkbox, Switch). */
  isBoolean?: boolean;
  /** The control reports `onValueChange(string)` (Radio, Select). */
  isRadio?: boolean;
}

export function Field<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  required,
  children,
  className,
  isBoolean,
  isRadio,
  hideError = false,
}: FieldProps<TFieldValues, TName>) {
  const formContext = useFormContext<TFieldValues>();
  const finalControl = control ?? formContext?.control;
  if (!finalControl) {
    throw new Error(`Field "${name}" requires a control prop or a surrounding <Form>`);
  }

  return (
    <FormField
      control={finalControl}
      name={name}
      render={({ field, fieldState }) => {
        const childProps = children.props;
        const bound: FieldChildProps = isBoolean
          ? {
              checked: field.value,
              onCheckedChange: (value: boolean | "indeterminate") => {
                field.onChange(value === true);
                (childProps.onCheckedChange as ((v: unknown) => void) | undefined)?.(value);
              },
            }
          : isRadio
            ? {
                value: field.value,
                onValueChange: (value: string) => {
                  field.onChange(value);
                  (childProps.onValueChange as ((v: unknown) => void) | undefined)?.(value);
                },
              }
            : { value: field.value ?? "", onChange: field.onChange };

        return (
          <MildFormItem
            name={name}
            error={fieldState.error?.message}
            required={required}
            className={className}
          >
            {label !== undefined && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {React.cloneElement(children, {
                ...childProps,
                ...bound,
                onBlur: field.onBlur,
                ref: field.ref,
              })}
            </FormControl>
            {description !== undefined && <FormDescription>{description}</FormDescription>}
            {!hideError && <FormMessage />}
          </MildFormItem>
        );
      }}
    />
  );
}
