// packages/react/src/components/Box/Box.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Box, type BoxProps } from "./Box";

describe("Box types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<BoxProps>().toEqualTypeOf<BoxProps<"div">>();
    // Compared against the intrinsic element's own prop types, so this holds across
    // @types/react 18 and 19 (whose handler types differ in shape).
    expectTypeOf<BoxProps<"section">["onClick"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"section">["onClick"]
    >();
    expectTypeOf<BoxProps<"form">["onSubmit"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"form">["onSubmit"]
    >();
    <Box as="form" onSubmit={(event) => event.preventDefault()} />;
    <Box as="ul" ref={React.createRef<HTMLUListElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Box as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("style props accept design tokens only", () => {
    <Box padding="4" margin="px" gap="2-5" width="1/2" height="full" borderRadius="lg" />;
    <Box backgroundColor="primary-500" color="gray-900" borderColor="black-alpha-20" zIndex={10} />;
    // @ts-expect-error raw CSS length
    <Box padding="16px" />;
    // @ts-expect-error numbers are not tokens
    <Box padding={16} />;
    // @ts-expect-error not on the spacing scale
    <Box gap="sm" />;
    // @ts-expect-error raw CSS color
    <Box backgroundColor="#fff" />;
    // @ts-expect-error palette name needs a shade
    <Box color="primary" />;
    // @ts-expect-error radius uses the radius scale, not spacing
    <Box borderRadius="4" />;
    // @ts-expect-error arbitrary z-index
    <Box zIndex={7} />;
    // @ts-expect-error raw CSS width
    <Box width="100%" />;
  });

  it("contains no any", () => {
    expectTypeOf(Box).not.toBeAny();
    expectTypeOf<BoxProps["padding"]>().not.toBeAny();
  });
});
