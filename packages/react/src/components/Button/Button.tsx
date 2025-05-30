// packages/react/src/components/Button/Button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { getButtonProps } from "@mild-ui/core";
import type { ButtonProps } from "./Button.types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      asChild = false,
      className,
      disabled = false,
      onClick,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const { className: buttonClassName, ...buttonProps } = getButtonProps({
      variant,
      size,
      disabled,
      className,
    });

    if (asChild) {
      // When using asChild, we need to ensure only one child element is passed to Slot
      const child = React.Children.only(children) as React.ReactElement;

      return (
        <Slot ref={ref} {...props} {...buttonProps}>
          {React.cloneElement(child, {
            ...child.props,
            className:
              `${child.props.className || ""} ${buttonClassName}`.trim(),
            onClick: onClick,
            children: (
              <>
                {leadingIcon && <span className="mr-2">{leadingIcon}</span>}
                {child.props.children}
                {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
              </>
            ),
          })}
        </Slot>
      );
    }

    return (
      <button
        className={buttonClassName}
        ref={ref}
        onClick={onClick}
        {...props}
        {...buttonProps}
      >
        {leadingIcon && <span className="mr-2">{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
