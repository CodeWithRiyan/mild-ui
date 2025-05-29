// packages/react/src/components/Input/Input.tsx
import * as React from "react";
import {
  InputPasswordCoreProps,
  inputPasswordStyles,
  InputPasswordStyleProps,
} from "@mild-ui/core";
import { cn } from "../../utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Add 'value' to the Omit list
export interface InputPasswordProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "type" | "size" | "value"
    >,
    InputPasswordCoreProps,
    InputPasswordStyleProps {
  visibleIcon?: React.ReactNode;
  hiddenIcon?: React.ReactNode;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      className,
      size,
      variant,
      fullWidth,
      error,
      value,
      ui,
      visibleIcon,
      hiddenIcon,
      ...props
    },
    ref
  ) => {
    const [typeInput, setTypeInput] = React.useState("password");

    return (
      <div className={cn("relative", ui?.container)}>
        <input
          type={typeInput}
          className={cn(
            inputPasswordStyles({ size, variant, fullWidth, error }),
            className,
            ui?.input
          )}
          ref={ref}
          value={value}
          {...props}
        />
        <button
          type="button"
          className={cn(
            "absolute top-0 right-0 flex h-full aspect-square items-center justify-center",
            ui?.buttonIcon
          )}
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
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
