// packages/react/src/components/Flex/Flex.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Flex, type FlexProps } from "./Flex";

describe("Flex types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<FlexProps>().toEqualTypeOf<FlexProps<"div">>();
    expectTypeOf<FlexProps<"form">["onSubmit"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"form">["onSubmit"]
    >();
    <Flex as="nav" ref={React.createRef<HTMLElement>()} aria-label="Main" />;
    // @ts-expect-error a div ref does not fit a ul element
    <Flex as="ul" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("layout props accept design tokens and CSS keywords only", () => {
    <Flex direction="column" gap="px" align="stretch" justify="space-evenly" wrap="nowrap" />;
    // @ts-expect-error raw CSS length
    <Flex gap="1rem" />;
    // @ts-expect-error not a flex-wrap keyword
    <Flex wrap="yes" />;
    // @ts-expect-error not a justify-content keyword
    <Flex justify="left" />;
  });

  it("contains no any", () => {
    expectTypeOf(Flex).not.toBeAny();
    expectTypeOf<FlexProps["gap"]>().not.toBeAny();
  });
});
