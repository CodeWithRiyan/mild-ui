// packages/react/src/components/Button/Button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonProps } from "@mild-ui/core";
import { cn } from "../../utils";

// React-specific button props
interface ReactButtonProps extends ButtonProps {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ReactButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      colorScheme = "primary", 
      asChild = false,
      className,
      disabled = false,
      loading = false,
      onClick,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    // Build button classes based on design system
    const buttonClass = cn(
      // Base button styles
      "inline-flex items-center justify-center rounded-md font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      
      // Size variants
      {
        "h-8 px-3 text-xs": size === "xs",
        "h-9 px-4 text-sm": size === "sm", 
        "h-10 px-4 text-sm": size === "md",
        "h-11 px-8 text-base": size === "lg",
        "h-12 px-8 text-base": size === "xl",
      },
      
      // Variant and color scheme styles
      {
        // Solid variant
        "bg-blue-500 text-white hover:bg-blue-600": variant === "solid" && colorScheme === "primary",
        "bg-gray-500 text-white hover:bg-gray-600": variant === "solid" && colorScheme === "secondary", 
        "bg-green-500 text-white hover:bg-green-600": variant === "solid" && colorScheme === "success",
        "bg-yellow-500 text-white hover:bg-yellow-600": variant === "solid" && colorScheme === "warning",
        "bg-red-500 text-white hover:bg-red-600": variant === "solid" && colorScheme === "danger",
        
        // Outline variant
        "border border-blue-500 text-blue-500 hover:bg-blue-50": variant === "outline" && colorScheme === "primary",
        "border border-gray-500 text-gray-500 hover:bg-gray-50": variant === "outline" && colorScheme === "secondary",
        "border border-green-500 text-green-500 hover:bg-green-50": variant === "outline" && colorScheme === "success",
        "border border-yellow-500 text-yellow-500 hover:bg-yellow-50": variant === "outline" && colorScheme === "warning", 
        "border border-red-500 text-red-500 hover:bg-red-50": variant === "outline" && colorScheme === "danger",
        
        // Ghost variant
        "text-blue-500 hover:bg-blue-50": variant === "ghost" && colorScheme === "primary",
        "text-gray-500 hover:bg-gray-50": variant === "ghost" && colorScheme === "secondary",
        "text-green-500 hover:bg-green-50": variant === "ghost" && colorScheme === "success",
        "text-yellow-500 hover:bg-yellow-50": variant === "ghost" && colorScheme === "warning",
        "text-red-500 hover:bg-red-50": variant === "ghost" && colorScheme === "danger",
        
        // Link variant
        "text-blue-500 underline-offset-4 hover:underline": variant === "link" && colorScheme === "primary",
        "text-gray-500 underline-offset-4 hover:underline": variant === "link" && colorScheme === "secondary",
      },
      
      className
    );

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement;
      return (
        <Slot ref={ref} {...props}>
          {React.cloneElement(child, {
            ...child.props,
            className: cn(child.props.className, buttonClass),
            onClick: onClick,
            disabled: disabled || loading,
            children: (
              <>
                {leftIcon && <span className="mr-2">{leftIcon}</span>}
                {loading && <span className="mr-2">Loading...</span>}
                {child.props.children}
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
              </>
            ),
          })}
        </Slot>
      );
    }

    return (
      <button
        className={buttonClass}
        ref={ref}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {loading && <span className="mr-2">Loading...</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
