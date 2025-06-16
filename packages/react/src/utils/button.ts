// Button utility functions
import { cn } from "./cn";
import type { ButtonCoreProps } from "../types";

export interface ButtonUtilProps extends ButtonCoreProps {
  className?: string;
  fullWidth?: boolean;
  colorScheme?: string;
}

export function getButtonProps(props: ButtonUtilProps) {
  const {
    variant = "primary",
    size = "md",
    colorScheme = "primary",
    fullWidth = false,
    loading = false,
    disabled = false,
    className,
  } = props;

  const classes = cn(
    // Base classes
    "mild-button",
    
    // Variant classes
    `mild-button--${variant}`,
    
    // Size classes
    `mild-button--${size}`,
    
    // Color scheme classes
    colorScheme && `mild-button--${colorScheme}`,
    
    // State classes
    fullWidth && "mild-button--full-width",
    loading && "mild-button--loading",
    disabled && "mild-button--disabled",
    
    // Custom className
    className
  );

  return {
    className: classes,
    disabled: disabled || loading,
    "data-loading": loading ? "" : undefined,
    "data-disabled": disabled ? "" : undefined,
  };
}

export function getButtonState(props: { loading?: boolean; disabled?: boolean }) {
  const { loading = false, disabled = false } = props;
  
  return {
    canClick: !loading && !disabled,
    isLoading: loading,
    isDisabled: disabled,
  };
}

export function getButtonA11yProps(props: { 
  loading?: boolean; 
  disabled?: boolean; 
  type?: string; 
}) {
  const { loading = false, disabled = false, type = "button" } = props;
  
  return {
    type,
    "aria-disabled": disabled,
    "aria-busy": loading,
    tabIndex: disabled ? -1 : undefined,
  };
}