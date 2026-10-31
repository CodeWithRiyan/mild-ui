// packages/react/src/components/Kbd/Kbd.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Kbd, type KbdProps } from "./Kbd";

describe("Kbd types", () => {
  it("defaults to a kbd element and follows `as`", () => {
    expectTypeOf<KbdProps>().toEqualTypeOf<KbdProps<"kbd">>();
    <Kbd as="span" ref={React.createRef<HTMLSpanElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Kbd as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("size is a closed set", () => {
    <Kbd size="sm">K</Kbd>;
    // @ts-expect-error not a kbd size
    <Kbd size="xl" />;
  });

  it("contains no any", () => {
    expectTypeOf(Kbd).not.toBeAny();
    expectTypeOf<KbdProps["size"]>().not.toBeAny();
  });
});
