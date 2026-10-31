// packages/react/src/components/Input/Input.tsx
import * as React from "react";
import type { InputPasswordCoreProps } from "../../types/input-password";
import { inputPasswordVariants, inputPasswordToggleVariants } from "../../utils/input-password";
import { cn } from "../../utils";
import { EyeIcon, EyeOffIcon } from "../icons";

// Add 'value' to the Omit list
export interface InputPasswordProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    InputPasswordCoreProps {
  visibleIcon?: React.ReactNode;
  hiddenIcon?: React.ReactNode;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
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
      className,
      ui,
      visibleIcon,
      hiddenIcon,
      // Styling-only props: consumed here so they never reach the DOM.
      colorScheme: _colorScheme,
      errorBorderColor: _errorBorderColor,
      focusBorderColor: _focusBorderColor,
      ...rest
    },
    ref,
  ) => {
    const [typeInput, setTypeInput] = React.useState<"password" | "text">("password");
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const invalid = error || isInvalid;

    const composedRef = React.useCallback(
      (element: HTMLInputElement | null) => {
        inputRef.current = element;
        if (typeof ref === "function") ref(element);
        else if (ref) ref.current = element;
      },
      [ref],
    );

    /**
     * Switching `type` must not interrupt typing: when the input has focus, it keeps focus and
     * its selection. Activating the toggle from the keyboard leaves focus on the toggle.
     */
    const toggleVisibility = () => {
      const input = inputRef.current;
      const hadFocus = input !== null && input.ownerDocument.activeElement === input;
      const selection = hadFocus ? [input.selectionStart, input.selectionEnd] : null;

      setTypeInput((current) => (current === "password" ? "text" : "password"));

      if (!hadFocus) return;
      // The type switch re-renders the input; restore focus and caret after it commits.
      requestAnimationFrame(() => {
        input.focus();
        if (selection && selection[0] !== null && selection[1] !== null) {
          input.setSelectionRange(selection[0], selection[1]);
        }
      });
    };
    // Generate classes using core variant system
    const classes = inputPasswordVariants({
      variant,
      size,
      fullWidth,
      error: invalid,
      disabled,
      readonly,
      required,
      className,
    });

    return (
      <div
        className={cn(
          "mild-input-password-field",
          fullWidth && "mild-input-password-field--full-width",
          ui?.container,
        )}
      >
        <input
          ref={composedRef}
          type={typeInput}
          className={cn(classes, ui?.input)}
          disabled={disabled}
          readOnly={readonly}
          required={required}
          aria-invalid={invalid || undefined}
          data-controlled={rest.value !== undefined ? "true" : undefined}
          {...rest}
        />
        <button
          type="button"
          className={cn(inputPasswordToggleVariants({ size }), ui?.buttonIcon)}
          aria-label={typeInput === "password" ? "Show password" : "Hide password"}
          aria-pressed={typeInput === "text"}
          // A mousedown on the toggle would move focus off the input; opt out of that so the
          // caret stays where the user is typing. Keyboard focus is unaffected.
          onMouseDown={(event) => event.preventDefault()}
          onClick={toggleVisibility}
        >
          {typeInput === "password" ? (visibleIcon ?? <EyeIcon />) : (hiddenIcon ?? <EyeOffIcon />)}
        </button>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
