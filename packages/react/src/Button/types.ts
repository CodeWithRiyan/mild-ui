// packages/react/src/Button/types.ts
import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./Button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether to render the button as a child component
   */
  asChild?: boolean;
}