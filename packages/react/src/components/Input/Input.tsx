// packages/react/src/components/Input/Input.tsx
import React, { forwardRef } from "react";
import type { InputCoreProps } from "../../types";
import { inputVariants } from "../../utils/input";
import { useInputGroup } from "../InputGroup/InputGroup";

export interface InputProps
  extends
    Omit<
      InputCoreProps,
      "onChange" | "onBlur" | "onFocus" | "value" | "defaultValue" | "autoComplete" | "type"
    >,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size: sizeProp,
      fullWidth = true,
      error = false,
      isInvalid = false,
      isDisabled: disabled = false,
      isReadOnly: readonly = false,
      isRequired: required = false,
      type = "text",
      id: idProp,
      name: nameProp,
      required: requiredProp,
      className,
      // Styling-only props: consumed here so they never reach the DOM.
      colorScheme: _colorScheme,
      errorBorderColor: _errorBorderColor,
      focusBorderColor: _focusBorderColor,
      ...rest
    },
    ref,
  ) => {
    const invalid = error || isInvalid;
    // An enclosing <InputGroup> sizes its input and addons together; the prop still wins.
    const group = useInputGroup();
    const size = sizeProp ?? group.size ?? "md";
    // A <FormField> around an <InputGroup> wires the group; the input picks the wiring up here.
    const id = idProp ?? group.id;
    const name = nameProp ?? group.name;
    const isRequiredAttr = requiredProp ?? group.required ?? required;

    // Generate classes using variant system
    const classes = inputVariants({
      variant,
      size,
      fullWidth,
      error: invalid,
      isDisabled: disabled,
      isReadOnly: readonly,
      isRequired: required,
      className,
    });

    return (
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        className={classes}
        disabled={disabled}
        readOnly={readonly}
        required={isRequiredAttr}
        aria-invalid={invalid || undefined}
        data-controlled={rest.value !== undefined ? "true" : undefined}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
