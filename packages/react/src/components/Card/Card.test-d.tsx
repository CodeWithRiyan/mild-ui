// packages/react/src/components/Card/Card.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Card, CardTitle, type CardProps } from "./Card";

describe("Card types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<CardProps>().toEqualTypeOf<CardProps<"div">>();
    <Card as="a" href="/post" ref={React.createRef<HTMLAnchorElement>()} />;
    <CardTitle as="h2" size="2xl" />;
    // @ts-expect-error a div ref does not fit a form element
    <Card as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("variant and padding are closed sets", () => {
    <Card variant="outlined" padding="none" interactive disabled />;
    // @ts-expect-error not a card variant
    <Card variant="ghost" />;
    // @ts-expect-error padding is a named size, not a token
    <Card padding="4" />;
  });

  it("contains no any", () => {
    expectTypeOf(Card).not.toBeAny();
    expectTypeOf<CardProps["variant"]>().not.toBeAny();
  });
});
