"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Control,
  Controller,
  FormProvider as Form,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "../../utils/cn";
import { Label } from "../Label";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export interface FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control?: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactElement;
  required?: boolean;
  className?: string;
  hideError?: boolean;
  isBoolean?: boolean;
  isRadio?: boolean;
}

const Field = <
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
}: FieldProps<TFieldValues, TName>) => {
  const formContext = useFormContext<TFieldValues>();
  const finalControl = control || formContext?.control;

  if (!finalControl) {
    throw new Error(
      `Field "${name}" requires either a control prop or to be wrapped in FormProvider`,
    );
  }

  return (
    <FormField
      control={finalControl}
      name={name}
      render={({ field, fieldState }) => {
        const injectedProps =
          isBoolean && !isRadio
            ? {
                checked: field.value,
                onCheckedChange: (val: boolean | "indeterminate") => {
                  field.onChange(val === true);
                  children.props.onCheckedChange?.(val);
                },
              }
            : isRadio && !isBoolean
              ? {
                  value: field.value,
                  onValueChange: (val: string) => {
                    field.onChange(val);
                    children.props.onValueChange?.(val);
                  },
                }
              : {
                  value: field.value,
                  onChange: field.onChange,
                };

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel htmlFor={name} required={required}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Slot {...field}>
                {React.cloneElement(children, {
                  ...children.props,
                  ...injectedProps,
                  className: cn(
                    children.props.className,
                    fieldState.error &&
                      "border-destructive focus:border-destructive",
                  ),
                })}
              </Slot>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {!hideError && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};

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
