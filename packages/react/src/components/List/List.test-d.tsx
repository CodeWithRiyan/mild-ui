// packages/react/src/components/List/List.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { List, ListItem, type ListProps, type ListItemProps } from "./List";

describe("List types", () => {
  it("defaults to a ul / li and follows `as`", () => {
    expectTypeOf<ListProps>().toEqualTypeOf<ListProps<"ul">>();
    expectTypeOf<ListItemProps>().toEqualTypeOf<ListItemProps<"li">>();
    <List as="ol" ref={React.createRef<HTMLOListElement>()} />;
    <ListItem as="div" ref={React.createRef<HTMLDivElement>()} />;
    // @ts-expect-error a div ref does not fit a ul element
    <List ref={React.createRef<HTMLDivElement>()} />;
  });

  it("marker and spacing are token keys", () => {
    <List ordered marker="upper-roman" spacing="2" unstyled={false} />;
    <ListItem icon={<svg />}>done</ListItem>;
    // @ts-expect-error not a list-style-type the stylesheet ships
    <List marker="emoji" />;
    // @ts-expect-error raw CSS spacing
    <List spacing="8px" />;
    // @ts-expect-error ordered is a flag
    <List ordered="yes" />;
  });

  it("contains no any", () => {
    expectTypeOf(List).not.toBeAny();
    expectTypeOf(ListItem).not.toBeAny();
    expectTypeOf<ListProps["marker"]>().not.toBeAny();
  });
});
