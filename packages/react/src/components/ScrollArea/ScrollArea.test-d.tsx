// packages/react/src/components/ScrollArea/ScrollArea.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { ScrollArea, type ScrollAreaProps } from "./ScrollArea";

describe("ScrollArea types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<ScrollAreaProps>().toEqualTypeOf<ScrollAreaProps<"div">>();
    expectTypeOf<ScrollAreaProps<"ul">["onScroll"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"ul">["onScroll"]
    >();
    <ScrollArea as="ul" ref={React.createRef<HTMLUListElement>()} />;
    // @ts-expect-error a div ref does not fit a ul element
    <ScrollArea as="ul" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("dimensions accept design tokens only", () => {
    <ScrollArea orientation="both" scrollbars="hover" height="64" maxHeight="96" maxWidth="full" />;
    // @ts-expect-error raw CSS length
    <ScrollArea maxHeight="300px" />;
    // @ts-expect-error numbers are not tokens
    <ScrollArea height={200} />;
    // @ts-expect-error not a scrollbar mode
    <ScrollArea scrollbars="never" />;
  });

  it("contains no any", () => {
    expectTypeOf(ScrollArea).not.toBeAny();
    expectTypeOf<ScrollAreaProps["maxHeight"]>().not.toBeAny();
  });
});
