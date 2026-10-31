// packages/react/src/components/Heading/Heading.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Heading, type HeadingProps } from "./Heading";

describe("Heading types", () => {
  it("defaults to an h2 and follows `as`", () => {
    expectTypeOf<HeadingProps>().toEqualTypeOf<HeadingProps<"h2">>();
    expectTypeOf<HeadingProps<"div">["onClick"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"div">["onClick"]
    >();
    <Heading as="div" ref={React.createRef<HTMLDivElement>()} />;
    <Heading as="h1" ref={React.createRef<HTMLHeadingElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Heading as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("level is 1-6 and the typography props are token keys", () => {
    <Heading level={1} size="4xl" weight="bold" align="center" color="muted" truncate />;
    // @ts-expect-error there is no h7
    <Heading level={7} />;
    // @ts-expect-error the level is a number, not a tag name
    <Heading level="h1" />;
    // @ts-expect-error raw CSS font size
    <Heading size="32px" />;
    // @ts-expect-error not a weight name
    <Heading weight={700} />;
    // @ts-expect-error palette tokens are not semantic text colors
    <Heading color="primary-500" />;
  });

  it("contains no any", () => {
    expectTypeOf(Heading).not.toBeAny();
    expectTypeOf<HeadingProps["level"]>().not.toBeAny();
  });
});
