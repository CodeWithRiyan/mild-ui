// packages/react/src/components/ToggleGroup/ToggleGroup.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from "./ToggleGroup";

describe("ToggleGroup types", () => {
  it("single mode works with string | null", () => {
    <ToggleGroup
      value="bold"
      onValueChange={(value) => expectTypeOf(value).toEqualTypeOf<string | null>()}
    />;
    <ToggleGroup type="single" defaultValue={null} />;
    // @ts-expect-error an array is the multiple form
    <ToggleGroup value={["bold"]} />;
  });

  it("multiple mode works with string[]", () => {
    <ToggleGroup
      type="multiple"
      value={["bold"]}
      onValueChange={(value) => expectTypeOf(value).toEqualTypeOf<string[]>()}
    />;
    // @ts-expect-error a string is the single form
    <ToggleGroup type="multiple" value="bold" />;
  });

  it("items take a value and the toggle looks, but not their own pressed state", () => {
    <ToggleGroupItem value="bold" variant="outline" size="sm" disabled />;
    // @ts-expect-error the group owns the pressed state
    <ToggleGroupItem value="bold" pressed />;
    // @ts-expect-error value is required
    <ToggleGroupItem>Bold</ToggleGroupItem>;
  });

  it("contains no any", () => {
    expectTypeOf(ToggleGroup).not.toBeAny();
    expectTypeOf<ToggleGroupProps["type"]>().not.toBeAny();
  });
});
