// packages/react/src/components/Text/Text.test-d.tsx
// Type-level contract of the polymorphic <Text>: checked by `vitest --typecheck` (tsc).
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Text, type TextProps } from "./Text";

describe("Text types", () => {
  it("defaults to a span", () => {
    expectTypeOf<TextProps>().toEqualTypeOf<TextProps<"span">>();
    // Intrinsic span attributes are accepted...
    expectTypeOf<TextProps["onClick"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"span">["onClick"]
    >();
    // ...and the typography props are still there.
    expectTypeOf<TextProps["fontWeight"]>().toEqualTypeOf<
      | "thin"
      | "light"
      | "normal"
      | "medium"
      | "semibold"
      | "bold"
      | "extrabold"
      | "black"
      | undefined
    >();
  });

  it("takes the props of the element given with `as`", () => {
    expectTypeOf<TextProps<"label">["htmlFor"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<TextProps<"a">["href"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<TextProps<"h1">["onClick"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"h1">["onClick"]
    >();
    // A span has no htmlFor.
    expectTypeOf<TextProps<"span">>().not.toHaveProperty("htmlFor");
  });

  it("types the ref after the rendered element", () => {
    const spanRef = React.createRef<HTMLSpanElement>();
    const headingRef = React.createRef<HTMLHeadingElement>();
    const anchorRef = React.createRef<HTMLAnchorElement>();

    <Text ref={spanRef}>ok</Text>;
    <Text as="h1" ref={headingRef}>
      ok
    </Text>;
    <Text as="a" href="/x" ref={anchorRef}>
      ok
    </Text>;
    // @ts-expect-error a span ref does not fit an anchor element
    <Text as="a" ref={spanRef}>
      nope
    </Text>;
  });

  it("rejects props the rendered element does not have", () => {
    // @ts-expect-error href is not a span attribute
    <Text href="/x">nope</Text>;
    // @ts-expect-error unknown fontSize token
    <Text fontSize="huge">nope</Text>;
    // @ts-expect-error color takes the semantic text colors only
    <Text color="#ff0000">nope</Text>;
  });

  it("accepts custom components for `as`", () => {
    const Link = ({ to, children }: { to: string; children?: React.ReactNode }) => (
      <a href={to}>{children}</a>
    );
    <Text as={Link} to="/home">
      ok
    </Text>;
    // @ts-expect-error `to` is required by Link
    <Text as={Link}>nope</Text>;
  });

  it("contains no any", () => {
    expectTypeOf(Text).not.toBeAny();
    expectTypeOf<TextProps<"p">>().not.toBeAny();
    expectTypeOf<TextProps<"p">["children"]>().toEqualTypeOf<React.ReactNode>();
  });
});
