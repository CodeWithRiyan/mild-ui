// packages/react/src/components/Kbd/Kbd.tsx
import * as React from "react";
import type { KbdCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn } from "../../utils";

export interface KbdOwnProps extends KbdCoreProps {
  /** Key label, e.g. `⌘` or `Shift` */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Kbd as={T}>`. */
export type KbdProps<T extends React.ElementType = "kbd"> = PolymorphicProps<T, KbdOwnProps>;

function KbdInner<T extends React.ElementType = "kbd">(
  { as, size = "md", children, className, ...rest }: KbdProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "kbd";

  return (
    <Component ref={ref} className={cn("mild-kbd", `mild-kbd--${size}`, className)} {...rest}>
      {children}
    </Component>
  );
}

/** A keyboard key (`<kbd>`). Combine several for a shortcut: `<Kbd>⌘</Kbd> + <Kbd>K</Kbd>`. */
export const Kbd = React.forwardRef(KbdInner) as PolymorphicComponent<"kbd", KbdOwnProps>;
Kbd.displayName = "Kbd";
