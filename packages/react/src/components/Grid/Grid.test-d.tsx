// packages/react/src/components/Grid/Grid.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Grid, GridItem, type GridProps, type GridItemProps } from "./Grid";

describe("Grid types", () => {
  it("defaults to a div and follows `as`", () => {
    expectTypeOf<GridProps>().toEqualTypeOf<GridProps<"div">>();
    expectTypeOf<GridItemProps>().toEqualTypeOf<GridItemProps<"div">>();
    <Grid as="ul" ref={React.createRef<HTMLUListElement>()} />;
    <GridItem as="li" ref={React.createRef<HTMLLIElement>()} />;
    // @ts-expect-error a div ref does not fit a ul element
    <Grid as="ul" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("columns are 1-12, plain or per breakpoint", () => {
    <Grid columns={12} rows={6} gap="4" columnGap="2" rowGap="8" flow="dense" align="center" />;
    <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6, "2xl": 12 }} />;
    <Grid templateColumns="repeat(auto-fill, minmax(12rem, 1fr))" />;
    // @ts-expect-error more than 12 columns
    <Grid columns={13} />;
    // @ts-expect-error zero columns
    <Grid columns={0} />;
    // @ts-expect-error unknown breakpoint
    <Grid columns={{ base: 1, xs: 2 }} />;
    // @ts-expect-error raw CSS gap
    <Grid gap="1rem" />;
    // @ts-expect-error rows stop at 6
    <Grid rows={7} />;
  });

  it("spans are 1-12 or full, plain or per breakpoint", () => {
    <GridItem colSpan={3} rowSpan={2} />;
    <GridItem colSpan="full" rowSpan="full" />;
    <GridItem colSpan={{ base: "full", md: 6 }} />;
    // @ts-expect-error more than 12 columns
    <GridItem colSpan={13} />;
    // @ts-expect-error raw CSS value
    <GridItem colSpan="1 / -1" />;
  });

  it("contains no any", () => {
    expectTypeOf(Grid).not.toBeAny();
    expectTypeOf(GridItem).not.toBeAny();
    expectTypeOf<GridProps["columns"]>().not.toBeAny();
  });
});
