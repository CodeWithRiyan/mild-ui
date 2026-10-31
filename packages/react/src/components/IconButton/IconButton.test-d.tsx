// packages/react/src/components/IconButton/IconButton.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { IconButton, type IconButtonProps } from "./IconButton";
import { CloseButton } from "../CloseButton";

describe("IconButton types", () => {
  it("requires a label and an icon, and takes no children", () => {
    <IconButton label="Search" icon={<svg />} variant="ghost" size="xs" round />;
    // @ts-expect-error the accessible name is required
    <IconButton icon={<svg />} />;
    // @ts-expect-error the glyph is required
    <IconButton label="Search" />;
    // @ts-expect-error content goes through `icon`
    <IconButton label="Search" icon={<svg />}>
      text
    </IconButton>;
    // @ts-expect-error "icon" is a Button size, not an IconButton size
    <IconButton label="Search" icon={<svg />} size="icon" />;
  });

  it("CloseButton makes both optional", () => {
    <CloseButton />;
    <CloseButton label="Dismiss" icon={<svg />} size="sm" />;
  });

  it("contains no any", () => {
    expectTypeOf(IconButton).not.toBeAny();
    expectTypeOf<IconButtonProps["label"]>().toEqualTypeOf<string>();
  });
});
