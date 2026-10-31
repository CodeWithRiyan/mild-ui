// packages/react/src/types/polymorphic.ts
// Helpers for components that render as a caller-chosen element (`as` prop) while keeping
// that element's props and ref types, without resorting to `any`.
import type * as React from "react";

type AsProp<T extends React.ElementType> = { as?: T };

/** Own props + the rendered element's props, minus the ones the component defines itself. */
export type PolymorphicProps<T extends React.ElementType, OwnProps> = OwnProps &
  AsProp<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof OwnProps | "as">;

/** The ref type of the rendered element. */
export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicPropsWithRef<T extends React.ElementType, OwnProps> = PolymorphicProps<
  T,
  OwnProps
> & { ref?: PolymorphicRef<T> };

/** Call signature of a polymorphic, ref-forwarding component. */
export interface PolymorphicComponent<Default extends React.ElementType, OwnProps> {
  <T extends React.ElementType = Default>(
    props: PolymorphicPropsWithRef<T, OwnProps>,
  ): React.ReactElement | null;
  displayName?: string;
}
