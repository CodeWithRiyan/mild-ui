// packages/react/src/components/Input/Input.tsx
import * as React from "react";
import {
  InputPasswordCoreProps,
  inputPasswordVariants,
  cn,
  inputPasswordToggleVariants,
} from "../../../../core";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Add 'value' to the Omit list
export interface InputPasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
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
      disabled = false,
      readonly = false,
      required = false,
      className,
      ui,
      visibleIcon,
      hiddenIcon,
      ...rest
    },
    ref,
  ) => {
    const [typeInput, setTypeInput] = React.useState("password");
    // Generate classes using core variant system
    const classes = inputPasswordVariants({
      variant,
      size,
      fullWidth,
      error,
      disabled,
      readonly,
      required,
      className,
    });

    return (
      <div style={{ position: "relative" }} className={cn(ui?.container)}>
        <input
          ref={ref}
          type={typeInput}
          className={cn(classes, ui?.input)}
          disabled={disabled}
          required={required}
          aria-invalid={error || undefined}
          data-controlled={rest.value !== undefined ? "true" : undefined}
          {...rest}
        />
        <button
          type="button"
          className={cn(inputPasswordToggleVariants({ size }), ui?.buttonIcon)}
          onClick={() =>
            setTypeInput(typeInput === "password" ? "text" : "password")
          }
        >
          {typeInput === "password"
            ? visibleIcon || <EyeIcon size={16} />
            : hiddenIcon || <EyeOffIcon size={16} />}
        </button>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
