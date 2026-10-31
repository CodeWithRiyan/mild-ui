// packages/react/src/components/Badge/Badge.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Badge, type BadgeProps } from "./Badge";

describe("Badge types", () => {
  it("defaults to a span and follows `as`", () => {
    expectTypeOf<BadgeProps>().toEqualTypeOf<BadgeProps<"span">>();
    <Badge as="a" href="/" ref={React.createRef<HTMLAnchorElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Badge as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("variant, color and size are closed sets", () => {
    <Badge variant="outline" colorScheme="info" size="sm" pill dot />;
    // @ts-expect-error not a color scheme
    <Badge colorScheme="purple" />;
    // @ts-expect-error not a badge size
    <Badge size="xl" />;
  });

  it("contains no any", () => {
    expectTypeOf(Badge).not.toBeAny();
    expectTypeOf<BadgeProps["colorScheme"]>().not.toBeAny();
  });
});
