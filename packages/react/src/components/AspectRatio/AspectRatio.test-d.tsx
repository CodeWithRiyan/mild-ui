// packages/react/src/components/AspectRatio/AspectRatio.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { AspectRatio, type AspectRatioProps } from "./AspectRatio";

describe("AspectRatio types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<AspectRatioProps>().toEqualTypeOf<AspectRatioProps<"div">>();
    <AspectRatio as="figure" ref={React.createRef<HTMLElement>()} />;
    // @ts-expect-error a div ref does not fit a ul element
    <AspectRatio as="ul" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("ratio is a number or a `w/h` string", () => {
    <AspectRatio ratio={16 / 9} />;
    <AspectRatio ratio="4/3" />;
    <AspectRatio ratio="16 / 9" />;
    // @ts-expect-error not a ratio
    <AspectRatio ratio="wide" />;
  });

  it("contains no any", () => {
    expectTypeOf(AspectRatio).not.toBeAny();
    expectTypeOf<AspectRatioProps["ratio"]>().not.toBeAny();
  });
});
