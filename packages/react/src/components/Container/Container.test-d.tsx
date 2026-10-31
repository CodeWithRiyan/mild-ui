// packages/react/src/components/Container/Container.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Container, type ContainerProps } from "./Container";

describe("Container types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<ContainerProps>().toEqualTypeOf<ContainerProps<"div">>();
    expectTypeOf<ContainerProps<"main">["onClick"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"main">["onClick"]
    >();
    <Container as="section" ref={React.createRef<HTMLElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Container as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("size is a breakpoint or full; padding is a spacing token", () => {
    <Container size="sm" padding="6" centerContent />;
    <Container size="2xl" />;
    <Container size="full" />;
    // @ts-expect-error raw CSS width
    <Container size="960px" />;
    // @ts-expect-error xs is not a container size
    <Container size="xs" />;
    // @ts-expect-error raw CSS padding
    <Container padding="1rem" />;
  });

  it("contains no any", () => {
    expectTypeOf(Container).not.toBeAny();
    expectTypeOf<ContainerProps["size"]>().not.toBeAny();
  });
});
