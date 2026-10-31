// packages/react/src/components/Textarea/Textarea.tsx
import * as React from "react";
import type { TextareaCoreProps } from "../../types";
import { textareaVariants } from "../../utils/textarea";
import { useIsomorphicLayoutEffect } from "../../hooks/useHydrated";

export interface TextareaProps
  extends TextareaCoreProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Sets the height to fit the content (used by `autoResize`). */
function fitToContent(element: HTMLTextAreaElement): void {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
}

/**
 * Multi-line text field with the same variants, sizes and states as `Input`. `autoResize`
 * grows the field with its content instead of scrolling.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "outline",
      size = "md",
      fullWidth = true,
      error = false,
      isInvalid = false,
      isDisabled: disabled = false,
      isReadOnly: readonly = false,
      isRequired: required = false,
      resize = "vertical",
      autoResize = false,
      rows = 3,
      className,
      onInput,
      ...rest
    },
    ref,
  ) => {
    const invalid = error || isInvalid;
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const composedRef = React.useCallback(
      (element: HTMLTextAreaElement | null) => {
        innerRef.current = element;
        if (typeof ref === "function") ref(element);
        else if (ref) ref.current = element;
      },
      [ref],
    );

    // Fit on mount and whenever the (controlled) value changes from outside.
    useIsomorphicLayoutEffect(() => {
      if (autoResize && innerRef.current) fitToContent(innerRef.current);
    }, [autoResize, rest.value, rest.defaultValue]);

    // Typed from the element's own prop: the event type differs between @types/react 18 and 19.
    const handleInput: NonNullable<TextareaProps["onInput"]> = (event) => {
      if (autoResize) fitToContent(event.currentTarget);
      onInput?.(event);
    };

    const classes = textareaVariants({
      variant,
      size,
      fullWidth,
      error: invalid,
      isDisabled: disabled,
      isReadOnly: readonly,
      isRequired: required,
      resize,
      autoResize,
      className,
    });

    return (
      <textarea
        ref={composedRef}
        rows={rows}
        className={classes}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        aria-invalid={invalid || undefined}
        data-controlled={rest.value !== undefined ? "true" : undefined}
        onInput={handleInput}
        {...rest}
      />
    );
  },
);
Textarea.displayName = "Textarea";
