import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  leadingIcon,
  trailingIcon,
  children,
  className = "",
}: ButtonProps) => {
  const baseClasses = [
    "mild-button",
    `mild-button-${variant}`,
    `mild-button-${size}`,
  ].join(" ");

  return (
    <button
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leadingIcon && (
        <span className="mild-button-icon mild-button-leading-icon">
          {leadingIcon}
        </span>
      )}
      <span className="mild-button-content">{children}</span>
      {trailingIcon && (
        <span className="mild-button-icon mild-button-trailing-icon">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
