// packages/react/src/components/Stack/Stack.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Stack, type StackProps } from "./Stack";

describe("Stack types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<StackProps>().toEqualTypeOf<StackProps<"div">>();
    expectTypeOf<StackProps<"section">["onClick"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"section">["onClick"]
    >();
    <Stack as="ul" ref={React.createRef<HTMLUListElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Stack as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("layout props accept design tokens and CSS keywords only", () => {
    <Stack direction="row" gap="2-5" align="flex-start" justify="space-between" wrap inline />;
    <Stack wrap="wrap-reverse" />;
    // @ts-expect-error raw CSS length
    <Stack gap="16px" />;
    // @ts-expect-error numbers are not tokens
    <Stack gap={4} />;
    // @ts-expect-error not a flex direction
    <Stack direction="vertical" />;
    // @ts-expect-error not an align-items keyword
    <Stack align="top" />;
  });

  it("contains no any", () => {
    expectTypeOf(Stack).not.toBeAny();
    expectTypeOf<StackProps["gap"]>().not.toBeAny();
  });
});
