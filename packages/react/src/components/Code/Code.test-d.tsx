// packages/react/src/components/Code/Code.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Code, type CodeProps } from "./Code";

describe("Code types", () => {
  it("defaults to a code element and follows `as`", () => {
    expectTypeOf<CodeProps>().toEqualTypeOf<CodeProps<"code">>();
    <Code as="pre" ref={React.createRef<HTMLPreElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Code as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("variant and size are a closed set", () => {
    <Code variant="solid" size="lg" block />;
    // @ts-expect-error not a code variant
    <Code variant="ghost" />;
    // @ts-expect-error not a code size
    <Code size="xs" />;
  });

  it("contains no any", () => {
    expectTypeOf(Code).not.toBeAny();
    expectTypeOf<CodeProps["variant"]>().not.toBeAny();
  });
});
