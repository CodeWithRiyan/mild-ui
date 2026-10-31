// packages/react/src/components/Divider/Divider.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Divider, type DividerProps } from "./Divider";

describe("Divider types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<DividerProps>().toEqualTypeOf<DividerProps<"div">>();
    <Divider as="hr" ref={React.createRef<HTMLHRElement>()} />;
    <Divider as="li" ref={React.createRef<HTMLLIElement>()} />;
    // @ts-expect-error a div ref does not fit an hr element
    <Divider as="hr" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("takes a label instead of children, and a color token", () => {
    <Divider orientation="vertical" variant="dashed" size="lg" color="gray-300" />;
    <Divider label="OR" labelPosition="start" decorative />;
    <Divider label={<strong>OR</strong>} />;
    // @ts-expect-error content goes through `label`
    <Divider>OR</Divider>;
    // @ts-expect-error raw CSS color
    <Divider color="#ccc" />;
    // @ts-expect-error palette name needs a shade
    <Divider color="gray" />;
    // @ts-expect-error not an orientation
    <Divider orientation="diagonal" />;
  });

  it("contains no any", () => {
    expectTypeOf(Divider).not.toBeAny();
    expectTypeOf<DividerProps["color"]>().not.toBeAny();
  });
});
